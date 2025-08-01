'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, X, Minimize2, Maximize2, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function Friday2Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Friday 2.0, Mr. Kularathna's AI assistant. How may I help you learn about Adeepa today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showAttentionBubble, setShowAttentionBubble] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Function to render structured messages
  const renderStructuredMessage = (text: string) => {
    // Check if the message contains structured content
    if (text.includes('•') || text.includes('-') || text.includes('*')) {
      const parts = text.split('\n')
      const elements = []
      let currentSection = []
      let isInList = false

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i].trim()
        
        if (!part) {
          if (currentSection.length > 0) {
            elements.push(
              <div key={i} className="mb-2">
                {currentSection.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            )
            currentSection = []
            isInList = false
          }
          continue
        }

        // Handle list items
        if (part.startsWith('•') || part.startsWith('-') || part.startsWith('*')) {
          if (!isInList) {
            isInList = true
            if (currentSection.length > 0) {
              elements.push(
                <div key={`section-${i}`} className="mb-2">
                  {currentSection.map((item, idx) => (
                    <div key={idx}>{item}</div>
                  ))}
                </div>
              )
              currentSection = []
            }
          }
          
          const listText = part.substring(1).trim()
          elements.push(
            <div key={i} className="flex items-start mb-1 bg-gray-800/30 rounded-md p-2">
              <span className="text-cyan-400 mr-2 mt-0.5 text-xs">●</span>
              <span className="flex-1">{listText}</span>
            </div>
          )
        }
        // Handle headers (text ending with :)
        else if (part.endsWith(':') && part.length > 1) {
          if (currentSection.length > 0) {
            elements.push(
              <div key={`section-${i}`} className="mb-2">
                {currentSection.map((item, idx) => (
                  <div key={idx}>{item}</div>
                ))}
              </div>
            )
            currentSection = []
          }
          
          elements.push(
            <div key={i} className="font-bold text-cyan-300 mb-1 mt-3 first:mt-0 border-l-2 border-cyan-400 pl-2 bg-cyan-400/10 rounded-r-md py-1">
              {part}
            </div>
          )
          isInList = false
        }
        // Handle numbered items
        else if (/^\d+\./.test(part)) {
          const [number, ...rest] = part.split('.')
          const listText = rest.join('.').trim()
          elements.push(
            <div key={i} className="flex items-start mb-1 bg-gray-800/30 rounded-md p-2">
              <span className="text-cyan-400 mr-2 mt-0.5 text-xs font-bold">{number}.</span>
              <span className="flex-1">{listText}</span>
            </div>
          )
          isInList = true
        }
        // Regular text
        else {
          currentSection.push(
            <span key={i} className="block mb-1">{part}</span>
          )
          isInList = false
        }
      }

      // Add remaining section
      if (currentSection.length > 0) {
        elements.push(
          <div key="final" className="mb-0">
            {currentSection.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
        )
      }

      return elements.length > 0 ? elements : <span>{text}</span>
    }

    // If no special formatting detected, return as regular text
    return <span className="whitespace-pre-wrap break-words">{text}</span>
  }

  // Attention bubble effect
  useEffect(() => {
    if (!isOpen) {
      // Show attention bubble after 3 seconds, then every 15 seconds
      const initialTimer = setTimeout(() => {
        setShowAttentionBubble(true)
        setTimeout(() => setShowAttentionBubble(false), 5000) // Hide after 5 seconds
      }, 3000)

      const intervalTimer = setInterval(() => {
        if (!isOpen) {
          setShowAttentionBubble(true)
          setTimeout(() => setShowAttentionBubble(false), 5000)
        }
      }, 15000)

      return () => {
        clearTimeout(initialTimer)
        clearInterval(intervalTimer)
      }
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY || '',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()

      if (data.response) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiMessage])
      } else {
        throw new Error('No response from AI')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm experiencing technical difficulties. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Attention-grabbing Comic Bubble */}
      <AnimatePresence>
        {showAttentionBubble && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed bottom-20 right-4 z-40 max-w-64"
          >
            <div className="relative">
              {/* Speech bubble */}
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white rounded-2xl p-4 shadow-xl border-2 border-cyan-400 relative"
              >
                {/* Bubble tail pointing to chatbot button */}
                <div className="absolute bottom-0 right-6 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
                <div className="absolute bottom-0 right-6 w-0 h-0 border-l-10 border-r-10 border-t-14 border-l-transparent border-r-transparent border-t-cyan-400 transform translate-y-full z-10"></div>
                
                <p className="text-gray-900 text-sm font-bold leading-tight">
                  👋 Hi! I'm Friday 2.0! Ask me anything about Adeepa!
                </p>
                
                {/* Comic style effects */}
                <div className="absolute -top-2 -right-2 text-cyan-400 text-xl font-black">✨</div>
                <div className="absolute -top-1 -left-1 text-blue-400 text-xs font-black">★</div>
                <div className="absolute -bottom-1 -left-2 text-cyan-500 text-xs font-black">💬</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          setShowAttentionBubble(false)
        }}
        className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'hidden' : 'flex'} items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: showAttentionBubble 
            ? ["0 10px 25px rgba(34, 197, 255, 0.3)", "0 15px 35px rgba(34, 197, 255, 0.5)", "0 10px 25px rgba(34, 197, 255, 0.3)"]
            : "0 10px 25px rgba(0, 0, 0, 0.3)"
        }}
        transition={{ 
          delay: 1, 
          duration: 0.5,
          boxShadow: { duration: 2, repeat: showAttentionBubble ? Infinity : 0 }
        }}
      >
        <img 
          src="/image/friday.png" 
          alt="Friday 2.0" 
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.nextElementSibling?.classList.remove('hidden')
          }}
        />
        <MessageCircle className="w-7 h-7 hidden" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
            className={`fixed z-50 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isMinimized 
                ? 'bottom-4 right-4 w-80 h-16' 
                : 'bottom-4 right-4 w-80 sm:w-96 h-[500px] sm:h-[600px] max-h-[80vh]'
            }`}
            style={{
              maxWidth: 'calc(100vw - 2rem)',
              maxHeight: 'calc(100vh - 2rem)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50 bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <img 
                    src="/image/friday.png" 
                    alt="Friday 2.0" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400/50"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                  <Bot className="w-8 h-8 text-cyan-400 hidden" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-sm truncate">Friday 2.0</h3>
                  {!isMinimized && (
                    <p className="text-xs text-gray-400">AI Assistant</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                  title="Close"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-3 space-y-3 overflow-y-auto" style={{ height: 'calc(100% - 8rem)' }}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.isUser 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                            : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                        }`}>
                          {message.isUser ? (
                            <User className="w-3 h-3 text-white" />
                          ) : (
                            <img 
                              src="/image/friday.png" 
                              alt="Friday 2.0" 
                              className="w-5 h-5 rounded-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                                e.currentTarget.nextElementSibling?.classList.remove('hidden')
                              }}
                            />
                          )}
                          <Bot className="w-3 h-3 text-white hidden" />
                        </div>
                        <div className={`rounded-2xl p-3 ${
                          message.isUser
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                            : 'bg-gray-700/50 text-gray-100 border border-gray-600/50'
                        }`}>
                          {message.isUser ? (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                          ) : (
                            <div className="text-sm leading-relaxed">
                              {renderStructuredMessage(message.text)}
                            </div>
                          )}
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                          <img 
                            src="/image/friday.png" 
                            alt="Friday 2.0" 
                            className="w-5 h-5 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                          <Bot className="w-3 h-3 text-white hidden" />
                        </div>
                        <div className="bg-gray-700/50 border border-gray-600/50 rounded-2xl p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-gray-700/50">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask Friday about Adeepa..."
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-200"
                      disabled={isLoading}
                    />
                    <motion.button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="p-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Friday 2.0 can tell you about Adeepa's work and projects
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
