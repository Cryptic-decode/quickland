'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

interface PricingCardProps {
  title: string
  description: string
  price: string
  period: string
  features: string[]
  isPopular?: boolean
  ctaText: string
  ctaHref: string
  savings?: string
  index: number
}

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut" as const
    }
  }),
  hover: {
    y: -4,
    scale: 1.01,
    transition: {
      duration: 0.2,
      ease: "easeOut" as const
    }
  }
}

const featureVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4
    }
  })
}

const checkVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 10
    }
  }
}

export function AnimatedPricingCard({
  title,
  description,
  price,
  period,
  features,
  isPopular = false,
  ctaText,
  ctaHref,
  savings,
  index
}: PricingCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      className="relative"
    >
      <Card className={`relative border-2 transition-all duration-300 bg-white dark:bg-gray-800 ${
        isPopular 
          ? 'border-primary shadow-2xl scale-105 dark:shadow-primary/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/30'
      }`}>
        {isPopular && (
          <motion.div 
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
              Most Popular
            </div>
          </motion.div>
        )}
        
        <CardHeader className={`text-center pb-4 ${isPopular ? 'pt-8' : ''}`}>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: "spring", stiffness: 200 }}
          >
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {description}
            </CardDescription>
          </motion.div>
          
          <motion.div 
            className="mt-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
          >
            <div className="text-4xl font-bold text-primary">{price}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{period}</div>
            {savings && (
              <motion.div 
                className="text-xs text-green-600 font-medium mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {savings}
              </motion.div>
            )}
          </motion.div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <motion.ul className="space-y-3 text-sm mb-8">
            {features.map((feature, i) => (
              <motion.li 
                key={feature}
                className="flex items-center"
                variants={featureVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                    isPopular ? 'bg-primary/10' : 'bg-green-100 dark:bg-green-900/20'
                  }`}
                  variants={checkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <Check className={`h-3 w-3 ${
                    isPopular ? 'text-primary' : 'text-green-500'
                  }`} />
                </motion.div>
                <span className={isPopular ? 'font-medium' : ''}>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
          
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Link href={ctaHref} className="block">
              <Button 
                className={`w-full h-12 text-base font-medium ${
                  isPopular 
                    ? 'gradient-primary text-white' 
                    : 'bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90'
                }`}
                variant="default"
              >
                <motion.span
                  className="flex items-center justify-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: isPopular ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {ctaText}
                  {isPopular && <ArrowRight className="ml-2 h-4 w-4" />}
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
