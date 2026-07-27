import { Link } from "react-router-dom";
import { FOUNDER } from "../data/founder";

// Homepage teaser for the founder's message. The full nine-paragraph message
// lives on its own page at FOUNDER.path so the homepage stays readable and the
// message gets a page Google can rank on its own.
function FounderBlock({ className = "" }) {
  return (
    <section className={`bg-white px-5 py-12 sm:px-6 sm:py-16 ${className}`.trim()}>
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-[28px] border border-blue-100 bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6 shadow-sm md:grid-cols-[0.8fr_1.2fr] md:p-10">
        <div className="mx-auto w-full max-w-xs md:max-w-sm">
          <img
            src={FOUNDER.photo}
            alt={FOUNDER.photoAlt}
            width="673"
            height="900"
            loading="lazy"
            decoding="async"
            className="w-full rounded-[24px] object-cover shadow-lg shadow-blue-100"
          />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-700">
            Founder&rsquo;s message
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {FOUNDER.name}
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-600">
            {FOUNDER.headline}
          </p>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
            {FOUNDER.summary}
          </p>

          <div className="mt-6 grid gap-3">
            {FOUNDER.highlights.map((item) => (
              <p
                key={item}
                className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to={FOUNDER.path}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Read her full message
            </Link>
            <Link
              to="/book-demo"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
            >
              Book a free demo class
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FounderBlock;
