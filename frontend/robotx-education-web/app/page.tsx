"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";


export default function Home() {
  const { t } = useI18n();

  return (
    <main className="bg-white text-gray-900">
      <section className="relative h-[calc(100vh-80px)] min-h-[560px] w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/home/agibot-x2-20s.mp4"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/45 to-black/30" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-6 pt-48">
          <div className="flex max-w-2xl flex-col gap-4 text-white">
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">{t("home.hero.title")}</h1>
            <h2 className="text-xl font-semibold md:text-2xl">{t("home.hero.subtitle")}</h2>
            <p className="text-base leading-7 text-white/90 md:text-lg">{t("home.hero.description")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 md:flex-row md:items-center">
        <div className="grid flex-1 grid-cols-1 gap-4 md:gap-0 sm:grid-cols-2">
          <div className="rounded-2xl">
            <Image src="/assets/home/openclaw-learn.webp" alt="AI course" width={240} height={240} className="h-full w-auto object-cover rounded-2xl" />
          </div>
          <div className="rounded-2xl ">
            <Image src="/assets/home/learn-openai.jpeg" alt="AI learning" width={240} height={240} className="h-full w-auto object-contain rounded-2xl" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{t("home.ai.title")}</h2>
          <p className="text-base leading-7 text-gray-700">{t("home.ai.description")}</p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-20 md:flex-row md:items-center">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{t("home.robot.title")}</h2>
          <p className="text-base leading-7 text-gray-700">{t("home.robot.description")}</p>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 md:gap-0 sm:grid-cols-2">
          <div className="rounded-2xl ">
            <Image src="/assets/courses/originman/originman-1.png" alt="Robot course" width={240} height={240} className="h-full w-auto object-cover rounded-2xl" />
          </div>
          <div className="rounded-2xl ">
            <Image src="/assets/courses/originman/originman-core.jpg" alt="Robot project" width={640} height={640} className="h-full w-auto object-contain rounded-2xl" />
          </div>
        </div>
      </section>
    </main>
  );
}