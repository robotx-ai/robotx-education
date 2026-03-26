import { notFound } from "next/navigation";
import CourseLessonPage from "@/components/CourseLessonPage";
import { getCourseLesson, getSubject, getSubjectCourse } from "@/lib/courseCatalog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const subject = getSubject("robot", "humanoid", "originman");

  return (subject?.courses ?? []).flatMap((course) =>
    course.lessons.map((lesson) => ({
      course: course.slug,
      lesson: lesson.slug,
    })),
  );
}

export default async function OriginmanCourseLessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const subject = getSubject("robot", "humanoid", "originman");
  const course = getSubjectCourse("robot", "humanoid", "originman", courseSlug);
  const lesson = getCourseLesson("robot", "humanoid", "originman", courseSlug, lessonSlug);

  if (!subject || !course || !lesson) {
    notFound();
  }

  return <CourseLessonPage subject={subject} course={course} lesson={lesson} />;
}

