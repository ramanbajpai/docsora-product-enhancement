export type IntentType =
  | "sign"
  | "send"
  | "remind"
  | "summarize"
  | "track"
  | "automate"
  | "search"
  | "unknown";

export interface DetectedIntent {
  type: IntentType;
  label: string;
  confidence: number;
  fileHint?: string;
  recipientHint?: string;
}

export interface MockFile {
  id: string;
  name: string;
  kind: "contract" | "deck" | "report" | "nda" | "msa" | "invoice";
  updatedAt: string;
  pages: number;
  owner: string;
}

export interface MockContact {
  id: string;
  name: string;
  email: string;
  org: string;
  role: string;
}

export interface PriorityItem {
  id: string;
  title: string;
  subtitle: string;
  urgency: "critical" | "high" | "medium";
  intent: IntentType;
  due?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  meta: string;
  status: "running" | "done" | "queued";
  intent: IntentType;
  timestamp: string;
}

export type ContextSelection =
  | { kind: "priority"; id: string }
  | { kind: "activity"; id: string }
  | { kind: "execution"; intent: IntentType; file?: MockFile; recipients?: MockContact[] }
  | null;
