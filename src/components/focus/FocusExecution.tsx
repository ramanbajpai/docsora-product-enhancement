import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusMode } from "@/contexts/FocusModeContext";

interface FocusItem {
  id: string;
  title: string;
  reason: string;
  cta: string;
  due?: string;
}

const focusQueue: FocusItem[] = [
  {
    id: "f1",
    title: "Sign — Acme MSA",
    reason: "Counterparty signed yesterday. You're the last signature.",
    cta: "Sign now",
    due: "Due today",
  },
  {
    id: "f2",
    title: "Extend — Brand Assets transfer",
    reason: "Link expires in 12 hours. One recipient hasn't downloaded.",
    cta: "Extend by 3 days",
    due: "Expires in 12h",
  },
  {
    id: "f3",
    title: "Review — Helios redlines",
    reason: "Legal returned 3 redlines. Approve to move to signing.",
    cta: "Open review",
  },
];

/**
 * Focus Mode — Execution view.
 * Renders in place of the standard dashboard when Focus Mode is on.
 * Centered, generous spacing, one action at a time.
 */
export function FocusExecution() {
  const { completedIds, markComplete, exitFocus } = useFocusMode();

  const remaining = useMemo(
    () => focusQueue.filter((i) => !completedIds.has(i.id)),
    [completedIds]
  );
  const current = remaining[0];
  const total = focusQueue.length;
  const completedCount = completedIds.size;
  const allDone = completedCount === total;

  return (
    <motion.div
      key="focus-execution"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="relative min-h-[calc(100vh-2rem)]"
    >
      {/* Ambient gradient */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{
          background: [
            "radial-gradient(60% 50% at 30% 20%, hsl(var(--primary)/0.05), transparent 70%)",
            "radial-gradient(60% 50% at 70% 80%, hsl(var(--primary)/0.05), transparent 70%)",
            "radial-gradient(60% 50% at 30% 20%, hsl(var(--primary)/0.05), transparent 70%)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Session header */}
      <div className="relative z-10 flex items-center justify-between pt-6">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_hsl(var(--success))]"
          />
          Focus session
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">
          {completedCount} of {total} completed
        </span>
      </div>

      {/* Hairline progress */}
      <div className="relative z-10 mt-3 h-px bg-border/40 overflow-hidden">
        <motion.div
          className="h-full bg-foreground/70"
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / total) * 100}%` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Center stage */}
      <div className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {allDone ? (
              <AllDoneCard key="done" onExit={exitFocus} />
            ) : current ? (
              <FocusCard
                key={current.id}
                item={current}
                index={completedCount}
                total={total}
                onComplete={() => markComplete(current.id)}
                onSkip={() => markComplete(current.id)}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function FocusCard({
  item,
  index,
  total,
  onComplete,
  onSkip,
}: {
  item: FocusItem;
  index: number;
  total: number;
  onComplete: () => void;
  onSkip: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
        Action {index + 1} of {total}
      </p>

      <h2 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight leading-tight">
        {item.title}
      </h2>

      <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
        {item.reason}
      </p>

      {item.due && (
        <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground/80">
          <Clock className="w-3 h-3" strokeWidth={1.75} />
          {item.due}
        </div>
      )}

      <div className="mt-10 flex items-center justify-center gap-3">
        <motion.button
          type="button"
          onClick={onComplete}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "inline-flex items-center gap-2",
            "px-6 py-3 rounded-full text-sm font-medium",
            "bg-foreground text-background hover:bg-foreground/90 transition-colors"
          )}
        >
          {item.cta}
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
        <button
          type="button"
          onClick={onSkip}
          className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>
    </motion.div>
  );
}

function AllDoneCard({ onExit }: { onExit: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto w-14 h-14 rounded-full border border-success/30 bg-success/10 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-6 h-6 text-success" strokeWidth={1.75} />
      </motion.div>

      <h2 className="text-3xl font-semibold text-foreground tracking-tight">
        You're all caught up
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        Nothing else needs you right now.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          Exit Focus
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Suggest next
        </button>
      </div>
    </motion.div>
  );
}