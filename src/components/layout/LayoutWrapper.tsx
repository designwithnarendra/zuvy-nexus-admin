'use client'

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';

interface LayoutWrapperProps {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();
  
  // Don't wrap with MainLayout if on role-selector page
  const showMainLayout = !pathname?.includes('role-selector');

  if (!showMainLayout) {
    return <>{children}</>;
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
};

export default LayoutWrapper;
