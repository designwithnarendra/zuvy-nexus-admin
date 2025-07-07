
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, X, Plus, Calendar } from 'lucide-react';

interface GeneralDetailsTabProps {
  courseId: string;
}

const GeneralDetailsTab = ({ courseId }: GeneralDetailsTabProps) => {
  const [formData, setFormData] = useState({
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.',
    tags: ['Web Development', 'JavaScript', 'React'],
    duration: 12,
    language: 'English',
    startDate: '2024-08-15',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, imageUrl: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log('Saving course data:', formData);
  };

  return (
    <div className="w-full max-w-none space-y-6">
      <Card className="shadow-4dp">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Course Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Image */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Course Image</Label>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted relative group">
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
                    alt="Course preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary-light to-primary">
                    <Image className="h-12 w-12 text-primary opacity-60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <Button variant="secondary" size="sm" className="pointer-events-none">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter course title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Enter course description"
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                    placeholder="Duration in weeks"
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Course Start Date</Label>
                  <div className="relative">
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Tags</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-lg bg-background">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a new tag"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button onClick={handleAddTag} size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Course Language</Label>
            <RadioGroup
              value={formData.language}
              onValueChange={(value) => handleInputChange('language', value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="English" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Hindi" id="hindi" />
                <Label htmlFor="hindi">Hindi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Kannada" id="kannada" />
                <Label htmlFor="kannada">Kannada</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralDetailsTab;
