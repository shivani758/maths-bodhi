// Legacy data for the unused SeoLandingPage component. Active SEO routes are
// managed by pageSystem/config/p1SeoPageConfigs.js and staticPageConfigs.js.
function link(label, to, description, tags = []) {
  return { label, to, description, tags };
}

function point(title, description) {
  return { title, description };
}

function faq(question, answer) {
  return { question, answer };
}

function excelSource({
  id,
  segment = "Core Service",
  pageType = "Service Page",
  audience = "Parents + Students",
  cluster,
  parentHubPath,
  primaryKeyword,
}) {
  return {
    id,
    segment,
    pageType,
    audience,
    cluster,
    parentHubPath,
    primaryKeyword,
    priority: "P1",
  };
}

const demoLink = link(
  "Book Free Demo Class",
  "/book-free-demo-class",
  "Share the class, board, topic need, sector, and preferred mode before the first tutor conversation.",
  ["Demo", "Lead"],
);

const cityLink = link(
  "Gurugram City Page",
  "/city/gurugram",
  "Browse city-level maths tutor support, sectors, boards, and tutor matches.",
  ["Gurugram", "Sectors"],
);

const sector56Link = link(
  "Sector 56 Maths Tutors",
  "/city/gurugram/sector-56",
  "Open the Sector 56 route for locality-specific maths home tutor support.",
  ["Sector 56", "Locality"],
);

const mathsHomeLink = link(
  "Maths Home Tutor",
  "/maths-home-tutor",
  "Compare the main home tuition route before narrowing by class, board, mode, or sector.",
  ["Home Tuition", "Main Hub"],
);

const cbseTuitionLink = link(
  "CBSE Maths Tuition",
  "/cbse-maths-tuition",
  "Open the CBSE route for school pace, worksheets, tests, and board-year revision planning.",
  ["CBSE", "Board"],
);

const class10Link = link(
  "Class 10 Maths Tutor",
  "/class-10-maths-tutor",
  "Shortlist support for board-style practice, chapter repair, and revision discipline.",
  ["Class 10", "Board Year"],
);

const class12Link = link(
  "Class 12 Maths Tutor",
  "/class-12-maths-tutor",
  "Use this route for senior-school maths support, calculus practice, and exam structure.",
  ["Class 12", "Senior School"],
);

const onlineLink = link(
  "Online Maths Home Tuition",
  "/online-maths-home-tuition",
  "Use this when live online maths support is easier than a home visit.",
  ["Online", "Flexible"],
);

const oneToOneLink = link(
  "One to One Maths Tuition",
  "/one-to-one-maths-tuition",
  "Compare one-to-one support when the student needs individual pace and topic repair.",
  ["One-to-one", "Personal"],
);

const foundationLink = link(
  "Maths Foundation Program",
  "/maths-foundation-program",
  "Build school maths basics, confidence, and problem-solving habits before higher pressure years.",
  ["Foundation", "School Maths"],
);

const revisionLink = link(
  "Maths Revision Program",
  "/maths-revision-program",
  "Plan topic repair, worksheets, and exam-style revision for the next school or board milestone.",
  ["Revision", "Practice"],
);

const premiumSchoolLink = link(
  "Premium School Maths Home Tutor",
  "/premium-school-maths-home-tutor",
  "Compare premium-school-aware maths support for Gurugram families.",
  ["Premium Schools", "Gurugram"],
);

const jeeLink = link(
  "JEE Maths Coaching",
  "/jee-maths-coaching",
  "Open the JEE maths route for Main and Advanced problem-solving support.",
  ["JEE", "Entrance"],
);

