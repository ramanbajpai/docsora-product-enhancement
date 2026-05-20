import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  FileType,
  Presentation,
  Code2,
  Languages,
  Globe2,
  ShieldCheck,
  Lock,
  Trash2,
  BadgeCheck,
  Layers,
  Sparkles,
  Zap,
  MonitorSmartphone,
  CloudOff,
  Upload,
  ArrowRight,
  Clock3,
  BookOpen,
  HelpCircle,
  GitCompare,
  Files,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  documentToolVariants,
  workflowVariants,
  languagePairVariants,
  type TranslateVariantConfig,
} from "@/data/translateVariants";
import { translateGuides } from "@/data/translateGuides";
import { translateCompareVariants } from "@/data/translateCompareVariants";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

interface TranslateSEOProps {
  variant?: TranslateVariantConfig;
}

const fileTypeGroups = [
  {
    category: "Documents",
    icon: FileText,
    formats: "PDF · DOC · DOCX · ODT · TXT",
    title: "Translate PDFs & Word Documents",
    description:
      "Translate entire PDFs, Word documents, and rich-text files into 75+ languages while preserving formatting and layout.",
    slug: "translate-pdf",
  },
  {
    category: "Presentations",
    icon: Presentation,
    formats: "PPT · PPTX",
    title: "Translate PowerPoint Presentations",
    description:
      "Localize decks slide-by-slide with layouts, fonts, animations, and speaker notes intact.",
    slug: "translate-powerpoint",
  },
  {
    category: "Web & Markup",
    icon: Code2,
    formats: "HTML",
    title: "Translate HTML Files",
    description:
      "Tag-aware HTML translation that respects markup, attributes, and document structure.",
    slug: "translate-html-files",
  },
  {
    category: "Plain Text",
    icon: FileType,
    formats: "TXT",
    title: "Translate Plain Text Files",
    description:
      "Translate TXT exports, transcripts, and documentation drafts while keeping line structure intact.",
    slug: "translate-txt-files",
  },
];

const languageGroups = [
  {
    region: "Europe",
    examples:
      "English · French · German · Spanish · Italian · Dutch · Portuguese · Polish · Swedish · Greek · Romanian · Czech",
  },
  {
    region: "Asia",
    examples:
      "Chinese Simplified · Chinese Traditional · Japanese · Korean · Hindi · Indonesian · Vietnamese · Thai · Malay · Tamil · Telugu",
  },
  {
    region: "Middle East & Africa",
    examples:
      "Arabic · Hebrew · Turkish · Persian · Swahili · Amharic · Hausa · Somali · Urdu · Pashto",
  },
  {
    region: "Americas",
    examples:
      "English (US) · Spanish (LATAM) · Portuguese (Brazil) · French (Canada) · Haitian Creole",
  },
  {
    region: "South Asia",
    examples:
      "Hindi · Bengali · Urdu · Tamil · Telugu · Marathi · Gujarati · Punjabi · Sinhala · Nepali",
  },
  {
    region: "Eastern Europe & CIS",
    examples:
      "Russian · Ukrainian · Polish · Romanian · Czech · Slovak · Hungarian · Bulgarian · Serbian · Croatian · Lithuanian · Estonian",
  },
];

const allSupportedLanguages = [
  "Afrikaans","Albanian","Amharic","Arabic","Armenian","Azerbaijani","Bengali","Bosnian","Bulgarian","Burmese",
  "Catalan","Chinese (Simplified)","Chinese (Traditional)","Croatian","Czech","Danish","Dutch","English (UK)","English (US)","Estonian",
  "Filipino","Finnish","French","French (Canada)","Galician","Georgian","German","Greek","Gujarati","Haitian Creole",
  "Hausa","Hebrew","Hindi","Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Kannada",
  "Kazakh","Khmer","Korean","Kurdish","Lao","Latvian","Lithuanian","Macedonian","Malay","Malayalam",
  "Maltese","Marathi","Mongolian","Nepali","Norwegian","Pashto","Persian","Polish","Portuguese","Portuguese (Brazil)",
  "Punjabi","Romanian","Russian","Serbian","Sinhala","Slovak","Slovenian","Somali","Spanish","Spanish (LATAM)",
  "Swahili","Swedish","Tamil","Telugu","Thai","Turkish","Ukrainian","Urdu","Uzbek","Vietnamese","Welsh","Yoruba","Zulu",
];

