import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command as CommandGlyph, Loader2, Bell, Clock, AlertTriangle, FileWarning, Workflow, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandInput } from "./CommandInput";
import { ActionPreview } from "./ActionPreview";
import { SearchResults } from "./SearchResults";
import { InsightPanel } from "./InsightPanel";
import { useIntentDetection, DetectedIntent } from "@/hooks/useIntentDetection";
import { useCommandSearch, CommandDocument } from "@/hooks/useCommandSearch";
import { toast } from "sonner";

interface DroppedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

type CommandState = "idle" | "processing" | "preview" | "results" | "insight";

export function DocsoraCommand() {
  const [input, setInput] = useState("");
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([]);
  const [commandState, setCommandState] = useState<CommandState>("idle");
  const [activeIntent, setActiveIntent] = useState<DetectedIntent | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<CommandDocument | null>(null);
  const [showInsight, setShowInsight] = useState(false);

  // Intent detection
  const detectedIntent = useIntentDetection(input);
  
  // Search results
  const searchQuery = detectedIntent?.type === "search" 
    ? detectedIntent.extractedEntities.query || input 
    : "";
  const searchResults = useCommandSearch(searchQuery);

  // Handle input changes with debounced processing
  useEffect(() => {
    if (!input.trim() && droppedFiles.length === 0) {
      setCommandState("idle");
      setActiveIntent(null);
      return;
    }

    // Simulate processing delay
    setCommandState("processing");
    const timer = setTimeout(() => {
      if (detectedIntent) {
        if (detectedIntent.type === "search" || detectedIntent.type === "insight") {
          setCommandState("results");
        } else {
          setActiveIntent(detectedIntent);
          setCommandState("preview");
        }
      } else {
        setCommandState("idle");
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [input, detectedIntent, droppedFiles.length]);

  const handleFilesDrop = useCallback((files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    setDroppedFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setDroppedFiles(prev => prev.filter(f => f.id !== id));
  }, []);

  const handleConfirmAction = useCallback(() => {
    toast.success(`${activeIntent?.action} initiated`, {
      description: `Action will be processed for ${droppedFiles[0]?.name || "your document"}`,
    });
    setInput("");
    setDroppedFiles([]);
    setCommandState("idle");
    setActiveIntent(null);
  }, [activeIntent, droppedFiles]);

  const handleEditAction = useCallback(() => {
    toast.info("Edit mode", {
      description: "Editing workflow is not yet implemented",
    });
  }, []);

  const handleCancelAction = useCallback(() => {
    setCommandState("idle");
    setActiveIntent(null);
  }, []);

  const handleDocumentAction = useCallback((doc: CommandDocument, action: "sign" | "remind" | "view") => {
    const actionLabels = {
      sign: "Opening signature flow",
      remind: "Sending reminder",
      view: "Opening document",
    };
    toast.success(actionLabels[action], {
      description: doc.name,
    });
  }, []);

  const handleShowInsight = useCallback((doc: CommandDocument) => {
    setSelectedDocument(doc);
    setShowInsight(true);
  }, []);

  const documentName = droppedFiles[0]?.name || "Selected Document";

  // Dynamic operational suggestions — these would be derived from real state
  const operationalSuggestions = [
    { icon: Bell, label: "Remind 4 pending signers", count: 4, tone: "amber" as const, query: "Remind 4 pending signers" },
    { icon: Clock, label: "Extend 2 expiring transfers", count: 2, tone: "blue" as const, query: "Extend expiring transfers" },
    { icon: AlertTriangle, label: "3 delayed approvals", count: 3, tone: "rose" as const, query: "Show delayed approvals" },
    { icon: FileWarning, label: "Request missing uploads", count: 5, tone: "violet" as const, query: "Request missing documents" },
    { icon: Workflow, label: "Open stalled workflows", count: 2, tone: "blue" as const, query: "Open stalled workflows" },
    { icon: Send, label: "Follow up on unsigned NDAs", count: 6, tone: "amber" as const, query: "Follow up on unsigned agreements" },
  ];

  const toneClasses: Record<string, { dot: string; ring: string; text: string }> = {
    amber: { dot: "bg-amber-400", ring: "ring-amber-400/30", text: "text-amber-300" },
    blue: { dot: "bg-sky-400", ring: "ring-sky-400/30", text: "text-sky-300" },
    rose: { dot: "bg-rose-400", ring: "ring-rose-400/30", text: "text-rose-300" },
    violet: { dot: "bg-violet-400", ring: "ring-violet-400/30", text: "text-violet-300" },
  };

  return (
    <div className="w-full relative">
      {/* Ambient cinematic glow behind the command surface */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-8 overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute left-1/4 top-0 h-[280px] w-[420px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(217 92% 60% / 0.18), transparent 65%)" }}
          animate={{ x: [0, 30, -10, 0], y: [0, 15, -8, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-0 top-8 h-[240px] w-[360px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(265 90% 65% / 0.14), transparent 70%)" }}
          animate={{ x: [0, -20, 10, 0], y: [0, 20, -5, 0], scale: [1, 1.06, 0.98, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Command container */}
      <div className={cn(
        "relative rounded-2xl border transition-all duration-500 overflow-hidden",
        "bg-gradient-to-b from-card/90 to-card/70 backdrop-blur-2xl",
        commandState === "idle"
          ? "border-border/60 shadow-[0_8px_40px_-12px_hsl(217_92%_50%_/_0.18)]"
          : "border-primary/30 shadow-[0_12px_60px_-12px_hsl(217_92%_55%_/_0.35)]"
      )}>
        {/* Animated top hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Header bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className={cn(
                "p-1 rounded-md transition-all duration-300",
                commandState !== "idle" ? "bg-primary/15" : "bg-muted/50"
              )}>
                <CommandGlyph className={cn(
                  "w-3.5 h-3.5 transition-colors",
                  commandState !== "idle" ? "text-primary" : "text-muted-foreground"
                )} strokeWidth={2} />
              </div>
              {commandState === "idle" && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-md ring-1 ring-primary/30"
                  animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.15, 1] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
            <span className="text-[11px] font-medium text-foreground/70 uppercase tracking-[0.14em]">
              Docsora Command
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium tracking-wide text-muted-foreground/70 bg-muted/40 border border-border/40">
              OPERATIONAL · LIVE
            </span>
          </div>

          <AnimatePresence>
            {commandState === "processing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-1.5 text-primary"
              >
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-[10px] font-medium">Reading operational state…</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input area */}
        <div className="px-4 pt-2 pb-4">
          <CommandInput
            value={input}
            onChange={setInput}
            onFilesDrop={handleFilesDrop}
            droppedFiles={droppedFiles}
            onRemoveFile={handleRemoveFile}
            isProcessing={commandState === "processing"}
          />
        </div>

        {/* Dynamic content area */}
        <AnimatePresence mode="wait">
          {commandState === "preview" && activeIntent && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-4"
            >
              <ActionPreview
                intent={activeIntent}
                documentName={documentName}
                onConfirm={handleConfirmAction}
                onEdit={handleEditAction}
                onCancel={handleCancelAction}
              />
            </motion.div>
          )}

          {commandState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-4 max-h-[400px] overflow-y-auto glassmorphic-scrollbar"
            >
              <SearchResults
                groups={searchResults}
                onDocumentAction={handleDocumentAction}
                onShowInsight={handleShowInsight}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Insight panel (overlay) */}
      <AnimatePresence>
        {showInsight && selectedDocument && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3"
          >
            <InsightPanel
              document={selectedDocument}
              onClose={() => {
                setShowInsight(false);
                setSelectedDocument(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic operational suggestions */}
      <AnimatePresence>
        {commandState === "idle" && !input && droppedFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative mt-4"
          >
            <div className="flex items-center gap-2 mb-2.5 px-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">
                Live operational signals
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {operationalSuggestions.map((s, i) => {
                const tone = toneClasses[s.tone];
                const Icon = s.icon;
                return (
                  <motion.button
                    key={s.label}
                    onClick={() => setInput(s.query)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    whileHover={{ y: -2 }}
                    className={cn(
                      "group relative overflow-hidden text-left",
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-xl",
                      "bg-surface-1/60 backdrop-blur-md",
                      "border border-border/50 hover:border-border",
                      "transition-all duration-200",
                      "hover:bg-surface-1 hover:shadow-[0_8px_24px_-12px_hsl(217_92%_55%_/_0.25)]"
                    )}
                  >
                    <div className={cn(
                      "shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-background/60 ring-1",
                      tone.ring
                    )}>
                      <Icon className={cn("w-3.5 h-3.5", tone.text)} strokeWidth={2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[12.5px] font-medium text-foreground/90 truncate">
                        {s.label}
                      </p>
                    </div>
                    <span className={cn(
                      "shrink-0 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-semibold",
                      "bg-background/60 ring-1", tone.ring, tone.text
                    )}>
                      {s.count}
                    </span>
                    {/* hover sheen */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: "linear-gradient(120deg, transparent 30%, hsl(217 92% 60% / 0.06) 50%, transparent 70%)" }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
