'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingCart, 
  Star, 
  Heart, 
  Search, 
  User, 
  Menu,
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  CreditCard,
  ShoppingBag,
  Package,
  TrendingUp,
  Award
} from 'lucide-react'
import { QuickLandFormData } from '@/types'

interface EcommerceTemplateProps {
  formData: QuickLandFormData
}

export function EcommerceTemplate({ formData }: EcommerceTemplateProps) {
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
        className="bg-white shadow-sm border-b sticky top-0 z-50"
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
                <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              )}
              <h1 className="text-xl font-bold text-gray-900">{formData.company_name}</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                <a href="#products" className="text-gray-600 hover:text-green-600 transition-colors">Products</a>
                <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
              </nav>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <Button className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-white/20 text-white mb-4">
                <TrendingUp className="h-4 w-4 mr-2" />
                Best Seller
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {formData.key_messages[0] || `Shop the Best ${formData.industry} Products`}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {formData.business_description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                  {formData.call_to_action}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                  View Products
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">Featured Product</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">(127 reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">$99.99</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        variants={itemVariants}
      >
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                description: "On orders over $50"
              },
              {
                icon: Shield,
                title: "Secure Payment",
                description: "100% secure checkout"
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                description: "30-day return policy"
              },
              {
                icon: CreditCard,
                title: "Multiple Payment",
                description: "All major cards accepted"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={itemVariants}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Products Section */}
      {formData.sections.includes('features') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600">
                {formData.value_propositions[0] || "Quality products at amazing prices"}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Premium Quality",
                  price: 99.99,
                  originalPrice: 129.99,
                  rating: 5,
                  reviews: 127,
                  image: "bg-gradient-to-br from-blue-400 to-blue-600",
                  badge: "Best Seller"
                },
                {
                  name: "Professional Grade",
                  price: 149.99,
                  originalPrice: null,
                  rating: 5,
                  reviews: 89,
                  image: "bg-gradient-to-br from-green-400 to-green-600",
                  badge: "New"
                },
                {
                  name: "Budget Friendly",
                  price: 79.99,
                  originalPrice: 99.99,
                  rating: 4,
                  reviews: 203,
                  image: "bg-gradient-to-br from-purple-400 to-purple-600",
                  badge: "Sale"
                }
              ].map((product, index) => (
                <motion.div
                  key={index}
                  className="group"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className="relative">
                      <div className={`h-64 ${product.image} relative overflow-hidden`}>
                        <div className="absolute top-4 left-4">
                          <Badge className={`${
                            product.badge === 'Best Seller' ? 'bg-green-500' :
                            product.badge === 'New' ? 'bg-blue-500' :
                            'bg-red-500'
                          } text-white`}>
                            {product.badge}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Button variant="ghost" size="sm" className="bg-white/20 hover:bg-white/30">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${
                              i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`} />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      <Button className="w-full group">
                        <ShoppingCart className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                        Add to Cart
                      </Button>
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
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-green-100 text-green-700">
                    <Package className="h-4 w-4 mr-2" />
                    Quality Products
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-blue-100 text-blue-700">
                    <Truck className="h-4 w-4 mr-2" />
                    Fast Shipping
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2 bg-purple-100 text-purple-700">
                    <Award className="h-4 w-4 mr-2" />
                    Trusted Brand
                  </Badge>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
                    <div className="text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
                    <div className="text-gray-600">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                    <div className="text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Reviews Section */}
      {formData.sections.includes('testimonials') && (
        <motion.section 
          className="py-20"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Customer Reviews
              </h2>
              <p className="text-xl text-gray-600">
                See what our customers are saying about our products
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Emma Wilson",
                  rating: 5,
                  quote: "Amazing quality! Fast shipping and excellent customer service. Highly recommended!",
                  product: "Premium Quality"
                },
                {
                  name: "David Brown",
                  rating: 5,
                  quote: "Great product at a great price. Will definitely order again from this store.",
                  product: "Professional Grade"
                },
                {
                  name: "Sarah Johnson",
                  rating: 5,
                  quote: "Perfect! Exactly what I was looking for. The quality exceeded my expectations.",
                  product: "Budget Friendly"
                }
              ].map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border"
                  variants={itemVariants}
                >
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">&quot;{review.quote}&quot;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{review.name}</div>
                      <div className="text-sm text-gray-500">Verified Purchase</div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{review.product}</Badge>
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
          className="py-20 bg-gray-50"
          variants={itemVariants}
        >
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                Have questions? We&apos;re here to help!
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Button className="w-full bg-green-600 hover:bg-green-700">
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
                  <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                )}
                <span className="text-xl font-bold">{formData.company_name}</span>
              </div>
              <p className="text-gray-400 mb-4">
                {formData.business_description}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <User className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>All Products</li>
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Sale Items</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Contact Us</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>support@{formData.company_name.toLowerCase().replace(/\s+/g, '')}.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Commerce Street</li>
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
