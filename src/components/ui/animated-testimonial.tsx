'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface TestimonialProps {
  name: string
  company: string
  location: string
  content: string
  initials: string
  gradient: string
  index: number
}

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const starVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: (i: number) => ({
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.5 + i * 0.1,
      duration: 0.4,
      type: "spring",
      stiffness: 200
    }
  })
}

const avatarVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.8,
      duration: 0.5,
      type: "spring",
      stiffness: 200
    }
  }
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6,
      duration: 0.5
    }
  }
}

export function AnimatedTestimonial({
  name,
  company,
  location,
  content,
  initials,
  gradient,
  index
}: TestimonialProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          {/* Animated Stars */}
          <motion.div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current mr-1"
                variants={starVariants}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 15,
                  transition: { duration: 0.2 }
                }}
              >
                <svg viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Text */}
          <motion.p 
            className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            "{content}"
          </motion.p>

          {/* Animated Avatar and Info */}
          <motion.div 
            className="flex items-center"
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 ${gradient}`}
              whileHover={{ 
                scale: 1.05, 
                rotate: 3,
                transition: { duration: 0.2 }
              }}
            >
              {initials}
            </motion.div>
            <div>
              <motion.div 
                className="font-semibold text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                {name}
              </motion.div>
              <motion.div 
                className="text-sm text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
              >
                {company}, {location}
              </motion.div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
