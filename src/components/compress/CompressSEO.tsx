import { motion } from "framer-motion";
import {
  Mail,
  Presentation,
  FileText,
  Globe,
  Image,
  Upload,
  Minimize2,
  Download,
  ArrowRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-80px" },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

const useCases = [
  {
    icon: Mail,
    title: "Email Attachments",
    description: "Reduce file size for faster email sending and easier sharing.",
  },
  {
    icon: Presentation,
    title: "Presentations",
    description: "Shrink decks for smooth screen sharing and quick uploads.",
  },
  {
    icon: FileText,
    title: "Large PDFs",
    description: "Optimize bulky documents without losing clarity or detail.",
  },
  {
    icon: Globe,
    title: "Website Uploads",
    description: "Speed up page loads with lighter images and documents.",
  },
  {
    icon: Image,
    title: "Media Sharing",
    description: "Compress images and graphics for seamless social sharing.",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Upload your files securely",
  },
  {
    icon: Minimize2,
    title: "Compress",
    description: "Docsora intelligently reduces file size",
  },
  {
    icon: Download,
    title: "Download",
    description: "Get optimized files instantly",
  },
];

const faqs = [
  {
    question: "How do I compress file size online?",
    answer:
      "Simply drag and drop your files into the upload area above, select your preferred compression level, and Docsora will optimize them instantly. No installation required.",
  },
  {
    question: "Can I compress files without losing quality?",
    answer:
      "Yes. Choose the 'Preserve Quality' mode for visually identical output, or 'Balanced' for optimal size reduction with no visible quality loss. You control the trade-off.",
  },
  {
    question: "Is Docsora secure?",
    answer:
      "Absolutely. All files are processed over encrypted connections and automatically removed from our servers after compression. We never store or share your documents.",
  },
  {
    question: "What file types are supported?",
    answer:
      "Docsora supports PDF, DOCX, DOC, PPTX, PPT, XLSX, XLS, JPG, PNG, TIFF, BMP, and GIF. If you need a format not listed, let us know.",
  },
  {
    question: "Is there a maximum file size?",
    answer:
      "Free accounts can compress files up to 50MB each. Upgrade to Pro for larger files, batch processing, and advanced quality controls.",
  },
  {
    question: "Can I compress PDFs and images?",
    answer:
      "Yes. Docsora handles both documents and images with specialized algorithms for each format. PDFs maintain text clarity while images retain visual fidelity.",
  },
];

const resources = [
  {
    title: "Compress PDFs Without Losing Quality",
    description: "Learn the best settings for crisp, compact documents.",
  },
  {
    title: "Reduce File Size for Email Attachments",
    description: "Send large files without hitting mailbox limits.",
  },
  {
    title: "Best Ways to Compress Large Files",
    description: "A practical guide to shrinking any file type efficiently.",
  },
];

export function CompressSEO() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative bg-background">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-32">
        {/* Section 1 — Use Cases */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Compress Files for Any Workflow
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {useCases.map((item, i) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ ...staggerItem.transition, delay: i * 0.08 }}
                className={cn(
                  "group relative rounded-2xl p-6",
                  "bg-card/50 backdrop-blur-sm",
                  "border border-border/40",
                  "hover:border-primary/20 hover:bg-card/80",
                  "transition-all duration-300"
                )}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-primary/12 transition-colors">
                  <item.icon className="w-4.5 h-4.5 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section 2 — How It Works */}
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
                  {...staggerItem}
                  transition={{ ...staggerItem.transition, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-5 h-5 text-primary/70" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/70 max-w-[180px]">
                    {step.description}
                  </p>
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

        {/* Section 3 — FAQ */}
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
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-5">
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

        {/* Section 4 — Related Resources */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Related Resources
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {resources.map((resource, i) => (
              <motion.div
                key={resource.title}
                {...staggerItem}
                transition={{ ...staggerItem.transition, delay: i * 0.1 }}
                className={cn(
                  "group rounded-2xl p-6",
                  "bg-card/40 border border-border/30",
                  "hover:border-primary/20 hover:bg-card/70",
                  "transition-all duration-300 cursor-pointer"
                )}
              >
                <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed">
                  {resource.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Section 5 — Final CTA */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "text-center rounded-3xl p-12 md:p-16",
              "bg-card/40 border border-border/30",
              "backdrop-blur-sm"
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
                "text-primary-foreground bg-primary",
                "hover:bg-primary/90",
                "shadow-lg shadow-primary/20",
                "transition-all duration-200",
                "active:scale-[0.98]"
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
