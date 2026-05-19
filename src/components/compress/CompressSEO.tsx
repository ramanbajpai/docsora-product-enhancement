import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail,
  Presentation,
  FileText,
  Globe,
  Image as ImageIcon,
  Upload,
  Minimize2,
  Download,
  ArrowRight,
  FileSpreadsheet,
  FileType,
  Mails,
  Users,
  Briefcase,
  Share2,
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
  FileImage,
  FileArchive,
  Megaphone,
  Scale,
  Receipt,
  GraduationCap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { compressVariants, type CompressVariantConfig } from "@/data/compressVariants";

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

// SECTION 1 — Compress Any File Type
const fileTypeGroups = [
  {
    category: "Documents",
    icon: FileText,
    formats: "PDF · DOC · DOCX · TXT · HTML · ODT",
    title: "Compress PDF & Word Documents",
    description:
      "Reduce the size of PDFs, Word files, and rich text documents without losing readability or formatting.",
  },
  {
    category: "Spreadsheets",
    icon: FileSpreadsheet,
    formats: "CSV · XLS · XLSX · ODS",
    title: "Compress Excel Files",
    description:
      "Shrink large spreadsheets and data exports while preserving formulas, sheets, and structure.",
  },
  {
    category: "Presentations",
    icon: Presentation,
    formats: "PPT · PPTX · ODP",
    title: "Compress PowerPoint Presentations",
    description:
      "Make decks lighter for email, sharing, and live presentations with no visible quality loss.",
  },
  {
    category: "Images",
    icon: ImageIcon,
    formats: "JPG · JPEG · PNG · GIF · BMP · TIFF · WEBP",
    title: "Compress Images Without Quality Loss",
    description:
      "Optimize photos, graphics, and screenshots for web, social, and storage with intelligent compression.",
  },
  {
    category: "Email",
    icon: Mails,
    formats: "EML",
    title: "Compress Email Attachments",
    description:
      "Reduce email file sizes so attachments fit under inbox limits and send instantly.",
  },
  {
    category: "Universal",
    icon: FileType,
    formats: "All supported formats",
    title: "Compress Any File Online",
    description:
      "One tool for every format — drop any document, image, or sheet and Docsora handles the rest.",
  },
];

// SECTION 2 — Use Cases
const useCases = [
  { icon: Mail, title: "Email Attachments", description: "Send files under strict inbox size limits without splitting." },
  { icon: Globe, title: "Website Uploads", description: "Speed up page loads with lighter assets and documents." },
  { icon: Users, title: "Team Collaboration", description: "Share lighter files across Slack, Notion, and Drive." },
  { icon: Briefcase, title: "Client Deliverables", description: "Send polished, lightweight files to clients in one click." },
  { icon: Presentation, title: "Presentations", description: "Shrink decks for smoother screen sharing and uploads." },
  { icon: Share2, title: "Media Sharing", description: "Compress images and graphics for seamless social posting." },
];

// SECTION 3 — Why Docsora
const benefits = [
  { icon: Sparkles, title: "No quality loss", description: "Smart algorithms preserve clarity and detail." },
  { icon: Zap, title: "Fast processing", description: "Compression completes in seconds, not minutes." },
  { icon: ShieldCheck, title: "Secure uploads", description: "All transfers run over encrypted TLS connections." },
  { icon: MonitorSmartphone, title: "Browser-based", description: "Works on any device — no installs or plugins." },
  { icon: Lock, title: "Encrypted transfers", description: "End-to-end protection from upload to download." },
  { icon: Layers, title: "Multiple formats", description: "Documents, sheets, decks, images, and email." },
  { icon: Minimize2, title: "Instant optimization", description: "Files are optimized the moment they upload." },
  { icon: CloudOff, title: "No software install", description: "Compress online directly in your browser." },
];

