import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Languages,
  Sparkles,
  Layers,
  ShieldCheck,
  Upload,
  CheckCircle2,
  BookOpen,
  GitCompare,
  HelpCircle,
  Clock3,
  Globe2,
  Zap,
  Building2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  translateVariants,
  type TranslateVariantConfig,
} from "@/data/translateVariants";
import { translateGuides } from "@/data/translateGuides";
import { translateCompareVariants } from "@/data/translateCompareVariants";
import { DocumentMockup } from "./DocumentMockup";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

function detectMockupKind(v: TranslateVariantConfig): "pdf" | "deck" | "doc" | "contract" | "report" {
  const s = v.slug.toLowerCase();
  if (s.includes("ppt") || s.includes("presentation") || s.includes("slides") || s.includes("deck") || s.includes("board") || s.includes("investor")) return "deck";
  if (s.includes("contract") || s.includes("legal")) return "contract";
  if (s.includes("report")) return "report";
  if (s.includes("word") || s.includes("docx")) return "doc";
  return "pdf";
}

function detectTargetLanguage(v: TranslateVariantConfig): string {
  const map: Record<string, string> = {
    spanish: "Spanish",
    arabic: "Arabic",
    french: "French",
    german: "German",
    chinese: "Chinese",
    japanese: "Japanese",
    hindi: "Hindi",
    portuguese: "Portuguese",
  };
  const s = v.slug.toLowerCase();
  for (const key of Object.keys(map)) {
    if (s.includes(`-to-${key}`) || s.endsWith(`-${key}`)) return map[key];
  }
  return "75+ Languages";
}

function detectSourceLanguage(v: TranslateVariantConfig): string {
  if (v.slug.toLowerCase().startsWith("translate-english-to-")) return "English";
  return "Source";
}

// Operational entity richness — varies by category for AI-search depth
const useCasesByCategory: Record<TranslateVariantConfig["category"], { icon: typeof Building2; title: string; desc: string }[]> = {
  Document: [
    { icon: Building2, title: "Multinational legal review", desc: "Counterparty review across regions without losing clause numbering or defined terms." },
    { icon: Globe2, title: "Cross-border compliance", desc: "Localize policies and disclosures for multilingual regulatory submissions." },
    { icon: Zap, title: "Operational documentation", desc: "Keep SOPs, runbooks, and field manuals consistent across every region." },
    { icon: Layers, title: "Investor reporting", desc: "Localize quarterly reports and board memos with charts and tables intact." },
  ],
  Workflow: [
    { icon: Building2, title: "Global HR onboarding", desc: "Translate handbooks, offer letters, and welcome packs for new hires in every region." },
    { icon: Globe2, title: "Multilingual enablement", desc: "Localize sales decks, training modules, and playbooks for international teams." },
    { icon: Zap, title: "International board comms", desc: "Translate board presentations and executive memos for multinational leadership." },
    { icon: Layers, title: "Franchise & regional ops", desc: "Distribute operational runbooks and product documentation across territories." },
  ],
  LanguagePair: [
    { icon: Building2, title: "Regional operations", desc: "Run multilingual document workflows across regional offices and partners." },
    { icon: Globe2, title: "Multilingual onboarding", desc: "Deliver consistent onboarding documentation to new hires in their language." },
    { icon: Zap, title: "Cross-border sales", desc: "Translate proposals, SOWs, and RFPs for international client delivery." },
    { icon: Layers, title: "Localized compliance", desc: "Support multilingual compliance, audit, and regulatory documentation." },
  ],
};

const formattingPoints = [
  {
    icon: Layers,
    title: "Layouts & visual hierarchy preserved",
    desc: "Page structure, columns, spacing, and visual hierarchy stay visually identical to the source.",
  },
  {
    icon: Sparkles,
    title: "Tables, charts & speaker notes intact",
    desc: "Tables, chart labels, slide notes, captions, and embedded media remain structurally accurate.",
  },
  {
    icon: ShieldCheck,
    title: "Typography & document fidelity",
    desc: "Fonts, headings, numbering, and clause structure carry through end-to-end — no manual reassembly.",
  },
];

const workflowSteps = [
  { icon: Upload, title: "Upload", desc: "Drop your file into the translator above." },
  { icon: Languages, title: "Translate", desc: "Pick a target language — Docsora localizes the entire document." },
  { icon: CheckCircle2, title: "Download", desc: "Get the translated file in the same format, ready to share." },
];

