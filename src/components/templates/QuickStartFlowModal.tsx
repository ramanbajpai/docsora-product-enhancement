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
import { WorkflowTemplate } from "@/data/templates";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Zap,
  Settings2,
  Plus,
  X,
  Users,
  ClipboardPaste,
  ArrowLeft,
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
type Mode = "single" | "many";
type SendModel = "shared" | "individual";

type Recipient = {
  id: string;
  name: string;
  email: string;
  roleKey: string;
};

const uid = () => Math.random().toString(36).slice(2, 9);
const isEmail = (s: string) => /\S+@\S+\.\S+/.test(s.trim());

// Parse "Name <email>", "Name, email", "email", separated by , ; or newlines.
function parseRecipientList(input: string): { name: string; email: string }[] {
  return input
    .split(/[\n,;]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const angle = line.match(/^(.*?)<([^>]+)>$/);
      if (angle) {
        return { name: angle[1].trim().replace(/["']/g, ""), email: angle[2].trim() };
      }
      const parts = line.split(/\s+/);
      const emailIdx = parts.findIndex(isEmail);
      if (emailIdx === -1) return { name: line, email: "" };
      const email = parts[emailIdx];
      const name = parts.filter((_, i) => i !== emailIdx).join(" ").trim();
      return { name: name || email.split("@")[0], email };
    })
    .filter((r) => isEmail(r.email));
}

export function QuickStartFlowModal({ open, onOpenChange, flow }: QuickStartFlowModalProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("form");
  const [mode, setMode] = useState<Mode>("single");

  // Single mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Many mode
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [sendModel, setSendModel] = useState<SendModel>("individual");
  const [showPaste, setShowPaste] = useState(false);
  const [pasteValue, setPasteValue] = useState("");

  // Default role for new recipients = first non-sender role.
  const defaultRoleKey = useMemo(() => {
    if (!flow) return "client";
    const nonSender = flow.roles.find((r) => r.key !== "sender");
    return (nonSender ?? flow.roles[0])?.key ?? "client";
  }, [flow]);

  const assignableRoles = useMemo(
    () => flow?.roles.filter((r) => r.key !== "sender") ?? [],
    [flow],
  );

  useEffect(() => {
    if (open) {
      setStage("form");
      setMode("single");
      setName("");
      setEmail("");
      setRecipients([{ id: uid(), name: "", email: "", roleKey: defaultRoleKey }]);
      setSendModel("individual");
      setShowPaste(false);
      setPasteValue("");
    }
  }, [open, flow?.id, defaultRoleKey]);

  if (!flow) return null;

  const validRecipients = recipients.filter((r) => r.name.trim() && isEmail(r.email));
  const canStart =
    mode === "single"
      ? name.trim().length > 0 && isEmail(email)
      : validRecipients.length > 0;

  const totalCount = mode === "single" ? 1 : validRecipients.length;

  const handleStart = () => {
    if (!canStart) return;
    setStage("starting");
    setTimeout(() => setStage("done"), 900);
  };

  const handleOpenFlow = () => {
    const target =
      mode === "single" ? name : `${totalCount} recipient${totalCount === 1 ? "" : "s"}`;
    toast.success(`${flow.name} started`, {
      description: `Flow ready for ${target}.`,
    });
    onOpenChange(false);
  };

  const handleCustomize = () => {
    onOpenChange(false);
    const params = new URLSearchParams({ from: flow.id });
    if (mode === "single") {
      if (name.trim()) params.set("client", name.trim());
      if (email.trim()) params.set("email", email.trim());
    }
    navigate(`/templates/new?${params.toString()}`);
  };

  // Recipient row helpers
  const addRow = () =>
    setRecipients((r) => [
      ...r,
      { id: uid(), name: "", email: "", roleKey: defaultRoleKey },
    ]);
  const removeRow = (id: string) =>
    setRecipients((r) => (r.length === 1 ? r : r.filter((x) => x.id !== id)));
  const updateRow = (id: string, patch: Partial<Recipient>) =>
    setRecipients((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)));

  const applyPaste = () => {
    const parsed = parseRecipientList(pasteValue);
    if (parsed.length === 0) {
      toast.error("No valid emails found", {
        description: "Use 'Name <email>', commas or new lines.",
      });
      return;
    }
    setRecipients((existing) => {
      const seen = new Set(
        existing.map((r) => r.email.trim().toLowerCase()).filter(Boolean),
      );
      const merged = [...existing.filter((r) => r.name.trim() || r.email.trim())];
      for (const p of parsed) {
        const key = p.email.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        merged.push({ id: uid(), name: p.name, email: p.email, roleKey: defaultRoleKey });
      }
      return merged.length ? merged : existing;
    });
    setPasteValue("");
    setShowPaste(false);
    toast.success(`${parsed.length} recipient${parsed.length === 1 ? "" : "s"} added`);
  };

  const switchToMany = () => {
    // Carry over single-mode values as the first row.
    setRecipients((rows) => {
      const seed: Recipient = {
        id: uid(),
        name: name.trim(),
        email: email.trim(),
        roleKey: defaultRoleKey,
      };
      // If user already had rows queued, keep them; otherwise seed from single fields.
      const hasContent = rows.some((r) => r.name.trim() || r.email.trim());
      if (hasContent) return rows;
      return [seed.name || seed.email ? seed : { ...seed, name: "", email: "" }];
    });
    setMode("many");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "p-0 overflow-hidden border-border/60 bg-background transition-all",
          mode === "single" ? "max-w-md" : "max-w-2xl",
        )}
      >
        <DialogTitle className="sr-only">Start {flow.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Add recipients and start this flow.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key={`form-${mode}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {mode === "many" && (
                    <button
                      onClick={() => setMode("single")}
                      className="text-muted-foreground hover:text-foreground transition-colors -ml-1"
                      aria-label="Back to single recipient"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center text-xl shrink-0">
                    {flow.icon}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold tracking-tight truncate">
                      {flow.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {mode === "single"
                        ? "Ready to send"
                        : `${validRecipients.length} of ${recipients.length} ready`}
                    </p>
                  </div>
                </div>
              </div>

              {/* SINGLE MODE */}
              {mode === "single" && (
                <>
                  <div className="px-6 py-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                        Client name
                      </label>
                      <Input
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Acme Inc."
                        maxLength={120}
                        className="h-11 bg-muted/30 border-border/50"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                        Client email
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@company.com"
                        maxLength={254}
                        className="h-11 bg-muted/30 border-border/50"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && canStart) handleStart();
                        }}
                      />
                    </div>

                    <button
                      onClick={switchToMany}
                      className="w-full mt-1 flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      Add more recipients
                    </button>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <Button
                      onClick={handleStart}
                      disabled={!canStart}
                      className="w-full h-11 gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Start Flow
                    </Button>
                    <button
                      onClick={handleCustomize}
                      className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <Settings2 className="w-3 h-3" />
                      Customize before sending
                    </button>
                  </div>
                </>
              )}

              {/* MANY MODE */}
              {mode === "many" && (
                <>
                  <div className="px-6 py-3 max-h-[420px] overflow-y-auto">
                    {/* Recipient rows */}
                    <div className="space-y-2">
                      {recipients.map((r, i) => {
                        const role = flow.roles.find((x) => x.key === r.roleKey);
                        const invalid =
                          r.email.trim().length > 0 && !isEmail(r.email);
                        return (
                          <div
                            key={r.id}
                            className="grid grid-cols-[1fr_1.3fr_auto_auto] gap-2 items-center"
                          >
                            <Input
                              value={r.name}
                              onChange={(e) => updateRow(r.id, { name: e.target.value })}
                              placeholder={i === 0 ? "Full name" : "Name"}
                              maxLength={120}
                              className="h-10 bg-muted/30 border-border/50"
                              autoFocus={i === 0 && !r.name && !r.email}
                            />
                            <Input
                              value={r.email}
                              type="email"
                              onChange={(e) => updateRow(r.id, { email: e.target.value })}
                              placeholder="email@company.com"
                              maxLength={254}
                              className={cn(
                                "h-10 bg-muted/30 border-border/50",
                                invalid && "border-destructive/60 focus-visible:ring-destructive/40",
                              )}
                            />
                            <select
                              value={r.roleKey}
                              onChange={(e) => updateRow(r.id, { roleKey: e.target.value })}
                              className="h-10 rounded-md border border-border/50 bg-muted/30 px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              aria-label={`Role for ${r.name || "recipient"}`}
                              title={role?.description}
                            >
                              {assignableRoles.map((role) => (
                                <option key={role.key} value={role.key}>
                                  {role.label}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => removeRow(r.id)}
                              disabled={recipients.length === 1}
                              className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent disabled:opacity-30 transition-colors"
                              aria-label="Remove recipient"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Add / paste actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={addRow}
                        className="flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-primary transition-colors h-8 px-2.5 rounded-md hover:bg-accent"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add recipient
                      </button>
                      <button
                        onClick={() => setShowPaste((v) => !v)}
                        className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors h-8 px-2.5 rounded-md hover:bg-accent"
                      >
                        <ClipboardPaste className="w-3.5 h-3.5" />
                        Paste list
                      </button>
                      <span className="ml-auto text-[11px] text-muted-foreground tabular-nums">
                        {validRecipients.length} ready · {recipients.length} total
                      </span>
                    </div>

                    {/* Paste panel */}
                    <AnimatePresence>
                      {showPaste && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-lg border border-border/50 bg-muted/20 p-3">
                            <textarea
                              value={pasteValue}
                              onChange={(e) => setPasteValue(e.target.value)}
                              placeholder={`Jane Doe <jane@acme.com>\nJohn Smith, john@beta.com\nsam@gamma.com`}
                              rows={4}
                              maxLength={5000}
                              className="w-full bg-background border border-border/50 rounded-md px-3 py-2 text-xs font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-[10px] text-muted-foreground">
                                One per line. Format: <code>Name &lt;email&gt;</code>, commas or just emails.
                              </p>
                              <div className="flex items-center gap-1.5">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    setShowPaste(false);
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
                                  Add
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Send model toggle */}
                    <div className="mt-5 pt-4 border-t border-border/50">
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

                  <div className="px-6 pb-6 pt-3 border-t border-border/50 bg-muted/10">
                    <Button
                      onClick={handleStart}
                      disabled={!canStart}
                      className="w-full h-11 gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      Start Flow
                      <span className="text-xs font-normal opacity-80">
                        · {validRecipients.length} recipient{validRecipients.length === 1 ? "" : "s"}
                      </span>
                    </Button>
                    <button
                      onClick={handleCustomize}
                      className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1.5"
                    >
                      <Settings2 className="w-3 h-3" />
                      Customize before sending
                    </button>
                  </div>
                </>
              )}
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
                {mode === "single"
                  ? "Starting your flow…"
                  : `Sending to ${totalCount} recipient${totalCount === 1 ? "" : "s"}…`}
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
                {flow.name}{" "}
                {mode === "single" ? (
                  <>
                    for <span className="text-foreground font-medium">{name}</span>
                  </>
                ) : (
                  <>
                    sent to{" "}
                    <span className="text-foreground font-medium">
                      {totalCount} recipient{totalCount === 1 ? "" : "s"}
                    </span>
                    {sendModel === "shared" ? " on one shared document" : " as individual copies"}
                  </>
                )}{" "}
                is on its way.
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
