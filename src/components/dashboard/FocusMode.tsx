import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Focus, Sparkles, ArrowRight, X, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Focus Mode
 *
 * A premium, distraction-free working state.
 * Entry: a single calm CTA on the dashboard.
 * Active: full-screen overlay walking through 1–3 most important actions.
 */

interface FocusItem {
  id: string;
  title: string;
  context: string;
  cta: string;
  due?: string;
}

const focusQueue: FocusItem[] = [
  {
    id: "f1",
    title: "Sign — Acme MSA",
    context: "Counterparty signed yesterday. You're the last signature.",
    cta: "Sign now",
    due: "Due today",
  },
  {
    id: "f2",
    title: "Extend — Brand Assets transfer",
    context: "Link expires in 12 hours. One recipient hasn't downloaded.",
    cta: "Extend by 3 days",
    due: "Expires in 12h",
  },
  {
    id: "f3",
    title: "Review — Helios redlines",
    context: "Legal returned 3 redlines. Approve to move to signing.",
    cta: "Open review",
  },
];

export function FocusMode() {
  const [active, setActive] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [exited, setExited] = useState(false);

  const remaining = useMemo(
    () => focusQueue.filter((i) => !completedIds.has(i.id)),
    [completedIds]
  );
  const current = remaining[0];
  const total = focusQueue.length;
  const completedCount = completedIds.size;
  const allDone = completedCount === total;

  // Lock body scroll when active
  useEffect(() => {
    if (active) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [active]);

  // Esc to exit
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleExit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleStart = () => {
    setCompletedIds(new Set());
    setExited(false);
    setActive(true);
  };

  const handleExit = () => {
    setActive(false);
    setExited(false);
  };

  const handleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      // If that was the last one, show "all done" state briefly before auto-exit
      if (next.size === total) {
        setExited(true);
      }
      return next;
    });
  };

  return (
    <>
      {/* Entry CTA — calm, single button */}
      <motion.section
        aria-label="Focus Mode"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40 backdrop-blur-sm p-5 sm:p-6 flex items-center justify-between gap-4">
          {/* Subtle ambient gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--primary)/0.06),transparent_60%)]" />

          <div className="relative z-10 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Focus className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.75} />
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
                Focus Mode
              </span>
            </div>
            <p className="text-[15px] text-foreground font-medium">
              Clear your priority actions in a calm, distraction-free space.
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {focusQueue.length} action{focusQueue.length !== 1 ? "s" : ""} ready ·
              estimated 4 minutes
            </p>
          </div>

          <motion.button
            type="button"
            onClick={handleStart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "relative z-10 shrink-0 inline-flex items-center gap-2",
              "px-4 py-2 rounded-full text-sm font-medium",
              "bg-foreground text-background",
              "hover:bg-foreground/90 transition-colors"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Focus
          </motion.button>
        </div>
      </motion.section>

      {/* Full-screen Focus overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="focus-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl"
          >
            {/* Slow ambient gradient */}
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  "radial-gradient(60% 50% at 30% 20%, hsl(var(--primary)/0.06), transparent 70%)",
                  "radial-gradient(60% 50% at 70% 80%, hsl(var(--primary)/0.06), transparent 70%)",
                  "radial-gradient(60% 50% at 30% 20%, hsl(var(--primary)/0.06), transparent 70%)",
                ],
              }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 flex items-center justify-between px-6 py-5 z-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_hsl(var(--success))]"
                />
                Focus session active
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground tabular-nums">
                  {completedCount} of {total} completed
                </span>
                <button
                  onClick={handleExit}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Exit
                </button>
              </div>
            </div>

            {/* Progress hairline */}
            <div className="absolute top-[60px] inset-x-0 h-px bg-border/40">
              <motion.div
                className="h-full bg-primary/70"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / total) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Center stage */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="w-full max-w-xl">
                <AnimatePresence mode="wait">
                  {exited && allDone ? (
                    <AllDoneCard key="done" onClose={handleExit} />
                  ) : current ? (
                    <FocusCard
                      key={current.id}
                      item={current}
                      index={completedCount}
                      total={total}
                      onComplete={() => handleComplete(current.id)}
                      onSkip={() => handleComplete(current.id)}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ───────────── Focus card ───────────── */

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
        {item.context}
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

/* ───────────── Done state ───────────── */

function AllDoneCard({ onClose }: { onClose: () => void }) {
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
        All done
      </h2>
      <p className="mt-3 text-base text-muted-foreground">
        You're clear for now.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border/60 text-foreground hover:bg-surface-2 transition-colors"
      >
        Exit Focus
      </button>
    </motion.div>
  );
}
