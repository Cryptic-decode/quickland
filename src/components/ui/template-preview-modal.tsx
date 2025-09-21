'use client'

import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, Monitor, Smartphone, CheckCircle } from 'lucide-react'

interface TemplatePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  template: {
    id: string
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    features: string[]
    colors: string[]
    category: string
  } | null
  onSelect?: (templateId: string) => void
  selectedTemplate?: string
}

const templatePreviews = {
  business_professional: {
    hero: {
      title: "Transform Your Business",
      subtitle: "Professional solutions for modern companies",
      cta: "Get Started",
      background: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    sections: [
      {
        type: "features",
        title: "Why Choose Us",
        items: [
          { title: "Expert Team", description: "20+ years experience" },
          { title: "Proven Results", description: "98% success rate" },
          { title: "24/7 Support", description: "Always here to help" }
        ]
      },
      {
        type: "about",
        title: "About Our Company",
        description: "We've been helping businesses grow for over two decades with innovative solutions and dedicated support."
      },
      {
        type: "testimonials",
        title: "What Our Clients Say",
        items: [
          { name: "Sarah Johnson", company: "Tech Corp", quote: "Outstanding service and results!" },
          { name: "Mike Chen", company: "StartupXYZ", quote: "Transformed our business completely." }
        ]
      }
    ]
  },
  creative_agency: {
    hero: {
      title: "Creative Excellence",
      subtitle: "Bold designs that make an impact",
      cta: "View Portfolio",
      background: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500"
    },
    sections: [
      {
        type: "portfolio",
        title: "Our Work",
        items: [
          { title: "Brand Identity", description: "Complete brand makeover" },
          { title: "Web Design", description: "Modern, responsive sites" },
          { title: "Marketing", description: "Creative campaigns" }
        ]
      },
      {
        type: "team",
        title: "Meet the Team",
        description: "Creative minds working together to bring your vision to life."
      },
      {
        type: "process",
        title: "Our Process",
        items: [
          { step: "1", title: "Discovery", description: "Understanding your needs" },
          { step: "2", title: "Design", description: "Creating amazing visuals" },
          { step: "3", title: "Launch", description: "Bringing it all together" }
        ]
      }
    ]
  },
  ecommerce: {
    hero: {
      title: "Shop the Best",
      subtitle: "Quality products at amazing prices",
      cta: "Shop Now",
      background: "bg-gradient-to-br from-green-600 to-blue-600"
    },
    sections: [
      {
        type: "products",
        title: "Featured Products",
        items: [
          { title: "Premium Quality", price: "$99", description: "Top-rated product" },
          { title: "Best Seller", price: "$149", description: "Customer favorite" },
          { title: "New Arrival", price: "$79", description: "Latest addition" }
        ]
      },
      {
        type: "reviews",
        title: "Customer Reviews",
        items: [
          { name: "Emma Wilson", rating: 5, quote: "Love this product!" },
          { name: "David Brown", rating: 5, quote: "Excellent quality and service." }
        ]
      },
      {
        type: "features",
        title: "Why Shop With Us",
        items: [
          { title: "Free Shipping", description: "On orders over $50" },
          { title: "Easy Returns", description: "30-day return policy" },
          { title: "Secure Payment", description: "100% secure checkout" }
        ]
      }
    ]
  }
}

export function TemplatePreviewModal({ isOpen, onClose, template, onSelect, selectedTemplate }: TemplatePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const [previewData, setPreviewData] = useState<typeof templatePreviews[keyof typeof templatePreviews] | null>(null)

  useEffect(() => {
    if (template && template.id in templatePreviews) {
      setPreviewData(templatePreviews[template.id as keyof typeof templatePreviews])
    }
  }, [template])

  if (!template || !previewData) return null

  const isSelected = selectedTemplate === template.id

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <template.icon className="h-6 w-6 text-primary" />
              <div>
                <DialogTitle className="text-xl">{template.title}</DialogTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Preview Panel */}
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="flex space-x-2">
                  <Button
                    variant={viewMode === 'desktop' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </Button>
                  <Button
                    variant={viewMode === 'mobile' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </Button>
                </div>
              </div>

              {/* Preview Container */}
              <div className={`bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg ${
                viewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
              }`}>
                <div className={`bg-white dark:bg-gray-900 ${viewMode === 'mobile' ? 'w-80' : 'w-full'}`}>
                  {/* Hero Section */}
                  <div className={`${previewData.hero.background} text-white p-8 text-center`}>
                    <h1 className="text-2xl font-bold mb-2">{previewData.hero.title}</h1>
                    <p className="text-lg opacity-90 mb-6">{previewData.hero.subtitle}</p>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100">
                      {previewData.hero.cta}
                    </Button>
                  </div>

                  {/* Content Sections */}
                  <div className="p-6 space-y-8">
                    {previewData.sections.map((section: typeof previewData.sections[0], index: number) => (
                      <div key={index}>
                        {section.type === 'features' && (
                          <div>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {section.items.map((item: typeof section.items[0], i: number) => (
                                <div key={i} className="text-center p-4 border rounded-lg">
                                  <h3 className="font-semibold mb-2">{item.title}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.type === 'about' && (
                          <div>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
                          </div>
                        )}

                        {section.type === 'testimonials' && (
                          <div>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {section.items.map((item: typeof section.items[0], i: number) => (
                                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <p className="italic mb-2">&ldquo;{item.quote}&rdquo;</p>
                                  <div className="text-sm">
                                    <span className="font-semibold">{item.name}</span>
                                    <span className="text-gray-600 dark:text-gray-400"> - {item.company}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {section.type === 'products' && (
                          <div>
                            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {section.items.map((item: typeof section.items[0], i: number) => (
                                <div key={i} className="border rounded-lg p-4">
                                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                                  <h3 className="font-semibold mb-1">{item.title}</h3>
                                  <p className="text-lg font-bold text-primary mb-1">{item.price}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Template Info Panel */}
            <div className="w-80 border-l bg-gray-50 dark:bg-gray-800 p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Template Features</h3>
                  <div className="space-y-2">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Color Palette</h3>
                  <div className="flex space-x-2">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full ${
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

                <div>
                  <h3 className="font-semibold mb-3">Perfect For</h3>
                  <div className="space-y-2">
                    {template.category === 'business' && (
                      <>
                        <Badge variant="secondary">Corporate Websites</Badge>
                        <Badge variant="secondary">B2B Services</Badge>
                        <Badge variant="secondary">Consulting</Badge>
                      </>
                    )}
                    {template.category === 'creative' && (
                      <>
                        <Badge variant="secondary">Design Agencies</Badge>
                        <Badge variant="secondary">Portfolio Sites</Badge>
                        <Badge variant="secondary">Creative Studios</Badge>
                      </>
                    )}
                    {template.category === 'ecommerce' && (
                      <>
                        <Badge variant="secondary">Online Stores</Badge>
                        <Badge variant="secondary">Product Sales</Badge>
                        <Badge variant="secondary">Marketplaces</Badge>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  {isSelected ? (
                    <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Selected Template</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => onSelect?.(template.id)} 
                      className="w-full"
                    >
                      Select This Template
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
