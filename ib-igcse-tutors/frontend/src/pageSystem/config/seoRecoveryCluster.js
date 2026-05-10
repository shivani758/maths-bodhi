const BOARD_META = {
  cbse: {
    label: "CBSE",
    audience: "CBSE school students",
    hubPath: "/cbse-maths-tuition",
    gurugramPath: "/gurugram/cbse-maths-home-tutor",
    classLevels: ["9", "10", "11", "12"],
    topicContext: "NCERT method, school worksheets, pre-board style correction, and board-year revision",
  },
  icse: {
    label: "ICSE",
    audience: "ICSE school students",
    hubPath: "/icse-maths-tuition",
    gurugramPath: "/gurugram/icse-isc-maths-home-tutor",
    classLevels: ["9", "10"],
    topicContext: "written method, proof steps, school tests, and board-style presentation",
  },
  isc: {
    label: "ISC",
    audience: "ISC senior-school students",
    hubPath: "/isc-maths-tuition",
    gurugramPath: "/gurugram/icse-isc-maths-home-tutor",
    classLevels: ["11", "12"],
    topicContext: "senior-school depth, calculus practice, and clearer written solutions",
  },
  igcse: {
    label: "IGCSE",
    audience: "IGCSE Core and Extended students",
    hubPath: "/igcse-maths-tuition",
    gurugramPath: "/gurugram/igcse-maths-home-tutor",
    classLevels: ["9", "10"],
    topicContext: "Core or Extended paper technique, written method, and topic-by-topic exam confidence",
  },
  ib: {
    label: "IB",
    audience: "IB MYP and Diploma students",
    hubPath: "/ib-maths-tuition",
    gurugramPath: "/gurugram/ib-maths-home-tutor",
    classLevels: ["9", "10", "11", "12"],
    topicContext: "MYP inquiry, DP pathway fit, AA or AI method, and regular problem reflection",
  },
};

const LOCALITY_META = [
  {
    slug: "sector-43",
    label: "Sector 43",
    nearby: ["dlf-phase-4", "sector-54", "golf-course-road"],
    note:
      "central Gurugram access, Golf Course Road proximity, and practical after-school home tuition timing",
  },
  {
    slug: "sector-54",
    label: "Sector 54",
    nearby: ["golf-course-road", "sector-56", "dlf-phase-5"],
    note:
      "premium-school corridors, Golf Course Road access, and strong IB or IGCSE tutor-fit searches",
  },
  {
    slug: "sector-56",
    label: "Sector 56",
    nearby: ["sector-54", "sector-57", "golf-course-road"],
    note:
      "mixed CBSE, IB, IGCSE, and senior-school demand with practical locality-led home tuition",
  },
  {
    slug: "dlf-phase-4",
    label: "DLF Phase 4",
    nearby: ["sector-43", "sushant-lok-1", "golf-course-road"],
    note:
      "central premium-corridor scheduling, school access, and quieter one-to-one lesson planning",
  },
  {
    slug: "golf-course-road",
    label: "Golf Course Road",
    nearby: ["sector-54", "sector-56", "dlf-phase-4"],
    note:
      "corridor-level premium-school context before narrowing to an exact sector or board route",
  },
];

const TOPIC_META = [
  {
    slug: "algebra",
    label: "Algebra",
    genericPath: "/algebra-tutor",
    focus:
      "equations, expressions, functions, graph sense, and the step-by-step reasoning that makes later chapters easier",
  },
  {
    slug: "trigonometry",
    label: "Trigonometry",
    genericPath: "/trigonometry-tutor",
    focus:
      "identities, ratios, graph interpretation, height and distance style problems, and exam-friendly method writing",
  },
  {
    slug: "calculus",
    label: "Calculus",
    genericPath: "/calculus-tutor",
    focus:
      "limits, differentiation, integration, applications, and mixed-problem practice for senior-school maths",
  },
];

const EXAM_SUPPORT_META = [
  {
    slug: "board-exam-maths-revision",
    title: "Board Exam Maths Revision",
    audience: "Class 10 and Class 12 board students",
    parentHubPath: "/maths-revision-program",
    primaryKeyword: "board exam maths revision",
    cluster: "Board Revision",
    focus:
      "chapter repair, formula recall, sample-paper correction, and a calm revision rhythm before board exams",
  },
  {
    slug: "jee-maths-problem-solving",
    title: "JEE Maths Problem Solving",
    audience: "JEE Main and Advanced aspirants",
    parentHubPath: "/jee-maths-coaching",
    primaryKeyword: "jee maths problem solving",
    cluster: "JEE Problem Solving",
    focus:
      "concept depth, problem selection, timed attempts, error logs, and mixed-topic reasoning for JEE maths",
  },
  {
    slug: "maths-last-minute-revision",
    title: "Maths Last Minute Revision",
    audience: "students close to tests, pre-boards, or final exams",
    parentHubPath: "/maths-revision-program",
    primaryKeyword: "maths last minute revision",
    cluster: "Last Minute Revision",
    focus:
      "high-yield topics, mistake cleanup, formula confidence, and realistic practice when time is limited",
  },
  {
    slug: "pre-board-maths-revision",
    title: "Pre Board Maths Revision",
    audience: "Class 10 and Class 12 pre-board students",
    parentHubPath: "/maths-revision-program",
    primaryKeyword: "pre board maths revision",
    cluster: "Pre Board Revision",
    focus:
      "school pre-board correction, weak-chapter triage, sample-paper review, and board-style written presentation",
  },
];

