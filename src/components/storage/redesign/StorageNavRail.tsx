import { motion } from "framer-motion";
import { 
  FolderOpen, Clock, Users, FileStack, Trash2, Star, 
  Sparkles, FileText, FileArchive, Receipt, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

export type StorageView = 
  | "all"
  | "recent"
  | "shared"
  | "templates"
  | "starred"
  | "trash"
  | "smart-contracts"
  | "smart-invoices"
  | "smart-resumes"
  | "smart-presentations";

interface StorageNavRailProps {
  currentView: StorageView;
  onViewChange: (view: StorageView) => void;
  storageUsed: number;
  storageTotal: number;
  counts: Partial<Record<StorageView, number>>;
}

const primaryItems: Array<{ id: StorageView; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { id: "all", label: "All Files", icon: FolderOpen },
  { id: "recent", label: "Recent", icon: Clock },
  { id: "starred", label: "Starred", icon: Star },
  { id: "shared", label: "Shared with me", icon: Users },
  { id: "templates", label: "Templates", icon: FileStack },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const smartCollections: Array<{ id: StorageView; label: string; icon: React.ComponentType<{ className?: string }>; color: string }> = [
  { id: "smart-contracts", label: "Contracts", icon: Briefcase, color: "text-violet-500" },
  { id: "smart-invoices", label: "Invoices", icon: Receipt, color: "text-emerald-500" },
  { id: "smart-resumes", label: "Resumes", icon: FileText, color: "text-amber-500" },
  { id: "smart-presentations", label: "Decks", icon: FileArchive, color: "text-rose-500" },
];

const StorageNavRail = ({ currentView, onViewChange, storageUsed, storageTotal, counts }: StorageNavRailProps) => {
  const usagePercentage = (storageUsed / storageTotal) * 100;

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border/40 bg-surface-1/40 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Library section */}
        <div className="space-y-1">
          <p className="px-2.5 mb-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Library
          </p>
          {primaryItems.map((item) => {
            const isActive = currentView === item.id;
            const count = counts[item.id];
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all relative group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface-2/70"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="rail-active"
                    className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-primary"
                    transition={{ duration: 0.2 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {count !== undefined && count > 0 && (
                  <span className={cn(
                    "text-[10px] tabular-nums px-1.5 py-0.5 rounded-full",
                    isActive ? "bg-primary/15 text-primary" : "text-muted-foreground/70"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Smart Collections - AI-curated */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 px-2.5 mb-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Smart Collections
            </p>
          </div>
          {smartCollections.map((item) => {
            const isActive = currentView === item.id;
            const count = counts[item.id];
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-surface-2/70"
                )}
              >
                <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-primary" : item.color)} />
                <span className="flex-1 text-left truncate">{item.label}</span>
                {count !== undefined && count > 0 && (
                  <span className="text-[10px] tabular-nums text-muted-foreground/70">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storage usage */}
      <div className="p-4 border-t border-border/40 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Storage</span>
          <span className="font-medium text-foreground tabular-nums">
            {storageUsed.toFixed(1)} / {storageTotal} GB
          </span>
        </div>
        <div className="relative h-1.5 bg-surface-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usagePercentage}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-y-0 left-0 bg-primary rounded-full"
          />
        </div>
        <button className="w-full mt-2 px-2.5 py-1.5 rounded-md text-[11px] text-primary hover:bg-primary/10 transition-colors text-center font-medium">
          Upgrade for more space
        </button>
      </div>
    </aside>
  );
};

export default StorageNavRail;