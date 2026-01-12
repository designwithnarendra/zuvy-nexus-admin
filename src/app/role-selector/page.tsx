'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { mockUsers } from '@/types/mock-rbac-data'
import { mockBatches } from '@/types/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Shield, GraduationCap } from 'lucide-react'
import AdminOnboarding from '@/components/onboarding/AdminOnboarding'
import AdminSelfManagedOnboarding from '@/components/onboarding/AdminSelfManagedOnboarding'
import type { User } from '@/types'

export default function RoleSelectorPage() {
  const router = useRouter()
  const { setCurrentUser } = useUser()
  const [showInstructorSelect, setShowInstructorSelect] = useState(false)
  const [showAdminSelect, setShowAdminSelect] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState<string>('')
  const [selectedAdminType, setSelectedAdminType] = useState<string>('')
  const [showAdminOnboarding, setShowAdminOnboarding] = useState(false)
  const [showAdminSelfManagedOnboarding, setShowAdminSelfManagedOnboarding] = useState(false)
  const [pendingAdmin, setPendingAdmin] = useState<User | null>(null)

  // Get all instructors
  const instructors = mockUsers.filter(u => u.role === 'Instructor')

  // Get batch info for each instructor
  const getInstructorInfo = (email: string) => {
    const batches = mockBatches.filter(b => b.instructorEmail === email)
    const courseIds = [...new Set(batches.map(b => b.courseId))]
    return {
      batchCount: batches.length,
      courseCount: courseIds.length,
      batches
    }
  }

  const handleAdminSelection = () => {
    const admin = mockUsers.find(u => u.role === 'Admin')
    if (admin) {
      setCurrentUser(admin)
      router.push('/courses')
    }
  }

  const handleAdminClick = () => {
    setShowAdminSelect(true)
  }

  const handleAdminTypeSelection = () => {
    const admin = mockUsers.find(u => u.role === 'Admin')
    if (admin && selectedAdminType) {
      const adminWithType = {
        ...admin,
        adminType: selectedAdminType as 'Admin-Self Managed' | 'Admin-Zuvy Managed'
      }
      
      // If Self Managed, show new onboarding flow
      if (selectedAdminType === 'Admin-Self Managed') {
        setPendingAdmin(adminWithType)
        setShowAdminSelfManagedOnboarding(true)
      } else {
        // If Zuvy Managed, go directly to dashboard
        setCurrentUser(adminWithType)
        router.push('/courses')
      }
    }
  }

  const handleSuperAdminSelection = () => {
    const superAdmin: User = {
      id: 'superadmin_1',
      name: 'Super Admin',
      email: 'superadmin@zuvy.com',
      role: 'SuperAdmin',
      roleId: 'role_superadmin',
      dateAdded: new Date().toISOString(),
      status: 'active'
    }
    setCurrentUser(superAdmin)
    router.push('/settings/organisations')
  }

  const handleInstructorClick = () => {
    setShowInstructorSelect(true)
  }

  const handleInstructorSelection = () => {
    const instructor = instructors.find(i => i.email === selectedInstructor)
    if (instructor) {
      setCurrentUser(instructor)
      router.push('/courses')
    }
  }

  const handleOnboardingComplete = () => {
    if (pendingAdmin) {
      setCurrentUser(pendingAdmin)
      router.push('/courses')
    }
  }

  const handleLogout = () => {
    setShowAdminSelfManagedOnboarding(false)
    setShowAdminSelect(false)
    setPendingAdmin(null)
    setSelectedAdminType('')
  }

  // Show onboarding flow if triggered
  if (showAdminSelfManagedOnboarding && pendingAdmin) {
    return <AdminSelfManagedOnboarding onComplete={handleOnboardingComplete} adminName={pendingAdmin.name} onLogout={handleLogout} />
  }

  if (showAdminOnboarding && pendingAdmin) {
    return <AdminOnboarding onComplete={handleOnboardingComplete} adminName={pendingAdmin.name} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Zuvy Nexus Admin
          </h1>
          <p className="text-lg text-slate-600">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Super Admin Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-violet-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-bl-full" />
            <CardHeader className="relative">
              <div className="w-16 h-16 bg-violet-500/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-violet-600" />
              </div>
              <CardTitle className="text-2xl">Super Admin</CardTitle>
              <CardDescription className="text-base">
                Complete platform oversight and management
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Manage organizations and POCs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Configure organization management types</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Full access to all platform features</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>System-wide administration and oversight</span>
                </li>
              </ul>
              <Button
                className="w-full mt-4 bg-violet-600 hover:bg-violet-700"
                size="lg"
                onClick={handleSuperAdminSelection}
              >
                Continue as Super Admin
              </Button>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-primary">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <CardHeader className="relative">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin</CardTitle>
              <CardDescription className="text-base">
                Full access to all platform features
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              {!showAdminSelect ? (
                <>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Manage courses, content, and curriculum</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>User and role management</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Access to all batches and students</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Platform-wide analytics and settings</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handleAdminClick}
                  >
                    Continue as Admin
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Select Admin Type
                    </label>
                    <Select value={selectedAdminType} onValueChange={setSelectedAdminType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose an admin type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin-Self Managed">
                          <span className="font-medium">Admin-Self Managed</span>
                        </SelectItem>
                        <SelectItem value="Admin-Zuvy Managed">
                          <span className="font-medium">Admin-Zuvy Managed</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleAdminTypeSelection}
                    disabled={!selectedAdminType}
                  >
                    Continue as Admin
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    size="sm"
                    onClick={() => {
                      setShowAdminSelect(false)
                      setSelectedAdminType('')
                    }}
                  >
                    Back to role selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructor Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border-2 hover:border-emerald-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full" />
            <CardHeader className="relative">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
              <CardTitle className="text-2xl">Instructor</CardTitle>
              <CardDescription className="text-base">
                Manage assigned courses and students
              </CardDescription>
            </CardHeader>
            <CardContent className="relative space-y-4">
              {!showInstructorSelect ? (
                <>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>View and edit assigned courses</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Add course content and materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Manage students in your batches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Grade assignments and submissions</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={handleInstructorClick}
                  >
                    Continue as Instructor
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Select Instructor
                    </label>
                    <Select value={selectedInstructor} onValueChange={setSelectedInstructor}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose an instructor..." />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => {
                          const info = getInstructorInfo(instructor.email)
                          return (
                            <SelectItem key={instructor.id} value={instructor.email}>
                              <div className="flex flex-col">
                                <span className="font-medium">{instructor.name}</span>
                                <span className="text-xs text-slate-500">
                                  {info.batchCount} {info.batchCount === 1 ? 'batch' : 'batches'} • {info.courseCount} {info.courseCount === 1 ? 'course' : 'courses'}
                                </span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    onClick={handleInstructorSelection}
                    disabled={!selectedInstructor}
                  >
                    Continue as Instructor
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full"
                    size="sm"
                    onClick={() => setShowInstructorSelect(false)}
                  >
                    Back to role selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          This is a demo environment. Your role selection will persist until you close the tab.
        </p>
      </div>
    </div>
  )
}

