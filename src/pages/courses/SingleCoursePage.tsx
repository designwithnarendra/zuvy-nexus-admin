
'use client'

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Upload } from 'lucide-react';
import CourseViewTabs from '@/components/courses/CourseViewTabs';
import PublishCourseDialog from '@/components/courses/PublishCourseDialog';

// This would normally come from your API
const getCourseById = (id: string) => {
  const courses = [
    {
      id: '1',
      title: 'Full Stack Web Development Bootcamp',
      description: 'Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.',
      learnerCount: 124,
      duration: '12 weeks',
      topic: 'Web Development',
      status: 'published' as const,
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Master Python programming for data analysis, visualization, and machine learning with hands-on projects.',
      learnerCount: 89,
      duration: '8 weeks',
      topic: 'Data Science',
      status: 'published' as const,
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop'
    },
    // Add more courses as needed
  ];
  
  return courses.find(course => course.id === id);
};

const SingleCoursePage = () => {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  
  if (!courseId) {
    router.push('/courses');
    return null;
  }

  const course = getCourseById(courseId);
  
  if (!course) {
    return (
      <div className="w-full px-6 py-8">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-success-light text-success-dark border-success';
      case 'draft':
        return 'bg-warning-light text-warning-dark border-warning';
      case 'archived':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="w-full px-6 py-8">
      {/* Header Section */}
      <div className="mb-8">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/courses')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course Library
          </Button>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Preview as Student
            </Button>
            
            <Button 
              className="bg-primary hover:bg-primary-dark shadow-4dp"
              onClick={() => setIsPublishDialogOpen(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Publish Course
            </Button>
          </div>
        </div>

        {/* Course Title and Status */}
        <div className="flex items-center gap-3 mb-2">
          <h1 className="font-heading font-bold text-3xl text-foreground">
            {course.title}
          </h1>
          <Badge 
            variant="outline" 
            className={`capitalize ${getStatusColor(course.status)}`}
          >
            {course.status}
          </Badge>
        </div>
      </div>

      {/* Course Management Tabs */}
      <CourseViewTabs courseId={courseId} />

      {/* Publish Course Dialog */}
      <PublishCourseDialog
        open={isPublishDialogOpen}
        onOpenChange={setIsPublishDialogOpen}
        courseId={courseId}
        onPublish={() => console.log('Course published successfully!')}
      />
    </div>
  );
};

export default SingleCoursePage;
