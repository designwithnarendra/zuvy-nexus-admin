
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, X } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface MCQCreatorProps {
  onSave: () => void;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

const MCQCreator = ({ onSave }: MCQCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty: '',
    points: 5,
    timeLimit: 60
  });
  
  const [options, setOptions] = useState<Option[]>([
    { id: '1', text: '', isCorrect: false },
    { id: '2', text: '', isCorrect: false },
    { id: '3', text: '', isCorrect: false },
    { id: '4', text: '', isCorrect: false }
  ]);

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleInputChange = (field: string, value: string | number) => {
    setQuestionData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (optionId: string, text: string) => {
    setOptions(prev => prev.map(option =>
      option.id === optionId ? { ...option, text } : option
    ));
  };

  const handleCorrectChange = (optionId: string, isCorrect: boolean) => {
    setOptions(prev => prev.map(option =>
      option.id === optionId ? { ...option, isCorrect } : option
    ));
  };

  const addOption = () => {
    const newOption: Option = {
      id: Date.now().toString(),
      text: '',
      isCorrect: false
    };
    setOptions([...options, newOption]);
  };

  const removeOption = (optionId: string) => {
    if (options.length > 2) {
      setOptions(options.filter(option => option.id !== optionId));
    }
  };

  const handleSave = () => {
    console.log('Saving MCQ:', { questionData, options });
    onSave();
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">One at a Time</TabsTrigger>
          <TabsTrigger value="bulk" disabled>Bulk Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single" className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-title">Question Title *</Label>
                <Textarea
                  id="question-title"
                  placeholder="Enter your question..."
                  value={questionData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add context or additional information..."
                  value={questionData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    min="1"
                    value={questionData.points}
                    onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-limit">Time Limit (seconds)</Label>
                  <Input
                    id="time-limit"
                    type="number"
                    min="30"
                    value={questionData.timeLimit}
                    onChange={(e) => handleInputChange('timeLimit', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Answer Options *</Label>
                  <Button variant="outline" size="sm" onClick={addOption}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>

                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div key={option.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={option.isCorrect}
                          onCheckedChange={(checked) => handleCorrectChange(option.id, checked as boolean)}
                        />
                        <Label className="text-sm text-muted-foreground">
                          Correct
                        </Label>
                      </div>
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        className="flex-1"
                      />
                      {options.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeOption(option.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  Check the box next to correct answer(s). Multiple correct answers are allowed.
                </p>
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
        </TabsContent>
      </Tabs>

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

export default MCQCreator;
