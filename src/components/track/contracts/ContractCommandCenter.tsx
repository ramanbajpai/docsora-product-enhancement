import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowRight, Calendar, DollarSign,
  RefreshCw, ShieldAlert, Sparkles, TrendingUp, Zap,
} from "lucide-react";
import { differenceInDays, format, addMonths, startOfMonth, isSameMonth } from "date-fns";
import type { Contract } from "@/pages/Track";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildIntelligenceFor } from "./mockIntelligence";

interface Props {
  contracts: Contract[];
  onSelectContract: (c: Contract) => void;
  onIngest: () => void;
}

const healthColor = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
} as const;

const healthBg = {
  green: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  red: "bg-red-500/10 text-red-500 border-red-500/20",
} as const;

export function ContractCommandCenter({ contracts, onSelectContract, onIngest }: Props) {
  const enriched = useMemo(
    () => contracts.map(c => ({ ...c, intelligence: c.intelligence ?? buildIntelligenceFor(c) })),
    [contracts]
  );

  const stats = useMemo(() => {
    const now = new Date();
    const total = enriched.length;
    const totalValue = enriched.reduce((sum, c) => sum + (c.intelligence?.valueNumeric || 0), 0);
    const valueAtRisk = (window: number) =>
      enriched
        .filter(c => {
          const d = differenceInDays(c.expiryDate, now);
          return d >= 0 && d <= window;
        })
        .reduce((sum, c) => sum + (c.intelligence?.valueNumeric || 0), 0);
    const renewedLastYear = Math.max(1, Math.round(total * 0.78));
    return {
      total,
      totalValue,
      var30: valueAtRisk(30),
      var60: valueAtRisk(60),
      var90: valueAtRisk(90),
      renewalRate: Math.round((renewedLastYear / Math.max(total, 1)) * 100),
      health: {
        green: enriched.filter(c => c.intelligence?.health === "green").length,
        amber: enriched.filter(c => c.intelligence?.health === "amber").length,
        red: enriched.filter(c => c.intelligence?.health === "red").length,
      },
    };
  }, [enriched]);

  const attention = useMemo(
    () =>
      enriched
        .filter(c => {
          const d = differenceInDays(c.expiryDate, new Date());
          return c.intelligence?.health !== "green" || d <= 60;
        })
        .sort((a, b) => differenceInDays(a.expiryDate, b.expiryDate))
        .slice(0, 5),
    [enriched]
  );

  // 12-month renewal calendar
  const months = useMemo(() => {
    const start = startOfMonth(new Date());
    return Array.from({ length: 12 }).map((_, i) => {
      const m = addMonths(start, i);
      const inMonth = enriched.filter(c => isSameMonth(c.expiryDate, m));
      return { date: m, contracts: inMonth };
    });
  }, [enriched]);

  const fmtCurrency = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `$${(n / 1_000).toFixed(0)}K` : `$${n}`;

  return (
    <div className="space-y-6">
      {/* HERO STRIP */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl border border-border/40 bg-gradient-to-b from-card/60 to-card/20 backdrop-blur-xl p-8 md:p-10"
      >
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary/90 mb-4 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/15">
              <Sparkles className="w-3 h-3" />
              Command Center
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-[1.1]">
              {attention.length > 0
                ? `${attention.length} contract${attention.length > 1 ? "s" : ""} need${attention.length > 1 ? "" : "s"} your attention`
                : "All contracts are healthy"}
            </h2>
            <p className="text-base text-muted-foreground mt-2 font-light">
              Monitoring {stats.total} contracts · {fmtCurrency(stats.totalValue)} in annual value
            </p>
          </div>
          <Button onClick={onIngest} size="lg" className="gap-2 rounded-full px-6 shadow-sm">
            <Zap className="w-4 h-4" />
            Upload contract
          </Button>
        </div>

        {/* Portfolio strip */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px mt-10 rounded-2xl overflow-hidden bg-border/30">
          <PortfolioCard icon={Activity} label="Total contracts" value={stats.total.toString()} />
          <PortfolioCard icon={DollarSign} label="Annual value" value={fmtCurrency(stats.totalValue)} />
          <PortfolioCard icon={TrendingUp} label="Renewal rate" value={`${stats.renewalRate}%`} />
          <PortfolioCard
            icon={ShieldAlert}
            label="Value at risk (90d)"
            value={fmtCurrency(stats.var90)}
            tone={stats.var90 > 0 ? "warn" : "ok"}
          />
        </div>
      </motion.div>

      {/* TWO COLUMN: ATTENTION + HEALTH */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attention list */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-semibold text-foreground tracking-tight">Needs attention</h3>
            </div>
            <span className="text-xs text-muted-foreground font-light">{attention.length} items</span>
          </div>

          <div className="space-y-1">
            {attention.length === 0 && (
              <p className="text-sm text-muted-foreground py-12 text-center font-light">Nothing urgent — enjoy the calm.</p>
            )}
            {attention.map(c => {
              const days = differenceInDays(c.expiryDate, new Date());
              const isAuto = c.renewalType === "auto";
              const recommendation = isAuto
                ? days < (c.intelligence?.noticePeriodDays || 60)
                  ? "Cancel now or it auto-renews"
                  : "Review before notice window closes"
                : days < 0
                  ? "Expired — renew or archive"
                  : days <= 30
                    ? "Decide: renew, renegotiate, or expire"
                    : "Schedule renewal review";
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectContract(c)}
                  className="w-full text-left flex items-center gap-3.5 px-3 py-3.5 rounded-2xl hover:bg-muted/30 transition-all duration-200 group"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${healthColor[c.intelligence!.health]} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate tracking-tight">{c.name}</div>
                    <div className="text-xs text-muted-foreground truncate font-light mt-0.5">
                      {c.company} · {recommendation}
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-medium rounded-full px-2 py-0.5 ${healthBg[c.intelligence!.health]}`}>
                    {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                  </Badge>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Health donut */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-6"
        >
          <h3 className="text-base font-semibold text-foreground mb-5 tracking-tight">Portfolio health</h3>

          <HealthRing green={stats.health.green} amber={stats.health.amber} red={stats.health.red} />

          <div className="space-y-2.5 mt-6">
            {(["green", "amber", "red"] as const).map(h => (
              <div key={h} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${healthColor[h]}`} />
                  <span className="text-muted-foreground font-light">{h === "green" ? "Healthy" : h === "amber" ? "Needs review" : "At risk"}</span>
                </div>
                <span className="font-medium text-foreground">{stats.health[h]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RENEWAL TIMELINE */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">Renewal timeline</h3>
            <p className="text-xs text-muted-foreground font-light mt-0.5">Next 12 months</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-light">
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Healthy</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Review</span>
            <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> Risk</span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-1.5">
          {months.map(m => (
            <div
              key={m.date.toISOString()}
              className="group rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors duration-200 p-2.5 min-h-[96px]"
            >
              <div className="text-[10px] font-medium text-muted-foreground/70 uppercase tracking-wider mb-2">
                {format(m.date, "MMM")}
              </div>
              <div className="space-y-1">
                {m.contracts.slice(0, 3).map(c => (
                  <button
                    key={c.id}
                    onClick={() => onSelectContract(c)}
                    title={c.name}
                    className="w-full flex items-center gap-1 text-left"
                  >
                    <div className={`w-1 h-1 rounded-full shrink-0 ${healthColor[c.intelligence!.health]}`} />
                    <span className="text-[10px] text-foreground/60 truncate hover:text-foreground transition-colors">
                      {c.company}
                    </span>
                  </button>
                ))}
                {m.contracts.length > 3 && (
                  <div className="text-[10px] text-muted-foreground font-light">+{m.contracts.length - 3}</div>
                )}
                {m.contracts.length === 0 && (
                  <div className="text-[10px] text-muted-foreground/30">—</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* VALUE AT RISK */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { label: "Value at risk · 30 days", value: stats.var30, tone: "red" as const },
          { label: "Value at risk · 60 days", value: stats.var60, tone: "amber" as const },
          { label: "Value at risk · 90 days", value: stats.var90, tone: "default" as const },
        ].map(v => (
          <div key={v.label} className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-xl p-6">
            <div className="text-xs text-muted-foreground mb-3 font-light">{v.label}</div>
            <div className={`text-3xl font-semibold tracking-tight ${v.tone === "red" ? "text-red-500" : v.tone === "amber" ? "text-amber-500" : "text-foreground"}`}>
              {fmtCurrency(v.value)}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PortfolioCard({
  icon: Icon, label, value, tone = "default",
}: { icon: typeof Activity; label: string; value: string; tone?: "default" | "warn" | "ok" }) {
  return (
    <div className="bg-card/60 backdrop-blur-xl p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2.5 font-light">
        <Icon className={`w-3 h-3 ${tone === "warn" ? "text-amber-500" : tone === "ok" ? "text-emerald-500" : "text-muted-foreground/60"}`} />
        {label}
      </div>
      <div className={`text-2xl font-semibold tracking-tight ${tone === "warn" ? "text-amber-500" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function HealthRing({ green, amber, red }: { green: number; amber: number; red: number }) {
  const total = Math.max(green + amber + red, 1);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { color: "hsl(160 70% 45%)", value: green },
    { color: "hsl(38 92% 55%)", value: amber },
    { color: "hsl(0 75% 55%)", value: red },
  ];
  let offset = 0;
  return (
    <div className="relative w-32 h-32 mx-auto">
      <svg viewBox="0 0 120 120" className="-rotate-90 w-full h-full">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
        {segments.map((s, i) => {
          const len = (s.value / total) * circumference;
          const dasharray = `${len} ${circumference - len}`;
          const dashoffset = -offset;
          offset += len;
          return (
            <circle
              key={i}
              cx="60" cy="60" r={radius} fill="none" stroke={s.color} strokeWidth="12"
              strokeDasharray={dasharray} strokeDashoffset={dashoffset} strokeLinecap="butt"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-semibold text-foreground">{total}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">contracts</div>
      </div>
    </div>
  );
}
