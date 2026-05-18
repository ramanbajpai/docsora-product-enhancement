import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  LayoutTemplate,
  PenLine,
  FileUp,
  Eye,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  ArrowRight,
  Bell,
  MoreHorizontal,
  Download,
  Sparkles,
} from "lucide-react";
import { useSignTemplates } from "@/hooks/useSignTemplates";

interface SignStartProps {
  onOneTime: () => void;
  onUseTemplate: () => void;
}

type AgreementStatus =
  | "awaiting"
  | "viewed"
  | "signed"
  | "completed"
  | "declined"
  | "expired"
  | "at-risk";

interface ActiveAgreement {
  id: string;
  name: string;
  recipient: string;
  status: AgreementStatus;
  signedCount: number;
  totalCount: number;
  lastEventLabel: string;
  expiresLabel: string;
  reminderLabel?: string;
}

const MOCK_AGREEMENTS: ActiveAgreement[] = [
  {
    id: "a1",
    name: "Agency Client Agreement",
    recipient: "Sarah Johnson · Northwind Co.",
    status: "viewed",
    signedCount: 1,
    totalCount: 2,
    lastEventLabel: "Viewed 2h ago",
    expiresLabel: "Expires in 6 days",
    reminderLabel: "Auto-reminder tomorrow",
  },
  {
    id: "a2",
    name: "Mutual NDA — Atlas Ventures",
    recipient: "Daniel Park",
    status: "at-risk",
    signedCount: 0,
    totalCount: 2,
    lastEventLabel: "Sent 4 days ago · not viewed",
    expiresLabel: "Expires in 1 day",
    reminderLabel: "3 reminders sent",
  },
  {
    id: "a3",
    name: "Employment Offer — Maya Chen",
    recipient: "Maya Chen + 1 approver",
    status: "awaiting",
    signedCount: 2,
    totalCount: 3,
    lastEventLabel: "HR signed · waiting on candidate",
    expiresLabel: "Expires in 9 days",
  },
  {
    id: "a4",
    name: "Vendor MSA — Lumen Labs",
    recipient: "Priya Raman",
    status: "awaiting",
    signedCount: 0,
    totalCount: 1,
    lastEventLabel: "Sent 12m ago",
    expiresLabel: "Expires in 14 days",
  },
  {
    id: "a5",
    name: "Consulting SOW — Q2",
    recipient: "Jordan Reyes",
    status: "viewed",
    signedCount: 1,
    totalCount: 2,
    lastEventLabel: "Viewed 45m ago",
    expiresLabel: "Expires in 4 days",
  },
];

const STATUS_STYLES: Record<
  AgreementStatus,
  { label: string; dot: string; pill: string; icon: typeof Eye }
> = {
  awaiting: {
    label: "Awaiting signature",
    dot: "bg-amber-400",
    pill: "text-amber-400/90 bg-amber-400/10 border-amber-400/15",
    icon: Clock,
  },
  viewed: {
    label: "Viewed",
    dot: "bg-sky-400",
    pill: "text-sky-400/90 bg-sky-400/10 border-sky-400/15",
    icon: Eye,
  },
  signed: {
    label: "Signed",
    dot: "bg-emerald-400",
    pill: "text-emerald-400/90 bg-emerald-400/10 border-emerald-400/15",
    icon: CheckCircle2,
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    pill: "text-emerald-400/90 bg-emerald-400/10 border-emerald-400/15",
    icon: CheckCircle2,
  },
  declined: {
    label: "Declined",
    dot: "bg-rose-400",
    pill: "text-rose-400/90 bg-rose-400/10 border-rose-400/15",
    icon: XCircle,
  },
  expired: {
    label: "Expired",
    dot: "bg-muted-foreground",
    pill: "text-muted-foreground bg-muted/40 border-border/40",
    icon: Clock,
  },
  "at-risk": {
    label: "At risk",
    dot: "bg-orange-400",
    pill: "text-orange-400/90 bg-orange-400/10 border-orange-400/15",
    icon: AlertTriangle,
  },
};

