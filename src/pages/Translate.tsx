import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/layout/AppLayout";
import { TranslateModeSelector } from "@/components/translate/TranslateModeSelector";
import { TranslateTextMode } from "@/components/translate/TranslateTextMode";
import { TranslateDocumentMode } from "@/components/translate/TranslateDocumentMode";
import { TranslateDualMode } from "@/components/translate/TranslateDualMode";
import { TranslateSuccess } from "@/components/translate/TranslateSuccess";
import { TranslateProcessing } from "@/components/translate/TranslateProcessing";
import { UpgradeModal } from "@/components/translate/UpgradeModal";
import { TranslateSEO } from "@/components/translate/TranslateSEO";
import type { TranslateVariantConfig } from "@/data/translateVariants";
import { documentToolVariants, workflowVariants, languagePairVariants } from "@/data/translateVariants";

const TRANSLATE_FAQS = [
  {
    q: "How do I translate a PDF without losing formatting?",
    a: "Upload your PDF to Docsora Translate and pick a target language. The entire document is translated into 75+ languages while layouts, fonts, tables, and pagination are preserved — no copy-paste, no manual rebuild. Download the translated PDF in the same format, ready to share or e-sign.",
  },
  {
    q: "What is the best document translation tool online?",
    a: "Docsora is built for whole-document translation across PDF, DOCX, PPTX, HTML, and TXT in 75+ languages, with formatting preserved end-to-end. It's a workflow-native multilingual workspace — translate, share, sign, and track in the same browser.",
  },
  {
    q: "Can I translate PowerPoint presentations online?",
    a: "Yes. Docsora's PPTX translator localizes every slide while keeping layouts, fonts, charts, animations, and speaker notes intact — ideal for investor decks, board reviews, and multilingual training material.",
  },
  {
    q: "How do I translate Word documents into another language?",
    a: "Upload a DOC, DOCX, or ODT file and choose a target language. Docsora translates the full document while preserving styles, headings, lists, and tables, and exports back into the original Word format.",
  },
  {
    q: "What translation platform supports PDF and PPTX?",
    a: "Docsora supports PDF, DOC, DOCX, ODT, TXT, HTML, PPT, and PPTX — one multilingual workspace covering documents, decks, contracts, and operational documentation.",
  },
  {
    q: "How can I translate contracts online?",
    a: "Upload a contract in PDF or DOCX and pick the target language. Docsora preserves clause numbering, defined terms, and signature blocks while translating into 75+ languages — secure enough for legal operations and counterparty review.",
  },
  {
    q: "Can I translate onboarding documents and training material?",
    a: "Yes. Docsora translates onboarding decks, handbooks, and L&D modules into 75+ languages while keeping structure and brand formatting intact — built for global HR and training teams.",
  },
  {
    q: "What is the best multilingual document workflow?",
    a: "Author once, translate inside Docsora into every target language, then share, sign, and track the localized variants centrally. One source of truth, every region operating in their own language.",
  },
  {
    q: "How do I translate presentations while preserving layout?",
    a: "Docsora's PPTX translator translates each slide in place. Layouts, typography, charts, and embedded media stay visually identical so the translated deck looks exactly like the original.",
  },
  {
    q: "Can I translate HTML files online?",
    a: "Yes. Docsora's HTML translator is tag-aware — it translates user-visible content while leaving tags, attributes, and scripts untouched.",
  },
];

export type TranslateMode = "text" | "document" | "dual";
export type TranslateStage = "input" | "uploading" | "translating" | "success";

export interface TranslationResult {
  sourceLanguage: string;
  targetLanguage: string;
  originalText?: string;
  translatedText?: string;
  fileName?: string;
  pageCount?: number;
  mode: TranslateMode;
}

interface TranslateProps {
  variant?: TranslateVariantConfig;
}