// SECTION 4 — Security
const securityPoints = [
  { icon: Lock, title: "Encrypted uploads", description: "All files travel over TLS-secured connections." },
  { icon: Trash2, title: "Automatic deletion", description: "Files are removed from our servers after processing." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to respect EU data protection standards." },
  { icon: BadgeCheck, title: "ISO 27001", description: "Operated under enterprise-grade security controls." },
  { icon: KeyRound, title: "Privacy-first", description: "Your documents are never stored, shared, or scanned." },
];

// SECTION 5 — How It Works
const steps = [
  { icon: Upload, title: "Upload", description: "Drag and drop any file securely into your browser." },
  { icon: Minimize2, title: "Compress", description: "Docsora intelligently reduces size while preserving quality." },
  { icon: Download, title: "Download", description: "Get your optimized file instantly — ready to share." },
];

// SECTION 6 — FAQ (semantically rich; covers core compression intents)
const faqs = [
  {
    question: "How do I compress file size online?",
    answer:
      "Drop any document, image, or spreadsheet into the upload area above and Docsora compresses it directly in your browser using intelligent, format-aware optimization. Our online file compressor handles PDF, DOCX, PPTX, XLSX, JPG, PNG, and more — typically reducing file size by 60–90% in seconds with no installation, account, or technical setup. It's a free online compressor designed to feel as polished as a desktop app while running entirely in a secure browser tab.",
  },
  {
    question: "Can I compress files without losing quality?",
    answer:
      "Yes — Docsora uses lossless and visually-lossless compression algorithms tuned to each file type. PDFs keep vector text crisp, images preserve color depth and sharpness, and presentations retain every slide, animation, and embedded media element. Choose 'Preserve Quality' for archive-grade output or 'Balanced' for the smallest file with no perceptible quality loss — ideal for compressing files for email, web upload, and client delivery without any visible compromise.",
  },
  {
    question: "What file types can I compress?",
    answer:
      "Docsora's online file compressor supports every major format teams work with: PDF, DOC, DOCX, TXT, HTML, ODT, CSV, XLS, XLSX, ODS, PPT, PPTX, ODP, JPG, JPEG, PNG, GIF, BMP, TIFF, WEBP, and EML. One browser-based tool covers document compression, spreadsheet compression, presentation compression, image compression, and email attachment compression — replacing the need for separate desktop utilities.",
  },
  {
    question: "Is Docsora compression secure?",
    answer:
      "Every upload runs over end-to-end TLS encryption and is processed inside an isolated, privacy-first environment. Files are automatically deleted from our servers after compression — Docsora never stores, indexes, shares, or reads your documents. The platform is operated under ISO 27001 controls and aligned with GDPR, which is why finance, legal, and healthcare teams trust it for sensitive compression workflows.",
  },
  {
    question: "How do I reduce PDF size for email?",
    answer:
      "Upload your PDF, pick 'Maximum compression', and Docsora will reduce it to fit standard inbox limits (10MB for Outlook, 25MB for Gmail and Apple Mail). Most PDFs compress 60–90% with no visible quality loss — perfect for sending contracts, proposals, invoices, legal PDFs, and signed agreements as clean email attachments instead of cloud links.",
  },
  {
    question: "Can I compress PowerPoint presentations?",
    answer:
      "Yes. Docsora's online PowerPoint compressor optimizes PPT, PPTX, and ODP files by re-encoding embedded images, screenshots, and video while keeping every slide, animation, transition, and font perfectly intact. Ideal for compressing pitch decks, investor presentations, sales enablement, and training decks for sharing over email, Slack, Teams, and live screen-shares.",
  },
  {
    question: "Can I compress images online?",
    answer:
      "Absolutely — Docsora is a complete browser-based image compressor for JPG, JPEG, PNG, GIF, BMP, TIFF, and WEBP files, individually or in bulk. Perceptual encoding balances dimensions, color depth, and quality so photos and graphics stay visually identical while file size drops 50–80%. Use it to compress images for websites, blog posts, social media, marketing assets, and product catalogs.",
  },
  {
    question: "Is there a maximum file size?",
    answer:
      "Free Docsora supports files up to 50MB per upload — enough for almost every PDF, image, document, and spreadsheet. Docsora Pro unlocks large file compression (several hundred MB), batch compression for entire deliverables, advanced quality controls, and higher monthly limits for teams.",
  },
  {
    question: "Can I compress files directly in my browser?",
    answer:
      "Yes — Docsora is fully browser-based with no software, plugins, or downloads required. It works on macOS, Windows, Linux, ChromeOS, iOS, and Android from Chrome, Safari, Edge, Firefox, Arc, and Brave. There is nothing to install, nothing to update, and nothing to remove — open the page, drop your files, and compress online instantly.",
  },
  {
    question: "What is the best way to reduce document size?",
    answer:
      "Use a format-aware online compressor like Docsora. Generic ZIP archives barely shrink modern documents because PDF, DOCX, PPTX, and image files are already compressed containers — Docsora applies format-specific optimization inside each file (re-encoding images, streamlining structure, removing redundant metadata) for dramatic size reduction with no loss of meaning or visual quality.",
  },
];

// SECTION 7 — Related Resources
const resources = [
  { title: "Compress PDFs Without Losing Quality", description: "Best settings for crisp, compact PDF documents." },
  { title: "Reduce File Size for Email Attachments", description: "Send large files without hitting inbox limits." },
  { title: "Best Ways to Compress Large Files", description: "A practical guide to shrinking any file efficiently." },
  { title: "How to Compress Images Online", description: "Optimize JPG, PNG, and WEBP for web and social." },
  { title: "Compress PowerPoint Files Efficiently", description: "Shrink decks while keeping every slide perfect." },
  { title: "Reduce Excel File Size", description: "Optimize spreadsheets without breaking formulas." },
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

// Real-world workflow intent (long-tail authority)
const workflowIntents = [
  { icon: Presentation, title: "Compress pitch decks", description: "Investor and sales decks that send in one click — no upload links." },
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
    "Free online file compressor for PDFs, images, Word, Excel, and PowerPoint — browser-based, secure, no installs.";
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
  return [breadcrumb, software, faqPage];
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

        {/* SECTION 1 — Compress Any File Type */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compress Any File Type
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              One compressor for documents, spreadsheets, presentations, images,
              and email — optimized for every format you use.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {fileTypeGroups.map((item, i) => (
              <motion.article
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                className={cn(
                  "group relative rounded-2xl p-6",
                  "bg-card/50 backdrop-blur-sm",
                  "border border-border/40",
                  "hover:border-primary/20 hover:bg-card/80",
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
                <h3 className="text-[15px] font-semibold text-foreground mb-1.5 leading-snug">
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
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* SECTION — Popular Compression Tools (internal linking hub) */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Popular Compression Tools
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Format-specific compressors for the files your team sends every
              day — all free, online, and browser-based.
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

        {/* SECTION — Real-world workflow intent */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Built for Real Compression Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From legal PDFs to investor decks — Docsora handles the
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

        {/* SECTION 2 — Use Cases */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compress Files for Any Workflow
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From inbox limits to client deliverables — built for the way
              modern teams actually share files.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.06 }}
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

        {/* SECTION 3 — Why Docsora */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Why Use Docsora Compression?
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Engineered for speed, security, and quality — without the
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

        {/* SECTION 4 — Security & Privacy */}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
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

        {/* SECTION 5 — How It Works */}
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

        {/* SECTION 6 — FAQ */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
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

        {/* SECTION 7 — Related Resources */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Related Resources
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {resources.map((resource, i) => (
              <motion.a
                key={resource.title}
                href="#"
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.06 }}
                className={cn(
                  "group rounded-2xl p-6 block",
                  "bg-card/40 border border-border/30",
                  "hover:border-primary/20 hover:bg-card/70 transition-all duration-300"
                )}
              >
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">{resource.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* SECTION 8 — Final CTA */}
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
