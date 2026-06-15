import { useMemo } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import Seo from "../../components/Seo";
import MainLayout from "../../layouts/MainLayout";
import { SeoContentSections } from "../../components/seo/SeoContentSections";
import { buildDefaultSeoContent } from "../../components/seo/seoContentDefaults";
import {
  AJAY_MAIN_PATH,
  AJAY_PERSON_ID,
} from "../config/ajayConstants";
import {
  SCHEMA_IDS,
  cleanSchemaObject,
  getAbsoluteUrl,
  getBreadcrumbSchema,
  getFAQSchema,
  getWebPageSchema,
} from "../../utils/schema";
import { buildWhatsAppUrl } from "../../utils/whatsapp";
import { useSiteData } from "../../contexts/SiteDataContext";

function buildAjayPageSchema(config) {
  const canonicalUrl = config.canonicalUrl;
  const personId = getAbsoluteUrl(AJAY_PERSON_ID);
  const person = cleanSchemaObject({
    "@type": "Person",
    "@id": personId,
    name: config.entity?.name,
    jobTitle: config.entity?.title,
    description: config.intro,
    url: getAbsoluteUrl(AJAY_MAIN_PATH),
    image: getAbsoluteUrl(config.entity?.image || "/images/hero-maths-home.svg"),
    worksFor: {
      "@id": SCHEMA_IDS.localBusiness,
    },
    knowsAbout: config.entity?.knowsAbout,
  });

  return [
    getWebPageSchema({
      url: canonicalUrl,
      name: config.h1,
      description: config.seoDescription,
      mainEntityId: personId,
      aboutId: personId,
    }),
    person,
    getBreadcrumbSchema({ url: canonicalUrl, items: config.breadcrumbItems }),
    getFAQSchema({ url: canonicalUrl, faqs: config.sections?.faqs ?? [] }),
  ].filter(Boolean);
}

function AjayPageTemplate({ config }) {
  const { siteData } = useSiteData();
  const schema = useMemo(() => buildAjayPageSchema(config), [config]);
  const whatsappUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    `Hello Maths Bodhi, I want to discuss Ajay Vatsyayan for ${config.title}. Student details: class, board, locality, weak chapters, goal, and preferred timing.`,
  );
  const hero = config.sections?.hero ?? {};
  const cta = config.sections?.cta ?? {};
  const contentSections = config.sections?.contentSections ?? [];
  const relatedLinks = config.sections?.relatedLinks ?? [];
  const fitBullets = config.sections?.fitBullets ?? [];
  const faqs = config.sections?.faqs ?? [];
  const ajaySeoContent = buildDefaultSeoContent({
    title: config.title,
    intro: config.intro,
    primaryKeyword: config.focus,
    area: config.entity?.serviceArea || "Gurugram",
    boards: hero.chips,
    classes: [config.audience, config.entity?.audience].filter(Boolean),
    relatedLinks,
    cta,
  });

  return (
    <MainLayout>
      <Seo
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalPath={config.canonicalUrl}
        schema={schema}
      />

      <div className="bg-white">
        <section className="overflow-hidden bg-gradient-to-br from-white via-cyan-50 to-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs items={config.breadcrumbItems} />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <p className="inline-flex rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-cyan-700">
                  {hero.badge}
                </p>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                  {config.h1}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                  {config.intro}
                </p>

                {hero.chips?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {hero.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={cta.primaryAction?.to || "/book-demo"}
                    className="rounded-2xl bg-slate-950 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-slate-800"
                  >
                    {cta.primaryAction?.label || "Book a free demo discussion"}
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-center font-semibold text-slate-900 transition hover:border-cyan-200 hover:text-cyan-700"
                  >
                    WhatsApp fit check
                  </a>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-xl shadow-cyan-100/80">
                <img
                  src={config.entity?.image || "/images/hero-maths-home.svg"}
                  alt={config.entity?.imageAlt || "Ajay Vatsyayan senior maths tutor profile"}
                  width="960"
                  height="720"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[24px] border border-slate-100 bg-slate-50 object-cover"
                />

                {hero.stats?.length ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {hero.stats.map((stat) => (
                      <div key={`${stat.value}-${stat.label}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xl font-bold text-slate-950">{stat.value}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {fitBullets.length ? (
          <section className="bg-white px-6 py-14">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-4 md:grid-cols-3">
                {fitBullets.map((item) => (
                  <div key={item} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold leading-7 text-slate-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <SeoContentSections
          content={config.seoContent}
          fallback={ajaySeoContent}
          title={config.title}
        />

        {contentSections.map((section, index) => (
          <section
            key={section.title}
            className={`${index % 2 === 0 ? "bg-slate-50" : "bg-white"} px-6 py-16`}
          >
            <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  {section.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {section.title}
                </h2>
                {section.bullets?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.bullets.map((bullet) => (
                      <span
                        key={bullet}
                        className="rounded-full border border-cyan-100 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        {bullet}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {relatedLinks.length ? (
          <section className="bg-white px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  Related Ajay routes
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  Continue with the most relevant next page
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {relatedLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-slate-950">{item.label}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {faqs.length ? (
          <section className="bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-5xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                Questions families ask before discussing Ajay
              </h2>
              <div className="mt-8 divide-y divide-slate-200 rounded-[28px] border border-slate-200 bg-white">
                {faqs.map((item) => (
                  <div key={item.question} className="p-6">
                    <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] bg-slate-950 p-8 text-white md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">{cta.title}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">{cta.description}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                to={cta.primaryAction?.to || "/book-demo"}
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                {cta.primaryAction?.label || "Book a free demo discussion"}
              </Link>
              <Link
                to={cta.secondaryAction?.to || AJAY_MAIN_PATH}
                className="rounded-2xl border border-white/15 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {cta.secondaryAction?.label || "View main Ajay page"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default AjayPageTemplate;
