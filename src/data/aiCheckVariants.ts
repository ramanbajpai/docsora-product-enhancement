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
  GraduationCap,
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
  {
    slug: "review-board-reports",
    title: "Review Board Reports with AI | Editorial Audit | Docsora",
    metaDescription:
      "Run a final editorial pass on board reports, executive summaries and quarterly memos. AI-powered grammar, tone and clarity review for board-grade documents.",
    h1: "Review Board Reports with Editorial AI",
    intro:
      "An editorial layer for board packs, executive summaries and quarterly memos - before they reach directors.",
    keyword: "review board reports",
    acceptedFormats: "PDF · DOC · DOCX · PPT · PPTX",
    cardIcon: Building2,
    cardLabel: "Review Board Reports",
    cardDescription:
      "Editorial review for board packs, exec summaries and quarterly memos.",
    longCopy:
      "Docsora reviews board reports, exec summaries and quarterly updates the way a chief of staff would - tightening tone, flagging inconsistent terminology, and surfacing structural clarity gaps before the document reaches the board. Built for finance, operations and CEO offices preparing audit-grade material under deadline.",
    useCases: [
      "Final pass on quarterly board packs",
      "Tighten exec summaries before distribution",
      "Audit financial commentary for clarity",
      "Align terminology across sections",
      "Sharpen risk and compliance language",
      "Polish CEO and CFO commentary",
    ],
    faq: [
      {
        question: "Can Docsora review confidential board reports?",
        answer:
          "Yes. Uploads run over TLS, documents are deleted after analysis, and Docsora operates under ISO 27001 controls aligned with SOC 2 and GDPR. Finance and operations teams use it for pre-board reviews precisely because content never leaves the review environment or trains models.",
      },
      {
        question: "What does an editorial AI catch on a board report?",
        answer:
          "Grammar and spelling, but also tone misalignment, inconsistent terminology across sections, ambiguous risk language, weak transitions, and structural clarity gaps - the issues that erode credibility with directors when the document is read end-to-end.",
      },
    ],
  },
  {
    slug: "proofread-investor-updates",
    title: "Proofread Investor Updates with AI | Docsora AI Check",
    metaDescription:
      "Polish investor updates, shareholder letters and partner memos with AI-powered grammar, tone and clarity review. Built for founder and IR teams.",
    h1: "Proofread Investor Updates with AI",
    intro:
      "An editorial review layer for monthly investor updates, shareholder letters and partner memos - before they hit inboxes.",
    keyword: "proofread investor updates",
    acceptedFormats: "PDF · DOC · DOCX · TXT · HTML",
    cardIcon: TrendingUp,
    cardLabel: "Proofread Investor Updates",
    cardDescription:
      "AI review for investor updates, shareholder letters and partner memos.",
    longCopy:
      "Docsora's editorial AI reviews investor communications for the things investors notice first - inconsistent metrics, ambiguous commentary, weak narrative flow and tone drift between sections. Ideal for founder offices, IR teams and portfolio managers sending monthly updates, year-in-review letters and partner memos.",
    useCases: [
      "Monthly investor updates",
      "Year-in-review shareholder letters",
      "Fundraising commentary",
      "Quarterly portfolio memos",
      "Acquisition announcements",
      "Strategic narrative drafts",
    ],
    faq: [
      {
        question: "Can I proofread an investor update online?",
        answer:
          "Yes. Drop a draft into Docsora AI Check - in PDF, DOC, DOCX, TXT or HTML - and the editorial AI reviews tone, clarity and consistency. The executive tone preset is calibrated for IR and shareholder communications.",
      },
      {
        question: "Is content kept private?",
        answer:
          "Yes. Documents are processed inside an isolated review environment, encrypted in transit, deleted after analysis and never used for training. Standard for founder offices and IR teams.",
      },
    ],
  },
  {
    slug: "audit-compliance-documentation",
    title: "Audit Compliance Documentation with AI | Docsora AI Check",
    metaDescription:
      "Audit compliance documentation, regulatory filings and policy memos for clarity, ambiguity and terminology consistency with AI-powered review.",
    h1: "Audit Compliance Documentation with AI",
    intro:
      "Surface ambiguity, inconsistent terminology and clarity gaps across compliance documentation, regulatory filings and policy memos.",
    keyword: "audit compliance documentation",
    acceptedFormats: "PDF · DOC · DOCX · TXT",
    cardIcon: ClipboardCheck,
    cardLabel: "Audit Compliance Documentation",
    cardDescription:
      "AI editorial review for compliance documentation, policy memos and regulatory filings.",
    longCopy:
      "Docsora reviews compliance documentation the way a senior reviewer would - flagging ambiguous wording, inconsistent terminology, and clarity gaps that trigger follow-up questions from regulators, auditors and internal review boards. It is an editorial layer that strengthens the language of compliance, not a substitute for compliance review itself.",
    useCases: [
      "Regulatory filings and submissions",
      "Policy memos and standards",
      "Compliance training material",
      "Risk assessment narratives",
      "Audit response letters",
      "Internal control documentation",
    ],
    faq: [
      {
        question: "Does this replace compliance or legal review?",
        answer:
          "No. Docsora is an editorial layer that improves the clarity and consistency of compliance language. Compliance, legal and regulatory review by qualified human reviewers remains essential.",
      },
      {
        question: "What file types are supported?",
        answer:
          "PDF, DOC, DOCX and TXT - the formats compliance documentation typically ships in. Documents are processed in your browser and deleted after analysis.",
      },
    ],
  },
  {
    slug: "proofread-rfps",
    title: "Proofread RFPs and Proposals with AI | Docsora AI Check",
    metaDescription:
      "AI-powered review for RFP responses, sales proposals and statements of work. Tighten tone, eliminate ambiguity and polish proposals before delivery.",
    h1: "Proofread RFP Responses and Sales Proposals",
    intro:
      "Editorial review tuned for RFP responses, sales proposals, SOWs and pitch responses - before they go to the buyer.",
    keyword: "proofread rfp",
    acceptedFormats: "PDF · DOC · DOCX · PPT · PPTX",
    cardIcon: FileSignature,
    cardLabel: "Proofread RFPs",
    cardDescription:
      "AI proposal review for RFP responses, SOWs and sales decks.",
    longCopy:
      "Docsora reviews RFP responses, sales proposals, statements of work and pitch documents for the issues that quietly cost deals - inconsistent terminology between sections, weak win themes, ambiguous scope, and tone misalignment between executive summary and technical detail. A final editorial pass that makes the proposal feel built by one team, not five.",
    useCases: [
      "RFP and RFI responses",
      "Enterprise sales proposals",
      "Statements of work (SOWs)",
      "Pitch decks and pricing memos",
      "Renewal and expansion proposals",
      "Public sector tender responses",
    ],
    faq: [
      {
        question: "Can I review a full RFP response in one pass?",
        answer:
          "Yes. Docsora reviews the document end-to-end - executive summary, technical sections, pricing commentary and appendices - in a single pass and surfaces inline suggestions by section so reviewers can move from start to finish without context-switching.",
      },
      {
        question: "Does it work on PowerPoint and PDF proposals?",
        answer:
          "Yes. Upload PDF, DOC, DOCX, PPT or PPTX. Docsora handles each format natively - slide decks are reviewed slide-by-slide while documents are reviewed by section.",
      },
    ],
  },
  {
    slug: "improve-onboarding-documents",
    title: "Improve Onboarding Documents with AI | Docsora AI Check",
    metaDescription:
      "Sharpen HR onboarding documents, training material and policy guides with AI-powered editorial review for clarity, tone and readability.",
    h1: "Improve Onboarding Documents with AI",
    intro:
      "Editorial review for HR onboarding documents, training material and policy guides - so new hires read documents that actually make sense.",
    keyword: "improve onboarding documents",
    acceptedFormats: "PDF · DOC · DOCX · ODT · HTML · PPT · PPTX",
    cardIcon: GraduationCap,
    cardLabel: "Improve Onboarding Documents",
    cardDescription:
      "AI editorial review for HR handbooks, training material and policy guides.",
    longCopy:
      "Docsora's editorial AI improves the clarity and tone of onboarding documents, training material and policy guides - the documents most new hires read once and never revisit. The simple tone preset removes jargon, the consistency check aligns terminology across sections, and the structural review surfaces gaps that confuse first-week readers.",
    useCases: [
      "Employee onboarding handbooks",
      "Training and enablement guides",
      "HR policies and benefits docs",
      "Engineering onboarding wikis",
      "Customer onboarding playbooks",
      "Partner training material",
    ],
    faq: [
      {
        question: "What tone is best for onboarding documents?",
        answer:
          "Simple. Docsora's simple tone preset strips jargon and tightens structure for first-week readers - while keeping the document's voice intact.",
      },
      {
        question: "Can I review training decks and PDFs together?",
        answer:
          "Yes. A single workspace handles PDF policies, DOCX handbooks and PPTX training decks - so HR and enablement teams can run one editorial pass instead of three.",
      },
    ],
  },
  {
    slug: "review-consulting-deliverables",
    title: "Review Consulting Deliverables with AI | Docsora AI Check",
    metaDescription:
      "AI editorial review for consulting deliverables, client reports and strategy memos. Tighten narrative, align terminology and polish before delivery.",
    h1: "Review Consulting Deliverables with AI",
    intro:
      "Editorial review for client-facing reports, strategy memos and engagement summaries - the deliverables consulting teams ship every week.",
    keyword: "review consulting deliverables",
    acceptedFormats: "PDF · DOC · DOCX · PPT · PPTX",
    cardIcon: Briefcase,
    cardLabel: "Review Consulting Deliverables",
    cardDescription:
      "AI editorial pass for client reports, strategy memos and engagement summaries.",
    longCopy:
      "Docsora reviews consulting deliverables for what partners and clients actually notice - narrative flow, terminology consistency across workstreams, and tone alignment between executive summary and detailed findings. Built for engagement teams that need a polished final pass without booking a full editorial review.",
    useCases: [
      "Final client reports",
      "Steering committee updates",
      "Strategy and diagnostic memos",
      "Workshop output documents",
      "Engagement closeout summaries",
      "Sales-stage consulting proposals",
    ],
    faq: [
      {
        question: "Can Docsora review long-form consulting reports?",
        answer:
          "Yes. Long reports are reviewed end-to-end with section-aware suggestions - so issues in the executive summary surface alongside issues in the appendix without separate passes.",
      },
      {
        question: "Does it handle PowerPoint deliverables?",
        answer:
          "Yes. Decks are reviewed slide-by-slide; layout, charts and master slides are untouched while wording is analysed for grammar, tone and clarity.",
      },
    ],
  },
  {
    slug: "review-operational-handbooks",
    title: "Review Operational Handbooks with AI | Docsora AI Check",
    metaDescription:
      "Standardise SOPs, playbooks and operational handbooks with AI-powered editorial review for clarity, terminology consistency and structure.",
    h1: "Review Operational Handbooks with AI",
    intro:
      "Editorial review for SOPs, playbooks, runbooks and operational handbooks - so the team reads documents that read the same.",
    keyword: "review operational handbooks",
    acceptedFormats: "PDF · DOC · DOCX · ODT · HTML",
    cardIcon: Library,
    cardLabel: "Review Operational Handbooks",
    cardDescription:
      "AI editorial review for SOPs, playbooks and operational handbooks.",
    longCopy:
      "Docsora reviews operational documentation the way an editor would - aligning terminology across modules, standardising tone between contributors, and surfacing structural gaps that make handbooks hard to follow. Ideal for operations, customer success, engineering and revenue teams maintaining living documentation.",
    useCases: [
      "Standard operating procedures",
      "Customer success playbooks",
      "Engineering runbooks",
      "Sales enablement handbooks",
      "Support escalation guides",
      "Internal process documentation",
    ],
    faq: [
      {
        question: "Can I standardise tone across multiple authors?",
        answer:
          "Yes. Docsora's tone presets normalise voice across modules so handbooks written by different contributors read as one document. The simple and executive presets cover most operational documentation.",
      },
      {
        question: "Does it work on long handbooks?",
        answer:
          "Yes. Whole-document review handles long handbooks without splitting them into chunks. Issues surface inline with the original section for fast review.",
      },
    ],
  },
  {
    slug: "review-contracts-online",
    title: "Review Contracts Online with AI | Editorial Contract Review | Docsora",
    metaDescription:
      "Review contracts online with AI-powered editorial analysis for grammar, ambiguous wording and terminology consistency. Built for legal and ops teams.",
    h1: "Review Contracts Online with Editorial AI",
    intro:
      "An editorial layer for contracts, NDAs, MSAs and vendor agreements - clean the language before it reaches counsel or counterparty.",
    keyword: "review contracts online",
    acceptedFormats: "PDF · DOC · DOCX · TXT",
    cardIcon: Handshake,
    cardLabel: "Review Contracts Online",
    cardDescription:
      "AI editorial review for contracts, NDAs and vendor agreements.",
    longCopy:
      "Docsora reviews contracts as language documents - flagging grammar, ambiguous wording, inconsistent defined terms and clarity issues that slow down legal review and confuse counterparties. It is an editorial layer for legal operations and in-house teams, not a replacement for legal advice or contract analytics.",
    useCases: [
      "Pre-review NDAs and MSAs",
      "Audit vendor agreements",
      "Tighten employment contracts",
      "Review partnership terms",
      "Polish SLA language",
      "Clean up redline drafts",
    ],
    faq: [
      {
        question: "Does this replace contract review by counsel?",
        answer:
          "No. Docsora is an editorial layer that improves contract language - grammar, defined-term consistency, ambiguity. Substantive legal review by qualified counsel remains essential.",
      },
      {
        question: "Is it secure for sensitive contracts?",
        answer:
          "Yes. Uploads travel over TLS, contracts are processed in an isolated environment, deleted after review and never used to train models. Operated under ISO 27001 controls aligned with SOC 2 and GDPR.",
      },
    ],
  },
];

export const aiCheckVariantBySlug = Object.fromEntries(
  aiCheckVariants.map((v) => [v.slug, v]),
);