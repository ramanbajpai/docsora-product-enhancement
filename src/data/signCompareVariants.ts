export interface SignCompareFeatureRow {
  feature: string;
  docsora: string;
  competitor: string;
}

export interface SignCompareFAQ {
  question: string;
  answer: string;
}

export interface SignCompareVariantConfig {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  overview: string;
  features: SignCompareFeatureRow[];
  workflow: SignCompareFeatureRow[];
  security: SignCompareFeatureRow[];
  experience: SignCompareFeatureRow[];
  pricing: SignCompareFeatureRow[];
  bestFor: string[];
  faq: SignCompareFAQ[];
}

const baseSecurity = (competitor: string): SignCompareFeatureRow[] => [
  { feature: "ESIGN / UETA aligned", docsora: "Yes", competitor: "Yes" },
  { feature: "eIDAS aligned", docsora: "Yes", competitor: "Yes" },
  { feature: "Tamper-evident audit trail", docsora: "Embedded in every document", competitor: "Yes" },
  { feature: "Email signer verification", docsora: "Built-in", competitor: "Built-in" },
  { feature: "TLS in transit", docsora: "Yes", competitor: "Yes" },
  { feature: "ISO 27001 / SOC 2", docsora: "Aligned", competitor: competitor === "DocuSign" ? "Certified" : "Aligned" },
];

