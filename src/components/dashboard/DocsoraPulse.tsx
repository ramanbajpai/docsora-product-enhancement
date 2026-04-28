import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  PenTool,
  Send,
  Sparkles,
  Download,
  AlertTriangle,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Docsora Pulse
 *
 * Ambient operational intelligence layer.
 * Each node = a real workflow moving through the platform.
 * Lines = flow paths between workflow stages.
 * Pulses = state transitions (sent / viewed / completed / at-risk).
 */

type NodeState = "active" | "completed" | "at_risk";
type WorkflowKind = "sign" | "transfer" | "ai_check" | "convert";

interface WorkflowNode {
  id: string;
  name: string;
  kind: WorkflowKind;
  state: NodeState;
  status: string;
  next?: string;
  // Position on a 0-100 normalized canvas
  x: number;
  y: number;
  // For animated entry
  bornAt: number;
}

const kindConfig: Record<
  WorkflowKind,
  { icon: typeof PenTool; label: string }
> = {
  sign: { icon: PenTool, label: "Signature" },
  transfer: { icon: Send, label: "Transfer" },
  ai_check: { icon: Sparkles, label: "AI Check" },
  convert: { icon: Download, label: "Conversion" },
};

const stateConfig: Record<
  NodeState,
  {
    core: string;
    glow: string;
    ring: string;
    text: string;
    label: string;
    Icon: typeof CheckCircle2;
  }
> = {
  active: {
    core: "bg-primary",
    glow: "shadow-[0_0_24px_hsl(var(--primary)/0.55)]",
    ring: "border-primary/40",
    text: "text-primary",
    label: "In progress",
    Icon: Activity,
  },
  completed: {
    core: "bg-success",
    glow: "shadow-[0_0_24px_hsl(var(--success)/0.55)]",
    ring: "border-success/40",
    text: "text-success",
    label: "Completed",
    Icon: CheckCircle2,
  },
  at_risk: {
    core: "bg-warning",
    glow: "shadow-[0_0_28px_hsl(var(--warning)/0.6)]",
    ring: "border-warning/40",
    text: "text-warning",
    label: "Needs attention",
    Icon: AlertTriangle,
  },
};

const seedNodes: WorkflowNode[] = [
  {
    id: "n1",
    name: "NDA — Acme Corp",
    kind: "sign",
    state: "active",
    status: "Awaiting signature from Sarah",
    next: "Send reminder",
    x: 14,
    y: 58,
    bornAt: 0,
  },
  {
    id: "n2",
    name: "Q4 Report.pdf",
    kind: "transfer",
    state: "active",
    status: "Delivered to 3 recipients",
    next: "View receipts",
    x: 30,
    y: 38,
    bornAt: 0,
  },
  {
    id: "n3",
    name: "Contract_v2.docx",
    kind: "ai_check",
    state: "active",
    status: "Reviewing 12 clauses",
    next: "Open results",
    x: 48,
    y: 62,
    bornAt: 0,
  },
  {
    id: "n4",
    name: "Pitch Deck.pdf",
    kind: "sign",
    state: "completed",
    status: "Signed by all parties",
    next: "Download",
    x: 64,
    y: 42,
    bornAt: 0,
  },
  {
    id: "n5",
    name: "Partnership Agreement",
    kind: "sign",
    state: "at_risk",
    status: "Expires in 36 hours",
    next: "Follow up",
    x: 80,
    y: 56,
    bornAt: 0,
  },
];

// Routes per workflow kind
const kindRoute: Record<WorkflowKind, string> = {
  sign: "/track?tab=sign",
  transfer: "/track",
  ai_check: "/ai-check",
  convert: "/convert",
};

const eventNames = [
  "Financial Report.pdf",
  "Service Agreement",
  "Media.zip",
  "Onboarding Doc",
  "Vendor MSA",
  "Invoice 2041",
  "Q1 Forecast",
];

function makeNode(now: number): WorkflowNode {
  const kinds: WorkflowKind[] = ["sign", "transfer", "ai_check", "convert"];
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  const stateRoll = Math.random();
  const state: NodeState =
    stateRoll < 0.15 ? "at_risk" : stateRoll < 0.45 ? "completed" : "active";
  const name = eventNames[Math.floor(Math.random() * eventNames.length)];
  return {
    id: `n-${now}-${Math.random().toString(36).slice(2, 7)}`,
    name,
    kind,
    state,
    status:
      state === "active"
        ? "Moving through workflow"
        : state === "completed"
        ? "Just completed"
        : "Needs your attention",
    next:
      state === "completed"
        ? "View"
        : state === "at_risk"
        ? "Resolve"
        : "Continue",
    x: 8 + Math.random() * 84,
    y: 28 + Math.random() * 50,
    bornAt: now,
  };
}