const BATCH_A_LOCALITY_META = [
  {
    slug: "sector-14",
    label: "Sector 14",
    nearby: ["sector-15", "sector-41", "south-city-1"],
    corridor: "central Gurugram school-support pocket",
    schoolSignals: ["DAV Public School Sector 14"],
    note:
      "useful for families who want school-test follow-through, homework structure, and practical central Gurugram home tuition",
  },
  {
    slug: "sector-15",
    label: "Sector 15",
    nearby: ["sector-14", "sector-31", "south-city-1"],
    corridor: "central Gurugram weekday-support pocket",
    schoolSignals: ["central Gurugram schools"],
    note:
      "suited to students who need regular chapter repair, better school rhythm, and flexible after-school scheduling",
  },
  {
    slug: "sector-31",
    label: "Sector 31",
    nearby: ["sector-40", "sector-41", "south-city-1"],
    corridor: "central school and board-support pocket",
    schoolSignals: ["South City access"],
    note:
      "practical for families comparing school support, board build-up, and manageable home tuition travel",
  },
  {
    slug: "sector-40",
    label: "Sector 40",
    nearby: ["sector-31", "sector-41", "sector-45"],
    corridor: "central class-support pocket",
    schoolSignals: ["Sector 40 and Sector 41 school access"],
    note:
      "helpful when the family wants class-wise maths support without losing locality convenience",
  },
  {
    slug: "sector-41",
    label: "Sector 41",
    nearby: ["sector-40", "sector-45", "south-city-1"],
    corridor: "school corridor near South City",
    schoolSignals: ["K.R. Mangalam World School Sector 41"],
    note:
      "relevant for families who want school-aware maths support with steady worksheet and test correction",
  },
  {
    slug: "sector-42",
    label: "Sector 42",
    nearby: ["sector-43", "dlf-phase-1", "golf-course-road"],
    corridor: "Golf Course Road access pocket",
    schoolSignals: ["Golf Course Road school access"],
    note:
      "works well when families want premium-corridor access but still need a practical one-to-one maths routine",
  },
  {
    slug: "sector-43",
    label: "Sector 43",
    nearby: ["sector-42", "dlf-phase-4", "sushant-lok-1"],
    corridor: "central premium-school access pocket",
    schoolSignals: ["Amity International School Gurugram"],
    note:
      "strong for board-aware and premium-school families who want central Gurugram home tuition convenience",
  },
  {
    slug: "sector-45",
    label: "Sector 45",
    nearby: ["sector-41", "sector-46", "south-city-1"],
    corridor: "school and board-support pocket",
    schoolSignals: ["Delhi Public School Sector 45 Gurugram"],
    note:
      "useful when families want school tests, board readiness, and chapter-by-chapter maths support close to home",
  },
  {
    slug: "sector-46",
    label: "Sector 46",
    nearby: ["sector-45", "sector-49", "south-city-2"],
    corridor: "school-support and Sohna Road access pocket",
    schoolSignals: ["Manav Rachna International School Sector 46"],
    note:
      "suited to families comparing school homework, board prep, and practical home tuition around the Sohna Road belt",
  },
  {
    slug: "sector-49",
    label: "Sector 49",
    nearby: ["sector-46", "sector-50", "sohna-road"],
    corridor: "Sohna Road school corridor",
    schoolSignals: ["St. Xavier's High School Sector 49"],
    note:
      "helpful for students who need stronger school-test structure, written method, and steadier revision support",
  },
  {
    slug: "sector-50",
    label: "Sector 50",
    nearby: ["sector-49", "sector-51", "south-city-2"],
    corridor: "school corridor near Nirvana Country and Sohna Road",
    schoolSignals: ["Lotus Valley International School Sector 50"],
    note:
      "useful for families comparing school pace, board pressure, and consistent home tuition around Sector 50",
  },
  {
    slug: "sector-52",
    label: "Sector 52",
    nearby: ["sector-53", "sector-54", "golf-course-road"],
    corridor: "Golf Course Road access pocket",
    schoolSignals: ["premium-school access"],
    note:
      "relevant when families want a cleaner route into IB, IGCSE, CBSE, or class-specific maths support",
  },
  {
    slug: "sector-53",
    label: "Sector 53",
    nearby: ["sector-52", "sector-54", "golf-course-road"],
    corridor: "Golf Course Road school corridor",
    schoolSignals: ["Lancers International School Sector 53"],
    note:
      "strong for premium-school families who need tutor fit, topic clarity, and a practical after-school rhythm",
  },
  {
    slug: "sector-54",
    label: "Sector 54",
    nearby: ["sector-53", "sector-55", "golf-course-road"],
    corridor: "premium-school corridor on Golf Course Road",
    schoolSignals: ["Suncity School Sector 54"],
    note:
      "high-intent for IB, IGCSE, CBSE, and senior-school families comparing board fit and locality convenience",
  },
  {
    slug: "sector-55",
    label: "Sector 55",
    nearby: ["sector-54", "sector-56", "golf-course-road"],
    corridor: "Golf Course Road and Rapid Metro access pocket",
    schoolSignals: ["Golf Course Road school access"],
    note:
      "practical for families who want flexible scheduling near premium corridors without losing board specificity",
  },
  {
    slug: "sector-56",
    label: "Sector 56",
    nearby: ["sector-55", "sector-57", "golf-course-road"],
    corridor: "mixed board and premium-school pocket",
    schoolSignals: ["IB and IGCSE school access"],
    note:
      "useful for families comparing CBSE, IB, IGCSE, and senior-school maths support in one locality",
  },
  {
    slug: "sector-57",
    label: "Sector 57",
    nearby: ["sector-56", "sector-62", "sohna-road"],
    corridor: "school-support pocket near Golf Course Extension",
    schoolSignals: ["Scottish High International School access"],
    note:
      "helpful when the student needs school support, board follow-through, and calmer weekly revision structure",
  },
  {
    slug: "sector-62",
    label: "Sector 62",
    nearby: ["sector-57", "sector-65", "golf-course-extension-road"],
    corridor: "Golf Course Extension premium-school corridor",
    schoolSignals: ["Heritage Xperiential Learning School access"],
    note:
      "relevant for international-curriculum and premium-school families comparing tutor fit and commute practicality",
  },
  {
    slug: "sector-65",
    label: "Sector 65",
    nearby: ["sector-62", "sector-67", "golf-course-extension-road"],
    corridor: "Golf Course Extension and school-support pocket",
    schoolSignals: ["extension-road school access"],
    note:
      "suited to students who need senior-class maths structure, test correction, and a dependable weekly plan",
  },
  {
    slug: "sector-67",
    label: "Sector 67",
    nearby: ["sector-65", "sector-70", "sohna-road"],
    corridor: "Sohna Road and Golf Course Extension access pocket",
    schoolSignals: ["extension-road school access"],
    note:
      "useful when families want home tuition that balances locality convenience with board and class pressure",
  },
  {
    slug: "sector-70",
    label: "Sector 70",
    nearby: ["sector-67", "sector-72", "sohna-road"],
    corridor: "Sohna Road extension school-support pocket",
    schoolSignals: ["Sohna Road school access"],
    note:
      "practical for families looking for regular maths support around homework, chapter tests, and board-year planning",
  },
  {
    slug: "sector-72",
    label: "Sector 72",
    nearby: ["sector-70", "sohna-road", "south-city-2"],
    corridor: "Sohna Road and SPR access pocket",
    schoolSignals: ["SPR and Sohna Road school access"],
    note:
      "useful for students who need consistent practice while families compare school corridor and travel fit",
  },
  {
    slug: "dlf-phase-1",
    label: "DLF Phase 1",
    nearby: ["sector-42", "dlf-phase-2", "golf-course-road"],
    corridor: "DLF and Golf Course Road premium corridor",
    schoolSignals: ["premium-school access"],
    note:
      "works for families who want central premium-corridor access with clearer board, class, and topic shortlisting",
  },
  {
    slug: "dlf-phase-2",
    label: "DLF Phase 2",
    nearby: ["dlf-phase-1", "dlf-phase-3", "sushant-lok-1"],
    corridor: "DLF Cyber City access pocket",
    schoolSignals: ["central DLF school access"],
    note:
      "useful when after-school timing, parent commute, and regular maths support all need to fit together",
  },
  {
    slug: "dlf-phase-3",
    label: "DLF Phase 3",
    nearby: ["dlf-phase-2", "dlf-phase-4", "sushant-lok-1"],
    corridor: "DLF and MG Road access pocket",
    schoolSignals: ["DLF school access"],
    note:
      "practical for families comparing home tuition, online continuity, and board-specific support around busy schedules",
  },
  {
    slug: "dlf-phase-4",
    label: "DLF Phase 4",
    nearby: ["sector-43", "sushant-lok-1", "golf-course-road"],
    corridor: "central premium-school corridor",
    schoolSignals: ["The Shri Ram School Aravali access"],
    note:
      "strong for families who want premium-school awareness, calm scheduling, and board-specific maths support",
  },
  {
    slug: "dlf-phase-5",
    label: "DLF Phase 5",
    nearby: ["sector-54", "golf-course-road", "dlf-phase-4"],
    corridor: "premium Golf Course Road corridor",
    schoolSignals: ["IB and IGCSE school access"],
    note:
      "useful when families want premium-corridor convenience, international-curriculum fit, and steady tutor shortlisting",
  },
  {
    slug: "golf-course-road",
    label: "Golf Course Road",
    nearby: ["sector-54", "sector-56", "dlf-phase-5"],
    corridor: "premium school corridor",
    schoolSignals: ["Sector 53, Sector 54, and DLF school access"],
    note:
      "a corridor-level route for families comparing premium-school context before narrowing to a sector, board, or tutor",
  },
  {
    slug: "golf-course-extension-road",
    label: "Golf Course Extension Road",
    nearby: ["sector-62", "sector-65", "sector-67"],
    corridor: "extension-road premium school corridor",
    schoolSignals: ["Heritage and extension-road school access"],
    note:
      "useful for families comparing IB, IGCSE, CBSE, and senior-class support across the extension-road belt",
  },
  {
    slug: "sohna-road",
    label: "Sohna Road",
    nearby: ["sector-49", "sector-67", "sector-70"],
    corridor: "Sohna Road school and board-support corridor",
    schoolSignals: ["Sohna Road school access"],
    note:
      "practical for families balancing school pace, board pressure, and regular home tuition logistics",
  },
  {
    slug: "south-city-1",
    label: "South City 1",
    nearby: ["sector-31", "sector-41", "sector-45"],
    corridor: "central school-support locality",
    schoolSignals: ["DPS International Edge and central school access"],
    note:
      "helpful when families want homework follow-through, school-test discipline, and a steadier Class 10 to 12 rhythm",
  },
  {
    slug: "south-city-2",
    label: "South City 2",
    nearby: ["sector-49", "sector-50", "sohna-road"],
    corridor: "Sohna Road school-support locality",
    schoolSignals: ["South City and Sohna Road school access"],
    note:
      "useful for families who need class-wise support, board readiness, and manageable weekday scheduling",
  },
  {
    slug: "sushant-lok-1",
    label: "Sushant Lok 1",
    nearby: ["sector-43", "dlf-phase-4", "golf-course-road"],
    corridor: "central Gurugram and premium-school access locality",
    schoolSignals: ["DPS Sushant Lok and central school access"],
    note:
      "practical for families who want flexible lesson planning, school support, and clearer class-wise decisions",
  },
  {
    slug: "sushant-lok-2",
    label: "Sushant Lok 2",
    nearby: ["sector-56", "sector-57", "sector-55"],
    corridor: "Golf Course Road extension access locality",
    schoolSignals: ["Golf Course Road school access"],
    note:
      "useful for families comparing locality fit, class pressure, and regular maths support around busy school weeks",
  },
];

