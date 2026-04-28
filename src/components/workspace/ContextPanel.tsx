import { motion, AnimatePresence } from "framer-motion";
import { FileText, Shield, Users, Activity, Sparkles, X } from "lucide-react";
import { useWorkspace } from "./useWorkspace";
import { PRIORITY_ITEMS, ACTIVITY_ITEMS } from "./mockWorkspaceData";

export function ContextPanel() {
  const { selection, setSelection } = useWorkspace();

  return (
    <aside className="hidden xl:block fixed right-6 top-24 bottom-6 w-[320px] z-30">
      <AnimatePresence mode="wait">
        {!selection ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full rounded-2xl border border-border/60 bg-card/40 backdrop-blur-xl p-5 flex flex-col items-center justify-center text-center"
          >
            <div className="h-10 w-10 rounded-full bg-muted/60 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">Context appears here</p>
            <p className="mt-1 text-xs text-muted-foreground max-w-[220px]">
              Select a priority item, activity, or run a command to see live context.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={JSON.stringify(selection)}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            className="h-full rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Context</span>
              <button
                onClick={() => setSelection(null)}
                className="text-muted-foreground hover:text-foreground transition"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <ContextBody />
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}

function ContextBody() {
  const { selection } = useWorkspace();
  if (!selection) return null;

  if (selection.kind === "priority") {
    const item = PRIORITY_ITEMS.find((p) => p.id === selection.id);
    if (!item) return null;
    return (
      <div>
        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
        <div className="mt-4 space-y-3">
          <Section icon={Shield} label="Risk signals">
            <li>Counterparty hasn't opened in 48h</li>
            <li>Renewal window closes in {item.due ?? "soon"}</li>
            <li>3 prior reminders, no response</li>
          </Section>
          <Section icon={Users} label="People involved">
            <li>Sarah Chen — Acme · Procurement</li>
            <li>Elena Rossi — Docsora · Legal</li>
          </Section>
          <button className="w-full mt-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium py-2 hover:bg-primary/90 transition">
            Let Docsora handle this
          </button>
        </div>
      </div>
    );
  }

  if (selection.kind === "activity") {
    const item = ACTIVITY_ITEMS.find((a) => a.id === selection.id);
    if (!item) return null;
    return (
      <div>
        <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.meta}</p>
        <div className="mt-4 space-y-3">
          <Section icon={Activity} label="Timeline">
            <li>Triggered by Alex · {item.timestamp}</li>
            <li>Agent acquired document</li>
            <li>Action {item.status === "done" ? "completed" : item.status}</li>
          </Section>
        </div>
      </div>
    );
  }

  // execution
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">Live execution</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Docsora is handling this command. Context updates as it progresses.
      </p>
      <div className="mt-4 space-y-3">
        <Section icon={FileText} label="Working on">
          <li>1 document detected</li>
          <li>Recipients resolved automatically</li>
        </Section>
        <Section icon={Shield} label="Policies applied">
          <li>End-to-end encryption</li>
          <li>Audit trail recording</li>
        </Section>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  label,
  children,
}: {
  icon: any;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-surface-1/60 p-3">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      <ul className="space-y-1 text-sm text-foreground/85 list-disc list-inside marker:text-muted-foreground">
        {children}
      </ul>
    </div>
  );
}
