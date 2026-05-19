import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  FileImage,
  FileType,
  FileCode,
  Files,
} from "lucide-react";
import { Mail } from "lucide-react";

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
    slug: "html-to-pdf",
    title: "Convert HTML to PDF Online | Web Page to PDF | Docsora",
    metaDescription:
      "Convert HTML files and web pages into clean PDF documents online — preserve layout, styles and structure.",
    h1: "Convert HTML to PDF Online",
    intro: "Turn HTML files into clean, share-ready PDF documents — directly in your browser.",
    keyword: "html to pdf",
    acceptedFormats: "HTML · HTM",
    cardIcon: FileCode,
    cardLabel: "HTML to PDF",
    cardDescription: "Convert HTML files into clean, print-ready PDF documents.",
    longCopy:
      "Docsora's HTML to PDF converter renders HTML files into professional PDFs with styling, layout, and inline assets preserved — perfect for reports, invoices, and web-page archiving.",
    uploadHeadline: "Upload your HTML file",
    uploadAccept: ".html,.htm",
    faq: [
      { question: "Does the converter preserve CSS styling?", answer: "Yes. Inline and embedded CSS is rendered faithfully into the output PDF so the document matches your source layout." },
    ],
  },
  {
    slug: "txt-to-pdf",
    title: "Convert TXT to PDF Online | Text File to PDF | Docsora",
    metaDescription:
      "Convert plain text (TXT) files into PDF documents online — clean typography, fast, browser-based.",
    h1: "Convert TXT to PDF Online",
    intro: "Turn plain text files into clean, paginated PDF documents in seconds.",
    keyword: "txt to pdf",
    acceptedFormats: "TXT",
    cardIcon: FileType,
    cardLabel: "TXT to PDF",
    cardDescription: "Convert plain text files into clean paginated PDFs.",
    longCopy:
      "Docsora's TXT to PDF converter wraps plain text files into typographically clean PDFs with sensible margins, pagination, and monospace-friendly rendering — ideal for logs, notes, and code exports.",
    uploadHeadline: "Upload your text file",
    uploadAccept: ".txt",
    faq: [
      { question: "Will line breaks and indentation be preserved?", answer: "Yes — whitespace, line breaks, and indentation are preserved exactly as they appear in your source TXT file." },
    ],
  },
  {
    slug: "csv-to-pdf",
    title: "Convert CSV to PDF Online | Spreadsheet Export | Docsora",
    metaDescription:
      "Convert CSV files into clean tabular PDF documents online — preserve columns, rows and structure.",
    h1: "Convert CSV to PDF Online",
    intro: "Render CSV data into clean tabular PDFs — perfect for reporting and sharing.",
    keyword: "csv to pdf",
    acceptedFormats: "CSV",
    cardIcon: FileSpreadsheet,
    cardLabel: "CSV to PDF",
    cardDescription: "Render CSV data into clean tabular PDF documents.",
    longCopy:
      "Docsora's CSV to PDF converter renders comma-separated data as a clean, readable PDF table with sensible column widths, header detection, and consistent typography — built for finance exports, audits, and data hand-offs.",
    uploadHeadline: "Upload your CSV file",
    uploadAccept: ".csv",
    faq: [
      { question: "Are headers and column widths preserved?", answer: "Yes. The first row is treated as headers and column widths are auto-balanced for readable output." },
    ],
  },
  {
    slug: "odt-to-pdf",
    title: "Convert ODT to PDF Online | OpenDocument to PDF | Docsora",
    metaDescription:
      "Convert OpenDocument (ODT) text files into professional PDFs online — preserve fonts, layout and styling.",
    h1: "Convert ODT to PDF Online",
    intro: "Turn OpenDocument ODT files into print-perfect PDFs directly in your browser.",
    keyword: "odt to pdf",
    acceptedFormats: "ODT",
    cardIcon: FileText,
    cardLabel: "ODT to PDF",
    cardDescription: "Convert OpenDocument ODT files into professional PDFs.",
    longCopy:
      "Docsora's ODT to PDF converter renders OpenDocument text files into clean PDFs with fonts, headings, tables, and images preserved — a drop-in replacement for LibreOffice and OpenOffice exports.",
    uploadHeadline: "Upload your ODT file",
    uploadAccept: ".odt",
    faq: [
      { question: "Will fonts and headings be preserved?", answer: "Yes. Docsora preserves typography, headings, lists, tables, and inline styles from the source ODT." },
    ],
  },
  {
    slug: "xml-to-pdf",
    title: "Convert XML to PDF Online | Structured Data to PDF | Docsora",
    metaDescription:
      "Convert XML files into readable PDF documents online — clean structure, fast, browser-based.",
    h1: "Convert XML to PDF Online",
    intro: "Turn XML data into clean, human-readable PDF documents in seconds.",
    keyword: "xml to pdf",
    acceptedFormats: "XML",
    cardIcon: FileCode,
    cardLabel: "XML to PDF",
    cardDescription: "Render XML structured data as readable PDF documents.",
    longCopy:
      "Docsora's XML to PDF converter renders structured XML files into clean, indented, human-readable PDFs — perfect for archiving, sharing, and audit-friendly documentation of structured data exports.",
    uploadHeadline: "Upload your XML file",
    uploadAccept: ".xml",
    faq: [
      { question: "Will the XML structure stay readable?", answer: "Yes — indentation, hierarchy, and tag structure are preserved with monospace formatting and syntax-aware spacing." },
    ],
  },
  {
    slug: "pdf-to-excel",
    title: "Convert PDF to Excel Online | PDF to XLSX | Docsora",
    metaDescription:
      "Convert PDF tables and reports into editable Excel (XLSX) spreadsheets online — preserve rows, columns and data.",
    h1: "Convert PDF to Excel Online",
    intro: "Extract tables from any PDF into editable Excel spreadsheets — directly in your browser.",
    keyword: "pdf to excel",
    acceptedFormats: "PDF",
    cardIcon: FileSpreadsheet,
    cardLabel: "PDF to Excel",
    cardDescription: "Extract PDF tables into editable Excel (XLSX) spreadsheets.",
    longCopy:
      "Docsora's PDF to Excel converter detects tables inside any PDF and rebuilds them as editable XLSX spreadsheets — rows, columns, and numeric values preserved. Ideal for finance, reporting, and data extraction.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      { question: "Does it detect tables automatically?", answer: "Yes — Docsora auto-detects tabular regions in the PDF and rebuilds them as native Excel rows and columns." },
    ],
  },
  {
    slug: "pdf-to-odt",
    title: "Convert PDF to ODT Online | PDF to OpenDocument | Docsora",
    metaDescription:
      "Convert PDF documents into editable OpenDocument (ODT) files online — preserve fonts, structure and layout.",
    h1: "Convert PDF to ODT Online",
    intro: "Turn PDFs into editable OpenDocument text files — perfect for LibreOffice and OpenOffice.",
    keyword: "pdf to odt",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "PDF to ODT",
    cardDescription: "Convert PDFs into editable OpenDocument ODT files.",
    longCopy:
      "Docsora's PDF to ODT converter rebuilds PDFs as editable OpenDocument text files with formatting, fonts, and tables preserved — a drop-in workflow for LibreOffice and OpenOffice users.",
    uploadHeadline: "Upload your PDF",
    uploadAccept: ".pdf",
    faq: [
      { question: "Is the output fully editable in LibreOffice?", answer: "Yes. The generated ODT is fully editable in LibreOffice, OpenOffice, and any OpenDocument-compatible editor." },
    ],
  },
  {
    slug: "jpg-to-png",
    title: "Convert JPG to PNG Online | Image Format Converter | Docsora",
    metaDescription:
      "Convert JPG and JPEG images into PNG format online — lossless conversion, browser-based, free.",
    h1: "Convert JPG to PNG Online",
    intro: "Turn JPG photos into lossless PNG images — directly in your browser.",
    keyword: "jpg to png",
    acceptedFormats: "JPG · JPEG",
    cardIcon: ImageIcon,
    cardLabel: "JPG to PNG",
    cardDescription: "Convert JPG photos into lossless PNG images instantly.",
    longCopy:
      "Docsora's JPG to PNG converter transforms JPG and JPEG images into lossless PNG files — ideal when you need an alpha-capable format, sharper edges, or compatibility with design tools.",
    uploadHeadline: "Upload your JPG images",
    uploadAccept: ".jpg,.jpeg",
    faq: [
      { question: "Is JPG to PNG conversion lossless?", answer: "The PNG output is lossless, but the input JPG may already contain compression artefacts — PNG preserves the image exactly as decoded." },
    ],
  },
  {
    slug: "png-to-jpg",
    title: "Convert PNG to JPG Online | Image Compression Converter | Docsora",
    metaDescription:
      "Convert PNG images into JPG format online — smaller file size, faster sharing, browser-based.",
    h1: "Convert PNG to JPG Online",
    intro: "Turn PNG graphics into compact JPG images — perfect for web sharing and email.",
    keyword: "png to jpg",
    acceptedFormats: "PNG",
    cardIcon: ImageIcon,
    cardLabel: "PNG to JPG",
    cardDescription: "Convert PNG graphics into compact JPG images for sharing.",
    longCopy:
      "Docsora's PNG to JPG converter compresses lossless PNG images into smaller JPG files — ideal for web delivery, email attachments, and storage-friendly photo archives.",
    uploadHeadline: "Upload your PNG images",
    uploadAccept: ".png",
    faq: [
      { question: "How is transparency handled?", answer: "Transparent PNG areas are flattened onto a white background in the JPG output, since JPG does not support alpha channels." },
    ],
  },
  {
    slug: "csv-to-xlsx",
    title: "Convert CSV to XLSX Online | CSV to Excel Converter | Docsora",
    metaDescription:
      "Convert CSV files into Excel (XLSX) spreadsheets online — preserve columns, rows and data types.",
    h1: "Convert CSV to XLSX Online",
    intro: "Turn CSV files into native Excel spreadsheets — directly in your browser.",
    keyword: "csv to xlsx",
    acceptedFormats: "CSV",
    cardIcon: FileSpreadsheet,
    cardLabel: "CSV to XLSX",
    cardDescription: "Convert CSV files into native Excel (XLSX) spreadsheets.",
    longCopy:
      "Docsora's CSV to XLSX converter wraps comma-separated data into a fully native Excel workbook with typed columns, header detection, and clean formatting — ready for analysis in Excel, Numbers, or Google Sheets.",
    uploadHeadline: "Upload your CSV file",
    uploadAccept: ".csv",
    faq: [
      { question: "Are number and date types detected?", answer: "Yes. Docsora auto-detects numeric and date-like columns and writes them with the correct Excel cell types." },
    ],
  },
  {
    slug: "xlsx-to-csv",
    title: "Convert XLSX to CSV Online | Excel to CSV Converter | Docsora",
    metaDescription:
      "Convert Excel (XLSX, XLS) spreadsheets into CSV files online — clean, browser-based, free.",
    h1: "Convert XLSX to CSV Online",
    intro: "Export Excel spreadsheets as clean CSV files — directly in your browser.",
    keyword: "xlsx to csv",
    acceptedFormats: "XLS · XLSX",
    cardIcon: FileSpreadsheet,
    cardLabel: "XLSX to CSV",
    cardDescription: "Export Excel spreadsheets as clean CSV files instantly.",
    longCopy:
      "Docsora's XLSX to CSV converter exports Excel workbooks as clean CSV files — formulas are evaluated, encoding is UTF-8, and delimiters are standard, so the output drops cleanly into any data pipeline.",
    uploadHeadline: "Upload your Excel file",
    uploadAccept: ".xls,.xlsx",
    faq: [
      { question: "How are multi-sheet workbooks handled?", answer: "Each sheet is exported as a separate CSV file, bundled for a single download." },
    ],
  },
  {
    slug: "docx-to-odt",
    title: "Convert DOCX to ODT Online | Word to OpenDocument | Docsora",
    metaDescription:
      "Convert Word (DOC, DOCX) files into OpenDocument (ODT) format online — preserve formatting and structure.",
    h1: "Convert DOCX to ODT Online",
    intro: "Turn Word documents into OpenDocument ODT files — perfect for LibreOffice workflows.",
    keyword: "docx to odt",
    acceptedFormats: "DOC · DOCX",
    cardIcon: FileText,
    cardLabel: "DOCX to ODT",
    cardDescription: "Convert Word DOC/DOCX files into OpenDocument ODT format.",
    longCopy:
      "Docsora's DOCX to ODT converter migrates Microsoft Word documents into OpenDocument ODT files with formatting, headings, lists, and tables preserved — ideal for open-source and LibreOffice workflows.",
    uploadHeadline: "Upload your Word document",
    uploadAccept: ".doc,.docx",
    faq: [
      { question: "Is formatting preserved?", answer: "Yes. Headings, lists, tables, fonts, and inline styles are mapped cleanly into the ODT output." },
    ],
  },
  {
    slug: "odt-to-docx",
    title: "Convert ODT to DOCX Online | OpenDocument to Word | Docsora",
    metaDescription:
      "Convert OpenDocument (ODT) files into Microsoft Word (DOCX) format online — preserve formatting and styling.",
    h1: "Convert ODT to DOCX Online",
    intro: "Turn OpenDocument ODT files into Microsoft Word DOCX — directly in your browser.",
    keyword: "odt to docx",
    acceptedFormats: "ODT",
    cardIcon: FileText,
    cardLabel: "ODT to DOCX",
    cardDescription: "Convert OpenDocument ODT files into Microsoft Word DOCX.",
    longCopy:
      "Docsora's ODT to DOCX converter migrates OpenDocument text files into native Microsoft Word DOCX format with formatting, structure, and inline media preserved — ideal for moving between LibreOffice and Word workflows.",
    uploadHeadline: "Upload your ODT file",
    uploadAccept: ".odt",
    faq: [
      { question: "Will the DOCX open natively in Word?", answer: "Yes. The output is standards-compliant DOCX that opens natively in Microsoft Word, Google Docs, and any DOCX-compatible editor." },
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

// ---------------------------------------------------------------------------
// Long-tail format-pair variants (compact factory) — every supported
// input/output conversion gets its own landing page for SEO + LLM GEO.
// ---------------------------------------------------------------------------

type IconKey =
  | "doc" | "sheet" | "slides" | "image" | "imageAlt" | "code" | "type" | "mail" | "files";

const iconMap: Record<IconKey, LucideIcon> = {
  doc: FileText,
  sheet: FileSpreadsheet,
  slides: Presentation,
  image: ImageIcon,
  imageAlt: FileImage,
  code: FileCode,
  type: FileType,
  mail: Mail,
  files: Files,
};

interface PairSpec {
  slug: string;
  from: string;
  to: string;
  icon: IconKey;
  accept: string;
  uploadLabel: string;
  acceptedFormats: string;
  longCopy: string;
  faqQ: string;
  faqA: string;
}

const buildPair = (s: PairSpec): ConvertVariantConfig => ({
  slug: s.slug,
  title: `Convert ${s.from} to ${s.to} Online | ${s.from} to ${s.to} Converter | Docsora`,
  metaDescription: `Convert ${s.from} files to ${s.to} online instantly — free, secure, browser-based with Docsora. Preserve formatting and structure.`,
  h1: `Convert ${s.from} to ${s.to} Online`,
  intro: `Turn ${s.from} files into ${s.to} format directly in your browser — no installs, no signup.`,
  keyword: `${s.from.toLowerCase()} to ${s.to.toLowerCase()}`,
  acceptedFormats: s.acceptedFormats,
  cardIcon: iconMap[s.icon],
  cardLabel: `${s.from} to ${s.to}`,
  cardDescription: `Convert ${s.from} files into ${s.to} format — secure, browser-based, instant.`,
  longCopy: s.longCopy,
  uploadHeadline: `Upload your ${s.uploadLabel}`,
  uploadAccept: s.accept,
  faq: [{ question: s.faqQ, answer: s.faqA }],
});

const pairVariants: ConvertVariantConfig[] = [
  // PDF → other formats
  buildPair({ slug: "pdf-to-pdfa", from: "PDF", to: "PDF/A", icon: "doc", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to PDF/A converter produces archive-grade PDFs that meet ISO 19005 long-term preservation standards — fonts embedded, color profiles normalized, metadata locked. Built for legal, healthcare and government archival workflows.", faqQ: "Is PDF/A suitable for long-term archiving?", faqA: "Yes. PDF/A is an ISO-standardized format designed specifically for long-term document preservation with embedded fonts and self-contained rendering." }),
  buildPair({ slug: "pdf-to-doc", from: "PDF", to: "DOC", icon: "doc", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to DOC converter rebuilds PDFs as legacy Microsoft Word DOC files — compatible with older Word versions and enterprise systems that haven't migrated to DOCX.", faqQ: "Why convert to DOC instead of DOCX?", faqA: "DOC is the legacy Word format, supported by older Microsoft Word installations and some enterprise document systems that haven't adopted the modern DOCX standard." }),
  buildPair({ slug: "pdf-to-docx", from: "PDF", to: "DOCX", icon: "doc", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to DOCX converter rebuilds PDFs as fully editable modern Word documents — formatting, headings, tables, and images preserved. The DOCX output opens natively in Word, Google Docs, and Pages.", faqQ: "Will the DOCX preserve PDF formatting?", faqA: "Yes. Fonts, headings, tables, images, and layout are preserved in the DOCX so the output closely matches the source PDF." }),
  buildPair({ slug: "pdf-to-html", from: "PDF", to: "HTML", icon: "code", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to HTML converter produces clean semantic HTML output from your PDF — headings, paragraphs, lists, and image placement preserved for web publishing and accessibility workflows.", faqQ: "Is the HTML output semantic?", faqA: "Yes. Docsora generates structured semantic HTML with proper headings, paragraphs, and lists — ideal for accessibility and search indexing." }),
  buildPair({ slug: "pdf-to-ppt", from: "PDF", to: "PPT", icon: "slides", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to PPT converter rebuilds PDFs as legacy PowerPoint PPT presentations — pages become slides, text and images placed faithfully, compatible with older PowerPoint versions.", faqQ: "Will the PPT be editable in PowerPoint?", faqA: "Yes. Slides, text, and images become editable inside PowerPoint and any PPT-compatible presentation editor." }),
  buildPair({ slug: "pdf-to-pptx", from: "PDF", to: "PPTX", icon: "slides", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to PPTX converter rebuilds PDFs as modern editable PowerPoint decks — pages become slides, text becomes editable, and images, charts, and layout retain their original structure.", faqQ: "Will the PPTX be editable?", faqA: "Yes. Text becomes editable text boxes, images are placed on slides, and layout is preserved so you can continue editing in PowerPoint." }),
  buildPair({ slug: "pdf-to-odp", from: "PDF", to: "ODP", icon: "slides", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to ODP converter rebuilds PDFs as editable OpenDocument presentations — perfect for LibreOffice Impress and other OpenDocument-compatible editors.", faqQ: "Is the ODP editable in LibreOffice?", faqA: "Yes. The generated ODP opens natively in LibreOffice Impress and any OpenDocument-compatible presentation editor." }),
  buildPair({ slug: "pdf-to-xml", from: "PDF", to: "XML", icon: "code", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to XML converter extracts structured content from your PDF as clean XML — perfect for data pipelines, archival systems, and downstream processing.", faqQ: "What structure is preserved in the XML?", faqA: "Document hierarchy, headings, paragraphs, lists, and table structure are exported as nested XML elements ready for data processing." }),
  buildPair({ slug: "pdf-to-gif", from: "PDF", to: "GIF", icon: "image", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to GIF converter exports PDF pages as GIF images — ideal for embedding in chat, slack threads, and quick visual previews.", faqQ: "Does each page become one GIF?", faqA: "Yes. Each PDF page is exported as a separate GIF image, bundled together for a single download." }),
  buildPair({ slug: "pdf-to-tiff", from: "PDF", to: "TIFF", icon: "imageAlt", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to TIFF converter exports PDF pages as high-quality TIFF images — preferred for archival, print production, and document imaging workflows.", faqQ: "Is TIFF suitable for archival?", faqA: "Yes. TIFF preserves image quality losslessly and is widely used in archival, medical imaging, and print production workflows." }),
  buildPair({ slug: "pdf-to-bmp", from: "PDF", to: "BMP", icon: "image", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to BMP converter exports PDF pages as uncompressed bitmap images — useful for legacy imaging systems and pixel-perfect rendering needs.", faqQ: "Why use BMP over JPG or PNG?", faqA: "BMP is uncompressed and pixel-perfect — useful for legacy software and workflows that require raw bitmap data without compression artefacts." }),
  buildPair({ slug: "pdf-to-webp", from: "PDF", to: "WEBP", icon: "image", accept: ".pdf", uploadLabel: "PDF", acceptedFormats: "PDF", longCopy: "Docsora's PDF to WEBP converter exports PDF pages as modern WEBP images — dramatically smaller than JPG or PNG with no visible quality loss. Ideal for web embedding and Core Web Vitals.", faqQ: "Why convert PDF to WEBP?", faqA: "WEBP delivers the same visual quality as JPG at 25–35% smaller file size — better for Core Web Vitals and faster page loads." }),

  // → PDF (input format-specific landing pages)
  buildPair({ slug: "jpeg-to-pdf", from: "JPEG", to: "PDF", icon: "image", accept: ".jpg,.jpeg", uploadLabel: "JPEG images", acceptedFormats: "JPEG", longCopy: "Docsora's JPEG to PDF converter packages one or many JPEG photos into a clean multi-page PDF — perfect for scanned receipts, evidence, and visual archives.", faqQ: "Can I combine multiple JPEGs into one PDF?", faqA: "Yes. Upload multiple JPEGs and Docsora merges them into a single multi-page PDF in the order you provided." }),
  buildPair({ slug: "gif-to-pdf", from: "GIF", to: "PDF", icon: "image", accept: ".gif", uploadLabel: "GIF images", acceptedFormats: "GIF", longCopy: "Docsora's GIF to PDF converter renders GIF images — static or animated — into clean PDF documents. The first frame of animated GIFs is used for the PDF rendering.", faqQ: "How are animated GIFs handled?", faqA: "Animated GIFs are flattened to the first frame in the output PDF, since PDF does not natively support animation." }),
  buildPair({ slug: "bmp-to-pdf", from: "BMP", to: "PDF", icon: "image", accept: ".bmp", uploadLabel: "BMP images", acceptedFormats: "BMP", longCopy: "Docsora's BMP to PDF converter wraps uncompressed bitmap images into clean PDF documents — perfect for archiving legacy graphics, scans, and pixel-perfect imagery.", faqQ: "Is image quality preserved?", faqA: "Yes. BMP is a lossless format and Docsora embeds it into the PDF without re-compression." }),
  buildPair({ slug: "tiff-to-pdf", from: "TIFF", to: "PDF", icon: "imageAlt", accept: ".tif,.tiff", uploadLabel: "TIFF images", acceptedFormats: "TIFF · TIF", longCopy: "Docsora's TIFF to PDF converter wraps high-resolution TIFF scans into clean PDF documents — ideal for archival, medical imaging, and document scanning workflows.", faqQ: "Are multi-page TIFFs supported?", faqA: "Yes. Multi-page TIFF files are converted into multi-page PDFs preserving page order and resolution." }),
  buildPair({ slug: "webp-to-pdf", from: "WEBP", to: "PDF", icon: "image", accept: ".webp", uploadLabel: "WEBP images", acceptedFormats: "WEBP", longCopy: "Docsora's WEBP to PDF converter wraps modern WEBP images into clean PDF documents — preserving color fidelity and transparency where possible.", faqQ: "Is transparency preserved?", faqA: "WEBP alpha channels are flattened onto a clean PDF background while preserving sharp edges and color depth." }),
  buildPair({ slug: "doc-to-pdf", from: "DOC", to: "PDF", icon: "doc", accept: ".doc", uploadLabel: "DOC file", acceptedFormats: "DOC", longCopy: "Docsora's DOC to PDF converter renders legacy Microsoft Word DOC files into print-perfect PDFs — fonts, layout, headings, and tables preserved exactly.", faqQ: "Does it support legacy Word files?", faqA: "Yes. Docsora handles legacy DOC files alongside modern DOCX with consistent output quality." }),
  buildPair({ slug: "docx-to-pdf", from: "DOCX", to: "PDF", icon: "doc", accept: ".docx", uploadLabel: "DOCX file", acceptedFormats: "DOCX", longCopy: "Docsora's DOCX to PDF converter renders modern Microsoft Word documents into professional PDFs — fonts, headings, tables, images, and styling preserved pixel-accurate.", faqQ: "Will the PDF match the Word document?", faqA: "Yes. Fonts, layout, headings, tables, and images are preserved so the output PDF closely mirrors the source DOCX." }),
  buildPair({ slug: "ods-to-pdf", from: "ODS", to: "PDF", icon: "sheet", accept: ".ods", uploadLabel: "ODS spreadsheet", acceptedFormats: "ODS", longCopy: "Docsora's ODS to PDF converter renders OpenDocument spreadsheets into clean PDFs with multi-sheet support, formula evaluation, and faithful formatting — ideal for LibreOffice Calc workflows.", faqQ: "Are multi-sheet ODS files supported?", faqA: "Yes — every sheet is paginated cleanly into the output PDF preserving structure and formatting." }),
  buildPair({ slug: "odp-to-pdf", from: "ODP", to: "PDF", icon: "slides", accept: ".odp", uploadLabel: "ODP presentation", acceptedFormats: "ODP", longCopy: "Docsora's ODP to PDF converter renders OpenDocument presentations into pixel-accurate PDFs — slide layouts, fonts, embedded media, and master templates preserved. Built for LibreOffice Impress decks.", faqQ: "Will slide quality be preserved?", faqA: "Yes. Slide layouts, fonts, and embedded media are preserved so output PDFs look identical to your ODP deck." }),
  buildPair({ slug: "eml-to-pdf", from: "EML", to: "PDF", icon: "mail", accept: ".eml", uploadLabel: "EML email files", acceptedFormats: "EML", longCopy: "Docsora's EML to PDF converter archives email files as PDFs with headers, body content, timestamps, and attachment metadata preserved — built for legal discovery, compliance archives, and audit trails.", faqQ: "Can I convert email files for compliance?", faqA: "Yes. Docsora preserves headers, body content, timestamps, and attachment metadata in the PDF output — suitable for legal and compliance archives." }),
];

convertVariants.push(...pairVariants);

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