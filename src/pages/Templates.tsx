import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { SendTemplateModal } from "@/components/templates/SendTemplateModal";
import { NewFlowModal } from "@/components/templates/NewFlowModal";
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
  Pencil,
  Users,
  FileText,
} from "lucide-react";

export default function Templates() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { templates: myTemplates, remove } = useCustomTemplates();
  const [sendOpen, setSendOpen] = useState(false);
  const [sendTpl, setSendTpl] = useState<CustomTemplate | null>(null);
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

  const openSend = (t: CustomTemplate) => {
    setSendTpl(t);
    setSendOpen(true);
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

        {/* Create a new flow — modern animated CTA */}
        <motion.button
          onClick={openCreate}
          onHoverStart={() => setCreateHover(true)}
          onHoverEnd={() => setCreateHover(false)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.995 }}
          className="group relative w-full text-left rounded-2xl overflow-hidden mb-12 min-h-[180px] p-7 flex items-center gap-6 border border-border/60 bg-gradient-to-br from-card via-card to-muted/30 hover:border-primary/50 transition-all duration-500 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_24px_60px_-20px_hsl(var(--primary)/0.35)]"
        >
          {/* Aurora mesh */}
          <div className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <motion.div
              className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-primary/15 blur-3xl"
              animate={createHover ? { x: [0, 30, 0], y: [0, 20, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
              animate={createHover ? { x: [0, -30, 0], y: [0, -20, 0] } : { x: 0, y: 0 }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Top hairline sheen */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Animated orb / plus */}
          <div className="relative shrink-0">
            <motion.div
              className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl"
              animate={{ opacity: createHover ? [0.4, 0.8, 0.4] : 0.3, scale: createHover ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/30 backdrop-blur-sm flex items-center justify-center shadow-[inset_0_1px_0_hsl(var(--primary)/0.25),inset_0_-10px_22px_-10px_hsl(var(--primary)/0.4)] overflow-hidden">
              {/* Orbiting dots */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/70" />
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary/40" />
              </motion.div>
              <motion.div
                animate={createHover ? { rotate: 90, scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <Plus className="w-7 h-7 text-primary" strokeWidth={2.25} />
              </motion.div>
            </div>
          </div>

          {/* Copy */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-primary/90">
                New flow
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              Create a project
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-md">
              Describe your workflow in your own words — we'll wire up the steps, documents and roles in seconds.
            </p>
          </div>

          {/* CTA chevron */}
          <motion.div
            className="relative shrink-0 hidden sm:flex items-center gap-1.5 text-xs font-medium text-primary"
            animate={createHover ? { x: 4 } : { x: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            Start
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </motion.button>

        {/* Your saved flows — premium AI surface */}
        {filteredMyTemplates.length > 0 && (
          <div className="mb-10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Your flows</h2>
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
                  onSend={() => openSend(t)}
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

      <SendTemplateModal
        open={sendOpen}
        onOpenChange={setSendOpen}
        template={sendTpl}
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
            <p className="mt-1 text-[13px] text-muted-foreground truncate">
              {template.documentName}
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
          <Send className="w-3.5 h-3.5" />
          Send
        </Button>
      </div>
    </motion.div>
  );
}
