'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
// import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  Layout, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Users,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Star,
  Award,
  Zap,
  Eye,
  Palette,
  ShoppingCart,
  Utensils,
  Briefcase
} from 'lucide-react'
import { QuickLandFormData } from '@/types'
import { TemplatePreviewModal } from '@/components/ui/template-preview-modal'

interface Step2PageConfigProps {
  formData: Partial<QuickLandFormData>
  onNext: (data: Partial<QuickLandFormData>) => void
  onBack: () => void
}

const pageTypes = [
  {
    id: 'single',
    title: 'Single Page',
    description: 'One focused landing page with all content',
    icon: FileText,
    features: ['Hero section', 'Features', 'Testimonials', 'CTA'],
    recommended: true
  },
  {
    id: 'multi',
    title: 'Multi-Page',
    description: 'Multiple pages with navigation',
    icon: Layout,
    features: ['Home', 'About', 'Services', 'Contact'],
    recommended: false
  }
]

const availableSections = [
  {
    id: 'hero',
    title: 'Hero Section',
    description: 'Main banner with headline and CTA',
    icon: Zap,
    required: true,
    category: 'essential'
  },
  {
    id: 'features',
    title: 'Features',
    description: 'Key features and benefits',
    icon: Star,
    required: false,
    category: 'content'
  },
  {
    id: 'about',
    title: 'About Us',
    description: 'Company story and mission',
    icon: Users,
    required: false,
    category: 'content'
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'Customer reviews and feedback',
    icon: Award,
    required: false,
    category: 'social-proof'
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Service or product pricing',
    icon: BarChart3,
    required: false,
    category: 'conversion'
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Contact form and information',
    icon: Mail,
    required: false,
    category: 'conversion'
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Map and address information',
    icon: MapPin,
    required: false,
    category: 'conversion'
  },
  {
    id: 'phone',
    title: 'Phone',
    description: 'Direct phone contact',
    icon: Phone,
    required: false,
    category: 'conversion'
  }
]

const templates = [
  {
    id: 'business_professional',
    title: 'Business Professional',
    description: 'Clean, corporate design perfect for B2B services',
    icon: Briefcase,
    features: ['Hero with CTA', 'Services', 'About', 'Contact'],
    colors: ['Blue', 'Gray', 'White'],
    category: 'business',
    preview: '/templates/business-professional-preview.jpg'
  },
  {
    id: 'creative_agency',
    title: 'Creative Agency',
    description: 'Bold, modern design for creative professionals',
    icon: Palette,
    features: ['Portfolio', 'Team', 'Process', 'Testimonials'],
    colors: ['Purple', 'Pink', 'Orange'],
    category: 'creative',
    preview: '/templates/creative-agency-preview.jpg'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Product-focused design for online stores',
    icon: ShoppingCart,
    features: ['Product Showcase', 'Pricing', 'Reviews', 'Checkout'],
    colors: ['Green', 'Blue', 'White'],
    category: 'ecommerce',
    preview: '/templates/ecommerce-preview.jpg'
  },
  {
    id: 'service_provider',
    title: 'Service Provider',
    description: 'Trust-focused design for local services',
    icon: Users,
    features: ['Services', 'Testimonials', 'Location', 'Booking'],
    colors: ['Teal', 'Blue', 'Gray'],
    category: 'service',
    preview: '/templates/service-provider-preview.jpg'
  },
  {
    id: 'restaurant_food',
    title: 'Restaurant & Food',
    description: 'Appetizing design for food businesses',
    icon: Utensils,
    features: ['Menu', 'Gallery', 'Location', 'Reservations'],
    colors: ['Red', 'Orange', 'Yellow'],
    category: 'food',
    preview: '/templates/restaurant-food-preview.jpg'
  }
]

const contentTones = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'Formal, business-focused tone',
    example: 'We deliver exceptional results through innovative solutions.'
  },
  {
    id: 'casual',
    title: 'Casual',
    description: 'Friendly, approachable tone',
    example: 'Hey there! We love helping businesses grow and succeed.'
  },
  {
    id: 'creative',
    title: 'Creative',
    description: 'Artistic, imaginative tone',
    example: 'Unleash your brand\'s potential with our creative magic.'
  },
  {
    id: 'friendly',
    title: 'Friendly',
    description: 'Warm, welcoming tone',
    example: 'Welcome! We\'re here to make your business dreams come true.'
  }
]

