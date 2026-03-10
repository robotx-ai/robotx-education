"use client";

import Image from "next/image";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";

export default function OriginManCoursePage() {
  const { t } = useI18n();

  return (
    <main className="bg-gray-50">
      <CourseArticleTemplate tocTitle={t("courseTemplate.tocTitle")}>
        <h1>{t("originman.title")}</h1>
        <p>{t("originman.intro")}</p>

        <h2>{t("originman.sections.assembly.title")}</h2>
        <p>{t("originman.sections.assembly.body")}</p>

        <h3>{t("originman.sections.assembly.subA.title")}</h3>
        <p>{t("originman.sections.assembly.subA.body")}</p>

        <h4>{t("originman.sections.assembly.subB.title")}</h4>
        <p>{t("originman.sections.assembly.subB.body")}</p>

        <Image
          src="/assets/home/openclaw-learn.webp"
          alt="Humanoid assembly illustration"
          width={1200}
          height={720}
          className="h-auto w-full rounded-xl"
        />

        <h2>{t("originman.sections.motion.title")}</h2>
        <p>{t("originman.sections.motion.body")}</p>

        {/* <video className="w-full rounded-xl" controls src="https://www.bilibili.com/video/BV1qP9GYTE1C?t=9.7" /> */}
        <p>
          <iframe
            src="//player.bilibili.com/player.html?aid=114080857724369&amp;bvid=BV1qP9GYTE1C&amp;cid=28619378303&amp;page=1&amp;autoplay=1"
            width="800px"
            height="460px"
            frameBorder="no"
            framespacing="0"
            allowfullscreen="true"
            spellcheck="false"
          ></iframe>
        </p>
        <h3>{t("originman.sections.motion.subA.title")}</h3>
        <p>{t("originman.sections.motion.subA.body")}</p>

        <Image
          src="/window.svg"
          alt="Robot motion illustration"
          width={800}
          height={600}
          className="h-72 w-full rounded-xl bg-amber-50 p-8 object-contain"
        />

        <h2>{t("originman.sections.secondaryDev.title")}</h2>
        <p>{t("originman.sections.secondaryDev.body")}</p>

        <video
          className="w-full rounded-xl"
          controls
          src="/assets/home/agibot-x2-20s.mp4"
        />
      </CourseArticleTemplate>
    </main>
  );
}
