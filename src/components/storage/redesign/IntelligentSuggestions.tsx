import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, X, PenTool, FileArchive, Send, ArrowRight, 
  AlertCircle, Lightbulb 
} from "lucide-react";
import { useMemo, useState } from "react";
import { StorageFile } from "@/pages/Storage";
import { cn } from "@/lib/utils";

interface Suggestion {
  id: string;
  type: "action" | "alert" | "tip";
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  cta: string;
  fileId?: string;
  onAction: () => void;
}

interface IntelligentSuggestionsProps {
  files: StorageFile[];
  onSign: (file: StorageFile) => void;
  onCompress: (file: StorageFile) => void;
  onSend: (file: StorageFile) => void;
}

const IntelligentSuggestions = ({ files, onSign, onCompress, onSend }: IntelligentSuggestionsProps) => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const suggestions = useMemo<Suggestion[]>(() => {
    const result: Suggestion[] = [];

    // 1. Find unsigned contracts
    const unsignedContract = files.find(
      (f) => f.type === "pdf" && f.aiTag === "Contract" && f.status !== "signed"
    );
    if (unsignedContract) {
      result.push({
        id: `sign-${unsignedContract.id}`,
        type: "action",
        icon: PenTool,
        title: `${unsignedContract.name} looks like a contract`,
        description: "Send it for signature in one click — Docsora detected the right fields.",
        cta: "Send for signing",
        fileId: unsignedContract.id,
        onAction: () => onSign(unsignedContract),
      });
    }

    // 2. Find oversized files (> 5MB) that could be compressed
    const heavyFile = files.find((f) => f.size && f.size > 5 * 1024 * 1024 && f.type !== "folder");
    if (heavyFile) {
      const sizeMB = (heavyFile.size! / (1024 * 1024)).toFixed(1);
      result.push({
        id: `compress-${heavyFile.id}`,
        type: "tip",
        icon: FileArchive,
        title: `${heavyFile.name} is ${sizeMB} MB`,
        description: "Compress before sending to speed up delivery and save space.",
        cta: "Compress now",
        fileId: heavyFile.id,
        onAction: () => onCompress(heavyFile),
      });
    }

    // 3. Find pending documents needing attention
    const pendingFile = files.find((f) => f.status === "pending");
    if (pendingFile) {
      result.push({
        id: `pending-${pendingFile.id}`,
        type: "alert",
        icon: AlertCircle,
        title: `${pendingFile.name} is awaiting action`,
        description: "Status: Pending. Follow up with the recipient or resend the request.",
        cta: "Send reminder",
        fileId: pendingFile.id,
        onAction: () => onSend(pendingFile),
      });
    }

    return result.filter((s) => !dismissed.has(s.id)).slice(0, 3);
  }, [files, dismissed, onSign, onCompress, onSend]);

  if (suggestions.length === 0) return null;

  const typeStyles = {
    action: "border-primary/20 bg-primary/5",
    alert:  "border-amber-500/20 bg-amber-500/5",
    tip:    "border-emerald-500/20 bg-emerald-500/5",
  };

  const iconStyles = {
    action: "bg-primary/10 text-primary",
    alert:  "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    tip:    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
          <Lightbulb className="w-3 h-3 text-primary" />
        </div>
        <p className="text-xs font-medium text-foreground/80">
          Docsora suggests
        </p>
        <div className="flex-1 h-px bg-border/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
        <AnimatePresence mode="popLayout">
          {suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              layout
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className={cn(
                "relative rounded-xl border p-3 group transition-all",
                typeStyles[suggestion.type],
                "hover:shadow-md hover:shadow-black/5"
              )}
            >
              <button
                onClick={() => setDismissed((prev) => new Set(prev).add(suggestion.id))}
                className="absolute top-2 right-2 p-0.5 rounded text-muted-foreground/60 hover:text-foreground hover:bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="flex items-start gap-2.5">
                <div className={cn(
                  "shrink-0 w-7 h-7 rounded-lg flex items-center justify-center",
                  iconStyles[suggestion.type]
                )}>
                  <suggestion.icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground leading-snug truncate">
                    {suggestion.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                    {suggestion.description}
                  </p>
                  <button
                    onClick={suggestion.onAction}
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:gap-1.5 transition-all group/cta"
                  >
                    {suggestion.cta}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/cta:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntelligentSuggestions;