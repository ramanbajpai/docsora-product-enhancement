import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Plus,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  XCircle,
  ArrowUpRight,
  Bell,
  MoreHorizontal,
  Activity,
  Rocket,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { mockSignItems } from "@/components/track/sign/mockSignData";
import { SignItem } from "@/components/track/sign/types";
import { useSignTemplates, SignTemplate } from "@/hooks/useSignTemplates";
import SignTemplateLaunchModal from "./SignTemplateLaunchModal";
import SignModeSwitcher from "./SignModeSwitcher";

interface SignHomeProps {
  onSwitchTemplates: () => void;
  onNewAgreement: () => void;
}

type Bucket = "awaiting" | "viewed" | "expiring" | "completed" | "declined";

const BUCKETS: { id: Bucket; label: string; tone: string; icon: any }[] = [
  { id: "awaiting", label: "Awaiting signature", tone: "text-amber-300", icon: Clock },
  { id: "viewed", label: "Viewed, unsigned", tone: "text-sky-300", icon: Eye },
  { id: "expiring", label: "Expiring soon", tone: "text-rose-300", icon: AlertTriangle },
  { id: "completed", label: "Completed", tone: "text-emerald-300", icon: CheckCircle2 },
  { id: "declined", label: "Declined", tone: "text-zinc-300", icon: XCircle },
];

function classifyItem(it: SignItem): Bucket {
  if (it.status === "completed") return "completed";
  if (it.status === "declined" || it.status === "voided") return "declined";
  const exp = it.expiresAt ? new Date(it.expiresAt).getTime() - Date.now() : Infinity;
  if (exp > 0 && exp < 1000 * 60 * 60 * 24 * 2) return "expiring";
  const anyViewed = it.recipients?.some((r) => r.status === "viewed" && !r.signedAt);
  if (anyViewed) return "viewed";
  return "awaiting";
}

