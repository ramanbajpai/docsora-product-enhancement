import type { LucideIcon } from "lucide-react";
import {
  Send,
  FileVideo,
  Briefcase,
  Globe2,
  ShieldCheck,
  Mail,
  Palette,
  Presentation,
  Building2,
  Lock,
} from "lucide-react";

export interface TransferGuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface TransferGuideFAQ {
  question: string;
  answer: string;
}

export interface TransferGuideRelatedTool {
  slug: string;
  label: string;
}

export interface TransferGuide {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  readTime: string;
  category: string;
  icon: LucideIcon;
  primaryToolSlug: string;
  primaryToolLabel: string;
  sections: TransferGuideSection[];
  faqs: TransferGuideFAQ[];
  relatedTools: TransferGuideRelatedTool[];
  relatedGuides: string[];
}

export const transferGuides: TransferGuide[] = [
  {
    slug: "best-way-to-send-large-files-online",
    title: "The Best Way to Send Large Files Online (2026) | Docsora",
    metaDescription:
      "The modern way to send large files online — browser-native delivery, tracked links, encrypted sessions and no inbox limits. Step-by-step guide.",
    h1: "The Best Way to Send Large Files Online",
    intro:
      "Email attachment limits, sync clients and fragmented cloud drives still slow down most teams. Here's the modern operational way to move large files.",
    readTime: "5 min read",
    category: "Transfer fundamentals",
    icon: Send,
    primaryToolSlug: "send-large-files",
    primaryToolLabel: "Send large files online",
    sections: [
      {
        heading: "Why email attachments break down",
        paragraphs: [
          "Most corporate inboxes cap attachments at 25MB. Anything larger — video edits, design exports, board packs — gets bounced, compressed or split across messages, none of which is professional.",
          "The modern alternative is a browser-native transfer link: upload once, share a URL, and let the platform handle delivery, tracking and security.",
        ],
      },
      {
        heading: "The modern operational workflow",
        paragraphs: [
          "Operational teams replace email attachments with tracked delivery links. Here's the workflow we recommend:",
        ],
        bullets: [
          "Drop your files into a browser-native transfer platform like Docsora.",
          "Choose link or direct email delivery to recipients.",
          "Set an expiry, optional password and download limit.",
          "Share the link — and watch open / download events in real time.",
        ],
      },
      {
        heading: "What to look for in a transfer platform",
        paragraphs: [
          "Beyond raw file size, the right platform should give you tracking, branded recipient pages, encryption in transit and at rest, and workflow integration into signing and approvals.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the maximum file size I can send?",
        answer:
          "Docsora supports oversized operational files well beyond email attachment limits — typically multi-GB transfers handled in a single browser session.",
      },
      {
        question: "Do recipients need an account?",
        answer: "No. Recipients click a delivery link and download directly — no account required.",
      },
    ],
    relatedTools: [
      { slug: "send-large-files", label: "Send Large Files" },
      { slug: "large-file-transfer", label: "Large File Transfer" },
    ],
    relatedGuides: [
      "how-to-transfer-large-videos-without-compression",
      "how-to-send-files-larger-than-gmail-limits",
    ],
  },
  {
    slug: "how-to-transfer-large-videos-without-compression",
    title: "How to Transfer Large Videos Without Compression | Docsora",
    metaDescription:
      "Transfer RAW footage, master exports and 4K/8K video files without compression. Step-by-step guide for production teams.",
    h1: "How to Transfer Large Videos Without Compression",
    intro:
      "RAW footage, ProRes masters and 8K exports lose value the second they're compressed. Here's how to move them at full fidelity.",
    readTime: "6 min read",
    category: "Video & production",
    icon: FileVideo,
    primaryToolSlug: "send-large-videos",
    primaryToolLabel: "Send large videos",
    sections: [
      {
        heading: "Why compression destroys production value",
        paragraphs: [
          "Most consumer transfer tools transcode or re-encode video on upload to save bandwidth. For production teams that means lost color information, generation loss and broken delivery commitments.",
          "Docsora preserves source files byte-for-byte — what gets uploaded is exactly what gets downloaded.",
        ],
      },
      {
        heading: "Recommended workflow for production teams",
        paragraphs: [
          "The operational workflow most production teams converge on looks like this:",
        ],
        bullets: [
          "Upload master, RAW or ProRes files directly from your edit station.",
          "Generate a delivery link the moment upload begins — recipients can start pulling files in parallel.",
          "Brand the recipient page with studio identity.",
          "Track opens and downloads to confirm receipt before invoicing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will my RAW footage be re-encoded?",
        answer:
          "No. Docsora preserves source files exactly as uploaded — no transcoding, no re-encoding, no generation loss.",
      },
    ],
    relatedTools: [
      { slug: "send-large-videos", label: "Send Large Videos" },
      { slug: "large-media-transfer", label: "Large Media Transfer" },
    ],
    relatedGuides: ["best-way-to-send-large-files-online", "large-file-transfer-for-creative-teams"],
  },
  {
    slug: "how-agencies-deliver-large-client-files",
    title: "How Agencies Deliver Large Client Files Professionally | Docsora",
    metaDescription:
      "How creative agencies, studios and consultancies professionally deliver large client files — branded pages, tracking and workflow integration.",
    h1: "How Agencies Deliver Large Client Files",
    intro:
      "Generic WeTransfer pages don't reflect the value agencies create. Here's how modern studios deliver work professionally.",
    readTime: "6 min read",
    category: "Agency workflows",
    icon: Briefcase,
    primaryToolSlug: "agency-file-sharing",
    primaryToolLabel: "Agency file sharing",
    sections: [
      {
        heading: "Why generic transfer pages hurt agencies",
        paragraphs: [
          "When clients receive deliverables through a generic transfer page, the studio brand disappears at the most important moment in the relationship — the handoff.",
          "Branded delivery pages, on the other hand, reinforce the studio's positioning every single time a client opens a transfer.",
        ],
      },
      {
        heading: "The modern agency delivery stack",
        paragraphs: ["Here's what high-performing agencies converge on:"],
        bullets: [
          "Branded recipient pages with the studio's identity.",
          "Real-time tracking of opens and downloads.",
          "Encrypted sessions and expiring links for confidential campaigns.",
          "Direct routing into approvals and signing workflows.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I brand the delivery page with my studio identity?",
        answer:
          "Yes. Docsora Transfer ships branded recipient pages — colors, logo and copy reflect your studio rather than the platform.",
      },
    ],
    relatedTools: [
      { slug: "agency-file-sharing", label: "Agency File Sharing" },
      { slug: "client-file-delivery", label: "Client File Delivery" },
    ],
    relatedGuides: ["operational-workflows-for-client-delivery"],
  },
  {
    slug: "browser-based-file-transfer-explained",
    title: "Browser-Based File Transfer Explained | Docsora",
    metaDescription:
      "How browser-native file transfer works, why it's replacing sync clients, and how to use it for operational delivery workflows.",
    h1: "Browser-Based File Transfer Explained",
    intro:
      "Sync clients are dying. Browser-native transfer is replacing them. Here's why — and how to use it for operational delivery.",
    readTime: "4 min read",
    category: "Transfer fundamentals",
    icon: Globe2,
    primaryToolSlug: "browser-file-transfer",
    primaryToolLabel: "Browser file transfer",
    sections: [
      {
        heading: "What browser-native transfer actually means",
        paragraphs: [
          "Browser-native means the entire transfer happens inside the browser — no desktop apps, no sync clients, no plugins. The page handles upload, encryption, link generation and tracking natively.",
          "The big advantage: it works identically on every device and OS, including locked-down enterprise machines where you can't install software.",
        ],
      },
      {
        heading: "Why this matters for operational teams",
        paragraphs: [
          "Modern operational teams are cross-platform by default — macOS, Windows, Linux, iOS, Android. A browser-native transfer layer removes the entire compatibility surface.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is browser-native transfer slower than desktop sync?",
        answer:
          "No. Modern browsers handle parallel multi-GB uploads efficiently. For most teams, the perceived speed difference is negligible.",
      },
    ],
    relatedTools: [
      { slug: "browser-file-transfer", label: "Browser File Transfer" },
      { slug: "send-files-online", label: "Send Files Online" },
    ],
    relatedGuides: ["best-way-to-send-large-files-online"],
  },
  {
    slug: "secure-operational-document-delivery",
    title: "Secure Operational Document Delivery | Docsora",
    metaDescription:
      "How modern teams securely deliver operational documents — encryption, password-protected links, audit logs and workflow integration.",
    h1: "Secure Operational Document Delivery",
    intro:
      "Sensitive operational documents deserve more than a public download link. Here's the modern secure delivery workflow.",
    readTime: "5 min read",
    category: "Security",
    icon: ShieldCheck,
    primaryToolSlug: "secure-file-transfer",
    primaryToolLabel: "Secure file transfer",
    sections: [
      {
        heading: "What 'secure delivery' actually requires",
        paragraphs: [
          "Secure delivery isn't a checkbox. It requires encryption in transit and at rest, granular access controls, audit logging and recipient verification.",
        ],
        bullets: [
          "TLS-encrypted upload and download sessions.",
          "At-rest encryption on storage.",
          "Password-protected links and expiring access windows.",
          "Audit logs of every open and download event.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Docsora suitable for regulated industries?",
        answer:
          "Docsora aligns with SOC 2 and ISO 27001 principles. For specific compliance requirements, talk to the team about your jurisdiction.",
      },
    ],
    relatedTools: [
      { slug: "secure-file-transfer", label: "Secure File Transfer" },
      { slug: "encrypted-file-transfer", label: "Encrypted File Transfer" },
    ],
    relatedGuides: ["best-practices-for-enterprise-file-transfer"],
  },
  {
    slug: "how-to-send-files-larger-than-gmail-limits",
    title: "How to Send Files Larger Than Gmail's 25MB Limit | Docsora",
    metaDescription:
      "Gmail caps attachments at 25MB. Here's how to send larger files professionally — without compression, fragmented uploads or shared drives.",
    h1: "How to Send Files Larger Than Gmail Limits",
    intro:
      "Gmail caps attachments at 25MB. Outlook is similar. Here's the modern way to send anything larger.",
    readTime: "4 min read",
    category: "Email workflows",
    icon: Mail,
    primaryToolSlug: "email-large-files",
    primaryToolLabel: "Email large files",
    sections: [
      {
        heading: "Why the 25MB ceiling still exists",
        paragraphs: [
          "Inbox attachment limits exist for sound technical reasons — bandwidth, storage and abuse prevention. But they make modern operational work painful when most deliverables exceed 25MB.",
        ],
      },
      {
        heading: "The modern workaround",
        paragraphs: [
          "Instead of attaching the file, attach a delivery link. Docsora can email the link directly to your recipients from a branded sender identity.",
        ],
        bullets: [
          "Upload your file to Docsora.",
          "Choose 'email delivery' and add recipients.",
          "Docsora sends a branded email with a tracked download link.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I send the link from my own email instead?",
        answer:
          "Yes. Choose 'link delivery', copy the URL and paste it into your own email client.",
      },
    ],
    relatedTools: [{ slug: "email-large-files", label: "Email Large Files" }],
    relatedGuides: ["best-way-to-send-large-files-online"],
  },
  {
    slug: "large-file-transfer-for-creative-teams",
    title: "Large File Transfer for Creative Teams | Docsora",
    metaDescription:
      "How creative teams transfer large design, photography and production files — without compression, with branding and tracking.",
    h1: "Large File Transfer for Creative Teams",
    intro:
      "Designers, photographers and production teams move massive files daily. Here's the modern workflow that keeps them moving.",
    readTime: "5 min read",
    category: "Creative workflows",
    icon: Palette,
    primaryToolSlug: "send-large-design-files",
    primaryToolLabel: "Send large design files",
    sections: [
      {
        heading: "Why creative teams need specialised delivery",
        paragraphs: [
          "Creative file types — PSD, AI, INDD, AEP, BRAW — are large, sensitive to compression and often confidential. Generic transfer tools either compress them or expose them on public links.",
        ],
      },
      {
        heading: "The creative delivery workflow",
        paragraphs: [
          "High-performing creative teams use a single browser-native delivery layer for design files, photography and video — branded, tracked and connected to client approvals.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Docsora preserve layered design files?",
        answer:
          "Yes. PSDs, AIs, INDDs and AEPs are preserved byte-for-byte with all layers, smart objects and embedded content intact.",
      },
    ],
    relatedTools: [
      { slug: "send-large-design-files", label: "Send Design Files" },
      { slug: "large-media-transfer", label: "Large Media Transfer" },
    ],
    relatedGuides: ["how-to-transfer-large-videos-without-compression"],
  },
  {
    slug: "how-to-transfer-powerpoint-presentations-securely",
    title: "How to Transfer PowerPoint Presentations Securely | Docsora",
    metaDescription:
      "Send large PowerPoint and Keynote decks securely — encrypted delivery, password protection, expiring links and download tracking.",
    h1: "How to Transfer PowerPoint Presentations Securely",
    intro:
      "Investor decks, board packs and client pitches deserve more than an unprotected email attachment. Here's how to deliver them securely.",
    readTime: "5 min read",
    category: "Presentations",
    icon: Presentation,
    primaryToolSlug: "send-large-powerpoint-files",
    primaryToolLabel: "Send large PowerPoint files",
    sections: [
      {
        heading: "Why presentations deserve secure delivery",
        paragraphs: [
          "Decks often contain financial projections, strategic positioning and unannounced product detail. Public download links and email attachments offer no real protection.",
        ],
      },
      {
        heading: "The secure delivery workflow",
        paragraphs: ["Here's the workflow we recommend for decks containing sensitive material:"],
        bullets: [
          "Upload the PPTX or KEY file to Docsora.",
          "Enable password protection and set a short expiry.",
          "Send via direct email delivery to specific recipients.",
          "Watch real-time open/download events to confirm receipt.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I revoke a link after sending?",
        answer: "Yes. Expire any link instantly from the transfer dashboard.",
      },
    ],
    relatedTools: [{ slug: "send-large-powerpoint-files", label: "Send Large PowerPoint" }],
    relatedGuides: ["secure-operational-document-delivery"],
  },
  {
    slug: "operational-workflows-for-client-delivery",
    title: "Operational Workflows for Client Delivery | Docsora",
    metaDescription:
      "How modern operational teams deliver work to clients — branded transfer pages, tracked downloads, approval workflows and integrated signing.",
    h1: "Operational Workflows for Client Delivery",
    intro:
      "Client delivery shouldn't end at 'here's a link.' Here's the operational workflow that wins repeat work.",
    readTime: "6 min read",
    category: "Client workflows",
    icon: Building2,
    primaryToolSlug: "client-file-delivery",
    primaryToolLabel: "Client file delivery",
    sections: [
      {
        heading: "Why client delivery is a workflow, not a file",
        paragraphs: [
          "Every client delivery is a chain of events — upload, send, receive, review, approve, sign, archive. Treating it as a single file upload is what makes WeTransfer-style delivery feel unprofessional.",
        ],
      },
      {
        heading: "The end-to-end client delivery workflow",
        paragraphs: ["The modern operational chain looks like this:"],
        bullets: [
          "Deliver final files via branded Docsora Transfer.",
          "Track open and download events to confirm receipt.",
          "Route the deliverable into client approval.",
          "Send the sign-off contract through Docsora Sign.",
          "Archive the executed package into Docsora Storage.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I integrate transfer with signing?",
        answer:
          "Yes. Docsora Transfer routes directly into Docsora Sign — the same delivered file can be queued for signature in one click.",
      },
    ],
    relatedTools: [
      { slug: "client-file-delivery", label: "Client File Delivery" },
      { slug: "agency-file-sharing", label: "Agency File Sharing" },
    ],
    relatedGuides: ["how-agencies-deliver-large-client-files"],
  },
  {
    slug: "best-practices-for-enterprise-file-transfer",
    title: "Best Practices for Enterprise File Transfer | Docsora",
    metaDescription:
      "Enterprise file transfer best practices — encryption, access controls, audit logging, workflow integration and compliance posture.",
    h1: "Best Practices for Enterprise File Transfer",
    intro:
      "Enterprise file transfer is more than send-and-forget. Here are the principles that hold up under audit.",
    readTime: "7 min read",
    category: "Enterprise",
    icon: Lock,
    primaryToolSlug: "encrypted-file-transfer",
    primaryToolLabel: "Encrypted file transfer",
    sections: [
      {
        heading: "Encryption is table stakes",
        paragraphs: [
          "Every modern transfer platform should encrypt in transit and at rest. If a vendor can't clearly describe their encryption posture, that's a red flag.",
        ],
      },
      {
        heading: "Access control & audit logging",
        paragraphs: [
          "Per-link passwords, download limits and expiring access windows close the gap between 'sent' and 'recipient-only.' Pair these with an audit log that records every access event.",
        ],
      },
      {
        heading: "Workflow integration",
        paragraphs: [
          "Transfer that doesn't connect to signing, approvals and storage creates operational fragmentation. The strongest enterprise posture is a unified operational layer.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does Docsora support SSO?",
        answer:
          "Yes — SAML SSO is available on enterprise plans, along with role-based access control and audit log export.",
      },
    ],
    relatedTools: [
      { slug: "encrypted-file-transfer", label: "Encrypted File Transfer" },
      { slug: "secure-file-transfer", label: "Secure File Transfer" },
    ],
    relatedGuides: ["secure-operational-document-delivery"],
  },
];

export const transferGuideBySlug: Record<string, TransferGuide> = Object.fromEntries(
  transferGuides.map((g) => [g.slug, g]),
);