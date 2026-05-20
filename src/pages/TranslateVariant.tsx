import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Translate from "./Translate";
import { translateVariantBySlug } from "@/data/translateVariants";

const TranslateVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? translateVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/translate" replace />;
  }

  return <Translate variant={variant} />;
};

export default TranslateVariant;