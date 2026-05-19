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
    slug: "check-contract-language",
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
      "Drop any PDF into the upload area above. Docsora AI Check extracts the readable text from your PDF and runs AI proofreading for grammar, spelling, tone and clarity - returning inline suggestions you can review one by one. There's no need to convert to Word, copy text out, or install software. It works directly in your browser, with files deleted after processing for privacy-first review of contracts, reports and proposals.",
  },
  {
    question: "Can AI improve professional writing?",
    answer:
      "Yes. Docsora's AI is tuned specifically for business and operational writing - reports, proposals, contracts, board memos, decks and PDFs. It catches grammar and spelling issues, sharpens tone with executive, legal, simple and marketing presets, and tightens structure and clarity. It's an editorial layer for serious documents, not a generic copywriting tool or student essay checker.",
  },
  {
    question: "What document types are supported?",
    answer:
      "Docsora AI Check supports the formats business teams actually work with: TXT, DOC, DOCX, ODT, PDF, HTML, PPT and PPTX. One browser-based tool covers grammar checking, PDF proofreading, document review, presentation proofreading and pasted-text review - removing the need to bounce between desktop grammar tools and copy-paste web checkers.",
  },
  {
    question: "Is Docsora AI Check secure?",
    answer:
      "Every upload runs over end-to-end TLS encryption and is processed inside an isolated, privacy-first environment. Files are automatically deleted from our servers after review - Docsora never stores, indexes or trains models on your documents. The platform is operated under ISO 27001 controls and aligned with SOC 2 and GDPR, which is why finance, legal and operations teams use it for sensitive reviewing workflows.",
  },
  {
    question: "Can I review PowerPoint presentations?",
    answer:
      "Yes. Upload a PPT or PPTX deck and Docsora AI Check extracts text from every slide, then runs AI grammar, tone and clarity analysis slide by slide. Your design, layout, animations and theme are untouched - only the slide copy is reviewed. Ideal for investor decks, sales presentations, kickoff decks and training material before they go to clients or executives.",
  },
  {
    question: "Can I check contracts for grammar mistakes?",
    answer:
      "Yes. Drop a contract, NDA, MSA or legal draft (PDF, DOC, DOCX or TXT) into Docsora AI Check and the AI returns grammar, clarity and consistency suggestions inline. Docsora is an editorial layer that strengthens contract language - it does not replace legal counsel, but it catches the wording issues that human reviewers most often miss.",
  },
  {
    question: "How does AI proofreading work?",
    answer:
      "Docsora uses language-model analysis trained for professional writing. After upload, the AI scans the entire document for grammar, spelling, punctuation, tone misalignment, ambiguous phrasing and clarity issues. Each suggestion is tagged with severity (low, medium, high) and shown alongside the original sentence so you can accept individual fixes, reject them, or apply all safe corrections in one click.",
  },
  {
    question: "Can I improve business writing online?",
    answer:
      "Yes. Docsora is built for browser-based business writing improvement - upload a report, proposal or memo and receive AI suggestions tuned for executive, legal, simple or marketing tone. It's the fastest way to run a pre-send writing audit without switching between desktop grammar tools, browser extensions and AI rewriters.",
  },
  {
    question: "Does Docsora preserve formatting?",
    answer:
      "Yes. Proofreading is non-destructive - your original document and its formatting stay untouched during review. Suggestions are surfaced in a side-by-side view so you can apply changes consciously rather than overwriting the source file. PowerPoint layouts, PDF structure and Word styles are preserved on export where possible.",
  },
  {
    question: "Is Docsora browser-based?",
    answer:
      "Yes. Docsora AI Check is fully browser-based with no software, plugins or extensions required. It works on macOS, Windows, Linux, ChromeOS, iOS and Android from Chrome, Safari, Edge, Firefox, Arc and Brave. Open the page, drop your document and review online instantly.",
  },
];

// Popular AI writing tool destinations (internal links to variant landings)
const popularToolSlugs = [
  "grammar-checker",
  "proofread-pdf",
  "ai-writing-assistant",
  "check-contract-language",
  "improve-business-writing",
  "proofread-presentations",
  "check-document-for-errors",
  "fix-grammar-online",
];

// Real-world workflow intent (long-tail authority)
const workflowIntents = [
  { icon: Presentation, title: "Review investor pitch decks", description: "Slide-by-slide grammar and tone review before the room sees it." },
  { icon: Scale, title: "Proofread legal contracts", description: "Catch ambiguity and inconsistent wording before counsel review." },
  { icon: HeartHandshake, title: "Improve onboarding documents", description: "Tighten HR docs, handbooks and policy material for clarity." },
  { icon: Briefcase, title: "Review proposals before sending", description: "Final-pass audits on sales proposals and RFP responses." },
  { icon: FileSearch, title: "Check reports for grammar issues", description: "Audit operational reports and exec summaries before circulation." },
  { icon: Edit3, title: "Improve client deliverables", description: "Polish agency and consultancy work before client review." },
];

// Long-tail / AI-search intent chips
const popularSearchSlugs: { slug: string; label: string; intent: string }[] = [
  { slug: "grammar-checker", label: "AI grammar checker", intent: "Grammar, spelling and clarity in seconds." },
  { slug: "proofread-pdf", label: "Proofread PDF online", intent: "Native PDF review with AI suggestions." },
  { slug: "ai-writing-assistant", label: "AI writing assistant", intent: "Tone, clarity and structure for business writing." },
  { slug: "improve-business-writing", label: "Improve business writing", intent: "Built for reports and proposals." },
  { slug: "check-contract-language", label: "Check contract language", intent: "AI review for legal documents." },
  { slug: "proofread-presentations", label: "Proofread presentations", intent: "Slide-by-slide PowerPoint review." },
  { slug: "fix-grammar-online", label: "Fix grammar online", intent: "Free browser-based grammar fixer." },
  { slug: "check-document-for-errors", label: "Check document for errors", intent: "Full-document AI audit." },
  { slug: "professional-writing-checker", label: "Professional writing checker", intent: "For executive and client-facing docs." },
  { slug: "proofreading-tool-online", label: "Proofreading tool online", intent: "AI proofreader for any business doc." },
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
              Check Any Document Type
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Analyze grammar, clarity, spelling and professional writing
              quality across business documents, reports, PDFs and
              presentations.
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

        {/* SECTION 2 - Improve Professional Writing */}
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
              Enhance grammar, tone, readability and clarity across reports,
              proposals, contracts and presentations without leaving your
              browser.
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

        {/* SECTION 3 - Popular AI Writing Tools */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Popular AI Writing & Proofreading Tools
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Dedicated entry points for the AI writing workflows teams use
              every day - all free, browser-based and secure.
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
              Built for Real Document Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From investor decks to legal contracts - Docsora AI Check
              handles the document review workflows generic grammar tools
              ignore.
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

        {/* SECTION 9 - Related AI Writing Tools (+ long-tail search chips) */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Related AI Writing Tools
            </h2>
          </motion.div>

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

          <motion.div {...fadeUp} className="mt-10">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-5">
              Popular AI writing searches
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