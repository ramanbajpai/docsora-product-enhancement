import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Send,
  ShieldCheck,
  Globe2,
  Briefcase,
  Sparkles,
  ArrowRight,
  Zap,
  Upload,
  Layers,
  Eye,
  Palette,
  Lock,
  MonitorSmartphone,
  Workflow,
  History,
  UserX,
  FileStack,
  CalendarClock,
  GitCompare,
  HelpCircle,
  BookOpen,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Presentation,
  Archive,
  Music,
  Box,
  Code,
  Mail,
  Users,
  Check,
  Film,
  Building2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { transferVariants, type TransferVariantConfig } from "@/data/transferVariants";
import { transferCompareVariants } from "@/data/transferCompareVariants";
import { transferGuides } from "@/data/transferGuides";

const easeSmooth: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: easeSmooth },
};
const staggerItem = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: easeSmooth },
};

const fileTypeGroups = [
  { category: "Documents & Office", href: "/send-large-pdf-files", icon: FileText, formats: "PDF · DOCX · DOC · XLSX · XLS · PPTX · PPT · TXT · CSV · ODT · ODS · ODP · PAGES · NUMBERS · KEY", message: "Transfer contracts, proposals, spreadsheets and board packs in seconds." },
  { category: "Images & Photography", href: "/large-media-transfer", icon: ImageIcon, formats: "JPG · PNG · GIF · TIFF · BMP · WEBP · HEIC · AVIF · SVG · RAW · DNG · ARW · CR2 · NEF", message: "Deliver RAW photography, creative exports and high-res visual assets at full quality." },
  { category: "Design & Creative", href: "/creative-agency-file-sharing", icon: Palette, formats: "PSD · PSB · AI · EPS · INDD · IDML · XD · FIG · SKETCH · PRPROJ · AEP", message: "Move Adobe, Figma and creative-production files between agencies and freelancers." },
  { category: "Video", href: "/send-large-videos", icon: FileVideo, formats: "MP4 · MOV · AVI · MKV · WMV · MXF · WEBM · BRAW · R3D · ProRes", message: "Move large video exports and RAW footage with no re-encoding." },
  { category: "Audio", icon: Music, formats: "MP3 · WAV · AAC · FLAC · AIFF · OGG · OPUS", message: "Transfer podcasts, masters, stems and production audio securely." },
  { category: "Archives & Packages", href: "/share-large-files", icon: Archive, formats: "ZIP · RAR · 7Z · TAR · TAR.GZ · GZ · ZIPX · PKG", message: "Bundle and deliver large project archives and backups in one transfer." },
  { category: "3D · CAD · Models", href: "/send-cad-files", icon: Box, formats: "DWG · OBJ · FBX · STL · BLEND · C4D · MA · MB", message: "Send CAD exports, 3D models and rendering assets between engineering teams." },
  { category: "Code & Development", icon: Code, formats: "HTML · CSS · JS · JSON · SQL · PY · JAVA · C · CPP", message: "Move development exports, databases, scripts and project builds securely." },
];

const whyLeaveWeTransfer = [
  { icon: Eye, title: "Real-time transfer tracking", description: "See each recipient's first open, every download, and the exact timestamp — your proof of delivery if anyone says a file never arrived." },
  { icon: Zap, title: "Expiry control & reactivation", description: "Extend transfer expiry dates or reactivate expired transfers instantly, without re-uploading a single file." },
  { icon: Mail, title: "Email notifications", description: "Get notified the moment files are viewed or downloaded, so you always know where a transfer stands." },
  { icon: Lock, title: "Secure encrypted delivery", description: "Transfers encrypted in transit (TLS) and at rest, with optional password protection and controlled expiry." },
  { icon: Layers, title: "100+ file types supported", description: "Send videos, presentations, PDFs, ZIP files, design files, CAD files and many other formats — no conversion, no compression." },
  { icon: Users, title: "No account required for recipients or senders", description: "Send and receive files instantly. Neither senders nor recipients need to create an account or install software." },
];

