import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { FileText, Presentation, FileType, Scale, Briefcase } from "lucide-react";

type MockupKind = "pdf" | "deck" | "doc" | "contract" | "report";

interface DocumentMockupProps {
  kind?: MockupKind;
  sourceLanguage?: string;
  targetLanguage?: string;
  formatLabel?: string;
  title?: string;
}

const iconByKind: Record<MockupKind, LucideIcon> = {
  pdf: FileText,
  deck: Presentation,
  doc: FileType,
  contract: Scale,
  report: Briefcase,
};

const PageLines = ({ rtl = false }: { rtl?: boolean }) => (
  <div className={cn("space-y-2.5", rtl && "[direction:rtl]")}>
    <div className="h-2 rounded-full bg-foreground/15 w-[78%]" />
    <div className="h-2 rounded-full bg-foreground/10 w-[92%]" />
    <div className="h-2 rounded-full bg-foreground/10 w-[85%]" />
    <div className="h-2 rounded-full bg-foreground/10 w-[70%]" />
    <div className="h-2 rounded-full bg-foreground/10 w-[88%]" />
  </div>
);

const TableRows = () => (
  <div className="rounded-md border border-border/40 overflow-hidden">
    <div className="grid grid-cols-3 bg-foreground/5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="px-2 py-1.5 border-r border-border/30 last:border-r-0">
          <div className="h-1.5 rounded-full bg-foreground/25 w-3/4" />
        </div>
      ))}
    </div>
    {Array.from({ length: 3 }).map((_, r) => (
      <div key={r} className="grid grid-cols-3 border-t border-border/30">
        {Array.from({ length: 3 }).map((_, c) => (
          <div key={c} className="px-2 py-1.5 border-r border-border/30 last:border-r-0">
            <div className="h-1.5 rounded-full bg-foreground/12 w-[60%]" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const SlideMockup = ({ rtl = false }: { rtl?: boolean }) => (
  <div className={cn("space-y-3", rtl && "[direction:rtl]")}>
    <div className="h-3 rounded bg-foreground/20 w-[55%]" />
    <div className="h-1.5 rounded bg-foreground/10 w-[40%]" />
    <div className="grid grid-cols-2 gap-3 mt-4">
      <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-primary/15 to-primary/5 border border-border/30 flex items-end p-2">
        <div className="space-y-1 w-full">
          <div className="h-1.5 rounded-full bg-foreground/30 w-[80%]" />
          <div className="h-1.5 rounded-full bg-foreground/15 w-[60%]" />
        </div>
      </div>
      <div className="space-y-2 pt-1">
        <div className="h-1.5 rounded-full bg-foreground/15 w-full" />
        <div className="h-1.5 rounded-full bg-foreground/15 w-[88%]" />
        <div className="h-1.5 rounded-full bg-foreground/15 w-[70%]" />
        <div className="h-1.5 rounded-full bg-foreground/15 w-[92%]" />
      </div>
    </div>
  </div>
);

const ContractMockup = ({ rtl = false }: { rtl?: boolean }) => (
  <div className={cn("space-y-3", rtl && "[direction:rtl]")}>
    <div className="h-3 rounded bg-foreground/20 w-[60%] mx-auto" />
    <div className="flex gap-2 items-center">
      <div className="text-[8px] font-mono text-foreground/40">1.1</div>
      <div className="h-1.5 rounded-full bg-foreground/15 w-full" />
    </div>
    <div className="flex gap-2 items-center">
      <div className="text-[8px] font-mono text-foreground/40">1.2</div>
      <div className="h-1.5 rounded-full bg-foreground/15 w-[88%]" />
    </div>
    <div className="flex gap-2 items-center">
      <div className="text-[8px] font-mono text-foreground/40">1.3</div>
      <div className="h-1.5 rounded-full bg-foreground/15 w-[75%]" />
    </div>
    <div className="flex gap-2 items-center">
      <div className="text-[8px] font-mono text-foreground/40">2.1</div>
      <div className="h-1.5 rounded-full bg-foreground/15 w-[92%]" />
    </div>
    <div className="pt-4 grid grid-cols-2 gap-3 mt-2 border-t border-border/30">
      <div>
        <div className="text-[8px] uppercase tracking-wider text-foreground/40 mb-1">Signature</div>
        <div className="h-px bg-foreground/30 mt-3" />
      </div>
      <div>
        <div className="text-[8px] uppercase tracking-wider text-foreground/40 mb-1">Date</div>
        <div className="h-px bg-foreground/30 mt-3" />
      </div>
    </div>
  </div>
);

function PageBody({ kind, rtl }: { kind: MockupKind; rtl?: boolean }) {
  if (kind === "deck") return <SlideMockup rtl={rtl} />;
  if (kind === "contract") return <ContractMockup rtl={rtl} />;
  if (kind === "report")
    return (
      <div className={cn("space-y-3", rtl && "[direction:rtl]")}>
        <PageLines rtl={rtl} />
        <div className="pt-1">
          <TableRows />
        </div>
        <PageLines rtl={rtl} />
      </div>
    );
  return (
    <div className={cn("space-y-3", rtl && "[direction:rtl]")}>
      <div className="h-3 rounded bg-foreground/25 w-[60%]" />
      <PageLines rtl={rtl} />
      <div className="pt-2">
        <TableRows />
      </div>
      <PageLines rtl={rtl} />
    </div>
  );
}

export const DocumentMockup = ({
  kind = "pdf",
  sourceLanguage = "English",
  targetLanguage = "Translated",
  formatLabel = "PDF",
  title = "Document fidelity preserved",
}: DocumentMockupProps) => {
  const Icon = iconByKind[kind];
  const isRTL = /Arabic|Hebrew|Urdu|Persian/i.test(targetLanguage);

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch">
        {[
          { label: sourceLanguage, rtl: false, badge: "Source" },
          { label: targetLanguage, rtl: isRTL, badge: "Translated" },
        ].map((side, i) => (
          <motion.div
            key={side.badge}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative rounded-2xl border border-border/40 bg-card/70 backdrop-blur-sm overflow-hidden",
              "shadow-[0_24px_60px_-30px_hsl(var(--foreground)/0.25),0_8px_20px_-12px_hsl(var(--foreground)/0.1)]",
            )}
          >
            {/* Document chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30 bg-card/60">
              <div className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 text-primary/70" />
                <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted-foreground/70">
                  {formatLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-primary/70">
                  {side.badge}
                </span>
                <span className="text-[10px] font-medium text-foreground/70 rounded-full px-2 py-0.5 bg-foreground/5 border border-border/30">
                  {side.label}
                </span>
              </div>
            </div>
            {/* Page */}
            <div className="p-5 md:p-7 min-h-[260px] bg-gradient-to-b from-card/30 to-transparent">
              <PageBody kind={kind} rtl={side.rtl} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Arrow between */}
      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background border border-border/40 items-center justify-center shadow-md">
        <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary/80">→</span>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground/70">
        {title} — layouts, fonts, tables, and structure stay visually identical.
      </p>
    </div>
  );
};

export default DocumentMockup;