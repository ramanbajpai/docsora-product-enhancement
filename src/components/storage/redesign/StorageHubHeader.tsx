import { motion } from "framer-motion";
import { Plus, Upload, Grid3X3, List, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StorageHubHeaderProps {
  title: string;
  subtitle: string;
  fileCount: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onCreateFolder: () => void;
  onUpload: () => void;
}

const StorageHubHeader = ({
  title,
  subtitle,
  fileCount,
  viewMode,
  onViewModeChange,
  onCreateFolder,
  onUpload,
}: StorageHubHeaderProps) => {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="min-w-0"
      >
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
          <span className="px-1.5 py-0.5 rounded-md bg-surface-2 text-[10px] tabular-nums text-muted-foreground font-medium">
            {fileCount}
          </span>
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Shield className="w-3 h-3" />
          {subtitle}
        </p>
      </motion.div>

      <div className="flex items-center gap-2 shrink-0">
        {/* View toggle */}
        <div className="flex items-center gap-0.5 p-0.5 bg-surface-2 rounded-lg">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "grid"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="Grid view"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-1.5 rounded-md transition-all",
              viewMode === "list"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 h-9"
          onClick={onCreateFolder}
        >
          <Plus className="w-3.5 h-3.5" />
          New folder
        </Button>
        <Button
          size="sm"
          className="gap-1.5 h-9 bg-primary hover:bg-primary/90"
          onClick={onUpload}
        >
          <Upload className="w-3.5 h-3.5" />
          Upload
        </Button>
      </div>
    </div>
  );
};

export default StorageHubHeader;