const SUMMARY = [
  { key: "awaiting", label: "Awaiting signature", count: 7, icon: Clock, accent: "text-amber-400" },
  { key: "viewed", label: "Viewed, not signed", count: 4, icon: Eye, accent: "text-sky-400" },
  { key: "completed", label: "Completed today", count: 3, icon: CheckCircle2, accent: "text-emerald-400" },
  { key: "expiring", label: "Expiring soon", count: 2, icon: AlertTriangle, accent: "text-orange-400" },
  { key: "at-risk", label: "Needs attention", count: 2, icon: Bell, accent: "text-orange-400" },
  { key: "declined", label: "Declined", count: 1, icon: XCircle, accent: "text-rose-400" },
];

const SignStart = ({ onOneTime, onUseTemplate }: SignStartProps) => {
  const { templates } = useSignTemplates();

  const recentTemplates = useMemo(
    () =>
      [...templates]
        .sort((a, b) => (b.lastUsedAt ?? b.createdAt) - (a.lastUsedAt ?? a.createdAt))
        .slice(0, 4),
    [templates],
  );

  return (
    <div className="relative w-full max-w-[1180px] mx-auto px-6 md:px-10 py-8 md:py-10 space-y-10">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 via-card/50 to-card/30 backdrop-blur-xl px-6 md:px-8 py-7"
      >
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
                Sign · Live operations
              </span>
            </div>
            <h1 className="text-[28px] md:text-[34px] leading-[1.1] font-semibold tracking-tight">
              Move your agreements forward.
            </h1>
            <p className="text-[13.5px] text-muted-foreground leading-relaxed">
              Upload, prepare, and send agreements in minutes. Your active signing pipeline is below.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3">
            <motion.button
              onClick={onOneTime}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 text-[13.5px] font-semibold shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] hover:bg-primary/90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Send Agreement
              <ArrowRight className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <div className="flex items-center gap-1.5">
              <SecondaryAction icon={LayoutTemplate} label="Use template" onClick={onUseTemplate} />
              <SecondaryAction icon={PenLine} label="Self sign" onClick={onOneTime} />
              <SecondaryAction icon={FileUp} label="Upload draft" onClick={onOneTime} />
            </div>
          </div>
        </div>
      </motion.section>

      {/* SUMMARY STRIP */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground">
            Pipeline overview
          </h2>
          <span className="text-[11px] text-muted-foreground">Last sync · just now</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SUMMARY.map((s) => (
            <button
              key={s.key}
              className="group relative text-left rounded-xl border border-border/50 bg-card/40 hover:bg-card/70 hover:border-border transition-all px-3.5 py-3 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <s.icon className={`w-3.5 h-3.5 ${s.accent}`} />
                <ArrowRight className="w-3 h-3 text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div className="mt-2 text-[22px] font-semibold tracking-tight tabular-nums leading-none">
                {s.count}
              </div>
              <div className="mt-1.5 text-[11.5px] text-muted-foreground truncate">{s.label}</div>
            </button>
          ))}
        </div>
      </motion.section>

      {/* ACTIVE AGREEMENTS */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-2.5">
            <h2 className="text-[15px] font-semibold tracking-tight">Active agreements</h2>
            <span className="text-[11.5px] text-muted-foreground">
              {MOCK_AGREEMENTS.length} in motion
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11.5px]">
            <FilterChip label="All" active />
            <FilterChip label="Awaiting" />
            <FilterChip label="Viewed" />
            <FilterChip label="At risk" />
          </div>
        </div>

        <div className="space-y-2">
          {MOCK_AGREEMENTS.map((a, idx) => (
            <AgreementRow key={a.id} a={a} index={idx} />
          ))}
        </div>
      </motion.section>

      {/* RECENTLY USED TEMPLATES */}
      {recentTemplates.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[13px] font-semibold tracking-tight">Recently used templates</h2>
              <span className="text-[11.5px] text-muted-foreground">Launch in seconds</span>
            </div>
            <button
              onClick={onUseTemplate}
              className="text-[11.5px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              All templates <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {recentTemplates.map((t) => (
              <button
                key={t.id}
                onClick={onUseTemplate}
                className="group text-left rounded-xl border border-border/50 bg-card/40 hover:bg-card/70 hover:border-primary/30 transition-all p-3.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <LayoutTemplate className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <Sparkles className="w-3 h-3 text-muted-foreground/40" />
                </div>
                <div className="mt-3 text-[13px] font-medium tracking-tight truncate">{t.name}</div>
                <div className="mt-1 text-[11px] text-muted-foreground truncate">
                  {t.roles.length} signer{t.roles.length === 1 ? "" : "s"} · {t.fields.length} fields
                </div>
                <div className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-primary opacity-80 group-hover:opacity-100">
                  Launch <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
};

const SecondaryAction = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Plus;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/40 hover:bg-card/70 hover:border-border px-2.5 py-1.5 text-[11.5px] font-medium text-foreground/80 hover:text-foreground transition-all"
  >
    <Icon className="w-3.5 h-3.5 opacity-70" />
    {label}
  </button>
);

