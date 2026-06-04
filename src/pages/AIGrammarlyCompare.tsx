import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Minus,
  Sparkles,
  Upload,
  FileText,
  PenLine,
  Layers,
  Briefcase,
  Globe,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

type Row = { feature: string; docsora: boolean; grammarly: boolean };

const featureRows: Row[] = [
  { feature: "Grammar & spelling suggestions", docsora: true, grammarly: true },
  { feature: "Writing clarity suggestions", docsora: true, grammarly: true },
  { feature: "Tone improvement suggestions", docsora: true, grammarly: true },
  { feature: "Document review inside Docsora workflows", docsora: true, grammarly: false },
  { feature: "Works directly within document management platform", docsora: true, grammarly: false },
  { feature: "File transfer capabilities", docsora: true, grammarly: false },
  { feature: "E-signature capabilities", docsora: true, grammarly: false },
  { feature: "Document storage", docsora: true, grammarly: false },
  { feature: "Request files from clients", docsora: true, grammarly: false },
  { feature: "Operational workflow automation", docsora: true, grammarly: false },
  { feature: "Browser-wide writing assistant", docsora: false, grammarly: true },
  { feature: "Email writing assistance", docsora: false, grammarly: true },
  { feature: "Website writing assistance", docsora: false, grammarly: true },
  { feature: "Dedicated writing platform", docsora: false, grammarly: true },
];

const keyDifferences = [
  {
    icon: PenLine,
    title: "Grammarly focuses on writing",
    body:
      "Grammarly is designed to help users write and improve content across websites, emails, documents and communication platforms.",
  },
  {
    icon: Layers,
    title: "Docsora focuses on document workflows",
    body:
      "Docsora AI Check is part of a larger document platform that includes document storage, transfers, signing, tracking and workflows.",
  },
  {
    icon: Sparkles,
    title: "Different use cases",
    body:
      "Users looking primarily for writing assistance may prefer Grammarly. Businesses looking to manage operational document processes may benefit from Docsora's broader platform approach.",
  },
];

const docsoraFor = [
  "Work with documents as part of business operations",
  "Need document review alongside file sharing and storage",
  "Want AI review integrated into workflows",
  "Manage client onboarding, compliance or document collection processes",
  "Prefer a single platform for multiple document-related tasks",
];

const grammarlyFor = [
  "Spend most of your day writing",
  "Need writing assistance across websites and emails",
  "Want browser-wide suggestions",
  "Focus heavily on communication quality",
  "Need a dedicated writing assistant",
];

const faq = [
  {
    question: "Is Docsora AI Check a Grammarly replacement?",
    answer:
      "Not necessarily. Grammarly is a dedicated writing assistant, while Docsora AI Check is designed to review documents inside a broader document workflow platform.",
  },
  {
    question: "Does Docsora offer browser-wide writing suggestions?",
    answer: "No. Docsora AI Check currently reviews documents inside Docsora.",
  },
  {
    question: "Can Docsora help with grammar and tone?",
    answer:
      "Yes. AI Check can identify writing issues and provide improvement suggestions within supported documents.",
  },
  {
    question: "Can Grammarly manage document workflows?",
    answer:
      "No. Grammarly focuses on writing assistance and does not provide document transfers, signing, storage or workflow management.",
  },
];

const title =
  "Docsora AI Check vs Grammarly - Compare Document Review & Writing Assistance | Docsora";
const metaDescription =
  "Compare Docsora AI Check and Grammarly across document review, business workflows, PDF support and document management. An objective look at which tool fits your use case.";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "AI Check", item: "/ai-check" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Docsora AI Check vs Grammarly",
        item: "/compare/docsora-vs-grammarly",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
];

function Cell({ on }: { on: boolean }) {
  return on ? (
    <Check className="w-4 h-4 text-primary" />
  ) : (
    <Minus className="w-4 h-4 text-muted-foreground/40" />
  );
}

