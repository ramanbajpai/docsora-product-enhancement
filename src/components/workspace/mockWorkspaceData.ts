import { PriorityItem, ActivityItem } from "./types";

export const PRIORITY_ITEMS: PriorityItem[] = [
  { id: "p1", title: "Acme MSA expiring in 6h", subtitle: "Sarah Chen hasn't opened the request", urgency: "critical", intent: "remind", due: "6h" },
  { id: "p2", title: "Helios deck waiting on legal", subtitle: "3 redlines from Elena Rossi", urgency: "high", intent: "track" },
  { id: "p3", title: "TechCorp NDA ready to send", subtitle: "Drafted yesterday — never delivered", urgency: "high", intent: "send" },
  { id: "p4", title: "Q4 Board Report needs summary", subtitle: "Board meeting tomorrow 9am", urgency: "medium", intent: "summarize" },
  { id: "p5", title: "Northwind Services Agreement", subtitle: "Counterparty signed — yours pending", urgency: "medium", intent: "sign" },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: "a1", title: "Reminded Sarah Chen", meta: "Acme MSA · auto-followed up", status: "done", intent: "remind", timestamp: "2m" },
  { id: "a2", title: "Summarizing Helios Deck", meta: "22 pages · streaming insights", status: "running", intent: "summarize", timestamp: "now" },
  { id: "a3", title: "Secure link generated", meta: "TechCorp NDA · expires in 7d", status: "done", intent: "send", timestamp: "11m" },
  { id: "a4", title: "Tracking Northwind signing", meta: "Counterparty viewed · awaiting Alex", status: "running", intent: "track", timestamp: "now" },
  { id: "a5", title: "Automation created", meta: "Auto-remind every 24h on expiring MSAs", status: "done", intent: "automate", timestamp: "1h" },
  { id: "a6", title: "Routing Helios for review", meta: "Queued for Elena Rossi", status: "queued", intent: "send", timestamp: "queued" },
];
