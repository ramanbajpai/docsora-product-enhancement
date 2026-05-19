import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileArchive,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  File,
  Search,
  Lock,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TransferFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface TransferPreviewModalProps {
  open: boolean;
  files: TransferFile[];
  initialFileId?: string;
  onClose: () => void;
  onDownloadAll?: () => void;
}

const getCategory = (type: string): string => {
  if (type.includes("pdf")) return "pdf";
  if (type.includes("image")) return "image";
  if (type.includes("zip") || type.includes("archive")) return "archive";
  if (type.includes("spreadsheet") || type.includes("excel")) return "spreadsheet";
  if (type.includes("presentation") || type.includes("powerpoint")) return "presentation";
  if (type.includes("word") || type.includes("document")) return "document";
  return "other";
};

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  pdf: FileText,
  image: ImageIcon,
  archive: FileArchive,
  spreadsheet: FileSpreadsheet,
  presentation: Presentation,
  document: FileText,
  other: File,
};

const accentFor: Record<string, string> = {
  pdf: "text-red-400 bg-red-500/10",
  image: "text-emerald-400 bg-emerald-500/10",
  archive: "text-amber-400 bg-amber-500/10",
  spreadsheet: "text-green-400 bg-green-500/10",
  presentation: "text-orange-400 bg-orange-500/10",
  document: "text-blue-400 bg-blue-500/10",
  other: "text-muted-foreground bg-muted/40",
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
};

// Deterministic page count from name for stable demo
const pseudoPageCount = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return (Math.abs(h) % 6) + 3;
};

