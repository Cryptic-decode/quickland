'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ArrowRight, Zap, Clock, Shield, CheckCircle, Star } from 'lucide-react'
import Link from 'next/link'

interface AnimatedAuthFormProps {
  type: 'signin' | 'signup'
  onSubmit: (e: React.FormEvent) => void
  email: string
  setEmail: (value: string) => void
  password: string
  setPassword: (value: string) => void
  fullName?: string
  setFullName?: (value: string) => void
  companyName?: string
  setCompanyName?: (value: string) => void
  loading: boolean
  error: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

const sparkleVariants = {
  animate: {
    rotate: [0, 180, 360],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
}

export function AnimatedAuthForm({
  type,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  companyName,
  setCompanyName,
  loading,
  error
}: AnimatedAuthFormProps) {
  const isSignUp = type === 'signup'

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      {/* Header */}
      <motion.header 
        className="container mx-auto px-4 py-6 relative z-10"
        variants={itemVariants}
      >
        <nav className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <Logo size="md" />
            </Link>
          </motion.div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={isSignUp ? "/signin" : "/signup"}>
                <Button variant="ghost">
                  {isSignUp ? "Sign In" : "Create Account"}
                </Button>
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      <div className="container mx-auto px-4 py-8 lg:py-12 relative z-10">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Hero Section */}
          <motion.div 
            className="text-center space-y-6"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 dark:text-white leading-tight"
                variants={floatingVariants}
                animate="animate"
              >
                {isSignUp ? "Create Landing Pages in" : "Welcome back to"}{' '}
                <span className="gradient-text">QuickLand</span>
              </motion.h1>
              
              {/* Floating Sparkles */}
              <motion.div
                className="absolute -top-2 -right-4 w-6 h-6 text-yellow-400 opacity-60"
                variants={sparkleVariants}
                animate="animate"
              >
                <Star className="w-full h-full" />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              variants={itemVariants}
            >
              {isSignUp 
                ? "Join thousands of businesses using QuickLand to create professional, AI-powered landing pages that convert visitors into customers."
                : "Continue creating amazing landing pages that convert visitors into customers."
              }
            </motion.p>
          </motion.div>

          {/* Animated Form */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-full shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="text-center space-y-2">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <CardTitle className="text-2xl font-bold">
                    {isSignUp ? "Get Started Free" : "Welcome Back"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {isSignUp ? "Create your first landing page today" : "Sign in to continue building"}
                  </CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.form 
                  onSubmit={onSubmit} 
                  className="space-y-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {isSignUp && (
                    <motion.div 
                      className="grid grid-cols-2 gap-4"
                      variants={itemVariants}
                    >
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id="fullName"
                            type="text"
                            value={fullName || ''}
                            onChange={(e) => setFullName?.(e.target.value)}
                            required
                            className="h-12 text-base"
                            placeholder="John Doe"
                          />
                        </motion.div>
                      </div>
                      
                      <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company
                        </label>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Input
                            id="companyName"
                            type="text"
                            value={companyName || ''}
                            onChange={(e) => setCompanyName?.(e.target.value)}
                            required
                            className="h-12 text-base"
                            placeholder="Acme Corp"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 text-base"
                        placeholder="john@company.com"
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <PasswordInput
                        id="password"
                        value={password}
                        onChange={setPassword}
                        required
                        className="h-12 text-base"
                        placeholder="••••••••"
                      />
                    </motion.div>
                  </motion.div>
                  
                  
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-medium relative overflow-hidden group" 
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div 
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div 
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>{isSignUp ? "Creating account..." : "Signing in..."}</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          className="flex items-center space-x-2 relative z-10"
                          initial={{ x: 0 }}
                          whileHover={{ x: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </motion.span>
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </motion.form>
                
                <motion.div 
                  className="mt-6 text-center"
                  variants={itemVariants}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        href={isSignUp ? "/signin" : "/signup"} 
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {isSignUp ? "Sign in here" : "Create one here"}
                      </Link>
                    </motion.span>
                  </p>
                </motion.div>

                {/* Trust Indicators for Sign Up */}
                {isSignUp && (
                  <motion.div 
                    className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                      {[
                        { icon: CheckCircle, text: "Free to start" },
                        { icon: CheckCircle, text: "No credit card" },
                        { icon: CheckCircle, text: "Cancel anytime" }
                      ].map((item, index) => (
                        <motion.div 
                          key={item.text}
                          className="flex items-center space-x-1"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          <item.icon className="h-3 w-3 text-green-500" />
                          <span>{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Animated Features */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl font-semibold text-center text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Why Choose QuickLand?
            </motion.h3>
            <div className="space-y-4">
              {[
                { icon: Zap, text: "AI-powered content generation" },
                { icon: Clock, text: "Ready in under 5 minutes" },
                { icon: Shield, text: "Professional, mobile-responsive designs" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center space-x-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-gray-700/20"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Proof for Sign Up */}
          {isSignUp && (
            <motion.div 
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 text-center"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center justify-center space-x-4 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white dark:border-gray-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.1, type: "spring", stiffness: 200 }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <Star className="w-full h-full" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.9/5 rating</span>
              </motion.div>
              <motion.p 
                className="text-sm text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                &quot;QuickLand saved us weeks of development time. Our landing page went live in minutes and looks incredibly professional.&quot;
              </motion.p>
              <motion.p 
                className="text-xs text-gray-500 dark:text-gray-500 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                - Sarah O., Lagos
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Desktop Layout - Same as before but with animations */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Hero Content */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-6" variants={itemVariants}>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {isSignUp ? "Create Landing Pages in" : "Welcome back to"}{' '}
                <motion.span 
                  className="gradient-text"
                  variants={floatingVariants}
                  animate="animate"
                >
                  QuickLand
                </motion.span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {isSignUp 
                  ? "Join thousands of businesses using QuickLand to create professional, AI-powered landing pages that convert visitors into customers."
                  : "Continue creating amazing landing pages that convert visitors into customers."
                }
              </p>
            </motion.div>

            {/* Features */}
            <motion.div className="space-y-4" variants={itemVariants}>
              {[
                { icon: Zap, text: "AI-powered content generation" },
                { icon: Clock, text: "Ready in under 5 minutes" },
                { icon: Shield, text: "Professional, mobile-responsive designs" }
              ].map((feature, index) => (
                <motion.div 
                  key={feature.text}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats for Sign In */}
            {!isSignUp && (
              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
                variants={itemVariants}
              >
                <div className="grid grid-cols-3 gap-6 text-center">
                  {[
                    { number: "500+", label: "Pages Created" },
                    { number: "98%", label: "Success Rate" },
                    { number: "5min", label: "Average Time" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      <div className="text-2xl font-bold text-primary">{stat.number}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Social Proof for Sign Up */}
            {isSignUp && (
              <motion.div 
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/20"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center space-x-4 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div 
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 border-2 border-white dark:border-gray-800"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 200 }}
                      />
                    ))}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <Star className="w-full h-full" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">4.9/5 rating</span>
                </motion.div>
                <motion.p 
                  className="text-sm text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  &quot;QuickLand saved us weeks of development time. Our landing page went live in minutes and looks incredibly professional.&quot;
                </motion.p>
                <motion.p 
                  className="text-xs text-gray-500 dark:text-gray-500 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  - Sarah O., Lagos
                </motion.p>
              </motion.div>
            )}
          </motion.div>

          {/* Right Side - Form */}
          <motion.div 
            className="flex justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-2xl font-bold">
                      {isSignUp ? "Get Started Free" : "Welcome Back"}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {isSignUp ? "Create your first landing page today" : "Sign in to continue building"}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.form 
                    onSubmit={onSubmit} 
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {isSignUp && (
                      <motion.div 
                        className="grid grid-cols-2 gap-4"
                        variants={itemVariants}
                      >
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name
                          </label>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Input
                              id="fullName"
                              type="text"
                              value={fullName || ''}
                              onChange={(e) => setFullName?.(e.target.value)}
                              required
                              className="h-11"
                              placeholder="John Doe"
                            />
                          </motion.div>
                        </div>
                        
                        <div>
                          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Company
                          </label>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Input
                              id="companyName"
                              type="text"
                              value={companyName || ''}
                              onChange={(e) => setCompanyName?.(e.target.value)}
                              required
                              className="h-11"
                              placeholder="Acme Corp"
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-11"
                          placeholder="john@company.com"
                        />
                      </motion.div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <PasswordInput
                          id="password"
                          value={password}
                          onChange={setPassword}
                          required
                          className="h-11"
                          placeholder="••••••••"
                        />
                      </motion.div>
                    </motion.div>
                    
                    {error && (
                      <motion.div 
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}
                    
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full h-11 text-base font-medium relative overflow-hidden group" 
                        disabled={loading}
                      >
                        {loading ? (
                          <motion.div 
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <motion.div 
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <span>{isSignUp ? "Creating account..." : "Signing in..."}</span>
                          </motion.div>
                        ) : (
                          <motion.span
                            className="flex items-center space-x-2 relative z-10"
                            initial={{ x: 0 }}
                            whileHover={{ x: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span>{isSignUp ? "Create Account" : "Sign In"}</span>
                            <ArrowRight className="h-4 w-4" />
                          </motion.span>
                        )}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
                  </motion.form>
                  
                  <motion.div 
                    className="mt-6 text-center"
                    variants={itemVariants}
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link 
                          href={isSignUp ? "/signin" : "/signup"} 
                          className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          {isSignUp ? "Sign in here" : "Create one here"}
                        </Link>
                      </motion.span>
                    </p>
                  </motion.div>

                  {/* Trust Indicators for Sign Up */}
                  {isSignUp && (
                    <motion.div 
                      className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                      variants={itemVariants}
                    >
                      <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
                        {[
                          { icon: CheckCircle, text: "Free to start" },
                          { icon: CheckCircle, text: "No credit card" },
                          { icon: CheckCircle, text: "Cancel anytime" }
                        ].map((item, index) => (
                          <motion.div 
                            key={item.text}
                            className="flex items-center space-x-1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <item.icon className="h-3 w-3 text-green-500" />
                            <span>{item.text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
