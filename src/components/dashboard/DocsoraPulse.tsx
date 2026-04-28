import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Download, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type PulseEventKind = "signature" | "download" | "conversion";

interface PulseEvent {
  id: number;
  kind: PulseEventKind;
  label: string;
  x: number; // 0-100 horizontal anchor
}

const eventLibrary: Omit<PulseEvent, "id" | "x">[] = [
  { kind: "signature", label: "Signature completed" },
  { kind: "download", label: "File downloaded" },
  { kind: "conversion", label: "Conversion finished" },
  { kind: "signature", label: "Document signed" },
  { kind: "download", label: "Transfer received" },
];

const eventConfig: Record<
  PulseEventKind,
  { icon: typeof CheckCircle2; color: string }
> = {
  signature: { icon: CheckCircle2, color: "text-success" },
  download: { icon: Download, color: "text-primary" },
  conversion: { icon: Sparkles, color: "text-warning" },
};

export function DocsoraPulse() {
  const [events, setEvents] = useState<PulseEvent[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const schedule = () => {
      // Random interval between 6s and 14s — feels alive but never noisy
      const delay = 6000 + Math.random() * 8000;
      timeout = setTimeout(() => {
        const template =
          eventLibrary[Math.floor(Math.random() * eventLibrary.length)];
        const newEvent: PulseEvent = {
          ...template,
          id: ++idRef.current,
          x: 15 + Math.random() * 70,
        };
        setEvents((prev) => [...prev, newEvent]);

        // Auto-clean after the pulse animation completes
        setTimeout(() => {
          setEvents((prev) => prev.filter((e) => e.id !== newEvent.id));
        }, 4200);

        schedule();
      }, delay);
    };

    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative mt-16 h-32 w-full overflow-hidden pointer-events-none select-none"
    >
      {/* Soft horizon gradient — the "ground" of the system */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/[0.025] to-transparent" />

      {/* Flowing ambient lines */}
      <FlowLine delay={0} duration={18} y={70} opacity={0.06} />
      <FlowLine delay={4} duration={22} y={55} opacity={0.04} />
      <FlowLine delay={9} duration={20} y={85} opacity={0.05} />

      {/* Drifting particles */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Event-driven pulses */}
      <AnimatePresence>
        {events.map((event) => (
          <PulseRipple key={event.id} event={event} />
        ))}
      </AnimatePresence>
    </div>
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
      className="absolute h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
    />
  );
}

function Particle({ index }: { index: number }) {
  const left = (index * 17 + 8) % 100;
  const duration = 14 + (index % 4) * 3;
  const delay = index * 2.3;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: [-10, -60, -10],
        opacity: [0, 0.4, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ left: `${left}%`, bottom: "10%" }}
      className="absolute w-1 h-1 rounded-full bg-primary/40"
    />
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
      style={{ left: `${event.x}%`, bottom: "20%" }}
      className="absolute -translate-x-1/2"
    >
      {/* Concentric ripple rings */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 2.8, delay, ease: "easeOut" }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "w-8 h-8 rounded-full border",
            event.kind === "signature" && "border-success/30",
            event.kind === "download" && "border-primary/30",
            event.kind === "conversion" && "border-warning/30"
          )}
        />
      ))}

      {/* Soft glow core */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.4, 1], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.4, ease: "easeOut" }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-12 h-12 rounded-full blur-xl",
          event.kind === "signature" && "bg-success/40",
          event.kind === "download" && "bg-primary/40",
          event.kind === "conversion" && "bg-warning/40"
        )}
      />

      {/* Whisper label — appears briefly, then fades */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: [0, 0.7, 0.7, 0], y: [4, 0, 0, -2] }}
        transition={{ duration: 3.6, times: [0, 0.15, 0.7, 1], ease: "easeOut" }}
        className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-1/60 backdrop-blur-sm border border-border/40"
      >
        <Icon className={cn("w-3 h-3", cfg.color)} />
        <span className="text-[10px] font-medium text-muted-foreground tracking-wide">
          {event.label}
        </span>
      </motion.div>
    </motion.div>
  );
}