export function Step2PageConfig({ formData, onNext, onBack }: Step2PageConfigProps) {
  const [data, setData] = useState<Partial<QuickLandFormData>>({
    page_type: formData.page_type || 'single',
    sections: formData.sections || ['hero'],
    content_tone: formData.content_tone || 'professional',
    template: formData.template || 'business_professional',
    ...formData
  })

  const [previewTemplate, setPreviewTemplate] = useState<typeof templates[0] | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePageTypeChange = (pageType: string) => {
    setData(prev => ({ 
      ...prev, 
      page_type: pageType as 'single' | 'multi',
      // Reset sections when changing page type
      sections: pageType === 'single' ? ['hero'] : ['hero', 'about', 'contact']
    }))
  }

  const handleSectionToggle = (sectionId: string) => {
    setData(prev => {
      const currentSections = prev.sections || []
      const isRequired = availableSections.find(s => s.id === sectionId)?.required
      
      // Don't allow removing required sections
      if (isRequired && currentSections.includes(sectionId)) {
        return prev
      }
      
      return {
        ...prev,
        sections: currentSections.includes(sectionId)
          ? currentSections.filter(s => s !== sectionId)
          : [...currentSections, sectionId]
      }
    })
  }

  const handleToneChange = (tone: string) => {
    setData(prev => ({ ...prev, content_tone: tone as 'professional' | 'casual' | 'creative' | 'friendly' }))
  }

  const handleTemplateChange = (template: string) => {
    setData(prev => ({ ...prev, template }))
  }

  const handlePreviewTemplate = (template: typeof templates[0]) => {
    setPreviewTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleSelectTemplate = (templateId: string) => {
    setData(prev => ({ ...prev, template: templateId }))
    setIsPreviewOpen(false)
  }

  const handleNext = () => {
    // Basic validation
    if (!data.page_type) {
      alert('Please select a page type')
      return
    }
    if (!data.sections || data.sections.length === 0) {
      alert('Please select at least one section')
      return
    }
    if (!data.content_tone) {
      alert('Please select a content tone')
      return
    }
    if (!data.template) {
      alert('Please select a template')
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

  const cardVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  }

  const selectedSections = data.sections || []

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Page Type Selection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Layout className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Page Type</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose the structure for your landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {pageTypes.map((pageType) => (
                <motion.div
                  key={pageType.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    data.page_type === pageType.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                  onClick={() => handlePageTypeChange(pageType.id)}
                >
                  {pageType.recommended && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                      Recommended
                    </Badge>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      data.page_type === pageType.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      <pageType.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {pageType.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {pageType.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pageType.features.map((feature) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {data.page_type === pageType.id && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 200 }}
                    >
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Template Selection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Layout className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Choose Template</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Select a professional template that matches your business type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    data.template === template.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                  onClick={() => handleTemplateChange(template.id)}
                >
                  {/* Template Preview Placeholder */}
                  <div className="relative mb-4 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <template.icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePreviewTemplate(template)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    {data.template === template.id && (
                      <motion.div
                        className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="h-8 w-8 text-primary" />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {template.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Features:</p>
                        <div className="flex flex-wrap gap-1">
                          {template.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Colors:</p>
                        <div className="flex space-x-1">
                          {template.colors.map((color) => (
                            <div
                              key={color}
                              className={`w-4 h-4 rounded-full ${
                                color === 'Blue' ? 'bg-blue-500' :
                                color === 'Gray' ? 'bg-gray-500' :
                                color === 'White' ? 'bg-white border border-gray-300' :
                                color === 'Purple' ? 'bg-purple-500' :
                                color === 'Pink' ? 'bg-pink-500' :
                                color === 'Orange' ? 'bg-orange-500' :
                                color === 'Green' ? 'bg-green-500' :
                                color === 'Teal' ? 'bg-teal-500' :
                                color === 'Red' ? 'bg-red-500' :
                                color === 'Yellow' ? 'bg-yellow-500' : 'bg-gray-500'
                              }`}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {data.template && (
              <motion.div
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Selected: {templates.find(t => t.id === data.template)?.title}
                  </span>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Section Selection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Settings className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Page Sections</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose which sections to include on your landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableSections.map((section) => {
                const isSelected = selectedSections.includes(section.id)
                const isRequired = section.required
                
                return (
                  <motion.div
                    key={section.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : isRequired
                        ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 cursor-not-allowed'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                    }`}
                    onClick={() => !isRequired && handleSectionToggle(section.id)}
                  >
                    {isRequired && (
                      <Badge variant="outline" className="absolute -top-2 -right-2 text-xs">
                        Required
                      </Badge>
                    )}
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-primary/20 text-primary'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        <section.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                          {section.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 200 }}
                      >
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
            
            {selectedSections.length > 0 && (
              <motion.div
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Selected Sections ({selectedSections.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSections.map((sectionId) => {
                    const section = availableSections.find(s => s.id === sectionId)
                    return (
                      <Badge key={sectionId} variant="secondary" className="text-xs">
                        {section?.title}
                      </Badge>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Tone Selection */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Content Tone</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Choose the tone that best represents your brand
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {contentTones.map((tone) => (
                <motion.div
                  key={tone.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    data.content_tone === tone.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                  onClick={() => handleToneChange(tone.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                      data.content_tone === tone.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {data.content_tone === tone.id && (
                        <motion.div
                          className="w-full h-full rounded-full bg-white scale-50"
                          initial={{ scale: 0 }}
                          animate={{ scale: 0.5 }}
                          transition={{ type: "spring" as const, stiffness: 200 }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {tone.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {tone.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 italic">
                        &ldquo;{tone.example}&rdquo;
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div variants={itemVariants} className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button onClick={handleNext} className="group">
          Next Step
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Button>
      </motion.div>

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={previewTemplate}
        onSelect={handleSelectTemplate}
        selectedTemplate={data.template}
      />
    </motion.div>
  )
}
