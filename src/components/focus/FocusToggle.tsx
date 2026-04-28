import { motion } from "framer-motion";
import { Focus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusMode } from "@/contexts/FocusModeContext";

/**
 * Global Focus Mode toggle.
 * Lives at the top of the dashboard. Switches the entire experience
 * between Overview and Execution modes.
 */
export function FocusToggle() {
  const { isFocusMode, toggleFocus } = useFocusMode();

  return (
    <motion.button
      type="button"
      onClick={toggleFocus}
      whileTap={{ scale: 0.97 }}
      aria-pressed={isFocusMode}
      aria-label="Toggle Focus Mode"
      className={cn(
        "group inline-flex items-center gap-2 pl-2.5 pr-1 py-1 rounded-full border backdrop-blur-md transition-all",
        isFocusMode
          ? "bg-foreground text-background border-foreground"
          : "bg-surface-1/60 border-border/60 text-foreground/80 hover:bg-surface-1"
      )}
    >
      <Focus className="w-3.5 h-3.5" strokeWidth={1.75} />
      <span className="text-xs font-medium tracking-tight">
        {isFocusMode ? "Focus · on" : "Focus"}
      </span>
      <span
        className={cn(
          "ml-1 inline-flex h-5 w-9 items-center rounded-full px-0.5 transition-all",
          isFocusMode ? "bg-background/20 justify-end" : "bg-muted justify-start"
        )}
      >
        <span
          className={cn(
            "h-4 w-4 rounded-full transition-colors",
            isFocusMode ? "bg-background" : "bg-foreground/80"
          )}
        />
      </span>
    </motion.button>
  );
}