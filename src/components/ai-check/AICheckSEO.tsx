import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Presentation,
  Upload,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  MonitorSmartphone,
  Layers,
  Sparkles,
  Trash2,
  Globe2,
  BadgeCheck,
  Scale,
  Briefcase,
  PenLine,
  CheckCircle2,
  FileSearch,
  Edit3,
  GraduationCap,
  Wand2,
  Type,
  FileType,
  BookOpenCheck,
  HeartHandshake,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  aiCheckVariants,
  type AICheckVariantConfig,
} from "@/data/aiCheckVariants";
import { aiCheckCompareVariants } from "@/data/aiCheckCompareVariants";

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

// SECTION 1 - Check Any Document Type
const fileTypeGroups = [
  {
    category: "Reports & Documents",
    icon: FileText,
    formats: "PDF · DOC · DOCX · ODT · TXT",
    title: "Review PDF & Word Documents",
    description:
      "Audit reports, contracts and operational documents with editorial-grade language review.",
    slug: "proofread-pdf",
  },
  {
    category: "Presentations",
    icon: Presentation,
    formats: "PPT · PPTX",
    title: "Slide-by-Slide Deck Review",
    description:
      "Polish wording across pitch decks, board updates and training slides without touching layout.",
    slug: "proofread-presentations",
  },
  {
    category: "Web & Structured",
    icon: FileType,
    formats: "HTML · XML · ODT",
    title: "HTML & Structured Documents",
    description:
      "Run editorial review on HTML drafts, exported docs and structured content before publishing.",
    slug: "document-proofreader",
  },
  {
    category: "Long-form Drafts",
    icon: FileType,
    formats: "Pasted text · TXT",
    title: "Pasted Text & Draft Review",
    description:
      "Paste a draft section, executive summary or proposal block for a focused editorial pass.",
    slug: "professional-writing-checker",
  },
];

// SECTION 2 - Improve Professional Writing (intent cards)
const intentCards = [
  {
    slug: "improve-business-writing",
    icon: Briefcase,
    title: "Improve Business Writing",
    description:
      "Sharpen tone, clarity and structure across reports, proposals and internal comms.",
  },
  {
    slug: "review-contract-language",
    icon: Scale,
    title: "Proofread Contracts",
    description:
      "Audit contracts and NDAs for grammar, ambiguity and inconsistent language.",
  },
  {
    slug: "check-document-for-errors",
    icon: FileSearch,
    title: "Review Reports",
    description:
      "Run a final grammar, spelling and clarity audit before reports go out.",
  },
  {
    slug: "proofread-presentations",
    icon: Presentation,
    title: "Check Presentation Wording",
    description:
      "Polish slide copy slide-by-slide before meetings, pitches and demos.",
  },
  {
    slug: "fix-grammar-online",
    icon: PenLine,
    title: "Fix Grammar Mistakes",
    description:
      "Find and fix grammar issues across any business document, instantly.",
  },
  {
    slug: "ai-writing-assistant",
    icon: Sparkles,
    title: "Improve Writing Clarity",
    description:
      "Tighten ambiguous phrasing and reduce noise without rewriting your voice.",
  },
  {
    slug: "proofread-pdf",
    icon: FileText,
    title: "Proofread PDFs",
    description:
      "Review PDF reports, proposals and signed drafts directly in your browser.",
  },
  {
    slug: "professional-writing-checker",
    icon: GraduationCap,
    title: "Review Onboarding Documents",
    description:
      "Catch issues in HR documentation, training material and policy guides.",
  },
];

// SECTION 5 - Why Docsora AI Check
const benefits = [
  { icon: Sparkles, title: "Document intelligence", description: "Language-model analysis that reads tone, structure and context, not just sentences." },
  { icon: Briefcase, title: "Workflow-aware", description: "Calibrated for the documents teams actually circulate - reports, contracts, proposals, decks." },
  { icon: MonitorSmartphone, title: "Cloud-native", description: "Open in any browser on any device. No installs, plugins or extensions." },
  { icon: ShieldCheck, title: "Private by design", description: "Encrypted in transit, deleted after review, never used to train models." },
  { icon: Zap, title: "Editorial speed", description: "Whole-document suggestions surface in seconds across long reports and decks." },
  { icon: Layers, title: "Format coverage", description: "PDF, DOC, DOCX, ODT, HTML, PPT, PPTX and pasted text." },
  { icon: Lock, title: "Enterprise controls", description: "TLS, ISO 27001 and SOC 2-aligned operations for regulated teams." },
  { icon: BookOpenCheck, title: "Operational focus", description: "Built for reports and proposals - not student essays or generic copy." },
];

