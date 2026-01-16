'use client'

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PublishOptions {
  mode: 'schedule' | 'now' | 'draft';
  publishDateTime?: Date;
  publishTime?: string;
  startDateTime?: Date;
  startTime?: string;
  endDateTime?: Date;
  endTime?: string;
}

interface PublishOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (options: PublishOptions) => void;
}

export function PublishOptionsModal({
  isOpen,
  onClose,
  onPublish,
}: PublishOptionsModalProps) {
  const [activeTab, setActiveTab] = useState<'schedule' | 'now' | 'draft'>('schedule');
  const { toast } = useToast();

  // Schedule for Future states
  const [publishDate, setPublishDate] = useState<Date>();
  const [publishTime, setPublishTime] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>('');
  const [endDate, setEndDate] = useState<Date>();
  const [endTime, setEndTime] = useState<string>('');

  // Publish Now states
  const [endDateNow, setEndDateNow] = useState<Date>();
  const [endTimeNow, setEndTimeNow] = useState<string>('');

  // Combine date and time for comparison
  const combineDateTime = (date: Date | undefined, time: string): Date | null => {
    if (!date || !time) return null;
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  };

  // Validate Schedule for Future
  const validateSchedule = (): boolean => {
    if (!publishDate || !publishTime || !startDate || !startTime || !endDate || !endTime) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all date and time fields for scheduling.",
        variant: "destructive",
      });
      return false;
    }

    const publishDateTime = combineDateTime(publishDate, publishTime);
    const startDateTime = combineDateTime(startDate, startTime);
    const endDateTime = combineDateTime(endDate, endTime);

    if (!publishDateTime || !startDateTime || !endDateTime) {
      return false;
    }

    if (publishDateTime > startDateTime) {
      toast({
        title: "Invalid schedule",
        description: "Publish date must be before or equal to assessment start date.",
        variant: "destructive",
      });
      return false;
    }

    if (startDateTime >= endDateTime) {
      toast({
        title: "Invalid schedule",
        description: "Assessment start date must be before end date.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Handle Schedule for Future
  const handleSchedule = () => {
    if (!validateSchedule()) return;

    const options: PublishOptions = {
      mode: 'schedule',
      publishDateTime: publishDate,
      publishTime,
      startDateTime: startDate,
      startTime,
      endDateTime: endDate,
      endTime,
    };

    onPublish(options);
    toast({
      title: "Assessment scheduled",
      description: `Your assessment will be published on ${format(publishDate!, 'MMM d, yyyy')} at ${publishTime}.`,
    });
  };

  // Handle Publish Now
  const handlePublishNow = () => {
    const now = new Date();
    const options: PublishOptions = {
      mode: 'now',
      publishDateTime: now,
      publishTime: format(now, 'HH:mm'),
      startDateTime: now,
      startTime: format(now, 'HH:mm'),
      endDateTime: endDateNow,
      endTime: endTimeNow,
    };

    onPublish(options);
    toast({
      title: "Assessment published",
      description: "Your assessment is now live and students can access it.",
    });
  };

  // Handle Move to Draft
  const handleMoveToDraft = () => {
    const options: PublishOptions = {
      mode: 'draft',
    };

    onPublish(options);
    toast({
      title: "Moved to draft",
      description: "Your assessment has been moved to draft status.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Publish</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'schedule' | 'now' | 'draft')} className="flex-1 flex flex-col min-h-0">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="schedule">Schedule for Future</TabsTrigger>
            <TabsTrigger value="now">Publish Now</TabsTrigger>
            <TabsTrigger value="draft">Move To Draft</TabsTrigger>
          </TabsList>

          {/* Schedule for Future Tab */}
          <TabsContent value="schedule" className="flex-1 overflow-y-auto mt-4 space-y-6">
            {/* Publish Date and Time */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Publish Date and Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !publishDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publishDate ? format(publishDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={publishDate}
                        onSelect={setPublishDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="publish-time">Time</Label>
                  <Input
                    id="publish-time"
                    type="time"
                    value={publishTime}
                    onChange={(e) => setPublishTime(e.target.value)}
                    placeholder="--:-- --"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Assessment Start Date and Time */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Assessment Start Date and Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        disabled={(date) => publishDate ? date < publishDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="start-time">Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="--:-- --"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Assessment End Date and Time */}
            <div>
              <h3 className="font-semibold text-sm mb-3">Assessment End Date and Time</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal mt-1",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "dd/MM/yyyy") : "dd/mm/yyyy"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        disabled={(date) => startDate ? date < startDate : false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Label htmlFor="end-time">Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="--:-- --"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSchedule} className="bg-primary hover:bg-primary-dark">
                Schedule Assessment
              </Button>
            </div>
          </TabsContent>

          {/* Publish Now Tab */}
          <TabsContent value="now" className="flex-1 overflow-y-auto mt-4 space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium">Publishing immediately</p>
                  <p className="mt-1">
                    The assessment will start immediately and students will be able to access it right away.
                  </p>
                </div>
              </div>

              {/* Optional End Date and Time */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Assessment End Date and Time (Optional)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !endDateNow && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDateNow ? format(endDateNow, "dd/MM/yyyy") : "dd/mm/yyyy"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDateNow}
                          onSelect={setEndDateNow}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label htmlFor="end-time-now">Time</Label>
                    <Input
                      id="end-time-now"
                      type="time"
                      value={endTimeNow}
                      onChange={(e) => setEndTimeNow(e.target.value)}
                      placeholder="--:-- --"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handlePublishNow} className="bg-primary hover:bg-primary-dark">
                Publish Assessment
              </Button>
            </div>
          </TabsContent>

          {/* Move to Draft Tab */}
          <TabsContent value="draft" className="flex-1 overflow-y-auto mt-4 space-y-6">
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5" />
                <div className="text-sm text-gray-900">
                  <p className="font-medium">Move to draft status</p>
                  <p className="mt-1">
                    This will move the assessment back to draft status. It will not be visible to students until you publish it again.
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleMoveToDraft} variant="outline">
                Move to Draft
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
