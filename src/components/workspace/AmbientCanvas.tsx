import { motion } from "framer-motion";
import { useWorkspace } from "./useWorkspace";
import { cn } from "@/lib/utils";

export function AmbientCanvas() {
  const { autopilot } = useWorkspace();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-surface-2" />
      <motion.div
        animate={{
          opacity: autopilot ? 0.55 : 0.25,
          scale: autopilot ? 1.1 : 1,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={cn(
          "absolute -top-40 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full blur-3xl",
          "bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.35),transparent_60%)]"
        )}
      />
      <motion.div
        animate={{ opacity: autopilot ? 0.35 : 0.15 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[700px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,hsl(149_60%_50%/0.3),transparent_60%)]"
      />
      {autopilot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.12),transparent_50%)]"
        />
      )}
    </div>
  );
}
