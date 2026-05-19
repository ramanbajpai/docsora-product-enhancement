import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Presentation,
  FileText,
  Image as ImageIcon,
  Upload,
  Download,
  ArrowRight,
  FileSpreadsheet,
  FileType,
  FileImage,
  FileCode,
  Files,
  ShieldCheck,
  Zap,
  Lock,
  MonitorSmartphone,
  Layers,
  Sparkles,
  CloudOff,
  Trash2,
  Globe2,
  BadgeCheck,
  Megaphone,
  Scale,
  Briefcase,
  GraduationCap,
  Gauge,
  Settings2,
  Repeat,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { convertVariants, type ConvertVariantConfig } from "@/data/convertVariants";
import { convertCompareVariants } from "@/data/convertCompareVariants";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" as const },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: easeSmooth },
};

// SECTION 1 — Convert Any File Type
const fileTypeGroups = [
  {
    category: "PDF Conversion",
    icon: FileText,
    formats: "PDF → DOCX · PPTX · XLSX · ODT · JPG · PNG · TXT",
    title: "Convert PDFs Into Multiple Formats",
    description:
      "Transform PDFs into Word, Excel, PowerPoint, OpenDocument, image and text files while preserving formatting.",
    slug: "pdf-to-word",
  },
  {
    category: "Documents",
    icon: FileText,
    formats: "DOC · DOCX · ODT · TXT · HTML · XML → PDF",
    title: "Convert Word Documents to PDF",
    description:
      "Convert DOC, DOCX, ODT, TXT, HTML and XML files into professional PDFs instantly online.",
    slug: "word-to-pdf",
  },
  {
    category: "Spreadsheets",
    icon: FileSpreadsheet,
    formats: "CSV · XLS · XLSX → PDF · XLSX · CSV",
    title: "Convert Excel Files to PDF",
    description:
      "Convert between spreadsheet formats and into clean shareable PDF documents.",
    slug: "excel-to-pdf",
  },
  {
    category: "Presentations",
    icon: Presentation,
    formats: "PPT · PPTX → PDF · PPTX",
    title: "Convert PowerPoint Presentations",
    description:
      "Convert presentations into PDFs while preserving layouts, slides and formatting.",
    slug: "powerpoint-to-pdf",
  },
  {
    category: "Images",
    icon: ImageIcon,
    formats: "JPG · PNG → PDF · JPG · PNG",
    title: "Convert Images to PDF",
    description:
      "Convert JPG and PNG images into PDFs — or between image formats — securely in your browser.",
    slug: "jpg-to-pdf",
  },
  {
    category: "OpenDocument",
    icon: FileType,
    formats: "ODT ↔ DOCX · PDF",
    title: "Convert OpenDocument Files",
    description:
      "Convert ODT files to and from Word, and export to PDF — built for LibreOffice and OpenOffice workflows.",
    slug: "odt-to-pdf",
  },
];

// Popular tools — internal linking grid
const popularToolSlugs = [
  "pdf-to-word",
  "word-to-pdf",
  "excel-to-pdf",
  "powerpoint-to-pdf",
  "jpg-to-pdf",
  "png-to-pdf",
  "pdf-to-jpg",
  "pdf-to-png",
  "pdf-to-powerpoint",
  "pdf-to-excel",
  "pdf-to-text",
  "html-to-pdf",
];

