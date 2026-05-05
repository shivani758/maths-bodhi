import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useAuth } from "../contexts/AuthContext";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";

const defaultForm = {
  name: "",
  phone: "",
  email: "",
  experience: "5 years",
  boards: "CBSE, IGCSE",
  topics: "Algebra, geometry, and board exam support",
  sectors: "Sector 56, Sector 57",
  availability: "Weekday evenings and Saturday mornings",
  summary: "I am a maths tutor looking to onboard with premium Gurugram families.",
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

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? "").trim());
}

function RequiredMark() {
  return <span className="ml-1 text-rose-600">*</span>;
}

function TutorLogin() {
  const { session, loginTutor } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(defaultForm);
  const [profileMode, setProfileMode] = useState("new");
  const [errors, setErrors] = useState({});
  const { siteData } = useSiteData();

  if (session?.role === "tutor") {
    return <Navigate to="/tutor/dashboard" replace />;
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
      name: "Tutor name is required.",
      phone: "Phone number is required.",
      email: "Email is required.",
      experience: "Experience is required.",
      boards: "Boards/classes taught is required.",
      sectors: "Preferred Gurugram sectors are required.",
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      if (!String(form[field] ?? "").trim()) {
        nextErrors[field] = message;
      }
    });

    if (form.phone && !isValidIndianPhone(form.phone)) {
      nextErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (form.email && !isValidEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
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

    loginTutor(form);
    navigate("/tutor/dashboard");
  }

  return (
    <MainLayout>
      <Seo
        title="Tutor Login | Maths Bodhi"
        description="Tutor dashboard access for maths specialists who want to onboard with Maths Bodhi and connect through a WhatsApp-first workflow."
        canonicalPath={location.pathname === "/tutor/login" ? "/tutor/login" : "/tutor-login"}
        keywords={["maths tutor login", "tutor dashboard", "gurugram maths tutor onboarding"]}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div className="rounded-[32px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
              Tutor Access
            </span>
            <h1 className="mt-5 text-4xl font-bold">
              Join a premium maths tutoring workflow designed for Gurugram
            </h1>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Share your teaching profile, boards, sectors, and availability. After login, the
              tutor dashboard can send your onboarding brief straight to the Maths Bodhi WhatsApp
              number for review.
            </p>
            <div className="mt-8 space-y-3 text-sm text-blue-50">
              <p>Highlight your strongest boards, classes, and maths topics.</p>
              <p>Choose preferred sectors for home tuition routing in Gurugram.</p>
              <p>Use the tutor dashboard to submit documents, availability, and profile updates.</p>
            </div>
            <Link
              to="/"
              className="mt-8 inline-flex rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to website
            </Link>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Tutor login details</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              This information helps the team review fit, local routing, and premium school
              compatibility before your profile is finalized.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                {
                  id: "new",
                  title: "New tutor",
                  text: "Submit teaching details for profile review and onboarding.",
                },
                {
                  id: "returning",
                  title: "Returning tutor",
                  text: "If this browser has a saved tutor session, Maths Bodhi opens the dashboard automatically.",
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
                No saved tutor dashboard is open in this browser right now. Continue the onboarding
                form below to rebuild the local session safely.
              </p>
            ) : null}

            <form
              className="mt-6 grid gap-4 md:grid-cols-2"
              noValidate
              onSubmit={handleSubmit}
            >
              {[
                ["name", "Tutor Name", "text"],
                ["phone", "Phone Number", "tel"],
                ["email", "Email", "email"],
                ["experience", "Experience", "text"],
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

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Boards/classes taught
                  <RequiredMark />
                </span>
                <input
                  required
                  aria-invalid={Boolean(errors.boards)}
                  value={form.boards}
                  onChange={(event) => updateField("boards", event.target.value)}
                  className={getFieldClass("boards")}
                />
                {errors.boards ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.boards}
                  </span>
                ) : null}
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Maths topics and specialization
                </span>
                <textarea
                  rows={3}
                  value={form.topics}
                  onChange={(event) => updateField("topics", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Gurugram sectors
                  <RequiredMark />
                </span>
                <input
                  required
                  aria-invalid={Boolean(errors.sectors)}
                  value={form.sectors}
                  onChange={(event) => updateField("sectors", event.target.value)}
                  className={getFieldClass("sectors")}
                  list="sector-options"
                />
                <datalist id="sector-options">
                  {sectorOptions.map((sectorLabel) => (
                    <option key={sectorLabel} value={sectorLabel} />
                  ))}
                </datalist>
                {errors.sectors ? (
                  <span className="mt-2 block text-xs font-semibold text-rose-600">
                    {errors.sectors}
                  </span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Availability
                </span>
                <input
                  value={form.availability}
                  onChange={(event) => updateField("availability", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Short profile summary
                </span>
                <textarea
                  rows={4}
                  value={form.summary}
                  onChange={(event) => updateField("summary", event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500"
                />
              </label>

              <button className="md:col-span-2 rounded-2xl bg-slate-950 px-5 py-4 font-semibold text-white transition hover:bg-slate-800">
                Update profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default TutorLogin;
