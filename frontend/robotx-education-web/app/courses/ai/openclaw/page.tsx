"use client";

import Image from "next/image";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";

export default function OpenClawCoursePage() {
  const { t } = useI18n();
  const pages = [
    { label: t("openclaw.pages.home"), href: "/courses/ai/openclaw" },
  ];

  return (
    <main className="bg-gray-50">
      <CourseArticleTemplate
        tocTitle={t("courseTemplate.tocTitle")}
        pagesTitle={t("courseTemplate.pagesTitle")}
        pagesButtonLabel={t("courseTemplate.pagesButtonLabel")}
        pages={pages}
      >
        <h1>{t("openclaw.title")}</h1>
        <p>{t("openclaw.intro")}</p>

        <h2>{t("openclaw.sections.setup.title")}</h2>
        <p>{t("openclaw.sections.setup.body")}</p>

        <h3>{t("openclaw.sections.setup.subA.title")}</h3>
        <p>{t("openclaw.sections.setup.subA.body")}</p>

        <h4>{t("openclaw.sections.setup.subB.title")}</h4>
        <p>{t("openclaw.sections.setup.subB.body")}</p>

        <Image
          src="/assets/home/openclaw-learn.webp"
          alt="OpenClaw setup illustration"
          width={1200}
          height={720}
          className="h-auto w-full rounded-xl"
        />

        <h2>{t("openclaw.sections.workflow.title")}</h2>
        <p>{t("openclaw.sections.workflow.body")}</p>

        <video className="w-full rounded-xl" controls src="/assets/home/agibot-x2-20s.mp4" />

        <h3>{t("openclaw.sections.workflow.subA.title")}</h3>
        <p>{t("openclaw.sections.workflow.subA.body")}</p>

        <Image src="/globe.svg" alt="AI workflow illustration" width={800} height={600} className="h-72 w-full rounded-xl bg-sky-50 p-8 object-contain" />

        <h2>{t("openclaw.sections.practice.title")}</h2>
        <p>{t("openclaw.sections.practice.body")}</p>

        <video className="w-full rounded-xl" controls src="/assets/home/agibot-x2-20s.mp4" />
      </CourseArticleTemplate>
    </main>
  );
}
