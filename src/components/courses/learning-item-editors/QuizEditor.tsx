'use client'

import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlusCircle, Trash2 } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MCQOption {
  id: string;
  text: string;
}

interface Question {
  id: string;
  type: 'mcq';
  text: string;
  options: MCQOption[];
  correctAnswerId: string;
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

  const addQuestion = () => {
    const defaultOptions: MCQOption[] = [
      { id: `option-${Date.now()}-1`, text: '' },
      { id: `option-${Date.now()}-2`, text: '' }
    ];
    
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      type: 'mcq',
      text: '',
      options: defaultOptions,
      correctAnswerId: defaultOptions[0].id
    };
    
    setData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: any) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const addOption = (questionId: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          options: [...q.options, { id: `option-${Date.now()}`, text: '' }]
        } : q
      )
    }));
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          options: q.options.map(opt => 
            opt.id === optionId ? { ...opt, text } : opt
          )
        } : q
      )
    }));
  };

  const removeOption = (questionId: string, optionId: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? {
          ...q,
          options: q.options.filter(opt => opt.id !== optionId),
          correctAnswerId: q.correctAnswerId === optionId ? q.options[0]?.id || '' : q.correctAnswerId
        } : q
      )
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
      title=""
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addQuestion}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add MCQ
                </Button>
              </div>
              
              {data.questions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No questions added yet. Add a question to get started.
                </div>
              ) : (
                <div className="space-y-6">
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
                          className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-medium">Question {index + 1}</span>
                        <span className="bg-primary-light text-primary px-2 py-1 rounded text-xs">
                          Multiple Choice
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {/* Question Text */}
                        <div className="space-y-2">
                          <Label htmlFor={`question-${question.id}`}>Question</Label>
                          <Textarea
                            id={`question-${question.id}`}
                            value={question.text}
                            onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                            placeholder="Enter your question"
                            rows={3}
                          />
                        </div>
                        
                        {/* Options */}
                        <div className="space-y-3">
                          <Label>Options (Select the correct answer)</Label>
                          <RadioGroup 
                            value={question.correctAnswerId} 
                            onValueChange={(value) => updateQuestion(question.id, 'correctAnswerId', value)}
                          >
                            {question.options.map((option, optionIndex) => (
                              <div key={option.id} className="flex items-center gap-3">
                                <RadioGroupItem value={option.id} id={option.id} />
                                <div className="flex-1 flex items-center gap-2">
                                  <Input
                                    value={option.text}
                                    onChange={(e) => updateOption(question.id, option.id, e.target.value)}
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                  {question.options.length > 2 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeOption(question.id, option.id)}
                                      className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                          
                          {question.options.length < 4 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addOption(question.id)}
                            >
                              <PlusCircle className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          )}
                        </div>
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