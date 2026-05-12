import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileSignature,
  Rocket,
  PackageCheck,
  GraduationCap,
  MessageSquare,
  Receipt,
  Stamp,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  X,
  GripVertical,
  FileText,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  useCustomTemplates,
  CustomTemplate,
  FlowStep,
  FlowStepType,
  FlowStepAsset,
  CustomRole,
} from "@/hooks/useCustomTemplates";
import { templates as presetFlows, WorkflowTemplate } from "@/data/templates";

/* ──────────────────────────── Step library ──────────────────────────── */

type StepBlueprint = {
  type: FlowStepType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  needsAssets: boolean;
  assetLabel?: string;
  assetHint?: string;
  multiple?: boolean;
};

const STEP_LIBRARY: StepBlueprint[] = [
  {
    type: "send_contract",
    label: "Send contract for signing",
    description: "Send a document to your client to sign.",
    icon: FileSignature,
    needsAssets: true,
    assetLabel: "Contract document",
    assetHint: "PDF or DOCX. This is what your client will sign.",
  },
  {
    type: "kickoff",
    label: "Project kickoff",
    description: "Share a kickoff brief or call agenda.",
    icon: Rocket,
    needsAssets: false,
  },
  {
    type: "deliver_files",
    label: "Deliver work",
    description: "Hand off deliverables for client review.",
    icon: PackageCheck,
    needsAssets: true,
    assetLabel: "Deliverable files",
    assetHint: "Final files to share at delivery.",
    multiple: true,
  },
  {
    type: "deliver_onboarding",
    label: "Deliver onboarding documents",
    description: "Send onboarding materials after signing.",
    icon: GraduationCap,
    needsAssets: true,
    assetLabel: "Onboarding documents",
    assetHint: "Welcome packs, guides, intake forms — sent automatically.",
    multiple: true,
  },
  {
    type: "collect_feedback",
    label: "Collect feedback",
    description: "Open a review window for the client.",
    icon: MessageSquare,
    needsAssets: false,
  },
  {
    type: "send_invoice",
    label: "Send invoice",
    description: "Auto-generate or attach an invoice.",
    icon: Receipt,
    needsAssets: true,
    assetLabel: "Invoice template (optional)",
    assetHint: "Skip to auto-generate from project details.",
  },
  {
    type: "final_approval",
    label: "Final approval",
    description: "Collect a final sign-off to close the project.",
    icon: Stamp,
    needsAssets: false,
  },
];

const blueprintFor = (type: FlowStepType) =>
  STEP_LIBRARY.find((b) => b.type === type)!;

const uid = () => Math.random().toString(36).slice(2, 9);

/* ──────────────────────────── Preset → steps ──────────────────────────── */

function presetToSteps(preset: WorkflowTemplate): FlowStep[] {
  return preset.flow.map((s) => {
    // Map preset types to our step library.
    let type: FlowStepType = "kickoff";
    if (s.type === "contract") type = "send_contract";
    else if (s.type === "delivery") type = "deliver_files";
    else if (s.type === "feedback") type = "collect_feedback";
    else if (s.type === "approval") type = "final_approval";
    else if (s.type === "payment") type = "send_invoice";
    else if (s.type === "kickoff") type = "kickoff";
    const bp = blueprintFor(type);
    return {
      id: uid(),
      type,
      label: s.label || bp.label,
      description: s.description,
    };
  });
}

/* ──────────────────────────── Natural-language parser ──────────────────────────── */

const KEYWORDS: Array<{ rx: RegExp; type: FlowStepType }> = [
  { rx: /\b(onboard|welcome|intake)/i, type: "deliver_onboarding" },
  { rx: /\b(contract|sign|agreement|nda|msa)/i, type: "send_contract" },
  { rx: /\b(invoice|payment|bill|charge)/i, type: "send_invoice" },
  { rx: /\b(deliver|handoff|hand off|files?|ship)/i, type: "deliver_files" },
  { rx: /\b(feedback|review|comments?)/i, type: "collect_feedback" },
  { rx: /\b(approv|sign[- ]?off|close)/i, type: "final_approval" },
  { rx: /\b(kickoff|kick off|brief|start)/i, type: "kickoff" },
];

