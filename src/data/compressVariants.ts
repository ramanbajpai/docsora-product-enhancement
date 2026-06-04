import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Mail,
  FileImage,
  FileType,
  Briefcase,
  Megaphone,
  Database,
  Mails,
  FileArchive,
  Minimize2,
} from "lucide-react";

export interface CompressVariantConfig {
  slug: string; // route path (without leading slash)
  title: string; // SEO <title>
  metaDescription: string;
  h1: string;
  intro: string;
  keyword: string;
  acceptedFormats: string; // human readable
  cardIcon: LucideIcon;
  cardLabel: string; // short label for cards/links
  cardDescription: string; // semantic description used in internal links
  longCopy: string; // 2-3 sentence semantic paragraph below upload
  faq: { question: string; answer: string }[];
  // Upload hero overrides (when omitted, generic /compress hero is used)
  uploadHeadline?: string; // e.g. "Upload your Excel files"
  uploadSubheadline?: string;
  uploadFormatBadges?: string[]; // chips shown in supported formats list
  uploadAccept?: string; // file input accept attribute
  // Optional use-case bullets specific to the variant (rendered above FAQ)
  useCases?: string[];
}

/**
 * Variant landing pages that all reuse the /compress upload experience
 * but ship unique meta, H1, copy and FAQ for long-tail SEO coverage.
 * Each page internally links back to /compress (the authority hub).
 */
