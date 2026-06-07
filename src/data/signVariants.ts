import type { LucideIcon } from "lucide-react";
import {
  FileSignature,
  FileText,
  Send,
  Handshake,
  ShieldCheck,
  LayoutTemplate,
  Briefcase,
  Users,
  CheckCircle2,
  PenTool,
} from "lucide-react";

export interface SignVariantConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  keyword: string;
  acceptedFormats: string;
  cardIcon: LucideIcon;
  cardLabel: string;
  cardDescription: string;
  longCopy: string;
  useCases: string[];
  faq: { question: string; answer: string }[];
}

/**
 * Long-tail landing pages for the /sign authority hub.
 * Each variant reuses the premium signing experience above the fold
 * but ships unique SEO metadata, H1, workflow positioning and FAQs
 * for Google + AI-search retrieval (ChatGPT, Perplexity, Gemini, Claude).
 */
export const signVariants: SignVariantConfig[] = [
  {
    slug: "sign-pdf-online",
    title: "Sign PDF Documents Online | Docsora Sign",
    metaDescription:
      "Sign PDF documents online securely with browser-based electronic signature workflows built for contracts, proposals and approvals.",
    h1: "Sign PDF Documents Online",
    intro:
      "Upload any PDF, place signature fields and sign or request signatures in your browser — no installs, no plugins.",
    keyword: "sign pdf online",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: FileText,
    cardLabel: "Sign PDF Online",
    cardDescription:
      "Sign or request PDF signatures in your browser with audit trails and reusable templates.",
    longCopy:
      "Docsora Sign turns any PDF into a legally binding agreement workflow. Drop a PDF into the upload area, position signature, initial, date or text fields, then sign yourself or send to one or more recipients. Every signed PDF carries an audit trail, signer verification and a cryptographic certificate of completion — all generated automatically inside the browser.",
    useCases: [
      "Sign client contracts and SOWs",
      "Counter-sign vendor agreements",
      "Send PDF NDAs for signature",
      "Sign onboarding documents",
      "Approve proposals as PDFs",
      "Execute consulting engagements",
    ],
    faq: [
      {
        question: "How do I sign a PDF online with Docsora?",
        answer:
          "Upload your PDF, choose whether you are signing yourself or routing to one or more recipients, place signature and field markers anywhere on the document, then send or sign. Recipients receive a secure link, complete signing in the browser and the executed PDF is generated with an embedded audit trail and certificate of completion.",
      },
      {
        question: "Are signed PDFs legally binding?",
        answer:
          "Yes. Docsora signatures align with ESIGN, UETA and eIDAS electronic signature standards. Every signed document captures signer identity, IP address, consent and timestamps — surfaced in an audit trail attached to the final PDF.",
      },
    ],
  },
  {
    slug: "electronic-signature-software",
    title: "Electronic Signature Software | Sign Documents Online | Docsora",
    metaDescription:
      "Electronic signature software for signing PDFs, contracts and business documents online. Legally binding eSignatures with audit trails — no installs.",
    h1: "Electronic Signature Software",
    intro:
      "Sign documents online with legally binding electronic signatures — built for contracts, agreements and business document approvals.",
    keyword: "electronic signature software",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: PenTool,
    cardLabel: "Electronic Signature Software",
    cardDescription:
      "Sign PDFs and contracts online with legally binding eSignatures, audit trails and reusable templates.",
    longCopy:
      "Docsora is electronic signature software built for modern teams that need to sign documents online quickly and securely. Upload a PDF or Word document, place signature fields, and send for legally binding eSignatures that meet ESIGN, UETA and eIDAS standards. Every signed document is sealed with a tamper-evident audit trail capturing signer identity, IP, consent and timestamps — the same legal weight as enterprise platforms, in a browser-native workflow.",
    useCases: [
      "Sign PDFs online with legally binding eSignatures",
      "Send contracts and agreements for electronic signature",
      "Collect online signatures from clients and vendors",
      "Replace print-and-scan with secure eSignatures",
      "Roll out electronic signature workflows across teams",
      "Track document signing status in real time",
    ],
    faq: [
      {
        question: "What is electronic signature software?",
        answer:
          "Electronic signature software lets you sign PDFs and other documents online with legally binding eSignatures instead of printing, signing on paper and scanning. Docsora is browser-based electronic signature software with audit trails, multi-party signing and reusable templates for contracts, proposals and business approvals.",
      },
      {
        question: "Are electronic signatures legally binding?",
        answer:
          "Yes. Electronic signatures created with Docsora are legally binding under the ESIGN Act (US), UETA (US) and eIDAS (EU). Each signed document captures signer identity, IP address, consent and timestamps inside a tamper-evident audit trail.",
      },
    ],
  },
  {
    slug: "online-signature-business",
    title: "Online Signature for Business | eSignature Platform | Docsora",
    metaDescription:
      "Online signature platform for business document approvals. Send contracts, NDAs and proposals for secure eSignatures with audit trails and live tracking.",
    h1: "Online Signature for Business",
    intro:
      "Send contracts, NDAs, proposals and business approvals for secure online signatures — with audit trails, live tracking and reusable templates.",
    keyword: "online signature for business",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: Briefcase,
    cardLabel: "Online Signature for Business",
    cardDescription:
      "Send business documents for legally binding online signatures with live tracking and audit trails.",
    longCopy:
      "Docsora is the online signature platform built for business document approvals — sales contracts, vendor agreements, NDAs, proposals, onboarding packets and operational approvals. Upload a document, add recipients, place fields and send for browser-based eSignatures. Every business document is returned legally executed, with an audit trail attached and full visibility into who signed, when and from where.",
    useCases: [
      "Send sales contracts for online signature",
      "Sign vendor agreements and MSAs electronically",
      "Collect NDA signatures from partners and counterparties",
      "Approve business proposals with eSignatures",
      "Sign onboarding and HR documents online",
      "Route operational approvals through stakeholders",
    ],
    faq: [
      {
        question: "How do online signatures work for business documents?",
        answer:
          "Upload your business document, add the recipients who need to sign or approve, place signature and field markers, and send. Recipients receive a secure email link, sign in their browser on any device, and you receive the legally executed document with an embedded audit trail.",
      },
      {
        question: "Is an online signature platform secure enough for business?",
        answer:
          "Yes. Docsora ships TLS-encrypted sessions, email signer verification, optional 2FA, tamper-evident audit trails and ISO 27001-aligned operations — meeting the security and compliance posture business, legal and finance teams expect.",
      },
    ],
  },
  {
    slug: "request-signatures",
    title: "Request Signatures Online | Secure E-Signature Workflows | Docsora",
    metaDescription:
      "Send documents for signature online with secure browser-based approval workflows for contracts, onboarding and business operations.",
    h1: "Request Signatures Online",
    intro:
      "Send documents to one or many recipients for fast, secure browser-based signatures — with real-time tracking and reusable templates.",
    keyword: "request signatures online",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: Send,
    cardLabel: "Request Signatures",
    cardDescription:
      "Send agreements to multiple recipients with enforced signing order and live status.",
    longCopy:
      "Docsora's signature request workflow is built for teams that ship agreements daily — sales, operations, agencies and HR. Upload a document, add recipients, optionally enforce a signing order, place fields per signer, and send. Every recipient signs in the browser, and senders receive live status updates as the document moves through the approval flow.",
    useCases: [
      "Send sales contracts for signature",
      "Route MSAs through legal and finance",
      "Collect signatures on partnership agreements",
      "Send freelancer agreements",
      "Route board resolutions for approval",
      "Manage multi-party NDAs",
    ],
    faq: [
      {
        question: "How do I request signatures from multiple people?",
        answer:
          "Upload your document, add recipients with their email addresses and role (signer, approver, viewer), assign fields per signer and choose whether the order is enforced. Each recipient receives a secure signing link with email verification, and you can watch progress in real time.",
      },
      {
        question: "Can I enforce a signing order?",
        answer:
          "Yes. Docsora supports both parallel signing — where all recipients can sign at once — and ordered signing, where each signer only receives the document after the previous signer has completed their part.",
      },
    ],
  },
  {
    slug: "sign-contracts-online",
    title: "Sign Contracts Online | Browser-Based Contract Signing | Docsora",
    metaDescription:
      "Sign contracts online with secure browser-based workflows. Send, track and execute service agreements, MSAs and vendor contracts in minutes.",
    h1: "Sign Contracts Online",
    intro:
      "Send, sign and execute contracts entirely in the browser — built for sales teams, agencies, consultants and operational workflows.",
    keyword: "sign contracts online",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: FileSignature,
    cardLabel: "Sign Contracts",
    cardDescription:
      "Browser-based contract signing for sales agreements, MSAs and vendor contracts.",
    longCopy:
      "Docsora turns contract execution into a one-screen workflow. Upload the agreement, route it to counterparties with field-level placement, and let recipients sign from any browser. Executed contracts are sealed with an audit trail and stored alongside their parent workflow inside Docsora — ready to be tracked, renewed or revised.",
    useCases: [
      "Sign service agreements",
      "Execute MSAs and SOWs",
      "Counter-sign vendor contracts",
      "Sign partnership agreements",
      "Approve consulting engagements",
      "Renew client contracts",
    ],
    faq: [
      {
        question: "Can I sign contracts from my browser?",
        answer:
          "Yes. Docsora is fully browser-based — Chrome, Safari, Edge, Firefox and Arc on macOS, Windows, Linux, ChromeOS, iOS and Android. There is nothing to install or configure for signers or senders.",
      },
      {
        question: "Are contracts signed via Docsora legally enforceable?",
        answer:
          "Yes. Signatures meet ESIGN, UETA and eIDAS standards. Every executed contract includes a tamper-evident audit trail with signer identity, IP, timestamps and consent records.",
      },
    ],
  },
  {
    slug: "electronic-signatures",
    title: "Electronic Signatures Platform | Docsora Sign",
    metaDescription:
      "A modern electronic signature platform engineered for browser-based agreement workflows, reusable templates and operational approvals.",
    h1: "Electronic Signature Platform",
    intro:
      "The modern electronic signature platform for teams that move fast — operational, browser-native and template-driven.",
    keyword: "electronic signature platform",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: PenTool,
    cardLabel: "Electronic Signatures",
    cardDescription:
      "Modern e-signature platform with templates, audit trails and multi-recipient workflows.",
    longCopy:
      "Docsora is a modern electronic signature platform built for operational teams — not enterprise procurement cycles. It combines the legal weight of legacy platforms (ESIGN, UETA, eIDAS) with a premium browser-native experience: fast uploads, intuitive field placement, reusable templates and real-time status tracking inside a single workspace.",
    useCases: [
      "Roll out e-signatures across a team",
      "Replace email-and-print signing",
      "Execute recurring agreements at scale",
      "Standardise approval workflows",
      "Centralise signed-document storage",
      "Audit signing activity",
    ],
    faq: [
      {
        question: "What is an electronic signature platform?",
        answer:
          "An electronic signature platform is software that lets teams send, sign and manage legally binding agreements digitally — capturing signer identity, intent and consent without paper. Docsora is a modern, browser-native e-signature platform with reusable templates and full audit trails.",
      },
      {
        question: "Why choose a modern e-signature platform?",
        answer:
          "Modern platforms like Docsora prioritise workflow simplicity, browser-native UX and reusable templates over enterprise complexity — getting documents signed in minutes instead of days.",
      },
    ],
  },
  {
    slug: "proposal-approval-workflows",
    title: "Proposal Approval Workflows | Sign Proposals Online | Docsora",
    metaDescription:
      "Approve proposals, scopes of work and client deliverables online with browser-based signature workflows built for sales and agency teams.",
    h1: "Proposal Approval Workflows",
    intro:
      "Collect approvals on proposals, SOWs and deliverables without email back-and-forth — built for agencies, consultancies and sales teams.",
    keyword: "proposal approval workflows",
    acceptedFormats: "PDF · PPTX · DOCX",
    cardIcon: Handshake,
    cardLabel: "Approve Proposals",
    cardDescription:
      "Send proposals and SOWs for browser-based client approval with live status.",
    longCopy:
      "Docsora's proposal approval flow replaces the long email chain teams use to close deals. Upload your proposal, place client signature and approval fields, and send. Clients open a premium signing link, approve in their browser, and Docsora returns an executed copy with an audit trail — typically within minutes of the send.",
    useCases: [
      "Approve agency proposals",
      "Sign client SOWs",
      "Lock in pricing approvals",
      "Approve campaign briefs",
      "Sign engagement letters",
      "Approve consulting deliverables",
    ],
    faq: [
      {
        question: "How do I send a proposal for approval online?",
        answer:
          "Upload your proposal (PDF, PPTX or DOCX), add the client recipient, place a signature and approval-date field, and send. Your client receives a branded signing link, approves in the browser and you receive the executed copy automatically.",
      },
      {
        question: "Can I track when clients open and approve proposals?",
        answer:
          "Yes. Docsora surfaces real-time status — sent, opened, signed, completed — for every proposal so you always know exactly where the deal stands.",
      },
    ],
  },
  {
    slug: "nda-signing",
    title: "NDA Signing Online | Send and Sign NDAs in Minutes | Docsora",
    metaDescription:
      "Send and sign NDAs online with browser-based electronic signature workflows. Mutual, one-way and multi-party NDAs supported.",
    h1: "NDA Signing Online",
    intro:
      "Send and sign NDAs in minutes — mutual, one-way or multi-party — with reusable templates for recurring confidentiality workflows.",
    keyword: "nda signing",
    acceptedFormats: "PDF · DOCX · DOC",
    cardIcon: ShieldCheck,
    cardLabel: "Sign NDAs",
    cardDescription:
      "Send mutual, one-way and multi-party NDAs for fast browser-based signing.",
    longCopy:
      "Docsora is built for the NDA workflows teams actually deal with — vendor NDAs before evaluations, mutual NDAs before partnerships, and multi-party NDAs across deal rooms. Use a reusable NDA template, drop in the counterparties, and send. Every executed NDA is stored with its audit trail and surfaced in the workspace whenever the relationship moves forward.",
    useCases: [
      "Vendor evaluation NDAs",
      "Partner mutual NDAs",
      "Investor confidentiality agreements",
      "Multi-party deal-room NDAs",
      "Candidate NDAs during hiring",
      "Contractor confidentiality",
    ],
    faq: [
      {
        question: "How do I send an NDA for signature?",
        answer:
          "Upload an NDA or launch one from a reusable template, add the counterparty's name and email, place signature fields, and send. Recipients sign in the browser and you receive the executed NDA with an audit trail.",
      },
      {
        question: "Can I send NDAs to multiple recipients?",
        answer:
          "Yes. Multi-party NDAs are fully supported with parallel or enforced signing order across every counterparty.",
      },
    ],
  },
  {
    slug: "online-document-approval",
    title: "Online Document Approval | Browser-Based Approval Workflows | Docsora",
    metaDescription:
      "Approve documents online with secure browser-based workflows. Built for operational approvals across teams, vendors and clients.",
    h1: "Online Document Approval",
    intro:
      "Route documents for approval through any number of stakeholders — sales, legal, finance, operations — entirely in the browser.",
    keyword: "online document approval",
    acceptedFormats: "PDF · DOCX · DOC · PPTX",
    cardIcon: CheckCircle2,
    cardLabel: "Online Approvals",
    cardDescription:
      "Route documents through approvers with enforced order and real-time status.",
    longCopy:
      "Docsora turns document approval into a tracked, auditable workflow. Drop in a document, add approvers in order, and send. Approvers can sign, approve or decline with a comment, and senders see status updates as the document progresses — replacing untracked email approval chains.",
    useCases: [
      "Approve marketing assets",
      "Route legal documents for review",
      "Approve vendor onboarding packets",
      "Sign internal policy updates",
      "Approve purchase orders",
      "Sign change requests",
    ],
    faq: [
      {
        question: "How do online document approvals work?",
        answer:
          "Upload a document, add approvers with their email and role, optionally enforce an order, and send. Each approver receives a secure browser link to approve, sign or decline. Docsora tracks every action and stores the final document with an audit trail.",
      },
      {
        question: "Can approvers decline or comment?",
        answer:
          "Yes. Approvers can decline with a reason, request changes, or sign — and senders see the response in real time inside the workspace.",
      },
    ],
  },
  {
    slug: "reusable-signature-templates",
    title: "Reusable E-Signature Templates | Docsora Sign",
    metaDescription:
      "Create reusable document signing templates for proposals, contracts, onboarding workflows and recurring approvals.",
    h1: "Reusable E-Signature Templates",
    intro:
      "Build a template once, launch it in seconds — for proposals, contracts, NDAs, onboarding packets and recurring agreements.",
    keyword: "reusable signature templates",
    acceptedFormats: "Templates · Variables · Multi-document",
    cardIcon: LayoutTemplate,
    cardLabel: "Reusable Templates",
    cardDescription:
      "Save reusable templates with pre-placed fields and recipient roles for one-click sending.",
    longCopy:
      "Docsora's reusable templates turn recurring agreements into a one-click send. Upload a master document, define signer roles, place fields once, and any team member can launch the template with new recipient details — without re-placing fields or re-uploading the document. Perfect for NDAs, sales contracts, freelancer agreements and onboarding packets.",
    useCases: [
      "Reusable NDA templates",
      "Sales contract templates",
      "Freelancer agreement templates",
      "Employee onboarding packets",
      "Vendor agreement templates",
      "Consent form templates",
    ],
    faq: [
      {
        question: "Can I create reusable signing templates?",
        answer:
          "Yes. Build a template once with pre-placed signature, initial, date and text fields plus defined signer roles. Anyone on your team can launch the template by adding recipient details — no field placement, no re-upload.",
      },
      {
        question: "Can templates include variable fields?",
        answer:
          "Yes. Templates support variable text fields (name, company, amount, date) that auto-populate from launch data or recipient input, so each generated agreement is unique without manual editing.",
      },
    ],
  },
  {
    slug: "client-approval-software",
    title: "Client Approval Software | Agency Approval Workflows | Docsora",
    metaDescription:
      "Client approval software for agencies, consultancies and freelancers. Send proposals, deliverables and contracts for fast browser-based approval.",
    h1: "Client Approval Software",
    intro:
      "Built for agencies, consultancies and freelancers — collect client approvals on deliverables, scopes and invoices in one premium workflow.",
    keyword: "client approval software",
    acceptedFormats: "PDF · PPTX · DOCX",
    cardIcon: Briefcase,
    cardLabel: "Client Approvals",
    cardDescription:
      "Agency-friendly client approval workflows with branded signing links and live status.",
    longCopy:
      "Docsora is the client approval layer agencies have been asking for. Route proposals, creative deliverables, scope changes and final invoices through a branded approval link — clients open it in the browser, approve in seconds, and your team sees status updates the moment they happen. No more chasing email threads or hunting for signed PDFs.",
    useCases: [
      "Approve creative deliverables",
      "Sign scope changes",
      "Approve campaign launches",
      "Sign retainer renewals",
      "Approve final invoices",
      "Sign engagement letters",
    ],
    faq: [
      {
        question: "Is this built for agency client approvals?",
        answer:
          "Yes. Docsora is designed for the operational reality of agencies and consultancies — recurring approvals, fast turnarounds, branded signing experiences and audit trails that protect every deliverable.",
      },
      {
        question: "Can I see when a client opens or approves a document?",
        answer:
          "Yes. Real-time status tracking shows sent, opened, signed and completed events for every approval — visible inside the Docsora workspace.",
      },
    ],
  },
  {
    slug: "document-signing-platform",
    title: "Document Signing Platform | Modern E-Signature Workflows | Docsora",
    metaDescription:
      "A modern document signing platform built for operational teams. Send, sign and approve agreements with reusable templates and audit trails.",
    h1: "Document Signing Platform",
    intro:
      "A modern document signing platform engineered for operational teams — fast, browser-native, template-driven.",
    keyword: "document signing platform",
    acceptedFormats: "PDF · DOCX · DOC · PPTX",
    cardIcon: Users,
    cardLabel: "Document Signing Platform",
    cardDescription:
      "End-to-end document signing platform with templates, approvals and audit trails.",
    longCopy:
      "Docsora is a complete document signing platform — upload, route, sign, approve, store, audit. Unlike legacy platforms built for enterprise procurement, Docsora is engineered for operational teams that ship agreements every day: sales reps, agency leads, HR managers, ops directors and consultants.",
    useCases: [
      "Roll out signing across a company",
      "Replace fragmented signing tools",
      "Centralise agreement storage",
      "Standardise template workflows",
      "Audit signing activity",
      "Integrate signing into operations",
    ],
    faq: [
      {
        question: "What is a document signing platform?",
        answer:
          "A document signing platform is software that lets teams send, sign, approve and store legally binding agreements digitally. Docsora is a modern, browser-native platform with reusable templates, multi-party signing and full audit trails inside a single workspace.",
      },
      {
        question: "Is Docsora suitable for teams of any size?",
        answer:
          "Yes. Docsora scales from solo freelancers and agencies to operational teams in mid-market companies — without the enterprise procurement overhead of legacy platforms.",
      },
    ],
  },
];

export const signVariantBySlug: Record<string, SignVariantConfig> =
  Object.fromEntries(signVariants.map((v) => [v.slug, v]));