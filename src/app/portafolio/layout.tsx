import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Adeepa Kularathna Projects & Work',
  description: 'Explore the portfolio of Adeepa Kularathna (Adeepa K) featuring web development projects, applications, and software solutions. See my work in React, Next.js, Node.js, and more.',
  keywords: ['Adeepa portfolio', 'Adeepa Kularathna projects', 'Adeepa K work', 'web development portfolio', 'React projects', 'Next.js applications'],
  openGraph: {
    title: 'Portfolio - Adeepa Kularathna Projects & Work',
    description: 'Explore the portfolio of Adeepa Kularathna featuring innovative web development projects and applications.',
    type: 'website',
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
