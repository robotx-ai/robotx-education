"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import { useViewerAccess } from "@/hooks/useViewerAccess";
import {
  type CourseRecord,
  type SubjectRecord,
  getCourseLessonPath,
  getPrimaryLesson,
  pickLocaleText,
} from "@/lib/courseCatalog";
import CourseLessonPage from "@/components/CourseLessonPage";

export default function SubjectCoursePage({
  subject,
  course,
}: {
  subject: SubjectRecord;
  course: CourseRecord;
}) {
  const primaryLesson = getPrimaryLesson(course);
  const { locale, t } = useI18n();
  const { loading, loggedIn, eduVerified } = useViewerAccess();

  if (primaryLesson && course.lessons.length === 1) {
    return <CourseLessonPage subject={subject} course={course} lesson={primaryLesson} />;
  }

  const isLockedForLogin = course.access === "edu" && !loggedIn;
  const isLockedForVerification = course.access === "edu" && loggedIn && !eduVerified;
  const isPaid = course.access === "paid";

  return (
    <main className="course-lesson-shell">
      <section className="course-lesson-hero">
        <div className="course-lesson-hero-copy">
          <h1>{pickLocaleText(course.title, locale)}</h1>
          <p>{pickLocaleText(course.summary, locale)}</p>
        </div>
      </section>

      {loading ? (
        <section className="course-gate-shell">
          <div className="course-gate-card">
            <h2>{t("coursesUi.checkingAccessTitle")}</h2>
            <p>{t("coursesUi.checkingCourseAccessBody")}</p>
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
            </div>
          </div>
        </section>
      ) : (
        <section className="course-lesson-section">
          <div className="course-section-header">
            <div>
              <h2>{t("coursesUi.lessonsInCourseTitle")}</h2>
            </div>
            <p>{t("coursesUi.lessonsInCourseDescription")}</p>
          </div>
          <div className="course-lesson-grid">
            {course.lessons.map((lesson) => (
              <article key={lesson.id} className="course-lesson-card lesson-reveal">
                <div className="course-lesson-card-header">
                  <span className="course-lesson-duration">
                    {pickLocaleText(lesson.duration, locale)}
                  </span>
                </div>
                <h3>{pickLocaleText(lesson.title, locale)}</h3>
                <p>{pickLocaleText(lesson.summary, locale)}</p>
                <div className="course-lesson-card-footer">
                  <span className="course-lesson-route">{lesson.slug}</span>
                  <Link
                    href={getCourseLessonPath(subject, course, lesson)}
                    className="course-lesson-cta"
                  >
                    {t("coursesUi.openLesson")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
