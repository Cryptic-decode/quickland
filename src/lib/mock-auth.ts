import { User } from '@supabase/supabase-js'

// Mock authentication for testing when Supabase isn't configured
export const mockAuth = {
  signUp: async (email: string, password: string, fullName: string, companyName: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock successful signup
    const mockUser: User = {
      id: 'mock-user-id',
      email,
      user_metadata: {
        full_name: fullName,
        company_name: companyName,
      },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      phone: '',
      confirmation_sent_at: new Date().toISOString(),
      recovery_sent_at: null,
      email_change_sent_at: null,
      new_email: null,
      new_phone: null,
      phone_confirmed_at: null,
      email_change_confirm_status: 0,
      banned_until: null,
      is_anonymous: false,
      identities: [],
      factors: []
    }
    
    // Store in localStorage for persistence
    localStorage.setItem('mock-user', JSON.stringify(mockUser))
    
    return { data: { user: mockUser }, error: null }
  },
  
         signIn: async (email: string, _password: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('mock-user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.email === email) {
        return { data: { user }, error: null }
      }
    }
    
    // Mock error for non-existent user
    throw new Error('Invalid login credentials')
  },
  
  signOut: async () => {
    localStorage.removeItem('mock-user')
    return { error: null }
  },
  
  getSession: async () => {
    const storedUser = localStorage.getItem('mock-user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      return { data: { session: { user } }, error: null }
    }
    return { data: { session: null }, error: null }
  },
  
  onAuthStateChange: (_callback: (event: string, session: unknown) => void) => {
    // Mock auth state change listener
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
}
