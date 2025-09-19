'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Upload, X, Building2, Target, Palette, Type } from 'lucide-react'
import { QuickLandFormData } from '@/types'

interface Step1BusinessInfoProps {
  formData: Partial<QuickLandFormData>
  onNext: (data: Partial<QuickLandFormData>) => void
  onBack: () => void
}

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Real Estate',
  'Food & Beverage',
  'Fashion',
  'Travel & Tourism',
  'Consulting',
  'Manufacturing',
  'Non-profit',
  'Other'
]

const brandColors = [
  { name: 'Blue', value: '#3B82F6', class: 'bg-blue-500' },
  { name: 'Purple', value: '#8B5CF6', class: 'bg-purple-500' },
  { name: 'Green', value: '#10B981', class: 'bg-green-500' },
  { name: 'Red', value: '#EF4444', class: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', class: 'bg-orange-500' },
  { name: 'Pink', value: '#EC4899', class: 'bg-pink-500' },
  { name: 'Indigo', value: '#6366F1', class: 'bg-indigo-500' },
  { name: 'Teal', value: '#14B8A6', class: 'bg-teal-500' }
]

const brandFonts = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Nunito'
]

export function Step1BusinessInfo({ formData, onNext, onBack }: Step1BusinessInfoProps) {
  const [data, setData] = useState<Partial<QuickLandFormData>>({
    company_name: formData.company_name || '',
    industry: formData.industry || '',
    business_description: formData.business_description || '',
    target_audience: formData.target_audience || '',
    business_goals: formData.business_goals || '',
    brand_colors: formData.brand_colors || [],
    brand_fonts: formData.brand_fonts || [],
    logo_url: formData.logo_url || '',
    ...formData
  })

  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(data.logo_url || null)

  const handleInputChange = (field: keyof QuickLandFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const handleColorToggle = (color: string) => {
    setData(prev => ({
      ...prev,
      brand_colors: prev.brand_colors?.includes(color)
        ? prev.brand_colors.filter(c => c !== color)
        : [...(prev.brand_colors || []), color]
    }))
  }

  const handleFontToggle = (font: string) => {
    setData(prev => ({
      ...prev,
      brand_fonts: prev.brand_fonts?.includes(font)
        ? prev.brand_fonts.filter(f => f !== font)
        : [...(prev.brand_fonts || []), font]
    }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
    setData(prev => ({ ...prev, logo_url: '' }))
  }

  const handleNext = () => {
    // Basic validation
    if (!data.company_name?.trim()) {
      alert('Company name is required')
      return
    }
    if (!data.industry) {
      alert('Please select an industry')
      return
    }
    if (!data.business_description?.trim()) {
      alert('Business description is required')
      return
    }
    if (!data.target_audience?.trim()) {
      alert('Target audience is required')
      return
    }
    if (!data.business_goals?.trim()) {
      alert('Business goals are required')
      return
    }

    onNext(data)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Building2 className="h-6 w-6 text-primary" />
            <CardTitle className="text-gray-900 dark:text-white">Step 1: Business Information</CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Tell us about your business to create a personalized landing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Company Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company Information</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company_name" className="text-gray-700 dark:text-gray-300">
                  Company Name *
                </Label>
                <Input
                  id="company_name"
                  value={data.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="Enter your company name"
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-gray-700 dark:text-gray-300">
                  Industry *
                </Label>
                <Select value={data.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="business_description" className="text-gray-700 dark:text-gray-300">
                Business Description *
              </Label>
              <Textarea
                id="business_description"
                value={data.business_description}
                onChange={(e) => handleInputChange('business_description', e.target.value)}
                placeholder="Describe what your business does, your products/services, and what makes you unique..."
                rows={4}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
            </div>
          </motion.div>

          {/* Target Audience & Goals */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Target Audience & Goals</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target_audience" className="text-gray-700 dark:text-gray-300">
                  Target Audience *
                </Label>
                <Textarea
                  id="target_audience"
                  value={data.target_audience}
                  onChange={(e) => handleInputChange('target_audience', e.target.value)}
                  placeholder="Who are your ideal customers? Age, interests, demographics, etc."
                  rows={3}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="business_goals" className="text-gray-700 dark:text-gray-300">
                  Business Goals *
                </Label>
                <Textarea
                  id="business_goals"
                  value={data.business_goals}
                  onChange={(e) => handleInputChange('business_goals', e.target.value)}
                  placeholder="What do you want to achieve with this landing page? (e.g., generate leads, sell products, build awareness)"
                  rows={3}
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </motion.div>

          {/* Logo Upload */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Company Logo</h3>
            </div>
            
            <div className="space-y-4">
              {!logoPreview ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload your company logo (optional)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Button variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-16 w-16 object-contain rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {logoFile?.name || 'Logo uploaded'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Click to change or remove
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                    >
                      Change
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={removeLogo}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* Brand Colors */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Brand Colors</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select colors that represent your brand (choose 1-3 colors)
              </p>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {brandColors.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => handleColorToggle(color.value)}
                    className={`relative w-12 h-12 rounded-lg ${color.class} border-2 transition-all ${
                      data.brand_colors?.includes(color.value)
                        ? 'border-gray-900 dark:border-white scale-110'
                        : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {data.brand_colors?.includes(color.value) && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 200 }}
                      >
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-gray-900 rounded-full" />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              {data.brand_colors && data.brand_colors.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.brand_colors.map((color) => (
                    <Badge key={color} variant="secondary" className="text-xs">
                      {brandColors.find(c => c.value === color)?.name}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Brand Fonts */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Type className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Brand Fonts</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select fonts that match your brand personality (choose 1-2 fonts)
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {brandFonts.map((font) => (
                  <motion.button
                    key={font}
                    onClick={() => handleFontToggle(font)}
                    className={`relative p-3 rounded-lg border-2 transition-all text-sm ${
                      data.brand_fonts?.includes(font)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 dark:border-gray-600 hover:border-primary/50'
                    }`}
                    style={{ fontFamily: font }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {font}
                    {data.brand_fonts?.includes(font) && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 200 }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              {data.brand_fonts && data.brand_fonts.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {data.brand_fonts.map((font) => (
                    <Badge key={font} variant="secondary" className="text-xs">
                      {font}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div variants={itemVariants} className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
            <Button onClick={handleNext} className="group">
              Next Step
              <motion.span
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
