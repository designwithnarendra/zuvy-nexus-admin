'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'

export default function HomePage() {
  const router = useRouter()
  const { currentUser } = useUser()

  useEffect(() => {
    if (currentUser) {
      router.push('/courses')
    } else {
      router.push('/role-selector')
    }
  }, [currentUser, router])

  return null
}