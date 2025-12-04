'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, UserRole, Organisation } from '@/types'
import { mockOrganisations, mockAdminOrganisationMappings } from '@/types/mock-rbac-data'

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  currentOrganisation: Organisation | null
  organisations: Organisation[]
  setCurrentOrganisation: (org: Organisation) => void
  switchOrganisation: (orgId: string) => void
  isInstructor: () => boolean
  isAdmin: () => boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const SESSION_KEY = 'zuvy_current_user'
const ORG_SESSION_KEY = 'zuvy_current_organisation'

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null)
  const [currentOrganisation, setCurrentOrganisationState] = useState<Organisation | null>(null)
  const [organisations, setOrganisations] = useState<Organisation[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load user and organization from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem(SESSION_KEY)
      const storedOrg = sessionStorage.getItem(ORG_SESSION_KEY)
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as User
          setCurrentUserState(user)
          
          // Load organizations for this user
          if (user.role === 'Admin') {
            const adminMapping = mockAdminOrganisationMappings.find(m => m.adminId === user.id)
            if (adminMapping) {
              const userOrgs = mockOrganisations.filter(org => 
                adminMapping.organisationIds.includes(org.id)
              )
              setOrganisations(userOrgs)
              
              // Set current organization
              if (storedOrg) {
                const org = userOrgs.find(o => o.id === storedOrg)
                if (org) {
                  setCurrentOrganisationState(org)
                }
              } else {
                // Set to default or first org
                const defaultOrg = userOrgs.find(o => o.id === adminMapping.defaultOrganisationId)
                if (defaultOrg) {
                  setCurrentOrganisationState(defaultOrg)
                  sessionStorage.setItem(ORG_SESSION_KEY, defaultOrg.id)
                }
              }
            }
          }
        } catch (e) {
          console.error('Failed to parse stored user:', e)
          sessionStorage.removeItem(SESSION_KEY)
        }
      }
      setIsInitialized(true)
    }
  }, [])

  // Persist user to sessionStorage when changed
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user)
    if (typeof window !== 'undefined') {
      if (user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
        
        // Load organizations for this user if Admin
        if (user.role === 'Admin') {
          const adminMapping = mockAdminOrganisationMappings.find(m => m.adminId === user.id)
          if (adminMapping) {
            const userOrgs = mockOrganisations.filter(org => 
              adminMapping.organisationIds.includes(org.id)
            )
            setOrganisations(userOrgs)
            
            // Set to default org
            const defaultOrg = userOrgs.find(o => o.id === adminMapping.defaultOrganisationId)
            if (defaultOrg) {
              setCurrentOrganisationState(defaultOrg)
              sessionStorage.setItem(ORG_SESSION_KEY, defaultOrg.id)
            }
          }
        } else {
          setCurrentOrganisationState(null)
          setOrganisations([])
          sessionStorage.removeItem(ORG_SESSION_KEY)
        }
      } else {
        sessionStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(ORG_SESSION_KEY)
      }
    }
  }

  const setCurrentOrganisation = (org: Organisation) => {
    setCurrentOrganisationState(org)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ORG_SESSION_KEY, org.id)
    }
  }

  const switchOrganisation = (orgId: string) => {
    const org = organisations.find(o => o.id === orgId)
    if (org) {
      setCurrentOrganisation(org)
      // Update last accessed in mock data
      if (currentUser) {
        const adminMapping = mockAdminOrganisationMappings.find(m => m.adminId === currentUser.id)
        if (adminMapping) {
          adminMapping.lastAccessedOrganisationId = orgId
          adminMapping.lastAccessedAt = new Date().toISOString()
        }
      }
    }
  }

  const isInstructor = () => {
    return currentUser?.roleId === 'role-3' // Instructor role
  }

  const isAdmin = () => {
    return currentUser?.roleId === 'role-1' // Admin role
  }

  const logout = () => {
    setCurrentUser(null)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_KEY)
      sessionStorage.removeItem(ORG_SESSION_KEY)
    }
  }

  const value: UserContextType = {
    currentUser,
    setCurrentUser,
    currentOrganisation,
    organisations,
    setCurrentOrganisation,
    switchOrganisation,
    isInstructor,
    isAdmin,
    logout,
  }

  // Don't render children until we've checked sessionStorage
  if (!isInitialized) {
    return null
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
