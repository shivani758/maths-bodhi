import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";
import { getTutorProfilePath } from "../utils/tutorRoutes";
import { buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";

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
  "class 10": "/class-10-maths-tutor",
  "class 12": "/class-12-maths-tutor",
};

function getClassPath(classLevel = "") {
  return CLASS_ROUTE_MAP[normalizeLabel(classLevel)] ?? "";
}

function getSectorPath(sector) {
  return sector?.citySlug && sector?.slug ? `/city/${sector.citySlug}/${sector.slug}` : "";
}

function getMatchingSectorPage(sectorPages = [], sectorLabel = "") {
  const normalizedSector = normalizeLabel(sectorLabel);
  return sectorPages.find((sector) => normalizeLabel(sector.sectorLabel) === normalizedSector);
}

function TutorCard({
  id,
  slug,
  name,
  title,
  rating,
  experience,
  board,
  classLevel,
  topics = [],
  price,
  sectors = [],
  mode = [],
  summary,
  schoolFocus = [],
  image,
  imageAlt,
}) {
  const { siteData } = useSiteData();
  const displaySummary =
    summary || "Open the profile to compare teaching fit, board coverage, and availability.";
  const displayBoard = board || "Maths";
  const displayClassLevel = classLevel || "Flexible support";
  const displayExperience = experience || "Experience shared on enquiry";
  const displayPrice = price || "Shared on enquiry";
  const ratingLabel = rating ? `${rating}/5 rated` : "New profile";
  const displayImage = image || "/images/hero-maths-home.svg";
  const displayImageAlt = imageAlt || `${name} maths tutor profile`;
  const boardPath = getBoardPath(displayBoard);
  const classPath = getClassPath(displayClassLevel);
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorInquiryMessage(siteData.contact, { id, name, title }, {}),
  );
  const profilePath = getTutorProfilePath({ id, slug });

  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:rounded-[24px] sm:p-5">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:h-16 sm:w-16">
          <img
            src={displayImage}
            alt={displayImageAlt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-950">
                <Link to={profilePath} className="transition hover:text-blue-700">
                  {name}
                </Link>
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{title}</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {ratingLabel}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{displaySummary}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Class focus</p>
          {classPath ? (
            <Link
              to={classPath}
              className="mt-2 inline-flex text-sm font-semibold text-slate-900 transition hover:text-blue-700"
            >
              {displayClassLevel}
            </Link>
          ) : (
            <p className="mt-2 text-sm font-semibold text-slate-900">{displayClassLevel}</p>
          )}
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Experience</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{displayExperience}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">Starting fee</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">{displayPrice}</p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Board fit</p>
            <Link
              to={boardPath}
              className="mt-1 inline-flex text-sm font-semibold text-slate-900 transition hover:text-blue-700"
            >
              {displayBoard}
            </Link>
          </div>
          {schoolFocus[0] ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700">
              {schoolFocus[0]}
            </span>
          ) : null}
        </div>
        {topics.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {topic}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs font-medium leading-5 text-slate-500">
            Topic focus can be confirmed before booking.
          </p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {sectors.length ? (
          sectors.slice(0, 3).map((sector) => {
            const sectorPath = getSectorPath(getMatchingSectorPage(siteData.sectorPages, sector));
            const className =
              "rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700";

            return sectorPath ? (
              <Link
                key={sector}
                to={sectorPath}
                className={`${className} transition hover:bg-cyan-100 hover:text-cyan-800`}
              >
                {sector}
              </Link>
            ) : (
              <span key={sector} className={className}>
                {sector}
              </span>
            );
          })
        ) : (
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
            Local fit on enquiry
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          {mode.length ? (
            mode.map((item) => (
              <span
                key={item}
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Mode shared on enquiry
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to={profilePath}
          aria-label={`View ${name}'s tutor profile`}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:flex-1"
        >
          View Profile
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ask Maths Bodhi about ${name} on WhatsApp`}
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:flex-1"
        >
          Ask on WhatsApp
        </a>
      </div>
    </article>
  );
}

export default TutorCard;
