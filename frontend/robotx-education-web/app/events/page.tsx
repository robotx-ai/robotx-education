"use client";

import { useI18n } from "@/i18n/I18nProvider";

export default function EventsPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-blue-600 p-10 text-white">
        <h1 className="text-4xl font-bold">{t("events.hero.title")}</h1>
        <p className="mt-3 text-lg text-white/90">{t("events.hero.subtitle")}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold">{t("events.upcomingTitle")}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">{t("events.cards.c1Title")}</h3>
            <p className="mt-2 text-sm text-gray-500">{t("events.cards.c1Meta")}</p>
            <p className="mt-3 text-gray-700">{t("events.cards.c1Desc")}</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">{t("events.cards.c2Title")}</h3>
            <p className="mt-2 text-sm text-gray-500">{t("events.cards.c2Meta")}</p>
            <p className="mt-3 text-gray-700">{t("events.cards.c2Desc")}</p>
          </article>
        </div>
      </section>
    </main>
  );
}