'use client'

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import type { AssessmentData } from '../learning-item-editors/AssessmentEditor';

interface AssessmentSettings {
  description?: string;
  questionDistribution: {
    coding: { easy: number; medium: number; hard: number };
    mcq: { easy: number; medium: number; hard: number };
    openEnded: { easy: number; medium: number; hard: number };
  };
  sectionWeightage: {
    coding: number;
    mcq: number;
  };
  timeHours: number;
  timeMinutes: number;
  passPercentage: number;
  copyPasteEnabled: boolean;
  tabChangeEnabled: boolean;
}

interface AssessmentSettingsProps {
  assessmentData: AssessmentData;
  onSave: (settings: AssessmentSettings) => void;
  onOpenPublishModal: () => void;
  onBack: () => void;
}

export function AssessmentSettings({
  assessmentData,
  onSave,
  onOpenPublishModal,
  onBack,
}: AssessmentSettingsProps) {
  // Calculate question counts by type and difficulty
  const calculateQuestionCounts = () => {
    const counts = {
      coding: { easy: 0, medium: 0, hard: 0, total: 0 },
      mcq: { easy: 0, medium: 0, hard: 0, total: 0 },
      openEnded: { easy: 0, medium: 0, hard: 0, total: 0 },
    };

    assessmentData.selectedQuestions.forEach(q => {
      const type = q.type === 'open-ended' ? 'openEnded' : q.type;
      const difficulty = q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';
      counts[type][difficulty]++;
      counts[type].total++;
    });

    return counts;
  };

  const questionCounts = calculateQuestionCounts();

  const [settings, setSettings] = useState<AssessmentSettings>({
    description: '',
    questionDistribution: {
      coding: { easy: 0, medium: 0, hard: 0 },
      mcq: { easy: 0, medium: 0, hard: 0 },
      openEnded: { easy: 0, medium: 0, hard: 0 },
    },
    sectionWeightage: {
      coding: 50,
      mcq: 50,
    },
    timeHours: 2,
    timeMinutes: 0,
    passPercentage: 70,
    copyPasteEnabled: true,
    tabChangeEnabled: true,
  });

  // Auto-adjust weightage to ensure 100% total
  const handleWeightageChange = (field: 'coding' | 'mcq', value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    const otherField = field === 'coding' ? 'mcq' : 'coding';
    const otherValue = 100 - newValue;

    setSettings(prev => ({
      ...prev,
      sectionWeightage: {
        ...prev.sectionWeightage,
        [field]: newValue,
        [otherField]: otherValue,
      },
    }));
  };

  const handleChange = (field: keyof AssessmentSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleDistributionChange = (
    type: 'coding' | 'mcq' | 'openEnded',
    difficulty: 'easy' | 'medium' | 'hard',
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    const maxAvailable = questionCounts[type][difficulty];
    const clampedValue = Math.max(0, Math.min(maxAvailable, numValue));

    setSettings(prev => ({
      ...prev,
      questionDistribution: {
        ...prev.questionDistribution,
        [type]: {
          ...prev.questionDistribution[type],
          [difficulty]: clampedValue,
        },
      },
    }));
  };

  // Calculate total weightage
  const totalWeightage = settings.sectionWeightage.coding + settings.sectionWeightage.mcq;
  const isWeightageValid = totalWeightage === 100;

  // Calculate total selected questions per type
  const getTotalSelectedByType = (type: 'coding' | 'mcq' | 'openEnded') => {
    const dist = settings.questionDistribution[type];
    return dist.easy + dist.medium + dist.hard;
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header with title and Publish Options button */}
      <div className="border-b p-6 flex items-center justify-between bg-white">
        <div>
          <h2 className="text-2xl font-heading font-semibold">Manage Settings</h2>
          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded mt-1">
            Draft
          </span>
        </div>
        <Button
          onClick={onOpenPublishModal}
          className="bg-primary hover:bg-primary-dark"
        >
          Publish Options
        </Button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description:</Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter description (optional)"
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>

          {/* Question Distribution */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base mb-1">Choose number of questions shown to students</h3>
              <p className="text-sm text-muted-foreground">
                Students will receive at least 1 question from each difficulty level of each question type.
                Additionally, the questions will be randomized for each question type.
              </p>
            </div>

            {/* Coding Problems */}
            <div className="space-y-3">
              <h4 className="font-medium">Coding Problems</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="coding-easy">Easy question(s) out of {questionCounts.coding.easy}</Label>
                  <Input
                    id="coding-easy"
                    type="number"
                    min="0"
                    max={questionCounts.coding.easy}
                    value={settings.questionDistribution.coding.easy}
                    onChange={(e) => handleDistributionChange('coding', 'easy', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="coding-medium">Medium question(s) out of {questionCounts.coding.medium}</Label>
                  <Input
                    id="coding-medium"
                    type="number"
                    min="0"
                    max={questionCounts.coding.medium}
                    value={settings.questionDistribution.coding.medium}
                    onChange={(e) => handleDistributionChange('coding', 'medium', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="coding-hard">Hard question(s) out of {questionCounts.coding.hard}</Label>
                  <Input
                    id="coding-hard"
                    type="number"
                    min="0"
                    max={questionCounts.coding.hard}
                    value={settings.questionDistribution.coding.hard}
                    onChange={(e) => handleDistributionChange('coding', 'hard', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* MCQs */}
            <div className="space-y-3">
              <h4 className="font-medium">MCQs</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="mcq-easy">Easy question(s) out of {questionCounts.mcq.easy}</Label>
                  <Input
                    id="mcq-easy"
                    type="number"
                    min="0"
                    max={questionCounts.mcq.easy}
                    value={settings.questionDistribution.mcq.easy}
                    onChange={(e) => handleDistributionChange('mcq', 'easy', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mcq-medium">Medium question(s) out of {questionCounts.mcq.medium}</Label>
                  <Input
                    id="mcq-medium"
                    type="number"
                    min="0"
                    max={questionCounts.mcq.medium}
                    value={settings.questionDistribution.mcq.medium}
                    onChange={(e) => handleDistributionChange('mcq', 'medium', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="mcq-hard">Hard question(s) out of {questionCounts.mcq.hard}</Label>
                  <Input
                    id="mcq-hard"
                    type="number"
                    min="0"
                    max={questionCounts.mcq.hard}
                    value={settings.questionDistribution.mcq.hard}
                    onChange={(e) => handleDistributionChange('mcq', 'hard', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Total Selected Questions Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">Total Selected Questions</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Coding:</span> {getTotalSelectedByType('coding')} out of {questionCounts.coding.total}</p>
                <p><span className="font-medium">Quiz:</span> {getTotalSelectedByType('mcq')} out of {questionCounts.mcq.total}</p>
              </div>
            </div>
          </div>

          {/* Individual Section Weightage */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-base mb-1">Individual Section Weightage</h3>
              <p className="text-sm text-muted-foreground">
                Total from both categories should be 100%
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="coding-weightage">Coding Problems</Label>
                <Input
                  id="coding-weightage"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.sectionWeightage.coding}
                  onChange={(e) => handleWeightageChange('coding', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="mcq-weightage">MCQs</Label>
                <Input
                  id="mcq-weightage"
                  type="number"
                  min="0"
                  max="100"
                  value={settings.sectionWeightage.mcq}
                  onChange={(e) => handleWeightageChange('mcq', parseInt(e.target.value) || 0)}
                  className="mt-1"
                />
              </div>
            </div>

            {!isWeightageValid && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Total weightage must equal 100% (currently {totalWeightage}%)</span>
              </div>
            )}
          </div>

          {/* Time Limit */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Time limit</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  value={settings.timeHours.toString()}
                  onValueChange={(value) => handleChange('timeHours', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(11)].map((_, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {i} Hour{i !== 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={settings.timeMinutes.toString()}
                  onValueChange={(value) => handleChange('timeMinutes', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 15, 30, 45].map((min) => (
                      <SelectItem key={min} value={min.toString()}>
                        {min} Min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pass Percentage */}
          <div className="space-y-2">
            <h3 className="font-semibold text-base">Pass Percentage (Out Of 100)</h3>
            <div className="w-48">
              <div className="relative">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.passPercentage}
                  onChange={(e) => handleChange('passPercentage', Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>
          </div>

          {/* Manage Proctoring Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Manage Proctoring Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="copy-paste">Copy Paste</Label>
                  <button className="text-muted-foreground hover:text-foreground">
                    <AlertCircle className="h-4 w-4" />
                  </button>
                </div>
                <Switch
                  id="copy-paste"
                  checked={settings.copyPasteEnabled}
                  onCheckedChange={(checked) => handleChange('copyPasteEnabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label htmlFor="tab-change">Tab Change</Label>
                  <button className="text-muted-foreground hover:text-foreground">
                    <AlertCircle className="h-4 w-4" />
                  </button>
                </div>
                <Switch
                  id="tab-change"
                  checked={settings.tabChangeEnabled}
                  onCheckedChange={(checked) => handleChange('tabChangeEnabled', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Back button */}
      <div className="border-t p-4 flex items-center justify-between bg-white">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <div className="text-sm text-muted-foreground">
          Settings will be saved when you publish the assessment
        </div>
      </div>
    </div>
  );
}
