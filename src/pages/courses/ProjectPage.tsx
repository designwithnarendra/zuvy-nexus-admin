'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectResource {
  id: string;
  name: string;
  size: string;
  type: string;
}

interface ProjectPageProps {
  courseId: string;
  projectId: string;
}

const ProjectPage = ({ courseId, projectId }: ProjectPageProps) => {
  const router = useRouter();

  // Mock project data - would come from API
  const [projectData, setProjectData] = useState({
    id: projectId,
    title: 'Project 1: Portfolio Website',
    description: 'Build a responsive personal portfolio using HTML, CSS, and JavaScript',
    duration: '1 week',
    difficulty: 'Easy' as const,
    resources: [
      { id: '1', name: 'project-starter-files.zip', size: '2.4 MB', type: 'application/zip' },
      { id: '2', name: 'design-mockup.pdf', size: '1.2 MB', type: 'application/pdf' }
    ] as ProjectResource[]
  });

  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newResources: ProjectResource[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type
    }));

    setProjectData(prev => ({
      ...prev,
      resources: [...prev.resources, ...newResources]
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeResource = (resourceId: string) => {
    setProjectData(prev => ({
      ...prev,
      resources: prev.resources.filter(resource => resource.id !== resourceId)
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success-light text-success-dark border-success';
      case 'Medium': return 'bg-warning-light text-warning-dark border-warning';
      case 'Hard': return 'bg-destructive-light text-destructive-dark border-destructive';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const handleSave = () => {
    console.log('Saving project:', projectData);
    // Here you would make an API call to save the project
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push(`/courses/${courseId}`)}
            className="mb-6 hover:text-primary hover:bg-transparent p-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">Project Details</h1>
            <Badge variant="outline" className={getDifficultyColor(projectData.difficulty)}>
              {projectData.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Configure your project settings and upload resources
          </p>
        </div>

        {/* Project Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={projectData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the project objectives and requirements"
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={projectData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="e.g., 1 week, 3 days"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <RadioGroup
                    value={projectData.difficulty}
                    onValueChange={(value: 'Easy' | 'Medium' | 'Hard') =>
                      handleInputChange('difficulty', value)
                    }
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Easy" id="easy" />
                      <Label htmlFor="easy">Easy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Medium" id="medium" />
                      <Label htmlFor="medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hard" id="hard" />
                      <Label htmlFor="hard">Hard</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Resources</CardTitle>
            </CardHeader>
            <CardContent>
              {/* File Upload Area */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Upload Project Resources</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop files here, or click to browse
                </p>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileUpload(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Any file type is supported
                </p>
              </div>

              {/* Uploaded Files List */}
              {projectData.resources.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Uploaded Resources</h4>
                  <div className="space-y-2">
                    {projectData.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-muted/20"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{resource.name}</p>
                            <p className="text-xs text-muted-foreground">{resource.size}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResource(resource.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(`/courses/${courseId}`)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
              Save Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;