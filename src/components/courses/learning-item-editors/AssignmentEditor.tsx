import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AssignmentData {
  title: string;
  instructions: string;
  allowedSubmissionTypes: ('file' | 'text')[];
  dueDate?: Date;
  fileUrl?: string;
}

interface AssignmentEditorProps {
  initialData?: AssignmentData;
  onSave: (data: AssignmentData) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

export function AssignmentEditor({ initialData, onSave, onCancel, mode }: AssignmentEditorProps) {
  const [data, setData] = useState<AssignmentData>(
    initialData || {
      title: '',
      instructions: '',
      allowedSubmissionTypes: ['file'],
      dueDate: undefined,
      fileUrl: undefined
    }
  );
  
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (field: keyof AssignmentData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmissionTypeChange = (type: 'file' | 'text', checked: boolean) => {
    if (checked) {
      setData(prev => ({
        ...prev,
        allowedSubmissionTypes: [...prev.allowedSubmissionTypes, type]
      }));
    } else {
      setData(prev => ({
        ...prev,
        allowedSubmissionTypes: prev.allowedSubmissionTypes.filter(t => t !== type)
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // In a real implementation, we would upload the file to a server
      // and get back a URL to store in the data
      // For now, we'll just simulate this with a fake URL
      handleChange('fileUrl', URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = () => {
    onSave(data);
  };

  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Assignment' : 'Save Changes'}
      </Button>
    </>
  );

  return (
    <BaseEditor
      type="assignment"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter assignment title"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            value={data.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Enter detailed instructions for the assignment"
            rows={6}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Upload Instructions (PDF)</Label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="border rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {file ? file.name : 'Click to upload PDF'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'PDF up to 10MB'}
                  </span>
                </label>
              </div>
            </div>
            
            {data.fileUrl && (
              <div className="flex-1">
                <div className="border rounded-md p-4">
                  <p className="text-sm font-medium mb-2">Current File</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={data.fileUrl} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Allowed Submission Types</Label>
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="file-submission" 
                checked={data.allowedSubmissionTypes.includes('file')}
                onCheckedChange={(checked) => handleSubmissionTypeChange('file', checked === true)}
              />
              <Label htmlFor="file-submission" className="font-normal">
                File Upload
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="text-submission" 
                checked={data.allowedSubmissionTypes.includes('text')}
                onCheckedChange={(checked) => handleSubmissionTypeChange('text', checked === true)}
              />
              <Label htmlFor="text-submission" className="font-normal">
                Text Response
              </Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.dueDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.dueDate ? format(data.dueDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={data.dueDate}
                onSelect={(date) => handleChange('dueDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </BaseEditor>
  );
} 