export function DocsoraPulse() {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<WorkflowNode[]>(seedNodes);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sweepKey, setSweepKey] = useState(0);

  // Lifecycle: occasionally birth new nodes, retire old ones, trigger sweep
  useEffect(() => {
    const birth = setInterval(() => {
      setNodes((prev) => {
        const next = [...prev, makeNode(Date.now())];
        // Keep canvas calm — never more than 8 nodes
        if (next.length > 8) next.shift();
        return next;
      });
    }, 7000);

    const sweep = setInterval(() => {
      setSweepKey((k) => k + 1);
    }, 11000);

    return () => {
      clearInterval(birth);
      clearInterval(sweep);
    };
  }, []);

  // Build flow connections — each node connects to its nearest neighbor (right-ward)
  const connections = useMemo(() => {
    const sorted = [...nodes].sort((a, b) => a.x - b.x);
    const lines: { from: WorkflowNode; to: WorkflowNode }[] = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      lines.push({ from: sorted[i], to: sorted[i + 1] });
    }
    return lines;
  }, [nodes]);

  const activeCount = nodes.filter((n) => n.state === "active").length;
  const atRiskCount = nodes.filter((n) => n.state === "at_risk").length;

  return (
    <motion.section
      aria-label="Docsora Pulse — live workflow activity"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4 }}
      className="relative mt-16"
    >
      {/* Section header — minimal, enterprise tone */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_6px_hsl(var(--success))]"
          />
          <span className="font-hint text-xs text-muted-foreground tracking-wider uppercase">
            Docsora Pulse
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70 tabular-nums">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {activeCount} active
          </span>
          {atRiskCount > 0 && (
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" />
              {atRiskCount} at risk
            </span>
          )}
        </div>
      </div>

      {/* The Pulse canvas */}
      <div
        className={cn(
          "relative h-80 w-full overflow-hidden rounded-2xl",
          "border border-border/40",
          "bg-[radial-gradient(ellipse_at_50%_120%,hsl(var(--primary)/0.08),transparent_60%)]",
          "bg-surface-1/30 backdrop-blur-sm"
        )}
      >
        {/* Atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/40" />

        {/* Subtle grid — gives the sense of a "system space" */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Flow paths between nodes — SVG layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="flowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sweepGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Connection paths — soft Bezier curves between nodes */}
          {connections.map((c, i) => {
            const midX = (c.from.x + c.to.x) / 2;
            const offset = (i % 2 === 0 ? -1 : 1) * 8;
            const path = `M ${c.from.x} ${c.from.y} Q ${midX} ${
              (c.from.y + c.to.y) / 2 + offset
            } ${c.to.x} ${c.to.y}`;
            return (
              <g key={`${c.from.id}-${c.to.id}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.18"
                  strokeOpacity="0.6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  vectorEffect="non-scaling-stroke"
                />
                {/* Animated traveling glow along the path */}
                <motion.path
                  d={path}
                  fill="none"
                  stroke="url(#flowGradient)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeDasharray="4 96"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 6 + (i % 3),
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.8,
                  }}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

          {/* Cinematic light sweep — fires periodically (AI Check completed) */}
          <motion.rect
            key={sweepKey}
            x="-30"
            y="0"
            width="40"
            height="100"
            fill="url(#sweepGradient)"
            opacity="0.25"
            initial={{ x: -40 }}
            animate={{ x: 130 }}
            transition={{ duration: 3.2, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>

        {/* Workflow nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <PulseNode
              key={node.id}
              node={node}
              isHovered={hoveredId === node.id}
              onHover={setHoveredId}
              onClick={() => navigate(kindRoute[node.kind])}
            />
          ))}
        </AnimatePresence>

        {/* Bottom hairline — the horizon */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>

      {/* Whisper caption beneath the canvas */}
      <p className="mt-3 px-1 text-[11px] text-muted-foreground/60 tracking-wide">
        Live workflow activity — hover any node to inspect, click to open.
      </p>
    </motion.section>
  );
}

function PulseNode({
  node,
  isHovered,
  onHover,
  onClick,
}: {
  node: WorkflowNode;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
}) {
  const sCfg = stateConfig[node.state];
  const kCfg = kindConfig[node.kind];
  const KindIcon = kCfg.icon;

  // At-risk nodes pulse continuously; others pulse occasionally
  const breathe = node.state === "at_risk" ? 1.6 : 3.2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.4 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      {/* Outer breathing halo */}
      <motion.div
        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: breathe, repeat: Infinity, ease: "easeInOut" }}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-8 h-8 rounded-full border",
          sCfg.ring
        )}
      />

      {/* Core node */}
      <motion.div
        animate={{
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "relative w-3 h-3 rounded-full",
          sCfg.core,
          sCfg.glow,
          "ring-2 ring-background/60"
        )}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-3",
              "min-w-[200px] max-w-[260px]",
              "rounded-xl border border-border/50 bg-surface-1/95 backdrop-blur-md shadow-xl",
              "p-3 z-10"
            )}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded-md bg-surface-2 flex items-center justify-center">
                <KindIcon className="w-3 h-3 text-muted-foreground" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-medium">
                {kCfg.label}
              </span>
              <span className={cn("ml-auto flex items-center gap-1 text-[10px]", sCfg.text)}>
                <sCfg.Icon className="w-2.5 h-2.5" />
                {sCfg.label}
              </span>
            </div>

            <p className="text-sm font-medium text-foreground truncate">
              {node.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">
              {node.status}
            </p>

            {node.next && (
              <div className="mt-2 pt-2 border-t border-border/40 flex items-center gap-1.5 text-[11px] text-primary/90">
                <Eye className="w-3 h-3" />
                <span>{node.next}</span>
              </div>
            )}

            {/* Tooltip pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 rotate-45 bg-surface-1/95 border-r border-b border-border/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
