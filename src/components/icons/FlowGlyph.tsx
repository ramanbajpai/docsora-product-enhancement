import { motion } from "framer-motion";
import { useId } from "react";

interface FlowGlyphProps {
  className?: string;
  /** Whether to play the hover animation (typically true when parent is hovered). */
  active?: boolean;
}

/**
 * FlowGlyph — glassmorphic mark for a saved flow.
 *
 * Three nodes converging into one. Frosted, translucent surfaces with a soft
 * top-light highlight and a gentle pulse + bloom on hover.
 */
export function FlowGlyph({ className = "w-7 h-7", active = false }: FlowGlyphProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const coreGrad = `fg-core-${uid}`;
  const nodeGrad = `fg-node-${uid}`;
  const bloom = `fg-bloom-${uid}`;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Frosted core — bright top-left highlight fading into translucent body */}
        <radialGradient id={coreGrad} cx="35%" cy="28%" r="80%">
          <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity={0.95} />
          <stop offset="35%" stopColor="hsl(var(--primary))" stopOpacity={0.85} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
        </radialGradient>
        {/* Smaller node glass */}
        <radialGradient id={nodeGrad} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity={0.85} />
          <stop offset="40%" stopColor="hsl(var(--primary))" stopOpacity={0.75} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
        </radialGradient>
        {/* Outer bloom for hover */}
        <radialGradient id={bloom} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Hover bloom behind the core */}
      <motion.circle
        cx={16}
        cy={12}
        r={7}
        fill={`url(#${bloom})`}
        initial={false}
        animate={active ? { opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] } : { opacity: 0.2, scale: 0.9 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 12px" }}
      />

      {/* Connection lines: two nodes on the left converge into one on the right */}
      <g
        stroke="hsl(var(--primary))"
        strokeWidth={1.25}
        strokeLinecap="round"
        fill="none"
        opacity={0.5}
      >
        <path d="M6 7 L16 12" />
        <path d="M6 17 L16 12" />
      </g>

      {/* Left glass nodes — translucent halo, frosted body, tiny specular highlight */}
      {[
        { cx: 6, cy: 7 },
        { cx: 6, cy: 17 },
      ].map((n) => (
        <g key={`${n.cx}-${n.cy}`}>
          <circle cx={n.cx} cy={n.cy} r={2.6} fill="hsl(var(--primary))" fillOpacity={0.12} />
          <circle
            cx={n.cx}
            cy={n.cy}
            r={1.9}
            fill={`url(#${nodeGrad})`}
            stroke="hsl(var(--primary))"
            strokeOpacity={0.35}
            strokeWidth={0.4}
          />
          <circle
            cx={n.cx - 0.5}
            cy={n.cy - 0.6}
            r={0.45}
            fill="hsl(var(--primary-foreground))"
            fillOpacity={0.85}
          />
        </g>
      ))}

      {/* Glass core with breathing pulse */}
      <motion.g
        initial={false}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 12px" }}
      >
        {/* Translucent halo */}
        <circle cx={16} cy={12} r={3.6} fill="hsl(var(--primary))" fillOpacity={0.12} />
        {/* Frosted body */}
        <circle
          cx={16}
          cy={12}
          r={2.7}
          fill={`url(#${coreGrad})`}
          stroke="hsl(var(--primary))"
          strokeOpacity={0.45}
          strokeWidth={0.5}
        />
        {/* Top specular highlight — the "wet glass" feel */}
        <ellipse
          cx={15.1}
          cy={10.9}
          rx={1.2}
          ry={0.7}
          fill="hsl(var(--primary-foreground))"
          fillOpacity={0.7}
        />
        {/* Subtle bottom rim light */}
        <path
          d="M14.1 13.4 Q16 14.6 17.9 13.4"
          stroke="hsl(var(--primary-foreground))"
          strokeOpacity={0.35}
          strokeWidth={0.4}
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  );
}

export default FlowGlyph;
