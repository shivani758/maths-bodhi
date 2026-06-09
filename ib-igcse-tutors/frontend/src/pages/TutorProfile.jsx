import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import Seo from "../components/Seo";
import MathsFaqAccordion from "../components/maths/MathsFaqAccordion";
import MathsGuideCard from "../components/maths/MathsGuideCard";
import MathsResultCard from "../components/maths/MathsResultCard";
import MathsReviewCard from "../components/maths/MathsReviewCard";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import {
  buildTutorProfileContent,
  getTutorProfileById,
  getTutorProfileBySlug,
} from "../services/mathsContentService";
import { combineListValues, normalizeClassListValue } from "../services/clientDataUtils";
import { getPublicTutorBySlugOrId } from "../services/tutorsService";
import { getTutorProfilePath } from "../utils/tutorRoutes";
import {
  getBreadcrumbSchema,
  getFAQSchema,
  getPersonSchema,
  getWebPageSchema,
} from "../utils/schema";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";
import NotFound from "./NotFound";

function uniqueValues(...values) {
  return combineListValues(...values);
}

function splitParagraphs(text) {
  return String(text ?? "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getBoardPath(board = "") {
  const normalized = String(board).toLowerCase();

  if (normalized.includes("igcse")) {
    return "/igcse-maths-home-tutor";
  }

  if (normalized.includes("ib")) {
    return "/ib-maths-home-tutor";
  }

  if (normalized.includes("jee")) {
    return "/jee-maths-coaching";
  }

  if (normalized.includes("icse") || normalized.includes("isc")) {
    return "/subjects/maths/icse-isc";
  }

  if (normalized.includes("cbse")) {
    return "/cbse-maths-tuition";
  }

  return "/subjects/maths";
}

function normalizeLabel(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const CLASS_ROUTE_MAP = {
  "class 10": "/gurugram/class-10-maths-home-tutor",
  "class 12": "/gurugram/class-12-maths-home-tutor",
};
const HOMEPAGE_ONLY_TUTOR_SLUGS = new Set(["ajay-vatsyayan"]);

function getClassPath(classLevel = "") {
  return CLASS_ROUTE_MAP[normalizeLabel(classLevel)] ?? "";
}

function getSectorPath(sector) {
  return sector?.citySlug && sector?.slug ? `/city/${sector.citySlug}/${sector.slug}` : "";
}

function Chip({ children, tone = "slate", to = "" }) {
  const tones = {
    slate: "border border-slate-200 bg-white text-slate-700",
    cyan: "border border-cyan-200 bg-cyan-50 text-cyan-700",
    blue: "border border-blue-100 bg-blue-50 text-blue-700",
    emerald: "border border-emerald-100 bg-emerald-50 text-emerald-700",
  };
  const className = `rounded-full px-3 py-1.5 text-sm font-semibold ${
    tones[tone] ?? tones.slate
  }`;

  if (to) {
    return (
      <Link to={to} className={`${className} transition hover:border-blue-200 hover:text-blue-700`}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}

function formatListPreview(values = [], fallback, maxVisible = 3) {
  const items = uniqueValues(values);

  if (!items.length) {
    return fallback;
  }

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - visibleItems.length;

  return remainingCount > 0
    ? `${visibleItems.join(", ")} +${remainingCount} more`
    : visibleItems.join(", ");
}

function formatShortText(value, fallback, maxLength = 78) {
  const text = String(value ?? "").trim().replace(/\s+/g, " ");

  if (!text) {
    return fallback;
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim().replace(/[.,;:]+$/, "")}...`;
}

function formatAvailabilityText(value) {
  const text = String(value ?? "").trim().replace(/\s+/g, " ");

  if (/home tuition/i.test(text) && /online/i.test(text) && /hybrid/i.test(text)) {
    return "Home, online, or hybrid timings by enquiry";
  }

  return formatShortText(text, "Shared on enquiry");
}

function InfoCard({ label, value }) {
  return (
    <div className="flex h-full min-h-28 flex-col rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 break-words text-base font-bold leading-6 text-slate-950 [overflow-wrap:anywhere]">
        {value}
      </p>
    </div>
  );
}

function TutorProfile() {
  const { id, slug } = useParams();
  const { siteData, isSiteDataLoading } = useSiteData();
  const isHomepageOnlyTutor = slug ? HOMEPAGE_ONLY_TUTOR_SLUGS.has(normalizeLabel(slug)) : false;
  const tutorLookupKey = slug || id || "";
  const summaryTutor = isHomepageOnlyTutor ? null : slug ? getTutorProfileBySlug(slug) : getTutorProfileById(id);
  const [remoteTutorState, setRemoteTutorState] = useState({
    lookupKey: "",
    tutor: null,
    status: "idle",
  });
  const hasRemoteTutorResult = remoteTutorState.lookupKey === tutorLookupKey;
  const remoteTutor = hasRemoteTutorResult ? remoteTutorState.tutor : null;
  const remoteTutorLoading =
    !isHomepageOnlyTutor && Boolean(tutorLookupKey) && !summaryTutor && !hasRemoteTutorResult;
  const tutor = remoteTutor ? buildTutorProfileContent(remoteTutor) : summaryTutor;
  const sectorPageByLabel = new Map(
    (siteData.sectorPages ?? []).map((sector) => [
      normalizeLabel(sector.sectorLabel),
      sector,
    ]),
  );

  useEffect(() => {
    if (isHomepageOnlyTutor || !tutorLookupKey) {
      return undefined;
    }

    let isMounted = true;

    getPublicTutorBySlugOrId(tutorLookupKey)
      .then((data) => {
        if (isMounted) {
          setRemoteTutorState({
            lookupKey: tutorLookupKey,
            tutor: data,
            status: "loaded",
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setRemoteTutorState({
            lookupKey: tutorLookupKey,
            tutor: null,
            status: "error",
          });
        }
      })

    return () => {
      isMounted = false;
    };
  }, [isHomepageOnlyTutor, tutorLookupKey]);

  if (!tutor && !isHomepageOnlyTutor && (isSiteDataLoading || remoteTutorLoading)) {
    return (
      <MainLayout>
        <div className="bg-white px-6 py-24">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-slate-950">Loading tutor profile</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Preparing the tutor profile details.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!tutor) {
    return <NotFound />;
  }

  const canonicalPath = getTutorProfilePath(tutor);
  const headline = tutor.boards?.[0]
    ? `${tutor.name}, ${tutor.boards[0]} tutor`
    : `${tutor.name}, maths tutor`;
  const intro = tutor.summary ?? tutor.shortBio ?? tutor.title;
  const fullBioParagraphs = splitParagraphs(tutor.longFormProfile);
  const profileParagraphs = fullBioParagraphs.length
    ? fullBioParagraphs
    : [
        "This profile is being completed. Families can still compare the tutor's board fit, class coverage, lesson mode, and enquiry options before booking.",
      ];
  const teachingParagraphs = splitParagraphs(tutor.teachingStyle);
  const boardChips = uniqueValues(tutor.boards, tutor.associatedBoards, tutor.boardTags, tutor.board, tutor.exams);
  const classChips = normalizeClassListValue(
    tutor.classesSupported,
    tutor.classes,
    tutor.classLevels,
    tutor.classFit,
    tutor.classFocus,
    tutor.classLevel,
    tutor.examSupport,
    tutor.exams,
  );
  const topicChips = uniqueValues(tutor.topics, tutor.topicTags);
  const serviceChips = uniqueValues(tutor.serviceModes, tutor.mode, tutor.serviceModeTags);
  const localityChips = uniqueValues(tutor.localities, tutor.sectors, tutor.localityTags);
  const tagChips = uniqueValues(tutor.associatedTags, tutor.badges);
  const primaryBoard = boardChips[0] ?? "Maths";
  const primaryBoardPath = getBoardPath(primaryBoard);
  const ratingLabel = tutor.rating ? `${tutor.rating}/5 rated` : "New profile";
  const experienceLabel = tutor.experience || "Experience shared on enquiry";
  const feeLabel = tutor.startingFee ?? tutor.price ?? "Shared on enquiry";
  const subjectsAndSchools = uniqueValues(topicChips.slice(0, 2), (tutor.schoolFocus ?? []).slice(0, 2)).join(" + ");
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(siteData.contact, tutor, {}),
  );
  const personSchema = getPersonSchema({
    url: canonicalPath,
    name: tutor.name,
    jobTitle: tutor.title ?? "Math Tutor",
    description: tutor.shortBio ?? intro,
    image: tutor.image,
                knowsAbout: uniqueValues(boardChips, topicChips.slice(0, 5)),
  });
  const schema = [
    getWebPageSchema({
      url: canonicalPath,
      name: tutor.name,
      description: tutor.seo?.description ?? intro,
      type: "ProfilePage",
      mainEntityId: personSchema?.["@id"],
      aboutId: personSchema?.["@id"],
    }),
    personSchema,
    getBreadcrumbSchema({
      url: canonicalPath,
      items: [
        { label: "Home", to: "/" },
        { label: "Tutors", to: "/subjects/maths" },
        { label: tutor.name },
      ],
    }),
    tutor.faqItems?.length ? getFAQSchema({ url: canonicalPath, faqs: tutor.faqItems }) : null,
  ];

  return (
    <MainLayout>
      <Seo
        title={tutor.seo?.title ?? `${headline} | Maths Bodhi`}
        description={tutor.seo?.description ?? intro}
        canonicalPath={canonicalPath}
        keywords={tutor.seo?.keywords ?? uniqueValues([tutor.name], boardChips, topicChips)}
        imagePath={tutor.image}
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden px-5 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:rounded-[36px] sm:p-6">
              <img
                src={tutor.image || "/images/hero-maths-home.svg"}
                alt={tutor.imageAlt || `${tutor.name} maths tutor profile`}
                width="960"
                height="720"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-[22px] border border-slate-200 bg-white sm:rounded-[28px]"
              />
            </div>

            <div>
              <Breadcrumbs
                items={[
                  { label: "Home", to: "/" },
                  { label: "Tutors", to: "/subjects/maths" },
                  { label: tutor.name },
                ]}
              />
              <span className="mt-6 inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                Public Tutor Profile
              </span>
              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                {tutor.name}
              </h1>
              <h2 className="mt-4 text-xl font-bold text-blue-700 sm:text-2xl">
                {experienceLabel} + {primaryBoard}
              </h2>
              <h3 className="mt-3 text-lg font-semibold text-slate-800">
                {subjectsAndSchools || tutor.title}
              </h3>
              <p className="mt-4 text-base font-semibold text-slate-600">{tutor.title}</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {intro}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Chip tone="blue">{ratingLabel}</Chip>
                <Chip tone="cyan">{experienceLabel}</Chip>
                <Chip tone="emerald">{feeLabel}</Chip>
                {boardChips[0] ? <Chip>{boardChips[0]}</Chip> : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-2xl bg-blue-600 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Ask about this tutor on WhatsApp
                </a>
                <Link
                  to="/book-demo"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                >
                  Book a demo class
                </Link>
                <Link
                  to={primaryBoardPath}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:bg-white hover:text-blue-700 sm:w-auto"
                >
                  Explore {primaryBoard} support
                </Link>
              </div>

              <div
                className="mt-8 grid auto-rows-fr gap-4"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))" }}
              >
                <InfoCard label="Class fit" value={formatListPreview(classChips, "Flexible support", 3)} />
                <InfoCard label="Boards" value={formatListPreview(boardChips, "Maths support", 3)} />
                <InfoCard label="Availability" value={formatAvailabilityText(tutor.availability)} />
                <InfoCard label="Lesson modes" value={formatListPreview(serviceChips, "One-to-one support", 2)} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[32px] sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">About this maths tutor</h2>
              <div className="mt-6 space-y-4">
                {profileParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </div>

              {teachingParagraphs.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Teaching approach</h3>
                  <div className="mt-4 space-y-4">
                    {teachingParagraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-slate-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[32px] sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">Boards and classes supported</h2>

              <h3 className="mt-6 text-lg font-semibold text-slate-950">Boards</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {boardChips.length ? (
                  boardChips.map((item) => (
                    <Chip key={item} tone="cyan" to={getBoardPath(item)}>
                      {item}
                    </Chip>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Board fit can be confirmed during the enquiry.
                  </p>
                )}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Classes supported</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {classChips.length ? (
                  classChips.map((item) => (
                    <Chip key={item} tone="blue" to={getClassPath(item)}>
                      {item}
                    </Chip>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Class coverage is flexible and can be checked before booking.
                  </p>
                )}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Topics supported</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {topicChips.length ? (
                  topicChips.map((item) => <Chip key={item}>{item}</Chip>)
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Topic-specific support can be discussed with the team.
                  </p>
                )}
              </div>

              {tagChips.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Additional focus areas</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {tagChips.slice(0, 8).map((item) => (
                      <Chip key={item} tone="emerald">
                        {item}
                      </Chip>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:rounded-[32px] sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">Services</h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <InfoCard label="Starting fee" value={feeLabel} />
                <InfoCard label="City" value={(tutor.cities ?? []).join(", ") || tutor.location || "Gurugram"} />
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Lesson modes</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {serviceChips.length ? (
                  serviceChips.map((item) => (
                    <Chip key={item} tone="blue">
                      {item}
                    </Chip>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Lesson mode can be confirmed during matching.
                  </p>
                )}
              </div>

              <h3 className="mt-8 text-lg font-semibold text-slate-950">Local tutor availability</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {localityChips.length ? (
                  localityChips.map((item) => (
                    <Chip
                      key={item}
                      tone="cyan"
                      to={getSectorPath(sectorPageByLabel.get(normalizeLabel(item)))}
                    >
                      {item}
                    </Chip>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Locality and scheduling fit can be checked before the demo.
                  </p>
                )}
              </div>

              {tutor.schoolFocus?.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">School familiarity</h3>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {tutor.schoolFocus.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:rounded-[32px] sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">Qualifications and achievements</h2>

              <h3 className="mt-6 text-lg font-semibold text-slate-950">Qualifications</h3>
              {(tutor.qualifications ?? []).length ? (
                <div className="mt-4 space-y-3">
                  {(tutor.qualifications ?? []).map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 rounded-2xl bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
                  Qualification details can be shared by the team before the first session.
                </p>
              )}

              {tutor.achievements?.length ? (
                <>
                  <h3 className="mt-8 text-lg font-semibold text-slate-950">Highlights</h3>
                  <div className="mt-4 space-y-3">
                    {tutor.achievements.map((item) => (
                      <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {tutor.relatedResults?.length ? (
          <section className="bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-2xl font-bold text-slate-950">Student outcomes</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                These examples show the kind of maths progress families often look for once the support plan becomes more structured.
              </p>

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                {tutor.relatedResults.map((item) => (
                  <MathsResultCard key={item.id} {...item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-950">Frequently asked questions</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              These answers help families understand tutor fit, lesson mode, and how the conversation usually starts.
            </p>

            {tutor.faqItems?.length ? (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:rounded-[32px] sm:p-6">
                <MathsFaqAccordion items={tutor.faqItems} />
              </div>
            ) : (
              <div className="mt-8 rounded-[28px] border border-dashed border-slate-200 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  Tutor-specific FAQs will appear here once they are available.
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-950">Reviews and related reading</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Parent feedback and board-relevant reading can both help families judge whether the tutoring style feels right.
            </p>

            <div className="mt-8 grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Reviews and testimonials</h3>
                {tutor.relatedReviews?.length ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    {tutor.relatedReviews.map((review) => (
                      <MathsReviewCard key={review.id} {...review} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-slate-600">
                      This tutor profile is ready for parent reviews as they are added to the public content system.
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-950">Related blogs</h3>
                {tutor.relatedBlogs?.length ? (
                  <div className="mt-5 grid gap-4">
                    {tutor.relatedBlogs.map((blog) => (
                      <MathsGuideCard key={blog.id} {...blog} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-slate-600">
                      More board-specific reading will appear here as guides are published.
                    </p>
                    <Link
                      to={primaryBoardPath}
                      className="mt-4 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                      Browse {primaryBoard} maths support
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-200/70 sm:rounded-[32px] sm:p-8">
              <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                    Next step
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                    Talk through board fit, class level, and the maths pressure that matters most
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                    Families can share the board, class, school, current maths concerns, and preferred mode before deciding on the next conversation.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      to="/book-demo"
                      className="w-full rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-100 sm:w-auto"
                    >
                      Book a demo class
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                    >
                      Message Maths Bodhi on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="rounded-[26px] border border-white/10 bg-white/5 p-6">
                  <h3 className="text-xl font-bold tracking-tight text-white">
                    Helpful details to share before booking
                  </h3>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Board, class level, and school name
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        The maths chapters, paper situations, or topic patterns causing the most friction
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-sm font-medium text-slate-200">
                        Preferred lesson mode and Gurugram locality for scheduling fit
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    The team can continue directly on {siteData.contact.phoneDisplay}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default TutorProfile;