const BATCH_A_SCHOOL_META = [
  {
    schoolName: "The Shri Ram School Aravali",
    slug: "best-maths-home-tutor-for-the-shri-ram-school-aravali-gurugram",
    title: "Maths Home Tutor for The Shri Ram School Aravali Students in Gurugram",
    intentType: "Best",
    localitySlug: "dlf-phase-4",
    curriculumSignals: ["IB", "ICSE", "school-led maths"],
  },
  {
    schoolName: "Heritage Xperiential Learning School",
    slug: "top-maths-home-tutor-for-heritage-xperiential-learning-school-gurugram",
    title: "Maths Home Tutor for Heritage Xperiential Learning School Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-62",
    curriculumSignals: ["IB", "IGCSE", "school-led maths"],
  },
  {
    schoolName: "Pathways World School Gurgaon",
    slug: "best-maths-home-tutor-for-pathways-world-school-gurugram",
    title: "Maths Home Tutor for Pathways World School Gurgaon Students in Gurugram",
    intentType: "Best",
    localitySlug: "sohna-road",
    curriculumSignals: ["IB", "international curriculum", "senior-school maths"],
  },
  {
    schoolName: "Shiv Nadar School Gurugram",
    slug: "top-maths-home-tutor-for-shiv-nadar-school-gurugram",
    title: "Maths Home Tutor for Shiv Nadar School Gurugram Students in Gurugram",
    intentType: "Top",
    localitySlug: "dlf-phase-1",
    curriculumSignals: ["CBSE", "school-led maths", "senior classes"],
  },
  {
    schoolName: "Delhi Public School Sector 45 Gurugram",
    slug: "best-maths-home-tutor-for-delhi-public-school-sector-45-gurugram",
    title: "Maths Home Tutor for Delhi Public School Sector 45 Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sector-45",
    curriculumSignals: ["CBSE", "board exams", "school tests"],
  },
  {
    schoolName: "Scottish High International School",
    slug: "top-maths-home-tutor-for-scottish-high-international-school-gurugram",
    title: "Maths Home Tutor for Scottish High International School Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-57",
    curriculumSignals: ["IB", "IGCSE", "school-led maths"],
  },
  {
    schoolName: "Lotus Valley International School Sector 50 Gurugram",
    slug: "best-maths-home-tutor-for-lotus-valley-international-school-gurugram",
    title: "Maths Home Tutor for Lotus Valley International School Sector 50 Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sector-50",
    curriculumSignals: ["CBSE", "school tests", "board preparation"],
  },
  {
    schoolName: "Lancers International School Sector 53 Gurugram",
    slug: "top-maths-home-tutor-for-lancers-international-school-gurugram",
    title: "Maths Home Tutor for Lancers International School Sector 53 Gurugram Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-53",
    curriculumSignals: ["IB", "IGCSE", "international curriculum"],
  },
  {
    schoolName: "Suncity School Sector 54 Gurugram",
    slug: "best-maths-home-tutor-for-suncity-school-gurugram",
    title: "Maths Home Tutor for Suncity School Sector 54 Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sector-54",
    curriculumSignals: ["CBSE", "IGCSE", "school-led maths"],
  },
  {
    schoolName: "Manav Rachna International School Sector 46 Gurugram",
    slug: "top-maths-home-tutor-for-manav-rachna-international-school-gurugram",
    title: "Maths Home Tutor for Manav Rachna International School Sector 46 Gurugram Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-46",
    curriculumSignals: ["CBSE", "school tests", "board preparation"],
  },
  {
    schoolName: "St. Xavier's High School Sector 49 Gurugram",
    slug: "best-maths-home-tutor-for-st-xaviers-high-school-gurugram",
    title: "Maths Home Tutor for St. Xavier's High School Sector 49 Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sector-49",
    curriculumSignals: ["CBSE", "school tests", "board preparation"],
  },
  {
    schoolName: "Amity International School Gurugram",
    slug: "top-maths-home-tutor-for-amity-international-school-gurugram",
    title: "Maths Home Tutor for Amity International School Gurugram Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-43",
    curriculumSignals: ["CBSE", "school-led maths", "board support"],
  },
  {
    schoolName: "DAV Public School Sector 14 Gurugram",
    slug: "best-maths-home-tutor-for-dav-public-school-sector-14-gurugram",
    title: "Maths Home Tutor for DAV Public School Sector 14 Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sector-14",
    curriculumSignals: ["CBSE", "school tests", "board preparation"],
  },
  {
    schoolName: "K.R. Mangalam World School Sector 41 Gurugram",
    slug: "top-maths-home-tutor-for-kr-mangalam-world-school-gurugram",
    title: "Maths Home Tutor for K.R. Mangalam World School Sector 41 Gurugram Students in Gurugram",
    intentType: "Top",
    localitySlug: "sector-41",
    curriculumSignals: ["CBSE", "school tests", "board preparation"],
  },
  {
    schoolName: "G.D. Goenka Public School Gurugram",
    slug: "best-maths-home-tutor-for-gd-goenka-public-school-gurugram",
    title: "Maths Home Tutor for G.D. Goenka Public School Gurugram Students in Gurugram",
    intentType: "Best",
    localitySlug: "sohna-road",
    curriculumSignals: ["CBSE", "school-led maths", "senior classes"],
  },
];

