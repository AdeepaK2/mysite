"use client"

export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Adeepa Kularathna",
    "alternateName": ["Adeepa K", "Adeepa"],
    "url": "https://www.adeepa.tech",
    "image": "https://www.adeepa.tech/image/mainimage2.png",
    "sameAs": [
      "https://github.com/AdeepaK2",
      "https://www.linkedin.com/in/adeepakularathna/"
    ],
    "jobTitle": "Full Stack Developer",
    "description": "Full Stack Developer and Software Engineer specializing in modern web technologies",
    "knowsAbout": [
      "JavaScript",
      "TypeScript", 
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Web Development",
      "Software Engineering"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "University of Moratuwa"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gampaha",
      "addressRegion": "Western Province",
      "addressCountry": "LK"
    },
    "email": "adeepashashintha@gmail.com",
    "telephone": "+94764881254"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  )
}
