import { DEFAULT_ADMIN_CITY_OPTIONS, DELHI_NCR_CHILD_CITY_LABELS } from "../defaultLocationOptions";

function LocationOptionsPanel({ mode = "cities" }) {
  const suggestedLabel = mode === "localities" ? "city options for locality entries" : "city options";

  return (
    <section className="rounded-[24px] border border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Location Reference
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
            Useful {suggestedLabel} for Maths Bodhi admin work
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700">
            These are planning options for new entries. Saved rows still come from the admin data source.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-blue-100 bg-white p-4">
            <p className="text-sm font-bold text-slate-950">Delhi NCR</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DELHI_NCR_CHILD_CITY_LABELS.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {DEFAULT_ADMIN_CITY_OPTIONS.slice(1).map((city) => (
              <span
                key={city.slug}
                className="rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {city.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LocationOptionsPanel;

