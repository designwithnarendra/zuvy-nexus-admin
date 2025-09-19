import BatchDetailsPage from "@/pages/courses/BatchDetailsPage";

interface BatchPageProps {
  params: Promise<{
    courseId: string;
    batchId: string;
  }>;
}

export default async function CourseBatchPage({ params }: BatchPageProps) {
  const { courseId, batchId } = await params;
  return <BatchDetailsPage courseId={courseId} batchId={batchId} />;
}