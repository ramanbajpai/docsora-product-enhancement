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
      <DialogContent className="max-w-md p-0 overflow-hidden border-border/60 bg-background">
        <DialogTitle className="sr-only">Send {template.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Send the template by entering the recipient&apos;s name and email.
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

              {/* Form */}
              <div className="px-6 py-5 space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground mb-1.5 block">
                    {clientRole?.label ?? "Recipient"} name
                  </label>
                  <Input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Acme Inc."
                    className="h-10 bg-muted/30 border-border/50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground mb-1.5 block">
                    {clientRole?.label ?? "Recipient"} email
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@acme.com"
                    className="h-10 bg-muted/30 border-border/50"
                    onKeyDown={(e) => e.key === "Enter" && valid && handleSend()}
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border/50 bg-muted/10 flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground">
                  Everything else is already configured.
                </span>
                <Button onClick={handleSend} disabled={!valid} className="gap-2" size="sm">
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
                <span className="text-foreground font-medium">{name}</span>.
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
