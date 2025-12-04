'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Cloud, Lock, Image as ImageIcon, Users, BookOpen, CheckCircle, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import { useRef } from 'react'

interface AdminOnboardingProps {
  onComplete: () => void
  adminName: string
}

type OnboardingStep = 'password' | 'logo' | 'invite' | 'course'

const AdminOnboarding = ({ onComplete, adminName }: AdminOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('password')
  const [completedSteps, setCompletedSteps] = useState<OnboardingStep[]>([])
  const [maxProgressStep, setMaxProgressStep] = useState<OnboardingStep>('password')
  
  // Step 1: Password
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Step 2: Logo
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Step 3: Invite Team
  const [invites, setInvites] = useState<Array<{ email: string; role: string }>>([])
  const [currentInviteEmail, setCurrentInviteEmail] = useState('')
  const [currentInviteRole, setCurrentInviteRole] = useState('Instructor')

  // Step 4: Course
  const [selectedOption, setSelectedOption] = useState<'create' | 'dashboard' | ''>('')

  const steps = [
    { id: 'password' as const, title: 'Set Password', icon: Lock },
    { id: 'logo' as const, title: 'Upload Logo', icon: ImageIcon },
    { id: 'invite' as const, title: 'Invite Team', icon: Users },
    { id: 'course' as const, title: 'Get Started', icon: BookOpen }
  ]

  const handleSkipStep = () => {
    setCompletedSteps(prev => [...prev, currentStep])
    moveToNextStep()
  }

  const handleStepClick = (stepId: OnboardingStep) => {
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const maxProgressIndex = steps.findIndex(s => s.id === maxProgressStep)
    
    // Allow clicking on any step up to the max progress reached
    if (stepIndex <= maxProgressIndex) {
      setCurrentStep(stepId)
    }
  }

  const moveToNextStep = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep)
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1].id as OnboardingStep
      setCurrentStep(nextStep)
      setMaxProgressStep(nextStep)
    } else {
      onComplete()
    }
  }

  // Step 1: Password handlers
  const handleSetPassword = () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    toast.success('Password set successfully!')
    setCompletedSteps(prev => [...prev, 'password'])
    moveToNextStep()
  }

  // Step 2: Logo handlers
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
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

  const handleSaveLogo = () => {
    if (!logoFile) {
      toast.error('Please upload a logo')
      return
    }
    toast.success('Logo uploaded successfully!')
    setCompletedSteps(prev => [...prev, 'logo'])
    moveToNextStep()
  }

  // Step 3: Invite handlers
  const handleAddInvite = () => {
    if (!currentInviteEmail || !currentInviteRole) {
      toast.error('Please fill in all fields')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentInviteEmail)) {
      toast.error('Please enter a valid email address')
      return
    }
    if (invites.some(inv => inv.email === currentInviteEmail)) {
      toast.error('This email has already been added')
      return
    }

    setInvites(prev => [...prev, { email: currentInviteEmail, role: currentInviteRole }])
    setCurrentInviteEmail('')
    setCurrentInviteRole('Instructor')
    toast.success('Team member added!')
  }

  const handleRemoveInvite = (email: string) => {
    setInvites(prev => prev.filter(inv => inv.email !== email))
    toast.success('Team member removed')
  }

  const handleCompleteInvites = () => {
    toast.success(`${invites.length} team member(s) invited successfully!`)
    setCompletedSteps(prev => [...prev, 'invite'])
    moveToNextStep()
  }

  // Step 4: Course handlers
  const handleCourseOption = (option: 'create' | 'dashboard') => {
    setCompletedSteps(prev => [...prev, 'course'])
    toast.success('Welcome to Zuvy Nexus Admin!')
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background p-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-h4 font-heading font-bold text-foreground mb-2">
            Welcome, {adminName}!
          </h1>
          <p className="text-body1 text-muted-foreground">
            Let's set up your organization
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = completedSteps.includes(step.id)
              const maxProgressIndex = steps.findIndex(s => s.id === maxProgressStep)
              const isAccessible = index <= maxProgressIndex
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  {/* Step with Connector */}
                  <div className="flex items-start w-full justify-center relative mb-3">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      disabled={!isAccessible}
                      className={`flex items-center justify-center h-14 w-14 rounded-full font-semibold transition-all flex-shrink-0 ${
                        isCompleted
                          ? 'bg-success text-white hover:bg-success-dark cursor-pointer'
                          : isActive
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/30 cursor-pointer hover:shadow-md'
                          : !isAccessible
                          ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
                          : 'bg-muted text-muted-foreground hover:bg-muted-dark cursor-pointer'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute top-7 left-1/2 h-1 w-full ml-7 ${
                          isCompleted ? 'bg-success' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  {/* Step Label */}
                  <p className={`text-body2 font-semibold text-center whitespace-nowrap ${
                    isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="shadow-lg border border-border">
          <CardHeader className="bg-card border-b border-border pb-6">
            <CardTitle className="text-h6 font-heading font-bold text-foreground">
              {currentStep === 'password' && 'Set Your Password'}
              {currentStep === 'logo' && 'Upload Organization Logo'}
              {currentStep === 'invite' && 'Invite Your Team'}
              {currentStep === 'course' && 'Get Started'}
            </CardTitle>
            <CardDescription className="text-body2 text-muted-foreground mt-2">
              {currentStep === 'password' && 'Create a secure password for your admin account'}
              {currentStep === 'logo' && 'Upload your organization\'s logo'}
              {currentStep === 'invite' && 'Invite team members to your organization (optional)'}
              {currentStep === 'course' && 'Choose how you\'d like to proceed'}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Step 1: Password */}
            {currentStep === 'password' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-body2 font-semibold text-foreground">New Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a strong password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  <p className="text-caption text-muted-foreground mt-1">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-body2 font-semibold text-foreground">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSkipStep}
                  >
                    Skip for now
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleSetPassword}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Logo */}
            {currentStep === 'logo' && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30">
                  {logoPreview ? (
                    <div className="space-y-4">
                      <div className="relative w-32 h-32 mx-auto">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-body2 text-foreground font-medium">{logoFile?.name}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Logo
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-body2 font-medium text-foreground mb-1">
                        Click to upload your organization logo
                      </p>
                      <p className="text-caption text-muted-foreground">
                        PNG, JPG, GIF up to 5MB
                      </p>
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

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSkipStep}
                  >
                    Skip for now
                  </Button>
                  <Button
                    className="flex-1"
                    disabled={!logoFile}
                    onClick={handleSaveLogo}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Invite Team */}
            {currentStep === 'invite' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="inviteEmail" className="text-body2 font-semibold text-foreground">Email Address</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    value={currentInviteEmail}
                    onChange={(e) => setCurrentInviteEmail(e.target.value)}
                    placeholder="team.member@example.com"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="inviteRole" className="text-body2 font-semibold text-foreground">Role</Label>
                  <Select value={currentInviteRole} onValueChange={setCurrentInviteRole}>
                    <SelectTrigger id="inviteRole">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                      <SelectItem value="Org Admin">Org Admin</SelectItem>
                      <SelectItem value="Learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleAddInvite}
                  variant="outline"
                  className="w-full"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>

                {invites.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-body2 font-semibold text-foreground">
                      Team Members ({invites.length})
                    </h3>
                    <div className="space-y-2">
                      {invites.map((invite) => (
                        <div
                          key={invite.email}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border"
                        >
                          <div className="flex-1">
                            <p className="text-body2 font-medium text-foreground">
                              {invite.email}
                            </p>
                            <Badge variant="outline" className="mt-1">
                              {invite.role}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveInvite(invite.email)}
                            className="text-destructive hover:text-destructive-dark"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleSkipStep}
                  >
                    Skip for now
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleCompleteInvites}
                  >
                    {invites.length > 0 ? `Continue (${invites.length} invites)` : 'Continue without invites'}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Course */}
            {currentStep === 'course' && (
              <div className="space-y-6">
                <div className="text-center space-y-6">
                  {/* Success Checkmark */}
                  <div className="flex justify-center">
                    <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-success" />
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="space-y-3">
                    <h2 className="text-h5 font-heading font-bold text-foreground">
                      You're all set!
                    </h2>
                    <div className="space-y-2">
                      <p className="text-body1 text-foreground">
                        {adminName} is ready. We've sent invites to your team members.
                      </p>
                      <p className="text-body1 text-foreground">
                        Let's create your first course.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full py-6 text-body1"
                  onClick={() => handleCourseOption('dashboard')}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Go to Dashboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-caption text-muted-foreground mt-6">
          You can complete these steps later in your account settings
        </p>
      </div>
    </div>
  )
}

export default AdminOnboarding