function parseNaturalFlow(text: string): FlowStep[] {
  const chunks = text
    .split(/\n|→|->|=>|,|;|\bthen\b|\bafter\b|\bnext\b/i)
    .map((c) => c.trim())
    .filter((c) => c.length > 1);

  const seen = new Set<FlowStepType>();
  const steps: FlowStep[] = [];
  for (const chunk of chunks) {
    const match = KEYWORDS.find((k) => k.rx.test(chunk));
    if (!match) continue;
    if (seen.has(match.type)) continue;
    seen.add(match.type);
    const bp = blueprintFor(match.type);
    steps.push({
      id: uid(),
      type: match.type,
      label: bp.label,
      description: chunk.length < 80 ? chunk : bp.description,
    });
  }
  return steps;
}

/* ──────────────────────────── Component ──────────────────────────── */

type Stage = "choose" | "build" | "assets" | "done";
type Mode = "preset" | "custom";

interface NewFlowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewFlowModal({ open, onOpenChange }: NewFlowModalProps) {
  const { save } = useCustomTemplates();
  const [stage, setStage] = useState<Stage>("choose");
  const [mode, setMode] = useState<Mode>("custom");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<FlowStep[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStage("choose");
      setMode("custom");
      setName("");
      setDescription("");
      setSteps([]);
      setSelectedPreset(null);
    }
  }, [open]);

  const stepsNeedingAssets = useMemo(
    () => steps.filter((s) => blueprintFor(s.type).needsAssets),
    [steps],
  );

  const choosePreset = (preset: WorkflowTemplate) => {
    setMode("preset");
    setSelectedPreset(preset.id);
    setName(preset.name);
    setDescription(preset.tagline);
    setSteps(presetToSteps(preset));
    setStage("build");
  };

  const startCustom = () => {
    setMode("custom");
    setSelectedPreset(null);
    setName("");
    setDescription("");
    setSteps([]);
    setStage("build");
  };

  const addStep = (type: FlowStepType) => {
    const bp = blueprintFor(type);
    setSteps((prev) => [
      ...prev,
      { id: uid(), type, label: bp.label, description: bp.description },
    ]);
  };

  const removeStep = (id: string) =>
    setSteps((prev) => prev.filter((s) => s.id !== id));

  const moveStep = (id: string, dir: -1 | 1) => {
    setSteps((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const clone = [...prev];
      const [item] = clone.splice(idx, 1);
      clone.splice(next, 0, item);
      return clone;
    });
  };

  const generateFromText = () => {
    if (!description.trim()) {
      toast.error("Describe your flow first.");
      return;
    }
    const parsed = parseNaturalFlow(description);
    if (parsed.length === 0) {
      toast.error("Couldn't detect steps. Try keywords like contract, onboarding, invoice.");
      return;
    }
    setSteps(parsed);
    toast.success(`Detected ${parsed.length} step${parsed.length === 1 ? "" : "s"}.`);
  };

  const setStepAssets = (id: string, assets: FlowStepAsset[]) => {
    setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, assets } : s)));
  };

  const goToAssets = () => {
    if (!name.trim()) return toast.error("Give your flow a name.");
    if (steps.length === 0) return toast.error("Add at least one step.");
    if (stepsNeedingAssets.length === 0) {
      finish();
    } else {
      setStage("assets");
    }
  };

  const finish = () => {
    const defaultRoles: CustomRole[] = [
      { key: "sender", label: "You", color: "hsl(var(--primary))" },
      { key: "client", label: "Client", color: "hsl(217 91% 60%)" },
    ];
    const docStep = steps.find((s) => s.type === "send_contract");
    const docName =
      docStep?.assets?.[0]?.name ?? `${name.trim()} document.pdf`;

    const tpl: CustomTemplate = {
      id: uid(),
      name: name.trim(),
      createdAt: Date.now(),
      documentName: docName,
      documentType: docName.toLowerCase().endsWith(".docx") ? "docx" : "pdf",
      pageCount: 1,
      roles: defaultRoles,
      fields: [],
      flowSteps: steps,
    };
    save(tpl);
    setStage("done");
    toast.success("Flow saved to your library.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0">
        <DialogTitle className="sr-only">Create a new flow</DialogTitle>
        <DialogDescription className="sr-only">
          Pick a starting point or describe your own flow.
        </DialogDescription>

        <div className="px-6 pt-6 pb-4 border-b border-border/60">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary/90">
              {stage === "choose" && "New flow"}
              {stage === "build" && "Build your flow"}
              {stage === "assets" && "Attach documents"}
              {stage === "done" && "Ready"}
            </span>
          </div>
          <h2 className="text-lg font-semibold tracking-tight">
            {stage === "choose" && "How do you want to start?"}
            {stage === "build" && (mode === "preset" ? "Tweak the steps" : "Design your flow")}
            {stage === "assets" && "Upload the documents this flow needs"}
            {stage === "done" && "Your flow is ready to send"}
          </h2>
        </div>

        <ScrollArea className="max-h-[65vh]">
          <div className="p-6">
            <AnimatePresence mode="wait">
              {stage === "choose" && (
                <ChooseStage
                  key="choose"
                  onPickPreset={choosePreset}
                  onCustom={startCustom}
                />
              )}

              {stage === "build" && (
                <BuildStage
                  key="build"
                  mode={mode}
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  steps={steps}
                  addStep={addStep}
                  removeStep={removeStep}
                  moveStep={moveStep}
                  generateFromText={generateFromText}
                />
              )}

              {stage === "assets" && (
                <AssetsStage
                  key="assets"
                  steps={stepsNeedingAssets}
                  onChange={setStepAssets}
                />
              )}

              {stage === "done" && (
                <DoneStage key="done" name={name} steps={steps} />
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border/60 flex items-center justify-between gap-3 bg-muted/20">
          <div className="text-[11px] text-muted-foreground">
            {stage === "choose" && "Pick a template or start from a blank canvas."}
            {stage === "build" && `${steps.length} step${steps.length === 1 ? "" : "s"} · ${stepsNeedingAssets.length} need files`}
            {stage === "assets" && "Files stay with this flow and are sent automatically at the right step."}
            {stage === "done" && "You can edit, send, or duplicate it any time."}
          </div>
          <div className="flex items-center gap-2">
            {stage === "build" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStage("choose")}
                className="gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
            )}
            {stage === "assets" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStage("build")}
                className="gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </Button>
            )}
            {stage === "build" && (
              <Button size="sm" onClick={goToAssets} className="gap-1.5">
                {stepsNeedingAssets.length > 0 ? "Attach documents" : "Save flow"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
            {stage === "assets" && (
              <Button size="sm" onClick={finish} className="gap-1.5">
                Save flow <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            )}
            {stage === "done" && (
              <Button size="sm" onClick={() => onOpenChange(false)}>
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ──────────────────────────── Stage: choose ──────────────────────────── */

function ChooseStage({
  onPickPreset,
  onCustom,
}: {
  onPickPreset: (p: WorkflowTemplate) => void;
  onCustom: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <button
        onClick={onCustom}
        className="group relative w-full text-left rounded-xl border border-primary/30 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent hover:border-primary/60 hover:shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.4)] transition-all p-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0">
          <Wand2 className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Describe your own flow</h3>
            <span className="text-[9px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
              AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Type what should happen — "Send contract, then deliver onboarding documents, then invoice." We'll build it.
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-2" />
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Or pick a preset
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {presetFlows.map((p) => (
          <button
            key={p.id}
            onClick={() => onPickPreset(p)}
            className="group text-left rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all p-4 flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="text-xl">{p.icon}</div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
            <div>
              <div className="text-sm font-medium leading-tight">{p.name}</div>
              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── Stage: build ──────────────────────────── */

function BuildStage({
  mode,
  name,
  setName,
  description,
  setDescription,
  steps,
  addStep,
  removeStep,
  moveStep,
  generateFromText,
}: {
  mode: Mode;
  name: string;
  setName: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  steps: FlowStep[];
  addStep: (t: FlowStepType) => void;
  removeStep: (id: string) => void;
  moveStep: (id: string, dir: -1 | 1) => void;
  generateFromText: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="flow-name" className="text-xs">
          Flow name
        </Label>
        <Input
          id="flow-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Client onboarding"
          className="h-10"
        />
      </div>

      {mode === "custom" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="flow-desc" className="text-xs">
              Describe your flow
            </Label>
            <button
              type="button"
              onClick={generateFromText}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 transition"
            >
              <Wand2 className="w-3 h-3" /> Generate steps
            </button>
          </div>
          <textarea
            id="flow-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Send contract, then deliver onboarding documents, then collect feedback, then invoice."
            className="w-full min-h-[72px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
          />
        </div>
      )}

      {/* Steps */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-xs">Steps ({steps.length})</Label>
        </div>
        {steps.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-6 text-center">
            <p className="text-xs text-muted-foreground">
              Add steps below or describe your flow above.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {steps.map((s, idx) => {
              const bp = blueprintFor(s.type);
              const Icon = bp.icon;
              return (
                <motion.div
                  layout
                  key={s.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="group flex items-center gap-3 rounded-lg border border-border/60 bg-card px-3 py-2.5"
                >
                  <span className="text-[10px] tabular-nums font-semibold text-muted-foreground w-4">
                    {idx + 1}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{s.label}</div>
                    {bp.needsAssets && (
                      <div className="text-[10px] text-primary/80 mt-0.5">
                        Needs files
                      </div>
                    )}
                  </div>
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => moveStep(s.id, -1)}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-accent disabled:opacity-30"
                      aria-label="Move up"
                    >
                      <ArrowLeft className="w-3 h-3 rotate-90" />
                    </button>
                    <button
                      onClick={() => moveStep(s.id, 1)}
                      disabled={idx === steps.length - 1}
                      className="p-1 rounded hover:bg-accent disabled:opacity-30"
                      aria-label="Move down"
                    >
                      <ArrowLeft className="w-3 h-3 -rotate-90" />
                    </button>
                    <button
                      onClick={() => removeStep(s.id)}
                      className="p-1 rounded hover:bg-accent text-muted-foreground hover:text-destructive"
                      aria-label="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add step menu */}
      <div className="space-y-2">
        <Label className="text-xs">Add a step</Label>
        <div className="grid grid-cols-2 gap-1.5">
          {STEP_LIBRARY.map((bp) => {
            const Icon = bp.icon;
            return (
              <button
                key={bp.type}
                onClick={() => addStep(bp.type)}
                className="group flex items-center gap-2 rounded-md border border-border/50 bg-background hover:border-primary/40 hover:bg-primary/[0.04] transition-all px-2.5 py-2 text-left"
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <span className="text-xs font-medium truncate">{bp.label}</span>
                <Plus className="w-3 h-3 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── Stage: assets ──────────────────────────── */

function AssetsStage({
  steps,
  onChange,
}: {
  steps: FlowStep[];
  onChange: (id: string, assets: FlowStepAsset[]) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2 }}
      className="space-y-4"
    >
      <p className="text-xs text-muted-foreground">
        Some steps need documents. Upload them now and they'll be sent automatically when this flow runs.
      </p>
      {steps.map((s) => (
        <AssetUploader
          key={s.id}
          step={s}
          onChange={(assets) => onChange(s.id, assets)}
        />
      ))}
    </motion.div>
  );
}

function AssetUploader({
  step,
  onChange,
}: {
  step: FlowStep;
  onChange: (assets: FlowStepAsset[]) => void;
}) {
  const bp = blueprintFor(step.type);
  const Icon = bp.icon;
  const inputRef = useRef<HTMLInputElement>(null);
  const assets = step.assets ?? [];

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const incoming: FlowStepAsset[] = Array.from(files).map((f) => ({
      id: uid(),
      name: f.name,
      size: f.size,
    }));
    const next = bp.multiple ? [...assets, ...incoming] : incoming.slice(0, 1);
    onChange(next);
  };

  const removeAsset = (id: string) =>
    onChange(assets.filter((a) => a.id !== id));

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium">{step.label}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {bp.assetLabel} {bp.multiple && "· multiple files"}
          </div>
          {bp.assetHint && (
            <div className="text-[11px] text-muted-foreground/80 mt-1">
              {bp.assetHint}
            </div>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        multiple={bp.multiple}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {assets.length > 0 && (
        <div className="space-y-1.5 mb-2">
          {assets.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-2 rounded-md border border-border/50 bg-muted/30 px-2.5 py-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs truncate flex-1">{a.name}</span>
              {a.size != null && (
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  {(a.size / 1024).toFixed(0)} KB
                </span>
              )}
              <button
                onClick={() => removeAsset(a.id)}
                className="p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-destructive"
                aria-label="Remove file"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full rounded-lg border border-dashed border-border/60 bg-background hover:border-primary/40 hover:bg-primary/[0.03] transition-all px-3 py-3 flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground",
        )}
      >
        <Upload className="w-3.5 h-3.5" />
        {assets.length > 0 && bp.multiple
          ? "Add more files"
          : assets.length > 0
            ? "Replace file"
            : "Upload files"}
      </button>
    </div>
  );
}

/* ──────────────────────────── Stage: done ──────────────────────────── */

function DoneStage({ name, steps }: { name: string; steps: FlowStep[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="text-center py-4"
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-base font-semibold">{name} is ready</h3>
      <p className="text-xs text-muted-foreground mt-1.5 max-w-sm mx-auto">
        {steps.length} step{steps.length === 1 ? "" : "s"} configured. You'll find it in <span className="text-foreground font-medium">Your flows</span>.
      </p>
    </motion.div>
  );
}