import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronLeft,
  Search,
  Star,
  Plus,
  Trash2,
  Users,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
  Activity,
  ArrowRight,
  Layers,
  Eye,
  LayoutTemplate,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignTemplate, getTemplateDocuments, useSignTemplates } from "@/hooks/useSignTemplates";
import SignTemplateLaunchModal from "./SignTemplateLaunchModal";
import SignModeSwitcher from "./SignModeSwitcher";

interface SignTemplateGalleryProps {
  onBack: () => void;
  onCreateNew: () => void;
}

export default function SignTemplateGallery({ onBack, onCreateNew }: SignTemplateGalleryProps) {
  const { templates, toggleFavorite, remove } = useSignTemplates();
  const [query, setQuery] = useState("");
  const [launchTpl, setLaunchTpl] = useState<SignTemplate | null>(null);
  const [previewEmpty, setPreviewEmpty] = useState(false);

  const sourceTemplates = previewEmpty ? [] : templates;
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return sourceTemplates.filter((t) => {
      return (
        !q ||
        t.name.toLowerCase().includes(q) ||
        (t.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [sourceTemplates, query]);

  const recent = [...filtered]
    .filter((t) => t.lastUsedAt)
    .sort((a, b) => (b.lastUsedAt ?? 0) - (a.lastUsedAt ?? 0))
    .slice(0, 3);
  const recentIds = new Set(recent.map((t) => t.id));
  const others = filtered.filter((t) => !recentIds.has(t.id));

  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      {/* Top mode switcher */}
      <div className="flex items-center justify-between gap-3 mb-7">
        <SignModeSwitcher value="templates" onChange={(v) => v === "agreements" && onBack()} />
        <Button onClick={onCreateNew} size="sm" className="h-9 px-3.5 gap-1.5 rounded-lg">
          <Plus className="w-3.5 h-3.5" /> New template
        </Button>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Launch workflows in seconds
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
          Configured once. Send forever. Just add a name and email.
        </p>

        <div className="mt-4 flex items-center gap-4">
          <Link
            to="/track"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Activity className="w-3.5 h-3.5" />
            View live activity
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={() => setPreviewEmpty((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            {previewEmpty ? "Show my templates" : "Preview empty state"}
          </button>
        </div>
      </motion.div>

      {previewEmpty ? (
        <EmptyState onCreateNew={onCreateNew} />
      ) : (
        <>
      {/* Search — secondary */}
      <div className="mb-7">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/70" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates"
            className="pl-9 h-9 bg-transparent border-border/40 hover:border-border/70 focus-visible:border-border focus-visible:ring-0 rounded-lg text-[13px] placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {recent.length > 0 && (
        <Section title="Recent" icon={<Clock className="w-3 h-3 text-primary/80" />}>
          <Grid>
            {recent.map((t, i) => (
              <TemplateCard
                key={t.id}
                t={t}
                index={i}
                onLaunch={() => setLaunchTpl(t)}
                onFavorite={() => toggleFavorite(t.id)}
                onDelete={() => remove(t.id)}
              />
            ))}
          </Grid>
        </Section>
      )}

      <Section
        title="All templates"
        meta={`${filtered.length} total`}
      >
        {others.length > 0 ? (
          <Grid>
            {others.map((t, i) => (
              <TemplateCard
                key={t.id}
                t={t}
                index={i}
                onLaunch={() => setLaunchTpl(t)}
                onFavorite={() => toggleFavorite(t.id)}
                onDelete={() => remove(t.id)}
              />
            ))}
          </Grid>
        ) : recent.length === 0 ? (
          <button
            onClick={onCreateNew}
            className="w-full rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/60 transition-colors px-6 py-14 text-center"
          >
            <p className="text-sm text-foreground/80">No templates match your search</p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Save one once. Send it forever.
            </p>
          </button>
        ) : (
          <p className="text-[12px] text-muted-foreground">Nothing else here.</p>
        )}
      </Section>

      <SignTemplateLaunchModal
        template={launchTpl}
        open={!!launchTpl}
        onOpenChange={(o) => !o && setLaunchTpl(null)}
      />
        </>
      )}
    </div>
  );
}

/* ──────────────────────────── pieces ──────────────────────────── */

function Section({
  title,
  icon,
  meta,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          {icon}
          <h2 className="text-[13px] font-semibold tracking-tight text-foreground/85">{title}</h2>
        </div>
        {meta && <span className="text-[11px] text-muted-foreground tabular-nums">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>;
}

function TemplateCard({
  t,
  index,
  onLaunch,
  onFavorite,
  onDelete,
}: {
  t: SignTemplate;
  index: number;
  onLaunch: () => void;
  onFavorite: () => void;
  onDelete: () => void;
}) {
  const signerCount = t.roles.filter((r) => r.key !== "cc").length;
  const docs = getTemplateDocuments(t);
  const isPackage = docs.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -2 }}
      className="group relative rounded-2xl border border-border/50 bg-card/40 hover:bg-card/80 hover:border-primary/30 transition-all duration-300 overflow-hidden hover:shadow-[0_18px_50px_-22px_hsl(var(--primary)/0.35),0_8px_24px_-12px_hsl(var(--foreground)/0.18)]"
    >
      {/* hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx,50%) var(--my,0%), hsl(var(--primary)/0.10), transparent 40%)",
        }}
      />
      <button onClick={onLaunch} className="block w-full text-left p-4">
        {/* Row 1: title + actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <h3 className="text-[14px] font-medium tracking-tight truncate group-hover:text-foreground transition-colors">
                {t.name}
              </h3>
              {isPackage && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-semibold uppercase tracking-wider bg-primary/10 text-primary shrink-0">
                  <Layers className="w-2.5 h-2.5" />
                  Package
                </span>
              )}
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">
              {t.description || t.documentName}
            </p>
          </div>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity -mr-1.5 -mt-1.5">
            <IconBtn
              label={t.favorite ? "Unfavorite" : "Favorite"}
              onClick={(e) => {
                e.stopPropagation();
                onFavorite();
              }}
            >
              <Star className={`w-3.5 h-3.5 ${t.favorite ? "fill-amber-400 text-amber-400" : ""}`} />
            </IconBtn>
            <IconBtn
              label="Delete"
              destructive
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </IconBtn>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3 h-3" /> {signerCount} signer{signerCount === 1 ? "" : "s"}
          </span>
          <span className="inline-flex items-center gap-1">
            <FileText className="w-3 h-3" />
            {isPackage ? `${docs.length} docs` : `${t.fields.length} fields`}
          </span>
          {t.lastUsedAt && (
            <span className="inline-flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(t.lastUsedAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </button>

      <div className="relative px-4 pb-3 -mt-1 flex items-center justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLaunch();
          }}
          className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-[12px] font-medium text-foreground/70 group-hover:text-primary transition-colors"
        >
          Use template
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  destructive,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  label: string;
  destructive?: boolean;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={`p-1.5 rounded-md text-muted-foreground hover:bg-muted/60 transition ${
        destructive ? "hover:text-destructive" : "hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

/* ──────────────────────────── empty state ──────────────────────────── */

function EmptyState({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl px-8 md:px-12 py-14 md:py-16 text-center shadow-[0_30px_80px_-40px_hsl(var(--primary)/0.45)]">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
        </div>

        <div className="mx-auto mb-5 inline-flex items-center justify-center h-14 w-14 rounded-2xl border border-border/60 bg-background/60 backdrop-blur-xl shadow-inner">
          <LayoutTemplate className="w-6 h-6 text-primary" />
        </div>

        <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight">
          Save a workflow once. Send it forever.
        </h2>
        <p className="mt-2 text-[13px] md:text-sm text-muted-foreground max-w-md mx-auto">
          Templates turn your repeat agreements into one-click sends. Configure roles, fields, and delivery — then launch in seconds.
        </p>

        <div className="mt-8 flex items-center justify-center">
          <motion.button
            onClick={onCreateNew}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
            className="group relative inline-flex items-center gap-2 h-12 px-7 rounded-2xl text-sm font-medium text-primary-foreground bg-gradient-to-b from-primary to-primary/85 shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.6),inset_0_1px_0_0_hsl(0_0%_100%/0.25)] ring-1 ring-primary/40 hover:shadow-[0_18px_40px_-10px_hsl(var(--primary)/0.7),inset_0_1px_0_0_hsl(0_0%_100%/0.3)] transition-shadow overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Plus className="w-4 h-4" />
            <span>Create your first template</span>
            <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground/80">
          Takes about 2 minutes. Reuse forever.
        </p>
      </div>
    </motion.div>
  );
}