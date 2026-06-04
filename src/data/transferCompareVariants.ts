export interface TransferCompareFeatureRow {
  feature: string;
  docsora: string;
  competitor: string;
}

export interface TransferCompareFAQ {
  question: string;
  answer: string;
}

export interface TransferCompareVariantConfig {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  description: string;
  bestForDocsora: string;
  bestForCompetitor: string;
  features: TransferCompareFeatureRow[];
  keyDifferences: string[];
  whoChooseDocsora: string[];
  whoChooseCompetitor: string[];
  faq: TransferCompareFAQ[];
  lastUpdated: string;
}

const LAST_UPDATED = "June 2026";

export const transferCompareVariants: TransferCompareVariantConfig[] = [
  {
    slug: "compare/docsora-vs-wetransfer",
    competitor: "WeTransfer",
    cardTitle: "Docsora vs WeTransfer",
    cardSummary:
      "How modern operational delivery infrastructure compares to the original generic upload utility.",
    title: "Docsora vs WeTransfer — Modern WeTransfer Alternative | Docsora",
    metaDescription:
      "Compare Docsora and WeTransfer on tracking, branded delivery, workflow integration, encryption and pricing. The modern WeTransfer alternative for operational teams.",
    h1: "Docsora vs WeTransfer",
    heroSubtitle:
      "How Docsora Transfer compares to WeTransfer for modern operational file delivery.",
    overview:
      "WeTransfer is a generic upload utility — drop a file, get a link, hope it gets opened. Docsora Transfer is operational delivery infrastructure — every transfer is tracked, brandable, encrypted and connected to the rest of your operational workflows. Both are browser-native; the difference is everything that happens after the file is uploaded.",
    features: [
      { feature: "Browser-native delivery", docsora: "Yes", competitor: "Yes" },
      { feature: "Real-time download tracking", docsora: "Open + download events", competitor: "Email notification only" },
      { feature: "Branded recipient pages", docsora: "Included", competitor: "Pro tier only" },
      { feature: "Workflow integration (sign, approve)", docsora: "Native", competitor: "None" },
      { feature: "Multi-file operational packages", docsora: "Bundled", competitor: "Single ZIP" },
      { feature: "Audit-ready activity log", docsora: "Yes", competitor: "No" },
    ],
    workflow: [
      { feature: "Time to first delivery", docsora: "Seconds", competitor: "Seconds" },
      { feature: "Route to signing", docsora: "One click", competitor: "Manual export" },
      { feature: "Approval workflows", docsora: "Native", competitor: "None" },
      { feature: "Recipient experience", docsora: "Branded", competitor: "Generic WeTransfer page" },
    ],
    security: baseSecurity("WeTransfer"),
    experience: [
      { feature: "Upload UX", docsora: "Premium, motion-rich", competitor: "Utility-grade" },
      { feature: "Mobile experience", docsora: "Fully responsive", competitor: "Functional" },
      { feature: "Workspace integration", docsora: "Storage + Sign + Track", competitor: "Standalone" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Generous browser-native", competitor: "2GB limit" },
      { feature: "Pro tier", docsora: "Operational features included", competitor: "Branding behind paywall" },
    ],
    bestFor: [
      "Agencies that need branded client delivery",
      "Production teams moving RAW video and design files",
      "Operations teams routing delivery into signing",
      "Consultancies and finance shipping board materials",
      "Anyone tired of WeTransfer Pro's pricing",
    ],
    faq: [
      {
        question: "Is Docsora a real WeTransfer alternative?",
        answer:
          "Yes. Docsora replicates WeTransfer's core drag-and-drop flow and adds operational infrastructure on top — tracking, branding, encryption and workflow integration.",
      },
      {
        question: "Can I migrate my WeTransfer workflows to Docsora?",
        answer:
          "Yes. Most teams migrate in an afternoon — share the new Docsora link in place of the WeTransfer URL and you're done.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-dropbox-transfer",
    competitor: "Dropbox Transfer",
    cardTitle: "Docsora vs Dropbox Transfer",
    cardSummary:
      "How a workflow-native delivery platform compares to Dropbox's bolt-on transfer feature.",
    title: "Docsora vs Dropbox Transfer — Modern Alternative | Docsora",
    metaDescription:
      "Compare Docsora and Dropbox Transfer on workflow integration, branded delivery, tracking and pricing for modern operational teams.",
    h1: "Docsora vs Dropbox Transfer",
    heroSubtitle:
      "How Docsora Transfer compares to Dropbox Transfer for modern operational delivery.",
    overview:
      "Dropbox Transfer is a bolt-on feature inside the broader Dropbox sync ecosystem. Docsora Transfer is a purpose-built operational delivery layer — no sync clients required, with branded pages, real-time tracking and workflow integration designed for teams that ship work professionally.",
    features: [
      { feature: "Browser-native (no sync client)", docsora: "Yes", competitor: "Sync client recommended" },
      { feature: "Branded recipient pages", docsora: "Yes", competitor: "Limited" },
      { feature: "Workflow integration", docsora: "Sign + approve + track", competitor: "Dropbox ecosystem only" },
      { feature: "Tracking & audit log", docsora: "Real-time", competitor: "Basic" },
    ],
    workflow: [
      { feature: "Setup time", docsora: "Seconds", competitor: "Account + workspace setup" },
      { feature: "Route to signing", docsora: "Native", competitor: "Via integrations" },
    ],
    security: baseSecurity("Dropbox Transfer"),
    experience: [
      { feature: "Standalone transfer UX", docsora: "Premium, focused", competitor: "Embedded in Dropbox" },
      { feature: "Mobile experience", docsora: "Fully responsive", competitor: "App-first" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Generous", competitor: "Tied to Dropbox plan" },
    ],
    bestFor: [
      "Teams that don't want Dropbox sync",
      "Agencies needing branded delivery",
      "Workflow-first operational teams",
    ],
    faq: [
      {
        question: "Do I need a Dropbox account to use Docsora?",
        answer: "No. Docsora is fully independent — no Dropbox, no sync clients, no ecosystem lock-in.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-masv",
    competitor: "MASV",
    cardTitle: "Docsora vs MASV",
    cardSummary:
      "How an operational delivery platform compares to MASV's pay-per-GB media transfer.",
    title: "Docsora vs MASV — Operational Alternative | Docsora",
    metaDescription:
      "Compare Docsora and MASV for large media transfer, operational workflows, pricing and team usage.",
    h1: "Docsora vs MASV",
    heroSubtitle:
      "How Docsora Transfer compares to MASV for large media and operational file delivery.",
    overview:
      "MASV is a specialist large-media transfer tool with pay-per-GB pricing aimed at film and broadcast. Docsora Transfer covers large media plus the wider operational stack — documents, decks, signing, approvals and tracked client delivery — on predictable flat pricing.",
    features: [
      { feature: "Large media support", docsora: "Yes", competitor: "Yes" },
      { feature: "Operational document workflows", docsora: "Native", competitor: "Limited" },
      { feature: "Branded delivery pages", docsora: "Included", competitor: "Yes" },
      { feature: "Workflow integration", docsora: "Sign + approve", competitor: "None" },
    ],
    workflow: [
      { feature: "Pricing model", docsora: "Flat plans", competitor: "Pay-per-GB" },
      { feature: "Cross-domain workflow", docsora: "Media + docs + sign", competitor: "Media-only" },
    ],
    security: baseSecurity("MASV"),
    experience: [
      { feature: "Cross-team usability", docsora: "Wider operational fit", competitor: "Media-team focused" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Generous", competitor: "Pay-per-GB after credit" },
    ],
    bestFor: [
      "Studios that also ship documents",
      "Teams that want flat pricing",
      "Cross-functional creative ops",
    ],
    faq: [
      {
        question: "Is Docsora as fast as MASV for large media?",
        answer:
          "For most operational workloads, yes. MASV optimizes for terabyte-scale broadcast pipelines; Docsora optimizes for everyday large-media delivery integrated with the rest of your operational stack.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-smash",
    competitor: "Smash",
    cardTitle: "Docsora vs Smash",
    cardSummary:
      "How Docsora Transfer compares to Smash for large file delivery and operational workflows.",
    title: "Docsora vs Smash — Modern File Transfer Alternative | Docsora",
    metaDescription:
      "Compare Docsora and Smash on operational workflows, branded delivery, tracking and pricing.",
    h1: "Docsora vs Smash",
    heroSubtitle:
      "How Docsora Transfer compares to Smash for operational file delivery.",
    overview:
      "Smash is a clean WeTransfer alternative for consumer and small-team file delivery. Docsora Transfer covers the same ground and adds operational infrastructure — workflow integration into signing and approvals, audit-ready activity logs and full workspace integration.",
    features: [
      { feature: "Browser-native delivery", docsora: "Yes", competitor: "Yes" },
      { feature: "Branded pages", docsora: "Included", competitor: "Pro tier" },
      { feature: "Workflow integration", docsora: "Native", competitor: "None" },
      { feature: "Audit log", docsora: "Yes", competitor: "Limited" },
    ],
    workflow: [
      { feature: "Time to first delivery", docsora: "Seconds", competitor: "Seconds" },
      { feature: "Workspace integration", docsora: "Sign + Track + Storage", competitor: "Standalone" },
    ],
    security: baseSecurity("Smash"),
    experience: [
      { feature: "Recipient experience", docsora: "Branded operational page", competitor: "Smash-branded by default" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Generous", competitor: "Speed-limited free tier" },
    ],
    bestFor: [
      "Teams growing beyond consumer transfer tools",
      "Agencies that want branding included",
      "Operational teams routing files into workflows",
    ],
    faq: [
      {
        question: "Why pick Docsora over Smash?",
        answer:
          "Smash is a fine consumer transfer tool; Docsora is an operational platform. If you need workflow integration, branded delivery and audit logging without paying for multiple add-ons, Docsora is the modern fit.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-google-drive",
    competitor: "Google Drive",
    cardTitle: "Docsora vs Google Drive",
    cardSummary:
      "How a purpose-built delivery platform compares to using Google Drive share links for client work.",
    title: "Docsora vs Google Drive — Modern Delivery Alternative | Docsora",
    metaDescription:
      "Compare Docsora and Google Drive for client file delivery, branded transfer pages, tracking and operational workflows.",
    h1: "Docsora vs Google Drive",
    heroSubtitle:
      "How Docsora Transfer compares to using Google Drive share links for operational delivery.",
    overview:
      "Google Drive is a great storage product, but client delivery via Drive share links is fragmented and unprofessional. Docsora Transfer is purpose-built operational delivery — branded pages, real-time tracking, encrypted sessions and workflow integration the moment recipients open the link.",
    features: [
      { feature: "Branded recipient pages", docsora: "Yes", competitor: "Generic Drive UI" },
      { feature: "Real-time tracking", docsora: "Open + download events", competitor: "Basic activity" },
      { feature: "Workflow integration", docsora: "Sign + approve", competitor: "Workspace required" },
      { feature: "Recipient account required", docsora: "Never", competitor: "Often required" },
    ],
    workflow: [
      { feature: "External recipient friction", docsora: "Zero", competitor: "Account / permissions" },
      { feature: "Delivery experience", docsora: "Branded transfer page", competitor: "Drive folder view" },
    ],
    security: baseSecurity("Google Drive"),
    experience: [
      { feature: "Purpose-built for delivery", docsora: "Yes", competitor: "Storage product" },
    ],
    pricing: [
      { feature: "Free tier", docsora: "Generous", competitor: "15GB total (shared with Gmail)" },
    ],
    bestFor: [
      "Teams that deliver work to non-Google clients",
      "Agencies needing branded delivery",
      "Anyone tired of permission-error emails",
    ],
    faq: [
      {
        question: "Why not just use Google Drive share links?",
        answer:
          "Drive share links require recipients to navigate Google's UI, often hit permission errors and give the sender no branding or real tracking. Docsora is purpose-built for the recipient experience.",
      },
    ],
  },
];

export const transferCompareVariantBySlug: Record<string, TransferCompareVariantConfig> =
  Object.fromEntries(transferCompareVariants.map((v) => [v.slug, v]));