export const MATHS_BODHI_LOGO_SRC = "/assets/mathsbodhi-logo.png";

function BrandLogo({ className = "", imageClassName = "", tagline = "Learn | Practice | Master" }) {
  return (
    <span className={`inline-flex min-w-0 shrink-0 items-center gap-2.5 ${className}`}>
      <span className="flex h-full w-[3.15em] shrink-0 items-center justify-center overflow-hidden">
        <img
          src={MATHS_BODHI_LOGO_SRC}
          alt="Maths Bodhi"
          className={`h-full w-full object-contain ${imageClassName}`}
          decoding="async"
        />
      </span>
      <span className="min-w-0 leading-tight" aria-hidden="true">
        <span className="block truncate text-base font-bold tracking-normal text-slate-950 sm:text-lg">
          Maths <span className="text-cyan-600">Bodhi</span>
        </span>
        <span className="block truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-[10px] sm:tracking-[0.16em]">
          {tagline}
        </span>
      </span>
    </span>
  );
}

export default BrandLogo;
