'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  PenTool, 
  Settings, 
  LogOut,
  BarChart3,
  Users,
  FileText,
  Home,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const adminNavItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: BarChart3,
    exact: true
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: FolderOpen
  },
  {
    title: 'Blog Posts',
    href: '/admin/blog',
    icon: PenTool
  },
  {
    title: 'Contact Messages',
    href: '/admin/contacts',
    icon: MessageCircle
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings
  }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin') {
    router.push('/admin/login')
    return null
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="absolute inset-0 comic-dots opacity-10" />
      <div className="absolute inset-0 halftone-bg opacity-5" />

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 min-h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6"
        >
          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Admin Panel</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <div>
                <h3 className="font-semibold">Adeepa Admin</h3>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = item.exact ? 
                pathname === item.href : 
                pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
