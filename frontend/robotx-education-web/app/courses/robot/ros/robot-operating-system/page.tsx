import { notFound } from "next/navigation";
import CourseLandingPage from "@/components/CourseLandingPage";
import { getSubject } from "@/lib/courseCatalog";

export default function RosSubjectPage() {
  const subject = getSubject("robot", "ros", "robot-operating-system");

  if (!subject) {
    notFound();
  }

  return <CourseLandingPage subject={subject} />;
}
