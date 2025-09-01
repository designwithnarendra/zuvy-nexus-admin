import SingleCoursePage from "@/pages/courses/SingleCoursePage";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  return <SingleCoursePage />;
}