export function TransferPreviewModal({
  open,
  files,
  initialFileId,
  onClose,
  onDownloadAll,
}: TransferPreviewModalProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedId(initialFileId || files[0]?.id || null);
      setSearch("");
    }
  }, [open, initialFileId, files]);

  const selectedIndex = useMemo(
    () => files.findIndex((f) => f.id === selectedId),
    [files, selectedId]
  );
  const selected = selectedIndex >= 0 ? files[selectedIndex] : null;

  // Reset preview load animation on file change
  useEffect(() => {
    if (!selected) return;
    setLoaded(false);
    const t = setTimeout(() => setLoaded(true), 280);
    return () => clearTimeout(t);
  }, [selectedId, selected]);

  const goPrev = useCallback(() => {
    if (selectedIndex > 0) setSelectedId(files[selectedIndex - 1].id);
  }, [selectedIndex, files]);
  const goNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < files.length - 1)
      setSelectedId(files[selectedIndex + 1].id);
  }, [selectedIndex, files]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, goNext, goPrev]);

  const filtered = useMemo(
    () =>
      files.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase().trim())
      ),
    [files, search]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
            onClick={onClose}
          />

          {/* Modal shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[1180px] h-[min(86vh,820px)] rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Glass border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-border/60 via-border/20 to-border/40 p-px pointer-events-none">
              <div className="w-full h-full rounded-2xl bg-card/90 backdrop-blur-2xl" />
            </div>

            {/* Top bar */}
            <div className="relative z-10 flex items-center justify-between gap-4 px-5 h-14 border-b border-border/40">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    selected
                      ? accentFor[getCategory(selected.type)]
                      : "bg-muted/40 text-muted-foreground"
                  )}
                >
                  {selected
                    ? (() => {
                        const Icon = iconFor[getCategory(selected.type)] || File;
                        return <Icon className="w-4 h-4" />;
                      })()
                    : <File className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selected?.name || "Preview"}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70">
                    {selected
                      ? `${formatSize(selected.size)} · ${selectedIndex + 1} of ${files.length}`
                      : `${files.length} files`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={goPrev}
                  disabled={selectedIndex <= 0}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous file"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  disabled={selectedIndex >= files.length - 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-muted/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next file"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="w-px h-5 bg-border/50 mx-1" />
                {onDownloadAll && (
                  <button
                    onClick={onDownloadAll}
                    className="hidden sm:flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download all
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/70 hover:text-foreground hover:bg-muted/40 transition-colors ml-1"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="relative z-10 flex-1 flex min-h-0">
              {/* Sidebar */}
              <aside className="hidden md:flex flex-col w-[280px] shrink-0 border-r border-border/40">
                <div className="p-3">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-muted-foreground/60 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search files"
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-muted/30 border border-border/30 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:bg-muted/40 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-3 glassmorphic-scrollbar">
                  {filtered.map((file) => {
                    const cat = getCategory(file.type);
                    const Icon = iconFor[cat] || File;
                    const isActive = file.id === selectedId;
                    return (
                      <button
                        key={file.id}
                        onClick={() => setSelectedId(file.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-all duration-150 group relative",
                          isActive
                            ? "bg-primary/10"
                            : "hover:bg-muted/30"
                        )}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="preview-active-indicator"
                            className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-primary"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <div
                          className={cn(
                            "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                            accentFor[cat]
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "text-xs font-medium truncate transition-colors",
                              isActive ? "text-foreground" : "text-foreground/85"
                            )}
                          >
                            {file.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 mt-0.5">
                            {formatSize(file.size)}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                  {filtered.length === 0 && (
                    <div className="px-3 py-6 text-center text-xs text-muted-foreground/60">
                      No matches
                    </div>
                  )}
                </div>
              </aside>

              {/* Preview canvas */}
              <div className="flex-1 min-w-0 relative overflow-hidden bg-gradient-to-b from-background/40 to-muted/10">
                {/* Soft ambient glow */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px]" />
                </div>

                <AnimatePresence mode="wait">
                  {selected && (
                    <motion.div
                      key={selected.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 overflow-y-auto glassmorphic-scrollbar"
                    >
                      <PreviewSurface file={selected} loaded={loaded} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between gap-3 px-5 h-11 border-t border-border/40 text-[11px] text-muted-foreground/60">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                <span>End-to-end encrypted preview</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted/40 border border-border/40 text-[10px]">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-muted/40 border border-border/40 text-[10px]">↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted/40 border border-border/40 text-[10px]">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- Preview --------------------------------- */

function PreviewSurface({ file, loaded }: { file: TransferFile; loaded: boolean }) {
  const category = getCategory(file.type);

  if (category === "pdf" || category === "document") {
    const pages = pseudoPageCount(file.name);
    return (
      <div className="min-h-full flex flex-col items-center gap-5 py-8 px-6">
        {Array.from({ length: pages }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
            transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[640px]"
          >
            <div className="relative aspect-[8.5/11] rounded-lg bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] overflow-hidden ring-1 ring-black/[0.06]">
              <SkeletonPage seed={file.name + i} />
              <div className="absolute bottom-2.5 right-3 px-1.5 py-0.5 rounded text-[10px] text-slate-400 bg-slate-50/80 backdrop-blur-sm">
                {i + 1} / {pages}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (category === "presentation") {
    const slides = pseudoPageCount(file.name);
    return (
      <div className="min-h-full flex flex-col items-center gap-4 py-8 px-6">
        {Array.from({ length: slides }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="w-full max-w-[720px]"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden ring-1 ring-black/10 shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.4),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(255,165,100,0.25),transparent_50%)]" />
              <div className="absolute inset-0 flex flex-col justify-center px-10 gap-3">
                <div className="h-2 w-12 rounded-full bg-white/30" />
                <div className="h-5 w-2/3 rounded bg-white/80" />
                <div className="h-3 w-1/2 rounded bg-white/40" />
              </div>
              <div className="absolute bottom-2.5 right-3 px-1.5 py-0.5 rounded text-[10px] text-white/60 bg-black/30 backdrop-blur-sm">
                Slide {i + 1} / {slides}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (category === "spreadsheet") {
    return (
      <div className="min-h-full p-8 flex items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-[820px] rounded-xl overflow-hidden ring-1 ring-border/40 bg-card/60 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]"
        >
          <div className="grid grid-cols-6 text-[11px] font-medium text-muted-foreground/80 bg-muted/30">
            {["", "A", "B", "C", "D", "E"].map((h, i) => (
              <div key={i} className="px-3 py-2 border-b border-r border-border/30 last:border-r-0">
                {h}
              </div>
            ))}
          </div>
          {Array.from({ length: 14 }).map((_, r) => (
            <div key={r} className="grid grid-cols-6 text-[12px]">
              <div className="px-3 py-2 border-b border-r border-border/20 text-muted-foreground/60 bg-muted/10">
                {r + 1}
              </div>
              {Array.from({ length: 5 }).map((_, c) => (
                <div
                  key={c}
                  className="px-3 py-2 border-b border-r border-border/10 last:border-r-0 text-foreground/80"
                >
                  <div
                    className="h-2 rounded bg-muted-foreground/15"
                    style={{ width: `${30 + ((r * 7 + c * 13) % 60)}%` }}
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  if (category === "image") {
    return (
      <div className="min-h-full flex items-center justify-center p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.98 }}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-[720px] aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-border/40 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-blue-500/20 to-purple-500/30" />
          <div className="absolute inset-0 flex items-center justify-center text-white/40">
            <ImageIcon className="w-12 h-12" />
          </div>
        </motion.div>
      </div>
    );
  }

  // Archive / other
  return (
    <div className="min-h-full flex items-center justify-center p-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 8 }}
        transition={{ duration: 0.35 }}
        className="text-center max-w-sm"
      >
        <div
          className={cn(
            "w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center",
            accentFor[category]
          )}
        >
          {(() => {
            const Icon = iconFor[category] || File;
            return <Icon className="w-7 h-7" />;
          })()}
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          Preview not available
        </p>
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          This file type can't be previewed in the browser. Download the transfer
          to open it locally.
        </p>
        <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/60 px-3 py-1.5 rounded-full bg-muted/30 border border-border/30">
          <Maximize2 className="w-3 h-3" />
          {formatSize(file.size)}
        </div>
      </motion.div>
    </div>
  );
}

function SkeletonPage({ seed }: { seed: string }) {
  // Deterministic widths for a calm document mock
  const widths = useMemo(() => {
    let h = 0;
    for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
    return Array.from({ length: 14 }).map((_, i) => {
      h = (h * 1103515245 + 12345) & 0x7fffffff;
      return 50 + (h % 45);
    });
  }, [seed]);

  return (
    <div className="absolute inset-0 p-10 flex flex-col gap-3">
      <div className="h-4 w-2/5 rounded bg-slate-200" />
      <div className="h-2.5 w-1/4 rounded bg-slate-100 mb-3" />
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-2 rounded-full bg-slate-100"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}