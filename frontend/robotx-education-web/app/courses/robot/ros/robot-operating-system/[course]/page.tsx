import { notFound } from "next/navigation";
import SubjectCoursePage from "@/components/SubjectCoursePage";
import { getSubject, getSubjectCourse } from "@/lib/courseCatalog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const subject = getSubject("robot", "ros", "robot-operating-system");
  return (subject?.courses ?? []).map((course) => ({ course: course.slug }));
}

export default async function RosCoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseSlug } = await params;
  const subject = getSubject("robot", "ros", "robot-operating-system");
  const course = getSubjectCourse("robot", "ros", "robot-operating-system", courseSlug);

  if (!subject || !course) {
    notFound();
  }

  return <SubjectCoursePage subject={subject} course={course} />;
}
