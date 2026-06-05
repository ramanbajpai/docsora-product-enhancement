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
      "Looking for a Smash alternative?\n\nDocsora Transfer helps individuals, freelancers, agencies and businesses send large files online while maintaining visibility after delivery. Track downloads, manage transfer expiry dates, reactivate expired transfers and view transfer activity from one centralized dashboard.\n\nThis guide compares Docsora and Smash across file transfer, recipient visibility, transfer management, security controls, compliance and business use cases.",
    bestForDocsora:
      "Businesses, agencies, freelancers and individuals who want fast large file transfer with download tracking, recipient visibility, transfer history, expiry management, transfer reactivation and centralized transfer control from a single dashboard.",
    bestForCompetitor:
      "Users looking for a dedicated large file transfer platform focused on sharing files through transfer links.",
    chooseDocsoraList: [
      "Track opens and downloads",
      "View transfer activity",
      "Extend expiry dates",
      "Reactivate expired transfers",
      "Manage all transfers from one place",
      "Receive transfer reminders and recommendations",
      "Maintain visibility after clicking send",
    ],
    chooseCompetitorList: [
      "Large file sharing",
      "Browser-based file transfer",
      "Shareable transfer links",
      "File delivery for individuals and teams",
    ],
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
    ],
    securityFeatures: [
      { feature: "AES-256 encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "TLS encryption in transit", docsora: "Yes", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Yes", competitor: "Yes" },
      { feature: "Activity visibility", docsora: "Yes", competitor: "Limited" },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: NOT_STATED },
    ],
    keyDifferences: [
      "Smash offers a clean upload-and-send experience with minimal setup.",
      "Docsora Transfer offers the same ease of use with added visibility — tracking, extending, reactivating and managing transfers from one place.",
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
      "Users who want a clean upload experience for one-off sends.",
      "Creative users who occasionally need to send a single large file without managing it afterwards.",
    ],
    faq: [
      {
        question: "Is Docsora Transfer a Smash alternative?",
        answer:
          "Yes. Docsora Transfer is a modern Smash alternative for individuals, freelancers, agencies and businesses that need more visibility after sending files. Users can send large files through secure shareable links, track downloads, monitor recipient activity, extend expiry dates, reactivate expired transfers and manage transfers from a centralized dashboard.",
      },
      {
        question: "How does Docsora compare to Smash?",
        answer:
          "Both Docsora and Smash support large file sharing through browser-based transfer links. Docsora additionally provides transfer tracking, recipient visibility, transfer history, expiry controls and transfer management features designed for individuals, freelancers, agencies and business teams that want visibility after a file has been sent.",
      },
      {
        question: "Can I track who downloaded my files?",
        answer:
          "Yes. Docsora Transfer records file opens and downloads, helping senders understand recipient activity after a transfer has been shared. Activity is available through the Track section and transfer management dashboard.",
      },
      {
        question: "Can I extend a transfer after sending it?",
        answer:
          "Yes. Docsora allows users to extend transfer expiry dates after a file has been sent, helping keep files accessible without creating a new transfer.",
      },
      {
        question: "Can I reactivate an expired transfer?",
        answer:
          "Yes. Docsora allows eligible transfers to be reactivated, helping users restore access without re-uploading files or creating a new transfer link.",
      },
      {
        question: "Do recipients need a Docsora account?",
        answer:
          "No. Recipients can access shared files directly through the transfer link. Creating a Docsora account is only required for users who want to manage transfers, view activity and access additional transfer controls.",
      },
      {
        question: "What file types does Docsora support?",
        answer:
          "Docsora supports more than 100 file types, including documents, PDFs, spreadsheets, presentations, ZIP archives, images, videos, design files, CAD files and development files.",
      },
      {
        question: "Is Docsora secure for large file sharing?",
        answer:
          "Docsora uses encryption in transit and at rest, password-protected transfers, expiry controls and activity visibility features to help organizations share files securely online.",
      },
      {
        question: "Can businesses use Docsora for client file delivery?",
        answer:
          "Yes. Agencies, consultancies, legal teams, finance departments, creative studios and operational teams use large file transfer platforms to share files with clients, partners and stakeholders. Docsora combines file delivery with tracking, transfer visibility and centralized management.",
      },
      {
        question: "What makes Docsora different from Smash?",
        answer:
          "Both platforms support large file sharing. Docsora focuses on helping users maintain visibility after sending a file through features such as download tracking, recipient activity visibility, transfer history, expiry management, transfer reactivation and centralized transfer controls.",
      },
      {
        question: "Can I send large video files with Docsora?",
        answer:
          "Yes. Docsora supports large video file transfers, including production assets, creative exports, RAW footage and other high-resolution media files.",
      },
      {
        question: "What is the best Smash alternative for businesses?",
        answer:
          "Businesses often require more than basic file delivery. Docsora combines large file transfer with download tracking, recipient visibility, transfer management, compliance-focused controls and centralized oversight, making it suitable for agencies, consultancies, operations teams, legal teams and finance departments.",
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