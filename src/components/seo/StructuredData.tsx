"use client"

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://adeepak.vercel.app/#person",
        "name": "Adeepa Kularathna",
        "alternateName": ["Adeepa K", "Adeepa"],
        "description": "Full Stack Developer & Software Engineer from Sri Lanka",
        "url": "https://adeepak.vercel.app",
        "image": {
          "@type": "ImageObject",
          "url": "https://adeepak.vercel.app/image/mainimage2.png",
          "width": 400,
          "height": 400
        },
        "sameAs": [
          "https://github.com/AdeepaK2",
          "https://www.linkedin.com/in/adeepakularathna/",
          "mailto:adeepashashintha@gmail.com"
        ],
        "jobTitle": "Full Stack Developer",
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "University of Moratuwa",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Moratuwa",
            "addressCountry": "LK"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Gampaha",
          "addressRegion": "Western Province", 
          "addressCountry": "LK"
        },
        "nationality": "Sri Lankan",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "University of Moratuwa"
        },
        "knowsAbout": [
          "Web Development",
          "Software Engineering", 
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Python",
          "Java",
          "MongoDB",
          "MySQL",
          "Full Stack Development"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://adeepak.vercel.app/#website",
        "url": "https://adeepak.vercel.app",
        "name": "Adeepa Kularathna Portfolio",
        "description": "Portfolio website of Adeepa Kularathna (Adeepa K), Full Stack Developer and Software Engineer",
        "publisher": {
          "@id": "https://adeepak.vercel.app/#person"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://adeepak.vercel.app/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://adeepak.vercel.app/#webpage",
        "url": "https://adeepak.vercel.app",
        "name": "Adeepa Kularathna - Full Stack Developer & Software Engineer",
        "isPartOf": {
          "@id": "https://adeepak.vercel.app/#website"
        },
        "about": {
          "@id": "https://adeepak.vercel.app/#person"
        },
        "description": "Adeepa Kularathna (Adeepa K) - Full Stack Developer & Software Engineer from Sri Lanka. University of Moratuwa student passionate about creating innovative web solutions.",
        "breadcrumb": {
          "@id": "https://adeepak.vercel.app/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://adeepak.vercel.app/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://adeepak.vercel.app"
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
