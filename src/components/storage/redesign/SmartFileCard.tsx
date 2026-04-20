import { motion } from "framer-motion";
import { 
  MoreHorizontal, Sparkles, Folder, FileText, Send, PenTool, 
  Share2, FileArchive, Eye, CheckCircle2, Clock, AlertCircle, Star
} from "lucide-react";
import { StorageFile } from "@/pages/Storage";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SmartFileCardProps {
  file: StorageFile;
  isSelected?: boolean;
  onClick: () => void;
  onDoubleClick?: () => void;
  onPreview?: () => void;
  onAIInsight?: () => void;
  onSend?: () => void;
  onSign?: () => void;
  onShare?: () => void;
  onCompress?: () => void;
  onMore?: () => void;
}

const fileTypeStyles: Record<string, { bg: string; text: string; label: string }> = {
  pdf:    { bg: "bg-red-500/10",     text: "text-red-500",     label: "PDF" },
  docx:   { bg: "bg-blue-500/10",    text: "text-blue-500",    label: "DOC" },
  xlsx:   { bg: "bg-emerald-500/10", text: "text-emerald-500", label: "XLS" },
  pptx:   { bg: "bg-orange-500/10",  text: "text-orange-500",  label: "PPT" },
  mp4:    { bg: "bg-amber-500/10",   text: "text-amber-500",   label: "MP4" },
  jpg:    { bg: "bg-purple-500/10",  text: "text-purple-500",  label: "JPG" },
  png:    { bg: "bg-purple-500/10",  text: "text-purple-500",  label: "PNG" },
};

const statusConfig = {
  signed:  { icon: CheckCircle2, label: "Signed",  className: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  pending: { icon: Clock,        label: "Pending", className: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  draft:   { icon: AlertCircle,  label: "Draft",   className: "text-muted-foreground bg-muted border-border" },
};

const formatSize = (bytes?: number) => {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const SmartFileCard = ({
  file,
  isSelected,
  onClick,
  onDoubleClick,
  onPreview,
  onAIInsight,
  onSend,
  onSign,
  onShare,
  onCompress,
  onMore,
}: SmartFileCardProps) => {
  const isFolder = file.type === "folder";
  const typeStyle = fileTypeStyles[file.type];
  const status = file.status ? statusConfig[file.status] : null;

  // Decide which quick actions to expose based on file type & status
  const canSign = file.type === "pdf" && file.status !== "signed";
  const canCompress = ["pdf", "docx", "xlsx", "mp4"].includes(file.type);

  return (
    <TooltipProvider delayDuration={300}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        className={cn(
          "group relative rounded-2xl bg-card border cursor-pointer overflow-hidden",
          "transition-all duration-200",
          isSelected
            ? "border-primary/60 ring-2 ring-primary/20 shadow-lg shadow-primary/10"
            : "border-border/40 hover:border-border hover:shadow-md hover:shadow-black/5"
        )}
      >
        {/* Preview / Thumbnail */}
        <div className={cn(
          "relative h-28 overflow-hidden",
          isFolder ? "bg-amber-500/5" : "bg-surface-2/50"
        )}>
          {/* Subtle pattern for non-folders */}
          {!isFolder && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-foreground/5" />
          )}

          {file.thumbnail && !isFolder ? (
            <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover opacity-90" />
          ) : isFolder ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Folder className="w-12 h-12 text-amber-500/70" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn("px-2.5 py-1 rounded-md font-bold text-[11px] tracking-wider", typeStyle?.bg, typeStyle?.text)}>
                {typeStyle?.label || "FILE"}
              </div>
            </div>
          )}

          {/* AI auto-tag badge - top left */}
          {file.aiTag && !isFolder && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-background/80 backdrop-blur-sm border border-border/40 text-[10px] font-medium text-foreground/80">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              {file.aiTag}
            </div>
          )}

          {/* Status pill - top right */}
          {status && (
            <div className={cn(
              "absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-medium backdrop-blur-sm",
              status.className
            )}>
              <status.icon className="w-2.5 h-2.5" />
              {status.label}
            </div>
          )}

          {/* Hover quick action bar - the WOW: one-click actions */}
          {!isFolder && (
            <div className={cn(
              "absolute inset-x-0 bottom-0 px-2 py-2",
              "bg-gradient-to-t from-background via-background/95 to-transparent",
              "translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out"
            )}>
              <div className="flex items-center justify-center gap-1">
                {onPreview && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onPreview(); }}
                        className="p-1.5 rounded-md bg-surface-2/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Preview</TooltipContent>
                  </Tooltip>
                )}
                {canSign && onSign && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSign(); }}
                        className="p-1.5 rounded-md bg-surface-2/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Send for signature</TooltipContent>
                  </Tooltip>
                )}
                {onSend && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onSend(); }}
                        className="p-1.5 rounded-md bg-surface-2/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Transfer</TooltipContent>
                  </Tooltip>
                )}
                {onShare && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onShare(); }}
                        className="p-1.5 rounded-md bg-surface-2/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Share link</TooltipContent>
                  </Tooltip>
                )}
                {canCompress && onCompress && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onCompress(); }}
                        className="p-1.5 rounded-md bg-surface-2/80 hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
                      >
                        <FileArchive className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Compress</TooltipContent>
                  </Tooltip>
                )}
                {onAIInsight && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); onAIInsight(); }}
                        className="p-1.5 rounded-md bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">Ask Docsora</TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="p-3 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] font-medium text-foreground truncate flex-1 leading-snug">
              {file.name}
            </h3>
            <button
              onClick={(e) => { e.stopPropagation(); onMore?.(); }}
              className="p-0.5 -mr-1 rounded text-muted-foreground hover:text-foreground hover:bg-surface-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <span className="truncate">{file.lastModified}</span>
            {file.size && <span className="tabular-nums shrink-0">{formatSize(file.size)}</span>}
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default SmartFileCard;