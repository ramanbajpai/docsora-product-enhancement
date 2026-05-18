import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Rocket, Plus, Trash2, Calendar, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SignTemplate, useSignTemplates } from "@/hooks/useSignTemplates";

interface SignTemplateLaunchModalProps {
  template: SignTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLaunched?: () => void;
}

type RoleRecipient = { roleKey: string; name: string; email: string };

export default function SignTemplateLaunchModal({
  template,
  open,
  onOpenChange,
  onLaunched,
}: SignTemplateLaunchModalProps) {
  const { recordLaunch } = useSignTemplates();
  const recipientRoles = useMemo(
    () => (template ? template.roles.filter((r) => r.key !== "sender" && r.key !== "cc") : []),
    [template],
  );

  const [recipients, setRecipients] = useState<RoleRecipient[]>([]);
  const [company, setCompany] = useState("");
  const [expiry, setExpiry] = useState<string>("");
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!template) return;
    setRecipients(recipientRoles.map((r) => ({ roleKey: r.key, name: "", email: "" })));
    setCompany("");
    setExpiry("");
    setCcEmails([]);
  }, [template, recipientRoles]);

  if (!template) return null;

  const canSend = recipients.every(
    (r) => r.name.trim().length > 1 && /.+@.+\..+/.test(r.email.trim()),
  );

  const handleSend = async () => {
    if (!canSend) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    recordLaunch(template.id);
    setSubmitting(false);
    toast.success("Agreement sent", {
      description: `${template.name} is on its way to ${recipients[0]?.name || "recipient"}.`,
    });
    onLaunched?.();
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-xl flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* glow */}
            <div className="absolute -top-24 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-6 pt-5 pb-4 border-b border-border/40 flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="w-3 h-3 text-primary" />
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                    Instant launch
                  </span>
                </div>
                <h2 className="text-[16px] font-semibold tracking-tight truncate">{template.name}</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {recipientRoles.length} signer{recipientRoles.length === 1 ? "" : "s"} · {template.fields.length} fields preconfigured
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="p-1.5 -mr-1.5 -mt-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative px-6 py-5 max-h-[60vh] overflow-y-auto space-y-5">
              {/* Recipients */}
              <div className="space-y-3">
                {recipients.map((rcp, i) => {
                  const role = recipientRoles.find((r) => r.key === rcp.roleKey);
                  return (
                    <div
                      key={rcp.roleKey + i}
                      className="rounded-xl border border-border/50 bg-muted/20 p-3.5"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: role?.color }}
                        />
                        <span className="text-[12px] font-medium text-foreground/80">
                          {role?.label}
                        </span>
                        {template.signingMode === "sequential" && role?.signingOrder != null && (
                          <span className="text-[10px] text-muted-foreground tabular-nums">
                            · step {role.signingOrder}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Full name"
                          value={rcp.name}
                          onChange={(e) =>
                            setRecipients((prev) =>
                              prev.map((p, idx) => (idx === i ? { ...p, name: e.target.value } : p)),
                            )
                          }
                          className="h-9 bg-background/60"
                        />
                        <Input
                          placeholder="email@company.com"
                          type="email"
                          value={rcp.email}
                          onChange={(e) =>
                            setRecipients((prev) =>
                              prev.map((p, idx) => (idx === i ? { ...p, email: e.target.value } : p)),
                            )
                          }
                          className="h-9 bg-background/60"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <Building2 className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="Company (optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="h-9 pl-8 bg-background/60"
                  />
                </div>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder={`Expiry · default ${template.defaults?.expiryDays ?? 14}d`}
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="h-9 pl-8 bg-background/60"
                  />
                </div>
              </div>

              {/* CC */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                    CC recipients
                  </span>
                  <button
                    onClick={() => setCcEmails((p) => [...p, ""])}
                    className="text-[11px] text-foreground/70 hover:text-foreground inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
                {ccEmails.length === 0 ? (
                  <p className="text-[12px] text-muted-foreground/70">No one in CC.</p>
                ) : (
                  <div className="space-y-1.5">
                    {ccEmails.map((email, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Input
                          placeholder="cc@company.com"
                          value={email}
                          onChange={(e) =>
                            setCcEmails((prev) =>
                              prev.map((p, idx) => (idx === i ? e.target.value : p)),
                            )
                          }
                          className="h-8 bg-background/60"
                        />
                        <button
                          onClick={() =>
                            setCcEmails((prev) => prev.filter((_, idx) => idx !== i))
                          }
                          className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Preconfigured summary */}
              <div className="rounded-xl border border-border/40 bg-muted/10 px-3.5 py-3">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
                  Already configured
                </p>
                <ul className="text-[12px] text-foreground/70 space-y-1">
                  <li>· {template.fields.length} fields placed on {template.pageCount} pages</li>
                  <li>
                    · {template.signingMode === "sequential" ? "Sequential" : "Parallel"} signing
                  </li>
                  <li>
                    · Reminders every {template.defaults?.remindersEveryDays ?? 3} days, expires in{" "}
                    {template.defaults?.expiryDays ?? 14} days
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative px-6 py-4 border-t border-border/40 flex items-center justify-between gap-3">
              <span className="text-[11px] text-muted-foreground">
                Auto-tracks in <span className="text-foreground/80 font-medium">Track</span> after send.
              </span>
              <Button
                size="sm"
                disabled={!canSend || submitting}
                onClick={handleSend}
                className="h-9 px-4 gap-1.5 rounded-lg"
              >
                <Rocket className="w-3.5 h-3.5" />
                {submitting ? "Sending…" : "Send now"}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}