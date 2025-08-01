'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ComicCharacter() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 100 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden"
    >
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-black">
        {/* Animated stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Nebula effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500 rounded-full blur-2xl opacity-50"></div>
        </div>
        
        {/* Floating cosmic particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      {/* Character Image */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="comic-panel p-4 bg-gradient-to-br from-green-500/20 to-green-700/20 backdrop-blur-sm group">
          <Image
            src="/image/myimage.png"
            alt="Adeepa Kularathna - Comic Character"
            width={350}
            height={400}
            className="rounded-lg"
            priority
          />
          
          {/* Speech Bubble - Auto appearing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
              y: [20, 0, 0, 20]
            }}
            transition={{
              duration: 4,
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
            className="absolute -top-5 -left-10 bg-white text-black px-6 py-4 rounded-2xl shadow-2xl border-4 border-red-600 z-20 min-w-[280px]"
          >
            <div className="text-center">
              <div className="font-bold text-2xl text-red-600 comic-font">
                "And I... am Adeepa."
              </div>
            </div>
            {/* Speech bubble tail pointing to character */}
            <div className="absolute bottom-[-12px] right-20 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
            <div className="absolute bottom-[-16px] right-[76px] w-0 h-0 border-l-[16px] border-r-[16px] border-t-[16px] border-l-transparent border-r-transparent border-t-red-600"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Cosmic effects around the character */}
      <motion.div
        className="absolute top-10 right-10 text-6xl opacity-80"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        🌌
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-10 text-4xl opacity-70"
        animate={{ 
          rotate: [0, -360],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        🪐
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-5 text-3xl opacity-60"
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      >
        ☄️
      </motion.div>

      <motion.div
        className="absolute top-20 right-1/3 text-2xl opacity-50"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -15, 0],
          rotate: [0, 360]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1.5 }}
      >
        🛸
      </motion.div>

      {/* Floating cosmic comic elements */}
      <motion.div
        className="absolute top-20 left-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm transform -rotate-12 shadow-lg"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [-12, -8, -12],
          boxShadow: ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 10px rgba(59, 130, 246, 0.5)']
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        COSMIC!
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm transform rotate-12 shadow-lg"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [12, 16, 12],
          boxShadow: ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 10px rgba(59, 130, 246, 0.5)']
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      >
        STELLAR!
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-bold text-xs transform rotate-6 shadow-lg"
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [6, 10, 6],
          y: [0, -10, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        GALACTIC!
      </motion.div>
    </motion.div>
  )
}
