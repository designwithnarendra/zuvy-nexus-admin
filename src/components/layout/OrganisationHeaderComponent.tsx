'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Building2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Organisation } from '@/types/index';

interface OrganisationHeaderProps {
  organisation: Organisation;
  allOrganisations: Organisation[];
}

const OrganisationHeaderComponent = ({ organisation, allOrganisations }: OrganisationHeaderProps) => {
  const router = useRouter();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  return (
    <div className="flex items-center justify-between w-full px-6">
      {/* Left: Organization selector */}
      <div className="flex items-center gap-2">
        <Select value={organisation.id}>
          <SelectTrigger className="border-0 shadow-none p-0 h-auto focus:ring-0 bg-transparent hover:bg-slate-50 rounded-lg px-3 py-2 w-auto">
            <div className="flex items-center gap-2">
              <div className={`${getOrgColor(organisation.name)} w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs`}>
                {getInitials(organisation.name)}
              </div>
              <span className="text-sm font-medium">{organisation.name}</span>
            </div>
          </SelectTrigger>
          <SelectContent align="start">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Switch Organization
            </div>
            {allOrganisations.map((org) => (
              <SelectItem key={org.id} value={org.id} className="cursor-pointer">
                <button
                  onClick={() => router.push(`/settings/organisations/${org.id}`)}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <div className={`${getOrgColor(org.name)} w-6 h-6 rounded flex items-center justify-center text-white font-semibold text-xs`}>
                    {getInitials(org.name)}
                  </div>
                  <span>{org.name}</span>
                </button>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Center: Zuvy Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/zuvy-logo-horizontal.png"
          alt="Zuvy"
          width={104}
          height={40}
          className="h-10 w-auto"
          priority
        />
      </Link>

      {/* Right: Spacer for alignment */}
      <div className="w-24" />
    </div>
  );
};

export default OrganisationHeaderComponent;
