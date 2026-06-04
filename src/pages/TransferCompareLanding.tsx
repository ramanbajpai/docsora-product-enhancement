import { useLocation, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Minus,
  Sparkles,
  Upload,
  Users,
  Building2,
  Lightbulb,
  ShieldCheck,
  Gauge,
  Eye,
  RefreshCw,
} from "lucide-react";
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
  transferCompareVariantBySlug,
  transferCompareVariants,
  docsoraTransferBenefits,
  docsoraTransferPlans,
  docsoraTransferDifferentiators,
  type TransferCompareVariantConfig,
} from "@/data/transferCompareVariants";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};

function buildJsonLd(variant: TransferCompareVariantConfig) {
  const path = `/${variant.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Transfer", item: "/transfer" },
      { "@type": "ListItem", position: 3, name: variant.cardTitle, item: path },
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
  return [breadcrumb, faqPage];
}

const TransferCompareLanding = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "");
  const variant = transferCompareVariantBySlug[slug];

  if (!variant) {
    return <Navigate to="/transfer" replace />;
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
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28 space-y-20 md:space-y-24">
          {/* Hero */}
          <motion.section {...fadeUp} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Comparison
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-foreground tracking-tight mb-5">
              {variant.h1}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground/85 leading-relaxed mb-6">
              {variant.heroSubtitle}
            </p>
            <p className="text-sm md:text-[15px] text-muted-foreground/75 leading-relaxed mb-8">
              {variant.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/transfer"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-5 py-2.5 rounded-xl text-sm font-semibold",
                  "text-primary-foreground bg-primary hover:bg-primary/90",
                  "shadow-lg shadow-primary/20",
                  "transition-all duration-200 active:scale-[0.98]",
                )}
              >
                <Upload className="w-4 h-4" />
                Try Docsora Transfer today
              </Link>
            </div>
            <p className="mt-6 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/60">
              Last updated: {variant.lastUpdated}
            </p>
          </motion.section>

          {/* Quick summary — Best for */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              Quick summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-card/50 border border-primary/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-primary/80" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                    Best for Docsora
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {variant.bestForDocsora}
                </p>
              </div>
              <div className="rounded-2xl p-6 bg-card/40 border border-border/40">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/40 border border-border/30 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-muted-foreground/80" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/70">
                    Best for {variant.competitor}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {variant.bestForCompetitor}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Feature comparison table */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">
              Feature comparison
            </h2>
            <div className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/70 bg-card/60 border-b border-border/30">
                <div className="col-span-6">Feature</div>
                <div className="col-span-3 text-primary/80">Docsora</div>
                <div className="col-span-3">{variant.competitor}</div>
              </div>
              {variant.features.map((row, idx) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-12 px-5 py-4 text-sm items-start gap-2",
                    idx !== variant.features.length - 1 && "border-b border-border/20",
                  )}
                >
                  <div className="col-span-6 text-foreground/90 font-medium">
                    {row.feature}
                  </div>
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

          {/* Why users switch */}
          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
              Why users switch from {variant.competitor}
            </h2>
            <p className="text-sm md:text-[15px] text-muted-foreground/80 leading-relaxed mb-6">
              Many file transfer platforms focus only on sending files. Docsora Transfer
              focuses on managing the entire lifecycle of a transfer. Instead of losing
              visibility after clicking send, users can:
            </p>
            <ul className="space-y-2.5">
              {variant.whySwitch.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed"
                >
                  <Check className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Docsora Transfer benefits */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              What you get with Docsora Transfer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-w-3xl mx-auto">
              {docsoraTransferBenefits.map((b) => (
                <div
                  key={b}
                  className="flex items-start gap-2 rounded-xl px-4 py-3 bg-card/40 border border-border/30 text-sm text-foreground/85"
                >
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Security & Compliance */}
          <motion.section {...fadeUp}>
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                Security, compliance & governance
              </h2>
              <p className="text-sm md:text-[15px] text-muted-foreground/80 leading-relaxed">
                Many organisations evaluating file transfer platforms are not simply comparing
                upload speeds or file size limits. They are evaluating compliance requirements,
                security controls, data protection standards, audit requirements, governance
                requirements and vendor risk. Docsora Transfer combines large file delivery with
                enterprise-grade security controls, activity visibility and compliance frameworks
                designed for business use.
              </p>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card/40 overflow-hidden">
              <div className="grid grid-cols-12 px-5 py-3 text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/70 bg-card/60 border-b border-border/30">
                <div className="col-span-6">Security & compliance</div>
                <div className="col-span-3 text-primary/80">Docsora</div>
                <div className="col-span-3">{variant.competitor}</div>
              </div>
              {variant.securityFeatures.map((row, idx) => (
                <div
                  key={row.feature}
                  className={cn(
                    "grid grid-cols-12 px-5 py-4 text-sm items-start gap-2",
                    idx !== variant.securityFeatures.length - 1 && "border-b border-border/20",
                  )}
                >
                  <div className="col-span-6 text-foreground/90 font-medium flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground/50 mt-0.5 shrink-0" />
                    <span>{row.feature}</span>
                  </div>
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
            <p className="mt-4 text-[11px] text-muted-foreground/60 text-center max-w-2xl mx-auto leading-relaxed">
              Competitor columns are populated using verified public information. Where information
              is not publicly stated, the field shows "Not publicly stated" rather than a
              checkmark or cross.
            </p>
          </motion.section>

          {/* Why businesses choose Docsora Transfer */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              Why businesses choose Docsora Transfer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {docsoraTransferDifferentiators.map((d, i) => {
                const Icon = [Eye, RefreshCw, ShieldCheck][i] ?? Eye;
                return (
                  <div
                    key={d.title}
                    className="rounded-2xl p-6 bg-card/40 border border-border/30"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4 text-primary/80" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2 tracking-tight">
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

          {/* Plans */}
          <motion.section {...fadeUp}>
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                Docsora Transfer plans
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Predictable plans for individuals, professionals, teams and enterprises.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {docsoraTransferPlans.map((plan) => (
                <div
                  key={plan.name}
                  className="rounded-2xl p-6 bg-card/40 border border-border/30 flex flex-col"
                >
                  <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80 mb-2">
                    {plan.name}
                  </span>
                  <p className="text-lg font-semibold text-foreground tracking-tight">
                    {plan.storage}
                  </p>
                  <p className="text-sm text-muted-foreground/80 mt-1">
                    {plan.validity}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-4 leading-relaxed">
                    {plan.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Speed */}
          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-6 md:p-8 bg-card/40 border border-border/30 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                <Gauge className="w-4 h-4 text-primary/80" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-foreground tracking-tight mb-2">
                  Built for fast file delivery
                </h2>
                <p className="text-sm text-muted-foreground/85 leading-relaxed">
                  Docsora Transfer is designed to provide a fast upload and delivery experience for
                  large files while maintaining visibility and control throughout the transfer
                  lifecycle.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Key Differences */}
          <motion.section {...fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6">
              Key differences
            </h2>
            <div className="space-y-3">
              {variant.keyDifferences.map((item) => (
                <div
                  key={item}
                  className="rounded-xl px-5 py-4 bg-card/40 border border-border/30 flex items-start gap-3"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Who should choose */}
          <motion.section {...fadeUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <h2 className="text-base md:text-lg font-semibold text-foreground tracking-tight mb-4">
                  Who should choose Docsora?
                </h2>
                <ul className="space-y-2.5">
                  {variant.whoChooseDocsora.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-primary mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <h2 className="text-base md:text-lg font-semibold text-foreground tracking-tight mb-4">
                  Who should choose {variant.competitor}?
                </h2>
                <ul className="space-y-2.5">
                  {variant.whoChooseCompetitor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/85 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-muted-foreground/60 mt-1 shrink-0" />
                      <span>{item}</span>
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
              {variant.faq.map((f, i) => (
                <AccordionItem
                  key={f.question}
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
          </motion.section>

          {/* Related comparisons */}
          <motion.section {...fadeUp}>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-6 text-center">
              Other transfer comparisons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
              {transferCompareVariants
                .filter((v) => v.slug !== variant.slug)
                .map((v) => (
                  <Link
                    key={v.slug}
                    to={`/${v.slug}`}
                    className="group rounded-xl p-5 bg-card/40 border border-border/30 hover:border-primary/20 hover:bg-card/70 transition-all duration-300"
                  >
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {v.cardTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed">
                      {v.cardSummary}
                    </p>
                  </Link>
                ))}
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section {...fadeUp}>
            <div className="text-center rounded-3xl p-12 md:p-16 bg-card/40 border border-border/30 backdrop-blur-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                See how Docsora handles delivery.
              </h2>
              <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
                Send a file in your browser and see the recipient experience, tracking
                and workflow integration in action.
              </p>
              <Link
                to="/transfer"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-7 py-3 rounded-xl text-sm font-semibold",
                  "text-primary-foreground bg-primary hover:bg-primary/90",
                  "shadow-lg shadow-primary/20",
                  "transition-all duration-200 active:scale-[0.98]",
                )}
              >
                <Upload className="w-4 h-4" />
                Try Docsora Transfer
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

export default TransferCompareLanding;