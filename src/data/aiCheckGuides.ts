import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Briefcase,
  Scale,
  Presentation,
  Building2,
  FileSearch,
  Library,
  ShieldCheck,
} from "lucide-react";
import { Sparkle, Pen, FileSignature, Users } from "lucide-react";

export interface AIGuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface AIGuideFAQ {
  question: string;
  answer: string;
}

export interface AIGuideRelatedTool {
  slug: string;
  label: string;
}

export interface AICheckGuide {
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
  sections: AIGuideSection[];
  faqs: AIGuideFAQ[];
  relatedTools: AIGuideRelatedTool[];
  relatedGuides: string[];
}

export const aiCheckGuides: AICheckGuide[] = [
  {
    slug: "how-to-proofread-pdfs-online",
    title: "How to Proofread PDFs Online in 2026 | Docsora",
    metaDescription:
      "A practical workflow for proofreading PDFs online - extract, review, accept and export. Built for reports, contracts and signed drafts.",
    h1: "How to proofread PDFs online without conversion",
    intro:
      "PDFs are the format business documents arrive in - but they are the worst format to proofread by hand. This guide walks through the workflow professional teams use to review PDF reports, contracts and signed drafts in one pass, without converting to Word or copy-pasting into a web tool.",
    readTime: "6 min read",
    category: "PDF proofreading",
    icon: FileText,
    primaryToolSlug: "proofread-pdf",
    primaryToolLabel: "Proofread PDF",
    sections: [
      {
        heading: "Why PDFs are uniquely difficult to proofread",
        paragraphs: [
          "A PDF is a presentation-layer format. The text inside it is positioned absolutely, often broken into runs that no longer correspond to sentences, and rendered with embedded fonts that resist normal word-processor selection. Copy-pasting a PDF into a grammar tool reliably mangles spacing, hyphenation and section order.",
          "That is why most teams still proofread PDFs the manual way: print, read on screen, or convert to Word and lose the layout. None of those scale when the document is a 40-page report due before the board meeting.",
        ],
      },
      {
        heading: "What a modern PDF proofreader actually does",
        paragraphs: [
          "A modern editorial AI tool extracts the readable text from the PDF in document order, runs language-model proofreading across the whole document, and surfaces inline suggestions beside the original sentence. The PDF itself is never altered - the workflow is non-destructive.",
          "That matters because professional documents are often legally binding, signed, or owned by a brand team that approves layout separately. A proofreader has to improve language without touching format.",
        ],
      },
      {
        heading: "The workflow: proofread a PDF in under a minute",
        paragraphs: [
          "The workflow below is what we recommend for contracts, reports, proposals and signed drafts. It runs entirely in the browser.",
        ],
        bullets: [
          "Open Docsora AI Check and drop your PDF into the upload area.",
          "Wait a few seconds while the editorial AI reviews grammar, spelling, tone and clarity across the whole document.",
          "Step through inline suggestions - each one tagged low, medium or high severity.",
          "Accept individual fixes, reject suggestions that miss context, or apply every safe correction at once.",
          "Switch to the tone preset that matches the audience (executive, legal, simple, marketing) for a final polish pass.",
          "Export the polished version - or copy the cleaned text back into your design tool.",
        ],
      },
      {
        heading: "What to look for beyond grammar",
        paragraphs: [
          "Grammar is the floor, not the ceiling. The issues that actually erode credibility on long PDFs - inconsistent capitalisation of defined terms, drifting tone between executive summary and detailed findings, weak transitions, ambiguous risk language - are pattern-level issues that only document-aware review catches.",
          "When reviewing PDFs at scale, prioritise high-severity grammar and high-impact clarity issues first. Tone tightening comes second. Stylistic refinements come last - and only on documents that need to land with senior audiences.",
        ],
      },
      {
        heading: "Common mistakes when proofreading PDFs",
        paragraphs: [
          "Three patterns slow teams down: converting to Word and losing layout, copy-pasting into general grammar tools and reviewing out of order, and trusting a single quick pass for a long document. A modern PDF proofreader removes all three by reviewing the file in place.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I proofread a signed PDF?",
        answer:
          "Yes. Review is non-destructive - the signed PDF is never modified. Editorial suggestions are surfaced in a side-by-side view and the original file remains intact.",
      },
      {
        question: "Is it really free for standard documents?",
        answer:
          "Yes. Standard PDFs are reviewed at no cost with no signup. Pro unlocks AI review and enhancement for longer documents.",
      },
    ],
    relatedTools: [
      { slug: "proofread-pdf", label: "Proofread PDF" },
      { slug: "check-document-for-errors", label: "Check document for errors" },
      { slug: "document-proofreader", label: "Document proofreader" },
      { slug: "grammar-checker", label: "AI grammar checker" },
    ],
    relatedGuides: [
      "how-to-review-contract-language",
      "how-to-check-documents-for-errors",
      "how-to-audit-board-reports",
    ],
  },
  {
    slug: "improve-business-writing",
    title: "How to Improve Business Writing with AI | Docsora",
    metaDescription:
      "Practical guide to improving business writing with AI - tone, structure, clarity and consistency across reports, proposals and decks.",
    h1: "How to improve business writing with editorial AI",
    intro:
      "Most business writing is not bad - it is unfocused. This guide walks through the editorial moves that make reports, proposals and internal memos read like they were written by the company, not by six different contributors.",
    readTime: "7 min guide",
    category: "Business writing",
    icon: Briefcase,
    primaryToolSlug: "improve-business-writing",
    primaryToolLabel: "Improve Business Writing",
    sections: [
      {
        heading: "Why business writing drifts",
        paragraphs: [
          "Reports, proposals and memos drift because they are written under pressure, by multiple contributors, often in different tones for different audiences. The result is a document that contradicts itself in tone, repeats itself in content, and quietly loses the reader by page three.",
          "Editorial review fixes this not by rewriting, but by tightening - aligning terminology, smoothing transitions, removing throat-clearing sentences, and surfacing the structural moves that make a document land.",
        ],
      },
      {
        heading: "The four moves that improve business writing",
        paragraphs: [
          "Whether you are writing a board memo or a partner proposal, four editorial moves do most of the work. Run them in order and most documents improve dramatically.",
        ],
        bullets: [
          "Cut throat-clearing - the opening sentences that delay the point.",
          "Align terminology - if you call it a 'customer' in one section, do not call it a 'client' in the next.",
          "Tighten transitions - sections should connect, not restart.",
          "Match tone to audience - executive, legal, simple or marketing - and hold it.",
        ],
      },
      {
        heading: "Where AI editorial review beats human review at scale",
        paragraphs: [
          "Human reviewers catch a few obvious issues per page and miss the patterns. Editorial AI catches the patterns - terminology drift across 40 pages, tone misalignment between sections, ambiguous phrasing repeated in different forms - in one pass.",
          "That does not replace human review. It frees human reviewers to focus on substance, narrative and judgement instead of grammar housekeeping.",
        ],
      },
      {
        heading: "The workflow: a 5-minute editorial pass on any business document",
        paragraphs: [
          "The workflow below produces a clean, tone-aligned draft from any business document - report, proposal, memo or deck.",
        ],
        bullets: [
          "Upload the document to Docsora AI Check.",
          "Run the grammar and clarity pass first. Accept high-severity fixes in bulk.",
          "Switch to the tone preset for the document's audience and run the tone pass.",
          "Review medium-severity suggestions one by one.",
          "Export the polished version.",
        ],
      },
      {
        heading: "What to leave alone",
        paragraphs: [
          "Voice. Editorial review should sharpen writing, not flatten it. The goal is a document that sounds like the team that wrote it - only tighter. If a suggestion changes the voice rather than the clarity, reject it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between a grammar checker and editorial AI?",
        answer:
          "A grammar checker fixes sentence-level errors. Editorial AI works at the document level - tone, terminology, structure, clarity across sections. For business writing, the document-level review is what makes the difference.",
      },
      {
        question: "Will the AI flatten my writing voice?",
        answer:
          "Only if you accept every suggestion. Editorial AI surfaces options; reviewers choose what to apply. Reject suggestions that change voice rather than improve clarity.",
      },
      {
        question: "Can I improve a draft I'm still writing?",
        answer:
          "Yes. Paste the draft section into Docsora AI Check for a focused review on what you have so far. Continue drafting, then run a final document-level pass when the structure is settled.",
      },
    ],
    relatedTools: [
      { slug: "improve-business-writing", label: "Improve Business Writing" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
      { slug: "ai-writing-assistant", label: "AI Writing Assistant" },
      { slug: "document-proofreader", label: "Document Proofreader" },
    ],
    relatedGuides: [
      "how-to-audit-board-reports",
      "how-to-standardize-operational-documentation",
      "ai-proofreading-for-enterprise-teams",
    ],
  },
  {
    slug: "how-to-review-contract-language",
    title: "How to Review Contract Language with AI | Docsora",
    metaDescription:
      "A workflow for reviewing contract language with AI - grammar, defined-term consistency, ambiguity and clarity for legal and ops teams.",
    h1: "How to review contract language with editorial AI",
    intro:
      "Contracts go through legal review - but they rarely go through editorial review. This guide explains how editorial AI tightens contract language before counsel and counterparties see it, and where it stops being appropriate.",
    readTime: "6 min guide",
    category: "Contract review",
    icon: Scale,
    primaryToolSlug: "sentence-enhancements",
    primaryToolLabel: "Sentence Enhancements",
    sections: [
      {
        heading: "Where contract language quietly fails",
        paragraphs: [
          "Most contract issues are not legal - they are linguistic. Defined terms used inconsistently, ambiguous scope clauses, paragraph-long sentences that obscure obligations, terminology drift between schedules and the body. Counsel catches most of them in review; editorial AI catches them before the document reaches counsel.",
          "The result is a faster legal review, fewer redline cycles, and a contract that reads cleanly to the counterparty's reviewer.",
        ],
      },
      {
        heading: "What editorial AI catches in a contract",
        paragraphs: [
          "Editorial AI tuned for legal documents catches the language-level issues that slow review: grammar and punctuation, inconsistent capitalisation of defined terms, ambiguous phrasing, weak cross-references, terminology drift between sections.",
          "What it does not catch: substantive legal risk, missing clauses, jurisdiction-specific requirements, or the strategic intent behind a clause. That is what legal review is for - and editorial AI exists to make legal review faster, not to replace it.",
        ],
      },
      {
        heading: "The workflow: editorial pass on any contract draft",
        paragraphs: [
          "Use the workflow below on any contract draft - NDA, MSA, vendor agreement, employment contract or partnership term sheet.",
        ],
        bullets: [
          "Open Docsora AI Check and upload the draft (PDF, DOC, DOCX or TXT).",
          "Run the editorial pass - the AI reviews grammar, defined-term consistency and ambiguity in one pass.",
          "Switch to the legal tone preset for clause tightening suggestions.",
          "Accept high-severity fixes; review medium-severity suggestions for terminology drift.",
          "Send the cleaned draft to counsel for substantive review.",
        ],
      },
      {
        heading: "What this is not",
        paragraphs: [
          "Editorial AI is not legal advice. It does not analyse risk, recommend clauses, or replace counsel. It improves the language of the contract so that the substantive review is faster and the counterparty's reviewer is reading a clean document.",
        ],
      },
      {
        heading: "When to skip editorial AI",
        paragraphs: [
          "On highly bespoke or politically sensitive language where every word has been negotiated, editorial review can add noise rather than value. In those cases, run the editorial pass before negotiation starts - not on the negotiated draft.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this a replacement for legal review?",
        answer:
          "No. It is an editorial layer that improves contract language so legal review can focus on substance. Substantive legal review by qualified counsel remains essential.",
      },
      {
        question: "Does it work on signed contracts?",
        answer:
          "Yes - review is non-destructive. The signed PDF is never modified. Use editorial review on signed contracts to identify language for the next renewal cycle.",
      },
      {
        question: "What file types are supported for contracts?",
        answer:
          "PDF, DOC, DOCX and TXT - the formats most contracts ship in. All processed in your browser and deleted after analysis.",
      },
    ],
    relatedTools: [
      { slug: "sentence-enhancements", label: "Sentence Enhancements" },
      { slug: "review-contracts-online", label: "Review Contracts Online" },
      { slug: "document-proofreader", label: "Document Proofreader" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
    ],
    relatedGuides: [
      "how-to-proofread-pdfs-online",
      "ai-proofreading-for-enterprise-teams",
      "how-to-check-documents-for-errors",
    ],
  },
  {
    slug: "proofread-powerpoint-presentations",
    title: "How to Proofread PowerPoint Presentations | Docsora",
    metaDescription:
      "A practical guide to proofreading PowerPoint presentations with AI - slide-by-slide grammar, tone and clarity review without breaking design.",
    h1: "How to proofread PowerPoint presentations slide-by-slide",
    intro:
      "Investor decks, sales presentations and training material live or die by their wording. This guide walks through the workflow for proofreading PowerPoint slides with editorial AI - slide-by-slide, without touching the design.",
    readTime: "5 min walkthrough",
    category: "Deck proofreading",
    icon: Presentation,
    primaryToolSlug: "proofread-presentations",
    primaryToolLabel: "Proofread Presentations",
    sections: [
      {
        heading: "Why slide decks are usually under-proofread",
        paragraphs: [
          "Slides are designed visually, not editorially. Most decks are reviewed by the author, the designer, and the person presenting - but rarely by an editor. The result is the inconsistency every audience notices: a typo in slide 4, a missing word in slide 17, two different tones between the intro and the case studies.",
          "Slide-by-slide editorial review fixes this without booking a designer's time or a copyeditor's hours.",
        ],
      },
      {
        heading: "What AI editorial review catches on a deck",
        paragraphs: [
          "On a 40-slide deck, editorial AI typically catches dozens of issues invisible to the author: inconsistent capitalisation of product names, mismatched bullet endings, tone drift between sections, ambiguous CTAs, and the small grammar issues that quietly erode credibility with executive audiences.",
        ],
      },
      {
        heading: "The workflow: proofread a PPTX in five minutes",
        paragraphs: [
          "The workflow below works for investor decks, sales presentations, training material and board update slides.",
        ],
        bullets: [
          "Open Docsora AI Check and upload the PPT or PPTX file.",
          "Wait while the editorial AI extracts text from every slide and reviews grammar, tone and clarity.",
          "Step through suggestions slide-by-slide - the slide thumbnail is shown alongside each issue.",
          "Accept high-severity fixes in bulk; review tone and clarity suggestions slide by slide.",
          "Export the polished deck - design, layout, fonts and animations remain untouched.",
        ],
      },
      {
        heading: "What stays untouched",
        paragraphs: [
          "Design. Editorial review only analyses the text inside slide objects - it never modifies master slides, layouts, themes, fonts, animations, or embedded media. The deck you upload looks identical to the deck you export, only with the wording tightened.",
        ],
      },
      {
        heading: "When to run editorial review on a deck",
        paragraphs: [
          "Before the dress rehearsal, not after. The most common mistake is running editorial review the morning of the meeting, when there is no time to make changes. Run it the day before - alongside the final design pass - so issues can be addressed without pressure.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does it modify my slide design?",
        answer:
          "No. Only the text inside slide objects is analysed. Master slides, themes, layouts, animations and embedded media remain untouched.",
      },
      {
        question: "How long does a 40-slide deck take to review?",
        answer:
          "Typically under a minute for extraction and analysis. Reviewing the suggestions takes 5-10 minutes depending on how many changes you accept.",
      },
      {
        question: "Can I run it on Google Slides exports?",
        answer:
          "Yes - export the Google Slides deck as PPTX and upload. Docsora handles native PPT and PPTX formats.",
      },
    ],
    relatedTools: [
      { slug: "proofread-presentations", label: "Proofread Presentations" },
      { slug: "ai-writing-assistant", label: "AI Writing Assistant" },
      { slug: "improve-business-writing", label: "Improve Business Writing" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
    ],
    relatedGuides: [
      "how-to-proofread-pdfs-online",
      "improve-business-writing",
      "how-to-audit-board-reports",
    ],
  },
  {
    slug: "how-to-audit-board-reports",
    title: "How to Audit Board Reports with AI | Docsora",
    metaDescription:
      "Editorial workflow for auditing board reports - tone, terminology, narrative flow and clarity. Built for chief of staff, finance and CEO offices.",
    h1: "How to audit board reports with editorial AI",
    intro:
      "Board reports sit in the highest-stakes editorial bucket inside a company. This guide walks through the audit workflow chief-of-staff and finance teams use to catch the issues directors actually notice - terminology drift, weak transitions, tone misalignment - before circulation.",
    readTime: "7 min guide",
    category: "Board reporting",
    icon: Building2,
    primaryToolSlug: "review-board-reports",
    primaryToolLabel: "Review Board Reports",
    sections: [
      {
        heading: "What boards actually notice",
        paragraphs: [
          "Directors read board packs end-to-end, often the night before the meeting. What they notice is not the typo on page 12 - it is the section that contradicts the executive summary, the metric defined three different ways, the risk language that softens between paragraphs. Those are document-level issues that single-pass human review rarely catches.",
          "Editorial AI is built to surface document-level issues, which is why it is increasingly the final pass on board packs and quarterly reports inside well-run finance and ops teams.",
        ],
      },
      {
        heading: "The four things to audit on every board pack",
        paragraphs: [
          "Run the four checks below in order. They take about 15 minutes on a 30-page report and catch most issues.",
        ],
        bullets: [
          "Terminology consistency - is every metric defined the same way across sections?",
          "Tone alignment - does the document hold one tone end-to-end, or drift between contributors?",
          "Narrative flow - do sections connect, or restart?",
          "Clarity of risk language - is risk described in concrete language, or hedged ambiguously?",
        ],
      },
      {
        heading: "The workflow: editorial pass on a board pack",
        paragraphs: [
          "Use the workflow below the day before circulation - early enough to apply changes, late enough that the substantive content is settled.",
        ],
        bullets: [
          "Upload the board pack (PDF, DOC, DOCX, PPT or PPTX) to Docsora AI Check.",
          "Run the editorial pass with the executive tone preset.",
          "Step through high-severity suggestions first - grammar, defined-term inconsistency, ambiguous risk language.",
          "Review tone and clarity suggestions by section.",
          "Export the polished version for circulation.",
        ],
      },
      {
        heading: "What to share with contributors after the audit",
        paragraphs: [
          "When the same contributor consistently triggers the same suggestion type, share the pattern with them. Editorial AI is most useful when it improves the team's writing over time - not just the current document.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it secure for confidential board material?",
        answer:
          "Yes. Uploads run over TLS, documents are processed in an isolated environment, deleted after analysis and never used to train models. Operated under ISO 27001 controls aligned with SOC 2 and GDPR.",
      },
      {
        question: "Can I review the appendix with the body?",
        answer:
          "Yes. Whole-document review covers the appendix and main report in one pass - which is essential for catching terminology drift between them.",
      },
      {
        question: "Does it handle financial commentary?",
        answer:
          "Yes - tone, clarity and consistency, not numbers. Editorial AI does not validate calculations; it tightens the language around them.",
      },
    ],
    relatedTools: [
      { slug: "review-board-reports", label: "Review Board Reports" },
      { slug: "proofread-investor-updates", label: "Proofread Investor Updates" },
      { slug: "audit-compliance-documentation", label: "Audit Compliance Documentation" },
      { slug: "document-proofreader", label: "Document Proofreader" },
    ],
    relatedGuides: [
      "improve-business-writing",
      "ai-proofreading-for-enterprise-teams",
      "how-to-standardize-operational-documentation",
    ],
  },
  {
    slug: "how-to-check-documents-for-errors",
    title: "How to Check Documents for Errors with AI | Docsora",
    metaDescription:
      "A complete workflow for checking documents for grammar, spelling, tone and clarity errors - across PDF, Word, PowerPoint and HTML.",
    h1: "How to check any document for errors",
    intro:
      "Most teams check documents the slow way: print, read, mark up, repeat. This guide walks through the faster workflow - a single AI editorial pass across PDF, Word, PowerPoint or HTML that surfaces every error worth fixing.",
    readTime: "5 min read",
    category: "Document review",
    icon: FileSearch,
    primaryToolSlug: "check-document-for-errors",
    primaryToolLabel: "Check Document for Errors",
    sections: [
      {
        heading: "What counts as an error worth fixing",
        paragraphs: [
          "Not every issue is worth a reviewer's attention. Editorial AI tags each finding by severity so reviewers can triage: high-severity grammar and clarity errors get fixed first, medium-severity tone and consistency issues get reviewed by section, low-severity stylistic suggestions get a quick scan.",
          "That triage matters because the goal is not zero suggestions - it is a clean document. A 40-page report does not need every comma rebalanced; it needs the ten or twenty issues that would actually be noticed.",
        ],
      },
      {
        heading: "The workflow: one editorial pass on any document",
        paragraphs: [
          "Use the workflow below on PDF, DOC, DOCX, ODT, TXT, HTML, PPT or PPTX. The mechanics are identical across formats.",
        ],
        bullets: [
          "Upload the document to Docsora AI Check.",
          "Wait for the editorial AI to review grammar, spelling, tone and clarity across the whole document.",
          "Filter suggestions by severity - start with high.",
          "Accept individual fixes, reject suggestions that miss context, or apply every safe correction at once.",
          "Export the cleaned document.",
        ],
      },
      {
        heading: "When to run a second pass",
        paragraphs: [
          "Run a second pass after substantive edits. Editorial AI is fast enough that a second pass takes seconds and catches issues introduced by the edit itself - especially in long documents where one paragraph changes the meaning of another.",
        ],
      },
      {
        heading: "What it does not catch",
        paragraphs: [
          "Factual accuracy, calculation errors, missing content, or substantive arguments. Editorial AI is a language layer; substance review remains the reviewer's responsibility.",
        ],
      },
    ],
    faqs: [
      {
        question: "What formats are supported?",
        answer:
          "PDF, DOC, DOCX, ODT, TXT, HTML, PPT and PPTX. All processed in your browser and deleted after analysis.",
      },
      {
        question: "Can I run it on a very long document?",
        answer:
          "Yes. Whole-document review handles long documents without splitting them into chunks. Standard documents are reviewed at no cost; Pro unlocks the largest documents.",
      },
      {
        question: "How do I know which suggestions are safe to accept in bulk?",
        answer:
          "Use the 'apply safe corrections' action - it applies only high-confidence grammar and spelling fixes. Tone, clarity and stylistic suggestions still require individual review.",
      },
    ],
    relatedTools: [
      { slug: "check-document-for-errors", label: "Check Document for Errors" },
      { slug: "fix-grammar-online", label: "Fix Grammar Online" },
      { slug: "grammar-checker", label: "AI Grammar Checker" },
      { slug: "document-proofreader", label: "Document Proofreader" },
    ],
    relatedGuides: [
      "how-to-proofread-pdfs-online",
      "improve-business-writing",
      "ai-proofreading-for-enterprise-teams",
    ],
  },
  {
    slug: "how-to-standardize-operational-documentation",
    title: "How to Standardise Operational Documentation | Docsora",
    metaDescription:
      "A workflow for standardising SOPs, playbooks and operational handbooks - terminology, tone, structure and clarity across contributors.",
    h1: "How to standardise operational documentation",
    intro:
      "Operational documentation drifts because multiple contributors write at different times in different tones. This guide explains how to standardise SOPs, playbooks and runbooks with editorial AI - without booking a copywriter or a content design team.",
    readTime: "6 min read",
    category: "Operational docs",
    icon: Library,
    primaryToolSlug: "review-operational-handbooks",
    primaryToolLabel: "Review Operational Handbooks",
    sections: [
      {
        heading: "Why operational documentation drifts",
        paragraphs: [
          "SOPs, playbooks and runbooks are usually living documents - updated module by module by whoever owns the change. Over time, each module reads like its author: different tone, different terminology, different structure. The handbook becomes harder to follow precisely because each contributor improved their section in isolation.",
          "Standardisation is the editorial layer that makes the handbook read like one document again - without rewriting it.",
        ],
      },
      {
        heading: "The three layers of standardisation",
        paragraphs: [
          "Most operational documentation needs three layers of editorial work. Done in order, they take about 30 minutes on a typical handbook.",
        ],
        bullets: [
          "Terminology - one term for one concept, applied across every module.",
          "Tone - one voice, normalised across contributors.",
          "Structure - one template, applied consistently to every section.",
        ],
      },
      {
        heading: "The workflow: standardise a handbook end-to-end",
        paragraphs: [
          "Use the workflow below on SOPs, customer success playbooks, engineering runbooks, sales enablement guides or any operational handbook.",
        ],
        bullets: [
          "Upload the handbook to Docsora AI Check.",
          "Run the editorial pass - grammar and clarity first.",
          "Switch to the simple tone preset and run the tone pass.",
          "Review terminology suggestions module by module - accept consistent terms, reject one-off variations that are intentional.",
          "Export the standardised version and update the source.",
        ],
      },
      {
        heading: "What to do for ongoing maintenance",
        paragraphs: [
          "Run editorial review whenever a module is updated, not just on quarterly audits. Standardisation is easier to maintain than to retrofit - once the handbook is clean, keeping it clean costs minutes per change.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I standardise across many contributors?",
        answer:
          "Yes. Editorial AI normalises tone and terminology automatically. Contributors keep their voice; the handbook reads as one document.",
      },
      {
        question: "Does it work on long handbooks?",
        answer:
          "Yes. Whole-document review handles long handbooks without splitting them.",
      },
      {
        question: "Can I review individual modules separately?",
        answer:
          "Yes. Upload one module at a time for a focused review, or upload the full handbook for a cross-module audit.",
      },
    ],
    relatedTools: [
      { slug: "review-operational-handbooks", label: "Review Operational Handbooks" },
      { slug: "improve-onboarding-documents", label: "Improve Onboarding Documents" },
      { slug: "document-proofreader", label: "Document Proofreader" },
      { slug: "improve-business-writing", label: "Improve Business Writing" },
    ],
    relatedGuides: [
      "improve-business-writing",
      "ai-proofreading-for-enterprise-teams",
      "how-to-check-documents-for-errors",
    ],
  },
  {
    slug: "ai-proofreading-for-enterprise-teams",
    title: "AI Proofreading for Enterprise Teams | Docsora",
    metaDescription:
      "How enterprise teams use AI proofreading - editorial review for board packs, contracts, RFPs and operational documentation, with enterprise-grade security.",
    h1: "AI proofreading for enterprise teams",
    intro:
      "Enterprise teams need editorial review that scales - across contributors, departments and document types - without sacrificing security or control. This guide explains how AI proofreading fits inside an enterprise workflow and what to look for when evaluating it.",
    readTime: "8 min guide",
    category: "Enterprise workflows",
    icon: ShieldCheck,
    primaryToolSlug: "document-proofreader",
    primaryToolLabel: "Document Proofreader",
    sections: [
      {
        heading: "Why enterprise teams adopted editorial AI first",
        paragraphs: [
          "Enterprise teams produce more documents than any single editor can review - board packs, RFPs, compliance memos, training material, customer-facing reports. Editorial AI scales the editorial pass across that volume without scaling the editorial team.",
          "The economics work because most editorial review is pattern-detection work - terminology, tone, clarity - which editorial AI handles faster and more consistently than human reviewers. Human reviewers focus on substance and judgement.",
        ],
      },
      {
        heading: "What to require from enterprise editorial AI",
        paragraphs: [
          "Not every editorial AI tool is enterprise-ready. The five requirements below cover most procurement reviews.",
        ],
        bullets: [
          "Encryption in transit and at rest (TLS minimum).",
          "Documents deleted after analysis - never stored or used to train models.",
          "ISO 27001, SOC 2 and GDPR-aligned operations.",
          "Format coverage across PDF, DOC, DOCX, ODT, HTML, PPT and PPTX.",
          "Document-level review (not just sentence-level grammar).",
        ],
      },
      {
        heading: "Where it fits inside the workflow",
        paragraphs: [
          "Editorial AI fits at three points inside enterprise document workflows: as a drafting aid for the author, as a pre-review pass before substantive review, and as a final pass before circulation. Most teams start with the final pass and expand backwards as confidence grows.",
          "It does not replace legal review, compliance review, or substantive editorial review. It removes the language housekeeping that occupies those reviewers' time.",
        ],
      },
      {
        heading: "How to roll it out across a team",
        paragraphs: [
          "The rollout pattern that works: start with one document type (typically board packs or RFPs), establish the editorial standard, expand to a second document type, and iterate. Trying to standardise all documents at once usually stalls.",
        ],
      },
      {
        heading: "What to measure",
        paragraphs: [
          "Time-to-review on standardised documents, revision cycles per document, and reviewer feedback. Most teams see a 30-50% drop in editorial revision cycles within the first quarter of adoption.",
        ],
      },
    ],
    faqs: [
      {
        question: "How is enterprise data protected?",
        answer:
          "Documents travel over TLS, are processed inside an isolated review environment, and are deleted after analysis. Docsora never stores, indexes or trains models on customer content. The platform operates under ISO 27001 controls and aligns with SOC 2 trust-services criteria and GDPR.",
      },
      {
        question: "Can it work with our existing document workflows?",
        answer:
          "Yes. Docsora runs entirely in the browser - no installs, no plugins. Reviewers upload documents from existing storage (SharePoint, Drive, Notion exports, local) and export the cleaned version back.",
      },
      {
        question: "Is there a team or enterprise plan?",
        answer:
          "Yes. Pro and Team plans unlock longer documents, batch review and team workflows. Enterprise terms are available for regulated industries.",
      },
    ],
    relatedTools: [
      { slug: "document-proofreader", label: "Document Proofreader" },
      { slug: "review-board-reports", label: "Review Board Reports" },
      { slug: "audit-compliance-documentation", label: "Audit Compliance Documentation" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
    ],
    relatedGuides: [
      "how-to-audit-board-reports",
      "how-to-review-contract-language",
      "how-to-standardize-operational-documentation",
    ],
  },
  {
    slug: "improve-sentence-clarity",
    title: "How to Improve Sentence Clarity in Business Writing | Docsora",
    metaDescription:
      "A practical guide to improving sentence clarity in business documents — remove ambiguity, tighten phrasing and sharpen meaning without flattening voice.",
    h1: "How to improve sentence clarity in business writing",
    intro:
      "Most business writing fails at the sentence, not the document. This guide explains the patterns that quietly erode clarity — and the editorial moves that fix them without flattening voice.",
    readTime: "6 min read",
    category: "Sentence enhancement",
    icon: Sparkle,
    primaryToolSlug: "improve-sentence-clarity",
    primaryToolLabel: "Improve Sentence Clarity",
    sections: [
      {
        heading: "Where sentence clarity breaks down",
        paragraphs: [
          "Clarity rarely fails because the writer does not know what they mean. It fails because four patterns sneak into business writing under deadline: ambiguous references, overloaded subordinate clauses, hedged commitments and weak emphasis. Each is invisible to the author and obvious to the reader.",
          "Editorial review surfaces these patterns inline — without rewriting the substance of what the document is trying to say.",
        ],
      },
      {
        heading: "The four patterns to look for",
        paragraphs: [
          "Run through any business document and most clarity issues will fall into one of the four categories below.",
        ],
        bullets: [
          "Ambiguous references — pronouns or shorthand without a clear antecedent.",
          "Overloaded constructions — sentences carrying three ideas where one would land.",
          "Hedged commitments — softening language that turns a statement into an opinion.",
          "Weak emphasis — the most important claim buried in the middle of a paragraph.",
        ],
      },
      {
        heading: "The workflow: a focused clarity pass",
        paragraphs: [
          "Use the workflow below for reports, proposals, memos and contracts when the substance is settled but the document does not yet read cleanly.",
        ],
        bullets: [
          "Upload the document to Docsora AI Check.",
          "Filter suggestions by clarity severity — start with high.",
          "Accept rewrites that preserve meaning; reject ones that change emphasis.",
          "Switch to the audience-appropriate tone preset for a second pass.",
          "Export the cleaned version for distribution.",
        ],
      },
      {
        heading: "When clarity is the wrong target",
        paragraphs: [
          "Heavily negotiated legal language and intentionally formal contracts sometimes resist clarity rewrites — the ambiguity is the point. Editorial AI flags these so reviewers can keep negotiated phrasing intact while still tightening the rest of the document.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will clarity edits change meaning?",
        answer:
          "No. The clarity pass preserves intent and factual content. Suggestions focus on structure, references and word choice — meaning stays intact.",
      },
      {
        question: "How is this different from a grammar checker?",
        answer:
          "Grammar checkers fix mechanical errors. A clarity pass works at the sentence-meaning level — ambiguity, hedging, overload — the patterns grammar tools miss entirely.",
      },
      {
        question: "Does it work on long documents?",
        answer:
          "Yes. Whole-document review handles long reports without chunking, so clarity issues are flagged in context rather than in isolation.",
      },
    ],
    relatedTools: [
      { slug: "improve-sentence-clarity", label: "Improve Sentence Clarity" },
      { slug: "sentence-enhancer", label: "Sentence Enhancer" },
      { slug: "clarity-improver", label: "Clarity Improver" },
      { slug: "rewrite-awkward-sentences", label: "Rewrite Awkward Sentences" },
    ],
    relatedGuides: [
      "improve-business-writing",
      "improve-executive-writing",
      "how-to-check-documents-for-errors",
    ],
  },
  {
    slug: "improve-executive-writing",
    title: "How to Improve Executive Writing with AI | Docsora",
    metaDescription:
      "A workflow for improving executive writing with editorial AI — tighter phrasing, sharper tone and stronger structure for memos, board reports and CEO updates.",
    h1: "How to improve executive writing with editorial AI",
    intro:
      "Executive writing is read in minutes and judged in seconds. This guide walks through the editorial moves that make CEO memos, board commentary and senior briefings land with the audiences they are written for.",
    readTime: "7 min guide",
    category: "Executive writing",
    icon: Pen,
    primaryToolSlug: "improve-executive-writing",
    primaryToolLabel: "Improve Executive Writing",
    sections: [
      {
        heading: "What separates executive writing from business writing",
        paragraphs: [
          "Executive writing is the highest-stakes editorial bucket in a company. It is read by directors, investors and senior leaders who reward precision and punish hedging. The bar is not 'professional' — it is 'concrete, structured, low on hedging, claim before evidence'.",
          "Editorial AI helps because the patterns that weaken executive writing — softening, indirect constructions, throat-clearing, terminology drift — are pattern-detection work, which AI handles faster and more consistently than human reviewers.",
        ],
      },
      {
        heading: "The five moves of strong executive writing",
        paragraphs: [
          "Run the five moves below in order. Most executive documents improve dramatically after one pass.",
        ],
        bullets: [
          "Lead with the claim. Push the recommendation to the first sentence of every section.",
          "Cut throat-clearing. Delete the opening that delays the point.",
          "Replace hedging with concrete language. 'May contribute' becomes 'contributes'.",
          "Tighten transitions. Sections should build, not restart.",
          "Align terminology. One term per concept across every section.",
        ],
      },
      {
        heading: "The workflow: editorial pass on an executive document",
        paragraphs: [
          "Use the workflow below on CEO memos, board commentary, investor updates and senior briefings.",
        ],
        bullets: [
          "Upload the document to Docsora AI Check.",
          "Switch to the executive tone preset.",
          "Step through high-severity suggestions — claim placement, hedging, throat-clearing.",
          "Accept tightening rewrites; reject any that flatten voice.",
          "Export the polished version for distribution.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: [
          "Three mistakes recur: writing the executive summary last (rather than first), softening every claim to sound balanced, and accepting every editorial suggestion. Strong executive writing has a point of view — protect it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will editorial AI flatten my voice?",
        answer:
          "Only if you accept every suggestion. The executive tone preset surfaces hedging and softening — reviewers choose what to apply. Reject rewrites that change voice rather than improve precision.",
      },
      {
        question: "Is it safe for confidential executive material?",
        answer:
          "Yes. Documents travel over TLS, are processed in an isolated environment, deleted after analysis and never used to train models. Operated under ISO 27001 controls aligned with SOC 2 and GDPR.",
      },
      {
        question: "Can I review a draft I'm still writing?",
        answer:
          "Yes. Paste the draft section into Docsora AI Check for a focused pass. Continue drafting, then run a full document-level review when the structure is settled.",
      },
    ],
    relatedTools: [
      { slug: "improve-executive-writing", label: "Improve Executive Writing" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
      { slug: "review-board-reports", label: "Review Board Reports" },
      { slug: "sentence-enhancer", label: "Sentence Enhancer" },
    ],
    relatedGuides: [
      "how-to-audit-board-reports",
      "improve-business-writing",
      "improve-sentence-clarity",
    ],
  },
  {
    slug: "how-to-improve-rfp-responses",
    title: "How to Improve RFP Responses with Editorial AI | Docsora",
    metaDescription:
      "An editorial workflow for sharpening RFP responses, proposals and SOWs — tone alignment, terminology consistency and win-theme clarity.",
    h1: "How to improve RFP responses with editorial AI",
    intro:
      "Most RFP responses lose deals at the editorial level — inconsistent terminology, weak win themes, tone that drifts between sections. This guide walks through the editorial pass enterprise sales teams use before submission.",
    readTime: "7 min guide",
    category: "Proposals & RFPs",
    icon: FileSignature,
    primaryToolSlug: "proofread-rfps",
    primaryToolLabel: "Proofread RFPs",
    sections: [
      {
        heading: "Why RFP responses quietly lose",
        paragraphs: [
          "Buyers do not pick the cheapest response — they pick the cleanest. When five vendors answer the same RFP with similar capability, the response that reads as one document by one team wins disproportionately. The losing responses sound like five people writing in five tones.",
          "Editorial review is the layer that unifies a multi-contributor proposal into a single voice without rewriting the substance.",
        ],
      },
      {
        heading: "The four pillars of a strong RFP response",
        paragraphs: [
          "Run the four checks below on every proposal before submission.",
        ],
        bullets: [
          "Win themes — stated up front and reinforced consistently across sections.",
          "Terminology consistency — one term per concept across all contributors.",
          "Tone alignment — same voice in the executive summary and the technical detail.",
          "Scope precision — no ambiguous language in deliverables, dependencies or timelines.",
        ],
      },
      {
        heading: "The workflow: editorial pass on an RFP response",
        paragraphs: [
          "Use the workflow below 24 hours before submission — late enough that content is settled, early enough that fixes can be applied.",
        ],
        bullets: [
          "Upload the full response (PDF, DOC, DOCX or PPTX) to Docsora AI Check.",
          "Run the editorial pass with the executive tone preset.",
          "Review terminology suggestions across sections — accept consistency fixes.",
          "Step through clarity suggestions for scope and deliverables.",
          "Export the polished response for final sign-off.",
        ],
      },
      {
        heading: "What buyers actually notice",
        paragraphs: [
          "Buyers do not annotate proposals; they form impressions. The proposal that feels effortful and consistent earns trust before the technical evaluation begins. Editorial polish is not cosmetic — it is the first signal of execution discipline.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can it review a full RFP in one pass?",
        answer:
          "Yes. Whole-document review covers the executive summary, technical sections, pricing commentary and appendices in a single pass. Suggestions are organised by section so reviewers move start to finish without context-switching.",
      },
      {
        question: "Does it work on PowerPoint proposals?",
        answer:
          "Yes. Upload PPT or PPTX. Decks are reviewed slide-by-slide; design, layout and master slides remain untouched.",
      },
      {
        question: "Is it secure for confidential proposals?",
        answer:
          "Yes. Uploads travel over TLS, documents are processed in an isolated environment, deleted after review and never used to train models.",
      },
    ],
    relatedTools: [
      { slug: "proofread-rfps", label: "Proofread RFPs" },
      { slug: "improve-business-writing", label: "Improve Business Writing" },
      { slug: "rewrite-business-sentences", label: "Rewrite Business Sentences" },
      { slug: "professional-writing-checker", label: "Professional Writing Checker" },
    ],
    relatedGuides: [
      "improve-business-writing",
      "improve-executive-writing",
      "ai-proofreading-for-enterprise-teams",
    ],
  },
  {
    slug: "business-writing-for-enterprise-teams",
    title: "Business Writing for Enterprise Teams | Editorial Playbook | Docsora",
    metaDescription:
      "An editorial playbook for business writing across enterprise teams — terminology standards, tone presets and review workflows that scale.",
    h1: "Business writing for enterprise teams",
    intro:
      "Enterprise teams produce more documents than any single editor can review. This playbook explains how to standardise business writing across departments — without booking a content design team or slowing delivery.",
    readTime: "8 min playbook",
    category: "Enterprise editorial",
    icon: Users,
    primaryToolSlug: "improve-professional-writing",
    primaryToolLabel: "Improve Professional Writing",
    sections: [
      {
        heading: "Why enterprise writing drifts",
        paragraphs: [
          "Enterprise teams produce documents at volume — proposals, reports, memos, decks — written by contributors who rarely overlap. Each contributor writes in their tone, with their terminology, in their structure. The result is a document portfolio that reads like a federation, not a company.",
          "Standardisation is the editorial layer that makes the portfolio read as one voice — without forcing every contributor through a copywriter's queue.",
        ],
      },
      {
        heading: "The three layers of an enterprise editorial standard",
        paragraphs: [
          "Most enterprise editorial standards collapse into the three layers below. Done in order, they cover 90% of the editorial drift inside a multi-team document portfolio.",
        ],
        bullets: [
          "Terminology — one term per concept, applied across every team.",
          "Tone presets — executive, legal, simple and marketing — matched to audience.",
          "Document templates — structural skeletons for the most common document types.",
        ],
      },
      {
        heading: "The rollout: from one team to the portfolio",
        paragraphs: [
          "The rollout pattern that works inside enterprise teams: start with one document type, establish the standard, expand to a second document type, iterate. Trying to standardise everything at once usually stalls in governance.",
        ],
        bullets: [
          "Pick one high-volume document type — typically RFPs or board reports.",
          "Establish the terminology, tone and template for that document type.",
          "Roll out editorial AI as the final pre-review pass.",
          "Measure revision cycles and reviewer feedback after one quarter.",
          "Expand to a second document type with the standard in place.",
        ],
      },
      {
        heading: "What to require from editorial AI at enterprise scale",
        paragraphs: [
          "Enterprise procurement teams typically require five capabilities before adopting editorial AI — encryption in transit and at rest, deletion after analysis, ISO 27001 and SOC 2 alignment, broad format coverage, and document-level (not sentence-level) review.",
          "Docsora is built against these requirements from day one. Editorial review happens inside an isolated environment, documents are deleted after analysis, and the platform operates under ISO 27001 controls aligned with SOC 2 and GDPR.",
        ],
      },
      {
        heading: "What to measure",
        paragraphs: [
          "Revision cycles per document, time-to-review on standardised documents, and qualitative reviewer feedback. Most enterprise teams see a 30-50% drop in editorial revision cycles within the first quarter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is it secure for confidential enterprise documents?",
        answer:
          "Yes. Uploads travel over TLS, documents are processed in an isolated environment, deleted after analysis and never used to train models. Docsora operates under ISO 27001 controls aligned with SOC 2 and GDPR.",
      },
      {
        question: "Does it integrate with existing document workflows?",
        answer:
          "Yes. Docsora runs entirely in the browser — reviewers upload documents from existing storage (SharePoint, Drive, Notion exports, local) and export the cleaned version back. No installs, no plugins.",
      },
      {
        question: "Is there a team or enterprise plan?",
        answer:
          "Yes. Pro and Team plans unlock longer documents, batch review and team workflows. Enterprise terms are available for regulated industries.",
      },
    ],
    relatedTools: [
      { slug: "improve-professional-writing", label: "Improve Professional Writing" },
      { slug: "document-proofreader", label: "Document Proofreader" },
      { slug: "review-board-reports", label: "Review Board Reports" },
      { slug: "review-operational-handbooks", label: "Review Operational Handbooks" },
    ],
    relatedGuides: [
      "ai-proofreading-for-enterprise-teams",
      "how-to-standardize-operational-documentation",
      "how-to-improve-rfp-responses",
    ],
  },
];

export const aiCheckGuideBySlug: Record<string, AICheckGuide> = Object.fromEntries(
  aiCheckGuides.map((g) => [g.slug, g]),
);