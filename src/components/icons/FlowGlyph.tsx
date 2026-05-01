import { motion } from "framer-motion";

interface FlowGlyphProps {
  className?: string;
  /** Whether to play the hover animation (typically true when parent is hovered). */
  active?: boolean;
}

/**
 * FlowGlyph — minimal mark for a saved flow.
 *
 * Three nodes converging into one. Clean lines, no gradients, no gloss.
 * On hover, the core gently pulses to suggest live orchestration.
 */
export function FlowGlyph({ className = "w-7 h-7", active = false }: FlowGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Connection lines: two nodes on the left converge into one on the right */}
      <g
        stroke="hsl(var(--primary))"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
      >
        <path d="M6 7 L16 12" />
        <path d="M6 17 L16 12" />
      </g>

      {/* Left nodes */}
      <circle cx={6} cy={7} r={1.8} fill="hsl(var(--primary))" />
      <circle cx={6} cy={17} r={1.8} fill="hsl(var(--primary))" />

      {/* Core node with subtle pulse on hover */}
      <motion.circle
        cx={16}
        cy={12}
        r={2.6}
        fill="hsl(var(--primary))"
        initial={false}
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 12px" }}
      />
    </svg>
  );
}

export default FlowGlyph;
