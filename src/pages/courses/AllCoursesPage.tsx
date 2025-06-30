
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';

// Dummy data for courses
const dummyCourses = [
  {
    id: '1',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.',
    learnerCount: 124,
    duration: '12 weeks',
    topic: 'Web Development',
    status: 'published' as const,
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning with hands-on projects.',
    learnerCount: 89,
    duration: '8 weeks',
    topic: 'Data Science',
    status: 'published' as const,
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=225&fit=crop'
  },
  {
    id: '3',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile applications using React Native and deploy to both iOS and Android.',
    learnerCount: 67,
    duration: '10 weeks',
    topic: 'Mobile Development',
    status: 'draft' as const,
  },
  {
    id: '4',
    title: 'DevOps and Cloud Computing',
    description: 'Learn modern DevOps practices, containerization with Docker, and cloud deployment on AWS.',
    learnerCount: 43,
    duration: '6 weeks',
    topic: 'DevOps',
    status: 'published' as const,
    imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=225&fit=crop'
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the principles of user interface and user experience design with industry-standard tools.',
    learnerCount: 156,
    duration: '4 weeks',
    topic: 'Design',
    status: 'archived' as const,
  },
  {
    id: '6',
    title: 'JavaScript Advanced Concepts',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.',
    learnerCount: 78,
    duration: '5 weeks',
    topic: 'Programming',
    status: 'draft' as const,
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop'
  }
];

const AllCoursesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = dummyCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.topic?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleCreateCourse = () => {
    navigate('/courses/new');
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-heading font-bold text-3xl text-foreground mb-2">
              Course Studio
            </h1>
            <p className="text-muted-foreground text-lg">
              Create, manage, and monitor your educational courses
            </p>
          </div>
          <Button 
            onClick={handleCreateCourse}
            className="bg-primary hover:bg-primary-dark shadow-4dp hover:shadow-hover transition-all duration-200"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            onClick={() => handleCourseClick(course.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="font-heading font-medium text-lg mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery 
              ? `No courses match your search for "${searchQuery}"`
              : "Get started by creating your first course"
            }
          </p>
          {!searchQuery && (
            <Button onClick={handleCreateCourse}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Course
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
