import { motion } from "framer-motion";
import { FileText, FileImage, FileArchive, FileSpreadsheet, FileVideo } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * FileCoasterAnimation
 * A playful, on-brand looping animation: file-type characters walk in single
 * file from the left, climb into a rollercoaster cart, and the cart rumbles
 * as if about to take off. Themed entirely with design tokens.
 */

type FileChar = {
  id: string;
  Icon: LucideIcon;
  label: string;
  tint: string; // hsl token reference
};

const characters: FileChar[] = [
  { id: 'pdf', Icon: FileText, label: 'PDF', tint: 'hsl(var(--primary))' },
  { id: 'img', Icon: FileImage, label: 'JPG', tint: 'hsl(var(--primary) / 0.85)' },
  { id: 'zip', Icon: FileArchive, label: 'ZIP', tint: 'hsl(var(--primary) / 0.7)' },
  { id: 'xls', Icon: FileSpreadsheet, label: 'XLS', tint: 'hsl(var(--primary) / 0.85)' },
  { id: 'mp4', Icon: FileVideo, label: 'MP4', tint: 'hsl(var(--primary))' },
];

const LOOP = 6; // seconds per loop

export function FileCoasterAnimation() {
  return (
    <div className="relative w-full h-[200px] overflow-hidden">
      {/* Soft floor gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(var(--primary) / 0.05) 100%)',
        }}
      />

      {/* Track — dashed line representing rails */}
      <div className="absolute left-4 right-4 bottom-[48px] h-px overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, hsl(var(--border)) 0px, hsl(var(--border)) 6px, transparent 6px, transparent 12px)',
          }}
        />
      </div>
      {/* Track sleepers */}
      <div className="absolute left-6 right-6 bottom-[42px] flex justify-between pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="w-0.5 h-2 rounded-sm bg-border/60" />
        ))}
      </div>

      {/* The rollercoaster cart, anchored on the right */}
      <motion.div
        className="absolute bottom-[44px] right-6"
        animate={{
          x: [0, -1.2, 1, -0.8, 0],
          y: [0, -0.6, 0.4, -0.4, 0],
          rotate: [-0.4, 0.4, -0.3, 0.3, -0.4],
        }}
        transition={{
          duration: 0.45,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Cart />
      </motion.div>

      {/* Walking file characters */}
      <div className="absolute inset-0">
        {characters.map((char, i) => (
          <FileWalker key={char.id} char={char} index={i} total={characters.length} />
        ))}
      </div>

      {/* Subtle takeoff anticipation: tiny puff dots near the cart's wheels */}
      <div className="absolute right-10 bottom-[34px] flex gap-1 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full bg-primary/30"
            animate={{
              y: [0, -6, 0],
              opacity: [0, 0.6, 0],
              scale: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Cart() {
  return (
    <div className="relative">
      {/* Cart body */}
      <div
        className="relative w-[88px] h-[44px] rounded-t-2xl rounded-b-md flex items-end justify-center overflow-hidden border border-primary/40"
        style={{
          background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
          boxShadow:
            '0 8px 24px -8px hsl(var(--primary) / 0.5), inset 0 1px 0 0 hsl(0 0% 100% / 0.25), inset 0 -2px 0 0 hsl(0 0% 0% / 0.08)',
        }}
      >
        {/* Stripe detail */}
        <div className="absolute top-3 inset-x-2 h-1.5 rounded-full bg-primary-foreground/20" />
        {/* "Seats" — three small notches */}
        <div className="absolute bottom-1.5 inset-x-3 flex justify-between">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-4 h-1 rounded-full bg-primary-foreground/30" />
          ))}
        </div>
      </div>

      {/* Wheels */}
      <div className="absolute -bottom-2 left-2 flex justify-between w-[72px]">
        <Wheel />
        <Wheel />
      </div>

      {/* Front bumper / connector dot */}
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/70" />
    </div>
  );
}

function Wheel() {
  return (
    <motion.div
      className="w-3.5 h-3.5 rounded-full border-2 border-foreground/70 bg-card"
      animate={{ rotate: -360 }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <div className="absolute inset-1/2 w-px h-1.5 -translate-x-1/2 -translate-y-1/2 bg-foreground/40" />
    </motion.div>
  );
}

function FileWalker({ char, index, total }: { char: FileChar; index: number; total: number }) {
  const { Icon, label, tint } = char;
  // Stagger each character along the loop
  const offset = (index / total) * LOOP;

  return (
    <motion.div
      className="absolute bottom-[48px]"
      initial={false}
      animate={{
        // Walk from far left (-40) into the cart area (~ right side of card, ~85%)
        x: ['-10%', '78%'],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: LOOP,
        repeat: Infinity,
        delay: -offset,
        ease: 'linear',
        times: [0, 0.08, 0.5, 0.85, 1],
      }}
    >
      {/* Bobbing while walking */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{ y: [0, -3, 0, -3, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Body */}
        <div
          className="relative w-7 h-8 rounded-md flex items-center justify-center border border-border/50 shadow-sm"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card) / 0.85) 100%)',
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: tint }} strokeWidth={2.25} />
          {/* Tiny eyes */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-0.5 h-0.5 rounded-full bg-foreground/80" />
            <div className="w-0.5 h-0.5 rounded-full bg-foreground/80" />
          </div>
          {/* Format label */}
          <span className="absolute -bottom-0.5 text-[6px] font-bold tracking-tight" style={{ color: tint }}>
            {label}
          </span>
        </div>

        {/* Legs — alternating */}
        <div className="flex gap-1 mt-0.5">
          <motion.div
            className="w-0.5 h-1.5 rounded-full bg-foreground/60"
            animate={{ scaleY: [1, 0.5, 1, 0.5, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="w-0.5 h-1.5 rounded-full bg-foreground/60"
            animate={{ scaleY: [0.5, 1, 0.5, 1, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}