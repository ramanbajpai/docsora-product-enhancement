import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Sparkles,
  FileText,
  Send,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

type PulseEventKind =
  | "signature"
  | "download"
  | "conversion"
  | "transfer"
  | "ai";

interface PulseEvent {
  id: number;
  kind: PulseEventKind;
  label: string;
  x: number; // 0-100 horizontal anchor
  y: number; // 0-100 vertical anchor
}

const eventLibrary: Omit<PulseEvent, "id" | "x" | "y">[] = [
  { kind: "signature", label: "Signature completed" },
  { kind: "download", label: "File downloaded" },
  { kind: "conversion", label: "Conversion finished" },
  { kind: "transfer", label: "Transfer delivered" },
  { kind: "ai", label: "AI review complete" },
  { kind: "signature", label: "Contract signed" },
  { kind: "download", label: "Recipient opened file" },
];

const eventConfig: Record<
  PulseEventKind,
  { icon: typeof CheckCircle2; color: string; ring: string; glow: string }
> = {
  signature: {
    icon: CheckCircle2,
    color: "text-success",
    ring: "border-success/40",
    glow: "bg-success/40",
  },
  download: {
    icon: Download,
    color: "text-primary",
    ring: "border-primary/40",
    glow: "bg-primary/40",
  },
  conversion: {
    icon: Sparkles,
    color: "text-warning",
    ring: "border-warning/40",
    glow: "bg-warning/40",
  },
  transfer: {
    icon: Send,
    color: "text-primary",
    ring: "border-primary/40",
    glow: "bg-primary/40",
  },
  ai: {
    icon: FileText,
    color: "text-warning",
    ring: "border-warning/40",
    glow: "bg-warning/40",
  },
};

export function DocsoraPulse() {
  const [events, setEvents] = useState<PulseEvent[]>([]);
  const [tickCount, setTickCount] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      // More frequent — feels alive and busy without being noisy
      const delay = 2200 + Math.random() * 3800;
      timeout = setTimeout(() => {
        const template =
          eventLibrary[Math.floor(Math.random() * eventLibrary.length)];
        const newEvent: PulseEvent = {
          ...template,
          id: ++idRef.current,
          x: 8 + Math.random() * 84,
          y: 25 + Math.random() * 50,
        };
        setEvents((prev) => [...prev, newEvent]);
        setTickCount((c) => c + 1);

        // Auto-clean after the pulse animation completes
        setTimeout(() => {
          setEvents((prev) => prev.filter((e) => e.id !== newEvent.id));
        }, 4600);

        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  const constellation = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        x: (i * 37 + 11) % 100,
        y: ((i * 53 + 19) % 70) + 15,
        delay: (i % 7) * 0.4,
        size: i % 5 === 0 ? 1.5 : 1,
      })),
    []
  );

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="relative mt-16 h-72 w-full overflow-hidden pointer-events-none select-none"
    >
      {/* Top hairline — the "horizon" entering the system */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      {/* Atmospheric depth gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.015] to-primary/[0.04]" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.06),transparent_70%)]" />

      {/* Animated SVG wave field — the "breath" of the system */}
      <WaveField />

      {/* Faint constellation grid — fixed reference points */}
      {constellation.map((p, i) => (
        <ConstellationDot key={i} {...p} />
      ))}

      {/* Flowing ambient lines */}
      <FlowLine delay={0} duration={16} y={35} opacity={0.07} />
      <FlowLine delay={3} duration={22} y={55} opacity={0.05} />
      <FlowLine delay={7} duration={19} y={70} opacity={0.06} />
      <FlowLine delay={11} duration={24} y={85} opacity={0.04} />

      {/* Drifting particles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Event-driven pulses */}
      <AnimatePresence>
        {events.map((event) => (
          <PulseRipple key={event.id} event={event} />
        ))}
      </AnimatePresence>

      {/* Live system status — bottom-left */}
      <SystemStatusBar tickCount={tickCount} />
    </motion.div>
  );
}

