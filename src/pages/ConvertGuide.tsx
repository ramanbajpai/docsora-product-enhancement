import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Upload, BookOpen, Clock3 } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { convertGuideBySlug, convertGuides } from "@/data/convertGuides";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.55, ease: easeSmooth },
};

const ConvertGuide = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const guide = convertGuideBySlug[slug];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!guide) {
    return <Navigate to="/convert" replace />;
  }

  const Icon = guide.icon;
  const canonical = `/convert-guides/${guide.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Convert", item: "/convert" },
      { "@type": "ListItem", position: 3, name: "Guides", item: "/convert" },
      { "@type": "ListItem", position: 4, name: guide.h1, item: canonical },
    ],
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    url: canonical,
    author: { "@type": "Organization", name: "Docsora" },
    publisher: { "@type": "Organization", name: "Docsora" },
  };
  const jsonLd = [breadcrumb, faqPage, article];

  const relatedGuides = guide.relatedGuides
    .map((s) => convertGuideBySlug[s])
    .filter(Boolean);

  return (
    <AppLayout>
      <Helmet>
        <title>{guide.title}</title>
        <meta name="description" content={guide.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
      </Helmet>

      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article className="bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-24 md:pt-24 md:pb-32">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-[12px] text-muted-foreground/70 mb-10"
          >
            <Link to="/convert" className="hover:text-primary transition-colors">
              Convert
            </Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/80">Guides</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/80 truncate">{guide.category}</span>
          </nav>

          <motion.header {...fadeUp} className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-6">
              <BookOpen className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                {guide.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-[2.25rem] font-semibold text-foreground tracking-tight leading-tight mb-5">
              {guide.h1}
            </h1>
            <p className="text-base text-muted-foreground/85 leading-relaxed mb-6">
              {guide.intro}
            </p>
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] font-medium text-muted-foreground/60">
              <div className="inline-flex items-center gap-1.5">
                <Clock3 className="w-3 h-3" />
                <span>{guide.readTime}</span>
              </div>
              <span className="text-muted-foreground/30">·</span>
              <span>By Docsora</span>
            </div>
          </motion.header>

          <motion.div {...fadeUp} className="mb-14">
            <Link
              to={`/${guide.primaryToolSlug}`}
              className={cn(
                "group flex items-center justify-between gap-4 rounded-2xl p-5",
                "bg-card/50 border border-border/40",
                "hover:border-primary/25 hover:bg-card/80 transition-all duration-300",
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                  <Icon className="w-[18px] h-[18px] text-primary/80" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors">
                    {guide.primaryToolLabel}
                  </p>
                  <p className="text-[12px] text-muted-foreground/75">
                    Try the workflow described in this guide.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </Link>
          </motion.div>

          <div className="space-y-12">
            {guide.sections.map((section) => (
              <motion.section {...fadeUp} key={section.heading}>
                <h2 className="text-xl md:text-[1.4rem] font-semibold text-foreground tracking-tight mb-4">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[15px] text-muted-foreground/85 leading-[1.75]"
                    >
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <ol className="mt-3 space-y-2.5 pl-1">
                      {section.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-[15px] text-muted-foreground/85 leading-[1.7]"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/8 border border-primary/15 flex items-center justify-center text-[11px] font-semibold text-primary/80 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{b}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </motion.section>
            ))}
          </div>

          <motion.section {...fadeUp} className="mt-20">
            <h2 className="text-xl md:text-[1.4rem] font-semibold text-foreground tracking-tight mb-6">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {guide.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-border/40"
                >
                  <AccordionTrigger className="text-[14px] font-medium text-foreground hover:text-primary hover:no-underline py-5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-muted-foreground/85 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.section>

          <motion.section {...fadeUp} className="mt-20">
            <h2 className="text-xl md:text-[1.4rem] font-semibold text-foreground tracking-tight mb-6">
              Related conversion tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guide.relatedTools.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  className={cn(
                    "group flex items-center justify-between rounded-xl px-5 py-4",
                    "bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                  )}
                >
                  <span className="text-[13px] font-medium text-foreground/90 group-hover:text-primary transition-colors">
                    {t.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.section>

          {relatedGuides.length > 0 && (
            <motion.section {...fadeUp} className="mt-20">
              <h2 className="text-xl md:text-[1.4rem] font-semibold text-foreground tracking-tight mb-6">
                Continue reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {relatedGuides.map((g) => {
                  const RIcon = g.icon;
                  return (
                    <Link
                      key={g.slug}
                      to={`/convert-guides/${g.slug}`}
                      className={cn(
                        "group block rounded-2xl p-5 h-full",
                        "bg-card/40 border border-border/30",
                        "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                      )}
                    >
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                        <RIcon className="w-4 h-4 text-primary/70" />
                      </div>
                      <h3 className="text-[13px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {g.h1}
                      </h3>
                      <p className="mt-2 text-[12px] text-muted-foreground/75 leading-relaxed line-clamp-2">
                        {g.intro}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          )}

          <motion.section {...fadeUp} className="mt-24">
            <div
              className={cn(
                "text-center rounded-3xl p-10 md:p-14",
                "bg-card/40 border border-border/30 backdrop-blur-sm",
              )}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
                Ready to convert your files?
              </h2>
              <p className="text-sm text-muted-foreground/75 mb-7 max-w-md mx-auto">
                Try the {guide.primaryToolLabel} workflow described above —
                browser-based, secure, and finished in seconds.
              </p>
              <Link
                to={`/${guide.primaryToolSlug}`}
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-7 py-3 rounded-xl text-sm font-semibold",
                  "text-primary-foreground bg-primary hover:bg-primary/90",
                  "shadow-lg shadow-primary/20",
                  "transition-all duration-200 active:scale-[0.98]",
                )}
              >
                <Upload className="w-4 h-4" />
                {guide.primaryToolLabel}
              </Link>
              <div className="mt-6 flex items-center justify-center gap-x-4 gap-y-2 flex-wrap text-[11px] text-muted-foreground/60">
                <Link to="/convert" className="hover:text-primary transition-colors">
                  Conversion hub
                </Link>
                <span className="text-muted-foreground/30">·</span>
                <Link to="/pdf-to-word" className="hover:text-primary transition-colors">
                  PDF to Word
                </Link>
                <span className="text-muted-foreground/30">·</span>
                <Link to="/word-to-pdf" className="hover:text-primary transition-colors">
                  Word to PDF
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </article>
    </AppLayout>
  );
};

export { convertGuides };
export default ConvertGuide;