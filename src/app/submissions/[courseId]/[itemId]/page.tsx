'use client'

import { useParams, useSearchParams } from 'next/navigation';
import SubmissionDetailsPage from "@/page-components/submissions/SubmissionDetailsPage";

export default function SubmissionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params?.courseId as string;
  const itemId = params?.itemId as string;
  const type = searchParams?.get('type');

  return (
    <SubmissionDetailsPage
      courseId={courseId}
      itemId={itemId}
      submissionType={type || 'assessments'}
    />
  );
}