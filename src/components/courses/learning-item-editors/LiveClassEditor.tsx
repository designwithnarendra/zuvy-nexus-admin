'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Video, Check, Loader2, Mail, Info } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useUnsavedChanges } from '../curriculum/useUnsavedChanges';
import { UnsavedChangesModal } from '../curriculum/UnsavedChangesModal';

// Define the live class data structure
export interface LiveClassData {
  id?: string;
  title: string;
  description: string;
  startDate: Date | undefined;
  startTime: string;
  duration: number; // duration in minutes
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
  duration: 90, // default 90 minutes
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
  const [meetingCreated, setMeetingCreated] = useState(!!initialData?.zoomMeetingUrl);

  const unsavedChanges = useUnsavedChanges();

  // Handle input changes
  const handleInputChange = (field: keyof LiveClassData, value: any) => {
    setLiveClassData(prev => ({ ...prev, [field]: value }));
    unsavedChanges.markAsUnsaved();
  };

  // Watch for data changes to mark as unsaved
  useEffect(() => {
    const hasChanges = JSON.stringify(liveClassData) !== JSON.stringify(initialData);
    if (hasChanges) {
      unsavedChanges.markAsUnsaved();
    }
  }, [liveClassData, initialData, unsavedChanges]);
  
  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    handleInputChange('startDate', date);
  };
  
  // Create Zoom meeting (mock implementation)
  const handleCreateMeeting = () => {
    // Validate required fields
    if (!liveClassData.title || !liveClassData.startDate || !liveClassData.startTime || !liveClassData.duration) {
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
  const handleSubmit = async () => {
    try {
      onSave(liveClassData);
      unsavedChanges.markAsSaved();
    } catch (error) {
      console.error('Error saving live class:', error);
    }
  };

  // Handle cancel with unsaved changes check
  const handleCancel = () => {
    if (unsavedChanges.hasUnsavedChanges) {
      unsavedChanges.attemptAction(onCancel);
    } else {
      onCancel();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
          {/* Title - Underlined style as per design specs */}
          <div className="space-y-3">
            <input
              type="text"
              value={liveClassData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Live Class Title"
              className="text-xl font-semibold bg-transparent border-none outline-none border-b-2 border-border focus:border-primary transition-colors w-full pb-1"
              style={{ fontSize: '1.25rem' }} // h5 size as per specs
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={liveClassData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter live class description"
              className="min-h-[100px]"
            />
          </div>

          {/* Date, Start Time, and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
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
                      format(liveClassData.startDate, "MMM d, yyyy")
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

            {/* Start Time */}
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={liveClassData.startTime}
                onChange={(e) => handleInputChange('startTime', e.target.value)}
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                max="480"
                step="15"
                value={liveClassData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                placeholder="90"
              />
            </div>
          </div>
        

          {/* Zoom Integration with Email Notification Message */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Zoom Meeting Integration
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    A Zoom class link will be generated and emailed to everyone automatically when you save this live class.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Generate Meeting Link</h3>
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
                    Generate Link
                  </>
                )}
              </Button>
            </div>

            {meetingCreated && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-green-800">
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Meeting Created Successfully</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-green-900">Meeting ID</Label>
                    <div className="text-sm font-mono text-green-800 mt-1">{liveClassData.zoomMeetingId}</div>
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-green-900">Password</Label>
                    <div className="text-sm font-mono text-green-800 mt-1">{liveClassData.zoomMeetingPassword}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-green-900">Meeting URL</Label>
                  <div className="text-sm text-blue-600 mt-1">
                    <a href={liveClassData.zoomMeetingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {liveClassData.zoomMeetingUrl}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Footer with CTA buttons */}
      <div className="flex justify-between items-center p-6 border-t bg-background sticky bottom-0">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {mode === 'create' ? 'Add Live Class' : 'Edit Live Class'}
        </Button>
      </div>

      {/* Unsaved Changes Modal */}
      <UnsavedChangesModal
        isOpen={unsavedChanges.showWarningModal}
        onClose={unsavedChanges.closeModal}
        onDiscard={unsavedChanges.discardChanges}
        onSave={() => unsavedChanges.saveAndContinue(handleSubmit)}
      />
    </div>
  );
} 