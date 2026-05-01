import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomTemplate } from "@/hooks/useCustomTemplates";
import { ArrowRight, CheckCircle2, FileText, Send, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: CustomTemplate | null;
}

export function SendTemplateModal({ open, onOpenChange, template }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [stage, setStage] = useState<"form" | "sent">("form");

  useEffect(() => {
    if (open) {
      setName("");
      setEmail("");
      setStage("form");
    }
  }, [open]);

  if (!template) return null;

  const valid = name.trim().length > 0 && /^\S+@\S+\.\S+$/.test(email.trim());
  const clientRole =
    template.roles.find((r) => r.key !== "sender") ?? template.roles[0];

  const handleSend = () => {
    if (!valid) return;
    setStage("sent");
    toast.success("Sent", {
      description: `${template.name} sent to ${name}`,
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
