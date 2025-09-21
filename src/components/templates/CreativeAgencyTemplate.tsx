'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Palette, 
  Sparkles, 
  Users, 
  Award, 
  ArrowRight,
  Star,
  CheckCircle,
  Instagram,
  Twitter,
  Linkedin,
  Dribbble,
  Eye,
  Zap,
  Heart
} from 'lucide-react'
import { QuickLandFormData } from '@/types'

interface CreativeAgencyTemplateProps {
  formData: QuickLandFormData
}

export function CreativeAgencyTemplate({ formData }: CreativeAgencyTemplateProps) {
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
        className="bg-white/95 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-100"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {formData.logo_url ? (
                <img 
                  src={formData.logo_url} 
                  alt={formData.company_name}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Palette className="h-6 w-6 text-white" />
                </div>
              )}
              <h1 className="text-xl font-bold text-gray-900">{formData.company_name}</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#work" className="text-gray-600 hover:text-purple-600 transition-colors">Work</a>
              <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
              <a href="#team" className="text-gray-600 hover:text-purple-600 transition-colors">Team</a>
              <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
            </nav>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              {formData.call_to_action}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white py-32 pt-40"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Creative Excellence</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {formData.key_messages[0] || `Creative Solutions for ${formData.industry}`}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {formData.business_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              {formData.call_to_action}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
              View Our Work
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      {formData.sections.includes('features') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Creative Work
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {formData.value_propositions[0] || "Bold designs that make an impact and drive results."}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Brand Identity",
                  category: "Branding",
                  description: "Complete brand makeover for modern companies",
                  image: "bg-gradient-to-br from-purple-400 to-pink-400"
                },
                {
                  title: "Web Design",
                  category: "Digital",
                  description: "Modern, responsive websites that convert",
                  image: "bg-gradient-to-br from-blue-400 to-cyan-400"
                },
                {
                  title: "Marketing Campaign",
                  category: "Marketing",
                  description: "Creative campaigns that engage audiences",
                  image: "bg-gradient-to-br from-orange-400 to-red-400"
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className={`h-64 ${project.image} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Eye className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* About Section */}
      {formData.sections.includes('about') && (
        <motion.section 
          className="py-20 bg-gray-50"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  We're Creative Minds
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {formData.business_description}
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  We serve {formData.target_audience} with creative solutions that {formData.business_goals}.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-purple-100 text-purple-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Creative Design
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-pink-100 text-pink-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Innovation
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-orange-100 text-orange-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Passion
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                    <div className="text-3xl font-bold mb-2">150+</div>
                    <div className="text-sm opacity-90">Projects Completed</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-sm opacity-90">Happy Clients</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-sm opacity-90">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Team Section */}
      {formData.sections.includes('testimonials') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Meet Our Creative Team
              </h2>
              <p className="text-xl text-gray-600">
                Talented individuals working together to bring your vision to life
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Creative Director",
                  image: "bg-gradient-to-br from-purple-400 to-pink-400",
                  description: "Visionary leader with 10+ years in creative direction"
                },
                {
                  name: "Mike Chen",
                  role: "Lead Designer",
                  image: "bg-gradient-to-br from-blue-400 to-cyan-400",
                  description: "Award-winning designer specializing in brand identity"
                },
                {
                  name: "Emily Davis",
                  role: "Art Director",
                  image: "bg-gradient-to-br from-orange-400 to-red-400",
                  description: "Creative problem-solver with a passion for innovation"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={itemVariants}
                >
                  <div className={`w-32 h-32 ${member.image} rounded-full mx-auto mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Process Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Creative Process
            </h2>
            <p className="text-xl text-gray-600">
              How we bring your ideas to life
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "We dive deep into understanding your brand, goals, and vision"
              },
              {
                step: "02",
                title: "Design",
                description: "Creating amazing visuals and experiences that tell your story"
              },
              {
                step: "03",
                title: "Launch",
                description: "Bringing everything together and launching your project"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      {formData.sections.includes('contact') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Let's Create Something Amazing
              </h2>
              <p className="text-xl text-gray-600">
                Ready to bring your vision to life? Let's talk about your project.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Start Your Project Today</h3>
                <p className="text-lg mb-6 opacity-90">
                  Get a free consultation and see how we can help your business grow.
                </p>
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                  {formData.call_to_action}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
                  <img 
                    src={formData.logo_url} 
                    alt={formData.company_name}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Palette className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="text-xl font-bold">{formData.company_name}</span>
              </div>
              <p className="text-gray-400 mb-4">
                {formData.business_description}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Dribbble className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Brand Identity</li>
                <li>Web Design</li>
                <li>Marketing</li>
                <li>Consulting</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Our Team</li>
                <li>Portfolio</li>
                <li>Contact</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@{formData.company_name.toLowerCase().replace(/\s+/g, '')}.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Creative District, City</li>
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
