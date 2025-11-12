'use client'

import { useParams } from 'next/navigation';
import StudentProfilePage from "@/page-components/courses/StudentProfilePage";

export default function CourseStudentPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const studentId = params?.studentId as string;

  return <StudentProfilePage courseId={courseId} studentId={studentId} />;
}