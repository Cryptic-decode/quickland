'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  Star, 
  Users, 
  Award, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react'
import { QuickLandFormData } from '@/types'

interface BusinessProfessionalTemplateProps {
  formData: QuickLandFormData
}

export function BusinessProfessionalTemplate({ formData }: BusinessProfessionalTemplateProps) {
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
      className="min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm border-b"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {formData.logo_url ? (
                <Image 
                  src={formData.logo_url} 
                  alt={formData.company_name || 'Company logo'}
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {formData.company_name.charAt(0)}
                  </span>
                </div>
              )}
              <h1 className="text-xl font-bold text-gray-900">{formData.company_name}</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
              <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
            </nav>
            <Button className="bg-primary hover:bg-primary/90">
              {formData.call_to_action}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {formData.key_messages[0] || `Transform Your ${formData.industry} Business`}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {formData.business_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              {formData.call_to_action}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      {formData.sections.includes('features') && (
        <motion.section 
          className="py-20 bg-gray-50"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose {formData.company_name}?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {formData.value_propositions[0] || "We deliver exceptional results through innovative solutions and dedicated support."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Proven Expertise",
                  description: "20+ years of industry experience"
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Always here when you need us"
                },
                {
                  icon: Award,
                  title: "Award Winning",
                  description: "Recognized for excellence"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* About Section */}
      {formData.sections.includes('about') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About {formData.company_name}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {formData.business_description}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We serve {formData.target_audience} with a focus on {formData.business_goals}.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Professional Service
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Users className="h-4 w-4 mr-2" />
                    Expert Team
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Trusted Results
                  </Badge>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">98%</div>
                    <div className="text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">20+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Testimonials Section */}
      {formData.sections.includes('testimonials') && (
        <motion.section 
          className="py-20 bg-gray-50"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Don&apos;t just take our word for it - hear from our satisfied customers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  company: "Tech Corp",
                  quote: "Outstanding service and results! They transformed our business completely.",
                  rating: 5
                },
                {
                  name: "Mike Chen",
                  company: "StartupXYZ",
                  quote: "Professional, reliable, and always delivers on time. Highly recommended!",
                  rating: 5
                },
                {
                  name: "Emily Davis",
                  company: "Growth Inc",
                  quote: "The best investment we've made for our business. Exceptional value.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm"
                  variants={itemVariants}
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      {formData.sections.includes('contact') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                Ready to get started? Contact us today for a free consultation.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@{formData.company_name.toLowerCase().replace(/\s+/g, '')}.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">123 Business Street<br />City, State 12345</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <Button className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-12"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {formData.logo_url ? (
                  <Image 
                    src={formData.logo_url} 
                    alt={formData.company_name || 'Company logo'}
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      {formData.company_name.charAt(0)}
                    </span>
                  </div>
                )}
                <span className="text-xl font-bold">{formData.company_name}</span>
              </div>
              <p className="text-gray-400">
                {formData.business_description}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Consulting</li>
                <li>Implementation</li>
                <li>Support</li>
                <li>Training</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+1 (555) 123-4567</li>
                <li>info@{formData.company_name.toLowerCase().replace(/\s+/g, '')}.com</li>
                <li>123 Business Street</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {formData.company_name}. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}