const popularSearchSlugs: { slug: string; label: string; intent: string }[] = [
  { slug: "pdf-to-word", label: "PDF to Word", intent: "Editable DOCX from PDF." },
  { slug: "word-to-pdf", label: "Word to PDF", intent: "DOC/DOCX to professional PDF." },
  { slug: "excel-to-pdf", label: "Excel to PDF", intent: "Spreadsheets as shareable PDFs." },
  { slug: "powerpoint-to-pdf", label: "PowerPoint to PDF", intent: "Decks to clean PDFs." },
  { slug: "jpg-to-pdf", label: "JPG to PDF", intent: "Images bundled into a PDF." },
  { slug: "png-to-pdf", label: "PNG to PDF", intent: "PNGs with transparency to PDF." },
  { slug: "pdf-to-jpg", label: "PDF to JPG", intent: "Each PDF page as a JPG." },
  { slug: "pdf-to-png", label: "PDF to PNG", intent: "High-quality PNG exports." },
  { slug: "pdf-to-powerpoint", label: "PDF to PowerPoint", intent: "Editable PPTX from PDF." },
  { slug: "pdf-to-excel", label: "PDF to Excel", intent: "PDF tables to editable XLSX." },
  { slug: "pdf-to-odt", label: "PDF to ODT", intent: "Editable OpenDocument from PDF." },
  { slug: "pdf-to-text", label: "PDF to Text", intent: "Plain text extraction." },
  { slug: "html-to-pdf", label: "HTML to PDF", intent: "Web pages as PDF documents." },
  { slug: "txt-to-pdf", label: "TXT to PDF", intent: "Plain text into clean PDFs." },
  { slug: "csv-to-pdf", label: "CSV to PDF", intent: "Tabular data as PDF tables." },
  { slug: "odt-to-pdf", label: "ODT to PDF", intent: "OpenDocument to professional PDF." },
  { slug: "xml-to-pdf", label: "XML to PDF", intent: "Readable PDFs from structured XML." },
  { slug: "jpg-to-png", label: "JPG to PNG", intent: "Lossless image format." },
  { slug: "png-to-jpg", label: "PNG to JPG", intent: "Compact image format." },
  { slug: "csv-to-xlsx", label: "CSV to XLSX", intent: "CSV into native Excel workbooks." },
  { slug: "xlsx-to-csv", label: "XLSX to CSV", intent: "Excel sheets as clean CSV." },
  { slug: "docx-to-odt", label: "DOCX to ODT", intent: "Word into OpenDocument." },
  { slug: "odt-to-docx", label: "ODT to DOCX", intent: "OpenDocument into Word DOCX." },
  { slug: "pdf-to-pdfa", label: "PDF to PDF/A", intent: "Archive-grade PDF/A output." },
  { slug: "pdf-to-doc", label: "PDF to DOC", intent: "Legacy Word from PDF." },
  { slug: "pdf-to-docx", label: "PDF to DOCX", intent: "Modern Word from PDF." },
  { slug: "pdf-to-html", label: "PDF to HTML", intent: "Semantic HTML from PDF." },
  { slug: "pdf-to-ppt", label: "PDF to PPT", intent: "Legacy PowerPoint from PDF." },
  { slug: "pdf-to-pptx", label: "PDF to PPTX", intent: "Modern PowerPoint from PDF." },
  { slug: "pdf-to-odp", label: "PDF to ODP", intent: "OpenDocument deck from PDF." },
  { slug: "pdf-to-xml", label: "PDF to XML", intent: "Structured XML from PDF." },
  { slug: "pdf-to-gif", label: "PDF to GIF", intent: "PDF pages as GIF images." },
  { slug: "pdf-to-tiff", label: "PDF to TIFF", intent: "Archival-grade TIFF exports." },
  { slug: "pdf-to-bmp", label: "PDF to BMP", intent: "Uncompressed bitmap exports." },
  { slug: "pdf-to-webp", label: "PDF to WEBP", intent: "Modern web-ready images." },
  { slug: "jpeg-to-pdf", label: "JPEG to PDF", intent: "JPEG photos packaged as PDFs." },
  { slug: "gif-to-pdf", label: "GIF to PDF", intent: "GIF images into PDFs." },
  { slug: "bmp-to-pdf", label: "BMP to PDF", intent: "Bitmap images into PDFs." },
  { slug: "tiff-to-pdf", label: "TIFF to PDF", intent: "Multi-page TIFF scans to PDF." },
  { slug: "webp-to-pdf", label: "WEBP to PDF", intent: "WEBP images into PDFs." },
  { slug: "doc-to-pdf", label: "DOC to PDF", intent: "Legacy Word DOC to PDF." },
  { slug: "docx-to-pdf", label: "DOCX to PDF", intent: "Modern Word DOCX to PDF." },
  { slug: "ods-to-pdf", label: "ODS to PDF", intent: "OpenDocument spreadsheet to PDF." },
  { slug: "odp-to-pdf", label: "ODP to PDF", intent: "OpenDocument deck to PDF." },
  { slug: "eml-to-pdf", label: "EML to PDF", intent: "Email archives for compliance." },
  { slug: "spreadsheet-to-pdf", label: "Spreadsheet to PDF", intent: "All sheet formats to PDF." },
  { slug: "convert-files-online", label: "Convert files online", intent: "One tool, every format." },
];

// Why Docsora Convert
const benefits = [
  { icon: MonitorSmartphone, title: "Browser-based", description: "Works on any device — no installs or plugins." },
  { icon: Sparkles, title: "Formatting preserved", description: "Fonts, layout, tables and images stay intact." },
  { icon: Gauge, title: "High-quality output", description: "Pixel-accurate rendering across every format." },
  { icon: ShieldCheck, title: "Enterprise security", description: "Encrypted uploads, auto-deletion, ISO-aligned." },
  { icon: Zap, title: "Instant processing", description: "Most conversions finish in seconds." },
  { icon: Layers, title: "Multiple file formats", description: "PDF, Word, Excel, PowerPoint, image, email." },
  { icon: CloudOff, title: "No software install", description: "Convert online directly in your browser." },
  { icon: Settings2, title: "No account required", description: "Convert files instantly — no sign-up needed." },
];

