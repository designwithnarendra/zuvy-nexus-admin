'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface RoleSelectorProps {
  roles: Array<{ id: string; name: string; description?: string }>;
  selectedRoleId: string;
  onRoleSelect: (roleId: string) => void;
  className?: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  roles,
  selectedRoleId,
  onRoleSelect,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-card rounded-lg border border-border overflow-hidden sticky top-6',
        className
      )}
    >
      {/* Header */}
      <div className="bg-background px-4 py-4 border-b border-border">
        <p className="text-sm font-medium text-muted-foreground font-body">
          Select Role
        </p>
      </div>

      {/* Role List */}
      <div className="divide-y divide-border">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleSelect(role.id)}
            className={cn(
              'w-full text-left px-4 py-4 transition-all duration-200 flex items-center justify-between gap-2',
              selectedRoleId === role.id
                ? 'bg-success-light border-l-4 border-l-success'
                : 'bg-white hover:bg-muted border-l-4 border-l-transparent'
            )}
          >
            <div
              className={cn(
                'text-sm font-medium truncate',
                selectedRoleId === role.id
                  ? 'text-success-dark'
                  : 'text-foreground'
              )}
            >
              {role.name}
            </div>
            {selectedRoleId === role.id && (
              <Check className="h-4 w-4 text-success flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;