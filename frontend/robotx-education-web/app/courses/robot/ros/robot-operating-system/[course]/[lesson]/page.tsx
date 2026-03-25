import { notFound } from "next/navigation";
import CourseLessonPage from "@/components/CourseLessonPage";
import { getCourseLesson, getSubject, getSubjectCourse } from "@/lib/courseCatalog";

export function generateStaticParams() {
  const subject = getSubject("robot", "ros", "robot-operating-system");

  return (subject?.courses ?? []).flatMap((course) =>
    course.lessons.length <= 1
      ? []
      : course.lessons.map((lesson) => ({
          course: course.slug,
          lesson: lesson.slug,
        })),
  );
}

export default async function RosCourseLessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const subject = getSubject("robot", "ros", "robot-operating-system");
  const course = getSubjectCourse("robot", "ros", "robot-operating-system", courseSlug);
  const lesson = getCourseLesson("robot", "ros", "robot-operating-system", courseSlug, lessonSlug);

  if (!subject || !course || !lesson) {
    notFound();
  }

  return <CourseLessonPage subject={subject} course={course} lesson={lesson} />;
}
