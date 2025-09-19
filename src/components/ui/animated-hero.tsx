'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
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
      ease: "easeOut"
    }
  }
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

const sparkleVariants = {
  animate: {
    rotate: [0, 180, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function AnimatedHero() {
  return (
    <motion.div
      className="text-center mb-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Sparkles */}
      <div className="relative">
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 text-yellow-400 opacity-60"
          variants={sparkleVariants}
          animate="animate"
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute -top-2 -right-8 w-6 h-6 text-purple-400 opacity-40"
          variants={sparkleVariants}
          animate="animate"
          transition={{ delay: 1 }}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
        <motion.div
          className="absolute top-8 -right-4 w-4 h-4 text-blue-400 opacity-50"
          variants={sparkleVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <Sparkles className="w-full h-full" />
        </motion.div>
      </div>

      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        variants={itemVariants}
      >
        Landing Pages in{' '}
        <motion.span 
          className="gradient-text relative inline-block"
          variants={floatingVariants}
          animate="animate"
        >
          Minutes
        </motion.span>
      </motion.h1>

      <motion.p 
        className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        variants={itemVariants}
      >
        Create professional landing pages instantly with AI. No design skills required. 
        Perfect for Nigerian businesses.
      </motion.p>
      
      {/* Animated Stats */}
      <motion.div 
        className="flex flex-wrap justify-center items-center gap-8 mb-8 text-sm text-gray-600 dark:text-gray-400"
        variants={itemVariants}
      >
        {[
          { color: "bg-green-500", text: "500+ Pages Created" },
          { color: "bg-blue-500", text: "98% Success Rate" },
          { color: "bg-purple-500", text: "5min Average Time" }
        ].map((stat, index) => (
          <motion.div 
            key={stat.text}
            className="flex items-center space-x-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
          >
            <motion.div 
              className={`w-2 h-2 ${stat.color} rounded-full`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
            />
            <span>{stat.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="space-x-4 mb-12"
        variants={itemVariants}
      >
        <Link href="/signup">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="text-lg px-8 py-6 relative overflow-hidden group">
              <motion.span
                className="relative z-10 flex items-center"
                initial={{ x: 0 }}
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </Link>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            View Examples
          </Button>
        </motion.div>
      </motion.div>

      {/* Animated Customer Logos */}
      <motion.div 
        className="mb-16"
        variants={itemVariants}
      >
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Trusted by Nigerian businesses
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {["Fayoade Farms", "BillBaze", "NotTech Ltd", "PodMagic Media", "+50 More"].map((company, index) => (
            <motion.div
              key={company}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg px-6 py-3 text-gray-600 dark:text-gray-300 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ 
                opacity: 1, 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              {company}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
