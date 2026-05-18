import { useCallback, useEffect, useState } from "react";
import type { FlowStep, FlowStepType, CustomTemplate } from "./useCustomTemplates";

export type FlowRunStepStatus =
  | "pending"
  | "in_progress"
  | "waiting_client"
  | "completed"
  | "blocked"
  | "expired";

export type FlowRunStep = {
  id: string;
  type: FlowStepType;
  label: string;
  description?: string;
  status: FlowRunStepStatus;
  assets?: { id: string; name: string; size?: number; uploadedAt?: number; uploadedBy?: "you" | "client" }[];
  completedAt?: number;
  startedAt?: number;
  blockedReason?: string;
};

export type FlowRunActivity = {
  id: string;
  at: number;
  actor: "you" | "client" | "system";
  message: string;
  stepId?: string;
};

export type FlowRunStatus = "active" | "blocked" | "completed";

export type FlowRun = {
  id: string;
  templateId: string;
  templateName: string;
  clientName: string;
  clientEmail: string;
  projectName?: string;
  startedAt: number;
  status: FlowRunStatus;
  currentStepIndex: number;
  steps: FlowRunStep[];
  activity: FlowRunActivity[];
};

const KEY = "docsora.flowRuns.v1";
const uid = () => Math.random().toString(36).slice(2, 10);

function read(): FlowRun[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FlowRun[]) : [];
  } catch {
    return [];
  }
}

function write(items: FlowRun[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("docsora:flowRuns"));
  } catch {
    /* ignore */
  }
}

function initialStatusForStep(type: FlowStepType, index: number): FlowRunStepStatus {
  if (index !== 0) return "pending";
  if (type === "send_contract" || type === "request_payment" || type === "collect_feedback") return "waiting_client";
  return "in_progress";
}

export function createFlowRunFromTemplate(
  template: CustomTemplate,
  args: { clientName: string; clientEmail: string; projectName?: string },
): FlowRun {
  const steps: FlowRunStep[] = (template.flowSteps ?? []).map((s: FlowStep, i) => ({
    id: uid(),
    type: s.type,
    label: s.label,
    description: s.description,
    status: initialStatusForStep(s.type, i),
    assets: s.assets?.map((a) => ({ id: a.id, name: a.name, size: a.size })),
    startedAt: i === 0 ? Date.now() : undefined,
  }));
  if (steps.length === 0) {
    steps.push({
      id: uid(),
      type: "send_contract",
      label: "Send for signature",
      status: "waiting_client",
      startedAt: Date.now(),
    });
  }
  const now = Date.now();
  return {
    id: uid(),
    templateId: template.id,
    templateName: template.name,
    clientName: args.clientName,
    clientEmail: args.clientEmail,
    projectName: args.projectName,
    startedAt: now,
    status: "active",
    currentStepIndex: 0,
    steps,
    activity: [
      {
        id: uid(),
        at: now,
        actor: "system",
        message: `Flow launched for ${args.clientName}`,
      },
      {
        id: uid(),
        at: now + 1,
        actor: "system",
        message: `Step started — ${steps[0].label}`,
        stepId: steps[0].id,
      },
    ],
  };
}

export function useFlowRuns() {
  const [runs, setRuns] = useState<FlowRun[]>(() => read());

  useEffect(() => {
    const sync = () => setRuns(read());
    window.addEventListener("docsora:flowRuns", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("docsora:flowRuns", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const create = useCallback((run: FlowRun) => {
    const next = [run, ...read().filter((r) => r.id !== run.id)];
    write(next);
    setRuns(next);
    return run;
  }, []);

  const get = useCallback((id: string) => read().find((r) => r.id === id), []);

  const update = useCallback((id: string, patch: (r: FlowRun) => FlowRun) => {
    const all = read();
    const idx = all.findIndex((r) => r.id === id);
    if (idx === -1) return;
    all[idx] = patch(all[idx]);
    write(all);
    setRuns(all);
  }, []);

  const remove = useCallback((id: string) => {
    const next = read().filter((r) => r.id !== id);
    write(next);
    setRuns(next);
  }, []);

  const addActivity = useCallback(
    (id: string, entry: Omit<FlowRunActivity, "id" | "at"> & { at?: number }) =>
      update(id, (r) => ({
        ...r,
        activity: [
          ...r.activity,
          { id: uid(), at: entry.at ?? Date.now(), actor: entry.actor, message: entry.message, stepId: entry.stepId },
        ],
      })),
    [update],
  );

  const advanceStep = useCallback(
    (id: string, stepId: string) =>
      update(id, (r) => {
        const idx = r.steps.findIndex((s) => s.id === stepId);
        if (idx === -1) return r;
        const steps = r.steps.map((s, i) =>
          i === idx
            ? { ...s, status: "completed" as FlowRunStepStatus, completedAt: Date.now() }
            : i === idx + 1
              ? { ...s, status: initialStatusForStep(s.type, 0), startedAt: Date.now() }
              : s,
        );
        const allDone = steps.every((s) => s.status === "completed");
        return {
          ...r,
          steps,
          currentStepIndex: Math.min(idx + 1, steps.length - 1),
          status: allDone ? "completed" : r.status,
          activity: [
            ...r.activity,
            { id: uid(), at: Date.now(), actor: "you", message: `Completed — ${steps[idx].label}`, stepId },
            ...(idx + 1 < steps.length
              ? [{ id: uid(), at: Date.now() + 1, actor: "system" as const, message: `Step started — ${steps[idx + 1].label}`, stepId: steps[idx + 1].id }]
              : [{ id: uid(), at: Date.now() + 1, actor: "system" as const, message: `Flow completed` }]),
          ],
        };
      }),
    [update],
  );

  const addAssetToStep = useCallback(
    (id: string, stepId: string, asset: { name: string; size?: number }) =>
      update(id, (r) => {
        const steps = r.steps.map((s) =>
          s.id === stepId
            ? {
                ...s,
                assets: [
                  ...(s.assets ?? []),
                  { id: uid(), name: asset.name, size: asset.size, uploadedAt: Date.now(), uploadedBy: "you" as const },
                ],
              }
            : s,
        );
        const step = steps.find((s) => s.id === stepId)!;
        return {
          ...r,
          steps,
          activity: [
            ...r.activity,
            { id: uid(), at: Date.now(), actor: "you", message: `Uploaded ${asset.name} to ${step.label}`, stepId },
          ],
        };
      }),
    [update],
  );

  return { runs, create, get, update, remove, addActivity, advanceStep, addAssetToStep };
}
