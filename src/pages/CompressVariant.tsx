import { useParams, Navigate } from "react-router-dom";
import Compress from "./Compress";
import { compressVariantBySlug } from "@/data/compressVariants";

/**
 * Wraps the main Compress experience with variant-specific SEO metadata,
 * H1, copy and FAQ — preserving the identical premium upload UX above the fold.
 */
const CompressVariant = () => {
  const { slug } = useParams<{ slug: string }>();
  const variant = slug ? compressVariantBySlug[slug] : undefined;

  if (!variant) {
    return <Navigate to="/compress" replace />;
  }

  return <Compress variant={variant} />;
};

export default CompressVariant;