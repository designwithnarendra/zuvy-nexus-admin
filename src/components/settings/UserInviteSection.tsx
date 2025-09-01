'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/index';
import { Users, GraduationCap, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface UserInviteSectionProps {
  onInviteGenerated: (role: UserRole, inviteLink: string) => void;
}

const UserInviteSection = ({ onInviteGenerated }: UserInviteSectionProps) => {
  const [isGeneratingOps, setIsGeneratingOps] = useState(false);
  const [isGeneratingInstructor, setIsGeneratingInstructor] = useState(false);

  const generateInviteLink = async (role: UserRole) => {
    const isOps = role === 'Ops';
    const setLoading = isOps ? setIsGeneratingOps : setIsGeneratingInstructor;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock invite link
    const token = `${role.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const inviteLink = `${window.location.origin}/invite/${token}`;
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast.success(`${role} invite link generated and copied to clipboard!`, {
        description: `The invite link for ${role} role has been created and is ready to share.`,
        duration: 4000,
      });
    } catch (err) {
      toast.success(`${role} invite link generated!`, {
        description: inviteLink,
        duration: 6000,
      });
    }
    
    onInviteGenerated(role, inviteLink);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Invite Users Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-start justify-between gap-12">
          <div className="space-y-2 flex-1">
            <h2 className="text-xl font-semibold tracking-tight">Invite Users via Link</h2>
            <p className="text-muted-foreground">
              Generated invite links will be automatically copied to your clipboard. Share them with the intended users who will be automatically assigned the selected role upon signup.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button
              onClick={() => generateInviteLink('Ops')}
              disabled={isGeneratingOps}
              className="flex items-center space-x-2 h-12 px-8"
            >
              <Users className="h-4 w-4" />
              <span>{isGeneratingOps ? 'Generating...' : 'Invite Ops'}</span>
            </Button>
            
            <Button
              variant="secondary"
              onClick={() => generateInviteLink('Instructor')}
              disabled={isGeneratingInstructor}
              className="flex items-center space-x-2 h-12 px-8"
            >
              <GraduationCap className="h-4 w-4" />
              <span>{isGeneratingInstructor ? 'Generating...' : 'Invite Instructors'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInviteSection;