'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { User, UserRole } from '@/types'

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  isInstructor: () => boolean
  isAdmin: () => boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const SESSION_KEY = 'zuvy_current_user'

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load user from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(SESSION_KEY)
      if (stored) {
        try {
          const user = JSON.parse(stored) as User
          setCurrentUserState(user)
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
      } else {
        sessionStorage.removeItem(SESSION_KEY)
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
    }
  }

  const value: UserContextType = {
    currentUser,
    setCurrentUser,
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
