import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  FileText,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  PenTool,
  Type,
  Calendar,
  User as UserIcon,
  CheckSquare,
  Move,
  Check,
  Sparkles,
  PenLine,
  ShieldCheck,
  Eye,
  AtSign,
  Braces,
  Layers,
  FileStack,
  GripVertical,
  Mail,
  Bell,
  Send,
  Clock,
  Hash,
  DollarSign,
  Phone,
  ChevronDown,
  Upload as UploadIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  SignTemplateField,
  SignFieldType,
  SignTemplate,
  SignTemplateRole,
  SignRoleType,
  SignRolePermission,
  SignTemplateVariable,
  SignVariableType,
  SignTemplateDocument,
  SignDocumentTag,
  SignTemplateDelivery,
  SignTemplateAutomation,
  SIGN_DOC_TAGS,
  applyTemplateVariables,
  useSignTemplates,
} from "@/hooks/useSignTemplates";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const uid = () => Math.random().toString(36).slice(2, 9);

interface SignTemplateBuilderProps {
  onBack: () => void;
  onSaved: () => void;
}

type StepKey = "upload" | "configure" | "rolesfields" | "review";

const STEPS: { key: StepKey; label: string; sub: string }[] = [
  { key: "upload", label: "Upload", sub: "Files" },
  { key: "configure", label: "Configure", sub: "Variables & delivery" },
  { key: "rolesfields", label: "Roles & Fields", sub: "Who signs where" },
  { key: "review", label: "Review", sub: "Save" },
];

const ROLE_COLORS = ["#3b82f6", "#a78bfa", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const ROLE_TYPES: {
  value: SignRoleType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedFields: SignFieldType[] | "all";
  defaultPermissions: SignRolePermission[];
}[] = [
  {
    value: "signer",
    label: "Signer",
    description: "Signs and fills the document.",
    icon: PenLine,
    allowedFields: "all",
    defaultPermissions: ["sign", "edit_fields", "view"],
  },
  {
    value: "approver",
    label: "Approver",
    description: "Approves before it's finalized.",
    icon: ShieldCheck,
    allowedFields: ["signature", "initials", "date", "name"],
    defaultPermissions: ["approve", "view"],
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only access. No fields.",
    icon: Eye,
    allowedFields: [],
    defaultPermissions: ["view"],
  },
  {
    value: "cc",
    label: "CC",
    description: "Receives a copy. No action needed.",
    icon: AtSign,
    allowedFields: [],
    defaultPermissions: ["view"],
  },
];

const PERMISSION_LABELS: { value: SignRolePermission; label: string }[] = [
  { value: "sign", label: "Can sign" },
  { value: "approve", label: "Can approve" },
  { value: "view", label: "Can view" },
  { value: "upload", label: "Can upload files" },
  { value: "edit_fields", label: "Can edit assigned fields" },
];

const getRoleTypeMeta = (t: SignRoleType = "signer") =>
  ROLE_TYPES.find((r) => r.value === t) ?? ROLE_TYPES[0];

const roleAllows = (t: SignRoleType | undefined, kind: SignFieldType) => {
  const meta = getRoleTypeMeta(t);
  return meta.allowedFields === "all" || meta.allowedFields.includes(kind);
};

const FIELD_TOOLS: {
  kind: SignFieldType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  w: number;
  h: number;
}[] = [
  { kind: "signature", label: "Signature", icon: PenTool, w: 22, h: 6 },
  { kind: "initials", label: "Initials", icon: Type, w: 10, h: 5 },
  { kind: "date", label: "Date", icon: Calendar, w: 14, h: 5 },
  { kind: "name", label: "Name", icon: UserIcon, w: 18, h: 5 },
  { kind: "text", label: "Text", icon: Type, w: 18, h: 5 },
  { kind: "checkbox", label: "Checkbox", icon: CheckSquare, w: 5, h: 5 },
];

const VARIABLE_TYPES: { value: SignVariableType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "text", label: "Text", icon: Type },
  { value: "currency", label: "Currency", icon: DollarSign },
  { value: "date", label: "Date", icon: Calendar },
  { value: "email", label: "Email", icon: AtSign },
  { value: "phone", label: "Phone", icon: Phone },
  { value: "number", label: "Number", icon: Hash },
  { value: "company", label: "Company", icon: FileText },
  { value: "address", label: "Address", icon: FileText },
];

const variableTypeMeta = (t: SignVariableType) =>
  VARIABLE_TYPES.find((v) => v.value === t) ?? VARIABLE_TYPES[0];

const toToken = (label: string) => {
  const base = label.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return base || "FIELD";
};

const CATEGORIES = ["Client", "Legal", "HR", "Sales", "Other"];

type BuilderDoc = {
  id: string;
  file: File | null;
  name: string;
  tag?: SignDocumentTag;
  pageCount: number;
};

const tagFromFilename = (n: string): SignDocumentTag =>
  /nda/i.test(n) ? "nda"
  : /pric/i.test(n) ? "pricing"
  : /scope|sow/i.test(n) ? "scope"
  : /annex/i.test(n) ? "annexure"
  : /onboard/i.test(n) ? "onboarding"
  : "agreement";

