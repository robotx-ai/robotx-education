"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="rounded-3xl bg-gradient-to-r from-sky-700 to-cyan-600 p-10 text-white">
        <h1 className="text-4xl font-bold">{t("about.hero.title")}</h1>
        <p className="mt-3 text-lg text-white/90">{t("about.hero.subtitle")}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold">{t("about.reasons.title")}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-200 p-5">
            <Image src="/globe.svg" alt="Understandable course" width={80} height={80} className="h-16 w-16" />
            <h3 className="mt-4 text-xl font-semibold">{t("about.reasons.understandableTitle")}</h3>
            <p className="mt-2 text-gray-700">{t("about.reasons.understandableDesc")}</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-5">
            <Image src="/window.svg" alt="Intuitive curriculum" width={80} height={80} className="h-16 w-16" />
            <h3 className="mt-4 text-xl font-semibold">{t("about.reasons.intuitiveTitle")}</h3>
            <p className="mt-2 text-gray-700">{t("about.reasons.intuitiveDesc")}</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-5">
            <Image src="/file.svg" alt="Multimedia learning" width={80} height={80} className="h-16 w-16" />
            <h3 className="mt-4 text-xl font-semibold">{t("about.reasons.multimediaTitle")}</h3>
            <p className="mt-2 text-gray-700">{t("about.reasons.multimediaDesc")}</p>
          </article>
        </div>
      </section>

      <section className="mt-12 grid gap-8 rounded-3xl bg-gray-50 p-6 md:grid-cols-2 md:p-8">
        <div>
          <h2 className="text-3xl font-bold">{t("about.media.title")}</h2>
          <p className="mt-3 text-gray-700">{t("about.media.description")}</p>
          <Image
            src="/assets/home/openclaw-learn.webp"
            alt="Students learning robotics"
            width={900}
            height={600}
            className="mt-5 h-64 w-full rounded-2xl object-cover"
          />
        </div>
        <div className="rounded-2xl bg-black/5 p-3">
          <video
            className="h-full min-h-64 w-full rounded-xl object-cover"
            autoPlay
            muted
            loop
            playsInline
            src="/assets/home/agibot-x2-20s.mp4"
          />
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold">{t("about.mission.title")}</h2>
        <p className="mt-4 text-lg text-gray-700">{t("about.mission.description")}</p>
      </section>
    </main>
  );
}