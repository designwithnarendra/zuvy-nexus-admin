
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import CourseViewTabs from '@/components/courses/CourseViewTabs';

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
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  
  if (!courseId) {
    navigate('/courses');
    return null;
  }

  const course = getCourseById(courseId);
  
  if (!course) {
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="font-heading font-bold text-2xl mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/courses')}>
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
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/courses')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course Image */}
          <div className="lg:w-1/3">
            {course.imageUrl ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-4dp">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary-light to-primary flex items-center justify-center shadow-4dp">
                <span className="text-primary-foreground font-heading font-bold text-2xl">
                  {course.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Course Info */}
          <div className="lg:w-2/3 space-y-4">
            <div>
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
              <p className="text-muted-foreground text-lg leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Topic:</span>
                <Badge variant="secondary">{course.topic}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Duration:</span>
                <span className="text-muted-foreground">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Learners:</span>
                <span className="text-muted-foreground">{course.learnerCount}</span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="bg-primary hover:bg-primary-dark shadow-4dp">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Student Experience
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Management Tabs */}
      <CourseViewTabs courseId={courseId} />
    </div>
  );
};

export default SingleCoursePage;