export default function SignTemplateBuilder({ onBack, onSaved }: SignTemplateBuilderProps) {
  const { save } = useSignTemplates();
  const [step, setStep] = useState<StepKey>("upload");

  // Files & meta
  const [documents, setDocuments] = useState<BuilderDoc[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Client");
  const [packageTitle, setPackageTitle] = useState<string>("");

  // Roles
  const [signingMode, setSigningMode] = useState<"sequential" | "parallel">("sequential");
  const [roles, setRoles] = useState<SignTemplateRole[]>([
    {
      key: "client",
      label: "Client",
      color: ROLE_COLORS[0],
      signingOrder: 1,
      type: "signer",
      permissions: ["sign", "edit_fields", "view"],
    },
    {
      key: "sender",
      label: "You",
      color: ROLE_COLORS[1],
      signingOrder: 2,
      type: "signer",
      permissions: ["sign", "edit_fields", "view"],
    },
  ]);

  // Variables
  const [variables, setVariables] = useState<SignTemplateVariable[]>([]);

  // Fields
  const [fields, setFields] = useState<SignTemplateField[]>([]);
  const [page, setPage] = useState(1);
  const [activeRoleKey, setActiveRoleKey] = useState<string>("client");
  const [activeTool, setActiveTool] = useState(FIELD_TOOLS[0]);
  const pageRef = useRef<HTMLDivElement>(null);

  // Delivery & Automation
  const [delivery, setDelivery] = useState<SignTemplateDelivery>({
    emailSubject: "Please sign: {{COMPANY_NAME}} agreement",
    emailMessage: "Hi {{CLIENT_NAME}},\n\nPlease review and sign the attached document at your convenience.\n\nThanks!",
    senderName: "",
    expiryDays: 14,
    ccEmails: [],
    redirectUrl: "",
    allowDownload: true,
  });
  const [automation, setAutomation] = useState<SignTemplateAutomation>({
    remindEveryDays: 3,
    expiryWarningDays: 2,
    escalateAfterDays: 7,
    notifyOnOpen: true,
    notifyOnComplete: true,
  });

  // Review
  const [filenamePattern, setFilenamePattern] = useState<string>(
    "{{COMPANY_NAME}} - {{TEMPLATE_NAME}} - Signed.pdf",
  );
  const [previewMode, setPreviewMode] = useState<"sender" | "recipient" | "email" | "filename">("sender");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];
  const pageCount = activeDoc?.pageCount ?? 3;

  /* ─────────── documents ─────────── */
  const addDocuments = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const next: BuilderDoc[] = files.map((f) => ({
        id: `doc-${uid()}`,
        file: f,
        name: f.name,
        tag: tagFromFilename(f.name),
        pageCount: Math.max(1, Math.min(8, Math.ceil(f.size / (60 * 1024)))) || 3,
      }));
      setDocuments((prev) => {
        const merged = [...prev, ...next];
        if (!activeDocId) setActiveDocId(merged[0].id);
        return merged;
      });
      if (!name) setName(files[0].name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
    },
    [activeDocId, name],
  );

  const updateDocument = (id: string, patch: Partial<BuilderDoc>) =>
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const removeDocument = (id: string) => {
    setDocuments((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (activeDocId === id && next.length > 0) setActiveDocId(next[0].id);
      return next;
    });
    setFields((fs) => fs.filter((f) => f.documentId !== id));
  };

  const moveDocument = (id: string, dir: -1 | 1) => {
    setDocuments((prev) => {
      const i = prev.findIndex((d) => d.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = prev.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  /* ─────────── roles ─────────── */
  const addRole = () => {
    if (roles.length >= 6) return;
    const idx = roles.length;
    const key = `role-${uid()}`;
    const type: SignRoleType = "signer";
    setRoles((r) => [
      ...r,
      {
        key,
        label: `Signer ${idx + 1}`,
        color: ROLE_COLORS[idx % ROLE_COLORS.length],
        signingOrder: idx + 1,
        type,
        permissions: getRoleTypeMeta(type).defaultPermissions,
      },
    ]);
  };
  const updateRole = (key: string, patch: Partial<SignTemplateRole>) =>
    setRoles((rs) =>
      rs.map((r) => {
        if (r.key !== key) return r;
        const next = { ...r, ...patch };
        // If role type changed, reset permissions to that type's defaults
        if (patch.type && patch.type !== r.type) {
          next.permissions = getRoleTypeMeta(patch.type).defaultPermissions;
        }
        return next;
      }),
    );
  const togglePermission = (key: string, perm: SignRolePermission) => {
    setRoles((rs) =>
      rs.map((r) => {
        if (r.key !== key) return r;
        const cur = new Set(r.permissions ?? []);
        if (cur.has(perm)) cur.delete(perm);
        else cur.add(perm);
        return { ...r, permissions: Array.from(cur) };
      }),
    );
  };
  const removeRole = (key: string) => {
    if (roles.length <= 1) return;
    setRoles((rs) => rs.filter((r) => r.key !== key));
    setFields((fs) => fs.filter((f) => f.roleKey !== key));
    if (activeRoleKey === key) setActiveRoleKey(roles.find((r) => r.key !== key)!.key);
  };
  const moveRole = (key: string, dir: -1 | 1) => {
    setRoles((rs) => {
      const i = rs.findIndex((r) => r.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= rs.length) return rs;
      const next = rs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((r, idx) => ({ ...r, signingOrder: idx + 1 }));
    });
  };

  /* ─────────── variables ─────────── */
  const addVariable = () => {
    const baseLabel = "New variable";
    let token = toToken(baseLabel);
    const taken = new Set(variables.map((v) => v.name));
    let n = 1;
    while (taken.has(token)) {
      n += 1;
      token = `${toToken(baseLabel)}_${n}`;
    }
    setVariables((prev) => [
      ...prev,
      {
        name: token,
        label: baseLabel,
        type: "text",
        required: false,
        pattern: `{{${token}}}`,
        defaultValue: "",
      },
    ]);
  };
  const updateVariable = (name: string, patch: Partial<SignTemplateVariable>) =>
    setVariables((prev) => {
      return prev.map((v) => {
        if (v.name !== name) return v;
        let next = { ...v, ...patch };
        // If label changes, regenerate token to keep them aligned
        if (patch.label !== undefined && patch.label !== v.label) {
          const taken = new Set(prev.filter((x) => x.name !== name).map((x) => x.name));
          let token = toToken(patch.label);
          let n = 1;
          while (taken.has(token)) {
            n += 1;
            token = `${toToken(patch.label)}_${n}`;
          }
          next.name = token;
          next.pattern = `{{${token}}}`;
        }
        return next;
      });
    });
  const removeVariable = (name: string) =>
    setVariables((prev) => prev.filter((v) => v.name !== name));

  /* ─────────── fields ─────────── */
  const placeField = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = pageRef.current;
    if (!target || !activeDoc) return;
    const activeRole = roles.find((r) => r.key === activeRoleKey);
    if (!activeRole) return;
    if (!roleAllows(activeRole.type, activeTool.kind)) {
      toast.error(
        `${getRoleTypeMeta(activeRole.type).label}s can't have ${activeTool.label.toLowerCase()} fields.`,
      );
      return;
    }
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const f: SignTemplateField = {
      id: uid(),
      type: activeTool.kind,
      roleKey: activeRoleKey,
      page,
      x: Math.max(0, Math.min(100 - activeTool.w, x - activeTool.w / 2)),
      y: Math.max(0, Math.min(100 - activeTool.h, y - activeTool.h / 2)),
      width: activeTool.w,
      height: activeTool.h,
      documentId: activeDoc.id,
    };
    setFields((p) => [...p, f]);
  };
  const removeField = (id: string) => setFields((p) => p.filter((f) => f.id !== id));

  // Keyboard delete for selected field
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedFieldId) {
        // Avoid deleting while typing in inputs
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        removeField(selectedFieldId);
        setSelectedFieldId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedFieldId]);

  const docFields = useMemo(
    () =>
      fields.filter(
        (f) => !activeDoc || (f.documentId ?? activeDoc.id) === activeDoc.id,
      ),
    [fields, activeDoc],
  );
  const pageFields = useMemo(() => docFields.filter((f) => f.page === page), [docFields, page]);

  /* ─────────── validation ─────────── */
  const stepValid: Record<StepKey, boolean> = {
    upload: documents.length >= 1,
    configure:
      variables.every((v) => v.label.trim().length > 0) &&
      (delivery.expiryDays ?? 0) > 0,
    rolesfields:
      roles.length >= 1 &&
      roles.every((r) => r.label.trim().length > 0) &&
      fields.length >= 1 &&
      fields.some((f) => f.type === "signature"),
    review: name.trim().length >= 2 && filenamePattern.trim().length > 0,
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (!stepValid[step]) {
      const m: Record<StepKey, string> = {
        upload: "Add at least one file.",
        configure: "Complete variables and set an expiry duration.",
        rolesfields:
          "Add a role and place at least one signature field.",
        review: "Name the template and filename pattern.",
      };
      toast.error(m[step]);
      return;
    }
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1].key);
  };
  const goBack = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (idx > 0) setStep(STEPS[idx - 1].key);
  };

  /* ─────────── save ─────────── */
  const canSave = STEPS.every((s) => stepValid[s.key]);

  const handleSave = () => {
    if (!canSave) {
      toast.error("Complete every step before saving.");
      return;
    }
    const tpl: SignTemplate = {
      id: `tpl-${uid()}`,
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      documentName: documents[0]?.name || `${name}.pdf`,
      pageCount: documents[0]?.pageCount ?? 3,
      roles,
      fields,
      signingMode,
      variables: variables.length > 0 ? variables : undefined,
      packageTitle: packageTitle.trim() || undefined,
      documents:
        documents.length > 0
          ? documents.map<SignTemplateDocument>((d) => ({
              id: d.id,
              name: d.name,
              tag: d.tag,
              pageCount: d.pageCount,
            }))
          : undefined,
      delivery,
      automation,
      filenamePattern: filenamePattern.trim() || undefined,
      defaults: {
        expiryDays: delivery.expiryDays,
        remindersEveryDays: automation.remindEveryDays,
        ccEmails: delivery.ccEmails,
      },
      createdAt: Date.now(),
      useCount: 0,
    };
    save(tpl);
    toast.success("Template saved", { description: `${tpl.name} is ready to launch.` });
    onSaved();
  };

  /* ─────────── render ─────────── */
  const currentIdx = STEPS.findIndex((s) => s.key === step);

  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back to templates
        </button>
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
            New template
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Configure once. Launch infinitely.
        </h1>

        {/* Stepper */}
        <div className="mt-6 flex items-center gap-0 overflow-x-auto pb-1">
          {STEPS.map((s, i) => {
            const active = s.key === step;
            const done = i < currentIdx;
            const reachable = i <= currentIdx || stepValid[STEPS[i - 1]?.key];
            return (
              <div key={s.key} className="flex items-center shrink-0">
                <button
                  onClick={() => {
                    if (reachable) setStep(s.key);
                  }}
                  className={cn(
                    "group flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-colors",
                    active
                      ? "bg-primary/10"
                      : done
                        ? "hover:bg-muted/40"
                        : "opacity-60",
                  )}
                  disabled={!reachable}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full inline-flex items-center justify-center text-[10px] font-semibold tabular-nums",
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[12px] font-medium hidden sm:inline",
                      active ? "text-primary" : "text-foreground/80",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-6 h-px mx-0.5",
                      done ? "bg-primary/30" : "bg-border/60",
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px]"
        >
          {step === "upload" && (
            <StepUpload
              documents={documents}
              addDocuments={addDocuments}
              removeDocument={removeDocument}
              moveDocument={moveDocument}
              updateDocument={updateDocument}
              fileInputRef={fileInputRef}
              addMoreInputRef={addMoreInputRef}
            />
          )}

          {step === "configure" && (
            <div className="space-y-12">
              <StepVariables
                variables={variables}
                addVariable={addVariable}
                updateVariable={updateVariable}
                removeVariable={removeVariable}
              />
              <div className="border-t border-border/40" />
              <StepDelivery
                delivery={delivery}
                setDelivery={setDelivery}
                automation={automation}
                setAutomation={setAutomation}
              />
            </div>
          )}

          {step === "rolesfields" && (
            <div className="space-y-12">
              <StepRoles
                roles={roles}
                addRole={addRole}
                updateRole={updateRole}
                removeRole={removeRole}
                moveRole={moveRole}
                togglePermission={togglePermission}
                signingMode={signingMode}
                setSigningMode={setSigningMode}
              />
              <div className="border-t border-border/40" />
              <StepFields
                documents={documents}
                activeDocId={activeDocId}
                setActiveDocId={(id) => {
                  setActiveDocId(id);
                  setPage(1);
                }}
                page={page}
                setPage={setPage}
                pageCount={pageCount}
                roles={roles}
                fields={fields}
                docFields={docFields}
                pageFields={pageFields}
                activeRoleKey={activeRoleKey}
                setActiveRoleKey={setActiveRoleKey}
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                placeField={placeField}
                removeField={removeField}
                selectedFieldId={selectedFieldId}
                setSelectedFieldId={setSelectedFieldId}
                pageRef={pageRef}
              />
            </div>
          )}

          {step === "review" && (
            <StepReview
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
              category={category}
              setCategory={setCategory}
              documents={documents}
              roles={roles}
              variables={variables}
              fields={fields}
              delivery={delivery}
              automation={automation}
              filenamePattern={filenamePattern}
              setFilenamePattern={setFilenamePattern}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between border-t border-border/40 pt-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (currentIdx === 0 ? onBack() : goBack())}
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          {currentIdx === 0 ? "Cancel" : "Back"}
        </Button>

        <div className="text-[11px] text-muted-foreground tabular-nums">
          Step {currentIdx + 1} of {STEPS.length}
        </div>

        {step === "review" ? (
          <Button size="sm" onClick={handleSave} disabled={!canSave} className="gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Save template
          </Button>
        ) : (
          <Button size="sm" onClick={goNext} className="gap-1.5" disabled={!stepValid[step]}>
            Continue <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 1 — UPLOAD
 * ────────────────────────────────────────────────────────── */

function StepUpload({
  documents,
  addDocuments,
  removeDocument,
  moveDocument,
  updateDocument,
  fileInputRef,
  addMoreInputRef,
}: {
  documents: BuilderDoc[];
  addDocuments: (files: File[]) => void;
  removeDocument: (id: string) => void;
  moveDocument: (id: string, dir: -1 | 1) => void;
  updateDocument: (id: string, p: Partial<BuilderDoc>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  addMoreInputRef: React.RefObject<HTMLInputElement>;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Upload your files"
        sub="PDF, DOCX, DOC, ODT. Drop multiple files — they'll be sent together as one signing session."
      />

      {documents.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const fs = Array.from(e.dataTransfer.files ?? []);
            if (fs.length) addDocuments(fs);
          }}
          className="rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer px-6 py-20 text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <UploadIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
          <p className="text-[14px] font-medium">Drag &amp; drop your files, or click to browse</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Supports PDF, DOCX, DOC, ODT · up to 20MB per file
          </p>
          <Button size="sm" className="mt-5 h-9 rounded-lg" type="button">
            Choose files
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.odt"
            className="hidden"
            onChange={(e) => {
              const fs = Array.from(e.target.files ?? []);
              if (fs.length) addDocuments(fs);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[12px] text-foreground/80 tabular-nums">
              <span className="font-semibold">{documents.length}</span> file
              {documents.length === 1 ? "" : "s"} ready
            </div>
            <button
              onClick={() => addMoreInputRef.current?.click()}
              className="inline-flex items-center gap-1 text-[12px] text-primary hover:text-primary/80"
            >
              <Plus className="w-3.5 h-3.5" /> Add more
            </button>
            <input
              ref={addMoreInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.odt"
              className="hidden"
              onChange={(e) => {
                const fs = Array.from(e.target.files ?? []);
                if (fs.length) addDocuments(fs);
                e.target.value = "";
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {documents.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="group rounded-xl border border-border/50 bg-card/40 hover:bg-card/60 transition-colors p-3 flex items-center gap-3"
              >
                <GripVertical className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                <div className="w-10 h-12 rounded-md bg-gradient-to-b from-background to-muted/40 border border-border/40 shrink-0 flex flex-col items-center justify-center text-[8px] font-semibold text-muted-foreground">
                  <FileText className="w-4 h-4 text-primary/70 mb-0.5" />
                  {d.name.split(".").pop()?.toUpperCase().slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={d.name}
                    onChange={(e) => updateDocument(d.id, { name: e.target.value })}
                    className="h-8 px-2 bg-background/50 text-[12.5px] font-medium"
                  />
                  <div className="text-[10.5px] text-muted-foreground mt-1 tabular-nums">
                    {d.pageCount} pages
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <button
                    onClick={() => moveDocument(d.id, -1)}
                    disabled={i === 0}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronDown className="w-3 h-3 rotate-180" />
                  </button>
                  <button
                    onClick={() => moveDocument(d.id, 1)}
                    disabled={i === documents.length - 1}
                    className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => removeDocument(d.id)}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition opacity-0 group-hover:opacity-100"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 2 — ROLES
 * ────────────────────────────────────────────────────────── */

function StepRoles({
  roles,
  addRole,
  updateRole,
  removeRole,
  moveRole,
  togglePermission,
  signingMode,
  setSigningMode,
}: {
  roles: SignTemplateRole[];
  addRole: () => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  moveRole: (key: string, dir: -1 | 1) => void;
  togglePermission: (key: string, perm: SignRolePermission) => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Who's involved?"
        sub="Define recipient roles, their responsibility, and the order they'll receive the document. Personalization fields are separate — you'll set those next."
      />

      {/* Signing mode */}
      <div className="grid grid-cols-2 gap-2">
        {(["sequential", "parallel"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setSigningMode(m)}
            className={cn(
              "px-3 py-3 rounded-xl text-left border transition-colors",
              signingMode === m
                ? "bg-primary/10 text-primary border-primary/25"
                : "bg-card/30 border-border/50 text-foreground/80 hover:bg-card/50",
            )}
          >
            <div className="text-[13px] font-medium capitalize">{m}</div>
            <div className="text-[11.5px] text-muted-foreground mt-0.5">
              {m === "sequential"
                ? "One at a time, in order."
                : "Everyone receives at once."}
            </div>
          </button>
        ))}
      </div>

      {/* Roles list */}
      <div className="space-y-2">
        {roles.map((r, i) => {
          const meta = getRoleTypeMeta(r.type);
          return (
            <div
              key={r.key}
              className="rounded-2xl border border-border/50 bg-card/30 hover:bg-card/45 transition-colors p-3.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    const next =
                      ROLE_COLORS[(ROLE_COLORS.indexOf(r.color) + 1) % ROLE_COLORS.length];
                    updateRole(r.key, { color: next });
                  }}
                  className="w-7 h-7 rounded-full border border-border/60 shrink-0 hover:scale-110 transition"
                  style={{ background: r.color }}
                  title="Change color"
                />
                <Input
                  value={r.label}
                  onChange={(e) => updateRole(r.key, { label: e.target.value })}
                  placeholder="Role name (e.g. Client, Legal, Counter-signer)"
                  className="h-9 bg-background/60 flex-1 min-w-[180px] text-[13px]"
                />
                <Select
                  value={r.type ?? "signer"}
                  onValueChange={(v) => updateRole(r.key, { type: v as SignRoleType })}
                >
                  <SelectTrigger className="h-9 w-[130px] bg-background/60 text-[12px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLE_TYPES.map((rt) => {
                      const Icon = rt.icon;
                      return (
                        <SelectItem key={rt.value} value={rt.value}>
                          <span className="inline-flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            {rt.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {signingMode === "sequential" && (
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums">
                    <span>Order</span>
                    <div className="flex flex-col items-center gap-0">
                      <button
                        onClick={() => moveRole(r.key, -1)}
                        disabled={i === 0}
                        className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3 rotate-180" />
                      </button>
                      <span className="text-[12px] font-semibold text-foreground">
                        {i + 1}
                      </span>
                      <button
                        onClick={() => moveRole(r.key, 1)}
                        disabled={i === roles.length - 1}
                        className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => removeRole(r.key)}
                  disabled={roles.length <= 1}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 disabled:opacity-30"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Permissions */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5 pl-9">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mr-1">
                  Permissions
                </span>
                {PERMISSION_LABELS.map((p) => {
                  const on = r.permissions?.includes(p.value);
                  return (
                    <button
                      key={p.value}
                      onClick={() => togglePermission(r.key, p.value)}
                      className={cn(
                        "px-2 h-6 rounded-full text-[10.5px] font-medium border transition-colors",
                        on
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-card/50 border-border/50 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-muted-foreground mt-2 pl-9">
                {meta.description}
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={addRole}
        disabled={roles.length >= 6}
        className="w-full rounded-2xl border border-dashed border-border/60 px-4 py-3 text-[12.5px] text-muted-foreground hover:text-foreground hover:border-border transition-colors inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
      >
        <Plus className="w-3.5 h-3.5" /> Add role
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 3 — VARIABLES (personalization, sender-filled)
 * ────────────────────────────────────────────────────────── */

function StepVariables({
  variables,
  addVariable,
  updateVariable,
  removeVariable,
}: {
  variables: SignTemplateVariable[];
  addVariable: () => void;
  updateVariable: (name: string, patch: Partial<SignTemplateVariable>) => void;
  removeVariable: (name: string) => void;
}) {
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Personalization variables"
        sub="Values you fill in before sending — like client name, deal value, or start date. These personalize the agreement automatically. (Recipients don't see this list — they fill signing fields in the next step.)"
      />

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 flex items-start gap-2.5">
        <Braces className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-[12px] text-foreground/80 leading-relaxed">
          <span className="font-medium text-foreground">Sender-filled, not signer-filled.</span>{" "}
          Variables personalize the document before it goes out. Signing fields (signatures,
          initials, dates) are placed on the document in Step 4 and filled by recipients.
        </div>
      </div>

      {variables.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 bg-card/20 px-6 py-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-xl bg-muted/40 flex items-center justify-center mb-3">
            <Braces className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-[13px] font-medium">No variables yet</p>
          <p className="text-[11.5px] text-muted-foreground mt-1 max-w-sm mx-auto">
            Add common values like client name, company, deal value, or start date.
          </p>
          <Button size="sm" onClick={addVariable} className="mt-4 h-9 rounded-lg gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Add variable
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {variables.map((v) => {
              const meta = variableTypeMeta(v.type);
              const Icon = meta.icon;
              return (
                <div
                  key={v.name}
                  className="group rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <Input
                      value={v.label}
                      onChange={(e) => updateVariable(v.name, { label: e.target.value })}
                      placeholder="Label (e.g. Client name)"
                      className="h-9 bg-background/60 flex-1 min-w-[160px] text-[13px]"
                    />
                    <Select
                      value={v.type}
                      onValueChange={(t) =>
                        updateVariable(v.name, { type: t as SignVariableType })
                      }
                    >
                      <SelectTrigger className="h-9 w-[130px] bg-background/60 text-[12px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {VARIABLE_TYPES.map((t) => {
                          const I = t.icon;
                          return (
                            <SelectItem key={t.value} value={t.value}>
                              <span className="inline-flex items-center gap-2">
                                <I className="w-3.5 h-3.5" />
                                {t.label}
                              </span>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <Input
                      value={v.defaultValue ?? ""}
                      onChange={(e) => updateVariable(v.name, { defaultValue: e.target.value })}
                      placeholder="Example value"
                      className="h-9 bg-background/60 w-[160px] text-[12.5px]"
                    />
                    <label className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground select-none cursor-pointer">
                      <Switch
                        checked={!!v.required}
                        onCheckedChange={(c) => updateVariable(v.name, { required: c })}
                      />
                      Required
                    </label>
                    <button
                      onClick={() => removeVariable(v.name)}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-2 pl-10 text-[10.5px] text-muted-foreground font-mono">
                    {v.pattern}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={addVariable}
            className="w-full rounded-2xl border border-dashed border-border/60 px-4 py-3 text-[12.5px] text-muted-foreground hover:text-foreground hover:border-border transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add another variable
          </button>
        </>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 4 — FIELDS (signing fields placed on the document)
 * ────────────────────────────────────────────────────────── */

function StepFields({
  documents,
  activeDocId,
  setActiveDocId,
  page,
  setPage,
  pageCount,
  roles,
  fields,
  docFields,
  pageFields,
  activeRoleKey,
  setActiveRoleKey,
  activeTool,
  setActiveTool,
  placeField,
  removeField,
  selectedFieldId,
  setSelectedFieldId,
  pageRef,
}: {
  documents: BuilderDoc[];
  activeDocId: string;
  setActiveDocId: (id: string) => void;
  page: number;
  setPage: (n: number | ((p: number) => number)) => void;
  pageCount: number;
  roles: SignTemplateRole[];
  fields: SignTemplateField[];
  docFields: SignTemplateField[];
  pageFields: SignTemplateField[];
  activeRoleKey: string;
  setActiveRoleKey: (k: string) => void;
  activeTool: (typeof FIELD_TOOLS)[number];
  setActiveTool: (t: (typeof FIELD_TOOLS)[number]) => void;
  placeField: (e: React.MouseEvent<HTMLDivElement>) => void;
  removeField: (id: string) => void;
  selectedFieldId: string | null;
  setSelectedFieldId: (id: string | null) => void;
  pageRef: React.RefObject<HTMLDivElement>;
}) {
  const activeRole = roles.find((r) => r.key === activeRoleKey);
  const activeMeta = getRoleTypeMeta(activeRole?.type);
  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  return (
    <div className="space-y-3">
      <SectionTitle
        title="Place signing fields"
        sub="Pick a role, pick a field, then click on the document to drop it. Selected field deletes with backspace."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 min-h-[560px]">
        {/* Sidebar */}
        <div className="rounded-2xl border border-border/50 bg-card/40 p-4 space-y-4 h-fit lg:sticky lg:top-4">
          {documents.length > 1 && (
            <div>
              <MicroLabel icon={Layers} text="Document" />
              <div className="space-y-1">
                {documents.map((d, i) => {
                  const active = d.id === activeDocId;
                  const count = fields.filter(
                    (f) => (f.documentId ?? documents[0].id) === d.id,
                  ).length;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setActiveDocId(d.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-colors text-left",
                        active
                          ? "border-primary/30 bg-primary/5"
                          : "border-transparent hover:bg-muted/30",
                      )}
                    >
                      <span className="w-5 h-5 rounded-md bg-muted/40 text-[10px] font-semibold text-muted-foreground inline-flex items-center justify-center tabular-nums shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[12px] font-medium truncate flex-1">{d.name}</span>
                      <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <MicroLabel text="Assign field to role" />
            <div className="space-y-1">
              {roles.map((r) => {
                const active = r.key === activeRoleKey;
                const count = fields.filter((f) => f.roleKey === r.key).length;
                const meta = getRoleTypeMeta(r.type);
                const RoleIcon = meta.icon;
                return (
                  <button
                    key={r.key}
                    onClick={() => setActiveRoleKey(r.key)}
                    className={cn(
                      "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg border transition-colors text-left",
                      active
                        ? "border-primary/30 bg-primary/5"
                        : "border-transparent hover:bg-muted/30",
                    )}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ background: r.color }}
                    />
                    <span className="text-[12px] font-medium truncate flex-1">{r.label}</span>
                    <RoleIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <MicroLabel text="Field type" />
            {activeMeta.allowedFields !== "all" && activeMeta.allowedFields.length === 0 ? (
              <div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-3 text-[11px] text-muted-foreground leading-relaxed">
                <activeMeta.icon className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                {activeMeta.label}s don't fill fields — they just
                {activeMeta.value === "viewer" ? " review the document." : " receive a copy."}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-1.5">
                {FIELD_TOOLS.map((t) => {
                  const Icon = t.icon;
                  const active = activeTool.kind === t.kind;
                  const allowed = roleAllows(activeRole?.type, t.kind);
                  return (
                    <button
                      key={t.label}
                      onClick={() => allowed && setActiveTool(t)}
                      disabled={!allowed}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-2 rounded-lg border transition-colors text-left",
                        active
                          ? "border-primary/30 bg-primary/5 text-primary"
                          : "border-border/50 bg-card/30 hover:bg-card/60 text-foreground/80",
                        !allowed && "opacity-40 cursor-not-allowed hover:bg-card/30",
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-medium">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2.5 text-[11px] text-muted-foreground leading-relaxed">
            Tip: click any placed field to select, then press backspace to remove.
          </div>
        </div>

        {/* Canvas */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, (typeof p === "number" ? p : 1) - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[12px] text-muted-foreground">
                {documents.length > 1 && activeDoc && (
                  <>
                    <span className="text-foreground/85 font-medium truncate inline-block max-w-[160px] align-bottom">
                      {activeDoc.name}
                    </span>{" "}
                    ·{" "}
                  </>
                )}
                Page <span className="text-foreground font-medium">{page}</span> of {pageCount}
              </span>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pageCount, (typeof p === "number" ? p : 1) + 1))
                }
                disabled={page === pageCount}
                className="p-1.5 rounded-md hover:bg-accent disabled:opacity-30"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {documents.length > 1
                ? `${docFields.length} on this doc · ${fields.length} total`
                : `${fields.length} field${fields.length === 1 ? "" : "s"} total`}
            </span>
          </div>

          <div className="rounded-2xl border border-border/40 bg-muted/10 p-6 flex justify-center">
            <div
              ref={pageRef}
              onClick={(e) => {
                setSelectedFieldId(null);
                placeField(e);
              }}
              className="relative bg-background rounded-md shadow-xl border border-border/40 w-full max-w-[640px] aspect-[1/1.3] cursor-crosshair"
            >
              <div className="absolute inset-0 p-10 space-y-3 pointer-events-none">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 bg-muted/60 rounded"
                    style={{ width: `${50 + ((i * 7) % 50)}%` }}
                  />
                ))}
              </div>

              {pageFields.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none">
                  <Move className="w-5 h-5 text-muted-foreground/50 mb-2" />
                  <p className="text-[12px] text-muted-foreground">
                    Click to place a {activeTool.label.toLowerCase()} for {activeRole?.label}
                  </p>
                </div>
              )}

              {pageFields.map((f) => {
                const role = roles.find((r) => r.key === f.roleKey);
                const tool = FIELD_TOOLS.find((t) => t.kind === f.type) ?? FIELD_TOOLS[0];
                const Icon = tool.icon;
                const selected = selectedFieldId === f.id;
                return (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFieldId(f.id);
                    }}
                    style={{
                      left: `${f.x}%`,
                      top: `${f.y}%`,
                      width: `${f.width}%`,
                      height: `${f.height}%`,
                      minHeight: 26,
                      minWidth: 50,
                      borderColor: role?.color,
                      background: `${role?.color}22`,
                      boxShadow: selected ? `0 0 0 2px ${role?.color}` : undefined,
                    }}
                    className="absolute group rounded-md border-2 flex items-center gap-1 px-1.5 cursor-pointer"
                  >
                    <span className="shrink-0" style={{ color: role?.color }}>
                      <Icon className="w-3 h-3" />
                    </span>
                    <span
                      className="text-[10px] font-medium truncate"
                      style={{ color: role?.color }}
                    >
                      {tool.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeField(f.id);
                      }}
                      className="ml-auto opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 text-destructive transition"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 5 — DELIVERY & AUTOMATION
 * ────────────────────────────────────────────────────────── */

function StepDelivery({
  delivery,
  setDelivery,
  automation,
  setAutomation,
}: {
  delivery: SignTemplateDelivery;
  setDelivery: React.Dispatch<React.SetStateAction<SignTemplateDelivery>>;
  automation: SignTemplateAutomation;
  setAutomation: React.Dispatch<React.SetStateAction<SignTemplateAutomation>>;
}) {
  const [ccInput, setCcInput] = useState("");
  return (
    <div className="space-y-5">
      <SectionTitle
        title="Delivery & automation"
        sub="How the email looks, when it expires, and how reminders are sent."
      />

      {/* Delivery card */}
      <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold">Delivery</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldLabel text="Email subject">
            <Input
              value={delivery.emailSubject ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, emailSubject: e.target.value }))}
              placeholder="Please sign: {{COMPANY_NAME}}"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
          <FieldLabel text="Branded sender name">
            <Input
              value={delivery.senderName ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, senderName: e.target.value }))}
              placeholder="Acme Studio"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
        </div>

        <FieldLabel text="Custom message">
          <Textarea
            value={delivery.emailMessage ?? ""}
            onChange={(e) => setDelivery((d) => ({ ...d, emailMessage: e.target.value }))}
            placeholder="Add a personal note. Variables like {{CLIENT_NAME}} are filled in automatically."
            className="bg-background/60 text-[13px] min-h-[100px]"
          />
        </FieldLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldLabel text="Expires after">
            <div className="relative">
              <Input
                type="number"
                min={1}
                max={365}
                value={delivery.expiryDays ?? 14}
                onChange={(e) =>
                  setDelivery((d) => ({ ...d, expiryDays: Number(e.target.value) || 1 }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Redirect after signing">
            <Input
              value={delivery.redirectUrl ?? ""}
              onChange={(e) => setDelivery((d) => ({ ...d, redirectUrl: e.target.value }))}
              placeholder="https://acme.com/thanks"
              className="h-9 bg-background/60 text-[13px]"
            />
          </FieldLabel>
        </div>

        <FieldLabel text="CC recipients">
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/50 bg-background/60 px-2 py-1.5 min-h-[36px]">
            {(delivery.ccEmails ?? []).map((email) => (
              <span
                key={email}
                className="inline-flex items-center gap-1 h-6 pl-2 pr-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium"
              >
                {email}
                <button
                  onClick={() =>
                    setDelivery((d) => ({
                      ...d,
                      ccEmails: (d.ccEmails ?? []).filter((e) => e !== email),
                    }))
                  }
                  className="p-0.5 rounded hover:bg-primary/20"
                >
                  <Trash2 className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            <input
              value={ccInput}
              onChange={(e) => setCcInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === ",") && ccInput.trim()) {
                  e.preventDefault();
                  const email = ccInput.trim().replace(/,$/, "");
                  if (/.+@.+\..+/.test(email)) {
                    setDelivery((d) => ({
                      ...d,
                      ccEmails: Array.from(new Set([...(d.ccEmails ?? []), email])),
                    }));
                    setCcInput("");
                  } else {
                    toast.error("Enter a valid email address.");
                  }
                }
              }}
              placeholder={
                (delivery.ccEmails ?? []).length === 0 ? "name@company.com" : ""
              }
              className="flex-1 min-w-[140px] bg-transparent outline-none text-[12.5px] py-1"
            />
          </div>
        </FieldLabel>

        <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
          <Switch
            checked={!!delivery.allowDownload}
            onCheckedChange={(c) => setDelivery((d) => ({ ...d, allowDownload: c }))}
          />
          Allow recipients to download the signed document
        </label>
      </div>

      {/* Automation card */}
      <div className="rounded-2xl border border-border/50 bg-card/30 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" />
          <h3 className="text-[13px] font-semibold">Automation</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <FieldLabel text="Reminder every">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.remindEveryDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({ ...a, remindEveryDays: Number(e.target.value) || 0 }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Expiry warning">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.expiryWarningDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({
                    ...a,
                    expiryWarningDays: Number(e.target.value) || 0,
                  }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days before
              </span>
            </div>
          </FieldLabel>
          <FieldLabel text="Escalate after">
            <div className="relative">
              <Input
                type="number"
                min={0}
                value={automation.escalateAfterDays ?? 0}
                onChange={(e) =>
                  setAutomation((a) => ({
                    ...a,
                    escalateAfterDays: Number(e.target.value) || 0,
                  }))
                }
                className="h-9 bg-background/60 text-[13px] pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground">
                days
              </span>
            </div>
          </FieldLabel>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
            <Switch
              checked={!!automation.notifyOnOpen}
              onCheckedChange={(c) => setAutomation((a) => ({ ...a, notifyOnOpen: c }))}
            />
            Notify me when opened
          </label>
          <label className="inline-flex items-center gap-2 text-[12px] text-foreground/80 cursor-pointer">
            <Switch
              checked={!!automation.notifyOnComplete}
              onCheckedChange={(c) => setAutomation((a) => ({ ...a, notifyOnComplete: c }))}
            />
            Notify me when completed
          </label>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 6 — REVIEW & SAVE
 * ────────────────────────────────────────────────────────── */

function StepReview({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  documents,
  roles,
  variables,
  fields,
  delivery,
  automation,
  filenamePattern,
  setFilenamePattern,
  previewMode,
  setPreviewMode,
}: {
  name: string;
  setName: (s: string) => void;
  description: string;
  setDescription: (s: string) => void;
  category: string;
  setCategory: (s: string) => void;
  documents: BuilderDoc[];
  roles: SignTemplateRole[];
  variables: SignTemplateVariable[];
  fields: SignTemplateField[];
  delivery: SignTemplateDelivery;
  automation: SignTemplateAutomation;
  filenamePattern: string;
  setFilenamePattern: (s: string) => void;
  previewMode: "sender" | "recipient" | "email" | "filename";
  setPreviewMode: (m: "sender" | "recipient" | "email" | "filename") => void;
}) {
  // Synthesize example values from variable defaults / labels
  const sample = useMemo(() => {
    const obj: Record<string, string> = { TEMPLATE_NAME: name || "Template" };
    variables.forEach((v) => {
      obj[v.name] = v.defaultValue || `[${v.label}]`;
    });
    return obj;
  }, [variables, name]);

  const previewSubject = applyTemplateVariables(delivery.emailSubject ?? "", sample);
  const previewMessage = applyTemplateVariables(delivery.emailMessage ?? "", sample);
  const previewFilename = applyTemplateVariables(filenamePattern, sample);

  const tabs: { key: typeof previewMode; label: string }[] = [
    { key: "sender", label: "Sender preview" },
    { key: "recipient", label: "Recipient preview" },
    { key: "email", label: "Email" },
    { key: "filename", label: "Final PDF" },
  ];

  return (
    <div className="space-y-5">
      <SectionTitle
        title="Review & save"
        sub="Name your template, set the output filename, and preview how it'll look."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        {/* Left: meta + filename */}
        <div className="space-y-4">
          <FieldLabel text="Template name">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Agency Client Agreement"
              className="h-10 bg-background/60"
            />
          </FieldLabel>

          <FieldLabel text="Description (optional)">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this template is for, who uses it."
              className="bg-background/60 text-[13px] min-h-[70px]"
            />
          </FieldLabel>

          <div className="grid grid-cols-2 gap-3">
            <FieldLabel text="Category">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 bg-background/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldLabel>
            <FieldLabel text="Output filename">
              <Input
                value={filenamePattern}
                onChange={(e) => setFilenamePattern(e.target.value)}
                placeholder="{{COMPANY_NAME}} - NDA - Signed.pdf"
                className="h-10 bg-background/60 font-mono text-[12.5px]"
              />
            </FieldLabel>
          </div>

          {variables.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card/30 px-3 py-2.5">
              <div className="text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                Available tokens
              </div>
              <div className="flex flex-wrap gap-1.5">
                {variables.map((v) => (
                  <button
                    key={v.name}
                    onClick={() =>
                      setFilenamePattern((filenamePattern + ` ${v.pattern}`).trim())
                    }
                    className="text-[10.5px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {v.pattern}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Summary grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <SummaryStat label="Files" value={documents.length} icon={FileStack} />
            <SummaryStat label="Roles" value={roles.length} icon={UserIcon} />
            <SummaryStat label="Variables" value={variables.length} icon={Braces} />
            <SummaryStat label="Fields" value={fields.length} icon={PenTool} />
          </div>
        </div>

        {/* Right: preview */}
        <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
          <div className="flex border-b border-border/40 bg-muted/20">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setPreviewMode(t.key)}
                className={cn(
                  "flex-1 px-2 py-2 text-[11px] font-medium transition-colors",
                  previewMode === t.key
                    ? "text-primary bg-background/60 border-b-2 border-primary -mb-px"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4 min-h-[280px] text-[12.5px] leading-relaxed">
            {previewMode === "sender" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  What you'll see when launching
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 space-y-2">
                  {variables.length === 0 && (
                    <p className="text-muted-foreground italic">
                      No variables to fill. Recipients can be added and document sent immediately.
                    </p>
                  )}
                  {variables.map((v) => (
                    <div key={v.name} className="flex items-baseline justify-between gap-3">
                      <span className="text-muted-foreground text-[11px]">{v.label}</span>
                      <span className="font-medium truncate">
                        {v.defaultValue || `[${v.label}]`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {previewMode === "recipient" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  What signers will experience
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 space-y-2">
                  <div className="text-[12px]">
                    <span className="font-medium">{roles[0]?.label ?? "Signer"}</span> signs first
                    {roles.length > 1 && `, then ${roles.slice(1).map((r) => r.label).join(", ")}`}.
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    {fields.filter((f) => f.type === "signature").length} signature
                    {fields.filter((f) => f.type === "signature").length === 1 ? "" : "s"} ·{" "}
                    {fields.length} total field{fields.length === 1 ? "" : "s"} across{" "}
                    {documents.length} document{documents.length === 1 ? "" : "s"}.
                  </div>
                  <div className="text-[11.5px] text-muted-foreground">
                    Expires after {delivery.expiryDays ?? 14} days
                    {automation.remindEveryDays
                      ? `, reminders every ${automation.remindEveryDays} day${automation.remindEveryDays === 1 ? "" : "s"}.`
                      : "."}
                  </div>
                </div>
              </div>
            )}

            {previewMode === "email" && (
              <div className="rounded-lg border border-border/40 bg-background/80 overflow-hidden">
                <div className="border-b border-border/40 px-3 py-2 bg-muted/20 text-[11px] text-muted-foreground space-y-0.5">
                  <div>
                    <span className="font-medium text-foreground/80">From: </span>
                    {delivery.senderName || "You"} via Docsora
                  </div>
                  <div>
                    <span className="font-medium text-foreground/80">Subject: </span>
                    {previewSubject || <span className="italic">No subject</span>}
                  </div>
                </div>
                <div className="p-3 whitespace-pre-wrap text-[12.5px] text-foreground/85">
                  {previewMessage || (
                    <span className="italic text-muted-foreground">No message</span>
                  )}
                  <div className="mt-3 pt-3 border-t border-border/30 inline-flex items-center gap-1.5 text-primary text-[12px] font-medium">
                    <Send className="w-3 h-3" /> Review & sign
                  </div>
                </div>
              </div>
            )}

            {previewMode === "filename" && (
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Signed PDF will be saved as
                </div>
                <div className="rounded-lg border border-border/40 bg-background/60 p-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-mono text-[12.5px] truncate">
                    {previewFilename || filenamePattern}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Personalization variables are filled in automatically before sending.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Small UI primitives
 * ────────────────────────────────────────────────────────── */

function SectionTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold tracking-tight">{title}</h2>
      <p className="text-[12.5px] text-muted-foreground mt-1 max-w-2xl leading-relaxed">{sub}</p>
    </div>
  );
}

function FieldLabel({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[10.5px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
        {text}
      </span>
      {children}
    </label>
  );
}

function MicroLabel({
  text,
  icon: Icon,
}: {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="text-[10.5px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 inline-flex items-center gap-1.5">
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </div>
  );
}

function SummaryStat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-muted-foreground font-semibold">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-[18px] font-semibold tabular-nums mt-0.5">{value}</div>
    </div>
  );
}
