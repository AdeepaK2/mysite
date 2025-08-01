import mongoose from 'mongoose'

export interface IContactMessage {
  _id?: string
  name: string
  email: string
  subject: string
  message: string
  phone?: string
  status: 'new' | 'read' | 'replied'
  createdAt: Date
  updatedAt: Date
}

const ContactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
}, {
  timestamps: true
})

// Index for better query performance
ContactMessageSchema.index({ createdAt: -1 })
ContactMessageSchema.index({ status: 1 })

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema)
