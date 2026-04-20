import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload, FileText, Sparkles, Check, X, Calendar, Building2,
  DollarSign, RefreshCw, AlertTriangle, ArrowRight, Loader2,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { addDays, addMonths, format } from "date-fns";
import type { Contract } from "@/pages/Track";
import { buildIntelligenceFor } from "./mockIntelligence";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onAdd: (c: Contract) => void;
}

type Stage = "upload" | "extracting" | "review" | "done";

const EXTRACTION_STEPS = [
  "Reading document structure…",
  "Identifying parties and roles…",
  "Extracting key dates…",
  "Detecting renewal terms…",
  "Calculating value & risk flags…",
  "Generating plain-English summary…",
];

export function ContractIngestionFlow({ open, onOpenChange, onAdd }: Props) {
  const [stage, setStage] = useState<Stage>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  // Extracted (mocked) fields
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [renewalType, setRenewalType] = useState<"auto" | "manual" | "unknown">("auto");
  const [noticeDays, setNoticeDays] = useState(60);

  useEffect(() => {
    if (stage !== "extracting") return;
    setStepIdx(0);
    const interval = setInterval(() => {
      setStepIdx(i => {
        if (i >= EXTRACTION_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => setStage("review"), 400);
          return i;
        }
        return i + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [stage]);

  const reset = () => {
    setStage("upload");
    setFile(null);
    setName(""); setCompany(""); setValue("");
    setStartDate(""); setExpiryDate(""); setRenewalType("auto"); setNoticeDays(60);
  };

  const handleFile = (f: File) => {
    setFile(f);
    // Mock extraction: derive plausible values from filename
    const cleanName = f.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    const mockCompany = cleanName.split(" ").slice(-2).join(" ") || "Acme Corporation";
    const start = new Date();
    const end = addMonths(start, 24);
    setName(cleanName);
    setCompany(mockCompany);
    setValue("$120,000 / year");
    setStartDate(format(start, "yyyy-MM-dd"));
    setExpiryDate(format(end, "yyyy-MM-dd"));
    setStage("extracting");
  };

  const handleConfirm = () => {
    if (!name || !company || !startDate || !expiryDate) {
      toast.error("Please complete the required fields");
      return;
    }
    const contract: Contract = {
      id: `c-${Date.now()}`,
      name,
      company,
      status: "active",
      startDate: new Date(startDate),
      expiryDate: new Date(expiryDate),
      renewalType,
      tags: ["AI Extracted"],
      parties: [
        { name: company, role: "Counterparty", email: `legal@${company.toLowerCase().replace(/\s+/g, "")}.com` },
        { name: "Your Company", role: "Client", email: "legal@yourcompany.com" },
      ],
      signedDate: new Date(),
      reminders: [
        { days: 90, enabled: true },
        { days: 60, enabled: true },
        { days: 30, enabled: true },
      ],
      value,
    };
    contract.intelligence = buildIntelligenceFor(contract);
    setStage("done");
    setTimeout(() => {
      onAdd(contract);
      toast.success("Contract added — Docsora is now monitoring it.");
      onOpenChange(false);
      reset();
    }, 1200);
  };

  const summary =
    name && company
      ? `This is a ${renewalType === "auto" ? "auto-renewing" : "fixed-term"} agreement with ${company}. ${
          renewalType === "auto"
            ? `It auto-renews unless cancelled ${noticeDays} days before expiry on ${expiryDate ? format(new Date(expiryDate), "MMM d, yyyy") : "—"}.`
            : `It expires on ${expiryDate ? format(new Date(expiryDate), "MMM d, yyyy") : "—"} and requires a manual renewal decision.`
        }`
      : "";

  const noticeDeadline = expiryDate ? format(addDays(new Date(expiryDate), -noticeDays), "MMM d, yyyy") : "—";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) reset();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence mode="wait">
          {/* UPLOAD */}
          {stage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-primary mb-2">
                <Sparkles className="w-3.5 h-3.5" /> AI-POWERED INGESTION
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Upload your contract</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Docsora will read it, extract every key field, and tell you exactly what to do.
              </p>

              <label
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const f = e.dataTransfer.files[0];
                  if (f) handleFile(f);
                }}
                className="block border-2 border-dashed border-border/60 hover:border-primary/40 hover:bg-primary/5 rounded-xl p-12 text-center cursor-pointer transition-colors"
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">Drop a contract here</p>
                <p className="text-xs text-muted-foreground">or click to browse · PDF, DOC, DOCX</p>
              </label>
            </motion.div>
          )}

          {/* EXTRACTING */}
          {stage === "extracting" && (
            <motion.div
              key="extracting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-10 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4"
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Reading {file?.name}</h2>
              <p className="text-sm text-muted-foreground mb-6">Docsora AI is analyzing your contract</p>

              <div className="space-y-2 max-w-sm mx-auto text-left">
                {EXTRACTION_STEPS.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: i <= stepIdx ? 1 : 0.3 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    {i < stepIdx ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : i === stepIdx ? (
                      <Loader2 className="w-4 h-4 animate-spin text-primary shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-border shrink-0" />
                    )}
                    <span className={i <= stepIdx ? "text-foreground" : "text-muted-foreground"}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* REVIEW */}
          {stage === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 space-y-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 mb-1">
                    <Check className="w-3.5 h-3.5" /> EXTRACTION COMPLETE
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">Confirm the details</h2>
                  <p className="text-sm text-muted-foreground">Edit anything Docsora got wrong, then save.</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1">
                  <Sparkles className="w-3 h-3" /> AI
                </Badge>
              </div>

              {/* AI summary card */}
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Plain English summary
                </div>
                <p className="text-sm text-foreground leading-relaxed">{summary}</p>
                {renewalType === "auto" && (
                  <div className="mt-3 pt-3 border-t border-primary/20 flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-foreground">
                      You must act by <strong>{noticeDeadline}</strong>.
                    </span>
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="grid grid-cols-2 gap-3">
                <Field label="Contract name" icon={FileText}>
                  <Input value={name} onChange={e => setName(e.target.value)} />
                </Field>
                <Field label="Counterparty" icon={Building2}>
                  <Input value={company} onChange={e => setCompany(e.target.value)} />
                </Field>
                <Field label="Value" icon={DollarSign}>
                  <Input value={value} onChange={e => setValue(e.target.value)} />
                </Field>
                <Field label="Renewal type" icon={RefreshCw}>
                  <select
                    value={renewalType}
                    onChange={e => setRenewalType(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                  >
                    <option value="auto">Auto-renewal</option>
                    <option value="manual">Manual renewal</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </Field>
                <Field label="Start date" icon={Calendar}>
                  <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </Field>
                <Field label="Expiry date" icon={Calendar}>
                  <Input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                </Field>
                {renewalType === "auto" && (
                  <Field label="Notice period (days)" icon={AlertTriangle}>
                    <Input type="number" value={noticeDays} onChange={e => setNoticeDays(parseInt(e.target.value) || 0)} />
                  </Field>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleConfirm} className="gap-2">
                  Confirm & start tracking <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* DONE */}
          {stage === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center"
              >
                <Check className="w-8 h-8 text-emerald-500" />
              </motion.div>
              <h2 className="text-lg font-semibold text-foreground">Contract is now live</h2>
              <p className="text-sm text-muted-foreground mt-1">Docsora will alert you when action is needed.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: any; children: React.ReactNode }) {
  return (
    <div>
      <Label className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
        <Icon className="w-3 h-3" /> {label}
      </Label>
      {children}
    </div>
  );
}
