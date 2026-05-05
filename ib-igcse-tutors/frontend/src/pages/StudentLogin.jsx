import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";

const defaultForm = {
  studentName: "",
  parentName: "",
  phone: "",
  classLevel: "Class 10",
  board: "CBSE",
  sector: "Sector 56",
  topics: "Algebra, geometry, and school worksheet support",
  mode: "Home Tuition",
  goal: "Need regular maths support and stronger exam confidence",
  timing: "Weekday evenings",
};

const DEFAULT_SECTOR_OPTIONS = [
  "Sector 56",
  "Sector 57",
  "Golf Course Road",
  "Sohna Road",
  "DLF Phase 4",
  "DLF Phase 5",
];

function normalizeIndianPhone(value) {
  const digits = String(value ?? "").replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("91")) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith("0")) {
    return digits.slice(1);
  }

  return digits;
}

function isValidIndianPhone(value) {
  return /^[6-9]\d{9}$/.test(normalizeIndianPhone(value));
}

function RequiredMark() {
  return <span className="ml-1 text-rose-600">*</span>;
}

function StudentLogin() {
  const { session, loginStudent } = useAuth();
  const { siteData } = useSiteData();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(defaultForm);
  const [profileMode, setProfileMode] = useState("new");
  const [errors, setErrors] = useState({});

  if (session?.role === "student") {
    return <Navigate to="/student/dashboard" replace />;
  }

  const sectorOptions = siteData.sectorPages.length
    ? siteData.sectorPages.map((sector) => sector.sectorLabel)
    : DEFAULT_SECTOR_OPTIONS;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));

    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function getFieldClass(field) {
    return `w-full rounded-2xl border px-4 py-3.5 outline-none transition ${
      errors[field]
        ? "border-rose-300 bg-rose-50 focus:border-rose-500"
        : "border-slate-200 focus:border-blue-500"
    }`;
  }

  function validateForm() {
    const nextErrors = {};
    const requiredFields = {
      studentName: "Student name is required.",
      parentName: "Parent name is required.",
      phone: "Phone number is required.",
      classLevel: "Class or level is required.",
      board: "Board is required.",
      sector: "Preferred Gurugram sector is required.",
      mode: "Preferred mode is required.",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!String(form[field] ?? "").trim()) {
        nextErrors[field] = message;
      }
    });

    if (form.phone && !isValidIndianPhone(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    loginStudent(form);
    navigate("/student/dashboard");
  }

  return (
    <MainLayout>
      <Seo
        title="Student Login | Maths Bodhi"
        description="Student dashboard access for maths home tuition in Gurugram. Share your class, board, sector, and learning needs to start tutor matching."
        canonicalPath={location.pathname === "/student/login" ? "/student/login" : "/student-login"}
        keywords={["student maths dashboard", "maths tutor matching", "gurugram student login"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[32px] bg-slate-950 p-8 text-white shadow-xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-cyan-300">
              Student Access
            </span>
            <h1 className="mt-5 text-4xl font-bold">
              Start your maths support journey with the right details
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              This login is designed as a smart intake step. Once you continue, the student
              dashboard can send your full brief directly to the Maths Bodhi WhatsApp number for
              matching and follow-up.
            </p>
            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>Board-aware matching for CBSE, ICSE, IGCSE, IB, and JEE maths.</p>
              <p>Sector-based coverage across premium Gurugram localities.</p>
              <p>Parent-friendly workflow with clear next steps after login.</p>
            </div>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-2xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to website
            </Link>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Student login details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Share enough information to help us route you to the correct maths tutor and
              WhatsApp conversation.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                {
                  id: "new",
                  title: "New student",
                  text: "Submit details for tutor matching and the student intake dashboard.",
                },
                {
                  id: "returning",
                  title: "Returning student",
                  text: "If this browser has a saved session, Maths Bodhi opens the dashboard automatically.",
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProfileMode(item.id)}
                  className={`rounded-2xl border p-4 text-left transition motion-safe:hover:-translate-y-0.5 ${
                    profileMode === item.id
                      ? "border-blue-200 bg-blue-50 text-blue-800"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-200"
                  }`}
                >
                  <span className="block text-sm font-bold text-slate-950">{item.title}</span>
                  <span className="mt-2 block text-sm leading-6">{item.text}</span>
                </button>
              ))}
            </div>

            {profileMode === "returning" ? (
              <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                No saved student dashboard is open in this browser right now. Continue the intake
                below to rebuild the local session safely.
              </p>
            ) : null}

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              noValidate
              onSubmit={handleSubmit}
            >
              {[
                ["studentName", "Student Name", "text"],
                ["parentName", "Parent Name", "text"],
                ["phone", "Phone Number", "tel"],
              ].map(([key, label, type]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {label}
                    <RequiredMark />
                  </span>
                  <input
                    required
                    aria-invalid={Boolean(errors[key])}
                    inputMode={key === "phone" ? "tel" : undefined}
                    type={type}
                    value={form[key]}
                    onChange={(event) => updateField(key, event.target.value)}
                    className={getFieldClass(key)}
                  />
                  {errors[key] ? (
                    <span className="mt-2 block text-xs font-semibold text-rose-600">
                      {errors[key]}
                    </span>
                  ) : null}
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Class or Level
                  <RequiredMark />
                </span>
                <select
                  required
                  aria-invalid={Boolean(errors.classLevel)}
                  value={form.classLevel}
                  onChange={(event) => updateField("classLevel", event.target.value)}
                  className={getFieldClass("classLevel")}
                >
                  {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "IGCSE", "IB DP", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.classLevel ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.classLevel}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Board
                  <RequiredMark />
                </span>
                <select
                  required
                  aria-invalid={Boolean(errors.board)}
                  value={form.board}
                  onChange={(event) => updateField("board", event.target.value)}
                  className={getFieldClass("board")}
                >
                  {["CBSE", "ICSE", "IGCSE", "IB", "Foundation", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.board ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.board}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Gurugram Sector
                  <RequiredMark />
                </span>
                <select
                  required
                  aria-invalid={Boolean(errors.sector)}
                  value={form.sector}
                  onChange={(event) => updateField("sector", event.target.value)}
                  className={getFieldClass("sector")}
                >
                  {sectorOptions.map((sectorLabel) => (
                    <option key={sectorLabel} value={sectorLabel}>
                      {sectorLabel}
                    </option>
                  ))}
                </select>
                {errors.sector ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.sector}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Mode
                  <RequiredMark />
                </span>
                <select
                  required
                  aria-invalid={Boolean(errors.mode)}
                  value={form.mode}
                  onChange={(event) => updateField("mode", event.target.value)}
                  className={getFieldClass("mode")}
                >
                  {["Home Tuition", "Online", "Hybrid"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.mode ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.mode}
                  </span>
                ) : null}
              </label>

              {[
                ["topics", "Topics or current problem"],
                ["goal", "Goal from tutoring"],
                ["timing", "Preferred timing"],
              ].map(([key, label]) => (
                <label key={key} className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                  <textarea
                    rows={key === "topics" ? 3 : 2}
                    value={form[key]}
                    onChange={(event) => updateField(key, event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                  />
                </label>
              ))}

              <button className="md:col-span-2 rounded-2xl bg-blue-600 px-5 py-4 font-semibold text-white transition hover:bg-blue-700">
                Continue profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default StudentLogin;
