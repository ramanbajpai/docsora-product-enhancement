import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Send,
  Share2,
  ShieldCheck,
  Globe2,
  Globe,
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
  Archive,
  GitCompare,
  HelpCircle,
  Infinity,
  BookOpen,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Presentation,
  Music,
  Box,
  Code,
  Mail,
  Users,
  Check,
  Film,
  Building2,
  FileSpreadsheet,
  Clock,
  KeyRound,
  FileCheck,
  HardDrive,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { transferVariants, type TransferVariantConfig, type LandingSection, type TransferVariantFAQ } from "@/data/transferVariants";
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
  { category: "Documents & Office", href: "/send-large-pdf-files", icon: FileText, formats: "PDF · DOCX · DOC · XLSX · XLS · PPTX · PPT · TXT · CSV · ODT · ODS · ODP · PAGES · NUMBERS · KEY", message: "Transfer contracts, proposals, spreadsheets and board packs in seconds.", messageSLF: "Send contracts, proposals and board packs the moment they're ready.", messageLFT: "Transfer contracts, proposals and board packs in one go." },
  { category: "Images & Photography", href: "/large-media-transfer", icon: ImageIcon, formats: "JPG · PNG · GIF · TIFF · BMP · WEBP · HEIC · AVIF · SVG · RAW · DNG · ARW · CR2 · NEF", message: "Deliver RAW photography, creative exports and high-res visual assets at full quality.", messageSLF: "Send full-resolution photos and RAW exports without quality loss.", messageLFT: "Transfer full-resolution photos and RAW exports without quality loss." },
  { category: "Design & Creative", href: "/creative-agency-file-sharing", icon: Palette, formats: "PSD · PSB · AI · EPS · INDD · IDML · XD · FIG · SKETCH · PRPROJ · AEP", message: "Move Adobe, Figma and creative-production files between agencies and freelancers.", messageSLF: "Send working design files to clients and collaborators, layers intact.", messageLFT: "Transfer working design files with layers and fonts intact." },
  { category: "Video", href: "/send-large-videos", icon: FileVideo, formats: "MP4 · MOV · AVI · MKV · WMV · MXF · WEBM · BRAW · R3D · ProRes", message: "Move large video exports and RAW footage with no re-encoding.", messageSLF: "Send video exports and RAW footage at source quality, no re-encoding.", messageLFT: "Transfer exports and RAW footage at source quality, no re-encoding." },
  { category: "Audio", icon: Music, formats: "MP3 · WAV · AAC · FLAC · AIFF · OGG · OPUS", message: "Transfer podcasts, masters, stems and production audio securely.", messageSLF: "Send masters, stems and podcast files without compression.", messageLFT: "Transfer masters, stems and podcast files without compression." },
  { category: "Archives & Packages", href: "/share-large-files", icon: Archive, formats: "ZIP · RAR · 7Z · TAR · TAR.GZ · GZ · ZIPX · PKG", message: "Bundle and deliver large project archives and backups in one transfer.", messageSLF: "Send whole zipped projects and backups as one transfer.", messageLFT: "Transfer whole zipped projects and backups as one item." },
  { category: "3D · CAD · Models", href: "/send-cad-files", icon: Box, formats: "DWG · OBJ · FBX · STL · BLEND · C4D · MA · MB", message: "Send CAD exports, 3D models and rendering assets between engineering teams.", messageSLF: "Send CAD exports and 3D models with no conversion.", messageLFT: "Transfer CAD exports and 3D models with no conversion." },
  { category: "Code & Development", icon: Code, formats: "HTML · CSS · JS · JSON · SQL · PY · JAVA · C · CPP", message: "Move development exports, databases, scripts and project builds securely.", messageSLF: "Send builds, databases and project exports securely.", messageLFT: "Transfer builds, databases and project exports securely." },
];

const whyLeaveWeTransfer = [
  { icon: Eye, title: "Real-time transfer tracking", description: "See each recipient's first open, every download, and the exact timestamp — your proof of delivery if anyone says a file never arrived." },
  { icon: Zap, title: "Expiry control & reactivation", description: "Extend transfer expiry dates or reactivate expired transfers instantly, without re-uploading a single file." },
  { icon: Mail, title: "Email notifications", description: "Get notified the moment files are viewed or downloaded, so you always know where a transfer stands." },
  { icon: Lock, title: "Secure encrypted delivery", description: "Transfers encrypted in transit (TLS) and at rest, with optional password protection and controlled expiry." },
  { icon: Layers, title: "100+ file types supported", description: "Send videos, presentations, PDFs, ZIP files, design files, CAD files and many other formats — no conversion, no compression." },
  { icon: Users, title: "No account required for recipients or senders", description: "Send and receive files instantly. Neither senders nor recipients need to create an account or install software." },
];

