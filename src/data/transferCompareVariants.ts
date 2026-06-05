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
      "Compare Docsora and TransferNow side-by-side for large file transfer, recipient tracking, transfer history, expiry management and centralized document operations.",
    title: "TransferNow Alternative for Secure Large File Transfer | Docsora",
    metaDescription:
      "Looking for a TransferNow alternative? Docsora combines large file transfer with download tracking, recipient activity, transfer history, expiry control and ISO 27001 security.",
    h1: "A Business-Ready TransferNow Alternative",
    tagline: "Send Large Files. Manage Every Transfer After.",
    heroSubtitle:
      "Send large files securely, track downloads, monitor recipient activity, extend expiring transfers and manage every send from one centralized dashboard — a TransferNow alternative built for business teams.",
    description:
      "Docsora and TransferNow both let you send large files online through a secure transfer link without asking recipients to create an account. The difference shows up after you click send. TransferNow is built around the upload-and-share moment. Docsora is a file transfer and document operations platform that gives senders visibility, control and tooling for the entire lifecycle of a transfer — covering transfer history, download tracking, recipient activity, expiry management, transfer reactivation and centralized transfer management across teams.",
    trustStrip:
      "ISO 27001 Certified · SOC 2 Type I · SOC 2 Type II Audit In Progress · GDPR Compliant · 100+ File Types",
    bestForDocsora:
      "Agencies, consultancies, legal teams, finance departments and operations teams that need secure file transfer, recipient activity visibility, transfer history and a centralized workspace that pairs Transfer with Track, Storage and Sign.",
    bestForCompetitor:
      "Individuals and small teams that want a straightforward European service for occasional one-off large file delivery without dedicated transfer management.",
    chooseDocsoraList: [
      "Download tracking and recipient activity visibility",
      "Transfer history across every sent and received transfer",
      "Expiry date management and one-click reactivation",
      "Priority Actions dashboard for follow-ups and reminders",
      "Centralized transfer management for business teams",
      "Connected Transfer, Track, Storage and Sign workspace",
      "ISO 27001, SOC 2 Type I and GDPR compliant",
    ],
    chooseCompetitorList: [
      "A familiar European file transfer experience",
      "One-off large file sending via a public link",
      "Quick sharing without lifecycle management",
      "Standalone use without a wider document ecosystem",
    ],
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "Up to 250 GB on top plans" },
      { feature: "No recipient account required", docsora: "Yes", competitor: "Yes" },
      { feature: "100+ supported file types", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer via secure link", docsora: "Yes", competitor: "Yes" },
      { feature: "Send transfers by email", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Recipient activity visibility", docsora: "Built-in", competitor: "Limited" },
      { feature: "Transfer history across sent and received", docsora: "Built-in", competitor: "Limited" },
      { feature: "Centralized transfer management", docsora: "Built-in", competitor: "Limited" },
      { feature: "Extend expiry without re-uploading", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Reactivate expired transfers", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Priority Actions dashboard", docsora: "Built-in", competitor: "Not available" },
      { feature: "Recipient reminders", docsora: "Built-in", competitor: NOT_STATED },
      { feature: "Custom transfer messages", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Connected document storage", docsora: "Built-in (Docsora Storage)", competitor: "Not available" },
      { feature: "Connected electronic signatures", docsora: "Built-in (Docsora Sign)", competitor: "Not available" },
      { feature: "Document tracking workspace", docsora: "Built-in (Docsora Track)", competitor: "Not available" },
    ],
    securityFeatures: [
      { feature: "Encryption at rest", docsora: "AES-256", competitor: "Yes" },
      { feature: "Encryption in transit", docsora: "TLS", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Recipient access management", docsora: "Yes", competitor: "Limited" },
      { feature: "Transfer activity visibility", docsora: "Yes", competitor: "Limited" },
      { feature: "Audit-ready transfer history", docsora: "Yes", competitor: NOT_STATED },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: NOT_STATED },
    ],
    keyDifferences: [
      "TransferNow centers on the moment of sending a large file via a transfer link or email.",
      "Docsora is positioned as a file transfer and document operations platform — sending is one step inside a wider lifecycle of tracking, managing and following up.",
      "Docsora maintains transfer history, download tracking and recipient activity visibility for every transfer in one place.",
      "Docsora supports expiry date management and lets senders reactivate expired transfers without re-uploading source files.",
      "Docsora pairs Transfer with Track, Storage and Sign, so file sharing for teams sits inside a single document operations workspace rather than a standalone tool.",
    ],
    whySwitch: [
      "Replace TransferNow with a platform built for business file sharing, not just file delivery.",
      "Track who opened and downloaded each transfer through recipient activity visibility.",
      "Extend the validity of an active transfer without re-uploading the original files.",
      "Reactivate an expired transfer in one click instead of starting a new send.",
      "Surface follow-ups in the Priority Actions dashboard and send recipient reminders.",
      "Manage every sent and received transfer from a centralized transfer management view.",
      "Move beyond standalone transfers and connect file delivery with Storage, Sign and Track.",
    ],
    whoChooseDocsora: [
      "Agencies and consultancies sending client deliverables that need transfer tracking and recipient activity visibility.",
      "Legal and finance teams that require secure file transfer with audit-ready transfer history and ISO 27001 controls.",
      "Operations teams that want centralized transfer management instead of monitoring individual emails.",
      "Teams that combine large file transfer with document storage, electronic signatures and document tracking in one workspace.",
      "Businesses that need to extend or reactivate expiring transfers rather than re-uploading and resending files.",
    ],
    whoChooseCompetitor: [
      "Individuals who specifically want a European-hosted service for occasional large file delivery.",
      "Users whose main need is a simple upload-and-share link without lifecycle management.",
      "Teams that do not require a connected storage, signing or document tracking workspace.",
    ],
    faq: [
      {
        question: "Is Docsora a good TransferNow alternative?",
        answer:
          "Docsora and TransferNow both allow users to send large files through secure transfer links. Docsora is designed for users who want greater visibility and control after files have been sent, including transfer history, recipient activity visibility, expiry management, transfer reactivation and centralized transfer management from a single dashboard.",
      },
      {
        question: "What makes Docsora different from TransferNow?",
        answer:
          "The primary difference is Docsora's focus on transfer lifecycle management and broader document operations. In addition to sending files, users can manage transfer activity, monitor recipient engagement, extend transfer validity, reactivate expired transfers and access transfer records from one centralized workspace.",
      },
      {
        question: "Which platform is better for business file sharing?",
        answer:
          "Businesses often need more than file delivery. Docsora combines large file transfer with transfer tracking, recipient visibility, transfer history, document storage, electronic signatures and workflow capabilities, making it suitable for agencies, consultancies, legal teams, finance teams and operational departments.",
      },
      {
        question: "How do I send large files online?",
        answer:
          "Upload your files using Docsora Transfer, generate a secure transfer link or share directly by email, and send the files to recipients. Recipients can access files without creating an account, while senders can monitor transfer activity from their dashboard.",
      },
      {
        question: "Can I track who opened or downloaded my files?",
        answer:
          "Yes. Docsora provides activity visibility for transfers, helping users understand recipient engagement and monitor file delivery after sending.",
      },
      {
        question: "Can I extend an active transfer after sending it?",
        answer:
          "Yes. Docsora allows users to extend transfer validity without requiring files to be uploaded again.",
      },
      {
        question: "Can I reactivate an expired transfer?",
        answer:
          "Yes. Expired transfers can be reactivated directly from the transfer management area without creating a new transfer.",
      },
      {
        question: "What file types can I send with Docsora?",
        answer:
          "Docsora supports more than 100 file types including PDF, DOCX, XLSX, PPTX, ZIP, PSD, AI, MP4, MOV, RAW photography formats, CAD files, 3D models and project archives.",
      },
      {
        question: "Do recipients need a Docsora account?",
        answer:
          "No. Recipients can access shared files directly through secure transfer links without creating an account.",
      },
      {
        question: "Is Docsora secure for business file transfers?",
        answer:
          "Docsora uses encryption and security controls designed for professional file delivery, including transfer expiry controls, recipient access management and transfer activity visibility.",
      },
      {
        question: "Is Docsora ISO 27001 certified?",
        answer:
          "Yes. Docsora is ISO 27001 certified, demonstrating adherence to internationally recognized information security management standards.",
      },
      {
        question: "Does Docsora have SOC 2 compliance?",
        answer:
          "Yes. Docsora is SOC 2 Type I compliant and is currently progressing through SOC 2 Type II audit requirements.",
      },
      {
        question: "Is Docsora GDPR compliant?",
        answer:
          "Yes. Docsora is designed to support GDPR compliance and modern data protection requirements.",
      },
      {
        question: "What is the best TransferNow alternative for teams?",
        answer:
          "Teams often require more than file transfer alone. Docsora combines large file sharing, transfer visibility, recipient activity monitoring, document storage, electronic signatures and workflow capabilities within a single platform, helping teams manage documents before and after delivery.",
      },
      {
        question: "Why do businesses choose Docsora over traditional file transfer tools?",
        answer:
          "Many file transfer tools focus primarily on sending files. Docsora helps businesses manage the entire transfer lifecycle by providing visibility, transfer history, recipient activity monitoring, transfer controls and integrations with broader document management processes.",
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