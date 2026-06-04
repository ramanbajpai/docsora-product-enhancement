import { useLocation, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Check, Minus, Zap, Sparkles, Upload } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ComparisonDisclaimer } from "@/components/comparisons/ComparisonDisclaimer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  aiCheckCompareVariantBySlug,
  aiCheckCompareVariants,
  type AICompareVariantConfig,
  type AICompareFeatureRow,
} from "@/data/aiCheckCompareVariants";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

function ComparisonTable({ title, rows, competitor }: { title: string; rows: AICompareFeatureRow[]; competitor: string }) {
  return (
    <motion.section {...fadeUp}>
      <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">{title}</h2>
      <div className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/70 bg-card/60 border-b border-border/30">
          <div className="col-span-6">Feature</div>
          <div className="col-span-3 text-primary/80">Docsora</div>
          <div className="col-span-3">{competitor}</div>
        </div>
        {rows.map((row, idx) => (
          <div key={row.feature} className={cn("grid grid-cols-12 px-5 py-4 text-sm items-start gap-2", idx !== rows.length - 1 && "border-b border-border/20")}>
            <div className="col-span-6 text-foreground/90 font-medium">{row.feature}</div>
            <div className="col-span-3 text-foreground/80 flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <span>{row.docsora}</span>
            </div>
            <div className="col-span-3 text-muted-foreground/80 flex items-start gap-2">
              <Minus className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" />
              <span>{row.competitor}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function buildJsonLd(variant: AICompareVariantConfig) {
  const path = `/${variant.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "AI Check", item: "/ai-check" },
        { "@type": "ListItem", position: 3, name: variant.cardTitle, item: path },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: variant.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];
}

const AICompareLanding = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "");
  const variant = aiCheckCompareVariantBySlug[slug];

  if (!variant) {
    return <Navigate to="/ai-check" replace />;
  }

  const jsonLd = buildJsonLd(variant);

  return (
    <AppLayout>
      <Helmet>
        <title>{variant.title}</title>
        <meta name="description" content={variant.metaDescription} />
        <link rel="canonical" href={`/${variant.slug}`} />
        <meta property="og:title" content={variant.title} />
        <meta property="og:description" content={variant.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/${variant.slug}`} />
      </Helmet>

      <div className="relative bg-background min-h-screen">
        {jsonLd.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}

        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-28">
          <motion.section {...fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">Comparison</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-5">{variant.h1}</h1>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed mb-8">{variant.heroSubtitle}</p>
            <div className="flex items-center justify-center gap-3">
              <Link to="/ai-check" className={cn("inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]")}>
                <Upload className="w-4 h-4" />
                Try Docsora AI Check today
              </Link>
            </div>
          </motion.section>

          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">Quick overview</h2>
            <p className="text-base text-muted-foreground/85 leading-relaxed">{variant.overview}</p>
          </motion.section>

          <ComparisonTable title="Feature comparison" rows={variant.features} competitor={variant.competitor} />
          <ComparisonTable title="Review quality" rows={variant.quality} competitor={variant.competitor} />
          <ComparisonTable title="Security & compliance" rows={variant.security} competitor={variant.competitor} />
          <ComparisonTable title="Browser experience" rows={variant.experience} competitor={variant.competitor} />
          <ComparisonTable title="Supported file types" rows={variant.fileSupport} competitor={variant.competitor} />

          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">Where teams choose Docsora</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {variant.workflow.map((item) => (
                <div key={item} className="rounded-xl px-5 py-4 bg-card/40 border border-border/30 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {variant.faq.map((f, i) => (
                <AccordionItem key={f.question} value={`faq-${i}`} className="rounded-xl border border-border/30 bg-card/40 px-5">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline py-4">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/85 leading-relaxed pb-4">
                    <div className="space-y-3">
                      {f.answer.split("\n\n").map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          {(() => {
            const others = aiCheckCompareVariants.filter((v) => v.slug !== variant.slug);
            if (others.length === 0) return null;
            return (
              <motion.section {...fadeUp}>
                <div className="text-center mb-6">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight">Other comparisons</h2>
                  <p className="text-sm text-muted-foreground/70 mt-2">Explore how Docsora compares to other writing tools.</p>
                </div>
                <div
                  className={cn(
                    "grid gap-4 mx-auto",
                    others.length === 1 && "grid-cols-1 max-w-md",
                    others.length === 2 && "grid-cols-1 sm:grid-cols-2 max-w-3xl",
                    others.length >= 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl",
                  )}
                >
                  {others.map((v) => (
                    <Link
                      key={v.slug}
                      to={`/${v.slug}`}
                      className="group relative rounded-2xl p-5 bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-card/80 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {v.cardTitle}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                      </div>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed">{v.cardSummary}</p>
                    </Link>
                  ))}
                </div>
              </motion.section>
            );
          })()}

          <motion.section {...fadeUp}>
            <div className="text-center rounded-3xl p-12 md:p-16 bg-card/40 border border-border/30 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">See the difference for yourself.</h2>
              <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">Drop a document into Docsora and run an AI review side-by-side. No signup, no installs.</p>
              <Link to="/ai-check" className={cn("inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]")}>
                <Upload className="w-4 h-4" />
                Try Docsora AI Check
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.section>
          {/* Disclaimer */}
          <ComparisonDisclaimer />

        </div>
      </div>
    </AppLayout>
  );
};

export default AICompareLanding;