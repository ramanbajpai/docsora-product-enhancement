import { motion } from "framer-motion";
import { Activity, Check, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACTIVITY_ITEMS } from "./mockWorkspaceData";
import { useWorkspace } from "./useWorkspace";

export function ActivityStream() {
  const { selection, setSelection } = useWorkspace();
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Activity className="w-3.5 h-3.5 text-primary" />
        <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Activity Stream
        </h2>
        <span className="ml-auto inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> live
        </span>
      </div>
      <ul className="space-y-2">
        {ACTIVITY_ITEMS.map((item, i) => {
          const active = selection?.kind === "activity" && selection.id === item.id;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <button
                onClick={() => setSelection({ kind: "activity", id: item.id })}
                className={cn(
                  "w-full text-left rounded-xl border border-border/60 bg-card/60 backdrop-blur-md p-3 transition-all hover:bg-card/80",
                  active && "ring-2 ring-primary/30"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full shrink-0",
                      item.status === "done" && "bg-success/15 text-success",
                      item.status === "running" && "bg-primary/15 text-primary",
                      item.status === "queued" && "bg-muted text-muted-foreground"
                    )}
                  >
                    {item.status === "done" ? (
                      <Check className="w-3 h-3" />
                    ) : item.status === "running" ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{item.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.meta}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground shrink-0">{item.timestamp}</span>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
