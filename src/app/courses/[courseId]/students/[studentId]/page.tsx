import StudentProfilePage from "@/pages/courses/StudentProfilePage";

interface StudentPageProps {
  params: Promise<{
    courseId: string;
    studentId: string;
  }>;
}

export default async function CourseStudentPage({ params }: StudentPageProps) {
  const { courseId, studentId } = await params;
  return <StudentProfilePage courseId={courseId} studentId={studentId} />;
}