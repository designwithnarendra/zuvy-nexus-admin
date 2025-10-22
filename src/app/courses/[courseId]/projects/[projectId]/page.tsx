import ProjectPage from "@/page-components/courses/ProjectPage";

interface ProjectPageProps {
  params: Promise<{
    courseId: string;
    projectId: string;
  }>;
}

export default async function CourseProjectPage({ params }: ProjectPageProps) {
  const { courseId, projectId } = await params;
  return <ProjectPage courseId={courseId} projectId={projectId} />;
}