export const compressVariants: CompressVariantConfig[] = [
  {
    slug: "reduce-file-size",
    title: "Reduce File Size Online - Free File Size Reducer | Docsora",
    metaDescription:
      "Reduce file size online for PDFs, images, presentations, spreadsheets, and documents. Free, browser-based, no quality loss - no installs.",
    h1: "Reduce File Size Online",
    intro:
      "Reduce the size of any file directly in your browser - without losing quality or formatting. Secure, browser-based, instant.",
    keyword: "reduce file size",
    acceptedFormats: "All major formats",
    cardIcon: Minimize2,
    cardLabel: "Reduce File Size",
    cardDescription:
      "Reduce the size of any file in your browser - no installs, no quality loss.",
    longCopy:
      "Docsora's online file size reducer compresses PDFs, images, presentations, spreadsheets, and documents with format-aware optimization. Reduce file size instantly for email, web upload, cloud storage, and sharing - without installing software or sacrificing quality.",
    faq: [
      {
        question: "How do I reduce file size online?",
        answer:
          "Drop any file into the upload area above. Docsora reduces file size directly in your browser using format-aware compression - handling PDFs, images, Word, Excel, and PowerPoint files without any installation or signup.",
      },
      {
        question: "Can I reduce file size without losing quality?",
        answer:
          "Yes. Docsora's lossless and visually-lossless modes shrink files while keeping every detail intact - ideal for compressing files for email, web, and client delivery.",
      },
    ],
  },
  {
    slug: "reduce-pdf-size",
    title: "Reduce PDF Size Online - Free PDF Size Reducer | Docsora",
    metaDescription:
      "Reduce PDF size online for email, sharing, and uploads. Free browser-based PDF size reducer - no quality loss, no installs, GDPR aligned.",
    h1: "Reduce PDF Size Online",
    intro:
      "Reduce large PDF documents for email, sharing, and uploads while preserving readability and formatting.",
    keyword: "reduce pdf size",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Reduce PDF Size",
    cardDescription:
      "Shrink PDFs for email and sharing - formatting and clarity preserved.",
    longCopy:
      "Docsora's online PDF size reducer compresses PDF documents by 30–80% while keeping text vector-sharp and images print-ready. Reduce PDF size for Gmail and Outlook attachments, e-signature workflows, and client deliverables - directly in your browser.",
    faq: [
      {
        question: "How do I reduce PDF size for email?",
        answer:
          "Upload your PDF and choose a mode — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction). Docsora reduces PDF size to fit Gmail (25MB) and Outlook (10–20MB) limits - without splitting, uploading to a cloud link, or losing quality.",
      },
      {
        question: "Can I reduce PDF size without losing quality?",
        answer:
          "Yes. Docsora's PDF size reducer uses visually-lossless compression that keeps text crisp and images sharp while typically reducing file size by 30–80%.",
      },
    ],
  },
  {
    slug: "reduce-image-size",
    title: "Reduce Image Size Online - Free Image Size Reducer | Docsora",
    metaDescription:
      "Reduce image size online for websites, social media, and storage. Shrink JPG, PNG, and WEBP files without losing quality - free and browser-based.",
    h1: "Reduce Image Size Online",
    intro:
      "Shrink JPG, PNG, and WEBP images for websites, social media, and storage optimization - no visible quality loss.",
    keyword: "reduce image size",
    acceptedFormats: "JPG · PNG · WEBP · GIF · BMP · TIFF",
    cardIcon: ImageIcon,
    cardLabel: "Reduce Image Size",
    cardDescription:
      "Shrink JPG, PNG, and WEBP files for web, social, and storage.",
    longCopy:
      "Docsora's image size reducer uses perceptual encoding to cut JPG, PNG, and WEBP file size by up to 80% with no visible quality loss. Reduce image size for websites, blog posts, social uploads, marketing assets, and email - directly in the browser.",
    faq: [
      {
        question: "How do I reduce image size for a website?",
        answer:
          "Upload your images and choose a mode — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction). Balanced is ideal for websites: it optimizes for fast loading and strong Core Web Vitals scores while keeping visual quality intact.",
      },
      {
        question: "Can I reduce image size in bulk?",
        answer:
          "Yes - drop multiple images at once and Docsora compresses each one independently, then bundles them for a single optimized download.",
      },
    ],
  },
  {
    slug: "reduce-powerpoint-file-size",
    title: "Reduce PowerPoint File Size - Free PPTX Size Reducer | Docsora",
    metaDescription:
      "Reduce PowerPoint file size online. Shrink PPTX decks for email, sharing, and client delivery without losing slide quality - free, browser-based.",
    h1: "Reduce PowerPoint File Size",
    intro:
      "Optimize presentations for smoother sharing, uploads, and client delivery - every slide preserved.",
    keyword: "reduce powerpoint file size",
    acceptedFormats: "PPT · PPTX · ODP",
    cardIcon: Presentation,
    cardLabel: "Reduce PowerPoint Size",
    cardDescription:
      "Slim down decks for email and sharing - slides, animations, and fonts intact.",
    longCopy:
      "Docsora's PowerPoint size reducer optimizes embedded images, screenshots, and video inside PPT, PPTX, and ODP decks. Reduce PowerPoint file size for sales decks, investor presentations, and training material - without changing a single slide.",
    faq: [
      {
        question: "How do I reduce PowerPoint file size for email?",
        answer:
          "Upload your PPTX and Docsora compresses embedded media so the deck fits Gmail and Outlook limits - slides, animations, transitions, and fonts remain perfectly intact.",
      },
    ],
  },
  {
    slug: "reduce-excel-file-size",
    title: "Reduce Excel File Size Online - Free XLSX Size Reducer | Docsora",
    metaDescription:
      "Reduce Excel file size online without breaking formulas or sheet structure. Free XLSX size reducer for finance and ops teams - browser-based.",
    h1: "Reduce Excel File Size",
    intro:
      "Compress spreadsheets and exports without breaking formulas or sheet structure.",
    keyword: "reduce excel file size",
    acceptedFormats: "XLS · XLSX · CSV · ODS",
    cardIcon: FileSpreadsheet,
    cardLabel: "Reduce Excel Size",
    cardDescription:
      "Shrink spreadsheets without breaking formulas, pivots, or references.",
    longCopy:
      "Docsora's Excel size reducer rebuilds XLSX storage, clears redundant cache, and optimizes embedded objects - typically reducing Excel file size 30–80%. Every formula, named range, and pivot table remains fully intact.",
    faq: [
      {
        question: "Will reducing Excel file size break my formulas?",
        answer:
          "No. Docsora only optimizes file storage and embedded media - formulas, named ranges, and pivot tables remain intact and recalculate exactly as before.",
      },
    ],
  },
  {
    slug: "compress-pdf-online",
    title: "Compress PDF Online - Free Browser-Based PDF Compressor | Docsora",
    metaDescription:
      "Compress PDF online for free. Browser-based PDF compressor - no installs, no signup. Reduce PDF size for email and sharing with no quality loss.",
    h1: "Compress PDF Online",
    intro:
      "Compress PDF files in the browser - directly in your browser, with end-to-end encryption.",
    keyword: "compress pdf online",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Compress PDF Online",
    cardDescription:
      "Browser-based PDF compressor - no installs, no signup, no quality loss.",
    longCopy:
      "Docsora is a browser-based PDF compressor that runs entirely in your browser. Compress PDF files instantly for email attachments, web uploads, and document sharing - secure, GDPR-aligned, and engineered for premium document workflows.",
    faq: [
      {
        question: "Is Docsora a free online PDF compressor?",
        answer:
          "Yes - free, browser-based, no signup, no installs. Upgrade to Pro for batch compression, larger files, and advanced quality controls.",
      },
    ],
  },
  {
    slug: "free-online-file-compressor",
    title: "Free Online File Compressor - No Installs, No Signup | Docsora",
    metaDescription:
      "Free online file compressor. Compress PDFs, images, Word, Excel, and PowerPoint in your browser - no installs, no signup, encrypted end-to-end.",
    h1: "Free Online File Compressor",
    intro:
      "Modern browser-based file compression for every major format - no software, no signup, no compromise.",
    keyword: "free online file compressor",
    acceptedFormats: "All major formats",
    cardIcon: FileType,
    cardLabel: "Free Online File Compressor",
    cardDescription:
      "Modern browser-based compression for every major file format.",
    longCopy:
      "Docsora is a browser-based file compressor built for modern teams. Compress PDFs, images, Word, Excel, and PowerPoint files in your browser - encrypted in transit, automatically deleted after processing, no signup required.",
    faq: [
      {
        question: "Is this file compressor really free?",
        answer:
          "Yes - completely free for all common file types and standard sizes, with no account required. Pro plans add batch compression, larger file limits, and advanced controls.",
      },
    ],
  },
  {
    slug: "compress-pdf",
    title: "Compress PDF Online - Free PDF Compressor | Docsora",
    metaDescription:
      "Compress PDF files online for free without losing quality. Reduce PDF size for email, web upload, and sharing. Browser-based, secure, no installation required.",
    h1: "Compress PDF Online",
    intro:
      "Reduce PDF file size in your browser without losing quality. Secure, browser-based, and instant - no installation, no account.",
    keyword: "compress pdf",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Compress PDF",
    cardDescription:
      "Shrink PDF documents for email, web, and sharing - no quality loss.",
    longCopy:
      "Docsora's online PDF compressor reduces file size by 30–80% while keeping text crisp, images sharp, and layouts identical. Compress PDFs for email attachments, web uploads, e-signature workflows, and client deliverables - directly in your browser with end-to-end encryption.",
    faq: [
      {
        question: "How do I compress a PDF file online?",
        answer:
          "Drop your PDF into the upload area above. Docsora compresses the file in your browser using intelligent PDF optimization - re-sampling embedded images, removing redundant metadata, and streamlining fonts - then returns a smaller download in seconds. No software, plugins, or account required.",
      },
      {
        question: "Can I compress a PDF without losing quality?",
        answer:
          "Yes. Choose 'Preserve Quality' (30% reduction) for visually identical output, 'Balanced' (50% compression) for the smallest file with no perceptible quality loss, or 'Maximum' (80% reduction) for delivery-only files. Docsora applies format-aware compression that keeps text vector-sharp and images print-ready.",
      },
      {
        question: "How do I reduce PDF size for email attachments?",
        answer:
          "Most inboxes (Gmail, Outlook, Apple Mail) cap attachments at 25MB. Upload your PDF and pick the mode that fits — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction) - perfect for sending contracts, invoices, pitch decks, and legal PDFs without splitting.",
      },
      {
        question: "Is Docsora's online PDF compressor free?",
        answer:
          "Yes. Docsora offers free browser-based PDF compression with no signup. Upgrade to Pro for larger files, batch compression, and advanced quality controls.",
      },
    ],
  },
  {
    slug: "compress-jpg",
    title: "Compress JPG Online - Free JPEG Image Compressor | Docsora",
    metaDescription:
      "Compress JPG and JPEG images online without losing quality. Reduce photo size for websites, email, and social - free, fast, browser-based.",
    h1: "Compress JPG Images Online",
    intro:
      "Shrink JPG and JPEG files in seconds while keeping every photo sharp. Browser-based image compressor - no installs, no signup.",
    keyword: "compress jpg",
    acceptedFormats: "JPG · JPEG",
    cardIcon: ImageIcon,
    cardLabel: "Compress JPG",
    cardDescription:
      "Optimize JPG and JPEG photos for web, social, and email attachments.",
    longCopy:
      "Docsora's JPG compressor uses perceptual encoding to reduce image weight by up to 80% with no visible quality loss. Compress photos for websites, blog posts, social media uploads, marketing assets, and email - directly in the browser, with files automatically deleted after processing.",
    faq: [
      {
        question: "How do I compress a JPG file online?",
        answer:
          "Drag your JPG into the upload zone above. Docsora analyzes the image, applies perceptual compression, and returns a smaller version that looks identical to the original - ideal for web pages, social posts, and email.",
      },
      {
        question: "Will compression reduce my photo quality?",
        answer:
          "Not visibly. Docsora uses intelligent JPEG optimization that targets redundant color data the eye can't see, so photos stay crisp and color-accurate at a fraction of the file size.",
      },
      {
        question: "Can I compress multiple JPGs at once?",
        answer:
          "Yes - drop a folder or select multiple JPG files to compress in a single batch. Each image is optimized independently and downloaded as a clean bundle.",
      },
    ],
  },
  {
    slug: "compress-png",
    title: "Compress PNG Online - Free PNG Image Compressor | Docsora",
    metaDescription:
      "Compress PNG images online without losing quality or transparency. Reduce PNG file size for websites, apps, and design - free and browser-based.",
    h1: "Compress PNG Images Online",
    intro:
      "Reduce PNG file size while preserving transparency and crisp edges. Browser-based PNG compressor - built for designers and product teams.",
    keyword: "compress png",
    acceptedFormats: "PNG",
    cardIcon: FileImage,
    cardLabel: "Compress PNG",
    cardDescription:
      "Shrink PNG files with full transparency support for web and design.",
    longCopy:
      "Docsora's PNG compressor uses lossless palette optimization and smart quantization to cut PNG file size by 30–80% - without breaking transparency, alpha channels, or sharp graphic edges. Ideal for UI assets, logos, screenshots, marketing visuals, and website graphics.",
    faq: [
      {
        question: "Does PNG compression preserve transparency?",
        answer:
          "Yes. Docsora keeps alpha channels and transparent backgrounds fully intact while reducing file size - essential for logos, UI assets, and overlay graphics.",
      },
      {
        question: "How do I reduce PNG file size for a website?",
        answer:
          "Upload your PNG, pick a compression mode, and Docsora optimizes color palettes and pixel data to dramatically reduce weight - improving Core Web Vitals and page load times.",
      },
    ],
  },
  {
    slug: "compress-word-document",
    title: "Compress Word Documents Online - Free DOCX Compressor | Docsora",
    metaDescription:
      "Compress Word documents (DOC, DOCX) online without losing formatting. Reduce DOCX file size for email and sharing - free, browser-based, secure.",
    h1: "Compress Word Documents Online",
    intro:
      "Reduce DOC and DOCX file size while keeping every heading, image, and table perfectly intact.",
    keyword: "compress word documents",
    acceptedFormats: "DOC · DOCX · ODT",
    cardIcon: FileText,
    cardLabel: "Compress Word",
    cardDescription:
      "Shrink DOC and DOCX files for email and collaboration - formatting preserved.",
    longCopy:
      "Docsora's Word document compressor optimizes embedded images, fonts, and revision data inside DOC, DOCX, and ODT files - reducing size by up to 80% with zero formatting changes. Send proposals, reports, and contracts faster without hitting inbox limits.",
    faq: [
      {
        question: "How do I compress a Word document?",
        answer:
          "Upload your DOC or DOCX file above. Docsora optimizes embedded media and document structure, then returns a smaller file with identical formatting, fonts, and layout.",
      },
      {
        question: "Will compressing change my Word document's formatting?",
        answer:
          "No. Headings, tables, images, comments, and tracked changes all remain intact - Docsora only optimizes how the file is stored, not how it looks.",
      },
    ],
  },
  {
    slug: "compress-word-documents",
    title: "Compress Word Documents Online - Free DOC & DOCX Compressor | Docsora",
    metaDescription:
      "Compress Word documents online for free. Reduce DOC and DOCX file size for email, sharing, and uploads - formatting, fonts, and tables preserved.",
    h1: "Compress Word Documents Online",
    intro:
      "Reduce DOC and DOCX file size while keeping every heading, image, and table perfectly intact.",
    keyword: "compress word documents",
    acceptedFormats: "DOC · DOCX · ODT",
    cardIcon: FileText,
    cardLabel: "Compress Word Documents",
    cardDescription:
      "Shrink DOC and DOCX files for email and collaboration - formatting preserved.",
    longCopy:
      "Docsora's Word document compressor optimizes embedded images, fonts, and revision data inside DOC, DOCX, and ODT files - reducing size by up to 80% with zero formatting changes. Send proposals, reports, and contracts faster without hitting inbox limits.",
    useCases: [
      "Compress contracts and proposals for email",
      "Reduce report and whitepaper file sizes",
      "Optimize Word attachments for Outlook",
      "Share long-form documents faster",
      "Compress client deliverables and briefs",
    ],
    faq: [
      {
        question: "How do I compress a Word document online?",
        answer:
          "Drop your DOC, DOCX, or ODT file into the upload area. Docsora compresses the document directly in your browser, optimizing embedded media and document structure while returning a smaller file with identical formatting, fonts, and layout.",
      },
      {
        question: "Will compressing change my Word document's formatting?",
        answer:
          "No. Headings, tables, images, comments, and tracked changes all remain intact - Docsora only optimizes how the file is stored, not how it looks.",
      },
    ],
  },
  {
    slug: "compress-powerpoint",
    title: "Compress PowerPoint Online - Free PPTX Compressor | Docsora",
    metaDescription:
      "Compress PowerPoint presentations (PPT, PPTX) online without losing quality. Reduce deck size for email, sharing, and screen presentations - free.",
    h1: "Compress PowerPoint Presentations",
    intro:
      "Make PPT and PPTX decks lighter for email, screen sharing, and uploads - without touching a single slide.",
    keyword: "compress powerpoint",
    acceptedFormats: "PPT · PPTX · ODP",
    cardIcon: Presentation,
    cardLabel: "Compress PowerPoint",
    cardDescription:
      "Shrink pitch decks and PPTX files for sharing without losing slide quality.",
    longCopy:
      "Docsora's PowerPoint compressor optimizes embedded images, videos, and media inside PPT, PPTX, and ODP files - perfect for sales decks, investor presentations, and client pitches that need to travel over email or live screen-shares.",
    faq: [
      {
        question: "How do I compress a PowerPoint file?",
        answer:
          "Drop your PPTX into the upload area. Docsora optimizes embedded images and media inside the deck while leaving slides, animations, transitions, and fonts perfectly intact.",
      },
      {
        question: "Why is my PowerPoint file so large?",
        answer:
          "Most large PPTX files are weighed down by uncompressed images, embedded video, and high-resolution screenshots. Docsora intelligently re-encodes these assets to dramatically reduce deck size without changing how a single slide looks.",
      },
    ],
  },
  {
    slug: "compress-excel-files",
    title: "Compress Excel Files Online Free | Reduce XLS & XLSX File Size | Docsora",
    metaDescription:
      "Compress Excel files online instantly with Docsora. Reduce XLS and XLSX spreadsheet file sizes without breaking formulas, sheets, formatting or structure. Secure browser-based Excel compression with no software installation required.",
    h1: "Compress Excel Files Online",
    intro:
      "Reduce XLS and XLSX spreadsheet file sizes instantly without losing formatting, formulas or workbook structure.",
    keyword: "compress excel files",
    acceptedFormats: "XLS · XLSX · CSV · ODS",
    cardIcon: FileSpreadsheet,
    cardLabel: "Compress Excel Files",
    cardDescription:
      "Reduce spreadsheet file size without breaking formulas or pivot tables.",
    longCopy:
      "Docsora's online Excel compressor reduces XLS, XLSX, CSV, and ODS file sizes by 30–80% - perfect for compressing spreadsheets for email attachments, optimizing Excel exports for sharing, and shrinking large reporting workbooks. Browser-based spreadsheet compression with no installs, formulas preserved.",
    useCases: [
      "Compress spreadsheets for email",
      "Reduce reporting file sizes",
      "Optimize financial exports",
      "Share large Excel workbooks faster",
      "Compress client data sheets",
    ],
    faq: [
      {
        question: "How do I compress Excel files online?",
        answer:
          "Drop your XLS, XLSX, CSV, or ODS file into the upload area above. Docsora compresses the spreadsheet directly in your browser using format-aware XLSX optimization - clearing redundant cache, rebuilding the archive, and re-encoding embedded media. The smaller file downloads in seconds, with every formula, sheet, and pivot table intact.",
      },
      {
        question: "Can I reduce XLSX file size without losing formulas?",
        answer:
          "Yes. Docsora's spreadsheet compressor only optimizes how the workbook is stored - never what it contains. Formulas, named ranges, pivot tables, references, charts, and conditional formatting all remain fully intact and recalculate exactly as before.",
      },
      {
        question: "Does Docsora preserve spreadsheet formatting?",
        answer:
          "Completely. Cell styles, fonts, colors, merged cells, frozen panes, headers, footers, and multi-sheet structure are preserved byte-for-byte. Browser-based spreadsheet compression with zero visible difference to the original workbook.",
      },
      {
        question: "Can I compress Excel files for email attachments?",
        answer:
          "Yes. Compress Excel for email by uploading any XLS or XLSX file and choosing a mode — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction) - easily fitting Gmail's 25MB cap and Outlook's tighter corporate limits. Ideal for sending financial models, monthly reports, and client data sheets without splitting attachments.",
      },
      {
        question: "Is Excel compression secure?",
        answer:
          "Every upload runs over end-to-end TLS encryption inside an isolated environment, and files are automatically deleted after compression. Docsora is operated under ISO 27001 controls and aligned with GDPR - trusted by finance, legal, and ops teams for sensitive spreadsheet workflows.",
      },
      {
        question: "Will Excel compression break my formulas?",
        answer:
          "No. Docsora only optimizes file storage and embedded media - formulas, named ranges, pivot tables, and references remain fully intact and recalculate exactly as before.",
      },
      {
        question: "How do I reduce a large Excel file size?",
        answer:
          "Upload the file, pick a compression mode, and Docsora clears redundant cache, optimizes embedded images, and rebuilds the XLSX archive - typically cutting size by 30–80%.",
      },
    ],
  },
  {
    slug: "compress-images",
    title: "Compress Images Online - Free Image Compressor | Docsora",
    metaDescription:
      "Compress images online without losing quality. Reduce JPG, PNG, WEBP, GIF, and TIFF file size for web, email, and social - free and browser-based.",
    h1: "Compress Images Online",
    intro:
      "Optimize photos, screenshots, and graphics for the web in one click. Browser-based image compressor across every major format.",
    keyword: "compress images",
    acceptedFormats: "JPG · PNG · WEBP · GIF · BMP · TIFF",
    cardIcon: ImageIcon,
    cardLabel: "Compress Images",
    cardDescription:
      "One tool for JPG, PNG, WEBP, GIF, and TIFF - no quality loss.",
    longCopy:
      "Docsora's online image compressor reduces JPG, PNG, WEBP, GIF, BMP, and TIFF file size with format-aware perceptual encoding. Optimize images for websites, blog posts, social media, marketing campaigns, and email - without sacrificing visible quality.",
    faq: [
      {
        question: "What image formats can I compress?",
        answer:
          "Docsora supports JPG, JPEG, PNG, GIF, BMP, TIFF, and WEBP - covering every major web, social, and design format.",
      },
      {
        question: "How do I compress images for a website?",
        answer:
          "Upload your images and choose a mode — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction). Balanced is the website default: it optimizes for fast loading and strong Core Web Vitals scores while keeping visual quality intact.",
      },
    ],
  },
  {
    slug: "compress-large-files",
    title: "Compress Large Files Online - Free Large File Compressor | Docsora",
    metaDescription:
      "Compress large files online - PDFs, presentations, videos, and archives - without losing quality. Free browser-based compressor, no installs.",
    h1: "Compress Large Files Online",
    intro:
      "Shrink oversized documents, decks, and image bundles instantly - no installs, no upload limits hidden behind paywalls.",
    keyword: "compress large files",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images · Archives",
    cardIcon: FileArchive,
    cardLabel: "Compress Large Files",
    cardDescription:
      "Shrink oversized files of any type for easy sharing and uploads.",
    longCopy:
      "Docsora handles large files that defeat standard ZIP compression - PDFs, decks, design files, and image bundles - with format-aware optimization that dramatically reduces size while keeping content perfect. Ideal for teams sharing big deliverables over email, Slack, or cloud storage.",
    faq: [
      {
        question: "What counts as a large file?",
        answer:
          "Anything over 10MB typically triggers issues with email and chat apps. Docsora is engineered to compress files up to several hundred megabytes directly in the browser.",
      },
      {
        question: "Why doesn't ZIP work well for large modern files?",
        answer:
          "PDFs, DOCX, PPTX, and image files are already ZIP-style archives, so re-zipping them barely helps. Docsora applies format-specific compression inside the file - re-encoding media and streamlining structure - for dramatically better results.",
      },
    ],
  },
  {
    slug: "reduce-file-size-for-email",
    title: "Reduce File Size for Email - Free Email Attachment Compressor | Docsora",
    metaDescription:
      "Reduce file size for email attachments online. Compress PDFs, images, and documents to fit Gmail, Outlook, and Apple Mail limits - free and instant.",
    h1: "Reduce File Size for Email Attachments",
    intro:
      "Slip under Gmail, Outlook, and Apple Mail limits in seconds. Modern email attachment compressor - drop any file and send.",
    keyword: "reduce file size for email",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images",
    cardIcon: Mail,
    cardLabel: "Compress for Email",
    cardDescription:
      "Shrink attachments to fit Gmail, Outlook, and Apple Mail limits.",
    longCopy:
      "Hitting attachment limits is the most common reason people compress files. Docsora optimizes PDFs, decks, spreadsheets, and images to fit common 10MB and 25MB inbox caps - without splitting files, uploading to a cloud link, or losing quality.",
    faq: [
      {
        question: "What is the maximum email attachment size?",
        answer:
          "Gmail and Apple Mail cap attachments at 25MB. Outlook and most corporate inboxes cap at 10–20MB. Docsora typically reduces files below these limits in a single click.",
      },
      {
        question: "How do I make a PDF small enough to email?",
        answer:
          "Upload your PDF and pick a mode — Preserve Quality (30% reduction), Balanced (50% compression), or Maximum (80% reduction) - enough for almost every PDF to fit standard email limits without splitting.",
      },
    ],
  },
  {
    slug: "online-file-compressor",
    title: "Online File Compressor - Free Browser-Based File Compression | Docsora",
    metaDescription:
      "Free online file compressor. Compress PDFs, images, Word, Excel, and PowerPoint files in your browser - no installs, no signup, secure and instant.",
    h1: "Free Online File Compressor",
    intro:
      "Compress any file directly in your browser - documents, spreadsheets, decks, and images. No installs, no signup, encrypted end-to-end.",
    keyword: "online file compressor",
    acceptedFormats: "All major formats",
    cardIcon: FileType,
    cardLabel: "Online File Compressor",
    cardDescription:
      "One browser-based compressor for every major file format.",
    longCopy:
      "Docsora is a complete browser-based file compressor - built to replace desktop tools with a faster, more secure online workflow. Compress files of any type in seconds, with automatic deletion after processing and end-to-end encrypted uploads.",
    faq: [
      {
        question: "Is Docsora's online file compressor free?",
        answer:
          "Yes. Free browser-based compression with no account required. Upgrade to Pro for batch processing, larger files, and advanced quality controls.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. Docsora runs entirely in your browser - Chrome, Safari, Edge, Firefox - on macOS, Windows, Linux, iOS, and Android.",
      },
    ],
  },
  {
    slug: "compress-files-without-losing-quality",
    title: "Compress Files Without Losing Quality - Lossless Compression | Docsora",
    metaDescription:
      "Compress files online without losing quality. Lossless and visually-lossless compression for PDFs, images, and documents - free, fast, secure.",
    h1: "Compress Files Without Losing Quality",
    intro:
     "Smart compression that preserves every detail. Choose Preserve Quality (30% reduction) for archives, Balanced (50% compression) for the smallest visually-identical file, or Maximum (80% reduction) for delivery-only files.",
    keyword: "compress files without losing quality",
    acceptedFormats: "All major formats",
    cardIcon: FileType,
    cardLabel: "Lossless Compression",
    cardDescription:
      "Smaller files, identical quality - lossless and visually-lossless modes.",
    longCopy:
      "Docsora uses format-aware lossless and visually-lossless compression that preserves text sharpness, image fidelity, and document structure. Perfect for legal PDFs, design assets, and quality-critical workflows where every pixel matters.",
    faq: [
      {
        question: "Is lossless compression really lossless?",
        answer:
          "Yes. In lossless mode, the decompressed file is bit-for-bit identical to the original - only redundancy in storage is removed. Visually-lossless mode goes further by removing data the human eye can't perceive.",
      },
      {
        question: "Which mode should I pick?",
        answer:
          "Use 'Preserve Quality' (30% reduction) for legal documents, archives, or print-bound files. Use 'Balanced' (50% compression) for the smallest file with no visible difference - ideal for email, web, and sharing. Use 'Maximum' (80% reduction) when you need the smallest possible file for delivery.",
      },
    ],
  },
  {
    slug: "compress-email-attachments",
    title: "Compress Email Attachments Online - Free | Docsora",
    metaDescription:
      "Compress email attachments online. Shrink PDFs, decks, and images to fit Gmail, Outlook, and corporate inbox limits - free, secure, instant.",
    h1: "Compress Email Attachments",
    intro:
      "Send heavy attachments without hitting inbox limits. Modern browser-based email compressor for PDFs, decks, sheets, and images.",
    keyword: "compress email attachments",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images · EML",
    cardIcon: Mails,
    cardLabel: "Compress Email Attachments",
    cardDescription:
      "Shrink any attachment to fit standard inbox limits.",
    longCopy:
      "Inbox limits shouldn't slow down work. Docsora compresses any email attachment - proposals, contracts, decks, spreadsheets, marketing assets - to fit Gmail, Outlook, Apple Mail, and corporate inbox caps in seconds.",
    faq: [
      {
        question: "How do I compress email attachments?",
        answer:
          "Drop one or more files into the upload area. Docsora compresses each attachment individually and bundles them into a single optimized download ready to attach.",
      },
    ],
  },
  {
    slug: "compress-marketing-assets",
    title: "Compress Marketing Assets Online - Free | Docsora",
    metaDescription:
      "Compress marketing assets - pitch decks, banners, social images, and PDFs - without losing brand quality. Free online compressor for marketing teams.",
    h1: "Compress Marketing Assets",
    intro:
      "Optimize campaign creatives, decks, and brand assets for fast delivery - without ever compromising visual quality.",
    keyword: "compress marketing assets",
    acceptedFormats: "PDF · PPTX · Images · WEBP",
    cardIcon: Megaphone,
    cardLabel: "Compress Marketing Assets",
    cardDescription:
      "Shrink campaign creatives, decks, and brand assets without losing fidelity.",
    longCopy:
      "Marketing teams ship heavy assets every day - campaign decks, social creatives, brand kits, and landing page images. Docsora optimizes them for fast delivery across email, ad platforms, and CMS uploads while preserving brand-critical quality.",
    faq: [
      {
        question: "Will compression affect brand colors?",
        answer:
          "No. Docsora preserves color profiles and uses perceptual encoding tuned to keep brand colors visually identical - even at much smaller file sizes.",
      },
    ],
  },
  {
    slug: "compress-client-deliverables",
    title: "Compress Client Deliverables Online - Free | Docsora",
    metaDescription:
      "Compress client deliverables - proposals, reports, design files, and decks - for faster, more professional delivery. Free, secure, browser-based.",
    h1: "Compress Client Deliverables",
    intro:
      "Send polished, lightweight deliverables to clients without quality compromise - for agencies, consultancies, and freelancers.",
    keyword: "compress client deliverables",
    acceptedFormats: "PDF · DOCX · PPTX · Images",
    cardIcon: Briefcase,
    cardLabel: "Compress Client Deliverables",
    cardDescription:
      "Polished, lightweight files for client handoffs and project closeouts.",
    longCopy:
      "Docsora helps agencies and consultancies ship project handoffs that feel premium - compressed proposals, reports, decks, and design files that download instantly without losing fidelity.",
    faq: [
      {
        question: "Can I compress an entire deliverable bundle?",
        answer:
          "Yes. Upload multiple files at once and Docsora compresses each one with format-aware optimization, then delivers a clean bundle ready to send.",
      },
    ],
  },
  {
    slug: "free-file-compressor",
    title: "Free File Compressor Online - No Signup | Docsora",
    metaDescription:
      "Free online file compressor - no signup, no installs. Compress PDFs, images, Word, Excel, and PowerPoint files in your browser, securely.",
    h1: "Modern File Compressor",
    intro:
      "100% free, no signup, no software. Compress any file in your browser with enterprise-grade security.",
    keyword: "free file compressor",
    acceptedFormats: "All major formats",
    cardIcon: Database,
    cardLabel: "Modern File Compressor",
    cardDescription:
      "Modern compression with no signup, no installs, no compromise.",
    longCopy:
      "Docsora gives away the core compression experience in your browser - no signup, no email, no installs. Everything runs in your browser with encrypted uploads and automatic file deletion after processing.",
    faq: [
      {
        question: "Is it really free?",
        answer:
          "Yes. Free browser-based compression for all common file types with no account required. Pro plans add batch processing, larger files, and advanced controls.",
      },
    ],
  },
  {
    slug: "compress-files-online",
    title: "Compress Files Online - Free Online File Compressor | Docsora",
    metaDescription:
      "Compress files online for free in your browser. Reduce PDF, image, Word, Excel, and PowerPoint file size instantly - no installs, no signup, secure.",
    h1: "Compress Files Online",
    intro:
      "Compress any file online directly in your browser - PDFs, images, Word, Excel, and PowerPoint - with no installs, no signup, and no quality loss.",
    keyword: "compress files online",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · JPG · PNG · WEBP",
    cardIcon: FileType,
    cardLabel: "Compress Files Online",
    cardDescription:
      "Modern browser-based file compression for every major format.",
    longCopy:
      "Docsora is a browser-based file compressor built for modern teams that need to compress files online without installing software. Format-aware optimization typically reduces PDF, DOCX, PPTX, XLSX, JPG, and PNG file size by 30–80% in seconds - encrypted in transit, automatically deleted after processing, and accessible from any browser on macOS, Windows, Linux, ChromeOS, iOS, and Android.",
    useCases: [
      "Compress files online for email attachments",
      "Compress files online without losing quality",
      "Compress large files online for sharing",
      "Compress PDF files online in your browser",
      "Compress image files online for web upload",
    ],
    faq: [
      {
        question: "How do I compress files online?",
        answer:
          "Drop any file into the upload area on this page and Docsora compresses it directly in your browser using format-aware optimization. Compress PDF, DOCX, PPTX, XLSX, JPG, PNG, WEBP, and EML files online for free - no installs, no signup, no plugins. Most files are reduced 30–80% in seconds, then download instantly.",
      },
      {
        question: "Is it safe to compress files online with Docsora?",
        answer:
          "Yes. Every upload runs over end-to-end TLS encryption inside an isolated, privacy-first environment. Files are automatically deleted from our servers after compression - Docsora never stores, indexes, shares, or reads your documents. The platform is operated under ISO 27001 controls, aligned with GDPR, and built with SOC 2 aligned operational and security standards.",
      },
      {
        question: "Can I compress files online without losing quality?",
        answer:
          "Yes. Docsora's online file compressor uses lossless and visually-lossless modes tuned to each file type. PDFs keep vector text crisp, images preserve color depth, and presentations retain every slide, animation, and embedded element. Choose 'Preserve Quality' (30% reduction) for archive-grade output, 'Balanced' (50% compression) for the smallest file with no visible quality loss, or 'Maximum' (80% reduction) for delivery-only files.",
      },
      {
        question: "What file types can I compress online?",
        answer:
          "Docsora supports every major format teams work with online: PDF, DOC, DOCX, TXT, HTML, ODT, CSV, XLS, XLSX, ODS, PPT, PPTX, ODP, JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, and EML email attachments - one browser-based compressor for documents, spreadsheets, presentations, images, and email.",
      },
      {
        question: "Do I need an account to compress files online?",
        answer:
          "No. Docsora is free to use without signup for standard files. Upgrade to Pro only when you need batch processing, large file compression (several hundred MB), or advanced quality controls for team workflows.",
      },
    ],
  },
  // ============================================================
];


