export interface TranslateCompareFeatureRow {
  feature: string;
  docsora: string;
  competitor: string;
}

export interface TranslateCompareFAQ {
  question: string;
  answer: string;
}

export interface TranslateCompareVariantConfig {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  overview: string;
  features: TranslateCompareFeatureRow[];
  formats: TranslateCompareFeatureRow[];
  security: TranslateCompareFeatureRow[];
  experience: TranslateCompareFeatureRow[];
  workflow: string[];
  faq: TranslateCompareFAQ[];
}

export const translateCompareVariants: TranslateCompareVariantConfig[] = [
  {
    slug: "compare/docsora-vs-google-translate",
    competitor: "Google Translate",
    cardTitle: "Docsora vs Google Translate",
    cardSummary:
      "Compare whole-document translation, formatting preservation, and workflow capabilities.",
    title: "Docsora vs Google Translate — Document Translation Alternative | Docsora",
    metaDescription:
      "Looking for a Google Translate alternative for documents? Compare Docsora and Google Translate on whole-document translation, format preservation, and security.",
    h1: "Docsora vs Google Translate",
    heroSubtitle:
      "How Docsora and Google Translate compare for translating business documents, presentations, and contracts.",
    overview:
      "Google Translate is built for short text snippets and quick phrase translation. Docsora is a workflow-native document platform — whole-document translation in 75+ languages with formatting, slides, contracts, and operational documentation preserved end-to-end.",
    features: [
      { feature: "Whole-document translation", docsora: "Yes — PDF, DOCX, PPTX, HTML", competitor: "Limited" },
      { feature: "Formatting preservation", docsora: "Layouts, tables, fonts intact", competitor: "Often broken" },
      { feature: "Presentation translation", docsora: "Slide-by-slide PPTX", competitor: "Not native" },
      { feature: "Contract translation", docsora: "Clause structure preserved", competitor: "Text only" },
      { feature: "Operational workflows", docsora: "Share, sign, track in one workspace", competitor: "None" },
    ],
    formats: [
      { feature: "PDF", docsora: "Whole-document", competitor: "Basic" },
      { feature: "DOCX / DOC", docsora: "Whole-document", competitor: "Basic" },
      { feature: "PPTX / PPT", docsora: "Slide-by-slide", competitor: "Limited" },
      { feature: "HTML", docsora: "Tag-aware", competitor: "Limited" },
      { feature: "TXT / ODT", docsora: "Supported", competitor: "Supported" },
    ],
    security: [
      { feature: "Encrypted uploads (TLS)", docsora: "Yes", competitor: "Yes" },
      { feature: "No training on your data", docsora: "Yes", competitor: "Mixed" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Enterprise tier" },
    ],
    experience: [
      { feature: "Designed for business documents", docsora: "Yes", competitor: "Phrase translation" },
      { feature: "Browser-native workflow", docsora: "Yes", competitor: "Yes" },
      { feature: "Operational workspace", docsora: "Yes", competitor: "No" },
    ],
    workflow: [
      "Teams translating decks, contracts, and reports across regions",
      "Legal and HR teams needing clause-accurate translation",
      "Global sales teams localizing client proposals overnight",
      "Operations teams running SOPs in every regional language",
    ],
    faq: [
      {
        question: "Is Docsora a better Google Translate alternative for documents?",
        answer:
          "Yes — Google Translate is excellent for short phrases, but Docsora is purpose-built for translating whole documents, decks, and contracts while keeping formatting intact.",
      },
      {
        question: "Can Docsora translate PowerPoint and PDF files end-to-end?",
        answer:
          "Yes. Docsora translates PPTX and PDF documents into 75+ languages while preserving every slide, font, table, and layout — without copy-paste.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-deepl",
    competitor: "DeepL",
    cardTitle: "Docsora vs DeepL",
    cardSummary:
      "Compare document translation workflows, presentation support, and operational tooling.",
    title: "Docsora vs DeepL — Document Translation Alternative | Docsora",
    metaDescription:
      "Compare Docsora and DeepL on whole-document translation, presentation support, security, and operational workflows for global teams.",
    h1: "Docsora vs DeepL",
    heroSubtitle:
      "How Docsora and DeepL compare for translating business documents and presentations.",
    overview:
      "DeepL is a strong neural translator focused on text and document quality. Docsora is a multilingual document workspace — whole-document translation across PDFs, decks, contracts, and operational documentation, with sharing, signing, and tracking built in.",
    features: [
      { feature: "Whole-document translation", docsora: "Yes — all major formats", competitor: "Yes" },
      { feature: "Presentation translation", docsora: "Native slide-by-slide", competitor: "Limited PPTX" },
      { feature: "Contract & legal documents", docsora: "Clause structure preserved", competitor: "Supported" },
      { feature: "Operational workflows", docsora: "Share, sign, track inline", competitor: "None" },
      { feature: "75+ languages", docsora: "Yes", competitor: "~30 languages" },
    ],
    formats: [
      { feature: "PDF", docsora: "Whole-document", competitor: "Supported" },
      { feature: "DOCX", docsora: "Whole-document", competitor: "Supported" },
      { feature: "PPTX", docsora: "Slide-by-slide", competitor: "Limited" },
      { feature: "HTML", docsora: "Tag-aware", competitor: "Not native" },
      { feature: "TXT / ODT", docsora: "Supported", competitor: "Supported" },
    ],
    security: [
      { feature: "Encrypted uploads (TLS)", docsora: "Yes", competitor: "Yes" },
      { feature: "No training on your data", docsora: "Yes", competitor: "Yes (Pro)" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Workflow-native workspace", docsora: "Yes", competitor: "Translator-only" },
      { feature: "Browser-based", docsora: "Yes", competitor: "Yes" },
      { feature: "Storage + e-sign in workspace", docsora: "Yes", competitor: "No" },
    ],
    workflow: [
      "Teams that need translation plus sharing, signing, and tracking",
      "Legal ops translating contracts at scale",
      "Global L&D running multilingual training programs",
      "Sales translating proposals and decks per region",
    ],
    faq: [
      {
        question: "Is Docsora a workflow-native DeepL alternative?",
        answer:
          "Yes — Docsora pairs whole-document translation with operational tooling (share, sign, track) inside one browser-native workspace.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-smallpdf-translate",
    competitor: "SmallPDF Translate",
    cardTitle: "Docsora vs SmallPDF Translate",
    cardSummary:
      "Compare document translation breadth, presentation support, and operational workflows.",
    title: "Docsora vs SmallPDF Translate — Document Translation Alternative | Docsora",
    metaDescription:
      "Compare Docsora and SmallPDF on document translation breadth, presentation support, and multilingual workflows.",
    h1: "Docsora vs SmallPDF Translate",
    heroSubtitle:
      "How Docsora and SmallPDF compare for translating documents and decks in the browser.",
    overview:
      "SmallPDF translates PDFs as a single utility. Docsora is a multilingual document platform — translate PDFs, DOCX, PPTX, and HTML with operational workflows, sharing, and tracking built in.",
    features: [
      { feature: "Whole-document translation", docsora: "PDF, DOCX, PPTX, HTML", competitor: "PDF only" },
      { feature: "Presentation translation", docsora: "Native PPTX", competitor: "Not native" },
      { feature: "Operational workflows", docsora: "Share, sign, track", competitor: "None" },
      { feature: "75+ languages", docsora: "Yes", competitor: "Limited" },
    ],
    formats: [
      { feature: "PDF", docsora: "Whole-document", competitor: "Supported" },
      { feature: "DOCX", docsora: "Whole-document", competitor: "Limited" },
      { feature: "PPTX", docsora: "Slide-by-slide", competitor: "Not native" },
      { feature: "HTML", docsora: "Tag-aware", competitor: "Not native" },
    ],
    security: [
      { feature: "Encrypted uploads (TLS)", docsora: "Yes", competitor: "Yes" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Multi-format coverage", docsora: "Yes", competitor: "PDF-first" },
      { feature: "Workflow workspace", docsora: "Yes", competitor: "Tool-by-tool" },
    ],
    workflow: [
      "Teams translating mixed-format deliverables in one workspace",
      "Global ops, legal, and sales running multilingual workflows",
    ],
    faq: [
      {
        question: "Is Docsora a better SmallPDF Translate alternative?",
        answer:
          "Yes for teams needing more than PDF translation — Docsora covers PDF, DOCX, PPTX, and HTML in one multilingual workflow.",
      },
    ],
  },
  {
    slug: "compare/docsora-vs-ilovepdf-translate",
    competitor: "iLovePDF Translate",
    cardTitle: "Docsora vs iLovePDF Translate",
    cardSummary:
      "Compare multilingual document translation, presentation support, and enterprise security.",
    title: "Docsora vs iLovePDF Translate — Document Translation Alternative | Docsora",
    metaDescription:
      "Compare Docsora and iLovePDF on whole-document translation, formatting preservation, and enterprise document workflows.",
    h1: "Docsora vs iLovePDF Translate",
    heroSubtitle:
      "How Docsora and iLovePDF compare for translating documents and decks across regions.",
    overview:
      "iLovePDF Translate is a PDF-focused tool. Docsora is a multilingual document workspace — PDFs, decks, contracts, and operational documents translated in 75+ languages with full operational tooling.",
    features: [
      { feature: "Whole-document translation", docsora: "PDF, DOCX, PPTX, HTML", competitor: "PDF focused" },
      { feature: "Presentation translation", docsora: "Slide-by-slide", competitor: "Not native" },
      { feature: "Operational workflows", docsora: "Share, sign, track", competitor: "None" },
      { feature: "75+ languages", docsora: "Yes", competitor: "Limited" },
    ],
    formats: [
      { feature: "PDF", docsora: "Whole-document", competitor: "Supported" },
      { feature: "DOCX", docsora: "Whole-document", competitor: "Limited" },
      { feature: "PPTX", docsora: "Slide-by-slide", competitor: "Limited" },
      { feature: "HTML", docsora: "Tag-aware", competitor: "Not native" },
    ],
    security: [
      { feature: "Encrypted uploads (TLS)", docsora: "Yes", competitor: "Yes" },
      { feature: "GDPR aligned", docsora: "Yes", competitor: "Yes" },
      { feature: "ISO 27001 controls", docsora: "Aligned", competitor: "Yes" },
    ],
    experience: [
      { feature: "Workflow workspace", docsora: "Yes", competitor: "Tool-by-tool" },
      { feature: "Browser-native", docsora: "Yes", competitor: "Yes" },
    ],
    workflow: [
      "Translating multilingual deliverables for enterprise clients",
      "Replacing iLovePDF Translate with a workflow-native platform",
    ],
    faq: [
      {
        question: "Is Docsora a better iLovePDF Translate alternative?",
        answer:
          "Yes — Docsora covers more formats, supports slide-by-slide presentation translation, and adds share/sign/track workflows in one workspace.",
      },
    ],
  },
];

export const translateCompareVariantBySlug: Record<string, TranslateCompareVariantConfig> =
  Object.fromEntries(translateCompareVariants.map((v) => [v.slug, v]));