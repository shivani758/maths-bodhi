import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
import getAjayVatsyayanPremiumTutorSchema, {
  AJAY_VATSYAYAN_TUTOR_CARD,
} from "../components/AjayVatsyayanPremiumTutorSchema";
import {
  BOARD_OPTIONS,
  CLASS_OPTIONS,
  SECTOR_OPTIONS,
  mergeFilterOptions,
} from "../constants/filterOptions";
import { useSiteData } from "../contexts/SiteDataContext";
import { getMathsHomeCards, mathsRouteMap } from "../data/mathsBoardPages";
import MainLayout from "../layouts/MainLayout";
import { listTutors } from "../services/tutorsService";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getHomepageSchema,
} from "../utils/schema";
import { buildWhatsAppUrl } from "../utils/whatsapp";

const INITIAL_VISIBLE_TUTORS = 6;
const TUTOR_LOAD_STEP = 6;
const MAX_VISIBLE_TUTORS = 50;

const GENERIC_FILTER_PARTS = new Set(["class", "math", "maths", "road", "sector", "tuition", "tutor"]);

const BOARD_SEARCH_ITEMS = [
  { label: "CBSE", route: "/cbse-maths-tuition" },
  { label: "ICSE", route: "/icse-maths-tuition" },
  { label: "ISC", route: "/isc-maths-tuition" },
  { label: "IGCSE", route: "/igcse-maths-tuition" },
  { label: "IB MYP", route: mathsRouteMap["ib/myp"] },
  { label: "IB DP", route: mathsRouteMap["ib/dp"] },
  { label: "JEE Main", route: "/jee-main-maths-coaching" },
  { label: "JEE Advanced", route: "/jee-advanced-maths-coaching" },
];

const CLASS_SEARCH_ITEMS = [
  ...Array.from({ length: 7 }, (_, index) => ({
    label: `Class ${index + 6}`,
    classLevel: `Class ${index + 6}`,
    route: `/class-${index + 6}-maths-tutor`,
  })),
];

const SERVICE_SEARCH_ITEMS = [
  { label: "Home tuition", mode: "Home Tuition", route: "/maths-home-tutor" },
  { label: "Online", mode: "Online", route: "/online-maths-home-tuition" },
  { label: "One-to-one", route: "/one-to-one-maths-tuition" },
  { label: "Weekend", route: "/weekend-maths-home-tutoring" },
  { label: "Doubt solving", route: "/regular-doubt-solving-help" },
  { label: "Worksheets", route: "/maths-worksheet-guidance" },
];

const TOPIC_SEARCH_ITEMS = [
  { label: "Algebra", topic: "Algebra", route: "/algebra-tutor" },
  { label: "Geometry", topic: "Geometry", route: "/geometry-tutor" },
  { label: "Trigonometry", topic: "Trigonometry", route: "/trigonometry-tutor" },
  { label: "Calculus", topic: "Calculus", route: "/calculus-tutor" },
  { label: "Probability", topic: "Probability", route: "/probability-tutor" },
  { label: "Statistics", topic: "Statistics", route: "/statistics-tutor" },
  { label: "Coordinate geometry", topic: "Coordinate Geometry", route: "/coordinate-geometry-tutor" },
  { label: "Functions", topic: "Functions", route: "/functions-tutor" },
];

const EXAM_SEARCH_ITEMS = [
  { label: "Board revision", route: "/board-exam-revision-support" },
  { label: "Exam practice", route: "/exam-ready-practice-sessions" },
  { label: "Revision plan", route: "/focused-revision-planning" },
  { label: "JEE coaching", route: "/jee-maths-coaching" },
  { label: "Foundation", route: "/maths-foundation-program" },
  { label: "Concept repair", route: "/concept-strengthening-sessions" },
];

