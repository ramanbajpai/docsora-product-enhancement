import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

interface FocusModeCtx {
  isFocusMode: boolean;
  enterFocus: () => void;
  exitFocus: () => void;
  toggleFocus: () => void;
  completedIds: Set<string>;
  markComplete: (id: string) => void;
  resetSession: () => void;
}

const Ctx = createContext<FocusModeCtx | null>(null);

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  const enterFocus = useCallback(() => {
    setCompletedIds(new Set());
    setIsFocusMode(true);
  }, []);
  const exitFocus = useCallback(() => setIsFocusMode(false), []);
  const toggleFocus = useCallback(() => {
    setIsFocusMode((v) => {
      if (!v) setCompletedIds(new Set());
      return !v;
    });
  }, []);
  const markComplete = useCallback(
    (id: string) =>
      setCompletedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      }),
    []
  );
  const resetSession = useCallback(() => setCompletedIds(new Set()), []);

  // Esc to exit
  useEffect(() => {
    if (!isFocusMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFocusMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFocusMode]);

  return (
    <Ctx.Provider
      value={{ isFocusMode, enterFocus, exitFocus, toggleFocus, completedIds, markComplete, resetSession }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useFocusMode() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFocusMode must be used within FocusModeProvider");
  return v;
}