'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser } = useUser();

  useEffect(() => {
    // Redirect based on user role
    if (currentUser?.role === 'SuperAdmin') {
      router.replace('/settings/organisations');
    } else {
      router.replace('/settings/users');
    }
  }, [router, currentUser]);

  return null;
}