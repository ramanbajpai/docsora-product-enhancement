import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  FileType,
  ShieldCheck,
  Archive,
  Globe2,
  Briefcase,
} from "lucide-react";

export interface ConvertGuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ConvertGuideFAQ {
  question: string;
  answer: string;
}

export interface ConvertGuideRelatedTool {
  slug: string;
  label: string;
}

export interface ConvertGuide {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  readTime: string;
  category: string;
  icon: LucideIcon;
  primaryToolSlug: string;
  primaryToolLabel: string;
  sections: ConvertGuideSection[];
  faqs: ConvertGuideFAQ[];
  relatedTools: ConvertGuideRelatedTool[];
  relatedGuides: string[];
}

export const convertGuides: ConvertGuide[] = [
  {
    slug: "convert-pdf-to-word-without-losing-formatting",
    title: "How to Convert PDF to Word Without Losing Formatting | Docsora",
    metaDescription:
      "Convert PDF to Word (DOCX) online while preserving fonts, headings, tables and layout. A step-by-step workflow used by legal, finance and ops teams.",
    h1: "How to convert PDF to Word without losing formatting",
    intro:
      "Most PDF-to-Word converters break the moment they hit a multi-column report, an embedded table, or a custom font. This guide walks through the workflow professional teams use to convert PDFs into fully editable DOCX files while keeping the original document looking exactly the way it did.",
    readTime: "5 min read",
    category: "PDF to Word",
    icon: FileText,
    primaryToolSlug: "pdf-to-word",
    primaryToolLabel: "PDF to Word converter",
    sections: [
      {
        heading: "Why PDF to Word conversion usually breaks formatting",
        paragraphs: [
          "PDFs are designed to render the same on every device, which means layout, fonts and positioning are locked into the file. When a converter tries to rebuild that as an editable Word document, it has to reverse-engineer the structure — headings, columns, tables and inline images — from a fixed-position canvas.",
          "Generic converters skip this step and dump every line of text into a single column, losing tables, lists, and the heading hierarchy your document depends on. Format-aware converters reconstruct the underlying structure first, then map it onto native Word elements so the DOCX stays editable and visually faithful.",
        ],
      },
      {
        heading: "The workflow that preserves formatting end-to-end",
        paragraphs: [
          "The fastest, most reliable workflow is browser-based and takes three steps. No installs, no signup, no quality loss.",
        ],
        bullets: [
          "Open the PDF to Word converter and drop your PDF into the upload area.",
          "Confirm DOCX as the output — Docsora detects tables, headings and embedded fonts automatically.",
          "Download the editable Word file. Fonts, layout, tables and images come through intact, ready for review in Word, Google Docs or Pages.",
        ],
      },
      {
        heading: "Formatting edge cases to watch for",
        paragraphs: [
          "Scanned PDFs (image-only pages) need OCR to become editable text — that runs on Docsora Pro. Multi-column reports and pages with complex tables convert cleanly, but always open the DOCX once to confirm column flow looks the way you expect before sharing.",
          "For documents headed to e-signature workflows, convert to DOCX for edits, then export back to PDF so the signed version locks formatting in place.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will the converted DOCX look identical to the PDF?",
        answer:
          "Fonts, headings, tables, images and layout are preserved as faithfully as the DOCX format allows. Most business PDFs — contracts, reports, proposals — convert with no visible difference.",
      },
      {
        question: "Can I edit the converted Word file?",
        answer:
          "Yes. The output is a native DOCX with editable text, real tables, and proper heading styles — not a flattened image-on-a-page.",
      },
      {
        question: "Does it work with scanned PDFs?",
        answer:
          "Embedded text converts directly. Image-only scanned PDFs require OCR to become editable text, available on Docsora Pro.",
      },
    ],
    relatedTools: [
      { slug: "pdf-to-word", label: "PDF to Word" },
      { slug: "pdf-to-docx", label: "PDF to DOCX" },
      { slug: "pdf-to-text", label: "PDF to Text" },
      { slug: "word-to-pdf", label: "Word to PDF" },
    ],
    relatedGuides: [
      "best-way-to-convert-excel-to-pdf",
      "convert-powerpoint-for-sharing",
      "convert-scanned-documents-into-editable-formats",
    ],
  },
  {
    slug: "best-way-to-convert-excel-to-pdf",
    title: "Best Way to Convert Excel to PDF Without Breaking Formatting | Docsora",
    metaDescription:
      "Convert Excel spreadsheets (XLSX, XLS, CSV, ODS) into clean PDFs online while preserving columns, multi-sheet workbooks and conditional formatting.",
    h1: "The best way to convert Excel spreadsheets into PDFs",
    intro:
      "Excel-to-PDF is one of the most common conversion workflows in business — and one of the easiest to get wrong. Columns wrap, sheets get truncated, and conditional formatting silently disappears. This guide explains how to produce print-perfect PDFs from any spreadsheet, every time.",
    readTime: "4 min read",
    category: "Excel to PDF",
    icon: FileSpreadsheet,
    primaryToolSlug: "excel-to-pdf",
    primaryToolLabel: "Excel to PDF converter",
    sections: [
      {
        heading: "Why spreadsheets break when exported to PDF",
        paragraphs: [
          "Spreadsheets are infinite canvases. PDFs are paginated. When you convert, the engine has to decide where to cut rows and columns, which sheets to include, and how to handle conditional formatting, freeze panes and print areas.",
          "Desktop apps default to print settings that ignore most of your workbook. The result is a PDF with truncated columns and missing sheets — the version your finance team never wanted to see.",
        ],
      },
      {
        heading: "The workflow for clean Excel to PDF conversion",
        paragraphs: [
          "Docsora handles multi-sheet workbooks, conditional formatting, and column widths automatically.",
        ],
        bullets: [
          "Upload your XLSX, XLS, CSV or ODS file to the Excel to PDF converter.",
          "Docsora evaluates formulas, preserves conditional formatting, and paginates every sheet cleanly.",
          "Download a print-ready PDF where each sheet flows correctly and tables stay intact.",
        ],
      },
      {
        heading: "Tips for finance, ops and audit-ready exports",
        paragraphs: [
          "Name your sheets clearly — Docsora uses them as section headers in the PDF. For dashboards, hide working sheets you do not want to share before uploading. For audit-ready output, freeze the workbook (Save As → values only) before converting so formula evaluation matches the snapshot in your archive.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Docsora support multi-sheet workbooks?",
        answer:
          "Yes. Every sheet is paginated cleanly into the output PDF in workbook order with column widths preserved.",
      },
      {
        question: "Are conditional formatting and cell styles preserved?",
        answer:
          "Yes. Cell colors, fonts, borders, conditional formatting and number formats all carry through to the PDF.",
      },
      {
        question: "Can I convert CSV files to PDF the same way?",
        answer:
          "Yes — drop a CSV in and Docsora renders it as a clean tabular PDF with auto-balanced column widths.",
      },
    ],
    relatedTools: [
      { slug: "excel-to-pdf", label: "Excel to PDF" },
      { slug: "spreadsheet-to-pdf", label: "Spreadsheet to PDF" },
      { slug: "csv-to-pdf", label: "CSV to PDF" },
      { slug: "pdf-to-excel", label: "PDF to Excel" },
    ],
    relatedGuides: [
      "convert-pdf-to-word-without-losing-formatting",
      "convert-powerpoint-for-sharing",
      "browser-based-file-conversion-explained",
    ],
  },
  {
    slug: "convert-powerpoint-for-sharing",
    title: "How to Convert PowerPoint Presentations for Sharing | Docsora",
    metaDescription:
      "Convert PPT, PPTX and ODP presentations into share-ready PDFs while preserving slides, fonts, animations and embedded media.",
    h1: "How to convert PowerPoint presentations for sharing",
    intro:
      "Sending a PPTX over email is risky — fonts go missing, animations break, and reviewers open it in different software. This guide explains how to convert presentations into clean PDFs that look identical for every viewer on every device.",
    readTime: "4 min read",
    category: "PowerPoint to PDF",
    icon: Presentation,
    primaryToolSlug: "powerpoint-to-pdf",
    primaryToolLabel: "PowerPoint to PDF converter",
    sections: [
      {
        heading: "Why PDFs are the right format for sharing decks",
        paragraphs: [
          "A PDF guarantees that every reviewer sees the same fonts, layouts and slide order — whether they open it on Mac, Windows, iOS, Android or in a browser preview. PowerPoint files do not.",
          "PDFs also lock the deck against accidental edits and travel safely through email systems that strip or rename PPTX attachments.",
        ],
      },
      {
        heading: "The conversion workflow",
        paragraphs: ["Three steps, browser-based, no installs."],
        bullets: [
          "Open the PowerPoint to PDF converter and upload your PPT, PPTX or ODP deck.",
          "Docsora renders every slide with fonts, embedded images and master templates preserved.",
          "Download a pixel-accurate PDF ready for email, signature flows or archival.",
        ],
      },
      {
        heading: "Investor decks, sales decks and training material",
        paragraphs: [
          "For investor decks, convert to PDF and pair with a tracked link so you can see who opened which slides. For sales decks, export to PDF for outbound email and keep the PPTX for live editing. For training material, PDF gives you a stable archival copy that survives software version changes.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are fonts preserved in the PDF?",
        answer:
          "Yes. Docsora embeds the fonts used in the deck so the PDF renders identically on every device, including ones that do not have the original font installed.",
      },
      {
        question: "Can I convert ODP files from LibreOffice?",
        answer:
          "Yes. The same converter handles PPT, PPTX and ODP with consistent output quality.",
      },
    ],
    relatedTools: [
      { slug: "powerpoint-to-pdf", label: "PowerPoint to PDF" },
      { slug: "pdf-to-powerpoint", label: "PDF to PowerPoint" },
      { slug: "pdf-to-pptx", label: "PDF to PPTX" },
      { slug: "odp-to-pdf", label: "ODP to PDF" },
    ],
    relatedGuides: [
      "convert-pdf-to-word-without-losing-formatting",
      "best-way-to-convert-excel-to-pdf",
      "best-image-to-pdf-workflow-for-teams",
    ],
  },
  {
    slug: "pdf-vs-docx-for-business-workflows",
    title: "PDF vs DOCX for Business Workflows | When to Use Each | Docsora",
    metaDescription:
      "Should you send PDF or DOCX? A practical guide to choosing the right format for contracts, reports, proposals and operational documents.",
    h1: "PDF vs DOCX for business workflows",
    intro:
      "PDF and DOCX solve different problems. Sending the wrong format wastes review cycles, breaks formatting and creates version-control chaos. This guide explains when to use each — and how to move cleanly between them.",
    readTime: "4 min read",
    category: "Format strategy",
    icon: FileText,
    primaryToolSlug: "convert-files-online",
    primaryToolLabel: "Open the converter",
    sections: [
      {
        heading: "What PDF is good for",
        paragraphs: [
          "PDF locks formatting in place. Use PDF when the document is final, when it needs to look identical for every reader, when it is going into a signature workflow, or when it is being archived for compliance.",
        ],
      },
      {
        heading: "What DOCX is good for",
        paragraphs: [
          "DOCX is editable. Use DOCX when the document is still in review, when multiple contributors need to edit it, or when the recipient needs to lift content into another file.",
        ],
      },
      {
        heading: "How teams actually move between them",
        paragraphs: [
          "The healthiest workflow is DOCX for drafting, PDF for sending, and back to DOCX for amendments — using a reliable converter that preserves formatting in both directions so no review cycle ever starts from a degraded copy.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should contracts be sent as PDF or DOCX?",
        answer:
          "Send contracts as PDF for signing. Share as DOCX only during negotiation when both sides need to redline. Convert back to PDF once final.",
      },
      {
        question: "Can I convert DOCX to PDF and back without losing formatting?",
        answer:
          "Yes — Docsora preserves headings, tables, fonts and inline styles in both directions, so round-tripping a document does not degrade it.",
      },
    ],
    relatedTools: [
      { slug: "word-to-pdf", label: "Word to PDF" },
      { slug: "pdf-to-word", label: "PDF to Word" },
      { slug: "docx-to-pdf", label: "DOCX to PDF" },
      { slug: "pdf-to-docx", label: "PDF to DOCX" },
    ],
    relatedGuides: [
      "convert-pdf-to-word-without-losing-formatting",
      "archive-documents-using-pdfa",
      "convert-files-securely-online",
    ],
  },
  {
    slug: "convert-scanned-documents-into-editable-formats",
    title: "How to Convert Scanned Documents Into Editable Formats | Docsora",
    metaDescription:
      "Turn scanned PDFs and image-based documents into editable Word, text and spreadsheet files using a browser-based OCR-ready conversion workflow.",
    h1: "Convert scanned documents into editable formats",
    intro:
      "Scanned PDFs look like documents but behave like images. To make them searchable and editable, you need a conversion workflow that detects text inside the image, preserves layout, and outputs a real DOCX, TXT or XLSX you can work with.",
    readTime: "5 min read",
    category: "Scanned documents",
    icon: FileType,
    primaryToolSlug: "pdf-to-word",
    primaryToolLabel: "PDF to Word converter",
    sections: [
      {
        heading: "Why scanned documents are different",
        paragraphs: [
          "A scanned page is a photograph. There is no underlying text — only pixels. Standard converters extract the embedded text layer; if that layer is empty, the output is blank.",
          "To make a scan editable you need OCR (optical character recognition) — software that reads the pixels and reconstructs the text, including layout, columns and tables.",
        ],
      },
      {
        heading: "The workflow",
        paragraphs: ["Docsora handles OCR-ready conversion in the browser."],
        bullets: [
          "Upload your scanned PDF or image (JPG, PNG, TIFF).",
          "Docsora detects whether the file is text-based or image-based and applies OCR where needed (Pro).",
          "Download a fully editable DOCX, TXT or XLSX with structure preserved.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does OCR work on multi-language scans?",
        answer:
          "Yes. Docsora's OCR engine supports dozens of languages including English, Spanish, French, German, Portuguese, Chinese, Japanese, Arabic and Hindi.",
      },
      {
        question: "Can I convert scanned receipts and invoices to Excel?",
        answer:
          "Yes. Tables and tabular regions are detected and rebuilt as real Excel rows and columns.",
      },
    ],
    relatedTools: [
      { slug: "pdf-to-word", label: "PDF to Word" },
      { slug: "pdf-to-text", label: "PDF to Text" },
      { slug: "pdf-to-excel", label: "PDF to Excel" },
      { slug: "tiff-to-pdf", label: "TIFF to PDF" },
    ],
    relatedGuides: [
      "convert-pdf-to-word-without-losing-formatting",
      "best-image-to-pdf-workflow-for-teams",
      "archive-documents-using-pdfa",
    ],
  },
  {
    slug: "best-image-to-pdf-workflow-for-teams",
    title: "Best Image to PDF Workflow for Teams | JPG & PNG to PDF | Docsora",
    metaDescription:
      "Combine JPG, PNG, TIFF and WEBP images into clean multi-page PDFs. The image-to-PDF workflow professional teams use for receipts, scans and evidence.",
    h1: "The best image to PDF workflow for teams",
    intro:
      "Receipts, photo evidence, screenshots, scanned pages — most teams handle dozens of one-off images every week. This guide explains how to package them into a single clean PDF without losing resolution, transparency or readability.",
    readTime: "3 min read",
    category: "Image to PDF",
    icon: ImageIcon,
    primaryToolSlug: "jpg-to-pdf",
    primaryToolLabel: "JPG to PDF converter",
    sections: [
      {
        heading: "When to combine images into one PDF",
        paragraphs: [
          "Anything that needs to travel as one document. Expense reports, KYC packets, evidence bundles, scanned contracts, design hand-offs — these are easier to read, sign and archive as a single PDF than as a folder of loose images.",
        ],
      },
      {
        heading: "The workflow",
        paragraphs: ["Three steps. Multi-page output. Original quality preserved."],
        bullets: [
          "Drop your JPG, JPEG, PNG, TIFF or WEBP images into the converter.",
          "Reorder them if needed — Docsora keeps your sequence in the output PDF.",
          "Download a single multi-page PDF with original resolution and color depth intact.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is transparency preserved for PNGs?",
        answer:
          "PNG alpha channels render onto a clean PDF background while preserving sharp edges and color depth.",
      },
      {
        question: "Can I mix JPG and PNG in the same PDF?",
        answer:
          "Yes — Docsora accepts mixed image types in a single upload and merges them in the order you provided.",
      },
    ],
    relatedTools: [
      { slug: "jpg-to-pdf", label: "JPG to PDF" },
      { slug: "png-to-pdf", label: "PNG to PDF" },
      { slug: "tiff-to-pdf", label: "TIFF to PDF" },
      { slug: "webp-to-pdf", label: "WEBP to PDF" },
    ],
    relatedGuides: [
      "convert-scanned-documents-into-editable-formats",
      "archive-documents-using-pdfa",
      "browser-based-file-conversion-explained",
    ],
  },
  {
    slug: "archive-documents-using-pdfa",
    title: "How to Archive Documents Using PDF/A | Long-Term Preservation | Docsora",
    metaDescription:
      "PDF/A is the ISO standard for long-term document archival. Learn when to use it, how to convert to PDF/A online, and what compliance teams need to know.",
    h1: "How to archive documents using PDF/A",
    intro:
      "If a document needs to be readable in 10 years, regular PDF is the wrong choice. PDF/A is an ISO-standardized archival format that embeds everything needed to render the file — fonts, color profiles, metadata — so it stays self-contained forever.",
    readTime: "4 min read",
    category: "Archival",
    icon: Archive,
    primaryToolSlug: "pdf-to-pdfa",
    primaryToolLabel: "PDF to PDF/A converter",
    sections: [
      {
        heading: "What PDF/A actually guarantees",
        paragraphs: [
          "PDF/A enforces that everything needed to render the document lives inside the file: embedded fonts, normalized color profiles, no external dependencies, no JavaScript, no encryption. That is what makes it suitable for legal, healthcare and government archives.",
        ],
      },
      {
        heading: "When to convert to PDF/A",
        paragraphs: [
          "Convert to PDF/A when the document is final and needs to be archived: signed contracts, regulatory filings, board minutes, medical records, compliance attestations. Anything you might need to retrieve and prove integrity of years from now.",
        ],
      },
      {
        heading: "The workflow",
        paragraphs: [
          "Upload your finalized PDF to the PDF to PDF/A converter. Docsora embeds fonts, normalizes color profiles, locks metadata and outputs an ISO 19005-compliant archive-grade file ready for long-term storage.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between PDF and PDF/A?",
        answer:
          "PDF/A is a subset of PDF designed for archival. It embeds fonts, normalizes colors, and forbids features that depend on external resources, so the file stays renderable forever.",
      },
      {
        question: "Is PDF/A accepted by regulators and courts?",
        answer:
          "Yes. PDF/A is widely accepted for long-term records retention across legal, healthcare, financial and government sectors.",
      },
    ],
    relatedTools: [
      { slug: "pdf-to-pdfa", label: "PDF to PDF/A" },
      { slug: "eml-to-pdf", label: "EML to PDF" },
      { slug: "tiff-to-pdf", label: "TIFF to PDF" },
      { slug: "html-to-pdf", label: "HTML to PDF" },
    ],
    relatedGuides: [
      "convert-files-securely-online",
      "pdf-vs-docx-for-business-workflows",
      "browser-based-file-conversion-explained",
    ],
  },
  {
    slug: "browser-based-file-conversion-explained",
    title: "Browser-Based File Conversion Explained | How It Works | Docsora",
    metaDescription:
      "Why teams are moving away from desktop converters to browser-based file conversion — speed, security, format coverage, and zero installs explained.",
    h1: "Browser-based file conversion, explained",
    intro:
      "Desktop conversion tools are slow, version-locked, and rarely have the format support modern teams need. Browser-based conversion runs in seconds, works across every device, and stays in sync with new formats. Here is how it works and why it is replacing desktop utilities.",
    readTime: "5 min read",
    category: "How conversion works",
    icon: Globe2,
    primaryToolSlug: "convert-files-online",
    primaryToolLabel: "Convert files online",
    sections: [
      {
        heading: "How browser-based conversion actually works",
        paragraphs: [
          "Your file uploads over TLS to a conversion engine that detects format, applies the right rendering pipeline (PDF, DOCX, XLSX, PPTX, image, OpenDocument or email), and returns the output for download. The entire round-trip usually takes a few seconds.",
          "Because the engine lives on the server side, it stays up to date with every new format version — no app updates, no plugin compatibility issues, no Mac-vs-Windows quirks.",
        ],
      },
      {
        heading: "Why teams switch from desktop tools",
        paragraphs: [
          "Browser-based converters are faster to use (no install), have wider format coverage (every major business format in one tool), and integrate with the rest of a document workflow — compression, signing, translation, storage — without context-switching between apps.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best browser-based file converter?",
        answer:
          "Docsora is a workflow-native browser-based converter built for teams that need format-aware conversion across PDF, Word, Excel, PowerPoint, images and OpenDocument, with enterprise-grade security and no software to install.",
      },
      {
        question: "Does browser-based conversion work offline?",
        answer:
          "Conversion runs on the server side, so an internet connection is required. The trade-off is wider format support, faster output and no need to install or update software.",
      },
    ],
    relatedTools: [
      { slug: "convert-files-online", label: "Convert files online" },
      { slug: "pdf-to-word", label: "PDF to Word" },
      { slug: "word-to-pdf", label: "Word to PDF" },
      { slug: "excel-to-pdf", label: "Excel to PDF" },
    ],
    relatedGuides: [
      "convert-files-securely-online",
      "pdf-vs-docx-for-business-workflows",
      "archive-documents-using-pdfa",
    ],
  },
  {
    slug: "convert-files-securely-online",
    title: "How to Convert Files Securely Online | Encrypted Conversion | Docsora",
    metaDescription:
      "A practical guide to converting files securely online — TLS encryption, automatic deletion, ISO 27001 controls, and what to look for in a converter.",
    h1: "How to convert files securely online",
    intro:
      "Sensitive documents do not belong in random online converters. This guide explains how to convert files securely — what to look for in a provider, which controls actually matter, and how Docsora is built for finance, legal and healthcare teams.",
    readTime: "4 min read",
    category: "Security",
    icon: ShieldCheck,
    primaryToolSlug: "convert-files-online",
    primaryToolLabel: "Open the converter",
    sections: [
      {
        heading: "What secure conversion actually means",
        paragraphs: [
          "Three things matter: how the file gets to the converter, how long it stays there, and who can read it. TLS encryption protects transit, automatic deletion limits exposure, and a privacy-first architecture guarantees no human or model ever reads the contents.",
        ],
      },
      {
        heading: "What Docsora ships by default",
        paragraphs: ["Every conversion runs inside an isolated, privacy-first environment."],
        bullets: [
          "End-to-end TLS encryption on every upload.",
          "Automatic file deletion immediately after conversion.",
          "ISO 27001 controls, GDPR alignment, SOC 2 alignment.",
          "Zero indexing, sharing or AI training on user files.",
        ],
      },
      {
        heading: "When teams still need self-hosting",
        paragraphs: [
          "For air-gapped environments or regulatory regimes that forbid third-party processing, conversion has to stay on-premise. Docsora Enterprise supports private deployments for those teams; for everyone else, the browser-based workflow is faster and equally safe.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is browser-based file conversion safe for sensitive documents?",
        answer:
          "Yes. Docsora uses end-to-end TLS encryption, deletes files immediately after conversion, and is aligned with ISO 27001, SOC 2 and GDPR. Finance, legal and healthcare teams rely on it for sensitive workflows.",
      },
      {
        question: "Does Docsora train AI on uploaded files?",
        answer:
          "No. Files are processed for conversion only and never used for training, indexing or sharing.",
      },
    ],
    relatedTools: [
      { slug: "convert-files-online", label: "Convert files online" },
      { slug: "pdf-to-pdfa", label: "PDF to PDF/A" },
      { slug: "eml-to-pdf", label: "EML to PDF" },
      { slug: "pdf-to-word", label: "PDF to Word" },
    ],
    relatedGuides: [
      "archive-documents-using-pdfa",
      "browser-based-file-conversion-explained",
      "pdf-vs-docx-for-business-workflows",
    ],
  },
];

export const convertGuideBySlug = convertGuides.reduce<Record<string, ConvertGuide>>(
  (acc, g) => {
    acc[g.slug] = g;
    return acc;
  },
  {},
);

// Convenience workflow-themed icon export (unused placeholder for tree-shaking parity).
export const _convertGuideWorkflowIcon: LucideIcon = Briefcase;