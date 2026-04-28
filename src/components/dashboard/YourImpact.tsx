import { motion } from "framer-motion";
import { Clock, FileSignature, HardDrive, Leaf, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Your Impact
 *
 * Premium, data-driven section showing tangible value delivered by Docsora.
 * Calm, credible, no gamification.
 */

interface ImpactMetric {
  id: string;
  icon: typeof Clock;
  label: string;
  primary: string;
  secondary?: string;
}

const metrics: ImpactMetric[] = [
  {
    id: "time",
    icon: Clock,
    label: "Time saved",
    primary: "~14 hours",
    secondary: "this month",
  },
  {
    id: "documents",
    icon: FileSignature,
    label: "Documents processed",
    primary: "28 contracts signed",
    secondary: "412 pages processed",
  },
  {
    id: "data",
    icon: HardDrive,
    label: "Data movement",
    primary: "126 GB transferred",
    secondary: "42% average compression",
  },
  {
    id: "co2",
    icon: Leaf,
    label: "Environmental impact",
    primary: "~18 kg CO₂ avoided",
    secondary: "vs. printed equivalent",
  },
];

export function YourImpact() {
  return (
    <motion.section
      aria-label="Your Impact"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16"
    >
      {/* Header */}
      <div className="mb-6 px-1">
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Your Impact
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what you've achieved with Docsora
        </p>
      </div>

      {/* Metrics grid */}
      <div
        className={cn(
          "rounded-2xl border border-border/50 bg-surface-1/40 backdrop-blur-sm",
          "overflow-hidden"
        )}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border/40">
          {metrics.map((m, i) => (
            <MetricCell key={m.id} metric={m} index={i} />
          ))}
        </div>

        {/* Dynamic insight footer */}
        <div className="border-t border-border/40 px-6 py-4 bg-surface-2/30 flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3 h-3 text-primary" />
          </div>
          <p className="text-sm text-foreground/80">
            Your workflows are{" "}
            <span className="font-medium text-foreground">22% faster</span>{" "}
            than last month.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function MetricCell({ metric, index }: { metric: ImpactMetric; index: number }) {
  const Icon = metric.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + index * 0.06 }}
      className="p-6 group"
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.75} />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
          {metric.label}
        </span>
      </div>
      <p className="text-lg font-semibold text-foreground tabular-nums leading-tight">
        {metric.primary}
      </p>
      {metric.secondary && (
        <p className="text-xs text-muted-foreground mt-1 tabular-nums">
          {metric.secondary}
        </p>
      )}
    </motion.div>
  );
}
