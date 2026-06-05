import { Link } from "react-router-dom";
import { AJAY_MAIN_PATH } from "../pageSystem/config/ajayConstants";

function AjayMentorBlock({ recommendation, className = "" }) {
  if (!recommendation) {
    return null;
  }

  return (
    <section className={`bg-white px-5 py-12 sm:px-6 ${className}`.trim()}>
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[28px] border border-cyan-100 bg-cyan-50/45 p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Premium mentor option
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {recommendation.title}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">
            {recommendation.description}
          </p>
        </div>

        <div className="grid gap-4">
          {recommendation.bullets?.length ? (
            <div className="grid gap-3">
              {recommendation.bullets.map((item) => (
                <p
                  key={item}
                  className="rounded-2xl border border-cyan-100 bg-white px-4 py-3 text-sm font-medium leading-6 text-slate-700"
                >
                  {item}
                </p>
              ))}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to={recommendation.to}
              className="rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View Ajay route
            </Link>
            <Link
              to={AJAY_MAIN_PATH}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-cyan-200 hover:text-cyan-700"
            >
              Main Ajay page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AjayMentorBlock;
