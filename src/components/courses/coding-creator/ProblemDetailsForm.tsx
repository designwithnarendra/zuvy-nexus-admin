
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface ProblemData {
  title: string;
  description: string;
  topic: string;
  difficulty: string;
  points: number;
  timeLimit: number;
  memoryLimit: number;
  language: string;
}

interface ProblemDetailsFormProps {
  data: ProblemData;
  onDataChange: (field: string, value: string | number) => void;
  onCreateTopic: () => void;
}

const ProblemDetailsForm = ({ data, onDataChange, onCreateTopic }: ProblemDetailsFormProps) => {
  const topics = ['Algorithms', 'Data Structures', 'JavaScript', 'React', 'Node.js'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Problem Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="problem-title">Problem Title *</Label>
          <Input
            id="problem-title"
            placeholder="e.g., Two Sum, Reverse Linked List"
            value={data.title}
            onChange={(e) => onDataChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="problem-description">Problem Description *</Label>
          <Textarea
            id="problem-description"
            placeholder="Describe the problem, including constraints and examples..."
            value={data.description}
            onChange={(e) => onDataChange('description', e.target.value)}
            className="min-h-[120px]"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              min="60"
              value={data.timeLimit}
              onChange={(e) => onDataChange('timeLimit', parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
            <Input
              id="memory-limit"
              type="number"
              min="64"
              value={data.memoryLimit}
              onChange={(e) => onDataChange('memoryLimit', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Programming Language</Label>
          <Select value={data.language} onValueChange={(value) => onDataChange('language', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProblemDetailsForm;