const securityPoints = [
  { icon: Lock, title: "Encrypted uploads", description: "All files travel over TLS-secured connections." },
  { icon: Trash2, title: "Automatic deletion", description: "Files are removed from our servers after processing." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to respect EU data protection standards." },
  { icon: BadgeCheck, title: "ISO 27001", description: "Operated under enterprise-grade security controls." },
  { icon: ShieldCheck, title: "SOC 2 aligned", description: "Aligned with enterprise SOC 2 controls." },
];

const steps = [
  { icon: Upload, title: "Upload", description: "Drop your file securely into your browser." },
  { icon: Repeat, title: "Choose format", description: "Pick the conversion target — PDF, Word, image, more." },
  { icon: Download, title: "Download", description: "Get your converted file instantly — ready to share." },
];

const faqs = [
  {
    question: "How do I convert PDF to Word online?",
    answer:
      "Drop your PDF into the upload area above, select Word (DOCX) as the conversion target, and Docsora returns a fully editable Word document in seconds — preserving fonts, headings, tables, images, and layout. The PDF to Word conversion runs entirely in your browser, with end-to-end TLS encryption and automatic file deletion after processing.",
  },
  {
    question: "Can I convert Excel spreadsheets to PDF?",
    answer:
      "Yes. Docsora's Excel to PDF converter supports XLS, XLSX, CSV, and ODS files with full multi-sheet support. Conditional formatting, cell styling, column widths, and formula values are preserved exactly as they appear on screen — perfect for finance reports, audits, and audit-ready archives.",
  },
  {
    question: "What file types does Docsora Convert support?",
    answer:
      "Docsora Convert supports every major business format: PDF, DOC, DOCX, ODT, TXT, HTML, XML, CSV, XLS, XLSX, PPT, PPTX, JPG, and PNG. One browser-based tool covers PDF conversion, document conversion, spreadsheet conversion, presentation conversion, and image conversion — replacing the need for separate desktop utilities.",
  },
  {
    question: "Is browser-based file conversion secure?",
    answer:
      "Yes. Every upload runs over end-to-end TLS encryption inside an isolated, privacy-first environment. Files are automatically deleted from our servers after conversion — Docsora never stores, indexes, shares, or reads your documents. The platform is operated under ISO 27001 controls and aligned with GDPR and SOC 2, which is why finance, legal, and healthcare teams rely on it for sensitive conversion workflows.",
  },
  {
    question: "Can I preserve formatting during conversion?",
    answer:
      "Yes — format-aware conversion is core to Docsora. Fonts, headings, tables, images, color profiles, multi-sheet structures, and slide layouts are all preserved across PDF, Word, Excel, PowerPoint, and image conversions. The output mirrors the source document as closely as the target format allows.",
  },
  {
    question: "How do I convert images into PDFs?",
    answer:
      "Upload one or many JPG or PNG images and Docsora packages them into a single clean multi-page PDF in the order you provided. Original resolution and color accuracy are preserved — ideal for scanned receipts, photo evidence, compliance archives, and visual handoffs.",
  },
  {
    question: "Can I convert presentations online?",
    answer:
      "Yes. Docsora's PowerPoint to PDF converter handles PPT and PPTX decks with pixel-accurate slide rendering. Fonts, layouts, embedded images, charts, and master slide templates are preserved — built for investor decks, sales presentations, and training material.",
  },
  {
    question: "Is Docsora Convert free to use?",
    answer:
      "Yes — Docsora Convert is free for standard files with no signup. Upgrade to Pro for larger files, batch conversions, OCR for scanned PDFs, and advanced quality controls.",
  },
  {
    question: "Can I convert between non-PDF formats?",
    answer:
      "Yes. Docsora handles cross-format conversions beyond PDF — including DOCX ↔ ODT, CSV ↔ XLSX, and JPG ↔ PNG — so you can move between document, spreadsheet, and image formats without leaving the browser.",
  },
  {
    question: "Does Docsora work without installing software?",
    answer:
      "Yes — Docsora is fully browser-based with no software, plugins, or downloads required. It runs on macOS, Windows, Linux, ChromeOS, iOS, and Android from Chrome, Safari, Edge, Firefox, Arc, and Brave. Open the page, drop your file, and convert online instantly.",
  },
];

const workflowIntents = [
  { icon: Presentation, title: "Convert investor pitch decks", description: "Decks converted to PDFs that send in one click — no upload links." },
  { icon: Scale, title: "Convert contracts into PDFs", description: "Legal-ready PDFs for signature, archival, and review." },
  { icon: Briefcase, title: "Convert onboarding documents", description: "HR packets and training material standardized as PDFs." },
  { icon: FileSpreadsheet, title: "Convert spreadsheets for reporting", description: "Finance and ops workbooks as audit-ready PDFs." },
  { icon: Megaphone, title: "Convert presentations for sharing", description: "Decks delivered as PDFs across email and Slack." },
  { icon: ImageIcon, title: "Convert images for compliance", description: "Photo evidence and scans packaged into archive PDFs." },
  { icon: FileType, title: "Convert OpenDocument files", description: "Move between ODT, DOCX, and PDF for LibreOffice workflows." },
  { icon: GraduationCap, title: "Archive business documents", description: "Long-term archives in stable PDF/A-ready output." },
];

export interface ConvertSEOProps {
  variant?: ConvertVariantConfig;
}

function buildJsonLd(variant?: ConvertVariantConfig) {
  const path = variant ? `/${variant.slug}` : "/convert";
  const name = variant?.h1 ?? "Docsora File Conversion";
  const description =
    variant?.metaDescription ??
    "Free online file converter for PDF, Word, Excel, PowerPoint, images and email — browser-based, secure, no installs.";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Convert", item: "/convert" },
      ...(variant
        ? [{ "@type": "ListItem", position: 3, name: variant.cardLabel, item: path }]
        : []),
    ],
  };
  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: path,
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1380",
    },
  };
  const faqSource = variant?.faq ?? faqs;
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSource.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: variant ? `How to ${variant.cardLabel}` : "How to convert files online",
    description,
    totalTime: "PT30S",
    step: [
      { "@type": "HowToStep", position: 1, name: "Upload", text: "Drag and drop your file into the upload area." },
      { "@type": "HowToStep", position: 2, name: "Choose format", text: "Pick the conversion target format." },
      { "@type": "HowToStep", position: 3, name: "Download", text: "Download the converted file in seconds." },
    ],
  };
  return [breadcrumb, software, faqPage, howTo];
}

