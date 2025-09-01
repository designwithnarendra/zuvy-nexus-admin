'use client'

import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { FileUp, Link, Video } from 'lucide-react';

// Define the video source types
type VideoSourceType = 'upload' | 'youtube';

// Define the video data structure
export interface VideoData {
  id?: string;
  title: string;
  description: string;
  sourceType: VideoSourceType;
  url?: string;
  fileUrl?: string;
  transcript?: string;
  transcriptFile?: File;
}

interface VideoEditorProps {
  initialData?: VideoData;
  mode: 'create' | 'edit';
  onSave: (data: VideoData) => void;
  onCancel: () => void;
}

const DEFAULT_VIDEO_DATA: VideoData = {
  title: '',
  description: '',
  sourceType: 'youtube',
};

/**
 * VideoEditor
 * 
 * Editor component for creating and editing videos.
 * Supports video uploads and YouTube URLs.
 */
export function VideoEditor({
  initialData = DEFAULT_VIDEO_DATA,
  mode,
  onSave,
  onCancel,
}: VideoEditorProps) {
  const [videoData, setVideoData] = useState<VideoData>(initialData);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData.url || null);
  
  // Handle input changes
  const handleInputChange = (field: keyof VideoData, value: any) => {
    setVideoData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle source type change
  const handleSourceTypeChange = (value: VideoSourceType) => {
    setVideoData(prev => ({ ...prev, sourceType: value }));
    setPreviewUrl(null); // Reset preview when source type changes
  };
  
  // Handle file upload (mock implementation)
  const handleFileUpload = () => {
    // In a real implementation, this would handle file upload to a server
    console.log('Video file upload triggered');
    // Mock a successful upload
    const mockUrl = 'https://example.com/sample-video.mp4';
    handleInputChange('fileUrl', mockUrl);
    setPreviewUrl(mockUrl);
  };
  
  // Handle URL preview
  const handleUrlPreview = () => {
    if (videoData.url) {
      setPreviewUrl(videoData.url);
    }
  };
  
  // Extract video ID from YouTube URL
  const extractVideoId = (url: string): string | null => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };
  
  // Generate embed URL for YouTube
  const getEmbedUrl = (): string | null => {
    if (!videoData.url) return null;
    
    if (videoData.sourceType === 'youtube') {
      const videoId = extractVideoId(videoData.url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }
    
    return videoData.url;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    onSave(videoData);
  };

  // Handle URL change with automatic preview
  const handleUrlChange = (url: string) => {
    handleInputChange('url', url);
    if (url && videoData.sourceType === 'youtube') {
      // Auto preview for YouTube
      setPreviewUrl(url);
    }
  };

  // Handle transcript file upload
  const handleTranscriptFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('transcriptFile', file);
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('transcript', e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Video' : 'Save Changes'}
      </Button>
    </>
  );
  
  return (
    <BaseEditor
      type="video"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
    >
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="font-semibold">Title</Label>
          <Input
            id="title"
            value={videoData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="font-semibold">Description</Label>
          <Textarea
            id="description"
            value={videoData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter video description"
            className="min-h-[100px]"
          />
        </div>
        
        {/* Video Source Selection */}
        <div className="space-y-2">
          <Label className="font-semibold">Video Source</Label>
          <RadioGroup
            value={videoData.sourceType}
            onValueChange={(value) => handleSourceTypeChange(value as VideoSourceType)}
            className="flex flex-wrap gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="youtube" id="youtube" />
              <Label htmlFor="youtube" className="cursor-pointer flex items-center font-semibold">
                <Video className="h-4 w-4 mr-1" />
                YouTube
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload" className="cursor-pointer flex items-center font-semibold">
                <FileUp className="h-4 w-4 mr-1" />
                Upload
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Render different inputs based on the selected source type */}
        {videoData.sourceType === 'youtube' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoUrl" className="font-semibold">YouTube URL</Label>
              <Input
                id="videoUrl"
                value={videoData.url || ''}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
              />
            </div>
            
            {/* Auto-show thumbnail when URL is provided */}
            {videoData.url && (
              <div className="space-y-2">
                <Label className="font-semibold">Video Thumbnail</Label>
                <div className="aspect-video bg-black rounded-md overflow-hidden">
                  <iframe
                    src={getEmbedUrl() || ''}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        )}
        
        {videoData.sourceType === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your video file here, or click to select a file
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleFileUpload}
              >
                Select Video File
              </Button>
            </div>
            
            {videoData.fileUrl && (
              <div className="p-3 border rounded-md bg-muted/30">
                <p className="text-sm font-medium">Uploaded Video:</p>
                <p className="text-sm text-blue-600">
                  {videoData.fileUrl.split('/').pop()}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Transcript */}
        <div className="space-y-4">
          <Label className="font-semibold">Transcript (Optional)</Label>
          
          <div className="space-y-3">
            {/* Text input for transcript */}
            <Textarea
              id="transcript"
              value={videoData.transcript || ''}
              onChange={(e) => handleInputChange('transcript', e.target.value)}
              placeholder="Enter video transcript or subtitles"
              className="min-h-[150px]"
            />
            
            {/* File upload for transcript */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">or</span>
              <input
                type="file"
                accept=".txt,.srt,.vtt"
                onChange={handleTranscriptFileUpload}
                className="hidden"
                id="transcript-upload"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="transcript-upload" className="cursor-pointer font-semibold">
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload Transcript File
                </label>
              </Button>
            </div>
            
            {videoData.transcriptFile && (
              <div className="p-3 border rounded-md bg-muted/30">
                <p className="text-sm font-medium">Uploaded Transcript:</p>
                <p className="text-sm text-blue-600">{videoData.transcriptFile.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseEditor>
  );
} 