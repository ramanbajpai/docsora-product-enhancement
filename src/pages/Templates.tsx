import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { AppLayout } from "@/components/layout/AppLayout";
import { LaunchFlowModal } from "@/components/templates/LaunchFlowModal";
import { NewFlowModal } from "@/components/templates/NewFlowModal";
import { useCustomTemplates, CustomTemplate } from "@/hooks/useCustomTemplates";
import { useFlowRuns, FlowRun } from "@/hooks/useFlowRuns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Sparkles,
  Plus,
  ArrowRight,
  Rocket,
  Trash2,
  Pencil,
  PenLine,
  CreditCard,
  AlertTriangle,
  Upload,
  Clock,
  Bell,
  MoreHorizontal,
} from "lucide-react";

export default function Templates() {
  const [query, setQuery] = useState("");

  const { templates: myTemplates, remove } = useCustomTemplates();
  const { runs } = useFlowRuns();
  const navigate = useNavigate();
  const [launchOpen, setLaunchOpen] = useState(false);
  const [launchTpl, setLaunchTpl] = useState<CustomTemplate | null>(null);
  const [newFlowOpen, setNewFlowOpen] = useState(false);
  const [editTpl, setEditTpl] = useState<CustomTemplate | null>(null);
  const [createHover, setCreateHover] = useState(false);

  const filteredMyTemplates = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return myTemplates;
    return myTemplates.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.documentName.toLowerCase().includes(q),
    );
  }, [query, myTemplates]);

  const openLaunch = (t: CustomTemplate) => {
    setLaunchTpl(t);
    setLaunchOpen(true);
  };

  const openEdit = (t: CustomTemplate) => {
    setEditTpl(t);
    setNewFlowOpen(true);
  };

  const openCreate = () => {
    setEditTpl(null);
    setNewFlowOpen(true);
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-10 lg:p-12 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                Flows
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Flows
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Work moving right now.
            </p>
          </div>
          <Button
            onClick={openCreate}
            size="sm"
            className="h-9 px-3.5 gap-1.5 rounded-lg shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            New flow
          </Button>
        </motion.div>

        {/* Priority strip — operational summary */}
        <PriorityStrip runs={runs} />

        {/* Active flows */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Active flows</h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {runs.length > 0 ? "Live execution across your clients." : "Nothing in motion yet."}
              </p>
            </div>
            {runs.length > 0 && (
              <span className="text-[11px] text-muted-foreground tabular-nums">{runs.length} live</span>
            )}
          </div>
          {runs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {runs.map((r, i) => (
                <ActiveFlowCard
                  key={r.id}
                  run={r}
                  index={i}
                  onOpen={() => navigate(`/flows/${r.id}`)}
                />
              ))}
            </div>
          ) : (
            <button
              onClick={openCreate}
              className="w-full rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/60 transition-colors px-6 py-12 text-center"
            >
              <p className="text-sm text-foreground/80">Launch a flow to see live work here</p>
              <p className="text-[12px] text-muted-foreground mt-1">
                Active executions, blocked steps and client activity will surface in this section.
              </p>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="pl-10 h-10 bg-muted/30 border-border/50 rounded-xl"
          />
        </div>

        {/* Your saved flows — premium AI surface */}
        {filteredMyTemplates.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-[15px] font-medium tracking-tight text-foreground/80">Templates</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">Reusable blueprints. Launch in one click.</p>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {filteredMyTemplates.length} saved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredMyTemplates.map((t, i) => (
                <SavedFlowCard
                  key={t.id}
                  template={t}
                  index={i}
                  onSend={() => openLaunch(t)}
                  onEdit={() => openEdit(t)}
                  onDelete={() => remove(t.id)}
                />
              ))}
            </div>
          </div>
        )}

        {myTemplates.length > 0 && filteredMyTemplates.length === 0 && (
          <div className="rounded-2xl border border-border/50 bg-muted/10 px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">No flows match your search.</p>
          </div>
        )}
      </div>

      <LaunchFlowModal
        open={launchOpen}
        onOpenChange={setLaunchOpen}
        template={launchTpl}
      />
      <NewFlowModal
        open={newFlowOpen}
        onOpenChange={(o) => {
          setNewFlowOpen(o);
          if (!o) setEditTpl(null);
        }}
        editTemplate={editTpl}
      />
    </AppLayout>
  );
}

/* ──────────────────────────── Priority strip ──────────────────────────── */

