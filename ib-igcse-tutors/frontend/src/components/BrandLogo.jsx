export const MATHS_BODHI_LOGO_SRC = "/assets/mathsbodhi-logo.png";
export const MATHS_BODHI_LOGO_SIZE = 128;

function BrandLogo({
  className = "",
  imageClassName = "",
  tagline = "Learn | Practice | Master",
  tone = "light",
}) {
  const isDark = tone === "dark";
  const nameClassName = isDark ? "text-white drop-shadow-sm" : "text-slate-950";
  const bodhiClassName = isDark ? "text-cyan-300" : "text-[#00AEEF]";
  const taglineClassName = isDark ? "text-cyan-100" : "text-slate-500";
  const markClassName = isDark ? "rounded-2xl bg-white p-1 shadow-sm shadow-cyan-950/30" : "";

  return (
    <span className={`inline-flex min-w-0 shrink-0 items-center gap-2.5 ${className}`}>
      <span className={`flex h-full w-[3.15em] shrink-0 items-center justify-center overflow-hidden ${markClassName}`}>
        <img
          src={MATHS_BODHI_LOGO_SRC}
          alt="Maths Bodhi"
          width={MATHS_BODHI_LOGO_SIZE}
          height={MATHS_BODHI_LOGO_SIZE}
          className={`h-full w-full object-contain ${imageClassName}`}
          decoding="async"
        />
      </span>
      <span className="min-w-0 leading-tight" aria-hidden="true">
        <span className={`block truncate text-base font-bold tracking-normal sm:text-lg ${nameClassName}`}>
          Maths <span className={bodhiClassName}>Bodhi</span>
        </span>
        <span className={`block truncate text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em] ${taglineClassName}`}>
          {tagline}
        </span>
      </span>
    </span>
  );
}

export default BrandLogo;
