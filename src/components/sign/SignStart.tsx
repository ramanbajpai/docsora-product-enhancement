import { motion } from "framer-motion";
import { FileUp, Sparkles, ArrowRight, LayoutTemplate } from "lucide-react";
import { useSignTemplates } from "@/hooks/useSignTemplates";

interface SignStartProps {
  onOneTime: () => void;
  onUseTemplate: () => void;
}

const SignStart = ({ onOneTime, onUseTemplate }: SignStartProps) => {
  const { templates } = useSignTemplates();
  const recent = [...templates]
    .filter((t) => t.lastUsedAt)
    .sort((a, b) => (b.lastUsedAt ?? 0) - (a.lastUsedAt ?? 0))
    .slice(0, 3);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-3xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">Sign</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">How do you want to start?</h1>
          <p className="text-sm text-muted-foreground mt-3 max-w-md mx-auto">
            Send a one-off agreement, or launch a reusable template in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* One-time */}
          <motion.button
            onClick={onOneTime}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group relative text-left rounded-2xl border border-border/60 bg-card/40 hover:bg-card/70 hover:border-border transition-all p-5 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center mb-4">
                <FileUp className="w-4 h-4 text-foreground/70" />
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight">Send a one-time agreement</h3>
              <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">
                Upload a document, place fields, and send it once.
              </p>
              <div className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                Start upload
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>

          {/* Template — featured */}
          <motion.button
            onClick={onUseTemplate}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group relative text-left rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card/60 to-card/40 hover:border-primary/40 transition-all p-5 overflow-hidden shadow-sm"
          >
            <div className="absolute -top-16 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/90 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                  Faster
                </span>
              </div>
              <h3 className="text-[15px] font-semibold tracking-tight">Use a reusable template</h3>
              <p className="text-[12.5px] text-muted-foreground mt-1 leading-relaxed">
                Just add recipient name and email. Everything else is preconfigured.
              </p>
              <div className="mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                Open template gallery
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.button>
        </div>

        {/* Recent templates strip */}
        {recent.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
                Recently launched
              </span>
              <button
                onClick={onUseTemplate}
                className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                See all <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {recent.map((t) => (
                <button
                  key={t.id}
                  onClick={onUseTemplate}
                  className="text-left rounded-xl border border-border/50 bg-card/30 hover:bg-card/60 hover:border-border transition-colors px-3.5 py-3"
                >
                  <div className="text-[13px] font-medium truncate">{t.name}</div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                    {t.roles.length} signer{t.roles.length === 1 ? "" : "s"} · {t.fields.length} fields
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SignStart;