"use client";

import Image from "next/image";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";

export default function OriginManQuickStartPage() {
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
        <h1>{t("originman.quickStart.title")}</h1>
        <p>{t("originman.quickStart.intro")}</p>

        <h2>{t("originman.quickStart.sections.boot.title")}</h2>
        {renderParagraphs(t("originman.quickStart.sections.boot.body"))}

        <h2>{t("originman.quickStart.sections.remoteConnection.title")}</h2>
        {renderParagraphs(
          t("originman.quickStart.sections.remoteConnection.body"),
        )}

        <Image
          src="/assets/courses/originman/originman-1.png"
          alt="OriginMan shutdown"
          width={600}
          height={360}
          className="h-auto w-1/2 rounded-xl"
        />

        <h2>{t("originman.quickStart.sections.example1.title")}</h2>
        {renderParagraphs(t("originman.quickStart.sections.example1.body"))}
        <pre className="rounded-lg bg-gray-100 p-3 text-sm font-mono text-gray-800">
          <code>
            python3
            /userdata/dev_ws/src/originman/originman_pydemo/action_dance.py
          </code>
        </pre>
        <p>
          <iframe
            src="//player.bilibili.com/player.html?aid=114080874504007&amp;bvid=BV1vM9GYeE3m&amp;cid=28619440217&amp;page=1&amp;autoplay=1"
            className="w-full h-auto aspect-video"
            allowFullScreen
            spellCheck="false"
          ></iframe>
        </p>
        <h2>{t("originman.quickStart.sections.poweroff.title")}</h2>
        {renderParagraphs(t("originman.quickStart.sections.poweroff.body"))}
        <pre className="rounded-lg bg-gray-100 p-3 text-sm font-mono text-gray-800">
          <code>$ halt</code>
        </pre>
        {renderParagraphs(t("originman.quickStart.sections.poweroff.body1"))}
      </CourseArticleTemplate>
    </main>
  );
}