const sendLargeFilesCards = [
  { icon: Upload, title: "No size limit that stops you", description: "Send up to 500GB per transfer. No splitting, no compression, no bounced emails." },
  { icon: Mail, title: "Send by link or email", description: "Share a secure link anywhere, or send it straight to a recipient's inbox from Docsora." },
  { icon: Eye, title: "Know it was received", description: "See each recipient's first open and every download, with timestamps — proof your file landed." },
  { icon: Zap, title: "Set expiry and resend", description: "Choose how long a transfer stays live, extend it, or resend without uploading the file again." },
  { icon: Lock, title: "Encrypted and protected", description: "Encrypted in transit (TLS) and at rest, with optional password protection on any transfer." },
  { icon: Users, title: "No sign up for anyone", description: "Neither you nor your recipient needs an account or software." },
];

const operationalWorkflows = [
  {
    title: "Creative Agencies",
    description: "Deliver client work and track every open and download.",
    href: "/creative-agency-file-sharing",
    icon: Palette,
  },
  {
    title: "Video Production",
    description: "Move RAW footage and masters between set, edit and client.",
    href: "/video-production-file-sharing",
    icon: Film,
  },
  {
    title: "Architecture & Engineering",
    description: "Send DWG and BIM models with assemblies and references intact.",
    href: "/architecture-engineering-file-sharing",
    icon: Building2,
  },
  {
    title: "Legal Teams",
    description: "Share case files and contracts with audit-ready download records.",
    href: "/legal-file-sharing",
    icon: ShieldCheck,
  },
  {
    title: "Consulting Teams",
    description: "Send proposals and board packs — and see when they're opened.",
    href: "/consulting-file-sharing",
    icon: Briefcase,
  },
  {
    title: "Freelancers",
    description: "Deliver client work professionally and prove it landed.",
    href: "/freelancer-file-transfer",
    icon: Send,
  },
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

const ICONS: Record<string, LucideIcon> = {
  Upload, Mail, Eye, Zap, Lock, Users, Layers,
  ShieldCheck, Globe2, Globe, Briefcase, Palette, MonitorSmartphone,
  Workflow, History, Infinity, Archive, FileText, FileVideo,
  Presentation, Music, Box, Code, Send, Share2,
  Film, Building2, FileSpreadsheet, Sparkles, Check,
  Clock, KeyRound, FileCheck, HardDrive,
};

function SectionRenderer({ section }: { section: LandingSection }) {
  switch (section.kind) {
    case "richText":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-4">{section.h2}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-muted-foreground/80 leading-relaxed mb-4">{p}</p>
            ))}
            {section.cta && (
              <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
                <Link to={section.cta.href} className="text-primary hover:underline">
                  {section.cta.prefix ? `${section.cta.prefix} ` : ""}{section.cta.label}
                </Link>
              </p>
            )}
          </motion.div>
        </section>
      );
    case "steps":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{section.h2}</h2>
            {section.intro && <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.intro}</p>}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {section.steps.map((step, i) => (
              <motion.div key={step.n} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <div className="text-[11px] uppercase tracking-[0.14em] font-semibold text-primary/80 mb-2">Step {step.n}</div>
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      );
    case "checklist":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{section.h2}</h2>
            {section.intro && <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.intro}</p>}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {section.items.map((item, i) => (
              <motion.div key={item.h3} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.h3}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      );
    case "useCases":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{section.h2}</h2>
            {section.intro && <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.intro}</p>}
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {section.items.map((item, i) => (
              <motion.div key={item.h3} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.h3}</h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      );
    case "comparisonTable":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{section.h2}</h2>
            {section.intro && <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.intro}</p>}
          </motion.div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/40">
                    {section.columns.map((col, idx) => (
                      <th key={idx} className={cn("py-3.5 text-[13px] font-semibold text-foreground/60", idx === 0 ? "pr-4" : "px-4", idx === section.columns.length - 1 ? "pl-4" : "")}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, idx, arr) => (
                    <tr key={row.feature} className={idx < arr.length - 1 ? "border-b border-border/30" : ""}>
                      <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">{row.feature}</th>
                      {row.values.map((val, vidx) => (
                        <td key={vidx} className={cn("py-3.5 text-[13px] text-muted-foreground/80", vidx === 0 ? "px-4" : "pl-4")}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {section.footnote && (
              <p className="mt-6 text-center text-sm text-muted-foreground/80">
                {section.footnote.links && section.footnote.links.length > 0 ? (
                  section.footnote.text.split(section.footnote.links[0].label).map((part, idx, arr) => (
                    <span key={idx}>
                      {part}
                      {idx < arr.length - 1 && (
                        <Link to={section.footnote.links[0].href} className="text-primary hover:underline">{section.footnote.links[0].label}</Link>
                      )}
                    </span>
                  ))
                ) : (
                  section.footnote.text
                )}
              </p>
            )}
          </motion.div>
        </section>
      );
    case "lifecycle":
      return (
        <section>
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-4">{section.h2}</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.body}</p>
          </motion.div>
        </section>
      );
  }
}

interface TransferSEOProps {
  variant?: TransferVariantConfig;
}

export function TransferSEO({ variant }: TransferSEOProps) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const isSLF = variant?.slug === "send-large-files";
  const isLFT = variant?.slug === "large-file-transfer";
  const useTemplate = !!variant?.featureCards;
  const lftCards = [
    { icon: Upload, title: "Built for big files", description: "Move up to 500GB per transfer, with no splitting or compression." },
    { icon: Eye, title: "Visibility after sending", description: "See opens and downloads with timestamps, from one dashboard." },
    { icon: Zap, title: "Lifecycle you control", description: "Set expiry, extend it, or reactivate an expired transfer without re-uploading." },
    { icon: Mail, title: "Link or email delivery", description: "Send a secure link anywhere, or deliver straight to an inbox." },
    { icon: Lock, title: "Security that holds up", description: "Encrypted in transit (TLS) and at rest, with optional password protection." },
    { icon: Users, title: "Nothing to install", description: "Neither sender nor recipient needs an account or software." },
  ];
  const lftFaqs = [
    { question: "What is the best way to transfer large files?", answer: "For most people a dedicated transfer service beats email or a cloud drive: you upload the file, get a secure link, and the recipient downloads the original — no size limit, no compression, and a record of when it was opened. Docsora moves files up to 500GB this way." },
    { question: "How do I transfer large files between two computers or to someone else?", answer: "Upload the file or folder to Docsora and share the secure link by message or email. The recipient downloads it on any device — no matching apps, no cables, no shared network. You see when the transfer is downloaded." },
    { question: "How can I transfer 100GB of data or more?", answer: "Docsora handles single transfers up to 500GB, so 100GB moves as one transfer with one link — no splitting into parts or spreading it across multiple uploads. Once the upload finishes, the link is ready and the recipient downloads the original." },
    { question: "Is a transfer service better than cloud storage for sending files?", answer: "They solve different problems. Cloud storage is built to store and sync files; a transfer service is built to deliver one to someone and tell you it arrived. With Docsora you get delivery tracking and expiry without giving anyone access to a shared drive." },
    { question: "How long does a transfer stay available?", answer: "You control it. Set an expiry date when you send, extend it later, or reactivate an expired transfer without re-uploading the file. Transfers don't disappear on a fixed timer unless you want them to." },
    { question: "What is the largest file transfer Docsora supports?", answer: "Up to 500GB in a single transfer, with over 100 file formats supported and no conversion or compression — the original file is what your recipient downloads." },
  ];
  const lftRelated = [
    { label: "Send large files", href: "/send-large-files" },
    { label: "Share large files", href: "/share-large-files" },
    { label: "Secure file transfer", href: "/secure-file-transfer" },
    { label: "Email large files", href: "/email-large-files" },
  ];
  const sendLargeFilesFaqs = [
    { question: "How do I send large files online?", answer: "Upload your file or folder to Docsora, and a secure transfer link is generated as soon as the upload finishes. Share that link anywhere or send it by email from Docsora. Your recipient downloads the original file — no account or software needed on either side." },
    { question: "What is the largest file I can send?", answer: "You can send up to 500GB in a single transfer — far beyond email limits and most free transfer tools. There's no need to split, zip, or compress your file; upload the original and send it as one secure link." },
    { question: "How do I send a file that's too large to email?", answer: "Email providers cap attachments at around 20–25MB, so larger files bounce. Instead of attaching the file, Docsora sends a secure download link — no size limit, no compression. See how to send files too large to email for the full method.", linkText: "send files too large to email", linkHref: "/email-large-files" },
    { question: "Can I send large files without creating an account?", answer: "Yes. You can send large files with Docsora without signing up, and your recipient never needs an account either. There's nothing to install — everything runs in the browser, so you can upload and share a link in seconds." },
    { question: "How long do my transfer links stay active?", answer: "You control how long each transfer stays live. Set an expiry date when you send, extend it later, or reactivate an expired transfer without re-uploading the file. You decide when a link stops working." },
    { question: "Are my file transfers secure?", answer: "Yes. Files are encrypted in transit (TLS) and at rest, and you can add password protection and expiry to any transfer. Docsora is ISO 27001 certified, GDPR compliant and SOC 2 Type I, with a SOC 2 Type II audit in progress." },
    { question: "Is it safe to send large files online?", answer: "Yes. Every transfer is encrypted in transit (TLS) and at rest, and you can add a password and an expiry date so only the right person can open it. You also see exactly when your file is downloaded, which most email and cloud-drive links can't show you." },
    { question: "Can I send a large file to more than one person?", answer: "Yes. Share your transfer link with as many recipients as you like, or send it to several email addresses at once. You'll see each recipient's activity, so you know who has opened and downloaded the file." },
    { question: "Can I send large files from my phone?", answer: "Yes. Docsora runs entirely in your browser, so you can upload and send large files from an iPhone or Android phone with no app to install. Your recipient can download on any device the same way." },
    { question: "What happens if my recipient doesn't download the file in time?", answer: "Nothing is lost. You can extend the transfer's expiry date or reactivate an expired transfer without re-uploading the file, then resend the same link. You stay in control of how long it stays available." },
  ];
  const sendLargeFilesRelated = [
    { label: "Send large videos", href: "/send-large-videos" },
    { label: "Send large PDFs", href: "/send-large-pdf-files" },
    { label: "Email large files", href: "/email-large-files" },
    { label: "Share large files", href: "/share-large-files" },
  ];
  const sendLargeFilesGuides = [
    { title: "How To Send Large Files Online (2026 Complete Guide)", href: "/transfer-guides/how-to-send-large-files-online", teaser: "Every method for sending large files online, compared — limits, trade-offs and what holds up for real work." },
    { title: "How To Send Large Video Files Without Losing Quality", href: "/transfer-guides/how-to-send-large-video-files-without-losing-quality", teaser: "Why most apps compress your video, and the methods that deliver RAW, ProRes and 4K untouched." },
    { title: "Secure File Transfer For Business: Complete Guide", href: "/transfer-guides/secure-file-transfer-for-business", teaser: "Encryption, access controls, audit logs and what GDPR, ISO 27001 and SOC 2 mean in practice." },
  ];
  const activeFaqs: TransferVariantFAQ[] = useTemplate ? (variant?.faq ?? []) : isSLF ? sendLargeFilesFaqs : isLFT ? lftFaqs : (variant?.faq ?? [
    { question: "How can I send large files online securely?", answer: "Docsora allows users to upload files, generate secure transfer links and share them instantly with recipients. File transfers are encrypted and can be protected with expiry controls, providing a secure way to send large files online." },
    { question: "How do I send files that are too large to email?", answer: "Email providers cap attachments at around 20–25MB (Gmail 25MB, Outlook 20MB), and encoding overhead makes the real limit lower. With Docsora you upload files that are too large to email and send a secure link instead of an attachment — no size limit, no compression and no splitting. The recipient downloads the original file.", linkText: "too large to email", linkHref: "/email-large-files" },
    { question: "Can I track who downloaded my files?", answer: "Yes. Docsora provides transfer tracking so users can monitor views, downloads and recipient activity. This helps teams understand whether files have been received and accessed." },
    { question: "Can I extend or reactivate expired file transfers?", answer: "Yes. Docsora allows users to extend transfer expiry dates and reactivate expired transfers without needing to upload files again. This helps reduce duplicate work and improves file management." },
    { question: "Do recipients need a Docsora account?", answer: "No. Recipients can access files directly through a secure transfer link without creating an account or installing software." },
    { question: "What file types can I send with Docsora?", answer: "Docsora supports over 100 file types including PDF, Word, Excel, PowerPoint, ZIP, MP4, MOV, PSD, AI, DWG, STL, RAW photography formats and many other business, creative and technical file formats." },
    { question: "Can I send large video files online?", answer: "Yes. Docsora supports large video files including MP4, MOV, ProRes and RAW production formats, making it suitable for creators, production teams and agencies sharing high-resolution content." },
    { question: "Can I send ZIP files online?", answer: "Yes. Users can securely transfer ZIP files, project archives and packaged deliverables through a single transfer link while maintaining visibility over downloads and transfer activity." },
    { question: "Is Docsora secure for business file sharing?", answer: "Yes. Docsora is built for secure business file sharing and compliance-focused environments. Docsora is ISO 27001 certified, GDPR compliant and SOC 2 Type I, with a SOC 2 Type II audit currently in progress." },
    { question: "What makes Docsora different from traditional file transfer services?", answer: "Traditional services focus on sending files. Docsora focuses on what happens after — track downloads, see recipient activity, extend or reactivate expiry, and manage every transfer from one dashboard." },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-background border-t border-border/30">
      <div className="max-w-6xl mx-auto px-6 py-24 md:py-32 space-y-28 md:space-y-36">
        {/* SECTION - Secure large file transfer with tracking */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
              <Sparkles className="w-3 h-3 text-primary/80" />
              <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">{useTemplate ? (variant?.seoBadgeLabel ?? "Secure File Transfer") : isSLF ? "Send Large Files" : isLFT ? "Large File Transfer" : "Modern File Delivery"}</span>
            </div>
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{useTemplate ? (variant?.featureCardsH2 ?? "Everything you need") : isSLF ? "Everything you need to send large files" : isLFT ? "What a large file transfer service should do" : "Send Large Files up to 500GB"}</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{useTemplate ? (variant?.featureCardsIntro ?? "") : isSLF ? "Upload, get a secure link, and send it by link or email — then track every open and download, set expiry, and resend without re-uploading." : isLFT ? "A real transfer service does more than move a file — it gives you control after you hit send. Here's what to expect from Docsora." : "Send large files via link or email. Track views and downloads, extend expiry dates, reactivate transfers without re-uploading, and manage every transfer from one dashboard."}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {useTemplate && variant?.featureCards ? (
              variant.featureCards.map((item, i) => {
                const IconComp = ICONS[item.icon];
                return (
                  <motion.div key={item.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30 hover:border-primary/20 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                      {IconComp && <IconComp aria-hidden="true" className="w-[18px] h-[18px] text-primary/80" />}
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })
            ) : (
              (isSLF ? sendLargeFilesCards : isLFT ? lftCards : whyLeaveWeTransfer).map((item, i) => (
                <motion.div key={item.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30 hover:border-primary/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                    <item.icon aria-hidden="true" className="w-[18px] h-[18px] text-primary/80" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
                </motion.div>
              ))
            )}
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

        {/* Template sections */}
        {useTemplate && variant?.sections?.map((section, i) => (
          <SectionRenderer key={i} section={section} />
        ))}

        {isLFT && !useTemplate && (
          <>
            {/* SECTION - LFT: What to look for */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">What to look for in a large file transfer service</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">Most "send a file" tools stop the moment the file leaves. The differences that matter show up afterwards.</p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Transfer size", body: "Can it move the files you actually work with, not just a 2–3GB free cap?" },
                  { title: "Delivery tracking", body: "Do you find out when a file is opened and downloaded, or are you guessing?" },
                  { title: "Lifecycle control", body: "Can you extend or reactivate a transfer, or does it vanish after a few days?" },
                  { title: "Security and compliance", body: "Encryption, password protection, expiry, and real compliance behind it." },
                ].map((item, i) => (
                  <motion.div key={item.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION - LFT: Method comparison */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Transfer service vs email, cloud drives and FTP</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">There's more than one way to move a large file. Here's where each one breaks.</p>
              </motion.div>
              <motion.div {...fadeUp} className="max-w-4xl mx-auto">
                <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="py-3.5 pr-4 text-[13px] font-semibold text-foreground/60">Method</th>
                        <th className="py-3.5 px-4 text-[13px] font-semibold text-foreground/60">Size limit</th>
                        <th className="py-3.5 px-4 text-[13px] font-semibold text-foreground/60">Tracking</th>
                        <th className="py-3.5 pl-4 text-[13px] font-semibold text-foreground/60">Main drawback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Email attachment", "~20–25MB", "None", "Bounces; no record of receipt"],
                        ["Cloud drive link", "Large, shared access", "Limited", "Permission sprawl; links live forever"],
                        ["FTP / SFTP", "Large", "None", "Setup, credentials, no recipient visibility"],
                        ["Docsora transfer", "Up to 500GB", "Full — opens & downloads", "None of the above"],
                      ].map((row, idx, arr) => (
                        <tr key={row[0]} className={idx < arr.length - 1 ? "border-b border-border/30" : ""}>
                          <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">{row[0]}</th>
                          <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">{row[1]}</td>
                          <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">{row[2]}</td>
                          <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </section>

            {/* SECTION - LFT: Lifecycle */}
            <section>
              <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-4">Built around the transfer lifecycle</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">Most tools treat a transfer as fire-and-forget. Docsora keeps it under your control after you send — extend an expiry date when a client is slow, reactivate an expired transfer without uploading the file again, and see your full transfer history in one searchable dashboard. You decide when a link stops working, not a fixed timer.</p>
              </motion.div>
            </section>
          </>
        )}

        {variant?.slug === "send-large-files" && !useTemplate && (
          <>
            {/* SECTION A - Why email fails */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-6 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-4">Bigger than email allows?</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">Email providers cap attachments at around 20–25MB, so most large files bounce before they arrive. Docsora sends a secure link instead — no size limit, no compression, no bounce.</p>
                <p className="mt-4 text-sm text-foreground/90 leading-relaxed">
                  <Link to="/email-large-files" className="text-primary hover:underline">Starting from email? See how to send files too large to email.</Link>
                </p>
              </motion.div>
            </section>

            {/* SECTION B - Two steps */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">How to send a large file in two steps</h2>
              </motion.div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
                {[
                  { n: "1", title: "Upload your file or folder", body: "Drag in anything up to 500GB. No account, nothing to install." },
                  { n: "2", title: "Send by link or email — and track it", body: "Share it anywhere or send from Docsora, then see when it's opened and downloaded." },
                ].map((step, i) => (
                  <motion.li key={step.n} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-4 text-[13px] font-semibold text-primary/80" aria-hidden="true">{step.n}</div>
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{step.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{step.body}</p>
                  </motion.li>
                ))}
              </ol>
            </section>

            {/* SECTION - Use cases */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">When people use Docsora to send large files</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">Whatever you're sending, it's too big for email and too important to compress. Here's where Docsora fits.</p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Sending video to a client or editor", body: "Upload a finished cut, a folder of footage, or a master file and send one link — at full resolution, no compression, with a record of when it's downloaded." },
                  { title: "Delivering a large project folder", body: "Send an entire folder — designs, documents and assets together — as a single transfer, so nothing arrives missing or out of order." },
                  { title: "Sharing photos at full quality", body: "Send RAW files or a full shoot without the quality loss that messaging apps and email force on your images." },
                  { title: "Sending big files from your phone", body: "Upload straight from your phone's browser and share a link in seconds — no app to install, on iOS or Android." },
                ].map((item, i) => (
                  <motion.div key={item.title} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.04 }} className="rounded-2xl p-6 bg-card/40 border border-border/30">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.body}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* SECTION C - Limits comparison */}
            <section>
              <motion.div {...fadeUp} className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Send large files without the usual limits</h2>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">Free transfer tools cap your file size, your monthly transfers, and how long links stay live. Docsora doesn't.</p>
              </motion.div>
              <motion.div {...fadeUp} className="max-w-3xl mx-auto">
                <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/40">
                        <th className="py-3.5 pr-4 text-[13px] font-semibold text-foreground/60 w-[40%]">Feature</th>
                        <th className="py-3.5 px-4 text-[13px] font-semibold text-foreground bg-primary/[0.06] rounded-t-lg w-[30%]">Docsora</th>
                        <th className="py-3.5 pl-4 text-[13px] font-semibold text-muted-foreground w-[30%]">Typical free tools</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/30">
                        <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Transfer size</th>
                        <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Up to 500GB</td>
                        <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">2–3GB</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Monthly transfer limit</th>
                        <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">No monthly cap</td>
                        <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">As few as 10 per month</td>
                      </tr>
                      <tr>
                        <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Link expiry</th>
                        <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04] rounded-b-lg">Set, extend, resend</td>
                        <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">3–7 days, then gone</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 text-center text-sm text-muted-foreground/80">
                  Need the full breakdown? See how Docsora compares to{" "}
                  <Link to="/wetransfer-alternative" className="text-primary hover:underline">WeTransfer</Link>
                  {" and "}
                  <Link to="/smash-alternative" className="text-primary hover:underline">Smash</Link>.
                </p>
              </motion.div>
            </section>
          </>
        )}

        {/* SECTION - Supported file types */}
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{useTemplate && variant?.fileTypes?.h2 ? variant.fileTypes.h2 : "Every format you need, delivered at original quality"}</h2>
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
                <p className="text-[13px] text-muted-foreground/85 leading-relaxed">{useTemplate && variant?.fileTypes?.blurbs?.[g.category] ? variant.fileTypes.blurbs[g.category] : isSLF && g.messageSLF ? g.messageSLF : isLFT && g.messageLFT ? g.messageLFT : g.message}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION - Popular transfer workflows */}
        {useTemplate && variant?.related ? (
          <section>
            <motion.div {...fadeUp} className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">{variant.related.h2}</h2>
            </motion.div>
            <nav aria-label={variant.related.ariaLabel ?? variant.related.h2} className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {variant.related.links.map((r) => (
                <a key={r.href} href={r.href} className="text-sm font-medium text-primary/80 hover:text-primary hover:underline">
                  {r.label} →
                </a>
              ))}
            </nav>
          </section>
        ) : isSLF ? (
          <section>
            <motion.div {...fadeUp} className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">Related ways to send files</h2>
            </motion.div>
            <nav aria-label="Related ways to send files" className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {sendLargeFilesRelated.map((r) => (
                <a key={r.href} href={r.href} className="text-sm font-medium text-primary/80 hover:text-primary hover:underline">
                  {r.label} →
                </a>
              ))}
            </nav>
          </section>
        ) : isLFT ? (
          <section>
            <motion.div {...fadeUp} className="text-center mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">Related ways to transfer files</h2>
            </motion.div>
            <nav aria-label="Related ways to transfer files" className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {lftRelated.map((r) => (
                <a key={r.href} href={r.href} className="text-sm font-medium text-primary/80 hover:text-primary hover:underline">
                  {r.label} →
                </a>
              ))}
            </nav>
          </section>
        ) : (
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
        )}

        {/* SECTION - Operational workflows */}
        {!isSLF && !isLFT && !useTemplate && (
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">File Transfer for Individuals, Creatives and Teams</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">Built for the people who send files for a living — agencies, studios, engineering, legal, consulting and freelance.</p>
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
                    <Icon aria-hidden="true" className="w-4 h-4 text-primary/70 mb-3" />
                    <h3 className="text-[13px] font-semibold text-foreground mb-1">{w.title}</h3>
                    <p className="text-xs text-muted-foreground/75 leading-relaxed">{w.description}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
        )}

        {/* SECTION - Comparison table */}
        {!isSLF && !isLFT && !useTemplate && (
        <section>
          <motion.div {...fadeUp} className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Why Teams Choose Docsora Transfer</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">See how Docsora compares to the file transfer services most teams are switching from.</p>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-4xl mx-auto">
            <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="py-3.5 pr-4 text-[13px] font-semibold text-foreground/60 w-[28%] min-w-[140px]">Feature</th>
                    <th className="py-3.5 px-4 text-[13px] font-semibold text-foreground bg-primary/[0.06] rounded-t-lg w-[24%] min-w-[160px]">Docsora</th>
                    <th className="py-3.5 px-4 text-[13px] font-semibold text-muted-foreground w-[24%] min-w-[160px]">WeTransfer</th>
                    <th className="py-3.5 pl-4 text-[13px] font-semibold text-muted-foreground w-[24%] min-w-[160px]">Smash</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Transfer size</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Up to 500GB</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">3GB free / up to 200GB paid</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">2GB free / larger on paid</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Monthly transfer limit</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">No monthly cap</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">10 transfers per month free</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">No fixed cap</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">File expiry</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Set, extend &amp; reactivate</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">3 days free</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">7 days free</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Reactivate expired links</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Yes — no re-upload</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">Paid plans only</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">No</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Download tracking</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Yes — opens &amp; downloads</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">Paid plans only</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">Limited</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Recipient account needed</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">No</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">No</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">No</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Files used to train AI</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04]">Never — refer to TOS</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">Reversed after backlash, 2025</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">No</td>
                  </tr>
                  <tr>
                    <th className="py-3.5 pr-4 text-[13px] font-medium text-foreground/80" scope="row">Compliance</th>
                    <td className="py-3.5 px-4 text-[13px] text-foreground bg-primary/[0.04] rounded-b-lg">ISO 27001 · SOC 2 Type I · GDPR</td>
                    <td className="py-3.5 px-4 text-[13px] text-muted-foreground/80">Not publicly detailed</td>
                    <td className="py-3.5 pl-4 text-[13px] text-muted-foreground/80">Not publicly detailed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground/80">
              See the full breakdown —{" "}
              <Link to="/compare/docsora-vs-wetransfer" className="text-primary hover:underline">Docsora vs WeTransfer</Link>
              {" · "}
              <Link to="/compare/smash-vs-docsora" className="text-primary hover:underline">Docsora vs Smash</Link>
            </p>
          </motion.div>
        </section>
        )}

        {/* SECTION - FAQ */}
        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight">Frequently Asked Questions</h2>
          </motion.div>
          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {activeFaqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-5 text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground/80 leading-relaxed">
                    {faq.linkHref && faq.linkText ? (
                      <>
                        {faq.answer.split(faq.linkText).map((part, idx, arr) => (
                          <span key={idx}>
                            {part}
                            {idx < arr.length - 1 && (
                              <Link to={faq.linkHref} className="text-primary hover:underline">{faq.linkText}</Link>
                            )}
                          </span>
                        ))}
                      </>
                    ) : (
                      faq.answer
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </section>

        {/* SECTION - Comparisons */}
        {!useTemplate && (isSLF || isLFT ? (
          <section>
            <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
                <BookOpen aria-hidden="true" className="w-3 h-3 text-primary/80" />
                <span className="text-[11px] uppercase tracking-[0.12em] font-medium text-primary/80">Guides</span>
              </div>
              <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">{isLFT ? "Guides for large file transfer" : "Guides for sending large files"}</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {sendLargeFilesGuides.map((g, i) => (
                <motion.div key={g.href} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.05 }}>
                  <a href={g.href} className="group block h-full rounded-2xl p-6 bg-card/40 border border-border/30 hover:border-primary/25 hover:bg-card/70 transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                      <BookOpen aria-hidden="true" className="w-4 h-4 text-primary/80" />
                    </div>
                    <h3 className="text-[14px] font-semibold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">{g.title}</h3>
                    <p className="text-[13px] text-muted-foreground/80 leading-relaxed">{g.teaser}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-primary/70 group-hover:text-primary transition-colors">
                      <span>Read the guide</span>
                      <ArrowRight aria-hidden="true" className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </section>
        ) : (
        <section>
          <motion.div {...fadeUp} className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-[1.75rem] font-semibold text-foreground tracking-tight mb-3">Compare The Best WeTransfer & Smash Alternatives</h2>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">See how Docsora stacks up against the services teams switch from most.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {transferCompareVariants.map((c, i) => (
              <motion.div key={c.slug} {...staggerItem} transition={{ ...staggerItem.transition, delay: i * 0.05 }}>
                <Link to={`/${c.slug}`} className="group rounded-2xl p-6 block h-full bg-card/40 border border-border/30 hover:border-primary/20 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center">
                      <GitCompare aria-hidden="true" className="w-3.5 h-3.5 text-primary/80" />
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
        ))}

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
            <motion.div className="absolute left-1/2 top-1/2 h-[360px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.14),transparent_65%)] blur-2xl" animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.04, 1] }} transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
          </div>
          <motion.div {...fadeUp} className={cn("relative text-center rounded-[28px] px-8 py-16 md:px-16 md:py-20", "bg-gradient-to-b from-card/70 via-card/50 to-card/40", "border border-border/40", "shadow-[0_1px_0_0_hsl(var(--foreground)/0.04)_inset,0_30px_60px_-30px_hsl(var(--primary)/0.25),0_18px_40px_-20px_hsl(var(--foreground)/0.12)]", "backdrop-blur-xl overflow-hidden")}>
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <motion.div aria-hidden className="pointer-events-none absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] bg-[linear-gradient(115deg,transparent_40%,hsl(var(--primary)/0.06)_50%,transparent_60%)]" animate={{ x: ["-15%", "15%", "-15%"] }} transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }} />
            <div className="relative">
              {useTemplate && variant?.finalCta ? (
                <p className="text-2xl md:text-[1.875rem] font-semibold text-foreground tracking-tight mb-4 leading-tight">
                  {variant.finalCta.headline}
                </p>
              ) : isSLF || isLFT ? (
                <p className="text-2xl md:text-[1.875rem] font-semibold text-foreground tracking-tight mb-4 leading-tight">
                  Send Large Files Instantly.
                  <br className="hidden sm:block" />
                  <span className="text-foreground/70"> Professional file delivery starts here.</span>
                </p>
              ) : (
                <h2 className="text-2xl md:text-[1.875rem] font-semibold text-foreground tracking-tight mb-4 leading-tight">
                  Send Large Files Instantly.
                  <br className="hidden sm:block" />
                  <span className="text-foreground/70"> Professional file delivery starts here.</span>
                </h2>
              )}
              <p className="text-[14px] md:text-[15px] text-muted-foreground/80 mb-10 max-w-lg mx-auto leading-relaxed">{useTemplate && variant?.finalCta ? variant.finalCta.body : "Tracked. Secure. Built for modern file sharing - for creators, agencies and teams."}</p>
              <motion.button onClick={scrollToTop} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 28 }} className={cn("group relative inline-flex items-center justify-center gap-2", "px-7 py-3.5 rounded-xl text-sm font-semibold", "text-primary-foreground", "bg-gradient-to-b from-primary to-[hsl(var(--primary)/0.92)]", "border border-primary/40", "shadow-[0_1px_0_0_hsl(0_0%_100%/0.15)_inset,0_10px_30px_-10px_hsl(var(--primary)/0.55),0_4px_12px_-4px_hsl(var(--primary)/0.4)]", "hover:shadow-[0_1px_0_0_hsl(0_0%_100%/0.18)_inset,0_14px_36px_-10px_hsl(var(--primary)/0.65),0_6px_16px_-4px_hsl(var(--primary)/0.5)]", "transition-shadow duration-300")}>
                <span aria-hidden className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <Upload className="w-4 h-4" />
                {useTemplate && variant?.finalCta ? variant.finalCta.buttonLabel : "Start a transfer"}
              </motion.button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}