function batchBParentHub(boardSlug, fallback = "/maths-home-tutor") {
  const board = BOARD_META[boardSlug];

  if (board?.hubPath) {
    return board.hubPath;
  }

  if (boardSlug === "jee") {
    return "/jee-maths-coaching";
  }

  return fallback;
}

function batchBPage({
  slug,
  title,
  boardSlug = "",
  boardLabel = "",
  classLevel = "",
  intent,
  cluster,
  audience = "School students and parents",
  parentHubPath,
  focus,
}) {
  const resolvedBoardLabel = boardLabel || BOARD_META[boardSlug]?.label || "";

  return {
    slug,
    title,
    h1: title,
    boardSlug,
    boardLabel: resolvedBoardLabel,
    classLevel,
    intent,
    cluster,
    audience,
    parentHubPath: parentHubPath || batchBParentHub(boardSlug),
    primaryKeyword: title.toLowerCase(),
    focus,
  };
}

const BATCH_B_INTENT_META = [
  batchBPage({
    slug: "class-9-cbse-maths-exam-preparation",
    title: "Class 9 CBSE Maths Exam Preparation",
    boardSlug: "cbse",
    classLevel: "9",
    intent: "exam preparation",
    cluster: "CBSE Class 9",
    focus: "school tests, NCERT chapter clarity, worksheet correction, and stronger pre-board foundations",
  }),
  batchBPage({
    slug: "class-10-cbse-board-maths-preparation",
    title: "Class 10 CBSE Board Maths Preparation",
    boardSlug: "cbse",
    classLevel: "10",
    intent: "board preparation",
    cluster: "CBSE Class 10",
    focus: "board-style written method, sample-paper correction, formula recall, and chapter-by-chapter revision",
  }),
  batchBPage({
    slug: "class-11-cbse-maths-exam-preparation",
    title: "Class 11 CBSE Maths Exam Preparation",
    boardSlug: "cbse",
    classLevel: "11",
    intent: "exam preparation",
    cluster: "CBSE Class 11",
    focus: "senior-school transition, algebra and functions depth, trigonometry, and steady test practice",
  }),
  batchBPage({
    slug: "class-12-cbse-board-maths-preparation",
    title: "Class 12 CBSE Board Maths Preparation",
    boardSlug: "cbse",
    classLevel: "12",
    intent: "board preparation",
    cluster: "CBSE Class 12",
    focus: "calculus, vectors, probability, board presentation, sample papers, and weekly revision discipline",
  }),
  batchBPage({
    slug: "class-9-icse-maths-exam-preparation",
    title: "Class 9 ICSE Maths Exam Preparation",
    boardSlug: "icse",
    classLevel: "9",
    intent: "exam preparation",
    cluster: "ICSE Class 9",
    focus: "written method, proof steps, algebra, geometry, and school-test correction",
  }),
  batchBPage({
    slug: "class-10-icse-board-maths-preparation",
    title: "Class 10 ICSE Board Maths Preparation",
    boardSlug: "icse",
    classLevel: "10",
    intent: "board preparation",
    cluster: "ICSE Class 10",
    focus: "board-style answer writing, geometry proof practice, algebra, mensuration, and regular paper review",
  }),
  batchBPage({
    slug: "class-11-isc-maths-exam-preparation",
    title: "Class 11 ISC Maths Exam Preparation",
    boardSlug: "isc",
    classLevel: "11",
    intent: "exam preparation",
    cluster: "ISC Class 11",
    focus: "senior-school depth, functions, trigonometry, calculus foundations, and more organised written solutions",
  }),
  batchBPage({
    slug: "class-12-isc-board-maths-preparation",
    title: "Class 12 ISC Board Maths Preparation",
    boardSlug: "isc",
    classLevel: "12",
    intent: "board preparation",
    cluster: "ISC Class 12",
    focus: "calculus, vectors, probability, board-level problem solving, and disciplined paper correction",
  }),
  batchBPage({
    slug: "class-9-igcse-maths-exam-preparation",
    title: "Class 9 IGCSE Maths Exam Preparation",
    boardSlug: "igcse",
    classLevel: "9",
    intent: "exam preparation",
    cluster: "IGCSE Class 9",
    focus: "Core or Extended foundations, graph sense, algebra, geometry, and written method confidence",
  }),
  batchBPage({
    slug: "class-10-igcse-board-maths-preparation",
    title: "Class 10 IGCSE Board Maths Preparation",
    boardSlug: "igcse",
    classLevel: "10",
    intent: "board preparation",
    cluster: "IGCSE Class 10",
    focus: "Core or Extended paper technique, topic repair, past-paper correction, and exam pacing",
  }),
  batchBPage({
    slug: "class-11-ib-maths-exam-preparation",
    title: "Class 11 IB Maths Exam Preparation",
    boardSlug: "ib",
    classLevel: "11",
    intent: "exam preparation",
    cluster: "IB Class 11",
    focus: "MYP to DP transition, AA or AI pathway fit, reflection, and steady problem practice",
  }),
  batchBPage({
    slug: "class-12-ib-dp-maths-exam-preparation",
    title: "Class 12 IB DP Maths Exam Preparation",
    boardSlug: "ib",
    classLevel: "12",
    intent: "exam preparation",
    cluster: "IB DP",
    focus: "AA or AI revision, calculus, functions, statistics, internal assessment pressure, and exam-style mixed problems",
  }),
  ...[
    ["cbse", "CBSE", "CBSE Maths Doubt Solving", "cbse-maths-doubt-solving"],
    ["icse", "ICSE", "ICSE Maths Doubt Solving", "icse-maths-doubt-solving"],
    ["isc", "ISC", "ISC Maths Doubt Solving", "isc-maths-doubt-solving"],
    ["igcse", "IGCSE", "IGCSE Maths Doubt Solving", "igcse-maths-doubt-solving"],
    ["ib", "IB", "IB Maths Doubt Solving", "ib-maths-doubt-solving"],
  ].map(([boardSlug, boardLabel, title, slug]) =>
    batchBPage({
      slug,
      title,
      boardSlug,
      boardLabel,
      intent: "doubt solving",
      cluster: `${boardLabel} Doubt Solving`,
      focus: "regular doubt clearing, error correction, class-test readiness, and cleaner practice habits",
    }),
  ),
  batchBPage({
    slug: "jee-maths-doubt-solving",
    title: "JEE Maths Doubt Solving",
    boardSlug: "jee",
    boardLabel: "JEE",
    intent: "doubt solving",
    cluster: "JEE Doubt Solving",
    audience: "JEE aspirants",
    focus: "concept doubts, problem selection, timed attempts, error logs, and mixed-topic reasoning",
  }),
  ...[
    ["cbse", "CBSE", "Online CBSE Maths Tutor", "online-cbse-maths-tutor"],
    ["icse", "ICSE", "Online ICSE Maths Tutor", "online-icse-maths-tutor"],
    ["isc", "ISC", "Online ISC Maths Tutor", "online-isc-maths-tutor"],
    ["igcse", "IGCSE", "Online IGCSE Maths Tutor", "online-igcse-maths-tutor"],
    ["jee", "JEE", "Online JEE Maths Tutor", "online-jee-maths-tutor"],
  ].map(([boardSlug, boardLabel, title, slug]) =>
    batchBPage({
      slug,
      title,
      boardSlug,
      boardLabel,
      intent: "online tutoring",
      cluster: `${boardLabel} Online Maths`,
      parentHubPath: "/online-maths-home-tuition",
      focus: "flexible scheduling, continuity during busy school weeks, regular doubt clearing, and structured online revision",
    }),
  ),
  batchBPage({
    slug: "online-ib-maths-home-tuition",
    title: "Online IB Maths Home Tuition",
    boardSlug: "ib",
    intent: "online home tuition",
    cluster: "IB Online Maths",
    parentHubPath: "/online-maths-home-tuition",
    focus: "online MYP or DP support, AA or AI pathway fit, revision continuity, and regular problem reflection",
  }),
  ...["9", "10", "11", "12"].map((classLevel) =>
    batchBPage({
      slug: `maths-homework-help-for-class-${classLevel}`,
      title: `Maths Homework Help for Class ${classLevel}`,
      classLevel,
      intent: "homework help",
      cluster: `Class ${classLevel} Homework Help`,
      parentHubPath: classLevel === "10" ? "/class-10-maths-tutor" : classLevel === "12" ? "/class-12-maths-tutor" : "/maths-home-tutor",
      focus: "homework follow-through, chapter clarity, school worksheets, and a practical routine before tests build up",
    }),
  ),
  ...[
    ["cbse", "CBSE", "CBSE Maths Worksheet Help", "cbse-maths-worksheet-help"],
    ["icse", "ICSE", "ICSE Maths Worksheet Help", "icse-maths-worksheet-help"],
    ["igcse", "IGCSE", "IGCSE Maths Worksheet Help", "igcse-maths-worksheet-help"],
    ["ib", "IB", "IB Maths Worksheet Help", "ib-maths-worksheet-help"],
  ].map(([boardSlug, boardLabel, title, slug]) =>
    batchBPage({
      slug,
      title,
      boardSlug,
      boardLabel,
      intent: "worksheet help",
      cluster: `${boardLabel} Worksheet Help`,
      parentHubPath: "/maths-worksheet-guidance",
      focus: "worksheet correction, written method, topic repair, school follow-through, and revision checkpoints",
    }),
  ),
  ...[
    ["cbse", "CBSE Board Maths Revision", "cbse-board-maths-revision"],
    ["icse", "ICSE Board Maths Revision", "icse-board-maths-revision"],
    ["isc", "ISC Board Maths Revision", "isc-board-maths-revision"],
  ].map(([boardSlug, title, slug]) =>
    batchBPage({
      slug,
      title,
      boardSlug,
      intent: "board revision",
      cluster: `${BOARD_META[boardSlug]?.label} Board Revision`,
      parentHubPath: "/maths-revision-program",
      focus: "formula recall, weak-chapter repair, sample-paper correction, and calmer board revision planning",
    }),
  ),
  batchBPage({
    slug: "igcse-board-maths-preparation",
    title: "IGCSE Board Maths Preparation",
    boardSlug: "igcse",
    intent: "board preparation",
    cluster: "IGCSE Board Preparation",
    parentHubPath: "/igcse-maths-tuition",
    focus: "Core or Extended exam planning, past-paper correction, topic repair, and written method confidence",
  }),
  batchBPage({
    slug: "igcse-exam-maths-support",
    title: "IGCSE Exam Maths Support",
    boardSlug: "igcse",
    intent: "exam support",
    cluster: "IGCSE Exam Support",
    parentHubPath: "/igcse-maths-tuition",
    focus: "paper technique, timed practice, topic repair, and exam-friendly written solutions",
  }),
  batchBPage({
    slug: "ib-exam-maths-support",
    title: "IB Exam Maths Support",
    boardSlug: "ib",
    intent: "exam support",
    cluster: "IB Exam Support",
    parentHubPath: "/ib-maths-tuition",
    focus: "AA or AI pathway revision, mixed-problem practice, reflection, and exam-style correction",
  }),
  batchBPage({
    slug: "ib-dp-maths-revision",
    title: "IB DP Maths Revision",
    boardSlug: "ib",
    intent: "revision",
    cluster: "IB DP Revision",
    parentHubPath: "/ib-maths-tuition",
    focus: "DP topic repair, AA or AI revision maps, timed practice, and clearer exam structure",
  }),
  batchBPage({
    slug: "jee-maths-revision-plan",
    title: "JEE Maths Revision Plan",
    boardSlug: "jee",
    boardLabel: "JEE",
    intent: "revision plan",
    cluster: "JEE Revision",
    audience: "JEE aspirants",
    parentHubPath: "/jee-maths-coaching",
    focus: "topic prioritisation, mixed problem sets, timed attempts, error logs, and weekly revision cycles",
  }),
  batchBPage({
    slug: "class-10-maths-last-minute-revision",
    title: "Class 10 Maths Last Minute Revision",
    classLevel: "10",
    intent: "last-minute revision",
    cluster: "Class 10 Revision",
    parentHubPath: "/maths-revision-program",
    focus: "high-yield chapters, formula confidence, sample-paper correction, and calm final-week planning",
  }),
  batchBPage({
    slug: "class-12-maths-last-minute-revision",
    title: "Class 12 Maths Last Minute Revision",
    classLevel: "12",
    intent: "last-minute revision",
    cluster: "Class 12 Revision",
    parentHubPath: "/maths-revision-program",
    focus: "senior-school formula recall, calculus repair, sample papers, and realistic final-week planning",
  }),
  batchBPage({
    slug: "board-maths-doubt-solving",
    title: "Board Maths Doubt Solving",
    intent: "doubt solving",
    cluster: "Board Doubt Solving",
    parentHubPath: "/board-maths-syllabus-wise-tuition",
    focus: "board-style doubts, school worksheet correction, answer presentation, and weak-chapter repair",
  }),
  batchBPage({
    slug: "board-maths-exam-preparation",
    title: "Board Maths Exam Preparation",
    intent: "exam preparation",
    cluster: "Board Exam Preparation",
    parentHubPath: "/board-maths-syllabus-wise-tuition",
    focus: "board syllabus planning, sample-paper correction, weak chapters, and revision discipline",
  }),
  batchBPage({
    slug: "maths-worksheet-practice-for-board-exams",
    title: "Maths Worksheet Practice for Board Exams",
    intent: "worksheet practice",
    cluster: "Board Worksheet Practice",
    parentHubPath: "/maths-worksheet-guidance",
    focus: "worksheet practice, board-style written method, timed correction, and formula confidence",
  }),
  batchBPage({
    slug: "maths-test-series-for-class-10",
    title: "Maths Test Series for Class 10",
    classLevel: "10",
    intent: "test series",
    cluster: "Class 10 Test Series",
    parentHubPath: "/maths-test-series",
    focus: "chapter tests, board-style mocks, error review, and weekly score visibility without fake outcome claims",
  }),
  batchBPage({
    slug: "maths-test-series-for-class-12",
    title: "Maths Test Series for Class 12",
    classLevel: "12",
    intent: "test series",
    cluster: "Class 12 Test Series",
    parentHubPath: "/maths-test-series",
    focus: "senior-school chapter tests, mixed papers, calculus practice, and honest error tracking",
  }),
  batchBPage({
    slug: "maths-exam-practice-sessions",
    title: "Maths Exam Practice Sessions",
    intent: "exam practice",
    cluster: "Exam Practice",
    parentHubPath: "/exam-ready-practice-sessions",
    focus: "timed practice, answer correction, topic prioritisation, and a calmer plan before school or board exams",
  }),
];

