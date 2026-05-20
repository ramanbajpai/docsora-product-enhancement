import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, HelpCircle, BookOpen, GitCompare, Upload, FileText,
  Layers as LayersIcon, Check,
} from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { PDFToolVariant } from "@/data/pdfToolVariants";
import { pdfToolVariants } from "@/data/pdfToolVariants";
import { pdfCompareVariants } from "@/data/pdfCompareVariants";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};
const stagger = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: easeSmooth },
};

interface PDFToolSEOProps {
  variant: PDFToolVariant;
}

export function PDFToolSEO({ variant }: PDFToolSEOProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const Icon = variant.icon;
  const otherTools = pdfToolVariants.filter((t) => t.slug !== variant.slug).slice(0, 8);

  return (
    <div className="bg-background border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-28 md:space-y-36">
        {/* HERO INTENTS */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Icon className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">{variant.category}</span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{variant.h1}</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{variant.hero}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {variant.intents.map((intent) => (
                <span key={intent} className="text-[11px] px-2.5 py-1 rounded-full bg-card/50 border border-border/40 text-muted-foreground/80">
                  {intent}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* USE CASES */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Built for Real Workflows</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">How professional teams use {variant.category.toLowerCase()} in production.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {variant.useCases.map((u, i) => (
              <motion.div key={u.title} {...stagger} transition={{ ...stagger.transition, delay: i * 0.04 }} className="rounded-2xl p-5 bg-card/40 border border-border/30">
                <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{u.title}</h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{u.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SUPPORTED FORMATS */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Supported Formats</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Every format your team actually works with — handled in one browser-native workflow.</p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {variant.acceptedFormats.map((f) => (
              <span key={f} className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-card/40 border border-border/40 text-muted-foreground/85">
                {f}
              </span>
            ))}
          </motion.div>
          {variant.supportedDocTypes && variant.supportedDocTypes.length > 0 && (
            <motion.div {...fadeUp} className="mt-8 max-w-3xl mx-auto text-center">
              <p className="text-xs text-muted-foreground/70 mb-3">Optimized specifically for:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {variant.supportedDocTypes.map((d) => (
                  <span key={d} className="text-[11px] px-3 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-foreground/85">
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </section>

        {/* PROFESSIONAL EDITING FEATURES (optional) */}
        {variant.editingFeatures && variant.editingFeatures.length > 0 && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Professional Editing Features</h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">Every capability modern document teams expect — in one premium browser-native surface.</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-w-4xl mx-auto">
              {variant.editingFeatures.map((f, i) => (
                <motion.div key={f} {...stagger} transition={{ ...stagger.transition, delay: i * 0.03 }} className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 bg-card/40 border border-border/30">
                  <Check className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" />
                  <span className="text-[12px] text-foreground/85 leading-snug">{f}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* POPULAR WORKFLOW LINKS (optional) */}
        {variant.workflowLinks && variant.workflowLinks.length > 0 && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Popular {variant.category} Workflows</h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">Jump straight into the specific workflow your team needs.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {variant.workflowLinks.map((w, i) => (
                <motion.div key={w.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.03 }}>
                  <Link to={`/${w.slug}`} className="group block rounded-2xl p-5 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 hover:shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.25)] transition-all duration-300">
                    <h3 className="text-[13px] font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{w.title}</h3>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">{w.description}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-primary/70 group-hover:text-primary transition-colors">
                      <span>Open workflow</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* CROSS-LINKS — Connected workflows (optional) */}
        {variant.crossLinks && variant.crossLinks.length > 0 && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Connected Document Workflows</h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">One platform — every step of the document lifecycle.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {variant.crossLinks.map((c, i) => (
                <motion.div key={c.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.025 }}>
                  <Link to={`/${c.slug}`} className="group block rounded-xl p-4 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1.5">
                      <LayersIcon className="w-3 h-3 text-primary/60 group-hover:text-primary transition-colors" />
                      <h3 className="text-[12px] font-semibold text-foreground group-hover:text-primary transition-colors">{c.title}</h3>
                    </div>
                    <p className="text-[11px] text-muted-foreground/75 leading-relaxed">{c.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* WHY DOCSORA FEATURE GRID */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Why Docsora</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Premium browser-native document tooling — not a generic free-utility experience.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {variant.features.map((f, i) => (
              <motion.div key={f.title} {...stagger} transition={{ ...stagger.transition, delay: i * 0.04 }} className="rounded-2xl p-5 bg-card/40 border border-border/30">
                <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORKFLOW EXAMPLES */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Workflow Examples</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Real {variant.category.toLowerCase()} scenarios from teams shipping work today.</p>
          </motion.div>
          <motion.ul {...fadeUp} className="max-w-2xl mx-auto space-y-2">
            {variant.workflowExamples.map((e, i) => (
              <li key={i} className="rounded-xl p-4 bg-card/40 border border-border/30 text-sm text-muted-foreground/85 leading-relaxed flex gap-3">
                <span className="text-primary/70 font-mono text-xs pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span>{e}</span>
              </li>
            ))}
          </motion.ul>
        </section>

        {/* AI SEARCH / CONVERSATIONAL */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Questions Answered</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Direct answers surfaced for ChatGPT, Perplexity, Gemini and featured snippets.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {variant.aiQuestions.map((p, i) => (
              <motion.div key={p.question} {...stagger} transition={{ ...stagger.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-3.5 h-3.5 text-primary/70" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-foreground leading-snug pt-1">{p.question}</h3>
                </div>
                <p className="text-[13px] text-muted-foreground/80 leading-relaxed pl-10">{p.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {variant.faq.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-5 text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/80 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* COMPARISONS */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Compare Docsora</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">How Docsora stacks up against every major PDF platform.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pdfCompareVariants.map((c, i) => (
              <motion.div key={c.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.04 }}>
                <Link to={`/${c.slug}`} className="group block rounded-2xl p-6 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
                      <GitCompare className="w-3.5 h-3.5 text-primary/80" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted-foreground/70">Comparison</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{c.cardTitle}</h3>
                  <p className="text-sm text-muted-foreground/75 leading-relaxed">{c.cardSummary}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
                    <span>View comparison</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GUIDES */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
              <BookOpen className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">Guides</span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{variant.category} Knowledge</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Real workflows, real examples — no generic AI filler.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {variant.guides.map((g, i) => (
              <motion.div key={g.title} {...stagger} transition={{ ...stagger.transition, delay: i * 0.04 }} className="rounded-2xl p-5 bg-card/40 border border-border/30">
                <FileText className="w-4 h-4 text-primary/70 mb-3" />
                <h3 className="text-[13px] font-semibold text-foreground mb-1.5">{g.title}</h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKING — OTHER TOOLS */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Explore More PDF Workflows</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">One premium browser-native platform — every document workflow your team needs.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {otherTools.map((t, i) => {
              const TIcon = t.icon;
              return (
                <motion.div key={t.slug} {...stagger} transition={{ ...stagger.transition, delay: i * 0.03 }}>
                  <Link to={`/${t.slug}`} className="group block rounded-2xl p-4 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center mb-3">
                      <TIcon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-[12px] font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{t.category}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                      <span>Open tool</span>
                      <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),hsl(var(--primary)/0.06)_38%,transparent_70%)] blur-3xl" />
            <motion.div className="absolute left-1/2 top-1/2 h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.14),transparent_65%)] blur-2xl" animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <motion.div {...fadeUp} className={cn("relative text-center rounded-[28px] px-8 py-16 md:px-16 md:py-20", "bg-gradient-to-b from-card/70 via-card/50 to-card/40", "border border-border/40", "shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_30px_60px_-30px_hsl(var(--primary)/0.25),0_18px_40px_-20px_hsl(var(--foreground)/0.12)]", "backdrop-blur-xl overflow-hidden")}>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <motion.div aria-hidden className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] bg-[linear-gradient(115deg,transparent_40%,hsl(var(--primary)/0.06)_50%,transparent_60%)]" animate={{ x: ["-15%", "15%", "-15%"] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
            <div className="relative">
              <h2 className="text-2xl md:text-[1.875rem] font-semibold text-foreground tracking-tight mb-4 leading-tight">{variant.ctaLabel}</h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground/80 mb-10 max-w-lg mx-auto leading-relaxed">Browser-native. Premium. Workflow-integrated. Built for modern document operations.</p>
              <motion.button onClick={scrollToTop} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} className={cn("group relative inline-flex items-center justify-center gap-2", "px-7 py-3.5 rounded-xl text-sm font-semibold", "text-primary-foreground", "bg-gradient-to-b from-primary to-[hsl(var(--primary)/0.92)]", "border border-primary/40", "shadow-[0_1px_0_0_hsl(0_0%_100%/0.15)_inset,0_10px_30px_-10px_hsl(var(--primary)/0.55),0_4px_12px_-4px_hsl(var(--primary)/0.4)]", "hover:shadow-[0_1px_0_0_hsl(0_0%_100%/0.18)_inset,0_14px_36px_-10px_hsl(var(--primary)/0.65),0_6px_16px_-4px_hsl(var(--primary)/0.5)]", "transition-shadow duration-300")}>
                <span aria-hidden className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Upload className="w-4 h-4" />
                Get started
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}