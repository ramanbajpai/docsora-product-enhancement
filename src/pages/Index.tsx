import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { PriorityActions } from "@/components/dashboard/PriorityActions";
import { ContinueYourWork } from "@/components/dashboard/ContinueYourWork";
import { DocumentReminders } from "@/components/dashboard/DocumentReminders";
import { RecentFiles } from "@/components/dashboard/RecentFiles";
import { DocsoraAutopilot } from "@/components/dashboard/DocsoraAutopilot";
import { DocsoraCommand } from "@/components/command";
import { CreateAccountModal } from "@/components/dashboard/CreateAccountModal";
import { FocusToggle } from "@/components/focus/FocusToggle";
import { FocusExecution } from "@/components/focus/FocusExecution";
import { useFocusMode } from "@/contexts/FocusModeContext";
import { Sparkles, Rocket, ArrowRight } from "lucide-react";
import { StartProjectModal } from "@/components/templates/StartProjectModal";
import { templates } from "@/data/templates";

export default function Index() {
  // For demo: always show modal (in real app, check auth state)
  const [showAuthGate, setShowAuthGate] = useState(true);
  const [isAuthenticated] = useState(false); // Would come from auth context
  const { isFocusMode, enterFocus } = useFocusMode();
  const [startProjectOpen, setStartProjectOpen] = useState(false);
  const [startProjectInitial, setStartProjectInitial] = useState<string | undefined>();

  const openStartProject = (id?: string) => {
    setStartProjectInitial(id);
    setStartProjectOpen(true);
  };

  // Lock scroll when modal is open
  useEffect(() => {
    if (showAuthGate && !isAuthenticated) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAuthGate, isAuthenticated]);

  const isGated = showAuthGate && !isAuthenticated;

  return (
    <AppLayout>
      {/* Dashboard Content - Blurred when gated */}
      <motion.div 
        className={`p-6 md:p-8 lg:p-10 max-w-5xl mx-auto transition-all duration-500 ${
          isGated ? "blur-md pointer-events-none select-none" : ""
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Global header row: greeting + Focus toggle */}
        <div className="flex items-start justify-between gap-4">
          <WelcomeBanner userName="Alex" />
          <div className="pt-1">
            <FocusToggle />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isFocusMode ? (
            <FocusExecution key="focus" />
          ) : (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Docsora Command - AI-powered command center */}
              <div className="mt-6">
                <DocsoraCommand />
              </div>

              {/* 1. Priority Actions */}
              <div className="mt-10">
                <PriorityActions />
              </div>

              {/* Start a project — Templates entry */}
              <motion.section
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-8 relative overflow-hidden rounded-2xl border border-border/50 bg-card p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Rocket className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-primary">
                        Start a project
                      </span>
                    </div>
                    <h2 className="text-[15px] font-semibold tracking-tight">
                      Launch a structured client project in seconds
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 max-w-md">
                      Pick a blueprint. Add your client. Documents, roles & flow are ready to go.
                    </p>
                  </div>
                  <button
                    onClick={() => openStartProject()}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    Browse templates
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {templates.slice(0, 3).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => openStartProject(t.id)}
                      className="text-left p-3 rounded-xl border border-border/40 hover:border-primary/40 hover:bg-accent/40 transition-all flex items-center gap-3 group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-muted/60 flex items-center justify-center text-base shrink-0">
                        {t.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium truncate">{t.name}</div>
                        <div className="text-[10px] text-muted-foreground truncate">
                          {t.estimatedTime}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.section>

              {/* 2. Continue your work */}
              <div className="mt-8">
                <ContinueYourWork />
              </div>

              {/* 3. Two column layout for Reminders and Activity */}
              <div className="mt-8 grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <DocumentReminders />
                </div>
                <div className="lg:col-span-3">
                  <RecentFiles />
                </div>
              </div>

              {/* Docsora Autopilot - Living system layer */}
              <DocsoraAutopilot />

              {/* Focus Mode entry — activates global mode */}
              <motion.section
                aria-label="Enter Focus Mode"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-surface-1/40 backdrop-blur-sm p-5 sm:p-6 flex items-center justify-between gap-4">
                  {/* Calm animated blue aurora background */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <motion.div
                      aria-hidden
                      className="absolute -left-20 -top-24 h-[320px] w-[420px] rounded-full blur-3xl"
                      style={{ background: "radial-gradient(circle, hsl(217 92% 60% / 0.35), transparent 65%)" }}
                      animate={{ x: [0, 40, -10, 0], y: [0, 20, -10, 0], scale: [1, 1.1, 0.95, 1] }}
                      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute left-1/3 -bottom-32 h-[300px] w-[400px] rounded-full blur-3xl"
                      style={{ background: "radial-gradient(circle, hsl(210 100% 70% / 0.28), transparent 65%)" }}
                      animate={{ x: [0, -30, 20, 0], y: [0, -15, 10, 0], scale: [1, 1.08, 0.97, 1] }}
                      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      aria-hidden
                      className="absolute right-0 top-0 h-[260px] w-[360px] rounded-full blur-3xl"
                      style={{ background: "radial-gradient(circle, hsl(224 80% 55% / 0.22), transparent 70%)" }}
                      animate={{ x: [0, -20, 10, 0], y: [0, 25, -5, 0], scale: [1, 1.05, 1.02, 1] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/40" />
                  </div>
                  <div className="relative z-10 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-medium mb-1">
                      Focus Mode
                    </p>
                    <p className="text-[15px] text-foreground font-medium">
                      Switch to execution. Clear your priorities one by one.
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Hides everything except what needs you.
                    </p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={enterFocus}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative z-10 shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Start Focus
                  </motion.button>
                </div>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Auth Gate Modal */}
      <CreateAccountModal 
        open={isGated} 
        onClose={() => setShowAuthGate(false)} 
      />

      <StartProjectModal
        open={startProjectOpen}
        onOpenChange={setStartProjectOpen}
        initialTemplateId={startProjectInitial}
      />
    </AppLayout>
  );
}
