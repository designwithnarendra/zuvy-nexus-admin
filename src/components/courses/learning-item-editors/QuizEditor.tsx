import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Question {
  id: string;
  type: 'mcq' | 'open-ended';
  text: string;
}

interface QuizData {
  title: string;
  description: string;
  questions: Question[];
  timeLimit?: number; // in minutes
  randomizeQuestions: boolean;
}

interface QuizEditorProps {
  initialData?: QuizData;
  onSave: (data: QuizData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function QuizEditor({ initialData, onSave, onCancel, mode }: QuizEditorProps) {
  const [data, setData] = useState<QuizData>(
    initialData || {
      title: '',
      description: '',
      questions: [],
      timeLimit: undefined,
      randomizeQuestions: false
    }
  );

  const handleChange = (field: keyof QuizData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = (type: 'mcq' | 'open-ended') => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type,
      text: '',
    };
    
    setData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const removeQuestion = (id: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  return (
    <BaseEditor
      title={mode === 'create' ? 'Create Quiz' : 'Edit Quiz'}
      type="quiz"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      tabs={[
        {
          id: 'details',
          label: 'Details',
          content: (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={data.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter quiz description"
                  rows={4}
                />
              </div>
            </div>
          ),
        },
        {
          id: 'questions',
          label: 'Questions',
          content: (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Questions ({data.questions.length})</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('mcq')}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add MCQ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('open-ended')}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Open-ended
                  </Button>
                </div>
              </div>
              
              {data.questions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No questions added yet. Add a question to get started.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.questions.map((question, index) => (
                    <div 
                      key={question.id} 
                      className="border rounded-md p-4 relative"
                    >
                      <div className="absolute top-3 right-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeQuestion(question.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-medium">Question {index + 1}</span>
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                          {question.type === 'mcq' ? 'Multiple Choice' : 'Open-ended'}
                        </span>
                      </div>
                      
                      <div className="pl-4 border-l-2 border-primary/20">
                        {/* This would be replaced with the actual question editor components */}
                        <p className="text-sm text-muted-foreground">
                          {question.type === 'mcq' 
                            ? 'MCQ editor would be integrated here' 
                            : 'Open-ended question editor would be integrated here'}
                        </p>
                        <Button 
                          variant="link" 
                          className="p-0 h-auto text-xs"
                        >
                          Edit Question
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'settings',
          label: 'Settings',
          content: (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                <Input
                  id="timeLimit"
                  type="number"
                  value={data.timeLimit || ''}
                  onChange={(e) => handleChange('timeLimit', e.target.value ? parseInt(e.target.value) : undefined)}
                  placeholder="No time limit"
                />
                <p className="text-sm text-muted-foreground">Leave empty for no time limit</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="randomize">Randomize Question Order</Label>
                  <p className="text-sm text-muted-foreground">
                    Questions will be presented in a random order to each student
                  </p>
                </div>
                <Switch
                  id="randomize"
                  checked={data.randomizeQuestions}
                  onCheckedChange={(checked) => handleChange('randomizeQuestions', checked)}
                />
              </div>
            </div>
          ),
        },
      ]}
    >
      {/* Children is required but not used when tabs are provided */}
      <></>
    </BaseEditor>
  );
} 