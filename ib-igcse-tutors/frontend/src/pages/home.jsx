import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
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
import { getTutorProfilePath } from "../utils/tutorRoutes";
import { buildWhatsAppUrl } from "../utils/whatsapp";

const INITIAL_VISIBLE_TUTORS = 6;
const TUTOR_LOAD_STEP = 6;
const MAX_VISIBLE_TUTORS = 50;

const GENERIC_FILTER_PARTS = new Set(["class", "math", "maths", "road", "sector", "tuition", "tutor"]);

const BOARD_SEARCH_ITEMS = [
  { label: "CBSE maths tutor", route: "/cbse-maths-tuition" },
  { label: "ICSE maths tutor", route: "/icse-maths-tuition" },
  { label: "ISC maths tutor", route: "/isc-maths-tuition" },
  { label: "IGCSE maths tutor", route: "/igcse-maths-tuition" },
  { label: "IB maths tutor", route: "/ib-maths-tuition" },
  { label: "IB PYP maths tutor", route: mathsRouteMap["ib/pyp"] },
  { label: "IB MYP maths tutor", route: mathsRouteMap["ib/myp"] },
  { label: "IB DP maths tutor", route: mathsRouteMap["ib/dp"] },
  { label: "IB AA HL maths tutor", route: mathsRouteMap["ib/dp/aa-hl"] },
  { label: "IB AA SL maths tutor", route: mathsRouteMap["ib/dp/aa-sl"] },
  { label: "IB AI HL maths tutor", route: mathsRouteMap["ib/dp/ai-hl"] },
  { label: "IB AI SL maths tutor", route: mathsRouteMap["ib/dp/ai-sl"] },
  { label: "JEE Main maths tutor", route: "/jee-main-maths-coaching" },
  { label: "JEE Advanced maths tutor", route: "/jee-advanced-maths-coaching" },
];

const CLASS_SEARCH_ITEMS = [
  ...Array.from({ length: 7 }, (_, index) => ({
    label: `Class ${index + 6} maths tutor`,
    classLevel: `Class ${index + 6}`,
    route: `/class-${index + 6}-maths-tutor`,
  })),
  { label: "Class 10 CBSE maths home tutor", classLevel: "Class 10", route: "/class-10-cbse-maths-home-tutor" },
  { label: "Class 12 IB maths home tutor", classLevel: "Class 12", route: "/class-12-ib-maths-home-tutor" },
  { label: "Class 10 IGCSE maths home tutor", classLevel: "Class 10", route: "/class-10-igcse-maths-home-tutor" },
];

const SERVICE_SEARCH_ITEMS = [
  { label: "Home maths tutor", mode: "Home Tuition", route: "/maths-home-tutor" },
  { label: "Online maths tutor", mode: "Online", route: "/online-maths-home-tuition" },
  { label: "One-to-one maths tutor", route: "/one-to-one-maths-tuition" },
  { label: "After-school maths support", route: "/after-school-maths-support" },
  { label: "Weekend maths home tutoring", route: "/weekend-maths-home-tutoring" },
  { label: "Board exam revision support", route: "/board-exam-revision-support" },
  { label: "Board exam maths revision", route: "/board-exam-maths-revision" },
  { label: "JEE maths problem solving", route: "/jee-maths-problem-solving" },
  { label: "Last-minute maths revision", route: "/maths-last-minute-revision" },
  { label: "Concept strengthening sessions", route: "/concept-strengthening-sessions" },
  { label: "Regular doubt-solving help", route: "/regular-doubt-solving-help" },
  { label: "Maths worksheet guidance", route: "/maths-worksheet-guidance" },
  { label: "Exam-ready practice sessions", route: "/exam-ready-practice-sessions" },
  { label: "Focused revision planning", route: "/focused-revision-planning" },
  { label: "Flexible home or online support", route: "/flexible-home-online-maths-support" },
];

