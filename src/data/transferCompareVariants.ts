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
      { feature: "Regional data hosting options", docsora: "Yes", competitor: "Yes (EU)" },
      { feature: "Team workspace controls", docsora: "Yes", competitor: "Limited" },
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
      "Teams that do not need visibility, tracking or lifecycle management after a transfer has been sent.",
    ],
    faq: [
      {
        question: "Is Docsora Transfer a WeTransfer alternative?",
        answer:
          "Yes. Docsora Transfer supports the same core use case as WeTransfer — sending large files in the browser via a shareable link with no recipient account required — and adds transfer tracking, expiry extension, reactivation and a centralized transfer management dashboard.",
      },
      {
        question: "How does Docsora compare to WeTransfer for business use?",
        answer:
          "WeTransfer is optimised for sending. Docsora Transfer is optimised for managing the full transfer lifecycle, with download tracking, activity visibility, expiry extension, reactivation, recipient reminders and audit visibility — alongside ISO 27001 and SOC 2 Type I controls.",
      },
      {
        question: "Can I see who downloaded my files?",
        answer:
          "Yes. Docsora records open and download events for every transfer and shows the activity in the transfer history so senders can see exactly who has downloaded their files.",
      },
      {
        question: "Can I extend a transfer after sending it?",
        answer:
          "Yes. Senders can extend the validity of a transfer from the transfer management dashboard without having to re-upload the files.",
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
    slug: "transfernow-alternative",
    competitor: "TransferNow",
    cardTitle: "TransferNow Alternative",
    cardSummary:
      "See how Docsora compares to TransferNow for file sharing, recipient tracking, transfer management and business workflows.",
    title: "TransferNow Alternative — TransferNow Alternative for Large File Transfer | Docsora",
    metaDescription:
      "Compare Docsora and TransferNow for large file transfer, recipient tracking, transfer expiry control, transfer history and compliance for business use.",
    h1: "TransferNow Alternative",
    heroSubtitle:
      "Compare two modern large-file transfer platforms and see how they differ in transfer management, tracking, expiry control and recipient visibility.",
    description:
      "Docsora Transfer and TransferNow both allow users to send large files via a shareable link in the browser. They differ in what happens after the transfer is sent. TransferNow focuses on the upload-and-send experience. Docsora Transfer focuses on the full lifecycle of a transfer — tracking, extending, reactivating and managing every transfer from a centralized dashboard. This guide compares the two on file delivery, recipient experience, tracking, expiry control, transfer history, security and compliance.",
    bestForDocsora:
      "Businesses, agencies and individuals that want visibility, control and management over every transfer — including download tracking, expiry extension, reactivation and a centralized transfer history.",
    bestForCompetitor:
      "Users who want a straightforward European file transfer service for occasional large file delivery.",
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "Up to 250 GB on top plans" },
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
      { feature: "Regional data hosting options", docsora: "Yes", competitor: "EU hosted" },
      { feature: "Team workspace controls", docsora: "Yes", competitor: "Limited" },
    ],
    keyDifferences: [
      "TransferNow is focused on the upload-and-send experience for large files.",
      "Docsora Transfer is focused on the full transfer lifecycle — sending, tracking, extending, reactivating and managing transfers from a single dashboard.",
      "Docsora records open and download events for every transfer and surfaces them in a unified transfer history.",
      "Docsora lets senders extend expiry dates and reactivate expired transfers without re-uploading the files.",
      "Docsora surfaces dashboard recommendations such as recipient reminders and expiry warnings.",
    ],
    whySwitch: [
      "Track every transfer's activity from a centralized dashboard.",
      "Extend transfer validity without re-uploading files.",
      "Reactivate expired transfers in one click.",
      "View complete download history for every recipient.",
      "Manage all sent and received transfers from one place.",
      "Receive dashboard recommendations and reminders to follow up on transfers - actions suggested to you.",
    ],
    whoChooseDocsora: [
      "Teams that want visibility, control and management of transfers after they have been sent.",
      "Agencies and consultancies that need to track recipient activity and audit delivery.",
      "Businesses that need ISO 27001 and SOC 2 Type I controls around their file delivery.",
      "Users who want to extend or reactivate transfers instead of resending files.",
    ],
    whoChooseCompetitor: [
      "Users who specifically want a European file transfer service for occasional one-off sends.",
      "Teams whose primary requirement is a simple upload-and-link experience.",
    ],
    faq: [
      {
        question: "Is Docsora Transfer a TransferNow alternative?",
        answer:
          "Yes. Docsora Transfer supports the same core use case as TransferNow — sending large files via a link with no recipient account required — and adds transfer tracking, expiry extension, reactivation and centralized transfer management.",
      },
      {
        question: "How does Docsora compare to TransferNow?",
        answer:
          "TransferNow is focused on the upload-and-send step. Docsora Transfer is focused on the full lifecycle, including tracking, expiry extension, reactivation, recipient reminders and audit visibility — backed by ISO 27001 and SOC 2 Type I controls.",
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
      { feature: "Audit visibility", docsora: "Yes", competitor: "Yes (Dropbox Business)" },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: "Yes" },
      { feature: "Regional data hosting options", docsora: "Yes", competitor: "Yes (Dropbox Business)" },
      { feature: "Team workspace controls", docsora: "Yes", competitor: "Yes" },
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
      { feature: "Regional data hosting options", docsora: "Yes", competitor: "EU hosted" },
      { feature: "Team workspace controls", docsora: "Yes", competitor: "Limited" },
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
  {
    slug: "masv-alternative",
    competitor: "MASV",
    cardTitle: "MASV Alternative",
    cardSummary:
      "Compare Docsora and MASV for large media delivery, tracking, compliance, transfer management and business collaboration.",
    title: "MASV Alternative — MASV Alternative for Business File Transfer | Docsora",
    metaDescription:
      "Compare Docsora and MASV for large file transfer, recipient tracking, transfer expiry control, transfer history and compliance for business file delivery.",
    h1: "MASV Alternative",
    heroSubtitle:
      "Compare two modern large-file transfer platforms and see how they differ in transfer management, tracking, expiry control and recipient visibility.",
    description:
      "Docsora Transfer and MASV are both built for sending large files, but they target different categories of work. MASV is purpose-built for high-volume media and broadcast workflows with pay-per-GB economics. Docsora Transfer is built for business file delivery and focuses on the full transfer lifecycle — sending, tracking, extending, reactivating and managing every transfer from one place, on a predictable subscription. This guide compares the two on file delivery, recipient experience, tracking, expiry control, transfer history, security and compliance.",
    bestForDocsora:
      "Businesses, agencies, freelancers and teams that need lifecycle management of every transfer — tracking, expiry extension, reactivation and centralized transfer history — on a predictable subscription rather than pay-per-GB billing.",
    bestForCompetitor:
      "Media, video production, post-production and broadcast teams moving very large production files where transfer speed at scale and per-GB economics are the main consideration.",
    features: [
      { feature: "Large file transfers", docsora: "Supported (up to 500 GB on Teams)", competitor: "Optimised for very large media files" },
      { feature: "No recipient account required", docsora: "Yes", competitor: "Yes" },
      { feature: "Supports 100+ file types", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Open tracking", docsora: "Built-in", competitor: "Limited" },
      { feature: "Download tracking", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Download notifications", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Transfer history", docsora: "Built-in", competitor: "Built-in" },
      { feature: "View all sent transfers", docsora: "Built-in", competitor: "Built-in" },
      { feature: "View all received transfers", docsora: "Built-in", competitor: "Via portals" },
      { feature: "Extend expiry after sending", docsora: "Built-in", competitor: "Limited" },
      { feature: "Reactivate expired transfers", docsora: "Built-in", competitor: "Not publicly stated" },
      { feature: "Dashboard recommendations", docsora: "Built-in", competitor: "Not available" },
      { feature: "Transfer management center", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Custom transfer messages", docsora: "Built-in", competitor: "Built-in" },
      { feature: "Recipient reminders", docsora: "Built-in", competitor: "Limited" },
      { feature: "File storage integration", docsora: "Built-in", competitor: "Cloud connectors" },
      { feature: "Workspaces for teams", docsora: "Built-in", competitor: "Built-in" },
    ],
    securityFeatures: [
      { feature: "AES-256 encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "TLS encryption in transit", docsora: "Yes", competitor: "Yes" },
      { feature: "Password protected transfers", docsora: "Yes", competitor: "Yes" },
      { feature: "Transfer expiry controls", docsora: "Yes", competitor: "Yes" },
      { feature: "Download tracking", docsora: "Yes", competitor: "Yes" },
      { feature: "Activity visibility", docsora: "Yes", competitor: "Yes" },
      { feature: "Audit visibility", docsora: "Yes", competitor: NOT_STATED },
      { feature: "GDPR compliance", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 certified", docsora: "Yes", competitor: NOT_STATED },
      { feature: "SOC 2 Type I", docsora: "Yes", competitor: "Yes" },
      { feature: "SOC 2 Type II", docsora: "Audit in progress", competitor: "Yes" },
      { feature: "Regional data hosting options", docsora: "Yes", competitor: "Yes" },
      { feature: "Team workspace controls", docsora: "Yes", competitor: "Yes" },
    ],
    keyDifferences: [
      "MASV is built around high-volume media transfers with pay-per-GB economics.",
      "Docsora Transfer is built around business file delivery on a predictable subscription model.",
      "Docsora focuses on full transfer lifecycle management — including expiry extension and reactivation of expired transfers without re-uploading.",
      "MASV is most often used by film, video and broadcast teams; Docsora Transfer is used by businesses, agencies and operational teams.",
      "Docsora surfaces dashboard recommendations such as recipient reminders and expiry warnings.",
    ],
    whySwitch: [
      "Use a predictable subscription instead of per-GB billing for business transfers.",
      "Extend transfer validity without re-uploading files.",
      "Reactivate expired transfers in one click.",
      "Manage all sent and received transfers from one place.",
      "Receive dashboard recommendations and reminders for inactive transfers.",
      "Track every transfer's activity from a centralized dashboard.",
    ],
    whoChooseDocsora: [
      "Teams whose primary delivery is business documents, design files and client work rather than raw media.",
      "Businesses that want predictable subscription pricing rather than per-GB billing.",
      "Operations, legal and finance teams that need a centralized transfer history with audit visibility.",
      "Users who want to extend or reactivate transfers instead of resending files.",
    ],
    whoChooseCompetitor: [
      "Media, film, video and broadcast teams moving terabyte-scale footage between facilities.",
      "Studios and production companies whose core workflow is large media files rather than business documents.",
    ],
    faq: [
      {
        question: "When should I use MASV instead of Docsora Transfer?",
        answer:
          "MASV is a strong fit when the primary workload is very large media files for film, video or broadcast production at terabyte scale. Docsora Transfer is built for business file delivery on a predictable subscription.",
      },
      {
        question: "Can Docsora Transfer handle large files?",
        answer:
          "Yes. Docsora Transfer supports up to 500 GB per transfer on the Teams plan and is suited to typical business files such as design assets, presentations, document bundles and client deliverables.",
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
  "Team visibility",
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