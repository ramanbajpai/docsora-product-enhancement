import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Search,
  Star,
  Plus,
  Trash2,
  Users,
  FileText,
  Clock,
  Sparkles,
  ArrowUpRight,
  Layers,
  Activity,
  Zap,
  Workflow,
  CheckCircle2,
  Repeat,
  Settings2,
  Rocket,
  TrendingUp,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignTemplate, getTemplateDocuments, useSignTemplates } from "@/hooks/useSignTemplates";
import SignTemplateLaunchModal from "./SignTemplateLaunchModal";
import SignModeSwitcher from "./SignModeSwitcher";

interface SignTemplateGalleryProps {
  onBack: () => void;
  onCreateNew: () => void;
}

const CATEGORIES = [
  "All",
  "Sales",
  "Legal",
  "HR",
  "Client Delivery",
  "Operations",
  "Finance",
  "Creative",
  "Freelancers",
  "Startups",
] as const;
type Category = (typeof CATEGORIES)[number];

interface Blueprint {
  id: string;
  name: string;
  description: string;
  category: Exclude<Category, "All">;
  recipients: number;
  actions: { label: string; icon: any }[];
  estimate: string;
  matchName?: string; // try to launch matching user template by name fragment
}

const POPULAR_BLUEPRINTS: Blueprint[] = [
  {
    id: "bp-client-onboarding",
    name: "Client Onboarding",
    description: "MSA, NDA, and pricing — sent, signed, and filed in one launch.",
    category: "Client Delivery",
    recipients: 2,
    actions: [
      { label: "Signature", icon: FileText },
      { label: "Upload request", icon: Repeat },
      { label: "Approval", icon: CheckCircle2 },
      { label: "Branded delivery", icon: Rocket },
    ],
    estimate: "~4 min setup",
    matchName: "agency client",
  },
  {
    id: "bp-nda",
    name: "NDA Signing",
    description: "Mutual NDA. Parallel signing, auto-reminders, audit-ready trail.",
    category: "Legal",
    recipients: 2,
    actions: [
      { label: "Signature", icon: FileText },
      { label: "Identity check", icon: CheckCircle2 },
      { label: "Filing", icon: Layers },
    ],
    estimate: "~2 min setup",
    matchName: "nda",
  },
  {
    id: "bp-offer",
    name: "Offer Letter Workflow",
    description: "HR drafts, candidate signs, hiring manager countersigns — in order.",
    category: "HR",
    recipients: 3,
    actions: [
      { label: "Approval", icon: CheckCircle2 },
      { label: "Signature", icon: FileText },
      { label: "Counter-sign", icon: Repeat },
      { label: "Onboarding handoff", icon: Rocket },
    ],
    estimate: "~3 min setup",
    matchName: "offer",
  },
  {
    id: "bp-proposal",
    name: "Proposal Approval",
    description: "Send proposal, collect approval, trigger countersign and kickoff.",
    category: "Sales",
    recipients: 2,
    actions: [
      { label: "Approval", icon: CheckCircle2 },
      { label: "Signature", icon: FileText },
      { label: "Kickoff", icon: Rocket },
    ],
    estimate: "~3 min setup",
  },
  {
    id: "bp-freelancer",
    name: "Freelancer Onboarding",
    description: "Engagement letter, NDA and W-9/banking — collected in one flow.",
    category: "Freelancers",
    recipients: 1,
    actions: [
      { label: "Signature", icon: FileText },
      { label: "Upload request", icon: Repeat },
      { label: "Filing", icon: Layers },
    ],
    estimate: "~3 min setup",
  },
  {
    id: "bp-creative-approval",
    name: "Creative Approval",
    description: "Send deliverable, capture sign-off, archive final asset.",
    category: "Creative",
    recipients: 1,
    actions: [
      { label: "Approval", icon: CheckCircle2 },
      { label: "Sign-off", icon: FileText },
      { label: "Delivery", icon: Rocket },
    ],
    estimate: "~2 min setup",
  },
];

