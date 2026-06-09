import { Link } from "react-router-dom";
import { useSiteData } from "../contexts/SiteDataContext";
import BrandLogo from "./BrandLogo";

function Footer() {
  const { siteData } = useSiteData();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center">
            <BrandLogo className="h-[72px] max-w-[280px]" />
          </div>

          <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
            A premium maths home tutoring platform for Gurugram families, students,
            and tutors across CBSE, ICSE, IGCSE, IB, JEE, Olympiad, and foundation maths.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Explore
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/" className="block hover:text-blue-600">Home</Link>
            <Link to="/subjects/maths" className="block hover:text-blue-600">Maths by Board</Link>
            <Link to="/gurugram" className="block hover:text-blue-600">Gurugram</Link>
            <Link to="/book-demo" className="block hover:text-blue-600">Book Demo</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Account
          </h4>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <Link to="/login" className="block hover:text-blue-600">Login</Link>
            <Link to="/student-login" className="block hover:text-blue-600">Student Login</Link>
            <Link to="/tutor-login" className="block hover:text-blue-600">Tutor Login</Link>
            <Link to="/admin-login" className="block hover:text-blue-600">Admin Login</Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-slate-950">
            Contact
          </h4>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <p className="font-semibold text-slate-800">{siteData.contact.email}</p>
            <p className="font-semibold text-slate-800">{siteData.contact.phoneDisplay}</p>
            <p>{siteData.contact.address ?? `${siteData.contact.city}, ${siteData.contact.state}`}</p>
            <p>{siteData.contact.supportHours}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500">
        Copyright 2026 {siteData.brandName}. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
