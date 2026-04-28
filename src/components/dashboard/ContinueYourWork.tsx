import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  PenTool,
  FileCheck2,
  Sparkles,
  Wand2,
  FileEdit,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ContinueKind = "upload" | "sign" | "convert" | "compress" | "ai_check" | "draft";

interface ContinueItem {
  id: string;
  kind: ContinueKind;
  title: string;
  /** For uploads/transfers: 0-100. For step-based: undefined. */
  progress?: number;
  /** For step-based flows */
  steps?: string[];
  currentStep?: number;
  /** Short state label, e.g. "68% uploaded", "Not completed", "Draft" */
  state: string;
  /** Subtle time context */
  lastActive: string;
  /** Minutes since last activity — used for sort + expiry */
  minutesAgo: number;
  cta: string;
}

const mockItems: ContinueItem[] = [
  {
    id: "u1",
    kind: "upload",
    title: "Series A Data Room.zip",
    progress: 68,
    state: "68% uploaded",
    lastActive: "Just now",
    minutesAgo: 1,
    cta: "Continue Upload",
  },
  {
    id: "s1",
    kind: "sign",
    title: "Vendor Agreement — DataCorp",
    steps: ["Open", "Review", "Sign", "Submit"],
    currentStep: 2,
    state: "Not completed",
    lastActive: "Last worked on 24 minutes ago",
    minutesAgo: 24,
    cta: "Resume Signing",
  },
  {
    id: "a1",
    kind: "ai_check",
    title: "Employee Handbook 2024.docx",
    steps: ["Upload", "Analyze", "Review", "Apply"],
    currentStep: 2,
    state: "Reviewing 12 of 15 sections",
    lastActive: "Last worked on 2 hours ago",
    minutesAgo: 120,
    cta: "Resume Review",
  },
];

const kindConfig: Record<
  ContinueKind,
  { label: string; icon: typeof Upload; accent: string; tint: string; bar: string }
> = {
  upload: {
    label: "Upload",
    icon: Upload,
    accent: "text-blue-500",
    tint: "bg-blue-500/10",
    bar: "from-blue-400 to-blue-600",
  },
  sign: {
    label: "Sign",
    icon: PenTool,
    accent: "text-violet-500",
    tint: "bg-violet-500/10",
    bar: "from-violet-400 to-violet-600",
  },
  convert: {
    label: "Convert",
    icon: FileCheck2,
    accent: "text-amber-500",
    tint: "bg-amber-500/10",
    bar: "from-amber-400 to-amber-600",
  },
  compress: {
    label: "Compress",
    icon: Wand2,
    accent: "text-emerald-500",
    tint: "bg-emerald-500/10",
    bar: "from-emerald-400 to-emerald-600",
  },
  ai_check: {
    label: "AI Check",
    icon: Sparkles,
    accent: "text-primary",
    tint: "bg-primary/10",
    bar: "from-primary/70 to-primary",
  },
  draft: {
    label: "Draft",
    icon: FileEdit,
    accent: "text-slate-500",
    tint: "bg-slate-500/10",
    bar: "from-slate-400 to-slate-600",
  },
};

const EXPIRY_MINUTES = 48 * 60; // 48h

export function ContinueYourWork() {
  const items = useMemo(
    () =>
      mockItems
        .filter((i) => i.minutesAgo <= EXPIRY_MINUTES)
        .sort((a, b) => a.minutesAgo - b.minutesAgo)
        .slice(0, 3),
    [],
  );

  if (items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mb-1">
        <h2 className="text-lg font-semibold text-foreground">Continue your work</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Pick up exactly where you left off
      </p>

      <div className="space-y-3">
        {items.map((item, i) => (
          <ContinueCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}

function ContinueCard({ item, index }: { item: ContinueItem; index: number }) {
  const cfg = kindConfig[item.kind];
  const KindIcon = cfg.icon;
  const isProgress = typeof item.progress === "number";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-2xl px-5 py-4",
        "bg-card/60 backdrop-blur-sm border border-border/50",
        "hover:border-border hover:bg-card/80 hover:shadow-[0_4px_24px_-8px_hsl(var(--primary)/0.12)]",
        "transition-all",
      )}
    >
      {/* Subtle ambient glow for in-progress uploads */}
      {isProgress && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity",
            "bg-[radial-gradient(circle_at_0%_50%,hsl(var(--primary)/0.08),transparent_60%)]",
          )}
        />
      )}

      <div className="relative flex items-start gap-4">
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
              <h4 className="font-medium text-sm text-foreground truncate">
                {item.title}
              </h4>
              <span className="text-[11px] text-muted-foreground shrink-0">
                {cfg.label}
              </span>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground/80">
              {item.lastActive}
            </span>
          </div>

          {/* Progress visual */}
          <div className="mt-3">
            {isProgress ? (
              <ProgressBar value={item.progress!} barClass={cfg.bar} />
            ) : (
              <StepProgression
                steps={item.steps ?? []}
                currentStep={item.currentStep ?? 0}
                accent={cfg.accent}
              />
            )}
          </div>

          {/* State + CTA */}
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground truncate">{item.state}</p>
            <button
              type="button"
              className={cn(
                "shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                "text-xs font-medium",
                "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
                "transition-all",
              )}
            >
              {item.cta}
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ value, barClass }: { value: number; barClass: string }) {
  return (
    <div className="space-y-1.5">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
            barClass,
          )}
        />
        {/* Shimmer */}
        <motion.div
          aria-hidden
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="flex items-center justify-end">
        <span className="text-[11px] font-medium text-foreground/80 tabular-nums">
          {value}%
        </span>
      </div>
    </div>
  );
}

function StepProgression({
  steps,
  currentStep,
  accent,
}: {
  steps: string[];
  currentStep: number;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={step} className="flex items-center gap-1.5 flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 min-w-0">
              <motion.div
                initial={false}
                animate={{ scale: active ? 1.15 : 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  done && "bg-emerald-500",
                  active && "bg-primary ring-4 ring-primary/15",
                  !done && !active && "bg-muted-foreground/25",
                )}
              />
              <span
                className={cn(
                  "text-[10px] truncate max-w-[70px] transition-colors",
                  done && "text-foreground/60",
                  active && cn("font-medium", accent),
                  !done && !active && "text-muted-foreground/50",
                )}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-muted relative -mt-4 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-emerald-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
