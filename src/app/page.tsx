'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card' // TODO: Add when needed
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { AnimatedHero } from '@/components/ui/animated-hero'
import { AnimatedPricingCard } from '@/components/ui/animated-pricing-card'
import { AnimatedTestimonial } from '@/components/ui/animated-testimonial'
import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'

export default function HomePage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="gradient-text">QuickLand</span>
          </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create professional landing pages in minutes with AI. No design skills required.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <AnimatedHero />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <AnimatedFeatureCard
            icon={Zap}
            title="AI-Powered"
            description="Our AI generates professional content and layouts based on your business details."
            index={0}
          />
          <AnimatedFeatureCard
            icon={Clock}
            title="Lightning Fast"
            description="Create a complete landing page in under 5 minutes. No waiting, no delays."
            index={1}
          />
          <AnimatedFeatureCard
            icon={Shield}
            title="Professional Quality"
            description="Every page is optimized for conversions, mobile-responsive, and SEO-ready."
            index={2}
          />
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedTestimonial
              name="Sarah O."
              company="Fayoade Farms"
              location="Lagos"
              content="QuickLand saved us weeks of development time. Our landing page went live in minutes and looks incredibly professional."
              initials="SO"
              gradient="bg-gradient-to-r from-purple-400 to-blue-400"
              index={0}
            />
            <AnimatedTestimonial
              name="Michael A."
              company="NotTech Ltd"
              location="Abuja"
              content="The AI content generation is amazing. It understood our business and created copy that actually converts visitors into customers."
              initials="MA"
              gradient="bg-gradient-to-r from-green-400 to-blue-400"
              index={1}
            />
            <AnimatedTestimonial
              name="Aisha B."
              company="PodMagic Media"
              location="Port Harcourt"
              content="Finally, a tool that doesn't require design skills. Our landing page looks like it was made by a professional agency."
              initials="AB"
              gradient="bg-gradient-to-r from-pink-400 to-purple-400"
              index={2}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-16">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees, cancel anytime.
            </p>
          </div>

                  {/* Pricing Cards */}
                  <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                    <AnimatedPricingCard
                      title="Basic"
                      description="Perfect for getting started"
                      price="₦30,000"
                      period="One-time payment"
                      features={[
                        "3 Professional Templates",
                        "AI Content Generation",
                        "Download HTML/ZIP",
                        "Email Support",
                        "Mobile Responsive",
                        "Basic Analytics"
                      ]}
                      ctaText="Get Started"
                      ctaHref="/signup"
                      index={0}
                    />
                    <AnimatedPricingCard
                      title="Standard"
                      description="For growing businesses"
                      price="₦50,000"
                      period="One-time payment"
                      features={[
                        "All 5 Premium Templates",
                        "Advanced AI Features",
                        "Hosting & Deployment Service",
                        "Custom Domain Setup",
                        "Priority Support",
                        "Advanced Analytics",
                        "Unlimited Pages"
                      ]}
                      isPopular={true}
                      ctaText="Get Started"
                      ctaHref="/signup"
                      index={1}
                    />
                    <AnimatedPricingCard
                      title="Pro"
                      description="For established businesses"
                      price="₦85,000"
                      period="Per month"
                      features={[
                        "Everything in Standard",
                        "Full Site Maintenance",
                        "Hosted on Our Servers",
                        "Continuous Updates",
                        "Dedicated Support",
                        "Custom Integrations",
                        "SLA Guarantee"
                      ]}
                      ctaText="Contact Sales"
                      ctaHref="/contact"
                      index={2}
                    />
                  </div>

                  {/* Comparison Table */}
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-2xl p-8 max-w-4xl mx-auto border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
            <motion.h3 
              className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              Feature Comparison
            </motion.h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-white">Features</th>
                            <th className="text-center py-4 px-2 font-semibold text-gray-900 dark:text-white">Basic</th>
                            <th className="text-center py-4 px-2 font-semibold text-primary">Standard</th>
                            <th className="text-center py-4 px-2 font-semibold text-gray-900 dark:text-white">Pro</th>
                          </tr>
                        </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">Templates</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">3</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">5</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">5</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">AI Content Generation</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">✓</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">✓ Advanced</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">✓ Advanced</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">Hosting & Deployment</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">Self-hosted</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">✓ Service</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">✓ Managed</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">Site Maintenance</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">-</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">-</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">✓ Full Service</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">Analytics</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">Basic</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">Advanced</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">Advanced</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium text-gray-900 dark:text-white">Support</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">Email</td>
                    <td className="text-center py-4 px-2 font-medium text-primary">Priority</td>
                    <td className="text-center py-4 px-2 text-gray-600 dark:text-gray-300">Dedicated</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

                {/* CTA */}
                <motion.div 
                  className="text-center bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
          <motion.h2 
            className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to create your landing page?
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join hundreds of businesses already using QuickLand
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-6 relative overflow-hidden group">
                <motion.span
                  className="relative z-10 flex items-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 QuickLand. All rights reserved.</p>
        </div>
      </footer>
    </motion.div>
  )
}