import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Paperclip, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectIntent } from "./intentEngine";
import { ExecutionStage } from "./ExecutionStage";
import { useWorkspace } from "./useWorkspace";

const SUGGESTIONS = [
  "Send the Acme MSA to Sarah for signature",
  "Summarize the Helios deck",
  "Remind everyone with pending signatures",
  "Track Northwind Services Agreement",
  "Automate reminders on expiring contracts",
];

const LIVING_PLACEHOLDERS = [
  "What's the status of the Docsora contract?",
  "Send the Acme MSA to Sarah for signature…",
  "Summarize the Helios deck in 5 bullets",
  "Remind everyone with pending signatures",
  "Who's blocking the Northwind agreement?",
  "Automate reminders on expiring contracts",
  "Draft an NDA for TechCorp and send it",
];
 ...[
  "Find the latest version of the Globex SOW",
  "Show me every contract expiring this quarter",
  "Countersign the Initech agreement and send it back",
  "Track all signatures waiting on legal",
  "Compare v2 and v3 of the Wayne Enterprises MSA",
  "Email the signed Pied Piper NDA to the team",
  "Which deals are stuck in review?",
  "Pull key terms from the Stark Industries contract",
  "Schedule a follow-up if Sarah hasn't signed by Friday",
  "Translate the Soylent agreement to French",
 ],
];

export function CommandHero({ greeting = "Good morning, Alex" }: { greeting?: string }) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { setSelection } = useWorkspace();

  // Living, typewriter-style rotating placeholder
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (input || submittedQuery || files.length) return; // pause when user engages
    const target = LIVING_PLACEHOLDERS[placeholderIdx];
    let timer: number;
    if (phase === "typing") {
      if (typed.length < target.length) {
        timer = window.setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 38);
      } else {
        timer = window.setTimeout(() => setPhase("holding"), 1600);
      }
    } else if (phase === "holding") {
      timer = window.setTimeout(() => setPhase("deleting"), 1200);
    } else {
      if (typed.length > 0) {
        timer = window.setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 18);
      } else {
        setPlaceholderIdx((i) => (i + 1) % LIVING_PLACEHOLDERS.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timer);
  }, [typed, phase, placeholderIdx, input, submittedQuery, files.length]);

  const liveIntent = useMemo(() => detectIntent(input), [input]);
  const submittedIntent = useMemo(
    () => (submittedQuery ? detectIntent(submittedQuery) : null),
    [submittedQuery]
  );

  useEffect(() => {
    if (submittedIntent) {
      setSelection({ kind: "execution", intent: submittedIntent.type });
    }
  }, [submittedIntent, setSelection]);

  const submit = () => {
    if (!input.trim() && !files.length) return;
    setSubmittedQuery(input.trim() || files[0]?.name || "");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
    }));
    setFiles((prev) => [...prev, ...dropped]);
  };

  return (
    <section className="mx-auto max-w-2xl px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-muted-foreground"
      >
        {greeting}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
      >
        What should Docsora handle?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-3 text-sm text-muted-foreground"
      >
        Type a sentence. Drop a file. We'll do the rest.
      </motion.p>

      {/* Command bar */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={cn(
          "mt-8 rounded-2xl border bg-card/70 backdrop-blur-xl shadow-glass transition-all text-left",
          dragOver
            ? "border-primary/60 ring-2 ring-primary/20"
            : "border-border/60 hover:border-border"
        )}
      >
        {files.length > 0 && (
          <div className="px-4 pt-3 flex flex-wrap gap-1.5">
            {files.map((f) => (
              <span
                key={f.id}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted text-xs text-foreground/80"
              >
                <FileText className="w-3 h-3" />
                {f.name}
                <button
                  onClick={() => setFiles((p) => p.filter((x) => x.id !== f.id))}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2 px-4 py-3">
          <button
            aria-label="Attach file"
            className="inline-flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition shrink-0"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={1}
            placeholder={typed || " "}
            className="flex-1 resize-none bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground py-2 max-h-40"
          />
          <button
            onClick={submit}
            disabled={!input.trim() && !files.length}
            className={cn(
              "inline-flex items-center justify-center h-9 w-9 rounded-lg shrink-0 transition",
              input.trim() || files.length
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground"
            )}
            aria-label="Submit"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Live intent chip */}
        <AnimatePresence>
          {liveIntent && !submittedQuery && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 pb-3"
            >
              <div className="inline-flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Detected intent: <span className="text-foreground font-medium">{liveIntent.label}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Execution stage */}
      <AnimatePresence>
        {submittedIntent && submittedQuery && (
          <ExecutionStage intent={submittedIntent} query={submittedQuery} />
        )}
      </AnimatePresence>

      {/* Suggestions */}
      <AnimatePresence>
        {!submittedQuery && !input && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 text-xs rounded-full bg-card/60 backdrop-blur-md border border-border/60 text-foreground/80 hover:bg-card hover:border-border transition"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {submittedQuery && (
        <button
          onClick={() => {
            setSubmittedQuery(null);
            setInput("");
            setFiles([]);
          }}
          className="mt-4 text-xs text-muted-foreground hover:text-foreground transition"
        >
          Start a new command
        </button>
      )}
    </section>
  );
}
