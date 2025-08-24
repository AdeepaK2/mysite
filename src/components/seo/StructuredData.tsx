"use client"

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.adeepa.tech/#person",
        "name": "Adeepa Kularathna",
        "alternateName": ["Adeepa K", "Adeepa"],
        "description": "Full Stack Developer & Software Engineer from Sri Lanka",
        "url": "https://www.adeepa.tech",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.adeepa.tech/image/mainimage2.png",
          "width": 400,
          "height": 400
        },
        "sameAs": [
          "https://github.com/AdeepaK2",
          "https://www.linkedin.com/in/adeepakularathna/",
          "mailto:adeepashashintha@gmail.com"
        ],
        "jobTitle": "Full Stack Developer & Business Analyst",
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
          "Business Analysis",
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
        "@id": "https://www.adeepa.tech/#website",
        "url": "https://www.adeepa.tech",
        "name": "Adeepa Kularathna Portfolio",
        "description": "Portfolio website of Adeepa Kularathna (Adeepa K), Full Stack Developer and Software Engineer",
        "publisher": {
          "@id": "https://www.adeepa.tech/#person"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.adeepa.tech/?s={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.adeepa.tech/#webpage",
        "url": "https://www.adeepa.tech",
        "name": "Adeepa Kularathna - Full Stack Developer & Software Engineer",
        "isPartOf": {
          "@id": "https://www.adeepa.tech/#website"
        },
        "about": {
          "@id": "https://www.adeepa.tech/#person"
        },
        "description": "Adeepa Kularathna (Adeepa K) - Full Stack Developer & Software Engineer from Sri Lanka. University of Moratuwa student passionate about creating innovative web solutions.",
        "breadcrumb": {
          "@id": "https://www.adeepa.tech/#breadcrumb"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.adeepa.tech/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.adeepa.tech"
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
