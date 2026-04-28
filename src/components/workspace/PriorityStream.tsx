import { motion } from "framer-motion";
import { AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRIORITY_ITEMS } from "./mockWorkspaceData";
import { useWorkspace } from "./useWorkspace";

const URGENCY_STYLES = {
  critical: "border-destructive/40 bg-destructive/5",
  high: "border-warning/40 bg-warning/5",
  medium: "border-border/60 bg-card/60",
} as const;

const URGENCY_DOT = {
  critical: "bg-destructive",
  high: "bg-warning",
  medium: "bg-muted-foreground/50",
} as const;

export function PriorityStream() {
  const { selection, setSelection } = useWorkspace();
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-3.5 h-3.5 text-warning" />
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Priority Engine
        </h2>
      </div>
      <ul className="space-y-2">
        {PRIORITY_ITEMS.map((item, i) => {
          const active = selection?.kind === "priority" && selection.id === item.id;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setSelection({ kind: "priority", id: item.id })}
                className={cn(
                  "w-full text-left rounded-xl border backdrop-blur-md p-3 transition-all group",
                  URGENCY_STYLES[item.urgency],
                  active && "ring-2 ring-primary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", URGENCY_DOT[item.urgency])} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</div>
                  </div>
                  {item.due && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground shrink-0">
                      <Clock className="w-3 h-3" /> {item.due}
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
