import { Course, Batch, Student, LearningItem } from '@/types'
import { mockBatches } from '@/types/mock-data'

/**
 * Get all courses that an instructor is assigned to
 * Derived from their batch assignments
 */
export function getInstructorCourses(
  instructorEmail: string,
  allCourses: Course[],
  batches: Batch[] = mockBatches
): Course[] {
  // Get unique course IDs from batches assigned to this instructor
  const instructorCourseIds = new Set(
    batches
      .filter(batch => batch.instructorEmail === instructorEmail)
      .map(batch => batch.courseId)
  )

  // Filter courses to only those the instructor is assigned to
  return allCourses.filter(course => instructorCourseIds.has(course.id))
}

/**
 * Get all batches assigned to an instructor
 * Optionally filter by course ID
 */
export function getInstructorBatches(
  instructorEmail: string,
  courseId?: string,
  batches: Batch[] = mockBatches
): Batch[] {
  let filtered = batches.filter(batch => batch.instructorEmail === instructorEmail)

  if (courseId) {
    filtered = filtered.filter(batch => batch.courseId === courseId)
  }

  return filtered
}

/**
 * Check if an instructor has access to a specific course
 */
export function hasInstructorAccessToCourse(
  instructorEmail: string,
  courseId: string,
  batches: Batch[] = mockBatches
): boolean {
  return batches.some(
    batch => batch.instructorEmail === instructorEmail && batch.courseId === courseId
  )
}

/**
 * Check if a user can edit a learning item
 * Admins can edit anything, instructors can only edit items they created
 */
export function canEditContent(
  userEmail: string,
  userRole: 'Admin' | 'Ops' | 'Instructor',
  contentItem: LearningItem
): boolean {
  // Admins can edit everything
  if (userRole === 'Admin') {
    return true
  }

  // Instructors can only edit their own content
  if (userRole === 'Instructor') {
    return contentItem.createdBy === userEmail
  }

  // Ops cannot edit content
  return false
}

/**
 * Get students that belong to an instructor's batches
 * Optionally filter by course and/or batch
 */
export function getInstructorStudents(
  instructorEmail: string,
  allStudents: Student[],
  courseId?: string,
  batchId?: string,
  batches: Batch[] = mockBatches
): Student[] {
  // Get instructor's batch IDs (filtered by course if provided)
  const instructorBatchIds = new Set(
    getInstructorBatches(instructorEmail, courseId, batches).map(b => b.id)
  )

  // Filter students to those in instructor's batches
  let filtered = allStudents.filter(
    student => student.batchId && instructorBatchIds.has(student.batchId)
  )

  // Further filter by specific batch if provided
  if (batchId) {
    filtered = filtered.filter(student => student.batchId === batchId)
  }

  return filtered
}

/**
 * Check if an instructor owns a specific student (student is in one of their batches)
 */
export function isInstructorStudent(
  instructorEmail: string,
  studentId: string,
  allStudents: Student[],
  batches: Batch[] = mockBatches
): boolean {
  const student = allStudents.find(s => s.id === studentId)
  if (!student || !student.batchId) {
    return false
  }

  const batch = batches.find(b => b.id === student.batchId)
  return batch?.instructorEmail === instructorEmail
}

/**
 * Check if an instructor has multiple batches for a given course
 * Used to determine whether to show batch filter UI
 */
export function hasMultipleBatches(
  instructorEmail: string,
  courseId: string,
  batches: Batch[] = mockBatches
): boolean {
  return getInstructorBatches(instructorEmail, courseId, batches).length > 1
}

/**
 * Get the count of batches assigned to an instructor
 */
export function getInstructorBatchCount(
  instructorEmail: string,
  batches: Batch[] = mockBatches
): number {
  return getInstructorBatches(instructorEmail, undefined, batches).length
}

/**
 * Check if content item can be reordered by the user
 * Admins can reorder anything, instructors can only reorder their own items
 */
export function canReorderContent(
  userEmail: string,
  userRole: 'Admin' | 'Ops' | 'Instructor',
  contentItem: LearningItem
): boolean {
  // Same logic as canEditContent for now
  return canEditContent(userEmail, userRole, contentItem)
}
