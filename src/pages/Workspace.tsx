import { WorkspaceProvider } from "@/components/workspace/useWorkspace";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import { CommandHero } from "@/components/workspace/CommandHero";
import { PriorityStream } from "@/components/workspace/PriorityStream";
import { ActivityStream } from "@/components/workspace/ActivityStream";
import { ContextPanel } from "@/components/workspace/ContextPanel";

export default function Workspace() {
  return (
    <WorkspaceProvider>
      <WorkspaceShell>
        <CommandHero />

        <div className="mx-auto max-w-5xl px-6 mt-20 grid gap-8 md:grid-cols-2 xl:pr-[340px]">
          <PriorityStream />
          <ActivityStream />
        </div>

        <ContextPanel />
      </WorkspaceShell>
    </WorkspaceProvider>
  );
}
