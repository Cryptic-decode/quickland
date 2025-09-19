'use client'

import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        duration: 4000,
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: 'hsl(142, 76%, 36%)',
            secondary: '#fff',
          },
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(142, 76%, 36%)',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(0, 84%, 60%)',
            secondary: '#fff',
          },
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(0, 84%, 60%)',
          },
        },
        loading: {
          iconTheme: {
            primary: 'hsl(var(--primary))',
            secondary: '#fff',
          },
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--primary))',
          },
        },
      }}
    />
  )
}
