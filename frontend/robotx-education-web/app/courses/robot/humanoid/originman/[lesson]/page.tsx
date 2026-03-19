import { notFound } from "next/navigation";
import CourseLessonPage from "@/components/CourseLessonPage";
import { getCourse, getCourseLesson } from "@/lib/courseCatalog";

export function generateStaticParams() {
  const course = getCourse("robot", "humanoid", "originman");
  return (course?.lessons ?? [])
    .filter((lesson) => lesson.slug !== "home")
    .map((lesson) => ({ lesson: lesson.slug }));
}

export default async function OriginmanLessonPage({
  params,
}: {
  params: Promise<{ lesson: string }>;
}) {
  const { lesson: lessonSlug } = await params;
  const course = getCourse("robot", "humanoid", "originman");
  const lesson = getCourseLesson("robot", "humanoid", "originman", lessonSlug);

  if (!course || !lesson || lesson.slug === "home") {
    notFound();
  }

  return <CourseLessonPage course={course} lesson={lesson} />;
}
