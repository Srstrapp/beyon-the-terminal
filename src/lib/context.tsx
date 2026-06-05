"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolioData } from "./data";

type Language = "es" | "en";
type Mode = "dev" | "human";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  content: typeof portfolioData["es"];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");
  const [mode, setMode] = useState<Mode>("dev");

  useEffect(() => {
    if (mode === "dev") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        mode,
        setMode,
        content: portfolioData[language],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
