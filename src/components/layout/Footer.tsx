'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Adeepa Kularathna
              </span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-md">
              Crafting digital experiences with passion and precision. Bringing together remarkable technologies to create something extraordinary.
            </p>
            <div className="action-text text-cyan-400 text-xs">
              BUILDING THE FUTURE!
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Home
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                About
              </Link>
              <Link href="/portafolio" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Portfolio
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Blog
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Contact
              </Link>
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:adeepashashintha@gmail.com"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">adeepashashintha@gmail.com</span>
              </motion.a>
              
              <motion.a
                href="tel:+94764881254"
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-2 text-gray-300 hover:text-green-400 transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+94 76 488 1254</span>
              </motion.a>
              
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Sri Lanka</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 pt-8 border-t border-gray-700/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/AdeepaK2"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
              >
                <Github className="w-5 h-5 text-white" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/adeepakularathna/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
              </motion.a>
              
              <motion.a
                href="mailto:adeepashashintha@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-cyan-400" />
              </motion.a>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>© {currentYear} Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>by Adeepa Kularathna</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
