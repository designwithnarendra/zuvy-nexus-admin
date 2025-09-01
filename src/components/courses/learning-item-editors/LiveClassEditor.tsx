'use client'

import React, { useState } from 'react';
import { BaseEditor } from './BaseEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Video, Check, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Define the live class data structure
export interface LiveClassData {
  id?: string;
  title: string;
  description: string;
  startDate: Date | undefined;
  startTime: string;
  endTime: string;
  zoomMeetingId?: string;
  zoomMeetingPassword?: string;
  zoomMeetingUrl?: string;
}

interface LiveClassEditorProps {
  initialData?: LiveClassData;
  mode: 'create' | 'edit';
  onSave: (data: LiveClassData) => void;
  onCancel: () => void;
}

const DEFAULT_LIVE_CLASS_DATA: LiveClassData = {
  title: '',
  description: '',
  startDate: undefined,
  startTime: '',
  endTime: '',
};

/**
 * LiveClassEditor
 * 
 * Editor component for creating and editing live classes.
 * Includes Zoom integration for scheduling meetings.
 */
export function LiveClassEditor({
  initialData = DEFAULT_LIVE_CLASS_DATA,
  mode,
  onSave,
  onCancel,
}: LiveClassEditorProps) {
  const [liveClassData, setLiveClassData] = useState<LiveClassData>(initialData);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [meetingCreated, setMeetingCreated] = useState(false);
  
  // Handle input changes
  const handleInputChange = (field: keyof LiveClassData, value: any) => {
    setLiveClassData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    handleInputChange('startDate', date);
  };
  
  // Create Zoom meeting (mock implementation)
  const handleCreateMeeting = () => {
    // Validate required fields
    if (!liveClassData.title || !liveClassData.startDate || !liveClassData.startTime || !liveClassData.endTime) {
      alert('Please fill in all required fields before creating a meeting.');
      return;
    }
    
    setIsCreatingMeeting(true);
    
    // Simulate API call to Zoom
    setTimeout(() => {
      // Mock response data
      const mockMeetingId = Math.floor(100000000 + Math.random() * 900000000).toString();
      const mockPassword = Math.random().toString(36).substring(2, 8).toUpperCase();
      const mockUrl = `https://zoom.us/j/${mockMeetingId}`;
      
      handleInputChange('zoomMeetingId', mockMeetingId);
      handleInputChange('zoomMeetingPassword', mockPassword);
      handleInputChange('zoomMeetingUrl', mockUrl);
      
      setIsCreatingMeeting(false);
      setMeetingCreated(true);
    }, 1500);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    onSave(liveClassData);
  };
  
  const customFooterContent = (
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button onClick={handleSubmit}>
        {mode === 'create' ? 'Add Live Class' : 'Save Changes'}
      </Button>
    </>
  );

  return (
    <BaseEditor
      type="live-class"
      mode={mode}
      onSave={handleSubmit}
      onCancel={onCancel}
      footerContent={customFooterContent}
    >
      <div className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="font-semibold">Title</Label>
          <Input
            id="title"
            value={liveClassData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter live class title"
          />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="font-semibold">Description</Label>
          <Textarea
            id="description"
            value={liveClassData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter live class description"
            className="min-h-[100px]"
          />
        </div>
        
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label htmlFor="date" className="font-semibold">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !liveClassData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {liveClassData.startDate ? (
                    format(liveClassData.startDate, "PPP")
                  ) : (
                    <span>Select a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={liveClassData.startDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Time Inputs */}
          <div className="space-y-2">
            <Label className="font-semibold">Time</Label>
            <div className="flex space-x-2 items-center">
              <Input
                type="time"
                value={liveClassData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
                className="flex-1"
              />
              <span className="text-muted-foreground">to</span>
              <Input
                type="time"
                value={liveClassData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        
        {/* Zoom Integration */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Zoom Meeting</h3>
              <p className="text-xs text-muted-foreground">
                Create a Zoom meeting for this live class
              </p>
            </div>
            <Button
              onClick={handleCreateMeeting}
              disabled={isCreatingMeeting || meetingCreated}
              variant="outline"
              size="sm"
              className="flex items-center"
            >
              {isCreatingMeeting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : meetingCreated ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Created
                </>
              ) : (
                <>
                  <Video className="h-4 w-4 mr-2" />
                  Create Meeting
                </>
              )}
            </Button>
          </div>
          
          {meetingCreated && (
            <div className="bg-muted/50 rounded-md p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-semibold">Meeting ID</Label>
                  <div className="text-sm font-medium">{liveClassData.zoomMeetingId}</div>
                </div>
                <div>
                  <Label className="text-xs font-semibold">Password</Label>
                  <div className="text-sm font-medium">{liveClassData.zoomMeetingPassword}</div>
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold">Meeting URL</Label>
                <div className="text-sm font-medium text-blue-600">
                  <a href={liveClassData.zoomMeetingUrl} target="_blank" rel="noopener noreferrer">
                    {liveClassData.zoomMeetingUrl}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BaseEditor>
  );
} 