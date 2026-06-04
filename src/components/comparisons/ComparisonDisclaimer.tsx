import { AlertTriangle } from "lucide-react";

export function ComparisonDisclaimer() {
  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="rounded-xl border border-border/30 bg-card/30 p-6 md:p-8">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-4 h-4 text-muted-foreground/60 mt-0.5 shrink-0" />
          <h3 className="text-sm font-semibold text-foreground tracking-tight">
            Disclaimer
          </h3>
        </div>
        <div className="space-y-3 text-xs text-muted-foreground/70 leading-relaxed">
          <p>
            The information on this page is based on publicly available information and product capabilities at the time of publication. Features, pricing and functionality may change over time. While we make reasonable efforts to keep comparisons accurate, we recommend verifying the latest information directly with the respective provider before making a purchasing decision.
          </p>
          <p>
            All trademarks, product names and company names are the property of their respective owners and are used for identification and comparison purposes only. Docsora is not affiliated with, endorsed by or sponsored by the companies referenced on this page.
          </p>
        </div>
      </div>
    </div>
  );
}
