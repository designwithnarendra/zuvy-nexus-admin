'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Mail, Edit, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StudentProfilePageProps {
  courseId: string;
  studentId: string;
}

interface AttendanceRecord {
  id: string;
  className: string;
  date: string;
  time: string;
  duration: string;
  status: 'present' | 'absent';
}

const StudentProfilePage = ({ courseId, studentId }: StudentProfilePageProps) => {
  const router = useRouter();

  // Mock student data - in real app would come from API
  const student = {
    id: studentId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: '',
    batch: 'Full Stack Batch 2024-A',
    enrolledDate: '2024-01-15',
    status: 'active' as const,
    overallAttendance: '85%' // 17 out of 20 classes
  };

  // Mock attendance data for 15 classes to enable pagination
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: '1',
      className: 'Introduction to HTML & CSS',
      date: '2024-01-16',
      time: '10:00 AM',
      duration: '90 min',
      status: 'present'
    },
    {
      id: '2',
      className: 'JavaScript Fundamentals',
      date: '2024-01-18',
      time: '2:00 PM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '3',
      className: 'Advanced DOM Manipulation',
      date: '2024-01-22',
      time: '10:00 AM',
      duration: '90 min',
      status: 'absent'
    },
    {
      id: '4',
      className: 'React Components & Props',
      date: '2024-01-25',
      time: '2:00 PM',
      duration: '90 min',
      status: 'present'
    },
    {
      id: '5',
      className: 'State Management with Hooks',
      date: '2024-01-29',
      time: '10:00 AM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '6',
      className: 'React Router & Navigation',
      date: '2024-02-01',
      time: '2:00 PM',
      duration: '90 min',
      status: 'present'
    },
    {
      id: '7',
      className: 'API Integration with Fetch',
      date: '2024-02-05',
      time: '10:00 AM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '8',
      className: 'Form Handling & Validation',
      date: '2024-02-08',
      time: '2:00 PM',
      duration: '90 min',
      status: 'absent'
    },
    {
      id: '9',
      className: 'CSS Frameworks & Tailwind',
      date: '2024-02-12',
      time: '10:00 AM',
      duration: '90 min',
      status: 'present'
    },
    {
      id: '10',
      className: 'Database Fundamentals',
      date: '2024-02-15',
      time: '2:00 PM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '11',
      className: 'Node.js Introduction',
      date: '2024-02-19',
      time: '10:00 AM',
      duration: '90 min',
      status: 'present'
    },
    {
      id: '12',
      className: 'Express.js Framework',
      date: '2024-02-22',
      time: '2:00 PM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '13',
      className: 'RESTful API Development',
      date: '2024-02-26',
      time: '10:00 AM',
      duration: '90 min',
      status: 'absent'
    },
    {
      id: '14',
      className: 'Authentication & Authorization',
      date: '2024-03-01',
      time: '2:00 PM',
      duration: '120 min',
      status: 'present'
    },
    {
      id: '15',
      className: 'Testing & Debugging',
      date: '2024-03-05',
      time: '10:00 AM',
      duration: '90 min',
      status: 'present'
    }
  ]);

  const getStudentInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-light text-success-dark border-success';
      case 'dropout':
        return 'bg-destructive-light text-destructive-dark border-destructive';
      case 'graduated':
        return 'bg-primary-light text-primary-dark border-primary';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getAttendanceStatusIcon = (status: 'present' | 'absent') => {
    return status === 'present' ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}?tab=students`)}
            className="mb-12 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
        </div>

        {/* Student Info Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {/* Left: Profile Picture and Basic Info */}
            <div className="flex items-center gap-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.profilePicture} alt={student.name} />
                <AvatarFallback className="text-lg">
                  {getStudentInitials(student.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{student.name}</h1>
                  <Badge variant="outline" className={getStatusColor(student.status)}>
                    {student.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{student.email}</span>
                </div>
                {student.batch && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Batch: {student.batch}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Attendance */}
            <div className="text-right">
              <div className="text-sm text-muted-foreground">
                <p>Overall Attendance</p>
                <p className="text-xl font-semibold text-foreground">
                  {student.overallAttendance}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Class Attendance</h2>
          </div>
          <div className="p-6">

            {attendanceRecords.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">No Classes Yet</h3>
                <p className="text-muted-foreground">
                  Classes haven't started yet. Attendance will appear here once classes begin.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium">Live Class Name</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Time</th>
                      <th className="text-left py-3 px-4 font-medium">Duration</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <span className="font-medium">{record.className}</span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {formatDate(record.date)}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {record.time}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {record.duration}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getAttendanceStatusIcon(record.status)}
                            <span className={`font-medium ${
                              record.status === 'present' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {record.status === 'present' ? 'Present' : 'Absent'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;