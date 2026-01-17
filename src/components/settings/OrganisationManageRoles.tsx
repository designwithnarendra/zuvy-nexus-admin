'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Save, GraduationCap, BookOpen, Info, BookOpen as BookIcon, Users, UserCheck, FileText, Settings, List, Code, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import RoleSelector from './RoleSelector';
import PermissionLegend from './PermissionLegend';
import RolePermissionMatrix, { FeatureModule, PermissionTier } from './RolePermissionMatrix';

// Mock data for features and their children
const FEATURE_MODULES: FeatureModule[] = [
  {
    id: 'course-studio',
    name: 'Course Studio',
    icon: <GraduationCap className="h-5 w-5" />,
    permission: 1,
    children: [
      { id: 'general-details', name: 'General Details', icon: <Info className="h-4 w-4" />, permission: 1 },
      { id: 'curriculum', name: 'Curriculum', icon: <BookIcon className="h-4 w-4" />, permission: 1 },
      { id: 'students', name: 'Students', icon: <Users className="h-4 w-4" />, permission: 1 },
      { id: 'batches', name: 'Batches', icon: <UserCheck className="h-4 w-4" />, permission: 1 },
      { id: 'submissions', name: 'Submissions', icon: <FileText className="h-4 w-4" />, permission: 1 },
      { id: 'settings', name: 'Settings', icon: <Settings className="h-4 w-4" />, permission: 1 },
    ],
  },
  {
    id: 'content-bank',
    name: 'Content Bank',
    icon: <BookOpen className="h-5 w-5" />,
    permission: 2,
    children: [
      { id: 'mcqs', name: 'MCQs', icon: <List className="h-4 w-4" />, permission: 2 },
      { id: 'coding-questions', name: 'Coding Questions', icon: <Code className="h-4 w-4" />, permission: 2 },
      { id: 'open-ended', name: 'Open Ended', icon: <MessageSquare className="h-4 w-4" />, permission: 2 },
    ],
  },
];

const ROLES = [
  { id: 'ops', name: 'Ops', description: 'Operations team' },
  { id: 'instructor', name: 'Instructor', description: 'Instructors and teachers' },
];

interface RolePermissions {
  [roleId: string]: {
    [moduleId: string]: {
      parent: PermissionTier;
      children: Record<string, PermissionTier>;
    };
  };
}

