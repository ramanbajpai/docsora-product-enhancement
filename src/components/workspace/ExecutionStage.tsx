import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  FileText,
  Loader2,
  Link2,
  Copy,
  PenTool,
  Bell,
  Sparkles,
  Activity,
  Zap,
  Search,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DetectedIntent } from "./types";
import { findContacts, findFiles } from "./mockLibrary";

interface Step {
  id: string;
  label: string;
}

const STEPS_BY_INTENT: Record<string, Step[]> = {
  sign: [
    { id: "locate", label: "Locating document" },
    { id: "recipients", label: "Identifying signers" },
    { id: "fields", label: "Placing signature fields" },
    { id: "deliver", label: "Delivering for signature" },
  ],
  send: [
    { id: "locate", label: "Locating document" },
    { id: "secure", label: "Applying security policy" },
    { id: "link", label: "Generating secure link" },
    { id: "deliver", label: "Notifying recipient" },
  ],
  remind: [
    { id: "locate", label: "Finding open requests" },
    { id: "draft", label: "Drafting reminder" },
    { id: "deliver", label: "Sending reminder" },
  ],
  summarize: [
    { id: "locate", label: "Locating document" },
    { id: "read", label: "Reading 22 pages" },
    { id: "extract", label: "Extracting key insights" },
  ],
  track: [
    { id: "scan", label: "Scanning recent activity" },
    { id: "blockers", label: "Identifying blockers" },
    { id: "timeline", label: "Building timeline" },
  ],
  automate: [
    { id: "parse", label: "Parsing rule" },
    { id: "validate", label: "Validating triggers" },
    { id: "deploy", label: "Deploying automation" },
  ],
  search: [
    { id: "scan", label: "Searching library" },
    { id: "rank", label: "Ranking results" },
  ],
};

const INTENT_ICONS: Record<string, any> = {
  sign: PenTool,
  send: Send,
  remind: Bell,
  summarize: Sparkles,
  track: Activity,
  automate: Zap,
  search: Search,
};

