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
            className="relative w-full max-w-lg rounded-2xl border border-border/60 bg-card/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            {/* glow */}
            <div className="absolute -top-24 -right-20 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative px-6 pt-5 pb-4 border-b border-border/40 flex items-start justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  {isPackage ? (
                    <Layers className="w-3 h-3 text-primary" />
                  ) : (
                    <Zap className="w-3 h-3 text-primary" />
                  )}
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">
                    {isPackage ? "Send signing package" : "Send agreement"}
                  </span>
                </div>
                <motion.h2
                  key={personalizedPackageTitle}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-[16px] font-semibold tracking-tight truncate"
                >
                  {personalizedPackageTitle}
                </motion.h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {recipientRoles.length} signer{recipientRoles.length === 1 ? "" : "s"} ·{" "}
                  {documents.length} document{documents.length === 1 ? "" : "s"} ·{" "}
                  {template.fields.length} fields preconfigured
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
              {/* Documents in package */}
              {isPackage && (
                <div className="rounded-xl border border-border/50 bg-muted/10 overflow-hidden">
                  <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-border/40">
                    <div className="inline-flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-primary" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                        Documents in this package
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {documents.length} files · one signing session
                    </span>
                  </div>
                  <ol className="divide-y divide-border/30">
                    {personalizedDocuments.map((d, i) => {
                      const tag = SIGN_DOC_TAGS.find((t) => t.value === d.tag);
                      const fieldCount = template.fields.filter(
                        (f) => f.documentId === d.id,
                      ).length;
                      return (
                        <li
                          key={d.id}
                          className="px-3.5 py-2.5 flex items-center gap-3"
                        >
                          <span className="w-6 h-6 rounded-md bg-muted/40 text-[10px] font-semibold text-muted-foreground inline-flex items-center justify-center tabular-nums shrink-0">
                            {i + 1}
                          </span>
                          <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div className="min-w-0 flex-1">
                            <motion.div
                              key={d.personalizedName}
                              initial={{ opacity: 0.6 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.18 }}
                              className="text-[12.5px] font-medium text-foreground/90 truncate"
                            >
                              {d.personalizedName}
                            </motion.div>
                            <div className="text-[10.5px] text-muted-foreground inline-flex items-center gap-1.5">
                              <span>{d.pageCount} pages</span>
                              <span className="text-border">·</span>
                              <span>{fieldCount} fields</span>
                            </div>
                          </div>
                          {tag && (
                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium shrink-0">
                              {tag.label}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                  <div className="px-3.5 py-2 text-[10.5px] text-muted-foreground border-t border-border/30 bg-muted/10">
                    Signers complete all {documents.length} documents in one guided session — one
                    audit trail, one completion.
                  </div>
                </div>
              )}

              {/* Dynamic variables */}
              {variables.length > 0 && (
                <div className="rounded-xl border border-border/50 bg-muted/15 overflow-hidden">
                  <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-border/40">
                    <div className="inline-flex items-center gap-1.5">
                      <Braces className="w-3 h-3 text-primary" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                        Personalize
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {filledCount}/{variables.length} filled
                    </span>
                  </div>
                  <div className="p-3.5 grid grid-cols-2 gap-2">
                    {variables.map((v) => (
                      <div key={v.name} className="col-span-2 sm:col-span-1">
                        <label className="block text-[11px] text-muted-foreground mb-1">
                          {v.label}
                          {v.required && <span className="text-primary/80 ml-0.5">*</span>}
                        </label>
                        <div className="relative">
                          {v.type === "currency" && (
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground">
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
                            className={`h-9 bg-background/60 ${v.type === "currency" ? "pl-6" : ""}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {(documentBody || previewSegments.length > 0) && (
                    <div className="border-t border-border/40">
                      <button
                        type="button"
                        onClick={() => setShowPreview((s) => !s)}
                        className="w-full px-3.5 py-2 flex items-center justify-between text-[11px] text-foreground/75 hover:bg-muted/30 transition-colors"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          <Eye className="w-3 h-3" />
                          Preview personalized {isPackage ? "package" : "agreement"}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${showPreview ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {showPreview && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-3.5">
                              <div className="rounded-lg border border-border/40 bg-background/70 max-h-72 overflow-y-auto">
                                {previewSegments.length > 0 ? (
                                  previewSegments.map((seg, i) => (
                                    <div
                                      key={i}
                                      className={
                                        i === 0
                                          ? "p-3"
                                          : "p-3 border-t border-border/30"
                                      }
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
                                  <div className="p-3">
                                    <PersonalizedPreview
                                      text={personalizedBody}
                                      values={variableValues}
                                      patterns={variables.map((v) => v.pattern)}
                                    />
                                  </div>
                                )}
                              </div>
                              <p className="text-[10px] text-muted-foreground mt-1.5">
                                Values are inserted inline — original fonts, spacing and layout are preserved.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              )}

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
                <Select value={expiry} onValueChange={setExpiry}>
                  <SelectTrigger className="h-9 pl-8 bg-background/60 relative">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <SelectValue placeholder="Expires in…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Expires in 1 day</SelectItem>
                    <SelectItem value="3">Expires in 3 days</SelectItem>
                    <SelectItem value="7">Expires in 7 days</SelectItem>
                    <SelectItem value="14">Expires in 14 days</SelectItem>
                    <SelectItem value="30">Expires in 30 days</SelectItem>
                    <SelectItem value="60">Expires in 60 days</SelectItem>
                    <SelectItem value="90">Expires in 90 days</SelectItem>
                    <SelectItem value="never">No expiry</SelectItem>
                  </SelectContent>
                </Select>
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

              {/* Sender auto-apply confirmation */}
              {senderFields.length > 0 && senderFieldSummary && (
                <motion.label
                  htmlFor="sender-confirm"
                  className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/10 px-3.5 py-3 cursor-pointer transition-colors hover:bg-muted/20"
                  initial={false}
                  animate={{
                    borderColor: senderConfirmed
                      ? "hsl(var(--primary) / 0.45)"
                      : "hsl(var(--border) / 0.4)",
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
                    I confirm Docsora should apply my{" "}
                    <span className="text-foreground font-medium">{senderFieldSummary}</span>{" "}
                    before sending.
                  </span>
                </motion.label>
              )}
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