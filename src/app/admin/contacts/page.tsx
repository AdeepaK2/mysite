'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  User, 
  Search, 
  Filter, 
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle,
  Circle,
  RefreshCw
} from 'lucide-react'

interface ContactMessage {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
  updatedAt: string
}

interface StatusCounts {
  new: number
  read: number
  replied: number
  total: number
}

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    new: 0,
    read: 0,
    replied: 0,
    total: 0
  })
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [currentPage, statusFilter, searchTerm])

  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        status: statusFilter,
        search: searchTerm
      })

      const response = await fetch(`/api/contact?${params}`)
      const data = await response.json()

      if (data.success) {
        setMessages(data.data.messages)
        setTotalPages(data.data.pagination.pages)
        setStatusCounts(data.data.statusCounts)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, newStatus: string) => {
    try {
      setIsUpdating(true)
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages(prev => 
          prev.map(msg => 
            msg._id === messageId 
              ? { ...msg, status: newStatus as any }
              : msg
          )
        )
        setSelectedMessage(prev => 
          prev?._id === messageId 
            ? { ...prev, status: newStatus as any }
            : prev
        )
        // Refresh to update counts
        fetchMessages()
      }
    } catch (error) {
      console.error('Error updating message status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId))
        setSelectedMessage(null)
        fetchMessages() // Refresh to update counts
      }
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500/20 text-green-300 border-green-500/50'
      case 'read': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
      case 'replied': return 'bg-blue-500/20 text-blue-300 border-blue-500/50'
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Circle className="w-4 h-4" />
      case 'read': return <Eye className="w-4 h-4" />
      case 'replied': return <CheckCircle className="w-4 h-4" />
      default: return <Circle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const statusOptions = [
    { value: 'all', label: `All (${statusCounts.total})` },
    { value: 'new', label: `New (${statusCounts.new})` },
    { value: 'read', label: `Read (${statusCounts.read})` },
    { value: 'replied', label: `Replied (${statusCounts.replied})` }
  ]

  if (isLoading && messages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-white">Loading messages...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Contact Messages</h1>
          <p className="text-gray-300">Manage and respond to contact form submissions</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="comic-panel p-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total</p>
                <p className="text-2xl font-bold text-white">{statusCounts.total}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <div className="comic-panel p-6 bg-gradient-to-br from-green-800/20 to-green-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">New</p>
                <p className="text-2xl font-bold text-green-300">{statusCounts.new}</p>
              </div>
              <Circle className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="comic-panel p-6 bg-gradient-to-br from-yellow-800/20 to-yellow-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Read</p>
                <p className="text-2xl font-bold text-yellow-300">{statusCounts.read}</p>
              </div>
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          <div className="comic-panel p-6 bg-gradient-to-br from-blue-800/20 to-blue-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Replied</p>
                <p className="text-2xl font-bold text-blue-300">{statusCounts.replied}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="comic-panel p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-gray-400 w-full sm:w-64"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setCurrentPage(1)
                }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={fetchMessages}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 rounded-lg hover:bg-cyan-500/30 transition-colors duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="comic-panel p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Messages</h2>
              
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No messages found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.6 }}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 bg-gray-800/30 rounded-lg border cursor-pointer transition-all duration-300 hover:border-cyan-500/50 ${
                        selectedMessage?._id === message._id 
                          ? 'border-cyan-500/50 bg-cyan-500/10' 
                          : 'border-gray-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-white">{message.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs border flex items-center gap-1 ${getStatusColor(message.status)}`}>
                              {getStatusIcon(message.status)}
                              {message.status}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-1">{message.subject}</p>
                          <p className="text-gray-400 text-xs">{formatDate(message.createdAt)}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedMessage(message)
                          }}
                          className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                        currentPage === page
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="comic-panel p-6 sticky top-6"
            >
              {selectedMessage ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Message Details</h2>
                    <div className="flex gap-2">
                      <select
                        value={selectedMessage.status}
                        onChange={(e) => updateMessageStatus(selectedMessage._id, e.target.value)}
                        disabled={isUpdating}
                        className="px-3 py-1 bg-gray-800/50 border border-gray-600 rounded text-white text-sm focus:border-cyan-500"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">From</label>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{selectedMessage.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`mailto:${selectedMessage.email}`}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                        >
                          {selectedMessage.email}
                        </a>
                      </div>
                    </div>

                    {selectedMessage.phone && (
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Phone</label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a 
                            href={`tel:${selectedMessage.phone}`}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                          >
                            {selectedMessage.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Date</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-white">{formatDate(selectedMessage.createdAt)}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Subject</label>
                      <p className="text-white font-medium">{selectedMessage.subject}</p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Message</label>
                      <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                        <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                      >
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Select a message to view details</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
