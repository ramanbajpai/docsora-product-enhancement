import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PenTool, 
  CheckCircle2, 
  FileText,
  ArrowRight,
  Sparkles,
  Send,
  Eye,
  Zap,
  AlertTriangle,
  Clock,
  Wand2,
  Loader2,
  Activity,
  X,
  Mail,
  Bell,
  Brain,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

type UserRole = "signer" | "approver" | "sender" | "cc";
type UrgencyLevel = "critical" | "high" | "medium";
type RiskState = "at-risk" | "stalled" | "on-track";

type ActivityKind = "thinking" | "email" | "reminder" | "sign" | "success" | "info";

interface ActivityEvent {
  id: string;
  kind: ActivityKind;
  title: string;
  detail?: string;
  documentTitle?: string;
  timestamp: Date;
}

const activityIconMap: Record<ActivityKind, typeof Mail> = {
  thinking: Brain,
  email: Mail,
  reminder: Bell,
  sign: PenTool,
  success: CheckCircle2,
  info: Sparkles,
};

const activityToneMap: Record<ActivityKind, string> = {
  thinking: "text-primary bg-primary/10",
  email: "text-blue-500 bg-blue-500/10",
  reminder: "text-amber-500 bg-amber-500/10",
  sign: "text-violet-500 bg-violet-500/10",
  success: "text-emerald-500 bg-emerald-500/10",
  info: "text-muted-foreground bg-muted",
};

interface PriorityAction {
  id: string;
  title: string;
  reason: string;
  role: UserRole;
  urgency: UrgencyLevel;
  cta: string;
  ctaAction: "sign" | "review" | "resend" | "view";
  dueDate?: string;
  aiInsight?: string;
  aiRecommendation?: string;
  riskState: RiskState;
  canAutopilot: boolean;
}

const mockPriorityActions: PriorityAction[] = [
  {
    id: "1",
    title: "Acme Corp — Master Services Agreement",
    reason: "Renews in 6 days. No counter-signature received.",
    role: "signer",
    urgency: "critical",
    cta: "Send renewal nudge",
    ctaAction: "sign",
    dueDate: "2d",
    aiInsight: "Typically completed within 48 hours",
    aiRecommendation: "Send a polite renewal nudge to Sarah Chen.",
    riskState: "at-risk",
    canAutopilot: true,
  },
  {
    id: "2",
    title: "Q4 Pricing Deck — Helios",
    reason: "Transfer link expires tomorrow. Recipient hasn't downloaded.",
    role: "approver",
    urgency: "high",
    cta: "Extend & ping",
    ctaAction: "review",
    dueDate: "3d",
    aiRecommendation: "Extend the link by 7 days and ping the recipient.",
    riskState: "stalled",
    canAutopilot: true,
  },
  {
    id: "3",
    title: "Mutual NDA — Lattice",
    reason: "Legal flagged 2 risky clauses. Awaiting your decision.",
    role: "sender",
    urgency: "high",
    cta: "Review redline",
    ctaAction: "resend",
    dueDate: "1d",
    aiInsight: "May require revision before approval",
    aiRecommendation: "Review AI redline and accept or push back.",
    riskState: "at-risk",
    canAutopilot: true,
  },
];

const roleConfig: Record<UserRole, { label: string }> = {
  signer: { label: "Signer" },
  approver: { label: "Approver" },
  sender: { label: "Sender" },
  cc: { label: "CC" },
};

const ctaConfig: Record<string, { icon: typeof PenTool }> = {
  sign: { icon: PenTool },
  review: { icon: Eye },
  resend: { icon: Send },
  view: { icon: ArrowRight },
};

const riskConfig: Record<RiskState, { label: string; className: string; icon: typeof AlertTriangle }> = {
  "at-risk": {
    label: "At Risk",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: AlertTriangle,
  },
  "stalled": {
    label: "Stalled",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    icon: Clock,
  },
  "on-track": {
    label: "On Track",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: CheckCircle2,
  },
};

