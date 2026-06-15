import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
import { SeoContentSections } from "../components/seo/SeoContentSections";
import MathsReviewCard from "../components/maths/MathsReviewCard";
import TutorCard from "../components/TutorCard";
import {
  BOARD_OPTIONS,
  CLASS_OPTIONS,
  SECTOR_OPTIONS,
  mergeFilterOptions,
  normalizeFilterOption,
  stripAllFilterOption,
} from "../constants/filterOptions";
import { useSiteData } from "../contexts/SiteDataContext";
import { mathsRouteMap } from "../data/mathsBoardPages";
import MainLayout from "../layouts/MainLayout";
import { getCityPage } from "../services/siteLookup";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
  getWebPageSchema,
} from "../utils/schema";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

const GURUGRAM_CITY_ALIASES = ["gurugram", "gurgaon"];
const FALLBACK_GURUGRAM_SECTORS = stripAllFilterOption(SECTOR_OPTIONS);
const FALLBACK_GURUGRAM_BOARDS = [
  "CBSE",
  "ICSE",
  "ISC",
  "IB MYP",
  "IB DP",
  "IGCSE",
  "JEE Main",
  "JEE Advanced",
  "Maths Olympiad",
];
const CITY_TUTOR_LIMIT = 6;
const INITIAL_VISIBLE_SECTORS = 6;
const SECTOR_LOAD_STEP = 6;

const BOARD_ROUTE_LINKS = [
  {
    label: "Maths by Board",
    to: mathsRouteMap.hub,
    description:
      "Compare CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP and competitive maths pathways before selecting class or locality.",
  },
  {
    label: "CBSE",
    to: "/cbse-maths-tuition",
    description:
      "NCERT-focused maths support for school tests, board preparation, marks improvement and 95%+ score planning.",
  },
  {
    label: "IB",
    to: mathsRouteMap.ib,
    description:
      "Concept-led maths support for IB MYP and IB DP students who need application, reasoning and personal mentoring.",
  },
  {
    label: "IGCSE",
    to: mathsRouteMap.igcse,
    description:
      "Cambridge-style maths preparation for Core, Extended and Additional Mathematics with structured paper practice.",
  },
];

const CLASS_ROUTE_LINKS = [
  {
    label: "Class 10",
    to: "/gurugram/class-10-maths-home-tutor",
    description:
      "Board-focused maths support for chapter clarity, worksheet correction, exam practice and confident revision.",
  },
  {
    label: "Class 12",
    to: "/gurugram/class-12-maths-home-tutor",
    description:
      "Senior maths mentoring for calculus, algebra, probability, board exams, JEE readiness and high-score planning.",
  },
];

