import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import TutorCard from "../components/TutorCard";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import { buildStudentMessage, buildTutorInquiryMessage, buildWhatsAppUrl } from "../utils/whatsapp";

function StudentDashboard() {
  const { session, logout } = useAuth();
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  const profile = session?.profile ?? {};

  const matchedTutors = siteData.tutors.filter((tutor) => {
    const boardMatch = tutor.board === profile.board || tutor.board === "Foundation";
    const sectorMatch = tutor.sectors.includes(profile.sector);
    return boardMatch || sectorMatch;
  });

  const studentWhatsAppUrl = buildWhatsAppUrl(
    siteData.contact.whatsappNumber,
    buildStudentMessage(siteData.contact, profile),
  );

  const displayValue = (value) => value || "Not shared yet";

  function handleLogout() {
    logout();
    navigate("/student/login", { replace: true });
  }

  return (
    <MainLayout>
      <Seo
        title="Student Dashboard | Maths Bodhi"
        description="Student dashboard for maths home tuition in Gurugram with tutor matches and direct WhatsApp handoff."
        canonicalPath="/student/dashboard"
        keywords={["student dashboard", "maths tutor matches", "gurugram maths support"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[32px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                  Student Dashboard
                </span>
                <h1 className="mt-4 text-4xl font-bold">
                  Welcome, {profile.studentName || "Student"}
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-blue-50">
                  Your maths learning brief is ready. Use the actions below to send your full
                  requirement to the Maths Bodhi WhatsApp team, review tutor matches, and move
                  toward a demo class quickly.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#student-profile"
                  className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Continue profile
                </a>
                <a
                  href={studentWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Send requirement on WhatsApp
                </a>
                <Link
                  to="/book-demo"
                  className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Book free demo
                </Link>
                <Link
                  to="/"
                  className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Back to website
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Student details", profile.studentName || profile.parentName],
              ["Class/board", [profile.classLevel, profile.board].filter(Boolean).join(" / ")],
              ["Preferred learning mode", profile.mode],
              ["Location/sector", profile.sector],
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

          <section
            id="student-profile"
            className="mt-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                  Learning requirement
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                  Review your onboarding steps
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                  These details help Maths Bodhi understand the student's class, board, learning
                  mode, location, and next action without adding another form step.
                </p>
              </div>
              <a
                href={studentWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Submit learning requirement
              </a>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {[
                ["1", "Student details", profile.studentName || profile.parentName],
                ["2", "Class/board", [profile.classLevel, profile.board].filter(Boolean).join(" / ")],
                ["3", "Preferred learning mode", profile.mode],
                ["4", "Location/sector", profile.sector],
                ["5", "Submit learning requirement", "Send the brief on WhatsApp or book a free demo."],
              ].map(([number, title, detail]) => (
                <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {number}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-slate-950">{title}</h3>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                    {displayValue(detail)}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Suggested tutor matches</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                These tutor cards are matched against your board and sector preference. Open a
                profile for more detail or start a WhatsApp enquiry through the Maths Bodhi team.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {matchedTutors.length ? (
                  matchedTutors.slice(0, 4).map((tutor) => (
                    <TutorCard key={tutor.id} {...tutor} />
                  ))
                ) : (
                  <div className="md:col-span-2 rounded-[28px] border border-dashed border-blue-200 bg-blue-50 p-6">
                    <h3 className="text-xl font-bold text-slate-950">
                      No exact tutor match is published yet
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      Send your learning requirement to Maths Bodhi so the team can review the
                      student's board, sector, and timing before suggesting the next available
                      tutor profile.
                    </p>
                    <a
                      href={studentWhatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Send requirement on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Learning brief</h2>
                <div className="mt-6 space-y-4 text-sm leading-6 text-slate-700">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Topics</p>
                    <p className="mt-2 break-words">{displayValue(profile.topics)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Goal</p>
                    <p className="mt-2 break-words">{displayValue(profile.goal)}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">Preferred timing</p>
                    <p className="mt-2 break-words">{displayValue(profile.timing)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">Fast actions</h2>
                <div className="mt-6 grid gap-3">
                  {matchedTutors.slice(0, 3).map((tutor) => (
                    <a
                      key={tutor.id}
                      href={buildWhatsAppUrl(
                        siteData.contact.whatsappNumber,
                        buildTutorInquiryMessage(siteData.contact, tutor, profile),
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      Ask about {tutor.name}
                    </a>
                  ))}
                  <Link
                    to="/book-demo"
                    className="rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Book free demo
                  </Link>
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

export default StudentDashboard;
