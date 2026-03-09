"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import enMessages from "@/i18n/en.json";
import zhMessages from "@/i18n/zh.json";

type Locale = "en" | "zh";
type Messages = typeof enMessages;

const STORAGE_KEY = "robotx-locale";

const MESSAGES: Record<Locale, Messages> = {
  en: enMessages,
  zh: zhMessages as Messages,
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getByPath(source: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }
    return undefined;
  }, source);
  return typeof value === "string" ? value : undefined;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);
    return savedLocale === "zh" ? "zh" : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const currentMessages = MESSAGES[locale];
    return {
      locale,
      setLocale,
      t: (key) => getByPath(currentMessages, key) ?? getByPath(enMessages, key) ?? key,
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
