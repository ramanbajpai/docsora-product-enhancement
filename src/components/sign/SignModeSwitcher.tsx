import { motion } from "framer-motion";
import { FileUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export type SignMode = "agreements" | "templates";

interface SignModeSwitcherProps {
  value: SignMode;
  onChange: (v: SignMode) => void;
}

const OPTIONS: { id: SignMode; label: string; icon: any }[] = [
  { id: "agreements", label: "One-time sign", icon: FileUp },
  { id: "templates", label: "Templates", icon: Layers },
];

export default function SignModeSwitcher({ value, onChange }: SignModeSwitcherProps) {
  return (
    <div className="relative inline-flex items-center p-1 rounded-xl border border-border/55 bg-card/50 backdrop-blur-md">
      {OPTIONS.map((o) => {
        const active = o.id === value;
        const Icon = o.icon;
        return (
          <button
            key={o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "relative px-3.5 h-8 inline-flex items-center gap-1.5 text-[12px] font-medium rounded-lg transition-colors z-10",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId="sign-mode-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/25 shadow-[0_0_0_1px_hsl(var(--primary)/0.1),0_6px_18px_-8px_hsl(var(--primary)/0.5)]"
              />
            )}
            <Icon className="relative w-3.5 h-3.5" />
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
