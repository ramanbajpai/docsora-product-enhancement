export interface CompareFeatureRow {
  feature: string;
  docsora: string;
  competitor: string;
}

export interface CompareFAQ {
  question: string;
  answer: string;
}

export interface CompareVariantConfig {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  overview: string;
  features: CompareFeatureRow[];
  quality: CompareFeatureRow[];
  security: CompareFeatureRow[];
  experience: CompareFeatureRow[];
  fileSupport: CompareFeatureRow[];
  workflow: string[];
  faq: CompareFAQ[];
}

export const compareVariants: CompareVariantConfig[] = [
  {
    slug: "compare/docsora-vs-smallpdf",
    competitor: "SmallPDF",
    cardTitle: "Docsora vs SmallPDF",
    cardSummary:
      "Compare browser-based compression performance, quality preservation, file support and workflow capabilities.",
    title: "Docsora vs SmallPDF - SmallPDF Alternative for File Compression | Docsora",
    metaDescription:
      "Looking for a SmallPDF alternative? Compare Docsora and SmallPDF on compression quality, security, file support, and workflow speed.",
    h1: "Docsora vs SmallPDF",
    heroSubtitle:
      "A clear, analytical look at how Docsora and SmallPDF compare for browser-based file compression.",
    overview:
      "SmallPDF is a long-standing online PDF utility focused primarily on PDF-only workflows. Docsora is a modern document platform with format-aware compression for PDFs, images, Word, Excel, PowerPoint, and email attachments - built for teams that want premium SaaS UX without daily usage caps.",
    features: [
      { feature: "Browser-based compression", docsora: "Yes - all formats", competitor: "Yes - PDF focused" },
      { feature: "Free daily usage limits", docsora: "Generous, no hourly caps", competitor: "2 free tasks per hour" },
      { feature: "Batch compression", docsora: "Multi-file in one flow", competitor: "Pro plan required" },
      { feature: "Format-aware optimization", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Primarily PDF" },
      { feature: "Workflow integrations", docsora: "Storage, e-sign, tracking, AI in one workspace", competitor: "Tool-by-tool experience" },
    ],
    quality: [
      { feature: "Lossless / visually-lossless modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Basic / Strong compression" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Image re-encoding control", docsora: "Perceptual encoding per file type", competitor: "Generic image down-sampling" },
      { feature: "Average PDF size reduction", docsora: "60-90%", competitor: "40-75%" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "After 1 hour" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Upload to result time", docsora: "Seconds, single screen", competitor: "Multi-step funnel" },
      { feature: "Ads in free tier", docsora: "None", competitor: "Limited" },
      { feature: "Account required", docsora: "No - free without signup", competitor: "Required for some features" },
    ],
    fileSupport: [
      { feature: "PDF / DOC / DOCX", docsora: "Supported", competitor: "Supported" },
      { feature: "XLS / XLSX / ODS", docsora: "Supported", competitor: "Limited" },
      { feature: "PPT / PPTX / ODP", docsora: "Supported", competitor: "Limited" },
      { feature: "JPG / PNG / WEBP / TIFF", docsora: "Supported", competitor: "Supported" },
      { feature: "EML email attachments", docsora: "Supported", competitor: "Not native" },
    ],
    workflow: [
      "Teams compressing mixed-format deliverables in one workspace",
      "Finance and legal teams compressing contracts and statements without hourly caps",
      "Designers and marketers compressing image batches alongside decks and PDFs",
      "Sales teams compressing investor decks for inbox-friendly delivery",
    ],
    faq: [
      {
        question: "Is Docsora a free SmallPDF alternative?",
        answer:
          "Yes. Docsora offers free browser-based compression for PDFs, images, Word, Excel, PowerPoint, and email attachments without hourly task caps. No signup required for standard files.",
      },
      {
        question: "Does Docsora preserve PDF quality as well as SmallPDF?",
        answer:
          "Docsora uses format-aware optimization with three quality modes (Balanced, Maximum, Preserve Quality), keeping text vector-sharp and images print-ready. Typical PDF size reduction is 60-90% with no visible quality loss.",
      },
      {
        question: "Can I compress more than PDFs?",
        answer:
          "Yes. Docsora is built as a full compression suite covering documents, spreadsheets, presentations, images, and email attachments - all in the same workspace.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-ilovepdf",
    competitor: "iLovePDF",
    cardTitle: "Docsora vs iLovePDF",
    cardSummary:
      "See how Docsora compares on speed, batch handling, security posture and integrated document workflows.",
    title: "Docsora vs iLovePDF - iLovePDF Alternative for File Compression | Docsora",
    metaDescription:
      "Looking for an iLovePDF alternative? Compare Docsora and iLovePDF on compression quality, security, file support, and workflow speed.",
    h1: "Docsora vs iLovePDF",
    heroSubtitle:
      "An honest side-by-side look at Docsora and iLovePDF for browser-based file compression.",
    overview:
      "iLovePDF offers a broad set of standalone PDF utilities. Docsora unifies compression with storage, e-signing, tracking and AI in a single premium workspace - and applies format-aware optimization beyond PDFs to Word, Excel, PowerPoint, images, and email attachments.",
    features: [
      { feature: "Browser-based compression", docsora: "Yes - all formats", competitor: "Yes - PDF focused" },
      { feature: "Batch compression", docsora: "Included on free tier", competitor: "Limited on free tier" },
      { feature: "Format-aware optimization", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Primarily PDF + image" },
      { feature: "Single unified workspace", docsora: "Compress, sign, track, store, AI", competitor: "Tool-by-tool navigation" },
      { feature: "Workflow integrations", docsora: "Native e-sign + storage", competitor: "Separate products" },
    ],
    quality: [
      { feature: "Compression modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Extreme, Recommended, Less" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Image perceptual encoding", docsora: "Per file type", competitor: "Generic" },
      { feature: "Average PDF size reduction", docsora: "60-90%", competitor: "40-80%" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "After 2 hours" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "Partial" },
    ],
    experience: [
      { feature: "Upload to result time", docsora: "Seconds, single screen", competitor: "Multi-step funnel" },
      { feature: "Ads in free tier", docsora: "None", competitor: "Yes" },
      { feature: "Account required", docsora: "No for standard files", competitor: "Required above limits" },
      { feature: "Design language", docsora: "Premium, Apple-inspired", competitor: "Utility-first" },
    ],
    fileSupport: [
      { feature: "PDF / DOC / DOCX", docsora: "Supported", competitor: "Supported" },
      { feature: "XLS / XLSX / ODS", docsora: "Supported", competitor: "Limited" },
      { feature: "PPT / PPTX / ODP", docsora: "Supported", competitor: "Limited" },
      { feature: "JPG / PNG / WEBP / TIFF", docsora: "Supported", competitor: "Supported" },
      { feature: "EML email attachments", docsora: "Supported", competitor: "Not native" },
    ],
    workflow: [
      "Operations teams compressing recurring batches without ad interruptions",
      "Sales teams compressing investor decks for inbox-friendly delivery",
      "Legal teams compressing signed PDFs alongside e-signature workflows in one tool",
      "Marketing teams compressing image and PDF assets together",
    ],
    faq: [
      {
        question: "Is Docsora a free iLovePDF alternative?",
        answer:
          "Yes. Docsora offers free browser-based compression with no ads, generous limits, and batch handling included on the free tier.",
      },
      {
        question: "Does Docsora work for non-PDF files too?",
        answer:
          "Yes. In addition to PDF compression, Docsora compresses Word, Excel, PowerPoint, images, and email attachments using format-aware optimization.",
      },
      {
        question: "Can I sign and store compressed files in the same place?",
        answer:
          "Yes. Docsora pairs compression with native storage, tracking, and e-signature workflows - so you don't have to bounce between tools.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-adobe-acrobat",
    competitor: "Adobe Acrobat",
    cardTitle: "Docsora vs Adobe Acrobat",
    cardSummary:
      "Browser-based compression compared to Adobe Acrobat's desktop and online compression tools.",
    title: "Docsora vs Adobe Acrobat - Acrobat Compress PDF Alternative | Docsora",
    metaDescription:
      "Looking for an Adobe Acrobat alternative for compressing PDFs? Compare Docsora and Adobe Acrobat on speed, price, file support, and workflow flexibility.",
    h1: "Docsora vs Adobe Acrobat",
    heroSubtitle:
      "How Docsora compares to Adobe Acrobat's Compress PDF tool for browser-based compression workflows.",
    overview:
      "Adobe Acrobat is the long-standing standard for PDF editing, with a paid desktop app and an online Compress PDF tool. Docsora is a modern, browser-based alternative that handles compression for PDFs and every other major format without installs, subscriptions, or learning curve - in a single premium workspace.",
    features: [
      { feature: "Browser-based, no install", docsora: "Yes", competitor: "Online tool available; desktop app for full features" },
      { feature: "Free compression tier", docsora: "Yes - generous, no signup", competitor: "Limited online; paid for desktop" },
      { feature: "Batch compression", docsora: "Included on free tier", competitor: "Paid plans required" },
      { feature: "Format coverage", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Strong PDF; limited beyond" },
      { feature: "Unified workspace", docsora: "Compress, sign, track, store, AI", competitor: "Acrobat + separate Adobe products" },
    ],
    quality: [
      { feature: "Compression modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Low, Medium, High" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Average PDF size reduction", docsora: "60-90%", competitor: "50-85%" },
      { feature: "Output predictability", docsora: "Consistent across browsers", competitor: "Consistent on desktop" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "Varies by product" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Setup time", docsora: "Zero - open and drop file", competitor: "Account / install required" },
      { feature: "Pricing for compression", docsora: "Free for standard use", competitor: "Subscription for full features" },
      { feature: "Cross-device support", docsora: "Any modern browser", competitor: "Web + desktop + mobile apps" },
      { feature: "Design language", docsora: "Premium, Apple-inspired", competitor: "Enterprise-utility" },
    ],
    fileSupport: [
      { feature: "PDF / DOC / DOCX", docsora: "Supported", competitor: "Supported" },
      { feature: "XLS / XLSX / ODS", docsora: "Supported", competitor: "Conversion-based" },
      { feature: "PPT / PPTX / ODP", docsora: "Supported", competitor: "Conversion-based" },
      { feature: "JPG / PNG / WEBP / TIFF", docsora: "Supported", competitor: "Limited native compression" },
      { feature: "EML email attachments", docsora: "Supported", competitor: "Not native" },
    ],
    workflow: [
      "Teams that need fast, browser-based compression without Acrobat licenses",
      "Operators compressing multi-format deliverables in a single pass",
      "Cross-platform teams (macOS, Windows, Linux, ChromeOS, mobile) standardizing on one browser tool",
      "Legal and finance workflows that pair compression with native e-signature",
    ],
    faq: [
      {
        question: "Is Docsora a free Adobe Acrobat alternative for compression?",
        answer:
          "Yes. Docsora compresses PDFs and other formats in the browser for free, without an Acrobat subscription or desktop install.",
      },
      {
        question: "Does Docsora match Acrobat's compression quality?",
        answer:
          "For typical workflows, yes. Docsora's format-aware optimization keeps text vector-sharp and images crisp, with average PDF size reduction of 60-90% across three quality modes.",
      },
      {
        question: "What if I need full PDF editing like Acrobat?",
        answer:
          "Docsora covers high-frequency PDF workflows (compress, convert, merge, split, sign, organize) in a premium browser experience. For deep prepress editing, Acrobat remains the desktop standard.",
      },
    ],
  },
];

export const compareVariantBySlug = compareVariants.reduce<Record<string, CompareVariantConfig>>(
  (acc, variant) => {
    acc[variant.slug] = variant;
    return acc;
  },
  {},
);
