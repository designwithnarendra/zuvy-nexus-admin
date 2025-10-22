import SubmissionDetailsPage from "@/page-components/submissions/SubmissionDetailsPage";

interface SubmissionPageProps {
  params: Promise<{
    courseId: string;
    itemId: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export async function generateStaticParams() {
  return [];
}

export default async function SubmissionPage({ params, searchParams }: SubmissionPageProps) {
  const { courseId, itemId } = await params;
  const { type } = await searchParams;

  return (
    <SubmissionDetailsPage
      courseId={courseId}
      itemId={itemId}
      submissionType={type || 'assessments'}
    />
  );
}