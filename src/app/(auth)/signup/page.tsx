'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { AnimatedAuthForm } from '@/components/ui/animated-auth-form'
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signUp, user } = useAuth()
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
    if (!fullName.trim()) {
      toast.error('Full name is required')
      setLoading(false)
      return
    }
    if (!companyName.trim()) {
      toast.error('Company name is required')
      setLoading(false)
      return
    }
    if (!email.trim()) {
      toast.error('Email is required')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      await signUp(email, password, fullName, companyName)
      toast.success('Account created! Please check your email to verify your account.')
      // Don't redirect immediately - user needs to verify email first
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedAuthForm
      type="signup"
      onSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      fullName={fullName}
      setFullName={setFullName}
      companyName={companyName}
      setCompanyName={setCompanyName}
      loading={loading}
      error=""
    />
  )
}