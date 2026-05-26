function MathsReviewCard({ parent, sector, rating, board, quote }) {
  const numericRating = Number(rating);
  const ratingLabel =
    String(rating ?? "").trim() && Number.isFinite(numericRating)
      ? `${numericRating.toFixed(1)}/5`
      : "Review";

  return (
    <article className="flex h-full min-w-0 flex-col rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words text-base font-bold tracking-tight text-slate-950">{parent}</h3>
          {sector ? <p className="mt-1 text-sm text-slate-500">{sector}, Gurugram</p> : null}
        </div>

        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          {ratingLabel}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {board ? (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
            {board}
          </span>
        ) : null}
        <span className="rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-semibold text-cyan-700">
          Maths home tuition
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{quote}</p>
    </article>
  );
}

export default MathsReviewCard;