const TOPIC_SEARCH_ITEMS = [
  { label: "Algebra tutor", topic: "Algebra", route: "/algebra-tutor" },
  { label: "CBSE algebra tutor", topic: "Algebra", route: "/cbse-algebra-tutor" },
  { label: "Geometry tutor", topic: "Geometry", route: "/geometry-tutor" },
  { label: "Trigonometry tutor", topic: "Trigonometry", route: "/trigonometry-tutor" },
  { label: "IGCSE trigonometry tutor", topic: "Trigonometry", route: "/igcse-trigonometry-tutor" },
  { label: "Calculus tutor", topic: "Calculus", route: "/calculus-tutor" },
  { label: "IB calculus tutor", topic: "Calculus", route: "/ib-calculus-tutor" },
  { label: "Statistics tutor", topic: "Statistics", route: "/statistics-tutor" },
  { label: "Probability tutor", topic: "Probability", route: "/probability-tutor" },
  { label: "Coordinate geometry tutor", topic: "Coordinate Geometry", route: "/coordinate-geometry-tutor" },
  { label: "Quadratic equations tutor", topic: "Quadratic Equations", route: "/quadratic-equations-tutor" },
  { label: "Functions tutor", topic: "Functions", route: "/functions-tutor" },
  { label: "Number systems tutor", topic: "Number Systems", route: "/number-systems-tutor" },
  { label: "Mensuration tutor", topic: "Mensuration", route: "/mensuration-tutor" },
  { label: "Reasoning and problem-solving tutor", topic: "Problem Solving", route: "/reasoning-problem-solving-tutor" },
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
  label: `Maths home tutor in ${sectorLabel}`,
  sectorLabel,
  route: `/city/gurugram/${slugifyPathSegment(sectorLabel)}`,
}));

const SCHOOL_CONTEXT_EXAMPLES = [
  {
    key: "school-the-shri-ram-aravali",
    locality: "Aravali and Golf Course Road corridor",
    school: "The Shri Ram School Aravali",
    support:
      "Families searching around this corridor often ask for steady worksheet follow-through, clearer written method, and a weekly maths rhythm that fits school routines.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["School corridor", "Board fit", "Weekly practice"],
  },
  {
    key: "school-heritage-xperiential",
    locality: "Sector 62 and Golf Course Extension",
    school: "Heritage Xperiential",
    support:
      "Useful context when parents want maths support that respects project work, school pace, and regular doubt clearing without making unsupported school claims.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["Extension Road", "Concept clarity", "Doubt clearing"],
  },
  {
    key: "school-shiv-nadar",
    locality: "Golf Course Extension Road",
    school: "Shiv Nadar School",
    support:
      "Parents commonly compare locality convenience, school timing, and whether the tutor can help with deeper problem-solving and consistent revision.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["School timing", "Revision", "Problem solving"],
  },
  {
    key: "school-dps-sector-45",
    locality: "Sector 45 and South City",
    school: "DPS Sector 45",
    support:
      "A practical reference for families asking about school-paced maths, homework correction, test preparation, and board-year routines.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["Sector 45", "Homework", "Tests"],
  },
  {
    key: "school-scottish-high",
    locality: "Sector 57 and Sushant Lok",
    school: "Scottish High",
    support:
      "Helpful context for families comparing international-school pace, written method, class level, and home-tuition convenience.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["Sushant Lok", "Method clarity", "Home tuition"],
  },
  {
    key: "school-lotus-valley",
    locality: "Sector 50 and South City 2",
    school: "Lotus Valley",
    support:
      "Parents around this corridor often want a tutor who can keep classwork, worksheets, and exam practice moving together.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["Sector 50", "Worksheets", "Exam practice"],
  },
  {
    key: "school-gd-goenka",
    locality: "Sohna Road and Golf Course Extension",
    school: "GD Goenka",
    support:
      "Useful for families balancing school schedule, travel convenience, and the student's current maths confidence.",
    note: "School name used for local planning context only; no official affiliation is claimed.",
    chips: ["Sohna Road", "Schedule", "Confidence"],
  },
];

