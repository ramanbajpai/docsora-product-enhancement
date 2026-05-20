
# Redesign: Create Template — Premium Workflow Builder

Transform the current single-screen template setup into a guided 6-step experience that cleanly separates **personalization variables** (sender-filled, pre-send) from **signing fields** (recipient-filled). The end-state feeling: *"Configure once. Launch infinitely."*

## Scope

Rebuild the template creation route (currently `src/pages/TemplateBuilder.tsx` + `src/components/sign/SignTemplateBuilder.tsx`) as a stepper-driven flow. Extend `useCustomTemplates` types to support the new concepts. Keep the existing field-placement engine and reuse it inside Step 4. Update the launch modal to consume personalization variables.

## The 6 Steps

```text
┌──────────┬──────────┬──────────────┬──────────┬───────────┬──────────┐
│ 1 Upload │ 2 Roles  │ 3 Variables  │ 4 Fields │ 5 Deliver │ 6 Review │
└──────────┴──────────┴──────────────┴──────────┴───────────┴──────────┘
```

**1. Upload** — Multi-file drop zone, reorderable file cards with thumbnail, remove, "N files ready" → Continue. No auto-advance.

**2. Roles** — Define recipient roles (name, color, signing order, permission set: sign / approve / view / upload / edit-fields). Drag-to-reorder for sequential signing. Default seeded role: "Client".

**3. Personalization Variables** — Side panel + live list. Add variable: key, label, type (text / currency / date / email / phone / number / dropdown / multi-select), required toggle, example value, options (for dropdown). Clear "filled by sender before send" framing. Visually distinct from Step 4.

**4. Signing Fields** — Reuse the existing placement canvas from `SignTemplateBuilder`. Each placed field is assigned to a **role** (color-coded from Step 2). Toolbar: signature / initials / date / text / checkbox / dropdown. Keyboard delete, undo/redo, zoom, page nav, multi-doc tabs.

**5. Delivery & Automation** — Two grouped cards:
- *Delivery*: email subject, message, sender name, expiry days.
- *Automation*: reminder cadence, escalation, expiry warning, post-open & post-complete notifications, redirect URL, CC recipients, allow attachment download.

**6. Preview & Save** — Tabs: Sender preview · Recipient preview · Email preview · Final PDF preview. Filename pattern field with variable autocomplete (e.g. `{{company_name}} - NDA.pdf`). Save → returns to template gallery.

## Stepper Shell

- Top progress bar with step labels, completed/active/upcoming states, click-to-jump for completed steps.
- Persistent footer: Back · step counter · Continue (disabled until step valid).
- Auto-save draft to localStorage between steps.
- Smooth slide+fade transitions between steps (framer-motion).
- Sticky right-side summary on wider viewports showing files / roles / variables / fields counts.

## Data Model Changes (`useCustomTemplates.ts`)

Extend `CustomTemplate`:
```ts
files: TemplateFile[]              // multi-file support
roles: CustomRole[] (extended)     // + order, permissions[]
variables: PersonalizationVariable[]   // NEW — sender-filled
fields: PlacedField[] (extended)   // + assigned roleKey already exists
delivery: DeliveryConfig           // NEW
automation: AutomationConfig       // NEW
filenamePattern: string            // NEW
```

New types: `PersonalizationVariable`, `VariableType`, `RolePermission`, `DeliveryConfig`, `AutomationConfig`, `TemplateFile`. Keep backward compatibility with existing stored templates by defaulting missing fields.

## File Plan

**New files**
- `src/components/templates/builder/TemplateBuilderShell.tsx` — stepper layout, nav, summary rail.
- `src/components/templates/builder/StepUpload.tsx`
- `src/components/templates/builder/StepRoles.tsx`
- `src/components/templates/builder/StepVariables.tsx`
- `src/components/templates/builder/StepFields.tsx` (wraps existing placement canvas)
- `src/components/templates/builder/StepDelivery.tsx`
- `src/components/templates/builder/StepReview.tsx`
- `src/components/templates/builder/useTemplateDraft.ts` — single source of truth + autosave.
- `src/components/templates/builder/types.ts`

**Updated**
- `src/pages/TemplateBuilder.tsx` — render the new shell instead of the legacy builder.
- `src/hooks/useCustomTemplates.ts` — extend types, migration defaults.
- `src/components/sign/SignTemplateLaunchModal.tsx` — surface personalization variables as the first step of launch, then recipients.
- `src/components/sign/SignTemplateGallery.tsx` — minor: show variable count on cards.

**Reused as-is**
- Existing field placement primitives (`FieldPlacementModal` logic, drag handlers, page render) lifted into `StepFields`.

## Visual Direction

- Generous whitespace, soft surfaces, no heavy borders.
- One accent color per role, used consistently across roles list, variable assignment, field chips, preview.
- Motion: 200ms ease-out step transitions; field placement uses spring; success ticks for completed steps.
- Empty states with one-line helper + single CTA — no illustrations.
- Sticky CTAs; never modal-on-modal.

## Out of Scope (this pass)

- Version history & archive UI (data model supports it; UI later).
- Server-side persistence (continues to use localStorage via `useCustomTemplates`).
- Actual email rendering pipeline (preview is a faithful mockup).

## Validation Per Step

1. ≥1 file. 2. ≥1 role with name. 3. Variables optional but each must have key+type. 4. ≥1 signature field assigned to a role. 5. Defaults provided, all editable. 6. Filename pattern non-empty.

---

Approve to build, or tell me which steps to trim/expand first.
