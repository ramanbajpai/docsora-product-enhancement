import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Command, Send, ArrowRight, X, FileText } from "lucide-react";
import { StorageFile } from "@/pages/Storage";
import { cn } from "@/lib/utils";

interface AskDocsoraBarProps {
  value: string;
  onChange: (value: string) => void;
  files: StorageFile[];
  onFileClick: (file: StorageFile) => void;
}

interface AIAnswer {
  text: string;
  files: StorageFile[];
}

const promptStarters = [
  "Show all signed contracts",
  "Which files were edited this week?",
  "Find documents tagged Marketing",
  "Files larger than 1 MB",
  "Anything pending my signature?",
];

// Simulated cross-file AI answer engine — pre-scripted patterns
const generateAnswer = (query: string, files: StorageFile[]): AIAnswer | null => {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  // Signed contracts
  if (/sign(ed)?.*contract|contract.*sign/i.test(q)) {
    const matches = files.filter((f) => f.aiTag === "Contract" && f.status === "signed");
    return {
      text: matches.length
        ? `Found ${matches.length} signed contract${matches.length > 1 ? "s" : ""} in your library.`
        : "No signed contracts found yet — try uploading or signing one.",
      files: matches,
    };
  }

  // Pending
  if (/pending|awaiting|unsigned|need.*sign/i.test(q)) {
    const matches = files.filter((f) => f.status === "pending" || (f.type === "pdf" && f.aiTag === "Contract" && f.status !== "signed"));
    return {
      text: matches.length
        ? `${matches.length} document${matches.length > 1 ? "s are" : " is"} waiting on action.`
        : "Nothing pending — you're all caught up.",
      files: matches,
    };
  }

  // By person/owner
  const personMatch = q.match(/(?:by|from|owned by|edited by)\s+(\w+)/i);
  if (personMatch) {
    const name = personMatch[1].toLowerCase();
    const matches = files.filter((f) => f.owner.toLowerCase().includes(name));
    return {
      text: matches.length
        ? `Found ${matches.length} file${matches.length > 1 ? "s" : ""} owned by people matching "${personMatch[1]}".`
        : `No files found from "${personMatch[1]}".`,
      files: matches,
    };
  }

  // Large files
  if (/large|big|huge|over\s*\d|larger|heavy/i.test(q)) {
    const matches = files.filter((f) => f.size && f.size > 1024 * 1024).sort((a, b) => (b.size || 0) - (a.size || 0));
    return {
      text: matches.length
        ? `${matches.length} file${matches.length > 1 ? "s" : ""} above 1 MB. Largest first.`
        : "All your files are pretty small.",
      files: matches,
    };
  }

  // Recent / this week
  if (/recent|this week|today|latest|new/i.test(q)) {
    const matches = files.slice(0, 5);
    return {
      text: `Showing the ${matches.length} most recently modified files.`,
      files: matches,
    };
  }

  // Tag-based
  const tagMatch = q.match(/tag(?:ged)?\s+(?:as\s+|with\s+)?([a-z0-9-]+)/i);
  if (tagMatch) {
    const tag = tagMatch[1].toLowerCase();
    const matches = files.filter((f) => f.tags?.some((t) => t.toLowerCase().includes(tag)));
    return {
      text: matches.length
        ? `Found ${matches.length} file${matches.length > 1 ? "s" : ""} tagged "${tagMatch[1]}".`
        : `No files tagged "${tagMatch[1]}" yet.`,
      files: matches,
    };
  }

  // Resumes / contracts / invoices etc by category
  const categoryMatch = q.match(/\b(resume|contract|invoice|presentation|proposal|guide|report|deck)s?\b/i);
  if (categoryMatch) {
    const cat = categoryMatch[1].toLowerCase();
    const matches = files.filter((f) => 
      f.aiTag?.toLowerCase().includes(cat) || f.name.toLowerCase().includes(cat)
    );
    return {
      text: matches.length
        ? `Found ${matches.length} ${cat}${matches.length > 1 ? "s" : ""}.`
        : `No ${cat}s found in your library.`,
      files: matches,
    };
  }

  // Fallback fuzzy
  const matches = files.filter(
    (f) =>
      f.name.toLowerCase().includes(q) ||
      f.tags?.some((t) => t.toLowerCase().includes(q)) ||
      f.aiTag?.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q)
  );
  return {
    text: matches.length
      ? `Found ${matches.length} match${matches.length > 1 ? "es" : ""} for "${query}".`
      : `Nothing matched "${query}". Try a different phrase or upload more files.`,
    files: matches,
  };
};

const fileTypeBadge = (type: StorageFile["type"]) => {
  const map: Record<string, { bg: string; text: string }> = {
    pdf:  { bg: "bg-red-500/10",     text: "text-red-500" },
    docx: { bg: "bg-blue-500/10",    text: "text-blue-500" },
    xlsx: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
    mp4:  { bg: "bg-amber-500/10",   text: "text-amber-500" },
  };
  return map[type] || { bg: "bg-muted", text: "text-muted-foreground" };
};

