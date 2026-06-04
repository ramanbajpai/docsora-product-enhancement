import type { LucideIcon } from "lucide-react";
import {
  FileText,
  Presentation,
  Mail,
  Image as ImageIcon,
  FileSpreadsheet,
  Briefcase,
} from "lucide-react";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideRelatedTool {
  slug: string;
  label: string;
}

export interface CompressGuide {
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
  sections: GuideSection[];
  faqs: GuideFAQ[];
  relatedTools: GuideRelatedTool[];
  relatedGuides: string[];
}

export const compressGuides: CompressGuide[] = [
  {
    slug: "best-way-to-reduce-pdf-size",
    title: "Best Way to Reduce PDF Size in 2026 | Docsora",
    metaDescription:
      "The most reliable way to reduce PDF size online without losing quality. Format-aware techniques, compression modes, and a step-by-step workflow.",
    h1: "The best way to reduce PDF size without losing quality",
    intro:
      "Large PDFs are the most common reason emails bounce, uploads fail, and review cycles stall. This guide walks through the technique professional teams use to shrink PDFs by 30–80% while keeping vector text crisp, scans readable, and signatures intact.",
    readTime: "5 min read",
    category: "PDF compression",
    icon: FileText,
    primaryToolSlug: "compress-pdf",
    primaryToolLabel: "Compress PDF",
    sections: [
      {
        heading: "Why PDFs get so large in the first place",
        paragraphs: [
          "A PDF is a container. Inside it sits text, vector graphics, embedded fonts, scanned image layers, form metadata, and often a full copy of every image at its original capture resolution. A 12MB report is almost never 12MB of text — it is usually 11MB of unnecessarily high-resolution imagery and 1MB of structure.",
          "That matters because the right way to reduce PDF size is not to ZIP the file or run a generic archiver. PDFs are already a compressed container — wrapping them in another compressed envelope does almost nothing. The size only drops when you reach inside the container and re-encode the heavy elements directly.",
        ],
      },
      {
        heading: "Format-aware compression vs generic compression",
        paragraphs: [
          "Format-aware compression understands what a PDF actually contains. It downsamples embedded images to a sensible screen DPI, re-encodes them with modern codecs, subsets fonts, strips redundant metadata, and rewrites the cross-reference table. The result is a smaller PDF that opens, prints, and renders identically.",
          "Generic compression treats the file as an opaque blob. ZIP, RAR, and 7z all fail on modern PDFs because the bytes inside the container are already near their entropy limit. This is why a PDF dragged into a ZIP archive often shrinks by less than 2%.",
        ],
      },
      {
        heading: "Step-by-step: reduce a PDF without losing quality",
        paragraphs: [
          "The workflow below is what we recommend for contracts, proposals, reports, and signed agreements. It takes under a minute and produces an email-ready PDF every time.",
        ],
        bullets: [
          "Open the Docsora PDF compressor and drop your file into the upload area.",
          "Choose a compression mode — Balanced for everyday delivery, Maximum for tight email limits, Preserve Quality for archive-grade output.",
          "Wait a few seconds while Docsora re-encodes embedded images, streamlines fonts, and rewrites the structure.",
          "Download the optimized PDF. Open it once to confirm pages, signatures, and form fields look right.",
          "Attach to email, upload to your CRM, or send through your e-signature flow.",
        ],
      },
      {
        heading: "How to choose the right compression mode",
        paragraphs: [
          "Balanced is the right default for almost every business PDF. It keeps text crisp and reduces file size by roughly 30–80% — enough to clear Gmail's 25MB limit and Outlook's stricter 10–20MB enterprise caps.",
          "Maximum is for PDFs that must be sent over constrained channels — older mail servers, mobile data, regional networks. Expect 30–80% reductions with slight visual softening on photo-heavy pages.",
          "Preserve Quality keeps every pixel and is the correct choice for legal exhibits, regulatory filings, and any document that may be printed at full resolution. Expect 30–80% reductions driven by structural cleanup rather than image re-encoding.",
        ],
      },
      {
        heading: "When to compress a PDF in your workflow",
        paragraphs: [
          "Compress right before the file leaves your control — at the email, share, or upload step. Compressing earlier locks you into a smaller version that you may need to revise later.",
          "For documents that go through an e-signature flow, compress before sending. Signature platforms append signature pages, certificates, and audit trails, and starting from a leaner file keeps the final signed PDF compact.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best way to reduce PDF size for email?",
        answer:
          "Use a format-aware compressor with the Balanced or Maximum mode. Most business PDFs drop 30–80% in size, which clears Gmail, Outlook, and Apple Mail attachment limits without splitting the file or relying on cloud links.",
      },
      {
        question: "Will compression reduce PDF quality?",
        answer:
          "Balanced and Preserve Quality modes are visually lossless — text stays crisp, vector graphics stay sharp, and embedded images keep their detail at normal viewing distance. Maximum mode applies stronger image re-encoding and is best reserved for delivery-only files.",
      },
      {
        question: "Can I reduce the size of a scanned PDF?",
        answer:
          "Yes. Scanned PDFs are usually image-heavy, which means they respond well to compression. Expect significant size reductions, especially in Balanced and Maximum modes.",
      },
      {
        question: "Is it safe to compress confidential PDFs online?",
        answer:
          "Docsora processes uploads over TLS and deletes files automatically after compression. No file is stored, indexed, or read by a person. Finance, legal, and healthcare teams use the same workflow for sensitive documents every day.",
      },
    ],
    relatedTools: [
      { slug: "compress-pdf", label: "Compress PDF" },
      { slug: "reduce-pdf-size", label: "Reduce PDF size" },
      { slug: "compress-pdf-online", label: "Compress PDF online" },
      { slug: "compress-files-without-losing-quality", label: "Compress without losing quality" },
    ],
    relatedGuides: [
      "reduce-email-attachment-size",
      "compress-powerpoint-without-losing-quality",
      "compress-pitch-decks-for-email",
    ],
  },
  {
    slug: "compress-powerpoint-without-losing-quality",
    title: "Compress PowerPoint Without Losing Quality | Docsora Guide",
    metaDescription:
      "How to compress PPT and PPTX presentations online while preserving every slide, animation, and embedded media. Step-by-step workflow and FAQs.",
    h1: "How to compress PowerPoint without losing quality",
    intro:
      "PowerPoint decks bloat fast — every embedded screenshot, hero image, and video adds megabytes. This guide shows how to shrink PPT and PPTX files for email and screen-share while keeping every slide, animation, transition, and font exactly as designed.",
    readTime: "6 min guide",
    category: "Presentation compression",
    icon: Presentation,
    primaryToolSlug: "compress-powerpoint",
    primaryToolLabel: "Compress PowerPoint",
    sections: [
      {
        heading: "Why PowerPoint files get so heavy",
        paragraphs: [
          "A PPTX file is a zipped bundle of XML and media assets. Every image you paste in arrives at its original capture resolution — often 4000+ pixels wide — even though slides render at 1920px or less. Add a few embedded videos and a font pack, and a 12-slide deck can balloon past 200MB.",
          "The fix is not to delete slides or strip animations. It is to re-encode the heavy media inside the file while leaving the structure untouched.",
        ],
      },
      {
        heading: "Step-by-step: compress a PPTX",
        paragraphs: [
          "This is the workflow we recommend for investor decks, sales presentations, sales-enablement material, and training content.",
        ],
        bullets: [
          "Open the Docsora PowerPoint compressor.",
          "Drop your .ppt, .pptx, or .odp deck into the upload area.",
          "Pick a compression mode — Balanced is right for most decks.",
          "Wait while embedded images and video are re-encoded.",
          "Download the optimized deck and open it once to confirm animations and transitions play.",
        ],
      },
      {
        heading: "What gets preserved",
        paragraphs: [
          "Format-aware presentation compression preserves the things that matter to your design: slide order, layouts, master slides, animations, transitions, embedded fonts, speaker notes, and the slide aspect ratio. Only the heavy media inside each slide is re-encoded.",
          "If your deck includes embedded video, the codec is updated to a modern web-friendly format. Playback inside PowerPoint and Keynote continues to work, but the file is dramatically smaller.",
        ],
      },
      {
        heading: "Compression modes for decks",
        paragraphs: [
          "Balanced is the right default. Expect 30–80% reductions with no visible quality loss on typical decks.",
          "Maximum is for decks that must squeeze under a tight inbox cap — 10MB Outlook environments, regional mail servers, mobile review.",
          "Preserve Quality keeps every pixel and is appropriate for decks that will be projected on stage or printed as leave-behinds.",
        ],
      },
      {
        heading: "Common mistakes that hurt deck quality",
        paragraphs: [
          "Compressing a deck twice in a row applies image re-encoding to already re-encoded images and visibly softens photos. Always compress the original master file, not a previously compressed copy.",
          "Exporting to PDF before compressing throws away animations and editability. Compress the .pptx directly and only export to PDF as the final delivery step if a static version is required.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I compress a PowerPoint without losing animations?",
        answer:
          "Yes. Format-aware PPTX compression preserves every animation, transition, build, and timing. Only the embedded media inside slides is re-encoded.",
      },
      {
        question: "Will compressed PPTX still open in Microsoft PowerPoint and Keynote?",
        answer:
          "Yes. The output is a standard .pptx file that opens identically in PowerPoint, Keynote, Google Slides, and LibreOffice Impress.",
      },
      {
        question: "How small can a 200MB deck get?",
        answer:
          "Image-heavy investor decks typically drop to 20–40MB in Balanced mode. Video-heavy decks can shrink even further when the embedded media is re-encoded.",
      },
      {
        question: "Should I compress before or after adding speaker notes?",
        answer:
          "Notes have negligible weight, so the order does not matter. Compress as the final step before sending.",
      },
    ],
    relatedTools: [
      { slug: "compress-powerpoint", label: "Compress PowerPoint" },
      { slug: "reduce-powerpoint-file-size", label: "Reduce PowerPoint file size" },
      { slug: "compress-large-files", label: "Compress large files" },
      { slug: "compress-email-attachments", label: "Compress email attachments" },
    ],
    relatedGuides: [
      "compress-pitch-decks-for-email",
      "reduce-email-attachment-size",
      "best-way-to-reduce-pdf-size",
    ],
  },
  {
    slug: "reduce-email-attachment-size",
    title: "Reduce Email Attachment Size for Gmail & Outlook | Docsora",
    metaDescription:
      "Get attachments under Gmail and Outlook limits without splitting files or using cloud links. A practical workflow for everyday senders.",
    h1: "How to reduce email attachment size",
    intro:
      "Every modern mail provider caps attachment size, and bouncing messages cost time. This guide shows the cleanest way to get any PDF, deck, image, or spreadsheet under Gmail and Outlook limits — without splitting files, zipping folders, or falling back to cloud links.",
    readTime: "4 min read",
    category: "Email attachments",
    icon: Mail,
    primaryToolSlug: "compress-email-attachments",
    primaryToolLabel: "Compress email attachments",
    sections: [
      {
        heading: "Attachment limits to design around",
        paragraphs: [
          "Gmail and Apple Mail allow up to 25MB per message. Outlook personal accounts allow 20MB, and most enterprise Exchange environments enforce 10MB or even 5MB. Mail servers measured at the recipient side are often stricter than the limit shown to the sender, which is why a 24MB Gmail message can still bounce on the way in.",
          "A reasonable target for universal deliverability is 8MB per attachment. Anything below that lands in every mailbox without surprises.",
        ],
      },
      {
        heading: "Step-by-step: shrink any attachment",
        paragraphs: [
          "The workflow is the same for PDFs, PPTX decks, Word documents, Excel sheets, and images.",
        ],
        bullets: [
          "Open the Docsora email attachment compressor.",
          "Drop the file directly from your desktop or download folder.",
          "Pick Balanced for most files, Maximum if you need to clear a 10MB cap.",
          "Download the optimized file.",
          "Attach it to the email as you normally would — no cloud links required.",
        ],
      },
      {
        heading: "Why splitting and zipping rarely works",
        paragraphs: [
          "Splitting a 30MB PDF into three pieces creates three messages, three points of failure, and three things for the recipient to reassemble. Reviewers routinely miss the second or third part.",
          "Zipping a modern PDF, PPTX, XLSX, or image file rarely saves more than 1–2%. These formats are already compressed containers, which is why generic archivers cannot shrink them further.",
        ],
      },
      {
        heading: "Sending multiple attachments in one email",
        paragraphs: [
          "If you need to send several files, compress each one individually before attaching. The total message size — including all attachments plus body and headers — must fit under the provider limit. Balanced compression on each file typically lets you send three to four documents in a single message.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the maximum attachment size for Gmail and Outlook?",
        answer:
          "Gmail allows 25MB per message. Outlook personal accounts allow 20MB. Enterprise Outlook environments are usually capped at 10MB. Apple Mail allows 25MB by default.",
      },
      {
        question: "Why does my attachment fail even though it is under the limit?",
        answer:
          "Recipient mail servers can enforce stricter limits than your sender shows, and base64 encoding inflates attachments by roughly 33% in transit. Aim for under 18MB on the sender side to be safe.",
      },
      {
        question: "Can I compress images in bulk for email?",
        answer:
          "Yes. Drop multiple images into Docsora and compress them in a single pass. Use the image compressor for JPG, PNG, and WEBP files.",
      },
      {
        question: "Is online attachment compression secure?",
        answer:
          "Docsora uploads run over TLS and are automatically deleted after compression. Files are never stored, indexed, or read.",
      },
    ],
    relatedTools: [
      { slug: "compress-email-attachments", label: "Compress email attachments" },
      { slug: "reduce-file-size-for-email", label: "Reduce file size for email" },
      { slug: "compress-pdf", label: "Compress PDF" },
      { slug: "compress-large-files", label: "Compress large files" },
    ],
    relatedGuides: [
      "compress-pitch-decks-for-email",
      "best-way-to-reduce-pdf-size",
      "compress-powerpoint-without-losing-quality",
    ],
  },
  {
    slug: "compress-images-for-websites",
    title: "Compress Images for Websites: JPG, PNG & WEBP | Docsora",
    metaDescription:
      "Compress images for the web without losing visual quality. Improve Core Web Vitals, reduce page weight, and keep imagery crisp across devices.",
    h1: "How to compress images for websites",
    intro:
      "Image weight is the largest single factor in page load time, and page load time is the largest single factor in Core Web Vitals. This guide walks through the perceptual encoding workflow that keeps hero images, product photography, and marketing visuals crisp while dramatically reducing payload.",
    readTime: "5 min walkthrough",
    category: "Image optimization",
    icon: ImageIcon,
    primaryToolSlug: "compress-images-for-websites",
    primaryToolLabel: "Compress images for websites",
    sections: [
      {
        heading: "Why web image compression matters",
        paragraphs: [
          "Largest Contentful Paint — the hero metric in Core Web Vitals — is almost always an image. A 1.8MB hero image on a slow connection delays LCP past 2.5 seconds, which is the threshold Google uses to mark a page as needing improvement.",
          "Compressing images perceptually, at the dimensions they actually render, is the single highest-leverage optimization you can apply to a marketing site.",
        ],
      },
      {
        heading: "Pick the right format for the right job",
        paragraphs: [
          "JPG remains the right default for photography. PNG is the right choice for graphics with sharp edges, transparency, or screenshots of text. WEBP delivers smaller files than both for the same perceived quality and is supported in every modern browser.",
          "If you only export one format, export WEBP. If you need a fallback, pair WEBP with JPG using the picture element.",
        ],
      },
      {
        heading: "Step-by-step: compress images for the web",
        paragraphs: [
          "Follow this workflow for any marketing site, blog, product gallery, or landing page.",
        ],
        bullets: [
          "Open the Docsora image compressor.",
          "Drop your JPG, PNG, or WEBP files — individually or in bulk.",
          "Pick Balanced for marketing imagery, Maximum for thumbnails and gallery tiles.",
          "Download the optimized images.",
          "Replace the originals in your CMS or asset pipeline.",
        ],
      },
      {
        heading: "Sizing rules that protect quality",
        paragraphs: [
          "Never serve an image larger than it renders. A hero that displays at 1600px wide should not be uploaded at 4000px — that is roughly 6x the bytes for zero visual benefit.",
          "Standard sizing targets: hero images at 1600–1920px wide, in-body editorial at 1200px, product tiles at 600–800px, thumbnails at 300–400px. Compress each at the dimension it actually renders.",
        ],
      },
      {
        heading: "What perceptual encoding preserves",
        paragraphs: [
          "Perceptual encoding analyses what the human eye actually notices and spends bits accordingly. Faces, sharp edges, and high-contrast areas keep detail. Smooth gradients and uniform color regions get aggressive compression because the eye cannot tell the difference.",
          "The result is a file that looks identical to the original at normal viewing distance but is 30–80% smaller.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the best image format for websites?",
        answer:
          "WEBP delivers the smallest files for the same perceived quality and is supported in every modern browser. Use JPG as a fallback for photography and PNG when you need transparency or pixel-perfect graphics.",
      },
      {
        question: "How small should my hero images be?",
        answer:
          "Aim for under 200KB for a 1600–1920px hero image. Most well-shot photography reaches that target in Balanced mode without any visible quality loss.",
      },
      {
        question: "Will compression hurt SEO?",
        answer:
          "The opposite. Smaller images improve Largest Contentful Paint and Cumulative Layout Shift, which are direct ranking factors.",
      },
      {
        question: "Can I batch compress images?",
        answer:
          "Yes. Drop multiple files into Docsora and they are processed in parallel. Download them individually or as a single archive.",
      },
    ],
    relatedTools: [
      { slug: "compress-images", label: "Compress images" },
      { slug: "compress-jpg", label: "Compress JPG" },
      { slug: "compress-png", label: "Compress PNG" },
      { slug: "reduce-image-size", label: "Reduce image size" },
    ],
    relatedGuides: [
      "best-way-to-reduce-pdf-size",
      "reduce-email-attachment-size",
      "reduce-spreadsheet-file-size",
    ],
  },
  {
    slug: "reduce-spreadsheet-file-size",
    title: "Reduce Spreadsheet File Size: XLSX & CSV | Docsora",
    metaDescription:
      "Shrink large XLSX workbooks and CSV exports without breaking formulas, pivots, or sheet structure. A practical guide for finance and ops teams.",
    h1: "How to reduce spreadsheet file size",
    intro:
      "Large XLSX files break dashboards, slow Excel to a crawl, and bounce off email servers. This guide shows how to shrink workbooks without touching formulas, pivot tables, or sheet structure — the way finance, ops, and analytics teams keep daily exports usable.",
    readTime: "4 min read",
    category: "Spreadsheet compression",
    icon: FileSpreadsheet,
    primaryToolSlug: "reduce-spreadsheet-file-size",
    primaryToolLabel: "Reduce spreadsheet file size",
    sections: [
      {
        heading: "What makes a spreadsheet large",
        paragraphs: [
          "Most oversized XLSX files are not big because of data. They are big because of formatting applied to entire columns, embedded images on cover sheets, hidden sheets full of legacy data, and cached pivot tables that duplicate every row of source data.",
          "Format-aware spreadsheet compression rewrites the underlying XML, strips redundant styles, recompresses embedded images, and rebuilds the cross-sheet index — all without touching the values or formulas you care about.",
        ],
      },
      {
        heading: "Step-by-step: compress an XLSX",
        paragraphs: [
          "This is the safe workflow for production finance and ops spreadsheets.",
        ],
        bullets: [
          "Open the Docsora Excel compressor.",
          "Drop your .xls, .xlsx, or .ods workbook into the upload area.",
          "Choose Balanced — Preserve Quality is overkill for spreadsheets.",
          "Download the optimized workbook.",
          "Open it once and confirm a sample formula, a sample pivot, and the named ranges still resolve.",
        ],
      },
      {
        heading: "What stays exactly the same",
        paragraphs: [
          "All cell values, formulas, named ranges, data validation rules, conditional formatting, sheet order, sheet names, frozen panes, and protected ranges are preserved exactly. Only structural waste and embedded media weight are removed.",
          "Charts continue to reference the same data ranges. Pivot tables continue to refresh against the same source.",
        ],
      },
      {
        heading: "CSV exports: a different problem",
        paragraphs: [
          "CSV files are plain text and respond well to gzip-style compression rather than XLSX-style restructuring. If you regularly send large CSVs over email or upload them to downstream systems, convert them to XLSX first — the binary container compresses dramatically better than raw CSV bytes.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will compression break formulas or pivot tables?",
        answer:
          "No. Format-aware XLSX compression preserves every formula, named range, pivot table, and data validation rule. Only structural waste is removed.",
      },
      {
        question: "How much smaller will my workbook get?",
        answer:
          "Spreadsheets with embedded images or full-column formatting often drop 30–80%. Pure data workbooks see smaller but still meaningful reductions of 30–80%.",
      },
      {
        question: "Can I compress a CSV file?",
        answer:
          "CSV is plain text. The fastest way to shrink it for email or upload is to convert to XLSX first, then compress.",
      },
      {
        question: "Is it safe to compress financial workbooks online?",
        answer:
          "Yes. Docsora uploads run over TLS and files are automatically deleted after compression. Nothing is stored, indexed, or read.",
      },
    ],
    relatedTools: [
      { slug: "compress-excel-files", label: "Compress Excel files" },
      { slug: "reduce-excel-file-size", label: "Reduce Excel file size" },
      { slug: "compress-large-files", label: "Compress large files" },
      { slug: "compress-email-attachments", label: "Compress email attachments" },
    ],
    relatedGuides: [
      "reduce-email-attachment-size",
      "best-way-to-reduce-pdf-size",
      "compress-images-for-websites",
    ],
  },
  {
    slug: "compress-pitch-decks-for-email",
    title: "Compress Pitch Decks for Email | Docsora Guide",
    metaDescription:
      "Send investor and sales decks as clean email attachments instead of cloud links. Compress PPTX without losing typography, video, or animation.",
    h1: "How to compress pitch decks for email",
    intro:
      "Cloud links feel cold. The cleanest investor and sales decks land in the inbox as proper attachments. This guide shows how to compress a PPTX pitch deck so it sends cleanly over Gmail and Outlook while keeping cinematography, typography, and embedded video intact.",
    readTime: "6 min guide",
    category: "Pitch decks",
    icon: Briefcase,
    primaryToolSlug: "compress-pitch-decks-for-email",
    primaryToolLabel: "Compress pitch decks for email",
    sections: [
      {
        heading: "Why cloud links hurt investor decks",
        paragraphs: [
          "Investors open dozens of decks a week. A direct attachment opens instantly inside the mail client and signals that you have your operational details together. A cloud link adds a redirect, a sign-in friction, and a permissions check — three places to lose attention before the first slide loads.",
          "Compressing the deck under 8MB lets you attach it directly to the same email that introduces you.",
        ],
      },
      {
        heading: "Step-by-step: send a deck as an attachment",
        paragraphs: [
          "Use this workflow for fundraising decks, sales decks, partner pitches, and board updates.",
        ],
        bullets: [
          "Export the latest version from Figma, Keynote, or PowerPoint as a .pptx.",
          "Open the Docsora pitch deck compressor.",
          "Drop the deck into the upload area.",
          "Choose Balanced — Maximum if you need to clear a 10MB enterprise cap.",
          "Download the optimized deck and attach to the email directly.",
        ],
      },
      {
        heading: "What gets preserved in a pitch deck",
        paragraphs: [
          "Typography stays exact when fonts are embedded in the original PPTX. Animations, transitions, and builds are preserved frame for frame. Embedded video continues to play inside PowerPoint and Keynote — the codec is updated to a modern web format but the playback experience is unchanged.",
          "Speaker notes and slide ordering are untouched. The deck the investor opens is the deck you sent.",
        ],
      },
      {
        heading: "PDF or PPTX?",
        paragraphs: [
          "Send PPTX when you want the recipient to experience the deck as designed — with animations, builds, and live video. Send PDF when you want a static, locked-down version that prints predictably and cannot be edited.",
          "If you do send PDF, compress that PDF as a separate step. PowerPoint's built-in PDF export produces files that are 3–4x larger than necessary.",
        ],
      },
      {
        heading: "A note on deck hygiene",
        paragraphs: [
          "Delete legacy slides hidden at the end of the file before compressing. Hidden slides still occupy bytes and sometimes ship sensitive earlier versions you did not intend to share.",
          "Replace screenshots of UI with crops at their final display size — full-resolution Retina captures of your product are the single most common source of deck bloat.",
        ],
      },
    ],
    faqs: [
      {
        question: "How small should a pitch deck be for email?",
        answer:
          "Aim for under 8MB. That clears every common inbox limit and keeps the experience instant for the recipient.",
      },
      {
        question: "Will video still play in my compressed deck?",
        answer:
          "Yes. Embedded video is re-encoded to a modern format but plays inside PowerPoint and Keynote exactly as before.",
      },
      {
        question: "Should I send the PPTX or a PDF?",
        answer:
          "PPTX for animated, designed-as-experienced delivery. PDF for static, locked-down sharing. If you send PDF, compress the PDF separately for best results.",
      },
      {
        question: "Are typography and embedded fonts preserved?",
        answer:
          "Yes — provided the fonts are embedded in the original PPTX. Embed fonts in your design tool's export settings before compressing.",
      },
    ],
    relatedTools: [
      { slug: "compress-powerpoint", label: "Compress PowerPoint" },
      { slug: "reduce-powerpoint-file-size", label: "Reduce PowerPoint file size" },
      { slug: "compress-email-attachments", label: "Compress email attachments" },
      { slug: "compress-large-files", label: "Compress large files" },
    ],
    relatedGuides: [
      "compress-powerpoint-without-losing-quality",
      "reduce-email-attachment-size",
      "best-way-to-reduce-pdf-size",
    ],
  },
];

export const compressGuideBySlug: Record<string, CompressGuide> = Object.fromEntries(
  compressGuides.map((g) => [g.slug, g]),
);