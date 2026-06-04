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
    title: "Docsora vs WeTransfer — WeTransfer Alternative for Business File Delivery | Docsora",
    metaDescription:
      "Objective Docsora vs WeTransfer comparison. See how each platform handles large file transfer, recipient tracking, storage, document workflows and team collaboration.",
    h1: "Docsora vs WeTransfer",
    heroSubtitle:
      "Objective comparison of file delivery, recipient experience, tracking, storage and operational workflows.",
    description:
      "Both Docsora and WeTransfer allow users to share files, but they are designed for different use cases. WeTransfer is a focused file transfer service built around the simple act of sending files via a link. Docsora is a document delivery platform that combines file transfer with storage, file requests, tracking, signatures and operational workflows. This guide compares how each platform approaches file delivery, recipient visibility, collaboration and workflow management.",
    bestForDocsora:
      "Businesses, agencies, freelancers and consumers who need file delivery as part of a broader document workflow that includes storage, tracking, file requests, approvals and operational processes.",
    bestForCompetitor:
      "Individuals and small teams who need a simple, familiar way to send files quickly without setting up an account or building a workflow.",
    features: [
      { feature: "Large file transfers", docsora: "Supported", competitor: "Supported" },
      { feature: "Recipient tracking", docsora: "Open and download events", competitor: "Email notification on download" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "File expiry controls", docsora: "Configurable per link", competitor: "Configurable on paid plans" },
      { feature: "Password protection", docsora: "Built-in", competitor: "Paid plans" },
      { feature: "Document storage", docsora: "Included", competitor: "Limited / separate product" },
      { feature: "Request files from others", docsora: "Built-in", competitor: "Not a core feature" },
      { feature: "Workflow automation", docsora: "Built-in", competitor: "Not available" },
      { feature: "Client onboarding flows", docsora: "Supported", competitor: "Not available" },
      { feature: "Team workspaces", docsora: "Supported", competitor: "Limited" },
      { feature: "File versioning", docsora: "Supported in storage", competitor: "Not a focus" },
      { feature: "Document signing", docsora: "Built-in", competitor: "Not available" },
      { feature: "Operational workflows", docsora: "Built-in", competitor: "Not the product focus" },
    ],
    keyDifferences: [
      "WeTransfer is focused on simple, one-off file delivery via a link.",
      "Docsora combines file delivery with storage, document workflows, signatures, file requests and operational processes in one platform.",
      "WeTransfer is most often used as a standalone transfer tool alongside other document software.",
      "Docsora is designed as part of a broader document management platform that covers the lifecycle around the file, not just the upload.",
      "Recipient tracking in Docsora extends beyond a single download notification to a richer activity view.",
    ],
    whoChooseDocsora: [
      "Teams that want file transfer, storage, signing and tracking in one place instead of stitching tools together.",
      "Agencies and consultancies delivering client work as part of a structured workflow.",
      "Operations, legal, finance and HR teams who need an audit-friendly record of what was sent, received and signed.",
      "Freelancers and small businesses that want a more professional recipient experience than a generic transfer page.",
    ],
    whoChooseCompetitor: [
      "Individuals sending an occasional large file with no need for tracking, workflows or storage.",
      "Users who specifically want the familiar WeTransfer link experience for one-off creative transfers.",
      "Teams that already have their document stack in place and only need a lightweight transfer utility.",
    ],
    faq: [
      {
        question: "Is Docsora a WeTransfer alternative?",
        answer:
          "Yes. Docsora can be used in place of WeTransfer for large file transfer, and it also includes storage, file requests, recipient tracking, signing and document workflows in the same platform.",
      },
      {
        question: "What is the main difference between Docsora and WeTransfer?",
        answer:
          "WeTransfer is primarily a file transfer service. Docsora is a document delivery platform that uses transfer as one part of a broader workflow that includes storage, signatures, requests and operational processes.",
      },
      {
        question: "Can Docsora track recipient activity?",
        answer:
          "Yes. Docsora records open and download events for shared files and surfaces this in the dashboard so senders can see what happened after a file was delivered.",
      },
      {
        question: "Does Docsora include storage?",
        answer:
          "Yes. Files sent through Docsora can be retained in built-in storage, organised into folders and reused across signatures, requests and other workflows.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "compare/docsora-vs-dropbox-transfer",
    competitor: "Dropbox Transfer",
    cardTitle: "Docsora vs Dropbox Transfer",
    cardSummary:
      "How a workflow-native delivery platform compares to Dropbox's bolt-on transfer feature.",
    title: "Docsora vs Dropbox Transfer — Dropbox Transfer Alternative for Document Workflows | Docsora",
    metaDescription:
      "Objective Docsora vs Dropbox Transfer comparison. See how each platform handles file delivery, recipient tracking, document storage, signing and operational workflows.",
    h1: "Docsora vs Dropbox Transfer",
    heroSubtitle:
      "Objective comparison of file delivery, recipient experience, tracking, storage and operational workflows.",
    description:
      "Both Docsora and Dropbox Transfer allow users to send files via a link, but they sit inside very different products. Dropbox Transfer is a feature within the Dropbox ecosystem, designed to let existing Dropbox users send copies of files to recipients. Docsora is a standalone document delivery platform that combines file transfer with storage, file requests, signing and workflows. This guide compares how each platform approaches file delivery, recipient visibility, collaboration and workflow management.",
    bestForDocsora:
      "Teams managing client-facing document processes who want transfer, storage, signing and tracking in one platform.",
    bestForCompetitor:
      "Existing Dropbox users who occasionally need to send a copy of a file to a recipient as a transfer link.",
    features: [
      { feature: "Large file transfers", docsora: "Supported", competitor: "Supported" },
      { feature: "Recipient tracking", docsora: "Open and download events", competitor: "Download notifications" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "File expiry controls", docsora: "Configurable per link", competitor: "Configurable" },
      { feature: "Password protection", docsora: "Built-in", competitor: "Available on paid plans" },
      { feature: "Document storage", docsora: "Included", competitor: "Core Dropbox product (separate)" },
      { feature: "Request files from others", docsora: "Built-in", competitor: "Available as separate feature" },
      { feature: "Workflow automation", docsora: "Built-in", competitor: "Limited" },
      { feature: "Client onboarding flows", docsora: "Supported", competitor: "Not a core focus" },
      { feature: "Team workspaces", docsora: "Supported", competitor: "Supported via Dropbox" },
      { feature: "File versioning", docsora: "Supported in storage", competitor: "Supported via Dropbox" },
      { feature: "Document signing", docsora: "Built-in", competitor: "Available via separate Dropbox Sign product" },
      { feature: "Operational workflows", docsora: "Built-in", competitor: "Requires additional Dropbox products" },
    ],
    keyDifferences: [
      "Dropbox Transfer is an extension of Dropbox's cloud storage product.",
      "Docsora focuses specifically on operational document delivery workflows.",
      "Docsora includes transfer, storage, signatures, file requests and workflows inside a single platform.",
      "Dropbox Transfer is primarily a delivery feature; broader workflow and signing capabilities live in separate Dropbox products.",
      "Docsora is a fit when teams want one tool for the full document lifecycle rather than several Dropbox products.",
    ],
    whoChooseDocsora: [
      "Teams that want transfer, storage, signing and tracking unified in one platform.",
      "Client-facing teams who need structured delivery rather than ad-hoc transfer links.",
      "Operations and legal teams that need a clear record of what was sent and signed.",
    ],
    whoChooseCompetitor: [
      "Organisations already standardised on Dropbox who want to use Transfer as an extension of their existing storage.",
      "Users who only need occasional transfer functionality on top of Dropbox.",
    ],
    faq: [
      {
        question: "What is the difference between Docsora and Dropbox Transfer?",
        answer:
          "Dropbox Transfer is a delivery feature inside the Dropbox storage product. Docsora is a standalone document delivery platform that combines transfer with storage, signing, file requests and operational workflows.",
      },
      {
        question: "Do I need a Dropbox account to use Docsora?",
        answer:
          "No. Docsora is independent of Dropbox. Sender and recipient experiences work directly in the browser without any Dropbox account.",
      },
      {
        question: "Can Docsora replace Dropbox for my team?",
        answer:
          "Docsora is purpose-built for document delivery, storage and workflows rather than full general-purpose cloud sync. Teams that primarily use Dropbox to deliver documents to clients can use Docsora end to end; teams using Dropbox as a general file system may continue to use it for that purpose.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "compare/docsora-vs-masv",
    competitor: "MASV",
    cardTitle: "Docsora vs MASV",
    cardSummary:
      "How an operational delivery platform compares to MASV's pay-per-GB media transfer.",
    title: "Docsora vs MASV — Business Document Delivery vs Large Media Transfer | Docsora",
    metaDescription:
      "Objective Docsora vs MASV comparison. See how each platform approaches file delivery: Docsora for business document workflows, MASV for large media transfer.",
    h1: "Docsora vs MASV",
    heroSubtitle:
      "Objective comparison of file delivery, recipient experience, tracking, storage and operational workflows.",
    description:
      "Docsora and MASV are both file delivery platforms, but they are built for different categories of work. MASV is designed around the needs of media and broadcast teams moving very large production files, with pricing structured around data volume. Docsora is built around business document delivery — contracts, proposals, onboarding packs, compliance documents and client work — combined with storage, signing and operational workflows. This guide compares how each platform approaches file delivery, recipient visibility, collaboration and workflow management. Docsora is not positioned as a replacement for specialised media delivery infrastructure.",
    bestForDocsora:
      "Business document delivery and operational workflows for contracts, proposals, onboarding, compliance and client deliverables.",
    bestForCompetitor:
      "Media, film, video production and broadcast teams moving very large production files where transfer speed and per-GB economics are the main consideration.",
    features: [
      { feature: "Large file transfers", docsora: "Supported for typical business files", competitor: "Optimised for very large media files" },
      { feature: "Recipient tracking", docsora: "Open and download events", competitor: "Download tracking" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "File expiry controls", docsora: "Configurable per link", competitor: "Configurable" },
      { feature: "Password protection", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Document storage", docsora: "Included for business documents", competitor: "Storage focused on media files" },
      { feature: "Request files from others", docsora: "Built-in", competitor: "Supported for media intake" },
      { feature: "Workflow automation", docsora: "Document workflows", competitor: "Media-centric workflows" },
      { feature: "Client onboarding flows", docsora: "Supported", competitor: "Not the product focus" },
      { feature: "Team workspaces", docsora: "Supported", competitor: "Supported" },
      { feature: "File versioning", docsora: "Supported in storage", competitor: "Not a primary focus" },
      { feature: "Document signing", docsora: "Built-in", competitor: "Not available" },
      { feature: "Operational workflows", docsora: "Business documents", competitor: "Media production pipelines" },
    ],
    keyDifferences: [
      "MASV is built around high-volume media transfers and very large production files.",
      "Docsora focuses on business document operations, including contracts, proposals, onboarding and compliance.",
      "MASV is commonly used by video production, film and media organisations.",
      "Docsora is designed for legal, finance, operations, agency and consultancy use cases that revolve around documents.",
      "MASV uses pricing structured around data volume; Docsora uses subscription pricing aligned to document workflows.",
    ],
    whoChooseDocsora: [
      "Teams whose primary delivery is documents rather than raw media.",
      "Operations and client-facing teams that want delivery combined with storage and signing.",
      "Businesses that need a predictable subscription model rather than per-GB billing for documents.",
    ],
    whoChooseCompetitor: [
      "Media, post-production and broadcast teams moving terabyte-scale footage between facilities.",
      "Studios and production companies whose core workflow is large media files rather than business documents.",
    ],
    faq: [
      {
        question: "When should I use MASV instead of Docsora?",
        answer:
          "MASV is a strong fit when the primary workload is very large media files for film, video or broadcast production. Docsora is intended for business document delivery rather than specialised media pipelines.",
      },
      {
        question: "Can Docsora handle large files?",
        answer:
          "Docsora supports large file transfers for typical business use cases such as design files, presentations and document bundles. For specialised high-volume media production workflows, dedicated media transfer infrastructure such as MASV is often a better fit.",
      },
      {
        question: "Does Docsora include signing and storage?",
        answer:
          "Yes. Docsora combines file delivery with document storage, file requests and document signing in one platform, which sits outside MASV's media-focused scope.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "compare/docsora-vs-smash",
    competitor: "Smash",
    cardTitle: "Docsora vs Smash",
    cardSummary:
      "How Docsora Transfer compares to Smash for large file delivery and operational workflows.",
    title: "Docsora vs Smash — Smash Alternative for Business File Delivery | Docsora",
    metaDescription:
      "Objective Docsora vs Smash comparison. See how each platform handles large file transfer, recipient tracking, storage, signing and document workflows.",
    h1: "Docsora vs Smash",
    heroSubtitle:
      "Objective comparison of file delivery, recipient experience, tracking, storage and operational workflows.",
    description:
      "Docsora and Smash both let users send files in the browser, but they target different needs. Smash is designed around frictionless large file sharing with a simple uploader and shareable links. Docsora is a document delivery platform that adds storage, tracking, file requests, signing and operational workflows around the act of sending a file. This guide compares how each platform approaches file delivery, recipient visibility, collaboration and workflow management.",
    bestForDocsora:
      "Operational file delivery and document workflows where transfer is one step in a broader process that also includes storage, signing and tracking.",
    bestForCompetitor:
      "Users seeking large file sharing with minimal setup, primarily for sending creative assets or one-off files.",
    features: [
      { feature: "Large file transfers", docsora: "Supported", competitor: "Supported" },
      { feature: "Recipient tracking", docsora: "Open and download events", competitor: "Basic notifications" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "File expiry controls", docsora: "Configurable per link", competitor: "Configurable" },
      { feature: "Password protection", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Document storage", docsora: "Included", competitor: "Limited" },
      { feature: "Request files from others", docsora: "Built-in", competitor: "Not a core feature" },
      { feature: "Workflow automation", docsora: "Built-in", competitor: "Not available" },
      { feature: "Client onboarding flows", docsora: "Supported", competitor: "Not available" },
      { feature: "Team workspaces", docsora: "Supported", competitor: "Limited" },
      { feature: "File versioning", docsora: "Supported in storage", competitor: "Not a focus" },
      { feature: "Document signing", docsora: "Built-in", competitor: "Not available" },
      { feature: "Operational workflows", docsora: "Built-in", competitor: "Not the product focus" },
    ],
    keyDifferences: [
      "Both Docsora and Smash support large file delivery in the browser.",
      "Docsora extends beyond transfer into document management, storage, file requests and workflows.",
      "Smash focuses primarily on the file transfer experience itself.",
      "Docsora is a fit when the file being delivered is part of a larger document process such as a proposal, contract or onboarding pack.",
    ],
    whoChooseDocsora: [
      "Teams that want delivery, storage, signing and tracking in one platform.",
      "Client-facing teams who need recipient visibility after a file is sent.",
      "Businesses that need structured document processes around the file transfer.",
    ],
    whoChooseCompetitor: [
      "Individuals and creative users who want simple large file sharing.",
      "Teams that already have document workflows in place and only need a lightweight transfer tool.",
    ],
    faq: [
      {
        question: "Is Docsora a Smash alternative?",
        answer:
          "Docsora can be used in place of Smash for sending files, and it also includes storage, signing, file requests and document workflows in the same platform.",
      },
      {
        question: "What is the difference between Docsora and Smash?",
        answer:
          "Smash is focused on the file transfer step. Docsora is a document delivery platform that wraps transfer in storage, tracking, signing and operational workflows.",
      },
      {
        question: "Can Docsora track recipient activity?",
        answer:
          "Yes. Docsora records open and download events for shared files so senders can see what happened after a transfer was sent.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "compare/docsora-vs-google-drive",
    competitor: "Google Drive",
    cardTitle: "Docsora vs Google Drive",
    cardSummary:
      "How a purpose-built delivery platform compares to using Google Drive share links for client work.",
    title: "Docsora vs Google Drive — Google Drive Alternative for Client File Delivery | Docsora",
    metaDescription:
      "Objective Docsora vs Google Drive comparison. See how each platform handles file delivery, recipient experience, tracking, storage and document workflows.",
    h1: "Docsora vs Google Drive",
    heroSubtitle:
      "Objective comparison of file delivery, recipient experience, tracking, storage and operational workflows.",
    description:
      "Docsora and Google Drive are often compared because many teams use Google Drive share links as a workaround for client file delivery. Google Drive is primarily a cloud storage and collaboration product. Docsora is a document delivery platform designed specifically around sending files to recipients, tracking what happens after delivery and connecting transfer to signing, storage and workflows. This guide compares how each platform approaches file delivery, recipient visibility, collaboration and workflow management.",
    bestForDocsora:
      "Structured, client-facing document delivery and workflow management where each transfer has a clear recipient experience, tracking and follow-on actions.",
    bestForCompetitor:
      "General-purpose cloud storage and real-time document collaboration across teams already standardised on Google Workspace.",
    features: [
      { feature: "Large file transfers", docsora: "Supported", competitor: "Supported via share links" },
      { feature: "Recipient tracking", docsora: "Open and download events for transfers", competitor: "Limited; depends on file type and account" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "File expiry controls", docsora: "Configurable per link", competitor: "Limited" },
      { feature: "Password protection", docsora: "Built-in for transfers", competitor: "Not a core sharing feature" },
      { feature: "Document storage", docsora: "Included", competitor: "Core product" },
      { feature: "Request files from others", docsora: "Built-in", competitor: "Possible via folder sharing or forms" },
      { feature: "Workflow automation", docsora: "Document workflows", competitor: "Via separate Google Workspace tools" },
      { feature: "Client onboarding flows", docsora: "Supported", competitor: "Not a core focus" },
      { feature: "Team workspaces", docsora: "Supported", competitor: "Supported via shared drives" },
      { feature: "File versioning", docsora: "Supported in storage", competitor: "Supported in Drive" },
      { feature: "Document signing", docsora: "Built-in", competitor: "Not built in" },
      { feature: "Operational workflows", docsora: "Built-in", competitor: "Requires additional tooling" },
    ],
    keyDifferences: [
      "Google Drive is primarily a cloud storage and collaboration platform.",
      "Docsora is designed around operational document delivery to recipients.",
      "Many businesses currently use Google Drive share links as a workaround for file delivery to clients.",
      "Docsora provides a purpose-built delivery experience with tracking, expiry controls, password protection and recipient actions.",
      "Google Drive is broader as a general workspace; Docsora is focused on the delivery, signing and document workflow layer.",
    ],
    whoChooseDocsora: [
      "Teams that regularly deliver documents to external clients and want a professional, structured recipient experience.",
      "Agencies, consultancies, legal and finance teams that need tracking and an audit trail around what was sent.",
      "Businesses that want transfer, signing and document workflows in one platform rather than stitched together.",
    ],
    whoChooseCompetitor: [
      "Teams primarily using Google Drive for internal collaboration and document editing.",
      "Organisations already standardised on Google Workspace whose delivery needs are occasional and informal.",
    ],
    faq: [
      {
        question: "Can Docsora replace Google Drive?",
        answer:
          "Docsora is not intended as a full replacement for general-purpose cloud storage and collaboration. It is designed to replace the use of Google Drive share links as an ad-hoc client file delivery method, with a structured delivery, tracking and workflow experience.",
      },
      {
        question: "What is the difference between Docsora and Google Drive?",
        answer:
          "Google Drive is built around storing and collaborating on files. Docsora is built around delivering files to recipients with tracking, expiry controls, signing and document workflows.",
      },
      {
        question: "Do recipients need a Google account to receive files via Docsora?",
        answer:
          "No. Docsora transfers are delivered via a link that opens in the browser without requiring a Google account or any other third-party login.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
];

export const transferCompareVariantBySlug: Record<string, TransferCompareVariantConfig> =
  Object.fromEntries(transferCompareVariants.map((v) => [v.slug, v]));