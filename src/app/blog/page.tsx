import Navbar from '@/components/layout/Navbar'

export default function Blog() {
  return (
    <main className="min-h-screen pt-16">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-6xl font-bold text-center mb-12">
          <span className="marvel-gradient bg-clip-text text-transparent">
            My Blog
          </span>
        </h1>
        
        <div className="text-center comic-panel max-w-2xl mx-auto">
          <div className="action-text mb-4">BLOG POSTS INCOMING!</div>
          <p className="text-xl text-white">
            Comic-style blog posts about development, design, and superhero-level coding tips!
          </p>
        </div>
      </div>
    </main>
  )
}