const AskDocsoraBar = ({ value, onChange, files, onFileClick }: AskDocsoraBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<AIAnswer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cmd+K focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isAIQuery = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return false;
    // Heuristic: AI mode if it looks like a question or natural phrase
    return q.length > 8 || /^(show|find|which|what|when|who|where|how|list|get)\b/i.test(q);
  }, [value]);

  const handleAsk = () => {
    if (!value.trim()) return;
    setPendingAnswer(true);
    setShowAnswer(true);
    // Simulate latency
    setTimeout(() => {
      setAiAnswer(generateAnswer(value, files));
      setPendingAnswer(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isAIQuery) {
      e.preventDefault();
      handleAsk();
    }
    if (e.key === "Escape") {
      setShowAnswer(false);
      setIsFocused(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setAiAnswer(null);
    setShowAnswer(false);
    inputRef.current?.focus();
  };

  const handleStarter = (prompt: string) => {
    onChange(prompt);
    setTimeout(() => {
      setPendingAnswer(true);
      setShowAnswer(true);
      setTimeout(() => {
        setAiAnswer(generateAnswer(prompt, files));
        setPendingAnswer(false);
      }, 500);
    }, 50);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Bar */}
      <motion.div
        animate={{
          scale: isFocused ? 1.005 : 1,
          boxShadow: isFocused
            ? "0 12px 40px -12px hsl(var(--primary) / 0.18)"
            : "0 1px 3px -1px hsl(var(--foreground) / 0.05)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative flex items-center gap-3 px-4 py-3 rounded-2xl border bg-card/80 backdrop-blur-md transition-colors",
          isFocused ? "border-primary/40" : "border-border/50 hover:border-border"
        )}
      >
        {isAIQuery ? (
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
          </motion.div>
        ) : (
          <Search className={cn(
            "w-5 h-5 shrink-0 transition-colors",
            isFocused ? "text-primary" : "text-muted-foreground"
          )} />
        )}

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search files or ask Docsora anything…"
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
        />

        {value && (
          <button
            onClick={handleClear}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {isAIQuery ? (
          <button
            onClick={handleAsk}
            disabled={pendingAnswer}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            <Send className="w-3 h-3" />
            Ask
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground/60">
            <kbd className="px-1.5 py-0.5 rounded bg-surface-3 font-mono text-[10px] flex items-center">
              <Command className="w-2.5 h-2.5" />
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-surface-3 font-mono text-[10px]">K</kbd>
          </div>
        )}
      </motion.div>

      {/* Dropdown — prompt starters or AI answer */}
      <AnimatePresence>
        {isFocused && !showAnswer && !value && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 z-40 bg-card border border-border/50 rounded-xl shadow-xl shadow-black/10 overflow-hidden"
          >
            <div className="p-3 border-b border-border/30">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-primary" />
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Ask Docsora
                </p>
              </div>
            </div>
            <div className="p-2">
              {promptStarters.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleStarter(prompt)}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-left hover:bg-surface-2 transition-colors group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary/50 shrink-0" />
                  <span className="text-foreground/80 group-hover:text-foreground flex-1">{prompt}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 mt-2 z-40 bg-card border border-border/50 rounded-xl shadow-xl shadow-black/10 overflow-hidden"
          >
            {/* Answer header */}
            <div className="flex items-start gap-3 p-4 border-b border-border/30 bg-primary/5">
              <div className="shrink-0 w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                {pendingAnswer ? (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">Searching across all files…</span>
                  </div>
                ) : (
                  <p className="text-sm text-foreground leading-relaxed">{aiAnswer?.text}</p>
                )}
              </div>
              <button
                onClick={() => setShowAnswer(false)}
                className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Result files */}
            {!pendingAnswer && aiAnswer && aiAnswer.files.length > 0 && (
              <div className="max-h-72 overflow-y-auto p-1.5">
                {aiAnswer.files.map((file) => {
                  const badge = fileTypeBadge(file.type);
                  return (
                    <button
                      key={file.id}
                      onClick={() => {
                        onFileClick(file);
                        setShowAnswer(false);
                        setIsFocused(false);
                      }}
                      className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-surface-2 transition-colors text-left group"
                    >
                      <div className={cn("shrink-0 w-8 h-8 rounded-md flex items-center justify-center", badge.bg)}>
                        <FileText className={cn("w-3.5 h-3.5", badge.text)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">{file.name}</p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {file.owner} · {file.lastModified}
                          {file.aiTag && <> · <span className="text-primary">{file.aiTag}</span></>}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            )}

            <div className="px-4 py-2 border-t border-border/30 bg-muted/30 flex items-center justify-between">
              <p className="text-[10px] text-muted-foreground">
                Powered by <span className="text-primary font-medium">Docsora AI</span>
              </p>
              <kbd className="px-1.5 py-0.5 rounded bg-background border border-border/50 font-mono text-[9px] text-muted-foreground">esc</kbd>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AskDocsoraBar;