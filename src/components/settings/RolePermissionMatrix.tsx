'use client'

import React, { useState, useMemo } from 'react';
import { ChevronDown, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Permission tier definition
export type PermissionTier = 0 | 1 | 2 | 3 | 4;

export interface PermissionLevel {
  tier: PermissionTier;
  label: string;
  description: string;
  colorClass: string;
  textColorClass: string;
  borderColorClass: string;
  backgroundColor: string;
}

export interface FeatureChild {
  id: string;
  name: string;
  icon?: React.ReactNode;
  permission: PermissionTier;
}

export interface FeatureModule {
  id: string;
  name: string;
  icon?: React.ReactNode;
  children: FeatureChild[];
  permission: PermissionTier;
  isExpanded?: boolean;
}

interface RolePermissionMatrixProps {
  modules: FeatureModule[];
  onPermissionChange: (moduleId: string, childId: string | null, tier: PermissionTier) => void;
  roleId: string;
  onSave?: () => void;
  hasUnsavedChanges?: boolean;
  isSaving?: boolean;
}

// Permission tier configuration following Zuvy design system
const PERMISSION_TIERS: Record<PermissionTier, PermissionLevel> = {
  0: {
    tier: 0,
    label: 'NO ACCESS',
    description: 'No visibility',
    colorClass: 'text-slate-700',
    textColorClass: 'text-slate-700',
    borderColorClass: 'border-slate-400',
    backgroundColor: 'bg-slate-100',
  },
  1: {
    tier: 1,
    label: 'VIEWER',
    description: 'Read Only',
    colorClass: 'text-info',
    textColorClass: 'text-info',
    borderColorClass: 'border-info',
    backgroundColor: 'bg-info-light',
  },
  2: {
    tier: 2,
    label: 'EDITOR',
    description: 'View + Edit',
    colorClass: 'text-warning',
    textColorClass: 'text-warning',
    borderColorClass: 'border-warning',
    backgroundColor: 'bg-warning-light',
  },
  3: {
    tier: 3,
    label: 'CREATOR',
    description: 'View + Edit + Create',
    colorClass: 'text-secondary-dark',
    textColorClass: 'text-secondary-dark',
    borderColorClass: 'border-secondary-dark',
    backgroundColor: 'bg-secondary-light',
  },
  4: {
    tier: 4,
    label: 'MANAGER',
    description: 'Full Access',
    colorClass: 'text-success',
    textColorClass: 'text-success',
    borderColorClass: 'border-success',
    backgroundColor: 'bg-success-light',
  },
};

const RolePermissionMatrix: React.FC<RolePermissionMatrixProps> = ({
  modules,
  onPermissionChange,
  roleId,
  onSave,
  hasUnsavedChanges = false,
  isSaving = false,
}) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set() // Start with all modules collapsed
  );
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  // Detect mixed state and disabled state for parents
  const getParentState = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return { isMixed: false, isDisabled: false, parentPermission: 0, isInferred: false };

    const childPermissions = module.children.map((c) => c.permission);
    const allSame = childPermissions.every((p) => p === childPermissions[0]);
    const allNoAccess = childPermissions.every((p) => p === 0);
    const isMixed = !allSame && !allNoAccess;
    
    // Parent is inferred (case 2) if it's Viewer (1) and children are mixed
    const isInferred = module.permission === 1 && isMixed;

    return {
      isMixed,
      isDisabled: module.permission === 0,
      parentPermission: module.permission as PermissionTier,
      isInferred,
    };
  };

  const renderPermissionButtons = (
    moduleId: string,
    childId: string | null,
    isChild: boolean,
    isDisabled: boolean
  ) => {
    const item = childId
      ? modules.find((m) => m.id === moduleId)?.children.find((c) => c.id === childId)
      : modules.find((m) => m.id === moduleId);

    const currentPermission = item?.permission || 0;
    const isParent = !isChild;
    const parentState = isParent ? getParentState(moduleId) : { isInferred: false };

    return (
      <div className="flex gap-8 flex-shrink-0" style={{ width: '620px' }}>
        {Object.values(PERMISSION_TIERS)
          .sort((a, b) => a.tier - b.tier)
          .map((tier) => {
          const isActive = currentPermission === tier.tier;
          const buttonId = `${moduleId}-${childId || 'parent'}-tier-${tier.tier}`;
          const isButtonHovered = hoveredButtonId === buttonId;
          const showLabel = isParent ? true : isActive || hoveredRowId === `${moduleId}-${childId || 'parent'}` || isDisabled;
          
          // Check if this is an inferred viewer button for parent (case 2)
          const isInferredViewerButton = isParent && isActive && tier.tier === 1 && parentState.isInferred;

          return (
            <button
              key={buttonId}
              onClick={() => {
                if (!isDisabled) {
                  onPermissionChange(moduleId, childId, tier.tier);
                }
              }}
              disabled={isDisabled}
              onMouseEnter={() => setHoveredButtonId(buttonId)}
              onMouseLeave={() => setHoveredButtonId(null)}
              className={cn(
                'transition-all duration-200 rounded-md',
                'h-10 flex items-center justify-center flex-1',
                'text-xs font-semibold uppercase',
                'min-w-0',
                isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
                isActive
                  ? isInferredViewerButton
                    ? cn(
                        'border-2 border-dotted',
                        'border-orange-500',
                        'bg-orange-50',
                        'text-orange-600'
                      )
                    : cn(
                        'border-2',
                        tier.borderColorClass,
                        tier.backgroundColor,
                        tier.textColorClass
                      )
                  : cn(
                      isParent ? 'bg-muted-light' : 'bg-white',
                      tier.textColorClass,
                      isButtonHovered && !isDisabled && (isChild ? 'bg-muted-light' : 'bg-white')
                    )
              )}
              title={`${tier.label} - ${tier.description}`}
            >
              {showLabel ? (
                <span className="truncate px-2">{tier.label}</span>
              ) : (
                <span className="text-muted-foreground text-lg">•</span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const renderPermissionCell = (
    moduleId: string,
    childId: string | null,
    isChild: boolean = false
  ) => {
    const item = childId
      ? modules.find((m) => m.id === moduleId)?.children.find((c) => c.id === childId)
      : modules.find((m) => m.id === moduleId);

    const parentState = getParentState(moduleId);
    const isDisabled = isChild && parentState.isDisabled;

    return (
      <div
        key={`${moduleId}-${childId || 'parent'}`}
        className={cn(
          'flex gap-2 items-center justify-between px-6 py-3 border-b border-border last:border-b-0',
          isChild ? 'bg-white' : 'bg-muted-light',
          isDisabled && 'opacity-50'
        )}
        onMouseEnter={() => setHoveredRowId(`${moduleId}-${childId || 'parent'}`)}
        onMouseLeave={() => setHoveredRowId(null)}
      >
        {/* Feature/Child Name and Ghost State Message */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {!isChild && (
            <button
              onClick={() => toggleModuleExpansion(moduleId)}
              className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown
                className={cn(
                  'h-5 w-5 transition-transform',
                  !expandedModules.has(moduleId) && '-rotate-90'
                )}
              />
            </button>
          )}
          {isChild && <div className="w-5 flex-shrink-0" />}
          {item?.icon && <div className="flex-shrink-0 text-muted-foreground">{item.icon}</div>}

          <span
            className={cn(
              isChild ? 'font-normal' : 'font-medium',
              isChild ? 'text-sm text-foreground' : 'text-base font-semibold text-foreground',
              isDisabled && 'text-muted-foreground',
              'truncate'
            )}
          >
            {item?.name}
          </span>
        </div>

        {/* Permission Buttons */}
        {!isDisabled && renderPermissionButtons(moduleId, childId, isChild, isDisabled)}
        {isDisabled && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
            Enable Parent Access to configure
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header Row */}
      <div className="bg-background px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground font-body">
            Feature Module
          </p>
          <p className="text-sm font-medium text-muted-foreground font-body">
            Permission Tier
          </p>
        </div>
      </div>

      {/* Matrix Content */}
      <div className="divide-y divide-border">
        {modules.map((module) => {
          const parentState = getParentState(module.id);

          return (
            <React.Fragment key={module.id}>
              {/* Parent Row */}
              {renderPermissionCell(module.id, null, false)}

              {/* Child Rows */}
              {expandedModules.has(module.id) &&
                module.children.map((child) => (
                  <div
                    key={`${module.id}-${child.id}`}
                    className="bg-muted-light"
                  >
                    {renderPermissionCell(module.id, child.id, true)}
                  </div>
                ))}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer Row */}
      <div className="bg-background px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span>Permissions cascade down</span>
          </div>
          {onSave && (
            <Button
              onClick={onSave}
              disabled={!hasUnsavedChanges || isSaving}
              size="lg"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Configuration'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePermissionMatrix;
