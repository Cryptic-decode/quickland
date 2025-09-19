'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/ui/logo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Plus, FileText, Settings, LogOut, Sparkles, Zap, Clock, Shield } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

// Animation variants
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

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  // Simple client-side protection
  useEffect(() => {
    if (!user) {
      router.push('/signin')
    }
  }, [user, router])

  // Show loading while checking auth
  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Signed out successfully')
    } catch {
      toast.error('Sign out failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Fixed Premium Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200/60 dark:border-gray-700/60"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5 dark:from-primary/10 dark:via-transparent dark:to-blue-500/10" />
        
        <div className="relative container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            {/* Left Section - Brand */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Logo size="md" />
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">QuickLand Control Center</p>
              </div>
            </motion.div>

            {/* Right Section - User Actions */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* User Profile */}
              <motion.div 
                className="hidden md:flex items-center space-x-3 px-4 py-2 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {(user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ThemeToggle />
              </motion.div>

              {/* Sign Out Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="group border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-4 w-4 mr-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                  <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Sign Out</span>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile User Info */}
          <motion.div 
            className="md:hidden mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {(user?.user_metadata?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content with Header Spacing */}
      <motion.main 
        className="container mx-auto px-6 py-12 pt-36"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Welcome Section */}
        <motion.div className="mb-16" variants={itemVariants}>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="inline-flex items-center space-x-3 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="h-7 w-7 text-primary" />
              <span className="text-primary text-2xl font-semibold">Welcome Back!</span>
            </motion.div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Ready to create something amazing?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Build professional landing pages in minutes with our AI-powered builder. 
              Your next conversion is just a click away.
            </p>
          </div>
        </motion.div>

        {/* Quick Actions Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your landing pages
            </p>
          </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
          <motion.div variants={cardVariants}>
            <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-xl"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Plus className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">Create New Page</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Start building your landing page</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/create">
                  <Button className="w-full group-hover:shadow-lg transition-all duration-300">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FileText className="h-6 w-6 text-green-600" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">My Pages</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">View and manage your pages</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/pages">
                  <Button variant="outline" className="w-full group-hover:shadow-lg transition-all duration-300">
                    <FileText className="h-4 w-4 mr-2" />
                    View Pages
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="h-full hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Settings className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">Settings</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">Manage your account</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full group-hover:shadow-lg transition-all duration-300">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
          </motion.div>
        </motion.div>

        {/* Recent Activity & Getting Started Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Workspace
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Manage your pages and learn how to create amazing landing pages
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <motion.div variants={cardVariants}>
              <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white text-xl">Recent Activity</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Your latest landing page creations</CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      className="relative mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    >
                      <FileText className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                      <motion.div
                        className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="h-2.5 w-2.5 text-white" />
                      </motion.div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No pages created yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first landing page to get started</p>
                    <Link href="/dashboard/create">
                      <Button className="group">
                        <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        Create Your First Page
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Getting Started */}
            <motion.div variants={cardVariants}>
              <Card className="h-full bg-gradient-to-br from-primary/5 via-blue-50/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-800/50 dark:to-gray-800/50 backdrop-blur-sm border-primary/20 dark:border-primary/30">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <CardTitle className="text-gray-900 dark:text-white text-xl">How It Works</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Our AI-powered process makes landing page creation effortless
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Clock,
                        title: "Fill out the form",
                        description: "Provide your business details, industry, and preferences",
                        color: "from-blue-500/20 to-cyan-500/20"
                      },
                      {
                        icon: Zap,
                        title: "AI generates your page",
                        description: "Our AI creates professional content and layout for your business",
                        color: "from-purple-500/20 to-pink-500/20"
                      },
                      {
                        icon: Shield,
                        title: "Preview and deploy",
                        description: "Review your page and deploy it live or download the files",
                        color: "from-green-500/20 to-emerald-500/20"
                      }
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <motion.div
                          className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <step.icon className="h-4 w-4 text-primary" />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{step.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Link href="/dashboard/create">
                      <Button className="w-full group">
                        <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        Create Your First Page
                      </Button>
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </motion.main>

      {/* Simple Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Logo size="sm" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                © 2024 QuickLand. Built for businesses worldwide.
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/dashboard/create" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                Create Page
              </Link>
              <Link href="/dashboard/pages" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                My Pages
              </Link>
              <Link href="/dashboard/settings" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

