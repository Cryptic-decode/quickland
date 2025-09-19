'use client'

// import { useAuth } from '@/contexts/AuthContext' // TODO: Add when needed
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// TODO: Add form steps when ready

export default function CreatePage() {
  // const { user } = useAuth() // TODO: Add auth check when needed

  const renderStep = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>Landing page creation form will be available soon</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            We&apos;re working on the landing page creation form. This will include:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Business information collection</li>
            <li>Page configuration options</li>
            <li>AI-powered content generation</li>
          </ul>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
                     <div>
                       <h1 className="text-xl font-semibold">Create Landing Page</h1>
                       <p className="text-sm text-gray-600">Coming Soon</p>
                     </div>
            </div>
          </div>
        </div>
      </header>


      {/* Form Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {renderStep()}
        </div>
      </main>
    </div>
  )
}