export const compressVariantBySlug = Object.fromEntries(
  compressVariants.map((v) => [v.slug, v]),
);

// Map slug → file-input accept attribute (so the system file picker filters correctly)
const acceptBySlug: Record<string, string> = {
  "compress-pdf": ".pdf",
  "compress-pdf-online": ".pdf",
  "reduce-pdf-size": ".pdf",
  "compress-jpg": ".jpg,.jpeg",
  "compress-png": ".png",
  "compress-images": ".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp",
  "reduce-image-size": ".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp",
  "compress-word-document": ".doc,.docx,.odt",
  "compress-word-documents": ".doc,.docx,.odt",
  "compress-powerpoint": ".ppt,.pptx,.odp",
  "reduce-powerpoint-file-size": ".ppt,.pptx,.odp",
  "compress-excel-files": ".xls,.xlsx,.csv,.ods",
  "reduce-excel-file-size": ".xls,.xlsx,.csv,.ods",
  "compress-email-attachments": ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.eml",
  "reduce-file-size-for-email": ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.eml",
  "compress-files-online": ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.tiff,.bmp,.gif,.webp,.eml",
};

// Map slug → upload hero headline (search-intent aligned)
const headlineBySlug: Record<string, string> = {
  "compress-pdf": "Upload your PDF files",
  "compress-pdf-online": "Upload your PDF files",
  "reduce-pdf-size": "Upload your PDF files",
  "compress-jpg": "Upload your JPG images",
  "compress-png": "Upload your PNG images",
  "compress-images": "Upload your images",
  "reduce-image-size": "Upload your images",
  "compress-word-document": "Upload your Word documents",
  "compress-word-documents": "Upload your Word documents",
  "compress-powerpoint": "Upload your PowerPoint files",
  "reduce-powerpoint-file-size": "Upload your PowerPoint files",
  "compress-excel-files": "Upload your Excel files",
  "reduce-excel-file-size": "Upload your Excel files",
  "compress-email-attachments": "Upload your email attachments",
  "reduce-file-size-for-email": "Upload your email attachments",
  "compress-large-files": "Upload your large files",
  "compress-marketing-assets": "Upload your marketing assets",
  "compress-client-deliverables": "Upload your client deliverables",
  "compress-files-without-losing-quality": "Upload your files",
  "online-file-compressor": "Upload your files",
  "free-file-compressor": "Upload your files",
  "free-online-file-compressor": "Upload your files",
  "reduce-file-size": "Upload your files",
  "compress-files-online": "Upload your files",
};

export interface UploadIntent {
  headline: string;
  subheadline: string;
  formatBadges: string[];
  accept: string;
}

export function getUploadIntent(variant?: CompressVariantConfig): UploadIntent | undefined {
  if (!variant) return undefined;
  return {
    headline:
      variant.uploadHeadline ?? headlineBySlug[variant.slug] ?? "Upload your files",
    subheadline: variant.uploadSubheadline ?? variant.intro,
    formatBadges:
      variant.uploadFormatBadges ??
      variant.acceptedFormats.split("·").map((s) => s.trim()),
    accept:
      variant.uploadAccept ??
      acceptBySlug[variant.slug] ??
      ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.tiff,.bmp,.gif",
  };
}