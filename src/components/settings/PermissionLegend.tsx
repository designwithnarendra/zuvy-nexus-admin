'use client'

import React from 'react';
import { cn } from '@/lib/utils';

interface PermissionLegendItem {
  tier: number;
  label: string;
  description: string;
  colorClass: string;
  dotColorClass: string;
}

interface PermissionLegendProps {
  className?: string;
}

const LEGEND_ITEMS: PermissionLegendItem[] = [
  {
    tier: 0,
    label: 'No access',
    description: 'No visibility',
    colorClass: 'text-slate-600',
    dotColorClass: 'bg-slate-400',
  },
  {
    tier: 1,
    label: 'Viewer',
    description: 'Read Only',
    colorClass: 'text-info',
    dotColorClass: 'bg-info',
  },
  {
    tier: 2,
    label: 'Editor',
    description: 'View + Edit',
    colorClass: 'text-warning',
    dotColorClass: 'bg-warning',
  },
  {
    tier: 3,
    label: 'Creator',
    description: 'View + Edit + Create',
    colorClass: 'text-secondary-dark',
    dotColorClass: 'bg-secondary-dark',
  },
  {
    tier: 4,
    label: 'Manager',
    description: 'Full Access',
    colorClass: 'text-success',
    dotColorClass: 'bg-success',
  },
];

const PermissionLegend: React.FC<PermissionLegendProps> = ({ className }) => {
  return (
    <div className={cn('bg-card rounded-lg border border-border px-8 py-5 relative', className)}>
      <p className="text-sm font-medium text-muted-foreground font-body mb-6">
        Access Levels Definition
      </p>
      <div className="flex flex-nowrap gap-12 pt-0 pl-0">
        {LEGEND_ITEMS.map((item, index) => (
          <React.Fragment key={item.tier}>
            <div className={cn('flex items-start gap-3 flex-shrink-0', index === 0 ? 'pl-0' : (index === LEGEND_ITEMS.length - 1 ? 'px-8' : 'px-3'))}>
              <div className={cn('h-3 w-3 rounded-full flex-shrink-0 mt-1', item.dotColorClass)} />
              <div className="flex flex-col gap-0.5">
                <span className={cn('text-sm font-semibold whitespace-nowrap', item.colorClass)}>
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.description}</span>
              </div>
            </div>
            {index < LEGEND_ITEMS.length - 1 && (
              <div className="w-px h-6 bg-border flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PermissionLegend;
