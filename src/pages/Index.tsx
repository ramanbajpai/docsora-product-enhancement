import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { PriorityActions } from "@/components/dashboard/PriorityActions";
import { ContinueYourWork } from "@/components/dashboard/ContinueYourWork";
import { SmartFollowUps } from "@/components/dashboard/SmartFollowUps";
import { RecentOutcomes } from "@/components/dashboard/RecentOutcomes";
import { DocsoraCommand } from "@/components/command";
import { CreateAccountModal } from "@/components/dashboard/CreateAccountModal";

export default function Index() {
  // For demo: always show modal (in real app, check auth state)
  const [showAuthGate, setShowAuthGate] = useState(true);
  const [isAuthenticated] = useState(false); // Would come from auth context

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
        {/* Minimal greeting */}
        <WelcomeBanner userName="Alex" />

        {/* Docsora Command - AI-powered command center */}
        <div className="mt-6">
          <DocsoraCommand />
        </div>

        {/* 1. Priority Actions - Time-sensitive, role-specific tasks */}
        <div className="mt-10">
          <PriorityActions />
        </div>

        {/* 2. Continue your work - Continuity layer for interrupted user actions */}
        <div className="mt-8">
          <ContinueYourWork />
        </div>

        {/* 3. Two column layout for Reminders and Activity */}
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          {/* Follow-ups - Smart, system-driven suggestions */}
          <div className="lg:col-span-2">
            <SmartFollowUps />
          </div>

          {/* Recent outcomes - Value-focused timeline */}
          <div className="lg:col-span-3">
            <RecentOutcomes />
          </div>
        </div>
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
