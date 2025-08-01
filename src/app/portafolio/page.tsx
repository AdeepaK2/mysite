'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Eye, Calendar, Star, X, Info } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'

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

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/projects', {
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY || '',
        },
      })
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.projects)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDateRange = (startDate?: MonthYear, endDate?: MonthYear) => {
    if (!startDate) return ''
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    
    const start = `${monthNames[startDate.month - 1]} ${startDate.year}`
    
    if (!endDate) {
      return `${start} - Present`
    }
    
    const end = `${monthNames[endDate.month - 1]} ${endDate.year}`
    
    return `${start} - ${end}`
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

  const projectTypes = ['all', ...Array.from(new Set(projects.map(p => p.type)))]
  
  // Sort projects: featured first, then by date (latest to oldest)
  const sortedProjects = projects.sort((a, b) => {
    // First priority: featured projects
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    
    // Second priority: sort by date (latest to oldest)
    // If both have start dates, compare them
    if (a.startDate && b.startDate) {
      const dateA = new Date(a.startDate.year, a.startDate.month - 1)
      const dateB = new Date(b.startDate.year, b.startDate.month - 1)
      return dateB.getTime() - dateA.getTime() // Latest first
    }
    
    // If only one has a start date, prioritize the one with date
    if (a.startDate && !b.startDate) return -1
    if (!a.startDate && b.startDate) return 1
    
    // If neither has start date, sort by title alphabetically
    return a.title.localeCompare(b.title)
  })
  
  const filteredProjects = filter === 'all' 
    ? sortedProjects 
    : sortedProjects.filter(p => p.type === filter)

  const featuredProjects = sortedProjects.filter(p => p.featured)

  if (isLoading) {
    return (
      <main className="portfolio-container min-h-screen pt-16 relative overflow-hidden">
        <Navbar />
        
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xl text-white">Loading amazing projects...</span>
              </div>
              <div className="action-text text-cyan-400">LOADING POWER!</div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="portfolio-container">
      <Navbar />
      
      <div className="max-w-[95vw] mx-auto px-2 sm:px-4 lg:px-6 py-16 relative z-10">
        {/* Minimal Header with Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
        >
          {/* Small Title */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Portfolio
          </motion.h1>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {projectTypes.map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(type)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm ${
                  filter === type
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg border border-cyan-400/30'
                    : 'bg-gray-900/80 text-gray-300 hover:bg-blue-500/20 border border-gray-600 hover:border-blue-500/30 backdrop-blur-sm'
                }`}
              >
                {type === 'all' ? 'All' : type}
                {filter === type && (
                  <span className="ml-1 text-xs opacity-75">
                    ({type === 'all' ? sortedProjects.length : sortedProjects.filter(p => p.type === type).length})
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-3"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.05, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative portfolio-card-3d card-glow-effect cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="comic-panel p-4 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg relative overflow-hidden h-full flex flex-col border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className={`text-xs px-2 py-1 rounded font-bold ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {project.status === 'completed' ? '✓' : project.status === 'in-progress' ? '⏳' : '📁'}
                  </span>
                </div>

                {/* Project Image */}
                <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900/50 group-hover:shadow-lg transition-all duration-300 h-32">
                  <img 
                    src={project.imageUrl.includes('r2.cloudflarestorage.com') 
                      ? `/api/file/download?fileUrl=${encodeURIComponent(project.imageUrl)}` 
                      : project.imageUrl
                    } 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/api/placeholder/400/300'
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{project.title}</h3>
                    <span className="text-cyan-400 font-medium text-sm">{project.type}</span>
                  </div>

                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies - show only 3 */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-gray-700/70 text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-600/50 text-gray-400 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Actions - Show up to 2 buttons */}
                {project.links.length > 0 && (
                  <div className="pt-3 mt-auto space-y-2">
                    {project.links.slice(0, 2).map((link, linkIndex) => (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center space-x-1 w-full px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm font-semibold transition-colors duration-200"
                      >
                        {getProjectIcon(link)}
                        <span>{link.title}</span>
                      </motion.a>
                    ))}
                    {project.links.length > 2 && (
                      <div className="text-center">
                        <span className="text-xs text-gray-400">+{project.links.length - 2} more links</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 pt-20"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-cyan-500/30 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 p-4 border-b border-gray-700 rounded-t-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white truncate">{selectedProject.title}</h2>
                        {selectedProject.featured && (
                          <Star className="w-5 h-5 text-yellow-400 fill-current flex-shrink-0" />
                        )}
                        <span className={`text-xs px-2 py-1 rounded-full font-bold flex-shrink-0 ${
                          selectedProject.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          selectedProject.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-gray-500/20 text-gray-300 border border-gray-500/30'
                        }`}>
                          {selectedProject.status === 'in-progress' ? 'IN PROGRESS' : selectedProject.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-cyan-400 font-semibold">{selectedProject.type}</span>
                        {selectedProject.role && (
                          <span className="text-blue-300 truncate">{selectedProject.role}</span>
                        )}
                        {selectedProject.startDate && (
                          <span className="text-gray-400 flex items-center flex-shrink-0">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDateRange(selectedProject.startDate, selectedProject.endDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="ml-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200 flex-shrink-0"
                    >
                      <X className="w-5 h-5 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 space-y-4">
                  {/* Project Image */}
                  <div className="relative rounded-lg overflow-hidden bg-gray-900/50 h-48 md:h-60">
                    <img 
                      src={selectedProject.imageUrl.includes('r2.cloudflarestorage.com') 
                        ? `/api/file/download?fileUrl=${encodeURIComponent(selectedProject.imageUrl)}` 
                        : selectedProject.imageUrl
                      } 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/api/placeholder/800/400'
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-line">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs font-medium tech-tag-hover"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  {selectedProject.links.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Project Links</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedProject.links.map((link, index) => (
                          <motion.a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center space-x-2 px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded text-sm font-semibold transition-colors duration-200 shadow-lg hover:shadow-cyan-500/25"
                          >
                            {getProjectIcon(link)}
                            <span className="truncate">{link.title}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 comic-panel bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm mx-auto max-w-4xl"
          >
            <div className="action-text text-xl mb-4 text-cyan-400">NO PROJECTS FOUND!</div>
            <p className="text-gray-300">
              {filter === 'all' 
                ? "No projects available yet. Check back soon for amazing content!" 
                : `No projects found for "${filter}". Try a different filter.`
              }
            </p>
            <motion.button
              onClick={() => setFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </motion.div>
        )}

        {/* Call to Action */}
        {sortedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="action-text text-2xl mb-4 text-cyan-400">IMPRESSED?</div>
            <p className="text-xl text-gray-300 mb-8">
              Let's create something <span className="text-cyan-400 font-semibold">amazing</span> together!
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 action-button-3d"
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            
            {/* Additional quick links */}
            <div className="flex justify-center gap-4 mt-6">
              <motion.a
                href="/about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 rounded-lg font-semibold transition-all duration-300"
              >
                About Me
              </motion.a>
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 rounded-lg font-semibold transition-all duration-300"
              >
                My Blog
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
