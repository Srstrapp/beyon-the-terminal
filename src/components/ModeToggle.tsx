"use client";

import { motion } from "framer-motion";
import { Terminal, User } from "lucide-react";
import { useAppContext } from "@/lib/context";

export function ModeToggle() {
  const { mode, setMode } = useAppContext();

  const isDev = mode === "dev";

  return (
    <button
      onClick={() => setMode(isDev ? "human" : "dev")}
      className={`glass px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group ${
        isDev ? "bg-surface-container-lowest/60 border-white/10" : "bg-white/40 border-black/10"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDev ? 0 : 360 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {isDev ? (
          <Terminal className="text-primary group-hover:text-primary-fixed transition-colors neon-glow w-5 h-5" />
        ) : (
          <User className="text-[#1A1A1A] group-hover:text-black transition-colors w-5 h-5" />
        )}
      </motion.div>
      <span
        className={`uppercase tracking-widest transition-colors ${
          isDev
            ? "font-code-label text-xs text-primary group-hover:text-primary-fixed neon-glow"
            : "font-ui-label text-[12px] text-[#1A1A1A] font-bold group-hover:text-black"
        }`}
      >
        {isDev ? "Dev Mode" : "Human Mode"}
      </span>
    </button>
  );
}