export function PriorityActions() {
  const [autopilotIds, setAutopilotIds] = useState<Set<string>>(new Set());
  const [handlingAll, setHandlingAll] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityMinimized, setActivityMinimized] = useState(false);
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const eventCounter = useRef(0);

  const pushActivity = (event: Omit<ActivityEvent, "id" | "timestamp">) => {
    eventCounter.current += 1;
    setActivityFeed((prev) => [
      ...prev,
      {
        ...event,
        id: `evt-${eventCounter.current}-${Date.now()}`,
        timestamp: new Date(),
      },
    ]);
  };

  // Auto-scroll activity feed
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [activityFeed]);

  const sortedActions = [...mockPriorityActions].sort((a, b) => {
    const urgencyOrder = { critical: 0, high: 1, medium: 2 };
    return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
  });

  const toggleAutopilot = (id: string, title: string) => {
    setAutopilotIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info("Autopilot paused", { description: title });
      } else {
        next.add(id);
        toast.success("Docsora is on it", {
          description: "We'll handle follow-ups and ensure this gets completed",
        });
        // Open activity panel and stream events for this item
        setActivityOpen(true);
        setActivityMinimized(false);
        streamItemActivity(title);
      }
      return next;
    });
  };

  const streamItemActivity = (title: string) => {
    const steps: Array<Omit<ActivityEvent, "id" | "timestamp">> = [
      { kind: "thinking", title: "Analyzing recipient behavior", detail: "Reviewing past response patterns and signing history", documentTitle: title },
      { kind: "email", title: "Drafting personalized follow-up", detail: "Tone calibrated for professional, time-sensitive context", documentTitle: title },
      { kind: "reminder", title: "First reminder scheduled", detail: "Will send in 4 hours if no activity", documentTitle: title },
      { kind: "info", title: "Monitoring for signature events", detail: "I'll notify you the moment something changes", documentTitle: title },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => pushActivity(step), 600 + i * 1100);
    });
  };

  const streamBulkActivity = (count: number) => {
    const steps: Array<Omit<ActivityEvent, "id" | "timestamp">> = [
      { kind: "thinking", title: `Reviewing ${count} priority items`, detail: "Building the optimal action plan" },
      { kind: "email", title: "Drafting follow-ups for TechCorp", detail: "Personalized to recipient + urgency" },
      { kind: "reminder", title: "Scheduled reminder — Q4 Budget Proposal", detail: "Finance approver, 4-hour cadence" },
      { kind: "sign", title: "Prepared revised NDA — Partner Inc", detail: "Decline reason addressed in cover note" },
      { kind: "reminder", title: "Nudge queued — Employment Contract", detail: "Recipient inactive 5 days" },
      { kind: "success", title: "Autopilot active on all items", detail: "I'll keep you posted as things move" },
    ];
    steps.forEach((step, i) => {
      setTimeout(() => pushActivity(step), 500 + i * 950);
    });
  };

  const handleAllForMe = () => {
    setHandlingAll(true);
    setActivityOpen(true);
    setActivityMinimized(false);
    setTimeout(() => {
      const allIds = new Set(sortedActions.filter((a) => a.canAutopilot).map((a) => a.id));
      setAutopilotIds(allIds);
      setHandlingAll(false);
      toast.success("Docsora is handling everything", {
        description: `Autopilot enabled on ${allIds.size} items — we'll keep you posted`,
      });
      streamBulkActivity(allIds.size);
    }, 800);
  };

  const autopilotCount = autopilotIds.size;
  const allHandled = autopilotCount === sortedActions.filter((a) => a.canAutopilot).length;

  if (sortedActions.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card-elevated p-6 text-center"
      >
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-foreground">All clear</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Docsora has nothing on the runway right now
        </p>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header with Handle All */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">
              Your Priority Actions
            </h2>
            {autopilotCount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
              >
                <Zap className="w-2.5 h-2.5" />
                {autopilotCount} on autopilot
              </motion.span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">
            {allHandled
              ? "Docsora is handling everything for you"
              : `${sortedActions.length} item${sortedActions.length !== 1 ? "s" : ""} — sign yourself, or let Docsora drive`}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: allHandled ? 1 : 1.02 }}
          whileTap={{ scale: allHandled ? 1 : 0.98 }}
          onClick={handleAllForMe}
          disabled={handlingAll || allHandled}
          className={cn(
            "shrink-0 inline-flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-sm font-medium rounded-full transition-all",
            allHandled
              ? "border border-primary/40 bg-primary/10 backdrop-blur-sm text-primary"
              : "border border-border/60 bg-surface-2/60 backdrop-blur-sm text-foreground hover:bg-surface-2 hover:border-border",
            "disabled:opacity-70 disabled:cursor-not-allowed"
          )}
        >
          {handlingAll ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
              <span>Handing off…</span>
              <span className="ml-1 inline-flex h-5 w-9 items-center rounded-full bg-muted px-0.5">
                <span className="h-4 w-4 rounded-full bg-background shadow-sm" />
              </span>
            </>
          ) : allHandled ? (
            <>
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-primary/15 border border-primary/25">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </span>
              <span>Autopilot · on</span>
              <span className="ml-1 inline-flex h-5 w-9 items-center rounded-full bg-primary/30 px-0.5 justify-end">
                <span className="h-4 w-4 rounded-full bg-primary shadow-sm" />
              </span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Let Docsora handle this</span>
              <span className="ml-1 inline-flex h-5 w-9 items-center rounded-full bg-muted px-0.5">
                <span className="h-4 w-4 rounded-full bg-background shadow-sm" />
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Live Activity Panel */}
      <AnimatePresence>
        {activityOpen && (
          <motion.div
            key="activity-panel"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mb-4 overflow-hidden"
          >
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-card/80 to-card/80 backdrop-blur-xl shadow-glow overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-border/40">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/20">
                    <Activity className="w-3.5 h-3.5 text-primary" />
                    <span className="absolute -top-0.5 -right-0.5 flex w-2 h-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">Docsora is working</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/80">Live</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {activityFeed.length === 0
                        ? "Spinning up your autopilot session…"
                        : `${activityFeed.length} action${activityFeed.length !== 1 ? "s" : ""} so far`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setActivityMinimized((m) => !m)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    aria-label={activityMinimized ? "Expand" : "Minimize"}
                  >
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activityMinimized && "-rotate-90")} />
                  </button>
                  <button
                    onClick={() => {
                      setActivityOpen(false);
                      setActivityFeed([]);
                    }}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Feed */}
              <AnimatePresence initial={false}>
                {!activityMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      ref={feedRef}
                      className="max-h-[260px] overflow-y-auto px-4 py-3 space-y-2.5"
                    >
                      {activityFeed.length === 0 ? (
                        <div className="flex items-center gap-2 py-4 text-xs text-muted-foreground">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                          Thinking through the best plan…
                        </div>
                      ) : (
                        activityFeed.map((event, idx) => {
                          const Icon = activityIconMap[event.kind];
                          const isLast = idx === activityFeed.length - 1;
                          return (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex items-start gap-2.5"
                            >
                              <div
                                className={cn(
                                  "shrink-0 w-6 h-6 rounded-md flex items-center justify-center",
                                  activityToneMap[event.kind]
                                )}
                              >
                                <Icon className="w-3 h-3" />
                              </div>
                              <div className="min-w-0 flex-1 pb-1">
                                <div className="flex items-baseline gap-2">
                                  <p className="text-xs font-medium text-foreground truncate">
                                    {event.title}
                                  </p>
                                  {isLast && (
                                    <span className="text-[9px] uppercase tracking-wider text-primary font-semibold shrink-0">
                                      now
                                    </span>
                                  )}
                                </div>
                                {event.detail && (
                                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                                    {event.detail}
                                  </p>
                                )}
                                {event.documentTitle && (
                                  <p className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">
                                    on {event.documentTitle}
                                  </p>
                                )}
                              </div>
                            </motion.div>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {sortedActions.map((action, index) => {
            const role = roleConfig[action.role];
            const cta = ctaConfig[action.ctaAction];
            const CtaIcon = cta.icon;
            const isCritical = action.urgency === "critical";
            const isOnAutopilot = autopilotIds.has(action.id);
            const risk = riskConfig[action.riskState];
            const RiskIcon = risk.icon;

            return (
              <motion.div
                key={action.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className={cn(
                  "rounded-2xl border bg-card/60 backdrop-blur-sm p-5 group relative transition-all duration-200",
                  isOnAutopilot
                    ? "border-primary/40 shadow-glow bg-primary/[0.04]"
                    : "border-border/60 hover:border-border hover:bg-card/80"
                )}
              >
                <div className="flex items-start gap-4">
                  {/* Status icon circle */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                      action.riskState === "stalled"
                        ? "bg-destructive/10 border-destructive/20 text-destructive"
                        : action.riskState === "at-risk"
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                    )}
                  >
                    {action.riskState === "stalled" ? (
                      <AlertTriangle className="w-4 h-4" />
                    ) : action.riskState === "at-risk" ? (
                      <Clock className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Title row + timestamp */}
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={cn(
                          "text-foreground transition-colors truncate",
                          isCritical ? "font-semibold" : "font-semibold"
                        )}
                      >
                        {action.title}
                      </h3>
                      {action.dueDate && (
                        <span className="shrink-0 text-xs text-muted-foreground/80 font-medium">
                          {action.dueDate}
                        </span>
                      )}
                    </div>

                    {/* Reason */}
                    <p className="text-sm text-muted-foreground mt-1">
                      {action.reason}
                    </p>

                    {/* Docsora suggests */}
                    {action.aiRecommendation && !isOnAutopilot && (
                      <p className="mt-2 text-sm">
                        <span className="text-primary font-medium">Docsora suggests: </span>
                        <span className="text-foreground/80">{action.aiRecommendation}</span>
                      </p>
                    )}

                    {/* Autopilot active state */}
                    {isOnAutopilot && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 flex items-center gap-1.5 text-xs text-primary font-medium"
                      >
                        <span className="relative flex w-1.5 h-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                        </span>
                        Docsora is following up — first reminder sent in 4h
                      </motion.div>
                    )}

                    {/* Footer actions */}
                    <div className="mt-3 flex items-center justify-end gap-3">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                        View context
                        <ArrowRight className="w-3 h-3 -rotate-45" />
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => action.canAutopilot && toggleAutopilot(action.id, action.title)}
                        className="inline-flex items-center gap-1.5 pl-3.5 pr-3 py-1.5 text-xs font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        {action.cta}
                        <ArrowRight className="w-3 h-3 -rotate-45" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
