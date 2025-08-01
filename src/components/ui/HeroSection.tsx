'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import ComicCharacter from './ComicCharacter'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-16">
      {/* Background comic effects */}
      <div className="absolute inset-0 comic-dots" />
      <div className="absolute inset-0 halftone-bg" />
      
      {/* Comic book panels background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-3 grid-rows-3 h-full gap-4 p-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border-2 border-white rounded-lg" />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
        

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-center lg:text-left"
            >
              <span className="text-white block mb-2">Hello, I'm</span>
              <div className="block">
                <span className="text-white">Adeep</span>
                <motion.span 
                  className="text-red-500"
                  animate={{ 
                    textShadow: [
                      "0 0 10px #ED1D24",
                      "0 0 20px #ED1D24, 0 0 30px #ED1D24",
                      "0 0 10px #ED1D24"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  a.K
                </motion.span>
                <span className="text-white">ularathna</span>
              </div>
            </motion.h1>

            {/* Subtitle with action text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mb-8"
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-2">
                Developer and Designer
              </p>
              <motion.p 
                className="text-base md:text-lg text-cyan-400 mb-4 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                🌟 Differently Abled • Accessibility Champion
              </motion.p>
              <motion.p 
                className="text-sm md:text-base text-gray-400 max-w-lg mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                Creating inclusive digital experiences and proving that innovation knows no boundaries
              </motion.p>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hero-button"
              >
                View My Work
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-3 border-blue-500 text-blue-400 hover:bg-blue-500/20 rounded-lg font-bold uppercase tracking-wider transition-all duration-300"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side - Comic Character */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <ComicCharacter />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60"
        >
          <span className="text-sm uppercase tracking-wider mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Floating comic elements */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-10 text-6xl opacity-20"
      >
        💥
      </motion.div>
      
      <motion.div
        animate={{ 
          rotate: [0, -5, 5, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-10 text-4xl opacity-20"
      >
        ⚡
      </motion.div>
    </section>
  )
}