const seoLandingPageList = [
  {
    key: "book-free-demo-class",
    path: "/book-free-demo-class",
    badge: "Demo Class",
    h1: "Book Free Demo Class for Maths Tuition",
    intro:
      "Use this page to start a practical maths tutor conversation with Maths Bodhi. Share the student's class, board, Gurugram sector, topic need, and preferred mode before moving to the demo form or WhatsApp.",
    seoTitle: "Book Free Demo Class | Maths Bodhi",
    seoDescription:
      "Book a free maths demo class for Gurugram students across CBSE, IB, IGCSE, JEE, Class 10, Class 12, home tuition, and online support.",
    keywords: ["book free demo class maths tutor", "maths demo class", "book maths tutor demo"],
    chips: ["Free Demo", "WhatsApp", "Gurugram", "Tutor Matching"],
    primaryCtaTo: "/book-demo",
    source: excelSource({
      id: "4",
      pageType: "Lead Gen Page",
      audience: "Parents + Students",
      cluster: "Lead Generation",
      parentHubPath: "/",
      primaryKeyword: "book free demo class maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      limit: 6,
    },
    supportPoints: [
      point(
        "Start with the details that affect tutor fit",
        "The first enquiry should include class level, board, sector, current topics, preferred lesson mode, and school timeline.",
      ),
      point(
        "Move quickly into WhatsApp follow-up",
        "The demo flow is designed for a clear operational handoff, so families do not need to repeat the same context twice.",
      ),
      point(
        "Use the right commercial route next",
        "Parents can move from the demo page into home tuition, CBSE, JEE, online, foundation, or revision support depending on the student's need.",
      ),
    ],
    internalLinks: [mathsHomeLink, cbseTuitionLink, jeeLink, class10Link, cityLink],
    faqs: [
      faq(
        "What should I share before booking a free maths demo class?",
        "Share the student's class, board, school, current chapters, Gurugram sector, preferred mode, and any exam timeline so the next conversation is useful.",
      ),
      faq(
        "Is the demo route for home tuition and online maths tuition?",
        "Yes. Families can ask for home tuition, online support, or a flexible mix depending on timing and tutor availability.",
      ),
    ],
  },
  {
    key: "maths-home-tutor",
    path: "/maths-home-tutor",
    badge: "Maths Home Tuition",
    h1: "Maths Home Tutor in Gurugram",
    intro:
      "Find one-to-one maths home tutor support in Gurugram by class, board, locality, and teaching mode. Tutor matches below are pulled only from published Maths Bodhi profiles.",
    seoTitle: "Maths Home Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find maths home tutors in Gurugram for CBSE, ICSE, IGCSE, IB, JEE, Class 10, and Class 12 with real tutor profiles and demo booking.",
    keywords: ["maths home tutor", "maths tutor in gurugram", "maths home tuition"],
    chips: ["Home Tuition", "Gurugram", "Class 6 to 12", "CBSE IB IGCSE"],
    source: excelSource({
      id: "9",
      cluster: "Home Tuition",
      parentHubPath: "/",
      primaryKeyword: "maths home tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      modes: ["Home Tuition"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Start with tutor fit, not a generic list",
        "Families can compare board coverage, class fit, sectors, lesson mode, and profile details before booking the next step.",
      ),
      point(
        "Keep locality practical",
        "Gurugram searches usually depend on school timing, sector access, and whether the learner needs home, online, or mixed support.",
      ),
      point(
        "Move into a clear demo flow",
        "The page keeps Book Free Demo and WhatsApp actions visible so the first conversation can include class, board, topic need, and location.",
      ),
    ],
    internalLinks: [demoLink, onlineLink, cbseTuitionLink, class10Link, class12Link, cityLink, sector56Link],
    faqs: [
      faq(
        "Does this page show only real tutor profiles?",
        "Yes. Tutor cards are rendered from published Maths Bodhi tutor data. If no matching tutor is available, the page shows a fallback instead of sample tutor content.",
      ),
      faq(
        "Can families ask for a specific Gurugram sector?",
        "Yes. Families can open the city or sector route, or share the preferred locality in the Book Free Demo or WhatsApp enquiry.",
      ),
    ],
  },
  {
    key: "online-maths-home-tuition",
    path: "/online-maths-home-tuition",
    badge: "Online Maths Tuition",
    h1: "Online Maths Home Tuition for Gurugram Students",
    intro:
      "Use this page when the student needs live online maths support with board-aware planning, regular doubt solving, and a practical demo path.",
    seoTitle: "Online Maths Home Tuition | Maths Bodhi Gurugram",
    seoDescription:
      "Find online maths home tuition for Gurugram students with real Maths Bodhi tutor profiles, class and board links, demo booking, and WhatsApp enquiry.",
    keywords: ["online maths home tuition", "online maths tutor", "online maths tuition gurugram"],
    chips: ["Online", "One-to-one", "Board Support", "Gurugram"],
    source: excelSource({
      id: "10",
      cluster: "Online Tuition",
      parentHubPath: "/maths-home-tutor",
      primaryKeyword: "online maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      modes: ["Online"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Useful when travel is the constraint",
        "Online support keeps the lesson plan moving when school schedules, sector distance, or exam-week timing make home visits harder.",
      ),
      point(
        "Still grounded in board and class needs",
        "The tutor shortlist should still reflect CBSE, IB, IGCSE, JEE, Class 10, or Class 12 needs rather than only the lesson format.",
      ),
      point(
        "Easy to switch into a demo conversation",
        "Parents can share the class, board, preferred online timing, and current maths topics before confirming the next step.",
      ),
    ],
    internalLinks: [demoLink, mathsHomeLink, cbseTuitionLink, class12Link, foundationLink, cityLink],
    faqs: [
      faq(
        "Is online tuition separate from home tutor matching?",
        "It is a support format inside the same tutor-matching flow. The tutor still needs to fit the student's board, class level, and current maths pressure.",
      ),
      faq(
        "What if no online tutor is listed right now?",
        "The page will show a fallback instead of sample profiles. Families can still use Book Free Demo or WhatsApp to check current availability.",
      ),
    ],
  },
  {
    key: "one-to-one-maths-tuition",
    path: "/one-to-one-maths-tuition",
    badge: "One-to-one Support",
    h1: "One to One Maths Tuition in Gurugram",
    intro:
      "Use this page when a student needs personal maths attention, quieter doubt-solving, and weekly practice built around their class, board, and topic gaps.",
    seoTitle: "One to One Maths Tuition in Gurugram | Maths Bodhi",
    seoDescription:
      "Find one to one maths tuition in Gurugram with real tutor profiles, demo booking, WhatsApp enquiry, and links to home, online, CBSE, and JEE support.",
    keywords: ["one to one maths tuition", "personal maths tutor", "maths tutor gurugram"],
    chips: ["One-to-one", "Personalised", "Doubt Solving", "Gurugram"],
    source: excelSource({
      id: "11",
      cluster: "Format",
      parentHubPath: "/maths-home-tutor",
      primaryKeyword: "one to one maths tuition",
    }),
    tutorQuery: {
      city: "gurugram",
      tokens: ["one", "home", "online"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Personal pace for the current student",
        "One-to-one support works well when the learner needs more time for explanation, correction, and confidence rebuilding.",
      ),
      point(
        "Better fit for topic-specific gaps",
        "The tutor can focus on algebra, geometry, calculus, statistics, or school worksheets without waiting for a group schedule.",
      ),
      point(
        "Useful for both home and online formats",
        "Families can keep the support personal whether the lesson happens at home, online, or in a flexible mix.",
      ),
    ],
    internalLinks: [demoLink, mathsHomeLink, onlineLink, premiumSchoolLink, cbseTuitionLink, cityLink],
    faqs: [
      faq(
        "Who should choose one to one maths tuition?",
        "It is useful for students who need individual attention, clearer doubt-solving, or a support plan matched to their class and board.",
      ),
      faq(
        "Can one-to-one tuition be online?",
        "Yes. Maths Bodhi can discuss home tuition, online sessions, or a mix depending on tutor availability and family timing.",
      ),
    ],
  },
  {
    key: "maths-foundation-program",
    path: "/maths-foundation-program",
    badge: "Foundation Program",
    h1: "Maths Foundation Program for School Students",
    intro:
      "Build stronger school maths fundamentals through concept repair, regular worksheets, and problem-solving habits before board pressure or entrance exam preparation begins.",
    seoTitle: "Maths Foundation Program | Maths Bodhi",
    seoDescription:
      "Build maths foundations for school students in Gurugram with concept repair, worksheets, real tutor profiles, demo booking, and WhatsApp support.",
    keywords: ["maths foundation course", "maths foundation program", "school maths foundation"],
    chips: ["Foundation", "Concept Repair", "Worksheets", "School Maths"],
    source: excelSource({
      id: "16",
      pageType: "Program Page",
      audience: "School Students",
      cluster: "Foundation",
      parentHubPath: "/",
      primaryKeyword: "maths foundation course",
    }),
    tutorQuery: {
      city: "gurugram",
      tokens: ["foundation", "school", "class", "algebra"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Repair concepts before they compound",
        "Foundation support helps students revisit number sense, algebra, geometry, measurement, and reasoning before gaps turn into exam pressure.",
      ),
      point(
        "Practice stays regular and visible",
        "Worksheets, error review, and short topic checks make progress easier for parents and students to follow.",
      ),
      point(
        "Good bridge into board-specific support",
        "Once basics become steadier, families can move into CBSE, Class 10, IGCSE, IB, or JEE-related routes when needed.",
      ),
    ],
    internalLinks: [demoLink, mathsHomeLink, onlineLink, cbseTuitionLink, class10Link, revisionLink, cityLink],
    faqs: [
      faq(
        "Which students need a maths foundation program?",
        "It is useful for students who understand parts of classwork but struggle with confidence, calculation habits, algebra basics, or written method.",
      ),
      faq(
        "Is this only for junior classes?",
        "No. Foundation repair can help middle-school and senior students when older gaps are affecting current chapters.",
      ),
    ],
  },
  {
    key: "maths-revision-program",
    path: "/maths-revision-program",
    badge: "Revision Program",
    h1: "Maths Revision Program for Exams and School Tests",
    intro:
      "Plan focused maths revision around weak chapters, school tests, board-style papers, and regular correction so the student knows what to practise next.",
    seoTitle: "Maths Revision Program | Maths Bodhi",
    seoDescription:
      "Plan maths revision for school tests and board exams with real tutor profiles, topic repair, worksheets, demo booking, and WhatsApp enquiry.",
    keywords: ["maths revision program", "maths revision classes", "maths exam revision"],
    chips: ["Revision", "Board Practice", "Worksheets", "Exam Planning"],
    source: excelSource({
      id: "20",
      pageType: "Program Page",
      audience: "Students",
      cluster: "Revision",
      parentHubPath: "/",
      primaryKeyword: "maths revision program",
    }),
    tutorQuery: {
      city: "gurugram",
      tokens: ["revision", "board", "exam", "practice"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Start with a chapter priority map",
        "Revision should identify which topics need concept repair, which need practice, and which need timed-paper discipline.",
      ),
      point(
        "Use correction as the main feedback loop",
        "A good revision plan reviews wrong steps, missing method, and repeated question types instead of only adding more worksheets.",
      ),
      point(
        "Keep board and class needs separate",
        "Class 10, Class 12, CBSE, IB, IGCSE, and JEE students need different practice pacing and review routines.",
      ),
    ],
    internalLinks: [demoLink, class10Link, class12Link, cbseTuitionLink, jeeLink, foundationLink, cityLink],
    faqs: [
      faq(
        "When should a student start a maths revision program?",
        "Start before school tests, pre-boards, mocks, or whenever weak chapters are slowing down regular classwork.",
      ),
      faq(
        "Can revision support be topic-specific?",
        "Yes. Families can request support around algebra, trigonometry, calculus, probability, geometry, or exam-paper correction.",
      ),
    ],
  },
  {
    key: "premium-school-maths-home-tutor",
    path: "/premium-school-maths-home-tutor",
    badge: "Premium Schools",
    h1: "Premium School Maths Home Tutor in Gurugram",
    intro:
      "For Gurugram families who want maths tutors familiar with premium-school pace, international curricula, demanding worksheets, and careful parent communication.",
    seoTitle: "Premium School Maths Home Tutor | Maths Bodhi",
    seoDescription:
      "Find premium school maths home tutors in Gurugram for IB, IGCSE, CBSE, and senior-school support with real tutor profiles and demo booking.",
    keywords: ["premium school maths tutor", "premium school maths home tutor", "gurugram maths tutor"],
    chips: ["Premium Schools", "IB", "IGCSE", "Gurugram"],
    source: excelSource({
      id: "21",
      audience: "Premium School Students",
      cluster: "Premium Schools",
      parentHubPath: "/",
      primaryKeyword: "premium school maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      tokens: ["ib", "igcse", "premium", "school"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Premium-school pace needs careful matching",
        "Families often need tutors who can keep up with school worksheets, international curricula, and higher expectations around written method.",
      ),
      point(
        "Board fit remains the real filter",
        "IB, IGCSE, CBSE, and ISC students may be in similar localities but need different explanations, pacing, and assessment practice.",
      ),
      point(
        "Independent tutoring, not school affiliation",
        "Maths Bodhi is an independent tutoring service and does not imply official partnership with any school.",
      ),
    ],
    internalLinks: [demoLink, mathsHomeLink, onlineLink, cityLink, sector56Link, link("IB Maths Home Tutor", "/ib-maths-home-tutor", "Open IB-focused maths support for premium-school learners.", ["IB"]), link("IGCSE Maths Home Tutor", "/igcse-maths-home-tutor", "Open IGCSE-focused maths support for Core and Extended learners.", ["IGCSE"])],
    faqs: [
      faq(
        "Does Maths Bodhi claim affiliation with premium schools?",
        "No. Maths Bodhi is an independent tutoring service. School references are used only to describe student context and curriculum expectations.",
      ),
      faq(
        "Which curricula are most common for premium-school maths support?",
        "Families often ask about IB, IGCSE, Cambridge, CBSE, ISC, and senior-school maths support depending on the student's school and class.",
      ),
    ],
  },
  {
    key: "cbse-maths-home-tutor",
    path: "/cbse-maths-home-tutor",
    badge: "CBSE Home Tutor",
    h1: "CBSE Maths Home Tutor in Gurugram",
    intro:
      "Find CBSE maths home tutor support for classwork, NCERT chapters, worksheets, periodic tests, and board-year revision across Gurugram.",
    seoTitle: "CBSE Maths Home Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find CBSE maths home tutors in Gurugram with real tutor profiles, Class 10 and Class 12 links, demo booking, WhatsApp, and city routes.",
    keywords: ["cbse maths home tutor", "cbse maths tutor gurugram", "cbse home tuition maths"],
    chips: ["CBSE", "Home Tuition", "Class 6 to 12", "Gurugram"],
    source: excelSource({
      id: "22",
      audience: "Board Students",
      cluster: "Board",
      parentHubPath: "/",
      primaryKeyword: "cbse maths home tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      boards: ["CBSE"],
      modes: ["Home Tuition"],
      limit: 6,
    },
    supportPoints: [
      point(
        "School pace and NCERT clarity",
        "CBSE home tuition usually begins with current chapters, homework patterns, tests, and written-method gaps.",
      ),
      point(
        "Board-year support needs planning",
        "Class 10 and Class 12 students benefit from a revision map, past-paper style questions, and regular correction.",
      ),
      point(
        "Local fit matters for home lessons",
        "The tutor shortlist should account for Gurugram sectors, school timing, and whether online backup is needed.",
      ),
    ],
    internalLinks: [demoLink, cbseTuitionLink, class10Link, class12Link, mathsHomeLink, cityLink, sector56Link],
    faqs: [
      faq(
        "How is CBSE maths home tutor support different from general tuition?",
        "The support is organised around CBSE chapters, school worksheets, tests, board-year pacing, and the student's class level.",
      ),
      faq(
        "Can a CBSE tutor help with Class 10 and Class 12 revision?",
        "Yes. Use the Class 10 and Class 12 routes when the student's exam year needs a more focused revision plan.",
      ),
    ],
  },
  {
    key: "cbse-maths-tuition",
    path: "/cbse-maths-tuition",
    badge: "CBSE Maths",
    h1: "CBSE Maths Tuition in Gurugram",
    intro:
      "Find CBSE maths tuition support for school pace, chapter clarity, worksheets, periodic tests, and board-year revision across Gurugram.",
    seoTitle: "CBSE Maths Tuition in Gurugram | Maths Bodhi",
    seoDescription:
      "Find CBSE maths tuition in Gurugram with real tutor profiles, Class 10 and Class 12 links, city and sector routes, Book Free Demo, and WhatsApp enquiry.",
    keywords: ["cbse maths tuition", "cbse maths tutor gurugram", "cbse maths home tutor"],
    chips: ["CBSE", "Class 6 to 12", "Board Prep", "Gurugram"],
    source: excelSource({
      id: "81",
      segment: "Curriculum / Class",
      pageType: "Curriculum Hub",
      audience: "Board Students",
      cluster: "CBSE",
      parentHubPath: "/cbse-maths-home-tutor",
      primaryKeyword: "cbse maths tuition",
    }),
    tutorQuery: {
      city: "gurugram",
      boards: ["CBSE"],
      limit: 6,
    },
    supportPoints: [
      point(
        "School pace and chapter clarity",
        "CBSE families often need weekly structure around NCERT chapters, school worksheets, tests, and correction habits.",
      ),
      point(
        "Board-year planning",
        "Class 10 and Class 12 students usually need stronger written method, revision routines, and exam-style practice.",
      ),
      point(
        "Local or online tutor fit",
        "The matching flow can stay local to Gurugram sectors or move online when timing and continuity matter more.",
      ),
    ],
    internalLinks: [demoLink, link("CBSE Maths Home Tutor", "/cbse-maths-home-tutor", "Open the home-tuition route for CBSE school support.", ["CBSE", "Home"]), class10Link, class12Link, mathsHomeLink, cityLink],
    faqs: [
      faq(
        "Does CBSE maths tuition here cover both middle school and board classes?",
        "Yes. Families can compare tutor fit across Class 6 to 12, with more focused routes for Class 10 and Class 12.",
      ),
      faq(
        "Are the tutor cards manually written for this page?",
        "No. Tutor cards come from real published tutor data and are filtered for CBSE relevance where available.",
      ),
    ],
  },
  {
    key: "class-10-maths-tutor",
    path: "/class-10-maths-tutor",
    badge: "Class 10 Maths",
    h1: "Class 10 Maths Tutor in Gurugram",
    intro:
      "Use this page when Class 10 maths needs chapter repair, board-style written practice, school-test structure, and a tutor shortlist connected to real profiles.",
    seoTitle: "Class 10 Maths Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find Class 10 maths tutors in Gurugram with real tutor profiles, CBSE links, city and sector routes, Book Free Demo, and WhatsApp enquiry.",
    keywords: ["class 10 maths tutor", "class 10 maths tuition gurugram", "cbse class 10 maths tutor"],
    chips: ["Class 10", "Board Readiness", "CBSE", "Gurugram"],
    source: excelSource({
      id: "86-alias",
      segment: "Curriculum / Class",
      pageType: "Class Service",
      audience: "Board Students",
      cluster: "CBSE",
      parentHubPath: "/cbse-maths-tuition",
      primaryKeyword: "class 10 maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      classes: ["Class 10"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Chapter clarity before board pressure builds",
        "A Class 10 tutor should help the student repair weak chapters early instead of waiting for pre-board marks to expose gaps.",
      ),
      point(
        "Practice that matches school expectations",
        "Useful support includes written method, worksheet correction, mock-paper review, and predictable weekly revision.",
      ),
      point(
        "Better shortlist signals for parents",
        "Tutor cards show class focus, board fit, locality, topics, and enquiry options from published profile data.",
      ),
    ],
    internalLinks: [demoLink, cbseTuitionLink, class12Link, revisionLink, mathsHomeLink, cityLink],
    faqs: [
      faq(
        "Can this route work for CBSE Class 10 maths?",
        "Yes. It is written for Class 10 maths support and links back to the CBSE route when board-specific context is needed.",
      ),
      faq(
        "What if no Class 10 tutor is published right now?",
        "The page shows a fallback and keeps the Book Free Demo and WhatsApp paths available for checking current tutor availability.",
      ),
    ],
  },
  {
    key: "class-12-maths-tutor",
    path: "/class-12-maths-tutor",
    badge: "Class 12 Maths",
    h1: "Class 12 Maths Tutor in Gurugram",
    intro:
      "Find Class 12 maths tutor support for senior-school pace, calculus and algebra confidence, exam structure, and board-aware revision.",
    seoTitle: "Class 12 Maths Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find Class 12 maths tutors in Gurugram using real tutor profiles, CBSE and board links, demo booking, WhatsApp, and city routes.",
    keywords: ["class 12 maths tutor", "class 12 maths tuition gurugram", "senior maths tutor"],
    chips: ["Class 12", "Senior School", "Exam Structure", "Gurugram"],
    source: excelSource({
      id: "88-alias",
      segment: "Curriculum / Class",
      pageType: "Class Service",
      audience: "Board Students",
      cluster: "CBSE",
      parentHubPath: "/cbse-maths-tuition",
      primaryKeyword: "class 12 maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      classes: ["Class 12"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Senior-school maths needs sharper structure",
        "Class 12 students often need focused planning around calculus, functions, vectors, probability, and board-style problem solving.",
      ),
      point(
        "Revision should become repeatable",
        "A useful tutor helps the student move from solved examples into timed practice, review habits, and better exam confidence.",
      ),
      point(
        "Profiles keep the shortlist practical",
        "Families can compare board fit, class focus, lesson mode, fee, and locality before opening the full tutor profile.",
      ),
    ],
    internalLinks: [demoLink, cbseTuitionLink, onlineLink, class10Link, revisionLink, mathsHomeLink, cityLink],
    faqs: [
      faq(
        "Is Class 12 maths support only for CBSE?",
        "No. The route is class-led first, and families can still use board links to narrow by CBSE, IB, IGCSE, ISC, or JEE needs.",
      ),
      faq(
        "Can families ask about online or home lesson mode?",
        "Yes. Lesson mode can be checked through the tutor cards, Book Free Demo flow, or WhatsApp enquiry.",
      ),
    ],
  },
  {
    key: "igcse-maths-home-tutor",
    path: "/igcse-maths-home-tutor",
    badge: "IGCSE Maths",
    h1: "IGCSE Maths Home Tutor in Gurugram",
    intro:
      "Find IGCSE maths tutor support for Core and Extended learners who need method clarity, topic repair, paper practice, and premium-school-aware pacing.",
    seoTitle: "IGCSE Maths Home Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find IGCSE maths home tutors in Gurugram with real profiles, Core and Extended support, demo booking, WhatsApp, and premium-school links.",
    keywords: ["igcse maths tutor", "igcse maths home tutor", "igcse maths tuition gurugram"],
    chips: ["IGCSE", "Core", "Extended", "Premium Schools"],
    source: excelSource({
      id: "25",
      audience: "Premium School Students",
      cluster: "Premium Schools",
      parentHubPath: "/premium-school-maths-home-tutor",
      primaryKeyword: "igcse maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      boards: ["IGCSE", "Cambridge"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Core and Extended need different pacing",
        "The tutor fit should reflect paper level, topic gaps, and how the student's school is sequencing the syllabus.",
      ),
      point(
        "Written method matters",
        "IGCSE maths support should build clear working, mark-scheme awareness, and confidence with multi-step questions.",
      ),
      point(
        "Useful for premium-school schedules",
        "Families can compare home, online, or mixed support around school timing and Gurugram locality fit.",
      ),
    ],
    internalLinks: [demoLink, premiumSchoolLink, mathsHomeLink, onlineLink, cityLink, sector56Link],
    faqs: [
      faq(
        "Does this route cover IGCSE Core and Extended maths?",
        "Yes. Families can explain the student's paper level and current topics before the demo conversation.",
      ),
      faq(
        "Can IGCSE support happen online?",
        "Yes. Online support can work well for paper practice, method review, and revision continuity.",
      ),
    ],
  },
  {
    key: "ib-maths-home-tutor",
    path: "/ib-maths-home-tutor",
    badge: "IB Maths",
    h1: "IB Maths Home Tutor in Gurugram",
    intro:
      "Find IB maths tutor support for MYP and Diploma students who need pathway-aware guidance, concept clarity, paper practice, and regular feedback.",
    seoTitle: "IB Maths Home Tutor in Gurugram | Maths Bodhi",
    seoDescription:
      "Find IB maths home tutors in Gurugram for MYP and DP learners with real profiles, premium-school support, demo booking, and WhatsApp enquiry.",
    keywords: ["ib maths tutor", "ib maths home tutor", "ib maths tuition gurugram"],
    chips: ["IB", "MYP", "DP", "Premium Schools"],
    source: excelSource({
      id: "26",
      audience: "Premium School Students",
      cluster: "Premium Schools",
      parentHubPath: "/premium-school-maths-home-tutor",
      primaryKeyword: "ib maths tutor",
    }),
    tutorQuery: {
      city: "gurugram",
      boards: ["IB"],
      limit: 6,
    },
    supportPoints: [
      point(
        "IB maths needs pathway-aware support",
        "MYP, AA, and AI learners need different topic emphasis, written method, and assessment preparation.",
      ),
      point(
        "Premium-school context matters",
        "IB families often need tutors who understand pace, feedback expectations, and how to keep practice structured.",
      ),
      point(
        "Demo details should include pathway and level",
        "Share MYP or DP stage, AA or AI path, SL or HL level, and current topic pressure before shortlisting.",
      ),
    ],
    internalLinks: [demoLink, premiumSchoolLink, mathsHomeLink, onlineLink, cityLink, sector56Link],
    faqs: [
      faq(
        "Does this route cover IB MYP and Diploma maths?",
        "Yes. Families can share whether the student is in MYP or DP, and whether the DP path is AA or AI.",
      ),
      faq(
        "Is IB maths tuition available as home or online support?",
        "Families can ask about home tuition, online support, or a flexible mix depending on availability.",
      ),
    ],
  },
  {
    key: "jee-maths-coaching",
    path: "/jee-maths-coaching",
    badge: "JEE Maths",
    h1: "JEE Maths Coaching in Gurugram",
    intro:
      "Use this route for JEE maths support across concept depth, problem selection, speed, weekly discipline, and Main or Advanced exam planning.",
    seoTitle: "JEE Maths Coaching in Gurugram | Maths Bodhi",
    seoDescription:
      "Find JEE maths coaching in Gurugram with real tutor profiles, problem-solving support, revision planning, demo booking, and WhatsApp enquiry.",
    keywords: ["jee maths coaching", "jee maths tutor gurugram", "jee maths classes"],
    chips: ["JEE Main", "JEE Advanced", "Problem Solving", "Revision"],
    source: excelSource({
      id: "27",
      pageType: "Commercial Page",
      audience: "JEE Aspirants",
      cluster: "JEE",
      parentHubPath: "/",
      primaryKeyword: "jee maths coaching",
    }),
    tutorQuery: {
      city: "gurugram",
      boards: ["JEE"],
      tokens: ["jee", "advanced", "main"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Concept depth before speed",
        "JEE maths support should first stabilise theory, standard problem types, and multi-step reasoning before pushing timed practice.",
      ),
      point(
        "Problem selection matters",
        "Students need the right mix of direct questions, mixed-topic sets, mock review, and advanced problem solving.",
      ),
      point(
        "Revision needs weekly discipline",
        "A JEE plan should make error logs, topic cycles, and mock correction part of the routine.",
      ),
    ],
    internalLinks: [demoLink, revisionLink, mathsHomeLink, onlineLink, class12Link, cityLink],
    faqs: [
      faq(
        "Does this JEE route cover Main and Advanced preparation?",
        "Yes. Families can share whether the current goal is JEE Main, JEE Advanced, or a foundation-to-entrance transition.",
      ),
      faq(
        "Can JEE maths coaching be one-to-one?",
        "Yes. One-to-one support can help when the student needs targeted topic repair, problem selection, and mock review.",
      ),
    ],
  },
  {
    key: "tuition-fees",
    path: "/tuition-fees",
    badge: "Tuition Fees",
    h1: "Maths Tuition Fees for Gurugram Families",
    intro:
      "Use this page to understand what usually affects maths tuition fees: class level, board, tutor experience, lesson mode, sector fit, and revision intensity.",
    seoTitle: "Maths Tuition Fees | Maths Bodhi Gurugram",
    seoDescription:
      "Understand maths tuition fees in Gurugram by class, board, tutor fit, lesson mode, and support intensity with demo and WhatsApp enquiry links.",
    keywords: ["maths tuition fees", "maths tutor fees gurugram", "home tuition fees maths"],
    chips: ["Fees", "Tutor Fit", "Class Level", "Lesson Mode"],
    source: excelSource({
      id: "5",
      pageType: "Commercial Page",
      audience: "Parents",
      cluster: "Pricing",
      parentHubPath: "/",
      primaryKeyword: "maths tuition fees",
    }),
    tutorQuery: {
      city: "gurugram",
      limit: 6,
    },
    supportPoints: [
      point(
        "Fees depend on the support need",
        "Class level, board, exam pressure, tutor experience, lesson mode, and travel feasibility can all affect the final quote.",
      ),
      point(
        "Published profiles show starting-fee context",
        "Where fee details are available, tutor cards show starting-fee information from the published profile data.",
      ),
      point(
        "The demo enquiry keeps pricing practical",
        "Families should share class, board, sector, topic need, and preferred mode before asking for the most relevant fee estimate.",
      ),
    ],
    internalLinks: [demoLink, mathsHomeLink, onlineLink, oneToOneLink, cbseTuitionLink, jeeLink, cityLink],
    faqs: [
      faq(
        "Why do maths tuition fees vary?",
        "Fees can vary by class, board, tutor experience, home or online mode, sector travel, frequency, and exam urgency.",
      ),
      faq(
        "Can I get a fee estimate before booking?",
        "Yes. Share the class, board, sector, preferred mode, and topic need through Book Free Demo or WhatsApp to discuss fit and fees.",
      ),
    ],
  },
  {
    key: "gurugram-sector-56",
    path: "/city/gurugram/sector-56",
    badge: "Sector 56 Maths Support",
    h1: "Maths Home Tutor in Sector 56, Gurugram",
    intro:
      "A focused Sector 56 page for families comparing maths home tutor support near premium school corridors, board pressure, and practical after-school timing.",
    seoTitle: "Maths Home Tutor in Sector 56 Gurugram | Maths Bodhi",
    seoDescription:
      "Find maths home tutor support in Sector 56 Gurugram with real tutor profiles, CBSE, IB, IGCSE, Class 10, Class 12, Book Free Demo, and WhatsApp links.",
    keywords: ["maths home tutor sector 56", "maths tuition sector 56 gurugram", "sector 56 maths tutor"],
    chips: ["Sector 56", "Gurugram", "Home Tuition", "CBSE IB IGCSE"],
    tutorQuery: {
      city: "gurugram",
      localities: ["Sector 56"],
      limit: 6,
    },
    supportPoints: [
      point(
        "Locality fit matters before booking",
        "Sector 56 searches usually depend on home-tuition feasibility, school timing, and quick access to nearby Gurugram corridors.",
      ),
      point(
        "Mixed board demand is common",
        "Families in and around Sector 56 may compare CBSE, IB, IGCSE, and senior-school maths support before choosing a tutor.",
      ),
      point(
        "Fallback stays honest when data is missing",
        "If no published tutor currently matches Sector 56, the page keeps the enquiry route open without showing placeholder tutor profiles.",
      ),
    ],
    internalLinks: [demoLink, cityLink, cbseTuitionLink, class10Link, class12Link, onlineLink],
    faqs: [
      faq(
        "Does this Sector 56 page depend on admin locality data?",
        "No. The route stays available as a small SEO batch page, and real tutor cards appear only when published tutor profiles match Sector 56.",
      ),
      faq(
        "Can families compare other Gurugram sectors from here?",
        "Yes. The Gurugram city page links to sector options and keeps broader tutor matching available.",
      ),
    ],
  },
];

export const seoLandingPages = seoLandingPageList.reduce((map, page) => {
  map[page.key] = page;
  return map;
}, {});

export function getSeoLandingPageConfig(pageKey) {
  return seoLandingPages[pageKey] ?? null;
}

export function listSeoLandingPages() {
  return seoLandingPageList;
}