function PriorityStrip({ runs }: { runs: FlowRun[] }) {
  const stats = useMemo(() => {
    let waitingSig = 0;
    let paymentDue = 0;
    let blocked = 0;
    let deliverables = 0;
    let expiring = 0;
    const now = Date.now();
    for (const r of runs) {
      const current = r.steps.find((s) => s.status !== "completed");
      if (!current) continue;
      if (current.type === "send_contract" && current.status === "waiting_client") waitingSig += 1;
      if (current.type === "request_payment" && current.status === "waiting_client") paymentDue += 1;
      if (r.status === "blocked" || current.status === "blocked") blocked += 1;
      if (current.type === "deliver_files" || current.type === "deliver_onboarding") deliverables += 1;
      if (current.status === "expired" || now - r.startedAt > 1000 * 60 * 60 * 24 * 14) expiring += 1;
    }
    return { waitingSig, paymentDue, blocked, deliverables, expiring };
  }, [runs]);

  const items: Array<{
    key: string;
    label: string;
    count: number;
    tone: "primary" | "amber" | "rose";
    Icon: typeof PenLine;
    action: string;
  }> = [
    { key: "sig", label: "Waiting on signature", count: stats.waitingSig, tone: "amber", Icon: PenLine, action: "Remind" },
    { key: "pay", label: "Payment due", count: stats.paymentDue, tone: "primary", Icon: CreditCard, action: "Nudge" },
    { key: "blk", label: "Blocked", count: stats.blocked, tone: "rose", Icon: AlertTriangle, action: "Resolve" },
    { key: "del", label: "Deliverables pending", count: stats.deliverables, tone: "primary", Icon: Upload, action: "Upload" },
    { key: "exp", label: "Expiring soon", count: stats.expiring, tone: "amber", Icon: Clock, action: "Review" },
  ];

  return (
    <div className="-mx-1 mb-10">
      <div className="flex gap-2.5 overflow-x-auto px-1 pb-2 scrollbar-thin">
        {items.map((it, i) => (
          <PriorityCard key={it.key} {...it} index={i} />
        ))}
      </div>
    </div>
  );
}

