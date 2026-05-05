import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { buildTutorMessage, buildWhatsAppUrl } from "../utils/whatsapp";

function TutorDashboard() {
  const { session, logout } = useAuth();
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  const profile = session?.profile ?? {};

  const tutorWhatsAppUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildTutorMessage(siteData.contact, profile),
  );

  const displayValue = (value) => value || "Not shared yet";
  const profileFields = [
    profile.name,
    profile.phone,
    profile.email,
    profile.experience,
    profile.boards,
    profile.sectors,
    profile.availability,
    profile.summary,
  ];
  const completedFields = profileFields.filter(Boolean).length;
  const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

  function handleLogout() {
    logout();
    navigate("/tutor/login", { replace: true });
  }

  return (
    <MainLayout>
      <Seo
        title="Tutor Dashboard | Maths Bodhi"
        description="Tutor onboarding dashboard for maths specialists on the Maths Bodhi platform with direct WhatsApp review and profile submission."
        canonicalPath="/tutor/dashboard"
        keywords={["tutor dashboard", "maths tutor onboarding", "gurugram tutor login"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
                  Tutor Dashboard
                </span>
                <h1 className="mt-4 text-4xl font-bold">
                  Welcome, {profile.name || "Tutor"}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Your onboarding summary is ready. Use this dashboard to send your teaching
                  profile, availability, and supporting details to the Maths Bodhi WhatsApp number
                  for approval and routing.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#tutor-profile"
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Update profile
                </a>
                <a
                  href={tutorWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Submit onboarding brief
                </a>
                <a
                  href={tutorWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  WhatsApp Maths Bodhi
                </a>
                <Link
                  to="/"
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Back to website
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Profile completion", `${profileCompletion}% complete`],
              ["Boards/classes taught", profile.boards],
              ["Preferred sectors", profile.sectors],
              ["Availability", profile.availability],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 break-words text-xl font-bold text-slate-950">
                  {displayValue(value)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div
              id="tutor-profile"
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-bold text-slate-950">Tutor profile summary</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Keep these sections current so Maths Bodhi can understand your teaching fit,
                coverage areas, timing, and onboarding readiness.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Profile completion</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    {profileCompletion}% complete based on the profile, contact, teaching,
                    sector, availability, and summary fields shared at login.
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Boards/classes taught</h3>
                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {displayValue(profile.boards)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Preferred sectors</h3>
                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {displayValue(profile.sectors)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Availability</h3>
                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {displayValue(profile.availability)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Specialization</h3>
                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {displayValue(profile.topics)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">About</h3>
                  <p className="mt-2 break-words leading-7 text-slate-700">
                    {displayValue(profile.summary)}
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-950">Documents/onboarding status</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Share your CV, supporting certificates, and sample teaching plan on WhatsApp
                    so the team can review fit before routing any student requirement.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Onboarding checklist</h2>
                <div className="mt-6 space-y-3">
                  {[
                    "Share updated CV and teaching profile on WhatsApp",
                    "Confirm home tuition sectors and online availability",
                    "List strongest boards, grades, and maths chapters",
                    "Mention premium schools where you have already taught",
                  ].map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 px-5 py-4 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
                {profileCompletion < 100 ? (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-900">
                    Some onboarding details are still missing. Update your profile fields and send
                    the latest brief to Maths Bodhi before expecting student routing.
                  </div>
                ) : null}
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Direct actions</h2>
                <div className="mt-6 grid gap-3">
                  <a
                    href={tutorWhatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Submit onboarding brief
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      siteData.contact.whatsappNumber,
                      `${buildTutorMessage(siteData.contact, profile)}\nSupporting documents: I will share my CV, certificates, and sample plan.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    WhatsApp Maths Bodhi
                  </a>
                  <Link
                    to="/"
                    className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Back to website
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-rose-200 hover:text-rose-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TutorDashboard;
