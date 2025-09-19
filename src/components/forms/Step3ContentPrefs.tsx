'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare, 
  Target, 
  Image, 
  Plus, 
  X, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Heart,
  Camera,
  Palette,
  Wand2
} from 'lucide-react'
import { QuickLandFormData } from '@/types'

interface Step3ContentPrefsProps {
  formData: Partial<QuickLandFormData>
  onNext: (data: Partial<QuickLandFormData>) => void
  onBack: () => void
}

const imageStyles = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'Clean, corporate, business-focused',
    icon: CheckCircle,
    examples: ['Corporate headshots', 'Office environments', 'Clean layouts']
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Real people, authentic moments',
    icon: Heart,
    examples: ['People using products', 'Real scenarios', 'Authentic moments']
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Simple, clean, focused',
    icon: Zap,
    examples: ['White space', 'Simple graphics', 'Clean typography']
  },
  {
    id: 'vibrant',
    title: 'Vibrant',
    description: 'Bold, colorful, energetic',
    icon: Palette,
    examples: ['Bright colors', 'Dynamic compositions', 'Energetic feel']
  }
]

const ctaExamples = [
  'Get Started Today',
  'Learn More',
  'Contact Us',
  'Book Now',
  'Download Free',
  'Sign Up',
  'Try It Free',
  'Get Quote',
  'Shop Now',
  'Join Us'
]

const valuePropExamples = [
  'Save 50% on your first order',
  'Free consultation with experts',
  '30-day money-back guarantee',
  '24/7 customer support',
  'Award-winning service',
  'Trusted by 10,000+ customers',
  'No setup fees',
  'Instant results',
  'Proven track record',
  'Exclusive access'
]

export function Step3ContentPrefs({ formData, onNext, onBack }: Step3ContentPrefsProps) {
  const [data, setData] = useState<Partial<QuickLandFormData>>({
    key_messages: formData.key_messages || [],
    value_propositions: formData.value_propositions || [],
    call_to_action: formData.call_to_action || '',
    image_style: formData.image_style || 'professional',
    ...formData
  })

  const [newMessage, setNewMessage] = useState('')
  const [newValueProp, setNewValueProp] = useState('')

  const handleInputChange = (field: keyof QuickLandFormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const addKeyMessage = () => {
    if (newMessage.trim() && !data.key_messages?.includes(newMessage.trim())) {
      setData(prev => ({
        ...prev,
        key_messages: [...(prev.key_messages || []), newMessage.trim()]
      }))
      setNewMessage('')
    }
  }

  const removeKeyMessage = (message: string) => {
    setData(prev => ({
      ...prev,
      key_messages: prev.key_messages?.filter(m => m !== message) || []
    }))
  }

  const addValueProposition = () => {
    if (newValueProp.trim() && !data.value_propositions?.includes(newValueProp.trim())) {
      setData(prev => ({
        ...prev,
        value_propositions: [...(prev.value_propositions || []), newValueProp.trim()]
      }))
      setNewValueProp('')
    }
  }

  const removeValueProposition = (prop: string) => {
    setData(prev => ({
      ...prev,
      value_propositions: prev.value_propositions?.filter(p => p !== prop) || []
    }))
  }

  const handleCtaSelect = (cta: string) => {
    setData(prev => ({ ...prev, call_to_action: cta }))
  }

  const handleImageStyleChange = (style: string) => {
    setData(prev => ({ ...prev, image_style: style as any }))
  }

  const handleGenerate = () => {
    // Basic validation
    if (!data.call_to_action?.trim()) {
      alert('Please select or enter a call-to-action')
      return
    }
    if (!data.image_style) {
      alert('Please select an image style')
      return
    }

    // Log complete form data for now
    console.log('Complete form data:', data)
    
    // Show success message
    alert('Landing page generation started! This feature will be available soon.')
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-8"
    >
      {/* Key Messages */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Key Messages</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              What are the main points you want to communicate? (Optional)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Enter a key message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addKeyMessage()}
                />
                <Button onClick={addKeyMessage} disabled={!newMessage.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {data.key_messages && data.key_messages.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Key Messages ({data.key_messages.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {data.key_messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <span>{message}</span>
                        <button
                          onClick={() => removeKeyMessage(message)}
                          className="hover:bg-primary/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Value Propositions */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Target className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Value Propositions</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              What makes your business unique? What benefits do you offer?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newValueProp}
                  onChange={(e) => setNewValueProp(e.target.value)}
                  placeholder="Enter a value proposition..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addValueProposition()}
                />
                <Button onClick={addValueProposition} disabled={!newValueProp.trim()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              
              {/* Example value propositions */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quick Add Examples
                </Label>
                <div className="flex flex-wrap gap-2">
                  {valuePropExamples.map((example) => (
                    <Button
                      key={example}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!data.value_propositions?.includes(example)) {
                          setData(prev => ({
                            ...prev,
                            value_propositions: [...(prev.value_propositions || []), example]
                          }))
                        }
                      }}
                      disabled={data.value_propositions?.includes(example)}
                      className="text-xs"
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>
              
              {data.value_propositions && data.value_propositions.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Value Propositions ({data.value_propositions.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {data.value_propositions.map((prop, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{prop}</span>
                        <button
                          onClick={() => removeValueProposition(prop)}
                          className="hover:bg-green-200 dark:hover:bg-green-800/30 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Zap className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Call to Action</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              What action do you want visitors to take?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Choose or enter your CTA
                </Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {ctaExamples.map((cta) => (
                    <Button
                      key={cta}
                      variant={data.call_to_action === cta ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCtaSelect(cta)}
                      className="text-sm"
                    >
                      {cta}
                    </Button>
                  ))}
                </div>
                <Input
                  value={data.call_to_action}
                  onChange={(e) => handleInputChange('call_to_action', e.target.value)}
                  placeholder="Or enter your own call-to-action..."
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Image Style */}
      <motion.div variants={itemVariants}>
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Image className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Image Style</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              What visual style best represents your brand?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {imageStyles.map((style) => (
                <motion.div
                  key={style.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    data.image_style === style.id
                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                  onClick={() => handleImageStyleChange(style.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      data.image_style === style.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      <style.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {style.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {style.description}
                      </p>
                      <div className="space-y-1">
                        {style.examples.map((example) => (
                          <Badge key={example} variant="secondary" className="text-xs mr-1">
                            {example}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {data.image_style === style.id && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 200 }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm border-primary/20 dark:border-primary/30">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <Wand2 className="h-6 w-6 text-primary" />
              <CardTitle className="text-gray-900 dark:text-white">Ready to Generate!</CardTitle>
            </div>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Review your preferences and generate your landing page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Your Selections:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Page Type:</span>
                    <Badge variant="secondary">{data.page_type === 'single' ? 'Single Page' : 'Multi-Page'}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Sections:</span>
                    <Badge variant="secondary">{data.sections?.length || 0} selected</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Tone:</span>
                    <Badge variant="secondary">{data.content_tone}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">CTA:</span>
                    <Badge variant="secondary">{data.call_to_action}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Image Style:</span>
                    <Badge variant="secondary">{data.image_style}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">Content Count:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Key Messages:</span>
                    <Badge variant="secondary">{data.key_messages?.length || 0}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Value Props:</span>
                    <Badge variant="secondary">{data.value_propositions?.length || 0}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div variants={itemVariants} className="flex justify-between pt-6">
        <Button variant="outline" onClick={onBack}>
          Previous Step
        </Button>
        <Button onClick={handleGenerate} className="group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
          <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          Generate Landing Page
          <motion.span
            className="ml-2"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="h-4 w-4" />
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  )
}
