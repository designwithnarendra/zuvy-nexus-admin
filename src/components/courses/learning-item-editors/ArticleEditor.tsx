import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { FileUp, Link, FileText } from 'lucide-react';

// Define the article content types
type ArticleContentType = 'rich-text' | 'external-link' | 'file-upload';

// Define the article data structure
export interface ArticleData {
  id?: string;
  title: string;
  content: string;
  contentType: ArticleContentType;
  estimatedReadTime?: number;
  externalLink?: string;
  fileUrl?: string;
}

interface ArticleEditorProps {
  initialData?: ArticleData;
  mode: 'create' | 'edit';
  onSave: (data: ArticleData) => void;
  onCancel: () => void;
}

const DEFAULT_ARTICLE_DATA: ArticleData = {
  title: '',
  content: '',
  contentType: 'rich-text',
};

/**
 * ArticleEditor
 * 
 * Editor component for creating and editing articles.
 * Supports rich text content, external links, and file uploads.
 */
export function ArticleEditor({
  initialData = DEFAULT_ARTICLE_DATA,
  mode,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const [articleData, setArticleData] = useState<ArticleData>(initialData);
  
  // Handle input changes
  const handleInputChange = (field: keyof ArticleData, value: any) => {
    setArticleData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle content type change
  const handleContentTypeChange = (value: ArticleContentType) => {
    setArticleData(prev => ({ ...prev, contentType: value }));
  };
  
  // Calculate estimated read time based on content length
  const calculateReadTime = () => {
    const wordCount = articleData.content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
    handleInputChange('estimatedReadTime', readTime);
  };
  
  // Handle file upload (mock implementation)
  const handleFileUpload = () => {
    // In a real implementation, this would handle file upload to a server
    console.log('File upload triggered');
    // Mock a successful upload
    handleInputChange('fileUrl', 'https://example.com/sample-article.pdf');
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // If it's a rich text article, calculate the read time
    if (articleData.contentType === 'rich-text') {
      calculateReadTime();
    }
    
    onSave(articleData);
  };

  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Article' : 'Save Changes'}
      </Button>
    </>
  );
  
  return (
    <BaseEditor
      type="article"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
    >
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={articleData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter article title"
          />
        </div>
        
        {/* Content Type Selection */}
        <div className="space-y-2">
          <Label>Content Type</Label>
          <RadioGroup
            value={articleData.contentType}
            onValueChange={(value) => handleContentTypeChange(value as ArticleContentType)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rich-text" id="rich-text" />
              <Label htmlFor="rich-text" className="cursor-pointer flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Rich Text
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="external-link" id="external-link" />
              <Label htmlFor="external-link" className="cursor-pointer flex items-center">
                <Link className="h-4 w-4 mr-1" />
                External Link
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="file-upload" id="file-upload" />
              <Label htmlFor="file-upload" className="cursor-pointer flex items-center">
                <FileUp className="h-4 w-4 mr-1" />
                File Upload
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Render different content inputs based on the selected content type */}
        {articleData.contentType === 'rich-text' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="border rounded-md">
                {/* Rich text formatting toolbar */}
                <div className="flex items-center gap-2 p-2 border-b bg-muted/30">
                  <Button variant="ghost" size="sm" type="button">
                    <strong>B</strong>
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <em>I</em>
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    <u>U</u>
                  </Button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <Button variant="ghost" size="sm" type="button">
                    H1
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    H2
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    H3
                  </Button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <Button variant="ghost" size="sm" type="button">
                    •
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    1.
                  </Button>
                  <Button variant="ghost" size="sm" type="button">
                    Link
                  </Button>
                </div>
                <Textarea
                  id="content"
                  value={articleData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your article content here..."
                  className="min-h-[300px] border-0 resize-none focus-visible:ring-0"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Estimated read time: {articleData.estimatedReadTime || '< 1'} minute(s)
              </div>
            </div>
          </div>
        )}
        
        {articleData.contentType === 'external-link' && (
          <div className="space-y-2">
            <Label htmlFor="externalLink">External Link</Label>
            <Input
              id="externalLink"
              value={articleData.externalLink || ''}
              onChange={(e) => handleInputChange('externalLink', e.target.value)}
              placeholder="https://example.com/article"
            />
          </div>
        )}
        
        {articleData.contentType === 'file-upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <FileUp className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your file here, or click to select a file
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleFileUpload}
              >
                Select File
              </Button>
            </div>
            
            {articleData.fileUrl && (
              <div className="p-3 border rounded-md bg-muted/30">
                <p className="text-sm font-medium">Uploaded File:</p>
                <a 
                  href={articleData.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {articleData.fileUrl.split('/').pop()}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </BaseEditor>
  );
} 