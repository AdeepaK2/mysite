import mongoose, { Schema, Document } from 'mongoose'

export interface ILink {
  title: string
  url: string
}

export interface IMonthYear {
  month: number // 1-12
  year: number
}

export interface IProject extends Document {
  title: string
  type: 'Frontend Development' | 'Full-Stack Development' | 'Figma Designs' | 'Mobile Development' | 'IOT' |'Other'
  description: string
  role: string
  imageUrl: string
  links: ILink[]
  technologies: string[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'archived'
  startDate?: IMonthYear
  endDate?: IMonthYear
  createdAt: Date
  updatedAt: Date
}

const MonthYearSchema = new Schema({
  month: {
    type: Number,
    required: true,
    min: [1, 'Month must be between 1 and 12'],
    max: [12, 'Month must be between 1 and 12']
  },
  year: {
    type: Number,
    required: true,
    min: [1900, 'Year must be after 1900'],
    max: [2100, 'Year must be before 2100']
  }
}, { _id: false })

const LinkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Link title is required'],
    trim: true
  },
  url: {
    type: String,
    required: [true, 'Link URL is required'],
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v)
      },
      message: 'Please enter a valid URL'
    }
  }
}, { _id: false })

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  type: {
    type: String,
    enum: ['Frontend Development', 'Full-Stack Development', 'Figma Designs', 'Mobile Development', 'IOT', 'Other'],
    required: [true, 'Project type is required']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  role: {
    type: String,
    required: [true, 'Your role in the project is required'],
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  },
  imageUrl: {
    type: String,
    required: [true, 'Project image is required']
  },
  links: [LinkSchema],
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'archived'],
    default: 'completed'
  },
  startDate: {
    type: MonthYearSchema,
    required: false,
    default: null
  },
  endDate: {
    type: MonthYearSchema,
    required: false,
    default: null
  }
}, {
  timestamps: true,
  // Ensure schema changes don't break existing documents
  strict: false
})

// Prevent re-compilation in development
export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
