import { ReactNode } from "react";
import { Settings } from "lucide-react";
import { AmbientCanvas } from "./AmbientCanvas";
import { AutopilotToggle } from "./AutopilotToggle";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      <AmbientCanvas />

      {/* Floating top bar */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-glow" />
            <span className="text-sm font-semibold tracking-tight">Docsora</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <AutopilotToggle />
            <button
              aria-label="Settings"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/60 bg-card/60 backdrop-blur-md hover:bg-card/80 transition"
            >
              <Settings className="w-4 h-4 text-foreground/70" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">{children}</main>
    </div>
  );
}
