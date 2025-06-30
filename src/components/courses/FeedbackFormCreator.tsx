
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface FeedbackFormCreatorProps {
  onSave: () => void;
}

interface FormField {
  id: string;
  type: 'text' | 'textarea' | 'rating' | 'multiple-choice' | 'checkbox';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const FeedbackFormCreator = ({ onSave }: FeedbackFormCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    topic: '',
    anonymous: true,
    showResults: false
  });

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: '1', type: 'rating', label: 'Overall satisfaction', required: true },
    { id: '2', type: 'textarea', label: 'What did you like most?', required: false },
    { id: '3', type: 'textarea', label: 'What could be improved?', required: false }
  ]);

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];
  const fieldTypes = [
    { value: 'text', label: 'Short Text' },
    { value: 'textarea', label: 'Long Text' },
    { value: 'rating', label: 'Rating (1-5)' },
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'checkbox', label: 'Checkbox' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldChange = (fieldId: string, property: string, value: any) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId ? { ...field, [property]: value } : field
    ));
  };

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: '',
      required: false
    };
    setFormFields([...formFields, newField]);
  };

  const removeField = (fieldId: string) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };

  const addOption = (fieldId: string) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId
        ? { ...field, options: [...(field.options || []), ''] }
        : field
    ));
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options?.map((opt, idx) => idx === optionIndex ? value : opt)
          }
        : field
    ));
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    setFormFields(prev => prev.map(field =>
      field.id === fieldId
        ? {
            ...field,
            options: field.options?.filter((_, idx) => idx !== optionIndex)
          }
        : field
    ));
  };

  const handleSave = () => {
    console.log('Saving feedback form:', { formData, formFields });
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Feedback Form Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="form-title">Form Title *</Label>
            <Input
              id="form-title"
              placeholder="e.g., Course Feedback Survey"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the feedback form..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Topic *</Label>
            <div className="flex gap-2">
              <Select value={formData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
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

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.anonymous}
                onCheckedChange={(checked) => handleInputChange('anonymous', checked as boolean)}
              />
              <Label>Allow anonymous responses</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.showResults}
                onCheckedChange={(checked) => handleInputChange('showResults', checked as boolean)}
              />
              <Label>Show aggregated results to participants</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Form Fields</CardTitle>
            <Button variant="outline" size="sm" onClick={addField}>
              <Plus className="h-4 w-4 mr-2" />
              Add Field
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {formFields.map((field, index) => (
            <Card key={field.id} className="border-dashed">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-sm">Field {index + 1}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.required}
                        onCheckedChange={(checked) => handleFieldChange(field.id, 'required', checked)}
                      />
                      <Label className="text-sm">Required</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeField(field.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Field Type</Label>
                      <Select value={field.type} onValueChange={(value) => handleFieldChange(field.id, 'type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs">Label</Label>
                      <Input
                        placeholder="Field label"
                        value={field.label}
                        onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
                      />
                    </div>
                  </div>

                  {(field.type === 'text' || field.type === 'textarea') && (
                    <div className="space-y-2">
                      <Label className="text-xs">Placeholder</Label>
                      <Input
                        placeholder="Placeholder text"
                        value={field.placeholder || ''}
                        onChange={(e) => handleFieldChange(field.id, 'placeholder', e.target.value)}
                      />
                    </div>
                  )}

                  {(field.type === 'multiple-choice' || field.type === 'checkbox') && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Options</Label>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addOption(field.id)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Option
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(field.options || []).map((option, optionIndex) => (
                          <div key={optionIndex} className="flex gap-2">
                            <Input
                              placeholder={`Option ${optionIndex + 1}`}
                              value={option}
                              onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(field.id, optionIndex)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Feedback Form
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

export default FeedbackFormCreator;