export default function SignTemplateGallery({ onBack, onCreateNew }: SignTemplateGalleryProps) {
  const navigate = useNavigate();
  const { templates, toggleFavorite, remove } = useSignTemplates();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [launchTpl, setLaunchTpl] = useState<SignTemplate | null>(null);
  const [launching, setLaunching] = useState<{ name: string } | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return templates.filter((t) => {
      const matchesQ = !q ||
        t.name.toLowerCase().includes(q) ||
        (t.description ?? "").toLowerCase().includes(q);
      const matchesC = category === "All" || (t.category ?? "").toLowerCase() === category.toLowerCase();
      return matchesQ && matchesC;
    });
  }, [templates, query, category]);

  const recent = [...filtered]
    .filter((t) => t.lastUsedAt)
    .sort((a, b) => (b.lastUsedAt ?? 0) - (a.lastUsedAt ?? 0))
    .slice(0, 3);
  const recentIds = new Set(recent.map((t) => t.id));
  const others = filtered.filter((t) => !recentIds.has(t.id));

  // "Magical" launch — short generative animation, then open the real launch modal.
  const launchWithFlourish = (t: SignTemplate) => {
    setLaunching({ name: t.name });
    window.setTimeout(() => {
      setLaunching(null);
      setLaunchTpl(t);
    }, 950);
  };

  const handleBlueprint = (bp: Blueprint) => {
    if (bp.matchName) {
      const m = templates.find((t) => t.name.toLowerCase().includes(bp.matchName!));
      if (m) {
        launchWithFlourish(m);
        return;
      }
    }
    toast.success("Blueprint queued", {
      description: `${bp.name} will appear in your library — configure it once, launch forever.`,
    });
    onCreateNew();
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-6xl mx-auto">
      {/* Top mode switcher */}
      <div className="flex items-center justify-between gap-3 mb-7">
        <SignModeSwitcher value="templates" onChange={(v) => v === "agreements" && onBack()} />
        <Button onClick={onCreateNew} size="sm" className="h-9 px-3.5 gap-1.5 rounded-lg">
          <Plus className="w-3.5 h-3.5" /> New blueprint
        </Button>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-9"
      >
        <div className="absolute -inset-x-6 -top-6 -bottom-2 -z-10 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(700px 220px at 12% 30%, hsl(var(--primary)/0.10), transparent 60%), radial-gradient(500px 180px at 80% 10%, hsl(var(--primary)/0.06), transparent 60%)",
          }}
        />
        <div className="flex items-center gap-1.5 mb-2">
          <Workflow className="w-3 h-3 text-primary" />
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
            Operational blueprints
          </span>
        </div>
        <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight">
          Launch workflows in seconds
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xl">
          Preconfigured recipients, fields and actions. Reuse your most common workflows instantly —
          no rebuilding, no copy-paste, no setup.
        </p>
        <div className="mt-3.5">
          <button
            onClick={() => navigate("/track")}
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-primary/90 hover:text-primary transition-colors group"
          >
            <Activity className="w-3 h-3" />
            View live activity
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>

      {/* Category chips */}
      <div className="mb-5 flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
        {CATEGORIES.map((c) => {
          const active = c === category;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "shrink-0 h-7 px-3 rounded-full text-[12px] font-medium border transition-all",
                active
                  ? "bg-primary/15 border-primary/30 text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
                  : "bg-card/40 border-border/45 text-muted-foreground hover:text-foreground hover:border-border/80"
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="mb-7">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/70" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blueprints"
            className="pl-9 h-9 bg-transparent border-border/40 hover:border-border/70 focus-visible:border-border focus-visible:ring-0 rounded-lg text-[13px] placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      {/* Popular Blueprints */}
      <Section
        title="Popular blueprints"
        icon={<Sparkles className="w-3 h-3 text-primary/80" />}
        meta="Launch-ready"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_BLUEPRINTS.filter(
            (b) => category === "All" || b.category === category
          ).map((b, i) => (
            <BlueprintCard key={b.id} bp={b} index={i} onLaunch={() => handleBlueprint(b)} />
          ))}
        </div>
      </Section>

      {recent.length > 0 && (
        <Section title="Recently launched" icon={<Clock className="w-3 h-3 text-primary/80" />}>
          <Grid>
            {recent.map((t, i) => (
              <TemplateCard
                key={t.id}
                t={t}
                index={i}
                onLaunch={() => launchWithFlourish(t)}
                onFavorite={() => toggleFavorite(t.id)}
                onDelete={() => remove(t.id)}
              />
            ))}
          </Grid>
        </Section>
      )}

      <Section title="Your blueprints" meta={`${filtered.length} total`}>
        {others.length > 0 ? (
          <Grid>
            {others.map((t, i) => (
              <TemplateCard
                key={t.id}
                t={t}
                index={i}
                onLaunch={() => launchWithFlourish(t)}
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
            <p className="text-sm text-foreground/80">No blueprints match your filter</p>
            <p className="text-[12px] text-muted-foreground mt-1">
              Configure one once. Launch it forever.
            </p>
          </button>
        ) : (
          <p className="text-[12px] text-muted-foreground">Nothing else here.</p>
        )}
      </Section>

      {/* How it works */}
      <HowItWorks />

      <SignTemplateLaunchModal
        template={launchTpl}
        open={!!launchTpl}
        onOpenChange={(o) => !o && setLaunchTpl(null)}
      />

      <LaunchFlourish name={launching?.name} />
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
  const useCount = t.useCount ?? 0;
  const completion = Math.min(99, 70 + ((t.name.length * 7) % 28)); // deterministic mock
  const setupMin = Math.max(2, Math.min(6, Math.round(t.fields.length / 2)));
  const actions = useMemo(() => deriveActions(t), [t.id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border border-border/50 bg-gradient-to-b from-card/55 to-card/30 hover:from-card/90 hover:to-card/55 hover:border-primary/35 transition-all duration-300 overflow-hidden hover:shadow-[0_24px_60px_-26px_hsl(var(--primary)/0.45),0_10px_28px_-14px_hsl(var(--foreground)/0.20)]"
    >
      {/* edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.6), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(500px circle at 50% -10%, hsl(var(--primary)/0.10), transparent 50%)",
        }}
      />

      <button onClick={onLaunch} className="block w-full text-left p-4 pb-3.5">
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
              {t.category && (
                <span className="hidden md:inline-flex shrink-0 px-1.5 py-0.5 rounded text-[9.5px] font-medium uppercase tracking-wider bg-muted/40 text-muted-foreground border border-border/40">
                  {t.category}
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

        {/* Workflow stages */}
        <div className="mt-3.5">
          <WorkflowStages roles={t.roles} mode={t.signingMode} />
        </div>

        {/* Included actions */}
        <div className="mt-3 flex flex-wrap gap-1">
          {actions.map((a, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10.5px] font-medium text-foreground/75 bg-muted/35 border border-border/40"
            >
              <a.icon className="w-2.5 h-2.5 text-primary/75" />
              {a.label}
            </span>
          ))}
        </div>

        {/* Operational meta */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-[10.5px]">
          <Metric label="Setup" value={`~${setupMin} min`} icon={Settings2} />
          <Metric label="Completion" value={`${completion}%`} icon={TrendingUp} />
          <Metric
            label={useCount > 0 ? "Launched" : "Status"}
            value={useCount > 0 ? `${useCount}×` : "Ready"}
            icon={Repeat}
          />
        </div>
      </button>

      <div className="relative px-4 pb-3.5 pt-1 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          {t.lastUsedAt ? (
            <>
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(t.lastUsedAt), { addSuffix: true })}
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3 text-primary/70" />
              Never launched
            </>
          )}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLaunch();
          }}
          className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-[12px] font-medium text-primary/90 group-hover:text-primary transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          Launch
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function BlueprintCard({
  bp,
  index,
  onLaunch,
}: {
  bp: Blueprint;
  index: number;
  onLaunch: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-card/40 to-card/20 hover:from-primary/[0.10] hover:border-primary/35 transition-all duration-300 overflow-hidden hover:shadow-[0_24px_60px_-26px_hsl(var(--primary)/0.55),0_10px_28px_-14px_hsl(var(--foreground)/0.22)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)/0.5), transparent)" }}
      />
      <button onClick={onLaunch} className="block w-full text-left p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9.5px] font-semibold uppercase tracking-wider bg-primary/15 text-primary border border-primary/25">
            <Sparkles className="w-2.5 h-2.5" />
            Blueprint
          </span>
          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-medium uppercase tracking-wider bg-muted/40 text-muted-foreground border border-border/40">
            {bp.category}
          </span>
        </div>
        <h3 className="text-[14px] font-semibold tracking-tight">{bp.name}</h3>
        <p className="mt-1 text-[12px] text-muted-foreground line-clamp-2">{bp.description}</p>

        <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3 h-3" /> {bp.recipients} recipient{bp.recipients === 1 ? "" : "s"}
          </span>
          <span className="inline-flex items-center gap-1">
            <Workflow className="w-3 h-3" /> {bp.actions.length} actions
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> {bp.estimate}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {bp.actions.map((a, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10.5px] font-medium text-foreground/75 bg-card/60 border border-border/40"
            >
              <a.icon className="w-2.5 h-2.5 text-primary/80" /> {a.label}
            </span>
          ))}
        </div>
      </button>
      <div className="relative px-4 pb-3.5 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[11px] text-primary/80">
          <Eye className="w-3 h-3" />
          Preview workflow
        </span>
        <button
          onClick={onLaunch}
          className="inline-flex items-center gap-1 h-7 px-2.5 rounded-md text-[12px] font-semibold text-primary hover:text-primary transition-colors"
        >
          <Zap className="w-3.5 h-3.5" /> Launch
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </motion.div>
  );
}