const benefits = [
  { icon: Layers, title: "Whole-document translation", description: "Translate the entire file — not just snippets — in one workflow." },
  { icon: Sparkles, title: "Formatting preserved", description: "Layouts, fonts, tables, and slide structure stay visually identical." },
  { icon: Globe2, title: "75+ languages", description: "Every major language used in international business and operations." },
  { icon: Zap, title: "Browser-native speed", description: "Translate decks, contracts, and reports in seconds." },
  { icon: Lock, title: "Privacy-first architecture", description: "Files are isolated, never indexed, never used to train models." },
  { icon: ShieldCheck, title: "Enterprise-aligned", description: "TLS, GDPR alignment, and ISO 27001 controls by default." },
  { icon: MonitorSmartphone, title: "Runs anywhere", description: "macOS, Windows, Linux, iOS, Android — all major browsers." },
  { icon: CloudOff, title: "Zero install", description: "No desktop apps, plugins, or downloads — open and translate." },
];

const securityPoints = [
  { icon: Lock, title: "Encrypted uploads", description: "All files travel over TLS-secured connections." },
  { icon: Trash2, title: "Automatic deletion", description: "Files are removed from our servers after processing." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to respect EU data protection standards." },
  { icon: BadgeCheck, title: "ISO 27001", description: "Operated under enterprise-grade security controls." },
  { icon: ShieldCheck, title: "SOC 2 aligned", description: "Built with controls aligned to enterprise SOC 2 standards." },
];

const steps = [
  { icon: Upload, title: "Upload", description: "Drop any document, deck, or report into your browser." },
  { icon: Languages, title: "Translate", description: "Pick a target language — Docsora localizes the entire document." },
  { icon: ArrowRight, title: "Download", description: "Get the translated file in the same format, ready to share." },
];

const faqs = [
  {
    question: "How do I translate a PDF without losing formatting?",
    answer:
      "Drop your PDF into the upload area above and pick a target language. Docsora translates the entire document into 75+ languages while preserving layouts, fonts, tables, and pagination — no copy-paste, no manual reassembly. The translated PDF downloads in the same format, ready to share or e-sign.",
  },
  {
    question: "What is the best document translation tool online?",
    answer:
      "Docsora is built for whole-document translation: PDFs, DOCX, PPTX, HTML, and TXT files translated into 75+ languages with formatting preserved. Unlike phrase-based translators, it's a workflow-native platform with sharing, signing, and tracking in the same browser-based workspace.",
  },
  {
    question: "Can I translate PowerPoint presentations?",
    answer:
      "Yes. Docsora's PPTX translator localizes every slide while keeping layouts, fonts, animations, charts, and speaker notes intact — ideal for investor updates, board reviews, and global training material.",
  },
  {
    question: "How do I translate Word documents into another language?",
    answer:
      "Upload a DOC, DOCX, or ODT file and pick a target language. Docsora translates the entire document while keeping styles, headings, lists, and tables intact — and downloads it in the same Word format.",
  },
  {
    question: "What translation platform supports PDF and PPTX?",
    answer:
      "Docsora supports PDF, DOC, DOCX, ODT, TXT, HTML, PPT, and PPTX — one multilingual workspace covering documents, decks, contracts, and operational documentation.",
  },
  {
    question: "How can I translate contracts online?",
    answer:
      "Upload your contract (PDF or DOCX) and pick a target language. Docsora preserves clause numbering, defined terms, and signature blocks while translating into 75+ languages — secure enough for legal operations and counterparty review.",
  },
  {
    question: "Can I translate onboarding documents and training material?",
    answer:
      "Yes. Docsora translates onboarding decks, handbooks, and training modules into 75+ languages while keeping structure and brand formatting intact — built for global HR and L&D teams.",
  },
  {
    question: "What is the best multilingual document workflow?",
    answer:
      "Author the source document once, translate into every target language inside Docsora, and share, sign, or track the localized variants centrally. One source of truth — every region operates in their language.",
  },
  {
    question: "How do I translate presentations while preserving layout?",
    answer:
      "Docsora's PPTX translator translates each slide in place. Layouts, type hierarchy, charts, and embedded media all stay visually identical, so the translated deck looks exactly like the original.",
  },
  {
    question: "Can I translate HTML files online?",
    answer:
      "Yes. Docsora's HTML translator is tag-aware — it translates user-visible content while leaving tags, attributes, and scripts intact.",
  },
];

export const TranslateSEO = ({ variant }: TranslateSEOProps) => {
  const isVariant = !!variant;

  return (
    <section className="relative w-full bg-background border-t border-border/40">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-24 md:space-y-32">
        {/* Variant intro / long copy */}
        {isVariant && (
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              {variant!.h1}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed">
              {variant!.longCopy}
            </p>
          </motion.div>
        )}

        {/* SECTION — Translate any document type */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Files className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Document Coverage
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Translate every business document
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              Docsora translates PDFs, Word documents, presentations, HTML, and plain text into 75+ languages — with layouts, fonts, and structure preserved end-to-end.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fileTypeGroups.map((group) => (
              <Link
                key={group.slug}
                to={`/${group.slug}`}
                className={cn(
                  "group rounded-2xl p-6 bg-card/40 border border-border/30",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors shrink-0">
                    <group.icon className="w-[18px] h-[18px] text-primary/80" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/60 mb-1">
                      {group.category} · {group.formats}
                    </div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                      {group.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION — 75+ languages */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Globe2 className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                75+ Languages
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Built for global teams
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              A multilingual document infrastructure for global operations — multilingual onboarding, international client delivery, cross-border documentation, multilingual compliance workflows, translated investor presentations, and business communication across every region.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {languageGroups.map((g) => (
              <div
                key={g.region}
                className="rounded-2xl p-6 bg-card/40 border border-border/30"
              >
                <div className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80 mb-2">
                  {g.region}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">
                  {g.examples}
                </p>
              </div>
            ))}
          </div>

          {/* Semantic support copy */}
          <p className="mt-8 max-w-3xl mx-auto text-center text-sm text-muted-foreground/75 leading-relaxed">
            Docsora Translate supports multilingual document workflows across contracts, presentations, onboarding documents, operational handbooks, reports, PDFs, and business communication in 75+ languages — built for global teams running international operations.
          </p>

          {/* View all supported languages — expandable, crawlable */}
          <div className="mt-8 max-w-4xl mx-auto">
            <Collapsible>
              <CollapsibleTrigger
                className={cn(
                  "group w-full flex items-center justify-center gap-2",
                  "px-5 py-3 rounded-xl border border-border/30 bg-card/30",
                  "text-sm font-medium text-foreground/85",
                  "hover:border-primary/25 hover:bg-card/60 transition-colors",
                )}
              >
                <span>View all supported languages</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="mt-5 rounded-2xl border border-border/30 bg-card/30 p-6 md:p-8">
                  <ul className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-x-8 gap-y-1 text-[13px] text-muted-foreground/85 leading-7">
                    {allSupportedLanguages.map((lang) => (
                      <li key={lang} className="break-inside-avoid">
                        {lang}
                      </li>
                    ))}
                  </ul>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Language-pair landing grid — long-tail semantic surface */}
          <div className="mt-14">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight mb-2">
                Popular language workflows
              </h3>
              <p className="text-sm text-muted-foreground/75 leading-relaxed">
                Purpose-built landing pages for multilingual document workflows across every region.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {languagePairVariants.map((p) => (
                <Link
                  key={p.slug}
                  to={`/${p.slug}`}
                  className={cn(
                    "group rounded-xl p-4 bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                  )}
                >
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {p.cardLabel}
                  </h4>
                  <p className="text-xs text-muted-foreground/75 leading-relaxed">
                    {p.cardDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION — Workflow translation pages */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Workflow translation for global operations
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              Purpose-built workflows for the documents that move international business forward.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflowVariants.map((w) => (
              <Link
                key={w.slug}
                to={`/${w.slug}`}
                className={cn(
                  "group rounded-xl p-5 bg-card/40 border border-border/30",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                  <w.cardIcon className="w-4 h-4 text-primary/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {w.cardLabel}
                </h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">
                  {w.cardDescription}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Document tools */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Dedicated translation tools
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              A focused page for every format and workflow — built so teams find exactly the right tool.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {documentToolVariants.map((v) => (
              <Link
                key={v.slug}
                to={`/${v.slug}`}
                className={cn(
                  "group rounded-xl p-5 bg-card/40 border border-border/30",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                  <v.cardIcon className="w-4 h-4 text-primary/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {v.cardLabel}
                </h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">
                  {v.cardDescription}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Why Docsora */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Why teams choose Docsora Translate
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              A document-native translation platform tuned for international operations — not a phrase translator with a deck wrapper.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl p-5 bg-card/40 border border-border/30"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                  <b.icon className="w-4 h-4 text-primary/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION — How it works */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              How document translation works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 bg-card/40 border border-border/30 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-4 h-4 text-primary/80" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/70 mb-1">
                  Step {i + 1}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Security */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Enterprise-grade security
            </h2>
            <p className="text-base text-muted-foreground/80 leading-relaxed">
              Built for legal, finance, HR, and operations teams handling confidential documents.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {securityPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-xl p-5 bg-card/40 border border-border/30"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                  <p.icon className="w-4 h-4 text-primary/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Guides */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <BookOpen className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Knowledge Guides
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Translation knowledge for global teams
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {translateGuides.slice(0, 9).map((g) => (
              <Link
                key={g.slug}
                to={`/translate-guides/${g.slug}`}
                className={cn(
                  "group block rounded-2xl p-5 bg-card/40 border border-border/30 h-full",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                  <g.icon className="w-4 h-4 text-primary/70" />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] font-medium text-muted-foreground/60 mb-1.5">
                  <Clock3 className="w-3 h-3" />
                  {g.readTime}
                </div>
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                  {g.h1}
                </h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed line-clamp-3">
                  {g.intro}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Comparisons */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <GitCompare className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Comparisons
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              How Docsora compares
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {translateCompareVariants.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className={cn(
                  "group rounded-2xl p-6 bg-card/40 border border-border/30",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {c.cardTitle}
                </h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {c.cardSummary}
                </p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* SECTION — Translation Questions Answered */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <HelpCircle className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Translation Questions Answered
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Document translation explained
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {(variant ? [...variant.faq, ...faqs].slice(0, 12) : faqs).map((f, i) => (
                <AccordionItem
                  key={`${f.question}-${i}`}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border/30 bg-card/40 px-5"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4 text-left">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/85 leading-relaxed pb-4">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* SECTION — Final CTA */}
        <motion.section {...fadeUp} className="relative">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[32px]">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-primary/12 blur-[120px]" />
            <div className="absolute top-1/2 left-1/4 w-[320px] h-[320px] rounded-full bg-primary/8 blur-[100px]" />
          </div>
          <div
            className={cn(
              "relative overflow-hidden text-center rounded-[28px] px-8 py-16 md:px-16 md:py-20",
              "bg-gradient-to-b from-card/70 via-card/50 to-card/40",
              "border border-border/40 backdrop-blur-sm",
              "shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_30px_60px_-30px_hsl(var(--primary)/0.25),0_18px_40px_-20px_hsl(var(--foreground)/0.12)]",
            )}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"
              animate={{ x: ["15%", "-15%", "-15%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Translate operational documents across 75+ languages.
            </h2>
            <p className="text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-8">
              Whole-document translation built for modern teams — PDFs, decks, contracts, and business documentation, formatting preserved end-to-end.
            </p>
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex"
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              <Link
                to="/translate"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-7 py-3.5 rounded-xl text-sm font-semibold",
                  "text-primary-foreground bg-gradient-to-b from-primary to-primary/90",
                  "shadow-lg shadow-primary/25 hover:shadow-primary/35",
                  "transition-shadow duration-200",
                )}
              >
                <Languages className="w-4 h-4" />
                Translate a document
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default TranslateSEO;