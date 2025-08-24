import { Metadata } from 'next'
import AboutSection from '@/components/ui/AboutSection'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'About Adeepa Kularathna - Full Stack Developer, Software Engineer & Business Analyst',
  description: 'Learn more about Adeepa Kularathna (Adeepa K), a passionate Full Stack Developer, Software Engineer and Business Analyst from Gampaha, Sri Lanka. University of Moratuwa student specializing in modern web technologies.',
  keywords: ['Adeepa Kularathna', 'Adeepa K', 'About Adeepa', 'Full Stack Developer', 'Software Engineer', 'Business Analyst', 'University of Moratuwa', 'Sri Lanka', 'Gampaha'],
  openGraph: {
    title: 'About Adeepa Kularathna - Full Stack Developer & Business Analyst',
    description: 'Learn more about Adeepa Kularathna (Adeepa K), a passionate Full Stack Developer, Software Engineer and Business Analyst from Sri Lanka.',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <AboutSection />
    </main>
  )
}
