
# Template Creation — 5-Step Restructure

Rebuild the setup flow inside `src/components/sign/SignTemplateBuilder.tsx` so document customization happens **before** recipient field placement, and replace the technical "variables" concept with a visual, click-to-customize document experience.

## New step order

```text
1. Name & Upload     → name + drop documents
2. Participants      → who is involved + what they do (Sign / Approve / Upload / Fill / Review)
3. Customize Document→ click highlighted text inside the doc to mark what changes per launch
4. Recipient Fields  → place signatures, initials, dates, uploads, approvals
5. Automation & Review → delivery, reminders, filename, final review + Save
```

The existing first two steps stay close to current behavior. Steps 3–5 are new or moved.

## Step 3 — Customize Document (the key new experience)

- Header copy: **"Customize Document"** with sub: *"Choose what changes each time this process is launched."*
- The document preview renders with **auto-detected highlight chips** over candidate phrases. Seeded examples per template type: Company name, Employee name, Start date, Salary, Address, Deal value, Email.
- Clicking a highlight (or click-dragging over text) opens a **popover**:
  - **Field label** (e.g. "Company Name")
  - **Value source** = participant from Step 2 (pill dropdown: `Client`, `Employee`, …)
  - **Field type**: Text · Date · Currency · Email · Number
  - Save → highlight becomes a solid role-colored chip showing `Client → Company Name`
- A right-hand summary list shows all customizations grouped by participant. Each item is removable / editable.
- **No `{{...}}` syntax anywhere.** Internally we still store a `token` but display is always `Participant → Label`.

## Step 4 — Recipient Fields

- Top label: **"Recipient fields"** with sub: *"Fields participants complete during the process — signatures, uploads, approvals, and form inputs."*
- Reuses existing placement canvas (signature / initials / date / text / checkbox / upload) currently inside the merged "rolesfields" step. Lift the fields-only part out.
- Each field is assigned to a participant (color-coded from Step 2).

## Step 5 — Automation & Review

Consolidates current delivery + automation + review screens into one final step with two stacked cards plus a compact review summary and **Save template** button.

## File changes

**Edit only** `src/components/sign/SignTemplateBuilder.tsx`:

- Update `StepKey` and `STEPS` to the 5-step array above.
- Split the existing combined "rolesfields" step into two: **Participants** (roles only) and **Recipient Fields** (placement only).
- Insert new **Customize Document** step (`customize`) between them. New component within the file: highlights overlay + popover editor + summary rail. Auto-seed 4–6 highlight candidates from a small heuristic on the document name / generic placeholders.
- Repurpose the existing variables data model (`SignTemplateVariable` in `useSignTemplates.ts`) as the storage for customizations — no schema change needed; only the UI/labeling changes ("variables" → "customizations", token hidden from UI, `roleKey` required).
- Move delivery + automation + review into a single **Automation & Review** step.
- Keep the inline Back / Step X of Y / Continue nav row already present.
- Remove the old "Customize" step (sub: "What changes each time") since it is replaced by the richer in-document experience.

**No changes** to `useSignTemplates.ts` schema, routes, or other components in this pass. Backward compatible with saved templates.

## UX details

- Step transitions: existing framer-motion slide/fade kept.
- Highlight chips use the assigned participant's color at 12% bg + 60% border; unassigned candidates use a dashed neutral outline that pulses gently on hover.
- Popover styled like existing role popover (rounded-xl, soft shadow, no heavy borders).
- Continue on Step 3 is enabled even with zero customizations (optional), but shows a subtle "0 values customized — recommended to add at least one" helper.
- Continue on Step 4 still requires ≥1 signature field (existing rule).

## Out of scope

- Real PDF text extraction / OCR. The highlight candidates are seeded mock phrases over the existing skeleton document — same approach as current preview.
- Backend persistence changes.
- Launch modal updates (existing modal already consumes variables; the rename is UI-only).
