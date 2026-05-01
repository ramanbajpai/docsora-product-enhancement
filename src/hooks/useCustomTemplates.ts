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
