
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link, Plus } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface ArticleCreatorProps {
  onSave: () => void;
}

const ArticleCreator = ({ onSave }: ArticleCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [articleData, setArticleData] = useState({
    title: '',
    description: '',
    topic: '',
    content: '',
    externalUrl: '',
    readingTime: '',
    contentType: 'internal' // 'internal' or 'external'
  });

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];

  const handleInputChange = (field: string, value: string) => {
    setArticleData(prev => ({ ...prev, [field]: value }));
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleContentChange = (content: string) => {
    handleInputChange('content', content);
    if (content.trim()) {
      const estimatedTime = estimateReadingTime(content);
      handleInputChange('readingTime', estimatedTime);
    }
  };

  const handleSave = () => {
    console.log('Saving article:', articleData);
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Article Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="article-title">Article Title *</Label>
            <Input
              id="article-title"
              placeholder="e.g., Getting Started with React Hooks"
              value={articleData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief summary of the article..."
              value={articleData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <div className="flex gap-2">
                <Select value={articleData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
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
              <Label htmlFor="reading-time">Estimated Reading Time</Label>
              <Input
                id="reading-time"
                placeholder="Auto-calculated or enter manually"
                value={articleData.readingTime}
                onChange={(e) => handleInputChange('readingTime', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Content Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 mb-4">
            <Button
              variant={articleData.contentType === 'internal' ? 'default' : 'outline'}
              onClick={() => handleInputChange('contentType', 'internal')}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Write Content
            </Button>
            <Button
              variant={articleData.contentType === 'external' ? 'default' : 'outline'}
              onClick={() => handleInputChange('contentType', 'external')}
              className="flex items-center gap-2"
            >
              <Link className="h-4 w-4" />
              External Link
            </Button>
          </div>

          {articleData.contentType === 'internal' ? (
            <div className="space-y-2">
              <Label htmlFor="content">Article Content *</Label>
              <Textarea
                id="content"
                placeholder="Write your article content here. You can use Markdown formatting..."
                value={articleData.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-[300px] font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Supports Markdown formatting. Reading time is auto-calculated based on content length.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="external-url">External Article URL *</Label>
              <Input
                id="external-url"
                placeholder="https://example.com/article-url"
                value={articleData.externalUrl}
                onChange={(e) => handleInputChange('externalUrl', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Link to an external article or documentation
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Article
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

export default ArticleCreator;
