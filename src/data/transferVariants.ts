import type { LucideIcon } from "lucide-react";
import {
  Send,
  FileVideo,
  FileText,
  Image as ImageIcon,
  Share2,
  ShieldCheck,
  Presentation,
  Archive,
  Briefcase,
  Palette,
  Mail,
  Globe2,
  Lock,
  Film,
  FileSpreadsheet,
  Building2,
  Zap,
  Upload,
} from "lucide-react";

export interface TransferVariantFAQ {
  question: string;
  answer: string;
  /** Optional inline link inside the answer. The substring `linkText` will be
   *  rendered as an <a href={linkHref}> at render time. */
  linkText?: string;
  linkHref?: string;
}

/* ----------------------------------------------------------------------------
 * Reusable landing-page template schema
 * ----------------------------------------------------------------------------
 * Every long-tail /transfer landing page is rendered by a single template
 * component (TransferSEO). Per-page content is supplied through the fields
 * below. All fields are optional — when omitted the template falls back to
 * the legacy "hub" content used by /transfer.
 * --------------------------------------------------------------------------*/

/** Allowlisted lucide-react icon names. The template maps these to components,
 *  so data files stay serializable and safe. Extend as needed. */
export type LandingIconName =
  | "Upload" | "Mail" | "Eye" | "Zap" | "Lock" | "Users" | "Layers"
  | "ShieldCheck" | "Globe2" | "Briefcase" | "Palette" | "MonitorSmartphone"
  | "Workflow" | "History" | "Archive" | "FileText" | "FileVideo"
  | "Presentation" | "Music" | "Box" | "Code" | "Send" | "Share2"
  | "Film" | "Building2" | "FileSpreadsheet" | "Sparkles" | "Check"
  | "Clock" | "KeyRound" | "FileCheck";

export interface LandingFeatureCard {
  icon: LandingIconName;
  title: string;
  description: string;
}

export interface LandingSectionRichText {
  kind: "richText";
  h2: string;
  paragraphs: string[];
  cta?: { prefix?: string; label: string; href: string };
}
export interface LandingSectionSteps {
  kind: "steps";
  h2: string;
  intro?: string;
  steps: { n: string; title: string; body: string }[];
}
export interface LandingSectionChecklist {
  kind: "checklist";
  h2: string;
  intro?: string;
  items: { h3: string; body: string }[];
}
export interface LandingSectionUseCases {
  kind: "useCases";
  h2: string;
  intro?: string;
  items: { h3: string; body: string }[];
}
export interface LandingSectionComparisonTable {
  kind: "comparisonTable";
  h2: string;
  intro?: string;
  columns: string[];
  rows: { feature: string; values: string[] }[];
  /** Optional sentence below the table; substrings matching each link.label
   *  are rendered as <Link to={link.href}>. */
  footnote?: { text: string; links?: { label: string; href: string }[] };
}
export interface LandingSectionLifecycle {
  kind: "lifecycle";
  h2: string;
  body: string;
}
export type LandingSection =
  | LandingSectionRichText
  | LandingSectionSteps
  | LandingSectionChecklist
  | LandingSectionUseCases
  | LandingSectionComparisonTable
  | LandingSectionLifecycle;

export interface LandingRelatedLinks {
  h2: string;
  ariaLabel?: string;
  links: { label: string; href: string }[];
}

export interface LandingFileTypesOverride {
  /** Optional override for the file-types section heading. */
  h2?: string;
  intro?: string;
  /** Per-category one-liner override, keyed by the file-type category name. */
  blurbs?: Record<string, string>;
}

export interface LandingFinalCta {
  /** Rendered as <p> (since the page already has an <h2> for every section). */
  headline: string;
  body: string;
  buttonLabel: string;
}

export interface TransferVariantConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keyword: string;
  cardIcon: LucideIcon;
  cardLabel: string;
  cardDescription: string;
  uploadHeadline: string;
  uploadSubheadline: string;
  ctaLabel: string;
  longCopy: string;
  useCases: string[];
  faq: TransferVariantFAQ[];

  /* ---------- Template overrides (all optional) ---------- */

  /** Pill label shown above the feature-cards H2. */
  seoBadgeLabel?: string;
  /** Heading for the 6-card feature grid. */
  featureCardsH2?: string;
  /** Subheading below the feature-cards H2. */
  featureCardsIntro?: string;
  /** When provided, replaces the default "Why teams leave WeTransfer" grid. */
  featureCards?: LandingFeatureCard[];
  /** Ordered intent-layer sections rendered between the feature grid and the
   *  file-types directory. */
  sections?: LandingSection[];
  /** Override copy / per-category blurbs for the file-types directory. */
  fileTypes?: LandingFileTypesOverride;
  /** When provided, replaces the "Popular File Transfer Scenarios" grid with
   *  a slim related-links row. */
  related?: LandingRelatedLinks;
  /** Final CTA copy; when provided, headline is rendered as <p>. */
  finalCta?: LandingFinalCta;
}

/**
 * Long-tail landing pages for the /transfer authority hub.
 * Every variant reuses the premium transfer experience above the fold
 * but ships unique SEO metadata, H1, copy and FAQs designed to
 * capture WeTransfer / large file delivery search intent across
 * Google, Perplexity, ChatGPT, Gemini and Claude.
 */
