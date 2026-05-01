import { SVGProps } from "react";

interface FlowIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * FlowIcon — premium, minimal mark for "Flows".
 *
 * Two source nodes on the left flow through curved paths into a single
 * destination node on the right. Strokes use currentColor so it picks up
 * sidebar active/inactive states automatically. Nodes are filled with the
 * same currentColor and a small inner negative-space dot keeps it readable
 * at 16–20px while feeling crafted (Apple/Sana inspired).
 */
export function FlowIcon({ className = "w-5 h-5", ...rest }: FlowIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {/* Connection paths from the two source nodes into the destination */}
      <path
        d="M7 6.5C11 6.5 13 9.5 14.5 12"
        opacity={0.55}
      />
      <path
        d="M7 17.5C11 17.5 13 14.5 14.5 12"
        opacity={0.55}
      />

      {/* Source nodes (left) */}
      <circle cx={5} cy={6.5} r={2.1} fill="currentColor" stroke="none" />
      <circle cx={5} cy={6.5} r={0.7} fill="hsl(var(--background))" stroke="none" />

      <circle cx={5} cy={17.5} r={2.1} fill="currentColor" stroke="none" />
      <circle cx={5} cy={17.5} r={0.7} fill="hsl(var(--background))" stroke="none" />

      {/* Destination node (right) — slightly larger to feel like the convergence point */}
      <circle cx={17} cy={12} r={2.6} fill="currentColor" stroke="none" />
      <circle cx={17} cy={12} r={0.9} fill="hsl(var(--background))" stroke="none" />
    </svg>
  );
}

export default FlowIcon;