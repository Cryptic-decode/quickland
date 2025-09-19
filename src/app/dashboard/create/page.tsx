'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Form steps
import Step1BusinessInfo from '@/components/forms/Step1BusinessInfo'
import Step2PageConfig from '@/components/forms/Step2PageConfig'
import Step3ContentPrefs from '@/components/forms/Step3ContentPrefs'

export default function CreatePage() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})

  const steps = [
    { number: 1, title: 'Business Information', description: 'Tell us about your business' },
    { number: 2, title: 'Page Configuration', description: 'Choose your page type and sections' },
    { number: 3, title: 'Content Preferences', description: 'Customize your content and style' },
  ]

  const handleNext = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = (finalData: any) => {
    const completeData = { ...formData, ...finalData }
    console.log('Complete form data:', completeData)
    // TODO: Generate landing page with AI
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BusinessInfo onNext={handleNext} initialData={formData} />
      case 2:
        return <Step2PageConfig onNext={handleNext} onPrevious={handlePrevious} initialData={formData} />
      case 3:
        return <Step3ContentPrefs onSubmit={handleSubmit} onPrevious={handlePrevious} initialData={formData} />
      default:
        return null
    }
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
                <p className="text-sm text-gray-600">Step {currentStep} of 3</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.number 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.number ? 'text-primary' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-8 w-16 h-0.5 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {renderStep()}
        </div>
      </main>
    </div>
  )
}
