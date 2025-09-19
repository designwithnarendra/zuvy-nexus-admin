'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, BookOpen, Video, FileText, Code, HelpCircle, MessageSquare, ClipboardCheck, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentItem {
  id: string;
  type: 'live-class' | 'video' | 'article' | 'assignment' | 'coding-problem' | 'quiz' | 'feedback-form' | 'assessment';
  title: string;
  duration: string;
  status?: 'completed' | 'in-progress' | 'not-started';
}

interface ModulePageProps {
  courseId: string;
  moduleId: string;
}

const ModulePage = ({ courseId, moduleId }: ModulePageProps) => {
  const router = useRouter();

  // Mock module data - would come from API
  const moduleData = {
    id: moduleId,
    title: 'Module 2: DOM Manipulation & Events',
    contentItems: [
      { id: '1', type: 'live-class' as const, title: 'DOM Fundamentals and Element Selection', duration: '90 min', status: 'completed' as const },
      { id: '2', type: 'video' as const, title: 'Advanced DOM Manipulation Techniques', duration: '90 min', status: 'completed' as const },
      { id: '3', type: 'video' as const, title: 'Visualizing the DOM tree', duration: '15 min', status: 'not-started' as const },
      { id: '4', type: 'article' as const, title: 'Understanding Nodes in the DOM', duration: '5 mins read', status: 'not-started' as const },
      { id: '5', type: 'assignment' as const, title: 'DOM Selection Practice', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '6', type: 'quiz' as const, title: 'DOM Fundamentals Quiz', duration: '5 questions', status: 'not-started' as const },
      { id: '7', type: 'feedback-form' as const, title: 'Module 2 Feedback', duration: 'Due: Dec 15, 2024', status: 'not-started' as const },
      { id: '8', type: 'coding-problem' as const, title: 'Array Manipulation Challenge', duration: 'Practice problem', status: 'not-started' as const }
    ]
  };

  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(moduleData.contentItems[1] || null);
  const [showAddContent, setShowAddContent] = useState(false);

  const getContentIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'live-class': return <Video className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'assignment': return <ClipboardCheck className="h-4 w-4" />;
      case 'coding-problem': return <Code className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'feedback-form': return <MessageSquare className="h-4 w-4" />;
      case 'assessment': return <GraduationCap className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'completed': return 'bg-success-light text-success-dark border-success';
      case 'in-progress': return 'bg-warning-light text-warning-dark border-warning';
      case 'not-started': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const contentTypes = [
    { type: 'live-class', label: 'Live Class', icon: <Video className="h-4 w-4" /> },
    { type: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
    { type: 'article', label: 'Article', icon: <FileText className="h-4 w-4" /> },
    { type: 'assignment', label: 'Assignment', icon: <ClipboardCheck className="h-4 w-4" /> },
    { type: 'coding-problem', label: 'Coding Problem', icon: <Code className="h-4 w-4" /> },
    { type: 'quiz', label: 'Quiz', icon: <HelpCircle className="h-4 w-4" /> },
    { type: 'feedback-form', label: 'Feedback Form', icon: <MessageSquare className="h-4 w-4" /> },
    { type: 'assessment', label: 'Assessment', icon: <GraduationCap className="h-4 w-4" /> }
  ];

  const handleAddContentType = (type: string) => {
    console.log('Adding content type:', type);
    // Here we would create a new content item and set it as selected
    setShowAddContent(false);
  };

  const renderContentEditor = () => {
    if (!selectedItem) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start by choosing a content item</h3>
            <p className="text-muted-foreground">Select a content item from the sidebar to start editing</p>
          </div>
        </div>
      );
    }

    // Mock content editor - would be replaced with actual editors
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
            <div className="flex items-center gap-2">
              {getContentIcon(selectedItem.type)}
              <span className="text-sm text-muted-foreground capitalize">
                {selectedItem.type.replace('-', ' ')}
              </span>
              <Badge variant="outline" className={getStatusColor(selectedItem.status)}>
                {selectedItem.status?.replace('-', ' ')}
              </Badge>
            </div>
          </div>

          {/* Mock editor content based on type */}
          {selectedItem.type === 'live-class' && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Live Class Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Class Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={selectedItem.title}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date & Time</label>
                      <input type="datetime-local" className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        defaultValue="90 min"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Attendance Duration</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue="90 min"
                    />
                  </div>
                  <div className="bg-success-light p-4 rounded-md">
                    <div className="flex items-center text-success-dark">
                      <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                      Class completed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedItem.type === 'video' && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Video Content</h3>
                <div className="space-y-4">
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Video className="h-12 w-12 mx-auto mb-2" />
                      <p>Class Recording</p>
                      <p className="text-sm">90 min</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recording available for the live class</h4>
                    <p className="text-sm text-muted-foreground">
                      Deep dive into DOM manipulation methods and best practices
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {(selectedItem.type === 'article' || selectedItem.type === 'assignment' || selectedItem.type === 'quiz') && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {selectedItem.type === 'article' ? 'Article' :
                   selectedItem.type === 'assignment' ? 'Assignment' : 'Quiz'} Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      defaultValue={selectedItem.title}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md h-24"
                      placeholder="Enter description..."
                    />
                  </div>
                  {selectedItem.type === 'quiz' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Number of Questions</label>
                      <input type="number" className="w-full p-2 border rounded-md" defaultValue="5" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-primary hover:bg-primary-dark">Save Changes</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - 25% width */}
      <div className="w-1/4 border-r bg-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}`)}
            className="mb-4 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div>
            <h2 className="font-semibold text-lg mb-1">Module Content</h2>
            <h3 className="text-sm text-muted-foreground">{moduleData.title}</h3>
          </div>
        </div>

        {/* Content Items List */}
        <div className="flex-1 overflow-y-auto">
          {moduleData.contentItems.length === 0 ? (
            <div className="p-4">
              <Button
                onClick={() => setShowAddContent(!showAddContent)}
                className="w-full bg-primary hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          ) : (
            <div className="p-2">
              {moduleData.contentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={cn(
                    "p-3 mb-2 rounded-lg cursor-pointer border transition-colors",
                    selectedItem?.id === item.id
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted border-transparent"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-0.5 text-muted-foreground">
                      {getContentIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={() => setShowAddContent(!showAddContent)}
                variant="outline"
                className="w-full mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </div>
          )}

          {/* Add Content Menu */}
          {showAddContent && (
            <div className="p-2 border-t bg-muted/50">
              <div className="space-y-1">
                {contentTypes.map((contentType) => (
                  <Button
                    key={contentType.type}
                    variant="ghost"
                    onClick={() => handleAddContentType(contentType.type)}
                    className="w-full justify-start text-left h-auto py-2"
                  >
                    <div className="mr-2">{contentType.icon}</div>
                    {contentType.label}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content Area - 75% width */}
      {renderContentEditor()}
    </div>
  );
};

export default ModulePage;