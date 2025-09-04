'use client'

import { useState } from 'react';
import { Role, Action, RoleActionPermission } from '@/types/index';
import { mockRoles, mockActions, mockRoleActionPermissions } from '@/types/mock-rbac-data';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Users } from 'lucide-react';

const ManageRolesPage = () => {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [permissions, setPermissions] = useState<RoleActionPermission[]>(mockRoleActionPermissions);


  const handlePermissionChange = (roleId: string, actionId: string, allowed: boolean) => {
    setPermissions(prev => {
      const existingIndex = prev.findIndex(p => p.roleId === roleId && p.actionId === actionId);
      
      if (existingIndex >= 0) {
        // Update existing permission
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], allowed };
        return updated;
      } else {
        // Add new permission
        return [...prev, {
          roleId,
          actionId,
          allowed,
          scopeType: 'full'
        }];
      }
    });
  };

  const [selectedRoleId, setSelectedRoleId] = useState<string>(roles[0]?.id || '');
  const [selectedActionId, setSelectedActionId] = useState<string>('');

  const selectedRole = roles.find(r => r.id === selectedRoleId);
  const selectedAction = actions.find(a => a.id === selectedActionId);
  const roleActions = actions.filter(action => 
    permissions.some(p => p.roleId === selectedRoleId && p.actionId === action.id && p.allowed)
  );

  // Mock permissions for selected action
  const actionPermissions = selectedAction ? [
    { id: '1', name: 'Create', description: 'Create new items', enabled: true },
    { id: '2', name: 'Read', description: 'View and read items', enabled: true },
    { id: '3', name: 'Update', description: 'Edit existing items', enabled: false },
    { id: '4', name: 'Delete', description: 'Remove items permanently', enabled: false },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Manage Role Functions</h2>
          <p className="text-muted-foreground">
            Configure role permissions and manage system actions
          </p>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="border-b">
        <div className="flex space-x-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRoleId(role.id);
                setSelectedActionId('');
              }}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedRoleId === role.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: role.color || '#6366f1' }}
                />
                <span>{role.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Two Panel Layout */}
      <div className="grid grid-cols-4 gap-6 min-h-[500px]">
        {/* Left Sidebar - Actions (25%) */}
        <div className="col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Actions for {selectedRole?.name}</h3>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
          
          <div className="space-y-2">
            {roleActions.map((action) => (
              <button
                key={action.id}
                onClick={() => setSelectedActionId(action.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedActionId === action.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'hover:bg-muted border-border'
                }`}
              >
                <div className="font-medium">{action.name}</div>
                <div className="text-xs opacity-75 mt-1">{action.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Permissions (75%) */}
        <div className="col-span-3">
          {selectedAction ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Permissions for {selectedAction.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAction.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Action
                  </Button>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Permission
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actionPermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                    <Checkbox
                      checked={permission.enabled}
                      onCheckedChange={(checked) => console.log(`Permission ${permission.name}:`, checked)}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{permission.name}</div>
                      <div className="text-sm text-muted-foreground">{permission.description}</div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Select an Action</p>
                <p className="text-sm">Choose an action from the sidebar to view and manage its permissions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRolesPage;