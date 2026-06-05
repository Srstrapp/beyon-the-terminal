"use client";

import { useAppContext } from "@/lib/context";

export function LanguageSelector() {
  const { language, setLanguage, mode } = useAppContext();
  const isDev = mode === "dev";

  return (
    <div className={`flex items-center gap-2 ${isDev ? "text-primary" : "text-[#1A1A1A]"}`}>
      <button
        onClick={() => setLanguage("es")}
        className={`uppercase tracking-widest text-xs transition-opacity hover:opacity-100 ${
          language === "es" ? "opacity-100 font-bold" : "opacity-50"
        } ${isDev ? "font-code-label neon-glow" : "font-ui-label"}`}
      >
        ES
      </button>
      <span className="opacity-50">|</span>
      <button
        onClick={() => setLanguage("en")}
        className={`uppercase tracking-widest text-xs transition-opacity hover:opacity-100 ${
          language === "en" ? "opacity-100 font-bold" : "opacity-50"
        } ${isDev ? "font-code-label neon-glow" : "font-ui-label"}`}
      >
        EN
      </button>
    </div>
  );
}
