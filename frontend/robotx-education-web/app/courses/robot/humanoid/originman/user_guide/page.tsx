"use client";

import Image from "next/image";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";

export default function OriginManUserGuidePage() {
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
  const renderParagraphs = (text: string) =>
    text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line, index) => (
        <p key={`${line}-${index}`} className="text-gray-800">
          {line}
        </p>
      ));

  return (
    <main className="bg-gray-50">
      <CourseArticleTemplate
        tocTitle={t("courseTemplate.tocTitle")}
        pagesTitle={t("courseTemplate.pagesTitle")}
        pagesButtonLabel={t("courseTemplate.pagesButtonLabel")}
        pages={pages}
      >
        <h1>{t("originman.userGuide.title")}</h1>
        <p>{t("originman.userGuide.intro")}</p>

        <h2>{t("originman.userGuide.sections.control.title")}</h2>
        {renderParagraphs(t("originman.userGuide.sections.control.body"))}

        <p>
          <iframe
            src="//player.bilibili.com/player.html?aid=114080840946901&amp;bvid=BV1iN9GYiEZC&amp;cid=28619311660&amp;page=1&amp;autoplay=1"
            className="w-full h-auto aspect-video"
            allowFullScreen
            spellCheck="false"
          ></iframe>
        </p>
        <h2>{t("originman.userGuide.sections.runQuickStart.title")}</h2>
        <p>{t("originman.userGuide.sections.runQuickStart.body")}</p>
        
      </CourseArticleTemplate>
    </main>
  );
}
