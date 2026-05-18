import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronLeft,
  Search,
  Star,
  Rocket,
  Plus,
  Trash2,
  Users,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignTemplate, useSignTemplates } from "@/hooks/useSignTemplates";
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

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return templates.filter((t) => {
      return (
        !q ||
        t.name.toLowerCase().includes(q) ||
        (t.description ?? "").toLowerCase().includes(q)
      );
    });
  }, [templates, query]);

  const favorites = filtered.filter((t) => t.favorite);
  const others = filtered.filter((t) => !t.favorite);

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
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
            Reusable templates
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Launch in seconds</h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
          Configured once. Send forever. Just add a name and email.
        </p>
      </motion.div>

      {/* Recently launched strip */}
      {recent.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
              Recently launched
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
            {recent.map((t) => (
              <button
                key={t.id}
                onClick={() => setLaunchTpl(t)}
                className="group min-w-[220px] flex-shrink-0 text-left rounded-xl border border-border/50 bg-card/40 hover:bg-card/70 hover:border-border transition-colors px-3.5 py-3"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">
                    {formatDistanceToNow(new Date(t.lastUsedAt!), { addSuffix: true })}
                  </span>
                </div>
                <div className="mt-1 text-[13px] font-medium truncate">{t.name}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  Used {t.useCount ?? 0}×
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates…"
            className="pl-10 h-10 bg-muted/30 border-border/50 rounded-xl"
          />
        </div>
      </div>

      {favorites.length > 0 && (
        <Section title="Favorites" icon={<Star className="w-3 h-3 text-amber-400" />}>
          <Grid>
            {favorites.map((t, i) => (
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
        ) : favorites.length === 0 ? (
          <button
            onClick={onCreateNew}
            className="w-full rounded-2xl border border-dashed border-border/60 bg-card/30 hover:bg-card/60 transition-colors px-6 py-14 text-center"
          >
            <p className="text-sm text-foreground/80">No templates match your search</p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Create one to skip repetitive setup forever.
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="group relative rounded-2xl border border-border/55 bg-card/50 hover:bg-card/85 hover:border-border transition-all duration-200 overflow-hidden"
    >
      <button onClick={onLaunch} className="block w-full text-left p-4">
        {/* Row 1: title + actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-medium tracking-tight truncate">{t.name}</h3>
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
            <FileText className="w-3 h-3" /> {t.fields.length} fields
          </span>
          {t.lastUsedAt && (
            <span className="inline-flex items-center gap-1 ml-auto">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(t.lastUsedAt), { addSuffix: true })}
            </span>
          )}
        </div>
      </button>

      <div className="px-4 pb-3 -mt-1 flex items-center justify-end">
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onLaunch();
          }}
          className="h-7 px-2.5 gap-1.5 text-[12px] text-foreground/80 hover:text-foreground"
        >
          <Rocket className="w-3 h-3" /> Launch
        </Button>
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