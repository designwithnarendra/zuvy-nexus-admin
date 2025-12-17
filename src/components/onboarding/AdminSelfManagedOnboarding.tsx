'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { Cloud, Mail, Shield, Check, LogOut } from 'lucide-react'
import { toast } from 'sonner'

interface AdminSelfManagedOnboardingProps {
  onComplete: () => void
  adminName: string
  onLogout?: () => void
}

const AdminSelfManagedOnboarding = ({ onComplete, adminName, onLogout }: AdminSelfManagedOnboardingProps) => {
  const router = useRouter()
  const [stage, setStage] = useState<'invitation' | 'setup'>('invitation')
  const [email] = useState('jane.doe@amazon.com')
  const [orgName, setOrgName] = useState('Amazon Future Engineer')
  const [displayName, setDisplayName] = useState('Jane Doe')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  console.log('🎯 AdminSelfManagedOnboarding: Rendered, stage:', stage);

  const handleContinueFromInvitation = () => {
    setStage('setup')
  }

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    router.push('/role-selector')
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCompleteSetup = () => {
    if (!orgName.trim()) {
      toast.error('Organization name is required')
      return
    }
    if (!displayName.trim()) {
      toast.error('Display name is required')
      return
    }
    toast.success('Workspace setup completed!')
    onComplete()
  }

  // Stage 1: Invitation Card Screen
  if (stage === 'invitation') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-6">
            <Image
              src="/zuvy-logo-horizontal.png"
              alt="Zuvy"
              width={104}
              height={40}
              className="h-10 w-auto"
              priority
            />
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
        </header>
        
        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            {/* Card Content */}
            <div className="p-12 space-y-8">
              {/* Logo */}
              <div className="flex justify-center">
                <Image
                  src="/zuvy-logo-horizontal.png"
                  alt="Zuvy"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>

              {/* Heading */}
              <div className="text-center space-y-3">
                <h1 className="text-h4 font-heading font-bold text-foreground">
                  Welcome to Zuvy
                </h1>
              </div>

              {/* Google Button */}
              <Button
                onClick={handleContinueFromInvitation}
                className="w-full py-3 text-body1 bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-center gap-2"
                size="lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </Button>

              {/* Legal Text */}
              <p className="text-center text-xs text-muted-foreground leading-relaxed">
                By continuing, you acknowledge that you have read and understood, and agree to Zuvy's{' '}
                <a href="#" className="text-slate-600 underline hover:text-slate-700">
                  Terms
                </a>
                {' '}and{' '}
                <a href="#" className="text-slate-600 underline hover:text-slate-700">
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {/* Bottom Border */}
            <div className="h-1 bg-gradient-to-r from-emerald-400 to-emerald-500"></div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  // Stage 2: Workspace Setup/Onboarding Screen
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur flex-shrink-0">
        <div className="flex h-16 items-center justify-between px-6">
          <Image
            src="/zuvy-logo-horizontal.png"
            alt="Zuvy"
            width={104}
            height={40}
            className="h-10 w-auto"
            priority
          />
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
      </header>

      {/* Content */}
      <div className="flex-1 flex">
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 w-full">
          {/* Left Side - Dark Branding Section (33%) */}
          <div className="hidden lg:flex bg-[#1A1A1A] text-white flex-col justify-between p-12">
          <div className="space-y-8">
            {/* Main Message */}
            <div className="space-y-3">
              <h1 className="text-h3 font-heading font-semibold leading-tight">
                You've been invited to set up the workspace for <span className="font-bold text-emerald-500">Amazon Future Engineer</span> on <span className="font-bold text-emerald-500">Zuvy</span>
              </h1>
              <p className="text-body1 text-slate-300">
                Manage your student's learning journey.
              </p>
            </div>
          </div>

          {/* Bottom Breadcrumb */}
          <div className="flex items-center gap-2">
          </div>
        </div>

        {/* Right Side - Form Section (67%) */}
        <div className="flex flex-col bg-background lg:col-span-2 h-screen overflow-hidden">
          {/* Form Content - Constrained Height */}
          <div className="flex-1 overflow-hidden flex flex-col py-8 justify-center px-6 lg:px-0">
            <div className="flex flex-col items-center w-full">
              <div className="space-y-8 flex flex-col w-full max-w-2xl">
              {/* Organization Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-h4 font-heading font-bold text-foreground">Organization branding</h2>
                </div>

                {/* Organization Name */}
                <div className="space-y-3">
                  <Label htmlFor="orgName" className="text-body1 font-semibold text-foreground">Organization Name</Label>
                  <Input
                    id="orgName"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="Enter your organization name"
                    className="h-10 text-sm"
                  />
                  <p className="text-xs text-muted-foreground">This is how your organization will appear in the platform</p>
                </div>

                {/* Logo Upload - Large standalone section */}
                <div className="space-y-3">
                  <Label className="text-body1 font-semibold text-foreground">Organization Logo</Label>
                  <div
                    onClick={() => !logoPreview && fileInputRef.current?.click()}
                    className={`w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-colors cursor-pointer gap-3 ${
                      logoPreview
                        ? 'border-border bg-background'
                        : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-contain rounded-lg p-4"
                      />
                    ) : (
                      <>
                        <Cloud className="h-12 w-12 text-slate-400" />
                        <div className="text-center">
                          <p className="font-semibold text-slate-700">Upload your organization logo</p>
                          <p className="text-sm text-slate-500">or drag and drop (SVG, PNG, JPG up to 5MB)</p>
                        </div>
                      </>
                    )}
                  </div>
                  {logoPreview && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                        className="flex-1"
                      >
                        Change Logo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveLogo}
                        className="text-destructive flex-1"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Profile Section */}
              <div className="space-y-5 border-t border-border pt-8">
                <div className="flex items-center gap-2">
                  <h2 className="text-h4 font-heading font-bold text-foreground">Your profile</h2>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Display Name */}
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-body2 font-semibold text-foreground">
                      Name
                    </Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your name"
                      className="h-10 text-sm"
                    />
                  </div>

                  {/* Two Column Layout for Email and Role */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Email (Non-editable) */}
                    <div className="space-y-2">
                      <Label className="text-body2 font-semibold text-foreground">Email</Label>
                      <div className="px-3 py-2.5 bg-[#E8E7DC] text-body1 text-slate-600 rounded-lg border border-[#E8E7DC] h-10 flex items-center text-sm">
                        {email}
                      </div>
                    </div>

                    {/* Role (Non-editable) */}
                    <div className="space-y-2">
                      <Label className="text-body2 font-semibold text-foreground">Role</Label>
                      <div className="px-3 py-2.5 bg-[#E8E7DC] text-body1 text-slate-600 rounded-lg border border-[#E8E7DC] h-10 flex items-center text-sm">
                        Org Admin
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 flex-shrink-0 flex flex-col items-start gap-3">
                <Button
                  onClick={handleCompleteSetup}
                  className="px-8"
                >
                  Complete Profile and Proceed
                </Button>
                <p className="text-body2 text-muted-foreground">
                  Need help?{' '}
                  <a href="#" className="text-foreground hover:underline font-semibold">
                    Contact Support
                  </a>
                </p>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile - Left Side Content */}
        <div className="lg:hidden bg-[#1A1A1A] text-white p-8 order-first space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-body2 text-emerald-400">Admin Access Granted</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-h4 font-heading font-bold leading-tight">
              Manage your student's learning journey.
            </h1>
            <p className="text-body1 text-slate-300">
              You've been invited to set up the workspace for <span className="font-semibold">Amazon Future Engineer</span>. Let's get your branding and profile ready for launch.
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSelfManagedOnboarding

