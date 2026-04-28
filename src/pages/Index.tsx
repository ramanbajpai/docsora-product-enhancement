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
import { Sparkles } from "lucide-react";

export default function Index() {
  // For demo: always show modal (in real app, check auth state)
  const [showAuthGate, setShowAuthGate] = useState(true);
  const [isAuthenticated] = useState(false); // Would come from auth context
  const { isFocusMode, enterFocus } = useFocusMode();

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
    </AppLayout>
  );
}
