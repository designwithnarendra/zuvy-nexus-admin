'use client'

import { useParams } from 'next/navigation';
import ModulePage from "@/page-components/courses/ModulePage";

export default function CourseModulePage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const moduleId = params?.moduleId as string;

  return <ModulePage courseId={courseId} moduleId={moduleId} />;
}