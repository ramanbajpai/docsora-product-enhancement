import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Mail,
  FileImage,
  FileType,
  FileCode,
  Files,
} from "lucide-react";

export interface ConvertVariantConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keyword: string;
  acceptedFormats: string;
  cardIcon: LucideIcon;
  cardLabel: string;
  cardDescription: string;
  longCopy: string;
  faq: { question: string; answer: string }[];
  uploadHeadline?: string;
  uploadSubheadline?: string;
  uploadFormatBadges?: string[];
  uploadAccept?: string;
  useCases?: string[];
}

/**
 * Variant landing pages that all reuse the /convert upload experience
 * but ship unique meta, H1, copy and FAQ for long-tail SEO coverage.
 * Each page internally links back to /convert (the conversion authority hub).
 */
export const convertVariants: ConvertVariantConfig[] = [
  {
    slug: "pdf-to-word",
    title: "Convert PDF to Word Online Free | Docsora",
    metaDescription:
      "Convert PDF documents into editable Word files online instantly while preserving formatting, structure and readability.",
    h1: "Convert PDF to Word Online",
    intro:
      "Turn any PDF into a fully editable DOC or DOCX file in your browser — formatting, fonts, and layout preserved.",
    keyword: "pdf to word",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "PDF to Word",
    cardDescription:
      "Convert PDFs into editable Word documents — fonts, tables and layout preserved.",
    longCopy:
      "Docsora's online PDF to Word converter transforms PDFs into editable DOCX files with precise layout retention, OCR-grade text recognition, and faithful image placement. Convert contracts, reports, and proposals into Word format directly in your browser — no installs, no signup, no quality loss.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "How do I convert PDF to Word online?",
        answer:
          "Drop your PDF into the upload area, select Word (DOCX) as the target format, and Docsora returns a fully editable Word document in seconds — formatting, fonts, images, and tables preserved.",
      },
      {
        question: "Will the Word file keep the original PDF formatting?",
        answer:
          "Yes. Docsora's conversion engine preserves layout, fonts, headings, tables, images, and inline styles so the converted DOCX matches the source PDF closely.",
      },
      {
        question: "Is this PDF to Word converter free?",
        answer:
          "Yes — free, browser-based, no signup. Upgrade to Pro for batch conversions, larger files, and advanced formatting controls.",
      },
    ],
  },
  {
    slug: "word-to-pdf",
    title: "Convert Word to PDF Online | DOC & DOCX Converter | Docsora",
    metaDescription:
      "Convert Word documents (DOC, DOCX, ODT) into professional PDFs online instantly — formatting, fonts and layout preserved.",
    h1: "Convert Word to PDF Online",
    intro:
      "Turn DOC, DOCX and ODT files into share-ready PDF documents directly in your browser.",
    keyword: "word to pdf",
    acceptedFormats: "DOC · DOCX · ODT",
    cardIcon: FileText,
    cardLabel: "Word to PDF",
    cardDescription:
      "Convert DOC, DOCX and ODT files into clean professional PDFs.",
    longCopy:
      "Docsora's Word to PDF converter renders DOC, DOCX, and ODT files into print-perfect PDFs while keeping fonts, headings, tables, and images pixel-accurate. Ideal for contracts, proposals, reports, and any document headed for e-signature workflows.",
    uploadHeadline: "Upload your Word document",
    uploadAccept: ".doc,.docx,.odt",
    faq: [
      {
        question: "How do I convert Word to PDF online?",
        answer:
          "Upload your DOC, DOCX, or ODT, choose PDF as the output, and Docsora delivers a clean, professional PDF instantly — fonts and layout preserved.",
      },
      {
        question: "Does Docsora support DOCX and legacy DOC files?",
        answer:
          "Yes — modern DOCX, legacy DOC, and OpenDocument ODT files are all supported, with consistent output quality across formats.",
      },
    ],
  },
  {
    slug: "excel-to-pdf",
    title: "Convert Excel to PDF Online | XLS & XLSX Converter | Docsora",
    metaDescription:
      "Convert Excel spreadsheets into professional PDF documents online while preserving formatting, tables and workbook structure.",
    h1: "Convert Excel to PDF Online",
    intro:
      "Convert XLS, XLSX, CSV and ODS spreadsheets into clean shareable PDFs — formulas, formatting and tables preserved.",
    keyword: "excel to pdf",
    acceptedFormats: "XLS · XLSX · CSV · ODS",
    cardIcon: FileSpreadsheet,
    cardLabel: "Excel to PDF",
    cardDescription:
      "Transform spreadsheets into clean PDF documents — tables and styling intact.",
    longCopy:
      "Docsora's Excel to PDF converter turns XLS, XLSX, CSV, and ODS files into clean print-ready PDFs. Multi-sheet workbooks, conditional formatting, and table styling are preserved — perfect for finance reports, exports, and audit-ready deliverables.",
    uploadHeadline: "Upload your spreadsheet",
    uploadAccept: ".xls,.xlsx,.csv,.ods",
    faq: [
      {
        question: "Can I convert Excel spreadsheets to PDF without losing formatting?",
        answer:
          "Yes. Docsora preserves cell formatting, conditional styles, multi-sheet structure, and column widths — so the PDF mirrors what's on screen in Excel.",
      },
      {
        question: "Does Docsora handle multi-sheet workbooks?",
        answer:
          "Yes — every sheet in your workbook is paginated cleanly into the output PDF in the correct order.",
      },
    ],
  },
  {
    slug: "powerpoint-to-pdf",
    title: "Convert PowerPoint to PDF Online | PPT & PPTX | Docsora",
    metaDescription:
      "Convert PowerPoint presentations (PPT, PPTX, ODP) into PDFs online while preserving slides, layouts and embedded media.",
    h1: "Convert PowerPoint to PDF Online",
    intro:
      "Turn PPT, PPTX and ODP decks into share-ready PDFs while preserving every slide, font and layout.",
    keyword: "powerpoint to pdf",
    acceptedFormats: "PPT · PPTX · ODP",
    cardIcon: Presentation,
    cardLabel: "PowerPoint to PDF",
    cardDescription:
      "Convert PPT, PPTX and ODP decks into share-ready PDF documents.",
    longCopy:
      "Docsora's PowerPoint to PDF converter renders PPT, PPTX, and ODP decks into pixel-accurate PDFs. Slide layouts, fonts, embedded images, charts, and speaker notes are preserved — built for investor decks, sales presentations, and training material.",
    uploadHeadline: "Upload your presentation",
    uploadAccept: ".ppt,.pptx,.odp",
    faq: [
      {
        question: "Can I convert presentations online without losing slide quality?",
        answer:
          "Yes. Docsora preserves slide layouts, fonts, embedded media, and master templates — output PDFs look identical to your original deck.",
      },
    ],
  },
  {
    slug: "jpg-to-pdf",
    title: "Convert JPG to PDF Online | Image to PDF Converter | Docsora",
    metaDescription:
      "Convert JPG and JPEG images into secure browser-based PDF files instantly with Docsora Convert.",
    h1: "Convert JPG to PDF Online",
    intro:
      "Turn JPG and JPEG images into clean single or multi-page PDF documents — directly in your browser.",
    keyword: "jpg to pdf",
    acceptedFormats: "JPG · JPEG",
    cardIcon: ImageIcon,
    cardLabel: "JPG to PDF",
    cardDescription:
      "Convert JPG and JPEG photos into clean PDF documents instantly.",
    longCopy:
      "Docsora's JPG to PDF converter packages one or many JPG images into a clean PDF — perfect for scanned receipts, photo evidence, compliance archives, and visual handoffs. Original resolution and color accuracy are preserved.",
    uploadHeadline: "Upload your JPG images",
    uploadAccept: ".jpg,.jpeg",
    faq: [
      {
        question: "How do I convert JPG to PDF online securely?",
        answer:
          "Drop your JPG files into the upload area above. Docsora processes them over encrypted TLS, builds a clean PDF, and auto-deletes the originals after conversion.",
      },
      {
        question: "Can I combine multiple JPGs into one PDF?",
        answer:
          "Yes. Upload multiple JPGs and Docsora merges them into a single multi-page PDF in the order you provided.",
      },
    ],
  },
  {
    slug: "png-to-pdf",
    title: "Convert PNG to PDF Online | Free PNG to PDF Converter | Docsora",
    metaDescription:
      "Convert PNG images to PDF online instantly — preserve transparency, color depth, and image quality. Free and browser-based.",
    h1: "Convert PNG to PDF Online",
    intro:
      "Turn PNG images into clean PDF documents — single or multi-page, transparency preserved.",
    keyword: "png to pdf",
    acceptedFormats: "PNG",
    cardIcon: FileImage,
    cardLabel: "PNG to PDF",
    cardDescription:
      "Convert PNG graphics into share-ready PDF documents.",
    longCopy:
      "Docsora's PNG to PDF converter renders PNG graphics — UI mockups, screenshots, logos, and design exports — into clean PDF files while preserving alpha channels, color depth, and sharp edges.",
    uploadHeadline: "Upload your PNG images",
    uploadAccept: ".png",
    faq: [
      {
        question: "Does PNG to PDF conversion preserve transparency?",
        answer:
          "Yes. Docsora keeps alpha channels intact and renders transparent PNGs against a clean PDF background while preserving sharp edges.",
      },
    ],
  },
  {
    slug: "pdf-to-jpg",
    title: "Convert PDF to JPG Online | PDF to Image Converter | Docsora",
    metaDescription:
      "Convert PDF pages into high-quality JPG images online — instantly, free, browser-based, no installs.",
    h1: "Convert PDF to JPG Online",
    intro:
      "Export every page of a PDF as a high-resolution JPG image — directly in your browser.",
    keyword: "pdf to jpg",
    acceptedFormats: "PDF",
    cardIcon: ImageIcon,
    cardLabel: "PDF to JPG",
    cardDescription:
      "Export PDF pages as high-resolution JPG images instantly.",
    longCopy:
      "Docsora's PDF to JPG converter renders every PDF page into high-resolution JPG images suitable for previews, social sharing, embeds, and visual reviews.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "Can I convert every page of a PDF into JPGs?",
        answer:
          "Yes. Docsora exports each PDF page as a separate JPG image, bundled for a single download.",
      },
    ],
  },
  {
    slug: "pdf-to-png",
    title: "Convert PDF to PNG Online | High-Quality PNG Export | Docsora",
    metaDescription:
      "Convert PDF pages into PNG images online with full quality and transparency support. Free browser-based PDF to PNG converter.",
    h1: "Convert PDF to PNG Online",
    intro:
      "Export PDF pages as crisp PNG images with full color depth — directly in your browser.",
    keyword: "pdf to png",
    acceptedFormats: "PDF",
    cardIcon: FileImage,
    cardLabel: "PDF to PNG",
    cardDescription:
      "Export PDF pages as crisp PNG images with full color depth.",
    longCopy:
      "Docsora's PDF to PNG converter exports every PDF page as a high-quality PNG image with full color depth and crisp text rendering — perfect for design handoffs, previews, and documentation.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "How do I convert PDF to PNG online?",
        answer:
          "Upload your PDF, choose PNG as the output, and Docsora returns one PNG per page bundled for a single download.",
      },
    ],
  },
  {
    slug: "pdf-to-powerpoint",
    title: "Convert PDF to PowerPoint Online | PDF to PPTX | Docsora",
    metaDescription:
      "Convert PDF documents into editable PowerPoint (PPTX) presentations online — preserve slides, layouts and content.",
    h1: "Convert PDF to PowerPoint Online",
    intro:
      "Turn PDFs into editable PowerPoint decks while preserving layout, images and structure.",
    keyword: "pdf to powerpoint",
    acceptedFormats: "PDF",
    cardIcon: Presentation,
    cardLabel: "PDF to PowerPoint",
    cardDescription:
      "Transform PDFs into editable PowerPoint presentations instantly.",
    longCopy:
      "Docsora's PDF to PowerPoint converter rebuilds PDFs as editable PPTX decks — pages become slides, text becomes editable, and images, charts, and layout retain their original structure.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "Will the converted PPTX be editable?",
        answer:
          "Yes. Text becomes editable text boxes, images are placed on slides, and layout is preserved so you can continue editing in PowerPoint.",
      },
    ],
  },
  {
    slug: "pdf-to-html",
    title: "Convert PDF to HTML Online | PDF to Web Page | Docsora",
    metaDescription:
      "Convert PDF documents into clean HTML web pages online — preserve text, structure and styling for browser-based reading.",
    h1: "Convert PDF to HTML Online",
    intro:
      "Turn PDFs into clean responsive HTML pages — perfect for web publishing and structured reading.",
    keyword: "pdf to html",
    acceptedFormats: "PDF",
    cardIcon: FileCode,
    cardLabel: "PDF to HTML",
    cardDescription:
      "Convert PDFs into clean HTML pages with preserved structure.",
    longCopy:
      "Docsora's PDF to HTML converter produces clean semantic HTML output from your PDF — preserving headings, paragraphs, lists, and image placement for web publishing and accessibility workflows.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "Is the HTML output clean and semantic?",
        answer:
          "Yes. Docsora generates structured HTML with semantic headings, paragraphs, and lists rather than absolute positioning soup — ideal for accessibility and indexing.",
      },
    ],
  },
  {
    slug: "pdf-to-text",
    title: "Convert PDF to Text Online | PDF to TXT Extractor | Docsora",
    metaDescription:
      "Extract clean plain text from any PDF online — free browser-based PDF to TXT converter with structure preservation.",
    h1: "Convert PDF to Text Online",
    intro:
      "Extract clean plain text from any PDF — directly in your browser, ready for editing or analysis.",
    keyword: "pdf to text",
    acceptedFormats: "PDF",
    cardIcon: FileType,
    cardLabel: "PDF to Text",
    cardDescription:
      "Extract clean plain text from PDFs for editing, analysis or AI.",
    longCopy:
      "Docsora's PDF to TXT converter extracts clean plain text from any PDF — preserving paragraph order and reading flow. Perfect for content reuse, AI ingestion, and analysis pipelines.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "Can I extract text from scanned PDFs?",
        answer:
          "Docsora extracts embedded text directly. For image-only scanned PDFs, OCR is required — available on Docsora Pro.",
      },
    ],
  },
  {
    slug: "pdf-to-webp",
    title: "Convert PDF to WEBP Online | Modern Image Export | Docsora",
    metaDescription:
      "Convert PDF pages into modern WEBP images online — smaller file size, faster web delivery, full quality preserved.",
    h1: "Convert PDF to WEBP Online",
    intro:
      "Export PDF pages as lightweight modern WEBP images — perfect for web delivery and Core Web Vitals.",
    keyword: "pdf to webp",
    acceptedFormats: "PDF",
    cardIcon: ImageIcon,
    cardLabel: "PDF to WEBP",
    cardDescription:
      "Export PDF pages as modern WEBP images for fast web delivery.",
    longCopy:
      "Docsora's PDF to WEBP converter exports PDF pages as modern WEBP images — dramatically smaller than JPG or PNG with no visible quality loss. Ideal for web embedding and performance-critical pages.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      {
        question: "Why convert PDF to WEBP instead of JPG?",
        answer:
          "WEBP delivers the same visual quality as JPG at 25–35% smaller file size — better for Core Web Vitals and faster page loads.",
      },
    ],
  },
  {
    slug: "email-to-pdf",
    title: "Convert Email to PDF Online | EML to PDF Converter | Docsora",
    metaDescription:
      "Convert EML email files into shareable PDF documents online — for archiving, compliance and legal workflows.",
    h1: "Convert Email to PDF Online",
    intro:
      "Turn EML email files into archive-ready PDFs while preserving headers, body and attachments.",
    keyword: "email to pdf",
    acceptedFormats: "EML",
    cardIcon: Mail,
    cardLabel: "Email to PDF",
    cardDescription:
      "Convert EML emails into archive-ready PDFs for compliance.",
    longCopy:
      "Docsora's EML to PDF converter archives email files as PDFs with headers, body content, and attachment metadata preserved — built for legal discovery, compliance archives, and audit trails.",
    uploadHeadline: "Upload your EML files",
    uploadAccept: ".eml",
    faq: [
      {
        question: "Can I convert email files into PDFs for compliance?",
        answer:
          "Yes — Docsora preserves headers, body content, timestamps, and attachment metadata in the PDF output, suitable for legal and compliance archives.",
      },
    ],
  },
  {
    slug: "spreadsheet-to-pdf",
    title: "Convert Spreadsheet to PDF Online | XLSX, CSV, ODS | Docsora",
    metaDescription:
      "Convert spreadsheets (XLSX, XLS, CSV, ODS) into PDF documents online — preserve formatting, formulas and structure.",
    h1: "Convert Spreadsheet to PDF Online",
    intro:
      "Convert XLSX, XLS, CSV and ODS spreadsheets into PDFs in seconds — directly in your browser.",
    keyword: "spreadsheet to pdf",
    acceptedFormats: "XLSX · XLS · CSV · ODS",
    cardIcon: FileSpreadsheet,
    cardLabel: "Spreadsheet to PDF",
    cardDescription:
      "Convert spreadsheets into clean PDFs while preserving structure.",
    longCopy:
      "Docsora's spreadsheet to PDF converter handles XLSX, XLS, CSV, and ODS files with multi-sheet support, formula evaluation, and faithful formatting. Built for finance, reporting, and audit workflows.",
    uploadHeadline: "Upload your spreadsheet",
    uploadAccept: ".xls,.xlsx,.csv,.ods",
    faq: [
      {
        question: "Does Docsora preserve formulas during spreadsheet to PDF conversion?",
        answer:
          "Formulas are evaluated to their current values and the rendered output is preserved exactly as it appears in your spreadsheet.",
      },
    ],
  },
  {
    slug: "convert-files-online",
    title: "Convert Files Online Free | Document & Image Converter | Docsora",
    metaDescription:
      "Convert files online — PDFs, Word, Excel, PowerPoint, images and more. Free, browser-based, secure file converter.",
    h1: "Convert Files Online",
    intro:
      "One browser-based converter for every major file format — documents, spreadsheets, presentations, images and email.",
    keyword: "convert files online",
    acceptedFormats: "All supported formats",
    cardIcon: Files,
    cardLabel: "Convert Files Online",
    cardDescription:
      "One converter for every major document, spreadsheet, deck and image format.",
    longCopy:
      "Docsora is the complete online file converter for modern teams — handling PDF, Word, Excel, PowerPoint, image, and email formats in a single browser-based workspace. No installs, no signup, no compromise.",
    faq: [
      {
        question: "What file types does Docsora Convert support?",
        answer:
          "Docsora supports PDF, DOC, DOCX, ODT, TXT, HTML, XML, CSV, XLS, XLSX, ODS, PPT, PPTX, ODP, JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, and EML — one tool covers documents, spreadsheets, presentations, images, and email.",
      },
      {
        question: "Is browser-based file conversion secure?",
        answer:
          "Yes. All uploads run over end-to-end TLS encryption, files are automatically deleted after processing, and Docsora is aligned with GDPR and ISO 27001 controls.",
      },
    ],
  },
];

export const convertVariantBySlug = convertVariants.reduce<Record<string, ConvertVariantConfig>>(
  (acc, v) => {
    acc[v.slug] = v;
    return acc;
  },
  {},
);

export interface ConvertUploadIntent {
  headline: string;
  subheadline: string;
  formatBadges: string[];
  accept: string;
}

export function getConvertUploadIntent(
  variant?: ConvertVariantConfig,
): ConvertUploadIntent | undefined {
  if (!variant) return undefined;
  return {
    headline: variant.uploadHeadline ?? "Upload your file",
    subheadline: variant.uploadSubheadline ?? variant.intro,
    formatBadges:
      variant.uploadFormatBadges ??
      variant.acceptedFormats.split("·").map((s) => s.trim()),
    accept:
      variant.uploadAccept ??
      ".pdf,.doc,.docx,.odt,.txt,.html,.xls,.xlsx,.csv,.ods,.ppt,.pptx,.odp,.jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.eml",
  };
}