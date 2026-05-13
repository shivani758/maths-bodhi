import {
  batchALocalityPages,
  batchERootSeoPages,
  getBatchALocalityMeta,
  getRecoveryLocalityMeta,
  recoveryLocalityBoardPages,
} from "./seoRecoveryCluster";

function routeCard({ eyebrow, title, description, tags = [], to }) {
  return { eyebrow, title, description, tags, to };
}

function supportPoint(title, description) {
  return { title, description };
}

function faqItem(question, answer) {
  return { question, answer };
}

const gurugramSchoolContextCards = [
  routeCard({
    eyebrow: "School context",
    title: "The Shri Ram School Aravali",
    description:
      "Families around the Aravali and Golf Course Road corridor often ask how to align maths practice with school pace, worksheets, and weekly revision.",
    tags: ["Aravali corridor", "School pace", "Revision"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "Heritage Xperiential",
    description:
      "Useful local context for parents comparing Extension Road access, concept clarity, regular doubt clearing, and a tutor routine that fits school timing.",
    tags: ["Extension Road", "Concept clarity", "Doubt clearing"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "Shiv Nadar School",
    description:
      "A practical reference for families balancing school schedule, problem-solving depth, class level, and steady maths revision near the Extension corridor.",
    tags: ["School schedule", "Revision", "Problem solving"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "DPS Sector 45",
    description:
      "Families near Sector 45 often look for school-paced maths support across homework, chapter tests, written method, and board-year planning.",
    tags: ["Sector 45", "Homework", "Tests"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "Scottish High",
    description:
      "Useful when parents want maths tutoring that respects school rhythm, locality convenience, written method, and international-school expectations.",
    tags: ["Sushant Lok", "Method clarity", "School rhythm"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "Lotus Valley",
    description:
      "A practical local reference for Sector 50 and South City families comparing worksheet support, exam practice, and regular after-school maths structure.",
    tags: ["Sector 50", "Worksheets", "Exam practice"],
  }),
  routeCard({
    eyebrow: "School context",
    title: "GD Goenka",
    description:
      "Helpful context for Sohna Road and Extension Road families who need maths support that fits school schedule, travel convenience, and current confidence level.",
    tags: ["Sohna Road", "Schedule", "Confidence"],
  }),
];

function createSchoolContextCards() {
  return gurugramSchoolContextCards.map((card) => ({ ...card }));
}

const gurugramHubBoardCards = [
  routeCard({
    eyebrow: "Board route",
    title: "CBSE Maths Home Tutor",
    description:
      "For Class 6 to 12 families who want steadier school pace, worksheet follow-through, and board-year planning.",
    tags: ["Class 6 to 12", "Board prep"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "ICSE and ISC Maths Home Tutor",
    description:
      "For written method, school structure, and senior-school maths support that feels calmer and more organised.",
    tags: ["ICSE", "ISC"],
    to: "/gurugram/icse-isc-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "For Core and Extended learners who need method clarity, paper confidence, and a steadier exam routine.",
    tags: ["Core", "Extended"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IB Maths Home Tutor",
    description:
      "For pathway-aware support across MYP and Diploma maths, especially in premium-school corridors.",
    tags: ["MYP", "DP"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "JEE Maths Home Tutor",
    description:
      "For Main and Advanced preparation with stronger problem selection, speed, and weekly discipline.",
    tags: ["JEE Main", "JEE Advanced"],
    to: "/gurugram/jee-maths-home-tutor",
  }),
];

const gurugramHubSectorCards = [
  routeCard({
    eyebrow: "Locality route",
    title: "Sector 54",
    description:
      "Premium Golf Course Road access with strong fit for IB, IGCSE, and advanced school maths support.",
    tags: ["Golf Course Road", "Premium schools"],
    to: "/gurugram/sector-54",
  }),
  routeCard({
    eyebrow: "Locality route",
    title: "Sector 55",
    description:
      "Useful for families who want flexible after-school scheduling near major premium-school corridors.",
    tags: ["Flexible timing", "School corridor"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Locality route",
    title: "Sector 56",
    description:
      "A strong mixed-demand pocket for IB, IGCSE, CBSE, and JEE maths home tuition in Gurugram.",
    tags: ["Mixed board demand", "Premium locality"],
    to: "/gurugram/sector-56",
  }),
  routeCard({
    eyebrow: "Locality route",
    title: "Golf Course Road",
    description:
      "A corridor-level page for premium-school families comparing locality fit, school access, and board-specific maths tutoring.",
    tags: ["Corridor page", "School access"],
    to: "/gurugram/golf-course-road",
  }),
];

const gurugramHubMoreLocalityCards = [
  routeCard({
    eyebrow: "Locality route",
    title: "Sector 57",
    description:
      "Useful for families around Mayfield Garden and Sushant Lok 3 who want board support with practical weekday home-tuition flow.",
    tags: ["Mixed demand", "After-school routine"],
    to: "/gurugram/sector-57",
  }),
  routeCard({
    eyebrow: "Locality route",
    title: "Sector 62",
    description:
      "A premium-corridor route for families comparing Golf Course Extension access, international-school rhythm, and maths tutor fit.",
    tags: ["Premium corridor", "International-school fit"],
    to: "/gurugram/sector-62",
  }),
  routeCard({
    eyebrow: "Corridor route",
    title: "Sohna Road",
    description:
      "A practical Gurugram route for families balancing school pace, board pressure, and travel convenience across the Sohna Road belt.",
    tags: ["Board and JEE", "Travel fit"],
    to: "/gurugram/sohna-road",
  }),
  routeCard({
    eyebrow: "Neighbourhood route",
    title: "DLF Phase 1",
    description:
      "A focused page for families near Golf Course Road who want premium-school-aware maths support with home-tuition convenience.",
    tags: ["DLF", "Golf Course Road"],
    to: "/gurugram/dlf-phase-1",
  }),
  routeCard({
    eyebrow: "Neighbourhood route",
    title: "DLF Phase 4",
    description:
      "Useful for families in the DLF Phase 4 belt comparing premium-corridor access, board fit, and calmer scheduling.",
    tags: ["DLF", "Premium corridor"],
    to: "/gurugram/dlf-phase-4",
  }),
  routeCard({
    eyebrow: "Neighbourhood route",
    title: "South City 1",
    description:
      "A school-support-led route for families who want sharper chapter follow-through, homework structure, and board readiness.",
    tags: ["School support", "Weekday slots"],
    to: "/gurugram/south-city-1",
  }),
  routeCard({
    eyebrow: "Neighbourhood route",
    title: "Sushant Lok 1",
    description:
      "Useful for central Gurugram families who want locality convenience while still comparing class-wise and board-wise maths routes.",
    tags: ["Central Gurugram", "Class-wise support"],
    to: "/gurugram/sushant-lok-1",
  }),
];

const gurugramHubSectorSocietyCards = batchERootSeoPages.map((page) =>
  routeCard({
    eyebrow: page.group === "batch-e-society" ? "Society route" : "Sector route",
    title: page.societyLabel ? `Near ${page.societyLabel}` : page.localityLabel,
    description: page.societyLabel
      ? `Use this route when society access, nearby sector fit, and board needs matter for regular maths support.`
      : `Use this sector route when travel convenience, school timing, and tutor fit need to be compared together.`,
    tags: [page.localityLabel, page.societyLabel ?? "Sector", "Gurugram"].filter(Boolean),
    to: page.path,
  }),
);

const gurugramHubServiceCards = [
  routeCard({
    eyebrow: "Class route",
    title: "Class 10 Maths Home Tutor",
    description:
      "For school tests, board-style written practice, chapter clarity, and steadier revision support in Gurugram.",
    tags: ["Class 10", "Board readiness"],
    to: "/gurugram/class-10-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 12 Maths Home Tutor",
    description:
      "For senior-school maths support, exam structure, and a more dependable weekly problem-solving routine.",
    tags: ["Class 12", "Senior school"],
    to: "/gurugram/class-12-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Format route",
    title: "Online Maths Tuition",
    description:
      "For families who want structured maths support in Gurugram with online flexibility, notes, and revision continuity.",
    tags: ["Online", "Flexible schedule"],
    to: "/gurugram/online-maths-tuition",
  }),
];

const gurugramHubFaqs = [
  faqItem(
    "Should families start with the board page or the Gurugram hub first?",
    "If the board or exam path is already clear, open that board page first. If the family is still comparing locality, school corridor, and board fit together, the Gurugram hub is the better starting point.",
  ),
  faqItem(
    "Does Gurugram maths home tuition here cover both school support and exam preparation?",
    "Yes. The hub is designed to help families move into the right board route for school maths, board preparation, or entrance-focused support without mixing all needs into one generic page.",
  ),
  faqItem(
    "Are locality pages different from the Gurugram hub?",
    "Yes. The hub gives the city-wide view, while locality pages focus on corridor fit, nearby school context, and the practical convenience of home tuition in that part of Gurugram.",
  ),
  faqItem(
    "Can families still choose online maths support from these pages?",
    "Yes. The pages are written for maths home tuition in Gurugram, but they still point families toward tutors who can support home, online, or mixed formats where appropriate.",
  ),
];

const cbseLocalityCards = [
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 56",
    description:
      "A practical option for Class 9 to 12 families who want stronger board structure without losing travel convenience.",
    tags: ["Class 9 to 12", "Board routine"],
    to: "/gurugram/sector-56",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 55",
    description:
      "Helpful for families balancing school homework, tests, and weekday timing across busy after-school routines.",
    tags: ["Weekday slots", "School support"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Gurugram Hub",
    description:
      "Use the city hub to compare other board routes and locality pages before final shortlisting.",
    tags: ["City overview", "Board comparison"],
    to: "/gurugram",
  }),
];

const icseLocalityCards = [
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 55",
    description:
      "Useful for families who want structured written-method support with more flexibility around school timing.",
    tags: ["Written method", "Flexible schedule"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 56",
    description:
      "A steady option for ICSE and ISC students who need senior-school support without losing locality convenience.",
    tags: ["Senior school", "Local access"],
    to: "/gurugram/sector-56",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Gurugram Hub",
    description:
      "Go back to the hub if the family still needs to compare ICSE and ISC with other maths routes in the city.",
    tags: ["City overview", "Board comparison"],
    to: "/gurugram",
  }),
];

const igcseLocalityCards = [
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 54",
    description:
      "A strong fit for Golf Course Road families who want premium-school familiarity and clearer IGCSE exam technique.",
    tags: ["Golf Course Road", "Premium schools"],
    to: "/gurugram/sector-54",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 56",
    description:
      "Useful for families who want IGCSE support with stronger tutor availability and stable weekday travel.",
    tags: ["Tutor availability", "Extended maths"],
    to: "/gurugram/sector-56",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Golf Course Road",
    description:
      "Open the corridor page for a broader premium-school view before choosing a tutor or exact locality.",
    tags: ["Corridor view", "International-school fit"],
    to: "/gurugram/golf-course-road",
  }),
];

const ibLocalityCards = [
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 54",
    description:
      "Strong for IB families who want Golf Course Road access and school-aware tutoring close to premium-school clusters.",
    tags: ["IB corridor", "School fit"],
    to: "/gurugram/sector-54",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 55",
    description:
      "Useful for MYP and Diploma families balancing school demand with a more flexible home-tuition routine.",
    tags: ["MYP", "DP"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Golf Course Road",
    description:
      "Use the corridor page to compare premium-school context before narrowing to one tutor or one locality.",
    tags: ["Premium schools", "Corridor view"],
    to: "/gurugram/golf-course-road",
  }),
];

const jeeLocalityCards = [
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 56",
    description:
      "A practical option for students who want stronger weekly discipline and high-intent maths support near premium corridors.",
    tags: ["Problem solving", "Weekday routine"],
    to: "/gurugram/sector-56",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Sector 55",
    description:
      "Useful when families want manageable travel and structured after-school maths support alongside senior-school pressure.",
    tags: ["After-school support", "Senior classes"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Useful locality",
    title: "Gurugram Hub",
    description:
      "Use the city hub to compare JEE maths against board-led tutoring needs before making the final call.",
    tags: ["City overview", "Compare routes"],
    to: "/gurugram",
  }),
];

const sector54BoardCards = [
  routeCard({
    eyebrow: "Popular board route",
    title: "IB Maths Home Tutor",
    description:
      "A strong fit for pathway-aware maths support near premium schools around Sector 54 and Golf Course Road.",
    tags: ["IB", "Pathway-aware"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Popular board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "Useful for Core and Extended learners who need cleaner written method and steadier exam fit.",
    tags: ["IGCSE", "Method clarity"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Go back to the Gurugram hub to compare locality pages, tutors, and the major maths board routes together.",
    tags: ["City hub", "Compare pages"],
    to: "/gurugram",
  }),
];

const sector55BoardCards = [
  routeCard({
    eyebrow: "Popular board route",
    title: "IB Maths Home Tutor",
    description:
      "Useful for MYP and Diploma families who want flexible scheduling near major premium-school corridors.",
    tags: ["IB", "Flexible schedule"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Popular board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "A strong option when families want international-school maths support with calmer weekly structure.",
    tags: ["IGCSE", "School fit"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Popular board route",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful for families who want stronger school follow-through and practical board-year support in one-to-one home tuition.",
    tags: ["CBSE", "Board support"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
];

const sector56BoardCards = [
  routeCard({
    eyebrow: "Popular board route",
    title: "IB Maths Home Tutor",
    description:
      "A strong option for premium-locality families comparing pathway-aware maths support and tutor availability.",
    tags: ["IB", "Tutor availability"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Popular board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "Useful for written-method support, paper confidence, and international-school maths routines.",
    tags: ["IGCSE", "Exam technique"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Popular board route",
    title: "JEE Maths Home Tutor",
    description:
      "Relevant for senior-school students who want problem solving, speed, and steadier weekly preparation.",
    tags: ["JEE", "Senior school"],
    to: "/gurugram/jee-maths-home-tutor",
  }),
];

const golfCourseRoadBoardCards = [
  routeCard({
    eyebrow: "Board route",
    title: "IB Maths Home Tutor",
    description:
      "For MYP and Diploma learners who need pathway-aware home tuition near premium-school clusters.",
    tags: ["IB", "Premium schools"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "For international-school learners who need clearer method, exam fit, and steadier one-to-one correction.",
    tags: ["IGCSE", "Method clarity"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "CBSE Maths Home Tutor",
    description:
      "For families who still want a strong school-support and board-prep route inside the Golf Course Road corridor.",
    tags: ["CBSE", "School support"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
];

const golfCourseRoadSectorCards = [
  routeCard({
    eyebrow: "Nearby locality",
    title: "Sector 54",
    description:
      "Useful for Golf Course Road families who want closer locality context with strong IB and IGCSE relevance.",
    tags: ["Sector 54", "IB and IGCSE"],
    to: "/gurugram/sector-54",
  }),
  routeCard({
    eyebrow: "Nearby locality",
    title: "Sector 55",
    description:
      "A flexible route for families comparing schedule fit, corridor convenience, and premium-school access.",
    tags: ["Sector 55", "Flexible timing"],
    to: "/gurugram/sector-55",
  }),
  routeCard({
    eyebrow: "Nearby locality",
    title: "Sector 56",
    description:
      "A broader mixed-demand option for IB, IGCSE, CBSE, and JEE maths home tuition in one premium locality.",
    tags: ["Sector 56", "Mixed demand"],
    to: "/gurugram/sector-56",
  }),
];

const sector57BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the hub to compare other Gurugram board, class, and locality pages before shortlisting one maths route.",
    tags: ["City hub", "Compare pages"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "CBSE Maths Home Tutor",
    description:
      "A practical next page for families who want stronger school rhythm, chapter review, and board-year structure.",
    tags: ["CBSE", "Board routine"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IGCSE Maths Home Tutor",
    description:
      "Relevant when the student needs clearer written method, calmer correction, and steadier paper confidence.",
    tags: ["IGCSE", "Method clarity"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 10 Maths Home Tutor",
    description:
      "Useful when the immediate priority is board-style revision, chapter clarity, and regular worksheet follow-through.",
    tags: ["Class 10", "Revision support"],
    to: "/gurugram/class-10-maths-home-tutor",
  }),
];

const sector62BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Go back to the hub to compare premium corridors, major boards, and the most practical next page in Gurugram.",
    tags: ["City hub", "Premium corridors"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IB Maths Home Tutor",
    description:
      "A strong fit for families comparing pathway-aware support and premium-school rhythm around this corridor.",
    tags: ["IB", "Premium-school fit"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IGCSE Maths Home Tutor",
    description:
      "Useful for Core and Extended students who need method-first tutoring and steadier exam structure.",
    tags: ["IGCSE", "Exam fit"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Corridor page",
    title: "Golf Course Road",
    description:
      "Open the corridor page when the family wants the broader premium-school and nearby-locality view first.",
    tags: ["Corridor page", "Nearby localities"],
    to: "/gurugram/golf-course-road",
  }),
];

const sohnaRoadBoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the hub to compare Sohna Road against other Gurugram pockets before narrowing the maths conversation further.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful for school-paced maths support, worksheets, pre-boards, and chapter-by-chapter consistency.",
    tags: ["CBSE", "School rhythm"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "JEE Maths Home Tutor",
    description:
      "Relevant for senior-school families who want stronger problem selection, speed, and weekly test review.",
    tags: ["JEE", "Problem solving"],
    to: "/gurugram/jee-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 12 Maths Home Tutor",
    description:
      "Useful when senior-school maths pressure is already the main issue, even before the final board or exam route is chosen.",
    tags: ["Class 12", "Senior school"],
    to: "/gurugram/class-12-maths-home-tutor",
  }),
];

const dlfPhase1BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Go back to the hub to compare DLF pockets with Golf Course Road pages and the main Gurugram maths routes.",
    tags: ["City hub", "Compare pages"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IB Maths Home Tutor",
    description:
      "Useful when the family wants pathway-aware support and premium-school familiarity close to this corridor.",
    tags: ["IB", "Pathway-aware"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IGCSE Maths Home Tutor",
    description:
      "A practical next page for international-school learners who need written method and exam-fit support.",
    tags: ["IGCSE", "Method-first"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Corridor page",
    title: "Golf Course Road",
    description:
      "Open the corridor page for the wider premium-school and nearby-locality view before choosing a tutor.",
    tags: ["Golf Course Road", "Premium corridor"],
    to: "/gurugram/golf-course-road",
  }),
];

const dlfPhase4BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the Gurugram hub to compare DLF Phase 4 with other premium localities and board-led maths routes.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IB Maths Home Tutor",
    description:
      "Relevant for families who want calmer revision structure and premium-corridor tutor fit for IB maths.",
    tags: ["IB", "Revision structure"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "IGCSE Maths Home Tutor",
    description:
      "Useful for students who need stronger method clarity and a steadier international-school maths routine.",
    tags: ["IGCSE", "School fit"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "CBSE Maths Home Tutor",
    description:
      "A practical next page for families who want school tests, revision rhythm, and board-year follow-through.",
    tags: ["CBSE", "Board support"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
];

const southCity1BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Go back to the hub to compare South City 1 with class-wise and board-wise maths pages across Gurugram.",
    tags: ["City hub", "Compare pages"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful for families who want stronger school follow-through, chapter testing, and board readiness in one place.",
    tags: ["CBSE", "School support"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 10 Maths Home Tutor",
    description:
      "A helpful next page when the student needs regular worksheet practice, board-style questions, and revision support.",
    tags: ["Class 10", "Worksheets"],
    to: "/gurugram/class-10-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 12 Maths Home Tutor",
    description:
      "Useful when senior-school maths pressure is the bigger concern than locality alone.",
    tags: ["Class 12", "Exam structure"],
    to: "/gurugram/class-12-maths-home-tutor",
  }),
];

const sushantLok1BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the hub if the family still wants to compare this locality with other Gurugram boards, classes, and sectors.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Useful board page",
    title: "CBSE Maths Home Tutor",
    description:
      "A practical next page for homework rhythm, chapter clarity, and steadier school maths support.",
    tags: ["CBSE", "Homework rhythm"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Class route",
    title: "Class 10 Maths Home Tutor",
    description:
      "Useful when the immediate need is board-style revision and cleaner chapter follow-through.",
    tags: ["Class 10", "Board readiness"],
    to: "/gurugram/class-10-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Format route",
    title: "Online Maths Tuition",
    description:
      "Helpful when the family wants locality convenience but still needs flexible online scheduling during busy weeks.",
    tags: ["Online", "Flexible timing"],
    to: "/gurugram/online-maths-tuition",
  }),
];

const class10BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Go back to the hub to compare Class 10 needs with locality pages and the main board-specific routes in Gurugram.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful for Class 10 students who need worksheets, chapter tests, and calmer pre-board structure.",
    tags: ["CBSE", "Board prep"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "ICSE and ISC Maths Home Tutor",
    description:
      "Relevant for written method, school structure, and more organised correction during board-season build-up.",
    tags: ["ICSE", "Written method"],
    to: "/gurugram/icse-isc-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "Useful for students who need clearer written working and steadier exam technique in Class 10 maths.",
    tags: ["IGCSE", "Exam fit"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
];

const class12BoardCards = [
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the hub to compare Class 12 maths support with Gurugram locality pages and the main board and exam routes.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful for Class 12 board preparation, chapter planning, and a steadier revision rhythm.",
    tags: ["CBSE", "Board prep"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IB Maths Home Tutor",
    description:
      "Relevant for senior international-school learners who need pathway-aware support and calmer problem-solving structure.",
    tags: ["IB", "Senior school"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Exam route",
    title: "JEE Maths Home Tutor",
    description:
      "Useful when Class 12 maths support also needs Main or Advanced style problem-solving discipline.",
    tags: ["JEE", "Problem solving"],
    to: "/gurugram/jee-maths-home-tutor",
  }),
];

const onlineMathsRouteCards = [
  routeCard({
    eyebrow: "Homepage",
    title: "Maths Bodhi Home",
    description:
      "Go back to the homepage for the full Gurugram maths overview, boards, localities, and tutor discovery routes.",
    tags: ["Homepage", "Full overview"],
    to: "/",
  }),
  routeCard({
    eyebrow: "Main city page",
    title: "Gurugram Hub",
    description:
      "Use the Gurugram hub when the family still wants to compare locality fit alongside online maths support.",
    tags: ["City hub", "Compare routes"],
    to: "/gurugram",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "CBSE Maths Home Tutor",
    description:
      "Useful if the online tutoring plan still needs school-paced chapter review and board-year structure.",
    tags: ["CBSE", "Board routine"],
    to: "/gurugram/cbse-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IB Maths Home Tutor",
    description:
      "Relevant when the student needs pathway-aware maths support but the family wants online flexibility.",
    tags: ["IB", "Flexible support"],
    to: "/gurugram/ib-maths-home-tutor",
  }),
  routeCard({
    eyebrow: "Board route",
    title: "IGCSE Maths Home Tutor",
    description:
      "A practical next page for online learners who need method-first correction and paper-fit support.",
    tags: ["IGCSE", "Method clarity"],
    to: "/gurugram/igcse-maths-home-tutor",
  }),
];

export const futureClassPageConfigs = [];

export const futureExamPageConfigs = [];

export const gurugramHubPageConfig = {
  id: "gurugram-hub",
  slug: "gurugram",
  routePath: "/gurugram",
  pageType: "city",
  template: "GenericPageTemplate",
  title: "Gurugram maths home tuition",
  h1: "Maths home tutor in Gurugram for board-wise, class-wise, and locality-wise support",
  intro:
    "Use Gurugram as the main hub when the family wants to compare CBSE, ICSE and ISC, IGCSE, IB, JEE, and the premium localities where maths home tuition demand is strongest.",
  sectionDefinitions: [
    { id: "hero", template: "hero", enabled: true },
    { id: "support-points", template: "support-points", enabled: true },
    { id: "route-groups", template: "route-groups", enabled: true },
    { id: "featured-tutors", template: "featured-tutors", enabled: true },
    { id: "student-results", template: "student-results", enabled: true },
    { id: "related-blogs", template: "related-blogs", enabled: true },
    { id: "faqs", template: "faqs", enabled: true },
    { id: "cta", template: "cta", enabled: true },
  ],
  relatedTutorQuery: {
    kind: "city",
    citySlug: "gurugram",
    cityLabel: "Gurugram",
    limit: 6,
  },
  relatedBlogQuery: {
    kind: "recent",
    limit: 4,
  },
  relatedResultQuery: {
    kind: "city",
    citySlug: "gurugram",
    limit: 3,
  },
  faqReferences: gurugramHubFaqs.map((item) => item.question),
  seoTitle: "Maths Home Tutor in Gurugram | CBSE, ICSE, IGCSE, IB, and JEE Support",
  seoDescription:
    "Explore maths home tuition in Gurugram with board-specific pages, premium locality routes, featured tutors, and related maths guides.",
  canonicalUrl: "/gurugram",
  breadcrumbItems: [
    { label: "Home", to: "/" },
    { label: "Gurugram" },
  ],
  schemaType: "LocalBusiness",
  publishStatus: "published",
  sections: {
    hero: {
      badge: "Gurugram Maths Hub",
      chips: [
        "CBSE Class 6 to 12",
        "ICSE / ISC",
        "IGCSE",
        "IB",
        "JEE",
        "Sector-based home tuition",
      ],
      stats: [
        { value: "5", label: "Board-led pages" },
        { value: "11", label: "Locality and corridor pages" },
        { value: "3", label: "Class and format routes" },
      ],
      supportPanel: {
        title: "Start with the right maths route inside Gurugram",
        text:
          "This hub is built for families who want one practical place to compare board fit, locality convenience, and the tutors most relevant to the student's current maths pressure.",
        bullets: [
          "Compare the main maths boards first",
          "Move into the locality page if travel and school corridor matter",
          "Use tutor cards and guides to shortlist the next conversation",
        ],
      },
    },
    supportPoints: {
      badge: "How To Use This Hub",
      title: "What usually matters most when families choose maths home tuition in Gurugram",
      subtitle:
        "The most useful first step is usually to keep academic fit and locality fit together instead of treating them as separate decisions.",
      points: [
        supportPoint(
          "Board first, locality second",
          "Once the board or exam path is clear, it becomes easier to judge tutor style, class fit, and which part of Gurugram makes the most sense for regular home tuition.",
        ),
        supportPoint(
          "Premium school corridors need school-aware support",
          "Golf Course Road, Golf Course Extension Road, and nearby sectors often need board-specific tutoring that respects international-school pacing as well as home-tuition convenience.",
        ),
        supportPoint(
          "Board-year and entrance prep need a different shortlisting logic",
          "CBSE board years and JEE maths usually depend on routine, correction, and weekly discipline rather than only on solving more questions.",
        ),
      ],
    },
    routeGroups: [
      {
        id: "gurugram-school-context",
        badge: "School Context",
        title: "School and locality context families often mention in Gurugram maths enquiries",
        subtitle:
          "Use these school-area cues to explain the student's schedule, worksheet rhythm, and nearby travel context more clearly.",
        note:
          "School names are included only as local planning context. Maths Bodhi is not officially affiliated with these schools.",
        cards: createSchoolContextCards("Gurugram"),
        className: "grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3",
      },
      {
        id: "gurugram-board-links",
        badge: "By Board",
        title: "Open the Gurugram board page that matches the student's maths path",
        subtitle:
          "Each board page keeps the maths intent specific so the family can compare tutors, localities, and next steps more quickly.",
        cards: gurugramHubBoardCards,
      },
      {
        id: "gurugram-locality-links",
        badge: "By Locality",
        title: "Find maths home tutors by Gurugram locality",
        subtitle:
          "Choose the area that best matches the student's school corridor, travel routine, and home tuition preference.",
        cards: gurugramHubSectorCards,
        searchable: true,
        searchLabel: "Search Gurugram locality",
        searchPlaceholder: "Try Sector 54, Sector 56, Golf Course Road, or DLF",
        initialVisibleCount: 6,
        loadStep: 6,
        itemLabel: "localities",
        backgroundClassName: "bg-slate-50",
      },
      {
        id: "gurugram-more-locality-links",
        badge: "More Localities",
        title: "Choose another Gurugram sector or neighbourhood",
        subtitle:
          "Choose your area to explore relevant home tuition support nearby.",
        cards: gurugramHubMoreLocalityCards,
        searchable: true,
        searchLabel: "Search sector or neighbourhood",
        searchPlaceholder: "Try Sector 57, Sector 62, Sohna Road, South City, or Sushant Lok",
        initialVisibleCount: 6,
        loadStep: 6,
        itemLabel: "localities",
      },
      {
        id: "gurugram-sector-society-links",
        badge: "Sectors And Societies",
        title: "Find maths home tutors by Gurugram sector or society",
        subtitle:
          "Choose your area to explore relevant home tuition support nearby.",
        cards: gurugramHubSectorSocietyCards,
        searchable: true,
        searchLabel: "Search sector, society, or nearby area",
        searchPlaceholder: "Try Sector 46, DLF Crest, Park Place, or a nearby area",
        initialVisibleCount: 6,
        loadStep: 6,
        itemLabel: "sectors and societies",
        loadMoreLabel: "Load more sectors",
        showLessLabel: "Show fewer sectors",
        backgroundClassName: "bg-slate-50",
      },
      {
        id: "gurugram-class-service-links",
        badge: "By Class And Format",
        title: "Use these Gurugram pages when class pressure or online format matters first",
        subtitle:
          "Some families are already clear that the immediate issue is Class 10, Class 12, or a more flexible online maths routine. These pages support that decision cleanly.",
        cards: gurugramHubServiceCards,
        backgroundClassName: "bg-slate-50",
      },
    ],
    featuredTutors: {
      badge: "Featured Tutors",
      title: "Featured maths tutors across Gurugram",
      subtitle:
        "These tutors help families compare board fit, locality fit, and the teaching style that feels right before booking a first conversation.",
    },
    studentResults: {
      badge: "Student Results",
      title: "Recent maths progress stories connected to Gurugram",
      subtitle:
        "These results help families understand the kinds of academic changes that usually come from more structured one-to-one maths support.",
    },
    relatedBlogs: {
      badge: "Related Blogs",
      title: "Maths guides families often read next from the Gurugram hub",
      subtitle:
        "These guides make it easier to compare board fit, revision rhythm, and the kind of tutoring structure that usually matters most.",
    },
    faqs: gurugramHubFaqs,
    cta: {
      title: "Move from browsing Gurugram pages into the right maths conversation",
      description:
        "Share the board, class, school, locality, and the chapters or paper patterns causing the most friction. Maths Bodhi can guide the next step on WhatsApp.",
      primaryAction: {
        label: "Book a Gurugram maths demo",
        to: "/book-demo",
      },
    },
  },
};

export const batchOneGurugramEntryConfigs = [
  {
    id: "gurugram-cbse-board-service",
    slug: "cbse-maths-home-tutor",
    routePath: "/gurugram/cbse-maths-home-tutor",
    pageType: "service",
    template: "GenericPageTemplate",
    title: "CBSE maths home tuition in Gurugram",
    h1: "CBSE maths home tutor in Gurugram for Class 6 to 12, school pace, and board preparation",
    intro:
      "Use this Gurugram CBSE page when the family wants practical maths home tuition for worksheets, chapter tests, school rhythm, and calmer board-year preparation.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["CBSE", "Board Prep", "Class 10", "Class 12", "Class 6", "Class 9"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["CBSE", "Board Prep", "Class 10", "Class 12"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      tokens: ["CBSE", "Class 10", "Class 12", "Class 7"],
      limit: 3,
    },
    faqReferences: [
      "Which CBSE classes are usually supported?",
      "Does CBSE home tuition help with both school and board prep?",
      "How should families use locality pages from here?",
    ],
    seoTitle: "CBSE Maths Home Tutor in Gurugram | Class 6 to 12 Board Support",
    seoDescription:
      "Find a CBSE maths home tutor in Gurugram for Class 6 to 12, school worksheets, chapter clarity, and board-year preparation.",
    canonicalUrl: "/gurugram/cbse-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "CBSE Maths Home Tutor" },
    ],
    schemaType: "Service",
    publishStatus: "published",
    boardKey: "cbse",
    sections: {
      hero: {
        badge: "CBSE Maths in Gurugram",
        chips: [
          "Class 6 to 12",
          "School worksheets",
          "Chapter tests",
          "Pre-board planning",
          "Board prep",
        ],
        stats: [
          { value: "6 to 12", label: "Classes commonly supported" },
          { value: "1:1", label: "Home tuition format" },
          { value: "Local", label: "Gurugram coverage" },
        ],
        supportPanel: {
          title: "CBSE maths support works best when routine is stronger than panic",
          text:
            "Families usually do better when the tutoring plan follows school pace, corrects worksheet habits, and builds a repeatable revision rhythm before the board year starts feeling heavy.",
          bullets: [
            "School workbook and notebook follow-through matters",
            "Class 9 to 12 often need steadier test and formula review",
            "Board preparation becomes easier when weekly routines are clear",
          ],
        },
      },
      supportPoints: {
        badge: "Why Families Choose This Route",
        title: "What this CBSE Gurugram page is built to solve",
        subtitle:
          "This page keeps the maths conversation specific to school rhythm, board pace, and the realities of after-school home tuition inside Gurugram.",
        points: [
          supportPoint(
            "School pace and worksheet correction",
            "A good CBSE maths tutor should connect class teaching, homework, and chapter tests instead of treating them as separate problems.",
          ),
          supportPoint(
            "Class 10 and 12 board structure",
            "Board-year gains usually come from calmer weekly planning, written practice, and better correction loops rather than last-minute intensity alone.",
          ),
          supportPoint(
            "Class 6 to 9 foundation without confusion",
            "Many families need stronger basics before the board years. One-to-one home tuition helps when maths confidence is already dipping early.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "cbse-localities",
          badge: "Useful Localities",
          title: "Locality pages that often make sense for CBSE maths families in Gurugram",
          subtitle:
            "These pages help families compare CBSE support with sector-level travel convenience and premium locality fit.",
          cards: cbseLocalityCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Featured CBSE maths tutors in Gurugram",
        subtitle:
          "Use these tutor cards when the family wants clearer board fit, homework discipline, and school-aware maths support.",
      },
      studentResults: {
        badge: "Student Results",
        title: "CBSE maths results and progress patterns from Gurugram",
        subtitle:
          "These examples stay close to school support, board pacing, and the structured routines families usually want from one-to-one tutoring.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "CBSE maths guides families often open next",
        subtitle:
          "These guides help parents think more clearly about routine, board prep, and what a better tutoring structure usually looks like.",
      },
      faqs: [
        faqItem(
          "Which CBSE classes are usually supported from this Gurugram page?",
          "This page is designed for Class 6 to 12 maths support, with the biggest demand usually coming from Classes 8 to 12 where school pace and exam pressure become harder to manage alone.",
        ),
        faqItem(
          "Does CBSE home tuition here help with both school support and board preparation?",
          "Yes. The most useful plans usually keep school worksheets, chapter tests, pre-boards, and board-style revision connected instead of teaching them in isolation.",
        ),
        faqItem(
          "How should families use the Gurugram locality pages from here?",
          "If travel, school corridor, or premium locality fit matters, open the relevant Gurugram locality page next. That helps the family compare the same board need with a more practical sector view.",
        ),
      ],
      cta: {
        title: "Start the right CBSE maths conversation in Gurugram",
        description:
          "Share the class, school, recent maths score, and the chapters or paper patterns creating stress. Maths Bodhi can suggest the next step on WhatsApp.",
        primaryAction: {
          label: "Book a CBSE maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-icse-isc-board-service",
    slug: "icse-isc-maths-home-tutor",
    routePath: "/gurugram/icse-isc-maths-home-tutor",
    pageType: "service",
    template: "GenericPageTemplate",
    title: "ICSE and ISC maths home tuition in Gurugram",
    h1: "ICSE and ISC maths home tutor in Gurugram for written method, structure, and senior-school support",
    intro:
      "Use this Gurugram ICSE and ISC page when the family wants clearer written maths, steadier school structure, and one-to-one support that feels organised rather than rushed.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["ICSE", "ISC", "Written Method", "Class 9", "Class 10", "Senior School"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["ICSE", "ISC", "Written Method"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      tokens: ["ICSE", "ISC", "Class 9"],
      limit: 3,
    },
    faqReferences: [
      "Is this page useful for both ICSE and ISC maths?",
      "What usually matters most in ICSE and ISC tutoring?",
      "Can families still use this page mainly for school support?",
    ],
    seoTitle: "ICSE ISC Maths Home Tutor in Gurugram | Written Method and Senior School Support",
    seoDescription:
      "Find ICSE and ISC maths home tuition in Gurugram with written-method support, school structure, and senior-school maths planning.",
    canonicalUrl: "/gurugram/icse-isc-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "ICSE and ISC Maths Home Tutor" },
    ],
    schemaType: "Service",
    publishStatus: "published",
    boardKey: "icse-isc",
    sections: {
      hero: {
        badge: "ICSE and ISC Maths in Gurugram",
        chips: [
          "Written method",
          "School structure",
          "Class 8 to 12",
          "Senior-school maths",
          "One-to-one correction",
        ],
        stats: [
          { value: "ICSE", label: "Junior and middle school support" },
          { value: "ISC", label: "Senior-school continuity" },
          { value: "1:1", label: "Home-tuition format" },
        ],
        supportPanel: {
          title: "ICSE and ISC maths usually improve once structure becomes calmer",
          text:
            "Many students partly understand the chapter but still lose marks because written steps, school rhythm, and weekly follow-through are not steady enough.",
          bullets: [
            "Written presentation matters as much as conceptual recall",
            "School-paper follow-through should stay regular",
            "Senior-school maths needs a more organised weekly rhythm",
          ],
        },
      },
      supportPoints: {
        badge: "Why Families Choose This Route",
        title: "What this ICSE and ISC Gurugram page is built to solve",
        subtitle:
          "This page stays focused on the tutoring patterns that usually matter most for school structure, written method, and steadier senior-school maths.",
        points: [
          supportPoint(
            "Written method and neat step order",
            "Students often need better written control and more disciplined notebook habits before school papers start feeling easier.",
          ),
          supportPoint(
            "Steadier school follow-through",
            "A strong tutoring plan should stay connected to chapter tests, school worksheets, and weekly correction rather than only chasing marks later.",
          ),
          supportPoint(
            "Senior-school continuity",
            "ISC learners often need calmer support across longer algebra, calculus, and written questions where presentation and judgement both matter.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "icse-localities",
          badge: "Useful Localities",
          title: "Locality pages that often make sense for ICSE and ISC maths families in Gurugram",
          subtitle:
            "These pages help parents compare written-method support with locality convenience and senior-school practicality.",
          cards: icseLocalityCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Featured ICSE and ISC maths tutors in Gurugram",
        subtitle:
          "These tutor cards are most useful when the family wants stronger structure, clearer presentation, and calmer school-paper follow-through.",
      },
      studentResults: {
        badge: "Student Results",
        title: "ICSE and ISC-style maths progress stories from Gurugram",
        subtitle:
          "These examples stay close to the written-method and consistency gains families usually want from one-to-one maths support.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "ICSE and ISC maths guides families often open next",
        subtitle:
          "These guides help families understand why clearer written work and a steadier weekly rhythm often change school outcomes.",
      },
      faqs: [
        faqItem(
          "Is this page useful for both ICSE and ISC maths students in Gurugram?",
          "Yes. It keeps junior and senior-school maths under one practical route while still focusing on the structural differences that usually matter as students move higher.",
        ),
        faqItem(
          "What usually matters most in ICSE and ISC maths tutoring?",
          "Families usually want better written method, more organised school support, and a calmer correction process that stops the same errors from returning every week.",
        ),
        faqItem(
          "Can families still use this page when the need is mainly school support right now?",
          "Yes. Many ICSE and ISC families begin with school-led maths support and only widen the plan later when pre-boards, boards, or senior-school depth start to matter more.",
        ),
      ],
      cta: {
        title: "Start the right ICSE or ISC maths conversation in Gurugram",
        description:
          "Share the class, school, and the types of errors or chapters causing repeated friction. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book an ICSE ISC maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-igcse-board-service",
    slug: "igcse-maths-home-tutor",
    routePath: "/gurugram/igcse-maths-home-tutor",
    pageType: "service",
    template: "GenericPageTemplate",
    title: "IGCSE maths home tuition in Gurugram",
    h1: "IGCSE maths home tutor in Gurugram for Core, Extended, method clarity, and exam fit",
    intro:
      "Use this Gurugram IGCSE page when the family wants stronger written method, cleaner exam technique, and one-to-one home tuition that matches Core or Extended maths properly.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["IGCSE", "Core", "Extended", "Exam Technique", "Method Marks"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IGCSE", "Method Marks", "Exam Technique"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      tokens: ["IGCSE", "Extended Maths"],
      limit: 3,
    },
    faqReferences: [
      "Is this page useful for both Core and Extended learners?",
      "Can the same tutor handle school work and exam papers?",
      "Does locality still matter for international-school families?",
    ],
    seoTitle: "IGCSE Maths Home Tutor in Gurugram | Core Extended and Exam Support",
    seoDescription:
      "Find IGCSE maths home tuition in Gurugram for Core and Extended learners, written method, and exam confidence.",
    canonicalUrl: "/gurugram/igcse-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "IGCSE Maths Home Tutor" },
    ],
    schemaType: "Service",
    publishStatus: "published",
    boardKey: "igcse",
    sections: {
      hero: {
        badge: "IGCSE Maths in Gurugram",
        chips: [
          "Core maths",
          "Extended maths",
          "Method marks",
          "Exam technique",
          "International-school fit",
        ],
        stats: [
          { value: "Core", label: "Level-aware support" },
          { value: "Extended", label: "Exam-fit support" },
          { value: "1:1", label: "Correction-led tutoring" },
        ],
        supportPanel: {
          title: "IGCSE maths improves faster when method becomes clearer",
          text:
            "Students often know more than they can show on paper. A better tutoring plan usually starts by correcting working, notation, and question handling before simply increasing volume.",
          bullets: [
            "Core and Extended should not be treated as the same pacing problem",
            "Written method matters for school tests and final papers",
            "International-school learners often need calmer correction loops",
          ],
        },
      },
      supportPoints: {
        badge: "Why Families Choose This Route",
        title: "What this IGCSE Gurugram page is built to solve",
        subtitle:
          "The page stays focused on the method, paper style, and school-fit questions families usually ask before choosing a tutor.",
        points: [
          supportPoint(
            "Core and Extended fit",
            "A strong tutor should understand whether the student needs foundational reinforcement, Extended exam conditioning, or a careful move between the two.",
          ),
          supportPoint(
            "Method clarity before extra volume",
            "Many learners improve faster when written working, notation, and error review are corrected before more paper sets are added.",
          ),
          supportPoint(
            "International-school routine",
            "Families often need support that respects school workload, premium-school pacing, and practical after-school timing in Gurugram.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "igcse-localities",
          badge: "Useful Localities",
          title: "Locality pages that often make sense for IGCSE maths families in Gurugram",
          subtitle:
            "These pages help parents compare IGCSE tutor fit with premium-school corridors and locality convenience.",
          cards: igcseLocalityCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Featured IGCSE maths tutors in Gurugram",
        subtitle:
          "These tutor cards are most useful when the family wants cleaner written method, calmer correction, and a better exam rhythm.",
      },
      studentResults: {
        badge: "Student Results",
        title: "IGCSE maths progress stories from Gurugram",
        subtitle:
          "These examples stay close to written-method gains, exam confidence, and the steadier tutoring patterns families usually look for.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "IGCSE maths guides families often open next",
        subtitle:
          "These guides help parents think more clearly about method marks, exam technique, and what a better revision structure usually looks like.",
      },
      faqs: [
        faqItem(
          "Is this page useful for both Core and Extended learners in Gurugram?",
          "Yes. The page is designed to keep Core and Extended in the same route while still respecting the fact that level fit, exam demand, and tutoring pace can differ a lot.",
        ),
        faqItem(
          "Can the same tutor handle school work and exam papers in IGCSE maths?",
          "Yes. Good IGCSE home tuition usually connects school assignments, method correction, and paper familiarity rather than separating them into different plans.",
        ),
        faqItem(
          "Does locality still matter for international-school families in Gurugram?",
          "Yes. Travel convenience, timetable fit, and school corridor still matter, especially when students already have a heavy after-school load.",
        ),
      ],
      cta: {
        title: "Start the right IGCSE maths conversation in Gurugram",
        description:
          "Share the school, level, recent test pattern, and the chapters or question types causing the most confusion. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book an IGCSE maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-ib-board-service",
    slug: "ib-maths-home-tutor",
    routePath: "/gurugram/ib-maths-home-tutor",
    pageType: "service",
    template: "GenericPageTemplate",
    title: "IB maths home tuition in Gurugram",
    h1: "IB maths home tutor in Gurugram for pathway-aware support and international-school fit",
    intro:
      "Use this Gurugram IB page when the family wants pathway-aware maths support for MYP or Diploma, with tutoring that respects school context, paper style, and premium-school routines.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["IB", "MYP", "DP", "AA", "AI", "International School"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "DP", "AA", "AI", "Revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      tokens: ["IB", "AA HL", "AI HL", "DP"],
      limit: 3,
    },
    faqReferences: [
      "Why is pathway-aware tutoring important in IB maths?",
      "Is this page relevant for both MYP and Diploma maths?",
      "Do locality pages still matter for IB families in Gurugram?",
    ],
    seoTitle: "IB Maths Home Tutor in Gurugram | Pathway-Aware Premium School Support",
    seoDescription:
      "Find IB maths home tuition in Gurugram for MYP and Diploma learners with pathway-aware support and premium-school fit.",
    canonicalUrl: "/gurugram/ib-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "IB Maths Home Tutor" },
    ],
    schemaType: "Service",
    publishStatus: "published",
    boardKey: "ib",
    sections: {
      hero: {
        badge: "IB Maths in Gurugram",
        chips: [
          "MYP maths",
          "DP maths",
          "AA and AI pathways",
          "Premium-school fit",
          "Paper-aware tutoring",
        ],
        stats: [
          { value: "MYP", label: "Pathway-aware support" },
          { value: "DP", label: "Course-aware support" },
          { value: "1:1", label: "Premium home tuition" },
        ],
        supportPanel: {
          title: "IB maths support should follow the actual pathway, not a generic board script",
          text:
            "Families usually need help with stage fit, school rhythm, and the exact paper demands the student is facing rather than one broad explanation that tries to cover everything at once.",
          bullets: [
            "MYP and Diploma need different maths conversations",
            "AA and AI should not be mixed into one generic promise",
            "Premium-school timing and school context matter in Gurugram",
          ],
        },
      },
      supportPoints: {
        badge: "Why Families Choose This Route",
        title: "What this IB Gurugram page is built to solve",
        subtitle:
          "The page stays close to pathway-aware support, school fit, and the kinds of maths pressure international-school families usually describe first.",
        points: [
          supportPoint(
            "Pathway-aware tutoring",
            "A strong IB maths tutor should understand whether the learner needs MYP progression support or a more focused Diploma route through AA or AI.",
          ),
          supportPoint(
            "International-school fit",
            "Families often want home tuition that respects premium-school pacing, assignment load, and the practical rhythm of after-school learning in Gurugram.",
          ),
          supportPoint(
            "Calmer review and paper structure",
            "IB learners often improve faster when topic switching reduces and the tutoring plan protects time for written review and paper control.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "ib-localities",
          badge: "Useful Localities",
          title: "Locality pages that often make sense for IB maths families in Gurugram",
          subtitle:
            "These pages help parents compare pathway-aware support with premium-school corridor access and locality convenience.",
          cards: ibLocalityCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Featured IB maths tutors in Gurugram",
        subtitle:
          "Use these tutor cards when the family wants pathway-aware support, clearer paper habits, and stronger premium-school fit.",
      },
      studentResults: {
        badge: "Student Results",
        title: "IB maths progress stories from Gurugram",
        subtitle:
          "These results stay close to the pathway-aware revision and paper-control gains many IB families are looking for.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "IB maths guides families often open next",
        subtitle:
          "These guides help parents compare revision pacing, course fit, and the tutoring structures that usually help IB learners most.",
      },
      faqs: [
        faqItem(
          "Why is pathway-aware tutoring important in IB maths?",
          "Because the maths language, parent concerns, and paper expectations can change a lot between MYP and Diploma, and then again between AA and AI inside Diploma maths.",
        ),
        faqItem(
          "Is this page relevant for both MYP and Diploma maths in Gurugram?",
          "Yes. The page is intentionally broad enough for both, but still written around the idea that tutoring should match the exact pathway rather than collapse all IB maths into one generic promise.",
        ),
        faqItem(
          "Do locality pages still matter for IB families in Gurugram?",
          "Yes. Families often want premium-school corridor fit, manageable travel, and home-tuition convenience alongside the right academic pathway.",
        ),
      ],
      cta: {
        title: "Start the right IB maths conversation in Gurugram",
        description:
          "Share the school, stage, current paper difficulty, and the chapters or question styles causing the most pressure. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book an IB maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-jee-board-service",
    slug: "jee-maths-home-tutor",
    routePath: "/gurugram/jee-maths-home-tutor",
    pageType: "service",
    template: "GenericPageTemplate",
    title: "JEE maths home tuition in Gurugram",
    h1: "JEE maths home tutor in Gurugram for Main and Advanced problem solving, speed, and structure",
    intro:
      "Use this Gurugram JEE page when the student needs stronger question handling, better weekly discipline, and one-to-one maths support that fits Main or Advanced preparation properly.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["JEE", "Main", "Advanced", "Problem Solving", "Speed", "Accuracy"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["JEE", "Speed and Accuracy", "Problem Solving"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "board-city",
      citySlug: "gurugram",
      tokens: ["JEE", "Main", "Advanced"],
      limit: 3,
    },
    faqReferences: [
      "Is this page useful for both JEE Main and Advanced maths?",
      "Can one tutor balance school maths and JEE preparation?",
      "How should families use locality pages from here?",
    ],
    seoTitle: "JEE Maths Home Tutor in Gurugram | Main Advanced and Problem Solving Support",
    seoDescription:
      "Find JEE maths home tuition in Gurugram for Main and Advanced preparation, problem solving, and steadier weekly structure.",
    canonicalUrl: "/gurugram/jee-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "JEE Maths Home Tutor" },
    ],
    schemaType: "Service",
    publishStatus: "published",
    boardKey: "jee",
    sections: {
      hero: {
        badge: "JEE Maths in Gurugram",
        chips: [
          "JEE Main",
          "JEE Advanced",
          "Problem solving",
          "Speed and accuracy",
          "Class 11 and 12",
        ],
        stats: [
          { value: "Main", label: "Speed and breadth" },
          { value: "Advanced", label: "Depth and judgement" },
          { value: "1:1", label: "Focused tutoring" },
        ],
        supportPanel: {
          title: "JEE maths support usually works best once the exam path and weekly rhythm are clear",
          text:
            "Students often improve faster when the tutoring plan sharpens question selection, timed work, and mock review rather than only adding more random practice.",
          bullets: [
            "Main and Advanced need different paper habits",
            "School maths and entrance prep still have to stay balanced",
            "Weekly structure matters more than last-minute intensity",
          ],
        },
      },
      supportPoints: {
        badge: "Why Families Choose This Route",
        title: "What this JEE Gurugram page is built to solve",
        subtitle:
          "The page stays focused on problem solving, pace, and the weekly structures students usually need before maths preparation starts feeling more stable.",
        points: [
          supportPoint(
            "Main versus Advanced fit",
            "A good JEE maths tutor should know whether the current need is broader timed coverage, deeper reasoning, or a careful transition between the two.",
          ),
          supportPoint(
            "Question selection and review",
            "Many students solve more questions than they meaningfully review. One-to-one tutoring helps when speed and judgement both need work.",
          ),
          supportPoint(
            "School plus entrance balance",
            "Families often want a plan that keeps Class 11 and 12 school maths stable while JEE preparation becomes more serious week by week.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "jee-localities",
          badge: "Useful Localities",
          title: "Locality pages that often make sense for JEE maths families in Gurugram",
          subtitle:
            "These pages help families compare JEE preparation with premium-locality convenience and serious after-school maths support.",
          cards: jeeLocalityCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Featured JEE maths tutors in Gurugram",
        subtitle:
          "These tutor cards are most useful when the student needs stronger problem solving, weekly discipline, and a clearer Main or Advanced path.",
      },
      studentResults: {
        badge: "Student Results",
        title: "JEE maths progress stories from Gurugram",
        subtitle:
          "These examples stay close to the timing, review, and structured practice gains students usually need from one-to-one JEE maths support.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "JEE maths guides families often open next",
        subtitle:
          "These guides help students and parents think more clearly about speed, accuracy, and the kinds of weekly review patterns that usually improve scores.",
      },
      faqs: [
        faqItem(
          "Is this page useful for both JEE Main and Advanced maths support in Gurugram?",
          "Yes. It is designed as the broader JEE route for families who still need to compare speed-oriented Main preparation with deeper Advanced problem solving.",
        ),
        faqItem(
          "Can one tutor balance school maths and JEE preparation at the same time?",
          "Yes. That balance is often one of the main reasons families choose one-to-one tutoring, especially when the student needs maths to stay stable in both places.",
        ),
        faqItem(
          "How should families use the Gurugram locality pages from here?",
          "Use them when travel, premium locality fit, or after-school routine matters. They help the family compare the same JEE need with a more practical sector view.",
        ),
      ],
      cta: {
        title: "Start the right JEE maths conversation in Gurugram",
        description:
          "Share the class, current target, weakest chapters, and whether the student needs home tuition or online support. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a JEE maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-sector-54-service",
    slug: "sector-54",
    routePath: "/gurugram/sector-54",
    pageType: "sector",
    template: "GenericPageTemplate",
    title: "Sector 54 maths home tuition",
    h1: "Maths home tutor in Sector 54, Gurugram for IB, IGCSE, and advanced school maths support",
    intro:
      "Use this Sector 54 page when the family wants premium-school corridor access, Golf Course Road convenience, and one-to-one maths home tuition with stronger IB or IGCSE relevance.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-54",
      sectorLabel: "Sector 54",
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "Revision", "Method Marks"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-54",
      limit: 3,
    },
    faqReferences: [
      "Why does Sector 54 matter for maths home tuition?",
      "Is this page mainly for international-school families?",
      "Where should families go next from Sector 54?",
    ],
    seoTitle: "Maths Home Tutor in Sector 54 Gurugram | IB IGCSE and Premium School Support",
    seoDescription:
      "Find maths home tuition in Sector 54 Gurugram for IB, IGCSE, and premium-school support near Golf Course Road.",
    canonicalUrl: "/gurugram/sector-54",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sector 54" },
    ],
    schemaType: "LocalBusiness",
    publishStatus: "published",
    sectorSlug: "sector-54",
    focusBoards: ["IB", "IGCSE"],
    sections: {
      hero: {
        badge: "Sector 54 Maths Support",
        chips: ["Golf Course Road", "Premium schools", "IB", "IGCSE", "One-to-one home tuition"],
        stats: [
          { value: "IB", label: "High-intent board fit" },
          { value: "IGCSE", label: "Strong school relevance" },
          { value: "Local", label: "Golf Course Road access" },
        ],
        supportPanel: {
          title: "Sector 54 works best for families who want locality fit and premium-school awareness together",
          text:
            "This is a useful page when the tutoring decision depends on Golf Course Road convenience, school corridor fit, and board-aware maths support rather than a generic city-wide search.",
          bullets: [
            "Premium-school corridor access matters here",
            "IB and IGCSE demand is stronger than on many general local pages",
            "Families still need the right board page after the locality is clear",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sector 54",
        title: "What families usually compare on this Sector 54 maths page",
        subtitle:
          "The page keeps the locality conversation useful by focusing on corridor fit, nearby school context, and the tutoring needs that often come with premium-school maths support.",
        points: [
          supportPoint(
            "Golf Course Road convenience",
            "Sector 54 often matters because the family wants strong home-tuition access without making weekday travel and after-school timing harder than necessary.",
          ),
          supportPoint(
            "International-school maths fit",
            "This locality often attracts IB and IGCSE families who want tutors comfortable with method, pacing, and premium-school expectations.",
          ),
          supportPoint(
            "School-aware shortlisting",
            "The best next step is usually to keep locality convenience and board fit together, not to choose one and ignore the other.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sector54-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sector 54 families often open next",
          subtitle:
            "These pages keep the path useful by linking premium-locality intent back to the right board or city-wide comparison page.",
          cards: sector54BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors connected to Sector 54, Gurugram",
        subtitle:
          "These tutors are especially useful when the family wants Golf Course Road access and stronger premium-school board fit.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories linked to Sector 54",
        subtitle:
          "These results help parents judge the kind of gains that can come from calmer one-to-one maths support in premium school corridors.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides that often fit Sector 54 families",
        subtitle:
          "These guides stay close to the kinds of IB and IGCSE questions families near Golf Course Road usually ask next.",
      },
      faqs: [
        faqItem(
          "Why does Sector 54 matter for maths home tuition in Gurugram?",
          "Because families here often care about Golf Course Road access, premium-school rhythm, and board-specific maths support at the same time.",
        ),
        faqItem(
          "Is this page mainly for international-school families?",
          "Mostly yes, but not only. It is especially useful for IB and IGCSE needs, while still being relevant for advanced school maths support more broadly.",
        ),
        faqItem(
          "Where should families go next from Sector 54?",
          "If the board is clear, open the relevant board page next. If the family still needs a wider comparison, go back to the Gurugram hub.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sector 54",
        description:
          "Share the school, board, and the preferred weekday timing. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sector 54 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-sector-55-service",
    slug: "sector-55",
    routePath: "/gurugram/sector-55",
    pageType: "sector",
    template: "GenericPageTemplate",
    title: "Sector 55 maths home tuition",
    h1: "Maths home tutor in Sector 55, Gurugram for flexible scheduling and premium-school corridor support",
    intro:
      "Use this Sector 55 page when the family wants a practical premium-corridor option with flexible home-tuition timing, strong international-school relevance, and easier after-school routines.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-55",
      sectorLabel: "Sector 55",
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "CBSE", "Revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-55", "sector-56"],
      tokens: ["IB", "IGCSE", "CBSE"],
      limit: 3,
    },
    faqReferences: [
      "Why is Sector 55 useful for maths home tuition?",
      "Is Sector 55 more about flexibility than one specific board?",
      "What pages should families open next from Sector 55?",
    ],
    seoTitle: "Maths Home Tutor in Sector 55 Gurugram | Flexible Premium Corridor Support",
    seoDescription:
      "Find maths home tuition in Sector 55 Gurugram with premium-school corridor access, flexible timing, and board-aware tutor support.",
    canonicalUrl: "/gurugram/sector-55",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sector 55" },
    ],
    schemaType: "LocalBusiness",
    publishStatus: "published",
    sectorSlug: "sector-55",
    focusBoards: ["IB", "IGCSE", "CBSE"],
    sections: {
      hero: {
        badge: "Sector 55 Maths Support",
        chips: ["Golf Course Extension Road", "Flexible timing", "Premium schools", "IB", "IGCSE"],
        stats: [
          { value: "Flexible", label: "After-school scheduling" },
          { value: "Premium", label: "School corridor relevance" },
          { value: "Mixed", label: "Board demand" },
        ],
        supportPanel: {
          title: "Sector 55 is useful when schedule fit matters as much as school fit",
          text:
            "This page is designed for families who want premium-school corridor access, but also need weekday home tuition to fit realistically around the student's routine.",
          bullets: [
            "Flexible scheduling is often a deciding factor here",
            "International-school relevance is strong across this corridor",
            "Families still need to pair locality fit with the right board page",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sector 55",
        title: "What families usually compare on this Sector 55 maths page",
        subtitle:
          "The most useful conversations here usually combine schedule fit, corridor access, and the board-specific maths pressure the student is already facing.",
        points: [
          supportPoint(
            "Flexible after-school timing",
            "Sector 55 is often chosen by families who want one-to-one home tuition without forcing the student into a schedule that already feels overloaded.",
          ),
          supportPoint(
            "Premium-school corridor relevance",
            "This part of Gurugram often needs tutors who understand international-school pacing while still keeping lessons practical and grounded.",
          ),
          supportPoint(
            "Board variety without a generic experience",
            "The locality can serve IB, IGCSE, and CBSE needs, but the best next step is still to move into the page that matches the student's maths path most closely.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sector55-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sector 55 families often open next",
          subtitle:
            "Choose a nearby board route while keeping the student's locality and schedule in view.",
          cards: sector55BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors connected to Sector 55, Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants premium-corridor access and a realistic home-tuition schedule.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories relevant to Sector 55 families",
        subtitle:
          "These results help parents judge the kinds of academic changes that usually come from steadier one-to-one maths support.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides that often fit Sector 55 families",
        subtitle:
          "These guides stay close to the board and revision questions families in premium-school corridors often ask next.",
      },
      faqs: [
        faqItem(
          "Why is Sector 55 useful for maths home tuition in Gurugram?",
          "Because the locality often works well for families who want premium-school corridor access without losing flexibility around weekday lesson timing.",
        ),
        faqItem(
          "Is Sector 55 more about flexibility than one specific board?",
          "Yes. It is a strong mixed-demand locality where IB, IGCSE, and CBSE families can all fit, so schedule practicality often matters as much as board fit.",
        ),
        faqItem(
          "What pages should families open next from Sector 55?",
          "Open the relevant board page next if the maths path is already clear. If not, go back to the Gurugram hub to compare the main routes side by side.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sector 55",
        description:
          "Share the school, board, and the best weekday window for home tuition. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sector 55 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-sector-56-service",
    slug: "sector-56",
    routePath: "/gurugram/sector-56",
    pageType: "sector",
    template: "GenericPageTemplate",
    title: "Sector 56 maths home tuition",
    h1: "Maths home tutor in Sector 56, Gurugram for IB, IGCSE, CBSE, and JEE support",
    intro:
      "Use this Sector 56 page when the family wants a strong premium-locality option with mixed board demand, serious maths intent, and one-to-one home tuition that fits both school and exam pressure.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-56",
      sectorLabel: "Sector 56",
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "CBSE", "JEE"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-56",
      limit: 3,
    },
    faqReferences: [
      "Why is Sector 56 a high-intent maths locality?",
      "Is this page useful for both school and entrance-focused maths support?",
      "What should families compare next from Sector 56?",
    ],
    seoTitle: "Maths Home Tutor in Sector 56 Gurugram | IB IGCSE CBSE and JEE Support",
    seoDescription:
      "Find maths home tuition in Sector 56 Gurugram for IB, IGCSE, CBSE, and JEE with premium-locality convenience and serious tutor demand.",
    canonicalUrl: "/gurugram/sector-56",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sector 56" },
    ],
    schemaType: "LocalBusiness",
    publishStatus: "published",
    sectorSlug: "sector-56",
    focusBoards: ["IB", "IGCSE", "CBSE", "JEE"],
    sections: {
      hero: {
        badge: "Sector 56 Maths Support",
        chips: ["Premium locality", "IB", "IGCSE", "CBSE", "JEE"],
        stats: [
          { value: "Mixed", label: "Board and exam demand" },
          { value: "Strong", label: "Tutor shortlisting intent" },
          { value: "Local", label: "Premium corridor fit" },
        ],
        supportPanel: {
          title: "Sector 56 works well for families who want a broader maths support choice without losing premium-locality convenience",
          text:
            "This page is useful when the family needs a serious maths route, but still wants locality-level clarity around timing, school corridor, and home-tuition practicality.",
          bullets: [
            "IB, IGCSE, CBSE, and JEE demand can all be relevant here",
            "Premium-locality access should still lead into the right board page",
            "Sector 56 is often used for both school support and exam-focused maths",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sector 56",
        title: "What families usually compare on this Sector 56 maths page",
        subtitle:
          "This page is intentionally broader because Sector 56 attracts a wider mix of maths needs than many single-board localities.",
        points: [
          supportPoint(
            "Mixed board and exam demand",
            "Sector 56 often serves families looking at IB, IGCSE, CBSE, and JEE maths support, so shortlisting usually begins with maths intent before narrowing further.",
          ),
          supportPoint(
            "Premium-locality convenience",
            "The locality works well when parents want high-quality home tuition without making weekday travel and after-school scheduling harder than they need to be.",
          ),
          supportPoint(
            "Useful bridge between locality and board pages",
            "This page helps families decide whether the next move should be the city hub, a board-specific page, or a more focused conversation with a tutor.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sector56-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sector 56 families often open next",
          subtitle:
            "These pages keep the journey practical by linking the locality view back to the maths route that fits the student most closely.",
          cards: sector56BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors connected to Sector 56, Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants a premium-locality option with broader board and exam choice.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories linked to Sector 56",
        subtitle:
          "These results help parents understand the kinds of gains that usually come from more structured one-to-one maths support in a high-intent locality.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides that often fit Sector 56 families",
        subtitle:
          "These guides stay close to the mixed board and exam questions families in Sector 56 often ask next.",
      },
      faqs: [
        faqItem(
          "Why is Sector 56 a high-intent maths locality in Gurugram?",
          "Because it often attracts families who are already serious about maths outcomes and want a practical premium-locality route into better shortlisting.",
        ),
        faqItem(
          "Is this page useful for both school and entrance-focused maths support?",
          "Yes. Sector 56 is relevant for both school-led board tutoring and more exam-oriented maths support, especially for senior classes.",
        ),
        faqItem(
          "What should families compare next from Sector 56?",
          "If the board or exam route is already clear, open that page next. If not, go back to the Gurugram hub to compare the main maths paths more cleanly.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sector 56",
        description:
          "Share the board, class, school, and the preferred timing for home tuition. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sector 56 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
  {
    id: "gurugram-golf-course-road-service",
    slug: "golf-course-road",
    routePath: "/gurugram/golf-course-road",
    pageType: "sector",
    template: "GenericPageTemplate",
    title: "Golf Course Road maths home tuition",
    h1: "Maths home tutor on Golf Course Road, Gurugram for premium-school and board-specific support",
    intro:
      "Use this Golf Course Road page when the family wants a premium corridor view before choosing between nearby localities, school-fit concerns, and the board route that best matches the student's maths pressure.",
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 54", "Sector 55", "Sector 56"],
      schoolTokens: [
        "The Shri Ram School Aravali",
        "Scottish High International School",
        "The Heritage Xperiential Learning School",
        "Pathways World School",
      ],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "CBSE", "Revision", "Method Marks"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-54", "sector-55", "sector-56"],
      tokens: ["IB", "IGCSE", "CBSE"],
      limit: 3,
    },
    faqReferences: [
      "Why use a Golf Course Road corridor page instead of only one sector page?",
      "Is Golf Course Road mainly useful for international-school maths support?",
      "What pages should families open next from here?",
    ],
    seoTitle: "Maths Home Tutor on Golf Course Road Gurugram | Premium School and Board Support",
    seoDescription:
      "Find maths home tuition on Golf Course Road Gurugram with premium-school corridor context, nearby localities, and board-specific tutor routes.",
    canonicalUrl: "/gurugram/golf-course-road",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Golf Course Road" },
    ],
    schemaType: "LocalBusiness",
    publishStatus: "published",
    focusBoards: ["IB", "IGCSE", "CBSE"],
    sections: {
      hero: {
        badge: "Golf Course Road Maths Support",
        chips: ["Premium schools", "Sector 54 to 56 corridor", "IB", "IGCSE", "School-aware home tuition"],
        stats: [
          { value: "3", label: "Nearby high-intent localities" },
          { value: "Premium", label: "School corridor fit" },
          { value: "Board-led", label: "Shortlisting style" },
        ],
        supportPanel: {
          title: "Golf Course Road is useful when the family wants a corridor view before choosing one exact locality",
          text:
            "This page helps parents compare premium-school access, nearby sectors, and board-specific maths support without forcing the first decision to be only a sector or only a board.",
          bullets: [
            "Useful for premium-school corridor shortlisting",
            "Helps compare Sector 54, 55, and 56 more clearly",
            "Works best when locality convenience still needs to be paired with the right board page",
          ],
        },
      },
      supportPoints: {
        badge: "Why Golf Course Road",
        title: "What families usually compare on this Golf Course Road maths page",
        subtitle:
          "This corridor page is meant to be useful rather than thin. It focuses on premium-school relevance, nearby locality fit, and the maths routes that usually matter most here.",
        points: [
          supportPoint(
            "Premium-school corridor context",
            "Families often want a page that feels closer to the actual school and travel corridor they are thinking about, not only a broad city-level explanation.",
          ),
          supportPoint(
            "Nearby sector comparison",
            "Sector 54, Sector 55, and Sector 56 often solve slightly different maths-home-tuition needs, so a corridor page helps families compare them more practically.",
          ),
          supportPoint(
            "Board-specific next step",
            "Golf Course Road still works best when the family moves next into the board page that matches the student's school path, paper style, or exam pressure.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "golf-course-road-localities",
          badge: "Nearby Localities",
          title: "Nearby locality pages families often compare from Golf Course Road",
          subtitle:
            "Use these locality pages to narrow the corridor view into the exact part of Gurugram that feels most practical for regular home tuition.",
          cards: golfCourseRoadSectorCards,
        },
        {
          id: "golf-course-road-boards",
          badge: "Useful Board Pages",
          title: "Board pages families often compare from Golf Course Road",
          subtitle:
            "These board routes keep the corridor page academically useful by pointing families back to the maths path that best matches the student.",
          cards: golfCourseRoadBoardCards,
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to the Golf Course Road corridor",
        subtitle:
          "These tutor cards are most useful when the family wants premium-school relevance, nearby locality fit, and board-aware home tuition.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories relevant to Golf Course Road families",
        subtitle:
          "These results stay close to premium-school corridors and the kinds of structured support families here usually want.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Golf Course Road families often open next",
        subtitle:
          "These guides stay close to premium-school board choices, revision structure, and method clarity.",
      },
      faqs: [
        faqItem(
          "Why use a Golf Course Road corridor page instead of only one sector page?",
          "Because many families first think in terms of the premium-school corridor they live in or travel through, and only then narrow to the exact sector that feels most practical for home tuition.",
        ),
        faqItem(
          "Is Golf Course Road mainly useful for international-school maths support?",
          "Mostly yes, especially for IB and IGCSE, but the corridor is still useful for board-aware school maths support more broadly when locality and school fit are both important.",
        ),
        faqItem(
          "What pages should families open next from Golf Course Road?",
          "Usually the next step is either one of the nearby locality pages or the board page that best matches the student's maths path.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Golf Course Road",
        description:
          "Share the school corridor, board, and the nearby locality the family prefers for home tuition. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Golf Course Road maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  },
];

const defaultGurugramBatchSectionDefinitions = [
  { id: "hero", template: "hero", enabled: true },
  { id: "support-points", template: "support-points", enabled: true },
  { id: "route-groups", template: "route-groups", enabled: true },
  { id: "featured-tutors", template: "featured-tutors", enabled: true },
  { id: "student-results", template: "student-results", enabled: true },
  { id: "related-blogs", template: "related-blogs", enabled: true },
  { id: "faqs", template: "faqs", enabled: true },
  { id: "cta", template: "cta", enabled: true },
];

function createPublishedGurugramEntryConfig(config) {
  const faqItems = config.sections?.faqs ?? [];

  return {
    template: "GenericPageTemplate",
    sectionDefinitions: defaultGurugramBatchSectionDefinitions,
    schemaType: "LocalBusiness",
    publishStatus: "published",
    faqReferences: faqItems.map((item) => item.question),
    ...config,
    template: config.template ?? "GenericPageTemplate",
    sectionDefinitions: config.sectionDefinitions ?? defaultGurugramBatchSectionDefinitions,
    schemaType: config.schemaType ?? "LocalBusiness",
    publishStatus: config.publishStatus ?? "published",
    faqReferences: config.faqReferences ?? faqItems.map((item) => item.question),
  };
}

const WHATSAPP_NUMBER = "918796499818";

function createLocalityWhatsAppHref(label) {
  const message = `Hello Maths Bodhi, I want to check maths home tuition options in ${label}, Gurugram. Please guide me on tutor fit and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createLocalityRouteCards(label, nearbyRoutes = []) {
  return [
    routeCard({
      eyebrow: "Parent hub",
      title: "Gurugram Maths Tutor Hub",
      description: "Compare this locality with the wider Gurugram route before choosing home tuition or online support.",
      tags: ["Gurugram", "Locality hub"],
      to: "/city/gurugram",
    }),
    routeCard({
      eyebrow: "Core service",
      title: "Maths Home Tutor",
      description: "Open the main home-tuition page for board, class, and tutor-fit context.",
      tags: ["Home tuition", "Tutor fit"],
      to: "/maths-home-tutor",
    }),
    routeCard({
      eyebrow: "Board route",
      title: "CBSE Maths Tuition",
      description: "Useful when the student's school route needs board-wise pace, worksheets, and revision structure.",
      tags: ["CBSE", "Board support"],
      to: "/cbse-maths-tuition",
    }),
    ...nearbyRoutes.map((item) =>
      routeCard({
        eyebrow: "Nearby locality",
        title: item.label,
        description: `Compare ${label} with ${item.label} if travel convenience or school corridor fit matters.`,
        tags: ["Nearby", "Gurugram"],
        to: `/city/gurugram/${item.slug}`,
      }),
    ),
    routeCard({
      eyebrow: "Demo CTA",
      title: "Book Free Demo Class",
      description: "Share the student's class, board, topic pressure, and preferred timing before shortlisting.",
      tags: ["Demo", "WhatsApp handoff"],
      to: "/book-free-demo-class",
    }),
  ].slice(0, 8);
}

function createCityGurugramLocalityFallbackConfig({
  slug,
  label,
  context,
  chips,
  nearbyRoutes = [],
  tokens = [],
}) {
  return createPublishedGurugramEntryConfig({
    id: `city-gurugram-${slug}-service`,
    slug,
    routePath: `/city/gurugram/${slug}`,
    pageType: "sector",
    title: `${label} maths home tuition`,
    h1: `Maths home tutor in ${label}, Gurugram for board-wise support and regular practice`,
    intro: `Use this ${label} page when the family wants locality-specific maths home tuition context before choosing a tutor, board route, or demo conversation.`,
    relatedTutorQuery: {
      kind: "sector",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      sectorSlug: slug,
      sectorLabel: label,
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: [label, "Gurugram", "Board Prep", "Revision", ...tokens],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: slug,
      sectorLabel: label,
      tokens,
      limit: 3,
    },
    seoTitle: `Maths Home Tutor in ${label} Gurugram | Maths Bodhi`,
    seoDescription: `Explore maths home tuition in ${label}, Gurugram with locality context, board-wise next pages, published tutor matches where available, and a free demo CTA.`,
    canonicalUrl: `/city/gurugram/${slug}`,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/city/gurugram" },
      { label },
    ],
    sectorSlug: slug,
    sections: {
      hero: {
        badge: `${label} maths support`,
        chips,
        stats: [
          { value: "Local", label: "Gurugram route" },
          { value: "1:1", label: "Home or online fit" },
          { value: "Demo", label: "Next-step CTA" },
        ],
        supportPanel: {
          title: `${label} works best when locality fit is paired with the right board and class route`,
          text: context,
          bullets: [
            "Check published tutor matches without adding fake profiles",
            "Compare nearby Gurugram pages before booking a demo",
            "Use WhatsApp to share class, board, timing, and topic pressure",
          ],
        },
      },
      supportPoints: {
        badge: "Local Fit",
        title: `What families usually compare before choosing maths tuition in ${label}`,
        subtitle:
          "This page keeps the locality search useful by connecting travel convenience, board needs, and the student's weekly practice rhythm.",
        points: [
          supportPoint(
            "Locality convenience should support regularity",
            `Families in ${label} often need a maths routine that can continue every week without making travel or timing the bigger problem.`,
          ),
          supportPoint(
            "Board and class still decide the teaching plan",
            "The next useful page is usually the student's board or class route, because locality alone does not explain the worksheets, paper style, or revision load.",
          ),
          supportPoint(
            "Only published tutor matches appear",
            "If no published profile matches this exact locality yet, the page shows an empty state and sends the family into a demo conversation instead of inventing tutor claims.",
          ),
        ],
      },
      routeGroups: [
        {
          id: `${slug}-locality-next-pages`,
          badge: "Useful Next Pages",
          title: `Pages families often open next from ${label}`,
          subtitle:
            "These links keep the locality journey connected to the Gurugram hub, core home-tuition route, nearby areas, and demo flow.",
          cards: createLocalityRouteCards(label, nearbyRoutes),
        },
        {
          id: `${slug}-school-context`,
          badge: "School Context",
          title: `School and locality context families may mention near ${label}`,
          subtitle:
            "Use these school-area cues to discuss timing, worksheets, and nearby travel context more clearly.",
          note:
            "School names are included only as local planning context. Maths Bodhi is not officially affiliated with these schools.",
          cards: createSchoolContextCards(label),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: `Published maths tutors relevant to ${label}, Gurugram`,
        subtitle:
          "Tutor cards appear only when there is a real published match for this locality or related tutor data.",
        emptyState: {
          title: `No published tutor profile is shown for ${label} yet`,
          description:
            "Maths Bodhi can still check current tutor availability after the family shares class, board, timing, and preferred learning mode.",
          primaryAction: {
            label: "Book a free maths demo class",
            to: "/book-free-demo-class",
          },
          secondaryAction: {
            label: "Back to Gurugram hub",
            to: "/city/gurugram",
          },
        },
      },
      faqs: [
        faqItem(
          `Is this ${label} page only for home tuition?`,
          "It is written for maths home tuition first, but families can still discuss online or hybrid support when that is more practical.",
        ),
        faqItem(
          `What should parents share for ${label}?`,
          "Share the student's class, board, school area, weak chapters, preferred timing, and whether the family wants home tuition, online support, or both.",
        ),
        faqItem(
          "Does this page guarantee a tutor match?",
          "No. It shows published matches where available and uses the demo conversation to check current fit and availability.",
        ),
      ],
      cta: {
        title: `Book a free maths demo for ${label}`,
        description:
          "Share the board, class, locality, and the maths concern that needs attention. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book free demo class",
          to: "/book-free-demo-class",
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createLocalityWhatsAppHref(label),
          external: true,
        },
      },
    },
  });
}

function createRecoveryWhatsAppHref(page, purpose = "home tuition") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function recoveryRouteCard(path, title, eyebrow, description, tags = []) {
  return routeCard({
    eyebrow,
    title,
    description,
    tags,
    to: path,
  });
}

function createRecoveryLocalityCards(page) {
  const currentLocality = recoveryRouteCard(
    `/gurugram/${page.localitySlug}`,
    `${page.localityLabel} maths home tuition`,
    "Parent locality",
    `Open the main ${page.localityLabel} locality route before narrowing by ${page.boardLabel}.`,
    [page.localityLabel, "Gurugram"],
  );

  const nearbyCards = (page.nearbyLocalitySlugs ?? [])
    .map((slug) => getRecoveryLocalityMeta(slug))
    .filter(Boolean)
    .map((locality) =>
      recoveryRouteCard(
        `/gurugram/${locality.slug}-${page.boardSlug}-maths-home-tutor`,
        `${page.boardLabel} tutor in ${locality.label}`,
        "Nearby board-locality",
        `Compare ${page.localityLabel} with ${locality.label} for ${page.boardLabel} maths home tuition and travel fit.`,
        [page.boardLabel, locality.label],
      ),
    );

  return [currentLocality, ...nearbyCards].slice(0, 5);
}

function createRecoveryBoardCards(page) {
  return [
    recoveryRouteCard(
      page.gurugramBoardPath,
      `${page.boardLabel} Maths Home Tutor in Gurugram`,
      "Gurugram board route",
      `Use the city-level ${page.boardLabel} page for broader board fit, tutor matching, and locality comparison.`,
      [page.boardLabel, "Gurugram"],
    ),
    recoveryRouteCard(
      page.boardHubPath,
      `${page.boardLabel} Maths Tuition`,
      "Board hub",
      `Open the workbook-aligned ${page.boardLabel} hub before choosing class, topic, or locality support.`,
      [page.boardLabel, "Hub"],
    ),
    recoveryRouteCard(
      "/maths-home-tutor",
      "Maths Home Tutor",
      "Main service hub",
      "Compare the main home tuition route before choosing the exact board or locality page.",
      ["Home tuition", "Main hub"],
    ),
    recoveryRouteCard(
      "/city/gurugram",
      "Gurugram City Page",
      "City hub",
      "Browse Gurugram sectors, board routes, and tutor context from the city page.",
      ["Gurugram", "Local SEO"],
    ),
  ];
}

function createRecoveryClassCards(page) {
  return [
    ...page.relatedClassPaths.map((path) => {
      const classLabel = path.match(/class-(\d+)/)?.[1] ?? "";
      return recoveryRouteCard(
        path,
        `Class ${classLabel} ${page.boardLabel} maths home tutor`,
        "Class route",
        `Use this class route when the ${page.boardLabel} student's grade-level pressure is clearer than the locality need.`,
        [page.boardLabel, `Class ${classLabel}`],
      );
    }),
    recoveryRouteCard(
      "/class-10-maths-tutor",
      "Class 10 Maths Tutor",
      "Class hub",
      "Compare the broader Class 10 route for board-year revision and chapter clarity.",
      ["Class 10", "Board year"],
    ),
  ].slice(0, 6);
}

function createRecoveryTopicCards(page) {
  return page.relatedTopicPaths.slice(0, 5).map((path) => {
    const label = path
      .replace(/^\//, "")
      .replace(`${page.boardSlug}-`, "")
      .replace("-tutor", "")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    return recoveryRouteCard(
      path,
      path.startsWith(`/${page.boardSlug}-`)
        ? `${page.boardLabel} ${label} Tutor`
        : `${label} Tutor`,
      "Topic route",
      `Open this topic page if the student's current ${page.boardLabel} concern is chapter-specific.`,
      [page.boardLabel, label],
    );
  });
}

function createRecoveryLocalityBoardConfig(page) {
  return createPublishedGurugramEntryConfig({
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: "service",
    title: page.title,
    h1: page.h1,
    intro: `${page.title} is a focused Gurugram home tuition page for families who already know both the locality and the board. It connects ${page.localityLabel} tutor fit with ${page.boardLabel} class, topic, and demo next steps.`,
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      localityLabels: [page.localityLabel, page.localitySlug],
      tokens: [
        page.boardLabel,
        page.localityLabel,
        page.primaryKeyword,
        "home tuition",
        "maths tutor",
      ],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: [page.boardLabel, page.localityLabel, "home tuition", "revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      localityLabels: [page.localitySlug, page.localityLabel],
      tokens: [page.boardLabel, page.localityLabel],
      limit: 3,
    },
    seoTitle: `${page.boardLabel} Maths Home Tutor in ${page.localityLabel} Gurugram | Maths Bodhi`,
    seoDescription: `Explore ${page.primaryKeyword} with related locality, board, class, topic, WhatsApp, mentor, and free demo links.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: page.boardLabel, to: page.gurugramBoardPath },
      { label: page.localityLabel },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: `${page.boardLabel} maths in ${page.localityLabel}`,
        chips: [page.localityLabel, page.boardLabel, "Home tuition", "Gurugram", "Tutor fit"],
        stats: [
          { value: "Local", label: "Board-locality route" },
          { value: "1:1", label: "Home tuition focus" },
          { value: "Demo", label: "Next-step CTA" },
        ],
        supportPanel: {
          title: `${page.localityLabel} works best when the tutor shortlist starts with board fit`,
          text: `${page.localityNote}. For ${page.boardLabel}, the teaching plan should also reflect ${page.topicContext}.`,
          bullets: [
            `Parent board hub: ${page.boardHubPath}`,
            "Related locality, board, class, and topic links are grouped below",
            "No fake tutor profiles, reviews, or guaranteed-result claims are used",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} support from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Local Board Fit",
        title: `How ${page.boardLabel} maths home tuition should work in ${page.localityLabel}`,
        subtitle:
          "This page keeps locality convenience connected to the board, class, topic, and mentor conversation that should shape the actual shortlist.",
        points: [
          supportPoint(
            "Locality fit should make weekly learning easier",
            `${page.localityLabel} is useful when home tuition needs to fit school timing, travel feasibility, and a consistent weekly maths routine.`,
          ),
          supportPoint(
            `${page.boardLabel} method should guide practice`,
            `The first plan should reflect ${page.topicContext}, not a generic maths worksheet flow.`,
          ),
          supportPoint(
            "Published tutor filtering stays honest",
            "Tutor cards are filtered from real published profiles. If no exact profile matches, the page keeps the enquiry route open without placeholder tutors.",
          ),
        ],
      },
      routeGroups: [
        {
          id: `${page.slug}-related-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Compare nearby sectors and corridors when travel convenience or school access affects home tuition.",
          cards: createRecoveryLocalityCards(page),
        },
        {
          id: `${page.slug}-related-boards`,
          badge: "Related Boards",
          title: "Related board and hub pages",
          subtitle:
            "Move back to the board-level route when curriculum fit matters more than one exact locality.",
          cards: createRecoveryBoardCards(page),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-related-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use class pages when the student's grade, test calendar, or board year is the strongest decision signal.",
          cards: createRecoveryClassCards(page),
        },
        {
          id: `${page.slug}-related-topics`,
          badge: "Related Topics",
          title: "Related topic pages",
          subtitle:
            "Topic pages help families move from a locality search into the exact chapters causing the most friction.",
          cards: createRecoveryTopicCards(page),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published ${page.boardLabel} maths tutors relevant to ${page.localityLabel}`,
        subtitle:
          "Tutor cards appear only when real published profiles match the board, locality, or topic signals on this page.",
        emptyState: {
          title: `No exact published tutor profile is shown for ${page.boardLabel} in ${page.localityLabel} yet`,
          description:
            "Maths Bodhi can still check current availability after the family shares class, board, school area, weak chapters, and preferred timing.",
          primaryAction: {
            label: "Book a free maths demo class",
            to: "/book-free-demo-class",
          },
          secondaryAction: {
            label: "Back to Gurugram hub",
            to: "/gurugram",
          },
        },
      },
      faqs: [
        faqItem(
          `Who is this ${page.boardLabel} tutor page for in ${page.localityLabel}?`,
          `It is for families who want ${page.primaryKeyword} and need the first shortlist to consider both locality convenience and board-specific maths expectations.`,
        ),
        faqItem(
          "Can this page support home tuition and online options?",
          "Yes. It is written for home tuition first, but families can discuss online or hybrid support if schedule, tutor fit, or availability makes that more practical.",
        ),
        faqItem(
          "What should parents share before booking a demo?",
          "Share the student's class, school, board, weak chapters, recent tests, preferred timing, and whether the family wants home tuition, online support, or both.",
        ),
      ],
      cta: {
        title: `Book a free maths demo for ${page.boardLabel} in ${page.localityLabel}`,
        description:
          "Share the class, board, locality, school area, and the current maths concern. Maths Bodhi can check tutor fit and guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a free maths demo class",
          to: "/book-free-demo-class",
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createRecoveryWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createRecoveryWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  });
}

function createBatchAWhatsAppHref(page, purpose = "locality maths home tuition") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createBatchALocalityCards(page) {
  const nearbyCards = (page.nearbyLocalitySlugs ?? [])
    .map((slug) => getBatchALocalityMeta(slug))
    .filter(Boolean)
    .map((locality) =>
      recoveryRouteCard(
        `/gurugram/${locality.slug}-maths-home-tutor`,
        `Maths tutor in ${locality.label}`,
        "Nearby locality",
        `Compare ${page.localityLabel} with ${locality.label} when travel fit, school timing, or regularity matters.`,
        [locality.label, "Gurugram"],
      ),
    );

  return [
    recoveryRouteCard(
      "/maths-home-tutor-in-gurgaon",
      "Maths Home Tutor in Gurgaon",
      "Gurugram hub",
      "Open the Gurugram hub before choosing a specific sector, corridor, board, or school-intent route.",
      ["Gurugram", "Local SEO"],
    ),
    ...nearbyCards,
  ].slice(0, 6);
}

function createBatchABoardCards() {
  return [
    recoveryRouteCard(
      "/gurugram/cbse-maths-home-tutor",
      "CBSE Maths Home Tutor in Gurugram",
      "Board route",
      "Use this page when NCERT pace, school worksheets, and board-year preparation are the clearest fit.",
      ["CBSE", "Gurugram"],
    ),
    recoveryRouteCard(
      "/gurugram/ib-maths-home-tutor",
      "IB Maths Home Tutor in Gurugram",
      "Board route",
      "Use this page for MYP or DP maths when pathway fit, reflection, and problem style matter.",
      ["IB", "MYP and DP"],
    ),
    recoveryRouteCard(
      "/gurugram/igcse-maths-home-tutor",
      "IGCSE Maths Home Tutor in Gurugram",
      "Board route",
      "Use this page for Cambridge or IGCSE students who need Core, Extended, or paper-specific support.",
      ["IGCSE", "Core and Extended"],
    ),
    recoveryRouteCard(
      "/premium-school-maths-home-tutor",
      "Premium School Maths Home Tutor",
      "School route",
      "Compare premium-school support before narrowing to an exact school, board, or locality page.",
      ["Premium schools", "Tutor fit"],
    ),
  ];
}

function createBatchAClassCards() {
  return [
    recoveryRouteCard(
      "/class-10-cbse-maths-home-tutor",
      "Class 10 CBSE maths home tutor",
      "Class route",
      "Use this when board-year revision, written method, and school-test pressure are central.",
      ["Class 10", "CBSE"],
    ),
    recoveryRouteCard(
      "/class-12-cbse-maths-home-tutor",
      "Class 12 CBSE maths home tutor",
      "Class route",
      "Use this when senior-school maths needs stronger weekly planning and board-style practice.",
      ["Class 12", "CBSE"],
    ),
    recoveryRouteCard(
      "/class-10-igcse-maths-home-tutor",
      "Class 10 IGCSE maths home tutor",
      "Class route",
      "Use this when IGCSE paper technique and topic-by-topic correction are the main pressure.",
      ["Class 10", "IGCSE"],
    ),
    recoveryRouteCard(
      "/class-12-ib-maths-home-tutor",
      "Class 12 IB maths home tutor",
      "Class route",
      "Use this when DP maths, AA or AI fit, and regular problem reflection need to be clearer.",
      ["Class 12", "IB"],
    ),
  ];
}

function createBatchATopicCards() {
  return [
    recoveryRouteCard(
      "/cbse-algebra-tutor",
      "CBSE Algebra Tutor",
      "Topic route",
      "Open this when equations, expressions, functions, or graph sense are the student friction points.",
      ["Algebra", "CBSE"],
    ),
    recoveryRouteCard(
      "/igcse-trigonometry-tutor",
      "IGCSE Trigonometry Tutor",
      "Topic route",
      "Use this for identity work, ratios, graph interpretation, and paper-style method writing.",
      ["Trigonometry", "IGCSE"],
    ),
    recoveryRouteCard(
      "/ib-calculus-tutor",
      "IB Calculus Tutor",
      "Topic route",
      "Use this when calculus needs to connect to DP pathway, applications, and mixed problem practice.",
      ["Calculus", "IB"],
    ),
    recoveryRouteCard(
      "/board-exam-maths-revision",
      "Board Exam Maths Revision",
      "Revision route",
      "Use this when exam timing, weak chapters, and sample-paper correction are already urgent.",
      ["Revision", "Boards"],
    ),
  ];
}

function createBatchALocalityConfig(page) {
  const schoolSignalText = (page.schoolSignals ?? []).join(", ");

  return createPublishedGurugramEntryConfig({
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: "service",
    title: page.title,
    h1: page.h1,
    intro: `${page.title} helps families compare home tuition around ${page.localityLabel} without separating locality convenience from board, class, topic, and school-corridor fit.`,
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      localityLabels: [page.localityLabel, page.localitySlug],
      tokens: [
        page.localityLabel,
        page.primaryKeyword,
        page.corridor,
        ...(page.schoolSignals ?? []),
        "maths home tuition",
        "Gurugram",
      ],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: [page.localityLabel, "home tuition", "school support", "revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      localityLabels: [page.localitySlug, page.localityLabel],
      tokens: [page.localityLabel, "school support", "board preparation"],
      limit: 3,
    },
    seoTitle: `Maths Home Tutor in ${page.localityLabel} Gurugram | Maths Bodhi`,
    seoDescription: `Find maths home tuition in ${page.localityLabel}, Gurugram with related locality, board, class, topic, WhatsApp, and demo links.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: page.localityLabel },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: `${page.localityLabel} maths home tuition`,
        chips: [page.localityLabel, "Gurugram", "Home tuition", "School support", "Board fit"],
        stats: [
          { value: "Local", label: "Locality route" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Next step" },
        ],
        supportPanel: {
          title: `${page.localityLabel} works best when locality and school rhythm are checked together`,
          text: `${page.localityNote}. This page keeps ${page.corridor} context connected to the student's class and board.`,
          bullets: [
            `School-corridor signals: ${schoolSignalText || "nearby Gurugram schools"}`,
            "Related locality, board, class, and topic links are grouped below",
            "Tutor matches use published profile data only; no placeholder tutors or fake counts are shown",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Locality Fit",
        title: `How maths home tuition should work in ${page.localityLabel}`,
        subtitle:
          "The page keeps the local search useful by connecting school timing, board pressure, class level, and chapter need instead of repeating a generic city paragraph.",
        points: [
          supportPoint(
            "Local convenience should protect consistency",
            `${page.localityLabel} is most useful when the tutor shortlist can fit school timing, travel practicality, and a regular weekly maths rhythm.`,
          ),
          supportPoint(
            "Board and class fit still matter",
            "A locality page should lead families into the right CBSE, IB, IGCSE, class, or topic route before the demo conversation gets too broad.",
          ),
          supportPoint(
            "School-corridor language stays careful",
            "The page can mention nearby school context for planning, but it does not imply any official school partnership, ranking, or guaranteed outcome.",
          ),
        ],
      },
      routeGroups: [
        {
          id: `${page.slug}-related-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality and corridor pages",
          subtitle:
            "Use these pages when school access, travel convenience, or nearby sector fit changes the home tuition plan.",
          cards: createBatchALocalityCards(page),
        },
        {
          id: `${page.slug}-school-context`,
          badge: "School Context",
          title: `School and locality context families may mention near ${page.localityLabel}`,
          subtitle:
            "Use these school-area cues to discuss timing, worksheets, and nearby travel context more clearly.",
          note:
            "School names are included only as local planning context. Maths Bodhi is not officially affiliated with these schools.",
          cards: createSchoolContextCards(page.localityLabel),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-related-boards`,
          badge: "Related Boards",
          title: "Related board and school-support pages",
          subtitle:
            "Move into the right curriculum route when board style matters more than the exact locality.",
          cards: createBatchABoardCards(),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-related-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use class pages when the student's grade, test calendar, or senior-school rhythm is the main decision signal.",
          cards: createBatchAClassCards(),
        },
        {
          id: `${page.slug}-related-topics`,
          badge: "Related Topics",
          title: "Related topic and revision pages",
          subtitle:
            "These routes help families move from local search into the chapters or revision pressure causing the most friction.",
          cards: createBatchATopicCards(),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published maths tutors relevant to ${page.localityLabel}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here when they match locality, board, class, or topic signals.",
        emptyState: {
          title: `No exact published tutor profile is shown for ${page.localityLabel} yet`,
          description:
            "Maths Bodhi can still check current fit after the family shares the student's class, board, school area, weak chapters, and preferred learning mode.",
          primaryAction: {
            label: "Book a free maths demo class",
            to: "/book-free-demo-class",
          },
          secondaryAction: {
            label: "Back to Gurugram hub",
            to: "/gurugram",
          },
        },
      },
      faqs: [
        faqItem(
          `Who is this ${page.localityLabel} maths tutor page for?`,
          `It is for families who want ${page.primaryKeyword} and need the first shortlist to consider locality convenience, school timing, board fit, and class pressure together.`,
        ),
        faqItem(
          "Does this page imply a school partnership?",
          "No. School and corridor references are used only to explain local planning context. Maths Bodhi does not claim official affiliation with any school on this page.",
        ),
        faqItem(
          "What should parents share before booking a demo?",
          "Share the student's class, board, school area, weak chapters, recent test pattern, preferred timing, and whether home tuition or online support is preferred.",
        ),
      ],
      cta: {
        title: `Book a free maths demo for ${page.localityLabel}`,
        description:
          "Share the student's class, board, locality, school area, and current maths concern. Maths Bodhi can check whether home tuition, online support, or a focused mentor call is the right next step.",
        primaryAction: {
          label: "Book a free maths demo class",
          to: "/book-free-demo-class",
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchAWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchAWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  });
}

function createBatchEWhatsAppHref(page, purpose = "premium society or sector maths home tuition") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createBatchEAreaCards(page) {
  const currentGroup = page.group;
  const societyCards = batchERootSeoPages
    .filter((item) => item.group === "batch-e-society" && item.path !== page.path)
    .slice(0, currentGroup === "batch-e-society" ? 4 : 3)
    .map((item) =>
      recoveryRouteCard(
        item.path,
        item.title,
        "Related society",
        `Compare ${item.societyLabel} when the family wants maths home tuition near a premium society or nearby corridor.`,
        [item.societyLabel, item.localityLabel, "Society"],
      ),
    );

  const sectorCards = batchERootSeoPages
    .filter((item) => item.group === "batch-e-sector" && item.path !== page.path)
    .slice(0, currentGroup === "batch-e-sector" ? 4 : 3)
    .map((item) =>
      recoveryRouteCard(
        item.path,
        item.title,
        "Related sector",
        `Compare ${item.localityLabel} when sector access, school timing, or weekday travel changes the tutor shortlist.`,
        [item.localityLabel, "Sector", "Gurugram"],
      ),
    );

  const parentCard =
    page.group === "batch-e-society"
      ? recoveryRouteCard(
          page.localityPath,
          `Maths home tutor in ${page.localityLabel}`,
          "Parent locality",
          `Open the nearby ${page.localityLabel} route before choosing support near ${page.societyLabel}.`,
          [page.localityLabel, "Locality"],
        )
      : recoveryRouteCard(
          "/maths-home-tutor-in-gurgaon",
          "Maths Home Tutor in Gurgaon",
          "Gurgaon hub",
          "Use the Gurgaon hub to compare sectors, societies, boards, classes, and topic routes together.",
          ["Gurgaon", "Hub"],
        );

  return [parentCard, ...societyCards, ...sectorCards].slice(0, 6);
}

function createBatchEBoardCards() {
  return [
    recoveryRouteCard(
      "/gurugram/cbse-maths-home-tutor",
      "CBSE Maths Home Tutor in Gurugram",
      "Board route",
      "Use this route when NCERT pace, school worksheets, and board-year preparation shape the plan.",
      ["CBSE", "Gurugram"],
    ),
    recoveryRouteCard(
      "/gurugram/igcse-maths-home-tutor",
      "IGCSE Maths Home Tutor in Gurugram",
      "Board route",
      "Use this route for Core, Extended, past-paper correction, and international-school maths support.",
      ["IGCSE", "Premium schools"],
    ),
    recoveryRouteCard(
      "/gurugram/ib-maths-home-tutor",
      "IB Maths Home Tutor in Gurugram",
      "Board route",
      "Use this route when MYP or DP pathway fit, reflection, and mixed-problem practice matter.",
      ["IB", "MYP and DP"],
    ),
    recoveryRouteCard(
      "/premium-school-maths-home-tutor",
      "Premium School Maths Home Tutor",
      "School support",
      "Compare premium-school support before narrowing to the student's exact board, class, or locality.",
      ["Premium schools", "Tutor fit"],
    ),
  ];
}

function createBatchEClassCards() {
  return [
    recoveryRouteCard(
      "/class-10-cbse-maths-home-tutor",
      "Class 10 CBSE Maths Home Tutor",
      "Class route",
      "Use this when board-year revision, written method, and school-test pressure are central.",
      ["Class 10", "CBSE"],
    ),
    recoveryRouteCard(
      "/class-12-cbse-maths-home-tutor",
      "Class 12 CBSE Maths Home Tutor",
      "Class route",
      "Use this when senior-school maths needs stronger weekly planning and board-style practice.",
      ["Class 12", "CBSE"],
    ),
    recoveryRouteCard(
      "/class-10-igcse-maths-home-tutor",
      "Class 10 IGCSE Maths Home Tutor",
      "Class route",
      "Use this when IGCSE paper technique and topic-by-topic correction are the main pressure.",
      ["Class 10", "IGCSE"],
    ),
    recoveryRouteCard(
      "/class-12-ib-maths-home-tutor",
      "Class 12 IB Maths Home Tutor",
      "Class route",
      "Use this when DP maths, AA or AI fit, and regular problem reflection need to be clearer.",
      ["Class 12", "IB"],
    ),
  ];
}

function createBatchETopicCards() {
  return [
    recoveryRouteCard(
      "/cbse-algebra-tutor",
      "CBSE Algebra Tutor",
      "Topic route",
      "Open this when equations, expressions, functions, or graph sense are the student friction points.",
      ["Algebra", "CBSE"],
    ),
    recoveryRouteCard(
      "/igcse-trigonometry-tutor",
      "IGCSE Trigonometry Tutor",
      "Topic route",
      "Use this for identity work, ratios, graph interpretation, and paper-style method writing.",
      ["Trigonometry", "IGCSE"],
    ),
    recoveryRouteCard(
      "/ib-calculus-tutor",
      "IB Calculus Tutor",
      "Topic route",
      "Use this when calculus needs to connect to DP pathway, applications, and mixed problem practice.",
      ["Calculus", "IB"],
    ),
    recoveryRouteCard(
      "/board-exam-maths-revision",
      "Board Exam Maths Revision",
      "Revision route",
      "Use this when exam timing, weak chapters, and sample-paper correction are already urgent.",
      ["Revision", "Boards"],
    ),
  ];
}

function buildBatchESupportPoints(page) {
  if (page.group === "batch-e-society") {
    return [
      supportPoint(
        `${page.societyLabel} searches should still start with academic fit`,
        `This page uses ${page.societyLabel} as local search context, then connects the family back to class, board, topic, and demo decisions.`,
      ),
      supportPoint(
        "Premium society convenience should protect consistency",
        "Nearby home tuition is useful when the tutor can fit school timing, homework follow-through, revision rhythm, and parent coordination.",
      ),
      supportPoint(
        "No unsupported society claims",
        "Maths Bodhi does not claim official society affiliation, guaranteed tutor availability, fake reviews, or guaranteed academic outcomes.",
      ),
    ];
  }

  return [
    supportPoint(
      `${page.localityLabel} should be connected to school rhythm`,
      `${page.localityLabel} is useful when home tuition needs to fit ${page.localityNote}.`,
    ),
    supportPoint(
      "Sector pages should lead into the right board and class",
      "The page keeps CBSE, IB, IGCSE, class, topic, and revision links visible so the family does not stay on a generic locality page.",
    ),
    supportPoint(
      "Tutor filtering remains grounded in published data",
      "Tutor cards appear only when real profiles match the locality, board, class, or topic signals; empty states keep the enquiry route honest.",
    ),
  ];
}

function buildBatchEFaqs(page) {
  const areaLabel = page.societyLabel ?? page.localityLabel;

  return [
    faqItem(
      `Who is this ${areaLabel} maths tutor page for?`,
      `It is for families who want ${page.primaryKeyword} and need the first shortlist to consider locality convenience, board fit, class pressure, and topic gaps together.`,
    ),
    faqItem(
      page.group === "batch-e-society"
        ? `Is Maths Bodhi officially affiliated with ${page.societyLabel}?`
        : "Does this sector page guarantee tutor availability?",
      page.group === "batch-e-society"
        ? "No. The society name is used only for local search and planning context. Maths Bodhi does not claim any official society partnership."
        : "No. The page helps families explain local need clearly; actual tutor availability is checked after class, board, chapters, and schedule are shared.",
    ),
    faqItem(
      "What should parents share before booking a demo?",
      "Share the student's class, board, school area, weak chapters, recent test pattern, preferred timing, and whether home tuition or online support is preferred.",
    ),
  ];
}

function createBatchEConfig(page) {
  const areaLabel = page.societyLabel ?? page.localityLabel;
  const isSocietyPage = page.group === "batch-e-society";

  return createPublishedGurugramEntryConfig({
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: isSocietyPage ? "society" : "sector",
    title: page.title,
    h1: page.h1,
    intro: isSocietyPage
      ? `${page.title} is for families searching near ${page.societyLabel} who want locality convenience without losing sight of board, class, topic, and demo fit.`
      : `${page.title} is a focused Gurugram sector page for families who want home tuition around ${page.localityLabel} with school rhythm, board fit, and chapter support connected.`,
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      localityLabels: [page.localityLabel, page.localitySlug, page.societyLabel, page.societySlug].filter(Boolean),
      tokens: [
        page.primaryKeyword,
        page.localityLabel,
        page.localitySlug,
        page.societyLabel,
        "maths home tuition",
        "Gurugram",
        "premium society",
        "board support",
      ].filter(Boolean),
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: [areaLabel, "home tuition", "school support", "revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      localityLabels: [page.localityLabel, page.localitySlug, page.societyLabel].filter(Boolean),
      tokens: [areaLabel, "school support", "board preparation"],
      limit: 3,
    },
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: `Explore ${page.primaryKeyword} with related society, sector, locality, board, class, topic, WhatsApp, mentor, and demo links.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      ...(isSocietyPage ? [{ label: page.localityLabel, to: page.localityPath }] : []),
      { label: areaLabel },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: isSocietyPage ? `Near ${page.societyLabel}` : `${page.localityLabel} maths home tuition`,
        chips: [areaLabel, page.localityLabel, "Gurugram", "Home tuition", "Board fit"].filter(Boolean),
        stats: [
          { value: isSocietyPage ? "Society" : "Sector", label: "Local search route" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Next step" },
        ],
        supportPanel: {
          title: `${areaLabel} searches work best when local convenience and academic fit stay together`,
          text: isSocietyPage
            ? `Families near ${page.societyLabel} can use this route to discuss class, board, weak chapters, schedule, and whether home tuition or online continuity is practical.`
            : `${page.localityLabel} context helps the family explain school timing, travel feasibility, and the weekly maths rhythm they need.`,
          bullets: [
            "Related society, sector, locality, board, class, and topic links are grouped below",
            "Tutor cards use real published profile data only",
            "No fake tutor counts, fake reviews, or guaranteed-result claims are used",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: isSocietyPage ? "Premium Society Fit" : "Sector Fit",
        title: `How maths home tuition should work around ${areaLabel}`,
        subtitle:
          "The page keeps local convenience connected to board, class, topic, and demo decisions so it stays useful rather than a thin locality route.",
        points: buildBatchESupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-society-sector-locality`,
          badge: "Related Societies and Sectors",
          title: "Related society, sector, and locality pages",
          subtitle:
            "Use these routes when society access, nearby sector fit, or school-corridor convenience changes the shortlist.",
          cards: createBatchEAreaCards(page),
        },
        {
          id: `${page.slug}-school-context`,
          badge: "School Context",
          title: `School and locality context families may mention near ${areaLabel}`,
          subtitle:
            "Use these school-area cues to discuss timing, worksheets, and nearby travel context more clearly.",
          note:
            "School names are included only as local planning context. Maths Bodhi is not officially affiliated with these schools.",
          cards: createSchoolContextCards(areaLabel),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board and school-support pages",
          subtitle:
            "Move into the right curriculum route when board style matters more than the exact locality.",
          cards: createBatchEBoardCards(),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use class pages when the student's grade, test calendar, or senior-school rhythm is the main decision signal.",
          cards: createBatchEClassCards(),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic and revision pages",
          subtitle:
            "These routes help families move from local search into the chapters or revision pressure causing the most friction.",
          cards: createBatchETopicCards(),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published maths tutors relevant to ${areaLabel}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here when they match locality, society, board, class, or topic signals.",
        emptyState: {
          title: `No exact published tutor profile is shown for ${areaLabel} yet`,
          description:
            "Maths Bodhi can still check current fit after the family shares the student's class, board, school area, weak chapters, and preferred learning mode.",
          primaryAction: {
            label: "Book a free maths demo class",
            to: "/book-free-demo-class",
          },
          secondaryAction: {
            label: "Back to Gurugram hub",
            to: "/gurugram",
          },
        },
      },
      faqs: buildBatchEFaqs(page),
      cta: {
        title: `Book a free maths demo for ${areaLabel}`,
        description:
          "Share the student's class, board, locality or society, school area, and current maths concern. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a free maths demo class",
          to: "/book-free-demo-class",
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchEWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchEWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  });
}

export const batchTwoGurugramEntryConfigs = [
  createPublishedGurugramEntryConfig({
    id: "gurugram-sector-57-service",
    slug: "sector-57",
    routePath: "/gurugram/sector-57",
    pageType: "sector",
    title: "Sector 57 maths home tuition",
    h1: "Maths home tutor in Sector 57, Gurugram for school support, board follow-through, and calmer revision",
    intro:
      "Use this Sector 57 page when the family wants maths home tuition that balances foundation repair, school pace, and board readiness without making weekday logistics harder.",
    relatedTutorQuery: {
      kind: "sector",
      citySlug: "gurugram",
      sectorSlug: "sector-57",
      sectorLabel: "Sector 57",
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["CBSE", "IGCSE", "Board Prep", "Class 10"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      tokens: ["CBSE", "IGCSE", "Class 10"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor in Sector 57 Gurugram | Board Support and Revision Structure",
    seoDescription:
      "Find maths home tuition in Sector 57 Gurugram for school support, chapter clarity, board follow-through, and steadier revision routines.",
    canonicalUrl: "/gurugram/sector-57",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sector 57" },
    ],
    sectorSlug: "sector-57",
    sections: {
      hero: {
        badge: "Sector 57 Maths Support",
        chips: ["School support", "Board follow-through", "Weekday home tuition", "Mixed class demand"],
        stats: [
          { value: "Practical", label: "Weekday scheduling fit" },
          { value: "Mixed", label: "Board and class demand" },
          { value: "Steady", label: "Revision-led tutoring style" },
        ],
        supportPanel: {
          title: "Sector 57 works well when the family wants maths support that feels organised rather than rushed",
          text:
            "This page is useful for students who need home tuition that improves chapter clarity, keeps homework moving, and creates a calmer revision rhythm before exams feel heavy.",
          bullets: [
            "Useful for school support and board follow-through together",
            "Works well for families balancing busy weekday schedules",
            "Best next step is still the board or class page that matches the student's pressure",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sector 57",
        title: "What families usually compare on this Sector 57 maths page",
        subtitle:
          "The most useful comparison here is usually between school pacing, board pressure, and whether the student needs more correction, more structure, or both.",
        points: [
          supportPoint(
            "Foundation repair with school rhythm",
            "Sector 57 families often want lessons that strengthen basics without breaking the student's regular school and homework flow.",
          ),
          supportPoint(
            "Board-year support without panic",
            "When Class 10 or senior-school maths starts feeling heavier, a steadier chapter-by-chapter revision plan usually matters more than extra random worksheets.",
          ),
          supportPoint(
            "A practical Gurugram route",
            "This page works best when locality convenience is important but the family still wants the next maths decision to stay specific and useful.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sector57-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sector 57 families often open next",
          subtitle:
            "Choose a nearby board or class route that matches the student's maths need more closely.",
          cards: sector57BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to Sector 57, Gurugram",
        subtitle:
          "These tutor cards are most useful when the family wants a practical home-tuition routine with clear school and board follow-through.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories Sector 57 families often relate to",
        subtitle:
          "These outcomes stay close to the kinds of school and board improvements families usually want from more structured maths support.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Sector 57 families often read next",
        subtitle:
          "These guides stay close to board preparation, revision routine, and the practical questions that usually come up after school tests.",
      },
      faqs: [
        faqItem(
          "Why is Sector 57 useful for maths home tuition in Gurugram?",
          "Because it suits families who want a practical home-tuition route with steadier school follow-through, more organised chapter revision, and manageable weekday scheduling.",
        ),
        faqItem(
          "Is Sector 57 mainly for board classes only?",
          "No. The page is useful for both foundation work and board-year support, but the best next step is still to open the board or class page that matches the student's current maths pressure.",
        ),
        faqItem(
          "What should families compare next from Sector 57?",
          "Usually the next page is either the relevant Gurugram board page or the Class 10 route if board-style revision and chapter clarity are already the main concern.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sector 57",
        description:
          "Share the class, board, and the chapters or school tests causing the most friction. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sector 57 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-sector-62-service",
    slug: "sector-62",
    routePath: "/gurugram/sector-62",
    pageType: "service",
    title: "Sector 62 maths home tuition",
    h1: "Maths home tutor near Sector 62, Gurugram for premium-corridor and international-school support",
    intro:
      "Use this Sector 62 page when the family wants a premium-corridor view with strong IB and IGCSE relevance, school-aware tutoring, and realistic home-tuition planning around this part of Gurugram.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 54", "Sector 55", "Sector 56"],
      schoolTokens: [
        "Pathways World School",
        "The Heritage Xperiential Learning School",
        "Lancers International School",
        "Scottish High International School",
      ],
      tokens: ["IB", "IGCSE"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "Revision", "Method Marks"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-54", "sector-56"],
      tokens: ["IB", "IGCSE"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor near Sector 62 Gurugram | Premium Corridor IB and IGCSE Support",
    seoDescription:
      "Explore maths home tuition near Sector 62 Gurugram with premium-corridor context, international-school relevance, and board-aware tutor routes.",
    canonicalUrl: "/gurugram/sector-62",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sector 62" },
    ],
    sections: {
      hero: {
        badge: "Sector 62 Maths Support",
        chips: ["Premium corridor", "IB", "IGCSE", "School-aware home tuition"],
        stats: [
          { value: "Premium", label: "Corridor shortlisting intent" },
          { value: "International", label: "School-fit relevance" },
          { value: "Focused", label: "Board-led next steps" },
        ],
        supportPanel: {
          title: "Sector 62 is best treated as a premium-corridor maths decision, not a generic locality search",
          text:
            "Families exploring this area usually want the right international-school fit, realistic travel planning, and tutoring that keeps board expectations clear from the start.",
          bullets: [
            "Useful for IB and IGCSE comparisons first",
            "Works best with a corridor-level view rather than a generic city search",
            "The next step is often Golf Course Road or the exact board page",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sector 62",
        title: "What families usually compare on this Sector 62 maths page",
        subtitle:
          "The most useful questions here are usually about premium-school rhythm, board fit, and whether the tutoring plan should stay home-based, hybrid, or more flexible.",
        points: [
          supportPoint(
            "Premium-corridor school context",
            "Families in and around Sector 62 often care about school-aware tutoring that respects international-school pace instead of treating all maths support the same way.",
          ),
          supportPoint(
            "Board-led shortlisting matters more than generic locality search",
            "IB and IGCSE usually need a cleaner fit on method, revision, and paper style, so the board route often matters as much as the locality itself.",
          ),
          supportPoint(
            "A practical way to compare nearby premium routes",
            "This page helps families compare Sector 62 thinking with Golf Course Road and nearby premium sectors before moving into one exact tutor conversation.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sector62-next-pages",
          badge: "Useful Next Pages",
          title: "Pages families often open next from the Sector 62 corridor",
          subtitle:
            "These pages keep the decision useful by linking premium-corridor context back to the board and locality routes that usually matter most.",
          cards: sector62BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to the Sector 62 premium corridor",
        subtitle:
          "These tutor cards are useful when the family wants international-school awareness and a realistic Gurugram home-tuition plan.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories that often matter to Sector 62 families",
        subtitle:
          "These results stay close to premium-corridor and international-school expectations without pretending every outcome came from one exact block.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Sector 62 families often read next",
        subtitle:
          "These guides help parents compare revision pacing, method clarity, and the board-specific questions that usually drive premium-corridor shortlisting.",
      },
      faqs: [
        faqItem(
          "Why is Sector 62 treated as a premium-corridor maths page?",
          "Because families here often compare school fit, board route, and corridor convenience together rather than searching for a generic locality-only tutor page.",
        ),
        faqItem(
          "Is Sector 62 mainly relevant for IB and IGCSE maths support?",
          "Mostly yes. The strongest fit usually comes from international-school and premium-corridor demand, especially when method clarity and revision pacing matter.",
        ),
        faqItem(
          "What page should families open next from Sector 62?",
          "Usually the next step is the IB or IGCSE page, or the Golf Course Road corridor page if the family still wants the broader nearby-locality view first.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for the Sector 62 corridor",
        description:
          "Share the school, board, and whether the family wants home tuition, hybrid support, or a premium-corridor shortlist first. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sector 62 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-sohna-road-service",
    slug: "sohna-road",
    routePath: "/gurugram/sohna-road",
    pageType: "service",
    title: "Sohna Road maths home tuition",
    h1: "Maths home tutor on Sohna Road, Gurugram for board support, senior classes, and practical travel fit",
    intro:
      "Use this Sohna Road page when the family wants maths home tuition that stays practical across the Sector 49 and 50 belt, supports school pace, and still feels organised for board or JEE pressure.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 49", "Sector 50", "Sector 57"],
      schoolTokens: ["St. Xavier's High School", "GD Goenka Public School", "DPS International Edge"],
      tokens: ["CBSE", "JEE", "Class 10", "Class 12"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["CBSE", "JEE", "Class 10", "Class 12", "Board Prep"],
      limit: 4,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-50", "sector-46"],
      tokens: ["CBSE", "JEE", "Class 10"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor on Sohna Road Gurugram | Board and Senior School Support",
    seoDescription:
      "Find maths home tuition on Sohna Road Gurugram with practical travel fit, board support, senior-school maths help, and relevant tutor routes.",
    canonicalUrl: "/gurugram/sohna-road",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sohna Road" },
    ],
    sections: {
      hero: {
        badge: "Sohna Road Maths Support",
        chips: ["Sector 49 and 50 belt", "CBSE", "JEE", "Senior-school maths", "Practical travel fit"],
        stats: [
          { value: "Busy", label: "After-school travel reality" },
          { value: "Senior", label: "Class 10 to 12 demand" },
          { value: "Practical", label: "Home and hybrid fit" },
        ],
        supportPanel: {
          title: "Sohna Road works best when the family wants a practical maths routine that still feels serious",
          text:
            "This page is for parents who need school support, board preparation, or senior-school maths tutoring without making travel, timing, and energy management worse.",
          bullets: [
            "Useful for board classes and JEE-linked maths pressure",
            "Helps compare school support with senior-class problem solving",
            "Works well for families who need practical travel fit first",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sohna Road",
        title: "What families usually compare on this Sohna Road maths page",
        subtitle:
          "The most useful shortlisting here usually combines school pace, senior-class pressure, and how realistic the weekly home-tuition rhythm actually feels.",
        points: [
          supportPoint(
            "Board support with practical logistics",
            "Sohna Road families often want maths home tuition that helps with school tests and board work without turning weekday travel into a bigger problem.",
          ),
          supportPoint(
            "Senior classes need more structure, not only more questions",
            "Class 10, Class 12, and JEE-linked maths usually improve more when chapter order, correction, and weekly review get steadier.",
          ),
          supportPoint(
            "Useful for hybrid thinking too",
            "This corridor often suits families who want the option of home tuition plus a more flexible online or hybrid rhythm during tighter weeks.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sohna-road-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sohna Road families often open next",
          subtitle:
            "Choose the board or class route that best matches the student's current maths pressure.",
          cards: sohnaRoadBoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to the Sohna Road belt",
        subtitle:
          "These tutor cards are useful when the family wants senior-class maths support with practical Gurugram travel and timing fit.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories Sohna Road families often relate to",
        subtitle:
          "These outcomes stay close to board-year discipline, senior-class consistency, and the kinds of gains families usually want from steadier tutoring.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Sohna Road families often read next",
        subtitle:
          "These guides stay close to Class 10 and 12 rhythm, board preparation, and the exam-structure questions that usually matter here.",
      },
      faqs: [
        faqItem(
          "Why is Sohna Road a useful maths home tuition route in Gurugram?",
          "Because families here often need a practical tutoring plan that respects school pace, senior-class pressure, and the travel reality of the corridor.",
        ),
        faqItem(
          "Is this page mainly for board maths or JEE maths?",
          "It can serve both. Sohna Road is useful for school-led board support as well as senior-school maths tutoring that overlaps with JEE style preparation.",
        ),
        faqItem(
          "What page should families open next from Sohna Road?",
          "Usually the next page is the CBSE route, the JEE route, or the Class 12 page if senior-school maths consistency is already the main concern.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sohna Road",
        description:
          "Share the class, board, school, and whether the family wants home tuition only or a more flexible plan. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sohna Road maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-dlf-phase-1-service",
    slug: "dlf-phase-1",
    routePath: "/gurugram/dlf-phase-1",
    pageType: "service",
    title: "DLF Phase 1 maths home tuition",
    h1: "Maths home tutor in DLF Phase 1, Gurugram for premium-school fit and calmer one-to-one support",
    intro:
      "Use this DLF Phase 1 page when the family wants premium-corridor maths home tuition with strong IB or IGCSE relevance, a realistic Golf Course Road connection, and more personal one-to-one structure.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 54"],
      schoolTokens: ["The Shri Ram School Aravali", "Lancers International School", "Pathways World School"],
      tokens: ["IB", "IGCSE"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "Revision", "Method Marks"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-54"],
      tokens: ["IB", "IGCSE"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor in DLF Phase 1 Gurugram | Premium School and IGCSE IB Support",
    seoDescription:
      "Find maths home tuition in DLF Phase 1 Gurugram with premium-school context, Golf Course Road access, and stronger IB or IGCSE tutor fit.",
    canonicalUrl: "/gurugram/dlf-phase-1",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "DLF Phase 1" },
    ],
    sections: {
      hero: {
        badge: "DLF Phase 1 Maths Support",
        chips: ["Premium corridor", "IB", "IGCSE", "Golf Course Road access"],
        stats: [
          { value: "Premium", label: "Neighbourhood shortlisting" },
          { value: "Strong", label: "International-school relevance" },
          { value: "Calm", label: "One-to-one tutoring fit" },
        ],
        supportPanel: {
          title: "DLF Phase 1 is useful when the family wants premium-corridor maths support without a generic search",
          text:
            "This page helps parents compare international-school fit, nearby premium-school access, and the tutoring style that usually works best in a more personal home-tuition setting.",
          bullets: [
            "Useful for premium-school and Golf Course Road thinking",
            "Best matched with IB or IGCSE needs",
            "Works well when calmer one-to-one structure matters as much as locality",
          ],
        },
      },
      supportPoints: {
        badge: "Why DLF Phase 1",
        title: "What families usually compare on this DLF Phase 1 maths page",
        subtitle:
          "The most useful comparison here is usually between premium-school fit, board expectations, and how the home-tuition routine will actually feel week to week.",
        points: [
          supportPoint(
            "Premium-school awareness matters",
            "Families here often need tutors who understand the pace and written expectations of international-school maths rather than using a one-size-fits-all lesson style.",
          ),
          supportPoint(
            "Board specificity prevents thin shortlisting",
            "IB and IGCSE maths usually need clearer decisions around method, pacing, and paper-fit support, so this page works best when the board route stays visible.",
          ),
          supportPoint(
            "Neighbourhood convenience still matters",
            "DLF Phase 1 can be a better first step for families who want a more precise neighbourhood context before moving into one exact tutor conversation.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "dlf-phase-1-next-pages",
          badge: "Useful Next Pages",
          title: "Pages DLF Phase 1 families often open next",
          subtitle:
            "These pages help families keep the neighbourhood view practical by connecting it back to premium-corridor and board-specific maths routes.",
          cards: dlfPhase1BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to DLF Phase 1, Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants premium-school awareness with calmer one-to-one home-tuition structure.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories DLF Phase 1 families often relate to",
        subtitle:
          "These outcomes stay close to premium-corridor, method-first, and international-school maths expectations.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides DLF Phase 1 families often read next",
        subtitle:
          "These guides stay close to revision pacing, method clarity, and the board-fit questions families in premium corridors usually ask next.",
      },
      faqs: [
        faqItem(
          "Why is DLF Phase 1 useful for maths home tuition in Gurugram?",
          "Because it helps families compare premium-school access, Golf Course Road convenience, and IB or IGCSE tutor fit in a more precise neighbourhood context.",
        ),
        faqItem(
          "Is DLF Phase 1 mainly relevant for international-school maths support?",
          "Mostly yes. The strongest fit usually comes from IB and IGCSE demand, especially when families want school-aware tutoring and calmer one-to-one structure.",
        ),
        faqItem(
          "What page should families open next from DLF Phase 1?",
          "Usually the next step is the IB or IGCSE page, or the Golf Course Road page if the family wants the wider premium-corridor view first.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for DLF Phase 1",
        description:
          "Share the school, board, and whether the family wants home-only support or a more flexible premium-corridor shortlist. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a DLF Phase 1 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-dlf-phase-4-service",
    slug: "dlf-phase-4",
    routePath: "/gurugram/dlf-phase-4",
    pageType: "service",
    title: "DLF Phase 4 maths home tuition",
    h1: "Maths home tutor in DLF Phase 4, Gurugram for premium-corridor families and board-specific support",
    intro:
      "Use this DLF Phase 4 page when the family wants a premium neighbourhood route with strong board fit, calmer scheduling, and easier comparison between IB, IGCSE, and school-led maths support.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 54", "Sector 55"],
      schoolTokens: [
        "Scottish High International School",
        "The Shri Ram School Aravali",
        "The Heritage Xperiential Learning School",
      ],
      tokens: ["IB", "IGCSE", "CBSE"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["IB", "IGCSE", "CBSE", "Revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-54", "sector-56"],
      tokens: ["IB", "IGCSE", "CBSE"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor in DLF Phase 4 Gurugram | Premium Corridor Board Support",
    seoDescription:
      "Explore maths home tuition in DLF Phase 4 Gurugram with premium-corridor access, board-specific support, and practical tutor shortlisting.",
    canonicalUrl: "/gurugram/dlf-phase-4",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "DLF Phase 4" },
    ],
    sections: {
      hero: {
        badge: "DLF Phase 4 Maths Support",
        chips: ["Premium neighbourhood", "IB", "IGCSE", "CBSE", "Calmer scheduling"],
        stats: [
          { value: "Premium", label: "Neighbourhood demand" },
          { value: "Mixed", label: "Board variety" },
          { value: "Useful", label: "Corridor comparison fit" },
        ],
        supportPanel: {
          title: "DLF Phase 4 is useful when the family wants premium-corridor access without losing board clarity",
          text:
            "This page helps families compare neighbourhood convenience, school rhythm, and the exact maths route that fits the student most closely.",
          bullets: [
            "Useful for premium-neighbourhood shortlisting",
            "Works best when the board route still stays visible",
            "Helps compare IB, IGCSE, and school-led maths support more cleanly",
          ],
        },
      },
      supportPoints: {
        badge: "Why DLF Phase 4",
        title: "What families usually compare on this DLF Phase 4 maths page",
        subtitle:
          "The most useful shortlisting here usually depends on how clearly the family can connect premium-neighbourhood convenience with the student's real maths pressure.",
        points: [
          supportPoint(
            "Neighbourhood convenience needs board-specific clarity",
            "DLF Phase 4 can feel like a premium location decision first, but the most useful results usually come when the family quickly links that choice back to the right board page.",
          ),
          supportPoint(
            "Mixed board demand benefits from cleaner interlinking",
            "IB, IGCSE, and school-led maths support can all be relevant here, so useful pages should help families compare routes instead of forcing everything into one generic story.",
          ),
          supportPoint(
            "A calmer weekly routine still matters",
            "Many parents here want a tutoring plan that fits premium-school pace while still feeling manageable across weekday schedules and revision cycles.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "dlf-phase-4-next-pages",
          badge: "Useful Next Pages",
          title: "Pages DLF Phase 4 families often open next",
          subtitle:
            "Choose the board route that best matches the student's maths need in this neighbourhood.",
          cards: dlfPhase4BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to DLF Phase 4, Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants premium-corridor convenience without losing board-specific shortlisting.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories DLF Phase 4 families often relate to",
        subtitle:
          "These outcomes stay close to premium-corridor board fit, revision structure, and the kinds of academic changes families usually want to see.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides DLF Phase 4 families often read next",
        subtitle:
          "These guides stay close to revision pacing, board fit, and the practical support questions that usually follow a premium-neighbourhood search.",
      },
      faqs: [
        faqItem(
          "Why is DLF Phase 4 useful for maths home tuition in Gurugram?",
          "Because it gives families a premium-neighbourhood route that still points clearly into the right board-led maths decision instead of staying generic.",
        ),
        faqItem(
          "Does DLF Phase 4 mainly fit IB and IGCSE families?",
          "It is especially useful for those routes, but it can also work for school-led maths support when the family wants premium-corridor convenience and calmer scheduling.",
        ),
        faqItem(
          "What should families open next from DLF Phase 4?",
          "Usually the next step is the IB, IGCSE, or CBSE page depending on the student's actual maths pressure, or the Gurugram hub if the comparison is still wider.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for DLF Phase 4",
        description:
          "Share the school, board, and the kind of weekly schedule the family wants. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a DLF Phase 4 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-south-city-1-service",
    slug: "south-city-1",
    routePath: "/gurugram/south-city-1",
    pageType: "service",
    title: "South City 1 maths home tuition",
    h1: "Maths home tutor in South City 1, Gurugram for school support, Class 10 to 12 rhythm, and steady homework follow-through",
    intro:
      "Use this South City 1 page when the family wants maths home tuition that improves school consistency, keeps homework and chapter tests organised, and supports board-year build-up more calmly.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 45", "Sector 46", "Sector 52"],
      schoolTokens: ["DPS International Edge", "Amity International School", "Shalom Presidency School"],
      tokens: ["CBSE", "Class 10", "Class 12", "Foundation"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["CBSE", "Class 10", "Class 12", "Board Prep"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-46", "sector-50"],
      tokens: ["CBSE", "Class 10", "Class 7"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor in South City 1 Gurugram | School Support and Board Rhythm",
    seoDescription:
      "Find maths home tuition in South City 1 Gurugram for school support, chapter clarity, homework structure, and steadier Class 10 to 12 maths preparation.",
    canonicalUrl: "/gurugram/south-city-1",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "South City 1" },
    ],
    sections: {
      hero: {
        badge: "South City 1 Maths Support",
        chips: ["School support", "Class 10 to 12", "Homework rhythm", "Weekday home tuition"],
        stats: [
          { value: "School-led", label: "Maths support style" },
          { value: "Steady", label: "Homework follow-through" },
          { value: "Practical", label: "Weekday lesson fit" },
        ],
        supportPanel: {
          title: "South City 1 works well when the goal is steadier school maths rather than last-minute panic",
          text:
            "This page is useful for families who want chapter clarity, repeatable homework routines, and more organised board-year preparation across regular school weeks.",
          bullets: [
            "Useful for Class 10 and 12 board rhythm",
            "Strong fit for homework and chapter-test follow-through",
            "Best next step is still the exact class or board page that matches the student's pressure",
          ],
        },
      },
      supportPoints: {
        badge: "Why South City 1",
        title: "What families usually compare on this South City 1 maths page",
        subtitle:
          "The most useful choice here is usually between general school support, Class 10 board preparation, and the more structured senior-school routine some students need.",
        points: [
          supportPoint(
            "School support should feel practical",
            "South City 1 families often want tutoring that helps with homework, chapter tests, and notebook discipline without creating another stressful routine.",
          ),
          supportPoint(
            "Board years need calmer structure",
            "For Class 10 and Class 12 maths, progress usually comes from a more repeatable revision sequence and clearer correction, not just more worksheets.",
          ),
          supportPoint(
            "A useful neighbourhood route for regular lessons",
            "This page works well for families who care about weekday convenience and want a more grounded maths-home-tuition option in central Gurugram.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "south-city-1-next-pages",
          badge: "Useful Next Pages",
          title: "Pages South City 1 families often open next",
          subtitle:
            "These pages help families keep the neighbourhood choice useful by moving quickly into the right class or board route.",
          cards: southCity1BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to South City 1, Gurugram",
        subtitle:
          "These tutor cards are most useful when the family wants regular school support with steadier homework and revision structure.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories South City 1 families often relate to",
        subtitle:
          "These outcomes stay close to school support, board rhythm, and the kinds of improvements families usually want before exam season tightens.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides South City 1 families often read next",
        subtitle:
          "These guides stay close to Class 10 and 12 routines, board readiness, and practical revision structure.",
      },
      faqs: [
        faqItem(
          "Why is South City 1 useful for maths home tuition in Gurugram?",
          "Because it suits families who want regular school support, organised homework follow-through, and a calmer board-year maths routine close to home.",
        ),
        faqItem(
          "Is South City 1 mainly for Class 10 and 12 maths support?",
          "Those classes are a strong fit, but the page is also useful for younger students who need better school consistency and clearer chapter understanding.",
        ),
        faqItem(
          "What should families open next from South City 1?",
          "Usually the next step is the CBSE page or the Class 10 or Class 12 route, depending on whether board rhythm or class-specific pressure matters more right now.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for South City 1",
        description:
          "Share the class, school, and the chapters or tests causing the most friction. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a South City 1 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-sushant-lok-1-service",
    slug: "sushant-lok-1",
    routePath: "/gurugram/sushant-lok-1",
    pageType: "service",
    title: "Sushant Lok 1 maths home tuition",
    h1: "Maths home tutor in Sushant Lok 1, Gurugram for central location convenience and class-wise support",
    intro:
      "Use this Sushant Lok 1 page when the family wants a central Gurugram maths route that feels practical for regular lessons, school support, and clearer class-wise decision-making.",
    relatedTutorQuery: {
      kind: "locality-cluster",
      localityLabels: ["Sector 45", "Sector 52", "Sector 57"],
      schoolTokens: ["DPS Sushant Lok", "The Shri Ram School", "Amity International School"],
      tokens: ["CBSE", "Foundation", "Class 10", "Online"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["CBSE", "Class 10", "Board Prep", "Revision"],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "locality-cluster",
      localitySlugs: ["sector-46"],
      tokens: ["CBSE", "Class 7", "Class 10"],
      limit: 3,
    },
    seoTitle: "Maths Home Tutor in Sushant Lok 1 Gurugram | Class-wise and School Support",
    seoDescription:
      "Find maths home tuition in Sushant Lok 1 Gurugram for school support, class-wise maths help, and flexible lesson planning in central Gurugram.",
    canonicalUrl: "/gurugram/sushant-lok-1",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Sushant Lok 1" },
    ],
    sections: {
      hero: {
        badge: "Sushant Lok 1 Maths Support",
        chips: ["Central Gurugram", "School support", "Class-wise help", "Flexible lesson planning"],
        stats: [
          { value: "Central", label: "Neighbourhood convenience" },
          { value: "Mixed", label: "Class-level demand" },
          { value: "Useful", label: "Home or online flexibility" },
        ],
        supportPanel: {
          title: "Sushant Lok 1 works well when the family wants regular maths support without overcomplicating logistics",
          text:
            "This page is useful for parents who want clearer class-wise direction, school-support consistency, and a tutoring plan that stays realistic across busy weeks.",
          bullets: [
            "Useful for central Gurugram families who value convenience",
            "Works for class-wise maths support and regular school follow-through",
            "Can still point into online support when flexibility matters more",
          ],
        },
      },
      supportPoints: {
        badge: "Why Sushant Lok 1",
        title: "What families usually compare on this Sushant Lok 1 maths page",
        subtitle:
          "The most useful decision here is usually about whether the student needs a steadier school-support rhythm, clearer class-wise shortlisting, or more flexible online continuity.",
        points: [
          supportPoint(
            "Central-location convenience helps regularity",
            "Families in Sushant Lok 1 often want a maths plan that feels easy to continue every week instead of one that looks strong only on paper.",
          ),
          supportPoint(
            "Class-wise direction matters",
            "This page is useful when parents know the student needs help, but still want to decide whether the better next route is Class 10, school support, or a broader board page.",
          ),
          supportPoint(
            "Useful bridge into flexible tutoring formats",
            "When schedules become less predictable, Sushant Lok 1 families often compare home tuition with a more flexible online rhythm rather than forcing one format every week.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "sushant-lok-1-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Sushant Lok 1 families often open next",
          subtitle:
            "Choose the class, board, or format route that matches the student's maths need most closely.",
          cards: sushantLok1BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to Sushant Lok 1, Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants a practical, central Gurugram option with clear class-wise or school-support fit.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories Sushant Lok 1 families often relate to",
        subtitle:
          "These outcomes stay close to school support, class-wise improvement, and the steady progress families often want from regular tutoring.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Sushant Lok 1 families often read next",
        subtitle:
          "These guides stay close to class-wise improvement, board rhythm, and the practical revision questions that often come up first.",
      },
      faqs: [
        faqItem(
          "Why is Sushant Lok 1 useful for maths home tuition in Gurugram?",
          "Because it gives central Gurugram families a practical route into regular maths support, clearer class-wise direction, and flexible lesson planning.",
        ),
        faqItem(
          "Is this page more about school support than one specific board?",
          "Mostly yes. The page is useful when the family wants central-location convenience first, then needs help choosing the board, class, or format route that fits best.",
        ),
        faqItem(
          "What page should families open next from Sushant Lok 1?",
          "Usually the next step is the Class 10 page, the CBSE route, or the online maths page if flexibility is already the bigger priority.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Sushant Lok 1",
        description:
          "Share the class, school, and whether the family prefers home tuition only or some online flexibility. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Sushant Lok 1 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-class-10-service",
    slug: "class-10-maths-home-tutor",
    routePath: "/gurugram/class-10-maths-home-tutor",
    pageType: "service",
    title: "Class 10 maths home tuition in Gurugram",
    h1: "Class 10 maths home tutor in Gurugram for school tests, board readiness, and chapter clarity",
    intro:
      "Use this Class 10 page when the student needs chapter-by-chapter maths support, steadier worksheets, cleaner written practice, and a calmer route into board-style revision.",
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["Class 10", "CBSE", "ICSE", "IGCSE", "Board"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["Class 10", "CBSE", "ICSE", "IGCSE", "Board Prep"],
      limit: 4,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      tokens: ["Class 10", "CBSE", "ICSE", "IGCSE"],
      limit: 3,
    },
    seoTitle: "Class 10 Maths Home Tutor in Gurugram | Board Readiness and Chapter Clarity",
    seoDescription:
      "Find Class 10 maths home tuition in Gurugram for school tests, chapter clarity, worksheets, and steadier board-style revision support.",
    canonicalUrl: "/gurugram/class-10-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Class 10 Maths Home Tutor" },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: "Class 10 Maths Support",
        chips: ["School tests", "Board readiness", "Chapter clarity", "Worksheet follow-through"],
        stats: [
          { value: "Class 10", label: "Focused support route" },
          { value: "Steadier", label: "Board-style revision" },
          { value: "Clearer", label: "Written maths routine" },
        ],
        supportPanel: {
          title: "Class 10 maths improves fastest when the student gets structure, not panic",
          text:
            "This page is built for families who want stronger chapter clarity, better worksheet follow-through, and board-style practice that stays calm enough to repeat every week.",
          bullets: [
            "Useful for school tests and board build-up together",
            "Works well when algebra, geometry, or revision rhythm feels unstable",
            "The best next page is often the board route that matches the student",
          ],
        },
      },
      supportPoints: {
        badge: "Why This Page",
        title: "What Class 10 families usually want from maths home tuition in Gurugram",
        subtitle:
          "The most useful tutoring plan at this stage usually combines chapter clarity, repeatable board-style revision, and enough correction to keep careless errors under control.",
        points: [
          supportPoint(
            "School tests should feed into board preparation",
            "When Class 10 tutoring is working properly, chapter tests, homework, and board-style written practice stop feeling like separate problems.",
          ),
          supportPoint(
            "Chapter clarity matters more than rushing ahead",
            "Students often need algebra, geometry, and mensuration to feel cleaner before faster revision plans actually help.",
          ),
          supportPoint(
            "Worksheets only help when correction is consistent",
            "Most Class 10 maths improvement comes from better written correction and a steadier revision rhythm, not just from doing more sheets.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "class10-next-pages",
          badge: "Useful Next Pages",
          title: "Board pages Class 10 families often open next",
          subtitle:
            "These pages help families keep the class-specific view useful by moving quickly into the board route that matches the student's school and paper style.",
          cards: class10BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to Class 10 learners in Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants stronger chapter clarity, board readiness, and more reliable worksheet follow-through.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories Class 10 families often relate to",
        subtitle:
          "These outcomes stay close to board-style revision, chapter confidence, and the school-test gains families usually want to see first.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Class 10 families often read next",
        subtitle:
          "These guides stay close to board routine, written method, and the practical revision questions that usually matter most in Class 10.",
      },
      faqs: [
        faqItem(
          "What usually matters most for Class 10 maths home tuition in Gurugram?",
          "Usually it is chapter clarity, steadier worksheet correction, and a board-style revision rhythm that the student can actually maintain week after week.",
        ),
        faqItem(
          "Should Class 10 families choose the board page after this?",
          "Yes, if the school board is already clear. The class page helps with immediate academic intent, while the board page helps the family narrow the tutoring style more precisely.",
        ),
        faqItem(
          "Is this page only for board-year panic support?",
          "No. It is designed to be useful earlier too, especially when school tests, homework, or chapter-level gaps already show that the student needs clearer structure.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Class 10",
        description:
          "Share the board, weakest chapters, and whether school tests or board-style revision feels more urgent. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Class 10 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-class-12-service",
    slug: "class-12-maths-home-tutor",
    routePath: "/gurugram/class-12-maths-home-tutor",
    pageType: "service",
    title: "Class 12 maths home tuition in Gurugram",
    h1: "Class 12 maths home tutor in Gurugram for senior-school support, exam structure, and steadier problem solving",
    intro:
      "Use this Class 12 page when the student needs stronger chapter planning, more dependable problem-solving support, and a calmer weekly maths structure across school, boards, and higher-intensity preparation.",
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["Class 12", "CBSE", "IB", "ISC", "JEE", "Calculus"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["Class 12", "CBSE", "IB", "JEE", "Revision"],
      limit: 4,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      tokens: ["Class 12", "IB", "JEE", "CBSE"],
      limit: 3,
    },
    seoTitle: "Class 12 Maths Home Tutor in Gurugram | Senior School and Exam Structure Support",
    seoDescription:
      "Find Class 12 maths home tuition in Gurugram for senior-school support, chapter planning, exam structure, and steadier problem-solving routines.",
    canonicalUrl: "/gurugram/class-12-maths-home-tutor",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Class 12 Maths Home Tutor" },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: "Class 12 Maths Support",
        chips: ["Senior school", "Exam structure", "Problem solving", "Board and JEE overlap"],
        stats: [
          { value: "Class 12", label: "Senior-school focus" },
          { value: "Structured", label: "Weekly problem-solving flow" },
          { value: "Calmer", label: "Exam-season support" },
        ],
        supportPanel: {
          title: "Class 12 maths needs consistency, structure, and better question handling more than last-minute intensity",
          text:
            "This page is built for families who want a tutoring plan that helps the student handle chapter load, problem solving, and exam pressure with more repeatable structure.",
          bullets: [
            "Useful for senior-school maths that feels scattered or heavy",
            "Works when board support and problem solving both matter",
            "The right next page is often CBSE, IB, or JEE depending on the student's route",
          ],
        },
      },
      supportPoints: {
        badge: "Why This Page",
        title: "What Class 12 families usually want from maths home tuition in Gurugram",
        subtitle:
          "The most useful support at this stage usually comes from better chapter planning, cleaner problem-solving habits, and an exam structure the student can trust.",
        points: [
          supportPoint(
            "Senior-school maths needs stronger weekly structure",
            "Class 12 students usually benefit when calculus, algebra, and application-heavy chapters are scheduled and reviewed more intentionally instead of being handled in bursts.",
          ),
          supportPoint(
            "Problem solving improves when correction is specific",
            "Students often need detailed review on question choice, written method, and where they lose marks under time pressure.",
          ),
          supportPoint(
            "Useful even when boards and higher-intensity prep overlap",
            "Many Gurugram families need Class 12 maths support that helps with school outcomes while still respecting competitive or advanced problem-solving goals.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "class12-next-pages",
          badge: "Useful Next Pages",
          title: "Pages Class 12 families often open next",
          subtitle:
            "Choose the board or exam route that best matches the student's maths pressure.",
          cards: class12BoardCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors relevant to Class 12 learners in Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants senior-school support, steadier problem solving, and better exam structure.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories Class 12 families often relate to",
        subtitle:
          "These outcomes stay close to senior-school pressure, problem-solving discipline, and the steadier maths routines families often want before final exams.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides Class 12 families often read next",
        subtitle:
          "These guides stay close to revision pacing, board routine, and the higher-intensity maths questions that usually matter most in Class 12.",
      },
      faqs: [
        faqItem(
          "What usually matters most for Class 12 maths home tuition in Gurugram?",
          "Usually it is chapter planning, better problem-solving structure, and enough correction to make exam performance more dependable under pressure.",
        ),
        faqItem(
          "Should Class 12 families open the board or exam page after this?",
          "Yes. This page helps with class-specific intent first, but the best next step is usually the CBSE, IB, or JEE page that matches the student's actual route.",
        ),
        faqItem(
          "Is this page useful even if the student is not in panic mode yet?",
          "Yes. It is often more useful before panic starts, especially when the student already needs better chapter sequencing and a steadier weekly maths rhythm.",
        ),
      ],
      cta: {
        title: "Start the right maths conversation for Class 12",
        description:
          "Share the board, target chapters, and whether board structure or problem-solving pressure feels more urgent. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a Class 12 maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Gurugram hub",
          to: "/gurugram",
        },
      },
    },
  }),
  createPublishedGurugramEntryConfig({
    id: "gurugram-online-maths-service",
    slug: "online-maths-tuition",
    routePath: "/gurugram/online-maths-tuition",
    pageType: "service",
    title: "Online maths tuition in Gurugram",
    h1: "Online maths tuition in Gurugram for flexible scheduling, structured notes, and steady revision support",
    intro:
      "Use this online maths tuition page when the family wants Gurugram-focused maths support with flexible lesson timing, a cleaner revision rhythm, and continuity across busy school weeks or travel-heavy schedules.",
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens: ["Online"],
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: ["Revision", "Maths Strategy", "Board Prep", "Method Marks", "Speed and Accuracy"],
      limit: 4,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      tokens: ["CBSE", "IB", "IGCSE", "JEE"],
      limit: 3,
    },
    seoTitle: "Online Maths Tuition in Gurugram | Flexible Structured Maths Support",
    seoDescription:
      "Explore online maths tuition in Gurugram for flexible scheduling, structured notes, revision continuity, and board-aware support across classes.",
    canonicalUrl: "/gurugram/online-maths-tuition",
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Gurugram", to: "/gurugram" },
      { label: "Online Maths Tuition" },
    ],
    schemaType: "Service",
    sections: {
      hero: {
        badge: "Online Maths Support",
        chips: ["Online lessons", "Flexible timing", "Structured notes", "Gurugram students"],
        stats: [
          { value: "Flexible", label: "Lesson scheduling" },
          { value: "Consistent", label: "Revision continuity" },
          { value: "Board-aware", label: "Maths support fit" },
        ],
        supportPanel: {
          title: "Online maths tuition should feel structured and dependable, not like a weaker backup option",
          text:
            "This page is useful for families who want online support with clear notes, regular review, and a maths routine that still feels personal and board-aware.",
          bullets: [
            "Useful when schedules shift across school weeks",
            "Works well for revision continuity and regular doubt clearing",
            "The best next page is often the board route that matches the student",
          ],
        },
      },
      supportPoints: {
        badge: "Why Online Support",
        title: "What families usually compare on this online maths tuition page",
        subtitle:
          "The most useful decision here is usually whether the student needs flexibility, continuity, or a cleaner revision rhythm without losing one-to-one attention.",
        points: [
          supportPoint(
            "Flexible timing can protect consistency",
            "Online maths lessons are often most useful when the student would otherwise miss momentum because of travel, school load, or changing weekly schedules.",
          ),
          supportPoint(
            "Structured notes and review matter more online",
            "The strongest online tutoring plans usually keep revision clear with shared notes, repeatable homework follow-through, and better doubt tracking.",
          ),
          supportPoint(
            "Still works best when the academic route is specific",
            "Online support becomes more useful when the family still chooses the right board, class, or exam page instead of treating online format as the whole decision.",
          ),
        ],
      },
      routeGroups: [
        {
          id: "online-maths-next-pages",
          badge: "Useful Next Pages",
          title: "Pages families often open next from online maths tuition",
          subtitle:
            "These pages help families keep online support academically specific by linking back to the right Gurugram board and city routes.",
          cards: onlineMathsRouteCards,
        },
      ],
      featuredTutors: {
        badge: "Featured Tutors",
        title: "Maths tutors who also support online lessons in Gurugram",
        subtitle:
          "These tutor cards are useful when the family wants flexible scheduling without losing structure, revision continuity, or board awareness.",
      },
      studentResults: {
        badge: "Student Results",
        title: "Maths progress stories families often relate to when choosing online support",
        subtitle:
          "These outcomes stay close to the kinds of board and exam gains that still depend on regular structure, even when the lessons happen online.",
      },
      relatedBlogs: {
        badge: "Related Blogs",
        title: "Maths guides families often read next from online support",
        subtitle:
          "These guides stay close to revision strategy, method clarity, and the routines that usually make online maths tuition work better.",
      },
      faqs: [
        faqItem(
          "When is online maths tuition in Gurugram a good choice?",
          "It is usually a good fit when the student needs flexible scheduling, steady doubt clearing, and better revision continuity across busy school weeks.",
        ),
        faqItem(
          "Can online maths tuition still be board-specific?",
          "Yes. Online support works best when the board, class, or exam route is still clear, so the tutoring style stays specific instead of generic.",
        ),
        faqItem(
          "What page should families open next from online maths tuition?",
          "Usually the next step is the board page that matches the student's maths path, or the Gurugram hub if the family still wants to compare online support with locality-based home tuition.",
        ),
      ],
      cta: {
        title: "Start the right online maths conversation in Gurugram",
        description:
          "Share the board, class, and the time windows that actually work for the student. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book an online maths demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: "Back to Home",
          to: "/",
        },
      },
    },
  }),
];

const cityGurugramLocalityFallbackConfigs = [
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-43",
    label: "Sector 43",
    context:
      "Sector 43 is useful for families comparing central Gurugram access, Golf Course Road proximity, and a steadier weekly maths routine.",
    chips: ["Central Gurugram", "Golf Course Road access", "Board support", "Home tuition"],
    nearbyRoutes: [
      { slug: "dlf-phase-4", label: "DLF Phase 4" },
      { slug: "sector-54", label: "Sector 54" },
      { slug: "golf-course-road", label: "Golf Course Road" },
    ],
    tokens: ["Sector 43", "DLF Phase 4", "Golf Course Road"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-46",
    label: "Sector 46",
    context:
      "Sector 46 is a practical school-support pocket for families who want regular chapter follow-through, board readiness, and manageable weekday timing.",
    chips: ["School support", "Board readiness", "Weekday routine", "Home tuition"],
    nearbyRoutes: [
      { slug: "sector-50", label: "Sector 50" },
      { slug: "sohna-road", label: "Sohna Road" },
      { slug: "sector-57", label: "Sector 57" },
    ],
    tokens: ["Sector 46", "CBSE", "Board Prep"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-50",
    label: "Sector 50",
    context:
      "Sector 50 works well for families comparing school pace, Sohna Road access, and maths support that can stay consistent across busy weeks.",
    chips: ["Sohna Road access", "School tests", "Board support", "Flexible timing"],
    nearbyRoutes: [
      { slug: "sector-46", label: "Sector 46" },
      { slug: "sohna-road", label: "Sohna Road" },
      { slug: "sector-57", label: "Sector 57" },
    ],
    tokens: ["Sector 50", "Sohna Road", "CBSE"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-54",
    label: "Sector 54",
    context:
      "Sector 54 is useful for premium-school and Golf Course Road families who need board-aware maths support with locality convenience.",
    chips: ["Golf Course Road", "Premium schools", "IB", "IGCSE"],
    nearbyRoutes: [
      { slug: "golf-course-road", label: "Golf Course Road" },
      { slug: "sector-56", label: "Sector 56" },
      { slug: "dlf-phase-5", label: "DLF Phase 5" },
    ],
    tokens: ["Sector 54", "IB", "IGCSE"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-56",
    label: "Sector 56",
    context:
      "Sector 56 is a high-intent Gurugram locality for families comparing IB, IGCSE, CBSE, and senior-school maths support.",
    chips: ["Mixed board demand", "Premium locality", "Senior classes", "Home tuition"],
    nearbyRoutes: [
      { slug: "sector-57", label: "Sector 57" },
      { slug: "sector-54", label: "Sector 54" },
      { slug: "golf-course-road", label: "Golf Course Road" },
    ],
    tokens: ["Sector 56", "IB", "IGCSE", "CBSE"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sector-57",
    label: "Sector 57",
    context:
      "Sector 57 is useful for families who want school maths support, board follow-through, and calmer revision without stretching travel time.",
    chips: ["School support", "Board follow-through", "Revision", "Local access"],
    nearbyRoutes: [
      { slug: "sector-56", label: "Sector 56" },
      { slug: "sector-50", label: "Sector 50" },
      { slug: "sohna-road", label: "Sohna Road" },
    ],
    tokens: ["Sector 57", "CBSE", "Revision"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "golf-course-road",
    label: "Golf Course Road",
    context:
      "Golf Course Road is useful when families want a corridor-level view before narrowing to one sector, school route, or tutor fit.",
    chips: ["Premium corridor", "Sector 54", "Sector 56", "IB and IGCSE"],
    nearbyRoutes: [
      { slug: "sector-54", label: "Sector 54" },
      { slug: "sector-56", label: "Sector 56" },
      { slug: "dlf-phase-5", label: "DLF Phase 5" },
    ],
    tokens: ["Golf Course Road", "IB", "IGCSE", "Premium"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sohna-road",
    label: "Sohna Road",
    context:
      "Sohna Road helps families compare senior-class pressure, school support, and practical home-tuition logistics across the corridor.",
    chips: ["Sohna Road", "Senior classes", "Board support", "Flexible timing"],
    nearbyRoutes: [
      { slug: "sector-50", label: "Sector 50" },
      { slug: "sector-46", label: "Sector 46" },
      { slug: "sector-57", label: "Sector 57" },
    ],
    tokens: ["Sohna Road", "Class 10", "Class 12", "JEE"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "dlf-phase-4",
    label: "DLF Phase 4",
    context:
      "DLF Phase 4 is useful for central premium-corridor families who want locality convenience with board-specific maths support.",
    chips: ["Central Gurugram", "Premium corridor", "Board support", "Home tuition"],
    nearbyRoutes: [
      { slug: "sector-43", label: "Sector 43" },
      { slug: "sushant-lok-1", label: "Sushant Lok 1" },
      { slug: "golf-course-road", label: "Golf Course Road" },
    ],
    tokens: ["DLF Phase 4", "Sector 43", "Premium"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "dlf-phase-5",
    label: "DLF Phase 5",
    context:
      "DLF Phase 5 is useful for premium-corridor families who want maths support close to Golf Course Road and nearby school clusters.",
    chips: ["Premium corridor", "Golf Course Road", "IB", "IGCSE"],
    nearbyRoutes: [
      { slug: "sector-54", label: "Sector 54" },
      { slug: "golf-course-road", label: "Golf Course Road" },
      { slug: "sector-56", label: "Sector 56" },
    ],
    tokens: ["DLF Phase 5", "Golf Course Road", "IB", "IGCSE"],
  }),
  createCityGurugramLocalityFallbackConfig({
    slug: "sushant-lok-1",
    label: "Sushant Lok 1",
    context:
      "Sushant Lok 1 is useful for central Gurugram families who need locality convenience, class-wise support, and a steady weekly maths routine.",
    chips: ["Central Gurugram", "Class-wise support", "School tests", "Home tuition"],
    nearbyRoutes: [
      { slug: "dlf-phase-4", label: "DLF Phase 4" },
      { slug: "sector-43", label: "Sector 43" },
      { slug: "golf-course-road", label: "Golf Course Road" },
    ],
    tokens: ["Sushant Lok 1", "Class 10", "CBSE"],
  }),
];

const seoRecoveryLocalityBoardConfigs = recoveryLocalityBoardPages.map((page) =>
  createRecoveryLocalityBoardConfig(page),
);

const batchALocalityConfigs = batchALocalityPages.map((page) =>
  createBatchALocalityConfig(page),
);

const batchELocalityConfigs = batchERootSeoPages.map((page) =>
  createBatchEConfig(page),
);

export const gurugramPublicEntryConfigs = [
  ...batchOneGurugramEntryConfigs,
  ...batchTwoGurugramEntryConfigs,
  ...batchALocalityConfigs,
  ...batchELocalityConfigs,
  ...seoRecoveryLocalityBoardConfigs,
  ...cityGurugramLocalityFallbackConfigs,
];

export const PAGE_ROUTE_SUPPORT = [
  {
    id: "board-pages",
    pageType: "board",
    routePath: "/subjects/maths/:boardSlug",
    routePatterns: [
      "/subjects/maths/:boardSlug",
      "/subjects/maths/:boardSlug/:stageSlug",
      "/subjects/maths/:boardSlug/:stageSlug/:trackSlug",
    ],
    template: "BoardPageTemplate",
  },
  {
    id: "class-pages",
    pageType: "class",
    routePath: "/maths/class/:classSlug",
    template: "ClassPageTemplate",
  },
  {
    id: "exam-pages",
    pageType: "exam",
    routePath: "/maths/exam/:examSlug",
    template: "ExamPageTemplate",
  },
  {
    id: "city-pages",
    pageType: "city",
    routePath: "/city/:citySlug",
    template: "CityPageTemplate",
  },
  {
    id: "sector-pages",
    pageType: "sector",
    routePath: "/city/:citySlug/:sectorSlug",
    template: "SectorPageTemplate",
  },
  {
    id: "gurugram-hub-page",
    pageType: "city",
    routePath: "/gurugram",
    template: "GenericPageTemplate",
  },
  {
    id: "gurugram-batch-pages",
    pageType: "service",
    routePath: "/gurugram/:entrySlug",
    template: "GenericPageTemplate",
  },
];
