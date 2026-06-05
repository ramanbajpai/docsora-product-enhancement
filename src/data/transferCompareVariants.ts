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
  tagline?: string;
  trustStrip?: string;
  chooseDocsoraList?: string[];
  chooseCompetitorList?: string[];
  features: TransferCompareFeatureRow[];
  securityFeatures: TransferCompareFeatureRow[];
  keyDifferences: string[];
  whySwitch: string[];
  whoChooseDocsora: string[];
  whoChooseCompetitor: string[];
  faq: TransferCompareFAQ[];
  lastUpdated: string;
}

const LAST_UPDATED = "June 2026";

// Shared Docsora cells. Competitor values are populated per variant using
// only publicly stated information. Where information cannot be verified,
// we display "Not publicly stated" rather than a checkmark or cross.
const NOT_STATED = "Not publicly stated";

export const transferCompareVariants: TransferCompareVariantConfig[] = [
  {
    slug: "wetransfer-alternative",
    competitor: "WeTransfer",
    cardTitle: "WeTransfer Alternative",
    cardSummary:
      "Compare Docsora and WeTransfer across transfer tracking, expiry controls, transfer history, download visibility, security and compliance.",
    title: "WeTransfer Alternative — WeTransfer Alternative for Large File Transfer | Docsora",
    metaDescription:
      "Compare Docsora and WeTransfer for large file transfer, recipient tracking, transfer expiry control, download notifications and transfer lifecycle management.",
    h1: "A Modern WeTransfer Alternative",
    tagline: "Send Files. Track Everything.",
    heroSubtitle:
      "Send large files securely with download tracking, expiry controls, transfer history and recipient activity visibility from one dashboard.",
    description:
      "Both Docsora and WeTransfer help users send large files through shareable links. Docsora is built for users who want more visibility after sending — including transfer tracking, download activity, expiry management and access to transfer history.",
    trustStrip:
      "ISO 27001 Certified · SOC 2 Type I · GDPR Compliant · 100+ File Types · Download Tracking",
    bestForDocsora:
      "Individuals, freelancers, agencies and businesses that want visibility, control and management over every transfer after it has been sent — including tracking, expiry extension, reactivation and centralized transfer history.",
    bestForCompetitor:
      "Users who want a familiar, simple way to send a one-off large file via a link without managing it afterwards.",
    chooseDocsoraList: [
      "Download tracking",
      "Transfer history",
      "Expiry date management",
      "Reactivate expired transfers",
      "Recipient activity visibility",
      "Secure business file sharing",
      "Compliance-focused controls",
    ],
    chooseCompetitorList: [
      "A familiar file transfer experience",
      "Simple one-time file sending",
      "Quick sharing without ongoing transfer management",
      "A widely recognised transfer tool",
    ],
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "Up to 200 GB on Pro" },
      { feature: "No recipient account required", docsora: "Yes", competitor: "Yes" },
      { feature: "Supports 100+ file types", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Open tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Download notifications", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Transfer history", docsora: "Built-in", competitor: "Limited" },
      { feature: "View all sent transfers", docsora: "Built-in", competitor: "Limited" },
      { feature: "View all received transfers", docsora: "Built-in", competitor: "Not available" },
      { feature: "Extend expiry after sending", docsora: "Built-in", competitor: "Limited" },
      { feature: "Reactivate expired transfers", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Dashboard recommendations", docsora: "Built-in", competitor: "Not available" },
      { feature: "Transfer management center", docsora: "Built-in", competitor: "Not available" },
      { feature: "Custom transfer messages", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Recipient reminders", docsora: "Built-in", competitor: "Limited" },
      { feature: "File storage integration", docsora: "Built-in", competitor: "Not available" },
    ],
    securityFeatures: [
      { feature: "AES-256 encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "TLS encryption in transit", docsora: "Yes", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes (paid plans)" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Yes", competitor: "Yes" },
      { feature: "Activity visibility", docsora: "Yes", competitor: "Limited" },
      { feature: "Audit visibility", docsora: "Yes", competitor: NOT_STATED },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: NOT_STATED },
    ],
    keyDifferences: [
      "WeTransfer is built around the act of sending a single file via a link.",
      "Docsora Transfer is built around the full lifecycle of a transfer — sending, tracking, extending, reactivating and managing every transfer from a centralized dashboard.",
      "Docsora records open, download and activity events for every transfer and surfaces them in a unified transfer history.",
      "Docsora lets senders extend expiry dates without re-uploading and reactivate expired transfers in one click.",
      "Docsora surfaces dashboard recommendations such as recipient reminders and expiry warnings to help senders take the next step.",
    ],
    whySwitch: [
      "Enjoy a simple, easy-to-use experience with no learning curve.",
      "Track every transfer's activity from a centralized dashboard.",
      "Extend transfer validity without having to re-upload files.",
      "Reactivate expired transfers instead of resending them.",
      "View complete download history for every recipient.",
      "Manage all sent and received transfers from one place.",
      "Receive dashboard recommendations and reminders to follow up on transfers - actions suggested to you.",
    ],
    whoChooseDocsora: [
      "Teams that want visibility, control and management over transfers after they have been sent.",
      "Agencies, consultancies and client-facing teams that need to track recipient activity and audit delivery.",
      "Operations, legal and finance teams that need a centralized transfer history and audit visibility.",
      "Freelancers and consumers who want to extend or reactivate transfers without resending the file.",
    ],
    whoChooseCompetitor: [
      "Users who only need to send a one-off large file via a familiar link experience.",
    ],
    faq: [
      {
        question: "Is Docsora a good alternative to WeTransfer?",
        answer:
          "Docsora and WeTransfer both allow users to send large files through secure shareable links. Docsora is designed for users who want greater visibility after files have been sent, including download tracking, recipient activity visibility, transfer history, expiry management and transfer reactivation.",
      },
      {
        question: "What makes Docsora different from WeTransfer?",
        answer:
          "Both Docsora and WeTransfer allow users to send large files and monitor transfer activity. Docsora focuses on helping users manage what happens after a file is sent. Instead of checking individual transfers, Docsora surfaces actions that require attention directly in the dashboard, such as recipients who have not downloaded files, transfers approaching expiry and transfers that may need extending. This helps individuals, consultants and teams move work forward without manually monitoring every transfer.",
      },
      {
        question: "How do I send large files online?",
        answer:
          "To send large files online, upload your files to Docsora Transfer using drag-and-drop or the upload button, then generate a secure transfer link or send the files directly by email. Recipients can access the files without creating an account. Docsora supports large file transfers directly from your browser and provides download tracking, transfer history, expiry controls and recipient activity visibility from a single dashboard.",
      },
      {
        question: "Can I see who downloaded my files?",
        answer:
          "Yes. Docsora records transfer activity and download events, allowing senders to see when recipients interact with shared files.",
      },
      {
        question: "Can I extend a transfer after sending it?",
        answer:
          "Yes. Docsora allows users to extend transfer expiry dates after files have been sent, helping recipients access files without requiring a new upload.",
      },
      {
        question: "Can I reactivate an expired transfer?",
        answer:
          "Yes. Expired transfers can be reactivated without re-uploading files, allowing users to restore access to existing transfers.",
      },
      {
        question: "What file types can I send with Docsora?",
        answer:
          "Docsora supports more than 100 file types including PDF, Word, Excel, PowerPoint, ZIP, PSD, AI, MP4, MOV, RAW photography files, CAD drawings, 3D models and project archives.",
      },
      {
        question: "Do recipients need a Docsora account?",
        answer:
          "No. Recipients can access files directly through secure transfer links without creating an account or installing software.",
      },
      {
        question: "Is Docsora secure for business file sharing?",
        answer:
          "Docsora uses encrypted file transfers and supports security controls such as expiry management, password protection and download visibility. The platform is designed for businesses, agencies and professional teams sharing sensitive files.",
      },
      {
        question: "Is Docsora ISO 27001 certified?",
        answer:
          "Yes. Docsora is ISO 27001 certified, demonstrating adherence to internationally recognized information security management standards.",
      },
      {
        question: "Does Docsora have SOC 2 compliance?",
        answer:
          "Docsora is SOC 2 Type I compliant and is currently progressing through SOC 2 Type II audit requirements.",
      },
      {
        question: "Is Docsora GDPR compliant?",
        answer:
          "Yes. Docsora is GDPR compliant and designed to support modern privacy and data protection requirements.",
      },
      {
        question: "What is the best WeTransfer alternative for businesses?",
        answer:
          "The best file-sharing solution for business teams often depends on what happens after a file is sent. Docsora Transfer combines large file sharing, recipient tracking, download notifications, transfer history, expiry management and centralized transfer visibility in one platform. As part of the wider Docsora document management ecosystem, businesses can also manage document storage, electronic signatures, document tracking and operational workflows from a single workspace. This makes Docsora a popular choice for agencies, consultancies, legal teams, finance departments and operations teams that require more than basic file transfer.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "transfernow-alternative",
    competitor: "TransferNow",
    cardTitle: "TransferNow Alternative",
    cardSummary:
      "A TransferNow alternative for businesses that want to consolidate file transfer, document storage, electronic signatures and document tracking inside one platform.",
    title: "TransferNow Alternative for Business Teams | Docsora",
    metaDescription:
      "Looking for a TransferNow alternative? Docsora unifies large file transfer, secure document storage, electronic signatures and document tracking in one platform built for modern teams.",
    h1: "The TransferNow Alternative Built for Modern Teams",
    tagline: "Move Beyond Standalone File Transfer.",
    heroSubtitle:
      "Send large files, track activity, manage documents, collect signatures and centralize document operations from one platform — a TransferNow alternative designed for secure file transfer and business file sharing.",
    description:
      "Most businesses run file transfer in one tool, document storage in another, electronic signatures in a third and document tracking somewhere else entirely. Docsora is a TransferNow alternative that brings these capabilities together. Alongside large file transfer, Docsora provides secure document storage, electronic signature software and document tracking software inside a single workspace — so teams can manage the full lifecycle of a document, not just the moment it is sent.",
    trustStrip:
      "ISO 27001 Certified · SOC 2 Type I · GDPR Compliant · 100+ File Types Supported",
    bestForDocsora:
      "Modern teams that want to consolidate file transfer, document storage, electronic signatures and document tracking inside one platform with compliance-focused controls.",
    bestForCompetitor:
      "Users whose primary need is a dedicated, standalone large file transfer service without broader document management functionality.",
    chooseDocsoraList: [
      "Unify file transfer, storage, signatures and document tracking in one platform",
      "Reduce software sprawl by consolidating standalone tools",
      "Maintain visibility across the full document lifecycle",
      "Manage business file sharing from a centralized workspace",
      "Operate inside a compliance-focused environment (ISO 27001, SOC 2 Type I, GDPR)",
      "Support secure document workflows from upload to signature",
      "Equip business teams with one platform instead of several",
    ],
    chooseCompetitorList: [
      "You primarily need standalone large file transfer",
      "You do not require broader document management functionality",
      "You are looking for a dedicated file transfer solution",
    ],
    features: [
      { feature: "Large File Transfer", docsora: "Supported", competitor: "Supported" },
      { feature: "File Transfer Tracking", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Transfer History", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Recipient Visibility", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Document Storage", docsora: "Built-in (Docsora Storage)", competitor: "Not available" },
      { feature: "Electronic Signatures", docsora: "Built-in (Docsora Sign)", competitor: "Not available" },
      { feature: "Document Tracking", docsora: "Built-in (Docsora Track)", competitor: "Not available" },
      { feature: "ISO 27001", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
      { feature: "GDPR Compliance", docsora: "Yes", competitor: "Yes" },
    ],
    securityFeatures: [
      { feature: "Encryption at rest", docsora: "AES-256", competitor: "Yes" },
      { feature: "Encryption in transit", docsora: "TLS", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
    ],
    keyDifferences: [
      "TransferNow and Docsora both support large file transfer through a secure transfer link.",
      "Docsora additionally sits within a broader document ecosystem that includes document storage, document tracking and electronic signatures.",
      "Docsora is positioned as a document operations platform rather than a standalone file transfer service.",
      "Docsora is designed to support secure document workflows from upload through to signature.",
      "Comparison information is based on publicly available information and may change over time.",
    ],
    whySwitch: [
      "Consolidate standalone file transfer, storage and signing tools into one platform.",
      "Improve operational visibility across the full document lifecycle.",
      "Manage business file sharing from a centralized document workspace.",
      "Reduce software sprawl across teams and departments.",
      "Maintain document management software, electronic signature software and file transfer software in one place.",
      "Operate inside ISO 27001, SOC 2 Type I and GDPR-aligned controls.",
    ],
    whoChooseDocsora: [
      "Teams that want file transfer and document management in one platform.",
      "Businesses that want storage, tracking and signatures together.",
      "Operations leaders who want centralized document operations.",
      "Compliance-focused organizations that need ISO 27001, SOC 2 Type I and GDPR-aligned controls.",
      "Teams that want to reduce the number of tools they rely on day to day.",
    ],
    whoChooseCompetitor: [
      "Users who primarily need a dedicated, standalone file transfer service.",
      "Individuals who do not require broader document management functionality.",
      "Teams that are not looking to consolidate file transfer with storage or signatures.",
    ],
    faq: [
      {
        question: "What is the best TransferNow alternative?",
        answer:
          "The best TransferNow alternative depends on whether you only need to send files or also want to manage documents after delivery. Docsora is a TransferNow alternative that combines large file transfer with document storage, electronic signatures and document tracking inside one platform, which suits business teams looking to consolidate their document tools.",
      },
      {
        question: "How does Docsora compare to TransferNow?",
        answer:
          "Both Docsora and TransferNow support large file transfer through a secure transfer link. Docsora additionally provides document storage, electronic signature software and document tracking inside the same workspace, positioning it as a document operations platform rather than a standalone file transfer tool.",
      },
      {
        question: "What is the difference between file transfer and document management?",
        answer:
          "File transfer software focuses on moving a file from sender to recipient. Document management software is broader and covers storing documents, organizing them, tracking activity, collecting electronic signatures and supporting secure document workflows across teams.",
      },
      {
        question: "Can businesses manage file transfer and signatures in one platform?",
        answer:
          "Yes. Docsora combines file transfer with electronic signatures so teams can send large files, request signatures and follow document activity from a single workspace instead of switching between standalone tools.",
      },
      {
        question: "What is the best file transfer software for business teams?",
        answer:
          "The best file transfer software for business teams is one that supports secure file transfer and integrates with the rest of the document workflow. Docsora is built for business file sharing and pairs file transfer with document storage, document tracking and electronic signatures inside one platform.",
      },
      {
        question: "How do businesses manage documents after delivery?",
        answer:
          "After delivery, businesses typically need to track activity, store the document, route it for signature and reference it later. Docsora supports these steps with document tracking, secure document storage and electronic signatures inside the same platform used to send the file.",
      },
      {
        question: "Why do companies consolidate document tools?",
        answer:
          "Companies consolidate document tools to reduce software sprawl, improve operational visibility, simplify vendor management and run secure document workflows from one place. A consolidated platform like Docsora lets teams manage business document management end to end.",
      },
      {
        question: "What is centralized document management?",
        answer:
          "Centralized document management means storing, tracking, signing and sharing business documents from a single platform rather than across disconnected tools. Docsora provides centralized document operations covering file transfer, storage, document tracking and electronic signatures.",
      },
      {
        question: "Is Docsora suitable for compliance-focused businesses?",
        answer:
          "Docsora is designed with compliance-focused businesses in mind and is ISO 27001 certified, SOC 2 Type I compliant and GDPR aligned, supporting secure document workflows for regulated teams.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "dropbox-transfer-alternative",
    competitor: "Dropbox Transfer",
    cardTitle: "Dropbox Transfer Alternative",
    cardSummary:
      "Compare Docsora and Dropbox Transfer for large file delivery, transfer lifecycle management, download tracking and compliance.",
    title: "Dropbox Transfer Alternative — Dropbox Transfer Alternative | Docsora",
    metaDescription:
      "Compare Docsora and Dropbox Transfer for large file transfer, recipient tracking, transfer expiry control, transfer history and compliance for business use.",
    h1: "Dropbox Transfer Alternative",
    heroSubtitle:
      "Compare two modern large-file transfer platforms and see how they differ in transfer management, tracking, expiry control and recipient visibility.",
    description:
      "Docsora Transfer and Dropbox Transfer both deliver files to recipients via a shareable link. Dropbox Transfer is a delivery feature inside the Dropbox ecosystem. Docsora Transfer is a standalone platform that is independent of any cloud storage account and focuses on the full transfer lifecycle — sending, tracking, extending, reactivating and managing every transfer. This guide compares the two on file delivery, recipient experience, tracking, expiry control, transfer history, security and compliance.",
    bestForDocsora:
      "Teams that want a standalone transfer platform with full lifecycle management — tracking, expiry extension, reactivation and centralized transfer history — without requiring a Dropbox account.",
    bestForCompetitor:
      "Existing Dropbox customers who want to use Dropbox Transfer as an extension of their existing Dropbox storage workflow.",
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "Up to 250 GB on top plans" },
      { feature: "No recipient account required", docsora: "Yes", competitor: "Yes" },
      { feature: "Supports 100+ file types", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Open tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Download notifications", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Transfer history", docsora: "Built-in", competitor: "Built-in" },
      { feature: "View all sent transfers", docsora: "Built-in", competitor: "Built-in" },
      { feature: "View all received transfers", docsora: "Built-in", competitor: "Not a core feature" },
      { feature: "Extend expiry after sending", docsora: "Built-in", competitor: "Limited" },
      { feature: "Reactivate expired transfers", docsora: "Built-in", competitor: "Not publicly stated" },
      { feature: "Dashboard recommendations", docsora: "Built-in", competitor: "Not available" },
      { feature: "Transfer management center", docsora: "Built-in", competitor: "Within Dropbox UI" },
      { feature: "Custom transfer messages", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Recipient reminders", docsora: "Built-in", competitor: "Limited" },
      { feature: "File storage integration", docsora: "Built-in", competitor: "Built-in (Dropbox)" },
      { feature: "Workspaces for teams", docsora: "Built-in", competitor: "Built-in (Dropbox teams)" },
    ],
    securityFeatures: [
      { feature: "AES-256 encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "TLS encryption in transit", docsora: "Yes", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes (paid plans)" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Yes", competitor: "Yes" },
      { feature: "Activity visibility", docsora: "Yes", competitor: "Limited" },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: "Yes" },
    ],
    keyDifferences: [
      "Dropbox Transfer is a delivery feature within the broader Dropbox cloud storage product.",
      "Docsora Transfer is a standalone large-file transfer platform that does not require a Dropbox account.",
      "Docsora Transfer is structured around the full transfer lifecycle — including expiry extension and reactivation of expired transfers without re-uploading.",
      "Docsora surfaces dashboard recommendations such as recipient reminders and expiry warnings to help senders take the next step.",
      "Dropbox Transfer is most natural for teams already standardised on Dropbox; Docsora Transfer is independent of any underlying cloud storage stack.",
    ],
    whySwitch: [
      "Use a standalone transfer platform without needing a Dropbox account.",
      "Manage the full transfer lifecycle from a centralized dashboard.",
      "Extend transfer validity without re-uploading files.",
      "Reactivate expired transfers in one click.",
      "View all sent and received transfers from one place.",
      "Receive dashboard recommendations and reminders for inactive transfers.",
    ],
    whoChooseDocsora: [
      "Teams that want a standalone transfer platform that is independent of Dropbox.",
      "Agencies and client-facing teams that need expiry extension, reactivation and recipient reminders.",
      "Operations and legal teams that need a unified transfer history with audit visibility.",
    ],
    whoChooseCompetitor: [
      "Organisations already standardised on Dropbox who want transfers managed inside their existing Dropbox account.",
      "Teams whose transfer workflow is tightly coupled to their Dropbox storage.",
    ],
    faq: [
      {
        question: "Is Docsora Transfer a Dropbox Transfer alternative?",
        answer:
          "Yes. Docsora Transfer is a standalone large-file transfer platform that supports the same core use case as Dropbox Transfer — sending files via a link with no recipient account required — and adds expiry extension, reactivation and centralized transfer management.",
      },
      {
        question: "Do I need a Dropbox account to use Docsora Transfer?",
        answer:
          "No. Docsora Transfer is independent of Dropbox and any other cloud storage product. Senders and recipients use Docsora directly in the browser.",
      },
      {
        question: "Can I see who downloaded my files?",
        answer:
          "Yes. Docsora records open and download events for every transfer and shows the activity in the transfer history.",
      },
      {
        question: "Can I extend a transfer after sending it?",
        answer:
          "Yes. Senders can extend the validity of a transfer from the management dashboard without re-uploading the files.",
      },
      {
        question: "Can I reactivate an expired transfer?",
        answer:
          "Yes. Expired transfers can be reactivated from the transfer history without resending or re-uploading the original files.",
      },
      {
        question: "Is Docsora ISO 27001 certified?",
        answer:
          "Yes. Docsora is ISO 27001 certified and aligned with industry security frameworks for handling business documents and large file transfers.",
      },
      {
        question: "Does Docsora have SOC 2?",
        answer:
          "Docsora is SOC 2 Type I and is currently in audit for SOC 2 Type II.",
      },
      {
        question: "What compliance certifications does Docsora hold?",
        answer:
          "Docsora is GDPR compliant, ISO 27001 certified and SOC 2 Type I, with SOC 2 Type II audit in progress, and supports regional data hosting options.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
  {
    slug: "smash-alternative",
    competitor: "Smash",
    cardTitle: "Smash Alternative",
    cardSummary:
      "Compare Docsora and Smash across file transfer, transfer visibility, expiry controls, compliance and operational workflows.",
    title: "Smash Alternative — Smash Alternative for Large File Transfer | Docsora",
    metaDescription:
      "Compare Docsora and Smash for large file transfer, recipient tracking, transfer expiry control, transfer history and compliance for business use.",
    h1: "Smash Alternative",
    heroSubtitle:
      "Compare two modern large-file transfer platforms and see how they differ in transfer management, tracking, expiry control and recipient visibility.",
    description:
      "Docsora Transfer and Smash both let users send large files in the browser. Smash is built around the simplicity of sending. Docsora Transfer is built around the full lifecycle of a transfer — sending, tracking, extending, reactivating and managing every transfer from one place. This guide compares the two on file delivery, recipient experience, tracking, expiry control, transfer history, security and compliance.",
    bestForDocsora:
      "Businesses, agencies, freelancers and individuals that want lifecycle management of every transfer — including tracking, expiry extension, reactivation and centralized transfer history.",
    bestForCompetitor:
      "Users who want a simple, frictionless way to send large files with minimal setup.",
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "No file size limit" },
      { feature: "No recipient account required", docsora: "Yes", competitor: "Yes" },
      { feature: "Supports 100+ file types", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Open tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Download notifications", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Transfer history", docsora: "Built-in", competitor: "Limited" },
      { feature: "View all sent transfers", docsora: "Built-in", competitor: "Limited (paid plans)" },
      { feature: "View all received transfers", docsora: "Built-in", competitor: "Not a core feature" },
      { feature: "Extend expiry after sending", docsora: "Built-in", competitor: "Limited" },
      { feature: "Reactivate expired transfers", docsora: "Built-in", competitor: "Not publicly stated" },
      { feature: "Dashboard recommendations", docsora: "Built-in", competitor: "Not available" },
      { feature: "Transfer management center", docsora: "Built-in", competitor: "Limited" },
      { feature: "Custom transfer messages", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Recipient reminders", docsora: "Built-in", competitor: "Limited" },
      { feature: "File storage integration", docsora: "Built-in", competitor: "Limited" },
      { feature: "Workspaces for teams", docsora: "Built-in", competitor: "Limited" },
    ],
    securityFeatures: [
      { feature: "AES-256 encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "TLS encryption in transit", docsora: "Yes", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Yes", competitor: "Yes" },
      { feature: "Activity visibility", docsora: "Yes", competitor: "Limited" },
      { feature: "Audit visibility", docsora: "Yes", competitor: NOT_STATED },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: NOT_STATED },
    ],
    keyDifferences: [
      "Smash focuses on the simplicity of the upload-and-send experience.",
      "Docsora Transfer focuses on the full transfer lifecycle — sending, tracking, extending, reactivating and managing transfers from one place.",
      "Docsora records open and download events for every transfer and surfaces them in a unified transfer history.",
      "Docsora lets senders extend expiry dates and reactivate expired transfers without re-uploading the files.",
      "Docsora surfaces dashboard recommendations such as recipient reminders and expiry warnings.",
    ],
    whySwitch: [
      "Track every transfer's activity from a centralized dashboard.",
      "Extend transfer validity without re-uploading files.",
      "Reactivate expired transfers instead of resending them.",
      "View complete download history for every recipient.",
      "Manage all sent and received transfers from one place.",
      "Receive dashboard recommendations and reminders for inactive transfers.",
    ],
    whoChooseDocsora: [
      "Teams that want visibility, control and management of transfers after they have been sent.",
      "Agencies and consultancies that need to track recipient activity and audit delivery.",
      "Businesses that need ISO 27001 and SOC 2 Type I controls around their file delivery.",
      "Users who want to extend or reactivate transfers instead of resending files.",
    ],
    whoChooseCompetitor: [
      "Users who want the simplest possible upload-and-link experience for one-off sends.",
      "Creative users who occasionally need to send a single large file without managing it afterwards.",
    ],
    faq: [
      {
        question: "Is Docsora Transfer a Smash alternative?",
        answer:
          "Yes. Docsora Transfer supports the same core use case as Smash — sending large files via a link with no recipient account required — and adds transfer tracking, expiry extension, reactivation and a centralized transfer management dashboard.",
      },
      {
        question: "How does Docsora compare to Smash for business use?",
        answer:
          "Smash is optimised for simple sending. Docsora Transfer is optimised for managing the full lifecycle of a transfer, with download tracking, activity visibility, expiry extension, reactivation, recipient reminders and audit visibility — backed by ISO 27001 and SOC 2 Type I controls.",
      },
      {
        question: "Can I see who downloaded my files?",
        answer:
          "Yes. Docsora records open and download events for every transfer and shows the activity in the transfer history.",
      },
      {
        question: "Can I extend a transfer after sending it?",
        answer:
          "Yes. Senders can extend the validity of a transfer from the management dashboard without re-uploading the files.",
      },
      {
        question: "Can I reactivate an expired transfer?",
        answer:
          "Yes. Expired transfers can be reactivated from the transfer history without resending or re-uploading the original files.",
      },
      {
        question: "Is Docsora ISO 27001 certified?",
        answer:
          "Yes. Docsora is ISO 27001 certified and aligned with industry security frameworks for handling business documents and large file transfers.",
      },
      {
        question: "Does Docsora have SOC 2?",
        answer:
          "Docsora is SOC 2 Type I and is currently in audit for SOC 2 Type II.",
      },
      {
        question: "What compliance certifications does Docsora hold?",
        answer:
          "Docsora is GDPR compliant, ISO 27001 certified and SOC 2 Type I, with SOC 2 Type II audit in progress, and supports regional data hosting options.",
      },
    ],
    lastUpdated: LAST_UPDATED,
  },
];

export const transferCompareVariantBySlug: Record<string, TransferCompareVariantConfig> =
  Object.fromEntries(transferCompareVariants.map((v) => [v.slug, v]));

// Shared content used by every transfer comparison page.

export const docsoraTransferBenefits = [
  "Send transfers in seconds",
  "No account required for recipients or senders",
  "Supports 100+ file types",
  "View every transfer sent and received",
  "Track opens and downloads",
  "Download notifications",
  "Extend expiry dates without re-uploading",
  "Reactivate expired transfers",
  "Access transfer history anytime",
  "Manage transfers from Track",
  "Dashboard recommendations and reminders",
  "Custom transfer messages",
  "Centralized transfer management",
  "File transfer integrated into a broader document platform",
];

export const docsoraTransferPlans = [
  {
    name: "Free",
    storage: "2 GB per month",
    validity: "3-day validity",
    description: "For occasional personal transfers.",
  },
  {
    name: "Pro",
    storage: "250 GB per month",
    validity: "30-day validity",
    description: "For freelancers and professionals.",
  },
  {
    name: "Teams",
    storage: "500 GB per user per month",
    validity: "365-day validity",
    description: "For agencies and growing teams.",
  },
  {
    name: "Enterprise",
    storage: "Custom limits",
    validity: "Custom validity",
    description: "For organisations with bespoke needs.",
  },
];

export const docsoraTransferDifferentiators = [
  {
    title: "Visibility after sending",
    body: "Many transfer tools focus on sending files. Docsora focuses on what happens after sending. Users can see transfer activity, recipient engagement, download status and transfer history from a centralized dashboard.",
  },
  {
    title: "Transfer lifecycle management",
    body: "Instead of re-uploading files, users can extend expiry dates, reactivate transfers and manage delivery from a single location.",
  },
  {
    title: "Compliance and governance",
    body: "Docsora combines transfer functionality with security, compliance and governance controls that help businesses maintain visibility over document delivery.",
  },
];