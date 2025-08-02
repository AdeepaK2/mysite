'use client'

import { motion } from 'framer-motion'
import { GraduationCap, School, User, Calendar, Briefcase, MapPin } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background comic effects */}
      <div className="absolute inset-0 comic-dots opacity-10" />
      <div className="absolute inset-0 halftone-bg opacity-5" />
      
      {/* Comic book panels background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-4 grid-rows-4 h-full gap-6 p-8">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="border-2 border-blue-500 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 text-center"
            animate={{
              textShadow: [
                "0 0 10px #3B82F6",
                "0 0 20px #3B82F6, 0 0 30px #3B82F6",
                "0 0 10px #3B82F6"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-white">About </span>
            <span className="text-blue-500">Me</span>
          </motion.h2>
          
          {/* Comic-style action bubble */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-3 shadow-lg mb-8"
          >
            GET TO KNOW THE HERO!
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left side - About Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="comic-panel p-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-3xl font-bold text-white">Who Am I?</h3>
              </div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 leading-relaxed mb-6"
              >
                Third-year IT undergraduate with a strong work ethic, leadership experience, and a passion for
                learning. Creative and resilient, turning challenges into opportunities.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                Differently abled, bringing a unique perspective and strength to every experience. Eager to grow, 
                collaborate, and build meaningful solutions—guided by curiosity and a mindset of continuous improvement.
              </motion.p>

              {/* Floating comic elements */}
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-bold text-xs transform rotate-12 shadow-lg"
              >
                UNIQUE!
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Education */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            
            {/* University */}
            <div className="comic-panel p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm relative">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-8 h-8 text-green-400 mr-3" />
                <h3 className="text-3xl font-bold text-white">Education</h3>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="border-l-4 border-blue-500 pl-6 py-4">
                  <h4 className="text-xl font-bold text-blue-400 mb-2">University of Moratuwa</h4>
                  <p className="text-lg text-white font-semibold mb-1">Bachelor of Science - BSc. (Hons), IT</p>
                  <div className="flex items-center text-gray-300 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Mar 2023 - Mar 2027</span>
                  </div>
                  <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Currently Level 3 Undergraduate
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <div className="border-l-4 border-red-500 pl-6 py-4">
                  <div className="flex items-center">
                    <School className="w-6 h-6 text-red-400 mr-3" />
                    <h4 className="text-xl font-bold text-red-400">Royal College Colombo</h4>
                  </div>
                </div>
              </motion.div>

              {/* Floating comic elements */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full font-bold text-xs transform -rotate-12 shadow-lg"
              >
                LEARNING!
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Professional Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <motion.h3
              className="text-4xl md:text-5xl font-bold mb-4"
              animate={{
                textShadow: [
                  "0 0 10px #F59E0B",
                  "0 0 20px #F59E0B, 0 0 30px #F59E0B",
                  "0 0 10px #F59E0B"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white">Professional </span>
              <span className="text-yellow-500">Experience</span>
            </motion.h3>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-full font-bold text-lg transform rotate-3 shadow-lg"
            >
              WORK EXPERIENCE UNLOCKED!
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Summer Intern */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">Summer Intern</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-purple-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-lg font-semibold">attune, Rizing Company</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Jul 2023</span>
                </div>
              </div>

              {/* Floating comic element */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold text-xs transform rotate-12 shadow-lg"
              >
                FIRST JOB!
              </motion.div>
            </motion.div>

            {/* Freelance Developer */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-orange-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">Freelance Full Stack Developer</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Aug 2024 - Present</span>
                </div>
                <span className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  Currently Active
                </span>
              </div>

              {/* Floating comic element */}
              <motion.div
                animate={{ 
                  y: [0, -8, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-bold text-xs transform -rotate-12 shadow-lg"
              >
                FREELANCER!
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

                {/* Volunteering Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <motion.h3
              className="text-4xl md:text-5xl font-bold mb-4"
              animate={{
                textShadow: [
                  "0 0 10px #10B981",
                  "0 0 20px #10B981, 0 0 30px #10B981",
                  "0 0 10px #10B981"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-white">Volunteering </span>
              <span className="text-green-500">Experience</span>
            </motion.h3>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1.0, type: "spring", bounce: 0.5 }}
              viewport={{ once: true }}
              className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold text-lg transform -rotate-2 shadow-lg"
            >
              COMMUNITY HERO ACTIVATED!
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* IEEE Robotic Automation Society */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <GraduationCap className="w-8 h-8 text-cyan-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">IEEE Robotic Automation Society, UoM</h4>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-cyan-500 pl-4">
                  <p className="text-cyan-300 font-semibold">Design Committee Co-Lead</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Term 2024/2025</span>
                  </div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-blue-300 font-semibold">Web Committee Lead</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Term 2024/2025</span>
                  </div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-purple-300 font-semibold">Beyond the Pages 1.0: Co-Chair</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Mar 2025 - May 2025</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full font-bold text-xs transform rotate-12 shadow-lg"
              >
                ROBOTICS!
              </motion.div>
            </motion.div>

            {/* IEEE Power & Energy Society */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">IEEE Power & Energy Society, UoM</h4>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="text-yellow-300 font-semibold">Web Committee Member</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Term 2024/2025</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full font-bold text-xs transform -rotate-12 shadow-lg"
              >
                ENERGY!
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            
            {/* Gavel Club */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <User className="w-8 h-8 text-red-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">Gavel Club UoM</h4>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-red-300 font-semibold">Assistant Online Media Coordinator</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Mar 2025 - Present</span>
                  </div>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <p className="text-pink-300 font-semibold">Gavel Orientation 24: Co-Chair</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Apr 2024</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 3 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold text-xs transform rotate-12 shadow-lg"
              >
                SPEAKING!
              </motion.div>
            </motion.div>

            {/* IEEE Student Branch */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.6 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <GraduationCap className="w-8 h-8 text-indigo-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">IEEE Student Branch</h4>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <p className="text-indigo-300 font-semibold">Design Committee Member</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Term 2023/2024</span>
                  </div>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-purple-300 font-semibold">MoraXtreme: Vice Chair</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>Oct 2024 - Dec 2024</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, -8, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
                className="absolute -top-4 -left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold text-xs transform -rotate-12 shadow-lg"
              >
                IEEE!
              </motion.div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            
            {/* G17 University Ambassador */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 1.8 }}
              viewport={{ once: true }}
              className="comic-panel p-8 bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm relative"
            >
              <div className="flex items-center mb-6">
                <MapPin className="w-8 h-8 text-green-400 mr-3" />
                <h4 className="text-2xl font-bold text-white">G17 University Ambassador</h4>
              </div>
              
              <div className="space-y-3">
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-green-300 font-semibold">SDG 8 Ambassador</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-3 h-3 mr-2" />
                    <span>May 2024 - May 2025</span>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ 
                  rotate: [0, 12, -12, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full font-bold text-xs transform rotate-12 shadow-lg"
              >
                SDG 8!
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom floating elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-10 right-10 text-4xl opacity-30"
        >
          🎓
        </motion.div>

        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute top-20 left-10 text-3xl opacity-20"
        >
          📚
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [0, -180, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-20 text-2xl opacity-25"
        >
          💡
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 3 }}
          className="absolute top-1/2 right-20 text-3xl opacity-25"
        >
          💼
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-40 right-32 text-2xl opacity-20"
        >
          🚀
        </motion.div>
      </div>
    </section>
  )
}