// SECTION 6 - Security
const securityPoints = [
  { icon: Lock, title: "Encrypted transit", description: "Uploads traverse TLS-secured channels end to end." },
  { icon: Trash2, title: "Auto-deletion", description: "Documents are purged from review servers after analysis." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to honour EU data protection requirements." },
  { icon: BadgeCheck, title: "ISO 27001", description: "Operated under audited information security controls." },
  { icon: ShieldCheck, title: "SOC 2 aligned", description: "Engineered against SOC 2 trust-services criteria." },
];

// SECTION 7 - How It Works
const steps = [
  { icon: Upload, title: "Upload a document", description: "Drop a PDF, Word file, deck or paste text directly into the workspace." },
  { icon: Wand2, title: "Editorial AI reviews", description: "Grammar, tone, structure and clarity assessed across the whole document." },
  { icon: CheckCircle2, title: "Refine and export", description: "Accept, reject or refine each suggestion - then export the polished version." },
];

// SECTION 8 - FAQ (semantically rich; covers core writing review intents)
const faqs = [
  {
    question: "How do I proofread a PDF online?",
    answer:
      "Drop any PDF into the upload area above. Docsora extracts the readable text from the PDF - including signed contracts, exported reports and scanned-then-OCR'd files - and runs editorial review for grammar, spelling, tone, consistency and clarity. Suggestions appear inline beside the original sentence so you can accept, reject or refine each one without altering the document's formatting. There is no conversion to Word, no copy-paste, and no software install: the entire workflow runs in your browser with documents deleted after analysis.",
  },
  {
    question: "What is the best AI proofreading tool for PDFs?",
    answer:
      "Docsora AI Check is built specifically for PDF document review - native PDF uploads, whole-document context, format-preserving suggestions and tone presets for executive, legal, simple and marketing audiences. Unlike browser extensions or general writing assistants, it treats a PDF as a structured business document: extracting the readable text, tracking tone across sections, and returning inline editorial suggestions tuned for reports, contracts and proposals.",
  },
  {
    question: "How can I improve professional writing online?",
    answer:
      "Upload your document or paste a draft into Docsora AI Check. The editorial AI reviews grammar, tone, structure and clarity across the entire document - not just per sentence - and highlights issues with severity tags so high-impact fixes surface first. Tone presets reshape ambiguous phrasing for the audience: executive for board updates, legal for contracts, simple for onboarding material, marketing for proposals. The output is a polished, on-brand version of your writing without losing your voice.",
  },
  {
    question: "What AI tool reviews contracts for grammar issues?",
    answer:
      "Docsora AI Check reviews contracts, NDAs, MSAs and legal drafts in PDF, DOC, DOCX or TXT. The editorial AI flags grammar, inconsistent terminology, ambiguous clauses and clarity gaps - the wording issues human reviewers routinely miss under deadline pressure. It does not replace legal counsel; it is the editorial pass that ensures the language is clean before it reaches counsel, counterparties or signature.",
  },
  {
    question: "What document types does Docsora AI Check support?",
    answer:
      "Docsora AI Check supports the formats professional teams actually circulate: PDF, DOC, DOCX, ODT, TXT, HTML, PPT and PPTX. A single workspace covers PDF proofreading, Word document review, PowerPoint deck analysis, HTML draft review and pasted-text auditing - removing the need to bounce between desktop proofreaders, browser extensions and copy-paste web checkers.",
  },
  {
    question: "What grammar checker supports PDF and DOCX files?",
    answer:
      "Docsora AI Check is one of the few editorial tools that handles PDF, DOC and DOCX natively in the browser. Upload a PDF report or a Word draft and the platform extracts the text, runs language-model proofreading, and returns suggestions inline. Both formats retain their original structure during review, so a PDF stays a PDF and a Word document keeps its styles.",
  },
  {
    question: "Is Docsora AI Check secure for confidential documents?",
    answer:
      "Every upload travels over end-to-end TLS and is processed inside an isolated review environment. Documents are deleted from review servers after analysis - Docsora never stores, indexes or trains models on customer content. The platform operates under ISO 27001 controls, aligns with SOC 2 trust-services criteria and is GDPR-ready, which is why finance, legal and operations teams use it for board packs, contracts and regulated filings.",
  },
  {
    question: "How do I proofread PowerPoint presentations?",
    answer:
      "Upload a PPT or PPTX deck and Docsora extracts text from every slide, then reviews grammar, tone, terminology and clarity slide by slide. Layout, theme, animations and master slides remain untouched - only the wording is analysed. The result is a polished deck ready for investors, executives or clients without the manual slide-by-slide proofread that usually delays delivery.",
  },
  {
    question: "Can I audit contracts and compliance documentation?",
    answer:
      "Yes. Contracts, NDAs, MSAs, compliance memos and regulatory filings (PDF, DOC, DOCX or TXT) can be reviewed for grammar, ambiguous wording, inconsistent terminology and clarity. Docsora is an editorial layer that strengthens the language of high-stakes documents - it complements legal and compliance review rather than replacing it.",
  },
  {
    question: "How does editorial AI proofreading work?",
    answer:
      "Docsora applies language-model analysis calibrated for professional writing. After upload, the system scans the whole document for grammar, spelling, punctuation, tone misalignment, terminology drift, ambiguous phrasing and structural clarity. Each suggestion is tagged with severity - low, medium, high - and surfaced beside its original sentence, so reviewers can accept individual edits, reject them, or apply every safe correction in one click.",
  },
  {
    question: "Can I review board reports and investor communications?",
    answer:
      "Yes. Board packs, investor updates, shareholder letters and quarterly memos are typical Docsora workloads. The executive tone preset tightens phrasing for senior audiences, the consistency check tracks terminology across sections, and the inline review flow lets the author and reviewer collaborate without bouncing the document through email.",
  },
  {
    question: "Does Docsora preserve document formatting?",
    answer:
      "Yes. Review is non-destructive. The original document - including PDF structure, PowerPoint master layouts, Word styles and ODT formatting - stays untouched while suggestions are surfaced in a side-by-side view. Exports preserve original layout where the format supports it.",
  },
  {
    question: "Do I need to install anything to use Docsora AI Check?",
    answer:
      "No. Docsora AI Check runs entirely in the browser - no software, plugins or extensions. It works across macOS, Windows, Linux, ChromeOS, iOS and Android in Chrome, Safari, Edge, Firefox, Arc and Brave. Open the page, drop a document, and the review workspace loads in seconds.",
  },
];

// Popular AI writing tool destinations (internal links to variant landings)
const popularToolSlugs = [
  "grammar-checker",
  "proofread-pdf",
  "document-proofreader",
  "ai-writing-assistant",
  "review-contract-language",
  "improve-business-writing",
  "proofread-presentations",
  "professional-writing-checker",
];

// Real-world workflow intent (long-tail authority)
const workflowIntents = [
  { icon: FileSearch, title: "Review board reports before circulation", description: "Editorial pass on board packs, exec summaries and quarterly memos." },
  { icon: Briefcase, title: "Proofread investor communications", description: "Tighten shareholder letters, fundraising updates and partner memos." },
  { icon: Presentation, title: "Polish sales proposals and RFPs", description: "Final-pass review on proposals, SOWs and pitch responses before they go out." },
  { icon: HeartHandshake, title: "Improve onboarding documents", description: "Sharpen HR handbooks, training material and policy guides for clarity." },
  { icon: Edit3, title: "Refine consulting deliverables", description: "Review client-facing reports, strategy memos and engagement summaries." },
  { icon: BookOpenCheck, title: "Standardise operational handbooks", description: "Improve readability across SOPs, playbooks and runbooks." },
];

// Long-tail / AI-search intent chips
const popularSearchSlugs: { slug: string; label: string; intent: string }[] = [
  { slug: "document-proofreader", label: "Document proofreader", intent: "Editorial review for board packs and contracts." },
  { slug: "proofread-pdf", label: "Proofread PDF online", intent: "Native PDF review with inline editorial suggestions." },
  { slug: "review-contract-language", label: "Review contract language", intent: "Editorial pass for legal and compliance teams." },
  { slug: "proofread-presentations", label: "Proofread presentations", intent: "Slide-by-slide deck review for executives and clients." },
  { slug: "improve-business-writing", label: "Improve business writing", intent: "Editorial AI for reports, proposals and memos." },
  { slug: "professional-writing-checker", label: "Professional writing checker", intent: "Tone-aware review for executive documents." },
  { slug: "grammar-checker", label: "AI grammar checker", intent: "Grammar, spelling and clarity across documents." },
  { slug: "ai-writing-assistant", label: "AI writing assistant", intent: "Tone and structure refinement for business writing." },
  { slug: "check-document-for-errors", label: "Check document for errors", intent: "Whole-document editorial audit." },
  { slug: "fix-grammar-online", label: "Fix grammar online", intent: "Free browser-based grammar review." },
  { slug: "proofreading-tool-online", label: "Online proofreading tool", intent: "Cloud-native proofreader for any document." },
];

export interface AICheckSEOProps {
  variant?: AICheckVariantConfig;
}

function buildJsonLd(variant?: AICheckVariantConfig) {
  const path = variant ? `/${variant.slug}` : "/ai-check";
  const name = variant?.h1 ?? "Docsora AI Check";
  const description =
    variant?.metaDescription ??
    "AI-powered document review and writing optimization for PDFs, Word, PowerPoint and reports - browser-based, secure, no installs.";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "AI Check", item: "/ai-check" },
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
      ratingCount: "832",
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
    name: variant ? `How to ${variant.cardLabel}` : "How to review documents with AI online",
    description,
    totalTime: "PT30S",
    step: [
      { "@type": "HowToStep", position: 1, name: "Upload", text: "Drag and drop your document into the upload area or paste your text." },
      { "@type": "HowToStep", position: 2, name: "Review", text: "Docsora's AI analyzes grammar, tone and clarity in seconds." },
      { "@type": "HowToStep", position: 3, name: "Apply", text: "Accept inline suggestions and export the polished document." },
    ],
  };
  return [breadcrumb, software, faqPage, howTo];
}

