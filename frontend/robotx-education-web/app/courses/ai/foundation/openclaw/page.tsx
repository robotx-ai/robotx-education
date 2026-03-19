import { notFound } from "next/navigation";
import CourseLandingPage from "@/components/CourseLandingPage";
import { getCourse } from "@/lib/courseCatalog";

export default function OpenClawCoursePage() {
  const course = getCourse("ai", "foundation", "openclaw");

  if (!course) {
    notFound();
  }

  return <CourseLandingPage course={course} />;
}
