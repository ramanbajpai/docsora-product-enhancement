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
  | "ShieldCheck" | "Globe2" | "Globe" | "Briefcase" | "Palette" | "MonitorSmartphone"
  | "Workflow" | "History" | "Infinity" | "Archive" | "FileText" | "FileVideo"
  | "Presentation" | "Music" | "Box" | "Code" | "Send" | "Share2"
  | "Film" | "Building2" | "FileSpreadsheet" | "Sparkles" | "Check"
  | "Clock" | "KeyRound" | "FileCheck" | "HardDrive" | "FolderArchive";

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
  intro?: string;
  keyword?: string;
  cardIcon?: LucideIcon;
  cardLabel?: string;
  cardDescription?: string;
  uploadHeadline: string;
  uploadSubheadline: string;
  ctaLabel: string;
  longCopy?: string;
  useCases?: string[];
  faq: TransferVariantFAQ[] | { h2: string; items: TransferVariantFAQ[] };

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
      h2: "Every file type, sent at original quality",
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
        { label: "Large file transfer", href: "/large-file-transfer" },
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
      h2: "Transfer any file format at original quality",
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
        { label: "Large file transfer", href: "/large-file-transfer" },
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
      { question: "Is encrypted file transfer the same as secure file transfer?", answer: "They overlap but aren't identical. Encryption is one part of secure transfer — it protects the file itself. Secure file transfer is the full picture: encryption plus password protection, expiring links, and a record of who accessed the file." },
      { question: "How do I send confidential documents safely instead of by email?", answer: "Send a password-protected, expiring link rather than an email attachment. The document is encrypted in transit and at rest, only someone with the password can open it, and you get a record of when it was downloaded — none of which email attachments offer." },
      { question: "Can I stop someone from accessing a file after I've sent it?", answer: "Yes. You can set a transfer to expire, and once it does the link stops working and the file can no longer be downloaded. You stay in control of how long a sensitive file remains accessible." },
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
    fileTypes: {
      h2: "Send any file type securely",
    },
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


  {
    slug: "wetransfer-alternative",
    title: "The Best WeTransfer Alternative (2026) | Docsora",
    metaDescription: "Looking for a WeTransfer alternative? Docsora sends up to 500GB with no monthly caps, expiry you control and tracking on every transfer — files never used to train AI.",
    h1: "A WeTransfer alternative built for people who send a lot",
    intro: "Up to 500GB, no monthly transfer caps, expiry you control — and files never used to train AI.",
    keyword: "wetransfer alternative",
    cardIcon: Zap,
    cardLabel: "WeTransfer Alternative",
    cardDescription: "More tracking, longer expiry — and files never used to train AI.",
    longCopy: "Docsora is the WeTransfer alternative built for people who send a lot. No 3GB monthly cap, no 3-day expiry, no account — just up to 500GB per transfer with tracking on every send and a clear stance that your files are never used to train AI.",
    useCases: [
      "Send large files without a monthly quota",
      "Control link expiry instead of losing it after 3 days",
      "Track every open and download without paying extra",
      "Switch from WeTransfer without asking recipients to sign up",
    ],
    uploadHeadline: "Send your first transfer",
    uploadSubheadline: "No 3GB monthly cap, no 3-day expiry, no account.",
    ctaLabel: "Choose files to send",
    seoBadgeLabel: "WETRANSFER ALTERNATIVE",
    featureCards: [
      { icon: "Infinity", title: "No monthly transfer cap", description: "WeTransfer's free plan stops you at 3GB or 10 transfers a month. Docsora has no monthly quota — send as often as you need." },
      { icon: "Clock", title: "Expiry you control", description: "WeTransfer free links expire after 3 days. With Docsora you set the expiry, extend it, or reactivate an expired transfer without re-uploading." },
      { icon: "Eye", title: "Tracking on every transfer", description: "See opens and downloads with timestamps — included on every transfer, not reserved for a paid tier." },
      { icon: "ShieldCheck", title: "Your files train no AI", description: "Your content stays yours — never used, sold, or used to train AI models." },
      { icon: "Lock", title: "Encrypted and compliant", description: "Encrypted in transit (TLS) and at rest, backed by ISO 27001, SOC 2 Type I and GDPR." },
      { icon: "Users", title: "No account for anyone", description: "Send and receive without signing up — for you or your recipient." }
    ],
    sections: [
      {
        kind: "richText",
        h2: "Why people look for a WeTransfer alternative",
        paragraphs: [
          "After the 2024 Bending Spoons acquisition, WeTransfer's free plan tightened sharply: a combined 3GB per month across just 10 transfers, with links expiring after 3 days instead of 7. For anyone sending regularly, one or two sends can use up the month.",
          "Then in 2025 a Terms of Service change added wording that let WeTransfer use uploaded files to train machine-learning models. The backlash was immediate and the clause was reversed within two weeks — but for a lot of people the trust didn't come back. Docsora is built the other way: no monthly cap, expiry you control, and a firm line that your files are never used to train AI."
        ]
      },
      {
        kind: "checklist",
        h2: "What you get with Docsora that WeTransfer free doesn't",
        items: [
          { h3: "Far bigger transfers", body: "Up to 500GB per transfer, against WeTransfer free's 3GB combined monthly limit." },
          { h3: "No monthly quota", body: "Send as often as you need — there's no 10-transfer ceiling." },
          { h3: "Tracking included", body: "Know when each file is opened and downloaded, without upgrading to unlock it." },
          { h3: "A clear AI stance", body: "Your files are never used to train AI models — stated plainly, not buried." }
        ]
      },
      {
        kind: "comparisonTable",
        h2: "Docsora vs WeTransfer free",
        columns: ["Feature", "WeTransfer (free)", "Docsora"],
        rows: [
          { feature: "Transfer size", values: ["3GB combined per month", "Up to 500GB"] },
          { feature: "Monthly limit", values: ["10 transfers / 3GB total", "No monthly cap"] },
          { feature: "Link expiry", values: ["3 days", "Set, extend, reactivate"] },
          { feature: "Download tracking", values: ["Paid plans only", "Every transfer"] },
          { feature: "Account required", values: ["No", "No"] },
          { feature: "Files used to train AI", values: ["ToS reversed after 2025 backlash", "Never"] },
          { feature: "Compliance", values: ["Not publicly detailed", "ISO 27001 · SOC 2 Type I · GDPR"] }
        ]
      }
    ],
    related: {
      h2: "Related ways to send files",
      links: [
        { label: "Send large files", href: "/send-large-files" },
        { label: "Large file transfer", href: "/large-file-transfer" },
        { label: "Secure file transfer", href: "/secure-file-transfer" },
        { label: "Send large videos", href: "/send-large-videos" }
      ]
    },
    faq: [
      { question: "What is the best WeTransfer alternative?", answer: "It depends what you send, but Docsora covers the gaps people most often leave WeTransfer over: up to 500GB per transfer, no monthly quota, expiry you control, download tracking on every transfer, and files that are never used to train AI." },
      { question: "Is WeTransfer still free?", answer: "Yes, but the free plan is now capped at 3GB combined across 10 transfers per 30 days, with links expiring after 3 days. Once you hit either limit you're blocked until older transfers age out of the 30-day window." },
      { question: "Why did WeTransfer change its free plan?", answer: "Following the 2024 Bending Spoons acquisition, the free tier was restructured — monthly quotas were introduced and link availability dropped from 7 days to 3. Docsora has no monthly quota and lets you control expiry instead." },
      { question: "Does WeTransfer train AI on my files?", answer: "A 2025 Terms of Service change added language permitting it, which WeTransfer reversed within two weeks after backlash. Docsora's position is unambiguous: your files are never used to train AI models." },
      { question: "Can I switch from WeTransfer without making my recipients sign up?", answer: "Yes. Like WeTransfer, your recipient just opens a link and downloads — no account or app on either side. You don't need to sign up to send, either." },
      { question: "Do I get download tracking like WeTransfer's paid plans?", answer: "Yes, and without paying to unlock it. Docsora shows when each transfer is opened and downloaded, with timestamps, on every transfer." }
    ],
    finalCta: {
      headline: "Make the switch from WeTransfer.",
      body: "No monthly caps, expiry you control, and files that stay yours.",
      buttonLabel: "Start a transfer"
    }
  },
  {
    slug: "send-large-videos",
    title: "Send Large Video Files Online – No Compression | Docsora",
    metaDescription:
      "Send large video files at full resolution — RAW, ProRes, BRAW and 4K. Up to 500GB with tracked delivery and zero compression.",
    h1: "Send large video files",
    intro: "Full resolution. No compression. Up to 500GB per transfer.",
    keyword: "send large videos",
    cardIcon: FileVideo,
    cardLabel: "Send Large Videos",
    cardDescription: "RAW, ProRes and 4K delivered at full resolution.",
    uploadHeadline: "Send large video files",
    uploadSubheadline: "RAW, ProRes, 4K and 8K — delivered at source quality.",
    ctaLabel: "Choose video files to send",
    longCopy:
      "Docsora moves the original video file untouched — ProRes, BRAW, R3D, RAW and 4K/8K masters arrive at source quality, never recompressed, with tracked delivery and encrypted sessions.",
    seoBadgeLabel: "Send Large Videos",
    featureCardsH2: "Everything you need to send large video files",
    useCases: [
      "Deliver master video edits to clients",
      "Move RAW footage between editors",
      "Send 4K/8K final exports",
      "Ship trailer cuts to agencies",
    ],
    featureCards: [
      { icon: "Film", title: "No re-encoding, ever", description: "Your video arrives exactly as it left — ProRes, BRAW, R3D and RAW delivered at source quality, never recompressed." },
      { icon: "HardDrive", title: "Up to 500GB per transfer", description: "Send a full shoot, a master file or a folder of footage as one transfer — no splitting across uploads." },
      { icon: "Eye", title: "Know when it's downloaded", description: "See when your editor or client opens and downloads the file, with timestamps — no more 'did you get it?'." },
      { icon: "Mail", title: "Link or email delivery", description: "Share a secure link anywhere, or send the video straight to a recipient's inbox from Docsora." },
      { icon: "Lock", title: "Encrypted and protected", description: "Encrypted in transit (TLS) and at rest, with optional password protection on any transfer." },
      { icon: "Users", title: "No sign up for anyone", description: "Neither you nor your recipient needs an account or software to send or download." },
    ],
    sections: [
      {
        kind: "richText",
        h2: "Why your video won't send (and arrives ruined when it does)",
        paragraphs: [
          "Email bounces video almost immediately, and the apps that do accept it — messaging tools, social uploads, consumer cloud drives — quietly recompress your footage to save their own bandwidth. A 4K master that left your machine pristine arrives soft, blocky and a fraction of the bitrate.",
          "Docsora moves the original file untouched. Upload the export, send a secure link, and your recipient downloads the exact file you uploaded — no transcode, no bitrate cap, no quality loss.",
        ],
      },
      {
        kind: "richText",
        h2: "Built for the file sizes video actually produces",
        paragraphs: [
          "Professional video is big by nature: ProRes 422 HQ runs hundreds of megabits per second, BRAW and R3D camera files fill cards by the hour, and a few minutes of 8K can outweigh an entire photo shoot. These are the files that break every consumer tool.",
          "With a 500GB ceiling per transfer, a full day of footage or a finished master moves as a single link — no zipping into parts, no splitting across multiple sends.",
        ],
      },
      {
        kind: "useCases",
        h2: "Who sends large video with Docsora",
        items: [
          { h3: "Videographers delivering to clients", body: "Send the finished cut or the full-resolution master as one link, and see the moment the client downloads it." },
          { h3: "Editors and post houses", body: "Move RAW footage and project files between set, edit and grade without shipping drives or re-encoding." },
          { h3: "Creators sending to collaborators", body: "Get source-quality footage to your editor or motion designer without YouTube-grade compression in between." },
          { h3: "Anyone with phone footage", body: "Send long 4K clips straight from your phone's browser — no app, no AirDrop range limit, no quality drop." },
        ],
      },
      {
        kind: "comparisonTable",
        h2: "Docsora vs the usual ways to send video",
        columns: ["Feature", "Messaging apps", "Email", "Docsora"],
        rows: [
          { feature: "Max size", values: ["Small", "~20–25MB", "Up to 500GB"] },
          { feature: "Keeps original quality", values: ["No — recompressed", "n/a — won't send", "Yes — untouched"] },
          { feature: "Download tracking", values: ["No", "No", "Yes — opens & downloads"] },
          { feature: "Recipient needs an app/account", values: ["Yes", "No", "No"] },
        ],
      },
    ],
    fileTypes: {
      h2: "Every video format, delivered untouched",
      intro:
        "Docsora sends every common and professional video format at source quality — plus the project and audio files that travel with them.",
      blurbs: {
        "Video": "Send MP4, MOV, AVI, MKV, ProRes, BRAW and R3D at source quality, with no re-encoding.",
        "Audio": "Send synced audio, stems and masters alongside your footage, uncompressed.",
        "Archives & Packages": "Send entire project folders — footage, audio and assets — as one transfer.",
      },
    },
    related: {
      h2: "Related ways to send files",
      links: [
        { label: "Large media transfer", href: "/large-media-transfer" },
        { label: "Send large files", href: "/send-large-files" },
        { label: "Secure file transfer", href: "/secure-file-transfer" },
        { label: "Large file transfer", href: "/large-file-transfer" },
      ],
    },
    faq: [
      { question: "How do I send a large video file without losing quality?", answer: "Upload the video to Docsora and send a secure link instead of attaching or uploading it through an app that recompresses. Your recipient downloads the exact original file — same resolution, same bitrate, no re-encoding." },
      { question: "What is the largest video file I can send?", answer: "Up to 500GB in a single transfer, which covers full-resolution masters, RAW camera files and entire folders of footage — no need to split or compress." },
      { question: "Can I send 4K or 8K video?", answer: "Yes. Docsora delivers the original file untouched, so 4K and 8K footage arrives at full resolution and bitrate, not a downscaled or recompressed copy." },
      { question: "Does Docsora compress my video?", answer: "No. Docsora never transcodes or recompresses your file. What you upload is exactly what your recipient downloads." },
      { question: "Can I send a large video from my phone?", answer: "Yes. Upload straight from your phone's browser and share a link in seconds — no app to install, on iOS or Android. The recipient can download on any device." },
      { question: "Can my client download the video without an account?", answer: "Yes. Recipients open the link and download the original file with no account, sign-up or software. You still see when they've downloaded it." },
    ],
    finalCta: {
      headline: "Send your next video at full quality.",
      body: "Tracked, encrypted delivery for footage, masters and exports — no compression.",
      buttonLabel: "Start a transfer",
    },
  },
  {
    slug: "send-large-files-online",
    title: "Send Large Files Online – No App, Any Browser | Docsora",
    metaDescription:
      "Send large files online straight from your browser — no app, no install, any device. Up to 500GB with a secure tracked link.",
    h1: "Send large files online",
    intro:
      "Straight from your browser — no app, no install, any device. Up to 500GB.",
    keyword: "send large files online",
    cardIcon: Globe2,
    cardLabel: "Send Files Online",
    cardDescription:
      "No app, no install — send from any browser on any device.",
    uploadHeadline: "Send large files online",
    uploadSubheadline: "No download, no account — just open your browser and send.",
    ctaLabel: "Choose files to send",
    longCopy:
      "Docsora runs entirely in your browser, so there's nothing to download, install or update. Open the page on any device — laptop, phone, tablet, work computer — drag in your files, and share a secure tracked link in seconds. Your recipient downloads in their browser too, with no app or account needed.",
    useCases: [
      "Send from a locked-down work computer with no install rights",
      "Upload from a phone or tablet without an app store download",
      "Borrow a machine, send a file, leave nothing behind",
    ],
    faq: [
      {
        question: "How do I send large files online without an app?",
        answer:
          "Open Docsora in any browser, drag in your files, and share the secure link that's generated. There's nothing to download or install — it runs entirely in the browser on any device.",
      },
      {
        question: "How large a file can I send online?",
        answer:
          "Up to 500GB in a single transfer, straight from the browser — no desktop app needed to handle big files. There's no splitting or compression; your recipient downloads the original.",
      },
      {
        question: "Can I send large files online from a phone or tablet?",
        answer:
          "Yes. Open the page in your phone or tablet's browser, upload your files, and share the link — no app store download, on iOS or Android.",
      },
      {
        question: "What happens to my file after I send it online?",
        answer:
          "You get a secure link to share, and you can set how long it stays live, extend it, or reactivate it later — all from the browser. You also see when it's opened and downloaded.",
      },
      {
        question: "Is it safe to send files online through a browser?",
        answer:
          "Yes. Transfers are encrypted in transit (TLS) and at rest, and you can add a password and an expiry to any link. Docsora is ISO 27001 certified, GDPR compliant and SOC 2 Type I, with a SOC 2 Type II audit in progress.",
      },
      {
        question: "Does my recipient need to install anything to download?",
        answer:
          "No. They open the link and download in their browser — no app, no account, on whatever device they're using.",
      },
    ],
    seoBadgeLabel: "Send Files Online",
    featureCardsH2: "Everything you need to send large files online",
    featureCardsIntro:
      "No app, no install, no account — just your browser and a secure link.",
    featureCards: [
      { icon: "Globe", title: "Runs in your browser", description: "Send large files from any browser — Chrome, Safari, Edge, Firefox. Nothing to download or install." },
      { icon: "MonitorSmartphone", title: "Works on any device", description: "Start a transfer on a laptop, phone or tablet — Windows, Mac, iOS or Android, all the same way." },
      { icon: "Zap", title: "Open and send in seconds", description: "No setup, no sync client, no account step — open the page, drag in your files, share the link." },
      { icon: "Eye", title: "Track the link you send", description: "See when your file is opened and downloaded, with timestamps, from any device." },
      { icon: "Lock", title: "Secure by default", description: "Encrypted in transit (TLS) and at rest, with optional password protection on any transfer." },
      { icon: "Users", title: "Nothing for recipients either", description: "They download in the browser too — no app, no account, on whatever device they're on." },
    ],
    sections: [
      {
        kind: "richText",
        h2: "No app, no install, no account",
        paragraphs: [
          "Most ways to move a big file want you to install something first — a desktop client, a sync app, a company-approved tool you don't have. Docsora runs entirely in the browser, so there's nothing to download and nothing to set up before you can send.",
          "Open the page, drag in your files, and share the link. It works the same whether you're on your own machine, a borrowed laptop, or a locked-down work computer where you can't install software.",
        ],
      },
      {
        kind: "checklist",
        h2: "Why people send files online instead of with an app",
        items: [
          { h3: "Nothing to install", body: "No desktop client or sync app — useful on work machines where you can't install software." },
          { h3: "Any device, any OS", body: "Windows, Mac, Linux, iOS, Android — if it has a browser, it works." },
          { h3: "No account barrier", body: "You don't sign up and neither does your recipient — no login wall between you and sending." },
          { h3: "Always the latest version", body: "Nothing to update — the browser always loads the current version." },
        ],
      },
      {
        kind: "useCases",
        h2: "Sending online, wherever you are",
        items: [
          { h3: "On a locked-down work computer", body: "Send a large file without admin rights or an IT ticket to install an app — it all runs in the browser." },
          { h3: "From a phone or tablet", body: "Upload from your device's browser and share a link, with no app store download." },
          { h3: "On someone else's machine", body: "Borrowed laptop or a client's computer — open the page and send, leaving nothing installed behind." },
        ],
      },
    ],
    fileTypes: {
      h2: "Every file type, straight from your browser",
    },
    related: {
      h2: "Related ways to send files",
      links: [
        { label: "Send large files", href: "/send-large-files" },
        { label: "Large file transfer", href: "/large-file-transfer" },
        { label: "Secure file transfer", href: "/secure-file-transfer" },
        { label: "Email large files", href: "/email-large-files" },
      ],
    },
    finalCta: {
      headline: "Send large files online in seconds.",
      body: "No app, no install, no account — just your browser.",
      buttonLabel: "Start a transfer",
    },
  },
  {
    slug: "large-media-transfer",
    title: "Large Media Transfer \u2013 Video, Photo & Audio | Docsora",
    metaDescription:
      "Transfer large media files \u2014 video, RAW photos, audio and design assets \u2014 together in one transfer. Up to 500GB, full quality, tracked delivery.",
    h1: "Large media transfer",
    intro:
      "Move whole media projects \u2014 video, RAW photos, audio and design assets \u2014 in a single transfer of up to 500GB.",
    keyword: "large media transfer",
    cardIcon: Film,
    cardLabel: "Large Media Transfer",
    cardDescription: "Mixed video, RAW and design assets in one transfer.",
    uploadHeadline: "Transfer large media",
    uploadSubheadline: "Mixed video, photo, audio and design \u2014 all in one transfer.",
    ctaLabel: "Choose media to transfer",
    longCopy:
      "Docsora Transfer moves whole media projects \u2014 video, RAW photos, audio and design assets \u2014 in a single transfer of up to 500GB, with tracked delivery and encrypted sessions.",
    useCases: [
      "Deliver campaign assets to clients",
      "Move RAW photography sets",
      "Ship Adobe / Figma design packages",
      "Transfer audio and video masters",
    ],
    seoBadgeLabel: "LARGE MEDIA TRANSFER",
    featureCardsH2: "Everything you need to move large media",
    featureCards: [
      { icon: "Layers", title: "Mixed media in one transfer", description: "Video, RAW stills, audio and design files together in a single link \u2014 no separate sends per file type." },
      { icon: "HardDrive", title: "Up to 500GB at once", description: "Move an entire shoot, campaign or production package as one transfer \u2014 no splitting it across uploads." },
      { icon: "FolderArchive", title: "Whole folders, structure intact", description: "Send a full project folder so assets arrive organised, not as a loose pile of files." },
      { icon: "Eye", title: "Know when it lands", description: "See when the recipient opens and downloads the package, with timestamps." },
      { icon: "Lock", title: "Full quality, encrypted", description: "Every asset delivered at original quality, with no compression. Encrypted in transit (TLS) and at rest." },
      { icon: "Users", title: "No account for anyone", description: "You and your recipient send and receive without signing up or installing software." }
    ],
    sections: [
      {
        kind: "richText",
        h2: "When one delivery is many kinds of file at once",
        paragraphs: [
          "Creative work rarely travels as a single file. A campaign delivery is video cuts, RAW stills, audio beds, fonts and layered design files \u2014 all needed together, all large. Sending them piecemeal across email, chat and drive links means missing assets, version confusion and compressed copies.",
          "Docsora moves the whole set as one transfer. Drag in the entire folder \u2014 every media type, at original quality \u2014 and share one link, so the recipient gets the complete package in the structure you sent it."
        ]
      },
      {
        kind: "checklist",
        h2: "What a media transfer needs to handle",
        items: [
          { h3: "Every media type together", body: "Video, photo, audio and design files in one transfer \u2014 not one tool per format." },
          { h3: "Original quality across all of it", body: "No compression on the video, no downscaling on the stills, no re-encoding on the audio." },
          { h3: "Folder structure preserved", body: "Assets arrive organised the way you sent them, not flattened into one list." },
          { h3: "Size to fit a whole project", body: "Up to 500GB, enough for a full shoot or campaign package as a single transfer." }
        ]
      },
      {
        kind: "useCases",
        h2: "Who moves large media with Docsora",
        items: [
          { h3: "Agencies delivering a campaign", body: "Send the full set \u2014 video, stills, audio and design files \u2014 to a client as one organised package." },
          { h3: "Production teams handing off a project", body: "Move an entire project folder between shoot, edit and post without splitting it by file type." },
          { h3: "Anyone packaging mixed assets", body: "Bundle everything a recipient needs into one transfer instead of chasing files across several tools." }
        ]
      }
    ],
    fileTypes: {
      h2: "Every media format, delivered at full quality",
    },
    related: {
      h2: "Related ways to send files",
      links: [
        { label: "Send large videos", href: "/send-large-videos" },
        { label: "Send large files", href: "/send-large-files" },
        { label: "Large file transfer", href: "/large-file-transfer" },
        { label: "Secure file transfer", href: "/secure-file-transfer" }
      ]
    },
    faq: {
      h2: "Frequently asked questions",
      items: [
        { question: "How do I transfer a mix of large media files at once?", answer: "Upload everything \u2014 video, photos, audio and design files \u2014 to Docsora as a single transfer or folder, and share one link. The recipient downloads the whole set at original quality, in the structure you sent it." },
        { question: "Can I send a whole project folder of mixed media?", answer: "Yes. Upload the entire folder and Docsora keeps its structure, so a recipient receives an organised package rather than a loose pile of files \u2014 up to 500GB in one transfer." },
        { question: "Will all the different file types keep their quality?", answer: "Yes. Docsora delivers every asset as the original file \u2014 no compression on video, no downscaling on stills, no re-encoding on audio. What you upload is what arrives." },
        { question: "How large can a media transfer be?", answer: "Up to 500GB in a single transfer, which is enough to move an entire shoot or campaign package \u2014 video, RAW stills, audio and design files together \u2014 without splitting it up." },
        { question: "Can I track when the recipient downloads the package?", answer: "Yes. Docsora shows when the transfer is opened and downloaded, with timestamps, so you know the full package has been received." },
        { question: "Do recipients need an account to download media files?", answer: "No. They open the link and download the package in the browser \u2014 no account, no app \u2014 on any device." }
      ]
    },
    finalCta: {
      headline: "Move your whole media project in one transfer.",
      body: "Video, photo, audio and design \u2014 full quality, one link.",
      buttonLabel: "Start a transfer"
    }
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
];

/* ─── Compliance lint: flag prohibited phrasing in variant copy ─── */
if (import.meta.env?.DEV ?? true) {
  const prohibited = /end-to-end encrypt(?!ion)/i;
  function scan(obj: unknown, path: string) {
    if (typeof obj === "string") {
      if (prohibited.test(obj)) {
        console.error(
          `[transferVariants compliance lint] Prohibited phrase "end-to-end encrypt" found at ${path}: "${obj}"`
        );
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item, i) => scan(item, `${path}[${i}]`));
    } else if (obj && typeof obj === "object") {
      Object.entries(obj).forEach(([k, v]) => scan(v, `${path}.${k}`));
    }
  }
  transferVariants.forEach((v, i) => scan(v, `transferVariants[${i}]`));
}

export const transferVariantBySlug: Record<string, TransferVariantConfig> =
  Object.fromEntries(transferVariants.map((v) => [v.slug, v]));