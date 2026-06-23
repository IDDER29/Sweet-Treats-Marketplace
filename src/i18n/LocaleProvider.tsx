"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DEFAULT_LOCALE, LOCALE_CONFIG, type Locale } from "@/config";
import { messages, type MessageKey } from "./messages";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey) => string;
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "locale";

/**
 * Client-side locale provider. Persists the chosen locale and reflects its
 * direction (LTR/RTL) onto <html> so Arabic renders right-to-left. Currency
 * formatting reads the same locale via `formatPrice`.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && messages[saved]) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = LOCALE_CONFIG[locale].dir;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const t = (key: MessageKey) =>
    messages[locale][key] ?? messages[DEFAULT_LOCALE][key] ?? key;

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t, dir: LOCALE_CONFIG[locale].dir }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
