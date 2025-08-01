import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Adeepa Kularathna - Get in Touch',
  description: 'Contact Adeepa Kularathna (Adeepa K) for web development projects, collaborations, or opportunities. Full Stack Developer available for freelance work and consultation.',
  keywords: ['Contact Adeepa', 'Adeepa Kularathna contact', 'Adeepa K contact', 'hire developer', 'web development services', 'freelance developer Sri Lanka'],
  openGraph: {
    title: 'Contact Adeepa Kularathna - Get in Touch',
    description: 'Contact Adeepa Kularathna for web development projects and collaborations.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
