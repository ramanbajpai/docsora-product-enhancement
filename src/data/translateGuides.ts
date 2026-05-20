import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Presentation,
  FileType,
  Briefcase,
  Scale,
  Globe2,
  GraduationCap,
  Code2,
  Files,
  ClipboardList,
} from "lucide-react";

export interface TranslateGuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface TranslateGuideFAQ {
  question: string;
  answer: string;
}

export interface TranslateGuideRelatedTool {
  slug: string;
  label: string;
}

export interface TranslateGuide {
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
  sections: TranslateGuideSection[];
  faqs: TranslateGuideFAQ[];
  relatedTools: TranslateGuideRelatedTool[];
  relatedGuides: string[];
}

const sharedFaqs: TranslateGuideFAQ[] = [
  {
    question: "How many languages does Docsora support?",
    answer:
      "Docsora supports 75+ languages including English, Spanish, French, German, Italian, Portuguese, Arabic, Chinese, Japanese, Korean, Hindi, Russian, Turkish, Dutch, Polish, and Swedish — covering every major language used in international business and operational documentation.",
  },
  {
    question: "Is formatting preserved when I translate a document?",
    answer:
      "Yes. Docsora preserves layouts, fonts, tables, slide structure, and paragraph hierarchy when translating PDFs, DOCX, PPTX, and HTML files. The translated file downloads in the same format as the original.",
  },
  {
    question: "Is my document secure during translation?",
    answer:
      "Files travel over TLS-encrypted connections, are processed in an isolated environment, and are never used to train models. Docsora is GDPR aligned and operated under ISO 27001 controls.",
  },
];

