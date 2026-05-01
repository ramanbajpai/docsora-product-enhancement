import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { templates, WorkflowTemplate } from "@/data/templates";
import { QuickStartFlowModal } from "@/components/templates/QuickStartFlowModal";
import { SendTemplateModal } from "@/components/templates/SendTemplateModal";
import { useCustomTemplates, CustomTemplate } from "@/hooks/useCustomTemplates";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FlowGlyph } from "@/components/icons/FlowGlyph";
import {
  Search,
  Sparkles,
  Plus,
  ArrowRight,
  Send,
  Trash2,
  Zap,
  CheckCircle2,
  Pencil,
  Users,
  FileText,
} from "lucide-react";

// Outcome-based names + short descriptions, mapped from existing template ids.
const FLOW_META: Record<
  string,
  { actionName: string; outcome: string; usedBy?: string }
> = {
  "client-project-standard": {
    actionName: "Run a Client Project",
    outcome: "Move from contract to approval without follow-ups.",
    usedBy: "Used by 240+ teams",
  },
  "freelance-quick": {
    actionName: "Start a Freelance Project",
    outcome: "Quote, sign and deliver — in one motion.",
    usedBy: "Used by 180+ freelancers",
  },
  "nda-fast": {
    actionName: "Send an NDA",
    outcome: "One signer. Countersigned and stored automatically.",
  },
  "sales-proposal": {
    actionName: "Close a Sales Deal",
    outcome: "Proposal to invoice with zero back-and-forth.",
  },
  "onboarding-hr": {
    actionName: "Onboard a New Hire",
    outcome: "Offer, contract and policies — signed in one go.",
  },
};

// One curated example flow leads the hero. Saved flows live below.
const PRIMARY_IDS = ["client-project-standard"];

