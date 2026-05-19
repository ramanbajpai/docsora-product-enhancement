import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Sign from "./Sign";
import { signVariantBySlug } from "@/data/signVariants";

/**
 * Wraps the main /sign experience with variant-specific SEO metadata,
 * H1, copy and FAQ while preserving the identical premium signing UX
 * above the fold across every long-tail signing landing page.
 */
const SignVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? signVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/sign" replace />;
  }

  return <Sign variant={variant} />;
};

export default SignVariant;