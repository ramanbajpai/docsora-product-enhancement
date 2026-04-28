import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Clock, Send, PenTool, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Docsora Autopilot
 * Three living panels: time saved, workflow in motion, data movement.
 */

export function DocsoraAutopilot() {
  return (
    <motion.section
      aria-label="Docsora Autopilot"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="mt-16"
    >
      {/* Header */}
      <div className="mb-6 px-1 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_hsl(var(--success))]"
            />
            <span className="font-hint text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Autopilot
            </span>
          </div>
          <h2 className="text-xl font-semibold text-foreground tracking-tight">
            Docsora is working for you
          </h2>
        </div>
        <span className="text-[11px] text-muted-foreground/70 hidden sm:block shrink-0">
          Live · updates as actions complete
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <TimeSavedPanel />
        <WorkflowPanel />
        <DataMovementPanel />
      </div>

      <div className="mt-4 px-1 flex items-center gap-2 text-[11px] text-muted-foreground/70">
        <Leaf className="w-3 h-3" strokeWidth={1.75} />
        <span>~18 kg CO₂ avoided this month vs. printed equivalent</span>
      </div>
    </motion.section>
  );
}

/* ───────────── Shared shell ───────────── */

function PanelShell({
  children,
  onClick,
  ariaLabel,
  onHoverChange,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  onHoverChange?: (h: boolean) => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "group relative text-left rounded-2xl overflow-hidden",
        "border border-border/50 bg-surface-1/40 backdrop-blur-sm",
        "p-5 min-h-[220px] flex flex-col",
        "hover:border-border hover:bg-surface-1/70 transition-colors",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_70%)]" />
      {children}
    </motion.button>
  );
}

function PanelHeader({ icon: Icon, label }: { icon: typeof Clock; label: string }) {
  return (
    <div className="flex items-center gap-2 relative z-10">
      <Icon className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.75} />
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ───────────── 1. Time saved ───────────── */

function TimeSavedPanel() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const targetMinutes = 134;
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setMinutes(Math.round(eased * targetMinutes));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return (
    <PanelShell
      ariaLabel="Time saved by Autopilot"
      onClick={() => navigate("/track")}
      onHoverChange={setHovered}
    >
      <PanelHeader icon={Sparkles} label="Time saved" />

      {/* Ambient rising lines */}
      <div className="absolute inset-x-0 bottom-0 h-24 overflow-hidden pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-px bg-gradient-to-t from-primary/30 via-primary/10 to-transparent"
            style={{ left: `${15 + i * 17}%`, height: "100%" }}
            animate={{ y: ["100%", "-10%"], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mt-5 flex-1">
        <p className="text-3xl font-semibold text-foreground tabular-nums leading-none">
          +{h}h {m.toString().padStart(2, "0")}m
        </p>
        <p className="mt-2 text-xs text-muted-foreground">saved this week</p>
      </div>

      <div className="relative z-10 mt-4 min-h-[32px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key="hover"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <p className="text-[11px] text-muted-foreground/80">
                Auto-reminder sent · Acme MSA · 2h ago
              </p>
              <p className="text-[11px] text-muted-foreground/80">
                Auto-routed for review · Helios · 5h ago
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-muted-foreground/80"
            >
              3 follow-ups handled automatically today
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </PanelShell>
  );
}

/* ───────────── 2. Workflow pipeline ───────────── */

type StepState = "done" | "active" | "pending";
const workflowSteps: { label: string; state: StepState }[] = [
  { label: "Drafted", state: "done" },
  { label: "Sent", state: "done" },
  { label: "Viewed", state: "done" },
  { label: "Signing", state: "active" },
  { label: "Complete", state: "pending" },
];

function WorkflowPanel() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <PanelShell
      ariaLabel="Workflow progression"
      onClick={() => navigate("/track")}
      onHoverChange={setHovered}
    >
      <PanelHeader icon={PenTool} label="Work in motion" />

      <div className="relative z-10 mt-5">
        <p className="text-sm text-foreground/90 font-medium">
          Work moving through Docsora
        </p>
      </div>

      <div className="relative z-10 px-1 mt-6 flex-1">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-px bg-border/60" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.75 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
            style={{ transformOrigin: "left", width: "calc(100% - 1rem)" }}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-primary/70 via-primary to-primary/40"
          />
          {workflowSteps.map((step, i) => (
            <PipelineNode key={step.label} step={step} index={i} />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/70">
          {workflowSteps.map((s) => (
            <span key={s.label} className="text-center" style={{ width: 40 }}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-4 min-h-[16px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.p
              key="hover"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-[11px] text-muted-foreground/80"
            >
              Last completion · Pitch Deck · 18m ago
            </motion.p>
          ) : (
            <motion.p
              key="d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-muted-foreground/80"
            >
              3 completed today · 1 awaiting signature
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </PanelShell>
  );
}

function PipelineNode({
  step,
  index,
}: {
  step: { label: string; state: StepState };
  index: number;
}) {
  const isDone = step.state === "done";
  const isActive = step.state === "active";

  return (
    <div className="relative flex items-center justify-center" style={{ width: 40 }}>
      {isActive && (
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-3 h-3 rounded-full border border-primary/50"
        />
      )}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.12 }}
        className={cn(
          "relative w-2.5 h-2.5 rounded-full ring-2 ring-background",
          isDone && "bg-success shadow-[0_0_10px_hsl(var(--success)/0.5)]",
          isActive && "bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]",
          !isDone && !isActive && "bg-muted-foreground/30"
        )}
      />
    </div>
  );
}

/* ───────────── 3. Data movement ───────────── */

function DataMovementPanel() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <PanelShell
      ariaLabel="Data movement"
      onClick={() => navigate("/transfer")}
      onHoverChange={setHovered}
    >
      <PanelHeader icon={Send} label="Data movement" />

      <svg
        className="absolute inset-x-0 top-14 bottom-20 w-full pointer-events-none opacity-80"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="autopilot-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[
          { y: 30, dur: 5, delay: 0 },
          { y: 55, dur: 6.5, delay: 1.2 },
          { y: 80, dur: 5.8, delay: 2.4 },
        ].map((line, i) => (
          <g key={i}>
            <line
              x1="5"
              y1={line.y}
              x2="95"
              y2={line.y}
              stroke="hsl(var(--border))"
              strokeOpacity="0.4"
              strokeWidth="0.15"
              vectorEffect="non-scaling-stroke"
            />
            <motion.line
              x1="5"
              y1={line.y}
              x2="95"
              y2={line.y}
              stroke="url(#autopilot-flow)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="6 94"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: line.dur,
                repeat: Infinity,
                ease: "linear",
                delay: line.delay,
              }}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mt-5 flex-1">
        <p className="text-3xl font-semibold text-foreground tabular-nums leading-none">
          12 GB
        </p>
        <p className="mt-2 text-xs text-muted-foreground">transferred today</p>
      </div>

      <div className="relative z-10 mt-4 min-h-[32px]">
        <AnimatePresence mode="wait">
          {hovered ? (
            <motion.div
              key="hover"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="space-y-1"
            >
              <p className="text-[11px] text-muted-foreground/80">
                Q4 Report · 3 recipients · 22m ago
              </p>
              <p className="text-[11px] text-muted-foreground/80">
                Media.zip · 1 recipient · 1h ago
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-muted-foreground/80"
            >
              42% average compression · 4 transfers
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </PanelShell>
  );
}
