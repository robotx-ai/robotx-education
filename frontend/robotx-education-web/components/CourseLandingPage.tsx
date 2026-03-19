"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { useViewerAccess } from "@/hooks/useViewerAccess";
import {
  type CourseRecord,
  type LessonAccess,
  getCourseBasePath,
  getLessonHref,
  pickLocaleText,
} from "@/lib/courseCatalog";

const accessSectionCopy = {
  open: {
    en: {
      title: "Start Here",
      description: "Public lessons designed to introduce the system, the workflow, and the first result quickly.",
    },
    zh: {
      title: "起步学习",
      description: "面向所有人的公开课程，帮助你快速理解系统、工作流与第一个成果。",
    },
  },
  edu: {
    en: {
      title: "Verified Learning Track",
      description: "Lessons for verified educators, students, and nonprofit teams who need deeper guided practice.",
    },
    zh: {
      title: "教育认证进阶",
      description: "面向已完成教育认证的教师、学生和非营利团队，提供更深入的引导式实践课程。",
    },
  },
  paid: {
    en: {
      title: "Professional Deep Dive",
      description: "Paid advanced modules for structured project delivery and long-form mastery.",
    },
    zh: {
      title: "专业深潜模块",
      description: "面向系统化项目交付与深度掌握的付费高级模块。",
    },
  },
} as const;

const accessBadgeCopy = {
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

const ctaCopy = {
  open: {
    en: "Open lesson",
    zh: "进入课程",
  },
  eduLocked: {
    en: "Verify to unlock",
    zh: "认证后解锁",
  },
  login: {
    en: "Log in to continue",
    zh: "登录后继续",
  },
  eduOpen: {
    en: "Open lesson",
    zh: "进入课程",
  },
  paid: {
    en: "Coming soon",
    zh: "即将推出",
  },
} as const;

function getSectionLessons(course: CourseRecord, access: LessonAccess) {
  return course.lessons.filter((lesson) => lesson.access === access);
}

export default function CourseLandingPage({ course }: { course: CourseRecord }) {
  const { locale } = useI18n();
  const { loggedIn, eduVerified } = useViewerAccess();
  const basePath = getCourseBasePath(course);

  const sectionGroups = useMemo(
    () =>
      (["open", "edu", "paid"] as const)
        .map((access) => ({
          access,
          copy: accessSectionCopy[access][locale],
          lessons: getSectionLessons(course, access),
        }))
        .filter((group) => group.lessons.length > 0),
    [course, locale],
  );

  return (
    <main className="course-landing-shell">
      <section className="course-hero">
        <div className="course-hero-media">
          {course.heroMedia.type === "video" ? (
            <video
              className="course-hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={course.heroMedia.poster}
              src={course.heroMedia.src}
            />
          ) : (
            <div
              className="course-hero-image"
              style={{ backgroundImage: `url(${course.heroMedia.src})` }}
            />
          )}
          <div className="course-hero-scrim" />
        </div>
        <div className="course-hero-content">
          <span className="course-hero-eyebrow">{pickLocaleText(course.heroEyebrow, locale)}</span>
          <h1 className="course-hero-title">{pickLocaleText(course.title, locale)}</h1>
          <p className="course-hero-tagline">{pickLocaleText(course.tagline, locale)}</p>
          <p className="course-hero-description">{pickLocaleText(course.description, locale)}</p>

          <div className="course-hero-meta text-[#0f172a] max-w-2.5">
            {/* <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {locale === "en" ? "Course path" : "课程路径"}
              </span>
              <strong>{`${course.category} / ${course.subcategory}`}</strong>
            </div> */}
            <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {locale === "en" ? "Lessons" : "课程节数"}
              </span>
              <strong>{course.lessons.length}</strong>
            </div>
            {/* <div className="course-hero-stat">
              <span className="course-hero-stat-label">
                {locale === "en" ? "Access" : "访问方式"}
              </span>
              <strong>
                {course.lessons.some((lesson) => lesson.access === "edu")
                  ? locale === "en"
                    ? "Open + Verified"
                    : "公开 + 教育认证"
                  : locale === "en"
                    ? "Open"
                    : "公开"}
              </strong>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="course-overview-strip">
        <div className="course-overview-card lesson-reveal">
          <h2>{locale === "en" ? "How this course is organized" : "课程结构"}</h2>
          <p>
            {locale === "en"
              ? "Each lesson is grouped by access level so learners can understand what is public, what opens after educational verification, and what will become premium in the future."
              : "每节课按照访问级别分组，学习者可以清楚看到哪些内容公开、哪些内容需要教育认证、哪些内容未来会升级为付费模块。"}
          </p>
        </div>
        <div className="course-overview-card lesson-reveal">
          <h2>{locale === "en" ? "Who this is for" : "适合人群"}</h2>
          <p>
            {locale === "en"
              ? "Students, nonprofit teams, and educators who want a structured path from overview to hands-on guided practice."
              : "适合希望从概览到实操引导循序渐进学习的学生、非营利团队与教育工作者。"}
          </p>
        </div>
      </section> */}

      {sectionGroups.map((group) => (
        <section key={group.access} className="course-lesson-section">
          <div className="course-section-header">
            <div>
              <span className={`course-access-pill course-access-pill-${group.access}`}>
                {accessBadgeCopy[group.access][locale]}
              </span>
              <h2>{group.copy.title}</h2>
            </div>
            <p>{group.copy.description}</p>
          </div>

          <div className="course-lesson-grid">
            {group.lessons.map((lesson) => {
              const lessonHref = getLessonHref(course, lesson);
              const lockedForEdu =
                lesson.access === "edu" && (!loggedIn || !eduVerified);
              const isPaid = lesson.access === "paid";

              const href = isPaid
                ? "#"
                : lockedForEdu
                  ? loggedIn
                    ? "/profile"
                    : "/login"
                  : lessonHref;

              const ctaLabel = isPaid
                ? ctaCopy.paid[locale]
                : lesson.access === "edu" && !loggedIn
                  ? ctaCopy.login[locale]
                  : lesson.access === "edu" && !eduVerified
                    ? ctaCopy.eduLocked[locale]
                    : lesson.access === "edu"
                      ? ctaCopy.eduOpen[locale]
                      : ctaCopy.open[locale];

              return (
                <article key={lesson.id} className="course-lesson-card lesson-reveal">
                  <div className="course-lesson-card-header">
                    <span className={`course-access-pill course-access-pill-${lesson.access}`}>
                      {accessBadgeCopy[lesson.access][locale]}
                    </span>
                    <span className="course-lesson-duration">
                      {pickLocaleText(lesson.duration, locale)}
                    </span>
                  </div>
                  <h3>{pickLocaleText(lesson.title, locale)}</h3>
                  <p>{pickLocaleText(lesson.summary, locale)}</p>
                  <div className="course-lesson-card-footer">
                    {/* <span className="course-lesson-route">
                      {lesson.slug === "home"
                        ? basePath
                        : `${basePath}/${lesson.slug}`}
                    </span> */}
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
