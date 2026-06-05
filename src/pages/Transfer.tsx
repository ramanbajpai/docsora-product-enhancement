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

  const pageTitle = variant?.title ?? "Docsora Transfer — Send Large Files Instantly";
  const pageDescription =
    variant?.metaDescription ??
    "Browser-native file delivery for creators, agencies, freelancers and teams. Send large files securely with tracking and encryption.";
  const canonicalPath = variant ? `/${variant.slug}` : "/transfer";
  const h1 = variant?.h1 ?? "Send Large Files Instantly";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (variant?.faq ?? [
      { question: "How do I send large files online?", answer: "Drop your files into the transfer card, choose link or email delivery, set an expiry and password, and Docsora generates a secure delivery link in seconds." },
      { question: "Is Docsora a real WeTransfer alternative?", answer: "Yes. Docsora keeps the drag-and-drop simplicity and adds tracking, encryption and workflow integration for modern teams." },
      { question: "What's the max file size?", answer: "Docsora supports oversized files well beyond inbox limits — multi-GB transfers handled in a single browser session." },
      { question: "Are transfers secure?", answer: "Every transfer runs over TLS with encryption at rest, optional password protection, expiring links and download caps." },
      { question: "Can I track who downloaded my files?", answer: "Yes. Docsora lets you track transfer activity, including views, downloads and recipient engagement." },
      { question: "Can I extend an expired transfer?", answer: "Yes. Docsora allows you to extend expiry dates or reactivate transfers without re-uploading files." },
      { question: "Do recipients need a Docsora account?", answer: "No. Recipients can access and download files without creating an account." },
      { question: "What file types does Docsora support?", answer: "Docsora supports over 100 file types including PDFs, Word documents, PowerPoint files, ZIP archives, videos, images, CAD files and creative assets." },
      { question: "Is Docsora secure?", answer: "Docsora uses encrypted file transfer and is built around enterprise-grade security practices including GDPR compliance, ISO 27001 certification and SOC 2 Type I compliance." },
      { question: "What makes Docsora different from WeTransfer?", answer: "Docsora combines file transfer with download tracking, transfer history, expiry management and recipient visibility from a single dashboard." },
      { question: "Can I send folders and multiple files?", answer: "Yes. Upload multiple files or entire project packages and share them through a single transfer." },
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
