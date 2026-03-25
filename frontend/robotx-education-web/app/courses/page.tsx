"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import {
  courseCategories,
  getSubjectBasePath,
  getSubjectsByCategory,
  pickLocaleText,
} from "@/lib/courseCatalog";

export default function CoursesPage() {
  const { locale, t } = useI18n();

  const categorySections = useMemo(
    () =>
      courseCategories.map((category) => ({
        ...category,
        subjects: getSubjectsByCategory(category.slug),
      })),
    [],
  );

  return (
    <main className="course-catalog-shell">
      <section className="course-catalog-hero">
        <div className="course-catalog-hero-media" />
        <div className="course-catalog-hero-scrim" />
        <div className="course-catalog-hero-content">
          <span className="course-catalog-eyebrow">
            {t("coursesUi.courseLibrary")}
          </span>
          <h1>
            {t("coursesUi.catalogHeroTitle")}
          </h1>
          <p>{t("coursesUi.catalogHeroDescription")}</p>
        </div>
      </section>

      {categorySections.map((category) => (
        <section
          key={category.slug}
          id={`${category.slug}-subject-grid`}
          className={`course-catalog-section ${category.accentClassName}`}
        >
          <div className="course-category-header">
            <div>
              <span className="course-category-kicker">
                {t("coursesUi.category")}
              </span>
              <h2>{pickLocaleText(category.title, locale)}</h2>
            </div>
            <p>{pickLocaleText(category.description, locale)}</p>
          </div>

          <div className="course-card-grid">
            {category.subjects.map((subject) => (
              <Link
                key={subject.id}
                href={getSubjectBasePath(subject)}
                className="course-card lesson-reveal"
              >
                <div
                  className="course-card-media"
                  style={{
                    backgroundImage: `url(${subject.heroMedia.poster ?? subject.heroMedia.src})`,
                  }}
                />
                <div className="course-card-scrim" />
                <div className="course-card-body">
                  <div className="course-card-badges">
                    <span className="course-card-badge">{pickLocaleText(subject.pathLabel, locale)}</span>
                    <span className="course-card-badge">
                      {subject.courses.length}
                      {` ${t("coursesUi.coursePlural")}`}
                    </span>
                  </div>
                  <h3>{pickLocaleText(subject.title, locale)}</h3>
                  <p>{pickLocaleText(subject.tagline, locale)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
