import { useCallback, useEffect, useState } from "react";

export type SignRoleKey = "client" | "sender" | "legal" | "approver" | "cc";

export type SignRoleType = "signer" | "approver" | "viewer" | "cc";

export interface SignTemplateRole {
  key: SignRoleKey | string;
  label: string;
  color: string; // hex for swatches
  signingOrder?: number;
  type?: SignRoleType;
}

export type SignFieldType =
  | "signature"
  | "initials"
  | "date"
  | "name"
  | "text"
  | "checkbox"
  | "company";

export type SignVariableType = "text" | "date" | "currency" | "number" | "email";

export interface SignTemplateVariable {
  /** Token name used in document, e.g. CLIENT_NAME (without braces). */
  name: string;
  /** Human-readable label shown in the launch form. */
  label: string;
  type: SignVariableType;
  required?: boolean;
  defaultValue?: string;
  /** Original placeholder pattern as found in the source, e.g. {{CLIENT_NAME}} or [CLIENT_NAME]. */
  pattern: string;
}

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
  /** Raw template body text with placeholders preserved. Used for personalization preview. */
  documentBody?: string;
  variables?: SignTemplateVariable[];
  favorite?: boolean;
  pinned?: boolean;
  createdAt: number;
  lastUsedAt?: number;
  useCount?: number;
}

/* ────────── placeholder detection ────────── */

const PLACEHOLDER_RE = /\{\{\s*([A-Z][A-Z0-9_]*)\s*\}\}|\[\s*([A-Z][A-Z0-9_]*)\s*\]/g;

const guessType = (name: string): SignVariableType => {
  const n = name.toLowerCase();
  if (n.includes("date") || n.includes("day")) return "date";
  if (n.includes("email")) return "email";
  if (
    n.includes("value") ||
    n.includes("amount") ||
    n.includes("fee") ||
    n.includes("price") ||
    n.includes("cost")
  )
    return "currency";
  if (n.includes("qty") || n.includes("count") || n.includes("number")) return "number";
  return "text";
};

const humanize = (name: string) =>
  name
    .toLowerCase()
    .split("_")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

export function detectTemplateVariables(
  text: string,
  existing: SignTemplateVariable[] = [],
): SignTemplateVariable[] {
  const seen = new Map<string, SignTemplateVariable>();
  const prior = new Map(existing.map((v) => [v.name, v]));
  let m: RegExpExecArray | null;
  PLACEHOLDER_RE.lastIndex = 0;
  while ((m = PLACEHOLDER_RE.exec(text)) !== null) {
    const name = m[1] || m[2];
    if (!name || seen.has(name)) continue;
    const pattern = m[0];
    const pre = prior.get(name);
    seen.set(name, {
      name,
      label: pre?.label ?? humanize(name),
      type: pre?.type ?? guessType(name),
      required: pre?.required ?? true,
      defaultValue: pre?.defaultValue,
      pattern: pre?.pattern ?? pattern,
    });
  }
  return Array.from(seen.values());
}

export function applyTemplateVariables(
  text: string,
  values: Record<string, string>,
): string {
  return text.replace(PLACEHOLDER_RE, (full, a, b) => {
    const key = a || b;
    const v = values[key];
    return v && v.trim().length > 0 ? v : full;
  });
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
    documentBody:
      "AGENCY SERVICES AGREEMENT\n\nThis agreement is entered into on {{START_DATE}} between {{COMPANY_NAME}} (\"Agency\") and {{CLIENT_NAME}} of {{CLIENT_ADDRESS}} (\"Client\").\n\n1. Scope of Work\nAgency will deliver services as described in the attached statement of work for a total engagement value of {{DEAL_VALUE}}.\n\n2. Term\nThis agreement begins on {{START_DATE}} and remains in effect until terminated under section 6.\n\n3. Signatures\nSigned for {{COMPANY_NAME}} and acknowledged by {{CLIENT_NAME}}.",
    variables: [
      { name: "CLIENT_NAME", label: "Client name", type: "text", required: true, pattern: "{{CLIENT_NAME}}" },
      { name: "COMPANY_NAME", label: "Company name", type: "text", required: true, pattern: "{{COMPANY_NAME}}" },
      { name: "CLIENT_ADDRESS", label: "Client address", type: "text", required: false, pattern: "{{CLIENT_ADDRESS}}" },
      { name: "START_DATE", label: "Start date", type: "date", required: true, pattern: "{{START_DATE}}" },
      { name: "DEAL_VALUE", label: "Deal value", type: "currency", required: true, pattern: "{{DEAL_VALUE}}" },
    ],
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
    documentBody:
      "MUTUAL NON-DISCLOSURE AGREEMENT\n\nBetween {{COMPANY_NAME}} and {{COUNTERPARTY_NAME}}, effective {{EFFECTIVE_DATE}}.\n\nBoth parties agree to protect confidential information shared during discussions related to {{PROJECT_NAME}}.",
    variables: [
      { name: "COMPANY_NAME", label: "Company name", type: "text", required: true, pattern: "{{COMPANY_NAME}}" },
      { name: "COUNTERPARTY_NAME", label: "Counterparty", type: "text", required: true, pattern: "{{COUNTERPARTY_NAME}}" },
      { name: "EFFECTIVE_DATE", label: "Effective date", type: "date", required: true, pattern: "{{EFFECTIVE_DATE}}" },
      { name: "PROJECT_NAME", label: "Project name", type: "text", required: false, pattern: "{{PROJECT_NAME}}" },
    ],
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