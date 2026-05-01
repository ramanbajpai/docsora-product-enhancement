import { motion } from "framer-motion";
import { useId } from "react";

interface FlowGlyphProps {
  className?: string;
  /** Whether to play the hover animation (typically true when parent is hovered). */
  active?: boolean;
}

/**
 * FlowGlyph — premium animated mark for a saved flow.
 *
 * Composition:
 *  • A faceted, gem-like core (gradient fill + inner highlight) representing
 *    the orchestration hub.
 *  • Three orbiting satellite nodes connected by gradient curves.
 *  • Particles travel along the curves on hover (data flowing into the core).
 *  • Soft outer glow ring pulses on hover.
 *
 * Built to read crisply at 24–32px on both light and dark surfaces. Colors
 * derive from the design system (`--primary`, `--primary-foreground`).
 */
export function FlowGlyph({ className = "w-7 h-7", active = false }: FlowGlyphProps) {
  // Stable, unique ids per instance so multiple glyphs on the page don't
  // collide with one another's gradient/path defs.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const coreGrad = `fg-core-${uid}`;
  const strokeGrad = `fg-stroke-${uid}`;
  const haloGrad = `fg-halo-${uid}`;
  const pathA = `fg-pathA-${uid}`;
  const pathB = `fg-pathB-${uid}`;
  const pathC = `fg-pathC-${uid}`;

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Faceted core gradient — gives the central node depth */}
        <radialGradient id={coreGrad} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
          <stop offset="55%" stopColor="hsl(var(--primary))" stopOpacity={0.95} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
        </radialGradient>

        {/* Connection-line gradient — fades in toward the core */}
        <linearGradient id={strokeGrad} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.85} />
        </linearGradient>

        {/* Halo gradient for the outer pulse ring */}
        <radialGradient id={haloGrad} cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
        </radialGradient>

        {/* Connection paths (defined once, reused for stroke + particle motion) */}
        <path id={pathA} d="M8 12 C 14 14, 17 17, 20 20" />
        <path id={pathB} d="M8 28 C 14 26, 17 23, 20 20" />
        <path id={pathC} d="M32 20 C 28 20, 24 20, 20 20" />
      </defs>

      {/* Outer pulse halo */}
      <motion.circle
        cx={20}
        cy={20}
        r={15}
        fill={`url(#${haloGrad})`}
        initial={false}
        animate={
          active
            ? { scale: [0.85, 1.1, 0.85], opacity: [0, 0.9, 0] }
            : { scale: 0.85, opacity: 0 }
        }
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "20px 20px" }}
      />

      {/* Connection strokes — render the defined paths */}
      <g stroke={`url(#${strokeGrad})`} strokeWidth={1.4} strokeLinecap="round" fill="none">
        <use href={`#${pathA}`} />
        <use href={`#${pathB}`} />
        <use href={`#${pathC}`} />
      </g>

      {/* Particles flowing along each path toward the core (only when active) */}
      {active && (
        <g fill="hsl(var(--primary))">
          {[pathA, pathB, pathC].map((p, i) => (
            <circle key={p} r={1.1}>
              <animateMotion
                dur="1.8s"
                repeatCount="indefinite"
                begin={`${i * 0.45}s`}
                path={
                  p === pathA
                    ? "M8 12 C 14 14, 17 17, 20 20"
                    : p === pathB
                    ? "M8 28 C 14 26, 17 23, 20 20"
                    : "M32 20 C 28 20, 24 20, 20 20"
                }
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.85;1"
                dur="1.8s"
                repeatCount="indefinite"
                begin={`${i * 0.45}s`}
              />
            </circle>
          ))}
        </g>
      )}

      {/* Satellite nodes — small, refined, with inner highlight */}
      {[
        { cx: 8, cy: 12 },
        { cx: 8, cy: 28 },
        { cx: 32, cy: 20 },
      ].map((n, i) => (
        <motion.g
          key={`sat-${i}`}
          initial={false}
          animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
        >
          <circle cx={n.cx} cy={n.cy} r={2.6} fill="hsl(var(--primary))" fillOpacity={0.18} />
          <circle cx={n.cx} cy={n.cy} r={1.8} fill="hsl(var(--primary))" />
          <circle
            cx={n.cx - 0.5}
            cy={n.cy - 0.6}
            r={0.55}
            fill="hsl(var(--primary-foreground))"
            fillOpacity={0.75}
          />
        </motion.g>
      ))}

      {/* Core — faceted gem with breathing pulse + inner highlight */}
      <motion.g
        initial={false}
        animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "20px 20px" }}
      >
        {/* Soft outer ring */}
        <circle cx={20} cy={20} r={5.6} fill="hsl(var(--primary))" fillOpacity={0.14} />
        {/* Core body */}
        <circle cx={20} cy={20} r={4.2} fill={`url(#${coreGrad})`} />
        {/* Inner highlight (top-left) — gives a glassy, crafted feel */}
        <ellipse
          cx={18.4}
          cy={18.2}
          rx={1.6}
          ry={1.1}
          fill="hsl(var(--primary-foreground))"
          fillOpacity={0.55}
        />
        {/* Tiny center spark */}
        <circle cx={20} cy={20} r={0.7} fill="hsl(var(--primary-foreground))" fillOpacity={0.95} />
      </motion.g>
    </svg>
  );
}

export default FlowGlyph;
