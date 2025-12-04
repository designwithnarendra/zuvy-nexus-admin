'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Organisation, ManagementType } from '@/types/index';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AddOrganisationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Organisation, 'id' | 'dateAdded'>) => void;
  initialData?: Organisation;
}

const managementTypeOptions: { value: ManagementType; title: string; description: string }[] = [
  {
    value: 'Self Managed',
    title: 'Self Managed',
    description: 'Organisations who manage all functions on the platform'
  },
  {
    value: 'Zuvy Managed',
    title: 'Zuvy Managed',
    description: 'Organisations for whom Zuvy manages all functions on the platform'
  }
];

const AddOrganisationModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData
}: AddOrganisationModalProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    managementType: (initialData?.managementType || '') as ManagementType,
    pointOfContactName: initialData?.pointOfContactName || '',
    pointOfContactEmail: initialData?.pointOfContactEmail || '',
    zuvyAssigneeName: initialData?.zuvyAssigneeName || '',
    zuvyAssigneeEmail: initialData?.zuvyAssigneeEmail || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        managementType: initialData.managementType,
        pointOfContactName: initialData.pointOfContactName,
        pointOfContactEmail: initialData.pointOfContactEmail,
        zuvyAssigneeName: initialData.zuvyAssigneeName || '',
        zuvyAssigneeEmail: initialData.zuvyAssigneeEmail || ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Organisation name is required';
    }
    if (!formData.managementType) {
      newErrors.managementType = 'Management type is required';
    }
    if (!formData.pointOfContactName.trim()) {
      newErrors.pointOfContactName = 'Point of Contact Name is required';
    }
    if (!formData.pointOfContactEmail.trim()) {
      newErrors.pointOfContactEmail = 'Point of Contact Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.pointOfContactEmail)) {
      newErrors.pointOfContactEmail = 'Please enter a valid email address';
    }

    if (formData.managementType === 'Zuvy Managed') {
      if (!formData.zuvyAssigneeName.trim()) {
        newErrors.zuvyAssigneeName = 'Zuvy Assignee Name is required';
      }
      if (!formData.zuvyAssigneeEmail.trim()) {
        newErrors.zuvyAssigneeEmail = 'Zuvy Assignee Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.zuvyAssigneeEmail)) {
        newErrors.zuvyAssigneeEmail = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const submitData: Omit<Organisation, 'id' | 'dateAdded'> = {
        name: formData.name,
        managementType: formData.managementType,
        pointOfContactName: formData.pointOfContactName,
        pointOfContactEmail: formData.pointOfContactEmail
      };

      if (formData.managementType === 'Zuvy Managed') {
        submitData.zuvyAssigneeName = formData.zuvyAssigneeName;
        submitData.zuvyAssigneeEmail = formData.zuvyAssigneeEmail;
      }

      onSubmit(submitData);
      
      // Reset form
      setFormData({
        name: '',
        managementType: '' as ManagementType,
        pointOfContactName: '',
        pointOfContactEmail: '',
        zuvyAssigneeName: '',
        zuvyAssigneeEmail: ''
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      managementType: '' as ManagementType,
      pointOfContactName: '',
      pointOfContactEmail: '',
      zuvyAssigneeName: '',
      zuvyAssigneeEmail: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Organisation' : 'Add Organisation'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Organisation Name */}
          <div className="space-y-2">
            <Label htmlFor="orgName">Organisation Name *</Label>
            <Input
              id="orgName"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Enter organisation name"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Management Type Selection */}
          <div className="space-y-3">
            <Label>Management Type *</Label>
            <div className="grid grid-cols-2 gap-4">
              {managementTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFormData({ ...formData, managementType: option.value });
                    if (errors.managementType) setErrors({ ...errors, managementType: '' });
                  }}
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all text-left",
                    formData.managementType === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <div className="font-semibold text-sm mb-1">{option.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
            {errors.managementType && (
              <p className="text-sm text-red-500">{errors.managementType}</p>
            )}
          </div>

          {/* Point of Contact Fields */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm">Point of Contact *</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pocName">Point of Contact Name *</Label>
                <Input
                  id="pocName"
                  value={formData.pointOfContactName}
                  onChange={(e) => {
                    setFormData({ ...formData, pointOfContactName: e.target.value });
                    if (errors.pointOfContactName) setErrors({ ...errors, pointOfContactName: '' });
                  }}
                  placeholder="Enter name"
                  className={errors.pointOfContactName ? 'border-red-500' : ''}
                />
                {errors.pointOfContactName && (
                  <p className="text-sm text-red-500">{errors.pointOfContactName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="pocEmail">Email Id *</Label>
                <Input
                  id="pocEmail"
                  type="email"
                  value={formData.pointOfContactEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, pointOfContactEmail: e.target.value });
                    if (errors.pointOfContactEmail) setErrors({ ...errors, pointOfContactEmail: '' });
                  }}
                  placeholder="Enter email"
                  className={errors.pointOfContactEmail ? 'border-red-500' : ''}
                />
                {errors.pointOfContactEmail && (
                  <p className="text-sm text-red-500">{errors.pointOfContactEmail}</p>
                )}
              </div>
            </div>
          </div>

          {/* Zuvy Assignee Fields - Only for Zuvy Managed */}
          {formData.managementType === 'Zuvy Managed' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm">Zuvy Assignee *</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zuvyName">Assignee Name *</Label>
                  <Input
                    id="zuvyName"
                    value={formData.zuvyAssigneeName}
                    onChange={(e) => {
                      setFormData({ ...formData, zuvyAssigneeName: e.target.value });
                      if (errors.zuvyAssigneeName) setErrors({ ...errors, zuvyAssigneeName: '' });
                    }}
                    placeholder="Enter name"
                    className={errors.zuvyAssigneeName ? 'border-red-500' : ''}
                  />
                  {errors.zuvyAssigneeName && (
                    <p className="text-sm text-red-500">{errors.zuvyAssigneeName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zuvyEmail">Email Id *</Label>
                  <Input
                    id="zuvyEmail"
                    type="email"
                    value={formData.zuvyAssigneeEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, zuvyAssigneeEmail: e.target.value });
                      if (errors.zuvyAssigneeEmail) setErrors({ ...errors, zuvyAssigneeEmail: '' });
                    }}
                    placeholder="Enter email"
                    className={errors.zuvyAssigneeEmail ? 'border-red-500' : ''}
                  />
                  {errors.zuvyAssigneeEmail && (
                    <p className="text-sm text-red-500">{errors.zuvyAssigneeEmail}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {initialData ? 'Update Organisation' : 'Add Organisation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrganisationModal;
