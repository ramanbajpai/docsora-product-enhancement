import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { templates, WorkflowTemplate } from "@/data/templates";
import { StartProjectModal } from "@/components/templates/StartProjectModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Sparkles,
  FileText,
  Users,
  Workflow,
  Zap,
  Plus,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["All", "Client Project", "Sales", "Legal", "HR", "Operations"] as const;

export default function Templates() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<(typeof categories)[number]>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [initialId, setInitialId] = useState<string | undefined>();

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return templates.filter((t) => {
      const matchCat = activeCat === "All" || t.category === activeCat;
      const matchQ =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, activeCat]);

  const launch = (t?: WorkflowTemplate) => {
    setInitialId(t?.id);
    setModalOpen(true);
  };

  return (
    <AppLayout>
      <div className="p-6 md:p-8 lg:p-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                Templates
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Workflow blueprints
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
              Reusable structures — documents, roles and steps already wired. Launch a fully
              structured client project in under 10 seconds.
            </p>
          </div>
          <Button onClick={() => launch()} className="gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            Start project
          </Button>
        </motion.div>

        {/* Search + categories */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
              className="pl-9 h-10 bg-muted/40 border-border/50"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                  activeCat === c
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border/50 bg-muted/10 px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">No templates match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <motion.button
                key={t.id}
                onClick={() => launch(t)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="group text-left rounded-2xl border border-border/50 bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all p-5 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-muted/60 flex items-center justify-center text-xl">
                    {t.icon}
                  </div>
                  {t.popular && (
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold tracking-tight">{t.name}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 mt-0.5">
                    {t.category}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {t.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {t.documents.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {t.roles.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <Workflow className="w-3 h-3" />
                      {t.flow.length}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-primary/80 font-medium">
                    <Zap className="w-3 h-3" />
                    {t.estimatedTime}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-end text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Use template
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <StartProjectModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        initialTemplateId={initialId}
      />
    </AppLayout>
  );
}