const Translate = ({ variant }: TranslateProps = {}) => {
  const location = useLocation();
  const [mode, setMode] = useState<TranslateMode>("document");
  const [stage, setStage] = useState<TranslateStage>("input");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [incomingFileName, setIncomingFileName] = useState<string>("");
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Handle file passed from Storage
  useEffect(() => {
    const stateFile = location.state?.file;
    if (stateFile) {
      setMode("document");
      setIncomingFileName(stateFile.name);
      setStage("uploading");
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        setUploadProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStage("input"), 400);
        }
      }, 100);
    }
  }, [location.state]);

  const handleTranslationComplete = (translationResult: TranslationResult) => {
    setResult(translationResult);
    setStage("success");
  };

  const handleReset = () => {
    setStage("input");
    setResult(null);
    setIncomingFileName("");
    setUploadProgress(0);
  };

  const handleModeChange = (newMode: TranslateMode) => {
    // Gate dual-language mode behind upgrade
    if (newMode === "dual") {
      setShowUpgradeModal(true);
      return;
    }
    setMode(newMode);
    setStage("input");
    setResult(null);
  };

  const renderUploadingState = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
          <motion.div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="space-y-2">
          <p className="text-lg font-medium">Preparing document...</p>
          <p className="text-sm text-muted-foreground">{incomingFileName}</p>
          <div className="w-48 h-1.5 bg-muted rounded-full mx-auto overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <Helmet>
        <title>
          {variant
            ? variant.title
            : "Translate Documents Online — 75+ Languages | Docsora"}
        </title>
        <meta
          name="description"
          content={
            variant
              ? variant.metaDescription
              : "Translate PDFs, Word, PowerPoint, HTML, and TXT documents into 75+ languages with formatting preserved. Free, secure, browser-based document translator for students, professionals, and teams."
          }
        />
        <link rel="canonical" href={variant ? `/${variant.slug}` : "/translate"} />
        <meta
          property="og:title"
          content={variant ? variant.title : "Translate Documents Online — Docsora"}
        />
        <meta
          property="og:description"
          content={
            variant
              ? variant.metaDescription
              : "Whole-document translation in 75+ languages with formatting preserved."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={variant ? `/${variant.slug}` : "/translate"} />
        {!variant && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Translate", item: "/translate" },
            ],
          })}</script>
        )}
        {!variant && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Docsora Translate",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            description: "Whole-document translation in 75+ languages with formatting, layouts, tables, and slide structure preserved.",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          })}</script>
        )}
        {!variant && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: TRANSLATE_FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          })}</script>
        )}
        {!variant && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to translate a document online into another language",
            description: "Translate PDF, Word, PowerPoint, HTML, or TXT documents into 75+ languages while preserving formatting.",
            step: [
              { "@type": "HowToStep", position: 1, name: "Upload your document", text: "Drop a PDF, DOCX, PPTX, HTML, or TXT file into Docsora Translate in your browser." },
              { "@type": "HowToStep", position: 2, name: "Select a target language", text: "Pick from 75+ languages — Docsora auto-detects the source language." },
              { "@type": "HowToStep", position: 3, name: "Translate with formatting preserved", text: "Docsora localizes the entire document while keeping layouts, fonts, tables, and slide structure intact." },
              { "@type": "HowToStep", position: 4, name: "Download the translated file", text: "Export the translated document in the original format, ready to share, sign, or distribute." },
            ],
          })}</script>
        )}
        {!variant && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Docsora Translate tools and language pairs",
            itemListElement: [
              ...documentToolVariants.slice(0, 8),
              ...workflowVariants.slice(0, 6),
              ...languagePairVariants.slice(0, 10),
            ].map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.cardTitle ?? v.h1,
              url: `/${v.slug}`,
            })),
          })}</script>
        )}
      </Helmet>
      <div className="p-6 lg:p-8 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header - hide during translating and success */}
          {stage === "input" && (
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                {variant ? variant.h1 : "Translate documents into 75+ languages"}
              </h1>
              <p className="text-muted-foreground">
                {variant ? variant.intro : "PDFs, presentations, Word files, and more — translated online with formatting preserved."}
              </p>
            </div>
          )}

          {/* Mode Selector */}
          {stage === "input" && (
            <TranslateModeSelector mode={mode} onModeChange={handleModeChange} />
          )}

          {/* Uploading state */}
          {stage === "uploading" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderUploadingState()}
            </motion.div>
          )}

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {stage === "input" && (
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {mode === "text" && (
                  <TranslateTextMode
                    onTranslate={handleTranslationComplete}
                    onStartTranslating={() => setStage("translating")}
                  />
                )}
                {mode === "document" && (
                  <TranslateDocumentMode
                    onTranslate={handleTranslationComplete}
                    onStartTranslating={() => setStage("translating")}
                  />
                )}
                {mode === "dual" && (
                  <TranslateDualMode
                    onTranslate={handleTranslationComplete}
                    onStartTranslating={() => setStage("translating")}
                  />
                )}
              </motion.div>
            )}

            {stage === "translating" && (
              <TranslateProcessing />
            )}

            {stage === "success" && result && (
              <TranslateSuccess result={result} onReset={handleReset} />
            )}
          </AnimatePresence>

          {/* Trust Signals */}
          {stage === "input" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Formatting preserved
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                No data used for training
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                75+ languages
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Upgrade Modal for Dual-Language */}
        <UpgradeModal 
          open={showUpgradeModal} 
          onClose={() => setShowUpgradeModal(false)} 
        />
      </div>

      {/* Below-the-fold SEO ecosystem */}
      {stage === "input" && <TranslateSEO variant={variant} />}
    </AppLayout>
  );
};

export default Translate;
