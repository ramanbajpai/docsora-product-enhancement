import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";

type ProofKind = "doc" | "sheet" | "deck" | "image";

export interface ConvertProofPair {
  kind: ProofKind;
  from: string;
  to: string;
  label: string;
}

const iconByKind: Record<ProofKind, LucideIcon> = {
  doc: FileText,
  sheet: FileSpreadsheet,
  deck: Presentation,
  image: ImageIcon,
};

const Lines = () => (
  <div className="space-y-1.5">
    <div className="h-1.5 rounded-full bg-foreground/15 w-[78%]" />
    <div className="h-1.5 rounded-full bg-foreground/10 w-[92%]" />
    <div className="h-1.5 rounded-full bg-foreground/10 w-[68%]" />
    <div className="h-1.5 rounded-full bg-foreground/10 w-[85%]" />
  </div>
);

const TableBlock = () => (
  <div className="rounded-md border border-border/30 overflow-hidden mt-2">
    <div className="grid grid-cols-3 bg-foreground/5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="px-1.5 py-1 border-r border-border/30 last:border-r-0">
          <div className="h-1 rounded-full bg-foreground/25 w-3/4" />
        </div>
      ))}
    </div>
    {Array.from({ length: 3 }).map((_, r) => (
      <div key={r} className="grid grid-cols-3 border-t border-border/30">
        {Array.from({ length: 3 }).map((_, c) => (
          <div key={c} className="px-1.5 py-1 border-r border-border/30 last:border-r-0">
            <div className="h-1 rounded-full bg-foreground/12 w-[60%]" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const SlideBlock = () => (
  <div className="space-y-2">
    <div className="h-2 rounded bg-foreground/20 w-[55%]" />
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div className="aspect-[4/3] rounded bg-gradient-to-br from-primary/15 to-primary/5 border border-border/30" />
      <div className="space-y-1.5 pt-1">
        <div className="h-1 rounded-full bg-foreground/15 w-full" />
        <div className="h-1 rounded-full bg-foreground/15 w-[88%]" />
        <div className="h-1 rounded-full bg-foreground/15 w-[70%]" />
      </div>
    </div>
  </div>
);

const ImageBlock = () => (
  <div className="grid grid-cols-2 gap-2">
    <div className="aspect-square rounded bg-gradient-to-br from-primary/15 to-primary/5 border border-border/30" />
    <div className="aspect-square rounded bg-gradient-to-tr from-primary/10 to-primary/5 border border-border/30" />
  </div>
);

function Body({ kind }: { kind: ProofKind }) {
  if (kind === "deck") return <SlideBlock />;
  if (kind === "image") return <ImageBlock />;
  if (kind === "sheet")
    return (
      <div>
        <Lines />
        <TableBlock />
      </div>
    );
  return (
    <div>
      <div className="h-2 rounded bg-foreground/25 w-[60%] mb-2" />
      <Lines />
      <TableBlock />
    </div>
  );
}

function Card({
  kind,
  format,
  side,
}: {
  kind: ProofKind;
  format: string;
  side: "source" | "converted";
}) {
  const Icon = iconByKind[kind];
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border/40 bg-card/70 backdrop-blur-sm overflow-hidden",
        "shadow-[0_18px_44px_-28px_hsl(var(--foreground)/0.22),0_6px_14px_-10px_hsl(var(--foreground)/0.08)]",
      )}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/30 bg-card/60">
        <div className="flex items-center gap-1.5">
          <Icon className="w-3 h-3 text-primary/70" />
          <span className="text-[9px] uppercase tracking-[0.14em] font-medium text-muted-foreground/70">
            {format}
          </span>
        </div>
        <span
          className={cn(
            "text-[9px] uppercase tracking-[0.14em] font-medium",
            side === "converted" ? "text-primary/80" : "text-muted-foreground/60",
          )}
        >
          {side === "source" ? "Source" : "Converted"}
        </span>
      </div>
      <div className="p-4 min-h-[140px] bg-gradient-to-b from-card/30 to-transparent">
        <Body kind={kind} />
      </div>
    </div>
  );
}

export function ConvertProofMockup({ pairs }: { pairs: ConvertProofPair[] }) {
  return (
    <div className="space-y-8">
      {pairs.map((pair, idx) => (
        <motion.div
          key={pair.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/70">
              {pair.label}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground/50">
              {pair.from} → {pair.to}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-4 items-center">
            <Card kind={pair.kind} format={pair.from} side="source" />
            <div className="hidden md:flex w-9 h-9 rounded-full bg-background border border-border/40 items-center justify-center mx-auto shadow-md">
              <ArrowRight className="w-3.5 h-3.5 text-primary/80" />
            </div>
            <Card kind={pair.kind} format={pair.to} side="converted" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}