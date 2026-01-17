'use client'

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  contentTitle: string;
  contentType: string;
  isLiveClass?: boolean;
  deleteFromSystem?: boolean;
  onDeleteFromSystemChange?: (value: boolean) => void;
}

export function DeleteContentModal({
  isOpen,
  onClose,
  onConfirm,
  contentTitle,
  contentType,
  isLiveClass = false,
  deleteFromSystem = false,
  onDeleteFromSystemChange,
}: DeleteContentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-lg font-semibold">
              Delete {contentType}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete &quot;{contentTitle}&quot;? This action cannot be undone.
          </DialogDescription>

          {/* Live Class System Deletion Checkbox */}
          {isLiveClass && onDeleteFromSystemChange && (
            <div className="mt-4 pt-4 border-t">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deleteFromSystem}
                  onChange={(e) => onDeleteFromSystemChange(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <div>
                  <span className="text-sm font-medium text-foreground block">
                    Delete live class from system
                  </span>
                  <span className="text-xs text-muted-foreground">
                    It will not be available anymore
                  </span>
                </div>
              </label>
            </div>
          )}
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-initial"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 sm:flex-initial"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
