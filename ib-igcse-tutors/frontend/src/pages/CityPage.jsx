import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import Seo from "../components/Seo";
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
import { buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

const GURUGRAM_CITY_ALIASES = ["gurugram", "gurgaon"];
const FALLBACK_GURUGRAM_SECTORS = stripAllFilterOption(SECTOR_OPTIONS);
const FALLBACK_GURUGRAM_BOARDS = ["CBSE", "ICSE", "ISC", "IB", "IGCSE", "Cambridge", "JEE"];
const CITY_TUTOR_LIMIT = 6;

const BOARD_ROUTE_LINKS = [
  {
    label: "Maths by Board",
    to: mathsRouteMap.hub,
    description: "Compare the main maths board routes before narrowing by class or sector.",
  },
  {
    label: "CBSE",
    to: mathsRouteMap.cbse,
    description: "School-paced maths support for worksheets, tests, and board readiness.",
  },
  {
    label: "IB",
    to: mathsRouteMap.ib,
    description: "Pathway-aware maths support for MYP and Diploma learners.",
  },
  {
    label: "IGCSE",
    to: mathsRouteMap.igcse,
    description: "Core and Extended support with clearer method and paper practice.",
  },
];

const CLASS_ROUTE_LINKS = [
  {
    label: "Class 10",
    to: "/gurugram/class-10-maths-home-tutor",
    description: "Chapter clarity, worksheet correction, and board-style revision support.",
  },
  {
    label: "Class 12",
    to: "/gurugram/class-12-maths-home-tutor",
    description: "Senior-school maths support for exam structure and steadier problem solving.",
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
    summary: `Use ${label} to narrow the Gurugram tutor shortlist by locality before booking a demo.`,
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
      `Use ${label} to narrow the Gurugram tutor shortlist by locality before booking a demo.`,
  };
}

function createFallbackGurugramPage() {
  return {
    slug: "gurugram",
    aliases: ["gurgaon"],
    label: "Gurugram",
    headline: "Maths Tutor in Gurugram",
    subtitle:
      "Find board-aware maths tutor support across Gurugram by class, board, and sector. Tutor results below come only from real published profiles.",
    coverageAreas: FALLBACK_GURUGRAM_SECTORS,
    servedBoards: FALLBACK_GURUGRAM_BOARDS,
    topSectors: FALLBACK_GURUGRAM_SECTORS.map(toFallbackSector),
    cta: {
      label: "Book Free Demo",
      description:
        "Share the class, board, sector, and current maths concern so Maths Bodhi can guide the next step.",
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
    headline: page.headline || "Maths Tutor in Gurugram",
    subtitle:
      page.subtitle ||
      "Find board-aware maths tutor support across Gurugram by class, board, and sector.",
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
        "Share the class, board, sector, and current maths concern so Maths Bodhi can guide the next step.",
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
    title: tutor.title ?? "Math Tutor",
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
    imageAlt: tutor.imageAlt || `${tutor.name} maths tutor profile`,
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
  const isGurugramPage = page
    ? [page.slug, page.label, ...getList(page.aliases)]
        .map(normalizeSlug)
        .some((value) => GURUGRAM_CITY_ALIASES.includes(value))
    : false;
  const h1 = isGurugramPage ? "Maths Tutor in Gurugram" : page?.headline;

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

  const cityWhatsAppUrl = useMemo(
    () =>
      buildWhatsAppUrl(
        siteData.contact.whatsappNumber,
        `Hello Maths Bodhi, I am looking for a maths tutor in ${
          page?.label ?? "Gurugram"
        }. Class: ${selectedClass}. Board: ${selectedBoard}. Sector: ${selectedSector}.`,
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

  return (
    <MainLayout>
      <Seo
        title={`Maths Tutor in ${page.label} | ${siteData.brandName}`}
        description={page.subtitle}
        canonicalPath={`/city/${page.slug}`}
        keywords={[
          `maths tutor in ${page.label.toLowerCase()}`,
          `maths home tutor in ${page.label.toLowerCase()}`,
          "gurugram maths tutor",
          ...page.coverageAreas,
        ]}
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
                  Gurugram city page
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold text-neutral-950 md:text-5xl">
                  {h1}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
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
                    to="/"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Home
                  </Link>
                  <Link
                    to="/subjects/maths"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Maths by Board
                  </Link>
                  {siteData.tutors.length ? (
                    <Link
                      to="/#homepage-tutor-matches"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Tutor Profiles
                    </Link>
                  ) : null}
                  <Link
                    to="/subjects/maths"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Maths Blogs and Guides
                  </Link>
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-neutral-950">
                  Find a tutor in {page.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Use the same class, board, and sector options as the homepage. Results only show
                  matching published tutor profiles.
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
              subtitle="Start with the board route when curriculum, paper style, and exam timing matter more than locality."
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
              title="Choose maths support by class"
              subtitle="Use class level to keep the shortlist practical for school pace, board year needs, or senior exam pressure."
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
              {stripAllFilterOption(cityClassOptions).map((classOption) => (
                <button
                  key={classOption}
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
              title="Popular Gurugram sectors"
              subtitle="Open locality pages where they are available, or choose a sector to focus the tutor shortlist on this page."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.topSectors.map((sector) => {
                const sectorPath = getSupportedSectorPath(siteData, page, sector);
                const cardClass =
                  "group rounded-[24px] border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md";
                const content = (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {sectorPath ? "Locality page" : "Tutor filter"}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-slate-950">{sector.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{sector.summary}</p>
                    <p className="mt-5 text-sm font-semibold text-blue-700">
                      {sectorPath ? "Open sector page" : "Use in tutor filter"}
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
          </div>
        </section>

        <section id="city-tutor-matches" className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Tutor Matches"
              title="Available tutor matches"
              subtitle="See available Gurugram tutor profiles when the selected class, board, and sector have a match."
              align="left"
            />

            <div className="mt-6 flex flex-wrap gap-3">
              {[selectedClass, selectedBoard, selectedSector]
                .filter((item) => !String(item).startsWith("All "))
                .map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </span>
                ))}
            </div>

            {visibleTutors.length ? (
              <div className="mt-8 grid gap-5 xl:grid-cols-2">
                {visibleTutors.map((tutor) => (
                  <TutorCard key={tutor.id || tutor.slug || tutor.name} {...tutor} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  No matching tutors are published for this selection yet
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Try a broader class, board, or sector. Maths Bodhi can still confirm availability
                  through the demo or WhatsApp flow while this page only shows published profiles.
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
      </div>
    </MainLayout>
  );
}

export default CityPage;
