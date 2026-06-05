import { useMemo } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import TutorCard from "../components/TutorCard";
import { useSiteData } from "../contexts/SiteDataContext";
import { getSeoLandingPageConfig } from "../data/seoLandingPages";
import MainLayout from "../layouts/MainLayout";
import { getTutorProfilePath } from "../utils/tutorRoutes";
import {
  getAbsoluteUrl,
  getBreadcrumbSchema,
  getFAQSchema,
  getServiceSchema,
  getWebPageSchema,
} from "../utils/schema";
import { buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

function getList(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function uniqueValues(values = []) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function textMatchesExpected(values = [], expectedValues = []) {
  const haystack = getList(values).map(normalizeText).filter(Boolean);
  const expected = getList(expectedValues).map(normalizeText).filter(Boolean);

  if (!expected.length) {
    return true;
  }

  return expected.some((expectedValue) =>
    haystack.some(
      (candidate) =>
        candidate === expectedValue ||
        candidate.includes(expectedValue) ||
        expectedValue.includes(candidate),
    ),
  );
}

function getTutorBoards(tutor) {
  return uniqueValues([tutor.board, ...getList(tutor.boards)]);
}

function getTutorClasses(tutor) {
  return uniqueValues([tutor.classLevel, ...getList(tutor.classesSupported)]);
}

function getTutorModes(tutor) {
  return uniqueValues([...getList(tutor.mode), ...getList(tutor.serviceModes)]);
}

function getTutorLocalities(tutor) {
  return uniqueValues([...getList(tutor.sectors), ...getList(tutor.localities)]);
}

function getTutorSearchText(tutor) {
  return [
    tutor.name,
    tutor.title,
    tutor.summary,
    tutor.shortBio,
    tutor.location,
    ...getTutorBoards(tutor),
    ...getTutorClasses(tutor),
    ...getTutorModes(tutor),
    ...getTutorLocalities(tutor),
    ...getList(tutor.topics),
    ...getList(tutor.schoolFocus),
    ...getList(tutor.cities),
  ];
}

function tutorMatchesCity(tutor, city) {
  if (!city) {
    return true;
  }

  const cityText = normalizeText(city);
  const explicitCities = [tutor.location, ...getList(tutor.cities)].map(normalizeText).filter(Boolean);

  if (
    explicitCities.some(
      (candidate) =>
        candidate === cityText || candidate.includes(cityText) || cityText.includes(candidate),
    )
  ) {
    return true;
  }

  const hasLocalGurugramSignal = getTutorLocalities(tutor).length || getList(tutor.schoolFocus).length;
  return (cityText === "gurugram" || cityText === "gurgaon") && Boolean(hasLocalGurugramSignal);
}

function tutorMatchesQuery(tutor, query = {}) {
  const searchableText = getTutorSearchText(tutor);

  return (
    tutorMatchesCity(tutor, query.city) &&
    textMatchesExpected(getTutorBoards(tutor), query.boards) &&
    textMatchesExpected(getTutorClasses(tutor), query.classes) &&
    textMatchesExpected(getTutorModes(tutor), query.modes) &&
    textMatchesExpected(getTutorLocalities(tutor), query.localities) &&
    textMatchesExpected(searchableText, query.tokens)
  );
}

function toTutorCardData(tutor) {
  return {
    ...tutor,
    title: tutor.title ?? "Math Tutor",
    rating: String(tutor.rating ?? "0"),
    experience: tutor.experience ?? tutor.experienceLabel ?? "Experience shared on enquiry",
    board: tutor.board ?? getTutorBoards(tutor)[0] ?? "Maths",
    classLevel: tutor.classLevel ?? getTutorClasses(tutor)[0] ?? "Flexible support",
    sectors: getTutorLocalities(tutor),
    topics: getList(tutor.topics),
    price: tutor.price ?? tutor.startingFee ?? "Shared on enquiry",
    mode: getTutorModes(tutor),
    schoolFocus: getList(tutor.schoolFocus),
    image: tutor.image || "/images/hero-maths-home.svg",
    imageAlt: tutor.imageAlt || `${tutor.name} maths tutor profile`,
    summary: tutor.summary ?? tutor.shortBio ?? "",
  };
}

function buildSchema(config, tutors) {
  const breadcrumbs = [
    { label: "Home", to: "/" },
    { label: config.h1, to: config.path },
  ];
  const service = getServiceSchema({
    url: config.path,
    name: config.h1,
    description: config.seoDescription,
    serviceType: config.h1?.toLowerCase().includes("online")
      ? "Online maths tuition"
      : "Maths tutoring",
    areaServed: "Gurugram",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: config.audience ?? "School students",
    },
  });
  const schema = [
    getWebPageSchema({
      url: config.path,
      name: config.h1,
      description: config.seoDescription,
      mainEntityId: service?.["@id"],
      aboutId: service?.["@id"],
    }),
    service,
    getBreadcrumbSchema({ url: config.path, items: breadcrumbs }),
  ];

  if (tutors.length) {
    schema.push({
      "@type": "ItemList",
      "@id": `${getAbsoluteUrl(config.path)}#tutors`,
      name: `${config.h1} tutor matches`,
      itemListElement: tutors.map((tutor, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: getAbsoluteUrl(getTutorProfilePath(tutor)),
        item: {
          "@type": "Person",
          name: tutor.name,
          jobTitle: "Math Tutor",
          description: tutor.summary ?? tutor.shortBio ?? tutor.title,
        },
      })),
    });
  }

  if (config.faqs?.length) {
    schema.push(getFAQSchema({ url: config.path, faqs: config.faqs }));
  }

  return schema;
}

