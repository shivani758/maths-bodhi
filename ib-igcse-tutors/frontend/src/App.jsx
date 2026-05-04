import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import StudentLogin from "./pages/StudentLogin";
import TutorLogin from "./pages/TutorLogin";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProviders from "./admin/AdminProviders";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLoginPage from "./admin/pages/AdminLoginPage";

const LegacyMathsSubjectRoute = lazy(() => import("./pages/LegacyMathsSubjectRoute"));
const MathsBoardPage = lazy(() => import("./pages/MathsBoardPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const SectorPage = lazy(() => import("./pages/SectorPage"));
const SeoLandingPage = lazy(() => import("./pages/SeoLandingPage"));
const TutorProfile = lazy(() => import("./pages/TutorProfile"));
const BookDemo = lazy(() => import("./pages/BookDemo"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
const ConfigDrivenPageRoute = lazy(() => import("./pageSystem/routes/ConfigDrivenPageRoute"));
const AdminDashboardPage = lazy(() => import("./admin/pages/AdminDashboardPage"));
const TutorsListPage = lazy(() => import("./admin/pages/TutorsListPage"));
const TutorEditorPage = lazy(() => import("./admin/pages/TutorEditorPage"));
const ReviewsPage = lazy(() => import("./admin/pages/ReviewsPage"));
const ReviewEditorPage = lazy(() => import("./admin/pages/ReviewEditorPage"));
const BlogsPage = lazy(() => import("./admin/pages/BlogsPage"));
const BlogEditorPage = lazy(() => import("./admin/pages/BlogEditorPage"));
const PagesPage = lazy(() => import("./admin/pages/PagesPage"));
const PageEditorPage = lazy(() => import("./admin/pages/PageEditorPage"));
const ResultsPage = lazy(() => import("./admin/pages/ResultsPage"));
const FaqsPage = lazy(() => import("./admin/pages/FaqsPage"));
const CitiesPage = lazy(() => import("./admin/pages/CitiesPage"));
const LocalitiesPage = lazy(() => import("./admin/pages/LocalitiesPage"));
const MediaPage = lazy(() => import("./admin/pages/MediaPage"));
const UsersPage = lazy(() => import("./admin/pages/UsersPage"));
const SettingsPage = lazy(() => import("./admin/pages/SettingsPage"));
const SeoPage = lazy(() => import("./admin/pages/SeoPage"));

function RouteLoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-24 text-slate-900">
      <div
        className="mx-auto max-w-md rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm"
        role="status"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Maths Bodhi
        </p>
        <p className="mt-3 text-xl font-bold text-slate-950">Loading page</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Preparing the requested maths support view.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subjects/maths" element={<MathsBoardPage />} />
          <Route path="/subjects/maths/:board" element={<MathsBoardPage />} />
          <Route path="/subjects/maths/:board/:stage" element={<MathsBoardPage />} />
          <Route path="/subjects/maths/:board/:stage/:track" element={<MathsBoardPage />} />
          <Route path="/subject/:slug" element={<LegacyMathsSubjectRoute />} />
          <Route path="/maths/class/:classSlug" element={<ConfigDrivenPageRoute routeType="class" />} />
          <Route path="/maths/exam/:examSlug" element={<ConfigDrivenPageRoute routeType="exam" />} />
          <Route path="/book-free-demo-class" element={<SeoLandingPage pageKey="book-free-demo-class" />} />
          <Route path="/maths-home-tutor" element={<SeoLandingPage pageKey="maths-home-tutor" />} />
          <Route path="/online-maths-home-tuition" element={<SeoLandingPage pageKey="online-maths-home-tuition" />} />
          <Route path="/one-to-one-maths-tuition" element={<SeoLandingPage pageKey="one-to-one-maths-tuition" />} />
          <Route path="/maths-foundation-program" element={<SeoLandingPage pageKey="maths-foundation-program" />} />
          <Route path="/maths-revision-program" element={<SeoLandingPage pageKey="maths-revision-program" />} />
          <Route path="/premium-school-maths-home-tutor" element={<SeoLandingPage pageKey="premium-school-maths-home-tutor" />} />
          <Route path="/cbse-maths-home-tutor" element={<SeoLandingPage pageKey="cbse-maths-home-tutor" />} />
          <Route path="/cbse-maths-tuition" element={<SeoLandingPage pageKey="cbse-maths-tuition" />} />
          <Route path="/class-10-maths-tutor" element={<SeoLandingPage pageKey="class-10-maths-tutor" />} />
          <Route path="/class-12-maths-tutor" element={<SeoLandingPage pageKey="class-12-maths-tutor" />} />
          <Route path="/igcse-maths-home-tutor" element={<SeoLandingPage pageKey="igcse-maths-home-tutor" />} />
          <Route path="/ib-maths-home-tutor" element={<SeoLandingPage pageKey="ib-maths-home-tutor" />} />
          <Route path="/jee-maths-coaching" element={<SeoLandingPage pageKey="jee-maths-coaching" />} />
          <Route path="/tuition-fees" element={<SeoLandingPage pageKey="tuition-fees" />} />
          <Route path="/city/gurugram/sector-56" element={<SeoLandingPage pageKey="gurugram-sector-56" />} />
          <Route path="/city/:city" element={<CityPage />} />
          <Route path="/city/:city/:sector" element={<SectorPage />} />
          <Route path="/gurugram" element={<ConfigDrivenPageRoute routeType="gurugram-hub" />} />
          <Route path="/gurugram/:entrySlug" element={<ConfigDrivenPageRoute routeType="gurugram-entry" />} />
          <Route path="/tutors/:slug" element={<TutorProfile />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/blogs/:slug" element={<BlogDetailPage />} />
          <Route path="/book-demo" element={<BookDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/tutor-login" element={<TutorLogin />} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]} fallbackPath="/student-login">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tutor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["tutor"]} fallbackPath="/tutor-login">
                <TutorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProviders>
                <Outlet />
              </AdminProviders>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="login" element={<AdminLoginPage />} />
            <Route element={<AdminProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="tutors" element={<TutorsListPage />} />
                <Route path="tutors/new" element={<TutorEditorPage />} />
                <Route path="tutors/:tutorId" element={<TutorEditorPage />} />
                <Route path="reviews" element={<ReviewsPage />} />
                <Route path="reviews/new" element={<ReviewEditorPage />} />
                <Route path="blogs" element={<BlogsPage />} />
                <Route path="blogs/new" element={<BlogEditorPage />} />
                <Route path="blogs/:blogId" element={<BlogEditorPage />} />
                <Route path="pages" element={<PagesPage />} />
                <Route path="pages/new" element={<PageEditorPage />} />
                <Route path="pages/:pageId" element={<PageEditorPage />} />
                <Route path="results" element={<ResultsPage />} />
                <Route path="faqs" element={<FaqsPage />} />
                <Route path="cities" element={<CitiesPage />} />
                <Route path="localities" element={<LocalitiesPage />} />
                <Route path="media" element={<MediaPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="seo" element={<SeoPage />} />
              </Route>
            </Route>
          </Route>
          <Route path="/admin-login" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
