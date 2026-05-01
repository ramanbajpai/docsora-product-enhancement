import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomRole, CustomTemplate } from "@/hooks/useCustomTemplates";
import {
  ArrowDownUp,
  ArrowRight,
  CheckCircle2,
  ClipboardPaste,
  Copy as CopyIcon,
  FileText,
  Layers,
  Plus,
  Send,
  Sparkles,
  UserCheck,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: CustomTemplate | null;
}

type Recipient = { id: string; name: string; email: string };
type RoleBuckets = Record<string, Recipient[]>;
type SendModel = "shared" | "individual";
type SignOrder = "parallel" | "sequential";

const uid = () => Math.random().toString(36).slice(2, 9);
const emptyRow = (): Recipient => ({ id: uid(), name: "", email: "" });
const isEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value.trim());

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
      const emailIndex = parts.findIndex(isEmail);
      if (emailIndex === -1) return { name: line, email: "" };
      const email = parts[emailIndex];
      const name = parts.filter((_, index) => index !== emailIndex).join(" ").trim();
      return { name: name || email.split("@")[0], email };
    })
    .filter((recipient) => isEmail(recipient.email));
}

export function SendTemplateModal({ open, onOpenChange, template }: Props) {
  const [stage, setStage] = useState<"form" | "sent">("form");
  const [buckets, setBuckets] = useState<RoleBuckets>({});
  const [pasteRoleKey, setPasteRoleKey] = useState<string | null>(null);
  const [pasteValue, setPasteValue] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sendModel, setSendModel] = useState<SendModel>("shared");
  const [signOrder, setSignOrder] = useState<SignOrder>("parallel");

  const assignableRoles = useMemo<CustomRole[]>(
    () => template?.roles.filter((role) => role.key !== "sender") ?? [],
    [template],
  );

  const requiredRoleKeys = useMemo(() => {
    if (!template) return new Set<string>();
    return new Set(template.fields.map((field) => field.roleKey).filter((key) => key !== "sender"));
  }, [template]);

  useEffect(() => {
    if (!open || !template) return;
    const initial: RoleBuckets = {};
    for (const role of template.roles) {
      if (role.key !== "sender") initial[role.key] = [emptyRow()];
    }
    setBuckets(initial);
    setPasteRoleKey(null);
    setPasteValue("");
    setShowAdvanced(false);
    setSendModel("shared");
    setSignOrder("parallel");
    setStage("form");
  }, [open, template?.id]);

  if (!template) return null;

  const senderRole = template.roles.find((role) => role.key === "sender");
  const allRows = assignableRoles.flatMap((role) => buckets[role.key] ?? []);
  const validRows = allRows.filter((row) => row.name.trim() && isEmail(row.email));
  const totalRecipients = validRows.length;
  const requiredRolesSatisfied = [...requiredRoleKeys].every((roleKey) =>
    (buckets[roleKey] ?? []).some((row) => row.name.trim() && isEmail(row.email)),
  );
  const canSend = totalRecipients > 0 && requiredRolesSatisfied;

  const updateRow = (roleKey: string, id: string, patch: Partial<Recipient>) =>
    setBuckets((current) => ({
      ...current,
      [roleKey]: (current[roleKey] ?? []).map((row) =>
        row.id === id ? { ...row, ...patch } : row,
      ),
    }));

  const addRow = (roleKey: string) =>
    setBuckets((current) => ({
      ...current,
      [roleKey]: [...(current[roleKey] ?? []), emptyRow()],
    }));

  const removeRow = (roleKey: string, id: string) =>
    setBuckets((current) => {
      const rows = current[roleKey] ?? [];
      const next = rows.length === 1 ? [emptyRow()] : rows.filter((row) => row.id !== id);
      return { ...current, [roleKey]: next };
    });

  const applyPaste = () => {
    if (!pasteRoleKey) return;
    const parsed = parseRecipientList(pasteValue);
    if (parsed.length === 0) {
      toast.error("No valid emails found", {
        description: "Use Name <email>, commas, or new lines.",
      });
      return;
    }
    setBuckets((current) => {
      const existing = current[pasteRoleKey] ?? [];
      const seen = new Set(existing.map((row) => row.email.trim().toLowerCase()).filter(Boolean));
      const kept = existing.filter((row) => row.name.trim() || row.email.trim());
      const merged: Recipient[] = [...kept];
      for (const recipient of parsed) {
        const key = recipient.email.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        merged.push({ id: uid(), ...recipient });
      }
      return { ...current, [pasteRoleKey]: merged.length ? merged : [emptyRow()] };
    });
    toast.success(`${parsed.length} recipient${parsed.length === 1 ? "" : "s"} added`);
    setPasteValue("");
    setPasteRoleKey(null);
  };

  const handleSend = () => {
    if (!canSend) return;
    setStage("sent");
    toast.success("Sent", {
      description: `${template.name} sent to ${totalRecipients} recipient${totalRecipients === 1 ? "" : "s"}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-border/60 bg-background">
        <DialogTitle className="sr-only">Send {template.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Assign people to template roles and send this flow for signature.
        </DialogDescription>

        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {/* Header */}
              <div className="px-6 pt-6 pb-5 border-b border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                    Ready to send
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight">{template.name}</h2>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {template.documentName}
                  </span>
                  <span className="flex items-center gap-1 text-primary/80">
                    <Zap className="w-3 h-3" />
                    {template.fields.length} fields pre-placed
                  </span>
                </div>
              </div>

              {/* Role assignment */}
              <div className="px-6 py-5 max-h-[500px] overflow-y-auto space-y-5">
                {senderRole && (
                  <div className="rounded-xl border border-border/50 bg-muted/20 px-3 py-2.5 flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-primary" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold tracking-tight">{senderRole.label}</p>
                      <p className="text-[11px] text-muted-foreground">Filled by you when sending.</p>
                    </div>
                  </div>
                )}

                {assignableRoles.map((role, roleIndex) => {
                  const rows = buckets[role.key] ?? [];
                  const isRequired = requiredRoleKeys.has(role.key);
                  const validInRole = rows.filter((row) => row.name.trim() && isEmail(row.email)).length;
                  return (
                    <section key={role.key} className="space-y-2.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="flex items-baseline gap-2 min-w-0">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: role.color }}
                          />
                          <h3 className="text-sm font-semibold tracking-tight truncate">{role.label}</h3>
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                            {isRequired ? "Required" : "Optional"}
                          </span>
                          {validInRole > 0 && (
                            <span className="text-[11px] text-muted-foreground tabular-nums">
                              · {validInRole}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            setPasteRoleKey(role.key);
                            setPasteValue("");
                          }}
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <ClipboardPaste className="w-3.5 h-3.5" />
                          Paste list
                        </button>
                      </div>

                      <div className="space-y-2">
                        {rows.map((row, index) => {
                          const invalid = row.email.trim().length > 0 && !isEmail(row.email);
                          return (
                            <div
                              key={row.id}
                              className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] gap-2 items-center"
                            >
                              <Input
                                autoFocus={roleIndex === 0 && index === 0}
                                value={row.name}
                                onChange={(event) => updateRow(role.key, row.id, { name: event.target.value })}
                                placeholder="Full name"
                                maxLength={120}
                                className="h-10 bg-muted/30 border-border/50"
                              />
                              <Input
                                type="email"
                                value={row.email}
                                onChange={(event) => updateRow(role.key, row.id, { email: event.target.value })}
                                onKeyDown={(event) => event.key === "Enter" && canSend && handleSend()}
                                placeholder="email@company.com"
                                maxLength={254}
                                className={cn(
                                  "h-10 bg-muted/30 border-border/50",
                                  invalid && "border-destructive/60 focus-visible:ring-destructive/40",
                                )}
                              />
                              <button
                                onClick={() => removeRow(role.key, row.id)}
                                disabled={rows.length === 1}
                                className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-accent disabled:opacity-30 transition-colors"
                                aria-label={`Remove ${role.label} recipient`}
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => addRow(role.key)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/80 hover:text-primary transition-colors h-8 px-2 -ml-2 rounded-md hover:bg-accent"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add another {role.label.toLowerCase()}
                      </button>

                      <AnimatePresence>
                        {pasteRoleKey === role.key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-lg border border-border/50 bg-muted/20 p-3">
                              <textarea
                                value={pasteValue}
                                onChange={(event) => setPasteValue(event.target.value)}
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
                                <Button size="sm" onClick={applyPaste} disabled={!pasteValue.trim()} className="h-7 text-xs">
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

                <div className="pt-1">
                  <button
                    onClick={() => setShowAdvanced((value) => !value)}
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
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            onClick={() => setSignOrder(signOrder === "parallel" ? "sequential" : "parallel")}
                            className="rounded-lg border border-border/50 bg-card p-3 text-left hover:border-border transition-colors"
                          >
                            <span className="text-xs font-semibold">
                              {signOrder === "parallel" ? "Sign in parallel" : "Sign in order"}
                            </span>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                              {signOrder === "parallel" ? "Everyone signs at the same time." : "Recipients sign one by one."}
                            </p>
                          </button>
                          <button
                            onClick={() => setSendModel(sendModel === "shared" ? "individual" : "shared")}
                            className="rounded-lg border border-border/50 bg-card p-3 text-left hover:border-border transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              {sendModel === "shared" ? <Layers className="w-3.5 h-3.5 text-primary" /> : <CopyIcon className="w-3.5 h-3.5 text-primary" />}
                              <span className="text-xs font-semibold">
                                {sendModel === "shared" ? "Same document" : "Individual copies"}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                              {sendModel === "shared" ? "All roles sign one shared document." : "Each person gets a separate copy."}
                            </p>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border/50 bg-muted/10 flex items-center justify-between gap-4">
                <span className="text-[11px] text-muted-foreground">
                  {totalRecipients > 0
                    ? `${totalRecipients} recipient${totalRecipients === 1 ? "" : "s"} assigned`
                    : "Assign at least one person to a required role."}
                </span>
                <Button onClick={handleSend} disabled={!canSend} className="gap-2 shrink-0" size="sm">
                  <Send className="w-3.5 h-3.5" />
                  Send
                </Button>
              </div>
            </motion.div>
          )}

          {stage === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-10 flex flex-col items-center text-center min-h-[280px] justify-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center"
              >
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">Sent</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                {template.name} is on its way to{" "}
                <span className="text-foreground font-medium">
                  {totalRecipients} recipient{totalRecipients === 1 ? "" : "s"}
                </span>
                {sendModel === "shared" ? " on one shared document" : " as individual copies"}
                {signOrder === "sequential" ? ", signing in order" : ""}.
              </p>
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                size="sm"
                className="mt-6 gap-2"
              >
                Done
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
