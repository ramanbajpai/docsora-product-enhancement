import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomTemplate } from "@/hooks/useCustomTemplates";
import { useFlowRuns, createFlowRunFromTemplate } from "@/hooks/useFlowRuns";
import { ArrowRight, Sparkles, Rocket } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: CustomTemplate | null;
}

const isEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

export function LaunchFlowModal({ open, onOpenChange, template }: Props) {
  const navigate = useNavigate();
  const { create } = useFlowRuns();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (open) {
      setClientName("");
      setClientEmail("");
      setProjectName("");
    }
  }, [open]);

  if (!template) return null;

  const canLaunch = clientName.trim().length > 0 && isEmail(clientEmail);
  const steps = template.flowSteps ?? [];

  const launch = () => {
    if (!canLaunch) return;
    const run = createFlowRunFromTemplate(template, {
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      projectName: projectName.trim() || undefined,
    });
    create(run);
    toast.success("Flow launched", { description: `${run.projectName ?? run.templateName} — ${run.clientName}` });
    onOpenChange(false);
    navigate(`/flows/${run.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden border-border/60 bg-background">
        <DialogTitle className="sr-only">Launch {template.name}</DialogTitle>
        <DialogDescription className="sr-only">Start a new active flow.</DialogDescription>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
          <div className="px-6 pt-6 pb-5 border-b border-border/50">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Launch flow</span>
            </div>
            <h2 className="text-lg font-semibold tracking-tight">{template.name}</h2>
            <p className="text-[12px] text-muted-foreground mt-1">
              Add a client. Docsora opens a live workspace and starts the first step.
            </p>
          </div>

          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Client name</label>
              <Input
                autoFocus
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Acme Inc"
                className="mt-1.5 h-10 bg-muted/30 border-border/50"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Client email</label>
              <Input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canLaunch && launch()}
                placeholder="ops@acme.com"
                className="mt-1.5 h-10 bg-muted/30 border-border/50"
              />
            </div>
            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                Project name <span className="text-muted-foreground/60 normal-case font-normal">(optional)</span>
              </label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Acme Onboarding"
                className="mt-1.5 h-10 bg-muted/30 border-border/50"
              />
            </div>

            {steps.length > 0 && (
              <div className="rounded-xl border border-border/50 bg-muted/15 p-3">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                  What will happen
                </p>
                <ol className="space-y-1.5">
                  {steps.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-2 text-[12px] text-foreground/80">
                      <span className="w-4 h-4 rounded-full bg-background border border-border/60 flex items-center justify-center text-[9px] tabular-nums text-muted-foreground">
                        {i + 1}
                      </span>
                      <span className="truncate">{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="px-6 pb-6 pt-1 flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-9 text-sm">
              Cancel
            </Button>
            <Button onClick={launch} disabled={!canLaunch} className="h-9 text-sm gap-1.5">
              <Rocket className="w-3.5 h-3.5" />
              Launch flow
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
