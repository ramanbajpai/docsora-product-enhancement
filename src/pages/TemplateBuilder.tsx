import { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Plus,
  UploadCloud,
  X,
  PenLine,
  Type,
  Calendar,
  Trash2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  useCustomTemplates,
  CustomRole,
  PlacedField,
  CustomFieldType,
  CustomTemplate,
} from "@/hooks/useCustomTemplates";

type Step = "upload" | "roles" | "place";

const ROLE_PALETTE = [
  "hsl(217 92% 60%)", // primary blue (sender)
  "hsl(160 84% 39%)", // green (client)
  "hsl(38 92% 50%)",  // amber (approver)
  "hsl(280 84% 60%)", // violet (extra)
  "hsl(340 82% 60%)", // pink
];

const DEFAULT_ROLES: CustomRole[] = [
  { key: "sender", label: "You (Sender)", color: ROLE_PALETTE[0] },
  { key: "client", label: "Client", color: ROLE_PALETTE[1] },
];

const FIELD_DEFS: { type: CustomFieldType; label: string; icon: typeof PenLine; w: number; h: number }[] = [
  { type: "signature", label: "Signature", icon: PenLine, w: 22, h: 8 },
  { type: "text", label: "Text", icon: Type, w: 18, h: 5 },
  { type: "date", label: "Date", icon: Calendar, w: 14, h: 5 },
];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function TemplateBuilder() {
  const navigate = useNavigate();
  const { save } = useCustomTemplates();

  const [step, setStep] = useState<Step>("upload");
  const [docName, setDocName] = useState<string>("");
  const [docType, setDocType] = useState<"pdf" | "docx">("pdf");
  const [pageCount, setPageCount] = useState<number>(3); // simulated
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [roles, setRoles] = useState<CustomRole[]>(DEFAULT_ROLES);
  const [activeRole, setActiveRole] = useState<string>("client");
  const [activeTool, setActiveTool] = useState<CustomFieldType | null>(null);
  const [fields, setFields] = useState<PlacedField[]>([]);
  const [templateName, setTemplateName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  // ─────────────── Upload ───────────────
  const handleFile = useCallback((file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf" && ext !== "docx") {
      toast.error("Please upload a PDF or DOCX file");
      return;
    }
    setDocName(file.name);
    setDocType(ext as "pdf" | "docx");
    // Simulate page count from size
    const pages = Math.max(1, Math.min(8, Math.ceil(file.size / (60 * 1024))));
    setPageCount(pages);
    setTemplateName(file.name.replace(/\.(pdf|docx)$/i, ""));
    setStep("roles");
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  // ─────────────── Roles ───────────────
  const addRole = () => {
    if (roles.length >= 5) return;
    const idx = roles.length;
    const newRole: CustomRole = {
      key: `role_${uid()}`,
      label: idx === 2 ? "Approver" : "New role",
      color: ROLE_PALETTE[idx % ROLE_PALETTE.length],
    };
    setRoles((r) => [...r, newRole]);
  };

  const removeRole = (key: string) => {
    if (roles.length <= 1) return;
    setRoles((r) => r.filter((x) => x.key !== key));
    setFields((f) => f.filter((x) => x.roleKey !== key));
    if (activeRole === key) setActiveRole(roles[0]?.key);
  };

  const renameRole = (key: string, label: string) => {
    setRoles((r) => r.map((x) => (x.key === key ? { ...x, label } : x)));
  };

  // ─────────────── Field placement ───────────────
  const placeField = (e: React.MouseEvent) => {
    if (!activeTool || !pageRef.current) return;
    const def = FIELD_DEFS.find((d) => d.type === activeTool)!;
    const rect = pageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100 - def.w / 2;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - def.h / 2;
    const newField: PlacedField = {
      id: uid(),
      type: activeTool,
      roleKey: activeRole,
      page: currentPage,
      x: Math.max(0, Math.min(100 - def.w, x)),
      y: Math.max(0, Math.min(100 - def.h, y)),
      width: def.w,
      height: def.h,
    };
    setFields((f) => [...f, newField]);
    setActiveTool(null);
  };

  const removeField = (id: string) => setFields((f) => f.filter((x) => x.id !== id));

  // ─────────────── Save ───────────────
  const canSave = templateName.trim().length > 0 && fields.length > 0;

  const handleSave = () => {
    if (!canSave) {
      toast.error(fields.length === 0 ? "Place at least one field" : "Name your template");
      return;
    }
    const tpl: CustomTemplate = {
      id: uid(),
      name: templateName.trim(),
      createdAt: Date.now(),
      documentName: docName,
      documentType: docType,
      pageCount,
      roles,
      fields,
    };
    save(tpl);
    toast.success("Template saved", { description: `${tpl.name} is ready to send.` });
    navigate("/templates");
  };

  const fieldsOnPage = useMemo(
    () => fields.filter((f) => f.page === currentPage),
    [fields, currentPage],
  );

  const roleColor = (key: string) =>
    roles.find((r) => r.key === key)?.color ?? "hsl(217 92% 60%)";

  // ─────────────── Render ───────────────
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-1px)]">
        {/* Top bar */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur px-5 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/templates")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to templates"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                New template
              </span>
            </div>
            {step !== "upload" && (
              <input
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Untitled template"
                className="bg-transparent border-0 outline-none text-sm font-medium tracking-tight focus:ring-0 w-56 placeholder:text-muted-foreground"
              />
            )}
          </div>

          {/* Step pills */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] font-medium">
            {(["upload", "roles", "place"] as Step[]).map((s, i) => {
              const labels = ["Upload", "Roles", "Fields"];
              const idx = ["upload", "roles", "place"].indexOf(step);
              const done = i < idx;
              const active = i === idx;
              return (
                <div key={s} className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "h-6 px-2.5 rounded-full flex items-center gap-1.5 transition-colors",
                      active && "bg-primary text-primary-foreground",
                      done && "bg-primary/10 text-primary",
                      !active && !done && "bg-muted text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                    <span>{labels[i]}</span>
                  </div>
                  {i < 2 && <div className="w-4 h-px bg-border" />}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {step === "place" && (
              <Button onClick={handleSave} disabled={!canSave} size="sm" className="gap-2">
                <Check className="w-4 h-4" />
                Save template
              </Button>
            )}
          </div>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {/* ───── Step 1: Upload ───── */}
            {step === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="max-w-xl w-full text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Upload your contract or agreement
                  </h1>
                  <p className="text-sm text-muted-foreground mt-2">
                    PDF or DOCX. We&apos;ll prepare it as a reusable, send-ready template.
                  </p>
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-8 rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors p-12 cursor-pointer group"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                      <UploadCloud className="w-6 h-6 text-primary" />
                    </div>
                    <p className="mt-4 text-sm font-medium">Drop file here or click to browse</p>
                    <p className="mt-1 text-xs text-muted-foreground">PDF, DOCX • up to 20MB</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* ───── Step 2: Roles ───── */}
            {step === "roles" && (
              <motion.div
                key="roles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex items-center justify-center p-8"
              >
                <div className="max-w-lg w-full">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Who&apos;s involved?
                    </h1>
                    <p className="text-sm text-muted-foreground mt-2">
                      Define roles first. You&apos;ll assign every field to one of them.
                    </p>
                  </div>

                  <div className="space-y-2">
                    {roles.map((r) => (
                      <div
                        key={r.key}
                        className="group flex items-center gap-3 px-3 h-12 rounded-xl border border-border/60 bg-card hover:border-border transition-colors"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: r.color }}
                        />
                        <input
                          value={r.label}
                          onChange={(e) => renameRole(r.key, e.target.value)}
                          className="flex-1 bg-transparent border-0 outline-none text-sm font-medium focus:ring-0"
                        />
                        {roles.length > 1 && (
                          <button
                            onClick={() => removeRole(r.key)}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition"
                            aria-label={`Remove ${r.label}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {roles.length < 5 && (
                      <button
                        onClick={addRole}
                        className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-dashed border-border/60 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                      >
                        <Plus className="w-4 h-4" /> Add role
                      </button>
                    )}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <Button variant="ghost" onClick={() => setStep("upload")} className="gap-1.5">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveRole(roles[0]?.key);
                        setStep("place");
                      }}
                      className="gap-2"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ───── Step 3: Place fields ───── */}
            {step === "place" && (
              <motion.div
                key="place"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex"
              >
                {/* Left rail: roles */}
                <aside className="w-60 border-r border-border/50 bg-muted/10 p-4 overflow-y-auto shrink-0">
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                    Assign to
                  </p>
                  <div className="space-y-1">
                    {roles.map((r) => {
                      const count = fields.filter((f) => f.roleKey === r.key).length;
                      const active = activeRole === r.key;
                      return (
                        <button
                          key={r.key}
                          onClick={() => setActiveRole(r.key)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-2.5 h-9 rounded-lg text-left text-sm transition-colors",
                            active
                              ? "bg-background border border-border shadow-sm"
                              : "hover:bg-background/60 text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: r.color }}
                          />
                          <span className="flex-1 truncate">{r.label}</span>
                          <span className="text-[10px] text-muted-foreground tabular-nums">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                      Tip
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Pick a tool above, then click anywhere on the page. The field is assigned to
                      the selected role.
                    </p>
                  </div>
                </aside>

                {/* Center: document */}
                <div className="flex-1 flex flex-col overflow-hidden bg-muted/20">
                  {/* Field toolbar */}
                  <div className="h-12 border-b border-border/50 bg-background/80 backdrop-blur px-4 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1">
                      {FIELD_DEFS.map((f) => {
                        const Icon = f.icon;
                        const active = activeTool === f.type;
                        return (
                          <button
                            key={f.type}
                            onClick={() => setActiveTool(active ? null : f.type)}
                            className={cn(
                              "h-8 px-3 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors",
                              active
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent",
                            )}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {f.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="tabular-nums">
                        Page {currentPage} / {pageCount}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="h-7 w-7 rounded-md hover:bg-accent disabled:opacity-30 flex items-center justify-center"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
                          disabled={currentPage === pageCount}
                          className="h-7 w-7 rounded-md hover:bg-accent disabled:opacity-30 flex items-center justify-center"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Page canvas */}
                  <div className="flex-1 overflow-auto p-8 flex items-start justify-center">
                    <div
                      ref={pageRef}
                      onClick={placeField}
                      className={cn(
                        "relative bg-white shadow-xl rounded-md border border-border/40 select-none",
                        "w-[640px] aspect-[1/1.414]", // A4-ish
                        activeTool ? "cursor-crosshair" : "cursor-default",
                      )}
                    >
                      {/* Faux document content */}
                      <div className="absolute inset-0 p-12 pointer-events-none">
                        <div className="space-y-3">
                          <div className="h-3 w-2/3 bg-muted rounded" />
                          <div className="h-2 w-full bg-muted/60 rounded" />
                          <div className="h-2 w-11/12 bg-muted/60 rounded" />
                          <div className="h-2 w-10/12 bg-muted/60 rounded" />
                        </div>
                        <div className="mt-8 space-y-2">
                          {Array.from({ length: 14 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-2 bg-muted/50 rounded"
                              style={{ width: `${70 + ((i * 13) % 28)}%` }}
                            />
                          ))}
                        </div>
                        <div className="absolute bottom-12 left-12 right-12 text-[10px] text-muted-foreground/60 uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-3 h-3" />
                          {docName} · Page {currentPage}
                        </div>
                      </div>

                      {/* Placed fields */}
                      {fieldsOnPage.map((f) => {
                        const color = roleColor(f.roleKey);
                        const def = FIELD_DEFS.find((d) => d.type === f.type)!;
                        const Icon = def.icon;
                        const role = roles.find((r) => r.key === f.roleKey);
                        return (
                          <div
                            key={f.id}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute group rounded-md flex items-center gap-1.5 px-2 text-[11px] font-medium border-2 backdrop-blur-sm"
                            style={{
                              left: `${f.x}%`,
                              top: `${f.y}%`,
                              width: `${f.width}%`,
                              height: `${f.height}%`,
                              borderColor: color,
                              background: `color-mix(in hsl, ${color} 18%, transparent)`,
                              color,
                            }}
                          >
                            <Icon className="w-3 h-3 shrink-0" />
                            <span className="truncate">{role?.label}</span>
                            <button
                              onClick={() => removeField(f.id)}
                              className="ml-auto opacity-0 group-hover:opacity-100 hover:scale-110 transition"
                              aria-label="Remove field"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}

                      {/* Cursor hint */}
                      {activeTool && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[11px] bg-primary text-primary-foreground px-2.5 py-1 rounded-full shadow pointer-events-none">
                          Click to place {activeTool} for{" "}
                          {roles.find((r) => r.key === activeRole)?.label}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}
