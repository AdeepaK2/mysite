'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  PenTool, 
  Eye, 
  TrendingUp,
  Star,
  Clock,
  Users,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import AdminLayout from '@/components/layout/AdminLayout'

interface Stats {
  totalProjects: number
  totalBlogs: number
  featuredProjects: number
  recentActivity: number
}

interface RecentItem {
  id: string
  title: string
  type: 'project' | 'blog'
  status: string
  updatedAt: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalBlogs: 0,
    featuredProjects: 0,
    recentActivity: 0
  })
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session || session.user?.role !== 'admin') {
      router.push('/admin/login')
      return
    }
    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      // Fetch projects
      const projectsRes = await fetch('/api/projects')
      const projectsData = await projectsRes.json()
      
      // Fetch blogs
      const blogsRes = await fetch('/api/blog')
      const blogsData = await blogsRes.json()

      if (projectsData.success && blogsData.success) {
        const projects = projectsData.projects || []
        const blogs = blogsData.posts || []

        setStats({
          totalProjects: projects.length,
          totalBlogs: blogs.length,
          featuredProjects: projects.filter((p: any) => p.featured).length,
          recentActivity: projects.length + blogs.length
        })

        // Combine and sort recent items
        const allItems = [
          ...projects.map((p: any) => ({
            id: p._id,
            title: p.title,
            type: 'project' as const,
            status: p.status,
            updatedAt: p.updatedAt || p.createdAt
          })),
          ...blogs.map((b: any) => ({
            id: b._id,
            title: b.title,
            type: 'blog' as const,
            status: b.published ? 'published' : 'draft',
            updatedAt: b.updatedAt || b.createdAt
          }))
        ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

        setRecentItems(allItems.slice(0, 5))
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading dashboard...</span>
          </div>
        </div>
      </AdminLayout>
    )
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: FolderOpen,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      link: '/admin/projects'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      icon: PenTool,
      color: 'from-purple-500 to-purple-600',
      change: '+8%',
      link: '/admin/blog'
    },
    {
      title: 'Featured Projects',
      value: stats.featuredProjects,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      change: '+5%',
      link: '/admin/projects'
    },
    {
      title: 'Total Content',
      value: stats.recentActivity,
      icon: Activity,
      color: 'from-green-500 to-green-600',
      change: '+15%',
      link: '/admin'
    }
  ]

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-white">Welcome back, </span>
            <span className="text-blue-500">Adeepa!</span>
          </h1>
          <p className="text-gray-300">Here's what's happening with your portfolio today.</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((card, index) => {
            const Icon = card.icon
            return (
              <Link key={card.title} href={card.link}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="comic-panel p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{card.change}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                    <p className="text-gray-400 text-sm">{card.title}</p>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </motion.div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="comic-panel p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            
            <div className="space-y-3">
              <Link href="/admin/projects">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Add New Project</h3>
                    <p className="text-gray-400 text-sm">Showcase your latest work</p>
                  </div>
                </motion.div>
              </Link>

              <Link href="/admin/blog">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <PenTool className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Write Blog Post</h3>
                    <p className="text-gray-400 text-sm">Share your thoughts and insights</p>
                  </div>
                </motion.div>
              </Link>

              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Eye className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">View Live Site</h3>
                    <p className="text-gray-400 text-sm">See how visitors experience your portfolio</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="comic-panel p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
            
            <div className="space-y-3">
              {recentItems.length > 0 ? (
                recentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        item.type === 'project' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.type === 'project' ? (
                          <FolderOpen className="w-4 h-4" />
                        ) : (
                          <PenTool className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-sm">{item.title}</h3>
                        <p className="text-gray-400 text-xs">
                          {item.type === 'project' ? 'Project' : 'Blog Post'} • {item.status}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No recent activity</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AdminLayout>
  )
}
