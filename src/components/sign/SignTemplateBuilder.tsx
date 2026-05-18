import { useCallback, useMemo, useRef, useState } from "react";
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
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  SignField,
  SignFieldType,
  SignTemplate,
  SignTemplateRole,
  useSignTemplates,
} from "@/hooks/useSignTemplates";

const uid = () => Math.random().toString(36).slice(2, 9);

interface SignTemplateBuilderProps {
  onBack: () => void;
  onSaved: () => void;
}

type BuilderStep = "upload" | "configure" | "fields";

const ROLE_COLORS = ["#3b82f6", "#a78bfa", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];

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
    { key: "client", label: "Client", color: ROLE_COLORS[0], signingOrder: 1 },
    { key: "sender", label: "You", color: ROLE_COLORS[1], signingOrder: 2 },
  ]);
  const [fields, setFields] = useState<SignField[]>([]);
  const [page, setPage] = useState(1);
  const pageCount = 3;
  const [activeRoleKey, setActiveRoleKey] = useState<string>("client");
  const [activeTool, setActiveTool] = useState(FIELD_TOOLS[0]);
  const pageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ───────── upload ───────── */
  const onPickFile = useCallback((f: File) => {
    setFile(f);
    if (!name) setName(f.name.replace(/\.[^.]+$/, ""));
    setStep("configure");
  }, [name]);

  /* ───────── roles ───────── */
  const addRole = () => {
    if (roles.length >= 6) return;
    const idx = roles.length;
    const key = `role-${uid()}`;
    setRoles((r) => [
      ...r,
      { key, label: `Signer ${idx + 1}`, color: ROLE_COLORS[idx % ROLE_COLORS.length], signingOrder: idx + 1 },
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
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const f: SignField = {
      id: uid(),
      type: activeTool.kind,
      roleKey: activeRoleKey,
      page,
      x: Math.max(0, Math.min(100 - activeTool.w, x - activeTool.w / 2)),
      y: Math.max(0, Math.min(100 - activeTool.h, y - activeTool.h / 2)),
      width: activeTool.w,
      height: activeTool.h,
    };
    setFields((p) => [...p, f]);
  };
  const removeField = (id: string) => setFields((p) => p.filter((f) => f.id !== id));

  const pageFields = useMemo(() => fields.filter((f) => f.page === page), [fields, page]);

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
      documentName: file?.name || `${name}.pdf`,
      pageCount,
      roles,
      fields,
      signingMode,
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
                const f = e.dataTransfer.files?.[0];
                if (f) onPickFile(f);
              }}
              className="rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/50 transition-colors cursor-pointer px-6 py-16 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <UploadIcon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-[14px] font-medium">Upload the agreement to templatize</p>
              <p className="text-[12px] text-muted-foreground mt-1">
                PDF or Word doc — drop it here or click to browse.
              </p>
              <Button size="sm" className="mt-5 h-9 rounded-lg" type="button">
                Choose file
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onPickFile(f);
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
            {/* doc summary */}
            <div className="rounded-xl border border-border/50 bg-card/40 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium truncate">{file?.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {pageCount} pages · template document
                </p>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setStep("upload")} className="h-8">
                Replace
              </Button>
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
                    className="rounded-xl border border-border/50 bg-card/30 p-3 flex items-center gap-2"
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
                      className="h-9 bg-background/60 flex-1"
                    />
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
              <div>
                <Label>Assign field to role</Label>
                <div className="space-y-1.5">
                  {roles.map((r) => {
                    const active = r.key === activeRoleKey;
                    const count = fields.filter((f) => f.roleKey === r.key).length;
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
                        <span className="text-[10px] text-muted-foreground tabular-nums">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>Field type</Label>
                <div className="grid grid-cols-2 gap-1.5">
                  {FIELD_TOOLS.map((t) => {
                    const Icon = t.icon;
                    const active = activeTool.kind === t.kind && activeTool.label === t.label;
                    return (
                      <button
                        key={t.label}
                        onClick={() => setActiveTool(t)}
                        className={cn(
                          "flex items-center gap-1.5 px-2 py-2 rounded-lg border transition-colors text-left",
                          active
                            ? "border-primary/30 bg-primary/5 text-primary"
                            : "border-border/50 bg-card/30 hover:bg-card/60 text-foreground/80",
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-medium">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
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
                  {fields.length} field{fields.length === 1 ? "" : "s"} total
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
                        <Icon className="w-3 h-3 shrink-0" style={{ color: role?.color }} />
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
