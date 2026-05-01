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
