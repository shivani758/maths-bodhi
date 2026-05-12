export const MATHS_BODHI_LOGO_SRC = "/assets/mathsbodhi-logo.png";

function BrandLogo({ className = "", imageClassName = "" }) {
  return (
    <span className={`inline-flex shrink-0 items-center ${className}`}>
      <img
        src={MATHS_BODHI_LOGO_SRC}
        alt="Maths Bodhi"
        className={`h-full w-auto object-contain ${imageClassName}`}
        decoding="async"
      />
    </span>
  );
}

export default BrandLogo;
