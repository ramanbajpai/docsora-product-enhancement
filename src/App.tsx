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
import AICompareLanding from "./pages/AICompareLanding";
import Compress from "./pages/Compress";
import CompressVariant from "./pages/CompressVariant";
import CompareLanding from "./pages/CompareLanding";
import Convert from "./pages/Convert";
import ConvertVariant from "./pages/ConvertVariant";
import ConvertCompareLanding from "./pages/ConvertCompareLanding";
import Storage from "./pages/Storage";
import Track from "./pages/Track";
import Translate from "./pages/Translate";
import Transfer from "./pages/Transfer";
import Tools from "./pages/Tools";
import Tool from "./pages/Tool";
import Sign from "./pages/Sign";
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
            <Route path="/check-contract-language" element={<AICheckVariant />} />
            <Route path="/improve-business-writing" element={<AICheckVariant />} />
            <Route path="/proofread-presentations" element={<AICheckVariant />} />
            <Route path="/check-document-for-errors" element={<AICheckVariant />} />
            <Route path="/fix-grammar-online" element={<AICheckVariant />} />
            <Route path="/professional-writing-checker" element={<AICheckVariant />} />
            <Route path="/proofreading-tool-online" element={<AICheckVariant />} />
            <Route path="/compare/docsora-vs-grammarly" element={<AICompareLanding />} />
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
            <Route path="/convert-files-online" element={<ConvertVariant />} />
            {/* Conversion comparison landing pages */}
            <Route path="/compare/docsora-vs-ilovepdf-convert" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-smallpdf-convert" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-adobe" element={<ConvertCompareLanding />} />
            <Route path="/compare/docsora-vs-cloudconvert" element={<ConvertCompareLanding />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/track" element={<Track />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/:toolId" element={<Tool />} />
            <Route path="/sign" element={<Sign />} />
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
