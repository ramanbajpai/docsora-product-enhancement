import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Tool from "./Tool";
import { PDFToolSEO } from "@/components/tools/PDFToolSEO";
import { pdfToolVariantBySlug } from "@/data/pdfToolVariants";

/**
 * Per-slug PDF tool landing page. Wires unique SEO metadata + JSON-LD
 * (FAQ, Breadcrumb, SoftwareApplication) and renders the existing Tool
 * upload flow above the SEO sections.
 */
const PDFToolLanding = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? pdfToolVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/tools" replace />;
  }

  const canonical = `/${variant.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: variant.faq.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Tools", item: "/tools" },
      { "@type": "ListItem", position: 3, name: variant.category, item: canonical },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `Docsora ${variant.category}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: variant.metaDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <Helmet>
        <title>{variant.title}</title>
        <meta name="description" content={variant.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={variant.title} />
        <meta property="og:description" content={variant.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={variant.title} />
        <meta name="twitter:description" content={variant.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
      </Helmet>
      <h1 className="sr-only">{variant.h1}</h1>
      <Tool toolIdOverride={variant.toolId} seoVariant={variant} />
    </>
  );
};

export default PDFToolLanding;