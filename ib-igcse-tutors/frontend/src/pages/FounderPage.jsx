import { useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { FOUNDER } from "../data/founder";
import MainLayout from "../layouts/MainLayout";
import {
  BRAND_NAME,
  MAIN_ENTITY_ID,
  getAbsoluteUrl,
  getBreadcrumbSchema,
  getWebPageSchema,
} from "../utils/schema";

function FounderPage() {
  const schema = useMemo(() => {
    const pageUrl = getAbsoluteUrl(FOUNDER.path);

    return [
      getWebPageSchema({
        url: FOUNDER.path,
        name: `Founder's Message – ${FOUNDER.name} | ${BRAND_NAME}`,
        description: FOUNDER.summary,
        mainEntityId: MAIN_ENTITY_ID,
        // Left as the default WebPage on purpose. "AboutPage" would be a better
        // semantic fit, but utils/schema.js keeps a deliberate allowlist of
        // top-level types and silently drops anything outside it — AboutPage was
        // being filtered out with no error. Not worth widening shared schema
        // infrastructure for one page.
      }),
      getBreadcrumbSchema({
        url: FOUNDER.path,
        items: [
          { label: "Home", to: "/" },
          { label: "Founder's Message" },
        ],
      }),
      // Person schema so search engines and AI assistants can attribute the
      // message and the school to a real, named educator.
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${pageUrl}#person`,
        name: FOUNDER.name,
        jobTitle: FOUNDER.role,
        description: FOUNDER.credential,
        image: getAbsoluteUrl(FOUNDER.photo),
        url: pageUrl,
        worksFor: { "@id": MAIN_ENTITY_ID },
        knowsAbout: [
          "CBSE Mathematics",
          "ICSE Mathematics",
          "ISC Mathematics",
          "IGCSE Mathematics",
          "IB Mathematics",
          "Cambridge Mathematics",
          "JEE Mathematics",
        ],
      },
    ];
  }, []);

  return (
    <MainLayout>
      <Seo
        title={`Founder's Message – ${FOUNDER.name} | ${BRAND_NAME}`}
        description="Pratibha Ma'am, Founder of Maths Bodhi, on 25+ years of mathematics mentorship and why every student deserves personalised attention from genuine maths specialists."
        canonicalPath={FOUNDER.path}
        keywords={[
          "Maths Bodhi founder",
          "Pratibha Ma'am Maths Bodhi",
          "maths home tutor Gurgaon",
          "CBSE maths tutor Gurgaon",
          "IB maths tutor",
          "JEE mathematics mentor",
        ]}
        imagePath={FOUNDER.photo}
        schema={schema}
      />

      <div className="bg-slate-50">
        <section className="px-5 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
              <Link to="/" className="hover:text-blue-700">
                Home
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-slate-700">Founder&rsquo;s Message</span>
            </nav>

            <div className="mt-6 grid gap-10 md:grid-cols-[0.75fr_1.25fr] md:items-start">
              <div className="mx-auto w-full max-w-xs md:sticky md:top-24 md:max-w-none">
                <img
                  src={FOUNDER.photo}
                  alt={FOUNDER.photoAlt}
                  width="673"
                  height="900"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full rounded-[28px] object-cover shadow-xl shadow-blue-100"
                />

                <div className="mt-5 rounded-[24px] border border-blue-100 bg-white p-5 text-center shadow-sm">
                  <p className="text-lg font-bold text-slate-950">{FOUNDER.name}</p>
                  <p className="mt-1 text-sm font-medium text-slate-600">{FOUNDER.role}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {FOUNDER.credential}
                  </p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {FOUNDER.tagline}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Founder&rsquo;s message
                </p>

                <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">
                  {FOUNDER.name}
                </h1>

                <p className="mt-2 text-base font-medium text-slate-600">
                  {FOUNDER.headline}
                </p>

                <div className="mt-8 space-y-5">
                  {FOUNDER.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-sm leading-8 text-slate-700 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-10 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-slate-950">{FOUNDER.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{FOUNDER.role}</p>
                  <p className="mt-1 text-sm text-slate-600">{FOUNDER.credential}</p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    {FOUNDER.tagline}
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book a free demo class
                  </Link>
                  <Link
                    to="/"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Explore Maths Bodhi
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default FounderPage;