export function ExecutionStage({ intent, query }: { intent: DetectedIntent; query: string }) {
  const steps = STEPS_BY_INTENT[intent.type] || STEPS_BY_INTENT.search;
  const Icon = INTENT_ICONS[intent.type] || Sparkles;
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const file = findFiles(query)[0] || findFiles(intent.fileHint || "")[0];
  const contact = findContacts(query)[0] || findContacts(intent.recipientHint || "")[0];

  useEffect(() => {
    setStepIdx(0);
    setDone(false);
    const timers: number[] = [];
    steps.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStepIdx(i + 1), (i + 1) * 700));
    });
    timers.push(window.setTimeout(() => setDone(true), steps.length * 700 + 200));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent.type, query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="mt-4 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-glass p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-primary/10 border border-primary/20">
          <Icon className="w-3.5 h-3.5 text-primary" />
        </span>
        <span className="text-xs font-medium text-foreground/80 uppercase tracking-wider">
          {intent.label}
        </span>
        <span className="ml-auto text-[10px] text-muted-foreground">
          confidence {(intent.confidence * 100).toFixed(0)}%
        </span>
      </div>

      {/* Steps */}
      <ol className="space-y-2">
        {steps.map((s, i) => {
          const status = i < stepIdx ? "done" : i === stepIdx ? "running" : "pending";
          return (
            <li key={s.id} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "inline-flex h-5 w-5 items-center justify-center rounded-full border transition-colors",
                  status === "done" && "bg-primary text-primary-foreground border-primary",
                  status === "running" && "border-primary/50 text-primary",
                  status === "pending" && "border-border text-muted-foreground/50"
                )}
              >
                {status === "done" ? (
                  <Check className="w-3 h-3" />
                ) : status === "running" ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={cn(
                  "transition-colors",
                  status === "pending" ? "text-muted-foreground" : "text-foreground"
                )}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Outcome */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 pt-5 border-t border-border/60"
          >
            {intent.type === "sign" && (
              <SignOutcome fileName={file?.name || "Selected document"} signer={contact?.name || "Sarah Chen"} />
            )}
            {intent.type === "send" && (
              <SendOutcome fileName={file?.name || "Selected document"} copied={copied} onCopy={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} />
            )}
            {intent.type === "remind" && (
              <RemindOutcome recipient={contact?.name || "Sarah Chen"} />
            )}
            {intent.type === "summarize" && (
              <SummarizeOutcome fileName={file?.name || "Helios Pitch Deck.pdf"} />
            )}
            {intent.type === "track" && <TrackOutcome />}
            {intent.type === "automate" && <AutomateOutcome query={query} />}
            {intent.type === "search" && <SearchOutcome query={query} />}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SignOutcome({ fileName, signer }: { fileName: string; signer: string }) {
  return (
    <div className="grid gap-3 md:grid-cols-[1fr_180px]">
      <div>
        <p className="text-sm text-foreground">
          <span className="font-medium">{fileName}</span> routed to{" "}
          <span className="font-medium">{signer}</span> with 2 signature fields placed by AI.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 text-xs text-success">
          <Check className="w-3.5 h-3.5" /> Delivered · awaiting signature
        </div>
      </div>
      <div className="relative h-[120px] rounded-lg border border-border/60 bg-surface-1 p-2 overflow-hidden">
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-1 rounded bg-muted/80" style={{ width: `${60 + (i * 7) % 35}%` }} />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-3 right-3 px-1.5 py-0.5 rounded text-[9px] font-medium bg-primary text-primary-foreground"
        >
          Sign here
        </motion.div>
      </div>
    </div>
  );
}

function SendOutcome({ fileName, copied, onCopy }: { fileName: string; copied: boolean; onCopy: () => void }) {
  const url = `https://docsora.app/s/${fileName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 18)}-x9k`;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">end-to-end encrypted</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">expires in 7d</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">one-time link</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-surface-1 px-3 py-2">
        <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-mono text-foreground/80 truncate flex-1">{url}</span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/15 transition"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

function RemindOutcome({ recipient }: { recipient: string }) {
  const [text, setText] = useState("");
  const full = `Hi ${recipient.split(" ")[0]}, just a quick nudge — the document is still waiting on your signature. Let me know if anything is blocking you.`;
  useEffect(() => {
    setText("");
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setText(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [recipient]);
  return (
    <div className="rounded-lg border border-border/60 bg-surface-1 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Reminder draft · sent</div>
      <p className="text-sm text-foreground/90 leading-relaxed">{text}<span className="opacity-50">▍</span></p>
    </div>
  );
}

function SummarizeOutcome({ fileName }: { fileName: string }) {
  const points = [
    "Revenue grew 38% QoQ driven by enterprise expansion",
    "Net retention at 127% — strongest cohort to date",
    "Series B raise of $24M led by Sequoia, closing in 3 weeks",
    "Two key risks: hiring velocity and EU compliance timing",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    setShown(0);
    const timers = points.map((_, i) => window.setTimeout(() => setShown(i + 1), (i + 1) * 350));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line
  }, [fileName]);
  return (
    <div>
      <div className="text-xs text-muted-foreground mb-2">{fileName} · key insights</div>
      <ul className="space-y-1.5">
        {points.slice(0, shown).map((p, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary" />
            <span>{p}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function TrackOutcome() {
  const events = [
    { t: "9:14am", label: "Sent to Sarah Chen", status: "done" },
    { t: "10:02am", label: "Opened by Sarah Chen", status: "done" },
    { t: "Yesterday", label: "Forwarded to legal", status: "done" },
    { t: "Now", label: "Awaiting Elena Rossi review", status: "running" },
  ];
  return (
    <ol className="space-y-2">
      {events.map((e, i) => (
        <li key={i} className="flex items-center gap-3 text-sm">
          <span className="text-[10px] tabular-nums text-muted-foreground w-16">{e.t}</span>
          <span className={cn("h-1.5 w-1.5 rounded-full", e.status === "running" ? "bg-primary animate-pulse" : "bg-success")} />
          <span className="text-foreground/90">{e.label}</span>
        </li>
      ))}
    </ol>
  );
}

function AutomateOutcome({ query }: { query: string }) {
  return (
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <Zap className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">Automation deployed</span>
      </div>
      <p className="text-sm text-foreground/90">
        From now on: <span className="font-medium">{query}</span>
      </p>
      <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
        <Check className="w-3 h-3 text-success" /> Active · running on every match
      </div>
    </div>
  );
}

function SearchOutcome({ query }: { query: string }) {
  const results = findFiles(query).slice(0, 4);
  if (!results.length) {
    return <p className="text-sm text-muted-foreground">No matches in your library yet.</p>;
  }
  return (
    <ul className="space-y-1.5">
      {results.map((r) => (
        <li key={r.id} className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted/40 transition">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <div className="flex-1 min-w-0">
            <div className="text-sm text-foreground truncate">{r.name}</div>
            <div className="text-[10px] text-muted-foreground">{r.pages} pages · {r.updatedAt} · {r.owner}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
