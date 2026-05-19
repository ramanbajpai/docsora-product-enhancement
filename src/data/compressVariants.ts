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
}

/**
 * Variant landing pages that all reuse the /compress upload experience
 * but ship unique meta, H1, copy and FAQ for long-tail SEO coverage.
 * Each page internally links back to /compress (the authority hub).
 */
export const compressVariants: CompressVariantConfig[] = [
  {
    slug: "compress-pdf",
    title: "Compress PDF Online — Free PDF Compressor | Docsora",
    metaDescription:
      "Compress PDF files online for free without losing quality. Reduce PDF size for email, web upload, and sharing. Browser-based, secure, no installation required.",
    h1: "Compress PDF Online",
    intro:
      "Reduce PDF file size in your browser without losing quality. Free, secure, and instant — no installation, no account.",
    keyword: "compress pdf",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Compress PDF",
    cardDescription:
      "Shrink PDF documents for email, web, and sharing — no quality loss.",
    longCopy:
      "Docsora's online PDF compressor reduces file size by 60–90% while keeping text crisp, images sharp, and layouts identical. Compress PDFs for email attachments, web uploads, e-signature workflows, and client deliverables — directly in your browser with end-to-end encryption.",
    faq: [
      {
        question: "How do I compress a PDF file online?",
        answer:
          "Drop your PDF into the upload area above. Docsora compresses the file in your browser using intelligent PDF optimization — re-sampling embedded images, removing redundant metadata, and streamlining fonts — then returns a smaller download in seconds. No software, plugins, or account required.",
      },
      {
        question: "Can I compress a PDF without losing quality?",
        answer:
          "Yes. Choose the 'Preserve Quality' mode for visually identical output, or 'Balanced' for the smallest file with no perceptible quality loss. Docsora applies format-aware compression that keeps text vector-sharp and images print-ready.",
      },
      {
        question: "How do I reduce PDF size for email attachments?",
        answer:
          "Most inboxes (Gmail, Outlook, Apple Mail) cap attachments at 25MB. Upload your PDF, pick 'Maximum compression', and Docsora will typically reduce it 60–90% — perfect for sending contracts, invoices, pitch decks, and legal PDFs without splitting.",
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
    title: "Compress JPG Online — Free JPEG Image Compressor | Docsora",
    metaDescription:
      "Compress JPG and JPEG images online without losing quality. Reduce photo size for websites, email, and social — free, fast, browser-based.",
    h1: "Compress JPG Images Online",
    intro:
      "Shrink JPG and JPEG files in seconds while keeping every photo sharp. Free online image compressor — no installs, no signup.",
    keyword: "compress jpg",
    acceptedFormats: "JPG · JPEG",
    cardIcon: ImageIcon,
    cardLabel: "Compress JPG",
    cardDescription:
      "Optimize JPG and JPEG photos for web, social, and email attachments.",
    longCopy:
      "Docsora's JPG compressor uses perceptual encoding to reduce image weight by up to 80% with no visible quality loss. Compress photos for websites, blog posts, social media uploads, marketing assets, and email — directly in the browser, with files automatically deleted after processing.",
    faq: [
      {
        question: "How do I compress a JPG file online?",
        answer:
          "Drag your JPG into the upload zone above. Docsora analyzes the image, applies perceptual compression, and returns a smaller version that looks identical to the original — ideal for web pages, social posts, and email.",
      },
      {
        question: "Will compression reduce my photo quality?",
        answer:
          "Not visibly. Docsora uses intelligent JPEG optimization that targets redundant color data the eye can't see, so photos stay crisp and color-accurate at a fraction of the file size.",
      },
      {
        question: "Can I compress multiple JPGs at once?",
        answer:
          "Yes — drop a folder or select multiple JPG files to compress in a single batch. Each image is optimized independently and downloaded as a clean bundle.",
      },
    ],
  },
  {
    slug: "compress-png",
    title: "Compress PNG Online — Free PNG Image Compressor | Docsora",
    metaDescription:
      "Compress PNG images online without losing quality or transparency. Reduce PNG file size for websites, apps, and design — free and browser-based.",
    h1: "Compress PNG Images Online",
    intro:
      "Reduce PNG file size while preserving transparency and crisp edges. Free online PNG compressor — built for designers and product teams.",
    keyword: "compress png",
    acceptedFormats: "PNG",
    cardIcon: FileImage,
    cardLabel: "Compress PNG",
    cardDescription:
      "Shrink PNG files with full transparency support for web and design.",
    longCopy:
      "Docsora's PNG compressor uses lossless palette optimization and smart quantization to cut PNG file size by 50–80% — without breaking transparency, alpha channels, or sharp graphic edges. Ideal for UI assets, logos, screenshots, marketing visuals, and website graphics.",
    faq: [
      {
        question: "Does PNG compression preserve transparency?",
        answer:
          "Yes. Docsora keeps alpha channels and transparent backgrounds fully intact while reducing file size — essential for logos, UI assets, and overlay graphics.",
      },
      {
        question: "How do I reduce PNG file size for a website?",
        answer:
          "Upload your PNG, pick a compression mode, and Docsora optimizes color palettes and pixel data to dramatically reduce weight — improving Core Web Vitals and page load times.",
      },
    ],
  },
  {
    slug: "compress-word-document",
    title: "Compress Word Documents Online — Free DOCX Compressor | Docsora",
    metaDescription:
      "Compress Word documents (DOC, DOCX) online without losing formatting. Reduce DOCX file size for email and sharing — free, browser-based, secure.",
    h1: "Compress Word Documents Online",
    intro:
      "Reduce DOC and DOCX file size while keeping every heading, image, and table perfectly intact.",
    keyword: "compress word documents",
    acceptedFormats: "DOC · DOCX · ODT",
    cardIcon: FileText,
    cardLabel: "Compress Word",
    cardDescription:
      "Shrink DOC and DOCX files for email and collaboration — formatting preserved.",
    longCopy:
      "Docsora's Word document compressor optimizes embedded images, fonts, and revision data inside DOC, DOCX, and ODT files — reducing size by up to 80% with zero formatting changes. Send proposals, reports, and contracts faster without hitting inbox limits.",
    faq: [
      {
        question: "How do I compress a Word document?",
        answer:
          "Upload your DOC or DOCX file above. Docsora optimizes embedded media and document structure, then returns a smaller file with identical formatting, fonts, and layout.",
      },
      {
        question: "Will compressing change my Word document's formatting?",
        answer:
          "No. Headings, tables, images, comments, and tracked changes all remain intact — Docsora only optimizes how the file is stored, not how it looks.",
      },
    ],
  },
  {
    slug: "compress-powerpoint",
    title: "Compress PowerPoint Online — Free PPTX Compressor | Docsora",
    metaDescription:
      "Compress PowerPoint presentations (PPT, PPTX) online without losing quality. Reduce deck size for email, sharing, and screen presentations — free.",
    h1: "Compress PowerPoint Presentations",
    intro:
      "Make PPT and PPTX decks lighter for email, screen sharing, and uploads — without touching a single slide.",
    keyword: "compress powerpoint",
    acceptedFormats: "PPT · PPTX · ODP",
    cardIcon: Presentation,
    cardLabel: "Compress PowerPoint",
    cardDescription:
      "Shrink pitch decks and PPTX files for sharing without losing slide quality.",
    longCopy:
      "Docsora's PowerPoint compressor optimizes embedded images, videos, and media inside PPT, PPTX, and ODP files — perfect for sales decks, investor presentations, and client pitches that need to travel over email or live screen-shares.",
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
    title: "Compress Excel Files Online — Free XLSX Compressor | Docsora",
    metaDescription:
      "Compress Excel spreadsheets (XLS, XLSX, CSV) online without breaking formulas. Reduce spreadsheet size for sharing and email — free and secure.",
    h1: "Compress Excel Spreadsheets",
    intro:
      "Shrink XLS, XLSX, and CSV files while preserving every formula, sheet, and pivot — built for finance and ops teams.",
    keyword: "compress excel files",
    acceptedFormats: "XLS · XLSX · CSV · ODS",
    cardIcon: FileSpreadsheet,
    cardLabel: "Compress Excel",
    cardDescription:
      "Reduce spreadsheet file size without breaking formulas or pivot tables.",
    longCopy:
      "Docsora's spreadsheet compressor optimizes XLSX storage, embedded objects, and unused cached data — reducing size of large financial models, data exports, and reports while preserving every formula and sheet structure.",
    faq: [
      {
        question: "Will Excel compression break my formulas?",
        answer:
          "No. Docsora only optimizes file storage and embedded media — formulas, named ranges, pivot tables, and references remain fully intact and recalculate exactly as before.",
      },
      {
        question: "How do I reduce a large Excel file size?",
        answer:
          "Upload the file, pick a compression mode, and Docsora clears redundant cache, optimizes embedded images, and rebuilds the XLSX archive — typically cutting size by 40–70%.",
      },
    ],
  },
  {
    slug: "compress-images",
    title: "Compress Images Online — Free Image Compressor | Docsora",
    metaDescription:
      "Compress images online without losing quality. Reduce JPG, PNG, WEBP, GIF, and TIFF file size for web, email, and social — free and browser-based.",
    h1: "Compress Images Online",
    intro:
      "Optimize photos, screenshots, and graphics for the web in one click. Free online image compressor across every major format.",
    keyword: "compress images",
    acceptedFormats: "JPG · PNG · WEBP · GIF · BMP · TIFF",
    cardIcon: ImageIcon,
    cardLabel: "Compress Images",
    cardDescription:
      "One tool for JPG, PNG, WEBP, GIF, and TIFF — no quality loss.",
    longCopy:
      "Docsora's online image compressor reduces JPG, PNG, WEBP, GIF, BMP, and TIFF file size with format-aware perceptual encoding. Optimize images for websites, blog posts, social media, marketing campaigns, and email — without sacrificing visible quality.",
    faq: [
      {
        question: "What image formats can I compress?",
        answer:
          "Docsora supports JPG, JPEG, PNG, GIF, BMP, TIFF, and WEBP — covering every major web, social, and design format.",
      },
      {
        question: "How do I compress images for a website?",
        answer:
          "Upload your images, choose 'Balanced' mode, and Docsora optimizes them for fast loading and strong Core Web Vitals scores while keeping visual quality intact.",
      },
    ],
  },
  {
    slug: "compress-large-files",
    title: "Compress Large Files Online — Free Large File Compressor | Docsora",
    metaDescription:
      "Compress large files online — PDFs, presentations, videos, and archives — without losing quality. Free browser-based compressor, no installs.",
    h1: "Compress Large Files Online",
    intro:
      "Shrink oversized documents, decks, and image bundles instantly — no installs, no upload limits hidden behind paywalls.",
    keyword: "compress large files",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images · Archives",
    cardIcon: FileArchive,
    cardLabel: "Compress Large Files",
    cardDescription:
      "Shrink oversized files of any type for easy sharing and uploads.",
    longCopy:
      "Docsora handles large files that defeat standard ZIP compression — PDFs, decks, design files, and image bundles — with format-aware optimization that dramatically reduces size while keeping content perfect. Ideal for teams sharing big deliverables over email, Slack, or cloud storage.",
    faq: [
      {
        question: "What counts as a large file?",
        answer:
          "Anything over 10MB typically triggers issues with email and chat apps. Docsora is engineered to compress files up to several hundred megabytes directly in the browser.",
      },
      {
        question: "Why doesn't ZIP work well for large modern files?",
        answer:
          "PDFs, DOCX, PPTX, and image files are already ZIP-style archives, so re-zipping them barely helps. Docsora applies format-specific compression inside the file — re-encoding media and streamlining structure — for dramatically better results.",
      },
    ],
  },
  {
    slug: "reduce-file-size-for-email",
    title: "Reduce File Size for Email — Free Email Attachment Compressor | Docsora",
    metaDescription:
      "Reduce file size for email attachments online. Compress PDFs, images, and documents to fit Gmail, Outlook, and Apple Mail limits — free and instant.",
    h1: "Reduce File Size for Email Attachments",
    intro:
      "Slip under Gmail, Outlook, and Apple Mail limits in seconds. Free email attachment compressor — drop any file and send.",
    keyword: "reduce file size for email",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images",
    cardIcon: Mail,
    cardLabel: "Compress for Email",
    cardDescription:
      "Shrink attachments to fit Gmail, Outlook, and Apple Mail limits.",
    longCopy:
      "Hitting attachment limits is the most common reason people compress files. Docsora optimizes PDFs, decks, spreadsheets, and images to fit common 10MB and 25MB inbox caps — without splitting files, uploading to a cloud link, or losing quality.",
    faq: [
      {
        question: "What is the maximum email attachment size?",
        answer:
          "Gmail and Apple Mail cap attachments at 25MB. Outlook and most corporate inboxes cap at 10–20MB. Docsora typically reduces files below these limits in a single click.",
      },
      {
        question: "How do I make a PDF small enough to email?",
        answer:
          "Upload your PDF, pick 'Maximum compression', and Docsora reduces it 60–90% — enough for almost every PDF to fit standard email limits without splitting.",
      },
    ],
  },
  {
    slug: "online-file-compressor",
    title: "Online File Compressor — Free Browser-Based File Compression | Docsora",
    metaDescription:
      "Free online file compressor. Compress PDFs, images, Word, Excel, and PowerPoint files in your browser — no installs, no signup, secure and instant.",
    h1: "Free Online File Compressor",
    intro:
      "Compress any file directly in your browser — documents, spreadsheets, decks, and images. No installs, no signup, encrypted end-to-end.",
    keyword: "online file compressor",
    acceptedFormats: "All major formats",
    cardIcon: FileType,
    cardLabel: "Online File Compressor",
    cardDescription:
      "One free online compressor for every major file format.",
    longCopy:
      "Docsora is a complete browser-based file compressor — built to replace desktop tools with a faster, more secure online workflow. Compress files of any type in seconds, with automatic deletion after processing and end-to-end encrypted uploads.",
    faq: [
      {
        question: "Is Docsora's online file compressor free?",
        answer:
          "Yes. Free browser-based compression with no account required. Upgrade to Pro for batch processing, larger files, and advanced quality controls.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. Docsora runs entirely in your browser — Chrome, Safari, Edge, Firefox — on macOS, Windows, Linux, iOS, and Android.",
      },
    ],
  },
  {
    slug: "compress-files-without-losing-quality",
    title: "Compress Files Without Losing Quality — Lossless Compression | Docsora",
    metaDescription:
      "Compress files online without losing quality. Lossless and visually-lossless compression for PDFs, images, and documents — free, fast, secure.",
    h1: "Compress Files Without Losing Quality",
    intro:
      "Smart compression that preserves every detail. Choose lossless output for archives or balanced mode for the smallest visually-identical file.",
    keyword: "compress files without losing quality",
    acceptedFormats: "All major formats",
    cardIcon: FileType,
    cardLabel: "Lossless Compression",
    cardDescription:
      "Smaller files, identical quality — lossless and visually-lossless modes.",
    longCopy:
      "Docsora uses format-aware lossless and visually-lossless compression that preserves text sharpness, image fidelity, and document structure. Perfect for legal PDFs, design assets, and quality-critical workflows where every pixel matters.",
    faq: [
      {
        question: "Is lossless compression really lossless?",
        answer:
          "Yes. In lossless mode, the decompressed file is bit-for-bit identical to the original — only redundancy in storage is removed. Visually-lossless mode goes further by removing data the human eye can't perceive.",
      },
      {
        question: "Which mode should I pick?",
        answer:
          "Use 'Preserve Quality' for legal documents, archives, or print-bound files. Use 'Balanced' for the smallest file with no visible difference — ideal for email, web, and sharing.",
      },
    ],
  },
  {
    slug: "compress-email-attachments",
    title: "Compress Email Attachments Online — Free | Docsora",
    metaDescription:
      "Compress email attachments online. Shrink PDFs, decks, and images to fit Gmail, Outlook, and corporate inbox limits — free, secure, instant.",
    h1: "Compress Email Attachments",
    intro:
      "Send heavy attachments without hitting inbox limits. Free browser-based email compressor for PDFs, decks, sheets, and images.",
    keyword: "compress email attachments",
    acceptedFormats: "PDF · DOCX · PPTX · XLSX · Images · EML",
    cardIcon: Mails,
    cardLabel: "Compress Email Attachments",
    cardDescription:
      "Shrink any attachment to fit standard inbox limits.",
    longCopy:
      "Inbox limits shouldn't slow down work. Docsora compresses any email attachment — proposals, contracts, decks, spreadsheets, marketing assets — to fit Gmail, Outlook, Apple Mail, and corporate inbox caps in seconds.",
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
    title: "Compress Marketing Assets Online — Free | Docsora",
    metaDescription:
      "Compress marketing assets — pitch decks, banners, social images, and PDFs — without losing brand quality. Free online compressor for marketing teams.",
    h1: "Compress Marketing Assets",
    intro:
      "Optimize campaign creatives, decks, and brand assets for fast delivery — without ever compromising visual quality.",
    keyword: "compress marketing assets",
    acceptedFormats: "PDF · PPTX · Images · WEBP",
    cardIcon: Megaphone,
    cardLabel: "Compress Marketing Assets",
    cardDescription:
      "Shrink campaign creatives, decks, and brand assets without losing fidelity.",
    longCopy:
      "Marketing teams ship heavy assets every day — campaign decks, social creatives, brand kits, and landing page images. Docsora optimizes them for fast delivery across email, ad platforms, and CMS uploads while preserving brand-critical quality.",
    faq: [
      {
        question: "Will compression affect brand colors?",
        answer:
          "No. Docsora preserves color profiles and uses perceptual encoding tuned to keep brand colors visually identical — even at much smaller file sizes.",
      },
    ],
  },
  {
    slug: "compress-client-deliverables",
    title: "Compress Client Deliverables Online — Free | Docsora",
    metaDescription:
      "Compress client deliverables — proposals, reports, design files, and decks — for faster, more professional delivery. Free, secure, browser-based.",
    h1: "Compress Client Deliverables",
    intro:
      "Send polished, lightweight deliverables to clients without quality compromise — for agencies, consultancies, and freelancers.",
    keyword: "compress client deliverables",
    acceptedFormats: "PDF · DOCX · PPTX · Images",
    cardIcon: Briefcase,
    cardLabel: "Compress Client Deliverables",
    cardDescription:
      "Polished, lightweight files for client handoffs and project closeouts.",
    longCopy:
      "Docsora helps agencies and consultancies ship project handoffs that feel premium — compressed proposals, reports, decks, and design files that download instantly without losing fidelity.",
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
    title: "Free File Compressor Online — No Signup | Docsora",
    metaDescription:
      "Free online file compressor — no signup, no installs. Compress PDFs, images, Word, Excel, and PowerPoint files in your browser, securely.",
    h1: "Free File Compressor",
    intro:
      "100% free, no signup, no software. Compress any file in your browser with enterprise-grade security.",
    keyword: "free file compressor",
    acceptedFormats: "All major formats",
    cardIcon: Database,
    cardLabel: "Free File Compressor",
    cardDescription:
      "Free compression with no signup, no installs, no compromise.",
    longCopy:
      "Docsora gives away the core compression experience for free — no signup, no email, no installs. Everything runs in your browser with encrypted uploads and automatic file deletion after processing.",
    faq: [
      {
        question: "Is it really free?",
        answer:
          "Yes. Free browser-based compression for all common file types with no account required. Pro plans add batch processing, larger files, and advanced controls.",
      },
    ],
  },
];

export const compressVariantBySlug = Object.fromEntries(
  compressVariants.map((v) => [v.slug, v]),
);