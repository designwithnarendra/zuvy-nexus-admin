
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface MCQFormData {
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  points: number;
  timeLimit: number;
}

interface MCQFormProps {
  data: MCQFormData;
  onDataChange: (field: string, value: string | number) => void;
  onCreateTopic: () => void;
}

const MCQForm = ({ data, onDataChange, onCreateTopic }: MCQFormProps) => {
  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question-title">Question Title *</Label>
          <Textarea
            id="question-title"
            placeholder="Enter your question..."
            value={data.title}
            onChange={(e) => onDataChange('title', e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add context or additional information..."
            value={data.description}
            onChange={(e) => onDataChange('description', e.target.value)}
            className="min-h-[60px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Topic *</Label>
            <div className="flex gap-2">
              <Select value={data.topic} onValueChange={(value) => onDataChange('topic', value)}>
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
              <Button variant="outline" size="sm" onClick={onCreateTopic}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Difficulty *</Label>
            <Select value={data.difficulty} onValueChange={(value) => onDataChange('difficulty', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input
              id="points"
              type="number"
              min="1"
              value={data.points}
              onChange={(e) => onDataChange('points', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-limit">Time Limit (seconds)</Label>
            <Input
              id="time-limit"
              type="number"
              min="30"
              value={data.timeLimit}
              onChange={(e) => onDataChange('timeLimit', parseInt(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MCQForm;
