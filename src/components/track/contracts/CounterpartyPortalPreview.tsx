import { motion } from "framer-motion";
import { Check, Calendar, FileText, MessageSquare, Sparkles, Shield, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, differenceInDays } from "date-fns";
import type { Contract } from "@/pages/Track";

interface Props {
  contract: Contract | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

export function CounterpartyPortalPreview({ contract, open, onOpenChange }: Props) {
  if (!contract) return null;
  const days = differenceInDays(contract.expiryDate, new Date());
  const intel = contract.intelligence;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-gradient-to-b from-primary/5 to-background">
          {/* Branded header */}
          <div className="px-8 py-6 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Hosted by Docsora</div>
                <div className="text-sm font-semibold text-foreground">Your Company shared a contract</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Hero */}
          <div className="px-8 py-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Shield className="w-3 h-3" /> Secure · No login required
            </div>
            <h1 className="text-2xl font-semibold text-foreground">{contract.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Between Your Company and {contract.company}
            </p>
          </div>

          {/* AI summary */}
          {intel && (
            <div className="mx-8 mb-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5" /> What this contract says, in plain English
              </div>
              <p className="text-sm text-foreground leading-relaxed">{intel.summary}</p>
            </div>
          )}

          {/* Key dates grid */}
          <div className="px-8 grid grid-cols-3 gap-3 mb-6">
            <KeyCard label="Starts" value={format(contract.startDate, "MMM d, yyyy")} />
            <KeyCard label="Expires" value={format(contract.expiryDate, "MMM d, yyyy")} />
            <KeyCard label="Days remaining" value={days > 0 ? `${days} days` : "Expired"} tone={days <= 30 ? "warn" : "default"} />
          </div>

          {/* Document preview placeholder */}
          <div className="mx-8 mb-6 rounded-xl border border-border/50 bg-muted/20 aspect-[4/3] flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Document preview</p>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 pb-8 flex items-center gap-3">
            <Button size="lg" className="flex-1 gap-2">
              <Check className="w-4 h-4" /> Sign this contract
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <MessageSquare className="w-4 h-4" /> Comment
            </Button>
          </div>

          <div className="px-8 pb-6 text-center text-xs text-muted-foreground border-t border-border/40 pt-4">
            Powered by <span className="font-medium text-foreground">Docsora</span> · You'll get email updates as this contract progresses.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function KeyCard({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" }) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <Calendar className="w-3 h-3" /> {label}
      </div>
      <div className={`text-sm font-semibold ${tone === "warn" ? "text-amber-500" : "text-foreground"}`}>{value}</div>
    </div>
  );
}
