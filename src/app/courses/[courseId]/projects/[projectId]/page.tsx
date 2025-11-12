'use client'

import { useParams } from 'next/navigation';
import ProjectPage from "@/page-components/courses/ProjectPage";

export default function CourseProjectPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const projectId = params?.projectId as string;

  return <ProjectPage courseId={courseId} projectId={projectId} />;
}