const HOME_FALLBACK_SECTOR_PAGES = [
  {
    slug: "sector-54",
    citySlug: "gurugram",
    route: "/gurugram/sector-54",
    sectorLabel: "Sector 54",
    subtitle: "Golf Course Road access with strong relevance for premium-school and board-aware maths support.",
    landmarks: ["Golf Course Road", "DLF Phase 5"],
    nearbySchools: ["The Shri Ram School Aravali", "Scottish High"],
  },
  {
    slug: "sector-56",
    citySlug: "gurugram",
    route: "/gurugram/sector-56",
    sectorLabel: "Sector 56",
    subtitle: "A mixed-demand Gurugram pocket for CBSE, IB, IGCSE, and JEE maths home tuition searches.",
    landmarks: ["Golf Course Extension", "Sector 55"],
    nearbySchools: ["Scottish High", "Shiv Nadar School"],
  },
  {
    slug: "sector-57",
    citySlug: "gurugram",
    route: "/gurugram/sector-57",
    sectorLabel: "Sector 57",
    subtitle: "Useful for weekday home-tuition planning around Sushant Lok 3, Mayfield Garden, and Extension Road access.",
    landmarks: ["Sushant Lok 3", "Mayfield Garden"],
    nearbySchools: ["Scottish High", "Lotus Valley"],
  },
  {
    slug: "golf-course-road",
    citySlug: "gurugram",
    route: "/gurugram/golf-course-road",
    sectorLabel: "Golf Course Road",
    subtitle: "A corridor route for families comparing premium-school access, board fit, and maths tutor availability.",
    landmarks: ["DLF Phase 1", "Sector 54"],
    nearbySchools: ["The Shri Ram School Aravali", "Scottish High"],
  },
  {
    slug: "sohna-road",
    citySlug: "gurugram",
    route: "/gurugram/sohna-road",
    sectorLabel: "Sohna Road",
    subtitle: "A practical corridor for school-paced maths support, board preparation, and regular after-school routines.",
    landmarks: ["South City 2", "Sector 49"],
    nearbySchools: ["GD Goenka", "Lotus Valley"],
  },
  {
    slug: "dlf-phase-4",
    citySlug: "gurugram",
    route: "/gurugram/dlf-phase-4",
    sectorLabel: "DLF Phase 4",
    subtitle: "A central Gurugram route for families who want locality convenience and board-aware maths support together.",
    landmarks: ["Galleria", "Sushant Lok"],
    nearbySchools: ["The Shri Ram School Aravali", "DPS Sector 45"],
  },
];

const INTENT_SECTIONS = [
  {
    title: "Board-based matching",
    description:
      "Families can begin with CBSE, IGCSE, IB, or JEE so the shortlist reflects how maths is taught, assessed, and revised.",
  },
  {
    title: "Class-based support",
    description:
      "A Class 6 learner, a Class 10 board student, and a Class 12 student all need different pacing, explanation style, and weekly maths structure.",
  },
  {
    title: "Local tutor availability",
    description:
      "Once board and class are clear, Maths Bodhi narrows the shortlist by Gurugram sector, school corridor, and whether the family wants home or online support.",
  },
];

const NEXT_STEP_POINTS = [
  {
    title: "Start with the current maths pressure",
    description:
      "The first conversation should cover recent scores, the chapters causing the most friction, and what kind of improvement the family expects.",
  },
  {
    title: "Choose the right support format",
    description:
      "Parents can decide between home tuition, online support, or a flexible mix that fits school timings and after-school commitments.",
  },
  {
    title: "Book the first useful session",
    description:
      "Once the tutor fit looks right, the next step is a practical demo or planning call rather than another vague shortlist.",
  },
];

