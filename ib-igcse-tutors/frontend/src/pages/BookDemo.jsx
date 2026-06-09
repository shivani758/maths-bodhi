import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import { GURUGRAM_LOCALITY_OPTIONS } from "../constants/filterOptions";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import {
  getBreadcrumbSchema,
  getWebPageSchema,
} from "../utils/schema";
import { buildDemoMessage, buildWhatsAppUrl } from "../utils/whatsapp";

function getUniqueOptions(options) {
  const seen = new Set();

  return options.filter((option) => {
    const key = String(option ?? "").trim().toLowerCase();

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function BookDemo() {
  const { siteData } = useSiteData();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    classLevel: "Class 10",
    board: "CBSE",
    sector: "Sector 56",
    topicNeed: "Need support in algebra and geometry",
    preferredTutor: "No preference",
    mode: "Home Tuition",
  });
  const sectorOptions = useMemo(
    () =>
      getUniqueOptions([
        ...GURUGRAM_LOCALITY_OPTIONS,
        ...siteData.sectorPages.map((sector) => sector.sectorLabel),
      ]),
    [siteData.sectorPages],
  );

  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl(
        siteData.contact.whatsappNumber,
        buildDemoMessage(siteData.contact, form),
      ),
    [form, siteData.contact],
  );
  const canonicalPath = "/book-demo";
  const schema = [
    getWebPageSchema({
      url: canonicalPath,
      name: "Book a maths demo class",
      description:
        "Book a maths demo class in Gurugram for CBSE, IB, IGCSE, ICSE, JEE, and school-specific home tutoring.",
    }),
    getBreadcrumbSchema({
      url: canonicalPath,
      items: [
        { label: "Home", to: "/" },
        { label: "Book Demo" },
      ],
    }),
  ];

  return (
    <MainLayout>
      <Seo
        title="Book Free Maths Demo Class | Maths Bodhi"
        description="Book a maths demo class in Gurugram for CBSE, IB, IGCSE, ICSE, JEE, and school-specific home tutoring."
        canonicalPath={canonicalPath}
        keywords={["book maths demo", "maths demo class gurugram", "home tutor demo"]}
        schema={schema}
      />

      <div className="min-h-screen bg-slate-50 px-4 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.94fr_1.06fr]">
          <div className="rounded-[32px] bg-blue-600 p-8 text-white shadow-xl shadow-blue-100">
            <h1 className="text-4xl font-bold">Book a maths demo class</h1>
            <p className="mt-4 text-lg leading-8 text-blue-50">
              Share the student profile, board, topic need, and preferred Gurugram sector. The
              enquiry will go straight to the Maths Bodhi WhatsApp number for fast follow-up.
            </p>
            <div className="mt-8 space-y-3 text-sm text-blue-50">
              <p>Board-aware matching for CBSE, ICSE, IGCSE, IB, and JEE maths.</p>
              <p>Premium school-specific tutoring routes for Gurugram families.</p>
              <p>Quick WhatsApp-led booking with class, board, sector, and topic details.</p>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">Demo class details</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["name", "Parent or student name", "text"],
                ["phone", "Phone number", "tel"],
              ].map(([key, label, type]) => (
                <label key={key} className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, [key]: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                  />
                </label>
              ))}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Class or level
                </span>
                <select
                  value={form.classLevel}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, classLevel: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                >
                  {["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12", "IGCSE", "IB DP", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Board</span>
                <select
                  value={form.board}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, board: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                >
                  {["CBSE", "ICSE", "IGCSE", "IB", "Foundation", "JEE Main"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Sector</span>
                <select
                  value={form.sector}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, sector: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                >
                  {sectorOptions.map((sectorLabel) => (
                    <option key={sectorLabel} value={sectorLabel}>
                      {sectorLabel}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred Tutor
                </span>
                <select
                  value={form.preferredTutor}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, preferredTutor: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                >
                  <option>No preference</option>
                  {siteData.tutors.map((tutor) => (
                    <option key={tutor.id}>{tutor.name}</option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Topic need
                </span>
                <textarea
                  rows={3}
                  value={form.topicNeed}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, topicNeed: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Preferred mode
                </span>
                <select
                  value={form.mode}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, mode: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none"
                >
                  {["Home Tuition", "Online", "Hybrid"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-blue-600 px-5 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
              >
                Send demo request to WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default BookDemo;