export function AICheckSEO({ variant }: AICheckSEOProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFaqs = variant?.faq ?? faqs;
  const popularTools = popularToolSlugs
    .map((slug) => aiCheckVariants.find((v) => v.slug === slug))
    .filter((v): v is AICheckVariantConfig => Boolean(v))
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
                  AI · Online · Secure
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
                  to="/ai-check"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  <span>Explore the full Docsora AI Check suite</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </section>
        )}

        {/* Variant use cases */}
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
          </section>
        )}

        {/* SECTION 1 - Check Any Document Type */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Supported Document Types
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Docsora AI Check supports editorial review across PDFs, Word
              documents, presentations, HTML files and professional business
              documentation - one workspace for every document format your
              team circulates.
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

        {/* SECTION 2 - Improve Professional Writing (variant pages only) */}
        {variant && (
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Wand2 className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Professional writing review
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Improve Professional Writing Instantly
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Editorial review across reports, proposals, contracts and
              presentations - tone, structure and clarity tightened in a
              single workspace.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {intentCards
              .filter((c) => c.slug !== variant?.slug)
              .map((card, i) => (
                <motion.div
                  key={card.slug}
                  initial={staggerItem.initial}
                  whileInView={staggerItem.whileInView}
                  viewport={staggerItem.viewport}
                  transition={{ ...staggerItem.transition, delay: i * 0.04 }}
                >
                  <Link
                    to={`/${card.slug}`}
                    className={cn(
                      "group relative block rounded-2xl p-5 h-full overflow-hidden",
                      "bg-card/40 border border-border/30",
                      "hover:border-primary/25 hover:bg-card/70",
                      "transition-all duration-300"
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                      <card.icon className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-muted-foreground/75 leading-relaxed mb-3">
                      {card.description}
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
        )}

        {/* SECTION 3 - Popular AI Writing Tools */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Explore Professional Writing Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Dedicated workspaces for the editorial workflows professional
              teams rely on - from PDF proofreading to contract language
              review.
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

        {/* SECTION 4 - Real Business Writing Workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Operational Document Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From board reports to investor communications - Docsora handles
              the editorial workflows generic writing tools were never built
              for.
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

        {/* SECTION 5 - Why Docsora AI Check */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Why Use Docsora AI Check
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Engineered for professional writing workflows - secure, fast and
              business-focused.
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

        {/* SECTION 6 - Security */}
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
                Secure AI Document Review
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Privacy-first architecture trusted by teams in finance, legal
                and operations.
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

        {/* SECTION 7 - How It Works */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              How Docsora AI Check Works
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
                  <p className="text-sm text-muted-foreground/70 max-w-[220px]">{step.description}</p>
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

        {/* SECTION 8 - FAQ */}
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

        {/* SECTION 9 - Explore Professional Writing Workflows (chips + cards on variants) */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              {variant ? "Related Writing Workflows" : "Explore More Writing Workflows"}
            </h2>
          </motion.div>

          {variant && (
          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {aiCheckVariants
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
          )}

          <motion.div {...fadeUp} className="mt-10">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-5">
              Explore professional writing workflows
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

        {/* SECTION 10 - Compare AI Writing Platforms */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compare AI Writing Platforms
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              See how Docsora AI Check compares to other writing platforms
              across review depth, file support, tone control and workflow
              integration.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {aiCheckCompareVariants.map((c, i) => (
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

        {/* SECTION 11 - Final CTA */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "text-center rounded-3xl p-12 md:p-16",
              "bg-card/40 border border-border/30 backdrop-blur-sm"
            )}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Review your documents with AI precision.
            </h2>
            <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
              No signup required. Drop a document above and receive AI-powered
              writing suggestions in seconds.
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
              <Type className="w-4 h-4" />
              Review with AI
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}