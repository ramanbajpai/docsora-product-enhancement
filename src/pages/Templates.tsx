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
  Send,
  Rocket,
  Trash2,
  Pencil,
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
      <div className="p-6 md:p-10 lg:p-12 max-w-5xl mx-auto">
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
              Start a flow
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              One click. Add a client. Work begins.
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flows…"
            className="pl-10 h-11 bg-muted/30 border-border/50 rounded-xl"
          />
        </div>

        {/* Create a new flow — calm, premium CTA */}
        <motion.button
          onClick={openCreate}
          onHoverStart={() => setCreateHover(true)}
          onHoverEnd={() => setCreateHover(false)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative w-full text-left rounded-2xl overflow-hidden mb-12 p-6 flex items-center gap-5 border border-border/60 bg-card/60 hover:bg-card hover:border-border transition-colors"
        >
          {/* subtle radial wash */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.05),transparent_60%)]" />

          <div className="relative w-11 h-11 rounded-xl border border-border/60 bg-background flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 text-foreground/80" strokeWidth={2} />
          </div>

          <div className="relative flex-1 min-w-0">
            <h3 className="text-base font-medium tracking-tight">
              Create a flow
            </h3>
            <p className="text-[13px] text-muted-foreground mt-0.5 leading-relaxed">
              Describe your workflow — Docsora wires up the steps, documents and recipients.
            </p>
          </div>

          <motion.div
            className="relative shrink-0 hidden sm:flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors"
            animate={createHover ? { x: 2 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            Start
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </motion.button>

        {/* Active flows */}
        {runs.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Active flows</h2>
                <p className="text-[12px] text-muted-foreground mt-0.5">Work in motion right now.</p>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">{runs.length} live</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {runs.slice(0, 6).map((r, i) => (
                <ActiveFlowCard key={r.id} run={r} index={i} onOpen={() => navigate(`/flows/${r.id}`)} />
              ))}
            </div>
          </div>
        )}

        {/* Your saved flows — premium AI surface */}
        {filteredMyTemplates.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Flow templates</h2>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {filteredMyTemplates.length} saved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      className="group relative rounded-2xl border border-border/60 bg-card/60 hover:bg-card transition-colors duration-200"
    >
      <button
        onClick={onEdit}
        aria-label={`Edit ${template.name}`}
        className="block w-full text-left p-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-medium tracking-tight text-foreground truncate">
              {template.name}
            </h3>
            <p className="mt-1 text-[13px] text-muted-foreground line-clamp-2">
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
        <div className="mt-5 flex items-center gap-4 text-[12px] text-muted-foreground">
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
      <div className="px-6 pb-5 -mt-1 flex items-center justify-end">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => { e.stopPropagation(); onSend(); }}
          className="h-8 px-3 gap-1.5 text-[13px] text-foreground/80 hover:text-foreground"
        >
          <Rocket className="w-3.5 h-3.5" />
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
  const current = run.steps.find((s) => s.status !== "completed" && s.status !== "pending") ?? run.steps[0];
  const initials = run.clientName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const statusTone =
    run.status === "completed" ? "bg-emerald-400" : run.status === "blocked" ? "bg-destructive" : "bg-primary";
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="group text-left rounded-2xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-border transition-colors px-5 py-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/25 to-primary/5 border border-border/60 flex items-center justify-center text-[11px] font-semibold tracking-tight shrink-0">
          {initials || "—"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[13px] font-medium tracking-tight truncate">
              {run.projectName || `${run.clientName} — ${run.templateName}`}
            </h3>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusTone}`} />
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
            {run.clientName} · {current?.label ?? "Pending"}
          </p>
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
          {formatDistanceToNow(run.startedAt, { addSuffix: true })}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-muted/40 overflow-hidden">
          <div className="h-full bg-primary/70" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[10px] text-muted-foreground tabular-nums shrink-0">
          {completed}/{run.steps.length}
        </span>
      </div>
    </motion.button>
  );
}
