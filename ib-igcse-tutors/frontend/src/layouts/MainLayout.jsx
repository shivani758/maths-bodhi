import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";

function SessionNavigationBar() {
  const { session, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!session) {
    return null;
  }

  const dashboardPath =
    session.role === "student"
      ? "/student/dashboard"
      : session.role === "tutor"
        ? "/tutor/dashboard"
        : "";
  const isDashboard = dashboardPath && location.pathname.startsWith(dashboardPath);

  if (!dashboardPath) {
    return null;
  }

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="border-b border-slate-200 bg-white px-5 py-3 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-slate-600">
          {isDashboard
            ? "You are in a protected dashboard."
            : `You are viewing the public site while signed in as ${session.role}.`}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          {isDashboard ? (
            <Link
              to="/"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
            >
              Back to website
            </Link>
          ) : (
            <Link
              to={dashboardPath}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-center font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700"
            >
              Back to dashboard
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-2xl bg-slate-950 px-4 py-2.5 font-semibold text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <SessionNavigationBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
