import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import ClientProviders from './providers';

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
            <MainLayout>
              {children}
            </MainLayout>
          </TooltipProvider>
        </ClientProviders>
      </body>
    </html>
  )
}