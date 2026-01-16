'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Layers, Database, Settings, LogOut, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import OrganizationHeader from './OrganizationHeader';

interface MainLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const MainLayout = ({ children, hideNavigation = false }: MainLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isInstructor } = useUser();

  // Don't show layout on role selector page
  const isRoleSelector = pathname === '/role-selector' || pathname?.startsWith('/role-selector');
  if (isRoleSelector) {
    console.log('🚀 MainLayout: Detected role-selector page, returning children only. Pathname:', pathname);
    return <>{children}</>;
  }

  // Don't show layout on organisation detail pages
  const isOrgDetail = /^\/settings\/organisations\/[^/]+\/?$/.test(pathname);
  if (isOrgDetail) {
    console.log('🚀 MainLayout: Detected organisation detail page, returning children only. Pathname:', pathname);
    return <>{children}</>;
  }

  console.log('📋 MainLayout: Rendering full layout. Pathname:', pathname);

  const allNavigationItems = [
    {
      name: 'Organisations',
      href: '/settings/organisations',
      icon: Building2,
      active: pathname.startsWith('/settings/organisations'),
      roles: ['SuperAdmin']
    },
    {
      name: 'Course Studio',
      href: '/courses',
      icon: Layers,
      active: pathname.startsWith('/courses'),
      roles: ['Admin', 'Instructor']
    },
    {
      name: 'Content Bank',
      href: '/content-bank',
      icon: Database,
      active: pathname.startsWith('/content-bank'),
      roles: ['Admin', 'Instructor', 'SuperAdmin']
    },
    {
      name: 'Roles and Permissions',
      href: '/settings',
      icon: Settings,
      active: pathname.startsWith('/settings'),
      roles: ['Admin']
    }
  ];

  // Filter navigation based on current user role
  const navigationItems = currentUser
    ? allNavigationItems.filter(item => item.roles.includes(currentUser.role))
    : allNavigationItems;

  const handleLogout = () => {
    logout();
    router.push('/role-selector');
  };

  // Check if user is Admin to show organization header
  const isAdmin = currentUser?.role === 'Admin';
  const isSuperAdmin = currentUser?.role === 'SuperAdmin';
  const isOrganisationsPage = pathname === '/settings/organisations' || pathname === '/settings/organisations/';

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation - Hidden on role-selector page */}
      {pathname !== '/role-selector' && (
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between w-full px-6">
          <div className="flex items-center gap-8">
            {/* Show Organization Header for Admins, otherwise show Zuvy Logo */}
            {isAdmin ? (
              <OrganizationHeader />
            ) : isSuperAdmin && isOrganisationsPage ? (
              <div className="flex items-center">
                <Image
                  src="/zuvy-logo-horizontal.png"
                  alt="Zuvy"
                  width={104}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </div>
            ) : (
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
            )}
            
            {pathname !== '/role-selector' && (
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      item.active
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "text-muted-foreground hover:text-white hover:bg-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            )}
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            {currentUser && (
              <Badge 
                className={cn(
                  "px-3 py-1 text-sm font-medium border",
                  currentUser.role === 'SuperAdmin' 
                    ? "bg-violet-50 text-violet-700 border-violet-200"
                    : currentUser.role === 'Admin'
                    ? "bg-info/10 text-info border-info/20"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                )}
              >
                {currentUser.role === 'SuperAdmin' ? 'Super Admin' : currentUser.role}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-white hover:bg-red-500"
              title="Logout"
              aria-label="Logout"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
