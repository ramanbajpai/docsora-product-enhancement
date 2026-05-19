import { useLocation, Navigate } from "react-router-dom";
import Convert from "./Convert";
import { convertVariantBySlug } from "@/data/convertVariants";

/**
 * Wraps the main /convert experience with variant-specific SEO metadata,
 * H1, copy and FAQ — preserving the identical premium upload UX above the fold
 * across every long-tail file-conversion landing page.
 */
const ConvertVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? convertVariantBySlug[slug] : undefined;

  if (!variant) {
    return <Navigate to="/convert" replace />;
  }

  return <Convert variant={variant} />;
};

export default ConvertVariant;