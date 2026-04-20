import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Sparkles, PenTool, Send, FileArchive, Eye, RefreshCw, Languages } from "lucide-react";
import { StorageFile } from "@/pages/Storage";
import { cn } from "@/lib/utils";

interface ContinuityRibbonProps {
  file: StorageFile | null;
  onClose: () => void;
  onPreview: (file: StorageFile) => void;
  onSign: (file: StorageFile) => void;
  onSend: (file: StorageFile) => void;
  onCompress: (file: StorageFile) => void;
  onConvert: (file: StorageFile) => void;
  onTranslate: (file: StorageFile) => void;
  onAIInsight: (file: StorageFile) => void;
}

interface NextStep {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  primary?: boolean;
  onClick: () => void;
}

const ContinuityRibbon = ({
  file,
  onClose,
  onPreview,
  onSign,
  onSend,
  onCompress,
  onConvert,
  onTranslate,
  onAIInsight,
}: ContinuityRibbonProps) => {
  if (!file || file.type === "folder") return null;

  // Decide the "next best action" based on file metadata
  const isContract = file.aiTag === "Contract" || /contract|nda|agreement/i.test(file.name);
  const isHeavy = file.size && file.size > 5 * 1024 * 1024;
  const needsSign = file.type === "pdf" && file.status !== "signed";

  const steps: NextStep[] = [];

  // Primary suggestion
  if (isContract && needsSign) {
    steps.push({ id: "sign", label: "Send for signing", icon: PenTool, primary: true, onClick: () => onSign(file) });
  } else if (isHeavy) {
    steps.push({ id: "compress", label: "Compress first", icon: FileArchive, primary: true, onClick: () => onCompress(file) });
  } else if (file.type === "pdf" || file.type === "docx") {
    steps.push({ id: "send", label: "Transfer", icon: Send, primary: true, onClick: () => onSend(file) });
  }

  // Secondary steps
  steps.push({ id: "preview", label: "Preview", icon: Eye, onClick: () => onPreview(file) });
  steps.push({ id: "ask", label: "Ask AI", icon: Sparkles, onClick: () => onAIInsight(file) });

  if (file.type === "pdf" || file.type === "docx" || file.type === "xlsx") {
    steps.push({ id: "convert", label: "Convert", icon: RefreshCw, onClick: () => onConvert(file) });
  }
  if (file.type === "pdf" || file.type === "docx") {
    steps.push({ id: "translate", label: "Translate", icon: Languages, onClick: () => onTranslate(file) });
  }
  if (needsSign && !isContract) {
    steps.push({ id: "sign-alt", label: "Sign", icon: PenTool, onClick: () => onSign(file) });
  }

  return (
    <AnimatePresence>
      <motion.div
        key={file.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 max-w-3xl w-[calc(100vw-3rem)]"
      >
        <div className="rounded-2xl bg-card border border-border/60 shadow-2xl shadow-black/15 p-3 pr-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* File context */}
            <div className="flex items-center gap-2.5 min-w-0 max-w-[220px] pl-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                  Selected
                </p>
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              </div>
            </div>

            <div className="h-8 w-px bg-border/50 shrink-0" />

            {/* What's next? */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                What's next?
              </span>
            </div>

            {/* Action chips */}
            <div className="flex-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={step.onClick}
                  className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0",
                    step.primary
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-primary/20"
                      : "bg-surface-2 text-foreground hover:bg-surface-3"
                  )}
                >
                  <step.icon className="w-3 h-3" />
                  {step.label}
                  {step.primary && <ArrowRight className="w-3 h-3" />}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContinuityRibbon;