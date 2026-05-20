import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Presentation,
  FileText,
  Image as ImageIcon,
  Upload,
  Minimize2,
  Download,
  ArrowRight,
  FileSpreadsheet,
  FileType,
  Mails,
  Briefcase,
  ShieldCheck,
  Zap,
  Lock,
  MonitorSmartphone,
  Layers,
  Sparkles,
  CloudOff,
  KeyRound,
  Trash2,
  Globe2,
  BadgeCheck,
  Megaphone,
  Scale,
  Receipt,
  GraduationCap,
  Gauge,
} from "lucide-react";
import { MessageSquare, BookOpen, FileBox } from "lucide-react";
import { Clock3, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { compressVariants, type CompressVariantConfig } from "@/data/compressVariants";
import { compareVariants } from "@/data/compareVariants";

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

// SECTION 1 - Compress Any File Type
const fileTypeGroups = [
  {
    category: "Documents",
    icon: FileText,
    formats: "PDF · DOC · DOCX · TXT · HTML · ODT",
    title: "Compress PDF & Word Documents",
    description:
      "Reduce the size of PDFs, Word files, and rich text documents without losing readability or formatting.",
    slug: "compress-pdf",
  },
  {
    category: "Spreadsheets",
    icon: FileSpreadsheet,
    formats: "CSV · XLS · XLSX · ODS",
    title: "Compress Excel Files",
    description:
      "Shrink large spreadsheets and data exports while preserving formulas, sheets, and structure.",
    slug: "compress-excel-files",
  },
  {
    category: "Presentations",
    icon: Presentation,
    formats: "PPT · PPTX · ODP",
    title: "Compress PowerPoint Presentations",
    description:
      "Make decks lighter for email, sharing, and live presentations with no visible quality loss.",
    slug: "compress-powerpoint",
  },
  {
    category: "Images",
    icon: ImageIcon,
    formats: "JPG · JPEG · PNG · GIF · BMP · TIFF · WEBP",
    title: "Compress Images Without Quality Loss",
    description:
      "Optimize photos, graphics, and screenshots for web, social, and storage with intelligent compression.",
    slug: "compress-images",
  },
  {
    category: "Email",
    icon: Mails,
    formats: "EML",
    title: "Compress Email Attachments",
    description:
      "Reduce email file sizes so attachments fit under inbox limits and send instantly.",
    slug: "compress-email-attachments",
  },
  {
    category: "Universal",
    icon: FileType,
    formats: "All supported formats",
    title: "Compress Any File Online",
    description:
      "One tool for every format - drop any document, image, or sheet and Docsora handles the rest.",
    slug: "online-file-compressor",
  },
];

// Why Docsora
const benefits = [
  { icon: Sparkles, title: "Visually-lossless output", description: "Format-aware algorithms preserve every detail teams notice." },
  { icon: Zap, title: "Cloud-native speed", description: "Optimized exports return in seconds, not minutes." },
  { icon: ShieldCheck, title: "Encrypted by default", description: "TLS transport, isolated processing, automatic deletion." },
  { icon: MonitorSmartphone, title: "Runs anywhere", description: "Cross-platform - macOS, Windows, Linux, iOS, Android." },
  { icon: Lock, title: "Privacy-first architecture", description: "Files are never indexed, shared, or read." },
  { icon: Layers, title: "Multi-format pipeline", description: "Documents, spreadsheets, decks, images, and email." },
  { icon: Minimize2, title: "Workflow-aware", description: "Tuned for operational delivery and review cycles." },
  { icon: CloudOff, title: "Zero install", description: "In-browser optimization - nothing to deploy or update." },
];

// SECTION 4 - Security
const securityPoints = [
  { icon: Lock, title: "Encrypted uploads", description: "All files travel over TLS-secured connections." },
  { icon: Trash2, title: "Automatic deletion", description: "Files are removed from our servers after processing." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to respect EU data protection standards." },
  { icon: BadgeCheck, title: "ISO 27001", description: "Operated under enterprise-grade security controls." },
  { icon: ShieldCheck, title: "SOC 2 aligned", description: "Built with controls aligned to enterprise-grade SOC 2 security standards." },
];

// SECTION 5 - How It Works
const steps = [
  { icon: Upload, title: "Upload", description: "Drag and drop any file securely into your browser." },
  { icon: Minimize2, title: "Compress", description: "Docsora intelligently reduces size while preserving quality." },
  { icon: Download, title: "Download", description: "Get your optimized file instantly - ready to share." },
];

// SECTION 6 - FAQ (semantically rich; covers core compression intents)
const faqs = [
  {
    question: "How do I compress file size online?",
    answer:
      "Drop any document, image, or spreadsheet into the upload area above and Docsora reduces file size directly in your browser using intelligent, format-aware optimization. The browser-based compressor handles PDF, DOCX, PPTX, XLSX, JPG, PNG, and more - typically reducing file size by 60–80% in seconds with no installation, account, or technical setup. A modern in-browser workflow engineered to feel as polished as a desktop app while running entirely in a secure browser tab.",
  },
  {
    question: "Can I compress files without losing quality?",
    answer:
      "Yes - Docsora uses lossless and visually-lossless compression algorithms tuned to each file type. PDFs keep vector text crisp, images preserve color depth and sharpness, and presentations retain every slide, animation, and embedded media element. Choose 'Preserve Quality' for archive-grade output or 'Balanced' for the smallest file with no perceptible quality loss - ideal for compressing files for email, web upload, and client delivery without any visible compromise.",
  },
  {
    question: "What file types can I compress?",
    answer:
      "Docsora's online file compressor supports every major format teams work with: PDF, DOC, DOCX, TXT, HTML, ODT, CSV, XLS, XLSX, ODS, PPT, PPTX, ODP, JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, and EML. One browser-based tool covers document compression, spreadsheet compression, presentation compression, image compression, and email attachment compression - replacing the need for separate desktop utilities.",
  },
  {
    question: "Is Docsora compression secure?",
    answer:
      "Every upload runs over end-to-end TLS encryption and is processed inside an isolated, privacy-first environment. Files are automatically deleted from our servers after compression - Docsora never stores, indexes, shares, or reads your documents. The platform is operated under ISO 27001 controls and aligned with GDPR, which is why finance, legal, and healthcare teams trust it for sensitive compression workflows.",
  },
  {
    question: "How do I reduce PDF size for email?",
    answer:
      "Upload your PDF, pick 'Maximum compression', and Docsora will reduce PDF size to fit standard inbox limits (10MB for Outlook, 25MB for Gmail and Apple Mail). Most PDFs compress 60–90% with no visible quality loss - perfect for sending contracts, proposals, invoices, legal PDFs, and signed agreements as clean email attachments instead of cloud links.",
  },
  {
    question: "Can I compress PowerPoint presentations?",
    answer:
      "Yes. Docsora's online PowerPoint compressor optimizes PPT, PPTX, and ODP files by re-encoding embedded images, screenshots, and video while keeping every slide, animation, transition, and font perfectly intact. Ideal for compressing pitch decks, investor presentations, sales enablement, and training decks for sharing over email, Slack, Teams, and live screen-shares.",
  },
  {
    question: "Can I compress images online?",
    answer:
      "Absolutely - Docsora is a complete browser-based image compressor for JPG, JPEG, PNG, GIF, BMP, TIFF, and WEBP files, individually or in bulk. Perceptual encoding balances dimensions, color depth, and quality so photos and graphics stay visually identical while image size drops 50–80%. Use it to reduce image size for websites, blog posts, social media, marketing assets, and product catalogs.",
  },
  {
    question: "Is there a maximum file size?",
    answer:
      "Free Docsora supports files up to 50MB per upload - enough for almost every PDF, image, document, and spreadsheet. Docsora Pro unlocks large file compression (several hundred MB), batch compression for entire deliverables, advanced quality controls, and higher monthly limits for teams.",
  },
  {
    question: "Can I compress files directly in my browser?",
    answer:
      "Yes - Docsora is fully browser-based with no software, plugins, or downloads required. It works on macOS, Windows, Linux, ChromeOS, iOS, and Android from Chrome, Safari, Edge, Firefox, Arc, and Brave. There is nothing to install, nothing to update, and nothing to remove - open the page, drop your files, and compress online instantly.",
  },
  {
    question: "What is the best way to reduce document size?",
    answer:
      "Use a format-aware online compressor like Docsora to reduce document size without losing quality. Generic ZIP archives barely shrink modern documents because PDF, DOCX, PPTX, and image files are already compressed containers - Docsora applies format-specific optimization inside each file (re-encoding images, streamlining structure, removing redundant metadata) for dramatic size reduction with no loss of meaning or visual quality. It's the fastest way to compress large files without installing software.",
  },
];

// Popular compression tool destinations (internal links to variant landings)
const popularToolSlugs = [
  "compress-pdf",
  "compress-jpg",
  "compress-png",
  "compress-word-document",
  "compress-powerpoint",
  "compress-excel-files",
  "compress-email-attachments",
  "compress-images",
];

// "Reduce File Size" intent cards - natural, search-aligned phrasing
const reduceIntentCards = [
  {
    slug: "reduce-pdf-size",
    icon: FileText,
    title: "Reduce PDF Size",
    description:
      "Reduce large PDF documents for email, sharing, and uploads while preserving readability and formatting.",
  },
  {
    slug: "reduce-image-size",
    icon: ImageIcon,
    title: "Reduce Image Size",
    description:
      "Shrink JPG, PNG, and WEBP images for websites, social media, and storage optimization.",
  },
  {
    slug: "reduce-powerpoint-file-size",
    icon: Presentation,
    title: "Reduce PowerPoint File Size",
    description:
      "Optimize presentations for smoother sharing, uploads, and client delivery.",
  },
  {
    slug: "reduce-excel-file-size",
    icon: FileSpreadsheet,
    title: "Reduce Excel File Size",
    description:
      "Compress spreadsheets and exports without breaking formulas or sheet structure.",
  },
  {
    slug: "reduce-file-size-for-email",
    icon: Mail,
    title: "Reduce Email Attachment Size",
    description:
      "Reduce attachment sizes to stay within Gmail and Outlook sending limits.",
  },
  {
    slug: "compress-word-document",
    icon: FileType,
    title: "Reduce Document Size Online",
    description:
      "Compress Word documents, reports, and contracts instantly in your browser.",
  },
];

// "Popular File Compression Searches" - long-tail internal linking
const popularSearchSlugs: { slug: string; label: string; intent: string }[] = [
  { slug: "reduce-file-size", label: "Reduce file size", intent: "Any file, any format - reduced in seconds." },
  { slug: "reduce-pdf-size", label: "Reduce PDF size", intent: "Shrink PDFs for email and uploads." },
  { slug: "reduce-image-size", label: "Reduce image size", intent: "Optimize JPG, PNG, and WEBP for web." },
  { slug: "reduce-file-size-for-email", label: "Reduce file size for email", intent: "Fit Gmail and Outlook limits." },
  { slug: "compress-large-files", label: "Compress large files", intent: "Handle oversized files in the browser." },
  { slug: "compress-files-without-losing-quality", label: "Compress files without losing quality", intent: "Lossless and visually-lossless modes." },
  { slug: "free-online-file-compressor", label: "Free online file compressor", intent: "No installs. No signup. No compromise." },
  { slug: "reduce-powerpoint-file-size", label: "Reduce PowerPoint file size", intent: "Slim decks for sharing and screen-shares." },
  { slug: "reduce-excel-file-size", label: "Reduce Excel file size", intent: "Smaller XLSX without breaking formulas." },
  { slug: "compress-pdf-online", label: "Compress PDF online", intent: "Free browser-based PDF compression." },
  { slug: "compress-files-online", label: "Compress files online", intent: "Any file, any format, in your browser." },
];

// Categorized semantic search groups (replaces flat chip dump)
const searchCategories: { heading: string; items: { slug: string; label: string }[] }[] = [
  {
    heading: "Reduce File Sizes",
    items: [
      { slug: "reduce-pdf-size", label: "Reduce PDF size" },
      { slug: "reduce-image-size", label: "Reduce image size" },
      { slug: "reduce-powerpoint-file-size", label: "Reduce PowerPoint file size" },
      { slug: "reduce-excel-file-size", label: "Reduce Excel file size" },
      { slug: "reduce-spreadsheet-file-size", label: "Reduce spreadsheet file size" },
    ],
  },
  {
    heading: "Compress Documents",
    items: [
      { slug: "compress-pdf-online", label: "Compress PDF online" },
      { slug: "compress-word-documents", label: "Compress Word documents" },
      { slug: "compress-excel-files", label: "Compress spreadsheets" },
      { slug: "compress-files-without-losing-quality", label: "Compress without losing quality" },
      { slug: "compress-large-files", label: "Compress large files" },
    ],
  },
  {
    heading: "Email Compression",
    items: [
      { slug: "reduce-file-size-for-email", label: "Reduce email attachment size" },
      { slug: "compress-email-attachments", label: "Compress files for Gmail" },
      { slug: "compress-email-attachments", label: "Compress Outlook attachments" },
      { slug: "compress-pitch-decks-for-email", label: "Compress pitch decks for email" },
    ],
  },
  {
    heading: "Image Optimization",
    items: [
      { slug: "compress-jpg", label: "Compress JPG" },
      { slug: "compress-png", label: "Compress PNG" },
      { slug: "compress-images", label: "Compress WEBP images" },
      { slug: "compress-images-for-websites", label: "Compress images for websites" },
    ],
  },
];

// AI Search / Conversational Q&A (GEO optimization)
const aiSearchPrompts: { question: string; answer: string }[] = [
  {
    question: "What is the best file compression tool online?",
    answer:
      "Docsora handles PDFs, decks, spreadsheets, images, and email attachments in one in-browser workflow. Format-specific optimization preserves layout, formulas, slide structure, and image fidelity - no separate utility per file type.",
  },
  {
    question: "How do I reduce PDF size without losing quality?",
    answer:
      "Upload your PDF and choose Balanced or Preserve Quality. Docsora re-encodes embedded images, streamlines fonts, and strips redundant metadata. Vector text stays crisp, scans stay readable, and most PDFs land 60–80% smaller - ready for email or e-signature.",
  },
  {
    question: "What is the best PowerPoint compression tool?",
    answer:
      "Docsora optimizes PPT, PPTX, and ODP decks by re-encoding embedded media while preserving every slide, animation, transition, and font. Tuned for investor presentations, sales decks, and training material delivered over email or live screen-share.",
  },
  {
    question: "How can I compress email attachments?",
    answer:
      "Drop any document, deck, or image into Docsora. Format-aware compression brings files under standard inbox caps - 25MB for Gmail and Apple Mail, 10–20MB for Outlook and most enterprise mailboxes - without splitting files or relying on cloud links.",
  },
  {
    question: "What compression platform supports Excel and PDF files in one place?",
    answer:
      "Docsora covers PDF, DOC, DOCX, ODT, XLS, XLSX, ODS, PPT, PPTX, ODP, JPG, PNG, WEBP, TIFF, GIF, BMP, and EML from a single workspace. One workflow for documents, spreadsheets, decks, images, and email - no switching tools mid-task.",
  },
  {
    question: "How do I compress images for websites?",
    answer:
      "Upload JPG, PNG, or WEBP files and choose Balanced mode. Perceptual encoding tuned for web delivery yields smaller payloads, faster page loads, and stronger Core Web Vitals - with no visible quality loss on product, hero, or marketing imagery.",
  },
];

// Knowledge / guide links (long-tail, semantic authority)
const knowledgeGuides: {
  slug: string;
  title: string;
  description: string;
  icon: typeof FileText;
  readTime: string;
}[] = [
  {
    slug: "best-way-to-reduce-pdf-size",
    title: "Best way to reduce PDF size",
    description:
      "Format-aware techniques for shrinking PDFs - re-encoding embedded images, streamlining fonts, and removing redundant metadata without altering layout or readability.",
    icon: FileText,
    readTime: "5 min read",
  },
  {
    slug: "compress-powerpoint-without-losing-quality",
    title: "Compress PowerPoint without losing quality",
    description:
      "Learn how to slim PPTX decks for email and screen-share while preserving every slide, animation, transition, and embedded media exactly as designed.",
    icon: Presentation,
    readTime: "6 min guide",
  },
  {
    slug: "reduce-email-attachment-size",
    title: "Reduce email attachment size",
    description:
      "Get attachments under Gmail, Outlook, and enterprise inbox limits without splitting files or relying on cloud links - a practical workflow for daily senders.",
    icon: Mail,
    readTime: "4 min read",
  },
  {
    slug: "compress-images-for-websites",
    title: "Compress images for websites",
    description:
      "Perceptual encoding workflows for JPG, PNG, and WEBP that improve Core Web Vitals and reduce page weight while preserving visual fidelity across devices.",
    icon: ImageIcon,
    readTime: "5 min walkthrough",
  },
  {
    slug: "reduce-spreadsheet-file-size",
    title: "Reduce spreadsheet file size",
    description:
      "Shrink XLSX exports and large data workbooks without breaking formulas, pivots, or sheet structure - ideal for finance, ops, and analytics teams.",
    icon: FileSpreadsheet,
    readTime: "4 min read",
  },
  {
    slug: "compress-pitch-decks-for-email",
    title: "Compress pitch decks for email",
    description:
      "Send investor and sales decks as clean attachments instead of cloud links - reduce deck size while keeping cinematography, typography, and embedded video intact.",
    icon: Briefcase,
    readTime: "6 min guide",
  },
];

// Full supported file type matrix (semantic block)
const supportedFormatGroups: { category: string; formats: string }[] = [
  { category: "Documents", formats: "PDF · DOC · DOCX · ODT · TXT · HTML" },
  { category: "Spreadsheets", formats: "XLS · XLSX · CSV · ODS" },
  { category: "Presentations", formats: "PPT · PPTX · ODP" },
  { category: "Images", formats: "JPG · JPEG · PNG · GIF · BMP · TIFF · WEBP" },
  { category: "Email", formats: "EML" },
];

// Real-world workflow intent (long-tail authority)
const workflowIntents = [
  { icon: Presentation, title: "Compress pitch decks", description: "Investor and sales decks that send in one click - no upload links." },
  { icon: Briefcase, title: "Compress client deliverables", description: "Polished, lightweight handoffs for agencies, consultancies, and freelancers." },
  { icon: Scale, title: "Compress legal PDFs", description: "Contracts, NDAs, and case files compressed losslessly for legal review." },
  { icon: Receipt, title: "Compress invoices", description: "Shrink invoices and receipts to fit accounting tools and email limits." },
  { icon: Megaphone, title: "Compress marketing assets", description: "Campaign creatives, banners, and decks delivered without quality loss." },
  { icon: GraduationCap, title: "Compress onboarding documents", description: "HR packets, training PDFs, and policy guides ready to share instantly." },
];

export interface CompressSEOProps {
  variant?: CompressVariantConfig;
}

function buildJsonLd(variant?: CompressVariantConfig) {
  const path = variant ? `/${variant.slug}` : "/compress";
  const name = variant?.h1 ?? "Docsora File Compression";
  const description =
    variant?.metaDescription ??
    "Free online file compressor for PDFs, images, Word, Excel, and PowerPoint - browser-based, secure, no installs.";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Compress", item: "/compress" },
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
      ratingCount: "1248",
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
    name: variant ? `How to ${variant.cardLabel}` : "How to compress files online",
    description,
    totalTime: "PT30S",
    step: [
      { "@type": "HowToStep", position: 1, name: "Upload", text: "Drag and drop your file into the upload area or click to browse." },
      { "@type": "HowToStep", position: 2, name: "Choose mode", text: "Pick Balanced, Maximum, or Preserve Quality compression." },
      { "@type": "HowToStep", position: 3, name: "Download", text: "Download the optimized file - ready to share in seconds." },
    ],
  };
  return [breadcrumb, software, faqPage, howTo];
}

export function CompressSEO({ variant }: CompressSEOProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFaqs = variant?.faq ?? faqs;
  const popularTools = popularToolSlugs
    .map((slug) => compressVariants.find((v) => v.slug === slug))
    .filter((v): v is CompressVariantConfig => Boolean(v))
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
        {/* Variant intro (only on variant landing pages) */}
        {variant && (
          <section>
            <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Browser-based · Secure · Instant
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
                  to="/compress"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  <span>Explore the full Docsora compression suite</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* Variant use cases (only when defined) */}
        {variant?.useCases && variant.useCases.length > 0 && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
                Built for {variant.cardLabel} Workflows
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                The real-world workflows teams use {variant.cardLabel.toLowerCase()} for every day.
              </p>
            </motion.div>
            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto"
            >
              {variant.useCases.map((useCase, i) => (
                <motion.div
                  key={useCase}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.04 }}
                  className={cn(
                    "rounded-xl px-5 py-4",
                    "bg-card/30 border border-border/30",
                    "hover:border-primary/20 hover:bg-card/60 transition-all duration-300"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    <span className="text-[13px] text-foreground/90 font-medium">{useCase}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div {...fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-muted-foreground/70">
              <Link to="/compress" className="hover:text-primary transition-colors">Compression hub</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/reduce-file-size" className="hover:text-primary transition-colors">Reduce file size</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/compress-email-attachments" className="hover:text-primary transition-colors">Compress email attachments</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/compress-large-files" className="hover:text-primary transition-colors">Compress large files</Link>
              <span className="text-muted-foreground/30">·</span>
              <Link to="/compress-word-documents" className="hover:text-primary transition-colors">Compress Word documents</Link>
            </motion.div>
          </section>
        )}

        {/* SECTION 1 - Compress Any File Type */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compress Any File Type
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              One compressor for documents, spreadsheets, presentations, images,
              and email - optimized for every format you use.
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

        {/* SECTION - Reduce File Size Instantly Online */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Gauge className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Reduce file size online
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Reduce File Size Instantly Online
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Reduce PDF, image, presentation, spreadsheet and document file
              sizes directly in your browser - without losing quality or
              formatting.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {reduceIntentCards
              .filter((c) => c.slug !== variant?.slug)
              .map((card, i) => (
              <motion.div
                key={card.slug}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.05 }}
              >
                <Link
                  to={`/${card.slug}`}
                  className={cn(
                    "group relative block rounded-2xl p-6 h-full overflow-hidden",
                    "bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70",
                    "transition-all duration-300"
                  )}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(420px circle at 0% 0%, hsl(var(--primary) / 0.06), transparent 60%)",
                    }}
                  />
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                      <card.icon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <div className="pt-4 border-t border-border/30 flex items-center gap-1.5 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                      <span>Open tool</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION - Popular Compression Tools (internal linking hub) */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Popular Compression Tools
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Format-specific compressors for the files your team sends every
              day - browser-based, secure, and workflow-ready.
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

        {/* SECTION - Real-world workflow intent */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Built for Real Compression Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From legal PDFs to investor decks - Docsora handles the
              compression workflows generic tools ignore.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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

        {/* SECTION - Why Docsora */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Why Use Docsora Compression?
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Engineered for speed, security, and quality - without the
              complexity of desktop software.
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

        {/* SECTION 4 - Security & Privacy */}
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
                Secure File Compression
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Privacy-first architecture trusted by teams in finance, legal,
                and healthcare.
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

        {/* SECTION 5 - How It Works */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              How Docsora Compression Works
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

        {/* SECTION 6 - FAQ */}
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

        {/* SECTION - Related Compression Tools (+ long-tail search chips) */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Related Compression Tools
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {compressVariants
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

          {/* Categorized semantic search groups (hub only) */}
          {!variant && (
            <motion.div {...fadeUp} className="mt-16">
              <div className="text-center mb-10">
                <p className="text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-3">
                  Popular file compression searches
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
                  Organized by intent
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {searchCategories.map((cat) => (
                  <div key={cat.heading} className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-primary/70">
                      {cat.heading}
                    </p>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={`${cat.heading}-${item.label}`}>
                          <Link
                            to={`/${item.slug}`}
                            className="group inline-flex items-center gap-1.5 text-[13px] text-foreground/85 hover:text-primary transition-colors"
                          >
                            <span className="leading-snug">{item.label}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        {/* SECTION 8 - Final CTA */}
        {/* SECTION - Compare Docsora Compression */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compare Docsora Compression
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              See how Docsora compares to other browser-based compression
              platforms across speed, usability, security and workflow
              flexibility.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {compareVariants.map((c, i) => (
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

        {/* SECTION - Supported File Types (semantic block, hub only) */}
        {!variant && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <FileBox className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Supported file types
                </span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
                Every Format Modern Teams Use
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Compress PDF documents, PowerPoint presentations, Excel
                spreadsheets, image files, and email attachments through a
                single in-browser optimization workflow.
              </p>
            </motion.div>
            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-5xl mx-auto"
            >
              {supportedFormatGroups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                  className="rounded-xl p-5 bg-card/40 border border-border/30 text-center"
                >
                  <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-primary/70 mb-2">
                    {group.category}
                  </p>
                  <p className="text-[11px] font-mono text-muted-foreground/70 leading-relaxed">
                    {group.formats}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* SECTION - AI Search / Conversational Q&A (GEO, hub only) */}
        {!variant && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <MessageSquare className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Conversational search
                </span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
                Compression Questions Answered
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Direct answers to common questions about reducing file sizes,
                compressing documents, and optimizing files for sharing,
                storage, and web delivery.
              </p>
            </motion.div>
            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
            >
              {aiSearchPrompts.map((p, i) => (
                <motion.div
                  key={p.question}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                  className="rounded-2xl p-6 bg-card/40 border border-border/30"
                >
                  <div className="flex items-start gap-3 mb-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-3.5 h-3.5 text-primary/70" />
                    </div>
                    <h3 className="text-[13px] font-semibold text-foreground leading-snug pt-1">
                      {p.question}
                    </h3>
                  </div>
                  <p className="text-[13px] text-muted-foreground/80 leading-relaxed pl-10">
                    {p.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* SECTION - Knowledge & Guides (hub only) */}
        {!variant && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <BookOpen className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Knowledge
                </span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
                Compression Guides
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                In-depth walkthroughs covering the compression workflows teams
                handle every week - from email-ready attachments to
                web-optimized assets.
              </p>
            </motion.div>
            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {knowledgeGuides.map((g, i) => (
                <motion.div
                  key={g.slug}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                >
                  <Link
                    to={`/guides/${g.slug}`}
                    className={cn(
                      "group block rounded-2xl p-6 h-full",
                      "bg-card/40 border border-border/30",
                      "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                        <g.icon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground/60">
                        <Clock3 className="w-3 h-3" />
                        <span>{g.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-[13px] text-muted-foreground/80 leading-relaxed">
                      {g.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                      <span>Read guide</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        )}

        {/* SECTION 9 - Final CTA */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "text-center rounded-3xl p-12 md:p-16",
              "bg-card/40 border border-border/30 backdrop-blur-sm"
            )}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Compress your files instantly with Docsora.
            </h2>
            <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
              No signup required. Drop your files above and get optimized
              results in seconds.
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
              Compress Files
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