const AIGrammarlyCompare = () => {
  return (
    <AppLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="/compare/docsora-vs-grammarly" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="/compare/docsora-vs-grammarly" />
      </Helmet>

      <div className="relative bg-background min-h-screen">
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-28">
          {/* HERO */}
          <motion.section {...fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Comparison
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-5">
              Docsora AI Check vs Grammarly
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed mb-4">
              Compare Docsora AI Check and Grammarly across document review,
              business workflows, PDF support and document management.
            </p>
            <p className="text-sm md:text-base text-muted-foreground/75 leading-relaxed mb-8">
              Both Docsora AI Check and Grammarly help improve written content,
              but they are designed for different workflows. Grammarly focuses
              on writing assistance across emails, documents and browsers,
              while Docsora AI Check is designed to review documents within a
              broader document management and workflow environment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/ai-check"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
                )}
              >
                <Upload className="w-4 h-4" />
                Try Docsora AI Check
              </Link>
              <Link
                to="/ai-check"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground/90 bg-card/60 border border-border/40 hover:bg-card transition-all duration-200"
              >
                View Pricing
              </Link>
            </div>
          </motion.section>

          {/* QUICK SUMMARY */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              Quick summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Best for Docsora
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground/85 leading-relaxed">
                  Teams and businesses that want document review as part of a
                  broader document workflow that includes file management,
                  sharing, signing and operational processes.
                </p>
              </div>
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/30 flex items-center justify-center">
                    <PenLine className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Best for Grammarly
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground/85 leading-relaxed">
                  Individuals and teams looking for advanced writing assistance
                  across emails, documents, websites and day-to-day
                  communication.
                </p>
              </div>
            </div>
          </motion.section>

          {/* FEATURE COMPARISON TABLE */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">
              Feature comparison
            </h2>
            <div className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/70 bg-card/60 border-b border-border/30">
                <div className="col-span-8">Feature</div>
                <div className="col-span-2 text-primary/80">Docsora</div>
                <div className="col-span-2">Grammarly</div>
              </div>
              {featureRows.map((row, idx) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-12 px-5 py-4 text-sm items-center gap-2",
                    idx !== featureRows.length - 1 && "border-b border-border/20"
                  )}
                >
                  <div className="col-span-8 text-foreground/90 font-medium">
                    {row.feature}
                  </div>
                  <div className="col-span-2">
                    <Cell on={row.docsora} />
                  </div>
                  <div className="col-span-2">
                    <Cell on={row.grammarly} />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* KEY DIFFERENCES */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              The biggest differences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {keyDifferences.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.title}
                    className="rounded-2xl p-6 bg-card/40 border border-border/30"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">
                      {d.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/85 leading-relaxed">
                      {d.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* WHO SHOULD CHOOSE */}
          <motion.section {...fadeUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="text-base font-semibold text-foreground">
                    Choose Docsora if you:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {docsoraFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/85 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-base font-semibold text-foreground">
                    Choose Grammarly if you:
                  </h3>
                </div>
                <ul className="space-y-3">
                  {grammarlyFor.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/85 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* FAQ */}
          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faq.map((f, i) => (
                <AccordionItem
                  key={f.question}
                  value={`faq-${i}`}
                  className="rounded-xl border border-border/30 bg-card/40 px-5"
                >
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/85 leading-relaxed pb-4">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          {/* FINAL CTA */}
          <motion.section {...fadeUp}>
            <div className="text-center rounded-3xl p-12 md:p-16 bg-card/40 border border-border/30 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                Review documents and manage workflows in one platform
              </h2>
              <p className="text-sm text-muted-foreground/75 mb-8 max-w-xl mx-auto leading-relaxed">
                Docsora combines document review, storage, transfers, signing
                and workflows in a single workspace designed for business
                operations.
              </p>
              <Link
                to="/ai-check"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
                )}
              >
                <Upload className="w-4 h-4" />
                Try Docsora AI Check Today
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIGrammarlyCompare;