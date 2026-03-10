"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

export default function DonationPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="relative overflow-hidden rounded-3xl">
        <Image
          src="/assets/home/openclaw-learn.webp"
          alt="Donate hero"
          width={1400}
          height={700}
          className="h-72 w-full object-cover md:h-96"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 flex items-center px-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold">{t("donation.hero.title")}</h1>
            <p className="mt-3 text-lg text-white/90">{t("donation.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold">{t("donation.content.title")}</h2>
        <p className="mt-4 text-lg text-gray-700">{t("donation.content.description")}</p>
      </section>
    </main>
  );
}