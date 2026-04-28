import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWorkspace } from "./useWorkspace";

export function AutopilotToggle() {
  const { autopilot, toggleAutopilot } = useWorkspace();
  return (
    <motion.button
      onClick={toggleAutopilot}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-full border backdrop-blur-md transition-all",
        autopilot
          ? "bg-primary/10 border-primary/40 text-primary"
          : "bg-card/60 border-border/60 text-foreground/80 hover:bg-card/80"
      )}
      aria-pressed={autopilot}
      aria-label="Toggle Autopilot"
    >
      <span
        className={cn(
          "inline-flex items-center justify-center h-6 w-6 rounded-md border",
          autopilot ? "bg-primary/15 border-primary/25" : "bg-muted/60 border-border/60"
        )}
      >
        <Sparkles className="w-3.5 h-3.5" />
      </span>
      <span className="text-xs font-medium">
        {autopilot ? "Autopilot · on" : "Autopilot"}
      </span>
      <span
        className={cn(
          "ml-1 inline-flex h-5 w-9 items-center rounded-full px-0.5 transition-all",
          autopilot ? "bg-primary/30 justify-end" : "bg-muted justify-start"
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full shadow-sm",
            autopilot ? "bg-primary" : "bg-background"
          )}
        />
      </span>
    </motion.button>
  );
}
