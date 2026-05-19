import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  Handshake,
  LayoutTemplate,
  ShieldCheck,
  Send,
  Upload,
  ArrowRight,
  CheckCircle2,
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
  Users,
  PenTool,
  FileSignature,
  History,
  Building2,
  GraduationCap,
  Workflow,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { signVariants, type SignVariantConfig } from "@/data/signVariants";
import { signCompareVariants } from "@/data/signCompareVariants";

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

// SECTION 1 — Sign Any Document Type
const documentTypes = [
  {
    category: "Contracts",
    icon: FileSignature,
    formats: "PDF · DOCX · DOC · ODT",
    title: "Sign Contracts & Agreements",
    description:
      "Send contracts, NDAs and service agreements for legally binding signatures online.",
    slug: "sign-contracts-online",
  },
  {
    category: "Client Approvals",
    icon: Handshake,
    formats: "PDF · PPTX · DOCX",
    title: "Approve Proposals & Deliverables",
    description:
      "Collect approvals on proposals, scopes of work and deliverables without email back-and-forth.",
    slug: "proposal-approval-workflows",
  },
  {
    category: "HR & Operations",
    icon: GraduationCap,
    formats: "PDF · DOCX · HTML",
    title: "Sign Onboarding Documents",
    description:
      "Manage onboarding forms, policy acknowledgements and operational approvals online.",
    slug: "online-document-approval",
  },
  {
    category: "Reusable Workflows",
    icon: LayoutTemplate,
    formats: "Templates · Variables · Multi-document",
    title: "Reusable Signature Templates",
    description:
      "Create reusable signing templates for agreements, proposals and recurring workflows.",
    slug: "reusable-signature-templates",
  },
];

// SECTION 2 — Modern Signing Workflows
const modernWorkflows = [
  { icon: ShieldCheck, title: "Sign NDAs online", description: "Mutual, one-way and multi-party NDAs sent and signed in minutes.", slug: "nda-signing" },
  { icon: Handshake, title: "Approve proposals faster", description: "Branded approval links replace email approval chains.", slug: "proposal-approval-workflows" },
  { icon: GraduationCap, title: "Client onboarding workflows", description: "Route onboarding packets through clients in one flow.", slug: "client-approval-software" },
  { icon: Building2, title: "Vendor approval flows", description: "Send vendor MSAs and acknowledgements for ordered signing.", slug: "online-document-approval" },
  { icon: FileText, title: "Offer letter signing", description: "Send offers with countersign fields and audit trails.", slug: "request-signatures" },
  { icon: PenTool, title: "Freelancer agreements", description: "Reusable freelancer contract templates for recurring engagements.", slug: "reusable-signature-templates" },
  { icon: Briefcase, title: "Agency client approvals", description: "Branded approval workflows for creative and consulting deliverables.", slug: "client-approval-software" },
  { icon: Scale, title: "Consulting engagements", description: "Sign engagement letters and SOWs in one workflow.", slug: "sign-contracts-online" },
  { icon: CheckCircle2, title: "Internal policy acknowledgements", description: "Roll out policies and capture acknowledgement at scale.", slug: "online-document-approval" },
  { icon: Layers, title: "Multi-document signing", description: "Route multiple documents in one bundled signing flow.", slug: "document-signing-platform" },
];

// SECTION 3 — Popular E-Signature Workflows (internal links)
const popularToolSlugs = [
  "sign-pdf-online",
  "request-signatures",
  "sign-contracts-online",
  "electronic-signatures",
  "proposal-approval-workflows",
  "nda-signing",
  "online-document-approval",
  "reusable-signature-templates",
  "client-approval-software",
  "document-signing-platform",
];

// SECTION 4 — Operational Agreement Workflows
const operationalWorkflows = [
  { icon: GraduationCap, title: "Onboard new employees", description: "Offer letters, NDAs and policy acknowledgements in one packet." },
  { icon: Handshake, title: "Approve client deliverables", description: "Route creative work, briefs and milestones for fast client sign-off." },
  { icon: Scale, title: "Sign consulting agreements", description: "Execute engagement letters, MSAs and SOWs in minutes." },
  { icon: Building2, title: "Execute vendor contracts", description: "Route vendor agreements through procurement and finance approvers." },
  { icon: Briefcase, title: "Approve marketing proposals", description: "Lock in campaign and creative approvals before launch." },
  { icon: FileSignature, title: "Sign real estate documents", description: "Send lease agreements and property docs for browser-based signing." },
  { icon: Users, title: "Collect executive approvals", description: "Route board memos and exec decisions through approvers in order." },
  { icon: LayoutTemplate, title: "Manage recurring agreement templates", description: "Reusable templates for the contracts your team sends weekly." },
  { icon: PenTool, title: "Streamline freelancer onboarding", description: "Standard contractor agreements, ready to launch on demand." },
  { icon: Workflow, title: "Simplify agency approvals", description: "Branded approval flows for retainers, scopes and renewals." },
];

