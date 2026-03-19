import { notFound } from "next/navigation";
import CourseLandingPage from "@/components/CourseLandingPage";
import { getCourse } from "@/lib/courseCatalog";

export default function OriginmanCoursePage() {
  const course = getCourse("robot", "humanoid", "originman");

  if (!course) {
    notFound();
  }

  return <CourseLandingPage course={course} />;
}
