'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Step1BusinessInfo } from '@/components/forms/Step1BusinessInfo'
import { Step2PageConfig } from '@/components/forms/Step2PageConfig'
import { Step3ContentPrefs } from '@/components/forms/Step3ContentPrefs'
import { QuickLandFormData } from '@/types'

export default function CreatePage() {
  // const { user } = useAuth() // TODO: Add auth check when needed
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<QuickLandFormData>>({})

  const steps = [
    { number: 1, title: 'Business Information', description: 'Tell us about your business', completed: false },
    { number: 2, title: 'Page Configuration', description: 'Choose your page type and sections', completed: false },
    { number: 3, title: 'Content Preferences', description: 'Customize your content and style', completed: false },
  ]

  const handleNext = (stepData: Partial<QuickLandFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }))
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    } else {
      // Go back to dashboard
      window.location.href = '/dashboard'
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1BusinessInfo
            formData={formData}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        )
      case 2:
        return (
          <Step2PageConfig
            formData={formData}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        )
      case 3:
        return (
          <Step3ContentPrefs
            formData={formData}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200/60 dark:border-gray-700/60">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Create Landing Page</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Step {currentStep} of 3: {steps[currentStep - 1]?.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                  currentStep > step.number
                    ? 'bg-primary border-primary text-white'
                    : currentStep === step.number
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-6 w-12 h-0.5 transition-all ${
                    currentStep > step.number
                      ? 'bg-primary'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <main className="container mx-auto px-6 py-8">
        {renderStep()}
      </main>
    </div>
  )
}
