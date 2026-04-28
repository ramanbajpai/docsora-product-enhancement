import { MockFile, MockContact } from "./types";

export const MOCK_FILES: MockFile[] = [
  { id: "f1", name: "Acme MSA 2026.pdf", kind: "msa", updatedAt: "2h ago", pages: 14, owner: "Alex" },
  { id: "f2", name: "Helios Pitch Deck.pdf", kind: "deck", updatedAt: "Yesterday", pages: 22, owner: "Alex" },
  { id: "f3", name: "TechCorp NDA.pdf", kind: "nda", updatedAt: "3d ago", pages: 4, owner: "Legal" },
  { id: "f4", name: "Q4 Board Report.pdf", kind: "report", updatedAt: "5d ago", pages: 38, owner: "Ops" },
  { id: "f5", name: "Vendor Invoice 0421.pdf", kind: "invoice", updatedAt: "1w ago", pages: 2, owner: "Finance" },
  { id: "f6", name: "Northwind Services Agreement.pdf", kind: "contract", updatedAt: "4d ago", pages: 18, owner: "Legal" },
];

export const MOCK_CONTACTS: MockContact[] = [
  { id: "c1", name: "Sarah Chen", email: "sarah@acme.co", org: "Acme", role: "Head of Procurement" },
  { id: "c2", name: "Marcus Johnson", email: "marcus@helios.io", org: "Helios", role: "CFO" },
  { id: "c3", name: "Priya Patel", email: "priya@techcorp.com", org: "TechCorp", role: "General Counsel" },
  { id: "c4", name: "Daniel Kim", email: "daniel@northwind.co", org: "Northwind", role: "VP Sales" },
  { id: "c5", name: "Elena Rossi", email: "elena@docsora.com", org: "Docsora", role: "Legal" },
];

export function findFiles(query: string): MockFile[] {
  const q = query.toLowerCase();
  if (!q) return [];
  return MOCK_FILES.filter((f) =>
    f.name.toLowerCase().includes(q) ||
    f.kind.toLowerCase().includes(q) ||
    q.split(/\s+/).some((tok) => tok.length > 2 && f.name.toLowerCase().includes(tok))
  );
}

export function findContacts(query: string): MockContact[] {
  const q = query.toLowerCase();
  if (!q) return [];
  return MOCK_CONTACTS.filter((c) =>
    q.includes(c.name.split(" ")[0].toLowerCase()) ||
    q.includes(c.org.toLowerCase()) ||
    c.name.toLowerCase().split(" ").some((tok) => q.includes(tok))
  );
}
