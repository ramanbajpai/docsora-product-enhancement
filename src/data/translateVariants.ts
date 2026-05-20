import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FileType,
  Presentation,
  Scale,
  Briefcase,
  Code2,
  ClipboardList,
  BarChart3,
  FileCode,
  Files,
  GraduationCap,
  UserPlus,
  Globe2,
  ChartBar,
  LineChart,
  Megaphone,
  PackageOpen,
  BookOpenCheck,
  Languages,
} from "lucide-react";

export interface TranslateVariantConfig {
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
  faq: { question: string; answer: string }[];
  useCases?: string[];
  category: "Document" | "Workflow";
}

const baseFaq = (label: string, format: string) => [
  {
    question: `How do I ${label.toLowerCase()} without losing formatting?`,
    answer: `Drop your ${format} into the upload area above. Docsora translates the entire document into 75+ languages while preserving structure, layouts, fonts, tables, paragraphs, and slide formatting — no copy-paste, no manual reassembly. The translated file downloads in the same format you uploaded, ready to share with colleagues, clients, or international teams.`,
  },
  {
    question: `Which languages are supported when I ${label.toLowerCase()}?`,
    answer: `Docsora supports 75+ languages including English, Spanish, French, German, Italian, Portuguese, Arabic, Chinese, Japanese, Korean, Hindi, Russian, Turkish, Dutch, Polish, Swedish, and many more — covering every major language used in international business, operational documentation, and multilingual team collaboration.`,
  },
  {
    question: `Is Docsora ${label.toLowerCase()} workflow secure for confidential documents?`,
    answer: `Yes. Every upload travels over TLS-encrypted connections, files are isolated during processing, and content is never used to train models. Docsora is GDPR aligned and operated under ISO 27001 controls — trusted by legal, finance, HR, and enterprise operations teams translating sensitive material every day.`,
  },
];

