
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, X } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';

// Updated dummy data with more statuses
const dummyCourses = [
  {
    id: '1',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.',
    learnerCount: 124,
    duration: '12 weeks',
    topic: 'Web Development',
    status: 'ongoing' as const,
    tags: ['JavaScript', 'React', 'Node.js'],
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop'
  },
  {
    id: '2',
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis, visualization, and machine learning with hands-on projects.',
    learnerCount: 89,
    duration: '8 weeks',
    topic: 'Data Science',
    status: 'completed' as const,
    tags: ['Python', 'Data Analysis', 'Machine Learning'],
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
    tags: ['React Native', 'Mobile', 'iOS', 'Android'],
  },
  {
    id: '4',
    title: 'DevOps and Cloud Computing',
    description: 'Learn modern DevOps practices, containerization with Docker, and cloud deployment on AWS.',
    learnerCount: 43,
    duration: '6 weeks',
    topic: 'DevOps',
    status: 'completed' as const,
    tags: ['DevOps', 'Docker', 'AWS', 'Cloud'],
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
    tags: ['UI', 'UX', 'Design', 'Figma'],
  },
  {
    id: '6',
    title: 'JavaScript Advanced Concepts',
    description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming.',
    learnerCount: 78,
    duration: '5 weeks',
    topic: 'Programming',
    status: 'ongoing' as const,
    tags: ['JavaScript', 'Advanced', 'ES6+'],
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop'
  },
  {
    id: '7',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into neural networks, reinforcement learning, and computer vision applications.',
    learnerCount: 92,
    duration: '10 weeks',
    topic: 'AI',
    status: 'published' as const,
    tags: ['ML', 'Deep Learning', 'TensorFlow'],
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop'
  },
  {
    id: '8',
    title: 'Cloud Infrastructure Management',
    description: 'Master cloud services, infrastructure as code, and deployment strategies on AWS and Azure.',
    learnerCount: 78,
    duration: '8 weeks',
    topic: 'DevOps',
    status: 'published' as const,
    tags: ['Cloud', 'AWS', 'Azure', 'Terraform'],
  },
  {
    id: '9',
    title: 'Frontend Performance Optimization',
    description: 'Learn techniques to speed up web applications and improve user experience.',
    learnerCount: 112,
    duration: '6 weeks',
    topic: 'Web Development',
    status: 'draft' as const,
    tags: ['Performance', 'JavaScript', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop'
  },
  {
    id: '10',
    title: 'Blockchain Fundamentals',
    description: 'Understand blockchain technology, smart contracts, and cryptocurrency applications.',
    learnerCount: 65,
    duration: '7 weeks',
    topic: 'Blockchain',
    status: 'published' as const,
    tags: ['Blockchain', 'Ethereum', 'Solidity'],
  },
  {
    id: '11',
    title: 'Advanced CSS Techniques',
    description: 'Master modern CSS features including Grid, Flexbox, and animations.',
    learnerCount: 143,
    duration: '5 weeks',
    topic: 'Web Development',
    status: 'published' as const,
    tags: ['CSS', 'Frontend', 'Design'],
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a7d?w=400&h=225&fit=crop'
  },
  {
    id: '12',
    title: 'Serverless Architecture',
    description: 'Build scalable applications using serverless technologies on AWS Lambda and Azure Functions.',
    learnerCount: 54,
    duration: '6 weeks',
    topic: 'Cloud Computing',
    status: 'completed' as const,
    tags: ['Serverless', 'AWS', 'Azure'],
  },
  {
    id: '13',
    title: 'Game Development with Unity',
    description: 'Create interactive games using Unity engine and C# programming.',
    learnerCount: 87,
    duration: '10 weeks',
    topic: 'Game Development',
    status: 'published' as const,
    tags: ['Unity', 'C#', 'Game Design'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop'
  },
  {
    id: '14',
    title: 'Cybersecurity Essentials',
    description: 'Learn fundamental security principles and practices to protect systems and data.',
    learnerCount: 76,
    duration: '8 weeks',
    topic: 'Security',
    status: 'published' as const,
    tags: ['Security', 'Cybersecurity', 'Networking'],
  },
  {
    id: '15',
    title: 'Natural Language Processing',
    description: 'Explore techniques for processing and analyzing human language data.',
    learnerCount: 68,
    duration: '9 weeks',
    topic: 'AI',
    status: 'draft' as const,
    tags: ['NLP', 'Python', 'Machine Learning'],
    imageUrl: 'https://images.unsplash.com/photo-1618044733300-9472044094d7?w=400&h=225&fit=crop'
  }
];

const AllCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: ''
  });

  // Calculate pagination indexes
  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  
  const filteredCourses = dummyCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };

  const handleCreateCourse = () => {
    setIsCreateModalOpen(true);
  };


  const handleSubmitCourse = () => {
    console.log('Creating course:', newCourse);
    // Reset form and close modal
    setNewCourse({
      title: '',
      description: ''
    });
    setIsCreateModalOpen(false);
  };

  return (
    <div className="w-full px-6 py-8">
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
            className="bg-primary hover:bg-primary-dark shadow-4dp hover:shadow-hover transition-all duration-200 px-4 h-12"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border focus:ring-primary focus:border-primary"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses
          .slice(indexOfFirstCourse, indexOfLastCourse)
          .map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              learnerCount={course.learnerCount}
              duration={course.duration}
              status={course.status}
              imageUrl={course.imageUrl}
              onClick={() => handleCourseClick(course.id)}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {filteredCourses.length > itemsPerPage && (
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            
            {Array.from({ length: Math.ceil(filteredCourses.length / itemsPerPage) }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === Math.ceil(filteredCourses.length / itemsPerPage)}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCourses.length / itemsPerPage)))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

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

      {/* Create Course Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create New Course</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="font-semibold">Course Name *</Label>
              <Input
                id="title"
                value={newCourse.title}
                onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-semibold">Course Description *</Label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter course description"
                className="min-h-[100px]"
              />
            </div>


            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitCourse} className="bg-primary hover:bg-primary-dark">
                Create Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCoursesPage;
