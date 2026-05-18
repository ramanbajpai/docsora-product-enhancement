## Goal

Make Flows the operational core of Docsora. Keep the UI as light as Linear/Notion/Arc — no Zapier-style canvas. Build incrementally on the existing `NewFlowModal` + `useCustomTemplates` + `Templates` page + `SendTemplateModal` so we don't fragment the product.

I'll split this into 4 shippable phases. **Phase 1** is the next change I'd make; the rest are scoped so we can decide order after you see Phase 1 land.

---

## Phase 1 — Flow authoring upgrade (the "create" experience)

Refines `NewFlowModal.tsx` and the data model so a flow is genuinely reusable.

**Data (`useCustomTemplates.ts`)**
- Add `description?: string` to `CustomTemplate`.
- Add to `FlowStep`:
  - `recipients: StepRecipient[]` where `StepRecipient = { id; roleKey: "signer"|"approver"|"viewer"|"cc"; label?: string; order?: number }`
  - `signingMode?: "sequential" | "parallel"` (only meaningful when multiple signers)
  - `assignedRoleKey?: string` for non-signing steps (who receives/uploads)
- Keep existing fields (`assets`, `placedFields`, `payment`, `personalizationTokens`) — they already cover the "save once, reuse" promise.

**Authoring UI (single modal, three calm stages — same shell as today)**

1. **Describe** (existing) — AI box stays the primary entry. Add a `description` field next to `name`. Parser already produces steps.
2. **Steps** (new compact stage between Describe and Assets)
   - Each step is a minimal card: icon · name · 1-line recipient summary · edit · delete · drag handle.
   - Click a card → inline expand (no nested modal) to set:
     - Recipient roles (chips: Signer / Approver / Viewer / CC) — placeholder role labels like "Signer 1", "Client", "CC: Accountant". Real names are entered at launch.
     - For `send_contract` with 2+ signers: a single toggle "Sequential ⇄ Parallel" with a one-line explainer.
     - For `send_contract`: "Place fields" button reuses existing `FieldPlacementModal` and binds fields to role keys (already supported by `PlacedField.roleKey`).
   - Drag-to-reorder via framer-motion `Reorder` (no extra dep).
3. **Assets/config** (existing AssetsStage) — unchanged, just renders for steps that need it.

**Visual polish (calm/premium)**
- Replace the heavy "Create a new flow" CTA card on `Templates.tsx` with a Linear-style soft surface: subtle radial gradient, single-line headline, hairline border, no orbiting dots.
- Step cards: `bg-card/60`, `border-border/50`, hover `bg-card`, no gradients on the row itself. Recipient role rendered as a 1.5px dot + tiny label.

---

## Phase 2 — Launch experience ("Start a flow" with just name + email)

A new `LaunchFlowModal` (replaces today's `SendTemplateModal` invocation from the saved-flow card).
- Inputs: Client name, Client email, optional Project name.
- Below: a read-only preview of the steps and what will happen, so the user trusts the automation.
- "Start flow" persists a `FlowRun` to localStorage (`docsora.flowRuns.v1`):
  ```ts
  FlowRun = { id; templateId; clientName; clientEmail; projectName?; startedAt; status: "active"|"blocked"|"done"; currentStepIndex; steps: FlowRunStep[] }
  FlowRunStep = { id; type; label; status: "pending"|"waiting"|"done"|"blocked"; dueAt?; blockedReason? }
  ```
- No field reassignment — fields already placed on the template are reused as-is.

---

## Phase 3 — Priority Actions wiring

`PriorityActions.tsx` already exists. Add a `useFlowRuns` hook that derives action items from active runs:
- "Waiting on signature — {client}" (sequential signer 1 hasn't signed)
- "Approval required — {client}"
- "Client hasn't uploaded requested files"
- "Payment pending"
- "Flow blocked" / "Flow completed"

Render them through the existing PriorityActions surface (no new page). Clicking an item opens the flow run drawer.

---

## Phase 4 — Run detail + reminders (lightweight)

A right-side drawer (reuses `Sheet`) showing run timeline, recipients, and an "Advance step" action for the mock backend. Reminders are simulated with the existing `useReminders` hook.

---

## Technical notes

- All persistence stays in `localStorage` (no backend changes) — matches current architecture.
- No new heavyweight dependencies. Drag/reorder uses `framer-motion`'s `Reorder` already installed.
- Existing `FieldPlacementModal` already supports `roleKey` on placed fields → role-bound fields work without changes there.
- Backward compatible: old saved templates without `recipients`/`description` get sensible defaults at read time.

---

## Files I'd touch in Phase 1

- `src/hooks/useCustomTemplates.ts` — extend types + safe defaults on read.
- `src/components/templates/NewFlowModal.tsx` — add description field, recipient editor inside step card, signing-mode toggle, reorder polish.
- `src/pages/Templates.tsx` — tone down the "Create a project" CTA, refine saved-flow card meta to show recipient roles per step.
- (No changes to `FieldPlacementModal`, `SendTemplateModal`, or routes in Phase 1.)

---

## Question before I build

Want me to ship **Phase 1 only** (authoring + recipients + signing order + calmer CTA), or go straight through **Phase 1 + Phase 2** (authoring + the simplified launch experience) in one pass? Phase 1 alone is a focused diff; 1+2 doubles the surface area but completes the "create once, launch with just name + email" story end-to-end.