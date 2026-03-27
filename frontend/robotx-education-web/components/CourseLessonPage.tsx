"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import CourseArticleTemplate from "@/components/CourseArticleTemplate";
import { useI18n } from "@/i18n/I18nProvider";
import { useViewerAccess } from "@/hooks/useViewerAccess";
import {
  type CourseRecord,
  type LessonRecord,
  type Locale,
  type SubjectRecord,
  getCourseLessonPath,
  getCoursePath,
  getLessonPdfUrl,
  getLessonSupportedLocales,
  pickLocaleText,
} from "@/lib/courseCatalog";
import { lessonContentRegistry } from "@/lib/lessonContentRegistry";

function getLanguageName(locale: Locale, t: (key: string) => string) {
  return locale === "en" ? t("coursesUi.languageEnglish") : t("coursesUi.languageChinese");
}

export default function CourseLessonPage({
  subject,
  course,
  lesson,
}: {
  subject: SubjectRecord;
  course: CourseRecord;
  lesson: LessonRecord;
}) {
  const { locale, t } = useI18n();
  const { loading, loggedIn, eduVerified } = useViewerAccess();
  const lessonModules = lessonContentRegistry[lesson.id];
  const supportedLocales = lessonModules
    ? ([lessonModules.en ? "en" : null, lessonModules.zh ? "zh" : null].filter(Boolean) as Locale[])
    : getLessonSupportedLocales(lesson);
  const [languageNoticeDismissed, setLanguageNoticeDismissed] = useState(false);
  const [comingSoonDismissed, setComingSoonDismissed] = useState(false);

  const resolvedLocale = useMemo<Locale | null>(() => {
    if (supportedLocales.includes(locale)) return locale;
    if (supportedLocales.includes("en")) return "en";
    if (supportedLocales.includes("zh")) return "zh";
    return null;
  }, [locale, supportedLocales]);

  useEffect(() => {
    setLanguageNoticeDismissed(false);
    setComingSoonDismissed(false);
  }, [lesson.id, locale, resolvedLocale]);

  const LessonContent = lessonModules && resolvedLocale ? lessonModules[resolvedLocale] : null;
  const lessonPdfUrl = getLessonPdfUrl(lesson);
  const isComingSoonLesson = !LessonContent && !lessonPdfUrl;

  const pages = course.lessons.map((entry) => ({
    label: pickLocaleText(entry.title, locale),
    href: getCourseLessonPath(subject, course, entry),
  }));

  const isLockedForLogin = course.access === "edu" && !loggedIn;
  const isLockedForVerification = course.access === "edu" && loggedIn && !eduVerified;
  const isPaid = course.access === "paid";
  const isFallbackLocale = Boolean(resolvedLocale && resolvedLocale !== locale);

  if (!resolvedLocale) {
    return null;
  }

  return (
    <main className="course-lesson-shell">
      <section className="course-lesson-hero">
        <div className="course-lesson-hero-copy">
          <h1>{pickLocaleText(course.title, locale)}</h1>
          <p>{pickLocaleText(lesson.summary, locale)}</p>
        </div>
      </section>

      {loading ? (
        <section className="course-gate-shell">
          <div className="course-gate-card">
            <h2>{t("coursesUi.checkingAccessTitle")}</h2>
            <p>{t("coursesUi.checkingLessonAccessBody")}</p>
          </div>
        </section>
      ) : isLockedForLogin || isLockedForVerification || isPaid ? (
        <section className="course-gate-shell">
          <div className="course-gate-card">
            <h2>
              {isPaid
                ? t("coursesUi.paidLockedTitle")
                : isLockedForVerification
                  ? t("coursesUi.eduRequiredTitle")
                  : t("coursesUi.loginRequiredTitle")}
            </h2>
            <p>
              {isPaid
                ? t("coursesUi.paidLockedBody")
                : isLockedForVerification
                  ? t("coursesUi.eduRequiredBody")
                  : t("coursesUi.loginRequiredBody")}
            </p>
            <div className="course-gate-actions">
              {isLockedForLogin && (
                <Link href="/login" className="course-gate-primary">
                  {t("coursesUi.goToLogin")}
                </Link>
              )}
              {isLockedForVerification && (
                <Link href="/profile" className="course-gate-primary">
                  {t("coursesUi.verifyInProfile")}
                </Link>
              )}
              <Link href={getCoursePath(subject, course)} className="course-gate-secondary">
                {t("coursesUi.backToCourse")}
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <CourseArticleTemplate
            tocTitle={t("coursesUi.onThisPage")}
            pagesTitle={t("coursesUi.lessonsList")}
            pagesButtonLabel={t("coursesUi.openLessonMenu")}
            pages={pages}
          >
            <div className="course-article-intro">
              <p className="course-article-summary">{pickLocaleText(lesson.summary, locale)}</p>
            </div>

            {LessonContent ? (
              <LessonContent />
            ) : lessonPdfUrl ? (
              <section className="lesson-pdf-shell">
                <h2 className="lesson-heading lesson-heading-2">
                  {t("coursesUi.lessonSlidesTitle")}
                </h2>
                <p className="lesson-copy">{t("coursesUi.lessonSlidesDescription")}</p>
                <div className="lesson-pdf-frame-wrap">
                  <iframe
                    src={`${lessonPdfUrl}#view=FitH`}
                    title={pickLocaleText(lesson.title, resolvedLocale)}
                    className="lesson-pdf-frame"
                  />
                </div>
                <h2 className="lesson-heading lesson-heading-2">
                  {t("coursesUi.resourcesTitle")}
                </h2>
                <p className="lesson-copy">{t("coursesUi.resourcesDescription")}</p>
                <a
                  href={lessonPdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="course-lesson-cta lesson-pdf-open-link"
                >
                  {t("coursesUi.openLessonPdf")}
                </a>
              </section>
            ) : (
              <section className="course-coming-soon-panel">
                <h2 className="lesson-heading lesson-heading-2">{t("coursesUi.comingSoonTitle")}</h2>
                <p className="lesson-copy">{t("coursesUi.comingSoonBody")}</p>
                <p className="lesson-copy">{pickLocaleText(lesson.summary, locale)}</p>
                <Link href={getCoursePath(subject, course)} className="course-lesson-cta lesson-pdf-open-link">
                  {t("coursesUi.backToCourse")}
                </Link>
              </section>
            )}
          </CourseArticleTemplate>

          {isComingSoonLesson && !comingSoonDismissed && (
            <div className="course-language-modal-overlay">
              <div className="course-language-modal">
                <h2>{t("coursesUi.comingSoonTitle")}</h2>
                <p>{t("coursesUi.comingSoonModalBody")}</p>
                <button
                  type="button"
                  className="course-gate-primary course-language-modal-button"
                  onClick={() => setComingSoonDismissed(true)}
                >
                  {t("coursesUi.iUnderstand")}
                </button>
              </div>
            </div>
          )}

          {isFallbackLocale && !languageNoticeDismissed && (
            <div className="course-language-modal-overlay">
              <div className="course-language-modal">
                <h2>{t("coursesUi.languageNoticeTitle")}</h2>
                <p>
                  {t("coursesUi.languageNoticeBody")
                    .replace("{supported}", getLanguageName(resolvedLocale, t))
                    .replace("{unsupported}", getLanguageName(locale, t))}
                </p>
                <button
                  type="button"
                  className="course-gate-primary course-language-modal-button"
                  onClick={() => setLanguageNoticeDismissed(true)}
                >
                  {t("coursesUi.iUnderstand")}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