function slugifyPathSegment(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const DEFAULT_LOCAL_SEARCH_ITEMS = [
  "Sector 56",
  "Sector 57",
  "Sector 54",
  "Golf Course Road",
  "Sohna Road",
  "DLF Phase 4",
  "DLF Phase 5",
  "Sushant Lok 1",
].map((sectorLabel) => ({
  label: sectorLabel,
  ariaLabel: `Maths home tutor in ${sectorLabel}`,
  sectorLabel,
  route: `/gurugram/${slugifyPathSegment(sectorLabel)}`,
}));

const SCHOOL_CONTEXT_EXAMPLES = [
  {
    key: "school-the-shri-ram-aravali",
    locality: "Aravali and Golf Course Road corridor",
    school: "The Shri Ram School Aravali",
    support:
      "Families around this corridor often look for premium maths home tutors who can support board expectations, regular worksheets, strong written methods, and consistent revision. Maths Bodhi helps match students with experienced tutors for CBSE, ICSE, IGCSE, IB, and advanced maths goals.",
    chips: ["School corridor", "Board fit", "Weekly practice"],
  },
  {
    key: "school-heritage-xperiential",
    locality: "Sector 62 and Golf Course Extension",
    school: "Heritage Xperiential",
    support:
      "Parents in this area often need maths support that respects project work, conceptual learning, school pace, and regular doubt clearing. Maths Bodhi focuses on personal attention, confidence building, and curriculum-aware tutoring without making unsupported school affiliation claims.",
    chips: ["Extension Road", "Concept clarity", "Doubt clearing"],
  },
  {
    key: "school-shiv-nadar",
    locality: "Golf Course Extension Road",
    school: "Shiv Nadar School",
    support:
      "Families commonly compare locality convenience, school timing, and whether the tutor can guide deeper problem-solving, Olympiad-style thinking, and regular revision. Maths Bodhi supports students who need both school maths clarity and higher-order mathematical reasoning.",
    chips: ["School timing", "Revision", "Problem solving"],
  },
  {
    key: "school-dps-sector-45",
    locality: "Sector 45 and South City",
    school: "DPS Sector 45",
    support:
      "A practical reference for families asking about CBSE maths home tuition, homework correction, chapter tests, pre-board preparation, and board-year routines. Maths Bodhi helps students move from doubt-solving to structured marks improvement.",
    chips: ["Sector 45", "Homework", "Tests"],
  },
  {
    key: "school-scottish-high",
    locality: "Sector 57 and Sushant Lok",
    school: "Scottish High",
    support:
      "Helpful for families comparing international-school pace, written method, class level, and home-tuition convenience. Maths Bodhi can support IGCSE, IB MYP, IB DP, and board-aligned mathematics with experienced tutors.",
    chips: ["Sushant Lok", "Method clarity", "Home tuition"],
  },
  {
    key: "school-lotus-valley",
    locality: "Sector 50 and South City 2",
    school: "Lotus Valley",
    support:
      "Parents around this corridor often want a maths tutor who can keep school classwork, worksheets, exam practice, and revision moving together. Maths Bodhi focuses on regularity, personal attention, and measurable improvement.",
    chips: ["Sector 50", "Worksheets", "Exam practice"],
  },
  {
    key: "school-gd-goenka",
    locality: "Sohna Road and Golf Course Extension",
    school: "GD Goenka",
    support:
      "Useful for families balancing school schedule, travel convenience, and the student’s current maths confidence. Maths Bodhi helps match tutors for regular maths tuition, board support, crash courses, and advanced preparation.",
    chips: ["Sohna Road", "Schedule", "Confidence"],
  },
];

const HOME_FALLBACK_SECTOR_PAGES = [
  {
    slug: "sector-54",
    citySlug: "gurugram",
    route: "/gurugram/sector-54",
    sectorLabel: "Sector 54",
    subtitle:
      "Golf Course Road access with strong relevance for CBSE, IB, IGCSE, JEE, and premium-school maths home tuition support from verified experienced tutors.",
    landmarks: ["Golf Course Road", "DLF Phase 5"],
    nearbySchools: ["The Shri Ram School Aravali", "Scottish High"],
  },
  {
    slug: "sector-56",
    citySlug: "gurugram",
    route: "/gurugram/sector-56",
    sectorLabel: "Sector 56",
    subtitle:
      "A high-demand Gurugram pocket for maths home tutors, female maths tutors, IB support, IGCSE support, CBSE board preparation, and JEE foundation learning.",
    landmarks: ["Golf Course Extension", "Sector 55"],
    nearbySchools: ["Scottish High", "Shiv Nadar School"],
  },
  {
    slug: "sector-57",
    citySlug: "gurugram",
    route: "/gurugram/sector-57",
    sectorLabel: "Sector 57",
    subtitle:
      "Useful for weekday maths home tuition around Sushant Lok 3, Mayfield Garden, and Extension Road, especially for board exams, Olympiad maths, and personal attention.",
    landmarks: ["Sushant Lok 3", "Mayfield Garden"],
    nearbySchools: ["Scottish High", "Lotus Valley"],
  },
  {
    slug: "golf-course-road",
    citySlug: "gurugram",
    route: "/gurugram/golf-course-road",
    sectorLabel: "Golf Course Road",
    subtitle:
      "A premium Gurugram corridor for families comparing experienced maths tutors, senior faculty, IB and IGCSE maths experts, JEE maths support, and verified home tuition.",
    landmarks: ["DLF Phase 1", "Sector 54"],
    nearbySchools: ["The Shri Ram School Aravali", "Scottish High"],
  },
  {
    slug: "sohna-road",
    citySlug: "gurugram",
    route: "/gurugram/sohna-road",
    sectorLabel: "Sohna Road",
    subtitle:
      "A practical corridor for school-paced maths support, CBSE and ICSE board preparation, regular after-school routines, and crash courses for mathematics.",
    landmarks: ["South City 2", "Sector 49"],
    nearbySchools: ["GD Goenka", "Lotus Valley"],
  },
  {
    slug: "dlf-phase-4",
    citySlug: "gurugram",
    route: "/gurugram/dlf-phase-4",
    sectorLabel: "DLF Phase 4",
    subtitle:
      "A central Gurugram route for families who want locality convenience, board-aware maths tutoring, personal attention, and experienced home tuition support.",
    landmarks: ["Galleria", "Sushant Lok"],
    nearbySchools: ["The Shri Ram School Aravali", "DPS Sector 45"],
  },
];

const INTENT_SECTIONS = [
  {
    title: "Board-specialised maths tutor matching",
    description:
      "Maths Bodhi helps Gurugram families begin with the student’s exact curriculum: CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced, or Maths Olympiad. This keeps the tutor shortlist aligned with the way mathematics is taught, assessed, revised, and practised for that academic route.",
  },
  {
    title: "Personalised support for Class 6 to 12 and JEE",
    description:
      "A Class 6 learner, a Class 10 board student, an IB DP student, and a JEE Advanced aspirant need very different pacing, depth, worksheets, and problem-solving practice. Maths Bodhi focuses on personal attention, concept clarity, marks improvement, and confidence-building rather than one-size-fits-all maths tuition.",
  },
  {
    title: "Verified local maths tutors across Gurugram",
    description:
      "Once the board and class are clear, Maths Bodhi narrows the shortlist by Gurugram sector, school corridor, home or online preference, and tutor profile. Families can request verified, highly experienced, senior, female, top-university, IIT, or PhD-level maths tutors depending on the student’s comfort and goal.",
  },
];

const NEXT_STEP_POINTS = [
  {
    title: "Start with the student’s maths goal",
    description:
      "The first discussion should cover current marks, weak chapters, school board, upcoming tests, and whether the goal is confidence building, 95%+ performance, JEE readiness, Olympiad preparation, or a crash course before exams.",
  },
  {
    title: "Choose the right tutor profile",
    description:
      "Parents can request a maths home tutor, online maths tutor, female maths tutor, senior faculty member, JEE maths expert, IB or IGCSE specialist, or a patient tutor for special learning needs and personal attention.",
  },
  {
    title: "Build a practical improvement plan",
    description:
      "After the first matching conversation, Maths Bodhi helps create a clear plan for concept clarity, regular doubt solving, worksheet practice, test revision, crash-course preparation, and measurable marks improvement.",
  },
];

const homepageFaqs = [
  {
    question: "How do I choose the right maths home tutor in Gurugram?",
    answer:
      "Start with the student’s class, board, current marks, weak topics, and learning style. A Class 8 learner may need confidence and foundation repair, while a Class 10, Class 12, IB, IGCSE, or JEE student usually needs sharper exam planning and topic strategy. Maths Bodhi helps match students with verified maths tutors according to board, class, Gurugram locality, teaching mode, and academic goal.",
  },
  {
    question: "Which boards and exams does Maths Bodhi support?",
    answer:
      "Maths Bodhi provides specialised maths tuition for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, IIT JEE Main, IIT JEE Advanced, and Maths Olympiad preparation. Students can get support for school maths, board exams, international curriculum mathematics, competitive exam problem-solving, and crash courses for Class 6 to 12 and JEE maths.",
  },
  {
    question: "Can I request a female, senior, or highly experienced maths tutor?",
    answer:
      "Yes. Parents can request verified maths home tutors, female maths tutors, senior faculty, highly experienced educators, tutors from top universities, IIT-background tutors, and PhD-level mathematics experts depending on the student’s comfort, academic pressure, and long-term goal.",
  },
  {
    question: "Do you help students who need special attention in maths?",
    answer:
      "Yes. Maths Bodhi supports students who need patient explanation, slower pacing, repeated concept reinforcement, confidence building, or personalised maths learning. The goal is to reduce fear of mathematics, improve understanding, and create a safe one-to-one environment where the student can ask doubts freely.",
  },
  {
    question: "Do you provide maths crash courses in Gurugram?",
    answer:
      "Yes. Maths Bodhi provides maths crash courses for Class 6 to 12, CBSE, ICSE, ISC, IGCSE, IB, IIT JEE Main, and IIT JEE Advanced. Crash courses are useful for board exams, pre-boards, school tests, last-minute revision, JEE revision phases, and focused improvement before important assessments.",
  },
];

function getClassSortOrder(value) {
  const orderedClasses = [
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
    "IGCSE",
    "IB DP",
    "JEE Main",
  ];

  const index = orderedClasses.indexOf(value);
  return index === -1 ? orderedClasses.length + 1 : index;
}

function normalizeFilterValue(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function filterTextMatches(selectedValue, values = []) {
  const selected = normalizeFilterValue(selectedValue);
  const searchable = values.flatMap((value) => getList(Array.isArray(value) ? value : [value]));
  const normalizedSearchable = normalizeFilterValue(searchable.join(" "));

  return (
    normalizedSearchable.includes(selected) ||
    selected
      .split(" ")
      .some(
        (part) =>
          part.length > 2 && !GENERIC_FILTER_PARTS.has(part) && normalizedSearchable.includes(part),
      )
  );
}

function getList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getBlogTimestamp(blog) {
  const timestamp = new Date(blog.publishDate ?? blog.updatedAt ?? blog.createdAt ?? 0).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getFirstListValue(values, fallback) {
  return getList(values)[0] ?? fallback;
}

function isAjayVatsyayanTutor(tutor) {
  const identity = [tutor.id, tutor.slug, tutor.name]
    .map((value) => String(value ?? "").toLowerCase())
    .join(" ");

  return identity.includes("ajay-vatsyayan") || identity.includes("ajay vatsyayan");
}

function withAjayVatsyayanFallback(tutors = []) {
  return tutors.some(isAjayVatsyayanTutor)
    ? tutors
    : [AJAY_VATSYAYAN_TUTOR_CARD, ...tutors];
}

function toTutorCardData(tutor) {
  const boards = getList(tutor.boards);
  const classesSupported = getList(tutor.classesSupported);
  const topics = getList(tutor.topics);
  const localities = getList(tutor.localities?.length ? tutor.localities : tutor.sectors);
  const serviceModes = getList(tutor.serviceModes?.length ? tutor.serviceModes : tutor.mode);
  const schoolFocus = getList(tutor.schoolFocus);
  const experience = tutor.experience ?? tutor.experienceLabel ?? "";

  return {
    ...tutor,
    id: tutor.id,
    slug: tutor.slug,
    name: tutor.name,
    title: tutor.title ?? "Math Tutor",
    rating: String(tutor.rating ?? "0"),
    experience,
    board: getFirstListValue(boards, tutor.board ?? "Maths"),
    classLevel: getFirstListValue(classesSupported, tutor.classLevel ?? "Flexible support"),
    location: tutor.location ?? getFirstListValue(tutor.cities, "Gurugram"),
    sectors: localities,
    topics,
    price: tutor.startingFee ?? tutor.price ?? "Shared on enquiry",
    mode: serviceModes,
    schoolFocus,
    image: tutor.image || "/images/hero-maths-home.svg",
    imageAlt: tutor.imageAlt || `${tutor.name} maths tutor profile`,
    shortBio: tutor.shortBio ?? tutor.summary ?? "",
    summary: tutor.summary ?? tutor.shortBio ?? "",
  };
}

function buildLocalSearchItems(sectorPages) {
  const sectorItems = sectorPages.slice(0, 8).map((sector) => ({
    label: sector.sectorLabel,
    ariaLabel: `Maths home tutor in ${sector.sectorLabel}`,
    sectorLabel: sector.sectorLabel,
    route: sector.route ?? `/city/${sector.citySlug || "gurugram"}/${sector.slug}`,
  }));

  const mergedItems = [...DEFAULT_LOCAL_SEARCH_ITEMS, ...sectorItems];
  const seenLabels = new Set();

  return mergedItems.filter((item) => {
    const key = item.route ?? item.sectorLabel ?? item.label;

    if (seenLabels.has(key)) {
      return false;
    }

    seenLabels.add(key);
    return true;
  });
}

function buildPopularSearchGroups(sectorPages) {
  return [
    {
      title: "Boards",
      description: "Start with the curriculum or exam route before comparing tutors.",
      badge: "Curriculum",
      icon: "B",
      accentClassName: "from-blue-600 to-cyan-500",
      layoutClassName: "xl:col-span-2",
      items: BOARD_SEARCH_ITEMS,
    },
    {
      title: "Classes",
      description: "Jump to class-wise maths support from middle school to senior school.",
      badge: "Class level",
      icon: "6",
      accentClassName: "from-emerald-500 to-teal-500",
      layoutClassName: "xl:col-span-2",
      items: CLASS_SEARCH_ITEMS,
    },
    {
      title: "Gurugram Areas",
      description: "Open useful locality routes for home-tuition planning near school corridors.",
      badge: "Local",
      icon: "G",
      accentClassName: "from-amber-500 to-orange-500",
      layoutClassName: "xl:col-span-2",
      items: buildLocalSearchItems(sectorPages),
    },
    {
      title: "Service Types",
      description: "Choose the support format before narrowing by board, class, or locality.",
      badge: "Format",
      icon: "S",
      accentClassName: "from-violet-500 to-fuchsia-500",
      layoutClassName: "xl:col-span-2",
      items: SERVICE_SEARCH_ITEMS,
    },
    {
      title: "Topics",
      description: "Find route pages for common weak chapters and senior-school topics.",
      badge: "Concepts",
      icon: "T",
      accentClassName: "from-rose-500 to-pink-500",
      layoutClassName: "xl:col-span-2",
      items: TOPIC_SEARCH_ITEMS,
    },
    {
      title: "Exam Support",
      description: "Use these when the need is revision, exam practice, or foundation repair.",
      badge: "Revision",
      icon: "E",
      accentClassName: "from-slate-800 to-blue-700",
      layoutClassName: "xl:col-span-2",
      items: EXAM_SEARCH_ITEMS,
    },
  ];
}

function buildLocalContextCards(premiumSchools, sectorPages, tutors) {
  const schoolCards = premiumSchools.length
    ? premiumSchools.slice(0, 5).map((item) => ({
        key: `school-${item.id}`,
        eyebrow: item.locality,
        title: `Commonly requested maths support near ${item.school}`,
        description: item.support,
        note: `Popular for ${item.board} families in this area.`,
        chips: [item.board, item.locality],
      }))
    : SCHOOL_CONTEXT_EXAMPLES.map((item) => ({
        key: item.key,
        eyebrow: item.locality,
        title: `Commonly requested maths support near ${item.school}`,
        description: item.support,
        chips: item.chips,
      }));

  const localityCards = sectorPages.slice(0, 5).map((sector) => {
    const supportingBoards = [
      ...new Set(
        tutors
          .filter((tutor) => tutor.sectors?.includes(sector.sectorLabel))
          .map((tutor) => tutor.board)
          .filter(Boolean),
      ),
    ].slice(0, 2);

    return {
      key: `locality-${sector.slug}`,
      eyebrow: sector.sectorLabel,
      title: `Commonly requested maths support near ${sector.sectorLabel}`,
      description: sector.subtitle,
      note: `Popular for ${
        supportingBoards.length ? supportingBoards.join(" / ") : "one-to-one maths"
      } families in this area`,
      chips: [...(sector.nearbySchools ?? []).slice(0, 2), ...supportingBoards].slice(0, 3),
    };
  });

  return [...schoolCards, ...localityCards].slice(0, 10);
}

function Home() {
  const { siteData } = useSiteData();
  const { seo, home, contact, reviews, premiumSchools, sectorPages, blogs = [] } = siteData;
  const displaySectorPages = sectorPages.length ? sectorPages : HOME_FALLBACK_SECTOR_PAGES;

  const [apiTutors, setApiTutors] = useState([]);
  const [tutorsLoading, setTutorsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedBoard, setSelectedBoard] = useState("All Boards");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [visibleTutorCount, setVisibleTutorCount] = useState(INITIAL_VISIBLE_TUTORS);
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [visibleSectors, setVisibleSectors] = useState(6);
  const [openFaq, setOpenFaq] = useState(0);
  const sourceTutors = apiTutors.length ? apiTutors : siteData.tutors;
  const tutors = useMemo(
    () => withAjayVatsyayanFallback(sourceTutors),
    [sourceTutors],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadTutors() {
      setTutorsLoading(true);
      try {
        const data = await listTutors();
        if (isMounted) {
          setApiTutors(data.map((tutor) => toTutorCardData(tutor)));
        }
      } catch {
        if (isMounted) {
          setApiTutors([]);
        }
      } finally {
        if (isMounted) {
          setTutorsLoading(false);
        }
      }
    }

    loadTutors();

    return () => {
      isMounted = false;
    };
  }, []);

  const classOptions = useMemo(() => {
    const classes = [...new Set(tutors.map((tutor) => tutor.classLevel))].sort(
      (first, second) => getClassSortOrder(first) - getClassSortOrder(second),
    );

    return mergeFilterOptions(CLASS_OPTIONS, classes);
  }, [tutors]);

  const sectorOptions = useMemo(
    () =>
      mergeFilterOptions(SECTOR_OPTIONS, [
        ...displaySectorPages.map((sector) => sector.sectorLabel),
        ...tutors.flatMap((tutor) => tutor.sectors ?? []),
      ]),
    [displaySectorPages, tutors],
  );

  const boardOptions = useMemo(
    () =>
      mergeFilterOptions(BOARD_OPTIONS, [
        ...tutors.map((tutor) => tutor.board),
        ...tutors.flatMap((tutor) => tutor.boards ?? []),
      ]),
    [tutors],
  );

  const filteredTutors = useMemo(() => {
    const normalizedTopic = selectedTopic.toLowerCase();

    return tutors.filter((tutor) => {
      const classMatch =
        selectedClass === "All Classes" ||
        filterTextMatches(selectedClass, [
          tutor.classLevel,
          tutor.classesSupported,
          tutor.title,
          tutor.summary,
          tutor.board,
          tutor.boards,
        ]);
      const sectorMatch =
        selectedSector === "All Sectors" ||
        filterTextMatches(selectedSector, [
          tutor.sectors,
          tutor.localities,
          tutor.location,
          tutor.summary,
        ]);
      const boardMatch =
        selectedBoard === "All Boards" ||
        filterTextMatches(selectedBoard, [
          tutor.board,
          tutor.boards,
          tutor.title,
          tutor.summary,
          ...(tutor.topics ?? []),
          ...(tutor.schoolFocus ?? []),
        ]);
      const modeMatch =
        selectedMode === "All Modes" || tutor.mode.includes(selectedMode);
      const topicMatch =
        selectedTopic === "All Topics" ||
        [
          tutor.board,
          tutor.title,
          tutor.summary,
          ...(tutor.topics ?? []),
          ...(tutor.schoolFocus ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedTopic);

      return classMatch && sectorMatch && boardMatch && modeMatch && topicMatch;
    });
  }, [selectedBoard, selectedClass, selectedMode, selectedSector, selectedTopic, tutors]);

  useEffect(() => {
    setVisibleTutorCount(INITIAL_VISIBLE_TUTORS);
  }, [selectedBoard, selectedClass, selectedMode, selectedSector, selectedTopic]);

  const averageReviewRating = useMemo(() => {
    const ratings = reviews.map((review) => Number(review.rating)).filter(Number.isFinite);
    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    return ratings.length ? (total / ratings.length).toFixed(1) : "0.0";
  }, [reviews]);

  const tutorBoardCount = useMemo(() => {
    const boards = new Set(
      tutors
        .flatMap((tutor) => [tutor.board, ...getList(tutor.boards)])
        .map((board) => String(board ?? "").trim())
        .filter(Boolean),
    );

    return boards.size;
  }, [tutors]);

  const dynamicHomeStats = useMemo(
    () => [
      {
        value: String(sourceTutors.length),
        label: "Published tutor profiles in the public feed",
      },
      {
        value: String(reviews.length),
        label: "Approved parent reviews available publicly",
      },
      {
        value: String(sectorPages.length),
        label: "Live Gurugram locality pages from site data",
      },
      {
        value: String(tutorBoardCount),
        label: "Boards and exam tracks represented in tutor profiles",
      },
    ],
    [reviews.length, sectorPages.length, sourceTutors.length, tutorBoardCount],
  );

  const featuredBlogs = useMemo(
    () =>
      [...blogs]
        .filter((blog) => blog?.slug && blog?.title)
        .sort((first, second) => getBlogTimestamp(second) - getBlogTimestamp(first))
        .slice(0, 3),
    [blogs],
  );

  const popularSearchGroups = useMemo(
    () => buildPopularSearchGroups(displaySectorPages),
    [displaySectorPages],
  );
  const localContextCards = useMemo(
    () => buildLocalContextCards(premiumSchools, displaySectorPages, tutors),
    [premiumSchools, displaySectorPages, tutors],
  );
  const totalPopularSearches = useMemo(
    () => popularSearchGroups.reduce((sum, group) => sum + group.items.length, 0),
    [popularSearchGroups],
  );
  const cappedTutorMatches = useMemo(
    () => filteredTutors.slice(0, MAX_VISIBLE_TUTORS),
    [filteredTutors],
  );
  const visibleTutorCards = useMemo(
    () => cappedTutorMatches.slice(0, visibleTutorCount),
    [cappedTutorMatches, visibleTutorCount],
  );
  const canLoadMoreTutors = visibleTutorCount < cappedTutorMatches.length;
  const activeTutorFilters = useMemo(
    () =>
      [selectedClass, selectedBoard, selectedSector, selectedMode, selectedTopic].filter(
        (item) => !String(item).startsWith("All "),
      ),
    [selectedBoard, selectedClass, selectedMode, selectedSector, selectedTopic],
  );
  const whatsappUrl = buildWhatsAppUrl(
    contact.whatsappNumber,
    "Hello Maths Bodhi, I want help finding a maths home tutor in Gurugram.",
  );
  const mathsHomeCards = getMathsHomeCards();
  function scrollToTutorMatches() {
    if (typeof document === "undefined") {
      return;
    }

    document.getElementById("homepage-tutor-matches")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function resetTutorFilters() {
    setSelectedClass("All Classes");
    setSelectedBoard("All Boards");
    setSelectedSector("All Sectors");
    setSelectedMode("All Modes");
    setSelectedTopic("All Topics");
  }

  function applySearchChip(item) {
    if (item.classLevel) {
      setSelectedClass((current) =>
        current === item.classLevel ? "All Classes" : item.classLevel,
      );
    }

    if (item.mode) {
      setSelectedMode((current) => (current === item.mode ? "All Modes" : item.mode));
    }

    if (item.sectorLabel) {
      setSelectedSector((current) =>
        current === item.sectorLabel ? "All Sectors" : item.sectorLabel,
      );
    }

    if (item.topic) {
      setSelectedTopic((current) => (current === item.topic ? "All Topics" : item.topic));
    }

    scrollToTutorMatches();
  }

  const schema = useMemo(
    () =>
      [
        ...getHomepageSchema({
          name: siteData.brandName,
          description: seo.description,
          contact,
          image: "/images/hero-maths-home.svg",
        }),
        getBreadcrumbSchema({
          url: "/",
          items: [{ label: "Home", to: "/" }],
        }),
        getAjayVatsyayanPremiumTutorSchema(),
        getFAQSchema({
          url: "/",
          faqs: homepageFaqs,
        }),
      ],
    [
      contact,
      seo.description,
      siteData.brandName,
    ],
  );

  return (
    <MainLayout>
      <Seo
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonicalPath="/"
        imagePath="/images/hero-maths-home.svg"
        schema={schema}
      />
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .home-hero-entrance {
            animation: homeFadeSlide 700ms ease-out both;
          }

          .home-search-entrance {
            animation: homeFadeSlide 700ms ease-out both;
            animation-delay: 120ms;
          }

          @keyframes homeFadeSlide {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        .home-filter-select {
          min-height: 3.25rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 6.75L9 11.25L13.5 6.75' stroke='%230f172a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 0.95rem;
          padding-right: 2.9rem;
        }

        .home-filter-select::-ms-expand {
          display: none;
        }

        .home-filter-select option {
          font-size: 1rem;
          line-height: 1.5;
        }
      `}</style>

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="home-hero-entrance relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                {home.eyebrow}
              </span>

              <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl md:text-6xl">
                {home.heroTitle}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                Maths Bodhi is a specialised maths home tuition platform in Gurugram for CBSE,
                ICSE, ISC, IGCSE, IB MYP, IB DP, IIT JEE Main, IIT JEE Advanced, and Maths
                Olympiad learners. We connect families with verified, highly experienced,
                senior, female, top-university, IIT, and PhD-level maths tutors for personal
                attention, concept clarity, marks improvement, crash courses, and confident
                problem-solving from Class 6 to Class 12 and beyond.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  {
                    label: "Class 10 support",
                    to: "/class-10-maths-tutor",
                  },
                  {
                    label: "IB maths experts",
                    to: "/ib-maths-tuition",
                  },
                  {
                    label: "Sector 56 tutors",
                    to: "/gurugram/sector-56",
                  },
                  {
                    label: "Home tuition only",
                    to: "/maths-home-tutor",
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm motion-safe:hover:-translate-y-0.5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/book-free-demo-class"
                  className="w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-center font-semibold text-white shadow-lg shadow-blue-100 transition duration-200 hover:bg-blue-700 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] sm:w-auto"
                >
                  Book Free Maths Demo
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition duration-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] sm:w-auto"
                >
                  WhatsApp Maths Bodhi
                </a>
                <Link
                  to="/city/gurugram"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition duration-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01] sm:w-auto"
                >
                  Explore Gurugram Tutors
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["Maths Home Tutor", "/maths-home-tutor"],
                  ["CBSE Home Tuition", "/cbse-maths-tuition"],
                  ["Foundation", "/maths-foundation-program"],
                  ["Revision", "/maths-revision-program"],
                  ["Premium Schools", "/premium-school-maths-home-tutor"],
                  ["JEE Maths", "/jee-maths-coaching"],
                ].map(([label, to]) => (
                  <Link
                    key={to}
                    to={to}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition duration-200 hover:border-blue-200 hover:bg-white hover:shadow-sm motion-safe:hover:-translate-y-0.5"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dynamicHomeStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:border-blue-200 hover:shadow-md motion-safe:hover:-translate-y-1"
                  >
                    <p className="text-3xl font-bold text-slate-950">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Popular maths searches on this page
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore {totalPopularSearches}+ grouped search ideas for CBSE, ICSE, ISC,
                  IGCSE, IB, JEE, Olympiad maths, class-wise tutoring, Gurugram localities,
                  crash courses, female maths tutors, and personal one-to-one support.
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl shadow-sky-100">
              <img
                src="/images/hero-maths-home.svg"
                alt="Premium maths home tutoring dashboard illustration showing concept learning, progress tracking, and local Gurugram service coverage"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-auto w-full rounded-[24px] border border-slate-100 bg-slate-50"
              />

              <div className="mt-5 rounded-[24px] bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-950">
                  Find a verified maths home tutor faster
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Start with class, board, Gurugram sector, and teaching mode so the shortlist
                  matches the student’s maths level, exam pressure, learning style, and need for
                  personal attention.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Class or level
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(event) => setSelectedClass(event.target.value)}
                      className="home-filter-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      {classOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Board
                    </label>
                    <select
                      value={selectedBoard}
                      onChange={(event) => setSelectedBoard(event.target.value)}
                      className="home-filter-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      {boardOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Gurugram sector
                    </label>
                    <select
                      value={selectedSector}
                      onChange={(event) => setSelectedSector(event.target.value)}
                      className="home-filter-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      {sectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Teaching mode
                    </label>
                    <select
                      value={selectedMode}
                      onChange={(event) => setSelectedMode(event.target.value)}
                      className="home-filter-select w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    >
                      {["All Modes", "Home Tuition", "Online"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Tutor matches</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{filteredTutors.length}</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Average review</p>
                    <p className={`mt-1 font-bold text-slate-950 ${reviews.length ? "text-3xl" : "text-lg"}`}>
                      {reviews.length ? `${averageReviewRating}/5` : "No reviews yet"}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Live localities</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{sectorPages.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-5 py-16 sm:px-6">
          <div className="home-search-entrance mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle
                badge="Popular Maths Searches"
                title="Useful maths search paths parents use before choosing a tutor in Gurugram"
                subtitle="Parents can begin with CBSE, ICSE, ISC, IGCSE, IB, JEE, Olympiad maths, class level, locality, tutor profile, or crash-course requirement before requesting a personalised match."
                align="left"
              />
              <div className="max-w-sm rounded-[24px] border border-blue-100 bg-white/80 p-5 shadow-lg shadow-blue-100/50 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Parent shortcut panel
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use these links to explore board-specific, class-specific, topic-specific, and
                  locality-specific maths support without changing the page experience.
                </p>
              </div>
            </div>

            <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-6">
              {popularSearchGroups.map((group) => (
                <article
                  key={group.title}
                  className={`group flex h-full min-h-[23rem] min-w-0 flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm ring-1 ring-white transition duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60 motion-safe:hover:-translate-y-1 ${group.layoutClassName ?? ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${group.accentClassName} text-sm font-black text-white shadow-lg shadow-slate-200 transition duration-200 motion-safe:group-hover:scale-105`}
                      aria-hidden="true"
                    >
                      {group.icon}
                    </span>
                    <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {group.badge}
                    </span>
                  </div>

                  <div className="mt-5 min-w-0">
                    <h3 className="text-lg font-bold leading-7 text-slate-950">{group.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {group.description}
                    </p>
                  </div>

                  {group.items.length ? (
                    <div className="mt-5 flex flex-1 content-start flex-wrap gap-2">
                      {group.items.map((item) => {
                        const chipClassName =
                          "min-h-8 rounded-full border px-3 py-1.5 text-xs font-semibold leading-5 shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

                        if (item.route) {
                          return (
                            <Link
                              key={`${group.title}-${item.route}-${item.label}`}
                              to={item.route}
                              aria-label={item.ariaLabel ?? item.label}
                              className={`${chipClassName} border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-white motion-safe:hover:scale-[1.02]`}
                            >
                              {item.label}
                            </Link>
                          );
                        }

                        if (item.classLevel || item.mode || item.sectorLabel || item.topic) {
                          return (
                            <button
                              key={`${group.title}-${item.label}`}
                              type="button"
                              onClick={() => applySearchChip(item)}
                              className={`${chipClassName} border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 motion-safe:hover:scale-[1.02]`}
                            >
                              {item.label}
                            </button>
                          );
                        }

                        return (
                          <span
                            key={`${group.title}-${item.label}`}
                            className={`${chipClassName} border-slate-200 bg-slate-50 text-slate-600`}
                          >
                            {item.label}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="mt-5 rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-800">
                      Quick links will appear here as public navigation paths are added.
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="homepage-tutor-matches" className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  Filtered Tutor Results
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
                  Compare verified maths tutors for your board, class, sector, and goal
                </h2>
                <p
                  className="mt-3 max-w-3xl text-base leading-7 text-slate-600 md:text-lg"
                  aria-live="polite"
                >
                  {tutorsLoading
                    ? "Loading live tutor profiles from the backend."
                    : `Showing ${visibleTutorCards.length} of ${cappedTutorMatches.length} tutor${
                        cappedTutorMatches.length === 1 ? "" : "s"
                      } for ${
                        activeTutorFilters.length
                          ? activeTutorFilters.join(", ")
                          : "all maths classes, boards, Gurugram localities, teaching modes, and topics"
                      }.`}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                {activeTutorFilters.length ? (
                  <button
                    type="button"
                    onClick={resetTutorFilters}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                  >
                    Clear filters
                  </button>
                ) : null}
                <Link
                  to="/book-free-demo-class"
                  className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Request custom tutor matching
                </Link>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[selectedClass, selectedBoard, selectedSector, selectedMode, selectedTopic]
                .filter((item) => !item.startsWith("All "))
                .map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
            </div>

            {tutorsLoading ? (
              <div
                className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3"
                role="status"
                aria-label="Loading tutor cards"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={`tutor-loading-${index}`}
                    className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex animate-pulse items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-slate-100" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 w-2/3 rounded-full bg-slate-100" />
                        <div className="h-3 w-1/2 rounded-full bg-slate-100" />
                      </div>
                    </div>
                    <div className="mt-6 animate-pulse space-y-3">
                      <div className="h-3 rounded-full bg-slate-100" />
                      <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                      <div className="grid gap-3 pt-3 sm:grid-cols-3">
                        <div className="h-20 rounded-2xl bg-slate-100" />
                        <div className="h-20 rounded-2xl bg-slate-100" />
                        <div className="h-20 rounded-2xl bg-slate-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : visibleTutorCards.length ? (
              <>
                <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {visibleTutorCards.map((tutor, index) => (
                    <div
                      key={tutor.id ?? tutor.slug ?? `${tutor.name}-${index}`}
                      className="h-full [&>article]:h-full"
                    >
                      <TutorCard {...tutor} />
                    </div>
                  ))}
                </div>

                {cappedTutorMatches.length > INITIAL_VISIBLE_TUTORS ? (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    {canLoadMoreTutors ? (
                      <button
                        type="button"
                        onClick={() =>
                          setVisibleTutorCount((current) =>
                            Math.min(current + TUTOR_LOAD_STEP, cappedTutorMatches.length),
                          )
                        }
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                      >
                        Load more tutors
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setVisibleTutorCount(INITIAL_VISIBLE_TUTORS)}
                        className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                      >
                        Show fewer tutors
                      </button>
                    )}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">No maths tutors matched these filters yet</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  These dropdowns include useful Gurugram search defaults for CBSE, ICSE, ISC,
                  IGCSE, IB, JEE, Olympiad maths, local sectors, and learning modes. Tutor cards
                  only appear when a real profile matches the selected filters.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={resetTutorFilters}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                  >
                    Reset filters
                  </button>
                  <Link
                    to="/book-free-demo-class"
                    className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                  >
                    Book a demo
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                  >
                    WhatsApp tutor matching
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Browse Maths by Board"
              title="Choose the maths board, curriculum, or exam path that matches the student"
              subtitle="Maths Bodhi supports CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced, and Maths Olympiad preparation with curriculum-aware tutors."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/subjects/maths"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
              >
                Open Maths by Board Hub
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mathsHomeCards.map((subject) => (
                <Link
                  key={subject.to ?? subject.title}
                  to={subject.to}
                  className="group rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
                    {subject.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{subject.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {subject.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {subject.tags.map((topic, index) => (
                      <span
                        key={`${subject.to}-${topic}-${index}`}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                    Open board page
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="School and Local Context"
              title="Maths home tuition across Gurugram school corridors and local clusters"
              subtitle="These cards highlight areas, school corridors, and residential pockets where families commonly ask for verified maths home tutors, board support, JEE maths guidance, and personal attention."
            />
            <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-6 text-slate-500">
              School names are included only as local planning context. Maths Bodhi is not
              officially affiliated with these schools and does not claim school endorsement.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {localContextCards.length ? (
                localContextCards.map((item) => (
                  <article
                    key={item.key}
                    className="flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-4 text-lg font-bold leading-snug text-slate-950 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                    {item.note ? (
                      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm font-semibold leading-6 text-slate-900">{item.note}</p>
                      </div>
                    ) : null}
                    {item.chips?.length ? (
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        {item.chips.map((chip) => (
                          <span
                            key={`${item.key}-${chip}`}
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))
              ) : (
                <article className="rounded-[24px] border border-dashed border-slate-200 bg-white p-6 shadow-sm md:col-span-2 xl:col-span-3">
                  <h3 className="text-xl font-bold text-slate-950">Useful Gurugram school and locality context</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    Families can discuss the student's school area, nearby sector, board, weak chapters, and preferred schedule before choosing a tutor route. School names are used only as local planning context.
                  </p>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                How Maths Bodhi Matches Tutors
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
                Maths home tuition in Gurugram with personal attention and clear goals
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                Maths Bodhi helps families move from a broad search into a focused shortlist by
                matching board, class level, Gurugram locality, tutor profile, and learning goal.
                The aim is not only tuition, but concept clarity, confidence, marks improvement,
                exam readiness, and stronger problem-solving habits.
              </p>

              <div className="mt-8 space-y-4">
                {INTENT_SECTIONS.map((section, index) => (
                  <article
                    key={`${section.title}-${index}`}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                  >
                    <h3 className="text-xl font-bold text-slate-950">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{section.description}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <img
                src="/images/tutor-premium-school.svg"
                alt="Maths tutor matching flow for Gurugram families comparing board, class, and locality fit"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[24px] border border-slate-200 bg-white object-cover"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Board",
                    text: "Start with CBSE, ICSE, ISC, IGCSE, IB, JEE, or Olympiad maths so the tutor shortlist fits the exact curriculum.",
                  },
                  {
                    label: "Class",
                    text: "Match the tutor to the student’s class, pace, weak chapters, confidence level, and revision needs.",
                  },
                  {
                    label: "Location",
                    text: "Shortlist by Gurugram sector, school corridor, home tuition, online support, or flexible maths learning preference.",
                  },
                ].map((step) => (
                  <div key={step.label} className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{step.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.96fr_1.04fr] lg:items-center">
            <div className="order-2 rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm lg:order-1">
              <img
                src="/images/tutor-classroom-progress.svg"
                alt="Maths progress illustration showing planning, regular review, and demo-class readiness"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[24px] border border-slate-200 bg-slate-50 object-cover"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">Tutor fit before commitment</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Families can compare experience, board fit, timing, gender preference, and teaching mode before booking a demo.
                  </p>
                </div>
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">Clear improvement plan</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The first discussion stays focused on current marks, weak topics, target percentage, and the right maths demo plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionTitle
                badge="After You Shortlist"
                title="A practical next step for marks improvement, confidence, and exam readiness"
                subtitle="Once the tutor fit looks right, the next conversation becomes focused on the student’s current maths level, target score, weak chapters, and weekly learning plan."
                align="left"
              />

              <div className="mt-7 space-y-4">
                {NEXT_STEP_POINTS.map((point, index) => (
                  <article
                    key={`${point.title}-${index}`}
                    className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-slate-950">{point.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{point.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Find Tutors Near You"
              title="Browse Gurugram sectors for maths home tuition near you"
              subtitle="Parents can explore sector-level maths tutor availability for CBSE, ICSE, ISC, IGCSE, IB, JEE, Olympiad maths, crash courses, and one-to-one personal attention."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {displaySectorPages.slice(0, visibleSectors).map((sector, index) => (
                  <Link
                    key={`${sector.citySlug ?? "gurugram"}-${sector.slug ?? sector.sectorLabel}-${index}`}
                    to={sector.route ?? `/city/${sector.citySlug || "gurugram"}/${sector.slug}`}
                    className="group rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                          Gurugram Locality
                        </p>
                        <h3 className="mt-3 text-2xl font-bold text-slate-950">
                          {sector.sectorLabel}
                        </h3>
                      </div>
                      <div className="w-fit rounded-2xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
                        {getList(sector.nearbySchools).length} school zones
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{sector.subtitle}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {getList(sector.landmarks).slice(0, 2).map((landmark, landmarkIndex) => (
                        <span
                          key={`${sector.slug}-${landmark}-${landmarkIndex}`}
                          className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                        >
                          {landmark}
                        </span>
                      ))}
                      {getList(sector.nearbySchools)[0] ? (
                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                          {getList(sector.nearbySchools)[0]}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm font-medium text-slate-600">
                        Maths home tuition and online support
                      </p>
                      <p className="text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                        Explore sector
                      </p>
                    </div>
                  </Link>
                ))}
            </div>

            {displaySectorPages.length > 6 ? (
              <div className="mt-8 flex justify-center">
                {visibleSectors < displaySectorPages.length ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleSectors((current) => Math.min(current + 3, displaySectorPages.length))
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Load more sectors
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleSectors(6)}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Show fewer sectors
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="What Gurugram Parents Say"
              title="Parent feedback from Gurugram families choosing focused maths support"
              subtitle={
                reviews.length
                  ? `Showing ${Math.min(visibleReviews, reviews.length)} of ${reviews.length} review cards from families comparing maths tutor fit, board support, personal attention, and progress.`
                  : "Parent feedback will appear here once public reviews are available."
              }
            />

            {reviews.length ? (
              <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                {reviews.slice(0, visibleReviews).map((review, index) => (
                  <article
                    key={review.id ?? `${review.parent}-${review.sector}-${index}`}
                    className="group flex h-full flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {Number(review.rating).toFixed(1)}/5
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {review.board}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-950">
                      {review.parent}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-500">
                      {review.sector} | {review.school}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-700">{review.quote}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-10 rounded-[24px] border border-dashed border-slate-200 bg-white p-6 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Reviews are not published yet</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Parent feedback cards will show here after reviews are available in the public content feed.
                </p>
              </div>
            )}

            {reviews.length > 6 ? (
              <div className="mt-8 flex justify-center">
                {visibleReviews < reviews.length ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleReviews((current) => Math.min(current + 6, reviews.length))
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Load more reviews
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleReviews(6)}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Show fewer reviews
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </section>

        {featuredBlogs.length ? (
          <section className="bg-white px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                badge="Maths Guides"
                title="Recent maths guides for parents comparing tutor fit"
                subtitle="Published guides from Maths Bodhi appear here when they are available in the public content feed."
                align="left"
              />

              <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                {featuredBlogs.map((blog, index) => (
                  <Link
                    key={blog.id ?? blog.slug ?? `${blog.title}-${index}`}
                    to={`/blogs/${blog.slug}`}
                    className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex flex-wrap gap-2">
                      {(blog.tags ?? []).slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={`${blog.slug}-${tag}-${tagIndex}`}
                          className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-semibold text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-4 text-xl font-bold leading-7 text-slate-950">
                      {blog.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                      {blog.summary ?? blog.excerpt ?? blog.description ?? "Read this Maths Bodhi guide for practical maths tutor planning."}
                    </p>
                    <p className="mt-auto pt-5 text-sm font-semibold text-blue-700 transition group-hover:translate-x-1">
                      Read guide
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <SectionTitle
                badge="Questions Parents Ask"
                title="Questions parents ask before choosing a maths home tutor in Gurugram"
                subtitle="These answers help parents compare tutor experience, board support, crash courses, special attention, female tutor requests, and personalised maths learning."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {homepageFaqs.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={`${item.question}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <h3 className="text-base font-semibold text-slate-950">
                          {item.question}
                        </h3>
                        <span className="text-xl font-bold text-blue-700">
                          {isOpen ? "-" : "+"}
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-slate-100 px-6 py-5">
                          <p className="leading-7 text-slate-600">{item.answer}</p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
                Clear Next Step
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Start with the maths support path that fits your student’s goal
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Book a demo for CBSE, ICSE, ISC, IGCSE, IB, JEE, Olympiad maths, crash-course
                revision, special attention, female tutor support, or personalised maths home
                tuition in Gurugram.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Link
                  to="/student-login"
                  className="rounded-2xl bg-white px-5 py-4 text-center font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Student Dashboard Access
                </Link>
                <Link
                  to="/tutor-login"
                  className="rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Tutor Dashboard Access
                </Link>
                <Link
                  to="/admin-login"
                  className="rounded-2xl border border-white/20 px-5 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Admin Panel Login
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-blue-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-blue-500"
                >
                  WhatsApp {contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default Home;
