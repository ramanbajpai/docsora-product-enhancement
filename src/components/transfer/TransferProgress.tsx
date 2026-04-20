import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { TransferFile } from "@/pages/Transfer";

interface TransferProgressProps {
  files: TransferFile[];
  totalSize: number;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

export function TransferProgress({ files, totalSize }: TransferProgressProps) {
  const { overallProgress, uploadedSize, timeRemaining, completedCount } = useMemo(() => {
    const uploaded = files.reduce((acc, f) => acc + (f.size * f.progress) / 100, 0);
    const completed = files.filter((f) => f.status === "completed").length;
    const progress =
      files.length > 0 ? files.reduce((acc, f) => acc + f.progress, 0) / files.length : 0;
    const speed = 5 * 1024 * 1024;
    const remaining = (totalSize - uploaded) / speed;
    return {
      overallProgress: progress,
      uploadedSize: uploaded,
      timeRemaining: remaining,
      completedCount: completed,
    };
  }, [files, totalSize]);

  // Smoothly interpolated value for buttery number/ring updates
  const [displayProgress, setDisplayProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setDisplayProgress((prev) => {
        const diff = overallProgress - prev;
        if (Math.abs(diff) < 0.05) return overallProgress;
        return prev + diff * 0.1;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [overallProgress]);

  const size = 220;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] px-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-16"
      >
        <h1 className="text-[34px] leading-[1.1] font-semibold text-foreground tracking-tight">
          Sending
        </h1>
        <p className="mt-3 text-[15px] text-muted-foreground">
          {completedCount} of {files.length} {files.length === 1 ? "file" : "files"}
        </p>
      </motion.div>

      {/* The single ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg className="absolute inset-0 -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - (displayProgress / 100) * circumference,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </svg>

        {/* Center number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-baseline tabular-nums">
            <span className="text-[64px] leading-none font-light text-foreground tracking-tight">
              {Math.floor(displayProgress)}
            </span>
            <span className="text-[22px] font-light text-muted-foreground ml-1">%</span>
          </div>
        </div>
      </motion.div>

      {/* Meta line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 flex items-center gap-2 text-[13px] text-muted-foreground tabular-nums"
      >
        <span>{formatFileSize(uploadedSize)} of {formatFileSize(totalSize)}</span>
        <span className="text-border">·</span>
        <span>About {Math.max(1, Math.ceil(timeRemaining))}s remaining</span>
      </motion.div>

      {/* File list — quiet, single column */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 w-full max-w-sm"
      >
        <ul className="divide-y divide-border/60">
          <AnimatePresence initial={false}>
            {files.slice(0, 6).map((file) => (
              <motion.li
                key={file.id}
                layout
                className="flex items-center justify-between py-3"
              >
                <span className="text-[14px] text-foreground truncate pr-4">
                  {file.name}
                </span>
                <span className="flex items-center justify-center w-5 h-5 shrink-0">
                  {file.status === "completed" ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-background" strokeWidth={3} />
                    </motion.span>
                  ) : (
                    <motion.span
                      className="w-3.5 h-3.5 rounded-full border-[1.5px] border-border border-t-foreground"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {files.length > 6 && (
          <p className="mt-3 text-center text-[12px] text-muted-foreground">
            and {files.length - 6} more
          </p>
        )}
      </motion.div>

      {/* Trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 flex items-center gap-1.5 text-[12px] text-muted-foreground"
      >
        <Lock className="w-3 h-3" />
        <span>End-to-end encrypted</span>
      </motion.div>
    </div>
  );
}