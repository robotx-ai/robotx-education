"use client";

import Link from "next/link";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";
import { useViewerAccess } from "@/hooks/useViewerAccess";
import {
  type CourseRecord,
  type LessonRecord,
  getLessonHref,
  pickLocaleText,
} from "@/lib/courseCatalog";
import { lessonContentRegistry } from "@/lib/lessonContentRegistry";

const accessCopy = {
  open: {
    en: "Open access",
    zh: "公开访问",
  },
  edu: {
    en: "Education verified",
    zh: "教育认证访问",
  },
  paid: {
    en: "Paid access",
    zh: "付费访问",
  },
} as const;

export default function CourseLessonPage({
  course,
  lesson,
}: {
  course: CourseRecord;
  lesson: LessonRecord;
}) {
  const { locale } = useI18n();
  const { loading, loggedIn, eduVerified } = useViewerAccess();
  const lessonModules = lessonContentRegistry[lesson.id];
  const LessonContent = lessonModules?.[locale] ?? lessonModules?.en;

  const pages = course.lessons.map((entry) => ({
    label: pickLocaleText(entry.title, locale),
    href: getLessonHref(course, entry),
  }));

  const isLockedForLogin = lesson.access === "edu" && !loggedIn;
  const isLockedForVerification = lesson.access === "edu" && loggedIn && !eduVerified;
  const isPaid = lesson.access === "paid";

  if (!LessonContent) {
    return null;
  }

  return (
    <main className="course-lesson-shell">
      <section className="course-lesson-hero">
        <div className="course-lesson-hero-copy">
          <span className={`course-access-pill course-access-pill-${lesson.access}`}>
            {accessCopy[lesson.access][locale]}
          </span>
          <h1>{pickLocaleText(lesson.title, locale)}</h1>
          <p>{pickLocaleText(lesson.summary, locale)}</p>
        </div>
      </section>

      {loading ? (
        <section className="course-gate-shell">
          <div className="course-gate-card">
            <h2>{locale === "en" ? "Checking access" : "正在检查访问权限"}</h2>
            <p>
              {locale === "en"
                ? "Loading your lesson access and profile state."
                : "正在加载你的课程访问权限与个人状态。"}
            </p>
          </div>
        </section>
      ) : isLockedForLogin || isLockedForVerification || isPaid ? (
        <section className="course-gate-shell">
          <div className="course-gate-card">
            <span className={`course-access-pill course-access-pill-${lesson.access}`}>
              {accessCopy[lesson.access][locale]}
            </span>
            <h2>
              {isPaid
                ? locale === "en"
                  ? "This lesson is reserved for future paid access"
                  : "该课程将作为未来的付费内容开放"
                : isLockedForVerification
                  ? locale === "en"
                    ? "Educational verification is required"
                    : "需要完成教育认证"
                  : locale === "en"
                    ? "Log in to continue"
                    : "请先登录后继续"}
            </h2>
            <p>
              {isPaid
                ? locale === "en"
                  ? "The lesson structure is ready, but paid entitlements are not enabled yet."
                  : "课程结构已准备完成，但付费权限系统暂未开启。"
                : isLockedForVerification
                  ? locale === "en"
                    ? "This lesson is available to verified students, educators, and nonprofit organizations."
                    : "该课程面向已完成认证的学生、教育工作者与非营利组织开放。"
                  : locale === "en"
                    ? "Sign in first, then return here to continue the guided lesson."
                    : "请先登录，再返回此处继续学习。"}
            </p>
            <div className="course-gate-actions">
              {isLockedForLogin && (
                <Link href="/login" className="course-gate-primary">
                  {locale === "en" ? "Go to log in" : "前往登录"}
                </Link>
              )}
              {isLockedForVerification && (
                <Link href="/profile" className="course-gate-primary">
                  {locale === "en" ? "Verify in profile" : "前往个人中心认证"}
                </Link>
              )}
              <Link href={getLessonHref(course, course.lessons[0]!)} className="course-gate-secondary">
                {locale === "en" ? "Back to course overview" : "返回课程概览"}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <CourseArticleTemplate
          tocTitle={locale === "en" ? "On this page" : "本页目录"}
          pagesTitle={locale === "en" ? "Lessons" : "课程目录"}
          pagesButtonLabel={locale === "en" ? "Open lesson menu" : "打开课程菜单"}
          pages={pages}
        >
          <div className="course-article-intro">
            <span className={`course-access-pill course-access-pill-${lesson.access}`}>
              {accessCopy[lesson.access][locale]}
            </span>
            <p className="course-article-summary">{pickLocaleText(lesson.summary, locale)}</p>
          </div>
          <LessonContent />
        </CourseArticleTemplate>
      )}
    </main>
  );
}
