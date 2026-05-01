import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { templates, WorkflowTemplate } from "@/data/templates";
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles,
  CheckCircle2,
  FileText,
  Users,
  Workflow,
  Loader2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface StartProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTemplateId?: string;
}

type Stage = "pick" | "fill" | "generating" | "done";

export function StartProjectModal({
  open,
  onOpenChange,
  initialTemplateId,
}: StartProjectModalProps) {
  const [stage, setStage] = useState<Stage>("pick");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<WorkflowTemplate | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});

  // Reset on open + accept initial template
  useEffect(() => {
    if (open) {
      if (initialTemplateId) {
        const t = templates.find((x) => x.id === initialTemplateId);
        if (t) {
          setSelected(t);
          setStage("fill");
          return;
        }
      }
      setStage("pick");
      setSelected(null);
      setValues({});
      setQuery("");
    }
  }, [open, initialTemplateId]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return templates;
    return templates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  }, [query]);

  const canGenerate =
    selected &&
    selected.fields.every((f) => !f.required || (values[f.key]?.trim() ?? "") !== "");

  const handleGenerate = () => {
    if (!selected || !canGenerate) return;
    setStage("generating");
    // Simulate fast generation (UI is the system)
    setTimeout(() => setStage("done"), 1100);
  };

  const handleLaunch = () => {
    toast.success(`${selected?.name} project launched`, {
      description: `Workflow ready for ${values.clientName ?? "your client"}.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border/60 bg-background">
        <DialogTitle className="sr-only">Start a project from a template</DialogTitle>
        <DialogDescription className="sr-only">
          Pick a workflow template and launch a fully structured client project in seconds.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {stage === "pick" && (
            <motion.div
              key="pick"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                    Start a project
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Pick a workflow blueprint
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Documents, roles, and steps — pre-wired. You just add the client.
                </p>

                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search templates…"
                    className="pl-9 h-10 bg-muted/40 border-border/50"
                  />
                </div>
              </div>

              {/* List */}
              <div className="max-h-[420px] overflow-y-auto px-3 py-3">
                {filtered.length === 0 ? (
                  <div className="px-4 py-12 text-center text-sm text-muted-foreground">
                    No templates match "{query}"
                  </div>
                ) : (
                  <div className="space-y-1">
                    {filtered.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelected(t);
                          setStage("fill");
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-accent/60 transition-colors flex items-start gap-3 group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center text-lg shrink-0">
                          {t.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium truncate">{t.name}</span>
                            {t.popular && (
                              <span className="text-[9px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">
                            {t.description}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5 text-[11px] text-muted-foreground/80">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {t.documents.length} docs
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {t.roles.length} roles
                            </span>
                            <span className="flex items-center gap-1 text-primary/80">
                              <Zap className="w-3 h-3" />
                              {t.estimatedTime}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity self-center" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {stage === "fill" && selected && (
            <motion.div
              key="fill"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <div className="px-6 pt-6 pb-4 border-b border-border/50">
                <button
                  onClick={() => setStage("pick")}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Back to templates
                </button>
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center text-xl shrink-0">
                    {selected.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selected.tagline}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">
                {/* Dynamic fields */}
                <div className="space-y-3">
                  {selected.fields.map((f) => (
                    <div key={f.key}>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        {f.label}
                        {f.required && <span className="text-primary ml-0.5">*</span>}
                      </label>
                      <Input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={values[f.key] ?? ""}
                        onChange={(e) =>
                          setValues((v) => ({ ...v, [f.key]: e.target.value }))
                        }
                        className="h-10 bg-muted/30 border-border/50"
                      />
                    </div>
                  ))}
                </div>

                {/* What you'll get — at a glance */}
                <div className="rounded-xl border border-border/50 bg-muted/20 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Workflow className="w-3.5 h-3.5" />
                    What gets created
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div>
                      <div className="text-muted-foreground/80 mb-1">
                        {selected.documents.length} documents
                      </div>
                      <ul className="space-y-0.5">
                        {selected.documents.map((d) => (
                          <li key={d.id} className="flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-primary/70 shrink-0" />
                            <span className="truncate">{d.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-muted-foreground/80 mb-1">
                        {selected.flow.length}-step flow
                      </div>
                      <ul className="space-y-0.5">
                        {selected.flow.map((s, i) => (
                          <li key={s.id} className="flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-primary/10 text-primary text-[9px] font-semibold flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <span className="truncate">{s.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between bg-muted/10">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-primary" />
                  {selected.estimatedTime}
                </span>
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="gap-2"
                >
                  Launch project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "generating" && selected && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-16 flex flex-col items-center justify-center min-h-[360px]"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <div className="relative w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              </div>
              <h3 className="mt-5 text-base font-semibold">Building your workflow…</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Wiring {selected.documents.length} documents and {selected.flow.length} steps
              </p>
            </motion.div>
          )}

          {stage === "done" && selected && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-10 flex flex-col items-center text-center min-h-[360px] justify-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                Project ready
              </h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm">
                {selected.name} for{" "}
                <span className="text-foreground font-medium">
                  {values.clientName || "your client"}
                </span>{" "}
                is wired up and ready to send.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={handleLaunch} className="gap-2">
                  Open project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
