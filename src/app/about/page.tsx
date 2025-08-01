import { Metadata } from 'next'
import AboutSection from '@/components/ui/AboutSection'
import Navbar from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'About Adeepa Kularathna - Full Stack Developer & Software Engineer',
  description: 'Learn more about Adeepa Kularathna (Adeepa K), a passionate Full Stack Developer and Software Engineer from Gampaha, Sri Lanka. University of Moratuwa student specializing in modern web technologies.',
  keywords: ['Adeepa Kularathna', 'Adeepa K', 'About Adeepa', 'Full Stack Developer', 'Software Engineer', 'University of Moratuwa', 'Sri Lanka', 'Gampaha'],
  openGraph: {
    title: 'About Adeepa Kularathna - Full Stack Developer',
    description: 'Learn more about Adeepa Kularathna (Adeepa K), a passionate Full Stack Developer and Software Engineer from Sri Lanka.',
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
