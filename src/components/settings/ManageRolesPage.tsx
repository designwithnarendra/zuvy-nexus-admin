'use client'

import { useState } from 'react';
import { Role, Action, RoleActionPermission } from '@/types/index';
import { mockRoles, mockActions, mockRoleActionPermissions } from '@/types/mock-rbac-data';
import { toast } from 'sonner';
import PermissionsMatrix from './PermissionsMatrix';

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Manage Role Functions</h2>
          <p className="text-muted-foreground">
            Configure role permissions and manage system actions
          </p>
        </div>
      </div>

      {/* Role Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: role.color || '#6366f1' }}
              />
              <h3 className="font-semibold text-sm">{role.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{role.description}</p>
            {!role.isSystem && (
              <div className="mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Custom Role
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div>
        <PermissionsMatrix
          roles={roles}
          actions={actions}
          permissions={permissions}
          onPermissionChange={handlePermissionChange}
        />
      </div>
    </div>
  );
};

export default ManageRolesPage;