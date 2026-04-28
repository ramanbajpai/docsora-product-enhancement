import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, User, Send, Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type FollowUpKind = "signature" | "transfer" | "review" | "approval";

interface FollowUp {
  id: string;
  document: string;
  status: string;
  blocker?: string;
  suggestion: string;
  kind: FollowUpKind;
}

const initialFollowUps: FollowUp[] = [
  {
    id: "f1",
    document: "NDA — Acme Corp",
    status: "Awaiting signature",
    blocker: "Sarah Chen",
    suggestion: "Docsora will remind in 4 hours",
    kind: "signature",
  },
  {
    id: "f2",
    document: "Q4 Report.pdf",
    status: "Transfer link unopened",
    blocker: "3 recipients",
    suggestion: "Suggested resend tomorrow at 9:00",
    kind: "transfer",
  },
  {
    id: "f3",
    document: "Contract_v2.docx",
    status: "AI suggestions ready to review",
    suggestion: "Review when you're back at your desk",
    kind: "review",
  },
  {
    id: "f4",
    document: "Partnership Agreement",
    status: "Awaiting countersignature",
    blocker: "Legal team",
    suggestion: "Follow-up scheduled for Friday",
    kind: "approval",
  },
];

function FollowUpItem({
  item,
  onResolve,
}: {
  item: FollowUp;
  onResolve: (id: string) => void;
}) {
  const [resolving, setResolving] = useState(false);

  const handleSendNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResolving(true);
    setTimeout(() => onResolve(item.id), 350);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: resolving ? 0 : 1, y: 0, height: resolving ? 0 : "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "p-4 group transition-colors hover:bg-surface-2",
        resolving && "overflow-hidden"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {item.document}
          </p>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
            <span className="truncate">{item.status}</span>
            {item.blocker && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1 truncate">
                  <User className="w-3 h-3" />
                  {item.blocker}
                </span>
              </>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-primary/80">
            <Clock className="w-3 h-3" />
            <span className="truncate">{item.suggestion}</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleSendNow}
              className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5"
            >
              <Send className="w-3 h-3" />
              Send now
            </button>
            <button className="text-xs font-medium px-2.5 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-2 transition-colors flex items-center gap-1.5">
              <Pencil className="w-3 h-3" />
              Edit timing
            </button>
          </div>
        </div>

        {resolving && (
          <div className="text-success">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function SmartFollowUps() {
  const [items, setItems] = useState<FollowUp[]>(initialFollowUps);

  const resolve = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="font-hint text-xs text-muted-foreground tracking-wider">
            Assisted
          </span>
          <h2 className="text-lg font-semibold text-foreground mt-1">
            Follow-ups
          </h2>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-primary" />
          Auto-scheduled
        </span>
      </div>

      <div className="glass-card divide-y divide-border overflow-hidden">
        {items.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Check className="w-5 h-5 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">
              All caught up — nothing needs your attention
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <FollowUpItem key={item.id} item={item} onResolve={resolve} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.section>
  );
}
