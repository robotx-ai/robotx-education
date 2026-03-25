"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useViewerAccess } from "@/hooks/useViewerAccess";
import {
  type SubjectRecord,
  getCoursePath,
  pickLocaleText,
} from "@/lib/courseCatalog";

export default function CourseLandingPage({ subject }: { subject: SubjectRecord }) {
  const { locale, t } = useI18n();
  const { loggedIn, eduVerified } = useViewerAccess();

  const sectionCopyByAccess = {
    open: {
      title: t("coursesUi.sectionOpenTitle"),
      description: t("coursesUi.sectionOpenDescription"),
    },
    edu: {
      title: t("coursesUi.sectionEduTitle"),
      description: t("coursesUi.sectionEduDescription"),
    },
    paid: {
      title: t("coursesUi.sectionPaidTitle"),
      description: t("coursesUi.sectionPaidDescription"),
    },
  } as const;

  const accessBadgeByAccess = {
    open: t("coursesUi.badgeOpen"),
    edu: t("coursesUi.badgeEdu"),
    paid: t("coursesUi.badgePaid"),
  } as const;

  const ctaByType = {
    open: t("coursesUi.ctaOpenCourse"),
    verify: t("coursesUi.ctaVerifyToUnlock"),
    login: t("coursesUi.ctaLoginToContinue"),
    paid: t("coursesUi.ctaComingSoon"),
  } as const;

  const sectionGroups = useMemo(
    () =>
      (["open", "edu", "paid"] as const)
        .map((access) => ({
          access,
          copy: sectionCopyByAccess[access],
          courses: subject.courses.filter((course) => course.access === access),
        }))
        .filter((group) => group.courses.length > 0),
    [sectionCopyByAccess, subject],
  );

  return (
    <main className="course-landing-shell">
      <section className="course-hero">
        <div className="course-hero-media">
          {subject.heroMedia.type === "video" ? (
            <video
              className="course-hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={subject.heroMedia.poster}
              src={subject.heroMedia.src}
            />
          ) : (
            <div
              className="course-hero-image"
              style={{ backgroundImage: `url(${subject.heroMedia.src})` }}
            />
          )}
          <div className="course-hero-scrim" />
        </div>

        <div className="course-hero-content">
          <span className="course-hero-eyebrow">{pickLocaleText(subject.heroEyebrow, locale)}</span>
          <h1 className="course-hero-title">{pickLocaleText(subject.title, locale)}</h1>
          <p className="course-hero-tagline">{pickLocaleText(subject.tagline, locale)}</p>
          <p className="course-hero-description">{pickLocaleText(subject.description, locale)}</p>

          <div className="course-hero-meta">
            {/* <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {t("coursesUi.subjectPath")}
              </span>
              <strong>{pickLocaleText(subject.pathLabel, locale)}</strong>
            </div> */}
            <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {t("coursesUi.coursesCount")}
              </span>
              <strong>{subject.courses.length}</strong>
            </div>
            <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {t("coursesUi.lessonsCount")}
              </span>
              <strong>{subject.courses.reduce((total, course) => total + course.lessons.length, 0)}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="course-overview-strip">
        <div className="course-overview-card lesson-reveal">
          <h2>{t("coursesUi.subjectFocusTitle")}</h2>
          <p>{pickLocaleText(subject.pathDescription, locale)}</p>
        </div>
        {/* <div className="course-overview-card lesson-reveal">
          <h2>{t("coursesUi.subjectStructureTitle")}</h2>
          <p>{t("coursesUi.subjectStructureDescription")}</p>
        </div> */}
      </section>

      {sectionGroups.map((group) => (
        <section key={group.access} className="course-lesson-section">
          <div className="course-section-header">
            <div>
              <span className={`course-access-pill course-access-pill-${group.access}`}>
                {accessBadgeByAccess[group.access]}
              </span>
              <h2>{group.copy.title}</h2>
            </div>
            <p>{group.copy.description}</p>
          </div>

          <div className="course-lesson-grid">
            {group.courses.map((course) => {
              const courseHref = getCoursePath(subject, course);
              const lockedForEdu = course.access === "edu" && (!loggedIn || !eduVerified);
              const isPaid = course.access === "paid";

              const href = isPaid
                ? "#"
                : lockedForEdu
                  ? loggedIn
                    ? "/profile"
                    : "/login"
                  : courseHref;

              const ctaLabel = isPaid
                ? ctaByType.paid
                : course.access === "edu" && !loggedIn
                  ? ctaByType.login
                  : course.access === "edu" && !eduVerified
                    ? ctaByType.verify
                    : course.access === "edu"
                      ? ctaByType.open
                      : ctaByType.open;

              return (
                <article key={course.id} className="course-lesson-card lesson-reveal">
                  <div className="course-lesson-card-header">
                    <span className={`course-access-pill course-access-pill-${course.access}`}>
                      {accessBadgeByAccess[course.access]}
                    </span>
                    <span className="course-lesson-duration">{pickLocaleText(course.duration, locale)}</span>
                  </div>
                  <h3>{pickLocaleText(course.title, locale)}</h3>
                  <p>{pickLocaleText(course.summary, locale)}</p>
                  <div className="course-lesson-card-footer">
                    <span className="course-lesson-route">
                      {course.lessons.length}
                      {course.lessons.length === 1
                        ? ` ${t("coursesUi.lessonSingle")}`
                        : ` ${t("coursesUi.lessonPlural")}`}
                    </span>
                    <Link
                      href={href}
                      aria-disabled={isPaid}
                      className={`course-lesson-cta${isPaid ? " course-lesson-cta-disabled" : ""}`}
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </main>
  );
}
