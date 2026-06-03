import { SCHEMA_IDS, cleanSchemaObject, getAbsoluteUrl } from "../utils/schema";

export const AJAY_VATSYAYAN_TUTOR_PATH = "/tutors/ajay-vatsyayan";

export const AJAY_VATSYAYAN_TUTOR_CARD = {
  id: "ajay-vatsyayan-premium-maths-tutor",
  slug: "ajay-vatsyayan",
  name: "Ajay Vatsyayan",
  title: "Senior Maths Home Tutor in Gurugram",
  rating: "",
  experience: "Experience shared on enquiry",
  board: "CBSE, IB and JEE Maths",
  boards: ["CBSE", "IB MYP", "IB DP", "JEE Main", "JEE Advanced"],
  classLevel: "Class 11 and Class 12",
  classesSupported: ["Class 11", "Class 12"],
  location: "Gurugram",
  sectors: ["Golf Course Road", "DLF Phase 5", "Gurugram"],
  localities: ["Golf Course Road", "DLF Phase 5", "Gurugram"],
  topics: ["Calculus", "Algebra", "Coordinate Geometry", "Trigonometry"],
  price: "Shared on enquiry",
  startingFee: "Shared on enquiry",
  mode: ["Home Tuition", "Online"],
  serviceModes: ["Home Tuition", "Online"],
  schoolFocus: [],
  image: "/images/hero-maths-home.svg",
  imageAlt: "Ajay Vatsyayan maths tutor profile",
  shortBio:
    "Ajay Vatsyayan is listed for senior-school and entrance-focused maths support for Gurugram families comparing board fit, class level, and tutor availability.",
  summary:
    "Senior-school and entrance-focused maths support for Gurugram families comparing board fit, class level, and tutor availability.",
};

export function getAjayVatsyayanPremiumTutorSchema() {
  const profileUrl = getAbsoluteUrl(AJAY_VATSYAYAN_TUTOR_PATH);

  return cleanSchemaObject({
    "@type": "Person",
    "@id": `${profileUrl}#person`,
    name: AJAY_VATSYAYAN_TUTOR_CARD.name,
    jobTitle: AJAY_VATSYAYAN_TUTOR_CARD.title,
    description: AJAY_VATSYAYAN_TUTOR_CARD.summary,
    url: profileUrl,
    image: getAbsoluteUrl(AJAY_VATSYAYAN_TUTOR_CARD.image),
    worksFor: {
      "@id": SCHEMA_IDS.localBusiness,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    workLocation: {
      "@type": "Place",
      name: "Gurugram",
    },
    knowsAbout: [
      "CBSE Mathematics",
      "IB MYP Mathematics",
      "IB DP Mathematics",
      "JEE Main Mathematics",
      "JEE Advanced Mathematics",
      "Calculus",
      "Algebra",
      "Coordinate Geometry",
      "Trigonometry",
    ],
  });
}

export default getAjayVatsyayanPremiumTutorSchema;
