import { notFound } from 'next/navigation';
import { SubmissionViewClient } from './client';

interface SubmissionViewPageProps {
  params: Promise<{
    courseId: string;
    itemId: string;
    studentId: string;
  }>;
  searchParams: Promise<{
    type?: string;
  }>;
}

export default async function SubmissionViewPage({ params, searchParams }: SubmissionViewPageProps) {
  const { courseId, itemId, studentId } = await params;
  const { type } = await searchParams;

  if (!type) {
    notFound();
  }

  return (
    <SubmissionViewClient
      courseId={courseId}
      itemId={itemId}
      studentId={studentId}
      type={type}
    />
  );
}