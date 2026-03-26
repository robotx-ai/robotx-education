import { notFound } from "next/navigation";
import SubjectCoursePage from "@/components/SubjectCoursePage";
import { getSubject, getSubjectCourse } from "@/lib/courseCatalog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const subject = getSubject("robot", "humanoid", "originman");
  return (subject?.courses ?? []).map((course) => ({ course: course.slug }));
}

export default async function OriginmanCoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseSlug } = await params;
  const subject = getSubject("robot", "humanoid", "originman");
  const course = getSubjectCourse("robot", "humanoid", "originman", courseSlug);

  if (!subject || !course) {
    notFound();
  }

  return <SubjectCoursePage subject={subject} course={course} />;
}
