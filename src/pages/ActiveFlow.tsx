import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFlowRuns, FlowRun, FlowRunStep, FlowRunStepStatus } from "@/hooks/useFlowRuns";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  CloudUpload,
  CreditCard,
  FileSignature,
  FileText,
  Inbox,
  MessageSquare,
  PenLine,
  Rocket,
  Send,
  Upload,
  XCircle,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const stepIcon = (type: FlowRunStep["type"]) => {
  switch (type) {
    case "send_contract": return FileSignature;
    case "kickoff": return Rocket;
    case "deliver_files": return CloudUpload;
    case "deliver_onboarding": return Inbox;
    case "collect_feedback": return MessageSquare;
    case "send_invoice": return FileText;
    case "request_payment": return CreditCard;
    case "final_approval": return CheckCircle2;
    default: return Circle;
  }
};

const statusMeta: Record<FlowRunStepStatus, { label: string; tone: string; dot: string }> = {
  pending: { label: "Pending", tone: "text-muted-foreground", dot: "bg-muted-foreground/40" },
  in_progress: { label: "In progress", tone: "text-primary", dot: "bg-primary" },
  waiting_client: { label: "Waiting on client", tone: "text-amber-400", dot: "bg-amber-400" },
  completed: { label: "Completed", tone: "text-emerald-400", dot: "bg-emerald-400" },
  blocked: { label: "Blocked", tone: "text-destructive", dot: "bg-destructive" },
  expired: { label: "Expired", tone: "text-destructive", dot: "bg-destructive" },
};

