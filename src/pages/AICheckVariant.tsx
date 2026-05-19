import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AICheck from "./AICheck";
import { aiCheckVariantBySlug } from "@/data/aiCheckVariants";

/**
 * Wraps the main /ai-check experience with variant-specific SEO metadata,
 * H1, copy and FAQ - preserving the identical premium upload UX above the
 * fold across every long-tail AI writing landing page.
 */
const AICheckVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? aiCheckVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/ai-check" replace />;
  }

  return <AICheck variant={variant} />;
};

export default AICheckVariant;