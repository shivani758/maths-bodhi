import { AJAY_MAIN_PATH } from "./ajayConstants";

function normalizePath(value) {
  const [withoutHash] = String(value ?? "").split("#");
  const [withoutQuery] = withoutHash.split("?");
  const path = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  return path.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
}

const recommendationByPath = new Map([
  [
    "/",
    {
      to: "/maths-home-tutor-gurgaon/ajay-vatsyayan",
      title: "Recommended senior tutor option for advanced maths",
      description:
        "Ajay Vatsyayan is a premium Maths Bodhi mentor option for families comparing senior maths home tuition in Gurgaon/Gurugram.",
      bullets: ["IB, IGCSE, CBSE Class 12, JEE, and BITSAT fit can be discussed.", "Availability and mode are confirmed only after enquiry."],
    },
  ],
  [
    "/gurugram",
    {
      to: "/maths-home-tutor-gurgaon/ajay-vatsyayan",
      title: "Premium mentor option for Gurugram families",
      description:
        "For senior-school and entrance-level maths, Ajay can be discussed as a named tutor option after locality, board, and timing fit are checked.",
      bullets: ["Useful for premium-school corridors and advanced maths needs.", "Links to the Gurgaon/Gurugram Ajay page rather than a hidden profile."],
    },
  ],
  [
    "/city/gurugram",
    {
      to: "/maths-home-tutor-gurgaon/ajay-vatsyayan",
      title: "Premium mentor option for Gurugram families",
      description:
        "For senior-school and entrance-level maths, Ajay can be discussed as a named tutor option after locality, board, and timing fit are checked.",
      bullets: ["Useful for premium-school corridors and advanced maths needs.", "Links to the Gurgaon/Gurugram Ajay page rather than a hidden profile."],
    },
  ],
  [
    "/gurugram/class-12-maths-home-tutor",
    {
      to: "/cbse-class-12-maths-home-tutor/ajay-vatsyayan",
      title: "Recommended senior tutor option for Class 12 maths",
      description:
        "Ajay is relevant when Class 12 support needs calculus depth, vectors, 3D geometry, probability, and a calmer board-year plan.",
      bullets: ["Best discussed for senior-school maths pressure.", "Use the Class 12 Ajay page for the most relevant context."],
    },
  ],
  [
    "/ib-maths-home-tutor",
    {
      to: "/ib-dp-maths-home-tutor/ajay-vatsyayan",
      title: "Premium mentor option for IB maths",
      description:
        "For IB Diploma students, Ajay can be discussed around AA/AI pathway fit, IA planning, and paper-ready mathematical reasoning.",
      bullets: ["IB DP page is the strongest named-Ajay route.", "MYP families can use the MYP Ajay page from there."],
    },
  ],
  [
    "/gurugram/ib-maths-home-tutor",
    {
      to: "/ib-dp-maths-home-tutor/ajay-vatsyayan",
      title: "Premium mentor option for IB maths",
      description:
        "For IB Diploma students, Ajay can be discussed around AA/AI pathway fit, IA planning, and paper-ready mathematical reasoning.",
      bullets: ["IB DP page is the strongest named-Ajay route.", "MYP families can use the MYP Ajay page from there."],
    },
  ],
  [
    "/igcse-maths-home-tutor",
    {
      to: "/igcse-maths-home-tutor/ajay-vatsyayan",
      title: "Premium mentor option for IGCSE maths",
      description:
        "Ajay can be discussed for IGCSE learners who need Core or Extended method clarity, paper review, and stronger exam confidence.",
      bullets: ["Specific to Cambridge IGCSE intent.", "No separate thin Core/Extended pages at launch."],
    },
  ],
  [
    "/gurugram/igcse-maths-home-tutor",
    {
      to: "/igcse-maths-home-tutor/ajay-vatsyayan",
      title: "Premium mentor option for IGCSE maths",
      description:
        "Ajay can be discussed for IGCSE learners who need Core or Extended method clarity, paper review, and stronger exam confidence.",
      bullets: ["Specific to Cambridge IGCSE intent.", "No separate thin Core/Extended pages at launch."],
    },
  ],
  [
    "/jee-maths-coaching",
    {
      to: "/jee-main-maths-home-tutor/ajay-vatsyayan",
      title: "Senior mentor option for JEE maths",
      description:
        "Ajay can be discussed for JEE maths when the student needs chapter strategy, timed practice, and better mock-test error review.",
      bullets: ["JEE Main and Advanced pages are separate because the intent differs.", "Use the Main page unless Advanced depth is the clear priority."],
    },
  ],
  [
    "/jee-main-maths-coaching",
    {
      to: "/jee-main-maths-home-tutor/ajay-vatsyayan",
      title: "Senior mentor option for JEE Main maths",
      description:
        "Ajay can be discussed for JEE Main speed, accuracy, chapter selection, and disciplined mock review.",
      bullets: ["Best for personalised correction and planning.", "No percentile promises or fake outcome claims."],
    },
  ],
  [
    "/jee-advanced-maths-coaching",
    {
      to: "/jee-advanced-maths-home-tutor/ajay-vatsyayan",
      title: "Senior mentor option for JEE Advanced maths",
      description:
        "Ajay can be discussed when the student needs deeper multi-concept problem analysis and stronger method selection.",
      bullets: ["Advanced support is separated from Main support.", "Fit should be checked with attempted work and mock patterns."],
    },
  ],
  [
    "/gurugram/jee-maths-home-tutor",
    {
      to: "/jee-main-maths-home-tutor/ajay-vatsyayan",
      title: "Senior mentor option for JEE maths in Gurugram",
      description:
        "Ajay can be discussed for JEE maths home tuition when local scheduling, board pressure, and mock review need one coherent plan.",
      bullets: ["Links to the JEE Main Ajay route by default.", "Advanced aspirants can continue to the Advanced Ajay page."],
    },
  ],
]);

export function getAjayRecommendationForPath(path) {
  return recommendationByPath.get(normalizePath(path)) ?? null;
}

export { AJAY_MAIN_PATH };
