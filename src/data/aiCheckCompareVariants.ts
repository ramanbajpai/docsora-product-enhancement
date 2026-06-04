export interface AICompareFeatureRow {
  feature: string;
  docsora: string;
  competitor: string;
}

export interface AICompareFAQ {
  question: string;
  answer: string;
}

export interface AICompareVariantConfig {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  overview: string;
  features: AICompareFeatureRow[];
  quality: AICompareFeatureRow[];
  security: AICompareFeatureRow[];
  experience: AICompareFeatureRow[];
  fileSupport: AICompareFeatureRow[];
  workflow: string[];
  faq: AICompareFAQ[];
}

export const aiCheckCompareVariants: AICompareVariantConfig[] = [
  {
    slug: "compare/docsora-vs-grammarly",
    competitor: "Grammarly",
    cardTitle: "Docsora vs Grammarly",
    cardSummary:
      "Compare AI proofreading depth, document format support, business writing tone and workflow integration.",
    title: "Docsora vs Grammarly - Grammarly Alternative for Business Writing | Docsora",
    metaDescription:
      "Looking for a Grammarly alternative built for business documents? Compare Docsora and Grammarly on AI proofreading, document formats, tone control and security.",
    h1: "Docsora vs Grammarly",
    heroSubtitle:
      "An analytical look at how Docsora and Grammarly compare for AI-powered professional document review.",
    overview:
      "Grammarly is a general-purpose grammar and writing assistant focused on browser extensions and short-form text. Docsora AI Check is an operational document review layer built for business documents - reports, contracts, decks and PDFs - inside a single premium workspace alongside e-signing, storage and tracking.",
    features: [
      { feature: "AI proofreading", docsora: "Yes - tuned for business writing", competitor: "Yes - general-purpose" },
      { feature: "Native PDF review", docsora: "Yes - direct PDF upload", competitor: "Limited - extension-based" },
      { feature: "PowerPoint slide review", docsora: "Yes - PPT / PPTX", competitor: "Not native" },
      { feature: "Tone presets", docsora: "Executive, legal, simple, marketing", competitor: "General tone suggestions" },
      { feature: "Unified workspace", docsora: "Review, sign, store, track in one app", competitor: "Standalone assistant" },
    ],
    quality: [
      { feature: "Suggestion accuracy", docsora: "Context-aware, business-tuned", competitor: "Strong for general writing" },
      { feature: "Operational tone analysis", docsora: "Built-in", competitor: "Limited" },
      { feature: "Clarity and structure feedback", docsora: "Yes", competitor: "Yes" },
      { feature: "Inline accept / reject flow", docsora: "Side-by-side with severity", competitor: "Inline browser overlay" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "Account-based storage" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Document-first workflow", docsora: "Upload and review documents end-to-end", competitor: "Extension overlays text fields" },
      { feature: "Account required", docsora: "No for standard documents", competitor: "Required" },
      { feature: "Browser-only", docsora: "Yes - no installs", competitor: "Browser + desktop + extensions" },
    ],
    fileSupport: [
      { feature: "PDF", docsora: "Native upload + review", competitor: "Limited" },
      { feature: "DOC / DOCX / ODT", docsora: "Supported", competitor: "Supported" },
      { feature: "PPT / PPTX", docsora: "Supported", competitor: "Not native" },
      { feature: "HTML / TXT", docsora: "Supported", competitor: "Supported" },
      { feature: "Pasted text", docsora: "Supported", competitor: "Supported" },
    ],
    workflow: [
      "Business teams reviewing reports, proposals and decks before sharing",
      "Legal teams pre-reviewing contracts for clarity",
      "Operations teams that need PDF + slide review in one tool",
      "Companies that want document review next to e-sign and storage",
    ],
    faq: [
      {
        question: "Does Docsora review PDFs and slides like Grammarly?",
        answer:
          "Docsora reviews PDFs and PowerPoint decks natively as uploaded files, which Grammarly's extension-based model handles less directly. Suggestions appear in a structured side-by-side review.",
      },
      {
        question: "Is it tuned for business writing?",
        answer:
          "Yes. Docsora's tone presets (executive, legal, simple, marketing) and clarity analysis are built for professional and operational documents, not general-purpose copy.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-quillbot",
    competitor: "QuillBot",
    cardTitle: "Docsora vs QuillBot",
    cardSummary:
      "Compare AI document review, paraphrasing focus, business writing depth and workflow flexibility.",
    title: "Docsora vs QuillBot - QuillBot Alternative for Document Review | Docsora",
    metaDescription:
      "Looking for a QuillBot alternative for business document review? Compare Docsora and QuillBot on AI proofreading, file formats, tone and security.",
    h1: "Docsora vs QuillBot",
    heroSubtitle:
      "An honest side-by-side look at Docsora and QuillBot for AI-powered document review.",
    overview:
      "QuillBot focuses primarily on paraphrasing, summarization and short-form rewriting. Docsora AI Check focuses on full-document professional review - grammar, tone, clarity and consistency across PDFs, Word documents, decks and contracts, with a structured suggestion-by-suggestion review flow.",
    features: [
      { feature: "Full-document review", docsora: "Yes - end-to-end audit", competitor: "Paragraph-level paraphrasing" },
      { feature: "Native file uploads", docsora: "PDF, DOC, DOCX, PPT, PPTX, ODT, HTML, TXT", competitor: "Limited - text-first" },
      { feature: "Business writing tone control", docsora: "Executive, legal, simple, marketing", competitor: "Paraphrase modes" },
      { feature: "Inline accept / reject suggestions", docsora: "Severity-tagged", competitor: "Rewrite-only" },
      { feature: "Unified workspace", docsora: "Review, sign, store, track", competitor: "Standalone" },
    ],
    quality: [
      { feature: "Suggestion depth", docsora: "Grammar + tone + clarity + structure", competitor: "Rewrite + grammar" },
      { feature: "Document context awareness", docsora: "Whole-document", competitor: "Mostly per-paragraph" },
      { feature: "Tone presets", docsora: "Built-in", competitor: "Paraphrase styles" },
      { feature: "Inline original / suggested view", docsora: "Yes", competitor: "Rewrite-focused" },
    ],
    security: [
      { feature: "End-to-end TLS encryption", docsora: "Yes", competitor: "Yes" },
      { feature: "Automatic file deletion", docsora: "After processing", competitor: "Varies" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Limited disclosure" },
      { feature: "SOC 2 aligned", docsora: "Aligned", competitor: "Limited disclosure" },
    ],
    experience: [
      { feature: "Workflow", docsora: "Upload, audit, accept fixes", competitor: "Paste and rewrite" },
      { feature: "Account required", docsora: "No for standard documents", competitor: "Required for full features" },
      { feature: "Cross-format support", docsora: "PDF, Word, PowerPoint, HTML, TXT", competitor: "Primarily text" },
    ],
    fileSupport: [
      { feature: "PDF", docsora: "Supported", competitor: "Limited" },
      { feature: "DOC / DOCX", docsora: "Supported", competitor: "Limited" },
      { feature: "PPT / PPTX", docsora: "Supported", competitor: "Not native" },
      { feature: "HTML / TXT", docsora: "Supported", competitor: "Supported" },
      { feature: "Pasted text", docsora: "Supported", competitor: "Supported" },
    ],
    workflow: [
      "Teams that need full-document audits, not just paraphrasing",
      "Legal and finance teams reviewing contracts and reports",
      "Sales teams polishing investor decks slide by slide",
      "Operations teams running pre-send writing audits",
    ],
    faq: [
      {
        question: "Is Docsora a free QuillBot alternative?",
        answer:
          "Yes. Docsora AI Check offers free browser-based document review with native PDF, Word and PowerPoint support, focused on full-document grammar and clarity rather than paraphrasing.",
      },
      {
        question: "Does Docsora paraphrase content like QuillBot?",
        answer:
          "Docsora's focus is editorial document review - improving grammar, clarity, tone and consistency. After grammar fixes, tone presets can rephrase passages for executive, legal, simple or marketing audiences.",
      },
      {
        question: "Can I review entire documents, not just paragraphs?",
        answer:
          "Yes. Docsora is designed for full-document review with severity-tagged inline suggestions, not just paragraph-by-paragraph rewriting.",
      },
    ],
  },
];

export const aiCheckCompareVariantBySlug = aiCheckCompareVariants.reduce<
  Record<string, AICompareVariantConfig>
>((acc, v) => {
  acc[v.slug] = v;
  return acc;
}, {});