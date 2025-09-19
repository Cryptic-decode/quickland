'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { mockAuth } from '@/lib/mock-auth'
import { LoadingPage } from '@/components/ui/loading'

// Check if we're using mock auth
const isMockAuth = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, companyName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isMockAuth) {
      // Use mock auth
      mockAuth.getSession().then(({ data: { session } }) => {
        setUser(session?.user as User ?? null)
        setLoading(false)
      })
    } else {
      // Use real Supabase auth
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null)
        setLoading(false)
      })

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      )

      return () => subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, fullName: string, companyName: string) => {
    if (isMockAuth) {
      // Use mock auth
      const { data, error } = await mockAuth.signUp(email, password, fullName, companyName)
      if (error) throw error
      setUser(data.user as User)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          }
        }
      })
      
      if (error) throw error
      
      // Create profile immediately after signup
      if (data.user) {
        try {
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email!,
              full_name: fullName,
              company_name: companyName,
            })
        } catch (profileError) {
          console.error('Profile creation error:', profileError)
          // Don't throw - user is created, profile can be created later
        }
      }
      
    } catch (error: unknown) {
      // Handle network errors
      if (error instanceof Error && (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_SSL'))) {
        throw new Error('Network connection failed. Please check your internet connection and try again.')
      }
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    if (isMockAuth) {
      // Use mock auth
      const { data, error } = await mockAuth.signIn(email, password)
      if (error) throw error
      setUser(data.user as User)
      return data.user
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      // User will be set by the auth state change listener
      return data.user
      
    } catch (error: unknown) {
      // Handle network errors
      if (error instanceof Error && (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_SSL'))) {
        throw new Error('Network connection failed. Please check your internet connection and try again.')
      }
      throw error
    }
  }

  const signOut = async () => {
    if (isMockAuth) {
      // Use mock auth
      await mockAuth.signOut()
      setUser(null)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  if (loading) {
    return <LoadingPage />
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}