export default function ActiveFlow() {
  const { runId = "" } = useParams();
  const navigate = useNavigate();
  const { runs, advanceStep, addAssetToStep, addActivity } = useFlowRuns();
  const run = useMemo(() => runs.find((r) => r.id === runId), [runs, runId]);

  if (!run) {
    return (
      <AppLayout>
        <div className="p-10 max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/templates")} className="mb-6 gap-1.5">
            <ArrowLeft className="w-4 h-4" /> Back to flows
          </Button>
          <p className="text-sm text-muted-foreground">This flow no longer exists.</p>
        </div>
      </AppLayout>
    );
  }

  const completed = run.steps.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / run.steps.length) * 100);
  const currentStep =
    run.steps.find((s) => s.status !== "completed" && s.status !== "pending") ??
    run.steps.find((s) => s.status === "pending") ??
    run.steps[run.steps.length - 1];

  return (
    <AppLayout>
      <div className="relative min-h-screen">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative p-6 md:p-10 lg:p-12 max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/templates")}
            className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All flows
          </button>

          <FlowHeader run={run} progress={progress} completed={completed} />

          <CurrentActionPanel
            run={run}
            step={currentStep}
            onAdvance={() => advanceStep(run.id, currentStep.id)}
            onUpload={(asset) => addAssetToStep(run.id, currentStep.id, asset)}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-10">
            <Timeline
              run={run}
              onAdvance={(stepId) => advanceStep(run.id, stepId)}
              onUpload={(stepId, asset) => addAssetToStep(run.id, stepId, asset)}
            />
            <ActivityFeed run={run} onPing={() => {
              addActivity(run.id, { actor: "you", message: `Reminder sent to ${run.clientName}` });
              toast.success("Reminder sent");
            }} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

/* ──────────────── Header ──────────────── */

function FlowHeader({ run, progress, completed }: { run: FlowRun; progress: number; completed: number }) {
  const initials = run.clientName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm px-6 py-6 mb-8"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-border/60 flex items-center justify-center text-sm font-semibold tracking-tight">
          {initials || "—"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Active flow</span>
            <span className="text-[10px] text-muted-foreground">·</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{run.templateName}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">
            {run.projectName || `${run.clientName} — ${run.templateName}`}
          </h1>
          <div className="mt-1.5 flex items-center gap-3 text-[12px] text-muted-foreground">
            <span>{run.clientName}</span>
            <span>·</span>
            <span>{run.clientEmail}</span>
            <span>·</span>
            <span>Started {formatDistanceToNow(run.startedAt, { addSuffix: true })}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Status</div>
          <div className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-medium">
            <span className={cn("w-1.5 h-1.5 rounded-full", run.status === "completed" ? "bg-emerald-400" : "bg-primary")} />
            {run.status === "completed" ? "Completed" : run.status === "blocked" ? "Blocked" : "Active"}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Progress value={progress} className="h-1.5 bg-muted/40" />
        <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">
          {completed} of {run.steps.length} steps · {progress}%
        </span>
      </div>
    </motion.div>
  );
}

/* ──────────────── Current action panel ──────────────── */

function CurrentActionPanel({
  run,
  step,
  onAdvance,
  onUpload,
}: {
  run: FlowRun;
  step: FlowRunStep;
  onAdvance: () => void;
  onUpload: (a: { name: string; size?: number }) => void;
}) {
  const Icon = stepIcon(step.type);
  const meta = statusMeta[step.status];
  const fileInput = useRef<HTMLInputElement>(null);

  const isUploadStep = step.type === "deliver_files" || step.type === "deliver_onboarding";
  const isClientWait = step.status === "waiting_client";
  const isDone = run.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card/40 to-card/20 backdrop-blur-sm px-6 py-5"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-background/60 border border-border/60 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">Now</span>
            <span className={cn("inline-flex items-center gap-1.5 text-[11px]", meta.tone)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
              {meta.label}
            </span>
          </div>
          <h2 className="text-base md:text-lg font-semibold tracking-tight mt-1">
            {isDone ? "Flow completed" : actionTitle(step)}
          </h2>
          <p className="text-[12px] text-muted-foreground mt-1 leading-relaxed">
            {isDone
              ? `Every step is done. ${run.clientName} is fully onboarded.`
              : actionSubtitle(step, run.clientName)}
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {!isDone && isUploadStep && (
            <>
              <input
                ref={fileInput}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  files.forEach((f) => onUpload({ name: f.name, size: f.size }));
                  if (files.length) toast.success(`${files.length} file${files.length === 1 ? "" : "s"} uploaded`);
                  e.target.value = "";
                }}
              />
              <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => fileInput.current?.click()}>
                <Upload className="w-3.5 h-3.5" /> Upload
              </Button>
            </>
          )}
          {!isDone && isClientWait && (
            <Button size="sm" variant="outline" className="h-8 gap-1.5" onClick={() => toast.success("Reminder sent")}>
              <Send className="w-3.5 h-3.5" /> Remind
            </Button>
          )}
          {!isDone && (
            <Button size="sm" className="h-8 gap-1.5" onClick={onAdvance}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark done
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function actionTitle(step: FlowRunStep) {
  switch (step.type) {
    case "send_contract": return "Waiting for client signature";
    case "deliver_onboarding": return "Deliver onboarding documents";
    case "deliver_files": return "Upload and send deliverables";
    case "request_payment": return "Awaiting payment";
    case "send_invoice": return "Send invoice";
    case "collect_feedback": return "Collecting client feedback";
    case "final_approval": return "Awaiting final approval";
    case "kickoff": return "Kickoff with client";
    default: return step.label;
  }
}

function actionSubtitle(step: FlowRunStep, client: string) {
  switch (step.type) {
    case "send_contract": return `${client} hasn't signed yet. Send a nudge or mark done once received.`;
    case "deliver_onboarding": return `Upload the onboarding pack to share with ${client}.`;
    case "deliver_files": return `Drop the final deliverables here when ready.`;
    case "request_payment": return `Payment link is live. We'll mark this done once it clears.`;
    case "collect_feedback": return `${client} is reviewing — feedback will appear in the activity feed.`;
    case "final_approval": return `${client} needs to give the final sign-off.`;
    default: return step.description ?? `Step in progress.`;
  }
}

/* ──────────────── Timeline ──────────────── */

function Timeline({
  run,
  onAdvance,
  onUpload,
}: {
  run: FlowRun;
  onAdvance: (stepId: string) => void;
  onUpload: (stepId: string, asset: { name: string; size?: number }) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Steps</h2>
        <span className="text-[11px] text-muted-foreground tabular-nums">{run.steps.length} total</span>
      </div>
      <div className="space-y-2">
        {run.steps.map((s, i) => (
          <TimelineStep
            key={s.id}
            step={s}
            index={i}
            last={i === run.steps.length - 1}
            onAdvance={() => onAdvance(s.id)}
            onUpload={(a) => onUpload(s.id, a)}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineStep({
  step,
  index,
  last,
  onAdvance,
  onUpload,
}: {
  step: FlowRunStep;
  index: number;
  last: boolean;
  onAdvance: () => void;
  onUpload: (a: { name: string; size?: number }) => void;
}) {
  const Icon = stepIcon(step.type);
  const meta = statusMeta[step.status];
  const [open, setOpen] = useState(step.status !== "pending" && step.status !== "completed");
  const fileInput = useRef<HTMLInputElement>(null);
  const isUploadStep = step.type === "deliver_files" || step.type === "deliver_onboarding";
  const isCompleted = step.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={cn(
        "rounded-xl border bg-card/40 backdrop-blur-sm transition-colors",
        isCompleted ? "border-border/40 opacity-80" : "border-border/60 hover:bg-card/60",
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3.5 flex items-center gap-3"
      >
        <div className={cn(
          "w-8 h-8 rounded-lg border flex items-center justify-center shrink-0",
          isCompleted ? "border-emerald-400/30 bg-emerald-400/10" : "border-border/60 bg-background/40",
        )}>
          {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4 text-foreground/70" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-medium tracking-tight truncate">{step.label}</h3>
            <span className={cn("inline-flex items-center gap-1.5 text-[11px] shrink-0", meta.tone)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", meta.dot)} />
              {meta.label}
            </span>
          </div>
          {step.assets && step.assets.length > 0 && (
            <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
              {step.assets.length} file{step.assets.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
        <span className="text-[10px] tabular-nums text-muted-foreground shrink-0">{String(index + 1).padStart(2, "0")}</span>
      </button>

      {open && (
        <div className="border-t border-border/40 px-4 py-4 space-y-3">
          {isUploadStep && (
            <div>
              <input
                ref={fileInput}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files ?? []);
                  files.forEach((f) => onUpload({ name: f.name, size: f.size }));
                  e.target.value = "";
                }}
              />
              <div
                onClick={() => fileInput.current?.click()}
                className="rounded-lg border border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 transition cursor-pointer px-4 py-5 flex items-center justify-center gap-2 text-[12px] text-muted-foreground"
              >
                <CloudUpload className="w-4 h-4" />
                Drop files or click to upload
              </div>
            </div>
          )}

          {step.assets && step.assets.length > 0 && (
            <ul className="space-y-1.5">
              {step.assets.map((a) => (
                <li key={a.id} className="flex items-center gap-2 text-[12px] rounded-md border border-border/40 bg-muted/20 px-2.5 py-1.5">
                  <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="truncate flex-1">{a.name}</span>
                  {a.uploadedAt && (
                    <span className="text-[10px] text-muted-foreground tabular-nums">
                      {formatDistanceToNow(a.uploadedAt, { addSuffix: true })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          {!isCompleted && (
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button size="sm" variant="ghost" className="h-8 text-xs" onClick={onAdvance}>
                <CheckCircle2 className="w-3.5 h-3.5" /> Mark step done
              </Button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ──────────────── Activity feed ──────────────── */

function ActivityFeed({ run, onPing }: { run: FlowRun; onPing: () => void }) {
  const entries = [...run.activity].reverse();
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight">Activity</h2>
        <button onClick={onPing} className="text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Nudge client
        </button>
      </div>
      <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm">
        <ol className="divide-y divide-border/40">
          {entries.map((e) => (
            <li key={e.id} className="px-4 py-3 flex items-start gap-3">
              <span className={cn(
                "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0",
                e.actor === "you" ? "bg-primary" : e.actor === "client" ? "bg-amber-400" : "bg-muted-foreground/50",
              )} />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] text-foreground/85 leading-relaxed">{e.message}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                  {formatDistanceToNow(e.at, { addSuffix: true })}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
