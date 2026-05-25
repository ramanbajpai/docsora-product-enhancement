import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WelcomeBannerProps {
  userName?: string;
  rightSlot?: ReactNode;
}

export function WelcomeBanner({ userName = "there", rightSlot }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative mb-6 w-full overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-xl shadow-glass"
    >
      {/* Premium glow accents */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 -top-24 h-[280px] w-[380px] rounded-full blur-3xl opacity-70"
          style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 65%)" }}
          animate={{ x: [0, 30, -10, 0], y: [0, 20, -10, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-20 -bottom-24 h-[260px] w-[360px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(circle, hsl(210 100% 70% / 0.28), transparent 65%)" }}
          animate={{ x: [0, -20, 10, 0], y: [0, -15, 10, 0], scale: [1, 1.06, 0.97, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/40" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative flex items-start justify-between gap-4 px-5 py-5 sm:px-6 sm:py-6">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Hey {userName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Let's keep you moving
          </p>
        </div>
        {rightSlot && <div className="shrink-0 pt-1">{rightSlot}</div>}
      </div>
    </motion.div>
  );
}
