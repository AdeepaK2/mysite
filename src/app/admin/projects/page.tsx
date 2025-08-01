'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Link as LinkIcon,
  Star,
  Eye
} from 'lucide-react'
import AdminLayout from '@/components/layout/AdminLayout'
import ImageUpload from '@/components/ui/ImageUpload'

interface ProjectLink {
  title: string
  url: string
}

interface MonthYear {
  month: number
  year: number
}

interface Project {
  _id?: string
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

const PROJECT_TYPES = [
  'Frontend Development',
  'Full-Stack Development', 
  'Figma Designs',
  'Mobile Development',
  'IOT',
  'Other'
]

const PROJECT_STATUS = [
  'completed',
  'in-progress',
  'archived'
]

export default function ProjectsAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<Project>({
    title: '',
    type: 'Frontend Development',
    description: '',
    role: '',
    imageUrl: '',
    links: [],
    technologies: [],
    featured: false,
    status: 'completed',
    startDate: undefined,
    endDate: undefined
  })

  // Fetch projects on component mount
  useEffect(() => {
    if (status === 'authenticated') {
      fetchProjects()
    } else if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Checking authentication...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (status === 'unauthenticated') {
    return null // Router will redirect
  }

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/projects')
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.projects)
      } else {
        console.error('Failed to fetch projects:', data.error)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsSaving(true)
      const url = editingProject 
        ? `/api/projects/${editingProject._id}` 
        : '/api/projects'
      
      const method = editingProject ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Refresh projects list
        await fetchProjects()
        resetForm()
      } else {
        console.error('Failed to save project:', data.error)
        alert('Failed to save project. Please try again.')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const editProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      ...project,
      startDate: project.startDate,
      endDate: project.endDate,
    })
    setShowForm(true)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        // Refresh projects list
        await fetchProjects()
      } else {
        console.error('Failed to delete project:', data.error)
        alert('Failed to delete project. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'Frontend Development',
      description: '',
      role: '',
      imageUrl: '',
      links: [],
      technologies: [],
      featured: false,
      status: 'completed',
      startDate: undefined,
      endDate: undefined
    })
    setEditingProject(null)
    setShowForm(false)
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

  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { title: '', url: '' }]
    })
  }

  const updateLink = (index: number, field: 'title' | 'url', value: string) => {
    const newLinks = [...formData.links]
    newLinks[index][field] = value
    setFormData({ ...formData, links: newLinks })
  }

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index)
    })
  }

  const addTechnology = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech.trim()]
      })
    }
  }

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    })
  }

  if (isLoading && projects.length === 0) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading projects...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-white">Portfolio </span>
              <span className="text-blue-500">Projects</span>
            </h1>
            <p className="text-gray-300">Manage your portfolio projects and showcase your work</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Project</span>
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="comic-panel p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm relative group"
            >
              {/* Project Image */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-800">
                <div className="w-full min-h-[160px] max-h-[240px] flex items-center justify-center">
                  <img 
                    src={project.imageUrl.includes('r2.cloudflarestorage.com') 
                      ? `/api/file/download?fileUrl=${encodeURIComponent(project.imageUrl)}` 
                      : project.imageUrl
                    } 
                    alt={project.title}
                    className="w-full h-auto max-h-[240px] object-contain"
                    onError={(e) => {
                      console.error('Image load error for project:', project.title, 'URL:', project.imageUrl);
                      // Fallback to a placeholder or the original URL
                      e.currentTarget.src = project.imageUrl.includes('r2.cloudflarestorage.com') 
                        ? '/placeholder-image.jpg' 
                        : project.imageUrl;
                    }}
                  />
                </div>
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black p-1 rounded">
                    <Star className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-blue-400 text-sm mb-2">{project.type}</p>
                <p className="text-gray-300 text-sm mb-2">{project.role}</p>
                {project.startDate && (
                  <p className="text-purple-400 text-xs mb-2">
                    📅 {formatDateRange(project.startDate, project.endDate)}
                  </p>
                )}
                <p className="text-gray-400 text-xs line-clamp-3">{project.description}</p>
              </div>

              {/* Technologies */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-400">+{project.technologies.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${
                  project.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                  project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {project.status}
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editProject(project)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id!)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-800 rounded transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title and Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      required
                    >
                      {PROJECT_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Role and Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Role *
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Full-Stack Developer, UI/UX Designer"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    >
                      {PROJECT_STATUS.map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Duration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Start Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formData.startDate?.month || ''}
                        onChange={(e) => {
                          const month = e.target.value ? parseInt(e.target.value) : undefined
                          if (month) {
                            setFormData({ 
                              ...formData, 
                              startDate: { 
                                month, 
                                year: formData.startDate?.year || new Date().getFullYear() 
                              } 
                            })
                          } else {
                            setFormData({ ...formData, startDate: undefined })
                          }
                        }}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Month</option>
                        {[
                          'January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ].map((month, index) => (
                          <option key={index + 1} value={index + 1}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Year"
                        min="1900"
                        max="2100"
                        value={formData.startDate?.year || ''}
                        onChange={(e) => {
                          const year = e.target.value ? parseInt(e.target.value) : undefined
                          if (year) {
                            setFormData({ 
                              ...formData, 
                              startDate: { 
                                month: formData.startDate?.month || 1, 
                                year 
                              } 
                            })
                          } else if (!formData.startDate?.month) {
                            setFormData({ ...formData, startDate: undefined })
                          }
                        }}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      End Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={formData.endDate?.month || ''}
                        onChange={(e) => {
                          const month = e.target.value ? parseInt(e.target.value) : undefined
                          if (month) {
                            setFormData({ 
                              ...formData, 
                              endDate: { 
                                month, 
                                year: formData.endDate?.year || new Date().getFullYear() 
                              } 
                            })
                          } else {
                            setFormData({ ...formData, endDate: undefined })
                          }
                        }}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Month</option>
                        {[
                          'January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'
                        ].map((month, index) => (
                          <option key={index + 1} value={index + 1}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        placeholder="Year"
                        min="1900"
                        max="2100"
                        value={formData.endDate?.year || ''}
                        onChange={(e) => {
                          const year = e.target.value ? parseInt(e.target.value) : undefined
                          if (year) {
                            setFormData({ 
                              ...formData, 
                              endDate: { 
                                month: formData.endDate?.month || 1, 
                                year 
                              } 
                            })
                          } else if (!formData.endDate?.month) {
                            setFormData({ ...formData, endDate: undefined })
                          }
                        }}
                        className="w-full px-3 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Leave empty if project is ongoing</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    rows={4}
                    placeholder="Describe your project, what you built, and what makes it special..."
                    required
                  />
                </div>

                {/* Project Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Image *
                  </label>
                  <ImageUpload
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                    folder="projects"
                    placeholder="Upload project image or screenshot"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies Used
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="ml-2 text-blue-400 hover:text-blue-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Add technology (press Enter)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addTechnology(e.currentTarget.value)
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>

                {/* Links */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-300">
                      Project Links
                    </label>
                    <button
                      type="button"
                      onClick={addLink}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Link</span>
                    </button>
                  </div>
                  
                  {formData.links.map((link, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => updateLink(index, 'title', e.target.value)}
                        className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        placeholder="Link title (e.g., Live Demo, GitHub)"
                      />
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateLink(index, 'url', e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                          placeholder="https://example.com"
                        />
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm text-gray-300">
                    Mark as featured project
                  </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                  >
                    <Save className="w-5 h-5" />
                    <span>{isSaving ? 'Saving...' : (editingProject ? 'Update Project' : 'Save Project')}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
        </div>
      </div>
    </AdminLayout>
  )
}
