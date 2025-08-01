import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StructuredData from "@/components/seo/StructuredData";
import PersonSchema from "@/components/seo/PersonSchema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adeepa Kularathna - Full Stack Developer & Software Engineer",
    template: "%s | Adeepa K Portfolio"
  },
  description: "Adeepa Kularathna (Adeepa K) - Full Stack Developer & Software Engineer from Sri Lanka. Specializing in Next.js, React, TypeScript, Node.js, and modern web development. University of Moratuwa student passionate about creating innovative digital solutions.",
  keywords: [
    "Adeepa Kularathna",
    "Adeepa K", 
    "Adeepa",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer", 
    "University of Moratuwa",
    "Sri Lanka Developer",
    "Gampaha",
    "Portfolio",
    "Web Development",
    "Software Development",
    "JavaScript",
    "Node.js",
    "MongoDB",
    "MySQL",
    "Python",
    "Java",
    "Git",
    "GitHub"
  ],
  authors: [
    { 
      name: "Adeepa Kularathna",
      url: "https://adeepak.vercel.app"
    }
  ],
  creator: "Adeepa Kularathna",
  publisher: "Adeepa K",
  metadataBase: new URL('https://adeepak.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adeepak.vercel.app',
    title: 'Adeepa Kularathna - Full Stack Developer & Software Engineer',
    description: 'Adeepa Kularathna (Adeepa K) - Full Stack Developer & Software Engineer from Sri Lanka. University of Moratuwa student passionate about creating innovative web solutions.',
    siteName: 'Adeepa K Portfolio',
    images: [
      {
        url: '/image/mainimage2.png',
        width: 1200,
        height: 630,
        alt: 'Adeepa Kularathna - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adeepa Kularathna - Full Stack Developer',
    description: 'Full Stack Developer & Software Engineer specializing in modern web technologies. University of Moratuwa student from Sri Lanka.',
    images: ['/image/mainimage2.png'],
    creator: '@adeepak',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'your-google-verification-code', // You'll need to add this from Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <PersonSchema />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
