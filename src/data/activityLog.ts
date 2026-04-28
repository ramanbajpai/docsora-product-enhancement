/**
 * Activity log — future-ready data model.
 *
 * This is intentionally structured to support team/org-wide audit later:
 * - actor: who performed the action (user, or "system" for automation)
 * - workspaceId: scope to a workspace/team
 * - subject: the document/resource it relates to
 * - context: optional ip/location/device/userAgent for future audit UI
 * - id: stable activity id for deep-linking and reporting
 *
 * Today the dashboard renders this for a single user. Tomorrow an admin
 * can render the same shape filtered by user, workspace, or org.
 */

export type ActivityType =
  | "sent"
  | "received"
  | "signed"
  | "downloaded"
  | "converted"
  | "compressed"
  | "viewed"
  | "shared";

export interface ActivityActor {
  id: string;
  name: string;
  email: string;
  kind: "user" | "system" | "external";
}

export interface ActivitySubject {
  id: string;
  name: string;
  kind: "document" | "transfer" | "signature_request";
  href?: string;
}

export interface ActivityContext {
  ip?: string;
  location?: string;
  device?: string;
  userAgent?: string;
}

export interface ActivityEvent {
  id: string;
  workspaceId: string;
  type: ActivityType;
  actor: ActivityActor;
  subject: ActivitySubject;
  description: string; // human-readable, e.g. "Sent for signature"
  counterpartyEmail?: string;
  timestamp: string; // ISO
  context?: ActivityContext;
}

const me: ActivityActor = {
  id: "u_me",
  name: "Alex Morgan",
  email: "alex@docsora.com",
  kind: "user",
};

const system: ActivityActor = {
  id: "system",
  name: "Docsora",
  email: "system@docsora.com",
  kind: "system",
};

const now = new Date();
const hoursAgo = (h: number) =>
  new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) =>
  new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const activityLog: ActivityEvent[] = [
  {
    id: "act_001",
    workspaceId: "ws_main",
    type: "received",
    actor: { id: "ext_1", name: "user@gmail.com", email: "user@gmail.com", kind: "external" },
    subject: { id: "doc_1", name: "Try Docsora.pdf", kind: "document", href: "/storage" },
    description: "Received from user@gmail.com",
    counterpartyEmail: "user@gmail.com",
    timestamp: hoursAgo(2),
  },
  {
    id: "act_002",
    workspaceId: "ws_main",
    type: "sent",
    actor: me,
    subject: { id: "doc_2", name: "Docsora Pitch Deck.pdf", kind: "signature_request", href: "/track" },
    description: "Sent for signature to 2 recipients",
    timestamp: hoursAgo(6),
  },
  {
    id: "act_003",
    workspaceId: "ws_main",
    type: "viewed",
    actor: { id: "ext_2", name: "Sarah Chen", email: "sarah@acme.co", kind: "external" },
    subject: { id: "doc_2", name: "Docsora Pitch Deck.pdf", kind: "signature_request", href: "/track" },
    description: "Viewed by Sarah Chen",
    counterpartyEmail: "sarah@acme.co",
    timestamp: hoursAgo(20),
  },
  {
    id: "act_004",
    workspaceId: "ws_main",
    type: "signed",
    actor: { id: "ext_2", name: "Sarah Chen", email: "sarah@acme.co", kind: "external" },
    subject: { id: "doc_3", name: "Acme MSA.pdf", kind: "signature_request", href: "/track" },
    description: "Signed by Sarah Chen",
    counterpartyEmail: "sarah@acme.co",
    timestamp: daysAgo(1),
  },
  {
    id: "act_005",
    workspaceId: "ws_main",
    type: "converted",
    actor: me,
    subject: { id: "doc_4", name: "SF - Financial Report.docx", kind: "document", href: "/storage" },
    description: "Converted to PDF",
    timestamp: daysAgo(2),
  },
  {
    id: "act_006",
    workspaceId: "ws_main",
    type: "downloaded",
    actor: { id: "ext_3", name: "mike@helios.io", email: "mike@helios.io", kind: "external" },
    subject: { id: "doc_5", name: "Brand Assets.zip", kind: "transfer", href: "/track" },
    description: "Downloaded by mike@helios.io",
    counterpartyEmail: "mike@helios.io",
    timestamp: daysAgo(2),
  },
  {
    id: "act_007",
    workspaceId: "ws_main",
    type: "compressed",
    actor: me,
    subject: { id: "doc_6", name: "Project Assets.zip", kind: "document", href: "/storage" },
    description: "Compressed — saved 45%",
    timestamp: daysAgo(3),
  },
  {
    id: "act_008",
    workspaceId: "ws_main",
    type: "sent",
    actor: me,
    subject: { id: "doc_7", name: "Q4 Report.pdf", kind: "transfer", href: "/track" },
    description: "Sent to 3 recipients",
    timestamp: daysAgo(5),
  },
  {
    id: "act_009",
    workspaceId: "ws_main",
    type: "shared",
    actor: system,
    subject: { id: "doc_8", name: "Helios Redlines.pdf", kind: "document", href: "/storage" },
    description: "Auto-shared with legal@docsora.com",
    timestamp: daysAgo(8),
  },
  {
    id: "act_010",
    workspaceId: "ws_main",
    type: "downloaded",
    actor: { id: "ext_4", name: "kira@northwind.com", email: "kira@northwind.com", kind: "external" },
    subject: { id: "doc_9", name: "Onboarding Pack.pdf", kind: "transfer", href: "/track" },
    description: "Downloaded by kira@northwind.com",
    counterpartyEmail: "kira@northwind.com",
    timestamp: daysAgo(12),
  },
  {
    id: "act_011",
    workspaceId: "ws_main",
    type: "converted",
    actor: me,
    subject: { id: "doc_10", name: "Investor Update.pages", kind: "document", href: "/storage" },
    description: "Converted to PDF",
    timestamp: daysAgo(18),
  },
  {
    id: "act_012",
    workspaceId: "ws_main",
    type: "signed",
    actor: me,
    subject: { id: "doc_11", name: "Vendor NDA.pdf", kind: "signature_request", href: "/track" },
    description: "You signed the document",
    timestamp: daysAgo(24),
  },
];