import { Link, useLocation } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";

function Navbar() {
  const { siteData } = useSiteData();
  const { pathname } = useLocation();

  const navItems = [
    {
      label: "Home",
      to: "/",
      isActive: pathname === "/",
    },
    {
      label: "Maths by Board",
      to: "/subjects/maths",
      isActive:
        pathname.startsWith("/subjects/maths") ||
        pathname.startsWith("/maths/class") ||
        pathname.startsWith("/maths/exam") ||
        /^\/(cbse|icse|isc|igcse|ib|cambridge|board)-/.test(pathname) ||
        /^\/class-\d+-applied/.test(pathname),
    },
    {
      label: "Gurugram Sectors",
      to: "/city/gurugram",
      isActive: pathname === "/city/gurugram" || pathname.startsWith("/gurugram"),
    },
    {
      label: "Student",
      to: "/student/login",
      isActive: pathname.startsWith("/student"),
    },
    {
      label: "Tutor",
      to: "/tutor/login",
      isActive: pathname.startsWith("/tutor"),
    },
  ];
  const adminActive = pathname.startsWith("/admin");

  function navClassName(isActive) {
    return [
      "rounded-full px-3.5 py-2 text-sm font-semibold transition",
      "motion-safe:hover:-translate-y-0.5",
      isActive
        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600",
    ].join(" ");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100">
            MB
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight text-slate-950">
              {siteData.brandName}
            </p>
            <p className="text-xs font-medium text-cyan-600">
              Clear Maths Learning
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={navClassName(item.isActive)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/login"
            className={`hidden rounded-xl border px-4 py-2.5 text-sm font-semibold transition motion-safe:hover:-translate-y-0.5 md:inline-flex ${
              adminActive
                ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
                : "border-slate-200 text-slate-700 hover:border-blue-200 hover:text-blue-700"
            }`}
          >
            Admin
          </Link>
          <a
            href={`https://wa.me/${siteData.contact.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 motion-safe:hover:-translate-y-0.5"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