export const translateVariants: TranslateVariantConfig[] = [
  // ── Document tool pages ─────────────────────────────
  {
    slug: "translate-pdf",
    title: "Translate PDF Online — Free PDF Translator | Docsora",
    metaDescription:
      "Translate PDF documents into 75+ languages while preserving layout, fonts, tables, and formatting. Free browser-based PDF translator — no copy-paste.",
    h1: "Translate PDF Online",
    intro:
      "Translate entire PDF documents into 75+ languages while preserving layout, fonts, tables, and original formatting.",
    keyword: "translate pdf",
    acceptedFormats: "PDF",
    cardIcon: FileText,
    cardLabel: "Translate PDF",
    cardDescription: "Whole-document PDF translation with formatting preserved.",
    longCopy:
      "Docsora's online PDF translator converts entire PDF documents into 75+ languages without breaking layout, tables, fonts, or page structure. Translate contracts, reports, proposals, manuals, and operational documentation directly in the browser — and download the translated PDF in the exact same format.",
    faq: baseFaq("Translate a PDF", "PDF"),
    category: "Document",
  },
  {
    slug: "translate-word-document",
    title: "Translate Word Document — Free DOCX Translator | Docsora",
    metaDescription:
      "Translate Word documents (DOC, DOCX) into 75+ languages with formatting preserved. Free browser-based Word translator for business documents.",
    h1: "Translate Word Documents",
    intro:
      "Translate DOC and DOCX files into 75+ languages while preserving headings, paragraphs, tables, and document structure.",
    keyword: "translate word document",
    acceptedFormats: "DOC · DOCX · ODT",
    cardIcon: FileType,
    cardLabel: "Translate Word",
    cardDescription: "DOC, DOCX, and ODT translation with full formatting.",
    longCopy:
      "Docsora's Word document translator localizes DOC, DOCX, and ODT files into 75+ languages with paragraphs, styles, tables, and headers fully intact. Built for legal teams, HR, operations, and global business communication — no manual reformatting required.",
    faq: baseFaq("Translate a Word document", "DOCX file"),
    category: "Document",
  },
  {
    slug: "translate-powerpoint",
    title: "Translate PowerPoint Online — Free PPT Translator | Docsora",
    metaDescription:
      "Translate PowerPoint presentations into 75+ languages while preserving every slide, layout, font, and animation. Free PPTX translator.",
    h1: "Translate PowerPoint Presentations",
    intro:
      "Translate PPT and PPTX presentations into 75+ languages while preserving every slide, layout, font, and visual element.",
    keyword: "translate powerpoint",
    acceptedFormats: "PPT · PPTX",
    cardIcon: Presentation,
    cardLabel: "Translate PowerPoint",
    cardDescription: "PPTX translation with slides, layouts, and fonts preserved.",
    longCopy:
      "Docsora's PowerPoint translator localizes every slide of a PPT or PPTX deck into 75+ languages while keeping layouts, transitions, fonts, charts, and speaker notes perfectly intact. Ideal for investor decks, sales presentations, board reviews, and global training material.",
    faq: baseFaq("Translate a PowerPoint", "PPTX deck"),
    category: "Document",
  },
  {
    slug: "translate-contracts",
    title: "Translate Contracts Online — Legal Document Translator | Docsora",
    metaDescription:
      "Translate legal contracts into 75+ languages with clause structure, numbering, and formatting preserved. Secure browser-based contract translator.",
    h1: "Translate Contracts Online",
    intro:
      "Translate contracts and legal agreements into 75+ languages with clause structure, numbering, and formatting preserved.",
    keyword: "translate contracts",
    acceptedFormats: "PDF · DOCX",
    cardIcon: Scale,
    cardLabel: "Translate Contracts",
    cardDescription: "Clause-aware contract translation with structure preserved.",
    longCopy:
      "Docsora translates MSAs, NDAs, SOWs, employment agreements, and commercial contracts into 75+ languages while preserving clause numbering, signature blocks, defined terms, and legal formatting. Browser-based, encrypted, and trusted by legal operations teams.",
    faq: baseFaq("Translate a contract", "contract PDF or DOCX"),
    category: "Document",
  },
  {
    slug: "translate-business-documents",
    title: "Translate Business Documents — Multilingual Document Translator | Docsora",
    metaDescription:
      "Translate business documents, proposals, reports, and internal documentation into 75+ languages with formatting preserved. Built for global teams.",
    h1: "Translate Business Documents",
    intro:
      "Translate operational and business documents into 75+ languages — reports, proposals, briefs, and internal documentation, all with formatting preserved.",
    keyword: "translate business documents",
    acceptedFormats: "PDF · DOCX · PPTX · HTML",
    cardIcon: Briefcase,
    cardLabel: "Translate Business Documents",
    cardDescription: "Multilingual business documentation with structure preserved.",
    longCopy:
      "Docsora is a multilingual business document workspace — translate proposals, reports, board memos, and operational documentation into 75+ languages while keeping every chart, header, and table intact. Built for international teams that move at enterprise speed.",
    faq: baseFaq("Translate business documents", "business document"),
    category: "Document",
  },
  {
    slug: "translate-presentation-slides",
    title: "Translate Presentation Slides — Multilingual Deck Translator | Docsora",
    metaDescription:
      "Translate presentation slides into 75+ languages with layout, fonts, and visuals preserved. Perfect for global pitches and multilingual decks.",
    h1: "Translate Presentation Slides",
    intro:
      "Translate presentation decks slide-by-slide into 75+ languages while preserving layout, fonts, and visual hierarchy.",
    keyword: "translate presentation slides",
    acceptedFormats: "PPT · PPTX · PDF",
    cardIcon: Presentation,
    cardLabel: "Translate Slides",
    cardDescription: "Slide-by-slide translation with layout and visuals preserved.",
    longCopy:
      "Docsora translates entire presentation decks into 75+ languages while keeping speaker notes, layouts, embedded media, and chart labels visually identical — ideal for multilingual investor updates, all-hands meetings, and global product launches.",
    faq: baseFaq("Translate a presentation", "PPTX or PDF deck"),
    category: "Document",
  },
  {
    slug: "translate-html-files",
    title: "Translate HTML Files Online — Free HTML Translator | Docsora",
    metaDescription:
      "Translate HTML files into 75+ languages while preserving tags, structure, and attributes. Free browser-based HTML document translator.",
    h1: "Translate HTML Files Online",
    intro:
      "Translate HTML documents into 75+ languages while keeping tags, attributes, and structure intact.",
    keyword: "translate html files",
    acceptedFormats: "HTML",
    cardIcon: Code2,
    cardLabel: "Translate HTML",
    cardDescription: "HTML translation with tags and structure preserved.",
    longCopy:
      "Docsora's HTML translator localizes static HTML files into 75+ languages while preserving tags, attributes, and structural markup. Ideal for translating documentation pages, exported articles, and email templates into multilingual versions.",
    faq: baseFaq("Translate an HTML file", "HTML file"),
    category: "Document",
  },
  {
    slug: "translate-operational-documents",
    title: "Translate Operational Documents — Multilingual Operations Translator | Docsora",
    metaDescription:
      "Translate operational documentation, SOPs, and runbooks into 75+ languages with formatting and structure preserved. Built for global operations teams.",
    h1: "Translate Operational Documents",
    intro:
      "Translate SOPs, runbooks, and operational documentation into 75+ languages so multilingual teams can execute from a single source of truth.",
    keyword: "translate operational documents",
    acceptedFormats: "PDF · DOCX · HTML",
    cardIcon: ClipboardList,
    cardLabel: "Translate Operations Docs",
    cardDescription: "SOPs and runbooks translated for multilingual operations teams.",
    longCopy:
      "Docsora translates operational documentation — SOPs, runbooks, process guides, and field manuals — into 75+ languages with steps, numbering, and formatting preserved. Built for global operations teams that run on shared playbooks.",
    faq: baseFaq("Translate operational documents", "operational document"),
    category: "Document",
  },
  {
    slug: "translate-reports",
    title: "Translate Reports Online — Multilingual Report Translator | Docsora",
    metaDescription:
      "Translate financial, operational, and business reports into 75+ languages while preserving tables, charts, and structure. Free online report translator.",
    h1: "Translate Reports Online",
    intro:
      "Translate business, operational, and financial reports into 75+ languages with tables, charts, and structure preserved.",
    keyword: "translate reports",
    acceptedFormats: "PDF · DOCX · XLSX",
    cardIcon: BarChart3,
    cardLabel: "Translate Reports",
    cardDescription: "Report translation with tables and chart structure preserved.",
    longCopy:
      "Docsora's report translator localizes business, financial, and operational reports into 75+ languages while keeping tables, captions, and chart labels structurally intact — ready for international leadership and global stakeholders.",
    faq: baseFaq("Translate a report", "report file"),
    category: "Document",
  },
  {
    slug: "translate-txt-files",
    title: "Translate TXT Files Online — Free Plain Text Translator | Docsora",
    metaDescription:
      "Translate TXT files into 75+ languages with line structure preserved. Free browser-based plain text translator for documentation and exports.",
    h1: "Translate TXT Files Online",
    intro:
      "Translate plain text TXT files into 75+ languages while preserving line breaks, sections, and document structure.",
    keyword: "translate txt files",
    acceptedFormats: "TXT",
    cardIcon: FileCode,
    cardLabel: "Translate TXT",
    cardDescription: "Plain text translation with line structure preserved.",
    longCopy:
      "Docsora's TXT translator localizes plain text exports, transcripts, and documentation drafts into 75+ languages while keeping spacing, sections, and line structure intact. Useful for technical writers and multilingual content teams.",
    faq: baseFaq("Translate a TXT file", "TXT file"),
    category: "Document",
  },
  {
    slug: "translate-docx",
    title: "Translate DOCX Online — Free DOCX Document Translator | Docsora",
    metaDescription:
      "Translate DOCX files into 75+ languages with paragraphs, tables, and headings preserved. Free browser-based DOCX translator.",
    h1: "Translate DOCX Files",
    intro:
      "Translate DOCX documents into 75+ languages with paragraphs, tables, headings, and styles preserved.",
    keyword: "translate docx",
    acceptedFormats: "DOCX",
    cardIcon: FileType,
    cardLabel: "Translate DOCX",
    cardDescription: "DOCX translation with all formatting preserved.",
    longCopy:
      "Docsora's DOCX translator localizes Microsoft Word documents into 75+ languages while keeping styles, lists, headers, footers, and tables intact — ready to share without manual reformatting.",
    faq: baseFaq("Translate a DOCX file", "DOCX file"),
    category: "Document",
  },
  {
    slug: "translate-pptx",
    title: "Translate PPTX Online — Free PPTX Deck Translator | Docsora",
    metaDescription:
      "Translate PPTX presentations into 75+ languages while preserving slides, layouts, animations, and visuals. Free PPTX translator for global teams.",
    h1: "Translate PPTX Decks",
    intro:
      "Translate PPTX presentations into 75+ languages while preserving slides, layouts, animations, and visual hierarchy.",
    keyword: "translate pptx",
    acceptedFormats: "PPTX",
    cardIcon: Presentation,
    cardLabel: "Translate PPTX",
    cardDescription: "PPTX translation with slides, fonts, and visuals preserved.",
    longCopy:
      "Docsora's PPTX translator localizes presentation decks into 75+ languages while keeping every layout, transition, font, and chart visually identical — multilingual decks without breaking design.",
    faq: baseFaq("Translate a PPTX file", "PPTX deck"),
    category: "Document",
  },
  {
    slug: "translate-legal-documents",
    title: "Translate Legal Documents Online — Multilingual Legal Translator | Docsora",
    metaDescription:
      "Translate legal documents, contracts, and policies into 75+ languages with clause structure preserved. Secure browser-based legal translator.",
    h1: "Translate Legal Documents",
    intro:
      "Translate contracts, policies, and legal documents into 75+ languages while preserving clause structure and formal formatting.",
    keyword: "translate legal documents",
    acceptedFormats: "PDF · DOCX",
    cardIcon: Scale,
    cardLabel: "Translate Legal Docs",
    cardDescription: "Legal document translation with clause structure preserved.",
    longCopy:
      "Docsora translates legal documentation — contracts, policies, terms, NDAs, and compliance documents — into 75+ languages while preserving clause numbering, defined terms, and the formality required by legal teams.",
    faq: baseFaq("Translate a legal document", "legal document"),
    category: "Document",
  },
  {
    slug: "translate-training-materials",
    title: "Translate Training Materials — Multilingual Learning Translator | Docsora",
    metaDescription:
      "Translate training materials, learning modules, and onboarding decks into 75+ languages with structure preserved. Built for global L&D teams.",
    h1: "Translate Training Materials",
    intro:
      "Translate training material and learning modules into 75+ languages while keeping structure, modules, and visuals intact.",
    keyword: "translate training materials",
    acceptedFormats: "PDF · DOCX · PPTX",
    cardIcon: GraduationCap,
    cardLabel: "Translate Training",
    cardDescription: "Learning content localized for multilingual L&D teams.",
    longCopy:
      "Docsora localizes training material, learning modules, and certification decks into 75+ languages — perfect for global L&D, enablement, and onboarding programs that need to scale across regions.",
    faq: baseFaq("Translate training material", "training file"),
    category: "Document",
  },
  {
    slug: "translate-onboarding-documents",
    title: "Translate Onboarding Documents — Multilingual Onboarding Translator | Docsora",
    metaDescription:
      "Translate onboarding documents, employee handbooks, and welcome packs into 75+ languages with formatting preserved. Built for global HR teams.",
    h1: "Translate Onboarding Documents",
    intro:
      "Translate onboarding decks, handbooks, and welcome packs into 75+ languages so new hires get a consistent experience across every region.",
    keyword: "translate onboarding documents",
    acceptedFormats: "PDF · DOCX · PPTX",
    cardIcon: UserPlus,
    cardLabel: "Translate Onboarding",
    cardDescription: "Onboarding translation built for global HR teams.",
    longCopy:
      "Docsora translates onboarding documentation, welcome decks, and policy handbooks into 75+ languages while preserving brand formatting — a multilingual onboarding workflow without manual rebuilding.",
    faq: baseFaq("Translate onboarding documents", "onboarding file"),
    category: "Document",
  },

  // ── Workflow pages ───────────────────────────────────
  {
    slug: "multilingual-business-workflows",
    title: "Multilingual Business Workflows — Global Document Localization | Docsora",
    metaDescription:
      "Run multilingual business workflows on a single platform — translate documents, decks, and reports into 75+ languages for global operations.",
    h1: "Multilingual Business Workflows",
    intro:
      "Operate across regions with multilingual document workflows that translate, share, and version every business asset in 75+ languages.",
    keyword: "multilingual business workflows",
    acceptedFormats: "PDF · DOCX · PPTX · HTML",
    cardIcon: Globe2,
    cardLabel: "Multilingual Workflows",
    cardDescription: "Run global document operations from one multilingual workspace.",
    longCopy:
      "Docsora is a workflow-native multilingual document platform — translate proposals, decks, and reports into 75+ languages, then share, sign, and track them across global teams from a single browser-based workspace.",
    faq: baseFaq("Run a multilingual workflow", "business document"),
    category: "Workflow",
  },
  {
    slug: "translate-investor-presentations",
    title: "Translate Investor Presentations — Multilingual Pitch Decks | Docsora",
    metaDescription:
      "Translate investor decks and pitch presentations into 75+ languages while preserving design. Perfect for global fundraising and investor updates.",
    h1: "Translate Investor Presentations",
    intro:
      "Translate investor decks and pitch presentations into 75+ languages with every slide, font, and chart visually preserved.",
    keyword: "translate investor presentations",
    acceptedFormats: "PPTX · PDF",
    cardIcon: LineChart,
    cardLabel: "Investor Decks",
    cardDescription: "Investor presentations localized without breaking design.",
    longCopy:
      "Docsora translates investor presentations into 75+ languages while keeping pitch design pristine — ideal for international fundraising rounds and multilingual investor updates.",
    faq: baseFaq("Translate an investor deck", "investor deck"),
    category: "Workflow",
  },
  {
    slug: "translate-client-proposals",
    title: "Translate Client Proposals — Multilingual Proposal Translator | Docsora",
    metaDescription:
      "Translate client proposals, SOWs, and RFPs into 75+ languages with formatting preserved. Built for global sales and account teams.",
    h1: "Translate Client Proposals",
    intro:
      "Translate sales proposals, SOWs, and RFPs into 75+ languages with formatting and structure preserved end-to-end.",
    keyword: "translate client proposals",
    acceptedFormats: "PDF · DOCX · PPTX",
    cardIcon: Files,
    cardLabel: "Client Proposals",
    cardDescription: "Multilingual proposals for global sales teams.",
    longCopy:
      "Docsora translates client proposals, SOWs, and RFPs into 75+ languages with branded formatting preserved — ready to send to international prospects without reformatting.",
    faq: baseFaq("Translate a client proposal", "proposal file"),
    category: "Workflow",
  },
  {
    slug: "translate-operational-handbooks",
    title: "Translate Operational Handbooks — Multilingual Handbook Translator | Docsora",
    metaDescription:
      "Translate operational handbooks and team playbooks into 75+ languages with structure preserved. Built for global operations teams.",
    h1: "Translate Operational Handbooks",
    intro:
      "Translate operational handbooks and team playbooks into 75+ languages so every region works from one source of truth.",
    keyword: "translate operational handbooks",
    acceptedFormats: "PDF · DOCX",
    cardIcon: BookOpenCheck,
    cardLabel: "Operational Handbooks",
    cardDescription: "Multilingual handbooks for distributed operations.",
    longCopy:
      "Docsora translates operational handbooks, internal playbooks, and team manuals into 75+ languages — perfect for multilingual distributed operations and global field teams.",
    faq: baseFaq("Translate an operational handbook", "handbook"),
    category: "Workflow",
  },
  {
    slug: "translate-hr-documents",
    title: "Translate HR Documents — Multilingual HR Translator | Docsora",
    metaDescription:
      "Translate HR policies, employee handbooks, and offer letters into 75+ languages with formatting preserved. Built for global HR teams.",
    h1: "Translate HR Documents",
    intro:
      "Translate HR policies, handbooks, and offer letters into 75+ languages while keeping formal HR formatting intact.",
    keyword: "translate hr documents",
    acceptedFormats: "PDF · DOCX",
    cardIcon: UserPlus,
    cardLabel: "HR Documents",
    cardDescription: "Global HR documentation localized in 75+ languages.",
    longCopy:
      "Docsora translates HR documentation, employment policies, offer letters, and benefits guides into 75+ languages with formatting and tone preserved — a multilingual people operations workflow.",
    faq: baseFaq("Translate HR documents", "HR document"),
    category: "Workflow",
  },
  {
    slug: "translate-global-training-material",
    title: "Translate Global Training Material — Multilingual L&D Translator | Docsora",
    metaDescription:
      "Localize global training material and enablement decks into 75+ languages with structure preserved. Built for international L&D teams.",
    h1: "Translate Global Training Material",
    intro:
      "Localize global training and enablement material into 75+ languages with module structure and visuals preserved.",
    keyword: "translate global training material",
    acceptedFormats: "PDF · DOCX · PPTX",
    cardIcon: GraduationCap,
    cardLabel: "Global Training",
    cardDescription: "Enterprise training localized for global learning teams.",
    longCopy:
      "Docsora localizes global training and enablement content into 75+ languages — modules, certification decks, and onboarding sessions all delivered consistently across regions.",
    faq: baseFaq("Translate global training material", "training deck"),
    category: "Workflow",
  },
  {
    slug: "translate-board-presentations",
    title: "Translate Board Presentations — Multilingual Board Decks | Docsora",
    metaDescription:
      "Translate board presentations and executive decks into 75+ languages while preserving design. Built for multinational leadership teams.",
    h1: "Translate Board Presentations",
    intro:
      "Translate board decks and executive presentations into 75+ languages with every chart, layout, and font preserved.",
    keyword: "translate board presentations",
    acceptedFormats: "PPTX · PDF",
    cardIcon: ChartBar,
    cardLabel: "Board Decks",
    cardDescription: "Executive deck translation for multinational boards.",
    longCopy:
      "Docsora translates board presentations and executive decks into 75+ languages while keeping every chart, KPI, and layout pristine — perfect for multinational leadership reviews.",
    faq: baseFaq("Translate a board deck", "board deck"),
    category: "Workflow",
  },
  {
    slug: "translate-marketing-material",
    title: "Translate Marketing Material — Multilingual Marketing Translator | Docsora",
    metaDescription:
      "Translate marketing material, brochures, and one-pagers into 75+ languages with branded formatting preserved. Built for global marketing teams.",
    h1: "Translate Marketing Material",
    intro:
      "Translate marketing material, brochures, and campaign one-pagers into 75+ languages with branded formatting preserved.",
    keyword: "translate marketing material",
    acceptedFormats: "PDF · PPTX · DOCX",
    cardIcon: Megaphone,
    cardLabel: "Marketing Material",
    cardDescription: "Brand-consistent marketing translation for global launches.",
    longCopy:
      "Docsora translates marketing material — brochures, one-pagers, sales sheets, and campaign decks — into 75+ languages while keeping brand typography, colors, and layouts intact.",
    faq: baseFaq("Translate marketing material", "marketing asset"),
    category: "Workflow",
  },
  {
    slug: "translate-product-documentation",
    title: "Translate Product Documentation — Multilingual Docs Translator | Docsora",
    metaDescription:
      "Translate product documentation, manuals, and release notes into 75+ languages with structure preserved. Built for global product teams.",
    h1: "Translate Product Documentation",
    intro:
      "Translate product documentation, manuals, and release notes into 75+ languages while preserving structure and technical fidelity.",
    keyword: "translate product documentation",
    acceptedFormats: "PDF · DOCX · HTML",
    cardIcon: PackageOpen,
    cardLabel: "Product Documentation",
    cardDescription: "Multilingual product docs for global users and partners.",
    longCopy:
      "Docsora translates product documentation, user manuals, and release notes into 75+ languages with sections, code blocks, and technical references preserved — built for global product organizations.",
    faq: baseFaq("Translate product documentation", "product doc"),
    category: "Workflow",
  },
];

export const translateVariantBySlug: Record<string, TranslateVariantConfig> =
  Object.fromEntries(translateVariants.map((v) => [v.slug, v]));

export const documentToolVariants = translateVariants.filter(
  (v) => v.category === "Document",
);
export const workflowVariants = translateVariants.filter(
  (v) => v.category === "Workflow",
);

export const defaultLanguagesIcon: LucideIcon = Languages;