function WorkflowStages({
  roles,
  mode,
}: {
  roles: SignTemplate["roles"];
  mode: SignTemplate["signingMode"];
}) {
  const ordered = [...roles]
    .filter((r) => r.key !== "cc")
    .sort((a, b) => (a.signingOrder ?? 99) - (b.signingOrder ?? 99));
  return (
    <div className="flex items-center gap-1.5">
      {ordered.map((r, i) => (
        <div key={r.key + i} className="flex items-center gap-1.5 min-w-0">
          <div
            className="flex items-center gap-1.5 px-1.5 py-1 rounded-md bg-card/70 border border-border/45"
            title={r.label}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: r.color, boxShadow: `0 0 8px ${r.color}80` }}
            />
            <span className="text-[10.5px] font-medium text-foreground/80 truncate max-w-[80px]">
              {r.label}
            </span>
          </div>
          {i < ordered.length - 1 && (
            <span className="text-[10px] text-muted-foreground/70">
              {mode === "sequential" ? "→" : "∥"}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) {
  return (
    <div className="rounded-md border border-border/40 bg-muted/20 px-2 py-1.5">
      <div className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider text-muted-foreground">
        <Icon className="w-2.5 h-2.5" />
        {label}
      </div>
      <div className="text-[12px] font-semibold text-foreground tabular-nums mt-0.5">{value}</div>
    </div>
  );
}

function deriveActions(t: SignTemplate): { label: string; icon: any }[] {
  const types = new Set(t.fields.map((f) => f.type));
  const out: { label: string; icon: any }[] = [];
  if (types.has("signature")) out.push({ label: "Signature", icon: FileText });
  if (types.has("initials")) out.push({ label: "Initials", icon: CheckCircle2 });
  if (types.has("checkbox")) out.push({ label: "Approval", icon: CheckCircle2 });
  if (t.signingMode === "sequential" && t.roles.filter((r) => r.key !== "cc").length > 1) {
    out.push({ label: "Counter-sign", icon: Repeat });
  }
  if (getTemplateDocuments(t).length > 1) {
    out.push({ label: "Multi-doc package", icon: Layers });
  }
  return out.slice(0, 4);
}

function HowItWorks() {
  const steps = [
    { n: 1, title: "Configure once", desc: "Roles, fields, expiry, reminders.", icon: Settings2 },
    { n: 2, title: "Launch instantly", desc: "One click — recipients receive in seconds.", icon: Rocket },
    { n: 3, title: "Track live progress", desc: "See every view, sign and bottleneck.", icon: Activity },
    { n: 4, title: "Reuse forever", desc: "Refine once, ship every time.", icon: Repeat },
  ];
  return (
    <div className="mt-10 mb-2 rounded-2xl border border-border/45 bg-gradient-to-b from-card/40 to-card/15 p-5 md:p-6">
      <div className="flex items-center gap-1.5 mb-4">
        <Workflow className="w-3 h-3 text-primary" />
        <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
          How blueprints work
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
        {steps.map((s) => (
          <div key={s.n} className="relative">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] font-semibold inline-flex items-center justify-center tabular-nums">
                {s.n}
              </span>
              <s.icon className="w-3.5 h-3.5 text-foreground/70" />
              <span className="text-[13px] font-medium tracking-tight">{s.title}</span>
            </div>
            <p className="text-[12px] text-muted-foreground leading-snug">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaunchFlourish({ name }: { name?: string }) {
  return (
    <AnimatePresence>
      {name && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, y: 6, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-[min(420px,90vw)] rounded-2xl border border-primary/25 bg-card/80 backdrop-blur-xl p-6 shadow-[0_30px_80px_-30px_hsl(var(--primary)/0.6)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)" }}
            />
            <div className="flex items-center gap-2 mb-3">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary"
              />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                Generating workflow
              </span>
            </div>
            <h3 className="text-[15px] font-semibold tracking-tight">{name}</h3>
            <p className="text-[12px] text-muted-foreground mt-1">
              Initializing recipients, fields and routing…
            </p>
            <div className="mt-4 space-y-1.5">
              {["Loading recipients", "Initializing steps", "Preparing workspace"].map((line, i) => (
                <motion.div
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.18 }}
                  className="flex items-center gap-2 text-[12px] text-foreground/80"
                >
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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