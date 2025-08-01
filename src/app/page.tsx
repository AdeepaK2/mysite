'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Eye, Star, ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react'
import HeroSection from '@/components/ui/HeroSection'
import Friday2Chatbot from '@/components/ui/Friday2Chatbot'
import Link from 'next/link'

interface ProjectLink {
  title: string
  url: string
}

interface MonthYear {
  month: number
  year: number
}

interface Project {
  _id: string
  title: string
  type: string
  description: string
  role: string
  imageUrl: string
  links: ProjectLink[]
  technologies: string[]
  featured: boolean
  status: string
  startDate?: MonthYear
  endDate?: MonthYear
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.min(projects.length, 6))
      }, 4000) // Auto slide every 4 seconds

      return () => clearInterval(interval)
    }
  }, [projects.length])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()
      
      if (data.success) {
        // Sort projects: featured first, then by date (latest to oldest)
        const sortedProjects = data.projects.sort((a: Project, b: Project) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          
          if (a.startDate && b.startDate) {
            const dateA = new Date(a.startDate.year, a.startDate.month - 1)
            const dateB = new Date(b.startDate.year, b.startDate.month - 1)
            return dateB.getTime() - dateA.getTime()
          }
          
          if (a.startDate && !b.startDate) return -1
          if (!a.startDate && b.startDate) return 1
          
          return a.title.localeCompare(b.title)
        })
        
        setProjects(sortedProjects.slice(0, 6)) // Show only top 6 projects
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getProjectIcon = (link: ProjectLink) => {
    const title = link.title.toLowerCase()
    if (title.includes('github') || title.includes('code')) {
      return <Github className="w-4 h-4" />
    }
    if (title.includes('demo') || title.includes('live') || title.includes('preview')) {
      return <Eye className="w-4 h-4" />
    }
    return <ExternalLink className="w-4 h-4" />
  }

  return (
    <div>
      <HeroSection />
      
      {/* My Projects Section */}
      <section className="relative py-8 overflow-hidden min-h-screen flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-white">My </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Projects
              </span>
            </motion.h2>
            <motion.div 
              className="action-text text-cyan-400 text-base mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              EPIC CREATIONS!
            </motion.div>
            <motion.p 
              className="text-gray-300 text-sm max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Discover the digital universes I've crafted with cutting-edge technology
            </motion.p>
          </motion.div>

          {/* Floating Projects Carousel */}
          {!isLoading && projects.length > 0 && (
            <div className="relative">
              {/* Main Floating Cards Container */}
              <div className="relative h-[300px] md:h-[350px] perspective-1000 z-10">
                <AnimatePresence mode="wait">
                  {projects.map((project, index) => {
                    const isActive = index === currentSlide
                    const isNext = index === (currentSlide + 1) % projects.length
                    const isPrev = index === (currentSlide - 1 + projects.length) % projects.length
                    const isNext2 = index === (currentSlide + 2) % projects.length
                    const isPrev2 = index === (currentSlide - 2 + projects.length) % projects.length
                    
                    let zIndex = 1
                    let scale = 0.6
                    let opacity = 0.3
                    let rotateY = 0
                    let x = 0
                    let y = 50

                    if (isActive) {
                      // Center card
                      zIndex = 30
                      scale = 1
                      opacity = 1
                      x = 0
                      y = 0
                    } else if (isNext) {
                      // Right 1
                      zIndex = 20
                      scale = 0.8
                      opacity = 0.7
                      rotateY = -20
                      x = 180
                      y = 15
                    } else if (isPrev) {
                      // Left 1
                      zIndex = 20
                      scale = 0.8
                      opacity = 0.7
                      rotateY = 20
                      x = -180
                      y = 15
                    } else if (isNext2) {
                      // Right 2
                      zIndex = 10
                      scale = 0.65
                      opacity = 0.5
                      rotateY = -35
                      x = 320
                      y = 30
                    } else if (isPrev2) {
                      // Left 2
                      zIndex = 10
                      scale = 0.65
                      opacity = 0.5
                      rotateY = 35
                      x = -320
                      y = 30
                    }

                    return (
                      <motion.div
                        key={project._id}
                        className="absolute top-1/2 left-1/2 w-56 md:w-64"
                        style={{ 
                          transformOrigin: 'center center',
                          zIndex 
                        }}
                        initial={false}
                        animate={{
                          x: x - 128, // Offset for centering (half of card width)
                          y: y - 150, // Offset for centering
                          scale,
                          opacity,
                          rotateY,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 30,
                          duration: 0.8
                        }}
                        whileHover={isActive ? { 
                          scale: 1.05, 
                          y: y - 160,
                          transition: { duration: 0.3 }
                        } : {}}
                      >
                        <div className="floating-card relative">
                          {/* Glowing effect for active card */}
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl"
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                          
                          <div className="comic-panel p-4 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 relative overflow-hidden">
                            {/* Featured Badge */}
                            {project.featured && (
                              <div className="absolute top-3 right-3 z-10">
                                <motion.div
                                  animate={{ rotate: [0, 10, -10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                </motion.div>
                              </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3 z-10">
                              <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                                project.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                              }`}>
                                {project.status === 'completed' ? '✓' : project.status === 'in-progress' ? '⏳' : '📁'}
                              </span>
                            </div>

                            {/* Project Image */}
                            <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900/50 h-32">
                              <img 
                                src={project.imageUrl.includes('r2.cloudflarestorage.com') 
                                  ? `/api/file/download?fileUrl=${encodeURIComponent(project.imageUrl)}` 
                                  : project.imageUrl
                                } 
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-300"
                                onError={(e) => {
                                  e.currentTarget.src = '/api/placeholder/400/300'
                                }}
                              />
                              {/* Hover overlay */}
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>

                            {/* Project Info */}
                            <div className="space-y-2">
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                                  {project.title}
                                </h3>
                                <span className="text-cyan-400 font-medium text-xs">
                                  {project.type}
                                </span>
                              </div>

                              <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                                {project.description}
                              </p>

                              {/* Technologies */}
                              <div className="flex flex-wrap gap-1">
                                {project.technologies.slice(0, 2).map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="text-xs px-1 py-0.5 bg-blue-500/20 text-blue-300 rounded border border-blue-500/30"
                                  >
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 2 && (
                                  <span className="text-xs px-1 py-0.5 bg-gray-600/50 text-gray-400 rounded">
                                    +{project.technologies.length - 2}
                                  </span>
                                )}
                              </div>

                              {/* Project Links */}
                              {project.links.length > 0 && (
                                <div className="space-y-1">
                                  {project.links.slice(0, 1).map((link, linkIndex) => (
                                    <motion.a
                                      key={linkIndex}
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="flex items-center justify-center space-x-1 w-full px-2 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded text-xs font-semibold transition-all duration-300"
                                    >
                                      {getProjectIcon(link)}
                                      <span>{link.title}</span>
                                    </motion.a>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-cyan-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              {/* View All Projects Button */}
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Link href="/portafolio">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-bold text-base transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                  >
                    <span>View All Projects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-lg">Loading amazing projects...</span>
              </motion.div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && projects.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="action-text text-xl mb-4 text-cyan-400">COMING SOON!</div>
              <p className="text-gray-300 text-lg">
                Epic projects are being crafted. Check back soon for amazing content!
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,255,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nick Fury Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex items-center justify-center relative"
              >
                <motion.img
                  src="/image/nickfury.png"
                  alt=""
                  className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Comic Speech Bubble */}
                <motion.div
                  className="absolute top-0 -right-6 md:-right-10 z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                >
                  {/* Speech bubble */}
                  <div className="relative bg-white rounded-2xl p-3 shadow-lg max-w-48 md:max-w-56">
                    {/* Bubble tail pointing to Nick Fury */}
                    <div className="absolute bottom-0 left-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
                    
                    <p className="text-gray-900 text-xs md:text-sm font-medium leading-tight">
                      "The idea was to bring together a group of remarkable people, see if they could become something more."
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="comic-panel p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50"
              >
                <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <motion.a
                    href="mailto:adeepashashintha@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">adeepashashintha@gmail.com</span>
                  </motion.a>
                  
                  <motion.a
                    href="tel:+94764881254"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <Phone className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">+94 76 488 1254</span>
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg"
                  >
                    <MapPin className="w-5 h-5 text-red-400" />
                    <span className="text-gray-300">Sri Lanka</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="comic-panel p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50"
              >
                <h3 className="text-lg font-bold text-white mb-4">Follow Me</h3>
                <div className="grid grid-cols-1 gap-3">
                  <motion.a
                    href="https://github.com/AdeepaK2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-white" />
                    <span className="text-gray-300 text-sm">GitHub</span>
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/adeepakularathna/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center space-x-2 p-3 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300 text-sm">LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Quick Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-center mt-8"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Message</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Friday 2.0 Chatbot */}
      <Friday2Chatbot />
      
    </div>
  )
}