export default function SignHome({ onSwitchTemplates, onNewAgreement }: SignHomeProps) {
  const [filter, setFilter] = useState<Bucket | "all">("all");
  const [launchTpl, setLaunchTpl] = useState<SignTemplate | null>(null);
  const { templates, recordLaunch } = useSignTemplates();

  const classified = useMemo(
    () => mockSignItems.map((it) => ({ ...it, bucket: classifyItem(it) })),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<Bucket, number> = {
      awaiting: 0,
      viewed: 0,
      expiring: 0,
      completed: 0,
      declined: 0,
    };
    classified.forEach((it) => (c[it.bucket] += 1));
    return c;
  }, [classified]);

  const filtered = useMemo(
    () => (filter === "all" ? classified : classified.filter((it) => it.bucket === filter)),
    [classified, filter],
  );

  const pulse = useMemo(() => {
    const ordered = [...classified].sort(
      (a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime(),
    );
    return ordered.slice(0, 5);
  }, [classified]);

  const quickTemplates = templates
    .filter((t) => t.favorite || t.pinned)
    .slice(0, 3);

  return (
    <div className="relative px-6 md:px-10 py-7 max-w-6xl mx-auto">
      {/* Top bar: switcher + actions */}
      <div className="flex items-center justify-between gap-3 mb-7">
        <SignModeSwitcher value="agreements" onChange={(v) => v === "templates" && onSwitchTemplates()} />
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="h-9 px-3 rounded-lg text-[12px] text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-3.5 h-3.5 mr-1.5" /> Activity
          </Button>
          <Button
            size="sm"
            onClick={onNewAgreement}
            className="h-9 px-3.5 rounded-lg gap-1.5 shadow-[0_0_0_1px_hsl(var(--primary)/0.25),0_8px_24px_-8px_hsl(var(--primary)/0.4)]"
          >
            <Plus className="w-3.5 h-3.5" /> New agreement
          </Button>
        </div>
      </div>

      {/* Hero stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5 mb-6">
        {BUCKETS.map((b) => {
          const Icon = b.icon;
          const active = filter === b.id;
          return (
            <motion.button
              key={b.id}
              onClick={() => setFilter(active ? "all" : b.id)}
              whileHover={{ y: -1 }}
              className={cn(
                "group relative text-left rounded-xl border bg-card/40 px-3.5 py-3 overflow-hidden transition-colors",
                active
                  ? "border-primary/35 bg-primary/[0.06]"
                  : "border-border/55 hover:border-border hover:bg-card/70",
              )}
            >
              <div
                className={cn(
                  "absolute -inset-12 rounded-full blur-3xl pointer-events-none transition-opacity",
                  active ? "opacity-60" : "opacity-0 group-hover:opacity-40",
                )}
                style={{
                  background: `radial-gradient(circle, hsl(var(--primary) / 0.18), transparent 60%)`,
                }}
              />
              <div className="relative flex items-center gap-1.5">
                <Icon className={cn("w-3 h-3", b.tone)} />
                <span className="text-[10.5px] uppercase tracking-wider font-semibold text-muted-foreground">
                  {b.label}
                </span>
              </div>
              <div className="relative mt-1.5 text-2xl font-semibold tracking-tight tabular-nums">
                {counts[b.id]}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main grid: agreements list + pulse */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Agreements */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] font-semibold tracking-tight">Active agreements</span>
              <span className="text-[11px] text-muted-foreground">
                · {filtered.length} {filter === "all" ? "in flight" : "shown"}
              </span>
            </div>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="text-[11px] text-muted-foreground hover:text-foreground"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="space-y-2">
            {filtered.map((it, i) => (
              <AgreementCard key={it.id} item={it as any} index={i} />
            ))}
            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border/60 bg-card/30 px-6 py-12 text-center">
                <p className="text-[13px] text-foreground/80">Nothing in this bucket right now.</p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Try clearing the filter or send a new agreement.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right rail: pulse + quick launch */}
        <div className="space-y-5">
          {/* Pulse */}
          <div className="rounded-2xl border border-border/55 bg-card/40 p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Activity className="w-3 h-3 text-primary" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-foreground/80">
                Live pulse
              </span>
              <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
              </span>
            </div>
            <ul className="space-y-2.5">
              {pulse.map((it) => {
                const lastRecipient = it.recipients?.find((r) => r.signedAt) ?? it.recipients?.[0];
                return (
                  <li key={it.id} className="flex items-start gap-2.5">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] text-foreground/90 truncate">{it.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {lastRecipient?.signedAt
                          ? `${lastRecipient.name} signed`
                          : `${lastRecipient?.name ?? "Recipient"} ${lastRecipient?.status ?? "pending"}`}
                        {" · "}
                        {formatDistanceToNow(new Date(it.lastActivity), { addSuffix: true })}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick launch */}
          {quickTemplates.length > 0 && (
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.05] via-card/50 to-card/30 p-4 overflow-hidden relative">
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-1.5 mb-3">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-primary/90">
                    Quick launch
                  </span>
                  <button
                    onClick={onSwitchTemplates}
                    className="ml-auto text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-0.5"
                  >
                    All <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
                <ul className="space-y-1.5">
                  {quickTemplates.map((t) => (
                    <li key={t.id}>
                      <button
                        onClick={() => setLaunchTpl(t)}
                        className="group w-full text-left rounded-lg border border-border/40 bg-background/40 hover:bg-background/70 hover:border-border transition-colors px-3 py-2.5"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[12.5px] font-medium truncate flex-1">{t.name}</span>
                          <Rocket className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition" />
                        </div>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          {t.roles.filter((r) => r.key !== "cc").length} signer
                          {t.roles.filter((r) => r.key !== "cc").length === 1 ? "" : "s"} ·{" "}
                          {t.fields.length} fields
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <SignTemplateLaunchModal
        template={launchTpl}
        open={!!launchTpl}
        onOpenChange={(o) => !o && setLaunchTpl(null)}
        onLaunched={() => launchTpl && recordLaunch(launchTpl.id)}
      />
    </div>
  );
}

/* ─────────────── Agreement card ─────────────── */

function AgreementCard({
  item,
  index,
}: {
  item: SignItem & { bucket: Bucket };
  index: number;
}) {
  const total = item.recipients?.length ?? 0;
  const signed = item.recipients?.filter((r) => r.status === "signed").length ?? 0;
  const pct = total ? Math.round((signed / total) * 100) : 0;

  const StatusBadge = () => {
    const map: Record<Bucket, { label: string; cls: string }> = {
      awaiting: { label: "Awaiting", cls: "bg-amber-400/10 text-amber-300 border-amber-400/25" },
      viewed: { label: "Viewed", cls: "bg-sky-400/10 text-sky-300 border-sky-400/25" },
      expiring: { label: "Expiring", cls: "bg-rose-400/10 text-rose-300 border-rose-400/25" },
      completed: { label: "Completed", cls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25" },
      declined: { label: "Declined", cls: "bg-zinc-400/10 text-zinc-300 border-zinc-400/25" },
    };
    const b = map[item.bucket];
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-1.5 h-5 rounded-full text-[10px] font-medium border",
          b.cls,
        )}
      >
        <span className="w-1 h-1 rounded-full bg-current" /> {b.label}
      </span>
    );
  };

  const expiringSoon = item.bucket === "expiring";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.02 }}
      whileHover={{ y: -1 }}
      className="group relative rounded-2xl border border-border/55 bg-card/45 hover:bg-card/80 hover:border-border transition-colors overflow-hidden"
    >
      {/* glow */}
      <div className="absolute -inset-14 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.10), transparent 60%)" }}
      />

      <div className="relative px-4 py-3.5 flex items-center gap-4">
        {/* Icon */}
        <div className="w-9 h-9 rounded-xl bg-muted/40 border border-border/40 flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4 text-foreground/70" />
        </div>

        {/* Main */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-[13.5px] font-medium tracking-tight truncate">{item.name}</p>
            <StatusBadge />
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-[11.5px] text-muted-foreground">
            <span className="truncate">
              {item.sender?.name ?? "Internal"} · {total} recipient{total === 1 ? "" : "s"}
            </span>
            <span className="opacity-50">·</span>
            <span>
              {formatDistanceToNow(new Date(item.lastActivity), { addSuffix: true })}
            </span>
            {expiringSoon && item.expiresAt && (
              <>
                <span className="opacity-50">·</span>
                <span className="text-rose-300">
                  expires {formatDistanceToNow(new Date(item.expiresAt), { addSuffix: true })}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="hidden sm:flex flex-col items-end shrink-0 w-32">
          <div className="text-[11px] text-muted-foreground tabular-nums">
            {signed}/{total} signed
          </div>
          <div className="mt-1.5 h-1 w-28 rounded-full bg-muted/40 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                item.bucket === "completed"
                  ? "bg-emerald-400/80"
                  : item.bucket === "expiring"
                    ? "bg-rose-400/80"
                    : "bg-primary",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-7 px-2 text-[11.5px]">
            Remind
          </Button>
          <Button size="sm" variant="ghost" className="h-7 px-2 text-[11.5px]">
            Open <ArrowUpRight className="w-3 h-3 ml-1" />
          </Button>
          <button className="p-1.5 rounded-md text-muted-foreground hover:bg-muted/60 hover:text-foreground">
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