function buildJsonLd(variant: TranslateVariantConfig) {
  const path = `/${variant.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Translate", item: "/translate" },
      { "@type": "ListItem", position: 3, name: variant.h1, item: path },
    ],
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: variant.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: variant.title,
    description: variant.metaDescription,
    url: path,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: "Docsora", url: "/" },
    about: {
      "@type": "SoftwareApplication",
      name: "Docsora Translate",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
    },
  };
  return [breadcrumb, faqPage, webPage];
}

function relatedGuidesFor(variant: TranslateVariantConfig) {
  const s = variant.slug.toLowerCase();
  const prioritized = translateGuides.filter((g) =>
    g.relatedTools.some((t) => t.slug === variant.slug) ||
    s.includes(g.primaryToolSlug.replace("translate-", "")),
  );
  const fallback = translateGuides.filter((g) => !prioritized.includes(g));
  return [...prioritized, ...fallback].slice(0, 3);
}

interface Props {
  variant: TranslateVariantConfig;
}

export const TranslateVariantLanding = ({ variant }: Props) => {
  const target = detectTargetLanguage(variant);
  const source = detectSourceLanguage(variant);
  const mockupKind = detectMockupKind(variant);
  const useCases = useCasesByCategory[variant.category];
  const related = translateVariants
    .filter((v) => v.category === variant.category && v.slug !== variant.slug)
    .slice(0, 6);
  const relatedGuides = relatedGuidesFor(variant);
  const relatedComparisons = translateCompareVariants.slice(0, 2);
  const jsonLd = buildJsonLd(variant);
  const formatLabel = variant.acceptedFormats.split("·")[0]?.trim() || "Document";

  return (
    <section className="relative w-full bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-24 md:space-y-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="-mt-8">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li className="opacity-40">/</li>
            <li><Link to="/translate" className="hover:text-foreground transition-colors">Translate</Link></li>
            <li className="opacity-40">/</li>
            <li className="text-foreground/80 font-medium truncate">{variant.cardLabel}</li>
          </ol>
        </nav>

        {/* HERO — purpose-built */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
            <variant.cardIcon className="w-3 h-3 text-primary/80" />
            <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
              {variant.acceptedFormats}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            {variant.h1}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed mb-8">
            {variant.longCopy}
          </p>
          <Link
            to="/translate"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "px-6 py-3 rounded-xl text-sm font-semibold",
              "text-primary-foreground bg-gradient-to-b from-primary to-primary/90",
              "shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-shadow",
            )}
          >
            <Languages className="w-4 h-4" />
            Open the translator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* VISUAL PROOF — document mockup */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Formatting Preserved
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Translated documents that still look like the original
            </h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Whole-document translation that preserves layouts, fonts, tables, slide structure, charts, speaker notes, and operational usability — end to end.
            </p>
          </div>
          <DocumentMockup
            kind={mockupKind}
            sourceLanguage={source}
            targetLanguage={target}
            formatLabel={formatLabel}
            title={`${variant.cardLabel} — document fidelity preserved`}
          />
        </motion.section>

        {/* FORMATTING preservation — 3 value props */}
        <motion.section {...fadeUp}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formattingPoints.map((p) => (
              <div key={p.title} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <p.icon className="w-4 h-4 text-primary/80" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2">{p.title}</h4>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* OPERATIONAL USE CASES — entity-rich */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Built for global operations
            </h3>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              A multilingual document workflow used by international teams across HR, legal, finance, sales, and operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {useCases.map((uc) => (
              <div key={uc.title} className="rounded-xl p-5 bg-card/40 border border-border/30">
                <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                  <uc.icon className="w-4 h-4 text-primary/80" />
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1.5">{uc.title}</h4>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* HOW IT WORKS */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              How {variant.cardLabel.toLowerCase()} works
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflowSteps.map((s, i) => (
              <div key={s.title} className="rounded-2xl p-6 bg-card/40 border border-border/30 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-4 h-4 text-primary/80" />
                </div>
                <div className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/70 mb-1">
                  Step {i + 1}
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1.5">{s.title}</h4>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* FAQ — variant-specific */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <HelpCircle className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Questions Answered
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
              {variant.cardLabel} — frequently asked
            </h3>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {variant.faq.map((f, i) => (
                <AccordionItem
                  key={`${variant.slug}-faq-${i}`}
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

        {/* RELATED variants — internal linking */}
        {related.length > 0 && (
          <motion.section {...fadeUp}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                Related translation workflows
              </h3>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Dedicated pages for adjacent multilingual document workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className={cn(
                    "group rounded-xl p-5 bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                  )}
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                    <r.cardIcon className="w-4 h-4 text-primary/80" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                    {r.cardLabel}
                  </h4>
                  <p className="text-xs text-muted-foreground/75 leading-relaxed">{r.cardDescription}</p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* RELATED guides */}
        {relatedGuides.length > 0 && (
          <motion.section {...fadeUp}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <BookOpen className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                  Knowledge Guides
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
                Deep dives on multilingual workflows
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {relatedGuides.map((g) => (
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
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5 leading-snug">
                    {g.h1}
                  </h4>
                  <p className="text-xs text-muted-foreground/75 leading-relaxed line-clamp-3">{g.intro}</p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* COMPARISONS */}
        <motion.section {...fadeUp}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <GitCompare className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Comparisons
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">
              How Docsora compares
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className={cn(
                  "group rounded-2xl p-6 bg-card/40 border border-border/30",
                  "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                )}
              >
                <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1.5">
                  {c.cardTitle}
                </h4>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{c.cardSummary}</p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* FINAL CTA — premium */}
        <motion.section {...fadeUp} className="relative">
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
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              {variant.cardLabel} — without breaking formatting.
            </h3>
            <p className="text-base text-muted-foreground/80 max-w-xl mx-auto leading-relaxed mb-8">
              Whole-document translation built for global teams — PDFs, decks, contracts, and business documentation, formatting preserved end-to-end.
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
                  "shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-shadow",
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

export default TranslateVariantLanding;