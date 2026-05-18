import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  Upload as UploadIcon,
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
  Wand2,
  Layers,
  FileStack,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  SignTemplateField,
  SignFieldType,
  SignTemplate,
  SignTemplateRole,
  SignRoleType,
  SignTemplateVariable,
  SignVariableType,
  SignTemplateDocument,
  SignDocumentTag,
  SIGN_DOC_TAGS,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label as UILabel } from "@/components/ui/label";

const uid = () => Math.random().toString(36).slice(2, 9);

interface SignTemplateBuilderProps {
  onBack: () => void;
  onSaved: () => void;
}

type BuilderStep = "upload" | "configure" | "fields";

const ROLE_COLORS = ["#3b82f6", "#a78bfa", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

const ROLE_TYPES: {
  value: SignRoleType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedFields: SignFieldType[] | "all";
}[] = [
  {
    value: "signer",
    label: "Signer",
    description: "Signs and fills the document.",
    icon: PenLine,
    allowedFields: "all",
  },
  {
    value: "approver",
    label: "Approver",
    description: "Approves before it's finalized.",
    icon: ShieldCheck,
    allowedFields: ["signature", "initials", "date", "name"],
  },
  {
    value: "viewer",
    label: "Viewer",
    description: "Read-only access. No fields.",
    icon: Eye,
    allowedFields: [],
  },
  {
    value: "cc",
    label: "CC",
    description: "Receives a copy. No action needed.",
    icon: AtSign,
    allowedFields: [],
  },
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

const CATEGORIES = ["Client", "Legal", "HR", "Sales", "Other"];

export default function SignTemplateBuilder({ onBack, onSaved }: SignTemplateBuilderProps) {
  const { save } = useSignTemplates();
  const [step, setStep] = useState<BuilderStep>("upload");

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>("Client");
  const [signingMode, setSigningMode] = useState<"sequential" | "parallel">("sequential");
  const [roles, setRoles] = useState<SignTemplateRole[]>([
    { key: "client", label: "Client", color: ROLE_COLORS[0], signingOrder: 1, type: "signer" },
    { key: "sender", label: "You", color: ROLE_COLORS[1], signingOrder: 2, type: "signer" },
  ]);
  const [fields, setFields] = useState<SignTemplateField[]>([]);
  const [documentBody, setDocumentBody] = useState<string>(
    "AGREEMENT\n\nThis agreement is entered into on {{START_DATE}} between {{COMPANY_NAME}} and {{CLIENT_NAME}} of {{CLIENT_ADDRESS}}.\n\nTotal engagement value: {{DEAL_VALUE}}.",
  );
  const [variables, setVariables] = useState<SignTemplateVariable[]>([]);
  const [packageTitle, setPackageTitle] = useState<string>("");
  type BuilderDoc = {
    id: string;
    file: File | null;
    name: string;
    tag?: SignDocumentTag;
    pageCount: number;
  };
  const [documents, setDocuments] = useState<BuilderDoc[]>([]);
  const [activeDocId, setActiveDocId] = useState<string>("");
  const [page, setPage] = useState(1);
  const [activeRoleKey, setActiveRoleKey] = useState<string>("client");
  const [activeTool, setActiveTool] = useState(FIELD_TOOLS[0]);
  const pageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const activeDoc = documents.find((d) => d.id === activeDocId) || documents[0];
  const pageCount = activeDoc?.pageCount ?? 3;
  const totalPages = documents.reduce((s, d) => s + d.pageCount, 0);

  /* ───────── documents ───────── */
  const addDocuments = useCallback(
    (files: File[]) => {
      if (files.length === 0) return;
      const next: BuilderDoc[] = files.map((f) => ({
        id: `doc-${uid()}`,
        file: f,
        name: f.name,
        // Heuristic tag based on filename
        tag:
          /nda/i.test(f.name)
            ? "nda"
            : /pric/i.test(f.name)
              ? "pricing"
              : /scope|sow/i.test(f.name)
                ? "scope"
                : /annex/i.test(f.name)
                  ? "annexure"
                  : /onboard/i.test(f.name)
                    ? "onboarding"
                    : "agreement",
        pageCount: 3,
      }));
      setDocuments((prev) => {
        const merged = [...prev, ...next];
        if (!activeDocId) setActiveDocId(merged[0].id);
        return merged;
      });
      if (!file) setFile(files[0]);
      if (!name) setName(files[0].name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
      setStep("configure");
    },
    [activeDocId, file, name],
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

  /* ───────── dynamic variables ───────── */
  // Auto-detect placeholders whenever the document body changes,
  // preserving prior label / type / required edits.
  useEffect(() => {
    setVariables((prev) => detectTemplateVariables(documentBody, prev));
  }, [documentBody]);

  const updateVariable = (name: string, patch: Partial<SignTemplateVariable>) =>
    setVariables((prev) => prev.map((v) => (v.name === name ? { ...v, ...patch } : v)));

  /* ───────── upload ───────── */
  // legacy single-file callback now routes through addDocuments

  /* ───────── roles ───────── */
  const addRole = () => {
    if (roles.length >= 6) return;
    const idx = roles.length;
    const key = `role-${uid()}`;
    setRoles((r) => [
      ...r,
      {
        key,
        label: `Signer ${idx + 1}`,
        color: ROLE_COLORS[idx % ROLE_COLORS.length],
        signingOrder: idx + 1,
        type: "signer",
      },
    ]);
  };
  const updateRole = (key: string, patch: Partial<SignTemplateRole>) =>
    setRoles((rs) => rs.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const removeRole = (key: string) => {
    if (roles.length <= 1) return;
    setRoles((rs) => rs.filter((r) => r.key !== key));
    setFields((fs) => fs.filter((f) => f.roleKey !== key));
    if (activeRoleKey === key) setActiveRoleKey(roles.find((r) => r.key !== key)!.key);
  };

  /* ───────── fields ───────── */
  const placeField = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = pageRef.current;
    if (!target) return;
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
      documentId: activeDoc?.id,
    };
    setFields((p) => [...p, f]);
  };
  const removeField = (id: string) => setFields((p) => p.filter((f) => f.id !== id));

  const docFields = useMemo(
    () =>
      fields.filter(
        (f) => !activeDoc || (f.documentId ?? activeDoc.id) === activeDoc.id,
      ),
    [fields, activeDoc],
  );
  const pageFields = useMemo(() => docFields.filter((f) => f.page === page), [docFields, page]);

  const canSave =
    name.trim().length > 1 &&
    roles.length >= 1 &&
    fields.length >= 1 &&
    fields.some((f) => f.type === "signature");

  const handleSave = () => {
    if (!canSave) {
      toast.error("Add at least one signature field before saving.");
      return;
    }
    const tpl: SignTemplate = {
      id: `tpl-${uid()}`,
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      documentName: documents[0]?.name || file?.name || `${name}.pdf`,
      pageCount: documents[0]?.pageCount ?? pageCount,
      roles,
      fields,
      signingMode,
      documentBody: documentBody.trim() || undefined,
      variables: variables.length > 0 ? variables : undefined,
      packageTitle: packageTitle.trim() || undefined,
      documents:
        documents.length > 0
          ? documents.map<SignTemplateDocument>((d) => ({
              id: d.id,
              name: d.name,
              tag: d.tag,
              pageCount: d.pageCount,
              // Share the placeholder body so per-doc preview works in V1.
              documentBody: documentBody.trim() || undefined,
            }))
          : undefined,
      defaults: { expiryDays: 14, remindersEveryDays: 3 },
      createdAt: Date.now(),
      useCount: 0,
    };
    save(tpl);
    toast.success("Template saved", { description: `${tpl.name} is ready to launch.` });
    onSaved();
  };

  /* ───────── render ───────── */
  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      {/* header */}
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
          Configure once. Reuse forever.
        </h1>

        {/* stepper */}
        <div className="mt-5 flex items-center gap-2">
          {[
            { id: "upload", label: "Upload" },
            { id: "configure", label: "Roles" },
            { id: "fields", label: "Fields" },
          ].map((s, i) => {
            const active = s.id === step;
            const done =
              (step === "configure" && s.id === "upload") ||
              (step === "fields" && s.id !== "fields");
            return (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-6 px-2.5 rounded-full text-[11px] font-medium inline-flex items-center gap-1.5 border transition-colors",
                    active
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : done
                        ? "bg-muted/40 border-border/50 text-foreground/70"
                        : "bg-card/40 border-border/40 text-muted-foreground",
                  )}
                >
                  <span className="tabular-nums">{i + 1}</span>
                  {s.label}
                </div>
                {i < 2 && <div className="w-6 h-px bg-border/60" />}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1 - Upload */}
        {step === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const fs = Array.from(e.dataTransfer.files ?? []);
                if (fs.length) addDocuments(fs);
              }}
              className="rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer px-6 py-16 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FileStack className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[14px] font-medium">
                Upload your signing package
              </p>
              <p className="text-[12px] text-muted-foreground mt-1">
                Drop one or more PDFs / Word docs — they'll be sent together as one signing
                session.
              </p>
              <Button size="sm" className="mt-5 h-9 rounded-lg" type="button">
                Choose files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const fs = Array.from(e.target.files ?? []);
                  if (fs.length) addDocuments(fs);
                  e.target.value = "";
                }}
              />
            </div>
          </motion.div>
        )}

        {/* STEP 2 - Configure */}
        {step === "configure" && (
          <motion.div
            key="configure"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Documents in package */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="mb-0">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers className="w-3 h-3" />
                    Documents in this package
                  </span>
                </Label>
                <button
                  onClick={() => addMoreInputRef.current?.click()}
                  className="text-[11px] text-foreground/70 hover:text-foreground inline-flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add document
                </button>
                <input
                  ref={addMoreInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => {
                    const fs = Array.from(e.target.files ?? []);
                    if (fs.length) addDocuments(fs);
                    e.target.value = "";
                  }}
                />
              </div>
              <div className="rounded-xl border border-border/50 bg-card/30 divide-y divide-border/30">
                {documents.map((d, i) => (
                  <div key={d.id} className="px-3 py-2.5 flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-muted/40 text-[10px] font-semibold text-muted-foreground inline-flex items-center justify-center tabular-nums shrink-0">
                      {i + 1}
                    </span>
                    <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <Input
                      value={d.name}
                      onChange={(e) => updateDocument(d.id, { name: e.target.value })}
                      className="h-8 bg-background/60 flex-1 min-w-[180px] text-[12px]"
                      placeholder="Document name (supports {{VARIABLES}})"
                    />
                    <Select
                      value={d.tag ?? "agreement"}
                      onValueChange={(t) => updateDocument(d.id, { tag: t as SignDocumentTag })}
                    >
                      <SelectTrigger className="h-8 w-[120px] bg-background/60 text-[11px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SIGN_DOC_TAGS.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        onClick={() => moveDocument(d.id, -1)}
                        disabled={i === 0}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowLeft className="w-3 h-3 rotate-90" />
                      </button>
                      <button
                        onClick={() => moveDocument(d.id, 1)}
                        disabled={i === documents.length - 1}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowRight className="w-3 h-3 rotate-90" />
                      </button>
                      <button
                        onClick={() => removeDocument(d.id)}
                        disabled={documents.length <= 1}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 disabled:opacity-30"
                        title="Remove"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10.5px] text-muted-foreground mt-1.5">
                Sent together · one signing session · one audit trail.
              </p>
            </div>

            {/* Package title */}
            <div>
              <Label>
                <span className="inline-flex items-center gap-1.5">
                  <Braces className="w-3 h-3" />
                  Package title (supports variables)
                </span>
              </Label>
              <Input
                value={packageTitle}
                onChange={(e) => setPackageTitle(e.target.value)}
                placeholder="e.g. {{COMPANY_NAME}} – Client Onboarding"
                className="h-10 bg-background/60 font-mono text-[12.5px]"
              />
              <p className="text-[10.5px] text-muted-foreground mt-1.5">
                Leave blank to use the template name. Document names also support{" "}
                <code className="font-mono">{"{{VARIABLES}}"}</code>.
              </p>
            </div>

            {/* basics */}
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label>Template name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Agency Client Agreement"
                  className="h-10 bg-background/60"
                />
              </div>
              <div>
                <Label>Category</Label>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={cn(
                        "h-10 px-3 rounded-xl text-[12px] font-medium border transition-colors",
                        category === c
                          ? "bg-primary/10 text-primary border-primary/25"
                          : "bg-card/30 text-muted-foreground hover:text-foreground border-border/50",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Description (optional)</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this template for?"
                className="h-10 bg-background/60"
              />
            </div>

            {/* signing mode */}
            <div>
              <Label>Signing order</Label>
              <div className="flex gap-2">
                {(["sequential", "parallel"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSigningMode(m)}
                    className={cn(
                      "flex-1 px-3 py-2.5 rounded-xl text-left border transition-colors",
                      signingMode === m
                        ? "bg-primary/10 text-primary border-primary/25"
                        : "bg-card/30 border-border/50 text-foreground/80 hover:bg-card/50",
                    )}
                  >
                    <div className="text-[12px] font-medium capitalize">{m}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {m === "sequential"
                        ? "Signers receive in order, one at a time."
                        : "All signers receive at once."}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* roles */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="mb-0">Signer roles</Label>
                <button
                  onClick={addRole}
                  disabled={roles.length >= 6}
                  className="text-[11px] text-foreground/70 hover:text-foreground inline-flex items-center gap-1 disabled:opacity-40"
                >
                  <Plus className="w-3 h-3" /> Add role
                </button>
              </div>
              <div className="space-y-2">
                {roles.map((r, i) => (
                  <div
                    key={r.key}
                    className="rounded-xl border border-border/50 bg-card/30 p-3 flex flex-wrap items-center gap-2"
                  >
                    <button
                      onClick={() => {
                        const next = ROLE_COLORS[(ROLE_COLORS.indexOf(r.color) + 1) % ROLE_COLORS.length];
                        updateRole(r.key, { color: next });
                      }}
                      className="w-7 h-7 rounded-full border border-border/60 shrink-0"
                      style={{ background: r.color }}
                      title="Change color"
                    />
                    <Input
                      value={r.label}
                      onChange={(e) => updateRole(r.key, { label: e.target.value })}
                      className="h-9 bg-background/60 flex-1 min-w-[140px]"
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
                        Step
                        <Input
                          type="number"
                          min={1}
                          value={r.signingOrder ?? i + 1}
                          onChange={(e) =>
                            updateRole(r.key, { signingOrder: Number(e.target.value) || 1 })
                          }
                          className="h-9 w-14 bg-background/60 text-center"
                        />
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
                ))}
              </div>
            </div>

            {/* Dynamic Variables */}
            <SmartFieldsSection
              body={documentBody}
              setBody={setDocumentBody}
              variables={variables}
              setVariables={setVariables}
            />

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={() => setStep("upload")}>
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (name.trim().length < 2) {
                    toast.error("Give your template a name.");
                    return;
                  }
                  setActiveRoleKey(roles[0].key);
                  setStep("fields");
                }}
                className="gap-1.5"
              >
                Continue to fields <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 - Fields */}
        {step === "fields" && (
          <motion.div
            key="fields"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 min-h-[600px]"
          >
            {/* sidebar */}
            <div className="rounded-2xl border border-border/50 bg-card/40 p-4 space-y-4 h-fit lg:sticky lg:top-4">
              {documents.length > 1 && (
                <div>
                  <Label>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      Document
                    </span>
                  </Label>
                  <div className="space-y-1.5">
                    {documents.map((d, i) => {
                      const active = d.id === activeDocId;
                      const count = fields.filter(
                        (f) => (f.documentId ?? documents[0].id) === d.id,
                      ).length;
                      const tag = SIGN_DOC_TAGS.find((t) => t.value === d.tag);
                      return (
                        <button
                          key={d.id}
                          onClick={() => {
                            setActiveDocId(d.id);
                            setPage(1);
                          }}
                          className={cn(
                            "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors text-left",
                            active
                              ? "border-primary/30 bg-primary/5"
                              : "border-transparent hover:bg-muted/30",
                          )}
                        >
                          <span className="w-5 h-5 rounded-md bg-muted/40 text-[10px] font-semibold text-muted-foreground inline-flex items-center justify-center tabular-nums shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[12px] font-medium truncate flex-1">{d.name}</span>
                          {tag && (
                            <span className="text-[9.5px] uppercase tracking-wider text-muted-foreground shrink-0">
                              {tag.label}
                            </span>
                          )}
                          <span className="text-[10px] text-muted-foreground tabular-nums">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <Label>Assign field to role</Label>
                <div className="space-y-1.5">
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
                          "w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border transition-colors text-left",
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
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                          <RoleIcon className="w-3 h-3" />
                          {meta.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Field type</Label>
                {(() => {
                  const activeRole = roles.find((r) => r.key === activeRoleKey);
                  const meta = getRoleTypeMeta(activeRole?.type);
                  if (meta.allowedFields !== "all" && meta.allowedFields.length === 0) {
                    return (
                      <div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-3 text-[11px] text-muted-foreground leading-relaxed">
                        <meta.icon className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                        {meta.label}s don't fill fields — they just{" "}
                        {meta.value === "viewer" ? "review the document." : "receive a copy."}
                      </div>
                    );
                  }
                  return (
                <div className="grid grid-cols-2 gap-1.5">
                  {FIELD_TOOLS.map((t) => {
                    const Icon = t.icon;
                    const active = activeTool.kind === t.kind && activeTool.label === t.label;
                    const allowed = roleAllows(activeRole?.type, t.kind);
                    return (
                      <button
                        key={t.label}
                        onClick={() => allowed && setActiveTool(t)}
                        disabled={!allowed}
                        title={allowed ? undefined : `Not available for ${meta.label}s`}
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
                  );
                })()}
              </div>

              <div className="rounded-lg border border-border/40 bg-muted/20 px-3 py-2.5 text-[11px] text-muted-foreground leading-relaxed">
                Pick a role, pick a field, then click on the document to drop it.
              </div>
            </div>

            {/* canvas */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
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
                  onClick={placeField}
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
                        Click to place a {activeTool.label.toLowerCase()} for{" "}
                        {roles.find((r) => r.key === activeRoleKey)?.label}
                      </p>
                    </div>
                  )}

                  {pageFields.map((f) => {
                    const role = roles.find((r) => r.key === f.roleKey);
                    const tool = FIELD_TOOLS.find((t) => t.kind === f.type) ?? FIELD_TOOLS[0];
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={f.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          left: `${f.x}%`,
                          top: `${f.y}%`,
                          width: `${f.width}%`,
                          height: `${f.height}%`,
                          minHeight: 26,
                          minWidth: 50,
                          borderColor: role?.color,
                          background: `${role?.color}22`,
                        }}
                        className="absolute group rounded-md border-2 flex items-center gap-1 px-1.5"
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

              <div className="flex items-center justify-between pt-4">
                <Button variant="ghost" size="sm" onClick={() => setStep("configure")}>
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
                </Button>
                <Button size="sm" onClick={handleSave} disabled={!canSave} className="gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Save template
                </Button>
              </div>
              {!canSave && fields.length > 0 && (
                <p className="text-[11px] text-muted-foreground mt-2 text-right">
                  Add at least one signature field to save.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Smart Fields — visual reusable-field editor.
 * Users highlight text in the document preview; a floating
 * "Convert to smart field" action opens a modal. Once saved,
 * the highlighted text becomes a labelled chip inside the
 * document. No raw token syntax is ever exposed.
 * ────────────────────────────────────────────────────────── */

const SMART_FIELD_TYPES: { value: SignVariableType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "company", label: "Company" },
  { value: "currency", label: "Currency" },
  { value: "date", label: "Date" },
  { value: "address", label: "Address" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
];

const fieldTypeLabel = (t: SignVariableType) =>
  SMART_FIELD_TYPES.find((x) => x.value === t)?.label ?? "Text";

function toToken(label: string) {
  const base =
    label
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "FIELD";
  return base;
}

interface SmartFieldsSectionProps {
  body: string;
  setBody: (v: string) => void;
  variables: SignTemplateVariable[];
  setVariables: React.Dispatch<React.SetStateAction<SignTemplateVariable[]>>;
}

function SmartFieldsSection({ body, setBody, variables, setVariables }: SmartFieldsSectionProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<{
    text: string;
    top: number;
    left: number;
  } | null>(null);
  const [modal, setModal] = useState<
    | { mode: "create"; originalText: string }
    | { mode: "edit"; variable: SignTemplateVariable }
    | null
  >(null);

  const onMouseUp = useCallback(() => {
    const sel = window.getSelection();
    const container = previewRef.current;
    if (!sel || sel.isCollapsed || !container) {
      setSelection(null);
      return;
    }
    const text = sel.toString().trim();
    if (!text || text.length > 120) {
      setSelection(null);
      return;
    }
    const range = sel.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) {
      setSelection(null);
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const rect = range.getBoundingClientRect();
    setSelection({
      text,
      top: rect.top - containerRect.top - 44,
      left: rect.left - containerRect.left + rect.width / 2,
    });
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!previewRef.current?.contains(e.target as Node)) setSelection(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const createField = (meta: {
    label: string;
    type: SignVariableType;
    required: boolean;
    example?: string;
  }) => {
    if (modal?.mode !== "create") return;
    const original = modal.originalText;
    let token = toToken(meta.label);
    const taken = new Set(variables.map((v) => v.name));
    if (taken.has(token)) {
      let n = 2;
      while (taken.has(`${token}_${n}`)) n++;
      token = `${token}_${n}`;
    }
    const pattern = `{{${token}}}`;
    const idx = body.indexOf(original);
    if (idx === -1) {
      toast.error("Selection no longer matches the document.");
      return;
    }
    setBody(body.slice(0, idx) + pattern + body.slice(idx + original.length));
    setVariables((prev) => [
      ...prev,
      {
        name: token,
        label: meta.label,
        type: meta.type,
        required: meta.required,
        defaultValue: meta.example?.trim() || original,
        pattern,
      },
    ]);
    setModal(null);
    setSelection(null);
    window.getSelection()?.removeAllRanges();
    toast.success(`Smart field "${meta.label}" created.`);
  };

  const updateField = (
    name: string,
    meta: { label: string; type: SignVariableType; required: boolean; example?: string },
  ) => {
    setVariables((prev) =>
      prev.map((v) =>
        v.name === name
          ? {
              ...v,
              label: meta.label,
              type: meta.type,
              required: meta.required,
              defaultValue: meta.example?.trim() || v.defaultValue,
            }
          : v,
      ),
    );
    setModal(null);
  };

  const removeField = (name: string) => {
    const v = variables.find((x) => x.name === name);
    if (!v) return;
    setBody(body.split(v.pattern).join(v.defaultValue || v.label));
    setVariables((prev) => prev.filter((x) => x.name !== name));
  };

  /* render the document body, replacing {{TOKENS}} with chips */
  const renderedBody = useMemo(() => {
    const re = /\{\{\s*([A-Z][A-Z0-9_]*)\s*\}\}/g;
    const nodes: React.ReactNode[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;
    while ((m = re.exec(body)) !== null) {
      if (m.index > last) nodes.push(body.slice(last, m.index));
      const name = m[1];
      const v = variables.find((x) => x.name === name);
      nodes.push(
        <span
          key={`chip-${key++}`}
          contentEditable={false}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            if (v) setModal({ mode: "edit", variable: v });
          }}
          className="inline-flex items-center gap-1 align-baseline px-1.5 py-0.5 mx-0.5 rounded-md bg-primary/10 text-primary border border-primary/25 text-[12px] font-medium cursor-pointer hover:bg-primary/15 transition-colors select-none"
          title="Edit smart field"
        >
          <Sparkles className="w-2.5 h-2.5" />
          {v?.label ?? name}
        </span>,
      );
      last = m.index + m[0].length;
    }
    if (last < body.length) nodes.push(body.slice(last));
    return nodes;
  }, [body, variables]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="mb-0">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Smart fields
          </span>
        </Label>
        <span className="text-[11px] text-muted-foreground">
          Highlight any text to make it reusable.
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_240px] gap-3">
        {/* Document preview */}
        <div
          ref={previewRef}
          onMouseUp={onMouseUp}
          className="relative rounded-2xl border border-border/50 bg-card/30 px-5 py-5 min-h-[260px] text-[13px] leading-relaxed text-foreground/90 whitespace-pre-wrap selection:bg-primary/20"
        >
          {renderedBody}

          <AnimatePresence>
            {selection && (
              <motion.button
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.96 }}
                transition={{ duration: 0.12 }}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({ mode: "create", originalText: selection.text });
                  setSelection(null);
                }}
                style={{
                  top: Math.max(4, selection.top),
                  left: selection.left,
                  transform: "translateX(-50%)",
                }}
                className="absolute z-10 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-foreground text-background text-[12px] font-medium shadow-lg hover:opacity-90"
              >
                <Sparkles className="w-3 h-3" />
                Convert to smart field
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar — reusable fields */}
        <div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 px-1">
            Reusable fields
          </div>
          {variables.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/50 px-3 py-6 text-center text-[11px] text-muted-foreground">
              Highlight a value in the document to create your first smart field.
            </div>
          ) : (
            <div className="space-y-1.5">
              {variables.map((v) => (
                <div
                  key={v.name}
                  className="group rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors px-3 py-2.5 flex items-start gap-2"
                >
                  <button
                    onClick={() => setModal({ mode: "edit", variable: v })}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="text-[12.5px] font-medium truncate">{v.label}</div>
                    <div className="text-[10.5px] text-muted-foreground mt-0.5">
                      {fieldTypeLabel(v.type)} {v.required ? "• Required" : "• Optional"}
                    </div>
                  </button>
                  <button
                    onClick={() => removeField(v.name)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 transition"
                    title="Remove field"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SmartFieldModal
        open={Boolean(modal)}
        onOpenChange={(o) => !o && setModal(null)}
        mode={modal?.mode ?? "create"}
        initial={
          modal?.mode === "edit"
            ? {
                label: modal.variable.label,
                type: modal.variable.type,
                required: Boolean(modal.variable.required),
                example: modal.variable.defaultValue ?? "",
              }
            : modal?.mode === "create"
              ? {
                  label: "",
                  type: "text",
                  required: true,
                  example: modal.originalText,
                }
              : null
        }
        onSave={(meta) => {
          if (!modal) return;
          if (modal.mode === "create") createField(meta);
          else updateField(modal.variable.name, meta);
        }}
      />
    </div>
  );
}

interface SmartFieldMeta {
  label: string;
  type: SignVariableType;
  required: boolean;
  example?: string;
}

function SmartFieldModal({
  open,
  onOpenChange,
  mode,
  initial,
  onSave,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  mode: "create" | "edit";
  initial: SmartFieldMeta | null;
  onSave: (meta: SmartFieldMeta) => void;
}) {
  const [label, setLabel] = useState(initial?.label ?? "");
  const [type, setType] = useState<SignVariableType>(initial?.type ?? "text");
  const [required, setRequired] = useState<boolean>(initial?.required ?? true);
  const [example, setExample] = useState<string>(initial?.example ?? "");

  useEffect(() => {
    if (open && initial) {
      setLabel(initial.label);
      setType(initial.type);
      setRequired(initial.required);
      setExample(initial.example ?? "");
    }
  }, [open, initial]);

  const submit = () => {
    if (label.trim().length < 1) {
      toast.error("Give this field a name.");
      return;
    }
    onSave({ label: label.trim(), type, required, example });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base">
            {mode === "create" ? "New smart field" : "Edit smart field"}
          </DialogTitle>
          <DialogDescription className="text-[12px]">
            Reused values are filled in automatically before sending.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <UILabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Field name
            </UILabel>
            <Input
              autoFocus
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Client name"
              className="h-10 bg-background/60"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>

          <div className="space-y-1.5">
            <UILabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Type
            </UILabel>
            <Select value={type} onValueChange={(t) => setType(t as SignVariableType)}>
              <SelectTrigger className="h-10 bg-background/60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SMART_FIELD_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <UILabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Example value (optional)
            </UILabel>
            <Input
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="e.g. Acme Media"
              className="h-10 bg-background/60"
              onKeyDown={(e) => e.key === "Enter" && submit()}
            />
          </div>

          <label className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 px-3 py-2.5">
            <div>
              <div className="text-[12.5px] font-medium">Required</div>
              <div className="text-[11px] text-muted-foreground">
                Sender must fill this before sending.
              </div>
            </div>
            <Switch checked={required} onCheckedChange={setRequired} />
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={submit}>
            {mode === "create" ? "Save field" : "Save changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
