import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/layout/AppLayout";
import { TranslateVariantLanding } from "@/components/translate/TranslateVariantLanding";
import { translateVariantBySlug } from "@/data/translateVariants";

const TranslateVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? translateVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/translate" replace />;
  }

  return (
    <AppLayout>
      <Helmet>
        <title>{variant.title}</title>
        <meta name="description" content={variant.metaDescription} />
        <link rel="canonical" href={`/${variant.slug}`} />
        <meta property="og:title" content={variant.title} />
        <meta property="og:description" content={variant.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`/${variant.slug}`} />
      </Helmet>
      <TranslateVariantLanding variant={variant} />
    </AppLayout>
  );
};

export default TranslateVariant;