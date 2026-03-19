import { notFound } from "next/navigation";
import CourseLessonPage from "@/components/CourseLessonPage";
import { getCourse, getCourseLesson } from "@/lib/courseCatalog";

export function generateStaticParams() {
  const course = getCourse("ai", "foundation", "openclaw");
  return (course?.lessons ?? [])
    .filter((lesson) => lesson.slug !== "home")
    .map((lesson) => ({ lesson: lesson.slug }));
}

export default async function OpenClawLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const { lesson: lessonSlug } = await params;
  const course = getCourse("ai", "foundation", "openclaw");
  const lesson = getCourseLesson("ai", "foundation", "openclaw", lessonSlug);

  if (!course || !lesson || lesson.slug === "home") {
    notFound();
  }

  return <CourseLessonPage course={course} lesson={lesson} />;
}
