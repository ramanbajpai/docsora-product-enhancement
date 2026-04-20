import { useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Lock, Sparkles } from "lucide-react";
import { TransferFile } from "@/pages/Transfer";

interface TransferProgressProps {
  files: TransferFile[];
  totalSize: number;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const STATUS_PHASES = [
  { threshold: 0, label: 'Establishing secure channel' },
  { threshold: 15, label: 'Encrypting your files' },
  { threshold: 40, label: 'Streaming over TLS' },
  { threshold: 70, label: 'Verifying integrity' },
  { threshold: 90, label: 'Sealing the transfer' },
];

export function TransferProgress({ files, totalSize }: TransferProgressProps) {
  const { overallProgress, uploadedSize, uploadSpeed, timeRemaining, completedCount } = useMemo(() => {
    const uploaded = files.reduce((acc, f) => acc + (f.size * f.progress / 100), 0);
    const completed = files.filter(f => f.status === 'completed').length;
    const progress = files.length > 0
      ? files.reduce((acc, f) => acc + f.progress, 0) / files.length
      : 0;
    const speed = 5 * 1024 * 1024;
    const remaining = (totalSize - uploaded) / speed;
    return {
      overallProgress: progress,
      uploadedSize: uploaded,
      uploadSpeed: speed,
      timeRemaining: remaining,
      completedCount: completed,
    };
  }, [files, totalSize]);

  const statusLabel = useMemo(() => {
    let current = STATUS_PHASES[0].label;
    for (const phase of STATUS_PHASES) {
      if (overallProgress >= phase.threshold) current = phase.label;
    }
    return current;
  }, [overallProgress]);

  // Smooth percentage display that gracefully catches up
  const [displayProgress, setDisplayProgress] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(function tick() {
      setDisplayProgress(prev => {
        const diff = overallProgress - prev;
        if (Math.abs(diff) < 0.05) return overallProgress;
        return prev + diff * 0.08;
      });
      requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [overallProgress]);

  // Aurora hue shifts subtly as progress advances
  const hueShift = displayProgress * 0.6;

  // Generate persistent ambient particles (deterministic per mount)
  const ambientParticles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.6,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 5,
    })), []);

  // Stream particles flowing into the orb
  const streamParticles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * Math.PI * 2,
      delay: i * 0.35,
    })), []);

  const orbSize = 320;
  const radius = 140;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative flex flex-col items-center justify-center py-10 min-h-[80vh] overflow-hidden">
      {/* Living aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${220 + hueShift} 90% 60% / 0.18) 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${280 + hueShift} 80% 60% / 0.15) 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
          animate={{ x: [0, -50, 30, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, hsl(${190 + hueShift} 90% 55% / 0.10) 0%, transparent 70%)`,
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ambient floating particles */}
        {ambientParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/40"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size * 4, height: p.size * 4, filter: 'blur(1px)' }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Central Orb */}
      <div className="relative mb-12" style={{ width: orbSize, height: orbSize }}>
        {/* Outer breathing halo */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)`,
            filter: 'blur(30px)',
          }}
        />

        {/* Rotating conic gradient ring (caustic look) */}
        <motion.div
          className="absolute inset-6 rounded-full opacity-60"
          style={{
            background: `conic-gradient(from 0deg, hsl(var(--primary) / 0), hsl(var(--primary) / 0.7), hsl(var(--primary) / 0), hsl(var(--primary) / 0.4), hsl(var(--primary) / 0))`,
            filter: 'blur(8px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 rounded-full opacity-40"
          style={{
            background: `conic-gradient(from 180deg, hsl(var(--primary) / 0), hsl(280 80% 70% / 0.6), hsl(var(--primary) / 0), hsl(190 90% 60% / 0.5), hsl(var(--primary) / 0))`,
            filter: 'blur(6px)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glass orb body */}
        <div
          className="absolute inset-10 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 35% 30%, hsl(0 0% 100% / 0.15) 0%, hsl(var(--card) / 0.8) 60%, hsl(var(--card) / 0.95) 100%)',
            backdropFilter: 'blur(40px)',
            border: '1px solid hsl(0 0% 100% / 0.12)',
            boxShadow: 'inset 0 1px 0 0 hsl(0 0% 100% / 0.2), inset 0 -20px 40px -10px hsl(var(--primary) / 0.15), 0 30px 60px -15px hsl(var(--primary) / 0.4)',
          }}
        >
          {/* Specular highlight that drifts */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 30% 25%, hsl(0 0% 100% / 0.25) 0%, transparent 60%)',
            }}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Liquid fill rising with progress */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            initial={{ height: '0%' }}
            animate={{ height: `${displayProgress}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(180deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.35) 100%)',
            }}
          >
            {/* Wave on top of liquid */}
            <svg className="absolute -top-3 left-0 w-full h-6" viewBox="0 0 200 12" preserveAspectRatio="none">
              <motion.path
                d="M0,6 Q25,0 50,6 T100,6 T150,6 T200,6 L200,12 L0,12 Z"
                fill="hsl(var(--primary) / 0.35)"
                animate={{ x: [-50, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M0,6 Q25,12 50,6 T100,6 T150,6 T200,6 L200,12 L0,12 Z"
                fill="hsl(var(--primary) / 0.5)"
                animate={{ x: [0, -50] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Progress ring SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${orbSize} ${orbSize}`}>
          <circle
            cx={orbSize / 2}
            cy={orbSize / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1.5"
            className="opacity-40"
          />
          <motion.circle
            cx={orbSize / 2}
            cy={orbSize / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (displayProgress / 100) * circumference }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' }}
          />

          {/* Comet head following the progress */}
          {displayProgress > 0 && displayProgress < 100 && (() => {
            const angle = (displayProgress / 100) * Math.PI * 2 - Math.PI / 2;
            // already rotated -90deg on the SVG; use raw angle
            const cx = orbSize / 2 + radius * Math.cos((displayProgress / 100) * Math.PI * 2);
            const cy = orbSize / 2 + radius * Math.sin((displayProgress / 100) * Math.PI * 2);
            return (
              <motion.circle
                cx={cx}
                cy={cy}
                r="5"
                fill="hsl(var(--primary))"
                animate={{ r: [4, 6, 4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ filter: 'drop-shadow(0 0 12px hsl(var(--primary)))' }}
              />
            );
          })()}

          {/* Stream particles flowing inward */}
          {streamParticles.map((p) => {
            const startR = radius + 30;
            const x1 = orbSize / 2 + Math.cos(p.angle) * startR;
            const y1 = orbSize / 2 + Math.sin(p.angle) * startR;
            const x2 = orbSize / 2 + Math.cos(p.angle) * (radius - 20);
            const y2 = orbSize / 2 + Math.sin(p.angle) * (radius - 20);
            return (
              <motion.circle
                key={p.id}
                r="1.5"
                fill="hsl(var(--primary))"
                initial={{ cx: x1, cy: y1, opacity: 0 }}
                animate={{
                  cx: [x1, x2],
                  cy: [y1, y2],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeIn',
                }}
                style={{ filter: 'drop-shadow(0 0 4px hsl(var(--primary)))' }}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="flex items-baseline tabular-nums">
            <span className="text-6xl font-light text-foreground tracking-tight">
              {Math.floor(displayProgress)}
            </span>
            <span className="text-2xl font-light text-muted-foreground ml-0.5">%</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={statusLabel}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-1.5 mt-2"
            >
              <motion.div
                className="w-1 h-1 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <span className="text-xs text-muted-foreground tracking-wide">{statusLabel}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Headline */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-1.5">
          Sending your transfer
        </h2>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {files.length} {files.length === 1 ? 'file' : 'files'} sealed
        </p>
      </motion.div>

      {/* Stats — minimal, breathing */}
      <motion.div
        className="flex items-center gap-6 px-7 py-4 rounded-2xl relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        style={{
          background: 'hsl(var(--card) / 0.5)',
          backdropFilter: 'blur(24px)',
          border: '1px solid hsl(var(--border) / 0.5)',
          boxShadow: '0 10px 40px -10px hsl(var(--primary) / 0.15)',
        }}
      >
        <Stat label="Speed" value={`${formatFileSize(uploadSpeed)}/s`} pulse />
        <Divider />
        <Stat label="Transferred" value={`${formatFileSize(uploadedSize)} / ${formatFileSize(totalSize)}`} />
        <Divider />
        <Stat label="Remaining" value={`~${Math.max(1, Math.ceil(timeRemaining))}s`} />
      </motion.div>

      {/* Floating file chips marquee */}
      <motion.div
        className="mt-10 w-full max-w-2xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {files.slice(0, 8).map((file, i) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 220, damping: 22 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: file.status === 'completed'
                  ? 'hsl(var(--primary) / 0.12)'
                  : 'hsl(var(--card) / 0.6)',
                border: `1px solid ${file.status === 'completed' ? 'hsl(var(--primary) / 0.4)' : 'hsl(var(--border) / 0.5)'}`,
                backdropFilter: 'blur(12px)',
              }}
            >
              {file.status === 'completed' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  className="w-3.5 h-3.5 rounded-full border border-primary/40 border-t-primary"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
              )}
              <span className={`max-w-[140px] truncate ${file.status === 'completed' ? 'text-foreground' : 'text-muted-foreground'}`}>
                {file.name}
              </span>
            </motion.div>
          ))}
          {files.length > 8 && (
            <div className="flex items-center px-3 py-1.5 rounded-full text-xs text-muted-foreground bg-card/40 border border-border/50">
              +{files.length - 8} more
            </div>
          )}
        </div>
      </motion.div>

      {/* Trust footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4 mt-10 text-xs text-muted-foreground relative z-10"
      >
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-primary" />
          <span>End-to-end encrypted</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-border" />
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>Zero-knowledge route</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-border" />
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Powered by Docsora</span>
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ label, value, pulse }: { label: string; value: string; pulse?: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center gap-1.5 justify-center mb-0.5">
        {pulse && (
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        )}
        <span className="text-sm font-medium text-foreground tabular-nums">{value}</span>
      </div>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

function Divider() {
  return <div className="h-8 w-px bg-border/60" />;
}