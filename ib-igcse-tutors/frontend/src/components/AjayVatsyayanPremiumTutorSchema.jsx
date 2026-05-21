function AjayVatsyayanPremiumTutorSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.mathsbodhi.in/#ajay-vatsyayan-premium-maths-tutor",
        name: "Ajay Vatsyayan",
        jobTitle: "Premium Senior Maths Home Tutor in Gurugram",
        description:
          "Ajay Vatsyayan is a premium senior maths home tutor in Gurugram with 14+ years of experience teaching Class 11, Class 12, CBSE, ISC, IB, IIT JEE Main and IIT JEE Advanced mathematics.",
        url: "https://www.mathsbodhi.in/",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gurugram",
          addressRegion: "Haryana",
          addressCountry: "IN",
        },
        areaServed: [
          "Gurugram",
          "The Camellias",
          "The Magnolias",
          "The Aralias",
          "DLF The Crest",
          "DLF Phase 1",
          "DLF Phase 2",
          "DLF Phase 3",
          "DLF Phase 4",
          "DLF Phase 5",
        ],
        knowsAbout: [
          "CBSE Mathematics",
          "ISC Mathematics",
          "IB Mathematics",
          "IIT JEE Main Mathematics",
          "IIT JEE Advanced Mathematics",
          "Calculus",
          "Algebra",
          "Coordinate Geometry",
          "Trigonometry",
        ],
      },
      {
        "@type": "Service",
        "@id": "https://www.mathsbodhi.in/#premium-maths-home-tuition",
        name: "Premium Maths Home Tuition in Gurugram",
        provider: {
          "@id":
            "https://www.mathsbodhi.in/#ajay-vatsyayan-premium-maths-tutor",
        },
        areaServed: [
          "Gurugram",
          "Golf Course Road",
          "DLF Phase 1",
          "DLF Phase 2",
          "DLF Phase 3",
          "DLF Phase 4",
          "DLF Phase 5",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "10",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Parent of CBSE Class 12 student",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Ajay Vatsyayan helped improve confidence and marks in Class 12 mathematics through structured concept clarity and regular practice.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Parent from The Camellias",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "One of the best maths home tutors in Gurugram for senior secondary mathematics and IIT JEE preparation.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "IB DP Parent",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4.9",
              bestRating: "5",
            },
            reviewBody:
              "Strong understanding of IB mathematics with excellent explanation and advanced problem-solving support.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "JEE Main Parent",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Very experienced maths tutor for IIT JEE Main and Advanced preparation in Gurugram.",
          },
          {
            "@type": "Review",
            author: {
              "@type": "Person",
              name: "Parent from DLF Phase 5",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            reviewBody:
              "Professional, highly skilled and disciplined maths home tutor with deep subject knowledge.",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

export default AjayVatsyayanPremiumTutorSchema;