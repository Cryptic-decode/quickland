'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { AnimatedAuthForm } from '@/components/ui/animated-auth-form'
import toast from 'react-hot-toast'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, user } = useAuth()
  const router = useRouter()

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Basic validation
    if (!email.trim()) {
      toast.error('Email is required')
      setLoading(false)
      return
    }
    if (!password.trim()) {
      toast.error('Password is required')
      setLoading(false)
      return
    }

    try {
      await signIn(email, password)
      toast.success('Welcome back to QuickLand!')
      
      // Simple redirect after successful sign-in
      router.push('/dashboard')
      
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedAuthForm
      type="signin"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      loading={loading}
      error=""
    />
  )
}