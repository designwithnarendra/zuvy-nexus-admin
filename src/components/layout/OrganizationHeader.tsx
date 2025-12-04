'use client'

import { useUser } from '@/contexts/UserContext';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check } from 'lucide-react';

const OrganizationHeader = () => {
  const { currentUser, currentOrganisation, organisations, switchOrganisation } = useUser();

  if (!currentUser || currentUser.role !== 'Admin' || !currentOrganisation) {
    return null;
  }

  // Get organization initials for avatar (fallback if no logo)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get a color based on organization name
  const getOrgColor = (name: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-orange-500',
      'bg-green-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-pink-500',
      'bg-yellow-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const isZuvyManaged = currentUser.adminType === 'Admin-Zuvy Managed';

  return (
    <div className="flex items-center gap-4">
      {/* Organization Logo/Avatar + Name or Dropdown */}
      {isZuvyManaged ? (
        <Select value={currentOrganisation.id} onValueChange={switchOrganisation}>
          <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0 bg-transparent hover:bg-slate-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              {currentOrganisation.logo ? (
                <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg p-0.5">
                  <Image
                    src={currentOrganisation.logo}
                    alt={currentOrganisation.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className={`${getOrgColor(currentOrganisation.name)} w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs`}>
                  {getInitials(currentOrganisation.name)}
                </div>
              )}
              <span className="text-sm font-medium">{currentOrganisation.name}</span>
            </div>
          </SelectTrigger>
          <SelectContent align="start">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Switch Organization
            </div>
            {organisations.map((org) => (
              <SelectItem key={org.id} value={org.id} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {org.logo ? (
                    <div className="w-6 h-6 flex items-center justify-center bg-white rounded p-0.5">
                      <Image
                        src={org.logo}
                        alt={org.name}
                        width={24}
                        height={24}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className={`${getOrgColor(org.name)} w-6 h-6 rounded flex items-center justify-center text-white font-semibold text-xs`}>
                      {getInitials(org.name)}
                    </div>
                  )}
                  <span className="font-medium">{org.name}</span>
                  {org.id === currentOrganisation.id && (
                    <Check className="w-4 h-4 ml-2 text-green-600" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        // For Self Managed - just show org logo and name (no dropdown)
        <div className="flex items-center gap-2">
          {currentOrganisation.logo ? (
            <div className="w-8 h-8 flex items-center justify-center bg-white rounded-lg p-0.5">
              <Image
                src={currentOrganisation.logo}
                alt={currentOrganisation.name}
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className={`${getOrgColor(currentOrganisation.name)} w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs`}>
              {getInitials(currentOrganisation.name)}
            </div>
          )}
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{currentOrganisation.name}</span>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="w-px h-6 bg-border flex-shrink-0" />

      {/* Powered by Zuvy */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/zuvy-logo-horizontal.png"
          alt="Zuvy"
          width={80}
          height={32}
          className="h-6 w-auto"
        />
      </div>
    </div>
  );
};

export default OrganizationHeader;
