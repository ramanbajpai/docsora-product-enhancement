import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { ContextSelection } from "./types";

interface WorkspaceCtx {
  autopilot: boolean;
  toggleAutopilot: () => void;
  selection: ContextSelection;
  setSelection: (s: ContextSelection) => void;
}

const Ctx = createContext<WorkspaceCtx | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [autopilot, setAutopilot] = useState(false);
  const [selection, setSelection] = useState<ContextSelection>(null);
  const toggleAutopilot = useCallback(() => setAutopilot((a) => !a), []);
  return (
    <Ctx.Provider value={{ autopilot, toggleAutopilot, selection, setSelection }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWorkspace() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return v;
}
