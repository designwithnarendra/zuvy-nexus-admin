import SingleCoursePage from "@/page-components/courses/SingleCoursePage";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  return <SingleCoursePage />;
}