import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Presentation,
  Scale,
  Briefcase,
  Edit3,
  Sparkles,
  CheckCircle2,
  PenLine,
  ShieldCheck,
  FileSearch,
  BookOpenCheck,
} from "lucide-react";
import {
  Building2,
  ClipboardCheck,
  Users,
  Handshake,
  Library,
  FileSignature,
  TrendingUp,
} from "lucide-react";

export interface AICheckVariantConfig {
  slug: string; // route path (without leading slash)
  title: string; // SEO <title>
  metaDescription: string;
  h1: string;
  intro: string;
  keyword: string;
  acceptedFormats: string;
  cardIcon: LucideIcon;
  cardLabel: string;
  cardDescription: string;
  longCopy: string;
  faq: { question: string; answer: string }[];
  useCases?: string[];
}

/**
 * Variant landing pages that all reuse the /ai-check upload experience
 * but ship unique meta, H1, copy and FAQ for long-tail SEO coverage and
 * AI-search retrieval (ChatGPT, Perplexity, Gemini). Every page links
 * back to /ai-check as the authority hub.
 */
export const aiCheckVariants: AICheckVariantConfig[] = [
  {
    slug: "grammar-checker",
    title: "AI Grammar Checker Online | Docsora AI Check",
    metaDescription:
      "Check grammar, spelling and writing clarity online instantly with Docsora AI Check. Improve reports, business documents, PDFs and presentations with AI-powered proofreading.",
    h1: "AI Grammar Checker Online",
    intro:
      "Check grammar, spelling, punctuation and clarity instantly in your browser - built for professional writing, not student essays.",
    keyword: "ai grammar checker",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: CheckCircle2,
    cardLabel: "Grammar Checker",
    cardDescription:
      "Catch grammar, spelling and punctuation issues across business documents in seconds.",
    longCopy:
      "Docsora's online AI grammar checker reviews reports, contracts, proposals, decks and PDFs for grammar, spelling, tone and clarity - directly in your browser. Built for operational writing, not academic copy, with format-aware analysis across TXT, DOC, DOCX, ODT, PDF, HTML, PPT and PPTX.",
    useCases: [
      "Check business reports for grammar mistakes",
      "Proofread investor and sales decks",
      "Review contracts for clarity issues",
      "Improve client deliverables before sending",
      "Polish onboarding documentation",
      "Catch typos in PDFs and exports",
    ],
    faq: [
      {
        question: "How does the AI grammar checker work?",
        answer:
          "Upload any document or paste your text and Docsora AI Check runs language-model proofreading that flags grammar, spelling, punctuation, tone and clarity issues with inline suggestions you can accept, reject or refine - all in your browser.",
      },
      {
        question: "Is the grammar checker free?",
        answer:
          "Yes. Docsora's AI grammar checker is free to use for standard documents - no signup, no daily caps for typical professional workflows. Pro unlocks batch review and longer documents.",
      },
    ],
  },
  {
    slug: "proofread-pdf",
    title: "Proofread PDF Documents Online | AI PDF Checker | Docsora",
    metaDescription:
      "Proofread PDF files online with AI-powered grammar and writing analysis designed for business reports, contracts and professional workflows.",
    h1: "Proofread PDF Documents Online",
    intro:
      "Upload any PDF and receive AI-powered grammar, spelling and clarity suggestions - without converting, copying text out, or installing software.",
    keyword: "proofread pdf",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Proofread PDF",
    cardDescription:
      "Review PDF reports, contracts and proposals for grammar and writing clarity.",
    longCopy:
      "Docsora's online PDF proofreader extracts the readable text from any PDF and runs AI-powered analysis for grammar, spelling, tone and clarity. Ideal for reviewing client reports, signed contracts, financial statements and proposals before they're shared externally - directly in your browser with privacy-first processing.",
    useCases: [
      "Proofread investor reports as PDFs",
      "Review signed contract drafts",
      "Check financial statements for typos",
      "Polish PDF proposals before sending",
      "Review case files and briefs",
      "Audit policy PDFs for clarity",
    ],
    faq: [
      {
        question: "How do I proofread a PDF online?",
        answer:
          "Drop a PDF into the upload area above. Docsora extracts the text, runs AI proofreading for grammar, spelling, tone and clarity, and returns inline suggestions you can review one by one - no Word conversion, no copy-paste, no installs.",
      },
      {
        question: "Does Docsora preserve the original PDF formatting?",
        answer:
          "Yes. Proofreading is non-destructive - your original PDF stays untouched. Suggestions are surfaced in a side-by-side review view, and exports preserve original layout where possible.",
      },
    ],
  },
  {
    slug: "ai-writing-assistant",
    title: "AI Writing Assistant for Business Documents | Docsora AI Check",
    metaDescription:
      "An AI writing assistant for professional documents, reports, proposals and presentations. Improve clarity, grammar and tone instantly in your browser.",
    h1: "AI Writing Assistant",
    intro:
      "An AI writing assistant built for business documents - improve tone, clarity, grammar and structure across reports, proposals and decks.",
    keyword: "ai writing assistant",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: Sparkles,
    cardLabel: "AI Writing Assistant",
    cardDescription:
      "AI-powered writing improvements for reports, proposals, decks and contracts.",
    longCopy:
      "Docsora's AI writing assistant analyzes professional writing the way an executive editor would: catching grammar issues, sharpening tone, removing ambiguity, and tightening structure for reports, proposals, contracts and presentations. Operational by design - not built for student essays.",
    useCases: [
      "Improve executive summaries",
      "Sharpen sales proposals",
      "Refine RFP responses",
      "Polish board memos",
      "Tighten partnership briefs",
      "Improve internal comms",
    ],
    faq: [
      {
        question: "Is this AI writing assistant built for business documents?",
        answer:
          "Yes. Docsora AI Check is engineered for professional writing workflows - reports, contracts, proposals, decks and operational documentation - not generic copywriting or academic essays.",
      },
      {
        question: "Can I choose the writing tone?",
        answer:
          "Yes. After the grammar pass, Docsora offers executive, legal, simple and marketing tone presets so suggestions match the document's audience.",
      },
    ],
  },
  {
    slug: "check-contract-language",
    title: "AI Contract Language Checker | Professional Document Review | Docsora",
    metaDescription:
      "Review contract wording, grammar and clarity online with AI-powered document analysis built for legal and business workflows.",
    h1: "AI Contract Language Checker",
    intro:
      "Review contracts, NDAs and legal drafts for grammar, ambiguity and clarity issues before signature or external review.",
    keyword: "ai contract review",
    acceptedFormats: "PDF · DOC · DOCX · TXT",
    cardIcon: Scale,
    cardLabel: "Check Contract Language",
    cardDescription:
      "AI-powered review of contract language, grammar and clarity for legal workflows.",
    longCopy:
      "Docsora's AI contract language checker reviews contracts, NDAs, MSAs and legal drafts for grammar, ambiguity, inconsistent terminology and clarity issues. It's an editorial layer for legal teams - it flags wording risks and suggests cleaner phrasing without replacing legal judgement.",
    useCases: [
      "Pre-review NDAs before sending",
      "Audit MSAs for ambiguous wording",
      "Check vendor contracts for clarity",
      "Review employment agreements",
      "Polish partnership terms",
      "Tighten SLA language",
    ],
    faq: [
      {
        question: "Can I check contracts for grammar mistakes online?",
        answer:
          "Yes. Upload a contract in PDF, DOC, DOCX or TXT and Docsora AI Check returns grammar, clarity and consistency suggestions inline - secure, browser-based, with files deleted after processing.",
      },
      {
        question: "Does Docsora replace a legal review?",
        answer:
          "No. Docsora is an editorial layer that strengthens contract language and clarity. It does not provide legal advice or replace counsel - it complements human legal review.",
      },
    ],
  },
  {
    slug: "improve-business-writing",
    title: "Improve Business Writing Online with AI | Docsora AI Check",
    metaDescription:
      "Improve business writing instantly with AI-powered grammar, tone and clarity analysis. Built for reports, proposals, contracts and presentations.",
    h1: "Improve Business Writing Instantly",
    intro:
      "Sharpen reports, proposals, emails and decks with AI-powered grammar, tone and clarity improvements - directly in your browser.",
    keyword: "improve business writing",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: Briefcase,
    cardLabel: "Improve Business Writing",
    cardDescription:
      "AI-powered grammar, tone and clarity for professional business documents.",
    longCopy:
      "Docsora's AI business writing tool reviews professional documents for grammar, tone, structure and clarity. It's designed for the documents teams actually send - investor updates, internal memos, sales proposals, board reports and client deliverables - not academic essays or marketing copy.",
    useCases: [
      "Improve investor updates",
      "Sharpen board reports",
      "Polish client proposals",
      "Tighten internal memos",
      "Refine executive emails",
      "Improve project briefs",
    ],
    faq: [
      {
        question: "Can I improve business writing online?",
        answer:
          "Yes. Docsora AI Check analyzes business writing for grammar, clarity, tone and structure - and surfaces inline suggestions you can accept, reject or refine. Works on reports, proposals, contracts, decks and PDFs in your browser.",
      },
      {
        question: "Is this different from a generic grammar checker?",
        answer:
          "Yes. Docsora is tuned for business and operational writing - it considers tone, professional clarity and document context, not just spelling and grammar.",
      },
    ],
  },
  {
    slug: "proofread-presentations",
    title: "Proofread PowerPoint Presentations Online | AI Slide Checker | Docsora",
    metaDescription:
      "Proofread PowerPoint presentations with AI-powered grammar, tone and clarity review. Polish slides before meetings, pitches and client delivery.",
    h1: "Proofread PowerPoint Presentations",
    intro:
      "Upload PPT or PPTX decks and let AI review every slide for grammar, tone, clarity and professional polish before you present.",
    keyword: "proofread presentations",
    acceptedFormats: "PPT · PPTX",
    cardIcon: Presentation,
    cardLabel: "Proofread Presentations",
    cardDescription:
      "AI grammar, tone and clarity review for pitch decks and presentations.",
    longCopy:
      "Docsora's AI presentation proofreader extracts the text from every slide of a PPT or PPTX deck and runs grammar, spelling, tone and clarity analysis - ideal for investor decks, sales presentations, client pitches and training material. Slides stay intact; only the wording is reviewed.",
    useCases: [
      "Polish investor pitch decks",
      "Proofread sales presentations",
      "Review training slide decks",
      "Tighten board update slides",
      "Audit client kickoff decks",
      "Refine product launch slides",
    ],
    faq: [
      {
        question: "Can I review PowerPoint presentations for grammar?",
        answer:
          "Yes. Upload a PPT or PPTX deck and Docsora AI Check extracts text from every slide and runs AI grammar, tone and clarity analysis - returning suggestions slide by slide without altering your design.",
      },
      {
        question: "Does Docsora preserve slide design?",
        answer:
          "Yes. Only the slide text is analyzed - your layout, theme, fonts and visual hierarchy stay untouched.",
      },
    ],
  },
  {
    slug: "check-document-for-errors",
    title: "Check Document for Errors Online | AI Document Review | Docsora",
    metaDescription:
      "Check any document for grammar, spelling and clarity errors with AI-powered review. Supports PDF, Word, PowerPoint and more.",
    h1: "Check Document for Errors",
    intro:
      "Run a full grammar, spelling and clarity audit on any document - PDF, Word, PowerPoint or plain text - in seconds.",
    keyword: "check document for errors",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: FileSearch,
    cardLabel: "Check Document for Errors",
    cardDescription:
      "Run a complete AI grammar, spelling and clarity audit on any document.",
    longCopy:
      "Docsora's AI document review checks any business document for grammar, spelling, tone and clarity issues - across PDF, DOC, DOCX, ODT, TXT, HTML, PPT and PPTX. Built for teams that need to catch errors before sharing externally, with format-aware analysis and one-click acceptance.",
    useCases: [
      "Final-pass review before sending",
      "Audit reports for typos",
      "Catch issues in legal drafts",
      "Polish handover documents",
      "Review HR documentation",
      "Check policy documents",
    ],
    faq: [
      {
        question: "How does Docsora check documents for errors?",
        answer:
          "Drop any supported document into the upload area and Docsora's AI runs a grammar, spelling, punctuation, tone and clarity audit. Issues are surfaced inline with the original context, severity and a suggested fix.",
      },
      {
        question: "What types of errors does it catch?",
        answer:
          "Grammar, spelling, punctuation, inconsistent terminology, awkward phrasing, tone misalignment and clarity issues - tuned for professional and operational documents.",
      },
    ],
  },
  {
    slug: "fix-grammar-online",
    title: "Fix Grammar Mistakes Online | AI Grammar Fixer | Docsora",
    metaDescription:
      "Fix grammar mistakes online with AI-powered proofreading. Free, browser-based grammar fixing for documents, reports, PDFs and presentations.",
    h1: "Fix Grammar Mistakes Online",
    intro:
      "Find and fix grammar mistakes across any business document with AI-powered suggestions - free and entirely in your browser.",
    keyword: "fix grammar online",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: PenLine,
    cardLabel: "Fix Grammar Online",
    cardDescription:
      "Find and fix grammar mistakes across documents instantly in your browser.",
    longCopy:
      "Docsora's online AI grammar fixer surfaces every grammar, punctuation and clarity issue in a document and suggests a clean fix you can accept one by one - or apply all safe corrections at once. Free, browser-based and built for professional writing workflows.",
    useCases: [
      "Quick pre-send grammar check",
      "Fix typos in client emails",
      "Polish first drafts",
      "Catch grammar in slide notes",
      "Audit translations",
      "Fix mistakes in PDFs",
    ],
    faq: [
      {
        question: "How do I fix grammar mistakes online?",
        answer:
          "Upload a document or paste your text into Docsora AI Check. The grammar fixer flags every issue and proposes a clean replacement - accept individual fixes or apply all safe corrections in one click.",
      },
      {
        question: "Is grammar fixing free with Docsora?",
        answer:
          "Yes. Standard documents are free with no signup. Pro unlocks longer documents, batch processing and team workflows.",
      },
    ],
  },
  {
    slug: "professional-writing-checker",
    title: "Professional Writing Checker | Business Writing AI | Docsora",
    metaDescription:
      "AI-powered professional writing checker for business reports, contracts and decks. Improve clarity, grammar and tone in your browser.",
    h1: "Professional Writing Checker",
    intro:
      "An AI checker for serious professional writing - tuned for executive documents, contracts and high-stakes deliverables.",
    keyword: "professional writing checker",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: Edit3,
    cardLabel: "Professional Writing Checker",
    cardDescription:
      "AI checker for executive writing, contracts and high-stakes business documents.",
    longCopy:
      "Docsora's professional writing checker is engineered for documents that go to executives, clients and regulators - reports, contracts, proposals, board memos and decks. It flags grammar, tone and clarity issues with editorial precision instead of generic copywriting suggestions.",
    useCases: [
      "Review C-suite memos",
      "Audit regulatory filings",
      "Check client-facing reports",
      "Polish board update decks",
      "Refine partnership proposals",
      "Tighten compliance documents",
    ],
    faq: [
      {
        question: "What makes this a professional writing checker?",
        answer:
          "Docsora is tuned for executive and operational writing - it weighs tone, clarity, structure and consistency, not just grammar. The tone presets (executive, legal, simple, marketing) match the audience of the document.",
      },
      {
        question: "Is it secure for sensitive business documents?",
        answer:
          "Yes. Uploads run over TLS, files are deleted after processing, and Docsora is operated under ISO 27001 controls aligned with SOC 2 and GDPR.",
      },
    ],
  },
  {
    slug: "proofreading-tool-online",
    title: "Free Online Proofreading Tool | AI Proofreader | Docsora",
    metaDescription:
      "A free online proofreading tool powered by AI. Review grammar, spelling, tone and clarity across PDF, Word, PowerPoint and more.",
    h1: "Free Online Proofreading Tool",
    intro:
      "A complete browser-based proofreading tool - AI-powered, format-aware and built for professional documents.",
    keyword: "proofreading tool online",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: ShieldCheck,
    cardLabel: "Online Proofreading Tool",
    cardDescription:
      "Free AI proofreader for PDF, Word, PowerPoint and business documents.",
    longCopy:
      "Docsora's online proofreading tool runs AI-powered grammar, spelling, punctuation, tone and clarity analysis on every major business format. Free, browser-based, secure - and built to replace switching between desktop proofreaders, copy-pasting into web tools, or converting files just to spell-check.",
    useCases: [
      "Proofread reports before sharing",
      "Audit drafts in your browser",
      "Replace desktop proofreaders",
      "Check translated documents",
      "Review handover notes",
      "Polish onboarding packets",
    ],
    faq: [
      {
        question: "Is the online proofreading tool free?",
        answer:
          "Yes. Standard documents are free with no signup. The free tier covers everyday professional proofreading workflows. Pro unlocks longer documents and batch review for teams.",
      },
      {
        question: "Do I need to install anything?",
        answer:
          "No. Docsora is fully browser-based - no installs, no plugins, no extensions. Open the page, drop a file, get suggestions.",
      },
    ],
  },
  {
    slug: "document-proofreader",
    title: "Document Proofreader for Professional Teams | Docsora AI Check",
    metaDescription:
      "A document proofreader engineered for professional teams. Audit contracts, board reports, investor decks and operational documentation with editorial-grade AI.",
    h1: "Document Proofreader for Professional Teams",
    intro:
      "An editorial document review layer for contracts, board reports, investor communications and operational documentation.",
    keyword: "document proofreader",
    acceptedFormats: "TXT · DOC · DOCX · ODT · PDF · HTML · PPT · PPTX",
    cardIcon: BookOpenCheck,
    cardLabel: "Document Proofreader",
    cardDescription:
      "Editorial document review for contracts, board reports and operational documentation.",
    longCopy:
      "Docsora's document proofreader applies editorial-grade language analysis to the documents teams actually circulate - board packs, compliance memos, investor updates, sales proposals and onboarding handbooks. It reads structure, tone and consistency at the document level rather than rewriting line by line.",
    useCases: [
      "Review board packs before circulation",
      "Audit compliance documentation for clarity",
      "Proofread investor updates and shareholder letters",
      "Sharpen consulting deliverables",
      "Review onboarding handbooks and policy guides",
      "Tighten financial summaries and quarterly memos",
    ],
    faq: [
      {
        question: "What is a document proofreader used for?",
        answer:
          "A document proofreader is the editorial layer professional teams run before circulating a document - catching grammar, ambiguity, tone misalignment and structural inconsistencies across reports, contracts and decks. Docsora's proofreader is workflow-aware, designed for documents that go to boards, clients, regulators and investors.",
      },
      {
        question: "How is this different from a generic grammar tool?",
        answer:
          "Generic grammar tools focus on sentence-level correctness. Docsora operates at the document level - tracking tone across sections, surfacing ambiguous contract language, and respecting the format and structure of business reports, slide decks and PDFs.",
      },
    ],
  },
];

export const aiCheckVariantBySlug = Object.fromEntries(
  aiCheckVariants.map((v) => [v.slug, v]),
);