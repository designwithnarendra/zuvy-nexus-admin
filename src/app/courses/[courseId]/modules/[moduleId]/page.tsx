import ModulePage from "@/page-components/courses/ModulePage";

interface ModulePageProps {
  params: Promise<{
    courseId: string;
    moduleId: string;
  }>;
}

export default async function CourseModulePage({ params }: ModulePageProps) {
  const { courseId, moduleId } = await params;
  return <ModulePage courseId={courseId} moduleId={moduleId} />;
}