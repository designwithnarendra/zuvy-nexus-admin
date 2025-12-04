'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { Users, Building2, Shield } from 'lucide-react';

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const pathname = usePathname();
  const { currentUser } = useUser();
  
  // Define all possible nav items
  const allSettingsNavItems = [
    {
      name: 'Users',
      href: '/settings/users',
      icon: Users,
      active: pathname === '/settings/users' || pathname === '/settings',
      roles: ['Admin']
    },
    {
      name: 'Organisations',
      href: '/settings/organisations',
      icon: Building2,
      active: pathname === '/settings/organisations',
      roles: ['SuperAdmin']
    },
    {
      name: 'Manage Role Functions',
      href: '/settings/manage-roles',
      icon: Shield,
      active: pathname === '/settings/manage-roles',
      roles: ['Admin', 'SuperAdmin']
    }
  ];

  // Filter nav items based on current user role
  const settingsNavItems = currentUser
    ? allSettingsNavItems.filter(item => item.roles.includes(currentUser.role))
    : allSettingsNavItems.filter(item => item.roles.includes('Admin'));

  return (
    <div className="w-full px-6 py-8">
      {/* Secondary Navigation */}
      <nav className="flex items-center space-x-1 mb-8">
        {settingsNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                item.active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  );
};

export default SettingsLayout;