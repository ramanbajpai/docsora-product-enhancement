import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WorkflowTemplate, TemplateRole } from "@/data/templates";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Zap,
  Settings2,
  Plus,
  X,
  ClipboardPaste,
  ArrowDownUp,
  Copy as CopyIcon,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface QuickStartFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flow: WorkflowTemplate | null;
}

type Stage = "form" | "starting" | "done";
type SendModel = "shared" | "individual";
type SignOrder = "parallel" | "sequential";

type Recipient = { id: string; name: string; email: string };
type RoleBuckets = Record<string, Recipient[]>;

const uid = () => Math.random().toString(36).slice(2, 9);
const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s.trim());

function parseRecipientList(input: string): { name: string; email: string }[] {
  return input
    .split(/[\n,;]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const angle = line.match(/^(.*?)<([^>]+)>$/);
      if (angle) return { name: angle[1].trim().replace(/["']/g, ""), email: angle[2].trim() };
      const parts = line.split(/\s+/);
      const emailIdx = parts.findIndex(isEmail);
      if (emailIdx === -1) return { name: line, email: "" };
      const email = parts[emailIdx];
      const name = parts.filter((_, i) => i !== emailIdx).join(" ").trim();
      return { name: name || email.split("@")[0], email };
    })
    .filter((r) => isEmail(r.email));
}

const emptyRow = (): Recipient => ({ id: uid(), name: "", email: "" });

export function QuickStartFlowModal({ open, onOpenChange, flow }: QuickStartFlowModalProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("form");

  // Roles other than the sender (sender is auto-filled).
  const assignableRoles = useMemo<TemplateRole[]>(
    () => flow?.roles.filter((r) => r.key !== "sender") ?? [],
    [flow],
  );

  const [buckets, setBuckets] = useState<RoleBuckets>({});
  const [enabledOptional, setEnabledOptional] = useState<Record<string, boolean>>({});
  const [pasteRoleKey, setPasteRoleKey] = useState<string | null>(null);
  const [pasteValue, setPasteValue] = useState("");
  const [sendModel, setSendModel] = useState<SendModel>("individual");
  const [signOrder, setSignOrder] = useState<SignOrder>("parallel");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Initialize on open / flow change.
  useEffect(() => {
    if (!open || !flow) return;
    const initial: RoleBuckets = {};
    const optional: Record<string, boolean> = {};
    for (const role of flow.roles) {
      if (role.key === "sender") continue;
      initial[role.key] = [emptyRow()];
      optional[role.key] = role.required; // only required visible by default
    }
    setBuckets(initial);
    setEnabledOptional(optional);
    setStage("form");
    setPasteRoleKey(null);
    setPasteValue("");
    setSendModel("individual");
    setSignOrder("parallel");
    setShowAdvanced(false);
  }, [open, flow?.id]);

  if (!flow) return null;

  const visibleRoles = assignableRoles.filter(
    (r) => r.required || enabledOptional[r.key],
  );
  const hiddenOptional = assignableRoles.filter(
    (r) => !r.required && !enabledOptional[r.key],
  );

  const allRows = visibleRoles.flatMap((r) => buckets[r.key] ?? []);
  const validRows = allRows.filter((r) => r.name.trim() && isEmail(r.email));

  // Required roles must each have at least one valid recipient.
  const requiredRolesSatisfied = visibleRoles
    .filter((r) => r.required)
    .every((r) =>
      (buckets[r.key] ?? []).some((row) => row.name.trim() && isEmail(row.email)),
    );

  const totalRecipients = validRows.length;
  const canStart = totalRecipients > 0 && requiredRolesSatisfied;

  // Row helpers
  const addRow = (roleKey: string) =>
    setBuckets((b) => ({ ...b, [roleKey]: [...(b[roleKey] ?? []), emptyRow()] }));
  const removeRow = (roleKey: string, id: string) =>
    setBuckets((b) => {
      const list = b[roleKey] ?? [];
      const next = list.length === 1 ? [emptyRow()] : list.filter((x) => x.id !== id);
      return { ...b, [roleKey]: next };
    });
  const updateRow = (roleKey: string, id: string, patch: Partial<Recipient>) =>
    setBuckets((b) => ({
      ...b,
      [roleKey]: (b[roleKey] ?? []).map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));

  const enableOptionalRole = (roleKey: string) =>
    setEnabledOptional((s) => ({ ...s, [roleKey]: true }));
  const disableOptionalRole = (roleKey: string) => {
    setEnabledOptional((s) => ({ ...s, [roleKey]: false }));
    setBuckets((b) => ({ ...b, [roleKey]: [emptyRow()] }));
  };

  const applyPaste = () => {
    if (!pasteRoleKey) return;
    const parsed = parseRecipientList(pasteValue);
    if (parsed.length === 0) {
      toast.error("No valid emails found", {
        description: "Use 'Name <email>', commas or new lines.",
      });
      return;
    }
    setBuckets((b) => {
      const existing = b[pasteRoleKey] ?? [];
      const seen = new Set(
        existing.map((r) => r.email.trim().toLowerCase()).filter(Boolean),
      );
      const kept = existing.filter((r) => r.name.trim() || r.email.trim());
      const merged: Recipient[] = [...kept];
      for (const p of parsed) {
        const key = p.email.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        merged.push({ id: uid(), name: p.name, email: p.email });
      }
      return { ...b, [pasteRoleKey]: merged.length ? merged : [emptyRow()] };
    });
    toast.success(`${parsed.length} recipient${parsed.length === 1 ? "" : "s"} added`);
    setPasteValue("");
    setPasteRoleKey(null);
  };

  const handleStart = () => {
    if (!canStart) return;
    setStage("starting");
    setTimeout(() => setStage("done"), 900);
  };

  const handleOpenFlow = () => {
    toast.success(`${flow.name} started`, {
      description: `Flow ready for ${totalRecipients} recipient${totalRecipients === 1 ? "" : "s"}.`,
    });
    onOpenChange(false);
  };

  const handleCustomize = () => {
    onOpenChange(false);
    const params = new URLSearchParams({ from: flow.id });
    navigate(`/templates/new?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden border-border/60 bg-background max-w-xl">
        <DialogTitle className="sr-only">Start {flow.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Assign people to roles and start this flow.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center text-xl shrink-0">
                  {flow.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold tracking-tight truncate">
                    {flow.name}
                  </h2>
                  <p className="text-xs text-muted-foreground truncate">
                    {totalRecipients === 0
                      ? "Add people to each role to start"
                      : `${totalRecipients} recipient${totalRecipients === 1 ? "" : "s"} ready`}
                  </p>
                </div>
              </div>

              {/* Role sections */}
              <div className="px-6 pb-2 max-h-[460px] overflow-y-auto space-y-5">
                {visibleRoles.map((role) => {
                  const rows = buckets[role.key] ?? [];
                  const validInRole = rows.filter(
                    (r) => r.name.trim() && isEmail(r.email),
                  ).length;
                  return (
                    <section key={role.key}>
                      <div className="flex items-baseline justify-between mb-2">
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-sm font-semibold tracking-tight">
                            {role.label}
                          </h3>
                          {!role.required && (
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                              Optional
                            </span>
                          )}
                          {validInRole > 0 && (
                            <span className="text-[11px] text-muted-foreground tabular-nums">
                              · {validInRole}
                            </span>
                          )}
                        </div>
                        {!role.required && (
                          <button
                            onClick={() => disableOptionalRole(role.key)}
                            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {rows.map((r, i) => {
                          const invalid =
                            r.email.trim().length > 0 && !isEmail(r.email);
                          return (
                            <div
                              key={r.id}
                              className="grid grid-cols-[1fr_1.3fr_auto] gap-2 items-center"
                            >
                              <Input
                                value={r.name}
                                onChange={(e) =>
                                  updateRow(role.key, r.id, { name: e.target.value })
                                }
                                placeholder="Full name"
                                maxLength={120}
                                className="h-10 bg-muted/30 border-border/50"
                                autoFocus={i === 0 && role.required && !r.name && !r.email}
                              />
                              <Input
                                value={r.email}
                                type="email"
                                onChange={(e) =>
                                  updateRow(role.key, r.id, { email: e.target.value })
                                }
                                placeholder="email@company.com"
                                maxLength={254}
                                className={cn(
                                  "h-10 bg-muted/30 border-border/50",
                                  invalid &&
                                    "border-destructive/60 focus-visible:ring-destructive/40",
                                )}
                              />
                              <button
                                onClick={() => removeRow(role.key, r.id)}
                                disabled={rows.length === 1}
                                className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent disabled:opacity-30 transition-colors"
                                aria-label="Remove recipient"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-1 mt-2">
                        <button
                          onClick={() => addRow(role.key)}
                          className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors h-8 px-2 -ml-2 rounded-md hover:bg-accent"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add another {role.label.toLowerCase()}
                        </button>
                        <button
                          onClick={() => {
                            setPasteRoleKey(role.key);
                            setPasteValue("");
                          }}
                          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors h-8 px-2 rounded-md hover:bg-accent"
                        >
                          <ClipboardPaste className="w-3.5 h-3.5" />
                          Paste list
                        </button>
                      </div>

                      <AnimatePresence>
                        {pasteRoleKey === role.key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 rounded-lg border border-border/50 bg-muted/20 p-3">
                              <textarea
                                value={pasteValue}
                                onChange={(e) => setPasteValue(e.target.value)}
                                placeholder={`Jane Doe <jane@acme.com>\nJohn Smith, john@beta.com\nsam@gamma.com`}
                                rows={3}
                                maxLength={5000}
                                autoFocus
                                className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                              <div className="flex items-center justify-end gap-1.5 mt-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setPasteRoleKey(null);
                                    setPasteValue("");
                                  }}
                                  className="h-7 text-xs"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={applyPaste}
                                  disabled={!pasteValue.trim()}
                                  className="h-7 text-xs"
                                >
                                  Add to {role.label}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>
                  );
                })}

                {/* Add optional role */}
                {hiddenOptional.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-muted-foreground mr-1">
                      Add role:
                    </span>
                    {hiddenOptional.map((role) => (
                      <button
                        key={role.key}
                        onClick={() => enableOptionalRole(role.key)}
                        className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-dashed border-border/60 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        {role.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Advanced */}
                <div className="pt-1">
                  <button
                    onClick={() => setShowAdvanced((v) => !v)}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    <ArrowDownUp className="w-3 h-3" />
                    {showAdvanced ? "Hide" : "Signing order & send options"}
                  </button>

                  <AnimatePresence>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                              Signing order
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setSignOrder("parallel")}
                                className={cn(
                                  "rounded-lg border p-3 text-left transition-colors",
                                  signOrder === "parallel"
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-border bg-card",
                                )}
                              >
                                <span className="text-xs font-semibold">Sign in parallel</span>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                  Everyone signs at the same time.
                                </p>
                              </button>
                              <button
                                onClick={() => setSignOrder("sequential")}
                                className={cn(
                                  "rounded-lg border p-3 text-left transition-colors",
                                  signOrder === "sequential"
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-border bg-card",
                                )}
                              >
                                <span className="text-xs font-semibold">Sign in order</span>
                                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                                  Pass the document one by one.
                                </p>
                              </button>
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                              Send as
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => setSendModel("individual")}
                                className={cn(
                                  "rounded-lg border p-3 text-left transition-colors",
                                  sendModel === "individual"
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-border bg-card",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <CopyIcon className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-xs font-semibold">Individual copies</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                                  Each recipient gets their own copy.
                                </p>
                              </button>
                              <button
                                onClick={() => setSendModel("shared")}
                                className={cn(
                                  "rounded-lg border p-3 text-left transition-colors",
                                  sendModel === "shared"
                                    ? "border-primary bg-primary/5"
                                    : "border-border/50 hover:border-border bg-card",
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <Layers className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-xs font-semibold">Same document</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                                  All recipients sign one shared document.
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 pt-4 mt-2 border-t border-border/50 bg-muted/10">
                <Button
                  onClick={handleStart}
                  disabled={!canStart}
                  className="w-full h-11 gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Start Flow
                  {totalRecipients > 0 && (
                    <span className="text-xs font-normal opacity-80">
                      · {totalRecipients} recipient{totalRecipients === 1 ? "" : "s"}
                    </span>
                  )}
                </Button>
                <button
                  onClick={handleCustomize}
                  className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Settings2 className="w-3 h-3" />
                  Customize before sending
                </button>
              </div>
            </motion.div>
          )}

          {stage === "starting" && (
            <motion.div
              key="starting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 py-14 flex flex-col items-center justify-center min-h-[280px]"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                <div className="relative w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
              </div>
              <p className="mt-5 text-sm font-medium">
                Sending to {totalRecipients} recipient{totalRecipients === 1 ? "" : "s"}…
              </p>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-10 flex flex-col items-center text-center min-h-[280px] justify-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center"
              >
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">Flow started</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                {flow.name} sent to{" "}
                <span className="text-foreground font-medium">
                  {totalRecipients} recipient{totalRecipients === 1 ? "" : "s"}
                </span>
                {sendModel === "shared" ? " on one shared document" : " as individual copies"}
                {signOrder === "sequential" ? ", signing in order" : ""}.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button onClick={handleOpenFlow} className="gap-2">
                  Open flow
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
