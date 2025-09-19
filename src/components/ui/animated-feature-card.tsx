'use client'

import { motion } from 'framer-motion'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
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
    y: -6,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      type: "spring",
      stiffness: 200
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.2
    }
  }
}

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.4
    }
  }
}

export function AnimatedFeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
    >
      <Card className="h-full hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors duration-300"
          >
            <Icon className="h-8 w-8 text-primary" />
          </motion.div>
          
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </CardDescription>
          </motion.div>
        </CardHeader>
      </Card>
    </motion.div>
  )
}
