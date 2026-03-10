"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function PartnersPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-10 text-white">
        <h1 className="text-4xl font-bold">{t("partners.hero.title")}</h1>
        <p className="mt-3 text-lg text-white/90">{t("partners.hero.subtitle")}</p>
      </section>

      <section className="mt-12 rounded-3xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold">{t("partners.content.title")}</h2>
        <p className="mt-4 text-lg text-gray-700">{t("partners.content.description")}</p>
      </section>
    </main>
  );
}