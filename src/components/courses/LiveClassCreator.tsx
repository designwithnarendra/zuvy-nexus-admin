
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, Plus } from 'lucide-react';
import CreateTopicModal from './CreateTopicModal';

interface LiveClassCreatorProps {
  onSave: () => void;
}

const LiveClassCreator = ({ onSave }: LiveClassCreatorProps) => {
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [classData, setClassData] = useState({
    title: '',
    description: '',
    topic: '',
    instructor: '',
    date: '',
    time: '',
    duration: 60,
    maxParticipants: 50,
    meetingId: '',
    passcode: ''
  });

  const topics = ['JavaScript Basics', 'React Fundamentals', 'Node.js', 'Algorithms', 'Data Structures'];
  const instructors = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'];

  const handleInputChange = (field: string, value: string | number) => {
    setClassData(prev => ({ ...prev, [field]: value }));
  };

  const generateMeetingDetails = () => {
    const meetingId = Math.random().toString(36).substring(2, 15);
    const passcode = Math.random().toString(36).substring(2, 8);
    
    setClassData(prev => ({
      ...prev,
      meetingId,
      passcode
    }));
  };

  const handleSave = () => {
    console.log('Saving live class:', classData);
    onSave();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Live Class Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="class-title">Class Title *</Label>
            <Input
              id="class-title"
              placeholder="e.g., Introduction to React Hooks"
              value={classData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of what will be covered..."
              value={classData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Topic *</Label>
              <div className="flex gap-2">
                <Select value={classData.topic} onValueChange={(value) => handleInputChange('topic', value)}>
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
              <Label>Instructor *</Label>
              <Select value={classData.instructor} onValueChange={(value) => handleInputChange('instructor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor} value={instructor}>
                      {instructor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={classData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={classData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="30"
                step="15"
                value={classData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-participants">Max Participants</Label>
            <Input
              id="max-participants"
              type="number"
              min="1"
              value={classData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Meeting Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <Button onClick={generateMeetingDetails} variant="outline">
              Generate Zoom Meeting
            </Button>
            <span className="text-sm text-muted-foreground">
              This will create a new Zoom meeting link
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meeting-id">Meeting ID</Label>
              <Input
                id="meeting-id"
                value={classData.meetingId}
                placeholder="Will be generated automatically"
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passcode">Passcode</Label>
              <Input
                id="passcode"
                value={classData.passcode}
                placeholder="Will be generated automatically"
                readOnly
                className="bg-muted"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onSave}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary-dark">
          Create Live Class
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

export default LiveClassCreator;