function normalizeSlug(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizeText(value) {
  return normalizeFilterOption(value).toLowerCase();
}

function getList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function toSectorSlug(label) {
  return normalizeSlug(label)
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toFallbackSector(label) {
  return {
    slug: toSectorSlug(label),
    label,
    summary: `Explore ${label} for verified maths home tutors in Gurugram who can support CBSE, ICSE, ISC, IGCSE, IB, JEE and Olympiad learning goals with personal attention.`,
  };
}

function normalizeSectorEntry(sector) {
  if (typeof sector === "string") {
    return toFallbackSector(sector);
  }

  const label = sector?.label ?? sector?.sectorLabel ?? sector?.title ?? "";
  const slug = sector?.slug ?? toSectorSlug(label);

  return {
    ...sector,
    slug,
    label,
    summary:
      sector?.summary ??
      sector?.subtitle ??
      `Explore ${label} for verified maths home tutors in Gurugram who can support CBSE, ICSE, ISC, IGCSE, IB, JEE and Olympiad learning goals with personal attention.`,
  };
}

function createFallbackGurugramPage() {
  return {
    slug: "gurugram",
    aliases: ["gurgaon"],
    label: "Gurugram",
    headline: "Maths Home Tutor in Gurugram",
    subtitle:
      "Find verified and highly experienced maths home tutors in Gurugram for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced and Maths Olympiad preparation. Maths Bodhi helps families shortlist senior, female, PhD-level and top-university maths tutors for personal attention, marks improvement, special child support, crash courses and 95%+ academic goals.",
    coverageAreas: FALLBACK_GURUGRAM_SECTORS,
    servedBoards: FALLBACK_GURUGRAM_BOARDS,
    topSectors: FALLBACK_GURUGRAM_SECTORS.map(toFallbackSector),
    cta: {
      label: "Book Free Demo",
      description:
        "Share the class, board, sector, current maths concern and target score so Maths Bodhi can suggest the right tutor path.",
    },
    isFallback: true,
  };
}

function normalizeCityPage(page) {
  const topSectors = getList(page.topSectors).map(normalizeSectorEntry).filter((sector) => sector.label);

  return {
    ...page,
    slug: page.slug || "gurugram",
    aliases: getList(page.aliases),
    label: page.label || "Gurugram",
    headline: page.headline || "Maths Home Tutor in Gurugram",
    subtitle:
      page.subtitle ||
      "Find verified maths home tutors in Gurugram for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced and Maths Olympiad preparation with personal attention, marks improvement planning and board-specific guidance.",
    coverageAreas: getList(page.coverageAreas).length
      ? getList(page.coverageAreas)
      : FALLBACK_GURUGRAM_SECTORS,
    servedBoards: getList(page.servedBoards).length
      ? getList(page.servedBoards)
      : FALLBACK_GURUGRAM_BOARDS,
    topSectors: topSectors.length ? topSectors : FALLBACK_GURUGRAM_SECTORS.map(toFallbackSector),
    cta: {
      label: page.cta?.label || "Book Free Demo",
      description:
        page.cta?.description ||
        "Share the class, board, sector, current maths concern and target score so Maths Bodhi can suggest the right tutor path.",
    },
    isFallback: Boolean(page.isFallback),
  };
}

function resolveCityPage(siteData, city) {
  const cmsPage = getCityPage(siteData, city);

  if (cmsPage) {
    return normalizeCityPage(cmsPage);
  }

  if (GURUGRAM_CITY_ALIASES.includes(normalizeSlug(city))) {
    return normalizeCityPage(createFallbackGurugramPage());
  }

  return null;
}

function valuesMatchFilter(selectedValue, allValue, values) {
  if (selectedValue === allValue) {
    return true;
  }

  const selected = normalizeText(selectedValue);

  return getList(values).some((value) => {
    const candidate = normalizeText(value);
    return candidate === selected || candidate.includes(selected) || selected.includes(candidate);
  });
}

function getTutorSectors(tutor) {
  return [
    ...getList(tutor.sectors),
    ...getList(tutor.localities),
  ];
}

function getTutorBoards(tutor) {
  return [tutor.board, ...getList(tutor.boards)].filter(Boolean);
}

function getTutorClasses(tutor) {
  return [tutor.classLevel, ...getList(tutor.classesSupported)].filter(Boolean);
}

function tutorMatchesCity(tutor, page) {
  const cityAliases = [page.slug, page.label, ...getList(page.aliases), "gurugram", "gurgaon"]
    .map(normalizeText)
    .filter(Boolean);
  const tutorCities = [tutor.location, ...getList(tutor.cities)].map(normalizeText).filter(Boolean);
  const tutorSectors = getTutorSectors(tutor).map(normalizeText);
  const pageSectors = page.topSectors.map((sector) => normalizeText(sector.label));

  return (
    tutorCities.some((city) =>
      cityAliases.some((alias) => city === alias || city.includes(alias) || alias.includes(city)),
    ) || tutorSectors.some((sector) => pageSectors.includes(sector))
  );
}

function sectorMatchesCity(locality, page) {
  const cityAliases = [page.slug, ...getList(page.aliases), "gurugram", "gurgaon"].map(normalizeSlug);
  const localityCities = [locality.citySlug, ...getList(locality.cityAliases)].map(normalizeSlug);

  return localityCities.some((city) => cityAliases.includes(city));
}

function getSupportedSectorPath(siteData, page, sector) {
  const matchedSector = siteData.sectorPages.find(
    (locality) => normalizeSlug(locality.slug) === normalizeSlug(sector.slug) && sectorMatchesCity(locality, page),
  );

  return matchedSector ? `/city/${matchedSector.citySlug || page.slug}/${matchedSector.slug}` : "";
}

function toCityTutorCard(tutor) {
  return {
    ...tutor,
    title: tutor.title ?? "Maths Tutor",
    rating: String(tutor.rating ?? "0"),
    experience: tutor.experience ?? tutor.experienceLabel ?? "Experience shared on enquiry",
    board: tutor.board ?? getTutorBoards(tutor)[0] ?? "Maths",
    classLevel: tutor.classLevel ?? getTutorClasses(tutor)[0] ?? "Flexible support",
    sectors: getTutorSectors(tutor),
    topics: getList(tutor.topics),
    price: tutor.price ?? tutor.startingFee ?? "Shared on enquiry",
    mode: getList(tutor.mode?.length ? tutor.mode : tutor.serviceModes),
    schoolFocus: getList(tutor.schoolFocus),
    image: tutor.image || "/images/hero-maths-home.svg",
    imageAlt: tutor.imageAlt || `${tutor.name} Maths Bodhi maths tutor profile`,
    summary: tutor.summary ?? tutor.shortBio ?? "",
  };
}

function CityPage() {
  const { city } = useParams();
  const { siteData } = useSiteData();
  const page = useMemo(() => resolveCityPage(siteData, city), [city, siteData]);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedBoard, setSelectedBoard] = useState("All Boards");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [visibleSectorCount, setVisibleSectorCount] = useState(INITIAL_VISIBLE_SECTORS);
  const isGurugramPage = page
    ? [page.slug, page.label, ...getList(page.aliases)]
        .map(normalizeSlug)
        .some((value) => GURUGRAM_CITY_ALIASES.includes(value))
    : false;
  const h1 = isGurugramPage ? "Maths Home Tutor in Gurugram" : page?.headline;

  const cityClassOptions = useMemo(
    () =>
      mergeFilterOptions(
        CLASS_OPTIONS,
        siteData.tutors.flatMap((tutor) => getTutorClasses(tutor)),
      ),
    [siteData.tutors],
  );

  const cityBoardOptions = useMemo(
    () =>
      mergeFilterOptions(
        BOARD_OPTIONS,
        [
          ...(page?.servedBoards ?? []),
          ...siteData.tutors.flatMap((tutor) => getTutorBoards(tutor)),
        ],
      ),
    [page?.servedBoards, siteData.tutors],
  );

  const citySectorOptions = useMemo(
    () =>
      mergeFilterOptions(
        SECTOR_OPTIONS,
        [
          ...(page?.topSectors ?? []).map((sector) => sector.label),
          ...siteData.tutors.flatMap((tutor) => getTutorSectors(tutor)),
        ],
      ),
    [page?.topSectors, siteData.tutors],
  );

  const cityTutors = useMemo(() => {
    if (!page) {
      return [];
    }

    return siteData.tutors.filter((tutor) => tutorMatchesCity(tutor, page));
  }, [page, siteData.tutors]);

  const filteredTutors = useMemo(
    () =>
      cityTutors.filter(
        (tutor) =>
          valuesMatchFilter(selectedClass, "All Classes", getTutorClasses(tutor)) &&
          valuesMatchFilter(selectedBoard, "All Boards", getTutorBoards(tutor)) &&
          valuesMatchFilter(selectedSector, "All Sectors", getTutorSectors(tutor)),
      ),
    [cityTutors, selectedBoard, selectedClass, selectedSector],
  );

  const visibleTutors = useMemo(
    () => filteredTutors.slice(0, CITY_TUTOR_LIMIT).map(toCityTutorCard),
    [filteredTutors],
  );
  const cityReviews = useMemo(() => {
    if (!page) {
      return [];
    }

    const pageSectorLabels = page.topSectors.map((sector) => normalizeText(sector.label));

    return siteData.reviews
      .filter((review) => {
        if (isGurugramPage) {
          return true;
        }

        const reviewSector = normalizeText(review.sector ?? review.locality);
        return pageSectorLabels.some((sectorLabel) => reviewSector.includes(sectorLabel));
      })
      .slice(0, 3);
  }, [isGurugramPage, page, siteData.reviews]);
  const cappedVisibleSectorCount = Math.min(visibleSectorCount, page?.topSectors.length ?? 0);
  const visibleSectors = useMemo(
    () => (page?.topSectors ?? []).slice(0, cappedVisibleSectorCount),
    [cappedVisibleSectorCount, page?.topSectors],
  );
  const hasMoreSectors = Boolean(page && cappedVisibleSectorCount < page.topSectors.length);

  const cityWhatsAppUrl = useMemo(
    () =>
      buildWhatsAppUrl(
        siteData.contact.whatsappNumber,
        `Hello Maths Bodhi, I am looking for a verified maths home tutor in ${
          page?.label ?? "Gurugram"
        }. Class: ${selectedClass}. Board: ${selectedBoard}. Sector: ${selectedSector}. Goal: marks improvement, personal attention, board preparation, JEE maths, Olympiad or special learning support.`,
      ),
    [page?.label, selectedBoard, selectedClass, selectedSector, siteData.contact.whatsappNumber],
  );

  function scrollToTutorMatches() {
    if (typeof document === "undefined") {
      return;
    }

    document.getElementById("city-tutor-matches")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleSectorFilter(label) {
    setSelectedSector(label);
    scrollToTutorMatches();
  }

  if (!page) {
    return <NotFound />;
  }

  const canonicalPath = `/city/${page.slug}`;
  const citySeoContent = {
    intro: {
      eyebrow: "Local tutor guide",
      title: `Maths home tutor support in ${page.label}`,
      paragraphs: [
        `${page.label} families can use this page to compare maths tutor routes by board, class, sector, and home tuition fit before asking for a shortlist.`,
        "The goal is to make the first conversation practical: class level, board, school timing, weak chapters, target score, locality, and whether home or online support is better.",
      ],
    },
    whyChoose: {
      title: `Why local context matters in ${page.label}`,
      items: [
        {
          title: "Travel and timing",
          description:
            "Regular home tuition works best when tutor availability fits school hours, commute time, and the student's weekly rhythm.",
        },
        {
          title: "Board and class fit",
          description:
            "CBSE, IB, IGCSE, JEE, and senior-school maths need different depth, paper practice, and revision planning.",
        },
        {
          title: "Tutor shortlist quality",
          description:
            "A useful shortlist should reflect the student's current confidence, topic gaps, preferred mode, and family schedule.",
        },
      ],
    },
    whoItHelps: {
      title: `Who this ${page.label} page is for`,
      paragraphs: [
        "This page is for parents comparing maths home tuition near their area and students who need a more consistent plan for school maths, board exams, or advanced preparation.",
      ],
    },
    howItWorks: {
      title: "How Maths Bodhi uses city and sector details",
      steps: [
        {
          title: "Choose the area",
          description:
            "Start with the city or sector so the tutor shortlist stays realistic for home tuition and weekly scheduling.",
        },
        {
          title: "Add board and class",
          description:
            "Share the student's board, class, weak chapters, and exam calendar so the match is not just locality-based.",
        },
        {
          title: "Confirm the next step",
          description:
            "Use a demo or WhatsApp conversation to check tutor fit, mode, timing, and the learning plan.",
        },
      ],
    },
    localContext: {
      title: `${page.label} locality and sector fit`,
      paragraphs: [
        `Popular ${page.label} searches usually combine area convenience with class, board, and topic pressure. Nearby sectors help families compare home tuition practicality before committing to a routine.`,
      ],
      items: page.topSectors.slice(0, 3).map((sector) => ({
        title: sector.label,
        description: sector.summary,
      })),
    },
    faq: [
      {
        question: `How should parents choose a maths tutor in ${page.label}?`,
        answer:
          "Start with the student's board, class, weak chapters, target score, school timing, and preferred learning mode. Locality should support consistency, not replace academic fit.",
      },
      {
        question: "Can the same enquiry cover home tuition and online maths support?",
        answer:
          "Yes. Families can share both preferences, then decide whether home tuition, online support, or a hybrid plan is more practical for the student.",
      },
      {
        question: "Why do board and class filters matter on a city page?",
        answer:
          "A Class 10 CBSE student, an IB DP learner, and a JEE aspirant need different teaching depth, practice rhythm, and exam planning.",
      },
    ],
    relatedLinks: [
      ...BOARD_ROUTE_LINKS,
      ...CLASS_ROUTE_LINKS,
      ...page.topSectors.slice(0, 3).map((sector) => ({
        label: sector.label,
        to: getSupportedSectorPath(siteData, page, sector) || canonicalPath,
        description: sector.summary,
      })),
    ].slice(0, 6),
  };
  const serviceSchema = getServiceSchema({
    url: canonicalPath,
    name: h1,
    description: page.subtitle,
    serviceType: "Maths home tutoring",
    areaServed: page.label,
    audience: {
      educationalRole: "student",
      audienceType: "School students",
    },
  });
  const schema = [
    getWebPageSchema({
      url: canonicalPath,
      name: h1,
      description: page.subtitle,
      mainEntityId: serviceSchema?.["@id"],
      aboutId: serviceSchema?.["@id"],
    }),
    serviceSchema,
    getBreadcrumbSchema({
      url: canonicalPath,
      items: [
        { label: "Home", to: "/" },
        { label: "Cities" },
        { label: page.label },
      ],
    }),
    getFAQSchema({ url: canonicalPath, faqs: citySeoContent.faq }),
  ];

  return (
    <MainLayout>
      <Seo
        title={`Maths Home Tutor in ${page.label} | ${siteData.brandName}`}
        description={page.subtitle}
        canonicalPath={canonicalPath}
        keywords={[
          `maths home tutor in ${page.label.toLowerCase()}`,
          `verified maths tutor in ${page.label.toLowerCase()}`,
          `female maths tutor in ${page.label.toLowerCase()}`,
          `JEE maths tutor in ${page.label.toLowerCase()}`,
          `IB maths tutor in ${page.label.toLowerCase()}`,
          `IGCSE maths tutor in ${page.label.toLowerCase()}`,
          "CBSE maths tutor Gurugram",
          "ICSE maths tutor Gurugram",
          "ISC maths tutor Gurugram",
          "Maths Olympiad tutor Gurugram",
          ...page.coverageAreas,
        ]}
        schema={schema}
      />

      <div className="bg-white">
        <section className="bg-white px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "Cities" },
                { label: page.label },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                  Verified maths home tutors in Gurugram
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold text-neutral-950 md:text-5xl">
                  {h1}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
                </p>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                  Maths Bodhi is built for families who want focused mathematics support at home,
                  not random tutor discovery. We help students prepare for school boards,
                  international curricula and advanced maths goals through verified, experienced
                  tutors who understand concept clarity, exam pressure, confidence building and
                  personal attention.
                </p>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Whether your child needs a CBSE maths tutor, ICSE or ISC board support, IGCSE
                  paper practice, IB MYP or IB DP guidance, JEE Main and Advanced maths mentoring,
                  Maths Olympiad preparation, a senior faculty member, a female maths tutor or a
                  patient teacher for special learning needs, this city page helps you start from
                  the right board, class and locality.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/book-demo"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href={cityWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="#city-tutor-matches"
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Browse Tutors
                  </a>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/maths-home-tutor"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Maths Home Tutor
                  </Link>
                  <Link
                    to="/online-maths-home-tuition"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Online Maths Tuition
                  </Link>
                  <Link
                    to="/cbse-maths-home-tutor"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    CBSE Home Tutor
                  </Link>
                  <Link
                    to="/jee-maths-coaching"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    JEE Maths Coaching
                  </Link>
                  <Link
                    to="/maths-foundation-program"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Foundation Program
                  </Link>
                  <Link
                    to="/maths-revision-program"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Revision Program
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-neutral-950">
                  Find a maths tutor in {page.label}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Choose class, board and locality to shortlist relevant maths tutors. Maths Bodhi
                  focuses on verified, experienced, senior, female and specialist tutors for
                  personal attention, marks improvement, 95%+ goals, crash courses and advanced
                  maths preparation.
                </p>

                <div className="mt-6 grid gap-4">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Class
                    </span>
                    <select
                      value={selectedClass}
                      onChange={(event) => setSelectedClass(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    >
                      {cityClassOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Board
                    </span>
                    <select
                      value={selectedBoard}
                      onChange={(event) => setSelectedBoard(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    >
                      {cityBoardOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Sector
                    </span>
                    <select
                      value={selectedSector}
                      onChange={(event) => setSelectedSector(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    >
                      {citySectorOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href={cityWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Boards"
              title={isGurugramPage ? "Find maths tutors by board in Gurugram" : `Find maths tutors by board in ${page.label}`}
              subtitle="Choose the right board route for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE maths or Olympiad support. Curriculum fit matters because every board expects a different style of reasoning, practice and exam presentation."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {BOARD_ROUTE_LINKS.map((card) => (
                <Link
                  key={card.label}
                  to={card.to}
                  className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Existing route
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{card.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {page.servedBoards.map((board) => (
                <span
                  key={board}
                  className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700"
                >
                  {board}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Classes"
              title="Choose maths support by class and goal"
              subtitle="Use class level to keep the shortlist practical for school pace, board-year pressure, foundation repair, crash revision, competitive maths or 95%+ score planning."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {CLASS_ROUTE_LINKS.map((card) => (
                <Link
                  key={card.label}
                  to={card.to}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Existing route
                  </p>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{card.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stripAllFilterOption(cityClassOptions).map((classOption, index) => (
                <button
                  key={`${classOption}-${index}`}
                  type="button"
                  onClick={() => {
                    setSelectedClass(classOption);
                    scrollToTutorMatches();
                  }}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:bg-white hover:text-blue-700"
                >
                  <h3>{classOption}</h3>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Sectors"
              title="Find maths home tutors by Gurugram sector or society"
              subtitle="Choose your area to explore relevant home tuition support nearby. Locality matching helps families find a practical tutor route for regular classes, crash courses, special attention and exam preparation."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleSectors.map((sector) => {
                const sectorPath = getSupportedSectorPath(siteData, page, sector);
                const cardClass =
                  "group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";
                const content = (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {sectorPath ? "Locality page" : "Area filter"}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">{sector.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{sector.summary}</p>
                    <p className="mt-5 text-sm font-semibold text-blue-700">
                      {sectorPath ? "Open locality page" : "Use this area"}
                    </p>
                  </>
                );

                if (sectorPath) {
                  return (
                    <Link key={sector.slug} to={sectorPath} className={cardClass}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={sector.slug}
                    type="button"
                    onClick={() => handleSectorFilter(sector.label)}
                    className={cardClass}
                  >
                    {content}
                  </button>
                );
              })}
            </div>

            {page.topSectors.length > INITIAL_VISIBLE_SECTORS ? (
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-slate-600">
                  Showing {Math.min(visibleSectorCount, page.topSectors.length)} of{" "}
                  {page.topSectors.length} Gurugram sector options.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    hasMoreSectors
                      ? setVisibleSectorCount((current) =>
                          Math.min(current + SECTOR_LOAD_STEP, page.topSectors.length),
                        )
                      : setVisibleSectorCount(INITIAL_VISIBLE_SECTORS)
                  }
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                >
                  {hasMoreSectors ? "Load more localities" : "Show fewer localities"}
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <SeoContentSections
          content={citySeoContent}
          title={`Maths home tutor in ${page.label}`}
        />

        <section id="city-tutor-matches" className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Tutor Matches"
              title="Available verified maths tutor matches"
              subtitle="See available Gurugram tutor profiles when the selected class, board and sector have a match. If no profile appears, Maths Bodhi can still check availability for senior, female, PhD-level, JEE, Olympiad or special learning support through the demo request."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {[selectedClass, selectedBoard, selectedSector]
                .filter((item) => !String(item).startsWith("All "))
                .map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
            </div>

            {visibleTutors.length ? (
              <div className="mt-8 grid gap-5 xl:grid-cols-2">
                {visibleTutors.map((tutor, index) => (
                  <TutorCard key={tutor.id || tutor.slug || `${tutor.name}-${index}`} {...tutor} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  No matching tutors are published for this selection yet
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Try a broader class, board or sector. Maths Bodhi can still confirm availability
                  for verified maths home tutors, female maths tutors, JEE mentors, Olympiad
                  preparation, crash courses and personal-attention learning support through the
                  demo or WhatsApp flow.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedClass("All Classes");
                      setSelectedBoard("All Boards");
                      setSelectedSector("All Sectors");
                    }}
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Reset filters
                  </button>
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href={cityWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {cityReviews.length ? (
          <section className="bg-slate-50 px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                badge="Parent Reviews"
                title={`Parent feedback from ${page.label} families`}
                subtitle="Approved public reviews appear here when they match this city route."
                align="left"
              />

              <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cityReviews.map((review, index) => (
                  <MathsReviewCard
                    key={review.id ?? `${review.parent}-${review.sector}-${index}`}
                    {...review}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </MainLayout>
  );
}

export default CityPage;
