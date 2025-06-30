
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Upload, Trash2 } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface AssignmentCreatorProps {
  onSave: () => void;
}

interface Deliverable {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

const AssignmentCreator = ({ onSave }: AssignmentCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    topic: '',
    instructions: '',
    dueDate: '',
    points: 100,
    allowLateSubmission: true,
    latePenalty: 10
  });

  const [deliverables, setDeliverables] = useState<Deliverable[]>([
    { id: '1', title: '', description: '', required: true }
  ]);

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setAssignmentData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeliverableChange = (deliverableId: string, field: string, value: string | boolean) => {
    setDeliverables(prev => prev.map(d =>
      d.id === deliverableId ? { ...d, [field]: value } : d
    ));
  };

  const addDeliverable = () => {
    const newDeliverable: Deliverable = {
      id: Date.now().toString(),
      title: '',
      description: '',
      required: false
    };
    setDeliverables([...deliverables, newDeliverable]);
  };

  const removeDeliverable = (deliverableId: string) => {
    if (deliverables.length > 1) {
      setDeliverables(deliverables.filter(d => d.id !== deliverableId));
    }
  };

  const handleSave = () => {
    console.log('Saving assignment:', { assignmentData, deliverables });
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="assignment-title">Assignment Title *</Label>
            <Input
              id="assignment-title"
              placeholder="e.g., Build a Todo App with React"
              value={assignmentData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief overview of the assignment..."
              value={assignmentData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <div className="flex gap-2">
                <Select value={assignmentData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
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
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                id="due-date"
                type="datetime-local"
                value={assignmentData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              placeholder="Detailed instructions for completing the assignment..."
              value={assignmentData.instructions}
              onChange={(e) => handleInputChange('instructions', e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deliverables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">What should students submit?</Label>
            <Button variant="outline" size="sm" onClick={addDeliverable}>
              <Plus className="h-4 w-4 mr-2" />
              Add Deliverable
            </Button>
          </div>

          <div className="space-y-4">
            {deliverables.map((deliverable, index) => (
              <Card key={deliverable.id} className="border-dashed">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm">Deliverable {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={deliverable.required}
                          onCheckedChange={(checked) => handleDeliverableChange(deliverable.id, 'required', checked as boolean)}
                        />
                        <Label className="text-sm">Required</Label>
                      </div>
                      {deliverables.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDeliverable(deliverable.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-xs">Title</Label>
                      <Input
                        placeholder="e.g., Source Code, Demo Video, Documentation"
                        value={deliverable.title}
                        onChange={(e) => handleDeliverableChange(deliverable.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        placeholder="Describe what this deliverable should contain..."
                        value={deliverable.description}
                        onChange={(e) => handleDeliverableChange(deliverable.id, 'description', e.target.value)}
                        className="min-h-[60px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Grading & Submission Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="points">Total Points</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={assignmentData.points}
                onChange={(e) => handleInputChange('points', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="late-penalty">Late Submission Penalty (%)</Label>
              <Input
                id="late-penalty"
                type="number"
                min="0"
                max="100"
                value={assignmentData.latePenalty}
                onChange={(e) => handleInputChange('latePenalty', parseInt(e.target.value))}
                disabled={!assignmentData.allowLateSubmission}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={assignmentData.allowLateSubmission}
              onCheckedChange={(checked) => handleInputChange('allowLateSubmission', checked as boolean)}
            />
            <Label>Allow late submissions</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Assignment
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

export default AssignmentCreator;
