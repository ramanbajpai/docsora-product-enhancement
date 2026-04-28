import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  PenTool,
  Send,
  Sparkles,
  FileCheck2,
  Wand2,
  ArrowRight,
  Check,
  Upload,
  Eye,
  Download,
  Loader2,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowKind = "sign" | "transfer" | "ai_check" | "convert" | "compress";

interface WorkflowCard {
  id: string;
  kind: WorkflowKind;
  title: string;
  steps: string[];
  currentStep: number; // 0-based; equals steps.length when complete
  context: string;
  cta?: { label: string };
  completedAt?: string;
}

const cards: WorkflowCard[] = [
  {
    id: "s1",
    kind: "sign",
    title: "Partnership Agreement",
    steps: ["Sent", "Viewed", "Signed", "Completed"],
    currentStep: 2,
    context: "Waiting on Sarah to sign",
    cta: { label: "Remind" },
  },
  {
    id: "t1",
    kind: "transfer",
    title: "Series A Data Room",
    steps: ["Uploaded", "Shared", "Downloaded"],
    currentStep: 2,
    context: "1 of 3 recipients downloaded",
    cta: { label: "Continue" },
  },
  {
    id: "a1",
    kind: "ai_check",
    title: "Employee Handbook 2024",
    steps: ["Uploaded", "Processing", "Completed"],
    currentStep: 1,
    context: "Reviewing 12 of 15 sections",
  },
  {
    id: "c1",
    kind: "convert",
    title: "Q4 Financial Report",
    steps: ["Uploaded", "Processing", "Completed"],
    currentStep: 3,
    context: "Converted to PDF · ready to download",
    completedAt: "Just now",
  },
  {
    id: "s2",
    kind: "sign",
    title: "Vendor Agreement — DataCorp",
    steps: ["Sent", "Viewed", "Signed", "Completed"],
    currentStep: 1,
    context: "Awaiting your signature",
    cta: { label: "Continue" },
  },
];

const kindConfig: Record<
  WorkflowKind,
  { label: string; icon: typeof PenTool; accent: string; tint: string }
> = {
  sign: {
    label: "Signature",
    icon: PenTool,
    accent: "text-violet-500",
    tint: "bg-violet-500/10",
  },
  transfer: {
    label: "Transfer",
    icon: Send,
    accent: "text-blue-500",
    tint: "bg-blue-500/10",
  },
  ai_check: {
    label: "AI Check",
    icon: Sparkles,
    accent: "text-primary",
    tint: "bg-primary/10",
  },
  convert: {
    label: "Convert",
    icon: FileCheck2,
    accent: "text-amber-500",
    tint: "bg-amber-500/10",
  },
  compress: {
    label: "Compress",
    icon: Wand2,
    accent: "text-emerald-500",
    tint: "bg-emerald-500/10",
  },
};

const stepIconMap: Record<string, typeof Check> = {
  Sent: Send,
  Shared: Share2,
  Uploaded: Upload,
  Viewed: Eye,
  Signed: PenTool,
  Downloaded: Download,
  Processing: Loader2,
  Completed: Check,
};

export function ActiveWork() {
  const insight = useMemo(() => {
    const completedToday = cards.filter((c) => c.currentStep >= c.steps.length).length;
    const needsAttention = cards.filter(
      (c) => c.currentStep < c.steps.length && c.cta,
    ).length;
    if (needsAttention > 0)
      return `${needsAttention} workflow${needsAttention !== 1 ? "s" : ""} need attention to complete`;
    if (completedToday > 0)
      return `${completedToday} completed today`;
    return "All workflows progressing smoothly";
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="mb-1">
        <h2 className="text-lg font-semibold text-foreground">Your Momentum</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-primary/70" />
        {insight}
      </p>

      {/* Cards stack */}
      <div className="space-y-3">
        {cards.map((card, i) => (
          <MomentumCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

function MomentumCard({ card, index }: { card: WorkflowCard; index: number }) {
  const cfg = kindConfig[card.kind];
  const KindIcon = cfg.icon;
  const isComplete = card.currentStep >= card.steps.length;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group w-full text-left rounded-2xl px-5 py-4",
        "bg-card/60 backdrop-blur-sm border border-border/50",
        "hover:border-border hover:bg-card/80 hover:shadow-sm",
        "transition-all",
      )}
    >
      <div className="flex items-start gap-4">
        {/* Kind icon */}
        <div
          className={cn(
            "shrink-0 w-9 h-9 rounded-xl flex items-center justify-center",
            cfg.tint,
          )}
        >
          <KindIcon className={cn("w-4 h-4", cfg.accent)} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-baseline justify-between gap-3">
            <div className="min-w-0 flex items-baseline gap-2">
              <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
                {card.title}
              </h4>
              <span className="text-[11px] text-muted-foreground shrink-0">
                {cfg.label}
              </span>
            </div>
            {card.completedAt && (
              <span className="shrink-0 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {card.completedAt}
              </span>
            )}
          </div>

          {/* Step progression */}
          <div className="mt-3.5">
            <StepTrack
              steps={card.steps}
              currentStep={card.currentStep}
              accent={cfg.accent}
            />
          </div>

          {/* Context + CTA */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <p
              className={cn(
                "text-xs truncate",
                isComplete
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-muted-foreground",
              )}
            >
              {card.context}
            </p>
            {card.cta && !isComplete && (
              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {card.cta.label}
                <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function StepTrack({
  steps,
  currentStep,
  accent,
}: {
  steps: string[];
  currentStep: number;
  accent: string;
}) {
  const isComplete = currentStep >= steps.length;

  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, i) => {
        const done = i < currentStep || isComplete;
        const active = i === currentStep && !isComplete;
        const StepIcon = stepIconMap[step] ?? Check;
        const isProcessing = active && step === "Processing";

        return (
          <div key={step} className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 min-w-0">
              <motion.div
                initial={false}
                animate={{
                  scale: active ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                  done && "bg-emerald-500 text-white",
                  active && "bg-primary text-primary-foreground ring-4 ring-primary/15",
                  !done && !active && "bg-muted text-muted-foreground/60",
                )}
              >
                <StepIcon
                  className={cn(
                    "w-3 h-3",
                    isProcessing && "animate-spin",
                  )}
                />
              </motion.div>
              <span
                className={cn(
                  "text-[10px] truncate max-w-[70px] transition-colors",
                  done && "text-foreground/70",
                  active && "text-foreground font-medium",
                  !done && !active && "text-muted-foreground/60",
                )}
              >
                {step}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-muted relative -mt-4 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: i < currentStep || isComplete ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={cn(
                    "absolute inset-y-0 left-0",
                    i < currentStep || isComplete ? "bg-emerald-500" : "bg-transparent",
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