const localityBySlug = new Map(LOCALITY_META.map((item) => [item.slug, item]));
const batchALocalityBySlug = new Map(BATCH_A_LOCALITY_META.map((item) => [item.slug, item]));

function titleCaseSlug(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getBoardClassPaths(boardSlug) {
  const board = BOARD_META[boardSlug];

  if (boardSlug === "isc") {
    return ["/isc-class-11-maths-tutor", "/isc-class-12-maths-tutor"];
  }

  return (board?.classLevels ?? []).map((classLevel) => `/class-${classLevel}-${boardSlug}-maths-home-tutor`);
}

function getTopicBoardPaths(boardSlug) {
  if (!["cbse", "igcse", "ib"].includes(boardSlug)) {
    return TOPIC_META.map((topic) => topic.genericPath);
  }

  return TOPIC_META.map((topic) => `/${boardSlug}-${topic.slug}-tutor`);
}

function getLocalityBoardPath(localitySlug, boardSlug) {
  return `/gurugram/${localitySlug}-${boardSlug}-maths-home-tutor`;
}

function getPrimaryClassPath(boardSlug) {
  const board = BOARD_META[boardSlug];

  if (board?.classLevels.includes("10")) {
    return `/class-10-${boardSlug}-maths-home-tutor`;
  }

  if (board?.classLevels.includes("12")) {
    return `/class-12-${boardSlug}-maths-home-tutor`;
  }

  return board?.hubPath ?? "/maths-home-tutor";
}

export const recoveryBoards = BOARD_META;
export const recoveryLocalities = LOCALITY_META;
export const recoveryTopics = TOPIC_META;

export const recoveryLocalityBoardPages = LOCALITY_META.flatMap((locality) =>
  Object.entries(BOARD_META).map(([boardSlug, board]) => ({
    id: `recovery-locality-${locality.slug}-${boardSlug}`,
    group: "locality-board",
    slug: `${locality.slug}-${boardSlug}-maths-home-tutor`,
    path: getLocalityBoardPath(locality.slug, boardSlug),
    title: `${board.label} Maths Home Tutor in ${locality.label}, Gurugram`,
    h1: `${board.label} maths home tutor in ${locality.label}, Gurugram`,
    localitySlug: locality.slug,
    localityLabel: locality.label,
    nearbyLocalitySlugs: locality.nearby,
    localityNote: locality.note,
    boardSlug,
    boardLabel: board.label,
    boardHubPath: board.hubPath,
    gurugramBoardPath: board.gurugramPath,
    parentHubPath: board.gurugramPath,
    primaryKeyword: `${board.label.toLowerCase()} maths home tutor in ${locality.label.toLowerCase()} gurugram`,
    audience: board.audience,
    topicContext: board.topicContext,
    relatedClassPaths: getBoardClassPaths(boardSlug),
    relatedTopicPaths: getTopicBoardPaths(boardSlug),
  })),
);

const recoveryClassBoardPages = [
  ...["cbse", "ib"].flatMap((boardSlug) =>
    ["9", "10", "11", "12"].map((classLevel) => {
      const board = BOARD_META[boardSlug];
      return {
        id: `recovery-class-${classLevel}-${boardSlug}`,
        group: "class-board",
        slug: `class-${classLevel}-${boardSlug}-maths-home-tutor`,
        path: `/class-${classLevel}-${boardSlug}-maths-home-tutor`,
        title: `Class ${classLevel} ${board.label} Maths Home Tutor`,
        h1: `Class ${classLevel} ${board.label} maths home tutor`,
        classLevel,
        boardSlug,
        boardLabel: board.label,
        boardHubPath: board.hubPath,
        gurugramBoardPath: board.gurugramPath,
        parentHubPath: board.hubPath,
        primaryKeyword: `class ${classLevel} ${board.label.toLowerCase()} maths home tutor`,
        audience: `${board.label} Class ${classLevel} students`,
        focus:
          classLevel === "10" || classLevel === "12"
            ? "board-style revision, written method, mock correction, and regular home tuition discipline"
            : "school pace, concept repair, homework follow-through, and chapter-by-chapter confidence",
      };
    }),
  ),
  ...["igcse", "icse"].flatMap((boardSlug) =>
    ["9", "10"].map((classLevel) => {
      const board = BOARD_META[boardSlug];
      return {
        id: `recovery-class-${classLevel}-${boardSlug}`,
        group: "class-board",
        slug: `class-${classLevel}-${boardSlug}-maths-home-tutor`,
        path: `/class-${classLevel}-${boardSlug}-maths-home-tutor`,
        title: `Class ${classLevel} ${board.label} Maths Home Tutor`,
        h1: `Class ${classLevel} ${board.label} maths home tutor`,
        classLevel,
        boardSlug,
        boardLabel: board.label,
        boardHubPath: board.hubPath,
        gurugramBoardPath: board.gurugramPath,
        parentHubPath: board.hubPath,
        primaryKeyword: `class ${classLevel} ${board.label.toLowerCase()} maths home tutor`,
        audience: `${board.label} Class ${classLevel} students`,
        focus:
          "topic clarity, exam-paper method, school correction, and steady home tuition support before the final year pressure rises",
      };
    }),
  ),
];

const recoveryTopicBoardPages = ["cbse", "igcse", "ib"].flatMap((boardSlug) =>
  TOPIC_META.map((topic) => {
    const board = BOARD_META[boardSlug];

    return {
      id: `recovery-topic-${boardSlug}-${topic.slug}`,
      group: "topic-board",
      slug: `${boardSlug}-${topic.slug}-tutor`,
      path: `/${boardSlug}-${topic.slug}-tutor`,
      title: `${board.label} ${topic.label} Tutor`,
      h1: `${board.label} ${topic.label.toLowerCase()} tutor`,
      boardSlug,
      boardLabel: board.label,
      boardHubPath: board.hubPath,
      gurugramBoardPath: board.gurugramPath,
      topicSlug: topic.slug,
      topicLabel: topic.label,
      genericTopicPath: topic.genericPath,
      parentHubPath: board.hubPath,
      primaryKeyword: `${board.label.toLowerCase()} ${topic.label.toLowerCase()} tutor`,
      audience: board.audience,
      focus: `${topic.focus} in the context of ${board.topicContext}`,
    };
  }),
);

export const recoveryExamSupportPages = EXAM_SUPPORT_META.map((item) => ({
  id: `recovery-exam-${item.slug}`,
  group: "exam-support",
  slug: item.slug,
  path: `/${item.slug}`,
  title: item.title,
  h1: item.title,
  parentHubPath: item.parentHubPath,
  primaryKeyword: item.primaryKeyword,
  audience: item.audience,
  cluster: item.cluster,
  focus: item.focus,
}));

export const batchALocalityPages = BATCH_A_LOCALITY_META.map((item) => ({
  id: `batch-a-locality-${item.slug}`,
  group: "batch-a-locality",
  slug: `${item.slug}-maths-home-tutor`,
  path: `/gurugram/${item.slug}-maths-home-tutor`,
  title: `Maths Home Tutor in ${item.label}, Gurugram`,
  h1: `Maths home tutor in ${item.label}, Gurugram`,
  localitySlug: item.slug,
  localityLabel: item.label,
  nearbyLocalitySlugs: item.nearby,
  corridor: item.corridor,
  schoolSignals: item.schoolSignals,
  localityNote: item.note,
  parentHubPath: "/maths-home-tutor-in-gurgaon",
  primaryKeyword: `maths home tutor in ${item.label.toLowerCase()} gurugram`,
  audience: "Gurugram parents and school students",
}));

export const batchAHubPage = {
  id: "batch-a-gurgaon-hub",
  group: "batch-a-hub",
  slug: "maths-home-tutor-in-gurgaon",
  path: "/maths-home-tutor-in-gurgaon",
  title: "Maths Home Tutor in Gurgaon",
  h1: "Maths home tutor in Gurgaon for school, board, and premium-corridor support",
  parentHubPath: "/maths-home-tutor",
  primaryKeyword: "maths home tutor in gurgaon",
  audience: "Gurugram parents and students",
  cluster: "Gurugram Local SEO",
};

export const batchASchoolPages = BATCH_A_SCHOOL_META.map((item) => {
  const locality = batchALocalityBySlug.get(item.localitySlug);

  return {
    id: `batch-a-school-${item.slug}`,
    group: "batch-a-school",
    slug: item.slug,
    path: `/${item.slug}`,
    title: item.title,
    h1: item.title,
    schoolName: item.schoolName,
    intentType: item.intentType,
    localitySlug: item.localitySlug,
    localityLabel: locality?.label ?? "Gurugram",
    localityPath: locality ? `/gurugram/${locality.slug}-maths-home-tutor` : "/city/gurugram",
    curriculumSignals: item.curriculumSignals,
    parentHubPath: batchAHubPage.path,
    primaryKeyword: `${item.intentType.toLowerCase()} maths home tutor for ${item.schoolName.toLowerCase()} gurugram`,
    audience: "Premium school students and parents",
    cluster: "Gurugram School Intent",
  };
});

export const batchARootSeoPages = [batchAHubPage, ...batchASchoolPages];

export const batchBRootSeoPages = BATCH_B_INTENT_META.map((item) => ({
  id: `batch-b-${item.slug}`,
  group: "batch-b-intent",
  slug: item.slug,
  path: `/${item.slug}`,
  title: item.title,
  h1: item.h1,
  boardSlug: item.boardSlug,
  boardLabel: item.boardLabel,
  classLevel: item.classLevel,
  intent: item.intent,
  parentHubPath: item.parentHubPath,
  primaryKeyword: item.primaryKeyword,
  audience: item.audience,
  cluster: item.cluster,
  focus: item.focus,
}));

export const recoveryRootSeoPages = [
  ...recoveryClassBoardPages,
  ...recoveryTopicBoardPages,
  ...recoveryExamSupportPages,
];

export const recoverySeoClusterPaths = [
  ...recoveryLocalityBoardPages.map((page) => page.path),
  ...recoveryRootSeoPages.map((page) => page.path),
  ...batchALocalityPages.map((page) => page.path),
  ...batchARootSeoPages.map((page) => page.path),
  ...batchBRootSeoPages.map((page) => page.path),
];

export const recoveryRouteCatalogRows = [
  ...recoveryLocalityBoardPages,
  ...recoveryRootSeoPages,
  ...batchALocalityPages,
  ...batchARootSeoPages,
  ...batchBRootSeoPages,
].map((page) => ({
  path: page.path,
  title: page.title,
  segment:
    page.group === "locality-board" || page.group === "batch-a-locality" || page.group === "batch-a-school"
      ? "Location"
      : page.group === "batch-b-intent"
        ? "Curriculum / Class"
      : page.group === "class-board"
        ? "Curriculum / Class"
        : page.group === "topic-board"
          ? "School Topic"
          : "Exam Support",
  cluster: page.cluster ?? page.boardLabel ?? titleCaseSlug(page.slug),
  pageType:
    page.group === "locality-board" || page.group === "batch-a-locality"
      ? "Location Service"
      : page.group === "batch-a-school"
        ? "School-Specific Service"
      : page.group === "batch-b-intent"
        ? page.intent?.includes("doubt")
          ? "Doubt Solving Page"
          : page.intent?.includes("revision")
            ? "Revision Page"
            : page.intent?.includes("online")
              ? "Online Tuition Page"
              : "Exam Intent Page"
      : page.group === "class-board"
        ? "Class Service"
        : page.group === "topic-board"
          ? "Topic Page"
          : "Service Page",
  keyword: page.primaryKeyword,
}));

export function getRecoveryBoardMeta(boardSlug) {
  return BOARD_META[boardSlug];
}

export function getRecoveryLocalityMeta(localitySlug) {
  return localityBySlug.get(localitySlug);
}

export function getBatchALocalityMeta(localitySlug) {
  return batchALocalityBySlug.get(localitySlug);
}

export function getBatchALocalityPaths(limit = BATCH_A_LOCALITY_META.length) {
  return batchALocalityPages.slice(0, limit).map((page) => page.path);
}

export function getRecoveryClassPaths(boardSlug) {
  return getBoardClassPaths(boardSlug);
}

export function getRecoveryTopicPaths(boardSlug) {
  return getTopicBoardPaths(boardSlug);
}

export function getRecoveryLocalityBoardPaths(boardSlug, limit = 5) {
  return LOCALITY_META.slice(0, limit).map((locality) => getLocalityBoardPath(locality.slug, boardSlug));
}