export default function Templates() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [quickOpen, setQuickOpen] = useState(false);
  const [activeFlow, setActiveFlow] = useState<WorkflowTemplate | null>(null);

  const { templates: myTemplates, remove } = useCustomTemplates();
  const [sendOpen, setSendOpen] = useState(false);
  const [sendTpl, setSendTpl] = useState<CustomTemplate | null>(null);

  const allFlows = useMemo(() => {
    const q = query.toLowerCase().trim();
    return templates.filter((t) => {
      if (!q) return true;
      const meta = FLOW_META[t.id];
      return (
        t.name.toLowerCase().includes(q) ||
        meta?.actionName.toLowerCase().includes(q) ||
        meta?.outcome.toLowerCase().includes(q)
      );
    });
  }, [query]);

  const primary = useMemo(
    () => allFlows.filter((f) => PRIMARY_IDS.includes(f.id)),
    [allFlows],
  );

  const startFlow = (t: WorkflowTemplate) => {
    setActiveFlow(t);
    setQuickOpen(true);
  };

  const openSend = (t: CustomTemplate) => {
    setSendTpl(t);
    setSendOpen(true);
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
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="shrink-0 text-muted-foreground hover:text-foreground gap-1.5"
          >
            <Link to="/templates/new">
              <Plus className="w-3.5 h-3.5" />
              New flow
            </Link>
          </Button>
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

        {/* Primary flow — single, spacious example */}
        {primary.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mb-12">
            {primary.map((t, i) => {
              const meta = FLOW_META[t.id];
              return (
                <motion.button
                  key={t.id}
                  onClick={() => startFlow(t)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="group relative text-left rounded-2xl border border-border/60 bg-card hover:border-primary/50 hover:shadow-xl transition-all p-7 flex flex-col min-h-[220px] overflow-hidden"
                >
                  {/* Subtle gradient on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/[0.04] via-transparent to-transparent" />

                  <div className="relative flex items-start justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl">
                      {t.icon}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] font-medium text-primary/90 bg-primary/10 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Ready to send
                    </span>
                  </div>

                  <div className="relative flex-1">
                    <h3 className="text-base font-semibold tracking-tight">
                      {meta?.actionName ?? t.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {meta?.outcome ?? t.tagline}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground/80">
                      {meta?.usedBy ?? (t.popular ? "Popular" : "")}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                      <Zap className="w-3.5 h-3.5" />
                      Start
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}

        {/* Your saved flows — premium AI surface */}
        {myTemplates.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary/90">
                    Your library
                  </span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight">Your flows</h2>
              </div>
              <span className="text-[11px] text-muted-foreground tabular-nums">
                {myTemplates.length} saved
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myTemplates.map((t, i) => (
                <SavedFlowCard
                  key={t.id}
                  template={t}
                  index={i}
                  onSend={() => openSend(t)}
                  onEdit={() => navigate(`/templates/new?edit=${t.id}`)}
                  onDelete={() => remove(t.id)}
                />
              ))}
            </div>
          </div>
        )}

        {allFlows.length === 0 && (
          <div className="rounded-2xl border border-border/50 bg-muted/10 px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">No flows match your search.</p>
          </div>
        )}
      </div>

      <QuickStartFlowModal
        open={quickOpen}
        onOpenChange={setQuickOpen}
        flow={activeFlow}
      />
      <SendTemplateModal
        open={sendOpen}
        onOpenChange={setSendOpen}
        template={sendTpl}
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
  const [hovered, setHovered] = useState(false);
  const assignableRoles = template.roles.filter((r) => r.key !== "sender");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Base surface — works in both themes. Light: subtle gradient + ring. Dark: lifted card. */}
      <div className="absolute inset-0 rounded-2xl bg-card border border-border/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] group-hover:border-primary/40 group-hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_40px_-16px_hsl(var(--primary)/0.25)] transition-all duration-500 dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-muted/20" />

      {/* Mesh accent — soft, monochromatic in light, blue-tinted in dark */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute -top-20 -left-12 w-56 h-56 rounded-full bg-primary/[0.06] dark:bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-20 -right-12 w-56 h-56 rounded-full bg-primary/[0.04] dark:bg-primary/10 blur-3xl" />
      </div>

      {/* Top hairline sheen */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          {/* Animated flow glyph */}
          <div className="relative shrink-0">
            <motion.div
              className="absolute inset-0 rounded-xl bg-primary/25 blur-xl"
              initial={{ opacity: 0.25 }}
              animate={{ opacity: hovered ? 0.7 : 0.25 }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/25 flex items-center justify-center backdrop-blur-sm">
              <FlowGlyph className="w-7 h-7" active={hovered} />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold tracking-tight truncate leading-snug">
              {template.name}
            </h3>
            <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 truncate">
                <FileText className="w-3 h-3 shrink-0" />
                <span className="truncate">{template.documentName}</span>
              </span>
              <span className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1 text-primary/80 shrink-0">
                <Zap className="w-3 h-3" />
                {template.fields.length} field{template.fields.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>

          {/* Quick actions — visible on hover, top-right */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition"
              aria-label={`Edit ${template.name}`}
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-accent transition"
              aria-label={`Delete ${template.name}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Role pills + send */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <Users className="w-3 h-3 text-muted-foreground shrink-0" />
            <div className="flex items-center gap-1 overflow-hidden">
              {assignableRoles.slice(0, 3).map((r, idx) => (
                <motion.span
                  key={r.key}
                  initial={false}
                  animate={hovered ? { y: -1 } : { y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-border/60 bg-muted/40 dark:bg-background/60 backdrop-blur-sm"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: r.color }}
                  />
                  {r.label}
                </motion.span>
              ))}
              {assignableRoles.length > 3 && (
                <span className="text-[10px] text-muted-foreground tabular-nums">
                  +{assignableRoles.length - 3}
                </span>
              )}
              {assignableRoles.length === 0 && (
                <span className="text-[11px] text-muted-foreground italic">
                  No roles assigned
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            onClick={onSend}
            className="relative overflow-hidden gap-1.5 h-9 shrink-0 shadow-[0_4px_20px_-6px_hsl(var(--primary)/0.45)] hover:shadow-[0_8px_28px_-6px_hsl(var(--primary)/0.65)] transition-shadow"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1100ms] ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <motion.span
              className="relative inline-flex"
              animate={hovered ? { x: 2, y: -1, rotate: -8 } : { x: 0, y: 0, rotate: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <Send className="w-3.5 h-3.5" />
            </motion.span>
            <span className="relative">Send</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
