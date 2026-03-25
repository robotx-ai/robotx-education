import { notFound } from "next/navigation";
import CourseLandingPage from "@/components/CourseLandingPage";
import { getSubject } from "@/lib/courseCatalog";

export default function OpenClawSubjectPage() {
  const subject = getSubject("ai", "foundation", "openclaw");

  if (!subject) {
    notFound();
  }

  return <CourseLandingPage subject={subject} />;
}
