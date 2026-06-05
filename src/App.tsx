import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { FocusModeProvider } from "@/contexts/FocusModeContext";
import Index from "./pages/Index";
import Activity from "./pages/Activity";
import Templates from "./pages/Templates";
import TemplateBuilder from "./pages/TemplateBuilder";
import ActiveFlow from "./pages/ActiveFlow";
import AICheck from "./pages/AICheck";
import AICheckVariant from "./pages/AICheckVariant";
import AICheckGuide from "./pages/AICheckGuide";
import AICompareLanding from "./pages/AICompareLanding";
import AIGrammarlyCompare from "./pages/AIGrammarlyCompare";
import Compress from "./pages/Compress";
import CompressVariant from "./pages/CompressVariant";
import CompressGuide from "./pages/CompressGuide";
import CompareLanding from "./pages/CompareLanding";
import Convert from "./pages/Convert";
import ConvertVariant from "./pages/ConvertVariant";
import ConvertCompareLanding from "./pages/ConvertCompareLanding";
import ConvertGuide from "./pages/ConvertGuide";
import Storage from "./pages/Storage";
import Track from "./pages/Track";
import Translate from "./pages/Translate";
import TranslateVariant from "./pages/TranslateVariant";
import TranslateGuide from "./pages/TranslateGuide";
import TranslateCompareLanding from "./pages/TranslateCompareLanding";
import Transfer from "./pages/Transfer";
import TransferVariant from "./pages/TransferVariant";
import TransferCompareLanding from "./pages/TransferCompareLanding";
import Tools from "./pages/Tools";
import Tool from "./pages/Tool";
import PDFToolLanding from "./pages/PDFToolLanding";
import Sign from "./pages/Sign";
import SignVariant from "./pages/SignVariant";
import DocumentViewer from "./pages/DocumentViewer";
import SignedDocumentViewerPage from "./pages/SignedDocumentViewerPage";
import NotFound from "./pages/NotFound";
import SignReceived from "./pages/SignReceived";
import SignerSetup from "./pages/SignerSetup";
import ApproveReceived from "./pages/ApproveReceived";
import Profile from "./pages/settings/Profile";
import Account from "./pages/settings/Account";
import Workspace from "./pages/settings/Workspace";
import Billing from "./pages/settings/Billing";
import Security from "./pages/settings/Security";
import Notifications from "./pages/settings/Notifications";
import Help from "./pages/settings/Help";
import AuditLogs from "./pages/settings/AuditLogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <FocusModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/new" element={<TemplateBuilder />} />
            <Route path="/flows/:runId" element={<ActiveFlow />} />
            <Route path="/ai-check" element={<AICheck />} />
            <Route path="/grammar-checker" element={<AICheckVariant />} />
            <Route path="/proofread-pdf" element={<AICheckVariant />} />
            <Route path="/ai-writing-assistant" element={<AICheckVariant />} />
            <Route path="/review-contract-language" element={<AICheckVariant />} />
            {/* AI Check — sentence enhancement / rewriting workflows */}
            <Route path="/sentence-enhancer" element={<AICheckVariant />} />
            <Route path="/improve-sentence-clarity" element={<AICheckVariant />} />
            <Route path="/rewrite-business-sentences" element={<AICheckVariant />} />
            <Route path="/improve-writing-flow" element={<AICheckVariant />} />
            <Route path="/rewrite-awkward-sentences" element={<AICheckVariant />} />
            <Route path="/improve-executive-writing" element={<AICheckVariant />} />
            <Route path="/sentence-rewriter" element={<AICheckVariant />} />
            <Route path="/clarity-improver" element={<AICheckVariant />} />
            <Route path="/improve-document-readability" element={<AICheckVariant />} />
            <Route path="/improve-professional-writing" element={<AICheckVariant />} />
            {/* AI Check — guides */}
            <Route path="/ai-guides/:slug" element={<AICheckGuide />} />
            <Route path="/improve-business-writing" element={<AICheckVariant />} />
            <Route path="/proofread-presentations" element={<AICheckVariant />} />
            <Route path="/check-document-for-errors" element={<AICheckVariant />} />
            <Route path="/fix-grammar-online" element={<AICheckVariant />} />
            <Route path="/professional-writing-checker" element={<AICheckVariant />} />
            <Route path="/proofreading-tool-online" element={<AICheckVariant />} />
            <Route path="/document-proofreader" element={<AICheckVariant />} />
            <Route path="/compare/docsora-vs-grammarly" element={<AIGrammarlyCompare />} />
            <Route path="/compare/docsora-vs-quillbot" element={<AICompareLanding />} />
            <Route path="/compare/docsora-vs-languagetool" element={<AICompareLanding />} />
            <Route path="/compress" element={<Compress />} />
            {/* Compression authority hub — variant landing pages */}
            <Route path="/compress-pdf" element={<CompressVariant />} />
            <Route path="/compress-pdf-online" element={<CompressVariant />} />
            <Route path="/compress-jpg" element={<CompressVariant />} />
            <Route path="/compress-png" element={<CompressVariant />} />
            <Route path="/compress-word-document" element={<CompressVariant />} />
            <Route path="/compress-word-documents" element={<CompressVariant />} />
            <Route path="/compress-powerpoint" element={<CompressVariant />} />
            <Route path="/compress-excel-files" element={<CompressVariant />} />
            <Route path="/compress-images" element={<CompressVariant />} />
            <Route path="/compress-large-files" element={<CompressVariant />} />
            <Route path="/compress-email-attachments" element={<CompressVariant />} />
            <Route path="/compress-marketing-assets" element={<CompressVariant />} />
            <Route path="/compress-client-deliverables" element={<CompressVariant />} />
            <Route path="/reduce-file-size-for-email" element={<CompressVariant />} />
            <Route path="/compress-files-without-losing-quality" element={<CompressVariant />} />
            <Route path="/online-file-compressor" element={<CompressVariant />} />
            <Route path="/free-file-compressor" element={<CompressVariant />} />
            <Route path="/free-online-file-compressor" element={<CompressVariant />} />
            <Route path="/compress-files-online" element={<CompressVariant />} />
            <Route path="/reduce-file-size" element={<CompressVariant />} />
            <Route path="/reduce-pdf-size" element={<CompressVariant />} />
            <Route path="/reduce-image-size" element={<CompressVariant />} />
            <Route path="/reduce-powerpoint-file-size" element={<CompressVariant />} />
            <Route path="/reduce-excel-file-size" element={<CompressVariant />} />
            {/* Compression knowledge / guide spoke pages */}
            <Route path="/guides/:slug" element={<CompressGuide />} />
            {/* Compression comparison landing pages */}
            <Route path="/compare/docsora-vs-smallpdf" element={<CompareLanding />} />
            <Route path="/compare/docsora-vs-ilovepdf" element={<CompareLanding />} />
            <Route path="/compare/docsora-vs-adobe-acrobat" element={<CompareLanding />} />
            <Route path="/convert" element={<Convert />} />
            {/* Conversion authority hub — variant landing pages */}
            <Route path="/pdf-to-word" element={<ConvertVariant />} />
            <Route path="/word-to-pdf" element={<ConvertVariant />} />
            <Route path="/excel-to-pdf" element={<ConvertVariant />} />
            <Route path="/powerpoint-to-pdf" element={<ConvertVariant />} />
            <Route path="/jpg-to-pdf" element={<ConvertVariant />} />
            <Route path="/png-to-pdf" element={<ConvertVariant />} />
            <Route path="/pdf-to-jpg" element={<ConvertVariant />} />
            <Route path="/pdf-to-png" element={<ConvertVariant />} />
            <Route path="/pdf-to-powerpoint" element={<ConvertVariant />} />
            <Route path="/pdf-to-text" element={<ConvertVariant />} />
            <Route path="/spreadsheet-to-pdf" element={<ConvertVariant />} />
            <Route path="/html-to-pdf" element={<ConvertVariant />} />
            <Route path="/txt-to-pdf" element={<ConvertVariant />} />
            <Route path="/csv-to-pdf" element={<ConvertVariant />} />
            <Route path="/odt-to-pdf" element={<ConvertVariant />} />
            <Route path="/xml-to-pdf" element={<ConvertVariant />} />
            <Route path="/pdf-to-excel" element={<ConvertVariant />} />
            <Route path="/pdf-to-odt" element={<ConvertVariant />} />
            <Route path="/jpg-to-png" element={<ConvertVariant />} />
            <Route path="/png-to-jpg" element={<ConvertVariant />} />
            <Route path="/csv-to-xlsx" element={<ConvertVariant />} />
            <Route path="/xlsx-to-csv" element={<ConvertVariant />} />
            <Route path="/docx-to-odt" element={<ConvertVariant />} />
            <Route path="/odt-to-docx" element={<ConvertVariant />} />
            {/* Long-tail format-pair landing pages */}
            <Route path="/pdf-to-pdfa" element={<ConvertVariant />} />
            <Route path="/pdf-to-doc" element={<ConvertVariant />} />
            <Route path="/pdf-to-docx" element={<ConvertVariant />} />
            <Route path="/pdf-to-html" element={<ConvertVariant />} />
            <Route path="/pdf-to-ppt" element={<ConvertVariant />} />
            <Route path="/pdf-to-pptx" element={<ConvertVariant />} />
            <Route path="/pdf-to-odp" element={<ConvertVariant />} />
            <Route path="/pdf-to-xml" element={<ConvertVariant />} />
            <Route path="/pdf-to-gif" element={<ConvertVariant />} />
            <Route path="/pdf-to-tiff" element={<ConvertVariant />} />
            <Route path="/pdf-to-bmp" element={<ConvertVariant />} />
            <Route path="/pdf-to-webp" element={<ConvertVariant />} />
            <Route path="/jpeg-to-pdf" element={<ConvertVariant />} />
            <Route path="/gif-to-pdf" element={<ConvertVariant />} />
            <Route path="/bmp-to-pdf" element={<ConvertVariant />} />
            <Route path="/tiff-to-pdf" element={<ConvertVariant />} />
            <Route path="/webp-to-pdf" element={<ConvertVariant />} />
            <Route path="/doc-to-pdf" element={<ConvertVariant />} />
            <Route path="/docx-to-pdf" element={<ConvertVariant />} />
            <Route path="/ods-to-pdf" element={<ConvertVariant />} />
            <Route path="/odp-to-pdf" element={<ConvertVariant />} />
            <Route path="/eml-to-pdf" element={<ConvertVariant />} />
            <Route path="/convert-files-online" element={<ConvertVariant />} />
            {/* Conversion comparison landing pages */}
            <Route path="/compare/docsora-vs-ilovepdf-convert" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-smallpdf-convert" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-adobe" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-cloudconvert" element={<ConvertCompareLanding />} />
            {/* Conversion knowledge guides */}
            <Route path="/convert-guides/:slug" element={<ConvertGuide />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/track" element={<Track />} />
            <Route path="/translate" element={<Translate />} />
            {/* Translate authority hub — variant landing pages */}
            <Route path="/translate-pdf" element={<TranslateVariant />} />
            <Route path="/translate-word-document" element={<TranslateVariant />} />
            <Route path="/translate-powerpoint" element={<TranslateVariant />} />
            <Route path="/translate-contracts" element={<TranslateVariant />} />
            <Route path="/translate-business-documents" element={<TranslateVariant />} />
            <Route path="/translate-presentation-slides" element={<TranslateVariant />} />
            <Route path="/translate-html-files" element={<TranslateVariant />} />
            <Route path="/translate-operational-documents" element={<TranslateVariant />} />
            <Route path="/translate-reports" element={<TranslateVariant />} />
            <Route path="/translate-txt-files" element={<TranslateVariant />} />
            <Route path="/translate-docx" element={<TranslateVariant />} />
            <Route path="/translate-pptx" element={<TranslateVariant />} />
            <Route path="/translate-legal-documents" element={<TranslateVariant />} />
            <Route path="/translate-training-materials" element={<TranslateVariant />} />
            <Route path="/translate-onboarding-documents" element={<TranslateVariant />} />
            {/* Translate operational workflow pages */}
            <Route path="/multilingual-business-workflows" element={<TranslateVariant />} />
            <Route path="/translate-investor-presentations" element={<TranslateVariant />} />
            <Route path="/translate-client-proposals" element={<TranslateVariant />} />
            <Route path="/translate-operational-handbooks" element={<TranslateVariant />} />
            <Route path="/translate-hr-documents" element={<TranslateVariant />} />
            <Route path="/translate-global-training-material" element={<TranslateVariant />} />
            <Route path="/translate-board-presentations" element={<TranslateVariant />} />
            <Route path="/translate-marketing-material" element={<TranslateVariant />} />
            <Route path="/translate-product-documentation" element={<TranslateVariant />} />
            {/* Translate knowledge / guide pages */}
            <Route path="/translate-guides/:slug" element={<TranslateGuide />} />
            {/* Translate — language-pair long-tail landing pages */}
            <Route path="/translate-english-to-spanish" element={<TranslateVariant />} />
            <Route path="/translate-english-to-arabic" element={<TranslateVariant />} />
            <Route path="/translate-english-to-french" element={<TranslateVariant />} />
            <Route path="/translate-english-to-german" element={<TranslateVariant />} />
            <Route path="/translate-english-to-chinese" element={<TranslateVariant />} />
            <Route path="/translate-pdf-to-french" element={<TranslateVariant />} />
            <Route path="/translate-word-document-to-german" element={<TranslateVariant />} />
            <Route path="/translate-pptx-to-japanese" element={<TranslateVariant />} />
            <Route path="/translate-business-documents-to-hindi" element={<TranslateVariant />} />
            <Route path="/translate-contracts-to-portuguese" element={<TranslateVariant />} />
            <Route path="/translate-training-material-to-spanish" element={<TranslateVariant />} />
            {/* Translate comparison landing pages */}
            <Route path="/compare/docsora-vs-google-translate" element={<TranslateCompareLanding />} />
            <Route path="/compare/docsora-vs-deepl" element={<TranslateCompareLanding />} />
            <Route path="/compare/docsora-vs-smallpdf-translate" element={<TranslateCompareLanding />} />
            <Route path="/compare/docsora-vs-ilovepdf-translate" element={<TranslateCompareLanding />} />
            <Route path="/transfer" element={<Transfer />} />
            {/* Transfer comparison landing pages */}
            <Route path="/wetransfer-alternative" element={<TransferCompareLanding />} />
            <Route path="/dropbox-transfer-alternative" element={<TransferCompareLanding />} />
            <Route path="/masv-alternative" element={<TransferCompareLanding />} />
            <Route path="/smash-alternative" element={<TransferCompareLanding />} />
            <Route path="/transfernow-alternative" element={<TransferCompareLanding />} />
            <Route path="/send-large-files" element={<TransferVariant />} />
            <Route path="/large-file-transfer" element={<TransferVariant />} />
            <Route path="/wetransfer-alternative" element={<TransferVariant />} />
            <Route path="/secure-file-transfer" element={<TransferVariant />} />
            <Route path="/send-large-videos" element={<TransferVariant />} />
            <Route path="/send-large-files-online" element={<TransferVariant />} />
            <Route path="/share-large-files" element={<TransferVariant />} />
            <Route path="/large-media-transfer" element={<TransferVariant />} />
            <Route path="/send-large-pdf-files" element={<TransferVariant />} />
            <Route path="/send-large-powerpoint-files" element={<TransferVariant />} />
            <Route path="/send-large-design-files" element={<TransferVariant />} />
            <Route path="/agency-file-sharing" element={<TransferVariant />} />
            <Route path="/client-file-delivery" element={<TransferVariant />} />
            <Route path="/browser-file-transfer" element={<TransferVariant />} />
            <Route path="/email-large-files" element={<TransferVariant />} />
            <Route path="/encrypted-file-transfer" element={<TransferVariant />} />
            <Route path="/send-files-online" element={<TransferVariant />} />
            <Route path="/large-file-sharing" element={<TransferVariant />} />
            <Route path="/transfer-large-files-online" element={<TransferVariant />} />
            <Route path="/creative-agency-file-sharing" element={<TransferVariant />} />
            <Route path="/video-file-transfer" element={<TransferVariant />} />
            <Route path="/cad-file-transfer" element={<TransferVariant />} />
            <Route path="/legal-file-sharing" element={<TransferVariant />} />
            <Route path="/consulting-file-sharing" element={<TransferVariant />} />
            <Route path="/freelancer-file-transfer" element={<TransferVariant />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolId" element={<Tool />} />
            <Route path="/edit-pdf" element={<PDFToolLanding />} />
            {/* Edit PDF — workflow sub-slugs (share the edit editor, render unique SEO) */}
            <Route path="/edit-contract-pdf" element={<PDFToolLanding />} />
            <Route path="/edit-proposal-pdf" element={<PDFToolLanding />} />
            <Route path="/annotate-pdf" element={<PDFToolLanding />} />
            <Route path="/add-signature-to-pdf" element={<PDFToolLanding />} />
            <Route path="/redact-pdf" element={<PDFToolLanding />} />
            <Route path="/edit-scanned-pdf" element={<PDFToolLanding />} />
            <Route path="/add-image-to-pdf" element={<PDFToolLanding />} />
            <Route path="/markup-pdf-online" element={<PDFToolLanding />} />
            <Route path="/browser-pdf-editor" element={<PDFToolLanding />} />
            <Route path="/edit-pdf-without-adobe" element={<PDFToolLanding />} />
            <Route path="/edit-pdf-text" element={<PDFToolLanding />} />
            <Route path="/fill-pdf-forms" element={<PDFToolLanding />} />
            <Route path="/edit-pdf-on-mac" element={<PDFToolLanding />} />
            <Route path="/online-pdf-editor" element={<PDFToolLanding />} />
            <Route path="/pdf-markup-tool" element={<PDFToolLanding />} />
            <Route path="/merge-pdf" element={<PDFToolLanding />} />
            <Route path="/split-pdf" element={<PDFToolLanding />} />
            <Route path="/rotate-pdf" element={<PDFToolLanding />} />
            <Route path="/delete-pdf-pages" element={<PDFToolLanding />} />
            <Route path="/organize-pdf" element={<PDFToolLanding />} />
            <Route path="/extract-pdf-pages" element={<PDFToolLanding />} />
            <Route path="/protect-pdf" element={<PDFToolLanding />} />
            <Route path="/watermark-pdf" element={<PDFToolLanding />} />
            <Route path="/compare-pdf" element={<PDFToolLanding />} />
            <Route path="/repair-pdf" element={<PDFToolLanding />} />
            <Route path="/pdf-metadata-editor" element={<PDFToolLanding />} />
            <Route path="/pdf-to-one-page" element={<PDFToolLanding />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/sign-pdf-online" element={<SignVariant />} />
            <Route path="/request-signatures" element={<SignVariant />} />
            <Route path="/sign-contracts-online" element={<SignVariant />} />
            <Route path="/electronic-signatures" element={<SignVariant />} />
            <Route path="/proposal-approval-workflows" element={<SignVariant />} />
            <Route path="/nda-signing" element={<SignVariant />} />
            <Route path="/online-document-approval" element={<SignVariant />} />
            <Route path="/reusable-signature-templates" element={<SignVariant />} />
            <Route path="/client-approval-software" element={<SignVariant />} />
            <Route path="/document-signing-platform" element={<SignVariant />} />
            <Route path="/document-viewer" element={<DocumentViewer />} />
            <Route path="/signed-document-viewer" element={<SignedDocumentViewerPage />} />
            <Route path="/sign/received/:requestId/setup" element={<SignerSetup />} />
            <Route path="/sign/received/:requestId" element={<SignReceived />} />
            <Route path="/approve/received/:requestId" element={<ApproveReceived />} />
            <Route path="/settings/profile" element={<Profile />} />
            <Route path="/settings/account" element={<Account />} />
            <Route path="/settings/workspace" element={<Workspace />} />
            <Route path="/settings/billing" element={<Billing />} />
            <Route path="/settings/security" element={<Security />} />
            <Route path="/settings/notifications" element={<Notifications />} />
            <Route path="/settings/help" element={<Help />} />
            <Route path="/settings/audit-logs" element={<AuditLogs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </FocusModeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