function SeoLandingPage({ pageKey }) {
  const config = getSeoLandingPageConfig(pageKey);
  const { siteData, isSiteDataLoading } = useSiteData();

  const matchingTutors = useMemo(() => {
    if (!config) {
      return [];
    }

    return siteData.tutors
      .filter((tutor) => tutorMatchesQuery(tutor, config.tutorQuery))
      .slice(0, config.tutorQuery?.limit ?? 6)
      .map(toTutorCardData);
  }, [config, siteData.tutors]);

  const whatsappUrl = useMemo(() => {
    if (!config) {
      return "";
    }

    return buildWhatsAppUrl(
      siteData.contact.whatsappNumber,
      `Hello Maths Bodhi, I am interested in ${config.h1}. Please help me find a suitable maths tutor.`,
    );
  }, [config, siteData.contact.whatsappNumber]);

  const schema = useMemo(
    () => (config ? buildSchema(config, matchingTutors) : []),
    [config, matchingTutors],
  );

  if (!config) {
    return <NotFound />;
  }

  const fallbackTitle = siteData.tutors.length
    ? "No published tutors match this exact page yet"
    : "Tutor profiles are not loaded yet";
  const fallbackDescription = siteData.tutors.length
    ? "The page is live, but the current published profiles do not match this specific class, board, mode, or locality filter. Use Book Free Demo or WhatsApp to check current availability."
    : "This page only shows real published tutor profiles. Use Book Free Demo or WhatsApp while tutor data is unavailable.";
  const primaryCtaTo = config.primaryCtaTo ?? "/book-free-demo-class";

  return (
    <MainLayout>
      <Seo
        title={config.seoTitle}
        description={config.seoDescription}
        keywords={config.keywords}
        canonicalPath={config.path}
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-16 md:py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-100/70 blur-3xl" />
          <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: config.h1 },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                  {config.badge}
                </span>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                  {config.h1}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  {config.intro}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {config.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to={primaryCtaTo}
                    className="w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="#seo-tutor-matches"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:bg-white hover:text-blue-700 sm:w-auto"
                  >
                    View Tutors
                  </a>
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <img
                  src="/images/hero-maths-home.svg"
                  alt={`${config.h1} support overview`}
                  width="960"
                  height="720"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[24px] border border-slate-200 bg-white object-cover"
                />
                <div className="mt-5 rounded-[24px] bg-white p-5">
                  <h2 className="text-2xl font-bold text-slate-950">
                    Built for a clear first shortlist
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Start with the page intent, compare real tutor profiles where available, and
                    move into a demo or WhatsApp enquiry without losing the board, class, or sector
                    context.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="seo-tutor-matches" className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Tutor Matches"
              title="Published tutor profiles for this page"
              subtitle="This section uses only real tutor data. When no published profile matches the page filter, Maths Bodhi shows an availability fallback instead."
              align="left"
            />

            {isSiteDataLoading ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" role="status">
                {Array.from({ length: 3 }, (_, index) => (
                  <div
                    key={`seo-tutor-loading-${index}`}
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
                      <div className="h-20 rounded-2xl bg-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            ) : matchingTutors.length ? (
              <div className="mt-8 grid auto-rows-fr gap-5 xl:grid-cols-2">
                {matchingTutors.map((tutor) => (
                  <div key={tutor.id || tutor.slug || tutor.name} className="h-full [&>article]:h-full">
                    <TutorCard {...tutor} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">{fallbackTitle}</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  {fallbackDescription}
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to={primaryCtaTo}
                    className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                  >
                    Book Free Demo
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                  >
                    WhatsApp
                  </a>
                  <Link
                    to="/city/gurugram"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-white hover:text-blue-700 sm:w-auto"
                  >
                    Browse Gurugram
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Page Focus"
              title="How this route helps families decide faster"
              subtitle="The page keeps the search intent narrow while linking back to city, board, class, and tutor profile paths."
              align="left"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {config.supportPoints.map((point) => (
                <article
                  key={point.title}
                  className="rounded-[26px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-950">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{point.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Internal Links"
              title="Useful next pages"
              subtitle="Use these links to move between city, sector, board, class, and broader maths tutor routes."
              align="left"
            />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {config.internalLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-slate-950">{item.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {getList(item.tags).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="FAQ"
              title="Questions before booking"
              subtitle="These answers keep the page honest about real tutor data and the next enquiry step."
              align="left"
            />

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {config.faqs.map((item) => (
                <article
                  key={item.question}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Share the class, board, sector, and current maths concern
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                Maths Bodhi can use those details to check tutor fit, lesson mode, and the right
                first demo conversation for this page.
              </p>
            </div>

            <div className="grid gap-3 rounded-[26px] border border-white/10 bg-white/5 p-6">
              <Link
                to={primaryCtaTo}
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Book Free Demo
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default SeoLandingPage;
