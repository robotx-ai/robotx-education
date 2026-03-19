"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import {
  courseCatalog,
  courseCategories,
  courseSubcategories,
  getCourseBasePath,
  pickLocaleText,
} from "@/lib/courseCatalog";

export default function CoursesPage() {
  const { locale } = useI18n();

  const categorySections = useMemo(
    () =>
      courseCategories.map((category) => {
        const subcategories = courseSubcategories.filter(
          (subcategory) => subcategory.category === category.slug,
        );
        const courses = courseCatalog.filter((course) => course.category === category.slug);

        return {
          ...category,
          subcategories,
          courses,
        };
      }),
    [],
  );

  return (
    <main className="course-catalog-shell">
      <section className="course-catalog-hero">
        <div className="course-catalog-hero-media" />
        <div className="course-catalog-hero-scrim" />
        <div className="course-catalog-hero-content">
          <span className="course-catalog-eyebrow">
            {locale === "en" ? "Course Library" : "课程总览"}
          </span>
          <h1>{locale === "en" ? "Learn Robotics. Learn AI. Build for the future." : "学习机器人，学习 AI, 为未来而创造"}</h1>
          {/* <p>
            {locale === "en"
              ? "Browse categories first, then move into focused subcategories and course tracks. Each course clearly shows which lessons are public, education-verified, or reserved for future paid access."
              : "先浏览课程分类，再进入更具体的子分类与课程路径。每门课程都会清楚标注哪些课程公开、哪些需要教育认证、哪些未来会开放付费访问。"}
          </p> */}
        </div>
      </section>

      {categorySections.map((category) => (
        <section
          key={category.slug}
          id={`${category.slug}-course-grid`}
          className={`course-catalog-section ${category.accentClassName}`}
        >
          <div className="course-category-header">
            <div>
              <span className="course-category-kicker">
                {locale === "en" ? "Category" : "分类"}
              </span>
              <h2>{pickLocaleText(category.title, locale)}</h2>
            </div>
            <p>{pickLocaleText(category.description, locale)}</p>
          </div>

          <div className="course-subcategory-strip">
            {category.subcategories.map((subcategory) => (
              <div key={subcategory.slug} className="course-subcategory-pill lesson-reveal">
                <strong>{pickLocaleText(subcategory.title, locale)}</strong>
                <span>{pickLocaleText(subcategory.description, locale)}</span>
              </div>
            ))}
          </div>

          <div className="course-card-grid">
            {category.courses.map((course) => (
              <Link
                key={course.id}
                href={getCourseBasePath(course)}
                className="course-card lesson-reveal"
              >
                <div
                  className="course-card-media"
                  style={{
                    backgroundImage: `url(${course.heroMedia.poster ?? course.heroMedia.src})`,
                  }}
                />
                <div className="course-card-scrim" />
                <div className="course-card-body">
                  <div className="course-card-badges">
                    <span className="course-card-badge">
                      {pickLocaleText(courseSubcategories.find(
                        (item) =>
                          item.category === course.category &&
                          item.slug === course.subcategory,
                      )!.title, locale)}
                    </span>
                    <span className="course-card-badge">
                      {course.lessons.length}
                      {locale === "en" ? " lessons" : " 节课"}
                    </span>
                  </div>
                  <h3>{pickLocaleText(course.title, locale)}</h3>
                  <p>{pickLocaleText(course.tagline, locale)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