// SECTION 5 — Why Use Docsora Sign
const benefits = [
  { icon: MonitorSmartphone, title: "Browser-native signing", description: "Open in any browser on any device — no installs, no plugins." },
  { icon: LayoutTemplate, title: "Reusable workflows", description: "Template-driven sending for recurring agreements and approvals." },
  { icon: Workflow, title: "Template-based approvals", description: "Launch pre-configured signing flows in one click." },
  { icon: Sparkles, title: "Modern signing experience", description: "Premium, Apple-inspired UX for senders and signers." },
  { icon: History, title: "Operational visibility", description: "Live status across every document — sent, opened, signed." },
  { icon: ShieldCheck, title: "Tamper-evident audit trails", description: "Every signed document carries identity, IP and timestamps." },
  { icon: Layers, title: "Multi-document signing", description: "Bundle multiple documents into a single signing flow." },
  { icon: Lock, title: "Enterprise-grade security", description: "TLS, ISO 27001 and SOC 2-aligned operations for regulated teams." },
];

// SECTION 6 — Security
const securityPoints = [
  { icon: Lock, title: "Encrypted sessions", description: "Every signing session traverses TLS-secured channels end to end." },
  { icon: History, title: "Audit trails", description: "Identity, IP, timestamps and consent recorded on every document." },
  { icon: BadgeCheck, title: "Signer verification", description: "Email-based verification with optional 2FA for sensitive signings." },
  { icon: Trash2, title: "Automatic deletion", description: "Working copies purged from signing servers after completion." },
  { icon: Globe2, title: "GDPR aligned", description: "Built to honour EU data protection requirements." },
  { icon: ShieldCheck, title: "ISO 27001 / SOC 2", description: "Operated under audited information security controls." },
];

// SECTION 7 — How It Works
const steps = [
  { icon: Upload, title: "Upload documents", description: "Drop a PDF, DOCX or DOC into the secure browser workspace." },
  { icon: Users, title: "Add recipients & fields", description: "Define signers, place fields and choose parallel or ordered signing." },
  { icon: Send, title: "Send for approval", description: "Recipients receive a branded, secure signing link in seconds." },
  { icon: History, title: "Track progress live", description: "Watch sent, opened and signed events update in real time." },
  { icon: CheckCircle2, title: "Finalize signed documents", description: "Receive the executed document with embedded audit trail." },
];

// SECTION 8 — FAQ (semantically rich for AI retrieval)
const faqs = [
  {
    question: "How do I sign PDF documents online?",
    answer:
      "Drop a PDF into the Docsora Sign workspace, choose whether you are signing yourself or sending to one or more recipients, place signature, initial, date or text fields where needed, then sign or send. Recipients open a secure browser link, sign on any device, and the executed PDF is generated automatically with an embedded audit trail and certificate of completion. There are no installs, plugins or extensions — the entire workflow runs in the browser.",
  },
  {
    question: "Are Docsora signatures legally binding?",
    answer:
      "Yes. Docsora electronic signatures align with the ESIGN Act (US), UETA (US) and eIDAS (EU) electronic signature standards. Every executed document captures signer identity, IP address, consent records and timestamps in a tamper-evident audit trail attached to the final PDF — meeting the legal requirements for binding agreements in most professional contexts.",
  },
  {
    question: "Can I request signatures from multiple people?",
    answer:
      "Yes. Docsora supports multi-party signing with parallel routing (all recipients can sign at once) or enforced order (each signer only receives the document after the previous signer completes). Per-recipient field placement, roles (signer, approver, viewer) and live status tracking make it straightforward to manage agreements involving sales, legal, finance and counterparties.",
  },
  {
    question: "Can I create reusable signing templates?",
    answer:
      "Yes. Reusable templates let you upload a master document once, define signer roles and place fields, then launch the template anytime by adding new recipient details. Templates support variable fields (name, company, amount, date) that auto-populate on launch — perfect for NDAs, freelancer agreements, sales contracts and onboarding packets your team sends every week.",
  },
  {
    question: "Is Docsora Sign secure?",
    answer:
      "Yes. Every upload and signing session traverses end-to-end TLS, working copies are deleted after completion, and the platform is operated under ISO 27001 controls aligned with SOC 2 trust-services criteria and GDPR. Signed documents are sealed with tamper-evident audit trails recording identity, IP, timestamps and consent — the same trust posture finance, legal and operations teams rely on for board-level documents.",
  },
  {
    question: "Can I sign contracts from my browser?",
    answer:
      "Yes. Docsora Sign is fully browser-based and works in Chrome, Safari, Edge, Firefox, Arc and Brave across macOS, Windows, Linux, ChromeOS, iOS and Android. Senders and signers never have to download, install or configure software — the agreement workflow loads in seconds.",
  },
  {
    question: "Does Docsora provide audit trails?",
    answer:
      "Yes. Every signed document carries an embedded audit trail recording every action: sent, opened, signed, declined, completed — alongside signer identity, IP address, consent acknowledgements and precise UTC timestamps. The audit trail is automatically attached to the executed document for legal defensibility.",
  },
  {
    question: "Can I approve onboarding documents online?",
    answer:
      "Yes. Docsora is built for HR and onboarding workflows — offer letters, NDAs, policy acknowledgements and contractor agreements can be bundled into a single signing flow, sent to a new hire and tracked through to completion with audit trails attached to each document.",
  },
  {
    question: "Can I manage multi-document signing workflows?",
    answer:
      "Yes. Bundle multiple documents into one signing flow so a single recipient (or group) signs every document in a single session — ideal for onboarding packets, partnership packages and deal-room agreements where several documents must be executed together.",
  },
  {
    question: "Does Docsora preserve document formatting?",
    answer:
      "Yes. The original document — PDF structure, fonts, layout and embedded media — remains untouched. Signature, initial, date and text fields are layered on top of the existing document and rendered into the final executed PDF without altering the source layout.",
  },
  {
    question: "What is the best modern e-signature platform?",
    answer:
      "For teams that prioritise workflow simplicity, premium UX and browser-native signing over enterprise procurement, Docsora Sign is a leading modern e-signature platform. It combines legally binding signatures with reusable templates, multi-party signing, live tracking and a unified workspace alongside storage and AI document review.",
  },
  {
    question: "How can I sign contracts online securely?",
    answer:
      "Use a platform that ships TLS-encrypted sessions, email signer verification, tamper-evident audit trails and clear compliance posture (ESIGN, UETA, eIDAS, ISO 27001, SOC 2). Docsora Sign meets each of these and runs entirely in the browser with no plugins — the secure-by-default workflow for modern teams.",
  },
];