const OrganisationManageRoles = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('ops');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pendingRoleId, setPendingRoleId] = useState<string | null>(null);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  // Initialize permissions state
  const [permissions, setPermissions] = useState<RolePermissions>(() => {
    const initial: RolePermissions = {};
    ROLES.forEach((role) => {
      initial[role.id] = {};
      FEATURE_MODULES.forEach((module) => {
        // Set default permissions based on role
        let defaultPermission: PermissionTier;
        if (role.id === 'ops') {
          defaultPermission = 3; // Creator for Ops
        } else if (role.id === 'instructor') {
          defaultPermission = 2; // Editor for Instructor
        } else {
          defaultPermission = module.permission as PermissionTier;
        }

        initial[role.id][module.id] = {
          parent: defaultPermission,
          children: Object.fromEntries(
            module.children.map((child) => [child.id, defaultPermission])
          ),
        };
      });
    });
    return initial;
  });

  // Build modules from current permissions
  const modules = useMemo(() => {
    const rolePermissions = permissions[selectedRoleId];
    return FEATURE_MODULES.map((module) => {
      const modulePerms = rolePermissions[module.id];
      return {
        ...module,
        permission: (modulePerms?.parent ?? module.permission) as PermissionTier,
        children: module.children.map((child) => ({
          ...child,
          permission: (modulePerms?.children[child.id] ?? child.permission) as PermissionTier,
        })),
      };
    });
  }, [permissions, selectedRoleId]);

  const handleRoleSelect = (roleId: string) => {
    if (hasUnsavedChanges) {
      setPendingRoleId(roleId);
      setShowUnsavedDialog(true);
      return;
    }
    setSelectedRoleId(roleId);
    setHasUnsavedChanges(false);
  };

  const handleDiscardChanges = () => {
    if (pendingRoleId) {
      setSelectedRoleId(pendingRoleId);
      setPendingRoleId(null);
    }
    setHasUnsavedChanges(false);
    setShowUnsavedDialog(false);
  };

  const handleKeepChanges = () => {
    setPendingRoleId(null);
    setShowUnsavedDialog(false);
  };

  const handlePermissionChange = useCallback(
    (moduleId: string, childId: string | null, tier: PermissionTier) => {
      setPermissions((prev) => {
        const updated = JSON.parse(JSON.stringify(prev));
        if (!updated[selectedRoleId][moduleId]) {
          updated[selectedRoleId][moduleId] = { parent: tier, children: {} };
        }

        if (childId === null) {
          // DOWNSTREAM CASCADE: Parent permission changed
          // Set parent and cascade to all children
          updated[selectedRoleId][moduleId].parent = tier;
          
          // Ensure children object exists
          if (!updated[selectedRoleId][moduleId].children) {
            updated[selectedRoleId][moduleId].children = {};
          }
          
          // Get the module definition to cascade to ALL children
          const moduleDefinition = FEATURE_MODULES.find((m) => m.id === moduleId);
          if (moduleDefinition) {
            moduleDefinition.children.forEach((child) => {
              updated[selectedRoleId][moduleId].children[child.id] = tier;
            });
          }
        } else {
          // Child permission changed
          if (!updated[selectedRoleId][moduleId].children) {
            updated[selectedRoleId][moduleId].children = {};
          }
          updated[selectedRoleId][moduleId].children[childId] = tier;

          // UPSTREAM INFERENCE: Update parent based on children
          const childPermissions = Object.values(
            updated[selectedRoleId][moduleId].children || {}
          ) as PermissionTier[];

          if (childPermissions.length > 0) {
            const allSame = childPermissions.every((p) => p === childPermissions[0]);
            const allNoAccess = childPermissions.every((p) => p === 0);

            if (allSame) {
              // All children match
              updated[selectedRoleId][moduleId].parent = childPermissions[0];
            } else if (allNoAccess) {
              // All are no access
              updated[selectedRoleId][moduleId].parent = 0;
            } else {
              // Mixed - default to Viewer
              updated[selectedRoleId][moduleId].parent = 1;
            }
          }
        }

        return updated;
      });

      setHasUnsavedChanges(true);
    },
    [selectedRoleId]
  );

  const handleSaveConfiguration = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success('Configuration saved successfully', {
        description: `${ROLES.find((r) => r.id === selectedRoleId)?.name} permissions have been updated.`,
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error('Failed to save configuration', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Legend in same row */}
      <div className="flex items-start justify-between gap-10">
        {/* Left side - Header and subtitle */}
        <div className="space-y-2 flex-1">
          <h2 className="text-2xl font-semibold tracking-tight">Manage Role Functions</h2>
          <p className="text-muted-foreground">
            Configure role permissions and manage system actions
          </p>
        </div>

        {/* Right side - Legend */}
        <div className="flex-1">
          <PermissionLegend />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Role Selector */}
        <div>
          <RoleSelector
            roles={ROLES}
            selectedRoleId={selectedRoleId}
            onRoleSelect={handleRoleSelect}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Permission Matrix */}
          <div className="relative">
            <RolePermissionMatrix
              modules={modules}
              onPermissionChange={handlePermissionChange}
              roleId={selectedRoleId}
              onSave={handleSaveConfiguration}
              hasUnsavedChanges={hasUnsavedChanges}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>

      {/* Unsaved Changes Dialog */}
      <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsaved Changes</DialogTitle>
            <DialogDescription>
              You have unsaved changes for <strong>{ROLES.find((r) => r.id === selectedRoleId)?.name}</strong>. Do you want to discard them and switch to <strong>{ROLES.find((r) => r.id === pendingRoleId)?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={handleKeepChanges}
            >
              Keep Changes
            </Button>
            <Button
              variant="destructive"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganisationManageRoles;
