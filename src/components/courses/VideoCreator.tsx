
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link, Plus } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface VideoCreatorProps {
  onSave: () => void;
}

const VideoCreator = ({ onSave }: VideoCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [videoData, setVideoData] = useState({
    title: '',
    description: '',
    topic: '',
    videoUrl: '',
    duration: '',
    transcript: '',
    uploadMethod: 'url' // 'url' or 'upload'
  });

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];

  const handleInputChange = (field: string, value: string) => {
    setVideoData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving video:', videoData);
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Video Content Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-title">Video Title *</Label>
            <Input
              id="video-title"
              placeholder="e.g., Understanding React State Management"
              value={videoData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the video content..."
              value={videoData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <div className="flex gap-2">
                <Select value={videoData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateTopicOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (e.g., "15 min")</Label>
              <Input
                id="duration"
                placeholder="15 min"
                value={videoData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Video Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={videoData.uploadMethod === 'url' ? 'default' : 'outline'}
                onClick={() => handleInputChange('uploadMethod', 'url')}
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                Video URL
              </Button>
              <Button
                variant={videoData.uploadMethod === 'upload' ? 'default' : 'outline'}
                onClick={() => handleInputChange('uploadMethod', 'upload')}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Upload File
              </Button>
            </div>

            {videoData.uploadMethod === 'url' ? (
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL *</Label>
                <Input
                  id="video-url"
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                  value={videoData.videoUrl}
                  onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Upload Video File *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop your video file here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, MOV, AVI (Max 500MB)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="transcript">Transcript (Optional)</Label>
            <Textarea
              id="transcript"
              placeholder="Add video transcript for accessibility..."
              value={videoData.transcript}
              onChange={(e) => handleInputChange('transcript', e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Video Content
        </Button>
      </div>

      <CreateTopicModal
        isOpen={isCreateTopicOpen}
        onClose={() => setIsCreateTopicOpen(false)}
        onTopicCreated={(topic) => {
          handleInputChange('topic', topic);
          setIsCreateTopicOpen(false);
        }}
      />
    </div>
  );
};

export default VideoCreator;
