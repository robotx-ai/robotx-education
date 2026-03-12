"use client";

import Image from "next/image";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";

export default function OriginManCoursePage() {
  const { t } = useI18n();
  const pages = [
    {
      label: t("originman.pages.home"),
      href: "/courses/robot/humanoid/originman",
    },
    {
      label: t("originman.pages.userGuide"),
      href: "/courses/robot/humanoid/originman/user_guide",
    },
    {
      label: t("originman.pages.quickStart"),
      href: "/courses/robot/humanoid/originman/quick_start",
    },
  ];

  return (
    <main className="bg-gray-50">
      <CourseArticleTemplate
        tocTitle={t("courseTemplate.tocTitle")}
        pagesTitle={t("courseTemplate.pagesTitle")}
        pagesButtonLabel={t("courseTemplate.pagesButtonLabel")}
        pages={pages}
      >
        <h1>{t("originman.title")}</h1>
        <p>{t("originman.intro")}</p>

        <Image
          src="/assets/courses/originman/originman-1.png"
          alt="Desk Humanoid Originman assembly illustration"
          width={1200}
          height={720}
          className="h-auto w-full rounded-xl"
        />

        <h2>{t("originman.sections.openSource.title")}</h2>
        <p>{t("originman.sections.openSource.body")}</p>

        <h3>{t("originman.sections.openSource.subA.title")}</h3>
        <p>{t("originman.sections.openSource.subA.body")}</p>

        <h3>{t("originman.sections.openSource.subB.title")}</h3>
        <p>{t("originman.sections.openSource.subB.body")}</p>

        <h3>{t("originman.sections.openSource.subC.title")}</h3>
        <p>{t("originman.sections.openSource.subC.body")}</p>

        <h2>{t("originman.sections.evolution.title")}</h2>
        <p>{t("originman.sections.evolution.body")}</p>

        <p>
          <iframe
            src="//player.bilibili.com/player.html?aid=114096879967940&amp;bvid=BV16C9qY2Ego&amp;cid=28665774433&amp;page=1&amp;autoplay=1"
            className="w-full h-auto aspect-video"
            allowFullScreen
            spellCheck="false"
          ></iframe>
        </p>
        <h3>{t("originman.sections.evolution.subA.title")}</h3>
        <div className="mr-8 w-full flex flex-col md:flex-row">
          <p className="mb-4 md: mb-0 md:w-1/2">{t("originman.sections.evolution.subA.body")}</p>

          <Image
            src="/assets/courses/originman/originman-core.jpg"
            alt="Robot application illustration"
            width={200}
            height={150}
            className="h-auto w-auto md:w-1/2 rounded-xl object-contain"
          />
        </div>
        <h3>{t("originman.sections.evolution.subB.title")}</h3>
        <p>{t("originman.sections.evolution.subB.body")}</p>

        <h2>{t("originman.sections.secondaryDev.title")}</h2>
        <p>{t("originman.sections.secondaryDev.body")}</p>

        {/* <video
          className="w-full rounded-xl"
          controls
          src="/assets/home/agibot-x2-20s.mp4"
        /> */}
      </CourseArticleTemplate>
    </main>
  );
}