export const signCompareVariants: SignCompareVariantConfig[] = [
  {
    slug: "compare/docsora-vs-docusign",
    competitor: "DocuSign",
    cardTitle: "Docsora vs DocuSign",
    cardSummary:
      "How a modern, workflow-first signing platform compares to the legacy enterprise e-signature standard.",
    title: "Docsora vs DocuSign — Modern DocuSign Alternative | Docsora",
    metaDescription:
      "Looking for a modern DocuSign alternative? Compare Docsora and DocuSign on workflow simplicity, templates, browser-native UX and pricing.",
    h1: "Docsora vs DocuSign",
    heroSubtitle:
      "An analytical look at how Docsora compares to DocuSign for modern operational signing workflows.",
    overview:
      "DocuSign is the legacy enterprise e-signature standard — broad feature surface, strong compliance posture, deep procurement workflows. Docsora is a modern, browser-native signing platform engineered for operational teams that ship agreements daily. Both deliver legally binding signatures; the difference is workflow speed, UX and how quickly a new team can ship its first signed agreement.",
    features: [
      { feature: "Browser-native signing", docsora: "Yes — premium, no installs", competitor: "Yes — utility-grade UX" },
      { feature: "Reusable templates", docsora: "One-click launch with variables", competitor: "Templates + envelopes" },
      { feature: "Multi-party signing", docsora: "Parallel or ordered", competitor: "Routing rules" },
      { feature: "Unified workspace", docsora: "Sign, store, track, AI review", competitor: "Standalone signing suite" },
      { feature: "Onboarding time", docsora: "Minutes", competitor: "Days to weeks" },
    ],
    workflow: [
      { feature: "Send first document", docsora: "Under 2 minutes", competitor: "Account + envelope setup" },
      { feature: "Template setup", docsora: "Visual drag-and-drop", competitor: "Multi-step admin flow" },
      { feature: "Status tracking", docsora: "Live workspace view", competitor: "Envelope dashboard" },
      { feature: "Reminders", docsora: "One-tap mass or individual", competitor: "Reminder rules" },
    ],
    security: baseSecurity("DocuSign"),
    experience: [
      { feature: "Signer experience", docsora: "Branded, minimal, fast", competitor: "Functional, multi-step" },
      { feature: "Mobile signing", docsora: "Native browser flow", competitor: "App + browser" },
      { feature: "Learning curve", docsora: "Near zero", competitor: "Moderate" },
    ],
    pricing: [
      { feature: "Free tier for standard documents", docsora: "Yes", competitor: "Limited trial" },
      { feature: "Per-envelope pricing", docsora: "No", competitor: "Yes" },
      { feature: "Procurement overhead", docsora: "Self-serve", competitor: "Enterprise contracts" },
    ],
    bestFor: [
      "Sales teams that need to send agreements daily",
      "Agencies and consultancies managing recurring client approvals",
      "Operational teams replacing fragmented signing tools",
      "Companies that want signing alongside storage and tracking",
    ],
    faq: [
      {
        question: "Is Docsora a modern DocuSign alternative?",
        answer:
          "Yes. Docsora delivers legally binding browser-based signatures with the same compliance baseline as DocuSign (ESIGN, UETA, eIDAS) but with a modern, premium UX and a unified workspace for signing, storage and tracking — without enterprise procurement cycles.",
      },
      {
        question: "Does Docsora replace DocuSign for enterprise teams?",
        answer:
          "For most operational workflows, yes. DocuSign still leads on deep procurement integrations and the broadest enterprise feature surface; Docsora wins on workflow speed, UX and the daily-driver experience teams actually want.",
      },
      {
        question: "Are Docsora signatures legally equivalent to DocuSign signatures?",
        answer:
          "Yes. Both platforms produce legally binding electronic signatures aligned with ESIGN, UETA and eIDAS. Every executed Docsora document includes a tamper-evident audit trail with signer identity, IP and timestamps.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-pandadoc",
    competitor: "PandaDoc",
    cardTitle: "Docsora vs PandaDoc",
    cardSummary:
      "How Docsora compares to PandaDoc for fast, browser-based agreement workflows and reusable templates.",
    title: "Docsora vs PandaDoc — Modern PandaDoc Alternative | Docsora",
    metaDescription:
      "Looking for a modern PandaDoc alternative? Compare Docsora and PandaDoc on signing speed, templates, workflow design and pricing.",
    h1: "Docsora vs PandaDoc",
    heroSubtitle:
      "A clear comparison of Docsora and PandaDoc for modern document workflows.",
    overview:
      "PandaDoc focuses on proposal authoring, content blocks and CPQ workflows. Docsora focuses on the operational signing layer — fast, browser-native, template-driven agreement execution alongside storage and tracking. Both produce legally binding signatures; teams pick Docsora when speed, UX and operational flow matter more than building documents from scratch inside the platform.",
    features: [
      { feature: "Browser-based signing", docsora: "Premium, Apple-inspired", competitor: "Yes" },
      { feature: "Reusable templates", docsora: "Visual drag-and-drop", competitor: "Content blocks + templates" },
      { feature: "Proposal authoring", docsora: "Upload-first", competitor: "Built-in editor" },
      { feature: "Unified workspace", docsora: "Sign, store, track, AI review", competitor: "Document workspace" },
      { feature: "Multi-document signing", docsora: "Yes", competitor: "Yes" },
    ],
    workflow: [
      { feature: "Send first agreement", docsora: "Under 2 minutes", competitor: "Authoring + send flow" },
      { feature: "Template launch", docsora: "One-click with variables", competitor: "Content block flow" },
      { feature: "Status tracking", docsora: "Live workspace", competitor: "Pipeline dashboard" },
      { feature: "Approval routing", docsora: "Parallel or ordered", competitor: "Approval workflows" },
    ],
    security: baseSecurity("PandaDoc"),
    experience: [
      { feature: "Signer experience", docsora: "Branded, fast, focused", competitor: "Functional" },
      { feature: "Setup time", docsora: "Minutes", competitor: "Hours of template build-out" },
    ],
    pricing: [
      { feature: "Free for standard documents", docsora: "Yes", competitor: "Limited trial" },
      { feature: "Per-seat fees", docsora: "Self-serve plans", competitor: "Seat + add-ons" },
    ],
    bestFor: [
      "Teams uploading existing proposals and contracts",
      "Agencies sending recurring client approvals",
      "Operational teams that prefer upload-and-send over building inside a CMS",
    ],
    faq: [
      {
        question: "Is Docsora a PandaDoc alternative?",
        answer:
          "Yes. Docsora is a modern alternative for teams that prefer to upload existing documents and send them for signature rather than authoring inside a CMS. The signing, templating and audit-trail experience matches or exceeds PandaDoc's core flows.",
      },
      {
        question: "Does Docsora include proposal authoring?",
        answer:
          "Docsora focuses on uploading and signing existing proposals. Most teams already author proposals in Word, Google Docs, Figma or PPT — Docsora removes the friction between authoring and execution.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-signnow",
    competitor: "SignNow",
    cardTitle: "Docsora vs SignNow",
    cardSummary:
      "How Docsora compares to SignNow for browser-based signing, templates and operational workflows.",
    title: "Docsora vs SignNow — Modern SignNow Alternative | Docsora",
    metaDescription:
      "Looking for a modern SignNow alternative? Compare Docsora and SignNow on signing UX, templates, multi-party workflows and pricing.",
    h1: "Docsora vs SignNow",
    heroSubtitle:
      "A side-by-side look at Docsora and SignNow for browser-based signing workflows.",
    overview:
      "SignNow delivers solid, value-priced e-signature workflows with team features and an API. Docsora delivers the same legal weight with a premium, modern UX, reusable templates with variables, and a unified workspace combining signing, storage, tracking and AI document review.",
    features: [
      { feature: "Browser-native signing", docsora: "Premium, Apple-inspired", competitor: "Yes" },
      { feature: "Reusable templates", docsora: "Visual with variables", competitor: "Templates supported" },
      { feature: "Multi-party signing", docsora: "Parallel or ordered", competitor: "Yes" },
      { feature: "Unified workspace", docsora: "Sign, store, track, AI review", competitor: "Signing-focused" },
      { feature: "Audit trail", docsora: "Embedded certificate", competitor: "Audit history" },
    ],
    workflow: [
      { feature: "Send first document", docsora: "Under 2 minutes", competitor: "Account + setup" },
      { feature: "Template launch", docsora: "One-click", competitor: "Template + recipient flow" },
      { feature: "Tracking", docsora: "Live workspace", competitor: "Documents dashboard" },
    ],
    security: baseSecurity("SignNow"),
    experience: [
      { feature: "Signer UX", docsora: "Branded, focused", competitor: "Functional" },
      { feature: "Workspace breadth", docsora: "Sign + store + track + AI", competitor: "Signing primary" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Yes for standard documents", competitor: "Limited trial" },
      { feature: "Self-serve plans", docsora: "Yes", competitor: "Yes" },
    ],
    bestFor: [
      "Teams that want a premium signing UX without enterprise pricing",
      "Agencies sending recurring approvals",
      "Operational teams consolidating signing + storage + tracking",
    ],
    faq: [
      {
        question: "Is Docsora a SignNow alternative?",
        answer:
          "Yes. Docsora matches SignNow's core e-signature capabilities and adds a unified workspace (storage, tracking, AI document review) with a premium, modern UX.",
      },
      {
        question: "How does the signer experience compare?",
        answer:
          "Docsora's signer flow is branded, minimal and mobile-first — designed to feel like Apple-grade product UX rather than enterprise software.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-dropbox-sign",
    competitor: "Dropbox Sign",
    cardTitle: "Docsora vs Dropbox Sign",
    cardSummary:
      "How Docsora compares to Dropbox Sign (formerly HelloSign) for fast, browser-based agreement workflows.",
    title: "Docsora vs Dropbox Sign — Modern HelloSign Alternative | Docsora",
    metaDescription:
      "Looking for a modern Dropbox Sign / HelloSign alternative? Compare Docsora and Dropbox Sign on signing UX, templates and workspace breadth.",
    h1: "Docsora vs Dropbox Sign",
    heroSubtitle:
      "A clear comparison of Docsora and Dropbox Sign (formerly HelloSign) for modern signing workflows.",
    overview:
      "Dropbox Sign (formerly HelloSign) offers clean, approachable e-signing tied closely to Dropbox storage. Docsora takes a similar UX philosophy further with a premium, Apple-inspired browser experience, reusable templates with variables and a unified workspace combining signing, storage, tracking and AI document review.",
    features: [
      { feature: "Browser-native signing", docsora: "Premium, Apple-inspired", competitor: "Clean, approachable" },
      { feature: "Reusable templates", docsora: "Visual with variables", competitor: "Templates supported" },
      { feature: "Unified workspace", docsora: "Sign, store, track, AI review", competitor: "Signing + Dropbox storage" },
      { feature: "Multi-party signing", docsora: "Parallel or ordered", competitor: "Yes" },
      { feature: "Storage integration", docsora: "Built-in Docsora Storage", competitor: "Dropbox primary" },
    ],
    workflow: [
      { feature: "Send first document", docsora: "Under 2 minutes", competitor: "Account + send flow" },
      { feature: "Template launch", docsora: "One-click with variables", competitor: "Template send flow" },
      { feature: "Tracking", docsora: "Live workspace", competitor: "Documents dashboard" },
    ],
    security: baseSecurity("Dropbox Sign"),
    experience: [
      { feature: "Signer UX", docsora: "Branded, focused", competitor: "Approachable" },
      { feature: "Workspace breadth", docsora: "Sign + store + track + AI", competitor: "Signing + storage" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Yes for standard documents", competitor: "Limited free" },
      { feature: "Self-serve plans", docsora: "Yes", competitor: "Yes" },
    ],
    bestFor: [
      "Teams that liked HelloSign's UX but want a more premium workspace",
      "Operational teams not committed to Dropbox storage",
      "Agencies that want signing + tracking + AI review in one tool",
    ],
    faq: [
      {
        question: "Is Docsora a Dropbox Sign / HelloSign alternative?",
        answer:
          "Yes. Docsora delivers a premium, browser-native signing experience that matches Dropbox Sign's clarity and adds reusable templates with variables, document tracking and AI review inside one workspace.",
      },
      {
        question: "Do I need to use Dropbox to use Docsora?",
        answer:
          "No. Docsora has its own document storage built in — there is no requirement to use Dropbox or any third-party storage provider.",
      },
    ],
  },
];

export const signCompareVariantBySlug: Record<string, SignCompareVariantConfig> =
  signCompareVariants.reduce<Record<string, SignCompareVariantConfig>>(
    (acc, v) => {
      acc[v.slug] = v;
      return acc;
    },
    {},
  );