const homepageFaqs = [
  {
    question: "How do I choose the right maths tutor for my child's class and board?",
    answer:
      "Start with class, then narrow by board, sector, and teaching mode. A Class 8 learner usually needs confidence and concept repair, while a Class 10, IB, IGCSE, or JEE learner often needs sharper exam structure and topic strategy.",
  },
  {
    question: "Do you provide maths home tutors for premium schools in Gurugram?",
    answer:
      "Yes. The premium school section is for families who want tutors already familiar with the pace and expectations of schools near Golf Course Road, Golf Course Extension Road, and other major Gurugram corridors.",
  },
  {
    question: "Can I request home tuition only in my sector?",
    answer:
      "Yes. The sector cards are meant to help parents check locality relevance quickly before moving into a demo or WhatsApp enquiry.",
  },
  {
    question: "What happens after I submit a student or tutor form?",
    answer:
      "The dashboard creates a structured WhatsApp handoff to the Maths Bodhi number, so the next conversation can start quickly without extra portal friction.",
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

function toAbsoluteUrl(siteUrl, path) {
  if (!path) {
    return siteUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

function getList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function getFirstListValue(values, fallback) {
  return getList(values)[0] ?? fallback;
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
    label: `Maths home tutor in ${sector.sectorLabel}`,
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
      description: "Open board pages directly where Maths Bodhi already has matching routes.",
      badge: "Popular",
      icon: "📘",
      accentClassName: "from-blue-600 to-cyan-500",
      layoutClassName: "xl:col-span-3",
      items: BOARD_SEARCH_ITEMS,
    },
    {
      title: "Classes 6 to 12",
      description: "Use these quick picks to narrow the tutor list by class level.",
      badge: "Parent picks",
      icon: "🎓",
      accentClassName: "from-emerald-500 to-teal-500",
      layoutClassName: "xl:col-span-3",
      items: CLASS_SEARCH_ITEMS,
    },
    {
      title: "Local Areas",
      description: "See the Gurugram sectors and school corridors families often search first.",
      badge: "Quick picks",
      icon: "📍",
      accentClassName: "from-amber-500 to-orange-500",
      layoutClassName: "xl:col-span-2",
      items: buildLocalSearchItems(sectorPages),
    },
    {
      title: "Service Types",
      description: "Useful phrases parents use when the support format matters as much as the board.",
      badge: "Quick picks",
      icon: "🏠",
      accentClassName: "from-violet-500 to-fuchsia-500",
      layoutClassName: "xl:col-span-2",
      items: SERVICE_SEARCH_ITEMS,
    },
    {
      title: "Topics",
      description: "Quickly spotlight tutors around the maths area that needs more attention.",
      badge: "Popular",
      icon: "📊",
      accentClassName: "from-rose-500 to-pink-500",
      layoutClassName: "xl:col-span-2",
      items: TOPIC_SEARCH_ITEMS,
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
        note: `Popular for ${item.board} families in this area. No official school affiliation is claimed.`,
        chips: [item.board, item.locality],
      }))
    : SCHOOL_CONTEXT_EXAMPLES.map((item) => ({
        key: item.key,
        eyebrow: item.locality,
        title: `Commonly requested maths support near ${item.school}`,
        description: item.support,
        note: item.note,
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
  const { seo, home, contact, reviews, premiumSchools, sectorPages } = siteData;
  const displaySectorPages = sectorPages.length ? sectorPages : HOME_FALLBACK_SECTOR_PAGES;

  const [apiTutors, setApiTutors] = useState([]);
  const [tutorsLoading, setTutorsLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedBoard, setSelectedBoard] = useState("All Boards");
  const [selectedMode, setSelectedMode] = useState("All Modes");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [visibleTutorCount, setVisibleTutorCount] = useState(INITIAL_VISIBLE_TUTORS);
  const [visibleReviews, setVisibleReviews] = useState(10);
  const [visibleSectors, setVisibleSectors] = useState(6);
  const [openFaq, setOpenFaq] = useState(0);
  const tutors = apiTutors.length ? apiTutors : siteData.tutors;

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
    const total = reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    return reviews.length ? (total / reviews.length).toFixed(1) : "0.0";
  }, [reviews]);

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
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.in";

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
    () => [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteData.brandName,
        url: siteUrl,
        logo: `${siteUrl}/assets/mathsbodhi-logo.png`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: contact.phoneDisplay,
            contactType: "customer support",
            areaServed: "Gurugram",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: `${siteData.brandName} Gurugram`,
        description: seo.description,
        telephone: contact.phoneDisplay,
        email: contact.email,
        areaServed: ["Gurugram", "Gurgaon"],
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.streetAddress,
          addressLocality: contact.city,
          addressRegion: contact.state,
          addressCountry: contact.country,
        },
        image: `${siteUrl}/images/hero-maths-home.svg`,
      },
      ...(visibleTutorCards.length
        ? [
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Featured maths tutors in Gurugram",
              itemListElement: visibleTutorCards.map((tutor, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${siteUrl}${getTutorProfilePath(tutor)}`,
                item: {
                  "@type": "Person",
                  name: tutor.name,
                  jobTitle: "Math Tutor",
                  description: tutor.shortBio ?? tutor.summary,
                  image: toAbsoluteUrl(siteUrl, tutor.image),
                  knowsAbout: [tutor.board, ...(tutor.topics ?? []).slice(0, 3)],
                  worksFor: "Maths Bodhi",
                },
              })),
            },
          ]
        : []),
    ],
    [
      contact.city,
      contact.email,
      contact.phoneDisplay,
      contact.streetAddress,
      seo.description,
      siteData.brandName,
      siteUrl,
      visibleTutorCards,
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
                {home.heroSubtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  {
                    label: "Class 10 support",
                    action: () => {
                      setSelectedClass("Class 10");
                      setSelectedBoard("All Boards");
                    },
                  },
                  {
                    label: "IB maths experts",
                    action: () => {
                      setSelectedClass("IB DP");
                      setSelectedBoard("IB");
                    },
                  },
                  {
                    label: "Sector 56 tutors",
                    action: () => setSelectedSector("Sector 56"),
                  },
                  {
                    label: "Home tuition only",
                    action: () => setSelectedMode("Home Tuition"),
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:border-blue-200 hover:text-blue-700 hover:shadow-sm motion-safe:hover:-translate-y-0.5"
                  >
                    {item.label}
                  </button>
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
                {home.stats.map((item) => (
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
                  Explore {totalPopularSearches}+ grouped search ideas below to open board pages
                  or narrow the tutor list by class, locality, support type, and topic.
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
                  Find the right maths tutor faster
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Start with class, then narrow by board, sector, and mode so the shortlist feels
                  relevant from the first click.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Class or level
                    </label>
                    <select
                      value={selectedClass}
                      onChange={(event) => setSelectedClass(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
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
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
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
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
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
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500"
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
                    <p className="mt-1 text-3xl font-bold text-slate-950">{averageReviewRating}/5</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Priority sectors</p>
                    <p className="mt-1 text-3xl font-bold text-slate-950">{displaySectorPages.length}</p>
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
                title="Useful maths search paths parents commonly use before choosing a tutor"
                subtitle="Board pages open directly where a route already exists, while the other chips safely narrow the homepage tutor shortlist."
                align="left"
              />
              <div className="max-w-sm rounded-[24px] border border-blue-100 bg-white/80 p-5 shadow-lg shadow-blue-100/50 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Parent shortcut panel
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use these links as navigation filters, not tutor result claims.
                </p>
              </div>
            </div>

            <div className="mt-8 grid auto-rows-fr gap-4 lg:grid-cols-2 xl:grid-cols-6">
              {popularSearchGroups.map((group) => (
                <article
                  key={group.title}
                  className={`group flex h-full flex-col rounded-[24px] border border-white/80 bg-white/95 p-4 shadow-lg shadow-slate-200/70 ring-1 ring-slate-100 transition duration-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/70 motion-safe:hover:-translate-y-1 sm:p-5 ${group.layoutClassName ?? ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${group.accentClassName} text-xl shadow-lg shadow-slate-200 transition duration-200 motion-safe:group-hover:scale-105`}
                      aria-hidden="true"
                    >
                      {group.icon}
                    </span>
                    <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {group.badge}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-lg font-bold leading-7 text-slate-950">{group.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                      {group.description}
                    </p>
                  </div>

                  {group.items.length ? (
                    <div className="mt-4 flex flex-1 content-start flex-wrap gap-2">
                      {group.items.map((item) => {
                        const chipClassName =
                          "rounded-full border px-2.5 py-1.5 text-[11px] font-semibold leading-5 shadow-sm transition duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md";

                        if (item.route) {
                          return (
                            <Link
                              key={item.label}
                              to={item.route}
                              className={`${chipClassName} border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-200 hover:bg-white motion-safe:hover:scale-[1.02]`}
                            >
                              {item.label}
                            </Link>
                          );
                        }

                        if (item.classLevel || item.mode || item.sectorLabel || item.topic) {
                          return (
                            <button
                              key={item.label}
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
                            key={item.label}
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
                  Compare tutors that match your current filters
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
                          : "all classes, boards, local areas, support types, and topics"
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
                .map((item) => (
                  <span
                    key={item}
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
                  {visibleTutorCards.map((tutor) => (
                    <div key={tutor.id} className="h-full [&>article]:h-full">
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
                <h3 className="text-xl font-bold text-slate-950">No tutors matched these filters yet</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  These dropdowns include useful Gurugram search defaults, but tutor cards only
                  appear when a real profile matches the selected filters.
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
              title="Choose the maths board or programme that matches the student's academic route"
              subtitle="Start with the curriculum first, then move into the exact maths page that fits the student's level more cleanly."
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
                  key={subject.title}
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
                    {subject.tags.map((topic) => (
                      <span
                        key={topic}
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
              title="Commonly requested maths support across Gurugram school corridors and local clusters"
              subtitle="These cards stay practical: they highlight areas and school clusters families often ask about, without making claims beyond the current content."
            />

            <div className="mt-10 -mx-6 overflow-x-auto px-6 pb-2">
              <div className="flex min-w-full gap-5">
                {localContextCards.length ? (
                  localContextCards.map((item) => (
                    <article
                      key={item.key}
                      className="min-w-[280px] max-w-[320px] flex-1 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-4 text-xl font-bold leading-tight text-slate-950 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-900">{item.note}</p>
                      </div>
                      {item.chips?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
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
                  <article className="min-w-[280px] max-w-[420px] rounded-[24px] border border-dashed border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-950">Useful Gurugram school and locality context</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      Families can discuss the student's school area, nearby sector, board, weak chapters, and preferred schedule before choosing a tutor route. School names are used only as local planning context.
                    </p>
                  </article>
                )}
              </div>
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
                Maths home tuition in Gurugram, simplified
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                Maths Bodhi helps families move from a broad search into a clearer shortlist by
                matching board, class level, and locality before the first conversation even
                begins.
              </p>

              <div className="mt-8 space-y-4">
                {INTENT_SECTIONS.map((section) => (
                  <article
                    key={section.title}
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
                    text: "Start with CBSE, IGCSE, IB, or JEE so the tutor shortlist fits the curriculum.",
                  },
                  {
                    label: "Class",
                    text: "Match the tutor to the student's level, pace, and revision needs.",
                  },
                  {
                    label: "Location",
                    text: "Shortlist by sector, school corridor, and home or online preference.",
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
                  <h3 className="text-xl font-bold text-slate-950">Practical shortlisting</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Families can compare tutor fit, timing, and teaching mode before committing to the next step.
                  </p>
                </div>
                <div className="rounded-[24px] bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">Clear first conversation</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The first discussion stays focused on class needs, current chapters, and the right demo plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <SectionTitle
                badge="After You Shortlist"
                title="A clearer next step for parents, students, and weekly schedules"
                subtitle="Once the tutor fit looks right, the next conversation becomes practical rather than vague."
                align="left"
              />

              <div className="mt-7 space-y-4">
                {NEXT_STEP_POINTS.map((point) => (
                  <article
                    key={point.title}
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
              title="Browse local Gurugram sectors where maths home tuition demand is strongest"
              subtitle="A more professional locality view for parents who want fast sector-level clarity before booking a demo."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {displaySectorPages.slice(0, visibleSectors).map((sector) => (
                  <Link
                    key={sector.slug}
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
                      {getList(sector.landmarks).slice(0, 2).map((landmark) => (
                        <span
                          key={landmark}
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
                        Home tuition and online support
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
              title="Real-looking parent feedback from Gurugram sectors with more honest rating spread"
              subtitle={
                reviews.length
                  ? `Showing ${Math.min(visibleReviews, reviews.length)} of ${reviews.length} review cards. Ratings are intentionally mixed instead of repeating a flat 5.0 on every card.`
                  : "Parent feedback will appear here once public reviews are available."
              }
            />

            {reviews.length ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {reviews.slice(0, visibleReviews).map((review) => (
                  <article
                    key={review.id}
                    className="group rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
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

            {reviews.length > 10 ? (
              <div className="mt-8 flex justify-center">
                {visibleReviews < reviews.length ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleReviews((current) => Math.min(current + 10, reviews.length))
                    }
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Load 10 more reviews
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setVisibleReviews(10)}
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Show fewer reviews
                  </button>
                )}
              </div>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <SectionTitle
                badge="Questions Parents Ask"
                title="Questions parents usually click on before choosing a maths tutor"
                subtitle="The answers stay hidden until the parent opens the question, which keeps the section easier to scan."
                align="left"
              />

              <div className="mt-8 space-y-4">
                {homepageFaqs.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={item.question}
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
                Start with the path that matches your role and your maths need
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Book a demo, open the student dashboard, onboard as a tutor, or message the team directly.
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