function FlowLine({
  delay,
  duration,
  y,
  opacity,
}: {
  delay: number;
  duration: number;
  y: number;
  opacity: number;
}) {
  return (
    <motion.div
      initial={{ x: "-30%" }}
      animate={{ x: "130%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ top: `${y}%`, opacity }}
      className="absolute h-px w-2/5 bg-gradient-to-r from-transparent via-primary to-transparent"
    />
  );
}

function Particle({ index }: { index: number }) {
  const left = (index * 13 + 5) % 100;
  const duration = 12 + (index % 5) * 2.5;
  const delay = index * 1.4;
  const size = index % 4 === 0 ? "w-1.5 h-1.5" : "w-1 h-1";

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{
        y: [-20, -160, -20],
        opacity: [0, 0.5, 0],
        x: [0, index % 2 === 0 ? 8 : -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ left: `${left}%`, bottom: "5%" }}
      className={cn(
        "absolute rounded-full bg-primary/50 shadow-[0_0_8px_hsl(var(--primary)/0.5)]",
        size
      )}
    />
  );
}

function ConstellationDot({
  x,
  y,
  delay,
  size,
}: {
  x: number;
  y: number;
  delay: number;
  size: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.1, 0.35, 0.1] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size * 2}px`,
        height: `${size * 2}px`,
      }}
      className="absolute rounded-full bg-primary/60"
    />
  );
}

function WaveField() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 w-full h-full"
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.path
        d="M0,120 Q300,80 600,120 T1200,120"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="1"
        opacity="0.4"
        animate={{
          d: [
            "M0,120 Q300,80 600,120 T1200,120",
            "M0,120 Q300,150 600,110 T1200,130",
            "M0,120 Q300,80 600,120 T1200,120",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,150 Q400,110 800,150 T1600,150"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="1"
        opacity="0.25"
        animate={{
          d: [
            "M0,150 Q400,110 800,150 T1600,150",
            "M0,150 Q400,180 800,140 T1600,160",
            "M0,150 Q400,110 800,150 T1600,150",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M0,170 Q200,140 500,170 T1200,170"
        fill="none"
        stroke="url(#waveGradient)"
        strokeWidth="0.8"
        opacity="0.2"
        animate={{
          d: [
            "M0,170 Q200,140 500,170 T1200,170",
            "M0,170 Q200,190 500,160 T1200,180",
            "M0,170 Q200,140 500,170 T1200,170",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

function SystemStatusBar({ tickCount }: { tickCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-1/40 backdrop-blur-md border border-border/30"
    >
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_hsl(var(--success))]"
      />
      <Activity className="w-3 h-3 text-muted-foreground/70" />
      <span className="text-[10px] font-medium tracking-wider text-muted-foreground/70 uppercase">
        Docsora Pulse
      </span>
      <span className="text-[10px] text-muted-foreground/40">·</span>
      <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums">
        {tickCount.toString().padStart(3, "0")} events
      </span>
    </motion.div>
  );
}

function PulseRipple({ event }: { event: PulseEvent }) {
  const cfg = eventConfig[event.kind];
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ left: `${event.x}%`, top: `${event.y}%` }}
      className="absolute -translate-x-1/2"
    >
      {/* Concentric ripple rings */}
      {[0, 0.5, 1, 1.5].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 3, delay, ease: "easeOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-10 h-10 rounded-full border",
            cfg.ring
          )}
        />
      ))}

      {/* Soft glow core */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.8, 1.2], opacity: [0, 0.7, 0] }}
        transition={{ duration: 2.6, ease: "easeOut" }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-16 h-16 rounded-full blur-xl",
          cfg.glow
        )}
      />

      {/* Center icon — bright moment of focus */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1, 0.8], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-6 h-6 rounded-full bg-surface-1/90 backdrop-blur-sm border border-border/50",
          "flex items-center justify-center shadow-lg"
        )}
      >
        <Icon className={cn("w-3 h-3", cfg.color)} />
      </motion.div>

      {/* Whisper label — appears briefly, then fades */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0, 0.85, 0.85, 0], y: [8, 18, 18, 14] }}
        transition={{ duration: 4, times: [0, 0.2, 0.75, 1], ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 mt-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-1/70 backdrop-blur-md border border-border/40 whitespace-nowrap"
      >
        <span className="text-[10px] font-medium text-muted-foreground tracking-wide">
          {event.label}
        </span>
      </motion.div>
    </motion.div>
  );
}
