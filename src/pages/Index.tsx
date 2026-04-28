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
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--primary)/0.06),transparent_60%)]" />
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

      {/* Dark overlay when gated */}
      <AnimatePresence>
        {isGated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-black/40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Auth Gate Modal */}
      <CreateAccountModal 
        open={isGated} 
        onClose={() => setShowAuthGate(false)} 
      />
    </AppLayout>
  );
}