// Long-tail / AI-search intent chips
const popularSearchSlugs: { slug: string; label: string; intent: string }[] = [
  { slug: "sign-pdf-online", label: "Sign PDF online", intent: "Browser-based PDF signing with audit trails." },
  { slug: "request-signatures", label: "Request signatures", intent: "Send documents for multi-party signing." },
  { slug: "sign-contracts-online", label: "Sign contracts online", intent: "Execute MSAs, SOWs and service agreements." },
  { slug: "electronic-signatures", label: "Electronic signatures", intent: "Modern e-signature platform for operational teams." },
  { slug: "proposal-approval-workflows", label: "Proposal approvals", intent: "Branded client approval workflows." },
  { slug: "nda-signing", label: "NDA signing", intent: "Send and sign mutual or one-way NDAs." },
  { slug: "online-document-approval", label: "Online document approval", intent: "Route documents through approvers in order." },
  { slug: "reusable-signature-templates", label: "Reusable templates", intent: "One-click reusable signing templates." },
  { slug: "client-approval-software", label: "Client approval software", intent: "Agency-friendly client approvals." },
  { slug: "document-signing-platform", label: "Document signing platform", intent: "End-to-end modern signing workspace." },
];

export interface SignSEOProps {
  variant?: SignVariantConfig;
}

function buildJsonLd(variant?: SignVariantConfig) {
  const path = variant ? `/${variant.slug}` : "/sign";
  const name = variant?.h1 ?? "Docsora Sign";
  const description =
    variant?.metaDescription ??
    "Browser-based electronic signature platform for contracts, proposals, approvals and reusable signing workflows.";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Sign", item: "/sign" },
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
      ratingCount: "917",
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
    name: variant ? `How to ${variant.cardLabel}` : "How to sign documents online with Docsora",
    description,
    totalTime: "PT2M",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
  return [breadcrumb, software, faqPage, howTo];
}