function PriorityCard({
  label,
  count,
  tone,
  Icon,
  action,
  index,
}: {
  label: string;
  count: number;
  tone: "primary" | "amber" | "rose";
  Icon: typeof PenLine;
  action: string;
  index: number;
}) {
  const toneMap = {
    primary: { dot: "bg-primary", glow: "bg-primary/10", text: "text-primary" },
    amber: { dot: "bg-amber-400", glow: "bg-amber-400/10", text: "text-amber-500" },
    rose: { dot: "bg-rose-400", glow: "bg-rose-400/10", text: "text-rose-500" },
  }[tone];

  const empty = count === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="relative min-w-[200px] flex-shrink-0 rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-colors px-4 py-3.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${toneMap.glow}`}>
          <Icon className={`w-3.5 h-3.5 ${toneMap.text}`} />
        </div>
        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${empty ? "bg-muted-foreground/30" : toneMap.dot}`} />
      </div>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight tabular-nums">{count}</span>
        <span className="text-[11px] text-muted-foreground truncate">{label}</span>
      </div>
      <button
        disabled={empty}
        className="mt-2 text-[11px] font-medium text-foreground/70 hover:text-foreground disabled:text-muted-foreground/50 disabled:cursor-default transition-colors inline-flex items-center gap-1"
      >
        {empty ? "All clear" : action}
        {!empty && <ArrowRight className="w-3 h-3" />}
      </button>
    </motion.div>
  );
}

/* ──────────────────────────── Saved flow card ──────────────────────────── */

interface SavedFlowCardProps {
  template: CustomTemplate;
  index: number;
  onSend: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function SavedFlowCard({ template, index, onSend, onEdit, onDelete }: SavedFlowCardProps) {
  const assignableRoles = template.roles.filter((r) => r.key !== "sender");
  const fieldCount = (template.flowSteps ?? []).reduce(
    (n, s) => n + (s.placedFields?.length ?? 0),
    template.fields.length,
  );
  const stepCount = template.flowSteps?.length ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative rounded-xl border border-border/50 bg-card/40 hover:bg-card/80 hover:border-border transition-colors duration-200"
    >
      <button
        onClick={onEdit}
        aria-label={`Edit ${template.name}`}
        className="block w-full text-left p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-medium tracking-tight text-foreground truncate">
              {template.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-muted-foreground line-clamp-2">
              {template.description?.trim() || template.documentName}
            </p>
          </div>
          {/* Hover-only quick actions */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity -mr-1.5 -mt-1.5">
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onEdit(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onEdit(); } }}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition"
              aria-label="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); onDelete(); } }}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-muted/60 transition"
              aria-label="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          {stepCount > 0 && (
            <span className="tabular-nums">{stepCount} step{stepCount === 1 ? "" : "s"}</span>
          )}
          <span className="tabular-nums">{fieldCount} field{fieldCount === 1 ? "" : "s"}</span>
          {assignableRoles.length > 0 && (
            <div className="flex items-center gap-1.5">
              {assignableRoles.slice(0, 4).map((r) => (
                <span
                  key={r.key}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: r.color }}
                  title={r.label}
                />
              ))}
            </div>
          )}
        </div>
      </button>

      {/* Footer action */}
      <div className="px-4 pb-3 -mt-1 flex items-center justify-end">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => { e.stopPropagation(); onSend(); }}
          className="h-7 px-2.5 gap-1.5 text-[12px] text-foreground/80 hover:text-foreground"
        >
          <Rocket className="w-3 h-3" />
          Launch
        </Button>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────── Active flow card ──────────────────────────── */

function ActiveFlowCard({ run, index, onOpen }: { run: FlowRun; index: number; onOpen: () => void }) {
  const completed = run.steps.filter((s) => s.status === "completed").length;
  const progress = Math.round((completed / run.steps.length) * 100);
  const current =
    run.steps.find((s) => s.status !== "completed" && s.status !== "pending") ??
    run.steps.find((s) => s.status !== "completed") ??
    run.steps[run.steps.length - 1];
  const lastActivity = run.activity[run.activity.length - 1];
  const initials = run.clientName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { pillLabel, pillClass, dotClass } = (() => {
    if (run.status === "completed")
      return { pillLabel: "Completed", pillClass: "bg-emerald-400/10 text-emerald-500 border-emerald-400/20", dotClass: "bg-emerald-400" };
    if (run.status === "blocked" || current?.status === "blocked")
      return { pillLabel: "Blocked", pillClass: "bg-rose-400/10 text-rose-500 border-rose-400/20", dotClass: "bg-rose-400" };
    if (current?.status === "waiting_client")
      return { pillLabel: "Waiting on client", pillClass: "bg-amber-400/10 text-amber-600 border-amber-400/20", dotClass: "bg-amber-400" };
    if (current?.status === "expired")
      return { pillLabel: "Expired", pillClass: "bg-muted-foreground/10 text-muted-foreground border-border", dotClass: "bg-muted-foreground/50" };
    return { pillLabel: "In progress", pillClass: "bg-primary/10 text-primary border-primary/20", dotClass: "bg-primary" };
  })();

  const quickActionLabel =
    current?.type === "send_contract"
      ? "Remind"
      : current?.type === "request_payment"
        ? "Nudge"
        : current?.type === "deliver_files" || current?.type === "deliver_onboarding"
          ? "Upload"
          : "Advance";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-border transition-all duration-200 overflow-hidden"
    >
      <button onClick={onOpen} className="block w-full text-left px-5 pt-4 pb-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/25 to-primary/5 border border-border/60 flex items-center justify-center text-[11px] font-semibold tracking-tight shrink-0">
            {initials || "—"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[14px] font-medium tracking-tight truncate">
                {run.projectName || `${run.clientName} — ${run.templateName}`}
              </h3>
              <span
                className={`shrink-0 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-medium ${pillClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
                {pillLabel}
              </span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
              {run.clientName} · {current?.label ?? "Pending"}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3.5 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-muted/40 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full"
            />
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums shrink-0">
            {completed}/{run.steps.length}
          </span>
        </div>
      </button>

      {/* Footer row */}
      <div className="px-5 pb-3.5 pt-1 flex items-center justify-between gap-3 border-t border-border/40 mt-1">
        <span className="text-[11px] text-muted-foreground truncate">
          {lastActivity ? `Updated ${formatDistanceToNow(lastActivity.at, { addSuffix: true })}` : "Just launched"}
        </span>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); }}
            className="h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground gap-1"
          >
            <Bell className="w-3 h-3" />
            {quickActionLabel}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={onOpen}
            className="h-7 px-2 text-[11px] text-foreground/80 hover:text-foreground gap-1"
          >
            Open
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
