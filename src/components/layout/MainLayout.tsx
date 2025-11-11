'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Layers, Database, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, isInstructor } = useUser();

  // Don't show layout on role selector page
  if (pathname === '/role-selector') {
    return <>{children}</>;
  }

  const allNavigationItems = [
    {
      name: 'Course Studio',
      href: '/courses',
      icon: Layers,
      active: pathname.startsWith('/courses'),
      roles: ['Admin', 'Instructor'] // Available to both
    },
    {
      name: 'Content Bank',
      href: '/content-bank',
      icon: Database,
      active: pathname.startsWith('/content-bank'),
      roles: ['Admin', 'Instructor'] // Available to both
    },
    {
      name: 'Roles and Permissions',
      href: '/settings',
      icon: Settings,
      active: pathname.startsWith('/settings'),
      roles: ['Admin'] // Admin only
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between w-full px-6">
          <div className="flex items-center gap-8">
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
                        ? "bg-primary text-primary-foreground shadow-2dp"
                        : "text-muted-foreground hover:text-white hover:bg-primary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="ml-auto flex items-center gap-3">
            {currentUser && (
              <Badge className="bg-info/10 text-info border-info/20 px-3 py-1 text-sm font-medium">
                {currentUser.role}
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

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
