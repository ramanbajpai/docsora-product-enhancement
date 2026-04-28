import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type WorkflowStatus = "on_track" | "at_risk" | "stalled";
type CompletedAction = "Signed" | "Downloaded" | "Approved";

interface ActiveWorkflow {
  id: string;
  title: string;
  type: string;
  status: WorkflowStatus;
  progressLabel: string;
  progress: number; // 0-100
  timeRemaining: string;
  lastActivity: string;
}

interface CompletedWorkflow {
  id: string;
  title: string;
  action: CompletedAction;
  completedAt: string;
  followUp?: { label: string; cta: string };
}

const activeWorkflows: ActiveWorkflow[] = [
  {
    id: "w1",
    title: "Office Lease Amendment",
    type: "Approval",
    status: "stalled",
    progressLabel: "1 of 3 approved",
    progress: 33,
    timeRemaining: "Overdue by 1 day",
    lastActivity: "No activity for 4 days",
  },
  {
    id: "w2",
    title: "Vendor Agreement — DataCorp",
    type: "Signature",
    status: "at_risk",
    progressLabel: "Awaiting your signature",
    progress: 50,
    timeRemaining: "2 days remaining",
    lastActivity: "Sent yesterday",
  },
  {
    id: "w3",
    title: "Partnership Agreement",
    type: "Signature",
    status: "at_risk",
    progressLabel: "1 of 2 signed",
    progress: 50,
    timeRemaining: "3 days remaining",
    lastActivity: "Sarah Chen viewed 6h ago",
  },
  {
    id: "w4",
    title: "Series A Data Room",
    type: "Transfer",
    status: "on_track",
    progressLabel: "3 of 4 downloaded",
    progress: 75,
    timeRemaining: "5 days remaining",
    lastActivity: "Downloaded 2h ago",
  },
  {
    id: "w5",
    title: "Employee Handbook 2024",
    type: "AI Check",
    status: "on_track",
    progressLabel: "12 of 15 sections reviewed",
    progress: 80,
    timeRemaining: "On schedule",
    lastActivity: "Updated 1h ago",
  },
];

const completedWorkflows: CompletedWorkflow[] = [
  {
    id: "c1",
    title: "Client NDA — Acme Corp",
    action: "Signed",
    completedAt: "2h ago",
    followUp: { label: "Request payment", cta: "request_payment" },
  },
  {
    id: "c2",
    title: "Brand Assets v2",
    action: "Downloaded",
    completedAt: "Yesterday",
    followUp: { label: "Share again", cta: "share_again" },
  },
  {
    id: "c3",
    title: "Q3 Financial Report",
    action: "Approved",
    completedAt: "Yesterday",
  },
];

const statusConfig: Record<
  WorkflowStatus,
  { label: string; dot: string; text: string; rank: number }
> = {
  stalled: {
    label: "Stalled",
    dot: "bg-destructive",
    text: "text-destructive",
    rank: 0,
  },
  at_risk: {
    label: "At risk",
    dot: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
    rank: 1,
  },
  on_track: {
    label: "On track",
    dot: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    rank: 2,
  },
};

export function ActiveWork() {
  const sorted = useMemo(
    () =>
      [...activeWorkflows].sort(
        (a, b) => statusConfig[a.status].rank - statusConfig[b.status].rank,
      ),
    [],
  );

  const counts = useMemo(() => {
    const c = { on_track: 0, at_risk: 0, stalled: 0 };
    activeWorkflows.forEach((w) => c[w.status]++);
    return c;
  }, []);

  const total = activeWorkflows.length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Your Workflows
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Live status across everything in motion
          </p>
        </div>
      </div>

      {/* Section 1 — Status Overview */}
      <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground tracking-tight">
            {total}
          </span>
          <span className="text-sm text-muted-foreground">active workflows</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <StatusPill
            count={counts.on_track}
            label="progressing"
            dot="bg-emerald-500"
          />
          <StatusPill
            count={counts.at_risk}
            label="at risk"
            dot="bg-amber-500"
          />
          <StatusPill
            count={counts.stalled}
            label="stalled"
            dot="bg-destructive"
          />
        </div>
      </div>

      {/* Section 2 — In Progress */}
      <div className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            In progress
          </h3>
        </div>
        <div className="divide-y divide-border/50">
          {sorted.map((w, i) => (
            <WorkflowRow key={w.id} workflow={w} index={i} />
          ))}
        </div>
      </div>

      {/* Section 3 — Recently Completed */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recently completed
          </h3>
        </div>
        <div className="divide-y divide-border/40">
          {completedWorkflows.map((c, i) => (
            <CompletedRow key={c.id} item={c} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function StatusPill({
  count,
  label,
  dot,
}: {
  count: number;
  label: string;
  dot: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-foreground/80">
      <span className={cn("w-1.5 h-1.5 rounded-full", dot)} />
      <span className="font-medium">{count}</span>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

function WorkflowRow({
  workflow,
  index,
}: {
  workflow: ActiveWorkflow;
  index: number;
}) {
  const status = statusConfig[workflow.status];
  const StatusIcon =
    workflow.status === "stalled"
      ? AlertTriangle
      : workflow.status === "at_risk"
        ? Clock
        : TrendingUp;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={cn(
        "group w-full text-left py-4 px-1 -mx-1 rounded-lg",
        "hover:bg-muted/40 transition-colors",
      )}
    >
      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="shrink-0 flex flex-col items-center gap-1 w-10">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              workflow.status === "stalled" && "bg-destructive/10",
              workflow.status === "at_risk" && "bg-amber-500/10",
              workflow.status === "on_track" && "bg-emerald-500/10",
            )}
          >
            <StatusIcon className={cn("w-4 h-4", status.text)} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2">
            <h4 className="font-medium text-sm text-foreground truncate group-hover:text-primary transition-colors">
              {workflow.title}
            </h4>
            <span className="text-[11px] text-muted-foreground shrink-0">
              {workflow.type}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className={cn("font-medium", status.text)}>
              {status.label}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground truncate">
              {workflow.progressLabel}
            </span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-0.5 bg-muted/60 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${workflow.progress}%` }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.04 }}
              className={cn("h-full rounded-full", status.dot)}
            />
          </div>
        </div>

        {/* Right meta */}
        <div className="shrink-0 hidden sm:flex flex-col items-end gap-0.5 text-right">
          <span
            className={cn(
              "text-xs font-medium",
              workflow.status === "stalled"
                ? "text-destructive"
                : "text-foreground/80",
            )}
          >
            {workflow.timeRemaining}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {workflow.lastActivity}
          </span>
        </div>

        <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </motion.button>
  );
}

function CompletedRow({
  item,
  index,
}: {
  item: CompletedWorkflow;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex items-center gap-4 py-3 px-1 -mx-1"
    >
      <div className="shrink-0 w-10 flex justify-center">
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h4 className="text-sm text-foreground/90 truncate">{item.title}</h4>
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{item.action}</span>
          <span>·</span>
          <span>{item.completedAt}</span>
        </div>
      </div>

      {item.followUp && (
        <button
          type="button"
          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          {item.followUp.label}
          <ArrowRight className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}