export const transferVariants: TransferVariantConfig[] = [
  {
    slug: "send-large-files",
    title: "Send Large Files Online - Fast, Secure Transfer | Docsora",
    metaDescription:
      "Send large files online instantly with browser-native delivery, link tracking and encrypted transfer sessions built for modern operational teams.",
    h1: "Send Large Files Instantly",
    intro:
      "Drop oversized documents, videos, design files or operational packages - Docsora generates a secure delivery link in seconds, no installs required.",
    keyword: "send large files",
    cardIcon: Send,
    cardLabel: "Send Large Files",
    cardDescription:
      "Up to 500GB, no account needed to send or receive.",
    uploadHeadline: "Send large files instantly",
    uploadSubheadline: "Up to 500GB per transfer. Tracked, encrypted, no sign up required.",
    ctaLabel: "Choose files to send",
    longCopy:
      "Docsora Transfer is the modern infrastructure layer for sending large files online. Drop one file or an entire operational package, generate an encrypted delivery link, and track opens and downloads in real time. No installs, no sync clients, no fragmented cloud drives - just professional file delivery built for the way modern teams actually ship work.",
    useCases: [
      "Deliver campaign assets to clients",
      "Send RAW video to production teams",
      "Move large design files between agencies",
      "Ship board packs and proposals",
      "Transfer onboarding packages",
    ],
    faq: [
      {
        question: "How do I send large files online with Docsora?",
        answer:
          "Drop your files into the transfer card, choose link or email delivery, set an expiry and optional password, and Docsora generates a secure delivery link in seconds. Both senders and recipients can use Docsora directly in the browser with no account required.",
      },
      {
        question: "What is the maximum file size I can send?",
        answer:
          "Docsora supports oversized operational files well beyond email attachment limits up to 500gb in a single transfer request.",
      },
      {
        question: "Are file transfers secure?",
        answer:
          "Yes. Every transfer runs over TLS, with optional password protection, download limits and expiring links. Files are encrypted in transit and on storage, and link activity is fully auditable.",
      },
    ],
    seoBadgeLabel: "Send Large Files",
    featureCardsH2: "Everything you need to send large files",
    featureCardsIntro:
      "Upload, get a secure link, and send it by link or email — then track every open and download, set expiry, and resend without re-uploading.",
    featureCards: [
      { icon: "Upload", title: "No size limit that stops you", description: "Send up to 500GB per transfer. No splitting, no compression, no bounced emails." },
      { icon: "Mail", title: "Send by link or email", description: "Share a secure link anywhere, or send it straight to a recipient's inbox from Docsora." },
      { icon: "Eye", title: "Know it was received", description: "See each recipient's first open and every download, with timestamps — proof your file landed." },
      { icon: "Zap", title: "Set expiry and resend", description: "Choose how long a transfer stays live, extend it, or resend without uploading the file again." },
      { icon: "Lock", title: "Encrypted and protected", description: "Encrypted in transit (TLS) and at rest, with optional password protection on any transfer." },
      { icon: "Users", title: "No sign up for anyone", description: "Neither you nor your recipient needs an account or software." },
    ],
    sections: [
      {
        kind: "richText",
        h2: "Bigger than email allows?",
        paragraphs: [
          "Email providers cap attachments at around 20–25MB, so most large files bounce before they arrive. Docsora sends a secure link instead — no size limit, no compression, no bounce.",
        ],
        cta: { label: "Starting from email? See how to send files too large to email.", href: "/email-large-files" },
      },
      {
        kind: "steps",
        h2: "How to send a large file in two steps",
        steps: [
          { n: "1", title: "Upload your file or folder", body: "Drag in anything up to 500GB. No account, nothing to install." },
          { n: "2", title: "Send by link or email — and track it", body: "Share it anywhere or send from Docsora, then see when it's opened and downloaded." },
        ],
      },
      {
        kind: "useCases",
        h2: "When people use Docsora to send large files",
        intro: "Whatever you're sending, it's too big for email and too important to compress. Here's where Docsora fits.",
        items: [
          { h3: "Sending video to a client or editor", body: "Upload a finished cut, a folder of footage, or a master file and send one link — at full resolution, no compression, with a record of when it's downloaded." },
          { h3: "Delivering a large project folder", body: "Send an entire folder — designs, documents and assets together — as a single transfer, so nothing arrives missing or out of order." },
          { h3: "Sharing photos at full quality", body: "Send RAW files or a full shoot without the quality loss that messaging apps and email force on your images." },
          { h3: "Sending big files from your phone", body: "Upload straight from your phone's browser and share a link in seconds — no app to install, on iOS or Android." },
        ],
      },
      {
        kind: "comparisonTable",
        h2: "Send large files without the usual limits",
        intro: "Free transfer tools cap your file size, your monthly transfers, and how long links stay live. Docsora doesn't.",
        columns: ["Feature", "Docsora", "Typical free tools"],
        rows: [
          { feature: "Transfer size", values: ["Up to 500GB", "2–3GB"] },
          { feature: "Monthly transfer limit", values: ["No monthly cap", "As few as 10 per month"] },
          { feature: "Link expiry", values: ["Set, extend, resend", "3–7 days, then gone"] },
        ],
        footnote: {
          text: "Need the full breakdown? See how Docsora compares to WeTransfer and Smash.",
          links: [
            { label: "WeTransfer", href: "/wetransfer-alternative" },
            { label: "Smash", href: "/smash-alternative" },
          ],
        },
      },
    ],
    fileTypes: {
      blurbs: {
        "Documents & Office": "Send contracts, proposals and board packs the moment they're ready.",
        "Images & Photography": "Send full-resolution photos and RAW exports without quality loss.",
        "Design & Creative": "Send working design files to clients and collaborators, layers intact.",
        "Video": "Send video exports and RAW footage at source quality, no re-encoding.",
        "Audio": "Send masters, stems and podcast files without compression.",
        "Archives & Packages": "Send whole zipped projects and backups as one transfer.",
        "3D · CAD · Models": "Send CAD exports and 3D models with no conversion.",
        "Code & Development": "Send builds, databases and project exports securely.",
      },
    },
    related: {
      h2: "Related ways to send files",
      ariaLabel: "Related ways to send files",
      links: [
        { label: "Send large videos", href: "/send-large-videos" },
        { label: "Send large PDFs", href: "/send-large-pdf-files" },
        { label: "Email large files", href: "/email-large-files" },
        { label: "Share large files", href: "/share-large-files" },
      ],
    },
    finalCta: {
      headline: "Send Large Files Instantly. Professional file delivery starts here.",
      body: "Tracked. Secure. Built for modern file sharing - for creators, agencies and teams.",
      buttonLabel: "Start a transfer",
    },
  },
  {
    slug: "large-file-transfer",
    title: "Large File Transfer Platform for Modern Teams | Docsora",
    metaDescription:
      "Professional large file transfer platform with link tracking and operational workflows. Faster than WeTransfer, more capable than email.",
    h1: "Large file transfer",
    intro:
      "Move files up to 500GB with tracking, expiry control and reactivation — no sign up required.",
    keyword: "large file transfer",
    cardIcon: Upload,
    cardLabel: "Large File Transfer",
    cardDescription:
      "Move big files with full delivery tracking and reactivation.",
    uploadHeadline: "Large file transfer",
    uploadSubheadline: "Move files up to 500GB with tracking, expiry control and reactivation — no sign up required.",
    ctaLabel: "Start a large transfer",
    longCopy:
      "Docsora Transfer rebuilds large file delivery as operational infrastructure: encrypted sessions, real-time tracking and direct integration with approvals and signing. The same platform that moves a 4GB video edit also routes contracts for signature and stores deliverables for client access.",
    useCases: [
      "Agency client deliverables",
      "Video edits and master exports",
      "Architectural CAD packages",
      "Audit-ready financial exports",
      "Cross-team operational releases",
    ],
    faq: [
      {
        question: "What is the best large file transfer platform?",
        answer:
          "The best large file transfer platforms combine massive file support with operational features - tracking, encrypted sessions and workflow integration. Docsora ships all four in a browser-native experience without sync clients or enterprise software.",
      },
      {
        question: "Can I track who downloaded my large file transfer?",
        answer:
          "Yes. Docsora records every open and download event with timestamps, so you always know exactly when a recipient accessed the transfer.",
      },
    ],
    seoBadgeLabel: "Large File Transfer",
    featureCardsH2: "What a large file transfer service should do",
    featureCardsIntro:
      "A real transfer service does more than move a file — it gives you control after you hit send. Here's what to expect from Docsora.",
    featureCards: [
      { icon: "Upload", title: "Built for big files", description: "Move up to 500GB per transfer, with no splitting or compression." },
      { icon: "Eye", title: "Visibility after sending", description: "See opens and downloads with timestamps, from one dashboard." },
      { icon: "Zap", title: "Lifecycle you control", description: "Set expiry, extend it, or reactivate an expired transfer without re-uploading." },
      { icon: "Mail", title: "Link or email delivery", description: "Send a secure link anywhere, or deliver straight to an inbox." },
      { icon: "Lock", title: "Security that holds up", description: "Encrypted in transit (TLS) and at rest, with optional password protection." },
      { icon: "Users", title: "Nothing to install", description: "Neither sender nor recipient needs an account or software." },
    ],
    sections: [
      {
        kind: "checklist",
        h2: "What to look for in a large file transfer service",
        intro: "Most \"send a file\" tools stop the moment the file leaves. The differences that matter show up afterwards.",
        items: [
          { h3: "Transfer size", body: "Can it move the files you actually work with, not just a 2–3GB free cap?" },
          { h3: "Delivery tracking", body: "Do you find out when a file is opened and downloaded, or are you guessing?" },
          { h3: "Lifecycle control", body: "Can you extend or reactivate a transfer, or does it vanish after a few days?" },
          { h3: "Security and compliance", body: "Encryption, password protection, expiry, and real compliance behind it." },
        ],
      },
      {
        kind: "comparisonTable",
        h2: "Transfer service vs email, cloud drives and FTP",
        intro: "There's more than one way to move a large file. Here's where each one breaks.",
        columns: ["Method", "Size limit", "Tracking", "Main drawback"],
        rows: [
          { feature: "Email attachment", values: ["~20–25MB", "None", "Bounces; no record of receipt"] },
          { feature: "Cloud drive link", values: ["Large, shared access", "Limited", "Permission sprawl; links live forever"] },
          { feature: "FTP / SFTP", values: ["Large", "None", "Setup, credentials, no recipient visibility"] },
          { feature: "Docsora transfer", values: ["Up to 500GB", "Full — opens & downloads", "None of the above"] },
        ],
      },
      {
        kind: "lifecycle",
        h2: "Built around the transfer lifecycle",
        body: "Most tools treat a transfer as fire-and-forget. Docsora keeps it under your control after you send — extend an expiry date when a client is slow, reactivate an expired transfer without uploading the file again, and see your full transfer history in one searchable dashboard. You decide when a link stops working, not a fixed timer.",
      },
    ],
    fileTypes: {
      blurbs: {
        "Documents & Office": "Transfer contracts, proposals and board packs in one go.",
        "Images & Photography": "Transfer full-resolution photos and RAW exports without quality loss.",
        "Design & Creative": "Transfer working design files with layers and fonts intact.",
        "Video": "Transfer exports and RAW footage at source quality, no re-encoding.",
        "Audio": "Transfer masters, stems and podcast files without compression.",
        "Archives & Packages": "Transfer whole zipped projects and backups as one item.",
        "3D · CAD · Models": "Transfer CAD exports and 3D models with no conversion.",
        "Code & Development": "Transfer builds, databases and project exports securely.",
      },
    },
    related: {
      h2: "Related ways to transfer files",
      ariaLabel: "Related ways to transfer files",
      links: [
        { label: "Send large files", href: "/send-large-files" },
        { label: "Share large files", href: "/share-large-files" },
        { label: "Secure file transfer", href: "/secure-file-transfer" },
        { label: "Email large files", href: "/email-large-files" },
      ],
    },
    finalCta: {
      headline: "Send Large Files Instantly. Professional file delivery starts here.",
      body: "Tracked. Secure. Built for modern file sharing - for creators, agencies and teams.",
      buttonLabel: "Start a transfer",
    },
  },
  {
    slug: "wetransfer-alternative",
    title: "Best WeTransfer Alternative for Operational Teams | Docsora",
    metaDescription:
      "Looking for a WeTransfer alternative? Docsora delivers large files with real-time tracking, encrypted sessions and operational workflows.",
    h1: "The Modern WeTransfer Alternative",
    intro:
      "WeTransfer evolved for modern operational teams - large file delivery with tracking, workflows and signing in one platform.",
    keyword: "wetransfer alternative",
    cardIcon: Zap,
    cardLabel: "WeTransfer Alternative",
    cardDescription:
      "More tracking, longer expiry — and files never used to train AI.",
    uploadHeadline: "The modern way to send files",
    uploadSubheadline: "Delivery tracking, encrypted sessions and workflow-native handoffs.",
    ctaLabel: "Try Docsora Transfer",
    longCopy:
      "Docsora Transfer is the WeTransfer alternative built for operational teams. Beyond sending files, every transfer is a workflow primitive - trackable, expirable, and connected to approvals and signing. Agencies, production teams, consultancies and finance teams use it to replace fragmented WeTransfer + Dropbox + email chains with one operational delivery layer.",
    useCases: [
      "Replace WeTransfer for client delivery",
      "Track downloads WeTransfer can't",
      "Control recipient access",
      "Route delivered files into signing flows",
      "Bundle multi-file operational packages",
    ],
    faq: [
      {
        question: "Why use Docsora instead of WeTransfer?",
        answer:
          "WeTransfer is a generic upload utility. Docsora is operational delivery infrastructure - same browser-native simplicity, but with real-time tracking, tracked pages, encrypted sessions and direct workflow integration into signing and approvals.",
      },
      {
        question: "Is Docsora faster than WeTransfer?",
        answer:
          "Docsora generates a delivery link the moment your upload begins, so recipients can start downloading before the upload finishes. Most teams notice the perceived speed difference immediately.",
      },
      {
        question: "Can I migrate my WeTransfer workflows to Docsora?",
        answer:
          "Yes. Docsora replicates WeTransfer's core flow - drop files, get a link, send to recipients - and adds the operational layer (tracking, workflows) on top.",
      },
    ],
  },
  {
    slug: "send-large-videos",
    title: "Send Large Videos Online Without Compression | Docsora",
    metaDescription:
      "Send large videos online without compression. Transfer RAW footage, master exports and 4K/8K video files at full resolution with delivery tracking.",
    h1: "Send Large Videos Without Compression",
    intro:
      "Move RAW footage, master exports and 4K/8K video files at full resolution - no compression, no quality loss, no hard drives.",
    keyword: "send large videos",
    cardIcon: FileVideo,
    cardLabel: "Send Large Videos",
    cardDescription:
      "RAW, ProRes and 4K delivered at full resolution.",
    uploadHeadline: "Send large videos at full resolution",
    uploadSubheadline: "RAW, MXF, BRAW, R3D, ProRes - no compression, no quality loss.",
    ctaLabel: "Upload video files",
    longCopy:
      "Docsora Transfer is built for video teams that move large files daily. Send RAW footage, master exports, BRAW, R3D and MXF assets without compression and without re-uploading to half a dozen platforms. Generate a delivery link the moment upload completes so editors, colorists and producers can download.",
    useCases: [
      "Deliver master video edits",
      "Move RAW footage between editors",
      "Send 4K/8K final exports",
      "Ship trailer cuts to agencies",
      "Transfer documentary archives",
    ],
    faq: [
      {
        question: "What is the fastest way to transfer large videos?",
        answer:
          "Browser-native transfer platforms like Docsora are the fastest practical option for most teams - no software to install, encrypted sessions, and delivery links generated the moment upload completes so recipients can download.",
      },
      {
        question: "Can I send large videos without compression?",
        answer:
          "Yes. Docsora preserves source video files byte-for-byte. Your RAW, ProRes, BRAW or master exports are delivered exactly as uploaded.",
      },
    ],
  },
  {
    slug: "send-large-files-online",
    title: "Send Large Files Online - Browser-Native Transfer | Docsora",
    metaDescription:
      "Send large files online from any browser. No installs, no sync clients - secure transfer links, delivery tracking and workflow integration.",
    h1: "Send Large Files Online",
    intro:
      "Drop a file in the browser and Docsora generates a secure delivery link in seconds. Track opens and set expiry on every transfer.",
    keyword: "send large files online",
    cardIcon: Globe2,
    cardLabel: "Send Files Online",
    cardDescription:
      "Straight from your browser — no installs, no accounts.",
    uploadHeadline: "Send files online in seconds",
    uploadSubheadline: "Pure browser delivery - no installs, no plugins, no sync clients.",
    ctaLabel: "Send a file online",
    longCopy:
      "Docsora Transfer is 100% browser-native. No desktop apps, no sync clients, no plugins - just open the page, drop your files and get a delivery link. Works identically across macOS, Windows, Linux, iOS and Android.",
    useCases: [
      "Send files from any device",
      "Cross-platform team handoffs",
      "Quick client-to-team uploads",
      "Mobile-first delivery flows",
    ],
    faq: [
      {
        question: "Can I transfer files directly from my browser?",
        answer:
          "Yes - Docsora Transfer is fully browser-native. Drop files into the page, and a secure delivery link is generated immediately. No installs or plugins required.",
      },
      {
        question: "Does Docsora work on mobile?",
        answer:
          "Yes. The transfer experience works identically on iOS and Android browsers, so you can send or receive large files from a phone or tablet.",
      },
    ],
  },
  {
    slug: "share-large-files",
    title: "Share Large Files Securely Online | Docsora Transfer",
    metaDescription:
      "Share large files online with secure delivery links, tracking, password protection and encrypted recipient sessions. Built for operational teams.",
    h1: "Share Large Files With Anyone",
    intro:
      "Generate a secure shareable link in seconds, control who downloads, and track every recipient action in real time.",
    keyword: "share large files",
    cardIcon: Share2,
    cardLabel: "Share Large Files",
    cardDescription:
      "One link, many recipients, full download visibility.",
    uploadHeadline: "Share large files securely",
    uploadSubheadline: "Generate a delivery link in seconds - track and control every download.",
    ctaLabel: "Generate share link",
    longCopy:
      "Docsora Transfer turns file sharing into operational infrastructure. Every share is a tracked, controllable delivery - not a fire-and-forget download URL. Set passwords, expiry windows, recipient lists and download caps in seconds.",
    useCases: [
      "Share assets with external partners",
      "Send reports to clients",
      "Distribute internal team files",
      "Share confidential documents securely",
    ],
    faq: [
      {
        question: "How do I share large files professionally?",
        answer:
          "Use a tracked delivery platform like Docsora Transfer. Upload files, generate a secure link, and share with clients - you'll see exactly when they open and download.",
      },
    ],
  },
  {
    slug: "large-media-transfer",
    title: "Large Media Transfer - Video, RAW & Design Files | Docsora",
    metaDescription:
      "Large media transfer for video, RAW imagery, design files and production assets. Browser-native delivery without compression.",
    h1: "Large Media Transfer for Production Teams",
    intro:
      "Move video, RAW imagery, design exports and production-grade assets across creative, post-production and agency teams instantly.",
    keyword: "large media transfer",
    cardIcon: Film,
    cardLabel: "Large Media Transfer",
    cardDescription: "Mixed video, RAW and design assets in one transfer.",
    uploadHeadline: "Move production media instantly",
    uploadSubheadline: "Video, RAW imagery, design exports - delivered without compression.",
    ctaLabel: "Transfer media",
    longCopy:
      "Docsora Transfer is operational delivery infrastructure for production media. Move masters, RAW imagery, PSDs, INDDs, AEPs and design exports without quality loss, with tracked delivery and encrypted sessions.",
    useCases: [
      "Deliver final video masters",
      "Move RAW photography sets",
      "Ship Adobe / Figma design packages",
      "Transfer 3D & rendering assets",
    ],
    faq: [
      {
        question: "What is the best platform for sending large videos and media?",
        answer:
          "For production teams, the best platforms preserve source quality, offer real-time tracking and run in the browser. Docsora Transfer ships all three with operational workflow integration on top.",
      },
    ],
  },
  {
    slug: "send-large-pdf-files",
    title: "Send Large PDF Files Online - Secure Delivery | Docsora",
    metaDescription:
      "Send large PDF files online with delivery tracking and encrypted sessions. Built for legal, finance and operational teams.",
    h1: "Send Large PDF Files Online",
    intro:
      "Move oversized contracts, reports and PDF bundles past email size limits - with tracking, passwords and expiry baked in.",
    keyword: "send large pdf files",
    cardIcon: FileText,
    cardLabel: "Send Large PDFs",
    cardDescription:
      "Past the email size limit, with no compression.",
    uploadHeadline: "Send large PDF files securely",
    uploadSubheadline: "Past inbox limits - with tracking, expiry and password protection.",
    ctaLabel: "Send a PDF transfer",
    longCopy:
      "Docsora Transfer is the operational delivery layer for large PDFs. Send oversized contracts, audit reports, board packs and operational document bundles with real-time delivery tracking and granular access controls.",
    useCases: [
      "Deliver large contract bundles",
      "Send board pack PDFs",
      "Ship audit reports to clients",
      "Move legal evidence files",
    ],
    faq: [
      {
        question: "How do I send large PDF files over email?",
        answer:
          "Don't attach them - generate a Docsora delivery link instead. Recipients click through to a tracked download page with tracking, password protection and expiry controls.",
      },
    ],
  },
  {
    slug: "send-zip-files",
    title: "Send ZIP Files Online - Secure Large Archive Transfer | Docsora",
    metaDescription:
      "Send ZIP files online with secure delivery links, tracking and expiry controls. Move large archives, project bundles and compressed folders past inbox limits.",
    h1: "Send Large ZIP Files Online",
    intro:
      "Move oversized ZIP archives, project bundles and compressed folders with tracked, encrypted delivery - no inbox limits, no installs.",
    keyword: "send zip files",
    cardIcon: Archive,
    cardLabel: "Send ZIP Files",
    cardDescription:
      "Send large ZIP files online with secure links, tracking and expiry.",
    uploadHeadline: "Send large ZIP files securely",
    uploadSubheadline: "Tracked delivery for archives, project bundles and compressed folders.",
    ctaLabel: "Send a ZIP transfer",
    longCopy:
      "Docsora Transfer is built for sending large ZIP archives - project bundles, asset packs, code drops and compressed deliverables - with browser-native upload, secure delivery links, real-time tracking and granular expiry controls.",
    useCases: [
      "Deliver project archives to clients",
      "Send asset bundles to agencies",
      "Ship code or build drops",
      "Move compressed media packages",
    ],
    faq: [
      {
        question: "How do I send a large ZIP file online?",
        answer:
          "Drop the ZIP file into Docsora Transfer, generate a secure delivery link and share with recipients. Tracking, password protection and expiry are included by default.",
      },
    ],
  },
  {
    slug: "send-design-files",
    title: "Send Large Design Files - Adobe, Figma & PSDs | Docsora",
    metaDescription:
      "Send large design files online - PSD, AI, INDD, Figma exports and creative packages. Browser-native delivery without compression for design teams.",
    h1: "Send Large Design Files",
    intro:
      "Move Adobe, Figma and production design files across creative teams without compression, fragmented links or sync clients.",
    keyword: "send large design files",
    cardIcon: Palette,
    cardLabel: "Send Design Files",
    cardDescription: "PSD, AI, INDD and Figma exports, delivered intact.",
    uploadHeadline: "Send design files at full fidelity",
    uploadSubheadline: "PSD, AI, INDD, AEP, Figma exports - moved without compression.",
    ctaLabel: "Send design files",
    longCopy:
      "Docsora Transfer is the modern design-file handoff layer for agencies, in-house teams and freelancers. Move PSDs, AIs, INDDs, AEPs and Figma exports without compression, with encrypted sessions and real-time delivery tracking.",
    useCases: [
      "Agency to client handoff",
      "Design to production handoff",
      "Cross-studio collaboration",
      "Freelancer client delivery",
    ],
    faq: [
      {
        question: "How do designers send large project files?",
        answer:
          "The modern workflow is browser-native: upload to Docsora Transfer, generate a secure link and share. No sync clients, no compression, no quality loss.",
      },
    ],
  },
  {
    slug: "agency-file-sharing",
    title: "Send CAD Files Online - Secure Engineering File Transfer | Docsora",
    metaDescription:
      "Send large CAD files online with secure delivery, tracking and expiry controls. Move DWG, DXF, STEP, IGES and Revit files between engineering teams.",
    h1: "Send Large CAD Files Online",
    intro:
      "Move DWG, DXF, STEP, IGES, Revit and 3D model files between engineering, architecture and manufacturing teams with tracked, secure delivery.",
    keyword: "send cad files",
    cardIcon: Building2,
    cardLabel: "Send CAD Files",
    cardDescription:
      "DWG, STEP and Revit — assemblies kept intact.",
    uploadHeadline: "Send large CAD files securely",
    uploadSubheadline: "DWG, DXF, STEP, IGES, Revit - tracked delivery for engineering teams.",
    ctaLabel: "Send a CAD transfer",
    longCopy:
      "Docsora Transfer is built for engineering, architecture and manufacturing teams that move large CAD files daily. Send DWG, DXF, STEP, IGES, Revit and 3D model packages with browser-native upload, secure delivery links, real-time tracking and granular expiry controls.",
    useCases: [
      "Ship CAD packages to clients",
      "Move Revit models between offices",
      "Send STEP and IGES files to suppliers",
      "Deliver 3D model bundles",
    ],
    faq: [
      {
        question: "How do I send large CAD files online?",
        answer:
          "Upload DWG, DXF, STEP, IGES or Revit files to Docsora Transfer and share the generated delivery link. Files are preserved byte-for-byte with tracked downloads and expiry controls.",
      },
    ],
  },
  {
    slug: "client-file-delivery",
    title: "Client File Delivery Platform for Modern Teams | Docsora",
    metaDescription:
      "Deliver files to clients professionally with tracked transfer pages and integrated approval workflows. The modern client delivery layer.",
    h1: "Professional Client File Delivery",
    intro:
      "Deliver client work through tracked transfer pages with real-time updates, approvals and signing in one operational workflow.",
    keyword: "client file delivery",
    cardIcon: Building2,
    cardLabel: "Client File Delivery",
    cardDescription: "Operational delivery with tracking and workflow integration.",
    uploadHeadline: "Deliver client work professionally",
    uploadSubheadline: "Tracked recipient pages with approvals and signing built in.",
    ctaLabel: "Deliver to client",
    longCopy:
      "Docsora Transfer is the operational delivery layer for client-facing teams. Replace fragmented WeTransfer + email + Dropbox chains with one delivery workflow - tracked, encrypted and connected to approvals and signing.",
    useCases: [
      "Send client deliverables",
      "Route work for client approval",
      "Deliver signed contracts back",
      "Ship campaign final cuts",
    ],
    faq: [
      {
        question: "What is the best platform for client file delivery?",
        answer:
          "Client delivery platforms should combine real-time tracking and workflow integration. Docsora ships all three in a browser-native experience.",
      },
    ],
  },
  {
    slug: "browser-file-transfer",
    title: "Browser-Native File Transfer - No Installs | Docsora",
    metaDescription:
      "Browser-native file transfer with no installs, no sync clients and no desktop software. Pure-browser delivery for large operational files.",
    h1: "Browser-Native File Transfer",
    intro:
      "100% browser-native delivery - no installs, no sync clients, no desktop software. Move large files from any device, any OS.",
    keyword: "browser file transfer",
    cardIcon: Globe2,
    cardLabel: "Browser File Transfer",
    cardDescription: "Pure browser delivery - no installs, no plugins, no sync clients.",
    uploadHeadline: "Transfer files entirely in the browser",
    uploadSubheadline: "No installs. No sync clients. macOS, Windows, Linux, iOS, Android.",
    ctaLabel: "Start browser transfer",
    longCopy:
      "Docsora Transfer runs entirely in the browser. There are no desktop apps to install, no sync clients to maintain and no plugins to manage - the entire delivery experience is web-native and cross-platform by default.",
    useCases: [
      "Cross-platform team handoffs",
      "Quick transfers from kiosks",
      "Mobile-only delivery",
      "Locked-down enterprise devices",
    ],
    faq: [
      {
        question: "Do I need to install anything to use Docsora Transfer?",
        answer:
          "No. Docsora Transfer is 100% browser-native. Open the page, drop your files, and a delivery link is generated immediately.",
      },
    ],
  },
  {
    slug: "email-large-files",
    title: "Email Large Files - Bypass Inbox Size Limits | Docsora",
    metaDescription:
      "Email files larger than 25MB without attachment limits. Send a tracked delivery link directly from Docsora - no compression, no fragmented uploads.",
    h1: "Email Large Files Without Limits",
    intro:
      "Bypass Gmail, Outlook and corporate inbox attachment limits with a tracked Docsora delivery link sent directly to recipients.",
    keyword: "email large files",
    cardIcon: Mail,
    cardLabel: "Email Large Files",
    cardDescription:
      "Send oversized files via a tracked delivery link - bypass every inbox limit.",
    uploadHeadline: "Email large files past inbox limits",
    uploadSubheadline: "Send a tracked Docsora link - no 25MB ceiling, no compression.",
    ctaLabel: "Email a large file",
    longCopy:
      "Docsora Transfer replaces the 25MB email attachment with a tracked delivery link - sent from Docsora directly to recipients with expiry windows and download tracking.",
    useCases: [
      "Send oversized PDF bundles",
      "Email large video files",
      "Ship presentation archives",
      "Move project bundles to clients",
    ],
    faq: [
      {
        question: "How do I email files larger than 25MB?",
        answer:
          "Don't attach them. Upload to Docsora Transfer, choose email delivery, and Docsora sends recipients a tracked download link - no inbox limits and no compression.",
      },
    ],
  },
  {
    slug: "encrypted-file-transfer",
    title: "Encrypted File Transfer - TLS-Secured Delivery | Docsora",
    metaDescription:
      "Encrypted file transfer with TLS sessions, at-rest encryption, password protection and expiring links. Built for compliance-aware operational teams.",
    h1: "Encrypted File Transfer",
    intro:
      "TLS-encrypted delivery sessions, at-rest encryption, password protection and expiring links - for teams that take operational security seriously.",
    keyword: "encrypted file transfer",
    cardIcon: Lock,
    cardLabel: "Encrypted Transfer",
    cardDescription: "TLS in transit, encryption at rest, password protection and expiry.",
    uploadHeadline: "Encrypted file transfer sessions",
    uploadSubheadline: "TLS in transit, encryption at rest, password protection and expiry.",
    ctaLabel: "Start encrypted transfer",
    longCopy:
      "Docsora Transfer is built with encryption-first defaults. Every delivery runs over TLS, files are encrypted at rest, and operators can require passwords, set download limits and expire links automatically.",
    useCases: [
      "Compliance-sensitive delivery",
      "Confidential M&A documents",
      "Regulated finance transfers",
      "Legal evidence handoffs",
    ],
    faq: [
      {
        question: "Is encrypted file transfer the same as end-to-end encryption?",
        answer:
          "Not exactly - Docsora encrypts files in transit (TLS) and at rest on storage, with password-protected access. True E2E encryption is on the roadmap for regulated workloads.",
      },
    ],
  },
  {
    slug: "send-files-online",
    title: "Send Files Online - Fast Browser-Native Delivery | Docsora",
    metaDescription:
      "Send files online instantly with secure delivery links and tracking. The modern way to move work between teams.",
    h1: "Send Files Online Instantly",
    intro:
      "Drop a file, get a secure delivery link, track every recipient action - file sharing built for the way modern teams actually ship work.",
    keyword: "send files online",
    cardIcon: Send,
    cardLabel: "Send Files Online",
    cardDescription: "Instant secure delivery links with real-time download tracking.",
    uploadHeadline: "Send files online - instantly",
    uploadSubheadline: "Browser-native delivery with real-time tracking.",
    ctaLabel: "Send files online",
    longCopy:
      "Docsora Transfer is the operational delivery layer for sending files online. Drop a file, generate a link in seconds, and track every open and download in real time - no installs and no sync clients required.",
    useCases: [
      "Quick cross-team transfers",
      "Send files to clients",
      "Move work between offices",
      "Send files from any device",
    ],
    faq: [
      {
        question: "What is the easiest way to send files online?",
        answer:
          "Browser-native transfer platforms like Docsora make it as simple as drag-and-drop. Drop your files, share the generated link, and recipients download without creating an account.",
      },
    ],
  },
  {
    slug: "large-file-sharing",
    title: "Large File Sharing for Modern Teams | Docsora",
    metaDescription:
      "Large file sharing built for operational teams - delivery tracking, encrypted sessions and workflow integration. Beyond WeTransfer.",
    h1: "Large File Sharing for Operational Teams",
    intro:
      "Share oversized work professionally - real-time tracking, encrypted sessions and workflow handoffs.",
    keyword: "large file sharing",
    cardIcon: Share2,
    cardLabel: "Large File Sharing",
    cardDescription: "Tracked, encrypted large file sharing for modern teams.",
    uploadHeadline: "Share large files like a pro",
    uploadSubheadline: "Tracking, encryption and workflow handoffs.",
    ctaLabel: "Share a large file",
    longCopy:
      "Docsora Transfer replaces the generic WeTransfer flow with operational file sharing - encrypted sessions, real-time tracking and direct workflow integration into signing and approvals.",
    useCases: [
      "Ship large client packages",
      "Distribute media to partners",
      "Move oversized exports",
      "Share investor decks",
    ],
    faq: [
      {
        question: "What's the best large file sharing service?",
        answer:
          "Large file sharing services should combine browser-native simplicity with operational features - tracking and encryption. Docsora was built specifically for this combination.",
      },
    ],
  },
  {
    slug: "transfer-large-files-online",
    title: "Transfer Large Files Online - Operational Delivery | Docsora",
    metaDescription:
      "Transfer large files online with delivery tracking and encrypted sessions. Built for agencies, production teams and operations.",
    h1: "Transfer Large Files Online",
    intro:
      "Browser-native large file transfer with tracking and workflow integration - built for the way modern teams actually deliver work.",
    keyword: "transfer large files online",
    cardIcon: Upload,
    cardLabel: "Transfer Large Files",
    cardDescription: "Operational large file delivery with tracking and workflow integration.",
    uploadHeadline: "Transfer large files online",
    uploadSubheadline: "Operational delivery with tracking and workflow integration.",
    ctaLabel: "Transfer a large file",
    longCopy:
      "Docsora Transfer is operational delivery infrastructure for large files. Every transfer is encrypted, trackable and connected to the rest of the Docsora operational stack - signing, approvals and document storage.",
    useCases: [
      "Client deliverables at scale",
      "Cross-office handoffs",
      "Production team transfers",
      "Operational release packages",
    ],
    faq: [
      {
        question: "What is the best way to transfer large files online?",
        answer:
          "Use a browser-native platform with operational features. Docsora Transfer combines drag-and-drop simplicity with tracking, encryption and direct workflow integration.",
      },
    ],
  },
  {
    slug: "creative-agency-file-sharing",
    title: "Creative Agency File Sharing - Send Large Files to Clients | Docsora",
    metaDescription:
      "File sharing for creative agencies. Send videos, design files and client deliverables with secure links, real-time tracking and download notifications.",
    h1: "File Sharing for Creative Agencies",
    intro:
      "Share videos, design files and client deliverables with secure links, real-time tracking and download notifications built for agency workflows.",
    keyword: "creative agency file sharing",
    cardIcon: Palette,
    cardLabel: "Creative Agencies",
    cardDescription:
      "Share videos, design files and client deliverables with tracking and download notifications.",
    uploadHeadline: "File sharing for creative agencies",
    uploadSubheadline: "Secure links, real-time tracking and download notifications for client work.",
    ctaLabel: "Send agency files",
    longCopy:
      "Docsora Transfer is the file sharing layer for creative agencies. Move videos, PSDs, AIs, INDDs, Figma exports and full campaign packages with secure delivery links, real-time tracking and download notifications - without sync clients or fragmented cloud drives.",
    useCases: [
      "Send campaign assets to clients",
      "Share video cuts for review",
      "Deliver design system handoffs",
      "Move full creative project bundles",
    ],
    faq: [
      {
        question: "What is the best file sharing platform for creative agencies?",
        answer:
          "Agencies need secure delivery links, real-time tracking and download notifications. Docsora Transfer ships all three with browser-native upload and direct workflow integration into approvals and signing.",
      },
    ],
  },
  {
    slug: "video-production-file-sharing",
    title: "Video File Transfer - Send Large Video Files Online | Docsora",
    metaDescription:
      "Video file transfer for production teams. Send large video files, RAW footage and production assets online without compression and with delivery tracking.",
    h1: "Video File Transfer for Production Teams",
    intro:
      "Transfer large video files, RAW footage and production assets online - without compression, without sync clients, with delivery tracking baked in.",
    keyword: "video file transfer",
    cardIcon: Film,
    cardLabel: "Video Production",
    cardDescription:
      "Transfer large video files, RAW footage and production assets without compression.",
    uploadHeadline: "Video file transfer for production teams",
    uploadSubheadline: "RAW, ProRes, BRAW, R3D - moved at source quality with tracked delivery.",
    ctaLabel: "Send video files",
    longCopy:
      "Docsora Transfer is built for video production teams that move large files daily. Send RAW footage, ProRes, BRAW and master exports byte-for-byte, with secure delivery links and real-time download tracking - no transcoding, no quality loss.",
    useCases: [
      "Deliver master video edits",
      "Move RAW footage between editors",
      "Send 4K/8K final exports",
      "Transfer documentary archives",
    ],
    faq: [
      {
        question: "How do I transfer large video files online?",
        answer:
          "Upload the video to Docsora Transfer and share the generated delivery link. RAW, ProRes and BRAW files are preserved byte-for-byte with real-time tracking and expiry controls.",
      },
    ],
  },
  {
    slug: "architecture-engineering-file-sharing",
    title: "CAD File Transfer - Send DWG, DXF, STEP & Revit Files | Docsora",
    metaDescription:
      "CAD file transfer for architecture and engineering teams. Send DWG, DXF, STEP, IGES, Revit and BIM models securely with tracking and expiry controls.",
    h1: "CAD File Transfer for Architecture & Engineering",
    intro:
      "Send CAD drawings, BIM models and technical documentation securely between architecture, engineering and manufacturing teams.",
    keyword: "cad file transfer",
    cardIcon: Building2,
    cardLabel: "Architecture & Engineering",
    cardDescription:
      "Send CAD drawings, BIM models and technical documentation securely.",
    uploadHeadline: "CAD file transfer for engineering teams",
    uploadSubheadline: "DWG, DXF, STEP, IGES, Revit - secure tracked delivery for technical files.",
    ctaLabel: "Send CAD files",
    longCopy:
      "Docsora Transfer is built for architecture, engineering and manufacturing teams that move CAD drawings, BIM models and technical documentation daily. Send DWG, DXF, STEP, IGES and Revit files with secure delivery links, real-time tracking and expiry controls.",
    useCases: [
      "Ship CAD packages to clients",
      "Move Revit models between offices",
      "Send STEP and IGES files to suppliers",
      "Deliver technical documentation bundles",
    ],
    faq: [
      {
        question: "How do I send large CAD files securely?",
        answer:
          "Upload DWG, DXF, STEP, IGES or Revit files to Docsora Transfer and share the secure delivery link. Files are preserved byte-for-byte with tracked downloads, password protection and expiry controls.",
      },
    ],
  },
  {
    slug: "legal-file-sharing",
    title: "Legal File Sharing - Send Contracts & Case Files Securely | Docsora",
    metaDescription:
      "Legal file sharing for law firms and in-house counsel. Send contracts, case files and sensitive legal documents securely with tracking and expiry controls.",
    h1: "Secure File Sharing for Legal Teams",
    intro:
      "Share contracts, case files and sensitive legal documents with confidence - encrypted delivery, password protection and full audit visibility.",
    keyword: "legal file sharing",
    cardIcon: ShieldCheck,
    cardLabel: "Legal Teams",
    cardDescription:
      "Share contracts, case files and sensitive legal documents with confidence.",
    uploadHeadline: "Secure file sharing for legal teams",
    uploadSubheadline: "Encrypted delivery, password protection and audit-ready download tracking.",
    ctaLabel: "Send legal files",
    longCopy:
      "Docsora Transfer is the secure file sharing layer for law firms, in-house counsel and compliance teams. Send contracts, case files, evidence bundles and confidential legal documents with TLS-encrypted sessions, password protection, expiry controls and auditable access logs.",
    useCases: [
      "Send contracts and NDAs",
      "Share case files with co-counsel",
      "Deliver evidence bundles securely",
      "Move sensitive legal documentation",
    ],
    faq: [
      {
        question: "What is the most secure way to share legal documents?",
        answer:
          "Use an encrypted file transfer platform with password protection, expiry controls and audit logs. Docsora Transfer encrypts every delivery in transit and at rest, with full access tracking on every file.",
      },
    ],
  },
  {
    slug: "consulting-file-sharing",
    title: "Consulting File Sharing - Send Proposals & Board Packs | Docsora",
    metaDescription:
      "Consulting file sharing for advisory firms. Deliver proposals, board packs, reports and client documentation securely with tracking and expiry controls.",
    h1: "File Sharing for Consulting Teams",
    intro:
      "Deliver proposals, board packs, reports and client documentation securely - with download tracking, expiry controls and workflow-native handoffs.",
    keyword: "consulting file sharing",
    cardIcon: Briefcase,
    cardLabel: "Consulting Teams",
    cardDescription:
      "Deliver proposals, board packs, reports and client documentation securely.",
    uploadHeadline: "File sharing for consulting teams",
    uploadSubheadline: "Tracked delivery for proposals, board packs and client documentation.",
    ctaLabel: "Send consulting files",
    longCopy:
      "Docsora Transfer is the file sharing layer for consulting firms, advisory teams and strategy practices. Deliver proposals, board packs, financial models and client reports with secure delivery links, real-time tracking and direct integration into approvals and signing.",
    useCases: [
      "Send proposals to prospective clients",
      "Deliver board packs to executives",
      "Share financial models and reports",
      "Move engagement documentation",
    ],
    faq: [
      {
        question: "What is the best file sharing platform for consultants?",
        answer:
          "Consultants need secure delivery links with tracking and expiry. Docsora Transfer combines drag-and-drop simplicity with audit-ready download tracking and direct workflow integration into approvals and signing.",
      },
    ],
  },
  {
    slug: "freelancer-file-transfer",
    title: "Freelancer File Transfer - Send Client Files Online | Docsora",
    metaDescription:
      "File transfer for freelancers. Send project files, creative assets and client deliverables professionally with secure links and download tracking.",
    h1: "File Transfer for Freelancers",
    intro:
      "Send project files, creative assets and client deliverables professionally - with secure links, download tracking and expiry controls.",
    keyword: "freelancer file transfer",
    cardIcon: Send,
    cardLabel: "Freelancers",
    cardDescription:
      "Send project files, creative assets and client deliverables professionally.",
    uploadHeadline: "File transfer for freelancers",
    uploadSubheadline: "Secure delivery links and download tracking for client deliverables.",
    ctaLabel: "Send client files",
    longCopy:
      "Docsora Transfer is the file transfer layer for freelancers - designers, editors, developers, writers and consultants. Send project files, creative assets and client deliverables with secure links, real-time download tracking and expiry controls that make every handoff feel professional.",
    useCases: [
      "Deliver finished work to clients",
      "Send revisions and previews",
      "Share source files and exports",
      "Move project archives at wrap",
    ],
    faq: [
      {
        question: "What is the best file transfer platform for freelancers?",
        answer:
          "Freelancers need fast, secure delivery with tracking - without paying for enterprise software. Docsora Transfer combines browser-native upload with real-time download tracking and expiry controls.",
      },
    ],
  },
  {
    slug: "secure-file-transfer",
    title: "Secure File Transfer – Encrypted & Tracked | Docsora",
    metaDescription: "Secure file transfer with encryption, password protection, expiring links and download tracking. ISO 27001, SOC 2 Type I and GDPR compliant.",
    h1: "Secure file transfer",
    intro: "Encrypted, password-protected and tracked — so sensitive files reach the right person and no one else.",
    keyword: "secure file transfer",
    cardIcon: ShieldCheck,
    cardLabel: "Secure File Transfer",
    cardDescription: "Encrypted, password-protected and tracked file transfers for sensitive work.",
    uploadHeadline: "Send files securely",
    uploadSubheadline: "Encryption, password protection and expiry on every transfer.",
    ctaLabel: "Choose files to send securely",
    longCopy: "Docsora Transfer protects sensitive files with encryption in transit and at rest, optional password protection, expiring links and full download tracking — so files reach the right person and no one else.",
    featureCardsH2: "Everything you need for secure file transfer",
    useCases: [
      "Send contracts and case files securely",
      "Transfer financial and HR documents",
      "Share regulated material with audit controls",
    ],
    faq: [
      { question: "Is it safe to send files online?", answer: "It can be, with the right controls. Docsora encrypts files in transit and at rest, lets you add a password and an expiry to any transfer, and records who opened and downloaded each one — so a file reaches the intended person and leaves an access trail." },
      { question: "What is the most secure way to send a document?", answer: "Send it as a password-protected, expiring link rather than an email attachment. The recipient downloads it directly, the password keeps a forwarded link from being opened, and the expiry means it can't be accessed indefinitely." },
      { question: "Can I password-protect a transfer?", answer: "Yes. You can add a password to any transfer, so only someone with both the link and the password can open the file — useful when a link might be forwarded or seen by others." },
      { question: "What happens when a secure link expires?", answer: "Once a transfer reaches its expiry date the link stops working and the file can no longer be downloaded. You set the expiry when you send, and you can extend it or reactivate the transfer later without re-uploading." },
      { question: "Is Docsora compliant for handling sensitive files?", answer: "Docsora is ISO 27001 certified, GDPR compliant and SOC 2 Type I, with a SOC 2 Type II audit currently in progress — the standards legal, finance and HR teams typically require." },
      { question: "Can I see who accessed a file I sent?", answer: "Yes. Docsora shows when each transfer is opened and downloaded, with timestamps, giving you a clear record of who accessed a file and when." },
    ],
    featureCards: [
      { icon: "Lock", title: "Encrypted in transit and at rest", description: "Files are protected on the way to Docsora and while they're stored — not just during upload." },
      { icon: "KeyRound", title: "Password-protect any transfer", description: "Add a password so only the person you intend can open the file, even if the link is forwarded." },
      { icon: "Clock", title: "Links that expire on your terms", description: "Set an expiry so a transfer can't be opened forever — and extend or reactivate it when you choose." },
      { icon: "Eye", title: "An audit trail of access", description: "See who opened and downloaded each transfer, with timestamps — a record of exactly where a file went." },
      { icon: "FileCheck", title: "Compliance behind it", description: "ISO 27001 certified, GDPR compliant and SOC 2 Type I, with a SOC 2 Type II audit in progress." },
      { icon: "ShieldCheck", title: "Your files train no AI", description: "Your content stays yours — never used, sold, or used to train AI models." },
    ],
    sections: [
      {
        kind: "richText",
        h2: "Email and shared drives are the weak link",
        paragraphs: [
          "Most sensitive files leak through the tools people reach for by default. Email attachments get forwarded, sit in inboxes indefinitely, and leave no record of who opened them. Consumer cloud-drive links are worse: they often stay live forever, get shared beyond the intended person, and accumulate access no one ever revokes.",
          "Secure file transfer closes those gaps. A Docsora link can be password-protected, set to expire, and tracked — so a sensitive file reaches one person, can't be opened indefinitely, and leaves a clear record of access.",
        ],
      },
      {
        kind: "checklist",
        h2: "What makes a file transfer actually secure",
        items: [
          { h3: "Protection in transit and at rest", body: "The file should be encrypted both while it moves and while it's stored — not only during upload." },
          { h3: "Access control", body: "A password and an expiry date so a forwarded link doesn't become an open door." },
          { h3: "An audit trail", body: "A record of who opened and downloaded the file, so access is provable, not assumed." },
          { h3: "Real compliance", body: "Independent attestation — ISO 27001, SOC 2, GDPR — not just the word 'secure' on a page." },
        ],
      },
      {
        kind: "useCases",
        h2: "Who relies on secure transfer",
        items: [
          { h3: "Legal teams", body: "Send contracts and case files with a password, an expiry and a record of who accessed them." },
          { h3: "Finance and HR", body: "Move payroll, financial statements and personal data without leaving copies in inboxes." },
          { h3: "Any regulated business", body: "Share sensitive material with the access controls and audit trail compliance expects." },
        ],
      },
    ],
    related: {
      h2: "Related ways to send files",
      links: [
        { label: "Encrypted file transfer", href: "/encrypted-file-transfer" },
        { label: "Legal file sharing", href: "/legal-file-sharing" },
        { label: "Large file transfer", href: "/large-file-transfer" },
        { label: "Send large files", href: "/send-large-files" },
      ],
    },
    finalCta: {
      headline: "Send sensitive files with confidence.",
      body: "Encrypted, password-protected and tracked — every transfer.",
      buttonLabel: "Start a transfer",
    },
  },
];

export const transferVariantBySlug: Record<string, TransferVariantConfig> =
  Object.fromEntries(transferVariants.map((v) => [v.slug, v]));