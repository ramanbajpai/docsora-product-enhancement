import { useCallback, useEffect, useState } from "react";

export type SignRoleKey = "client" | "sender" | "legal" | "approver" | "cc";

export interface SignTemplateRole {
  key: SignRoleKey | string;
  label: string;
  color: string; // hex for swatches
  signingOrder?: number;
}

export type SignFieldType =
  | "signature"
  | "initials"
  | "date"
  | "name"
  | "text"
  | "checkbox"
  | "company";

export interface SignTemplateField {
  id: string;
  type: SignFieldType;
  roleKey: string;
  page: number;
  x: number; // %
  y: number; // %
  width: number; // %
  height: number; // %
}

export interface SignTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  documentName: string;
  pageCount: number;
  roles: SignTemplateRole[];
  fields: SignTemplateField[];
  signingMode: "sequential" | "parallel";
  defaults?: {
    expiryDays?: number;
    remindersEveryDays?: number;
    ccEmails?: string[];
  };
  favorite?: boolean;
  pinned?: boolean;
  createdAt: number;
  lastUsedAt?: number;
  useCount?: number;
}

const STORAGE_KEY = "docsora.signTemplates.v1";

const SEED: SignTemplate[] = [
  {
    id: "seed-agency-client",
    name: "Agency Client Agreement",
    description: "Standard service agreement for new agency clients.",
    category: "Client",
    documentName: "agency-client-agreement.pdf",
    pageCount: 4,
    roles: [
      { key: "client", label: "Client", color: "#3b82f6", signingOrder: 1 },
      { key: "sender", label: "You", color: "#a78bfa", signingOrder: 2 },
    ],
    fields: Array.from({ length: 8 }).map((_, i) => ({
      id: `f-${i}`,
      type: (["signature", "initials", "date", "name", "text", "checkbox", "company", "signature"] as SignFieldType[])[i],
      roleKey: i % 2 === 0 ? "client" : "sender",
      page: (i % 4) + 1,
      x: 10 + (i * 7) % 60,
      y: 60 + (i * 5) % 25,
      width: 22,
      height: 6,
    })),
    signingMode: "sequential",
    defaults: { expiryDays: 14, remindersEveryDays: 3 },
    favorite: true,
    pinned: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
    lastUsedAt: Date.now() - 1000 * 60 * 60 * 2,
    useCount: 14,
  },
  {
    id: "seed-nda",
    name: "Mutual NDA",
    description: "Short mutual non-disclosure agreement for partners and prospects.",
    category: "Legal",
    documentName: "mutual-nda.pdf",
    pageCount: 2,
    roles: [
      { key: "client", label: "Counterparty", color: "#10b981", signingOrder: 1 },
      { key: "sender", label: "You", color: "#a78bfa", signingOrder: 2 },
    ],
    fields: Array.from({ length: 5 }).map((_, i) => ({
      id: `n-${i}`,
      type: (["signature", "date", "name", "signature", "date"] as SignFieldType[])[i],
      roleKey: i < 3 ? "client" : "sender",
      page: i < 3 ? 1 : 2,
      x: 12 + i * 10,
      y: 70,
      width: 22,
      height: 6,
    })),
    signingMode: "parallel",
    defaults: { expiryDays: 7 },
    favorite: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
    lastUsedAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
    useCount: 31,
  },
  {
    id: "seed-offer-letter",
    name: "Employment Offer Letter",
    description: "Offer letter for new hires with HR and candidate signatures.",
    category: "HR",
    documentName: "offer-letter.pdf",
    pageCount: 3,
    roles: [
      { key: "client", label: "Candidate", color: "#f59e0b", signingOrder: 2 },
      { key: "sender", label: "HR", color: "#a78bfa", signingOrder: 1 },
      { key: "approver", label: "Hiring manager", color: "#ef4444", signingOrder: 3 },
    ],
    fields: Array.from({ length: 7 }).map((_, i) => ({
      id: `o-${i}`,
      type: (["signature", "date", "name", "text", "signature", "initials", "signature"] as SignFieldType[])[i],
      roleKey: ["sender", "sender", "client", "client", "client", "approver", "approver"][i],
      page: ((i % 3) + 1),
      x: 14 + (i * 6) % 50,
      y: 65 + (i * 4) % 20,
      width: 24,
      height: 6,
    })),
    signingMode: "sequential",
    defaults: { expiryDays: 10, remindersEveryDays: 2 },
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    lastUsedAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
    useCount: 4,
  },
];

function read(): SignTemplate[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as SignTemplate[];
  } catch {
    return SEED;
  }
}

function write(items: SignTemplate[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("docsora:signTemplates"));
  } catch {
    /* ignore */
  }
}

export function useSignTemplates() {
  const [items, setItems] = useState<SignTemplate[]>(() => read());

  useEffect(() => {
    const sync = () => setItems(read());
    window.addEventListener("docsora:signTemplates", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("docsora:signTemplates", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((t: SignTemplate) => {
    const next = [t, ...read().filter((x) => x.id !== t.id)];
    write(next);
    setItems(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((x) => x.id !== id));
    setItems(read());
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    const next = read().map((x) => (x.id === id ? { ...x, favorite: !x.favorite } : x));
    write(next);
    setItems(next);
  }, []);

  const togglePin = useCallback((id: string) => {
    const next = read().map((x) => (x.id === id ? { ...x, pinned: !x.pinned } : x));
    write(next);
    setItems(next);
  }, []);

  const recordLaunch = useCallback((id: string) => {
    const next = read().map((x) =>
      x.id === id ? { ...x, lastUsedAt: Date.now(), useCount: (x.useCount ?? 0) + 1 } : x,
    );
    write(next);
    setItems(next);
  }, []);

  return { templates: items, save, remove, toggleFavorite, togglePin, recordLaunch };
}