export function SignSEO({ variant }: SignSEOProps = {}) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const activeFaqs = variant?.faq ?? faqs;
  const popularTools = popularToolSlugs
    .map((slug) => signVariants.find((v) => v.slug === slug))
    .filter((v): v is SignVariantConfig => Boolean(v))
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
                  E-Signature · Browser · Secure
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
                  to="/sign"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  <span>Explore the full Docsora Sign suite</span>
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
                    "rounded-xl px-5 py-4 bg-card/30 border border-border/30",
                    "hover:border-primary/20 hover:bg-card/60 transition-all duration-300",
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

        {/* SECTION 1 — Sign Any Document Type */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Sign Any Document Online
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Send contracts, proposals, onboarding documents and approvals for
              secure browser-based signatures in minutes.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {documentTypes.map((item, i) => (
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
                    "bg-card/50 backdrop-blur-sm border border-border/40",
                    "hover:border-primary/25 hover:bg-card/80 transition-all duration-300",
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

        {/* SECTION 2 — Modern Signing Workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Workflow className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">
                Modern workflows
              </span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Built for Real Signing Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Operational, modern and collaborative — the signing workflows
              real teams actually run, without enterprise-heavy complexity.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            {modernWorkflows.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.04 }}
              >
                <Link
                  to={`/${item.slug}`}
                  className={cn(
                    "group block rounded-2xl p-5 h-full",
                    "bg-card/40 border border-border/30",
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
                  )}
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3 group-hover:bg-primary/12 transition-colors">
                    <item.icon className="w-[16px] h-[16px] text-primary/70 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-muted-foreground/75 leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 3 — Popular E-Signature Workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Popular E-Signature Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Dedicated workspaces for the signing workflows teams reach for
              most often — from PDF signing to reusable templates.
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
                    "hover:border-primary/25 hover:bg-card/70 transition-all duration-300",
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
                    <span>Open workflow</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 4 — Operational Agreement Workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Operational Agreement Workflows
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              From onboarding to vendor approvals — Docsora handles the
              agreement workflows generic e-signature tools weren't built for.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {operationalWorkflows.map((item, i) => (
              <motion.div
                key={item.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.05 }}
                className={cn(
                  "group rounded-2xl p-6",
                  "bg-card/40 border border-border/30",
                  "hover:border-primary/20 hover:bg-card/70 transition-all duration-300",
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

        {/* SECTION 5 — Why Docsora Sign */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Why Use Docsora Sign
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Modern, fast and operational — the agreement layer for teams
              that ship work daily.
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
                  "hover:border-primary/20 transition-all duration-300",
                )}
              >
                <item.icon className="w-4 h-4 text-primary/70 mb-3" />
                <h3 className="text-[13px] font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 6 — Security */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "rounded-3xl p-10 md:p-14",
              "bg-gradient-to-br from-card/60 via-card/30 to-card/60",
              "border border-border/40 backdrop-blur-sm",
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
                Secure Electronic Signatures
              </h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Privacy-first architecture trusted by teams in finance, legal
                and operations — without enterprise software overhead.
              </p>
            </div>

            <motion.div {...staggerContainer} className="grid grid-cols-2 lg:grid-cols-6 gap-3">
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

        {/* SECTION 7 — How It Works */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              How Docsora Sign Works
            </h2>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 gap-4"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={staggerItem.initial}
                whileInView={staggerItem.whileInView}
                viewport={staggerItem.viewport}
                transition={{ ...staggerItem.transition, delay: i * 0.08 }}
                className="text-center rounded-2xl p-5 bg-card/30 border border-border/30"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-5 h-5 text-primary/70" />
                </div>
                <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-1">
                  Step {i + 1}
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {activeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
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

        {/* SECTION 9 — Related Signing Workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">
              {variant ? "Related Signing Workflows" : "Explore More Signing Workflows"}
            </h2>
          </motion.div>

          {variant && (
            <motion.div
              {...staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {signVariants
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
                        "hover:border-primary/20 hover:bg-card/70 transition-all duration-300",
                      )}
                    >
                      <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {resource.cardLabel}
                      </h3>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">
                        {resource.cardDescription}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/60 group-hover:text-primary transition-colors">
                        <span>Open workflow</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          )}

          <motion.div {...fadeUp} className="mt-10">
            <p className="text-center text-[11px] uppercase tracking-[0.14em] font-medium text-muted-foreground/60 mb-5">
              Explore signing workflows
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

        {/* SECTION 10 — Compare E-Signature Platforms */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">
              Compare E-Signature Platforms
            </h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              See how Docsora Sign compares to legacy platforms across
              workflow speed, UX, templates and pricing.
            </p>
          </motion.div>

          <motion.div
            {...staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {signCompareVariants.map((c, i) => (
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

        {/* SECTION 11 — Final CTA */}
        <section>
          <motion.div
            {...fadeUp}
            className={cn(
              "text-center rounded-3xl p-12 md:p-16",
              "bg-card/40 border border-border/30 backdrop-blur-sm",
            )}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-3">
              Send your first agreement in under two minutes.
            </h2>
            <p className="text-sm text-muted-foreground/70 mb-8 max-w-md mx-auto">
              No installs, no plugins. Drop a document above and start a
              browser-based signing workflow instantly.
            </p>
            <button
              onClick={scrollToTop}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-7 py-3 rounded-xl text-sm font-semibold",
                "text-primary-foreground bg-primary hover:bg-primary/90",
                "shadow-lg shadow-primary/20",
                "transition-all duration-200 active:scale-[0.98]",
              )}
            >
              <Zap className="w-4 h-4" />
              Start a signing workflow
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}