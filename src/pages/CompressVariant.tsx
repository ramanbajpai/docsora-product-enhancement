import { useLocation, Navigate } from "react-router-dom";
import Compress from "./Compress";
import { compressVariantBySlug } from "@/data/compressVariants";

/**
 * Wraps the main Compress experience with variant-specific SEO metadata,
 * H1, copy and FAQ - preserving the identical premium upload UX above the fold.
 */
const CompressVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? compressVariantBySlug[slug] : undefined;

  if (!variant) {
    return <Navigate to="/compress" replace />;
  }

  return <Compress variant={variant} />;
};

export default CompressVariant;