export function ConvertSEO({ variant }: ConvertSEOProps = {}) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const activeFaqs = variant?.faq ?? faqs;
  const popularTools = popularToolSlugs
    .map((slug) => convertVariants.find((v) => v.slug === slug))
    .filter((v): v is ConvertVariantConfig => Boolean(v))
    .filter((v) => v.slug !== variant?.slug);
  const jsonLd = buildJsonLd(variant);

  return (
    <div className="relative bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-32">
        {/* Variant intro */}
        {variant && (
          <section>
            <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Online · Free · Secure
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                {variant.h1}
              </h1>
              <p className="text-base text-muted-foreground/85 leading-relaxed mb-6">
                {variant.intro}
              </p>
              <p className="text-sm text-muted-foreground/70 leading-relaxed max-w-2xl mx-auto">
                {variant.longCopy}
              </p>
              <div className="mt-8">
                <Link
                  to="/convert"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  <span>Explore the full Docsora conversion suite</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* SECTION 1 — Convert Any File Type */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Convert Any File Type Online
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Convert PDFs, documents, spreadsheets, presentations, images and emails directly in your browser with secure high-quality conversion workflows.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {fileTypeGroups.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.05 }}
              >
                <Link
                  to={`/${item.slug}`}
                  aria-label={`Open ${item.title}`}
                  className={cn(
                    "group relative block rounded-2xl p-6 h-full",
                    "bg-card/50 backdrop-blur-sm",
                    "border border-border/40",
                    "hover:border-primary/25 hover:bg-card/80",
                    "transition-all duration-300"
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                      <item.icon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="pt-4 border-t border-border/30 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-muted-foreground/60 truncate pr-2">
                      {item.formats}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 2 — Popular Conversion Tools */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Popular File Conversion Tools
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Format-specific converters for the files your team works with every day — all free, online, and browser-based.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {popularTools.map((tool, i) => (
              <motion.div
                key={tool.slug}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.04 }}
              >
                <Link
                  to={`/${tool.slug}`}
                  className={cn(
                    "group block rounded-2xl p-5 h-full",
                    "bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300"
                  )}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                    <tool.cardIcon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                    {tool.cardLabel}
                  </h3>
                  <p className="text-xs text-muted-foreground/75 leading-relaxed mb-3">
                    {tool.cardDescription}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                    <span>Open tool</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 3 — Real-world workflow intent */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Built for Real Document Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From investor decks to compliance archives — Docsora handles the conversion workflows generic tools ignore.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {workflowIntents.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                className={cn(
                  "group rounded-2xl p-6",
                  "bg-card/40 border border-border/30",
                  "hover:border-primary/20 hover:bg-card/70 transition-all duration-300"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                  <item.icon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 4 — Why Docsora Convert */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Why Use Docsora Convert
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Engineered for accuracy, speed and security — without the complexity of desktop software.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {benefits.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.04 }}
                className={cn(
                  "rounded-2xl p-5",
                  "bg-card/40 border border-border/30",
                  "hover:border-primary/20 transition-all duration-300"
                )}
              >
                <item.icon className="w-4 h-4 text-primary/70 mb-3" />
                <h3 className="text-[13px] font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 5 — Security */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "rounded-3xl p-10 md:p-14",
              "bg-gradient-to-br from-card/60 via-card/30 to-card/60",
              "border border-border/40 backdrop-blur-sm"
            )}
          >
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <ShieldCheck className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Enterprise-grade security
                </span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
                Secure File Conversion
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Privacy-first architecture trusted by teams in finance, legal, and healthcare.
              </p>
            </div>

            <motion.div
              {...staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-5 gap-3"
            >
              {securityPoints.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.06 }}
                  className="rounded-xl p-4 bg-background/40 border border-border/30 text-center"
                >
                  <item.icon className="w-4 h-4 text-primary/70 mx-auto mb-2.5" />
                  <h3 className="text-[12px] font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* SECTION 6 — How it works */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              How Docsora Convert Works
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10"
          >
            {steps.map((step, i) => (
              <div key={step.title} className="flex items-center gap-8 md:gap-10">
                <motion.div
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-5 h-5 text-primary/70" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground/70 max-w-[200px]">{step.description}</p>
                </motion.div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="w-4 h-4 text-muted-foreground/20" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 7 — FAQ */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {activeFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-border/40"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/80 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* SECTION 8 — Related conversion tools + search chips */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Related Conversion Tools
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {convertVariants
              .filter((v) => v.slug !== variant?.slug)
              .slice(0, 9)
              .map((resource, i) => (
                <motion.div
                  key={resource.slug}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.06 }}
                >
                  <Link
                    to={`/${resource.slug}`}
                    className={cn(
                      "group rounded-2xl p-6 block h-full",
                      "bg-card/40 border border-border/30",
                      "hover:border-primary/20 hover:bg-card/70 transition-all duration-300"
                    )}
                  >
                    <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {resource.cardLabel}
                    </h3>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed">{resource.cardDescription}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                      <span>Open tool</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
          </motion.div>

          <motion.div {...fadeUp} className="mt-10">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-5">
              Popular file conversion searches
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {popularSearchSlugs
                .filter((s) => s.slug !== variant?.slug)
                .map((search) => (
                  <Link
                    key={search.slug}
                    to={`/${search.slug}`}
                    title={search.intent}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5",
                      "bg-card/40 border border-border/30",
                      "text-[12px] font-medium text-foreground/80",
                      "hover:border-primary/30 hover:text-primary hover:bg-card/70",
                      "transition-all duration-200",
                    )}
                  >
                    {search.label}
                  </Link>
                ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 9 — Compare */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compare File Conversion Platforms
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              See how Docsora compares to other browser-based conversion platforms across speed, usability, security and workflow flexibility.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {convertCompareVariants.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.06 }}
              >
                <Link
                  to={`/${c.slug}`}
                  className={cn(
                    "group rounded-2xl p-6 block h-full",
                    "bg-card/40 border border-border/30",
                    "hover:border-primary/20 hover:bg-card/70 transition-all duration-300",
                  )}
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
                      <Scale className="w-3.5 h-3.5 text-primary/80" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted-foreground/70">
                      Comparison
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {c.cardTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground/75 leading-relaxed">
                    {c.cardSummary}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
                    <span>View comparison</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 10 — Final CTA */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "text-center rounded-3xl p-12 md:p-16",
              "bg-card/40 border border-border/30 backdrop-blur-sm"
            )}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Convert your files instantly with Docsora.
            </h2>
            <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
              No signup required. Drop your file above and get a converted result in seconds.
            </p>
            <button
              onClick={scrollToTop}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-7 py-3 rounded-xl text-sm font-semibold",
                "text-primary-foreground bg-primary hover:bg-primary/90",
                "shadow-lg shadow-primary/20",
                "transition-all duration-200 active:scale-[0.98]"
              )}
            >
              <Upload className="w-4 h-4" />
              Convert Files
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}