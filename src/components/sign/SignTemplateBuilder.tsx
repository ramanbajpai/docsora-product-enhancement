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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  detectTemplateVariables,
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
  { key: "rolesfields", label: "People & Fields", sub: "Who does what" },
  { key: "review", label: "Launch Experience", sub: "How it launches" },
];

const ROLE_COLORS = ["#3b82f6", "#a78bfa", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
const MYSELF_KEY = "_myself";
const MYSELF_COLOR = "#0ea5e9";
const MAX_ROLES = 6;
const MAX_ROLE_NAME = 20;

const isMyself = (key: string) => key === MYSELF_KEY;

const nextRoleColor = (taken: string[]) => {
  const remaining = ROLE_COLORS.filter((c) => !taken.includes(c));
  return remaining[0] ?? ROLE_COLORS[taken.length % ROLE_COLORS.length];
};

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

const TAG_VARIABLE_SUGGESTIONS: Record<SignDocumentTag, { name: string; label: string; type: SignVariableType }[]> = {
  agreement: [
    { name: "CLIENT_NAME", label: "Client name", type: "text" },
    { name: "COMPANY_NAME", label: "Company name", type: "company" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "DEAL_VALUE", label: "Deal value", type: "currency" },
  ],
  nda: [
    { name: "DISCLOSING_PARTY", label: "Disclosing party", type: "company" },
    { name: "RECEIVING_PARTY", label: "Receiving party", type: "company" },
    { name: "EFFECTIVE_DATE", label: "Effective date", type: "date" },
  ],
  pricing: [
    { name: "TOTAL_AMOUNT", label: "Total amount", type: "currency" },
    { name: "VALID_UNTIL", label: "Valid until", type: "date" },
  ],
  scope: [
    { name: "PROJECT_NAME", label: "Project name", type: "text" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "END_DATE", label: "End date", type: "date" },
  ],
  annexure: [
    { name: "REFERENCE_NUMBER", label: "Reference number", type: "text" },
  ],
  onboarding: [
    { name: "EMPLOYEE_NAME", label: "Employee name", type: "text" },
    { name: "EMPLOYEE_EMAIL", label: "Employee email", type: "email" },
    { name: "DEPARTMENT", label: "Department", type: "text" },
    { name: "START_DATE", label: "Start date", type: "date" },
    { name: "SALARY", label: "Salary", type: "currency" },
  ],
  other: [],
};

export default function SignTemplateBuilder({ onBack, onSaved }: SignTemplateBuilderProps) {
  const { save, templates: existingTemplates } = useSignTemplates();
  const [step, setStep] = useState<StepKey>("upload");

  // Files & meta
  const [documents, setDocuments] = useState<BuilderDoc[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Client");
  const [packageTitle, setPackageTitle] = useState<string>("");

  // Roles
  const [signingMode, setSigningMode] = useState<"sequential" | "parallel">("parallel");
  const [signSelf, setSignSelf] = useState(false);
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
    if (roles.length >= MAX_ROLES) return;
    const idx = roles.length;
    const key = `role-${uid()}`;
    const type: SignRoleType = "signer";
    setRoles((r) => [
      ...r,
      {
        key,
        label: `Signer ${idx + 1}`,
        color: nextRoleColor(r.map((x) => x.color)),
        signingOrder: idx + 1,
        type,
        permissions: getRoleTypeMeta(type).defaultPermissions,
      },
    ]);
  };
  const updateRole = (key: string, patch: Partial<SignTemplateRole>) => {
    if (isMyself(key)) {
      // Myself is locked except for color (cannot rename / change type / reorder)
      const allowed: Partial<SignTemplateRole> = {};
      if (patch.color) allowed.color = patch.color;
      if (Object.keys(allowed).length === 0) return;
      patch = allowed;
    }
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
  };
  const togglePermission = (key: string, perm: SignRolePermission) => {
    if (isMyself(key)) return;
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
    if (isMyself(key)) return;
    if (roles.length <= 1) {
      toast.error("At least one role is required to proceed.");
      return;
    }
    const hasFields = fields.some((f) => f.roleKey === key);
    if (hasFields) {
      const ok = window.confirm(
        "Deleting this role will also remove all fields assigned to it. This cannot be undone. Continue?",
      );
      if (!ok) return;
    }
    setRoles((rs) => rs.filter((r) => r.key !== key));
    setFields((fs) => fs.filter((f) => f.roleKey !== key));
    if (activeRoleKey === key) setActiveRoleKey(roles.find((r) => r.key !== key)!.key);
  };
  const moveRole = (key: string, dir: -1 | 1) => {
    if (isMyself(key)) return;
    setRoles((rs) => {
      const i = rs.findIndex((r) => r.key === key);
      const j = i + dir;
      // Cannot swap into the Myself slot (index 0 when present)
      if (i < 0 || j < 0 || j >= rs.length) return rs;
      if (isMyself(rs[j].key)) return rs;
      const next = rs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next.map((r, idx) => ({ ...r, signingOrder: idx + 1 }));
    });
  };

  const toggleSignSelf = (on: boolean) => {
    if (on) {
      if (roles.some((r) => isMyself(r.key))) return;
      const myself: SignTemplateRole = {
        key: MYSELF_KEY,
        label: "Myself",
        color: MYSELF_COLOR,
        signingOrder: 1,
        type: "signer",
        permissions: getRoleTypeMeta("signer").defaultPermissions,
      };
      setRoles((rs) => [myself, ...rs.filter((r) => !isMyself(r.key))].map((r, i) => ({ ...r, signingOrder: i + 1 })));
      setSignSelf(true);
    } else {
      const hasFields = fields.some((f) => f.roleKey === MYSELF_KEY);
      if (hasFields) {
        const ok = window.confirm(
          "Turning this off will remove all fields you've placed for yourself. Continue?",
        );
        if (!ok) return;
      }
      setRoles((rs) => rs.filter((r) => !isMyself(r.key)).map((r, i) => ({ ...r, signingOrder: i + 1 })));
      setFields((fs) => fs.filter((f) => f.roleKey !== MYSELF_KEY));
      if (activeRoleKey === MYSELF_KEY) {
        const fallback = roles.find((r) => !isMyself(r.key));
        if (fallback) setActiveRoleKey(fallback.key);
      }
      setSignSelf(false);
    }
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
  const nameTrimmed = name.trim();
  const nameIsUnique = !existingTemplates.some(
    (t) => t.name.trim().toLowerCase() === nameTrimmed.toLowerCase(),
  );
  const roleLabels = roles.map((r) => r.label.trim().toLowerCase());
  const rolesHaveDuplicates = roleLabels.some(
    (l, i) => l && roleLabels.indexOf(l) !== i,
  );
  const rolesAllNamed = roles.every(
    (r) => r.label.trim().length > 0 && r.label.length <= MAX_ROLE_NAME,
  );
  const stepValid: Record<StepKey, boolean> = {
    upload: documents.length >= 1,
    configure:
      nameTrimmed.length > 0 &&
      nameTrimmed.length <= 100 &&
      nameIsUnique &&
      documents.length >= 1 &&
      documents.every((d) => d.name.trim().length > 0 && d.name.length <= 100),
    rolesfields:
      roles.length >= 1 && rolesAllNamed && !rolesHaveDuplicates,
    review: nameTrimmed.length > 0 && filenamePattern.trim().length > 0,
  };

  const goNext = () => {
    const idx = STEPS.findIndex((s) => s.key === step);
    if (!stepValid[step]) {
      const m: Record<StepKey, string> = {
        upload: "Add at least one file.",
        configure: !nameTrimmed
          ? "Please enter a name for this template."
          : !nameIsUnique
            ? "A template with this name already exists. Please choose a different name."
            : "Each document needs a name.",
        rolesfields:
          rolesHaveDuplicates
            ? "Two roles share the same name. Please make each role name unique."
            : !rolesAllNamed
              ? "Each role needs a name (max 20 characters)."
              : "Please add at least one role before continuing.",
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

  const nextHint: Record<StepKey, string> = {
    upload: "Next: configure variables & delivery",
    configure: "Next: roles & signing fields",
    rolesfields: "Next: launch experience",
    review: "Save template",
  };

  return (
    <div className="px-6 md:px-10 py-8 pb-32 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => {
            const hasProgress =
              documents.length > 0 || name.trim().length > 0 || fields.length > 0;
            if (
              !hasProgress ||
              window.confirm(
                "Discard this template? Your progress will be lost.",
              )
            ) {
              onBack();
            }
          }}
          className="inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-5"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Back to templates
        </button>
        <h1 className="text-2xl md:text-[32px] leading-[1.1] font-semibold tracking-tight">
          Configure once. Launch infinitely.
        </h1>

        {/* Stepper — premium operational */}
        <div className="mt-8 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/50" />
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/60 via-primary to-primary/60"
            initial={false}
            animate={{
              width: `${(currentIdx / (STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="relative flex items-center justify-between">
            {STEPS.map((s, i) => {
              const active = s.key === step;
              const done = i < currentIdx;
              const reachable = i <= currentIdx || stepValid[STEPS[i - 1]?.key];
              return (
                <button
                  key={s.key}
                  onClick={() => reachable && setStep(s.key)}
                  disabled={!reachable}
                  className={cn(
                    "group flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full transition-all bg-background",
                    active && "ring-1 ring-primary/25 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.4)]",
                    !active && !done && "opacity-60",
                  )}
                >
                  <span
                    className={cn(
                      "relative w-6 h-6 rounded-full inline-flex items-center justify-center text-[11px] font-semibold tabular-nums transition-all",
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-primary/15 text-primary"
                          : "bg-muted text-muted-foreground border border-border/60",
                    )}
                  >
                    {active && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    {done ? <Check className="w-3 h-3" /> : i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[12.5px] font-medium hidden sm:inline tracking-tight",
                      active ? "text-foreground" : done ? "text-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
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
            <StepConfigure
              name={name}
              setName={setName}
              nameIsUnique={nameIsUnique}
              documents={documents}
              updateDocument={updateDocument}
              removeDocument={removeDocument}
              moveDocument={moveDocument}
              addDocuments={addDocuments}
              signingMode={signingMode}
              setSigningMode={setSigningMode}
              variables={variables}
              roles={roles}
            />
          )}

          {step === "rolesfields" && (
            <StepRolesFields
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
              addRole={addRole}
              updateRole={updateRole}
              removeRole={removeRole}
              moveRole={moveRole}
              togglePermission={togglePermission}
              signingMode={signingMode}
              setSigningMode={setSigningMode}
              signSelf={signSelf}
              toggleSignSelf={toggleSignSelf}
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
          )}

          {step === "review" && (
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
              <div className="border-t border-border/40" />
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
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer nav — sticky glass bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto border-t border-border/50 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (currentIdx === 0 ? onBack() : goBack())}
              className="h-9"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              {currentIdx === 0 ? "Cancel" : "Back"}
            </Button>

            <div className="hidden md:flex flex-col items-center text-center">
              <div className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/80 font-medium">
                Step {currentIdx + 1} of {STEPS.length}
              </div>
              <div className="text-[12px] text-foreground/80 tabular-nums mt-0.5">
                {nextHint[step]}
              </div>
            </div>

            {step === "review" ? (
              <Button
                onClick={handleSave}
                disabled={!canSave}
                className="h-10 px-5 gap-1.5 rounded-xl shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_14px_36px_-10px_hsl(var(--primary)/0.7)] hover:-translate-y-px transition-all"
              >
                <Check className="w-3.5 h-3.5" />
                Save template
              </Button>
            ) : (
              <Button
                onClick={goNext}
                disabled={!stepValid[step]}
                className="h-10 px-5 gap-1.5 rounded-xl shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] hover:shadow-[0_14px_36px_-10px_hsl(var(--primary)/0.75)] hover:-translate-y-px transition-all"
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
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
  const handlePicked = (e: React.ChangeEvent<HTMLInputElement>, ref: React.RefObject<HTMLInputElement>) => {
    const fs = Array.from(e.target.files ?? []);
    if (fs.length) addDocuments(fs);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Upload your files"
        sub="PDF, DOCX, DOC, ODT. Drop multiple files — they'll be sent together as one signing session."
      />

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.odt"
        className="hidden"
        onChange={(e) => handlePicked(e, fileInputRef)}
      />
      <input
        ref={addMoreInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.odt"
        className="hidden"
        onChange={(e) => handlePicked(e, addMoreInputRef)}
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
          className="group relative rounded-2xl border border-dashed border-border/60 bg-gradient-to-b from-card/40 to-card/20 hover:from-card/60 hover:to-card/30 hover:border-primary/40 transition-all cursor-pointer px-6 py-20 text-center overflow-hidden"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div className="relative w-14 h-14 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 ring-1 ring-primary/15 shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.4)]">
            <UploadIcon className="w-6 h-6 text-primary" strokeWidth={2} />
          </div>
          <p className="relative text-[14px] font-medium">Drag &amp; drop your files, or click to browse</p>
          <p className="relative text-[12px] text-muted-foreground mt-1">
            Supports PDF, DOCX, DOC, ODT · up to 20MB per file
          </p>
          <Button size="sm" className="relative mt-5 h-9 rounded-lg" type="button">
            Choose files
          </Button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Operational summary bar */}
          <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center">
                <FileStack className="w-3.5 h-3.5 text-primary" />
              </div>
              <div>
                <div className="text-[12.5px] font-semibold tabular-nums leading-tight">
                  {documents.length} file{documents.length === 1 ? "" : "s"} ready
                </div>
                <div className="text-[10.5px] text-muted-foreground leading-tight mt-0.5">
                  Grouped into one signing flow
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live package
            </div>
          </div>

          {/* File grid + integrated add tile */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const fs = Array.from(e.dataTransfer.files ?? []);
              if (fs.length) addDocuments(fs);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {documents.map((d, i) => (
              <motion.div
                key={d.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                whileHover={{ y: -2 }}
                className="group relative rounded-2xl border border-border/50 bg-gradient-to-b from-card/70 to-card/40 hover:border-primary/30 transition-all p-3.5 flex items-center gap-3 shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_8px_24px_-16px_hsl(var(--foreground)/0.18)] hover:shadow-[0_1px_0_0_hsl(var(--foreground)/0.04),0_16px_36px_-18px_hsl(var(--foreground)/0.25)]"
              >
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                >
                  <GripVertical className="w-3.5 h-3.5 text-muted-foreground/60" />
                </button>
                <div className="w-11 h-13 rounded-lg bg-gradient-to-b from-background to-muted/50 border border-border/50 shrink-0 flex flex-col items-center justify-center text-[8.5px] font-semibold text-muted-foreground py-1.5 px-1 shadow-inner">
                  <FileText className="w-4 h-4 text-primary/80 mb-1" />
                  {d.name.split(".").pop()?.toUpperCase().slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <Input
                    value={d.name}
                    onChange={(e) => updateDocument(d.id, { name: e.target.value })}
                    className="h-8 px-2 bg-background/60 text-[12.5px] font-medium border-border/50 focus:border-primary/40"
                  />
                  <div className="flex items-center gap-2 mt-1.5 text-[10.5px] text-muted-foreground">
                    <span className="tabular-nums">{d.pageCount} pages</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <Check className="w-2.5 h-2.5" /> Uploaded
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-0.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
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
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition opacity-0 group-hover:opacity-100"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}

            {/* Integrated add-another tile */}
            <button
              onClick={() => addMoreInputRef.current?.click()}
              className="group relative rounded-2xl border border-dashed border-border/60 hover:border-primary/40 bg-card/20 hover:bg-card/40 transition-all p-3.5 flex items-center gap-3 min-h-[76px] text-left overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.07),transparent_60%)]" />
              <div className="relative w-11 h-13 rounded-lg bg-primary/8 border border-dashed border-primary/30 shrink-0 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="text-[12.5px] font-semibold text-foreground/90">Add another file</div>
                <div className="text-[10.5px] text-muted-foreground mt-0.5">
                  Drop here or click to browse
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 2 — CONFIGURE (template name + documents + signing order)
 * ────────────────────────────────────────────────────────── */

function StepConfigure({
  name,
  setName,
  nameIsUnique,
  documents,
  updateDocument,
  removeDocument,
  moveDocument,
  addDocuments,
  signingMode,
  setSigningMode,
  variables,
  roles,
}: {
  name: string;
  setName: (s: string) => void;
  nameIsUnique: boolean;
  documents: BuilderDoc[];
  updateDocument: (id: string, p: Partial<BuilderDoc>) => void;
  removeDocument: (id: string) => void;
  moveDocument: (id: string, dir: -1 | 1) => void;
  addDocuments: (files: File[]) => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  variables: SignTemplateVariable[];
  roles: SignTemplateRole[];
}) {
  const addInputRef = useRef<HTMLInputElement>(null);
  const [openVarFor, setOpenVarFor] = useState<string | null>(null);

  // Tokens available: built-ins + role names + custom variables
  const availableTokens = useMemo(() => {
    const base = [
      { name: "SIGNER_NAME", label: "Signer name" },
      { name: "COMPANY_NAME", label: "Company name" },
      { name: "DATE", label: "Date" },
    ];
    const roleTokens = roles.map((r) => ({
      name: r.label.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, ""),
      label: `${r.label} (role)`,
    }));
    const customTokens = variables.map((v) => ({ name: v.name, label: v.label }));
    const map = new Map<string, { name: string; label: string }>();
    [...base, ...roleTokens, ...customTokens].forEach((t) => {
      if (t.name && !map.has(t.name)) map.set(t.name, t);
    });
    return Array.from(map.values());
  }, [variables, roles]);

  const insertToken = (docId: string, currentValue: string, token: string) => {
    updateDocument(docId, { name: `${currentValue} {{${token}}}`.trim() });
    setOpenVarFor(null);
  };

  const requestDelete = (d: BuilderDoc) => {
    if (documents.length <= 1) {
      toast.error("At least one document is required.");
      return;
    }
    if (window.confirm(`Are you sure you want to remove ${d.name} from this template?`)) {
      removeDocument(d.id);
    }
  };

  const nameTooLong = name.length > 100;
  const showUniqueError = name.trim().length > 0 && !nameIsUnique;

  return (
    <div className="space-y-8">
      <SectionTitle
        title="Configure your template"
        sub="Name it, manage documents and decide how recipients sign."
      />

      {/* Template name */}
      <section className="space-y-2">
        <FieldLabel text="Template name *">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 100))}
            placeholder="e.g. Agency Client Agreement"
            className={cn(
              "h-11 bg-background/60 text-[14px]",
              (showUniqueError || nameTooLong) && "border-destructive/60 focus-visible:ring-destructive/40",
            )}
            maxLength={100}
          />
        </FieldLabel>
        <div className="flex items-center justify-between text-[11px]">
          <span
            className={cn(
              "text-muted-foreground",
              showUniqueError && "text-destructive",
            )}
          >
            {showUniqueError
              ? "A template with this name already exists. Please choose a different name."
              : "Unique within your template library. Max 100 characters."}
          </span>
          <span className="text-muted-foreground tabular-nums">{name.length}/100</span>
        </div>
      </section>

      {/* Documents */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-[14px] font-semibold tracking-tight">Documents</h3>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Rename, reorder or add more. Use {"{{variables}}"} in filenames — they resolve at send time.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addInputRef.current?.click()}
            className="h-9 gap-1.5 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" /> Add document
          </Button>
          <input
            ref={addInputRef}
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

        <div className="space-y-2.5">
          <AnimatePresence initial={false}>
            {documents.map((d, i) => {
              const isLast = documents.length <= 1;
              const hasVar = /\{\{[A-Z0-9_]+\}\}/.test(d.name);
              return (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="group rounded-xl border border-border/50 bg-card/40 hover:bg-card/60 transition-all p-3 flex items-center gap-3"
                >
                  <div className="w-10 h-12 rounded-md bg-gradient-to-b from-background to-muted/40 border border-border/40 shrink-0 flex flex-col items-center justify-center text-[8px] font-semibold text-muted-foreground">
                    <FileText className="w-4 h-4 text-primary/70 mb-0.5" />
                    {d.name.split(".").pop()?.toUpperCase().slice(0, 4)}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Input
                        value={d.name}
                        onChange={(e) =>
                          updateDocument(d.id, { name: e.target.value.slice(0, 100) })
                        }
                        maxLength={100}
                        placeholder="Document name"
                        className="h-9 px-2.5 bg-background/60 text-[13px] font-medium"
                      />
                      <Popover
                        open={openVarFor === d.id}
                        onOpenChange={(o) => setOpenVarFor(o ? d.id : null)}
                      >
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 h-9 px-2.5 rounded-md border border-border/50 bg-background/60 text-[11.5px] font-medium text-foreground/80 hover:text-foreground hover:border-primary/40 transition-colors shrink-0"
                            title="Insert variable"
                          >
                            <Braces className="w-3.5 h-3.5 text-primary" /> Variable
                          </button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-64 p-1.5">
                          <div className="px-2 py-1.5 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground font-semibold">
                            Insert variable
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                            {availableTokens.map((t) => (
                              <button
                                key={t.name}
                                onClick={() => insertToken(d.id, d.name, t.name)}
                                className="w-full text-left px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors flex items-center justify-between gap-2"
                              >
                                <span className="text-[12.5px] font-medium truncate">{t.label}</span>
                                <code className="text-[10.5px] text-muted-foreground font-mono shrink-0">
                                  {`{{${t.name}}}`}
                                </code>
                              </button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                      <span className="tabular-nums">{d.pageCount} pages</span>
                      {hasVar && (
                        <>
                          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/40" />
                          <span className="inline-flex items-center gap-1 text-primary font-medium">
                            <Braces className="w-2.5 h-2.5" /> Resolves at send time
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <button
                      onClick={() => moveDocument(d.id, -1)}
                      disabled={i === 0}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ChevronDown className="w-3 h-3 rotate-180" />
                    </button>
                    <button
                      onClick={() => moveDocument(d.id, 1)}
                      disabled={i === documents.length - 1}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => requestDelete(d)}
                    disabled={isLast}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title={isLast ? "At least one document is required" : "Remove"}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* Signing order */}
      <section className="space-y-2">
        <FieldLabel text="Signing order">
          <div className="grid grid-cols-2 gap-2.5">
            {([
              {
                value: "parallel" as const,
                title: "Parallel",
                sub: "Everyone signs at the same time.",
              },
              {
                value: "sequential" as const,
                title: "Sequential",
                sub: "Recipients sign one after another.",
              },
            ]).map((opt) => {
              const active = signingMode === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSigningMode(opt.value)}
                  className={cn(
                    "text-left rounded-xl border p-3.5 transition-all",
                    active
                      ? "border-primary/50 bg-primary/5 shadow-[0_8px_24px_-14px_hsl(var(--primary)/0.45)]"
                      : "border-border/50 bg-card/30 hover:bg-card/50 hover:border-border",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold">{opt.title}</span>
                    <span
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center",
                        active ? "border-primary bg-primary" : "border-border",
                      )}
                    >
                      {active && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                    </span>
                  </div>
                  <p className="text-[11.5px] text-muted-foreground mt-1 leading-snug">
                    {opt.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </FieldLabel>
        <p className="text-[11px] text-muted-foreground">
          {signingMode === "sequential"
            ? "Step controls will appear on each role in the next step."
            : "All recipients receive the request at the same time."}
        </p>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * STEP 3 — ROLES & FIELDS (unified, cinematic)
 * ────────────────────────────────────────────────────────── */

const REQUIRED_BY_TYPE: Record<SignRoleType, SignFieldType[]> = {
  signer: ["signature"],
  approver: ["signature"],
  viewer: [],
  cc: [],
};
const SUGGESTED_BY_TYPE: Record<SignRoleType, SignFieldType[]> = {
  signer: ["date", "name"],
  approver: ["date"],
  viewer: [],
  cc: [],
};

const PERSON_PRESETS = ["Employee", "Client", "Vendor", "Manager", "HR", "Finance", "Legal"];

const ACTION_OPTIONS: {
  value: SignRoleType;
  label: string;
  helper: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "signer",   label: "Sign & fill",  helper: "Signs and completes assigned fields.",      icon: PenLine },
  { value: "approver", label: "Approve",      helper: "Reviews and approves before it's finalized.", icon: ShieldCheck },
  { value: "viewer",   label: "View only",    helper: "Read-only access. No action required.",      icon: Eye },
  { value: "cc",       label: "Receive copy", helper: "Gets a final copy when signing is complete.", icon: AtSign },
];

const ACTION_VERB: Record<SignRoleType, string> = {
  signer: "Needs to sign",
  approver: "Needs to approve",
  viewer: "View only",
  cc: "Receives a copy",
};

/* Premium left sidebar — “editing as”, participant list with role-type badges, and field tools. */
function RolesFieldsSidebar({
  roles,
  activeRoleKey,
  setActiveRoleKey,
  updateRole,
  removeRole,
  moveRole,
  addRole,
  signingMode,
  setSigningMode,
  signSelf,
  toggleSignSelf,
  activeTool,
  setActiveTool,
  activeRole,
  fields,
}: {
  roles: SignTemplateRole[];
  activeRoleKey: string;
  setActiveRoleKey: (k: string) => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  moveRole: (key: string, dir: -1 | 1) => void;
  addRole: () => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
  activeTool: (typeof FIELD_TOOLS)[number];
  setActiveTool: (t: (typeof FIELD_TOOLS)[number]) => void;
  activeRole: SignTemplateRole | undefined;
  fields: SignTemplateField[];
}) {
  const activeMeta = getRoleTypeMeta(activeRole?.type);
  const ActiveTypeIcon = activeMeta.icon;

  const signatureTools = FIELD_TOOLS.filter((t) =>
    ["signature", "initials", "date"].includes(t.kind),
  );
  const textTools = FIELD_TOOLS.filter((t) => ["name", "text"].includes(t.kind));
  const controlTools = FIELD_TOOLS.filter((t) => ["checkbox"].includes(t.kind));

  const renderTool = (t: (typeof FIELD_TOOLS)[number]) => {
    const Icon = t.icon;
    const allowed = roleAllows(activeRole?.type, t.kind);
    const active = activeTool.kind === t.kind;
    return (
      <button
        key={t.kind}
        onClick={() => allowed && setActiveTool(t)}
        disabled={!allowed}
        className={cn(
          "w-full flex items-center gap-2.5 px-2.5 h-10 rounded-xl border transition-all text-left",
          active
            ? "border-primary/40 bg-primary/[0.08] text-primary shadow-[0_1px_0_0_hsl(var(--background))_inset]"
            : "border-transparent hover:bg-muted/40 text-foreground",
          !allowed && "opacity-30 cursor-not-allowed hover:bg-transparent",
        )}
      >
        <span
          className={cn(
            "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
            active ? "bg-primary/15" : "bg-muted/60",
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </span>
        <span className="text-[12.5px] font-medium">{t.label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-3 lg:sticky lg:top-4 h-fit">
      {/* Fields required from */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
            Fields required from
          </span>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            {roles.length}/{MAX_ROLES}
          </span>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card/30 p-1.5 space-y-0.5">
          {roles.map((r, i) => {
            const active = r.key === activeRoleKey;
            const meta = getRoleTypeMeta(r.type);
            const RoleTypeIcon = meta.icon;
            const count = fields.filter((f) => f.roleKey === r.key).length;
            const locked = isMyself(r.key);
            return (
              <div
                key={r.key}
                onClick={() => setActiveRoleKey(r.key)}
                className={cn(
                  "group relative rounded-xl px-2 py-1.5 cursor-pointer transition-all flex items-center gap-2",
                  active ? "bg-background shadow-sm ring-1 ring-border/60" : "hover:bg-muted/40",
                )}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="relative w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white shrink-0 ring-1 ring-black/5 hover:scale-110 transition"
                      style={{ background: r.color }}
                      title="Change colour"
                    >
                      {i + 1}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-2">
                    <div className="grid grid-cols-6 gap-1.5">
                      {ROLE_COLORS.concat(locked ? [MYSELF_COLOR] : []).map((c) => (
                        <button
                          key={c}
                          onClick={() => updateRole(r.key, { color: c })}
                          className={cn(
                            "w-6 h-6 rounded-full border border-border/60 transition hover:scale-110",
                            r.color === c &&
                              "ring-2 ring-offset-2 ring-foreground/70 ring-offset-background",
                          )}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  value={r.label}
                  onChange={(e) =>
                    updateRole(r.key, { label: e.target.value.slice(0, MAX_ROLE_NAME) })
                  }
                  onClick={(e) => e.stopPropagation()}
                  disabled={locked}
                  placeholder="Name"
                  className="h-7 px-1.5 bg-transparent border-0 shadow-none flex-1 min-w-0 text-[12.5px] font-medium focus-visible:ring-1"
                />

                {!locked ? (
                  <Select
                    value={r.type ?? "signer"}
                    onValueChange={(v) => updateRole(r.key, { type: v as SignRoleType })}
                  >
                    <SelectTrigger
                      onClick={(e) => e.stopPropagation()}
                      className="h-6 w-auto gap-1 px-1.5 border-0 bg-muted/50 hover:bg-muted text-[10px] font-semibold uppercase tracking-wider rounded-full focus:ring-0 [&>svg]:opacity-60 [&>svg]:w-2.5 [&>svg]:h-2.5"
                    >
                      <span className="inline-flex items-center gap-1">
                        <RoleTypeIcon className="w-2.5 h-2.5" />
                        {meta.label}
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_TYPES.map((rt) => {
                        const Icon = rt.icon;
                        return (
                          <SelectItem key={rt.value} value={rt.value}>
                            <span className="inline-flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5" /> {rt.label}
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="inline-flex items-center gap-1 px-1.5 h-5 rounded-full bg-muted/60 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    <RoleTypeIcon className="w-2.5 h-2.5" />
                    {meta.label}
                  </span>
                )}

                {count > 0 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
                    {count}
                  </span>
                )}

                {signingMode === "sequential" && !locked && active && (
                  <div className="inline-flex items-center rounded-md border border-border/50 bg-background/60">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveRole(r.key, -1);
                      }}
                      disabled={i === 0 || (i === 1 && isMyself(roles[0].key))}
                      className="px-1 h-5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronDown className="w-2.5 h-2.5 rotate-180" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveRole(r.key, 1);
                      }}
                      disabled={i === roles.length - 1}
                      className="px-1 h-5 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    >
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}

                {!locked && roles.length > 1 && active && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRole(r.key);
                    }}
                    className="p-0.5 rounded text-muted-foreground hover:text-destructive transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={addRole}
            disabled={roles.length >= MAX_ROLES}
            className="w-full mt-1 rounded-xl border border-dashed border-border/60 px-2 py-1.5 text-[11.5px] text-muted-foreground hover:text-foreground hover:border-border transition inline-flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <Plus className="w-3 h-3" /> Add participant
          </button>
        </div>

        <label className="flex items-center gap-2.5 rounded-xl border border-border/50 bg-card/30 px-3 py-2 cursor-pointer select-none">
          <Switch checked={signSelf} onCheckedChange={(c) => toggleSignSelf(!!c)} />
          <span className="text-[12px] font-medium flex-1">I'll sign first</span>
        </label>
      </div>

      {/* Field tools — vertical, premium */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Signature
        </div>
        <div className="space-y-1">{signatureTools.map(renderTool)}</div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Text fields
        </div>
        <div className="space-y-1">{textTools.map(renderTool)}</div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1">
          Controls
        </div>
        <div className="space-y-1">{controlTools.map(renderTool)}</div>
      </div>
    </div>
  );
}

function StepRolesFields({
  documents,
  activeDocId,
  setActiveDocId,
  page,
  setPage,
  pageCount,
  roles,
  addRole,
  updateRole,
  removeRole,
  moveRole,
  togglePermission,
  signingMode,
  setSigningMode,
  signSelf,
  toggleSignSelf,
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
  addRole: () => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  moveRole: (key: string, dir: -1 | 1) => void;
  togglePermission: (key: string, perm: SignRolePermission) => void;
  signingMode: "sequential" | "parallel";
  setSigningMode: (m: "sequential" | "parallel") => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
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
  const [subStep, setSubStep] = useState<"people" | "actions" | "place">("people");

  const activeRole = roles.find((r) => r.key === activeRoleKey) ?? roles[0];
  const activeMeta = getRoleTypeMeta(activeRole?.type);
  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];

  const required = REQUIRED_BY_TYPE[activeRole?.type ?? "signer"];
  const placedKinds = new Set(
    fields.filter((f) => f.roleKey === activeRole?.key).map((f) => f.type),
  );
  const missing = required.filter((k) => !placedKinds.has(k));
  const roleComplete = missing.length === 0;

  const idx = roles.findIndex((r) => r.key === activeRole?.key);
  const nextRole = roles[idx + 1];

  const allRolesNamed = roles.every((r) => r.label.trim().length > 0);

  const SUB_STEPS: { key: "people" | "actions" | "place"; label: string }[] = [
    { key: "people", label: "Add people" },
    { key: "actions", label: "Choose actions" },
    { key: "place", label: "Place fields" },
  ];

  const titles: Record<typeof subStep, { title: string; sub: string }> = {
    people: {
      title: "Who needs to complete this?",
      sub: "Add the people who will sign, approve, view or complete fields. Use role names — templates are reusable.",
    },
    actions: {
      title: "What should each person do?",
      sub: "Pick one action per person. We'll set up sensible permissions automatically.",
    },
    place: {
      title: "Place fields for each person",
      sub: "Pick a person, then click where they need to sign or fill information.",
    },
  };

  return (
    <div className="space-y-6">
      <SectionTitle title={titles[subStep].title} sub={titles[subStep].sub} />

      {/* Sub-stepper */}
      <div className="flex items-center gap-2">
        {SUB_STEPS.map((s, i) => {
          const active = s.key === subStep;
          const done = SUB_STEPS.findIndex((x) => x.key === subStep) > i;
          return (
            <button
              key={s.key}
              onClick={() => setSubStep(s.key)}
              className={cn(
                "inline-flex items-center gap-2 h-8 px-3 rounded-full text-[12px] font-medium border transition-all",
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.5)]"
                  : done
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "bg-card/40 text-muted-foreground border-border/60 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full inline-flex items-center justify-center text-[10px] font-semibold",
                  active ? "bg-primary-foreground/20" : done ? "bg-primary/20" : "bg-muted",
                )}
              >
                {done ? <Check className="w-2.5 h-2.5" /> : String.fromCharCode(65 + i)}
              </span>
              {s.label}
            </button>
          );
        })}
      </div>

      {subStep === "people" && (
        <SubStepPeople
          roles={roles}
          addRole={addRole}
          updateRole={updateRole}
          removeRole={removeRole}
          signSelf={signSelf}
          toggleSignSelf={toggleSignSelf}
          onNext={() => allRolesNamed && setSubStep("actions")}
          canContinue={allRolesNamed && roles.length > 0}
        />
      )}

      {subStep === "actions" && (
        <SubStepActions
          roles={roles}
          updateRole={updateRole}
          togglePermission={togglePermission}
          onBack={() => setSubStep("people")}
          onNext={() => setSubStep("place")}
        />
      )}

      {subStep === "place" && (
        <PlaceFieldsPanel
          documents={documents}
          activeDocId={activeDocId}
          setActiveDocId={setActiveDocId}
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
          activeRole={activeRole}
          activeDoc={activeDoc}
          required={required}
          missing={missing}
          roleComplete={roleComplete}
          nextRole={nextRole}
          activeMeta={activeMeta}
        />
      )}
    </div>
  );
}

/* ── Sub-step A: Add People ───────────────────────────────── */
function SubStepPeople({
  roles,
  addRole,
  updateRole,
  removeRole,
  signSelf,
  toggleSignSelf,
  onNext,
  canContinue,
}: {
  roles: SignTemplateRole[];
  addRole: () => void;
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  removeRole: (key: string) => void;
  signSelf: boolean;
  toggleSignSelf: (on: boolean) => void;
  onNext: () => void;
  canContinue: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border/50 bg-card/30 divide-y divide-border/40">
        {roles.map((r, i) => {
          const locked = isMyself(r.key);
          return (
            <div key={r.key} className="flex items-center gap-3 p-4">
              <span
                className="w-9 h-9 rounded-full inline-flex items-center justify-center text-[13px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                style={{ background: r.color }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <Input
                  value={r.label}
                  disabled={locked}
                  onChange={(e) =>
                    updateRole(r.key, { label: e.target.value.slice(0, MAX_ROLE_NAME) })
                  }
                  placeholder="e.g. Employee, Client, Manager"
                  className="h-10 text-[14px] font-medium border-border/60 bg-background/60"
                />
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Use a role name, not a person's name — templates can be reused for anyone.
                </p>
              </div>
              {!locked && roles.length > 1 && (
                <button
                  onClick={() => removeRole(r.key)}
                  className="p-2 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition shrink-0"
                  title="Remove person"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}

        <div className="p-3 flex flex-wrap items-center gap-2">
          <button
            onClick={addRole}
            disabled={roles.length >= MAX_ROLES}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-dashed border-border/60 text-[12.5px] font-medium text-foreground hover:bg-muted/40 transition disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" /> Add another person
          </button>
          <span className="text-[11px] text-muted-foreground ml-1">
            Examples: {PERSON_PRESETS.join(" · ")}
          </span>
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 px-4 py-3 cursor-pointer">
        <Switch checked={signSelf} onCheckedChange={(c) => toggleSignSelf(!!c)} />
        <div className="flex-1">
          <div className="text-[13px] font-medium">I also need to sign</div>
          <div className="text-[11.5px] text-muted-foreground">
            Adds you as the first signer on this template.
          </div>
        </div>
      </label>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canContinue} className="gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ── Sub-step B: Choose Actions ───────────────────────────── */
function SubStepActions({
  roles,
  updateRole,
  togglePermission,
  onBack,
  onNext,
}: {
  roles: SignTemplateRole[];
  updateRole: (key: string, patch: Partial<SignTemplateRole>) => void;
  togglePermission: (key: string, perm: SignRolePermission) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [advancedOpen, setAdvancedOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-4">
      {roles.map((r) => {
        const currentType = r.type ?? "signer";
        const isAdvOpen = !!advancedOpen[r.key];
        return (
          <div
            key={r.key}
            className="rounded-2xl border border-border/50 bg-card/30 p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-8 h-8 rounded-full inline-flex items-center justify-center text-[12px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                style={{ background: r.color }}
              >
                {r.label.charAt(0).toUpperCase() || "?"}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate">{r.label || "Untitled"}</div>
                <div className="text-[11.5px] text-muted-foreground">
                  What should {r.label || "this person"} do?
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {ACTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const selected = currentType === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => updateRole(r.key, { type: opt.value })}
                    className={cn(
                      "text-left rounded-xl border p-3 transition-all",
                      selected
                        ? "border-primary/50 bg-primary/[0.06] shadow-[0_4px_16px_-6px_hsl(var(--primary)/0.3)]"
                        : "border-border/50 bg-background/40 hover:bg-muted/40 hover:border-border",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-md inline-flex items-center justify-center",
                          selected ? "bg-primary/15 text-primary" : "bg-muted text-foreground/70",
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[12.5px] font-semibold">{opt.label}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-primary ml-auto" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug">{opt.helper}</p>
                  </button>
                );
              })}
            </div>

            <Collapsible
              open={isAdvOpen}
              onOpenChange={(o) => setAdvancedOpen((s) => ({ ...s, [r.key]: o }))}
            >
              <CollapsibleTrigger className="inline-flex items-center gap-1 text-[11.5px] text-muted-foreground hover:text-foreground transition">
                <ChevronDown
                  className={cn("w-3 h-3 transition-transform", isAdvOpen && "rotate-180")}
                />
                Advanced permissions
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="flex flex-wrap gap-1.5">
                  {PERMISSION_LABELS.map((p) => {
                    const has = (r.permissions ?? []).includes(p.value);
                    return (
                      <button
                        key={p.value}
                        onClick={() => togglePermission(r.key, p.value)}
                        className={cn(
                          "h-7 px-2.5 rounded-full text-[11px] font-medium border transition",
                          has
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background border-border/60 text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        );
      })}

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Button>
        <Button onClick={onNext} className="gap-1.5">
          Continue <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ── Sub-step C: Place Fields ─────────────────────────────── */
function PlaceFieldsPanel({
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
  activeRole,
  activeDoc,
  required,
  missing,
  roleComplete,
  nextRole,
  activeMeta,
}: any) {
  const fieldLabelByKind = (k: SignFieldType) =>
    FIELD_TOOLS.find((t) => t.kind === k)?.label ?? k;

  return (
    <div className="space-y-3">
      {/* Now placing banner */}
      <div className="rounded-2xl border border-border/50 bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-xl px-4 py-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground font-semibold">
            Now placing fields for
          </span>
          <span
            className="inline-flex items-center gap-2 px-2.5 h-7 rounded-full border text-[12px] font-medium"
            style={{
              background: `${activeRole?.color}1a`,
              borderColor: `${activeRole?.color}55`,
              color: activeRole?.color,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: activeRole?.color }} />
            {activeRole?.label || "Untitled"}
          </span>
          {required.length > 0 && (
            <span className="text-[11.5px] text-muted-foreground hidden md:inline">
              Required:{" "}
              <span className="text-foreground font-medium">
                {required.map(fieldLabelByKind).join(" · ")}
              </span>
            </span>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {roleComplete && nextRole && (
            <button
              onClick={() => setActiveRoleKey(nextRole.key)}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[11.5px] font-medium bg-foreground text-background hover:opacity-90 transition"
            >
              Next: {nextRole.label || "person"} <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 min-h-[640px]">
        {/* Plain-language sidebar */}
        <div className="space-y-4 lg:sticky lg:top-4 h-fit">
          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1 mb-2">
              People
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/30 p-1.5 space-y-0.5">
              {roles.map((r: SignTemplateRole) => {
                const active = r.key === activeRoleKey;
                const meta = getRoleTypeMeta(r.type);
                const reqForRole = REQUIRED_BY_TYPE[r.type ?? "signer"];
                const placed = new Set(
                  fields.filter((f: SignTemplateField) => f.roleKey === r.key).map((f: SignTemplateField) => f.type),
                );
                const isMissing = reqForRole.some((k) => !placed.has(k));
                const count = fields.filter((f: SignTemplateField) => f.roleKey === r.key).length;
                return (
                  <button
                    key={r.key}
                    onClick={() => setActiveRoleKey(r.key)}
                    className={cn(
                      "w-full text-left rounded-xl px-2.5 py-2 transition-all flex items-center gap-2.5",
                      active ? "bg-background shadow-sm ring-1 ring-border/60" : "hover:bg-muted/40",
                    )}
                  >
                    <span
                      className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] font-semibold text-white ring-1 ring-black/5 shrink-0"
                      style={{ background: r.color }}
                    >
                      {r.label.charAt(0).toUpperCase() || "?"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] font-medium truncate">{r.label || "Untitled"}</div>
                      <div className="text-[10.5px] text-muted-foreground truncate">
                        {ACTION_VERB[r.type ?? "signer"]}
                      </div>
                    </div>
                    {reqForRole.length > 0 && isMissing ? (
                      <span className="text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">
                        Needs field
                      </span>
                    ) : count > 0 ? (
                      <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-[0.14em] font-semibold text-muted-foreground px-1 mb-2">
              Fields
            </div>
            <div className="space-y-1">
              {FIELD_TOOLS.map((t) => {
                const Icon = t.icon;
                const allowed = roleAllows(activeRole?.type, t.kind);
                const active = activeTool.kind === t.kind;
                return (
                  <button
                    key={t.kind}
                    onClick={() => allowed && setActiveTool(t)}
                    disabled={!allowed}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 h-10 rounded-xl border transition-all text-left",
                      active
                        ? "border-primary/40 bg-primary/[0.08] text-primary"
                        : "border-transparent hover:bg-muted/40 text-foreground",
                      !allowed && "opacity-30 cursor-not-allowed hover:bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                        active ? "bg-primary/15" : "bg-muted/60",
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[12.5px] font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
            {activeRole && (
              <p className="text-[11px] text-muted-foreground mt-2 px-1 leading-snug">
                Click on the document where{" "}
                <span className="text-foreground font-medium">{activeRole.label}</span> should{" "}
                {activeTool.kind === "signature" ? "sign" : `fill ${activeTool.label.toLowerCase()}`}.
              </p>
            )}
          </div>
        </div>

        {/* Document canvas */}
        <div className="flex gap-3 min-w-0">
          {documents.length > 1 && (
            <div className="flex flex-col gap-1.5">
              {documents.map((d: BuilderDoc, i: number) => {
                const active = d.id === activeDocId;
                const count = fields.filter(
                  (f: SignTemplateField) => (f.documentId ?? documents[0].id) === d.id,
                ).length;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveDocId(d.id)}
                    title={d.name}
                    className={cn(
                      "relative w-10 h-12 rounded-md border flex flex-col items-center justify-center transition-all",
                      active
                        ? "border-primary/50 bg-primary/[0.06] shadow-sm"
                        : "border-border/50 bg-card/30 hover:bg-card/60",
                    )}
                  >
                    <FileText
                      className={cn(
                        "w-3.5 h-3.5",
                        active ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    <span className="text-[9px] font-semibold mt-0.5 tabular-nums text-muted-foreground">
                      {i + 1}
                    </span>
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[14px] h-[14px] px-1 rounded-full bg-foreground text-background text-[9px] font-semibold inline-flex items-center justify-center">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2.5">
              <div className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/40 backdrop-blur px-1.5 py-1">
                <button
                  onClick={() =>
                    setPage((p: number) => Math.max(1, (typeof p === "number" ? p : 1) - 1))
                  }
                  disabled={page === 1}
                  className="p-1 rounded-full hover:bg-muted/50 disabled:opacity-30"
                >
                  <ArrowLeft className="w-3 h-3" />
                </button>
                <span className="text-[11px] text-muted-foreground px-1.5 tabular-nums">
                  {documents.length > 1 && activeDoc && (
                    <span className="text-foreground/85 font-medium truncate inline-block max-w-[140px] align-bottom mr-1">
                      {activeDoc.name} ·
                    </span>
                  )}
                  Page <span className="text-foreground font-medium">{page}</span> / {pageCount}
                </span>
                <button
                  onClick={() =>
                    setPage((p: number) =>
                      Math.min(pageCount, (typeof p === "number" ? p : 1) + 1),
                    )
                  }
                  disabled={page === pageCount}
                  className="p-1 rounded-full hover:bg-muted/50 disabled:opacity-30"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {documents.length > 1
                  ? `${docFields.length} on doc · ${fields.length} total`
                  : `${fields.length} field${fields.length === 1 ? "" : "s"}`}
              </span>
            </div>

            <div className="relative rounded-2xl border border-border/40 bg-gradient-to-b from-muted/20 to-muted/5 p-6 flex justify-center">
              <div
                ref={pageRef}
                onClick={(e) => {
                  setSelectedFieldId(null);
                  placeField(e);
                }}
                className="relative bg-background rounded-md shadow-2xl border border-border/40 w-full max-w-[720px] aspect-[1/1.3] cursor-crosshair"
              >
                <div className="absolute inset-0 p-12 space-y-3 pointer-events-none">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 bg-muted/60 rounded"
                      style={{ width: `${50 + ((i * 7) % 50)}%` }}
                    />
                  ))}
                </div>

                {pageFields.length === 0 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="rounded-full border border-border/60 bg-background/80 backdrop-blur px-3 py-1.5 inline-flex items-center gap-1.5 shadow-sm">
                      <Move className="w-3 h-3 text-muted-foreground" />
                      <p className="text-[11.5px] text-muted-foreground">
                        Click to place a{" "}
                        <span className="font-medium text-foreground">
                          {activeTool.label.toLowerCase()}
                        </span>{" "}
                        for {activeRole?.label}
                      </p>
                    </div>
                  </div>
                )}

                {pageFields.map((f: SignTemplateField) => {
                  const role = roles.find((r: SignTemplateRole) => r.key === f.roleKey);
                  const tool = FIELD_TOOLS.find((t) => t.kind === f.type) ?? FIELD_TOOLS[0];
                  const Icon = tool.icon;
                  const selected = selectedFieldId === f.id;
                  const isActiveRole = f.roleKey === activeRoleKey;
                  return (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: isActiveRole ? 1 : 0.55, scale: 1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFieldId(f.id);
                      }}
                      style={{
                        left: `${f.x}%`,
                        top: `${f.y}%`,
                        width: `${f.width}%`,
                        height: `${f.height}%`,
                        minHeight: 28,
                        minWidth: 56,
                        borderColor: role?.color,
                        background: `${role?.color}1f`,
                        boxShadow: selected
                          ? `0 0 0 2px ${role?.color}, 0 8px 24px -8px ${role?.color}`
                          : undefined,
                      }}
                      className="absolute group rounded-md border-[1.5px] flex items-center gap-1 px-1.5 cursor-pointer transition-opacity"
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

              {activeMeta.allowedFields !== "all" && activeMeta.allowedFields.length === 0 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background/90 backdrop-blur px-4 py-2 text-[11.5px] text-muted-foreground shadow-lg">
                  {activeRole?.label} doesn't need any fields — they
                  {activeMeta.value === "viewer" ? " just review the document." : " just receive a copy."}
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11.5px] text-muted-foreground">
              <span>
                {missing.length > 0 ? (
                  <>
                    <span className="font-medium text-amber-600 dark:text-amber-400">
                      {activeRole?.label} is marked to sign but has no signature field.
                    </span>{" "}
                    Add one above.
                  </>
                ) : (
                  <>
                    <Check className="w-3 h-3 inline mr-1 text-emerald-500" />
                    {activeRole?.label} fields complete.
                  </>
                )}
              </span>
              <span className="opacity-70 hidden md:inline">
                Click any field to select · Backspace to remove
              </span>
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
        sub="Values you fill in before sending — like client name, deal value, or start date. These personalize the agreement automatically."
      />

      <div className="rounded-xl border border-primary/20 bg-primary/5 px-3.5 py-2.5 flex items-start gap-2.5">
        <Braces className="w-4 h-4 text-primary mt-0.5 shrink-0" />
        <div className="text-[12px] text-foreground/80 leading-relaxed">
          <span className="font-medium text-foreground">Sender-filled, not signer-filled.</span>{" "}
          Variables personalize the document before it goes out. Signing fields are placed on the
          document in the previous step.
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
                      onChange={(e) =>
                        updateVariable(v.name, { defaultValue: e.target.value })
                      }
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
