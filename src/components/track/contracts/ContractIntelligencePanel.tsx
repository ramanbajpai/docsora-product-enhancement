import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Building2, Calendar, RefreshCw, Sparkles, AlertTriangle,
  CheckCircle2, Clock, Send, FileText, Users, Activity, GitBranch,
  MessageSquare, Globe, ShieldAlert, ArrowRight, PlayCircle,
  XCircle, Edit3, ListChecks, History, Eye, Bot, User, ChevronRight,
  Download, ExternalLink, Plus,
} from "lucide-react";
import { format, differenceInDays } from "date-fns";
import type { Contract } from "@/pages/Track";
import type { ObligationStatus } from "./types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { buildIntelligenceFor } from "./mockIntelligence";

interface Props {
  contract: Contract;
  onClose: () => void;
  onUpdate: (c: Contract) => void;
  onOpenPortal: () => void;
}

type Tab = "overview" | "obligations" | "versions" | "activity" | "chat";

const healthMeta = {
  green: { label: "Healthy", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  amber: { label: "Needs review", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  red: { label: "At risk", className: "bg-red-500/10 text-red-500 border-red-500/20" },
} as const;

const obligationMeta: Record<ObligationStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-muted text-muted-foreground" },
  in_progress: { label: "In progress", className: "bg-blue-500/10 text-blue-500" },
  completed: { label: "Completed", className: "bg-emerald-500/10 text-emerald-500" },
  overdue: { label: "Overdue", className: "bg-red-500/10 text-red-500" },
};

export function ContractIntelligencePanel({ contract, onClose, onUpdate, onOpenPortal }: Props) {
  const [tab, setTab] = useState<Tab>("overview");
  const intel = useMemo(() => contract.intelligence ?? buildIntelligenceFor(contract), [contract]);
  const days = differenceInDays(contract.expiryDate, new Date());
  const noticeDaysLeft = differenceInDays(intel.noticeDeadline, new Date());

  // Suggested action
  const suggestion = useMemo(() => {
    if (contract.renewalType === "auto" && noticeDaysLeft >= 0 && noticeDaysLeft <= 7) {
      return { tone: "red" as const, title: `Auto-renews in ${days} days`, body: "Recommended: Review terms or cancel before notice deadline." };
    }
    if (days < 0) return { tone: "red" as const, title: "Contract has expired", body: "Recommended: Renew immediately or archive." };
    if (days <= 30) return { tone: "amber" as const, title: `Expires in ${days} days`, body: "Decide now: renew, renegotiate, or let it expire." };
    if (contract.renewalType === "auto") return { tone: "amber" as const, title: "Auto-renewal active", body: `Notice window opens ${format(intel.noticeDeadline, "MMM d, yyyy")}.` };
    return { tone: "green" as const, title: "All clear for now", body: `${days} days until expiry. Next reminder will fire 90 days out.` };
  }, [contract, days, intel.noticeDeadline, noticeDaysLeft]);

  return (
    <div className="h-[calc(100vh-200px)] sticky top-8 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-border/50">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className={`text-[10px] gap-1 ${healthMeta[intel.health].className}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${intel.health === "green" ? "bg-emerald-500" : intel.health === "amber" ? "bg-amber-500" : "bg-red-500"}`} />
                {healthMeta[intel.health].label}
              </Badge>
              {contract.renewalType === "auto" && (
                <Badge variant="outline" className="text-[10px] gap-1 bg-amber-500/10 text-amber-500 border-amber-500/20">
                  <RefreshCw className="w-2.5 h-2.5" /> Auto-renews
                </Badge>
              )}
            </div>
            <h2 className="text-base font-semibold text-foreground truncate">{contract.name}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
              <Building2 className="w-3 h-3" />
              <span className="truncate">{contract.company}</span>
              {contract.value && <><span>•</span><span className="text-foreground font-medium">{contract.value}</span></>}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* SUGGESTED ACTION */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg border p-3 ${
            suggestion.tone === "red"
              ? "border-red-500/20 bg-red-500/5"
              : suggestion.tone === "amber"
                ? "border-amber-500/20 bg-amber-500/5"
                : "border-emerald-500/20 bg-emerald-500/5"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className={`w-3.5 h-3.5 ${suggestion.tone === "red" ? "text-red-500" : suggestion.tone === "amber" ? "text-amber-500" : "text-emerald-500"}`} />
            <span className="text-xs font-semibold text-foreground">{suggestion.title}</span>
          </div>
          <p className="text-xs text-muted-foreground">{suggestion.body}</p>
        </motion.div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-border/50 px-5 overflow-x-auto">
        {([
          { id: "overview", icon: FileText, label: "Overview" },
          { id: "obligations", icon: ListChecks, label: "Obligations" },
          { id: "versions", icon: GitBranch, label: "Versions" },
          { id: "activity", icon: History, label: "Activity" },
          { id: "chat", icon: MessageSquare, label: "Ask AI" },
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative py-3 px-3 text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
            {tab === t.id && <motion.div layoutId="contractIntelTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {tab === "overview" && (
            <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-5">
              {/* AI Summary */}
              <Section icon={Sparkles} title="AI Summary" highlight>
                <p className="text-sm text-foreground leading-relaxed">{intel.summary}</p>
              </Section>

              {/* Key dates */}
              <div className="grid grid-cols-2 gap-2">
                <KV label="Start" value={format(contract.startDate, "MMM d, yyyy")} />
                <KV label="Expiry" value={format(contract.expiryDate, "MMM d, yyyy")} tone={days <= 30 ? "warn" : "default"} />
                <KV label="Notice deadline" value={format(intel.noticeDeadline, "MMM d, yyyy")} tone={noticeDaysLeft <= 14 ? "warn" : "default"} />
                <KV label="Days remaining" value={days > 0 ? `${days} days` : `${Math.abs(days)}d overdue`} tone={days <= 30 ? "warn" : "default"} />
              </div>

              {/* Risk flags */}
              <Section icon={ShieldAlert} title={`Risk flags (${intel.risks.length})`}>
                <div className="space-y-1.5">
                  {intel.risks.map(r => (
                    <div key={r.id} className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                        r.level === "high" ? "bg-red-500" : r.level === "medium" ? "bg-amber-500" : "bg-emerald-500"
                      }`} />
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground">{r.title}</div>
                        <div className="text-xs text-muted-foreground">{r.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Parties */}
              <Section icon={Users} title={`Parties (${contract.parties.length})`}>
                <div className="space-y-1.5">
                  {contract.parties.map((p, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{p.email}</div>
                      </div>
                      <Badge variant="secondary" className="text-[10px]">{p.role}</Badge>
                    </div>
                  ))}
                </div>
              </Section>

              {/* Document preview */}
              <Section icon={FileText} title="Document">
                <div className="rounded-md border border-border/50 bg-muted/20 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Inline preview</p>
                  </div>
                </div>
              </Section>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <KV label="Payment terms" value={intel.paymentTerms || "—"} />
                <KV label="Governing law" value={intel.governingLaw || "—"} />
              </div>
            </motion.div>
          )}

          {tab === "obligations" && (
            <motion.div key="ob" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Track commitments owed under this contract.</p>
                <Button size="sm" variant="outline" className="gap-1 h-7 text-xs">
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </div>
              {intel.obligations.map(o => (
                <div key={o.id} className="p-3 rounded-lg border border-border/50 bg-card/40">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="text-sm font-medium text-foreground">{o.title}</div>
                    <Badge variant="outline" className={`text-[10px] ${obligationMeta[o.status].className}`}>
                      {obligationMeta[o.status].label}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {o.owner}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {format(o.dueDate, "MMM d")}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "versions" && (
            <motion.div key="vs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5 space-y-3">
              <p className="text-xs text-muted-foreground">All historical versions, side-by-side compare available.</p>
              {intel.versions.map(v => (
                <div key={v.id} className={`p-3 rounded-lg border ${v.current ? "border-primary/30 bg-primary/5" : "border-border/50 bg-card/40"}`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{v.version}</span>
                      {v.current && <Badge className="text-[10px] h-4 px-1.5">Current</Badge>}
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                      <Eye className="w-3 h-3" /> Compare
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{v.summary}</p>
                  <div className="text-[11px] text-muted-foreground">
                    {v.author} · {format(v.date, "MMM d, yyyy")}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {tab === "activity" && (
            <motion.div key="ac" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-5">
              <div className="relative pl-5">
                <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
                <div className="space-y-4">
                  {intel.activity.map(e => (
                    <div key={e.id} className="relative">
                      <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-background border-2 border-primary/40" />
                      <div className="text-xs font-medium text-foreground">{e.description}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        {e.actor} · {format(e.date, "MMM d, yyyy")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === "chat" && <ContractChat contract={contract} />}
        </AnimatePresence>
      </div>

      {/* ACTION PANEL */}
      <div className="border-t border-border/50 bg-muted/10 p-3">
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            className="gap-1.5 h-8 text-xs"
            onClick={() => toast.success("Renewal contract drafted by AI")}
          >
            <RefreshCw className="w-3 h-3" /> Renew
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
            onClick={() => toast.success("Renegotiation request sent")}
          >
            <Edit3 className="w-3 h-3" /> Renegotiate
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
            onClick={() => toast.success("Sent for signature")}
          >
            <Send className="w-3 h-3" /> Send to sign
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 h-8 text-xs"
            onClick={onOpenPortal}
          >
            <ExternalLink className="w-3 h-3" /> Counterparty view
          </Button>
        </div>
        <button
          onClick={() => toast.success("Contract cancelled")}
          className="w-full mt-2 text-[11px] text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center gap-1"
        >
          <XCircle className="w-3 h-3" /> Cancel contract
        </button>
      </div>
    </div>
  );
}

function Section({
  icon: Icon, title, children, highlight = false,
}: { icon: any; title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-lg border border-primary/20 bg-primary/5 p-3" : ""}>
      <div className={`flex items-center gap-1.5 mb-2 ${highlight ? "text-primary" : "text-muted-foreground"}`}>
        <Icon className="w-3.5 h-3.5" />
        <span className={`text-xs font-semibold ${highlight ? "text-primary" : ""}`}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function KV({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "warn" }) {
  return (
    <div className="p-2.5 rounded-md bg-muted/30">
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</div>
      <div className={`text-xs font-medium ${tone === "warn" ? "text-amber-500" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

function ContractChat({ contract }: { contract: Contract }) {
  const intel = contract.intelligence ?? buildIntelligenceFor(contract);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: `Hi! I've read "${contract.name}" with ${contract.company}. Ask me anything — expiry, payment terms, risks, obligations.` },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMessages(m => [...m, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      const lower = q.toLowerCase();
      let answer = "I'd need to re-read the document for that — but here's what I have so far.";
      if (lower.includes("expir") || lower.includes("end") || lower.includes("when")) {
        answer = `This contract expires on ${format(contract.expiryDate, "MMMM d, yyyy")} (${differenceInDays(contract.expiryDate, new Date())} days from now).`;
      } else if (lower.includes("notice") || lower.includes("cancel")) {
        answer = `Notice period is ${intel.noticePeriodDays} days. The deadline to act is ${format(intel.noticeDeadline, "MMMM d, yyyy")}.`;
      } else if (lower.includes("pay") || lower.includes("term")) {
        answer = `Payment terms: ${intel.paymentTerms}. Annual value: ${contract.value || "—"}.`;
      } else if (lower.includes("risk") || lower.includes("flag")) {
        answer = `I flagged ${intel.risks.length} risks. The biggest: ${intel.risks[0]?.title} — ${intel.risks[0]?.detail}`;
      } else if (lower.includes("party") || lower.includes("who")) {
        answer = `Parties: ${contract.parties.map(p => `${p.name} (${p.role})`).join(", ")}.`;
      } else if (lower.includes("renew")) {
        answer = `Renewal type: ${contract.renewalType}. ${contract.renewalType === "auto" ? `Auto-renews unless cancelled by ${format(intel.noticeDeadline, "MMM d, yyyy")}.` : "Requires manual decision before expiry."}`;
      }
      setMessages(m => [...m, { role: "ai", text: answer }]);
    }, 600);
  };

  const suggestions = ["When does this expire?", "What's the notice period?", "What are the risks?", "Payment terms?"];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.role === "ai" ? "bg-primary/10" : "bg-muted"}`}>
              {m.role === "ai" ? <Bot className="w-3 h-3 text-primary" /> : <User className="w-3 h-3" />}
            </div>
            <div className={`text-xs px-3 py-2 rounded-lg max-w-[85%] ${
              m.role === "ai" ? "bg-muted/40 text-foreground" : "bg-primary text-primary-foreground"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-3 border-t border-border/50 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => ask(s)}
              className="text-[10px] px-2 py-1 rounded-full bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
        <form onSubmit={e => { e.preventDefault(); ask(input); }} className="flex gap-1.5">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about this contract…"
            className="h-8 text-xs"
          />
          <Button type="submit" size="sm" className="h-8 w-8 p-0">
            <Send className="w-3 h-3" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