const operationalWorkflows = [
  {
    title: "Creative Agencies",
    description: "Share videos, design files and client deliverables with tracking and download notifications.",
    href: "/creative-agency-file-sharing",
    icon: Palette,
  },
  {
    title: "Video Production",
    description: "Transfer large video files, RAW footage and production assets without compression.",
    href: "/video-file-transfer",
    icon: Film,
  },
  {
    title: "Architecture & Engineering",
    description: "Send CAD drawings, BIM models and technical documentation securely.",
    href: "/cad-file-transfer",
    icon: Building2,
  },
  {
    title: "Legal Teams",
    description: "Share contracts, case files and sensitive legal documents with confidence.",
    href: "/legal-file-sharing",
    icon: ShieldCheck,
  },
  {
    title: "Consulting Teams",
    description: "Deliver proposals, board packs, reports and client documentation securely.",
    href: "/consulting-file-sharing",
    icon: Briefcase,
  },
  {
    title: "Freelancers",
    description: "Send project files, creative assets and client deliverables professionally.",
    href: "/freelancer-file-transfer",
    icon: Send,
  },
];

const features = [
  { icon: Send, title: "Instant sharing links", description: "Generate delivery links the moment upload completes." },
  { icon: Eye, title: "Real-time delivery tracking", description: "Track views, downloads and recipient activity instantly." },
  { icon: History, title: "Transfer history & visibility", description: "See every large file transfer, recipient and download in one searchable activity log." },
  { icon: FileStack, title: "100+ file types supported", description: "Send PDFs, videos, ZIPs, CAD files, design assets and documents without conversion." },
  { icon: Lock, title: "Secure encrypted delivery", description: "TLS-secured transfers with password protection and expiry controls." },
  { icon: UserX, title: "No recipient account required", description: "Recipients open and download shared files instantly - no sign-up, login or install." },
  { icon: Archive, title: "Multi-file delivery", description: "Bundle entire projects into one transfer in seconds." },
  { icon: CalendarClock, title: "Expiry control & reactivation", description: "Set, extend or reactivate transfer expiry dates anytime to keep secure file sharing under your control." },
];

const aiQuestions = [
  { q: "How do I send files larger than 25MB?", a: "Use a browser-native transfer platform like Docsora. Upload your file, generate a delivery link, and send the link instead of an attachment - no inbox limits." },
  { q: "What is the fastest large file transfer platform?", a: "The fastest practical option for most teams is browser-native transfer with parallel link generation - recipients can begin downloading the moment upload starts." },
  { q: "How do agencies send large client deliverables?", a: "Through tracked delivery platforms like Docsora - agencies see exactly when files were opened, and deliverables flow directly into signing workflows." },
  { q: "Can I transfer files securely online?", a: "Yes. Docsora encrypts every transfer in transit (TLS) and at rest, with password protection, download limits and expiring links available per delivery." },
  { q: "What is the best platform for sending large videos?", a: "Browser-native platforms that preserve source quality - Docsora moves RAW, ProRes, BRAW and master exports byte-for-byte with no transcoding." },
  { q: "How do I share large files professionally?", a: "Use a tracked delivery platform with secure links. Docsora shows exactly when each recipient opened and downloaded." },
  { q: "Can I transfer files directly from my browser?", a: "Yes - Docsora is 100% browser-native. No installs, no sync clients, no plugins." },
  { q: "What transfer platform supports collaborative workflows?", a: "Docsora Transfer integrates directly with Docsora Sign, Track and Storage - delivery, approvals, signing and archiving in one workflow." },
  { q: "How do I track large file downloads?", a: "Docsora records every open and download event with timestamps, surfaced on the transfer dashboard in real time." },
];

interface TransferSEOProps {
  variant?: TransferVariantConfig;
}

