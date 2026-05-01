import { useEffect, useState } from "react";
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
import { ArrowRight, CheckCircle2, Loader2, Zap, Settings2 } from "lucide-react";
import { toast } from "sonner";

interface QuickStartFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flow: WorkflowTemplate | null;
}

type Stage = "form" | "starting" | "done";

export function QuickStartFlowModal({ open, onOpenChange, flow }: QuickStartFlowModalProps) {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (open) {
      setStage("form");
      setName("");
      setEmail("");
    }
  }, [open, flow?.id]);

  if (!flow) return null;

  const canStart = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email);

  const handleStart = () => {
    if (!canStart) return;
    setStage("starting");
    setTimeout(() => setStage("done"), 900);
  };

  const handleOpenFlow = () => {
    toast.success(`${flow.name} started`, {
      description: `Flow ready for ${name}.`,
    });
    onOpenChange(false);
  };

  const handleCustomize = () => {
    onOpenChange(false);
    const params = new URLSearchParams({ from: flow.id });
    if (name.trim()) params.set("client", name.trim());
    if (email.trim()) params.set("email", email.trim());
    navigate(`/templates/new?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-border/60 bg-background">
        <DialogTitle className="sr-only">Start {flow.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Add a client name and email to start this flow instantly.
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
              <div className="px-6 pt-7 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center text-xl">
                    {flow.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold tracking-tight">{flow.name}</h2>
                    <p className="text-xs text-muted-foreground">Ready to send</p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 space-y-3">
                <div>
                  <label className="text-[11px] font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                    Client name
                  </label>
                  <Input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Acme Inc."
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
                    className="h-11 bg-muted/30 border-border/50"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && canStart) handleStart();
                    }}
                  />
                </div>
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
              <p className="mt-5 text-sm font-medium">Starting your flow…</p>
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
                {flow.name} for{" "}
                <span className="text-foreground font-medium">{name}</span> is on its way.
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
