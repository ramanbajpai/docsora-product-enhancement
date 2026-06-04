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
      "Compare browser-based compression quality, file support, security and workflow capabilities for individuals, freelancers and teams.",
    title: "Docsora vs SmallPDF - The Premium SmallPDF Alternative for PDF Compression | Docsora",
    metaDescription:
      "Looking for a SmallPDF alternative? Compare Docsora vs SmallPDF on PDF compression quality, free usage, security, file support and workflow speed — built for individuals, freelancers and teams.",
    h1: "Docsora vs SmallPDF",
    heroSubtitle:
      "A clear, side-by-side look at how Docsora and SmallPDF compare on browser-based file compression — for everyday users, freelancers, and teams.",
    overview:
      "SmallPDF is a long-standing online PDF utility focused primarily on PDF-only workflows. Docsora is a modern document platform with format-aware compression for PDFs, images, Word, Excel, PowerPoint and email attachments — designed for everyday users, freelancers, small businesses and enterprise teams who want a premium browser experience without hourly task caps. Individual file compression is always free; multi-file uploads are available on the Pro plan.",
    features: [
      { feature: "Browser-based compression", docsora: "Yes - all formats", competitor: "Yes - PDF focused" },
      { feature: "Free daily usage limits", docsora: "Generous, no hourly caps", competitor: "2 free tasks per hour" },
      { feature: "Single-file compression", docsora: "Free for everyone", competitor: "Free with hourly cap" },
      { feature: "Multi-file / batch compression", docsora: "Docsora Pro", competitor: "Pro plan required" },
      { feature: "Format-aware optimization", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Primarily PDF" },
      { feature: "Workflow integrations", docsora: "Storage, e-sign, tracking, AI in one workspace", competitor: "Tool-by-tool experience" },
    ],
    quality: [
      { feature: "Lossless / visually-lossless modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Basic / Strong compression" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Image re-encoding control", docsora: "Perceptual encoding per file type", competitor: "Generic image down-sampling" },
      { feature: "Average PDF size reduction", docsora: "30–80%", competitor: "40-75%" },
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
      "Individuals compressing personal PDFs, photos and scans for email and cloud storage",
      "Freelancers and consultants delivering proposals, invoices and decks under inbox size limits",
      "Students and job seekers compressing CVs, portfolios and assignments without hourly caps",
      "Finance, legal and operations teams compressing contracts, statements and signed agreements at scale (multi-file on Docsora Pro)",
      "Designers, marketers and sales teams compressing image batches, investor decks and mixed-format deliverables in one workspace",
    ],
    faq: [
      {
        question: "Is Docsora a free SmallPDF alternative?",
        answer:
          "Yes. Docsora offers free browser-based compression for PDFs, images, Word, Excel, PowerPoint and email attachments — without the hourly task caps that limit SmallPDF's free tier. Individual file compression is free and works without signup; multi-file and batch uploads are part of the Docsora Pro plan.",
      },
      {
        question: "Does Docsora preserve PDF quality as well as SmallPDF?",
        answer:
          "Docsora uses format-aware optimization with three precision modes — Preserve Quality (30% reduction), Balanced (50% compression) and Maximum (80% reduction) — keeping text vector-sharp and images print-ready. Typical PDF size reduction lands in the 30–80% range with no visible quality loss for everyday documents.",
      },
      {
        question: "Can I compress more than PDFs?",
        answer:
          "Yes. Docsora is built as a complete compression suite covering PDFs, Word documents, Excel spreadsheets, PowerPoint decks, images and email attachments — all in the same premium workspace, for both individual users and teams.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-ilovepdf",
    competitor: "iLovePDF",
    cardTitle: "Docsora vs iLovePDF",
    cardSummary:
      "See how Docsora compares on speed, quality, security and integrated document workflows for individuals, freelancers and teams.",
    title: "Docsora vs iLovePDF - The Premium iLovePDF Alternative for PDF Compression | Docsora",
    metaDescription:
      "Looking for an iLovePDF alternative? Compare Docsora vs iLovePDF on PDF compression quality, security, file support and workflow speed — built for individuals, freelancers and teams.",
    h1: "Docsora vs iLovePDF",
    heroSubtitle:
      "An honest side-by-side look at Docsora and iLovePDF for browser-based file compression — for everyday users, freelancers and teams.",
    overview:
      "iLovePDF offers a broad set of standalone PDF utilities. Docsora unifies compression with storage, e-signing, tracking and AI in a single premium workspace — and applies format-aware optimization beyond PDFs to Word, Excel, PowerPoint, images and email attachments. Individuals and freelancers compress single files for free; multi-file and batch compression are available on Docsora Pro.",
    features: [
      { feature: "Browser-based compression", docsora: "Yes - all formats", competitor: "Yes - PDF focused" },
      { feature: "Single-file compression", docsora: "Free for everyone", competitor: "Free with limits" },
      { feature: "Multi-file / batch compression", docsora: "Docsora Pro", competitor: "Limited on free tier" },
      { feature: "Format-aware optimization", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Primarily PDF + image" },
      { feature: "Single unified workspace", docsora: "Compress, sign, track, store, AI", competitor: "Tool-by-tool navigation" },
      { feature: "Workflow integrations", docsora: "Native e-sign + storage", competitor: "Separate products" },
    ],
    quality: [
      { feature: "Compression modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Extreme, Recommended, Less" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Image perceptual encoding", docsora: "Per file type", competitor: "Generic" },
      { feature: "Average PDF size reduction", docsora: "30–80%", competitor: "40-80%" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "After 2 hours" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "No" },
    ],
    experience: [
      { feature: "Upload to result time", docsora: "Seconds, single screen", competitor: "Multi-step funnel" },
      { feature: "Ads in free tier", docsora: "None", competitor: "Yes" },
      { feature: "Account required", docsora: "No for standard files", competitor: "Required above limits" },
    ],
    fileSupport: [
      { feature: "PDF / DOC / DOCX", docsora: "Supported", competitor: "Supported" },
      { feature: "XLS / XLSX / ODS", docsora: "Supported", competitor: "Limited" },
      { feature: "PPT / PPTX / ODP", docsora: "Supported", competitor: "Limited" },
      { feature: "JPG / PNG / WEBP / TIFF", docsora: "Supported", competitor: "Supported" },
      { feature: "EML email attachments", docsora: "Supported", competitor: "Not native" },
    ],
    workflow: [
      "Individuals compressing personal documents, family photos and scanned paperwork without ads",
      "Freelancers and consultants delivering client-ready PDFs and decks under inbox limits",
      "Students compressing CVs, dissertations and project portfolios for upload portals",
      "Operations and sales teams compressing recurring batches and investor decks (multi-file on Docsora Pro)",
      "Legal and marketing teams pairing compression with native e-signature and storage in one premium workspace",
    ],
    faq: [
      {
        question: "Is Docsora a free iLovePDF alternative?",
        answer:
          "Yes. Docsora offers free browser-based compression with no ads and generous limits for individual file uploads — ideal for everyday users, freelancers and small businesses. Multi-file and batch compression are available on the Docsora Pro plan.",
      },
      {
        question: "Does Docsora work for non-PDF files too?",
        answer:
          "Yes. In addition to PDF compression, Docsora compresses Word, Excel, PowerPoint, images and email attachments using format-aware optimization — typically reducing file size by 30–80% with no visible quality loss.",
      },
      {
        question: "Can I sign and store compressed files in the same place?",
        answer:
          "Yes. Docsora pairs compression with native storage, tracking and e-signature workflows — so individuals, freelancers and teams don't have to bounce between tools.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-adobe-acrobat",
    competitor: "Adobe Acrobat",
    cardTitle: "Docsora vs Adobe Acrobat",
    cardSummary:
      "Browser-based compression compared to Adobe Acrobat's desktop and online tools — for individuals, freelancers and teams.",
    title: "Docsora vs Adobe Acrobat - The Premium Acrobat Compress PDF Alternative | Docsora",
    metaDescription:
      "Looking for an Adobe Acrobat alternative to compress PDFs? Compare Docsora vs Adobe Acrobat on speed, price, file support and workflow flexibility — built for individuals, freelancers and teams.",
    h1: "Docsora vs Adobe Acrobat",
    heroSubtitle:
      "How Docsora compares to Adobe Acrobat's Compress PDF tool for browser-based compression — for individuals, freelancers and teams.",
    overview:
      "Adobe Acrobat is the long-standing standard for PDF editing, with a paid desktop app and an online Compress PDF tool. Docsora is a modern, browser-based alternative that handles compression for PDFs and every other major format without installs, subscriptions or learning curve — in a single premium workspace. Individuals and freelancers compress single files for free; multi-file and batch uploads are part of the Docsora Pro plan.",
    features: [
      { feature: "Browser-based, no install", docsora: "Yes", competitor: "Online tool available; desktop app for full features" },
      { feature: "Free compression tier", docsora: "Yes - generous, no signup", competitor: "Limited online; paid for desktop" },
      { feature: "Single-file compression", docsora: "Free for everyone", competitor: "Limited online tier" },
      { feature: "Multi-file / batch compression", docsora: "Docsora Pro", competitor: "Paid plans required" },
      { feature: "Format coverage", docsora: "PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, EML", competitor: "Strong PDF; limited beyond" },
      { feature: "Unified workspace", docsora: "Compress, sign, track, store, AI", competitor: "Acrobat + separate Adobe products" },
    ],
    quality: [
      { feature: "Compression modes", docsora: "Balanced, Maximum, Preserve Quality", competitor: "Low, Medium, High" },
      { feature: "Vector text preservation", docsora: "Preserved across all modes", competitor: "Preserved" },
      { feature: "Average PDF size reduction", docsora: "30–80%", competitor: "50-85%" },
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
    ],
    fileSupport: [
      { feature: "PDF / DOC / DOCX", docsora: "Supported", competitor: "Supported" },
      { feature: "XLS / XLSX / ODS", docsora: "Supported", competitor: "Conversion-based" },
      { feature: "PPT / PPTX / ODP", docsora: "Supported", competitor: "Conversion-based" },
      { feature: "JPG / PNG / WEBP / TIFF", docsora: "Supported", competitor: "Limited native compression" },
      { feature: "EML email attachments", docsora: "Supported", competitor: "Not native" },
    ],
    workflow: [
      "Individuals and students compressing personal PDFs and assignments without an Acrobat subscription",
      "Freelancers and consultants delivering proposals, contracts and decks under email size limits",
      "Cross-platform users on macOS, Windows, Linux, ChromeOS and mobile working from any modern browser",
      "Operations teams compressing multi-format deliverables in a single pass (multi-file on Docsora Pro)",
      "Legal and finance workflows that pair compression with native e-signature in one premium workspace",
    ],
    faq: [
      {
        question: "Is Docsora a free Adobe Acrobat alternative for compression?",
        answer:
          "Yes. Docsora compresses PDFs and other formats directly in the browser for free — no Acrobat subscription or desktop install required. Individual file compression is free for everyone; multi-file and batch uploads are available on the Docsora Pro plan.",
      },
      {
        question: "Does Docsora match Acrobat's compression quality?",
        answer:
          "For everyday workflows, yes. Docsora's format-aware optimization keeps text vector-sharp and images crisp across three precision modes — Preserve Quality (30% reduction), Balanced (50% compression) and Maximum (80% reduction) — typically reducing PDFs by 30–80% with no visible quality loss.",
      },
      {
        question: "What if I need full PDF editing like Acrobat?",
        answer:
          "Docsora covers the high-frequency PDF workflows individuals, freelancers and teams rely on every day — compress, convert, merge, split, sign and organize — in a premium browser experience. For deep prepress editing, Acrobat remains the desktop standard.",
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
