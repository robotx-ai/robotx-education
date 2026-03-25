import { notFound } from "next/navigation";
import SubjectCoursePage from "@/components/SubjectCoursePage";
import { getSubject, getSubjectCourse } from "@/lib/courseCatalog";

export function generateStaticParams() {
  const subject = getSubject("ai", "foundation", "openclaw");
  return (subject?.courses ?? []).map((course) => ({ course: course.slug }));
}

export default async function OpenClawCoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseSlug } = await params;
  const subject = getSubject("ai", "foundation", "openclaw");
  const course = getSubjectCourse("ai", "foundation", "openclaw", courseSlug);

  if (!subject || !course) {
    notFound();
  }

  return <SubjectCoursePage subject={subject} course={course} />;
}
