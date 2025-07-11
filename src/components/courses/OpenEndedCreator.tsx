
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface OpenEndedCreatorProps {
  onSave: () => void;
}

const OpenEndedCreator = ({ onSave }: OpenEndedCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty: '',
    points: 10,
    timeLimit: 30,
    expectedAnswer: '',
    rubric: ''
  });

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleInputChange = (field: string, value: string | number) => {
    setQuestionData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving open ended question:', questionData);
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question-title">Question Title *</Label>
            <Input
              id="question-title"
              placeholder="e.g., Explain the concept of closures in JavaScript"
              value={questionData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Question *</Label>
            <Textarea
              id="description"
              placeholder="Provide a detailed description of what you're asking..."
              value={questionData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <div className="flex gap-2">
                <Select value={questionData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
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
              <Label>Difficulty *</Label>
              <Select value={questionData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
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

            <div className="space-y-2">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                max="100"
                value={questionData.points}
                onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <Input
              id="time-limit"
              type="number"
              min="1"
              max="120"
              value={questionData.timeLimit}
              onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Answer Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="expected-answer">Expected Answer/Key Points</Label>
            <Textarea
              id="expected-answer"
              placeholder="Provide key points or a sample answer that you expect..."
              value={questionData.expectedAnswer}
              onChange={(e) => handleInputChange('expectedAnswer', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rubric">Grading Rubric (Optional)</Label>
            <Textarea
              id="rubric"
              placeholder="Define how this question should be graded..."
              value={questionData.rubric}
              onChange={(e) => handleInputChange('rubric', e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Question
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

export default OpenEndedCreator;
