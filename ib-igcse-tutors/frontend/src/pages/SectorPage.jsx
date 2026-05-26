import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionTitle from "../components/SectionTitle";
import MathsRouteCardGrid from "../components/maths/MathsRouteCardGrid";
import MathsReviewCard from "../components/maths/MathsReviewCard";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import { getCoreMathsBoardCards } from "../data/mathsBoardPages";
import MainLayout from "../layouts/MainLayout";
import { getSectorPage } from "../services/siteLookup";
import NotFound from "./NotFound";

function SectorPage() {
  const { city, sector } = useParams();
  const { siteData } = useSiteData();
  const page = getSectorPage(siteData, city, sector);
  const mathsBoardCards = getCoreMathsBoardCards();
  const sectorReviews = page
    ? siteData.reviews
        .filter((review) => {
          const reviewLocality = String(review.sector ?? review.locality ?? "").toLowerCase();
          const sectorLabel = page.sectorLabel.toLowerCase();
          const sectorSlug = page.slug.replace(/-/g, " ");

          return reviewLocality.includes(sectorLabel) || reviewLocality.includes(sectorSlug);
        })
        .slice(0, 3)
    : [];

  if (!page) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <Seo
        title={`Maths Home Tutor in ${page.sectorLabel}, ${page.cityLabel} | ${siteData.brandName}`}
        description={page.subtitle}
        canonicalPath={`/city/${page.citySlug}/${page.slug}`}
        keywords={[
          `maths home tutor in ${page.sectorLabel.toLowerCase()}`,
          `maths tuition in ${page.sectorLabel.toLowerCase()}`,
          `CBSE maths tutor ${page.sectorLabel.toLowerCase()}`,
          `IB maths tutor ${page.sectorLabel.toLowerCase()}`,
          `IGCSE maths tutor ${page.sectorLabel.toLowerCase()}`,
          `JEE maths tutor ${page.sectorLabel.toLowerCase()}`,
          page.cityLabel,
          ...page.landmarks,
        ]}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-white px-6 py-20">
          <div className="absolute left-0 top-12 h-64 w-64 rounded-full bg-cyan-100/75 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-100/80 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: page.cityLabel, to: `/city/${page.citySlug}` },
                { label: page.sectorLabel },
              ]}
            />

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-sm font-semibold text-cyan-700">
                  Verified Maths Home Tutors
                </span>

                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-neutral-950 md:text-5xl">
                  {page.headline}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                  {page.subtitle}
                </p>

                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">
                  Maths Bodhi helps families in {page.sectorLabel},{" "}
                  {page.cityLabel} connect with verified and highly experienced
                  maths home tutors for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP,
                  JEE Main, JEE Advanced and Maths Olympiad preparation.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Many students require personal attention in mathematics
                  because classroom learning is often not enough for conceptual
                  clarity, speed improvement, exam confidence and consistent
                  practice. Maths Bodhi focuses on one-to-one maths learning
                  support through experienced tutors who understand board
                  patterns, school expectations and individual student learning
                  pace.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
                  Families searching for maths tutors in {page.sectorLabel}{" "}
                  usually want trusted academic support near home with flexible
                  scheduling, consistent mentoring and subject expertise. Maths
                  Bodhi supports students preparing for school exams, board
                  exams, foundation learning, crash revision, advanced problem
                  solving and competitive maths preparation.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/book-demo"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    {page.cta.label}
                  </Link>

                  <Link
                    to={`/city/${page.citySlug}`}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-600"
                  >
                    Back to {page.cityLabel}
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {page.landmarks.map((landmark, index) => (
                    <span
                      key={`${landmark}-${index}`}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Why Families Choose Maths Bodhi
                </p>

                <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
                  Personalised maths learning support near your locality
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  Maths Bodhi focuses on meaningful maths learning through
                  verified tutors, structured revision planning, concept clarity
                  and personalised attention for every student.
                </p>

                <div className="mt-6 space-y-4">
                  {page.proofPoints.map((point, index) => (
                    <div
                      key={`${point.title}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5"
                    >
                      <p className="font-semibold text-slate-900">
                        {point.title}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {point.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Local Maths Learning"
              title={`Maths tuition support in ${page.sectorLabel}`}
              subtitle="Students often perform better when learning support is personalised, structured and locally accessible."
              align="left"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Nearby schools and curriculum support
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Maths Bodhi supports students studying in leading schools near{" "}
                  {page.sectorLabel}. Tutors are selected based on curriculum
                  familiarity, teaching experience and the student's academic
                  requirements.
                </p>

                <div className="mt-6 space-y-3">
                  {page.nearbySchools.map((school, index) => (
                    <div
                      key={`${school}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4"
                    >
                      <p className="font-medium text-slate-800">{school}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Maths tutoring goals supported
                </h2>

                <div className="mt-6 grid gap-4">
                  {page.serviceModes.map((mode, index) => (
                    <div
                      key={`${mode}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <p className="font-semibold text-slate-900">{mode}</p>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {page.timings[index] ??
                          page.timings[0]}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                  <p className="text-sm leading-7 text-slate-700">
                    Maths Bodhi also supports students looking for marks
                    improvement, 95%+ score planning, JEE maths preparation,
                    Olympiad guidance, special child maths learning support,
                    female maths tutors, senior faculty mentoring and crash
                    revision programs for school and competitive exams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle
              badge="Board & Exam Routes"
              title={`Popular maths learning paths in ${page.sectorLabel}`}
              subtitle="Explore structured maths support based on board, class level and exam preparation goals."
              align="left"
            />

            <div className="mt-10">
              <MathsRouteCardGrid
                cards={mathsBoardCards.map((subject) => ({
                  eyebrow: subject.eyebrow,
                  title: subject.label,
                  description: subject.note,
                  to: subject.to,
                  tags: subject.tags,
                }))}
              />
            </div>

            <div className="mt-12 rounded-[28px] border border-slate-200 bg-slate-50 p-8">
              <h2 className="text-2xl font-bold text-neutral-950">
                Maths tutoring in {page.sectorLabel} for long-term confidence
              </h2>

              <div className="mt-5 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  Mathematics becomes easier when students receive regular
                  guidance, personal attention and concept-focused learning
                  support. Maths Bodhi works with students across different
                  learning levels, from foundation maths to advanced competitive
                  preparation.
                </p>

                <p>
                  Some learners require help with chapter understanding and
                  school homework, while others need advanced preparation for
                  board exams, IB mathematics, IGCSE papers, JEE Main, JEE
                  Advanced or Maths Olympiad problem solving. Maths Bodhi helps
                  families identify tutors based on these academic goals instead
                  of using generic tuition matching.
                </p>

                <p>
                  Students preparing for CBSE and ICSE mathematics often require
                  regular worksheet practice, formula revision and exam-oriented
                  preparation. IB and IGCSE students usually need stronger
                  conceptual understanding, analytical reasoning and application
                  based learning support. Maths Bodhi tutoring pathways are
                  aligned with these academic differences.
                </p>

                <p>
                  Parents also prefer tutors who can communicate patiently and
                  build confidence gradually. Maths Bodhi supports students
                  looking for female maths tutors, senior faculty, PhD-level
                  mentors and experienced teachers from reputed academic
                  institutions.
                </p>

                <p>
                  Our larger focus is not only score improvement but long-term
                  mathematical confidence. Students should feel more comfortable
                  solving problems independently, asking questions freely and
                  approaching mathematics without fear.
                </p>
              </div>
            </div>
          </div>
        </section>

        {sectorReviews.length ? (
          <section className="bg-slate-50 px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                badge="Local Reviews"
                title={`Parent feedback near ${page.sectorLabel}`}
                subtitle="Approved public reviews appear here when families have shared relevant locality feedback."
                align="left"
              />

              <div className="mt-8 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sectorReviews.map((review, index) => (
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

export default SectorPage;
