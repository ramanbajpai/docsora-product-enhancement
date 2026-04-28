import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Inbox,
  PenTool,
  Download,
  FileText,
  Archive,
  Eye,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import {
  activityLog,
  ActivityEvent,
  ActivityType,
} from "@/data/activityLog";

const typeConfig: Record<
  ActivityType,
  { icon: typeof Send; tint: string; label: string }
> = {
  sent: { icon: Send, tint: "text-primary", label: "Sent" },
  received: { icon: Inbox, tint: "text-primary", label: "Received" },
  signed: { icon: PenTool, tint: "text-success", label: "Signed" },
  downloaded: { icon: Download, tint: "text-foreground", label: "Downloaded" },
  converted: { icon: FileText, tint: "text-warning", label: "Converted" },
  compressed: { icon: Archive, tint: "text-muted-foreground", label: "Compressed" },
  viewed: { icon: Eye, tint: "text-muted-foreground", label: "Viewed" },
  shared: { icon: Share2, tint: "text-muted-foreground", label: "Shared" },
};

type TypeFilter = "all" | ActivityType;
type DateFilter = "all" | "today" | "7d" | "30d";

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sent", label: "Sent" },
  { value: "received", label: "Received" },
  { value: "signed", label: "Signed" },
  { value: "downloaded", label: "Downloaded" },
  { value: "converted", label: "Converted" },
  { value: "compressed", label: "Compressed" },
];

const dateFilters: { value: DateFilter; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function timeOfDay(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function groupKey(iso: string): "Today" | "Yesterday" | "Earlier" {
  const d = startOfDay(new Date(iso));
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.getTime() === today.getTime()) return "Today";
  if (d.getTime() === yesterday.getTime()) return "Yesterday";
  return "Earlier";
}

function formatEarlier(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export default function Activity() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = Date.now();
    const dateBound: Record<DateFilter, number | null> = {
      all: null,
      today: 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000,
    };
    return activityLog.filter((e) => {
      if (typeFilter !== "all" && e.type !== typeFilter) return false;
      const bound = dateBound[dateFilter];
      if (bound !== null && now - new Date(e.timestamp).getTime() > bound)
        return false;
      if (q) {
        const hay = [
          e.subject.name,
          e.description,
          e.actor.name,
          e.actor.email,
          e.counterpartyEmail ?? "",
          e.type,
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, typeFilter, dateFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, ActivityEvent[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };
    for (const e of filtered) groups[groupKey(e.timestamp)].push(e);
    return groups;
  }, [filtered]);

  const totalCount = filtered.length;

  return (
    <AppLayout>
      <div className="p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Activity
          </h1>
          <p className="text-muted-foreground mt-1">
            Everything happening across your documents
          </p>
        </motion.header>

        {/* Search */}
        <div className="mt-8 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by document, person, or action…"
            className={cn(
              "w-full h-11 pl-10 pr-4 rounded-xl",
              "bg-surface-1/60 border border-border/60 backdrop-blur-sm",
              "text-sm text-foreground placeholder:text-muted-foreground/70",
              "focus:outline-none focus:border-foreground/30 transition-colors"
            )}
          />
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <FilterPills
            options={typeFilters}
            value={typeFilter}
            onChange={(v) => setTypeFilter(v as TypeFilter)}
          />
          <span className="mx-1 h-5 w-px bg-border/60 hidden sm:block" />
          <FilterPills
            options={dateFilters}
            value={dateFilter}
            onChange={(v) => setDateFilter(v as DateFilter)}
            tone="muted"
          />
        </div>

        {/* Result count */}
        <p className="mt-5 text-xs text-muted-foreground">
          {totalCount} {totalCount === 1 ? "event" : "events"}
        </p>

        {/* Grouped list */}
        <div className="mt-3 space-y-8">
          {(["Today", "Yesterday", "Earlier"] as const).map((group) => {
            const items = grouped[group];
            if (!items.length) return null;
            return (
              <section key={group}>
                <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 font-medium mb-2 px-1">
                  {group}
                </h2>
                <div className="rounded-2xl border border-border/50 bg-surface-1/40 backdrop-blur-sm overflow-hidden divide-y divide-border/40">
                  {items.map((e, idx) => (
                    <ActivityRow
                      key={e.id}
                      event={e}
                      group={group}
                      delay={idx * 0.02}
                      onClick={() => e.subject.href && navigate(e.subject.href)}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {totalCount === 0 && (
            <div className="rounded-2xl border border-dashed border-border/60 p-12 text-center">
              <p className="text-sm text-foreground font-medium">
                No activity matches your filters
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Try clearing search or expanding the date range.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

/* ───────────── Filter pills ───────────── */

function FilterPills<T extends string>({
  options,
  value,
  onChange,
  tone = "default",
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  tone?: "default" | "muted";
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "px-3 h-8 rounded-full text-xs font-medium transition-colors border",
              active
                ? "bg-foreground text-background border-foreground"
                : tone === "muted"
                ? "bg-transparent text-muted-foreground border-border/50 hover:text-foreground hover:border-border"
                : "bg-surface-1/60 text-foreground/80 border-border/50 hover:bg-surface-1"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────── Row ───────────── */

function ActivityRow({
  event,
  group,
  delay,
  onClick,
}: {
  event: ActivityEvent;
  group: "Today" | "Yesterday" | "Earlier";
  delay: number;
  onClick: () => void;
}) {
  const cfg = typeConfig[event.type];
  const Icon = cfg.icon;
  const timeLabel =
    group === "Earlier" ? formatEarlier(event.timestamp) : timeOfDay(event.timestamp);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay }}
      className={cn(
        "w-full text-left p-4 flex items-center gap-4 group",
        "hover:bg-surface-2/50 transition-colors"
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-surface-2 flex items-center justify-center shrink-0">
        <Icon className={cn("w-4 h-4", cfg.tint)} strokeWidth={1.75} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {event.subject.name}
          </p>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground/60 shrink-0">
            {cfg.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate mt-0.5">
          {event.description}
          {event.actor.kind === "user" && event.type !== "signed" && (
            <span className="text-muted-foreground/60"> · by {event.actor.name}</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-muted-foreground/70 tabular-nums">
          {timeLabel}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </motion.button>
  );
}