export function TransferSEO({ variant }: TransferSEOProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const activeFaqs = variant?.faq ?? [
    { question: "How can I send large files online securely?", answer: "Docsora allows users to upload files, generate secure transfer links and share them instantly with recipients. File transfers are encrypted and can be protected with expiry controls, providing a secure way to send large files online." },
    { question: "Can I track who downloaded my files?", answer: "Yes. Docsora provides transfer tracking so users can monitor views, downloads and recipient activity. This helps teams understand whether files have been received and accessed." },
    { question: "Can I extend or reactivate expired file transfers?", answer: "Yes. Docsora allows users to extend transfer expiry dates and reactivate expired transfers without needing to upload files again. This helps reduce duplicate work and improves file management." },
    { question: "Do recipients need a Docsora account?", answer: "No. Recipients can access files directly through a secure transfer link without creating an account or installing software." },
    { question: "What file types can I send with Docsora?", answer: "Docsora supports over 100 file types including PDF, Word, Excel, PowerPoint, ZIP, MP4, MOV, PSD, AI, DWG, STL, RAW photography formats and many other business, creative and technical file formats." },
    { question: "Can I send large video files online?", answer: "Yes. Docsora supports large video files including MP4, MOV, ProRes and RAW production formats, making it suitable for creators, production teams and agencies sharing high-resolution content." },
    { question: "Can I send ZIP files online?", answer: "Yes. Users can securely transfer ZIP files, project archives and packaged deliverables through a single transfer link while maintaining visibility over downloads and transfer activity." },
    { question: "Is Docsora secure for business file sharing?", answer: "Yes. Docsora is built for secure business file sharing and compliance-focused environments. The platform is ISO 27001 certified, GDPR compliant, SOC 2 Type I compliant and currently progressing through SOC 2 Type II audit requirements." },
    { question: "What makes Docsora different from traditional file transfer services?", answer: "Traditional file transfer services focus on sending files. Docsora focuses on what happens after files are sent. Users can track downloads, manage transfer history, extend expiry dates, reactivate transfers and maintain visibility over every file they share." },
    { question: "Why do teams choose Docsora for large file transfer?", answer: "Teams use Docsora to securely send large files, monitor recipient activity, manage transfers from a single dashboard and maintain visibility throughout the entire file-sharing process." },
  ];

  return (
    <div className="bg-background border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-28 md:space-y-36">
        {/* SECTION - Secure large file transfer with tracking */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">Modern File Delivery</span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Send Large Files up to 500GB</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Send large files via link or email. Track views and downloads, extend expiry dates, reactivate transfers without re-uploading, and manage every transfer from one dashboard.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {whyLeaveWeTransfer.map((item, i) => (
              <motion.div key={item.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30 hover:border-primary/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                  <item.icon aria-hidden="true" className="w-[18px] h-[18px] text-primary/80" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...staggerItem} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground/80">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-primary/70" />
              <span>Works on desktop, tablet and mobile</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground/80">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-primary/70" />
              <span>Files delivered via secure link or email</span>
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground/80">
              <Check aria-hidden="true" className="w-3.5 h-3.5 text-primary/70" />
              <span>ISO 27001 · SOC 2 Type I · GDPR compliant</span>
            </div>
          </motion.div>
        </section>

        {/* SECTION - Supported file types */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Every format you need, delivered at original quality</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Docsora supports over 100 file formats — from everyday documents to RAW video and CAD assemblies — and delivers every one at original quality, with no conversion or compression. Here's what you can send:</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fileTypeGroups.map((g, i) => (
              <motion.div key={g.category} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-5 bg-card/40 border border-border/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
                    <g.icon aria-hidden="true" className="w-4 h-4 text-primary/80" />
                  </div>
                  <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-primary/80">
                    {g.href ? (
                      <Link to={g.href} className="hover:text-primary transition-colors">{g.category}</Link>
                    ) : (
                      g.category
                    )}
                  </h3>
                </div>
                <p className="text-[12px] font-mono text-muted-foreground/70 leading-relaxed mb-2.5">{g.formats}</p>
                <p className="text-[13px] text-muted-foreground/85 leading-relaxed">{g.message}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION - Popular transfer workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Popular File Transfer Scenarios</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">From client deliverables and video exports to contracts and project archives, discover how Docsora Transfer helps users send large files securely and efficiently.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {transferVariants
              .slice(0, 12)
              .map((tool, i) => (
                <motion.div key={tool.slug} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.03 }}>
                  <Link to={`/${tool.slug}`} className="group block rounded-2xl p-5 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                      <tool.cardIcon aria-hidden="true" className="w-[18px] h-[18px] text-primary/70 group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-[13px] font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">{tool.cardLabel}</h3>
                    <p className="text-xs text-muted-foreground/75 leading-relaxed mb-3">{tool.cardDescription}</p>
                    <div className="flex items-center gap-1 text-[11px] font-medium text-primary/60 group-hover:text-primary transition-colors">
                      <span>Open</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </section>

        {/* SECTION - Operational workflows */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">File Transfer for Individuals, Creatives and Teams</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Securely send large files, videos, documents, CAD drawings and creative assets with tracking, download visibility and expiry controls.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {operationalWorkflows.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div key={w.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.03 }}>
                  <Link
                    to={w.href}
                    className="block rounded-2xl p-5 bg-card/40 border border-border/30 hover:border-primary/30 hover:bg-card/70 transition-all duration-200"
                  >
                    <Icon className="w-4 h-4 text-primary/70 mb-3" />
                    <h3 className="text-[13px] font-semibold text-foreground mb-1">{w.title}</h3>
                    <p className="text-xs text-muted-foreground/75 leading-relaxed">{w.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION - Features */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Why Teams Choose Docsora Transfer</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Track downloads, manage transfers, control expiry dates and share files securely.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.map((f, i) => (
              <motion.div key={f.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.03 }} className="rounded-2xl p-5 bg-card/40 border border-border/30">
                <f.icon className="w-4 h-4 text-primary/70 mb-3" />
                <h3 className="text-[13px] font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground/75 leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION - FAQ */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {activeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-5 text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/80 leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* SECTION - Comparisons */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Compare The Best WeTransfer & Smash Alternatives</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Compare Docsora with WeTransfer and Smash across file transfer, download tracking, transfer lifecycle management, security and compliance.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {transferCompareVariants.map((c, i) => (
              <motion.div key={c.slug} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.05 }}>
                <Link to={`/${c.slug}`} className="group rounded-2xl p-6 block h-full bg-card/40 border border-border/30 hover:border-primary/20 hover:bg-card/70 transition-all duration-300">
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

        {/* SECTION - Guides */}
        {!variant && (
          <section>
            <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <BookOpen className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">Transfer guides</span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Large File Transfer Resources</h2>
              <p className="text-sm text-muted-foreground/80 leading-relaxed">Practical guides for sending large files online, transferring videos without compression and securing business file delivery.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {transferGuides.map((g, i) => {
                const Icon = g.icon;
                return (
                  <motion.div key={g.slug} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.03 }}>
                    <Link to={`/transfer-guides/${g.slug}`} className="group block rounded-2xl p-5 h-full bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                      <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-3">
                        <Icon className="w-4 h-4 text-primary/70" />
                      </div>
                      <h3 className="text-[13px] font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{g.h1}</h3>
                      <p className="mt-2 text-[12px] text-muted-foreground/75 leading-relaxed line-clamp-2">{g.intro}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION - Final CTA */}
        <section className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.18),hsl(var(--primary)/0.06)_38%,transparent_70%)] blur-3xl" />
            <motion.div className="absolute left-1/2 top-1/2 h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.14),transparent_65%)] blur-2xl" animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
          </div>
          <motion.div {...fadeUp} className={cn("relative text-center rounded-[28px] px-8 py-16 md:px-16 md:py-20", "bg-gradient-to-b from-card/70 via-card/50 to-card/40", "border border-border/40", "shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_30px_60px_-30px_hsl(var(--primary)/0.25),0_18px_40px_-20px_hsl(var(--foreground)/0.12)]", "backdrop-blur-xl overflow-hidden")}>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <motion.div aria-hidden className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] bg-[linear-gradient(115deg,transparent_40%,hsl(var(--primary)/0.06)_50%,transparent_60%)]" animate={{ x: ["-15%", "15%", "-15%"] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
            <div className="relative">
              <h2 className="text-2xl md:text-[1.875rem] font-semibold text-foreground tracking-tight mb-4 leading-tight">
                Send Large Files Instantly.
                <br className="hidden sm:block" />
                <span className="text-foreground/70"> Professional file delivery starts here.</span>
              </h2>
              <p className="text-[14px] md:text-[15px] text-muted-foreground/80 mb-10 max-w-lg mx-auto leading-relaxed">Tracked. Secure. Encrypted. Built for modern file sharing - for creators, agencies and teams.</p>
              <motion.button onClick={scrollToTop} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} className={cn("group relative inline-flex items-center justify-center gap-2", "px-7 py-3.5 rounded-xl text-sm font-semibold", "text-primary-foreground", "bg-gradient-to-b from-primary to-[hsl(var(--primary)/0.92)]", "border border-primary/40", "shadow-[0_1px_0_0_hsl(0_0%_100%/0.15)_inset,0_10px_30px_-10px_hsl(var(--primary)/0.55),0_4px_12px_-4px_hsl(var(--primary)/0.4)]", "hover:shadow-[0_1px_0_0_hsl(0_0%_100%/0.18)_inset,0_14px_36px_-10px_hsl(var(--primary)/0.65),0_6px_16px_-4px_hsl(var(--primary)/0.5)]", "transition-shadow duration-300")}>
                <span aria-hidden className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Upload className="w-4 h-4" />
                Start a transfer
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}