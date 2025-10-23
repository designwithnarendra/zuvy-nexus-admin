'use client'

import { useParams } from 'next/navigation';
import BatchDetailsPage from "@/page-components/courses/BatchDetailsPage";

export default function CourseBatchPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const batchId = params?.batchId as string;

  return <BatchDetailsPage courseId={courseId} batchId={batchId} />;
}