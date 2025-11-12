'use client'

import { useParams, useSearchParams, notFound } from 'next/navigation';
import { SubmissionViewClient } from './client';

export default function SubmissionViewPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const courseId = params?.courseId as string;
  const itemId = params?.itemId as string;
  const studentId = params?.studentId as string;
  const type = searchParams?.get('type');

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