export const translateGuides: TranslateGuide[] = [
  {
    slug: "how-to-translate-pdfs",
    title: "How to Translate a PDF Without Losing Formatting | Docsora",
    metaDescription:
      "Step-by-step guide to translating PDF documents into 75+ languages while preserving layout, fonts, tables, and structure.",
    h1: "How to translate a PDF without losing formatting",
    intro:
      "PDFs are the most common business document on the planet — and the hardest to translate cleanly. This guide walks through the workflow used by legal, finance, and operations teams to translate PDFs into 75+ languages without breaking layout, fonts, or tables.",
    readTime: "6 min read",
    category: "PDF translation",
    icon: FileText,
    primaryToolSlug: "translate-pdf",
    primaryToolLabel: "Translate PDF",
    sections: [
      {
        heading: "Why translating PDFs is harder than translating text",
        paragraphs: [
          "PDFs are a fixed-layout container — every character lives at a precise coordinate on the page. When you copy-paste text out, you lose the structure. When you paste translated text back in, it almost never fits the original layout, especially for languages that expand (German, French) or contract (Chinese, Japanese).",
          "The right way to translate a PDF is to translate the whole document in place — letting the platform handle layout reflow, font fallbacks, and table spacing automatically.",
        ],
      },
      {
        heading: "Step-by-step: translate a PDF cleanly",
        paragraphs: [
          "The workflow below produces a localized PDF ready to share — no manual cleanup, no broken pagination.",
        ],
        bullets: [
          "Open the Docsora PDF translator and drop your PDF into the upload area.",
          "Pick a target language from the 75+ supported languages.",
          "Let Docsora translate the entire document while preserving headings, fonts, tables, and page structure.",
          "Download the translated PDF — ready to email, e-sign, or archive.",
        ],
      },
      {
        heading: "When to use whole-document PDF translation",
        paragraphs: [
          "Whole-document translation is the right approach for contracts, reports, proposals, manuals, and any PDF where layout matters. Copy-paste translation is fine for a single sentence — not for a 40-page board memo.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-pdf", label: "Translate PDF" },
      { slug: "translate-contracts", label: "Translate Contracts" },
      { slug: "translate-reports", label: "Translate Reports" },
    ],
    relatedGuides: [
      "translate-business-documents",
      "translate-contracts-online",
      "multilingual-document-workflows",
    ],
  },
  {
    slug: "translate-powerpoint-presentations",
    title: "How to Translate PowerPoint Presentations | Docsora",
    metaDescription:
      "Step-by-step guide to translating PowerPoint presentations into 75+ languages while preserving slides, layouts, fonts, and animations.",
    h1: "How to translate PowerPoint presentations",
    intro:
      "Presentation decks are how leadership communicates internally and externally. Translating them well — without breaking design — is the difference between a credible international launch and an embarrassing one.",
    readTime: "5 min read",
    category: "Presentation translation",
    icon: Presentation,
    primaryToolSlug: "translate-powerpoint",
    primaryToolLabel: "Translate PowerPoint",
    sections: [
      {
        heading: "What makes deck translation hard",
        paragraphs: [
          "Slides are visual — translated text needs to fit boxes, respect typography, and keep visual hierarchy. Copy-paste translation almost always breaks slides because translated languages rarely match the original character count.",
        ],
      },
      {
        heading: "Step-by-step: translate a PPTX deck",
        paragraphs: [
          "The workflow below preserves every layout, animation, and embedded chart.",
        ],
        bullets: [
          "Upload your PPTX into the Docsora PowerPoint translator.",
          "Pick the target language from 75+ supported languages.",
          "Let Docsora translate every slide while keeping layouts, transitions, and speaker notes intact.",
          "Download the localized PPTX — ready for the next international all-hands.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-powerpoint", label: "Translate PowerPoint" },
      { slug: "translate-pptx", label: "Translate PPTX" },
      { slug: "translate-investor-presentations", label: "Translate Investor Decks" },
    ],
    relatedGuides: [
      "translate-business-documents",
      "translate-client-proposals",
      "multilingual-document-workflows",
    ],
  },
  {
    slug: "translate-word-documents",
    title: "How to Translate Word Documents | Docsora",
    metaDescription:
      "Guide to translating Word documents (DOC, DOCX) into 75+ languages with paragraphs, tables, and styles preserved.",
    h1: "How to translate Word documents (DOC, DOCX)",
    intro:
      "Word documents are everywhere — contracts, proposals, internal memos, HR policies. Translating them cleanly is one of the highest-leverage workflows for any multilingual team.",
    readTime: "5 min read",
    category: "Word translation",
    icon: FileType,
    primaryToolSlug: "translate-word-document",
    primaryToolLabel: "Translate Word Document",
    sections: [
      {
        heading: "Why Word documents need format-aware translation",
        paragraphs: [
          "Word documents carry styles, headers, lists, footnotes, and tables. Translating in place — rather than copy-paste — preserves all of that automatically.",
        ],
      },
      {
        heading: "Step-by-step",
        paragraphs: ["A clean DOCX-to-DOCX translation workflow."],
        bullets: [
          "Upload your DOCX to the Docsora Word translator.",
          "Pick a target language.",
          "Download the translated DOCX with styles and structure preserved.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-word-document", label: "Translate Word Document" },
      { slug: "translate-docx", label: "Translate DOCX" },
      { slug: "translate-contracts", label: "Translate Contracts" },
    ],
    relatedGuides: ["how-to-translate-pdfs", "translate-contracts-online"],
  },
  {
    slug: "translate-business-documents",
    title: "How to Translate Business Documents | Docsora",
    metaDescription:
      "Guide to translating business documents — proposals, reports, briefs — into 75+ languages with formatting preserved.",
    h1: "How to translate business documents at scale",
    intro:
      "Business documents flow through every department — sales, ops, HR, finance. A multilingual document workflow eliminates the bottleneck of manual translation rounds.",
    readTime: "6 min read",
    category: "Business translation",
    icon: Briefcase,
    primaryToolSlug: "translate-business-documents",
    primaryToolLabel: "Translate Business Documents",
    sections: [
      {
        heading: "The cost of translating documents the old way",
        paragraphs: [
          "Copy-pasting into a generic translator, reformatting in Word, sending back for review — every step introduces error and delay. Whole-document translation collapses that into a single browser-based workflow.",
        ],
      },
      {
        heading: "A repeatable workflow",
        paragraphs: ["A workflow your team can run consistently across regions."],
        bullets: [
          "Drop the document into Docsora.",
          "Pick the target language.",
          "Review the localized output with formatting preserved.",
          "Share, sign, or archive — all from one workspace.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-business-documents", label: "Translate Business Documents" },
      { slug: "translate-reports", label: "Translate Reports" },
      { slug: "translate-client-proposals", label: "Translate Client Proposals" },
    ],
    relatedGuides: ["how-to-translate-pdfs", "multilingual-document-workflows"],
  },
  {
    slug: "translate-contracts-online",
    title: "How to Translate Contracts Online Securely | Docsora",
    metaDescription:
      "Guide to translating contracts online into 75+ languages with clause structure preserved. Secure, browser-based, encrypted.",
    h1: "How to translate contracts online securely",
    intro:
      "Contracts demand precision — clauses, defined terms, signature blocks, and numbering must all survive translation intact. This guide walks through the workflow used by legal operations teams.",
    readTime: "7 min read",
    category: "Legal translation",
    icon: Scale,
    primaryToolSlug: "translate-contracts",
    primaryToolLabel: "Translate Contracts",
    sections: [
      {
        heading: "What contract translation actually requires",
        paragraphs: [
          "A contract translation that misformats a clause is a contract translation that risks a renegotiation. Preserving clause structure, numbering, and defined terms is non-negotiable.",
        ],
      },
      {
        heading: "Workflow",
        paragraphs: ["Run this on MSAs, NDAs, SOWs, and employment agreements."],
        bullets: [
          "Upload the contract (PDF or DOCX) into Docsora.",
          "Pick the target language from 75+ supported.",
          "Let Docsora translate every clause while keeping numbering, headings, and signature blocks intact.",
          "Download — ready for legal review, e-signature, or counter-party review.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-contracts", label: "Translate Contracts" },
      { slug: "translate-legal-documents", label: "Translate Legal Documents" },
      { slug: "translate-hr-documents", label: "Translate HR Documents" },
    ],
    relatedGuides: ["how-to-translate-pdfs", "translate-business-documents"],
  },
  {
    slug: "multilingual-document-workflows",
    title: "Multilingual Document Workflows for Global Teams | Docsora",
    metaDescription:
      "How global teams run multilingual document workflows — translate, share, sign, and version documents in 75+ languages from one workspace.",
    h1: "Multilingual document workflows for global teams",
    intro:
      "Multilingual operations are not about translating one document — they're about running an entire documentation function across regions, time zones, and languages without losing fidelity.",
    readTime: "8 min read",
    category: "Multilingual workflows",
    icon: Globe2,
    primaryToolSlug: "multilingual-business-workflows",
    primaryToolLabel: "Multilingual Business Workflows",
    sections: [
      {
        heading: "The principles of a multilingual workflow",
        paragraphs: [
          "Single source of truth. Whole-document translation. Format preservation. Operational tooling — share, sign, track — built into the same workspace. That's what separates a multilingual workflow from a translation tool.",
        ],
      },
      {
        heading: "How teams operate this in practice",
        paragraphs: ["Run consistently across departments."],
        bullets: [
          "Author the source document once.",
          "Translate into every target language in one workflow.",
          "Share and version the localized variants.",
          "Track downstream usage and updates centrally.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "multilingual-business-workflows", label: "Multilingual Workflows" },
      { slug: "translate-business-documents", label: "Translate Business Documents" },
      { slug: "translate-operational-handbooks", label: "Translate Operational Handbooks" },
    ],
    relatedGuides: ["translate-business-documents", "translate-operational-documentation"],
  },
  {
    slug: "translate-training-materials",
    title: "How to Translate Training Materials at Scale | Docsora",
    metaDescription:
      "Guide to translating training materials and L&D content into 75+ languages with module structure preserved.",
    h1: "How to translate training materials at scale",
    intro:
      "Global L&D teams cannot afford to rebuild training material per region. Whole-document translation lets you scale a single curriculum across every language your workforce speaks.",
    readTime: "5 min read",
    category: "Training translation",
    icon: GraduationCap,
    primaryToolSlug: "translate-training-materials",
    primaryToolLabel: "Translate Training Materials",
    sections: [
      {
        heading: "Building a multilingual L&D pipeline",
        paragraphs: [
          "Author master modules in one language. Translate the decks, PDFs, and handbooks into every target language in one workflow. Distribute and version centrally.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-training-materials", label: "Translate Training Materials" },
      { slug: "translate-onboarding-documents", label: "Translate Onboarding" },
      { slug: "translate-global-training-material", label: "Global Training" },
    ],
    relatedGuides: ["multilingual-document-workflows", "translate-business-documents"],
  },
  {
    slug: "translate-html-files",
    title: "How to Translate HTML Files Online | Docsora",
    metaDescription:
      "Guide to translating HTML files into 75+ languages while preserving tags, structure, and attributes.",
    h1: "How to translate HTML files online",
    intro:
      "HTML files carry markup that translation must respect. The right tool translates the visible content without touching tags, attributes, or scripts.",
    readTime: "4 min read",
    category: "HTML translation",
    icon: Code2,
    primaryToolSlug: "translate-html-files",
    primaryToolLabel: "Translate HTML Files",
    sections: [
      {
        heading: "Why tag-aware translation matters",
        paragraphs: [
          "Tag-aware translation keeps your markup intact while translating only the user-visible text — the only safe way to localize HTML at scale.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-html-files", label: "Translate HTML Files" },
      { slug: "translate-product-documentation", label: "Translate Product Docs" },
    ],
    relatedGuides: ["multilingual-document-workflows"],
  },
  {
    slug: "translate-client-proposals",
    title: "How to Translate Client Proposals Quickly | Docsora",
    metaDescription:
      "Guide to translating client proposals, SOWs, and RFPs into 75+ languages with branded formatting preserved.",
    h1: "How to translate client proposals quickly",
    intro:
      "International deals move fast. A proposal that lands in the client's language — formatted correctly — earns trust the moment it's opened.",
    readTime: "5 min read",
    category: "Sales translation",
    icon: Files,
    primaryToolSlug: "translate-client-proposals",
    primaryToolLabel: "Translate Client Proposals",
    sections: [
      {
        heading: "Workflow for global sales teams",
        paragraphs: [
          "Author once. Translate per region. Ship in hours, not days — without losing brand formatting.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-client-proposals", label: "Translate Client Proposals" },
      { slug: "translate-business-documents", label: "Translate Business Documents" },
      { slug: "translate-investor-presentations", label: "Translate Investor Decks" },
    ],
    relatedGuides: ["translate-business-documents", "multilingual-document-workflows"],
  },
  {
    slug: "translate-operational-documentation",
    title: "How to Translate Operational Documentation | Docsora",
    metaDescription:
      "Guide to translating SOPs, runbooks, and operational documentation into 75+ languages with structure preserved.",
    h1: "How to translate operational documentation",
    intro:
      "When operations span regions, every team needs to execute from the same playbook — in the language they work in. Whole-document translation makes that practical.",
    readTime: "6 min read",
    category: "Operations translation",
    icon: ClipboardList,
    primaryToolSlug: "translate-operational-documents",
    primaryToolLabel: "Translate Operational Documents",
    sections: [
      {
        heading: "Keep one source of truth, ship every language",
        paragraphs: [
          "Maintain master SOPs in one language. Translate per region as the source updates. Distribute centrally.",
        ],
      },
    ],
    faqs: sharedFaqs,
    relatedTools: [
      { slug: "translate-operational-documents", label: "Translate Operational Documents" },
      { slug: "translate-operational-handbooks", label: "Translate Operational Handbooks" },
    ],
    relatedGuides: ["multilingual-document-workflows"],
  },
];

export const translateGuideBySlug: Record<string, TranslateGuide> =
  Object.fromEntries(translateGuides.map((g) => [g.slug, g]));