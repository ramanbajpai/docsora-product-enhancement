import { motion } from "framer-motion";

interface FlowGlyphProps {
  className?: string;
  /** Whether to play the hover animation (typically true when parent is hovered). */
  active?: boolean;
}

/**
 * FlowGlyph — animated mark for a saved flow.
 *
 * A central node with two orbiting satellites connected by curved paths.
 * On hover the satellites rotate around the core and a soft pulse ripples
 * outward — visually representing "flow" / orchestration. Designed to read
 * crisply on both light and dark surfaces by relying on currentColor +
 * primary tokens.
 */
export function FlowGlyph({ className = "w-6 h-6", active = false }: FlowGlyphProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer pulse ring — only visible on hover */}
      <motion.circle
        cx={16}
        cy={16}
        r={11}
        stroke="hsl(var(--primary))"
        strokeOpacity={0.35}
        strokeWidth={1}
        initial={false}
        animate={
          active
            ? { scale: [0.85, 1.15, 0.85], opacity: [0, 0.6, 0] }
            : { scale: 0.85, opacity: 0 }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 16px" }}
      />

      {/* Connection orbit — rotating slowly when active */}
      <motion.g
        initial={false}
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={
          active
            ? { duration: 8, repeat: Infinity, ease: "linear" }
            : { duration: 0.6, ease: "easeOut" }
        }
        style={{ transformOrigin: "16px 16px" }}
      >
        {/* Curved connection paths */}
        <path
          d="M16 16 C 12 12, 8 12, 6 16"
          stroke="hsl(var(--primary))"
          strokeOpacity={0.45}
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 16 C 20 20, 24 20, 26 16"
          stroke="hsl(var(--primary))"
          strokeOpacity={0.45}
          strokeWidth={1.4}
          strokeLinecap="round"
          fill="none"
        />

        {/* Satellite nodes */}
        <circle cx={6} cy={16} r={2} fill="hsl(var(--primary))" fillOpacity={0.85} />
        <circle cx={26} cy={16} r={2} fill="hsl(var(--primary))" fillOpacity={0.85} />
      </motion.g>

      {/* Core node — gentle breathing pulse */}
      <motion.circle
        cx={16}
        cy={16}
        r={3.6}
        fill="hsl(var(--primary))"
        initial={false}
        animate={active ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 16px" }}
      />
      <circle cx={16} cy={16} r={1.4} fill="hsl(var(--primary-foreground))" fillOpacity={0.95} />
    </svg>
  );
}

export default FlowGlyph;