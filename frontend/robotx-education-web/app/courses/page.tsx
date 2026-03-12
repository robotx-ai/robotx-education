"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type CourseCard = {
  title: string;
  description: string;
  href: string;
  image: string;
};

const PAGE_SIZE = 9;

function CourseGridSection({
  id,
  title,
  subtitle,
  courses,
}: {
  id: string;
  title: string;
  subtitle: string;
  courses: CourseCard[];
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));

  const pageItems = useMemo(
    () => courses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [courses, page]
  );

  return (
    <section id={id} className="mx-auto mt-14 max-w-7xl px-6">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-3 max-w-3xl text-gray-700">{subtitle}</p>

      <div className={`mt-8 flex flex-wrap gap-5 ${pageItems.length < 3 ? "justify-center" : ""}`}>
        {pageItems.map((course) => (
          <Link
            key={course.href}
            href={course.href}
            className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.875rem)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundImage: `url(${course.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="mt-1 text-sm text-white/90">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`rounded-full px-3 py-1 text-sm ${
                  page === pageNumber ? "bg-black text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default function CoursesPage() {
  const { t } = useI18n();

  const robotCourses: CourseCard[] = [
    {
      title: t("courses.robot.items.originman.title"),
      description: t("courses.robot.items.originman.desc"),
      href: "/courses/robot/humanoid/originman",
      image: "/assets/courses/originman/originman-1.png",
    },
  ];

  const aiCourses: CourseCard[] = [
    {
      title: t("courses.ai.items.openclaw.title"),
      description: t("courses.ai.items.openclaw.desc"),
      href: "/courses/ai/openclaw",
      image: "/assets/home/openclaw-learn.webp",
    },
  ];

  return (
    <main className="pb-16">
      <section className="relative h-[calc(100vh-80px)] min-h-[560px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/courses/Unitree G1-4.gif')" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center pt-48 px-6">
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            {t("courses.hero.title")}
          </h1>
        </div>
      </section>

      <CourseGridSection
        id = "robot-course-grid"
        title={t("courses.robot.title")}
        subtitle={t("courses.robot.subtitle")}
        courses={robotCourses}
      />

      <CourseGridSection id="ai-course-grid" title={t("courses.ai.title")} subtitle={t("courses.ai.subtitle")} courses={aiCourses} />
    </main>
  );
}
