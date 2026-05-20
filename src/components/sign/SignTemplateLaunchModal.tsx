import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Rocket,
  Plus,
  Trash2,
  ChevronDown,
  FileText,
  Layers,
  PenLine,
  CheckCircle2,
  Eye,
  Upload,
  Sparkles,
  Activity,
  Link2,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Link as RouterLink } from "react-router-dom";
import {
  SignTemplate,
  SignFieldType,
  applyTemplateVariables,
  getTemplateDocuments,
  SIGN_DOC_TAGS,
  useSignTemplates,
} from "@/hooks/useSignTemplates";

interface SignTemplateLaunchModalProps {
  template: SignTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLaunched?: () => void;
}

type RoleRecipient = { roleKey: string; name: string; email: string };

type DeliveryMode = "signature" | "approval" | "review" | "upload";

const DELIVERY_MODES: { value: DeliveryMode; label: string; icon: typeof PenLine; hint: string }[] = [
  { value: "signature", label: "Signature", icon: PenLine, hint: "Recipients sign the agreement" },
  { value: "approval", label: "Approval", icon: CheckCircle2, hint: "Recipients approve — no signature" },
  { value: "review", label: "Review only", icon: Eye, hint: "Read-only acknowledgement" },
  { value: "upload", label: "Upload required", icon: Upload, hint: "Recipients return a file" },
];

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
  const defaultExpiry = String(template?.defaults?.expiryDays ?? 14);
  const [expiry, setExpiry] = useState<string>(defaultExpiry);
  const [ccEmails, setCcEmails] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [senderConfirmed, setSenderConfirmed] = useState(false);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [message, setMessage] = useState("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("signature");
  const [autoRemind, setAutoRemind] = useState(true);
  const [remindDays, setRemindDays] = useState("3");
  const [notifyOnOpen, setNotifyOnOpen] = useState(true);
  const [notifyOnComplete, setNotifyOnComplete] = useState(true);
  const [sent, setSent] = useState(false);
  const [sentLink, setSentLink] = useState("");

  const variables = template?.variables ?? [];
  const documentBody = template?.documentBody ?? "";
  const documents = useMemo(() => (template ? getTemplateDocuments(template) : []), [template]);
  const isPackage = documents.length > 1;

  const senderFields = useMemo(
    () => (template ? template.fields.filter((f) => f.roleKey === "sender") : []),
    [template],
  );

  const senderFieldSummary = useMemo(() => {
    if (senderFields.length === 0) return null;
    const labels: Record<SignFieldType, { singular: string; plural: string }> = {
      signature: { singular: "signature field", plural: "signature fields" },
      initials: { singular: "initials field", plural: "initials fields" },
      date: { singular: "date field", plural: "date fields" },
      name: { singular: "name field", plural: "name fields" },
      text: { singular: "text field", plural: "text fields" },
      checkbox: { singular: "checkbox", plural: "checkboxes" },
      company: { singular: "company field", plural: "company fields" },
    };
    const order: SignFieldType[] = ["signature", "initials", "date", "name", "company", "text", "checkbox"];
    const counts = new Map<SignFieldType, number>();
    senderFields.forEach((f) => counts.set(f.type, (counts.get(f.type) ?? 0) + 1));
    const parts = order
      .filter((t) => counts.has(t))
      .map((t) => {
        const n = counts.get(t)!;
        const meta = labels[t];
        return `${n} ${n === 1 ? meta.singular : meta.plural}`;
      });
    let phrase: string;
    if (parts.length === 1) phrase = parts[0];
    else if (parts.length === 2) phrase = `${parts[0]} and ${parts[1]}`;
    else phrase = `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
    // Special case: single field of any type → drop the leading "1"
    if (senderFields.length === 1) {
      const only = senderFields[0].type;
      phrase = labels[only].singular;
    }
    return phrase;
  }, [senderFields]);

  useEffect(() => {
    if (!template) return;
    setRecipients(recipientRoles.map((r) => ({ roleKey: r.key, name: "", email: "" })));
    setExpiry(String(template.defaults?.expiryDays ?? 14));
    setCcEmails([]);
    setSenderConfirmed(false);
    const seed: Record<string, string> = {};
    (template.variables ?? []).forEach((v) => {
      if (v.defaultValue) seed[v.name] = v.defaultValue;
    });
    setVariableValues(seed);
    setShowAdvanced(false);
    setMessage("");
    setDeliveryMode("signature");
    setAutoRemind(true);
    setRemindDays("3");
    setNotifyOnOpen(true);
    setNotifyOnComplete(true);
    setSent(false);
    setSentLink("");
  }, [template, recipientRoles]);

  if (!template) return null;

  const recipientsValid = recipients.every(
    (r) => r.name.trim().length > 1 && /.+@.+\..+/.test(r.email.trim()),
  );
  const variablesValid = variables.every(
    (v) => !v.required || (variableValues[v.name] ?? "").trim().length > 0,
  );
  const canSend =
    recipientsValid && variablesValid && (senderFields.length === 0 || senderConfirmed);

  const filledCount = variables.filter(
    (v) => (variableValues[v.name] ?? "").trim().length > 0,
  ).length;

  // Personalized titles
  const rawPackageTitle = template.packageTitle || template.name;
  const personalizedPackageTitle =
    applyTemplateVariables(rawPackageTitle, variableValues) || template.name;
  const personalizedDocuments = documents.map((d) => ({
    ...d,
    personalizedName:
      applyTemplateVariables(d.name, variableValues) || d.name,
  }));

  // Preview body — concatenate all docs if multi.
  const previewSegments = personalizedDocuments
    .filter((d) => d.documentBody)
    .map((d) => ({
      title: d.personalizedName,
      text: applyTemplateVariables(d.documentBody!, variableValues),
    }));
  const personalizedBody = documentBody
    ? applyTemplateVariables(documentBody, variableValues)
    : "";

  const inputTypeFor = (t: string) =>
    t === "date" ? "date" : t === "email" ? "email" : t === "number" || t === "currency" ? "text" : "text";

  const placeholderFor = (t: string) =>
    t === "currency" ? "$10,000" : t === "date" ? "" : t === "email" ? "name@company.com" : "";

  const handleSend = async () => {
    if (!canSend) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    recordLaunch(template.id);
    if (variables.length > 0) {
      // eslint-disable-next-line no-console
      console.info("[audit] sign.template.variables_applied", {
        templateId: template.id,
        templateName: template.name,
        personalizedTitle: personalizedPackageTitle,
        documents: personalizedDocuments.map((d) => ({
          id: d.id,
          original: d.name,
          personalized: d.personalizedName,
          tag: d.tag,
          pageCount: d.pageCount,
        })),
        appliedAt: new Date().toISOString(),
        variables: variables.map((v) => ({
          name: v.name,
          type: v.type,
          filled: (variableValues[v.name] ?? "").trim().length > 0,
        })),
      });
    }
    if (senderFields.length > 0) {
      // Audit trail
      // eslint-disable-next-line no-console
      console.info("[audit] sign.template.sender_auto_apply_confirmed", {
        templateId: template.id,
        templateName: template.name,
        confirmedAt: new Date().toISOString(),
        senderFieldCount: senderFields.length,
        senderFieldTypes: senderFields.reduce<Record<string, number>>((acc, f) => {
          acc[f.type] = (acc[f.type] ?? 0) + 1;
          return acc;
        }, {}),
        summary: senderFieldSummary,
      });
    }
    setSubmitting(false);
    const link = `https://docsora.app/s/${template.id.slice(0, 6)}-${Math.random().toString(36).slice(2, 8)}`;
    setSentLink(link);
    setSent(true);
    toast.success(isPackage ? "Signing package sent" : "Agreement sent", {
      description: `${personalizedPackageTitle} is on its way to ${recipients[0]?.name || "recipient"}.`,
    });
    onLaunched?.();
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
            className="relative w-full max-w-xl rounded-3xl border border-border/40 bg-card/95 backdrop-blur-2xl shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.45),0_18px_50px_-22px_hsl(var(--foreground)/0.25)] overflow-hidden"
          >
            {/* ambient glow */}
            <div className="absolute -top-32 -right-24 w-72 h-72 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {sent ? (
              <SentSuccessView
                title={personalizedPackageTitle}
                recipientName={recipients[0]?.name || "your recipient"}
                link={sentLink}
                onClose={() => onOpenChange(false)}
              />
            ) : (
              <>
                {/* Header */}
                <div className="relative px-8 pt-7 pb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary">
                        {isPackage ? "Launch package" : "Launch workflow"}
                      </span>
                    </div>
                    <motion.h2
                      key={personalizedPackageTitle}
                      initial={{ opacity: 0.6, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22 }}
                      className="text-[22px] font-semibold tracking-tight truncate"
                    >
                      {personalizedPackageTitle}
                    </motion.h2>
                    <p className="text-[13px] text-muted-foreground mt-1">
                      {variables.length > 0
                        ? "Personalize before sending."
                        : "This agreement is ready to send."}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenChange(false)}
                    className="p-1.5 -mr-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative px-8 pb-2 max-h-[62vh] overflow-y-auto space-y-6">
                  {/* Package list — compact */}
                  {isPackage && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      {personalizedDocuments.map((d, i) => {
                        const tag = SIGN_DOC_TAGS.find((t) => t.value === d.tag);
                        return (
                          <span
                            key={d.id}
                            className="inline-flex items-center gap-1.5 h-7 pl-2 pr-2.5 rounded-full bg-muted/40 border border-border/40 text-[11.5px] text-foreground/75"
                          >
                            <span className="w-4 h-4 rounded-full bg-background border border-border/50 inline-flex items-center justify-center text-[9px] tabular-nums text-muted-foreground">
                              {i + 1}
                            </span>
                            <FileText className="w-3 h-3 text-muted-foreground" />
                            <span className="truncate max-w-[140px]">{d.personalizedName}</span>
                            {tag && (
                              <span className="text-[9px] uppercase tracking-wider text-primary/90 font-semibold">
                                {tag.label}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Personalize — only when variables exist */}
                  {variables.length > 0 && (
                    <section>
                      <div className="flex items-baseline justify-between mb-3">
                        <h3 className="text-[13px] font-semibold tracking-tight text-foreground/85">
                          Personalize agreement
                        </h3>
                        <span className="text-[11px] text-muted-foreground tabular-nums">
                          {filledCount}/{variables.length} variables completed
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        {variables.map((v) => {
                          const filled = (variableValues[v.name] ?? "").trim().length > 0;
                          return (
                            <div key={v.name} className="col-span-2 sm:col-span-1">
                              <label className="block text-[11px] text-muted-foreground mb-1.5">
                                {v.label}
                                {v.required && <span className="text-primary/80 ml-0.5">*</span>}
                              </label>
                              <div className="relative">
                                {v.type === "currency" && (
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">
                                    $
                                  </span>
                                )}
                                <Input
                                  type={inputTypeFor(v.type)}
                                  placeholder={placeholderFor(v.type)}
                                  value={variableValues[v.name] ?? ""}
                                  onChange={(e) =>
                                    setVariableValues((prev) => ({
                                      ...prev,
                                      [v.name]: e.target.value,
                                    }))
                                  }
                                  className={`h-10 bg-background/50 border-border/40 transition-colors ${
                                    v.type === "currency" ? "pl-6" : ""
                                  } ${filled ? "border-primary/40" : ""}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {(documentBody || previewSegments.length > 0) && (
                        <div className="mt-3 rounded-xl border border-border/40 bg-background/40 max-h-56 overflow-y-auto">
                          {previewSegments.length > 0 ? (
                            previewSegments.map((seg, i) => (
                              <div
                                key={i}
                                className={i === 0 ? "p-3.5" : "p-3.5 border-t border-border/30"}
                              >
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                                  {seg.title}
                                </div>
                                <PersonalizedPreview
                                  text={seg.text}
                                  values={variableValues}
                                  patterns={variables.map((v) => v.pattern)}
                                />
                              </div>
                            ))
                          ) : (
                            <div className="p-3.5">
                              <PersonalizedPreview
                                text={personalizedBody}
                                values={variableValues}
                                patterns={variables.map((v) => v.pattern)}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </section>
                  )}

                  {/* Recipients */}
                  <section>
                    <h3 className="text-[13px] font-semibold tracking-tight text-foreground/85 mb-3">
                      {recipients.length > 1 ? "Recipients" : "Recipient"}
                    </h3>
                    <div className="space-y-2.5">
                      {recipients.map((rcp, i) => {
                        const role = recipientRoles.find((r) => r.key === rcp.roleKey);
                        return (
                          <div
                            key={rcp.roleKey + i}
                            className="rounded-xl bg-muted/15 border border-border/30 p-3 hover:border-border/60 transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: role?.color }}
                              />
                              <span className="text-[11.5px] font-medium text-foreground/75">
                                {role?.label || "Recipient"}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Full name"
                                value={rcp.name}
                                onChange={(e) =>
                                  setRecipients((prev) =>
                                    prev.map((p, idx) =>
                                      idx === i ? { ...p, name: e.target.value } : p,
                                    ),
                                  )
                                }
                                className="h-10 bg-background/50 border-border/40"
                              />
                              <Input
                                placeholder="email@company.com"
                                type="email"
                                value={rcp.email}
                                onChange={(e) =>
                                  setRecipients((prev) =>
                                    prev.map((p, idx) =>
                                      idx === i ? { ...p, email: e.target.value } : p,
                                    ),
                                  )
                                }
                                className="h-10 bg-background/50 border-border/40"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Optional message */}
                  <section>
                    <Textarea
                      placeholder="Add an optional message…"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={2}
                      className="resize-none bg-background/50 border-border/40 text-[13px]"
                    />
                  </section>

                  {/* Delivery mode segmented */}
                  <section>
                    <h3 className="text-[13px] font-semibold tracking-tight text-foreground/85 mb-2.5">
                      Delivery mode
                    </h3>
                    <div className="grid grid-cols-4 gap-1.5">
                      {DELIVERY_MODES.map((m) => {
                        const Icon = m.icon;
                        const active = deliveryMode === m.value;
                        return (
                          <button
                            key={m.value}
                            onClick={() => setDeliveryMode(m.value)}
                            title={m.hint}
                            className={`group flex flex-col items-center gap-1 py-2.5 rounded-xl border transition-all ${
                              active
                                ? "bg-primary/8 border-primary/40 text-foreground"
                                : "bg-muted/15 border-border/30 text-muted-foreground hover:text-foreground hover:border-border/60"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-medium">{m.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  {/* Advanced delivery settings */}
                  <section className="rounded-xl border border-border/30 bg-muted/10 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvanced((s) => !s)}
                      className="w-full px-4 py-3 flex items-center justify-between text-[12px] text-foreground/80 hover:bg-muted/20 transition-colors"
                    >
                      <span className="font-medium">Advanced delivery settings</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {showAdvanced && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/30">
                            <ToggleRow
                              label="Auto-remind"
                              hint={`Every ${remindDays} days until completed`}
                              checked={autoRemind}
                              onChange={setAutoRemind}
                              trailing={
                                <Select value={remindDays} onValueChange={setRemindDays}>
                                  <SelectTrigger className="h-8 w-[80px] bg-background/60 text-[12px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="1">1 day</SelectItem>
                                    <SelectItem value="2">2 days</SelectItem>
                                    <SelectItem value="3">3 days</SelectItem>
                                    <SelectItem value="7">7 days</SelectItem>
                                  </SelectContent>
                                </Select>
                              }
                            />
                            <ToggleRow
                              label="Expire after"
                              hint="Link stops working when expired"
                              checked={expiry !== "never"}
                              onChange={(v) => setExpiry(v ? "14" : "never")}
                              trailing={
                                <Select
                                  value={expiry === "never" ? "14" : expiry}
                                  onValueChange={(v) => setExpiry(v)}
                                  disabled={expiry === "never"}
                                >
                                  <SelectTrigger className="h-8 w-[96px] bg-background/60 text-[12px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 days</SelectItem>
                                    <SelectItem value="7">7 days</SelectItem>
                                    <SelectItem value="14">14 days</SelectItem>
                                    <SelectItem value="30">30 days</SelectItem>
                                    <SelectItem value="60">60 days</SelectItem>
                                    <SelectItem value="90">90 days</SelectItem>
                                  </SelectContent>
                                </Select>
                              }
                            />
                            <ToggleRow
                              label="Notify me when opened"
                              checked={notifyOnOpen}
                              onChange={setNotifyOnOpen}
                            />
                            <ToggleRow
                              label="Notify me when completed"
                              checked={notifyOnComplete}
                              onChange={setNotifyOnComplete}
                            />

                            <div className="pt-1">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                                  CC
                                </span>
                                <button
                                  onClick={() => setCcEmails((p) => [...p, ""])}
                                  className="text-[11px] text-foreground/70 hover:text-foreground inline-flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add
                                </button>
                              </div>
                              {ccEmails.length === 0 ? (
                                <p className="text-[11.5px] text-muted-foreground/70">No one in CC.</p>
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
                                        className="h-8 bg-background/60 border-border/40"
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
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </section>

                  {/* Sender auto-apply confirmation */}
                  {senderFields.length > 0 && senderFieldSummary && (
                    <motion.label
                      htmlFor="sender-confirm"
                      className="flex items-start gap-3 rounded-xl border border-border/30 bg-muted/10 px-3.5 py-3 cursor-pointer transition-colors hover:bg-muted/20"
                      initial={false}
                      animate={{
                        borderColor: senderConfirmed
                          ? "hsl(var(--primary) / 0.45)"
                          : "hsl(var(--border) / 0.3)",
                        backgroundColor: senderConfirmed
                          ? "hsl(var(--primary) / 0.06)"
                          : "hsl(var(--muted) / 0.1)",
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Checkbox
                        id="sender-confirm"
                        checked={senderConfirmed}
                        onCheckedChange={(c) => setSenderConfirmed(Boolean(c))}
                        className="mt-0.5"
                      />
                      <span className="text-[12px] leading-relaxed text-foreground/75">
                        Apply my{" "}
                        <span className="text-foreground font-medium">{senderFieldSummary}</span>{" "}
                        before sending.
                      </span>
                    </motion.label>
                  )}
                </div>

                <div className="relative px-8 py-5 mt-2 flex items-center justify-between gap-3">
                  <span className="text-[11.5px] text-muted-foreground">
                    Auto-tracks in{" "}
                    <span className="text-foreground/80 font-medium">Track</span> after send.
                  </span>
                  <Button
                    size="sm"
                    disabled={!canSend || submitting}
                    onClick={handleSend}
                    className="h-10 px-5 gap-1.5 rounded-xl text-[13px] font-medium"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    {submitting ? "Sending…" : "Send now"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Renders the personalized template body, highlighting injected values
 * inline so users can visually confirm replacement without breaking
 * the original layout (whitespace + line breaks preserved).
 */
function PersonalizedPreview({
  text,
  values,
  patterns,
}: {
  text: string;
  values: Record<string, string>;
  patterns: string[];
}) {
  // Build a set of injected literal values to highlight.
  const injected = Object.values(values)
    .map((v) => v.trim())
    .filter((v) => v.length > 0);

  // Build a regex of either remaining {{TOKENS}}/[TOKENS] or injected values.
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts: string[] = [
    ...patterns.map(escape),
    ...injected.map(escape),
  ];
  if (parts.length === 0) {
    return (
      <pre className="whitespace-pre-wrap font-sans text-[12px] leading-relaxed text-foreground/85">
        {text}
      </pre>
    );
  }
  const re = new RegExp(`(${parts.join("|")})`, "g");
  const tokens = text.split(re);

  return (
    <pre className="whitespace-pre-wrap font-sans text-[12px] leading-relaxed text-foreground/85">
      {tokens.map((tk, i) => {
        if (!tk) return null;
        const isPlaceholder = patterns.includes(tk);
        const isInjected = !isPlaceholder && injected.includes(tk);
        if (isPlaceholder) {
          return (
            <span
              key={i}
              className="rounded-sm bg-amber-500/15 text-amber-600 dark:text-amber-400 px-1"
            >
              {tk}
            </span>
          );
        }
        if (isInjected) {
          return (
            <span
              key={i}
              className="rounded-sm bg-primary/10 text-foreground px-0.5 font-medium"
            >
              {tk}
            </span>
          );
        }
        return <span key={i}>{tk}</span>;
      })}
    </pre>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
  trailing,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-[12.5px] text-foreground/85 font-medium">{label}</div>
        {hint && <div className="text-[11px] text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {trailing}
        <Switch checked={checked} onCheckedChange={onChange} />
      </div>
    </div>
  );
}

function SentSuccessView({
  title,
  recipientName,
  link,
  onClose,
}: {
  title: string;
  recipientName: string;
  link: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Signing link copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <div className="relative px-8 py-10 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-5"
      >
        <Check className="w-7 h-7 text-primary" />
      </motion.div>
      <h3 className="text-[20px] font-semibold tracking-tight">Sent to {recipientName}</h3>
      <p className="text-[13px] text-muted-foreground mt-1.5 max-w-sm mx-auto">
        <span className="text-foreground/85 font-medium">{title}</span> is now live. We'll update
        Track the moment anything happens.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <RouterLink
          to="/track"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-primary text-primary-foreground text-[12.5px] font-medium hover:opacity-90 transition-opacity"
        >
          <Activity className="w-3.5 h-3.5" />
          View in Track
        </RouterLink>
        <RouterLink
          to="/track"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-muted/40 border border-border/40 text-foreground/85 text-[12.5px] font-medium hover:bg-muted/70 transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
          Signing status
        </RouterLink>
        <button
          onClick={copy}
          className="inline-flex items-center justify-center gap-1.5 h-10 rounded-xl bg-muted/40 border border-border/40 text-foreground/85 text-[12.5px] font-medium hover:bg-muted/70 transition-colors"
        >
          <Link2 className="w-3.5 h-3.5" />
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-5 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
      >
        Close
      </button>
    </div>
  );
}