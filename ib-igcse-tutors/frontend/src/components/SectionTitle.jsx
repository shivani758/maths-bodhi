function SectionTitle({ badge, title, subtitle, align = "center" }) {
  const alignment = align === "left" ? "text-left mx-0" : "text-center mx-auto";

  return (
    <div className={`max-w-3xl ${alignment}`}>
      {badge ? (
        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-sm sm:px-4 sm:text-[11px] sm:tracking-[0.22em]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
          <span className="truncate">{badge}</span>
        </span>
      ) : null}

      <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-neutral-950 sm:text-3xl md:text-4xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:mt-4 sm:text-base md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
