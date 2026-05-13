import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAdminSession, logoutAdminSession, subscribeAdminSession } from "../services/adminAuthService";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import BrandLogo from "./BrandLogo";
import { buildWhatsAppUrl } from "../utils/whatsapp";

function Navbar() {
  const { siteData } = useSiteData();
  const { session, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [adminSession, setAdminSession] = useState(() => getAdminSession());

  useEffect(() => subscribeAdminSession(setAdminSession), []);

  const coreNavItems = [
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
      isActive: pathname.startsWith("/city/gurugram") || pathname.startsWith("/gurugram"),
    },
  ];
  const activeRole =
    session?.role === "student" || session?.role === "tutor" || session?.role === "admin"
      ? session.role
      : adminSession
        ? "admin"
      : null;
  const callbackUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    "Hello Maths Bodhi, please request a callback about maths tutoring.",
  );

  const accountItems =
    activeRole === "student"
      ? [
          {
            label: "Dashboard",
            to: "/student/dashboard",
            isActive: pathname.startsWith("/student"),
          },
        ]
      : activeRole === "tutor"
        ? [
            {
              label: "Dashboard",
              to: "/tutor/dashboard",
              isActive: pathname.startsWith("/tutor"),
            },
          ]
        : activeRole === "admin"
          ? [
              {
                label: "Dashboard",
                to: "/admin/dashboard",
                isActive: pathname.startsWith("/admin"),
              },
            ]
          : [
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
              {
                label: "Admin",
                to: "/admin/login",
                isActive: pathname.startsWith("/admin"),
              },
            ];

  function navClassName(isActive) {
    return [
      "rounded-full px-3.5 py-2 text-sm font-semibold transition duration-200",
      "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm",
      isActive
        ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100"
        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600",
    ].join(" ");
  }

  function accountClassName(isActive) {
    return [
      "rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition duration-200",
      "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm",
      isActive
        ? "border-blue-200 bg-blue-50 text-blue-700 shadow-sm"
        : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700",
    ].join(" ");
  }

  async function handleLogout() {
    if (activeRole === "admin") {
      if (session?.role === "admin") {
        logout();
      }

      try {
        await logoutAdminSession();
      } catch {
        setAdminSession(null);
      }

      navigate("/admin/login", { replace: true });
      return;
    }

    logout();
    navigate(activeRole === "tutor" ? "/tutor/login" : "/student/login", { replace: true });
  }

  function renderAccountActions({ mobile = false } = {}) {
    return (
      <>
        {accountItems.map((item) => (
          <Link key={item.to} to={item.to} className={accountClassName(item.isActive)}>
            {item.label}
          </Link>
        ))}
        {activeRole ? (
          <button
            type="button"
            onClick={handleLogout}
            className={`rounded-xl border border-rose-100 bg-white px-3.5 py-2.5 text-sm font-semibold text-rose-700 transition duration-200 hover:border-rose-200 hover:bg-rose-50 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm ${
              mobile ? "shrink-0" : ""
            }`}
          >
            Logout
          </button>
        ) : null}
      </>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-w-0 max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <Link to="/" className="flex min-w-0 flex-1 items-center xl:flex-none">
            <BrandLogo className="h-11 max-w-[190px] sm:h-12 sm:max-w-[240px]" />
            <span className="sr-only">{siteData.brandName}</span>
          </Link>

          <nav className="hidden items-center gap-2 xl:flex">
            {coreNavItems.map((item) => (
              <Link key={item.to} to={item.to} className={navClassName(item.isActive)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">{renderAccountActions()}</div>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 pb-4 xl:hidden">
          {coreNavItems.map((item) => (
            <Link key={item.to} to={item.to} className={navClassName(item.isActive)}>
              {item.label}
            </Link>
          ))}
          <span className="hidden h-9 w-px bg-slate-200 sm:block" />
          <div className="flex flex-wrap gap-2 md:hidden">{renderAccountActions({ mobile: true })}</div>
        </nav>
      </header>

      <a
        href={callbackUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-[320px] rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-xl shadow-blue-200 transition duration-200 hover:bg-blue-700 motion-safe:hover:-translate-y-0.5 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:mx-0 sm:max-w-none sm:px-5"
        aria-label="Request a callback from Maths Bodhi"
      >
        Request a callback
      </a>
    </>
  );
}

export default Navbar;
