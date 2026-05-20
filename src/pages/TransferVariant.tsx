import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Transfer from "./Transfer";
import { transferVariantBySlug } from "@/data/transferVariants";

const TransferVariant = () => {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").split("/")[0];
  const variant = slug ? transferVariantBySlug[slug] : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  if (!variant) {
    return <Navigate to="/transfer" replace />;
  }

  return <Transfer variant={variant} />;
};

export default TransferVariant;