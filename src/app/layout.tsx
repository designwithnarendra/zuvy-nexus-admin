import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientProviders from './providers';
import LayoutWrapper from '@/components/layout/LayoutWrapper';

export const metadata: Metadata = {
  title: 'Zuvy Nexus Admin - Educational Content Management',
  description: 'Comprehensive admin dashboard for managing courses, students, content, and assessments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  )
}