'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, User, FileText, Mail } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/', icon: Zap },
  { name: 'About', href: '/about', icon: User },
  { name: 'Portfolio', href: '/portafolio', icon: FileText },
  { name: 'Blog', href: '/blog', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export default function MarvelNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b-2 border-red-500/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="logo-font text-xl font-bold">
                <span className="text-white">adeep</span>
                <span className="text-red-500">a.k</span>
                <span className="text-white">ularathna</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    className="group relative px-4 py-2 text-white hover:text-red-500 transition-colors duration-300"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <item.icon size={18} />
                      <span className="font-medium uppercase tracking-wider">{item.name}</span>
                    </span>
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-red-500/20 rounded-lg"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Comic book underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:text-red-500 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-red-500/30"
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-white hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                    >
                      <item.icon size={20} />
                      <span className="font-medium uppercase tracking-wider">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Comic-style background effect */}
      <div className="fixed top-0 left-0 right-0 h-16 -z-10">
        <div className="absolute inset-0 comic-dots opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-blue-500/5 to-yellow-500/5" />
      </div>
    </>
  )
}
