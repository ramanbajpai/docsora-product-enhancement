import { motion, AnimatePresence } from "framer-motion";
import { StorageFile } from "@/pages/Storage";
import SmartFileCard from "./SmartFileCard";
import { FolderOpen } from "lucide-react";

interface SmartFileGridProps {
  files: StorageFile[];
  selectedFileId?: string | null;
  onFileClick: (file: StorageFile) => void;
  onFileDoubleClick?: (file: StorageFile) => void;
  onPreview?: (file: StorageFile) => void;
  onAIInsight?: (file: StorageFile) => void;
  onSend?: (file: StorageFile) => void;
  onSign?: (file: StorageFile) => void;
  onShare?: (file: StorageFile) => void;
  onCompress?: (file: StorageFile) => void;
  onMore?: (file: StorageFile) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

const SmartFileGrid = ({
  files,
  selectedFileId,
  onFileClick,
  onFileDoubleClick,
  onPreview,
  onAIInsight,
  onSend,
  onSign,
  onShare,
  onCompress,
  onMore,
  emptyTitle = "No files yet",
  emptyDescription = "Upload a file or create a folder to get started.",
}: SmartFileGridProps) => {
  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center mb-4">
          <FolderOpen className="w-8 h-8 text-muted-foreground/60" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-foreground mb-1">{emptyTitle}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <AnimatePresence mode="popLayout">
        {files.map((file) => (
          <SmartFileCard
            key={file.id}
            file={file}
            isSelected={selectedFileId === file.id}
            onClick={() => onFileClick(file)}
            onDoubleClick={() => onFileDoubleClick?.(file)}
            onPreview={onPreview ? () => onPreview(file) : undefined}
            onAIInsight={onAIInsight ? () => onAIInsight(file) : undefined}
            onSend={onSend ? () => onSend(file) : undefined}
            onSign={onSign ? () => onSign(file) : undefined}
            onShare={onShare ? () => onShare(file) : undefined}
            onCompress={onCompress ? () => onCompress(file) : undefined}
            onMore={onMore ? () => onMore(file) : undefined}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SmartFileGrid;