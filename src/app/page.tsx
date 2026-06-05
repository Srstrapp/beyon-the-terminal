"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/lib/context";
import { DevModeView } from "@/components/DevModeView";
import { HumanModeView } from "@/components/HumanModeView";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function Home() {
  const { mode } = useAppContext();
  const isDev = mode === "dev";

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Global Controls */}
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50 flex items-center gap-6">
        <LanguageSelector />
        <ModeToggle />
      </div>

      <AnimatePresence mode="wait">
        {isDev ? (
          <motion.div
            key="dev-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <DevModeView />
          </motion.div>
        ) : (
          <motion.div
            key="human-mode"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full overflow-y-auto"
          >
            <HumanModeView />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
