
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    status: 'published' as const,
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
    status: 'published' as const,
    tags: ['JavaScript', 'Advanced', 'ES6+'],
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop'
  }
];

const AllCoursesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    imageUrl: '',
    tags: [] as string[],
    duration: ''
  });
  const [newTag, setNewTag] = useState('');

  const filteredCourses = dummyCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.topic?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesTag = tagFilter === 'all' || course.tags?.includes(tagFilter);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const allTags = Array.from(new Set(dummyCourses.flatMap(course => course.tags || [])));

  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleCreateCourse = () => {
    setIsCreateModalOpen(true);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !newCourse.tags.includes(newTag.trim())) {
      setNewCourse(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewCourse(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmitCourse = () => {
    console.log('Creating course:', newCourse);
    // Reset form and close modal
    setNewCourse({
      title: '',
      description: '',
      imageUrl: '',
      tags: [],
      duration: ''
    });
    setIsCreateModalOpen(false);
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      {/* Create Course Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Create New Course</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={newCourse.title}
                onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter course title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter course description"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Course Image URL</Label>
              <Input
                id="imageUrl"
                value={newCourse.imageUrl}
                onChange={(e) => setNewCourse(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Enter image URL"
              />
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newCourse.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (weeks) *</Label>
              <Input
                id="duration"
                value={newCourse.duration}
                onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 12"
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
