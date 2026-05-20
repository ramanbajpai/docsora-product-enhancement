export interface PDFCompareVariant {
  slug: string;
  competitor: string;
  cardTitle: string;
  cardSummary: string;
}

export const pdfCompareVariants: PDFCompareVariant[] = [
  { slug: "compare/docsora-vs-ilovepdf", competitor: "iLovePDF", cardTitle: "Docsora vs iLovePDF", cardSummary: "Premium browser-native PDF workflows vs a generic free-tool experience." },
  { slug: "compare/docsora-vs-smallpdf", competitor: "SmallPDF", cardTitle: "Docsora vs SmallPDF", cardSummary: "Operational document infrastructure vs consumer-grade PDF utilities." },
  { slug: "compare/docsora-vs-adobe-acrobat", competitor: "Adobe Acrobat", cardTitle: "Docsora vs Adobe Acrobat", cardSummary: "Modern browser-native workflows vs heavy desktop software." },
  { slug: "compare/docsora-vs-sejda", competitor: "Sejda", cardTitle: "Docsora vs Sejda", cardSummary: "Premium document tooling vs limited free-tier PDF editing." },
  { slug: "compare/docsora-vs-pdf24", competitor: "PDF24", cardTitle: "Docsora vs PDF24", cardSummary: "Workflow-native document operations vs a basic toolbox." },
];