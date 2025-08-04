'use client'

import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DragDropContext, 
  Droppable, 
  Draggable, 
  DropResult 
} from 'react-beautiful-dnd';
import { PlusCircle, GripVertical, Trash2 } from 'lucide-react';

type QuestionType = 
  | 'short-text'
  | 'long-text'
  | 'rating'
  | 'date'
  | 'time'
  | 'multiple-choice'
  | 'single-choice';

interface FeedbackQuestion {
  id: string;
  type: QuestionType;
  text: string;
  required: boolean;
  options?: string[]; // For multiple/single choice questions
  ratingScale?: {
    scale: '1-5' | '1-7' | '1-10';
    lowLabel: string;
    midLabel: string;
    highLabel: string;
  };
}

interface FeedbackFormData {
  title: string;
  questions: FeedbackQuestion[];
}

interface FeedbackFormEditorProps {
  initialData?: FeedbackFormData;
  onSave: (data: FeedbackFormData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function FeedbackFormEditor({ initialData, onSave, onCancel, mode }: FeedbackFormEditorProps) {
  const [data, setData] = useState<FeedbackFormData>(
    initialData || {
      title: '',
      questions: []
    }
  );

  const questionTypes: { value: QuestionType; label: string }[] = [
    { value: 'short-text', label: 'Short Text' },
    { value: 'long-text', label: 'Long Text' },
    { value: 'rating', label: 'Rating' },
    { value: 'date', label: 'Date' },
    { value: 'time', label: 'Time' },
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'single-choice', label: 'Single Choice' }
  ];

  const handleChange = (field: keyof FeedbackFormData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    const newQuestion: FeedbackQuestion = {
      id: `question-${Date.now()}`,
      type: 'short-text',
      text: '',
      required: true,
      options: [],
      ratingScale: {
        scale: '1-5',
        lowLabel: 'Poor',
        midLabel: 'Average',
        highLabel: 'Excellent'
      }
    };
    
    setData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (id: string, field: keyof FeedbackQuestion, value: any) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (id: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id)
    }));
  };

  const addOption = (questionId: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { ...q, options: [...(q.options || []), `Option ${(q.options?.length || 0) + 1}`] } 
          : q
      )
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options?.map((opt, idx) => idx === optionIndex ? value : opt) 
            } 
          : q
      )
    }));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              options: q.options?.filter((_, idx) => idx !== optionIndex) 
            } 
          : q
      )
    }));
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // Dropped outside the list
    if (!destination) return;
    
    // Dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newQuestions = Array.from(data.questions);
    const [removed] = newQuestions.splice(source.index, 1);
    newQuestions.splice(destination.index, 0, removed);

    setData(prev => ({ ...prev, questions: newQuestions }));
  };

  const handleSubmit = () => {
    onSave(data);
  };

  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Feedback Form' : 'Save Changes'}
      </Button>
    </>
  );

  return (
    <BaseEditor
      type="feedback"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="title">Form Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter feedback form title"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Questions</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addQuestion}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
          
          {data.questions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border rounded-md">
              No questions added yet. Add a question to get started.
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="questions">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {data.questions.map((question, index) => (
                      <Draggable key={question.id} draggableId={question.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="border rounded-md p-4 bg-background"
                          >
                            <div className="flex items-start gap-2">
                              <div
                                {...provided.dragHandleProps}
                                className="mt-2 cursor-grab"
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              
                              <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Question {index + 1}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQuestion(question.id)}
                                    className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor={`question-type-${question.id}`}>Question Type</Label>
                                      <Select
                                        value={question.type}
                                        onValueChange={(value) => updateQuestion(question.id, 'type', value)}
                                      >
                                        <SelectTrigger id={`question-type-${question.id}`}>
                                          <SelectValue placeholder="Select question type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {questionTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                              {type.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Label htmlFor={`question-required-${question.id}`}>Required</Label>
                                        <input
                                          id={`question-required-${question.id}`}
                                          type="checkbox"
                                          checked={question.required}
                                          onChange={(e) => updateQuestion(question.id, 'required', e.target.checked)}
                                          className="h-4 w-4"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <Label htmlFor={`question-text-${question.id}`}>Question Text</Label>
                                    <Input
                                      id={`question-text-${question.id}`}
                                      value={question.text}
                                      onChange={(e) => updateQuestion(question.id, 'text', e.target.value)}
                                      placeholder="Enter question text"
                                    />
                                  </div>
                                  
                                  {(question.type === 'multiple-choice' || question.type === 'single-choice') && (
                                    <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <Label>Options</Label>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => addOption(question.id)}
                                        >
                                          <PlusCircle className="mr-2 h-3 w-3" />
                                          Add Option
                                        </Button>
                                      </div>
                                      
                                      {question.options && question.options.length > 0 ? (
                                        <div className="space-y-2">
                                          {question.options.map((option, optionIndex) => (
                                            <div key={optionIndex} className="flex items-center gap-2">
                                              <div className="w-6 text-center">
                                                {question.type === 'multiple-choice' ? (
                                                  <div className="h-4 w-4 border rounded" />
                                                ) : (
                                                  <div className="h-4 w-4 border rounded-full" />
                                                )}
                                              </div>
                                              <Input
                                                value={option}
                                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                                placeholder={`Option ${optionIndex + 1}`}
                                              />
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeOption(question.id, optionIndex)}
                                                className="text-destructive hover:text-destructive-dark hover:bg-destructive-light"
                                              >
                                                <Trash2 className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="text-center py-2 text-sm text-muted-foreground border rounded">
                                          No options added yet
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                                  {question.type === 'rating' && (
                                    <div className="space-y-4">
                                      <div className="space-y-2">
                                        <Label htmlFor={`rating-scale-${question.id}`}>Rating Scale</Label>
                                        <Select
                                          value={question.ratingScale?.scale || '1-5'}
                                          onValueChange={(value) => 
                                            updateQuestion(question.id, 'ratingScale', {
                                              ...question.ratingScale,
                                              scale: value
                                            })
                                          }
                                        >
                                          <SelectTrigger id={`rating-scale-${question.id}`}>
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="1-5">1 to 5</SelectItem>
                                            <SelectItem value="1-7">1 to 7</SelectItem>
                                            <SelectItem value="1-10">1 to 10</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      
                                      <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                          <Label htmlFor={`low-label-${question.id}`}>Low Label (1)</Label>
                                          <Input
                                            id={`low-label-${question.id}`}
                                            value={question.ratingScale?.lowLabel || ''}
                                            onChange={(e) => 
                                              updateQuestion(question.id, 'ratingScale', {
                                                ...question.ratingScale,
                                                lowLabel: e.target.value
                                              })
                                            }
                                            placeholder="e.g., Poor"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor={`mid-label-${question.id}`}>
                                            Middle Label ({question.ratingScale?.scale === '1-5' ? '3' : 
                                                          question.ratingScale?.scale === '1-7' ? '4' : '5'})
                                          </Label>
                                          <Input
                                            id={`mid-label-${question.id}`}
                                            value={question.ratingScale?.midLabel || ''}
                                            onChange={(e) => 
                                              updateQuestion(question.id, 'ratingScale', {
                                                ...question.ratingScale,
                                                midLabel: e.target.value
                                              })
                                            }
                                            placeholder="e.g., Average"
                                          />
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <Label htmlFor={`high-label-${question.id}`}>
                                            High Label ({question.ratingScale?.scale?.split('-')[1]})
                                          </Label>
                                          <Input
                                            id={`high-label-${question.id}`}
                                            value={question.ratingScale?.highLabel || ''}
                                            onChange={(e) => 
                                              updateQuestion(question.id, 'ratingScale', {
                                                ...question.ratingScale,
                                                highLabel: e.target.value
                                              })
                                            }
                                            placeholder="e.g., Excellent"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </BaseEditor>
  );
} 