const FilterChip = ({ label, active = false }: { label: string; active?: boolean }) => (
  <button
    className={`rounded-full px-2.5 py-1 transition-colors ${
      active
        ? "bg-foreground/8 text-foreground border border-border/70"
        : "text-muted-foreground hover:text-foreground border border-transparent"
    }`}
  >
    {label}
  </button>
);

const AgreementRow = ({ a, index }: { a: ActiveAgreement; index: number }) => {
  const s = STATUS_STYLES[a.status];
  const StatusIcon = s.icon;
  const pct = a.totalCount === 0 ? 0 : (a.signedCount / a.totalCount) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-border/50 bg-card/40 hover:bg-card/70 hover:border-border transition-all"
    >
      <div className="flex items-center gap-4 px-4 py-3.5">
        {/* Status dot */}
        <div className="flex-shrink-0">
          <span className={`block w-1.5 h-1.5 rounded-full ${s.dot}`} />
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13.5px] font-medium tracking-tight truncate">{a.name}</span>
            <span
              className={`hidden md:inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${s.pill}`}
            >
              <StatusIcon className="w-2.5 h-2.5" />
              {s.label}
            </span>
          </div>
          <div className="mt-0.5 text-[11.5px] text-muted-foreground truncate">
            {a.recipient} · {a.lastEventLabel}
          </div>
        </div>

        {/* Progress */}
        <div className="hidden lg:flex flex-col items-end gap-1 w-[150px]">
          <div className="text-[10.5px] text-muted-foreground tabular-nums">
            {a.signedCount}/{a.totalCount} signed
          </div>
          <div className="w-full h-1 rounded-full bg-muted/50 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Expiry */}
        <div className="hidden md:flex flex-col items-end w-[130px]">
          <div className="text-[11.5px] text-foreground/80 tabular-nums">{a.expiresLabel}</div>
          {a.reminderLabel && (
            <div className="text-[10.5px] text-muted-foreground truncate">{a.reminderLabel}</div>
          )}
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
          <RowAction icon={Eye} tip="Open" />
          <RowAction icon={Send} tip="Remind" />
          <RowAction icon={Download} tip="Audit trail" />
          <RowAction icon={MoreHorizontal} tip="More" />
        </div>
      </div>
    </motion.div>
  );
};

const RowAction = ({ icon: Icon, tip }: { icon: typeof Eye; tip: string }) => (
  <button
    title={tip}
    className="w-7 h-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
  >
    <Icon className="w-3.5 h-3.5" />
  </button>
);

export default SignStart;