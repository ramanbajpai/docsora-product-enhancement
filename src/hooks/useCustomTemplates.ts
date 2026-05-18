import { useEffect, useState, useCallback } from "react";

export type CustomRole = {
  key: string;
  label: string;
  color: string; // tailwind/HSL accent class suffix
};

export type CustomFieldType = "signature" | "text" | "date";

export type PlacedField = {
  id: string;
  type: CustomFieldType;
  roleKey: string;
  page: number;
  // % positions relative to page preview (so it scales)
  x: number;
  y: number;
  width: number;
  height: number;
  /** For personalization placements: which token fills this spot (e.g. "recipient_name"). */
  token?: string;
  /** Optional human label for the placed field. */
  label?: string;
};

export type FlowStepType =
  | "send_contract"
  | "kickoff"
  | "deliver_files"
  | "deliver_onboarding"
  | "collect_feedback"
  | "send_invoice"
  | "request_payment"
  | "final_approval";

export type FlowStepAsset = {
  id: string;
  name: string;
  size?: number;
};

/** Field a recipient must complete on a contract document. */
export type SignatureFieldKind = "signature" | "full_name" | "date" | "initials" | "custom";
export type SignatureFieldSpec = {
  id: string;
  kind: SignatureFieldKind;
  label: string;
  required: boolean;
};

/** Personalization token used to customize an outgoing document. */
export type PersonalizationToken = {
  id: string;
  token: string; // e.g. "recipient_name"
  label: string; // e.g. "Recipient name"
  example?: string;
};

/** For request_payment step: payment configuration. */
export type PaymentConfig = {
  amount: number; // in major units (e.g. dollars)
  currency: string; // ISO 4217, e.g. "USD"
  description?: string;
  allowCustomAmount?: boolean;
};

export type FlowStep = {
  id: string;
  type: FlowStepType;
  label: string;
  description?: string;
  /** Files attached to this step (e.g. onboarding docs to deliver) */
  assets?: FlowStepAsset[];
  /** For send_contract: fields the recipient must complete on the document. */
  signatureFields?: SignatureFieldSpec[];
  /** For send_contract: fields placed on specific document coordinates. */
  placedFields?: PlacedField[];
  /** For deliver_onboarding: tokens used to personalize the document per recipient. */
  personalizationTokens?: PersonalizationToken[];
  /** For request_payment: amount, currency and description for the payment link. */
  payment?: PaymentConfig;
};

export type CustomTemplate = {
  id: string;
  name: string;
  createdAt: number;
  documentName: string;
  documentType: "pdf" | "docx";
  pageCount: number; // simulated
  roles: CustomRole[];
  fields: PlacedField[];
  /** Optional flow definition for templates created via the New Flow modal */
  flowSteps?: FlowStep[];
};

const STORAGE_KEY = "docsora.customTemplates.v1";

function read(): CustomTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CustomTemplate[]) : [];
  } catch {
    return [];
  }
}

function write(items: CustomTemplate[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("docsora:customTemplates"));
  } catch {
    // ignore quota errors
  }
}

export function useCustomTemplates() {
  const [items, setItems] = useState<CustomTemplate[]>(() => read());

  useEffect(() => {
    const sync = () => setItems(read());
    window.addEventListener("docsora:customTemplates", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("docsora:customTemplates", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = useCallback((t: CustomTemplate) => {
    const next = [t, ...read().filter((x) => x.id !== t.id)];
    write(next);
    setItems(next);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter((x) => x.id !== id);
    write(next);
    setItems(next);
  }, []);

  const get = useCallback((id: string) => read().find((x) => x.id === id), []);

  return { templates: items, save, remove, get };
}
