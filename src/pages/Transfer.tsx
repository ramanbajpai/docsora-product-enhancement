import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/layout/AppLayout";
import { TransferLanding } from "@/components/transfer/TransferLanding";
import { TransferSEO } from "@/components/transfer/TransferSEO";
import type { TransferVariantConfig } from "@/data/transferVariants";

// Export types for other components that may need them
export interface TransferFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  progress: number;
  status: 'waiting' | 'uploading' | 'completed' | 'error';
}

export interface TransferSettings {
  deliveryMethod: 'link' | 'email';
  recipients: string[];
  subject: string;
  message: string;
  password: string;
  expiryDays: number;
  downloadLimit: number | null;
  viewOnly: boolean;
}

interface TransferProps {
  variant?: TransferVariantConfig;
}

export default function Transfer({ variant }: TransferProps = {}) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [incomingFileName, setIncomingFileName] = useState<string>("");

  // Handle file passed from Storage
  useEffect(() => {
    const stateFile = location.state?.file;
    if (stateFile) {
      setIncomingFileName(stateFile.name);
      setIsLoading(true);
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        setUploadProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
        }
      }, 100);
    }
  }, [location.state]);

  const renderUploadingState = () => (
    <div className="min-h-screen flex items-center justify-center">
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

  const pageTitle = variant?.title ?? "Docsora Transfer - Send Large Files Instantly";
  const pageDescription =
    variant?.metaDescription ??
    "Browser-native file delivery for creators, agencies, freelancers and teams. Send large files securely with tracking and encryption.";
  const canonicalPath = variant ? `/${variant.slug}` : "/transfer";
  const h1 = variant?.h1 ?? "Send Large Files Instantly";

  const faqItems = Array.isArray(variant?.faq) ? variant?.faq : variant?.faq?.items;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqItems ?? [
      { question: "How can I send large files online securely?", answer: "Docsora allows users to upload files, generate secure transfer links and share them instantly with recipients. File transfers are encrypted and can be protected with expiry controls, providing a secure way to send large files online." },
      { question: "Can I track who downloaded my files?", answer: "Yes. Docsora provides transfer tracking so users can monitor views, downloads and recipient activity. This helps teams understand whether files have been received and accessed." },
      { question: "Can I extend or reactivate expired file transfers?", answer: "Yes. Docsora allows users to extend transfer expiry dates and reactivate expired transfers without needing to upload files again. This helps reduce duplicate work and improves file management." },
      { question: "Do recipients need a Docsora account?", answer: "No. Recipients can access files directly through a secure transfer link without creating an account or installing software." },
      { question: "What file types can I send with Docsora?", answer: "Docsora supports over 100 file types including PDF, Word, Excel, PowerPoint, ZIP, MP4, MOV, PSD, AI, DWG, STL, RAW photography formats and many other business, creative and technical file formats." },
      { question: "Can I send large video files online?", answer: "Yes. Docsora supports large video files including MP4, MOV, ProRes and RAW production formats, making it suitable for creators, production teams and agencies sharing high-resolution content." },
      { question: "Can I send ZIP files online?", answer: "Yes. Users can securely transfer ZIP files, project archives and packaged deliverables through a single transfer link while maintaining visibility over downloads and transfer activity." },
      { question: "Is Docsora secure for business file sharing?", answer: "Yes. Docsora is built for secure business file sharing and compliance-focused environments. The platform is ISO 27001 certified, GDPR compliant, SOC 2 Type I compliant and currently progressing through SOC 2 Type II audit requirements." },
      { question: "What makes Docsora different from traditional file transfer services?", answer: "Traditional file transfer services focus on sending files. Docsora focuses on what happens after files are sent. Users can track downloads, manage transfer history, extend expiry dates, reactivate transfers and maintain visibility over every file they share." },
      { question: "Why do teams choose Docsora for large file transfer?", answer: "Teams use Docsora to securely send large files, monitor recipient activity, manage transfers from a single dashboard and maintain visibility throughout the entire file-sharing process." },
    ]).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Docsora", item: "/" },
      { "@type": "ListItem", position: 2, name: "Transfer", item: "/transfer" },
      ...(variant
        ? [{ "@type": "ListItem", position: 3, name: variant.cardLabel ?? variant.h1, item: `/${variant.slug}` }]
        : []),
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Docsora Transfer",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <AppLayout>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalPath} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalPath} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>
      <h1 className="sr-only">{h1}</h1>
      {isLoading ? (
        <div className="h-screen flex flex-col overflow-hidden">
          {renderUploadingState()}
        </div>
      ) : (
        <div className="relative flex flex-col">
          <div className="h-screen flex flex-col">
            <TransferLanding variant={variant} />
          </div>
          <TransferSEO variant={variant} />
        </div>
      )}
    </AppLayout>
  );
}
