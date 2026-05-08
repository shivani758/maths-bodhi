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

const localityBySlug = new Map(LOCALITY_META.map((item) => [item.slug, item]));

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

export const recoveryRootSeoPages = [
  ...recoveryClassBoardPages,
  ...recoveryTopicBoardPages,
  ...recoveryExamSupportPages,
];

export const recoverySeoClusterPaths = [
  ...recoveryLocalityBoardPages.map((page) => page.path),
  ...recoveryRootSeoPages.map((page) => page.path),
];

export const recoveryRouteCatalogRows = [
  ...recoveryLocalityBoardPages,
  ...recoveryRootSeoPages,
].map((page) => ({
  path: page.path,
  title: page.title,
  segment:
    page.group === "locality-board"
      ? "Location"
      : page.group === "class-board"
        ? "Curriculum / Class"
        : page.group === "topic-board"
          ? "School Topic"
          : "Exam Support",
  cluster: page.cluster ?? page.boardLabel ?? titleCaseSlug(page.slug),
  pageType:
    page.group === "locality-board"
      ? "Location Service"
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

export function getRecoveryClassPaths(boardSlug) {
  return getBoardClassPaths(boardSlug);
}

export function getRecoveryTopicPaths(boardSlug) {
  return getTopicBoardPaths(boardSlug);
}

export function getRecoveryLocalityBoardPaths(boardSlug, limit = 5) {
  return LOCALITY_META.slice(0, limit).map((locality) => getLocalityBoardPath(locality.slug, boardSlug));
}
