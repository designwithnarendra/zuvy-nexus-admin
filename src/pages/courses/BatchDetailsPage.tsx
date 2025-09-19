'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Mail, Calendar, Edit } from 'lucide-react';
import MasterStudentTable, { Student } from '@/components/courses/students/MasterStudentTable';

interface BatchDetailsPageProps {
  courseId: string;
  batchId: string;
}

interface Batch {
  id: string;
  name: string;
  instructorEmail: string;
  capEnrollment: number;
  studentCount: number;
  status: 'not_started' | 'ongoing' | 'completed';
  startDate?: string;
  endDate?: string;
  createdDate: string;
}

const BatchDetailsPage = ({ courseId, batchId }: BatchDetailsPageProps) => {
  const router = useRouter();

  // Mock batch data - would come from API
  const [batch] = useState<Batch>({
    id: batchId,
    name: 'Full Stack Batch 2024-A',
    instructorEmail: 'john.doe@example.com',
    capEnrollment: 25,
    studentCount: 23,
    status: 'ongoing',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    createdDate: '2024-01-10'
  });

  // Mock students data for this batch - would come from API filtered by batch
  const [students] = useState<Student[]>([
    {
      id: 'student-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      enrolledDate: '2024-01-15',
      progress: 75,
      lastActive: '2024-01-29',
      batch: 'Full Stack Batch 2024-A',
      status: 'active',
      attendance: '17 (85%)',
      profilePicture: ''
    },
    {
      id: 'student-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      enrolledDate: '2024-01-15',
      progress: 82,
      lastActive: '2024-01-29',
      batch: 'Full Stack Batch 2024-A',
      status: 'active',
      attendance: '19 (95%)',
      profilePicture: ''
    },
    {
      id: 'student-3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      enrolledDate: '2024-01-16',
      progress: 45,
      lastActive: '2024-01-25',
      batch: 'Full Stack Batch 2024-A',
      status: 'active',
      attendance: '12 (60%)',
      profilePicture: ''
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-success-light text-success-dark border-success';
      case 'not_started':
        return 'bg-warning-light text-warning-dark border-warning';
      case 'completed':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleStudentClick = (studentId: string) => {
    router.push(`/courses/${courseId}/students/${studentId}`);
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log('Delete student:', studentId);
    // In real app, would make API call to delete student
  };

  const handleDropoutStudent = (studentId: string) => {
    console.log('Dropout student:', studentId);
    // In real app, would make API call to mark student as dropout
  };

  const handleEditStudent = (studentId: string) => {
    console.log('Edit student:', studentId);
    // In real app, would open edit modal or navigate to edit page
  };

  const handleContactStudent = (studentId: string) => {
    console.log('Contact student:', studentId);
    // In real app, would open email client or messaging system
  };

  const handleBatchChange = (studentId: string, newBatch: string | null) => {
    console.log('Change batch for student:', studentId, 'to:', newBatch);
    // This wouldn't typically be available on a batch detail page
    // since we're viewing students of a specific batch
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}?tab=batches`)}
            className="mb-12 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Batches
          </Button>
        </div>

        {/* Batch Info Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold">{batch.name}</h1>
            <Badge
              variant="outline"
              className={`capitalize ${getStatusColor(batch.status)}`}
            >
              {batch.status.replace('_', ' ')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Instructor</p>
                <p className="font-medium">{batch.instructorEmail}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Enrollment</p>
                <p className="font-medium">
                  {batch.studentCount}/{batch.capEnrollment} students
                </p>
              </div>
            </div>

            {batch.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {new Date(batch.startDate).toLocaleDateString()} - {batch.endDate && new Date(batch.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Students Section */}
        <div>
          <h2 className="text-lg font-semibold mb-6">Students in this Batch</h2>
            {students.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Students Yet</h3>
                <p className="text-muted-foreground">
                  This batch doesn't have any students enrolled yet.
                </p>
              </div>
            ) : (
              <MasterStudentTable
                students={students}
                batches={[]} // Empty because we don't want batch changing on batch detail page
                onDeleteStudent={handleDeleteStudent}
                onDropoutStudent={handleDropoutStudent}
                onEditStudent={handleEditStudent}
                onContactStudent={handleContactStudent}
                onBatchChange={handleBatchChange}
                selectedStudents={[]}
                onSelectStudent={() => {}} // No multi-select on batch detail page
                onSelectAll={() => {}} // No multi-select on batch detail page
                showMultiSelect={false}
                onStudentClick={handleStudentClick}
                totalClasses={20}
                hideBatchColumn={true} // Hide batch column since all students are from this batch
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default BatchDetailsPage;