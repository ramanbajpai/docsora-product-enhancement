import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Send,
  PenTool,
  Download,
  Sparkles,
  Share2,
  Eye,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";

type OutcomeKind = "compress" | "sign" | "transfer" | "ai_check" | "convert";
type OutcomeCta = "view" | "share" | "continue";
type Bucket = "Today" | "Yesterday" | "Earlier";

interface Outcome {
  id: string;
  document: string;
  outcome: string;
  value: string;
  kind: OutcomeKind;
  bucket: Bucket;
  cta?: OutcomeCta;
}

const outcomes: Outcome[] = [
  {
    id: "o1",
    document: "Financial Report.pdf",
    outcome: "Ready to share",
    value: "Saved 45% file size",
    kind: "compress",
    bucket: "Today",
    cta: "share",
  },
  {
    id: "o2",
    document: "Pitch Deck.pdf",
    outcome: "Sent for signature",
    value: "Awaiting 3 signatures",
    kind: "sign",
    bucket: "Today",
    cta: "view",
  },
  {
    id: "o3",
    document: "Media.zip",
    outcome: "Downloaded by 2 recipients",
    value: "Delivered securely",
    kind: "transfer",
    bucket: "Yesterday",
    cta: "view",
  },
  {
    id: "o4",
    document: "Contract_v2.docx",
    outcome: "AI review complete",
    value: "12 suggestions ready",
    kind: "ai_check",
    bucket: "Yesterday",
    cta: "continue",
  },
  {
    id: "o5",
    document: "SF — Financial Report.docx",
    outcome: "Converted to PDF",
    value: "Original quality preserved",
    kind: "convert",
    bucket: "Earlier",
    cta: "view",
  },
];

const kindConfig: Record<OutcomeKind, { icon: typeof FileText; color: string; bg: string }> = {
  compress: { icon: Download, color: "text-warning", bg: "bg-warning/10" },
  sign: { icon: PenTool, color: "text-success", bg: "bg-success/10" },
  transfer: { icon: Send, color: "text-primary", bg: "bg-primary/10" },
  ai_check: { icon: Sparkles, color: "text-primary", bg: "bg-primary/10" },
  convert: { icon: FileText, color: "text-muted-foreground", bg: "bg-surface-2" },
};

const ctaConfig: Record<OutcomeCta, { label: string; icon: typeof Eye }> = {
  view: { label: "View", icon: Eye },
  share: { label: "Share", icon: Share2 },
  continue: { label: "Continue", icon: Play },
};

const bucketOrder: Bucket[] = ["Today", "Yesterday", "Earlier"];

export function RecentOutcomes() {
  const grouped = bucketOrder
    .map((bucket) => ({ bucket, items: outcomes.filter((o) => o.bucket === bucket) }))
    .filter((g) => g.items.length > 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-hint text-xs text-muted-foreground tracking-wider">
            Outcomes
          </span>
          <h2 className="text-lg font-semibold text-foreground mt-1">
            Recent outcomes
          </h2>
        </div>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group">
          View all
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="space-y-5">
        {grouped.map((group, gi) => (
          <motion.div
            key={group.bucket}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 + gi * 0.05 }}
          >
            <div className="px-1 mb-2">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
                {group.bucket}
              </span>
            </div>
            <div className="glass-card overflow-hidden divide-y divide-border">
              {group.items.map((item, i) => {
                const cfg = kindConfig[item.kind];
                const Icon = cfg.icon;
                const Cta = item.cta ? ctaConfig[item.cta] : null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + gi * 0.05 + i * 0.03 }}
                    className={cn(
                      "p-4 flex items-center gap-4 group cursor-pointer",
                      "hover:bg-surface-2/50 transition-colors duration-200"
                    )}
                  >
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                        cfg.bg
                      )}
                    >
                      <Icon className={cn("w-4 h-4", cfg.color)} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {item.document}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        <span>{item.outcome}</span>
                        <span className="text-muted-foreground/40 mx-1.5">·</span>
                        <span className="text-foreground/70">{item.value}</span>
                      </p>
                    </div>

                    {Cta && (
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 flex items-center gap-1.5 shrink-0"
                      >
                        <Cta.icon className="w-3 h-3" />
                        {Cta.label}
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
