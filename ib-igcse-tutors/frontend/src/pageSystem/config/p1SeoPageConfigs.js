const DEMO_PATH = "/book-free-demo-class";
const WHATSAPP_NUMBER = "919896825986";

function row({
  id,
  segment,
  pageType,
  audience,
  cluster,
  title,
  path,
  parent,
  keyword,
  links = "",
}) {
  return { id, segment, pageType, audience, cluster, title, path, parent, keyword, links };
}

export const p1SeoUrlRows = [
  row({ id: 1, segment: "Core Service", pageType: "Homepage", audience: "All", cluster: "Brand", title: "Maths Bodhi | Maths Home Tutor, Board Maths and JEE Preparation", path: "/", parent: "/", keyword: "maths home tutor", links: "/maths-home-tutor | /jee-maths-coaching | /book-free-demo-class" }),
  row({ id: 3, segment: "Core Service", pageType: "Lead Gen Page", audience: "Parents + Students", cluster: "Lead Generation", title: "Contact Maths Bodhi", path: "/contact-us", parent: "/", keyword: "contact maths tutor", links: "/book-free-demo-class | /maths-home-tutor | /jee-maths-coaching" }),
  row({ id: 4, segment: "Core Service", pageType: "Lead Gen Page", audience: "Parents + Students", cluster: "Lead Generation", title: "Book Free Demo Class", path: DEMO_PATH, parent: "/", keyword: "book free demo class maths tutor", links: "/maths-home-tutor | /jee-maths-coaching | /cbse-class-10-maths-tutor" }),
  row({ id: 5, segment: "Core Service", pageType: "Commercial Page", audience: "Parents", cluster: "Pricing", title: "Tuition Fees", path: "/tuition-fees", parent: "/", keyword: "maths tuition fees", links: "/book-free-demo-class | /maths-home-tutor | /online-maths-home-tuition" }),
  row({ id: 9, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Home Tuition", title: "Maths Home Tutor", path: "/maths-home-tutor", parent: "/", keyword: "maths home tutor", links: "/book-free-demo-class | /cbse-maths-tuition | /jee-maths-coaching" }),
  row({ id: 10, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Online Tuition", title: "Online Maths Home Tuition", path: "/online-maths-home-tuition", parent: "/maths-home-tutor", keyword: "online maths tutor", links: "/maths-home-tutor | /book-free-demo-class | /small-group-maths-tuition" }),
  row({ id: 11, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Format", title: "One to One Maths Tuition", path: "/one-to-one-maths-tuition", parent: "/maths-home-tutor", keyword: "one to one maths tuition", links: "/maths-home-tutor | /book-free-demo-class | /premium-school-maths-home-tutor" }),
  row({ id: 16, segment: "Core Service", pageType: "Program Page", audience: "School Students", cluster: "Foundation", title: "Maths Foundation Program", path: "/maths-foundation-program", parent: "/", keyword: "maths foundation course", links: "/school-maths-foundation-program | /olympiad-maths-coaching | /book-free-demo-class" }),
  row({ id: 20, segment: "Core Service", pageType: "Program Page", audience: "Students", cluster: "Revision", title: "Maths Revision Program", path: "/maths-revision-program", parent: "/", keyword: "maths revision program", links: "/maths-test-series | /board-maths-syllabus-wise-tuition | /book-free-demo-class" }),
  row({ id: 21, segment: "Core Service", pageType: "Service Page", audience: "Premium School Students", cluster: "Premium Schools", title: "Premium School Maths Home Tutor", path: "/premium-school-maths-home-tutor", parent: "/", keyword: "premium school maths tutor", links: "/premium-school-maths-program | /ib-maths-tuition | /igcse-maths-tuition" }),
  row({ id: 22, segment: "Core Service", pageType: "Service Page", audience: "Board Students", cluster: "Board", title: "CBSE Maths Home Tutor", path: "/cbse-maths-home-tutor", parent: "/", keyword: "cbse maths home tutor", links: "/cbse-maths-tuition | /cbse-class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 23, segment: "Core Service", pageType: "Service Page", audience: "Board Students", cluster: "Board", title: "ICSE Maths Home Tutor", path: "/icse-maths-home-tutor", parent: "/", keyword: "icse maths home tutor", links: "/icse-maths-tuition | /icse-class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 24, segment: "Core Service", pageType: "Service Page", audience: "Board Students", cluster: "Board", title: "ISC Maths Home Tutor", path: "/isc-maths-home-tutor", parent: "/", keyword: "isc maths home tutor", links: "/isc-maths-tuition | /isc-class-12-maths-tutor | /book-free-demo-class" }),
  row({ id: 25, segment: "Core Service", pageType: "Service Page", audience: "Premium School Students", cluster: "Premium Schools", title: "IGCSE Maths Home Tutor", path: "/igcse-maths-home-tutor", parent: "/premium-school-maths-home-tutor", keyword: "igcse maths tutor", links: "/igcse-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 26, segment: "Core Service", pageType: "Service Page", audience: "Premium School Students", cluster: "Premium Schools", title: "IB Maths Home Tutor", path: "/ib-maths-home-tutor", parent: "/premium-school-maths-home-tutor", keyword: "ib maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 27, segment: "Core Service", pageType: "Commercial Page", audience: "JEE Aspirants", cluster: "JEE", title: "JEE Maths Coaching", path: "/jee-maths-coaching", parent: "/", keyword: "jee maths coaching", links: "/jee-main-maths-coaching | /jee-advanced-maths-coaching | /book-free-demo-class" }),
  row({ id: 28, segment: "Core Service", pageType: "Commercial Page", audience: "JEE Aspirants", cluster: "JEE", title: "JEE Advanced Maths Coaching", path: "/jee-advanced-maths-coaching", parent: "/jee-maths-coaching", keyword: "jee advanced maths coaching", links: "/jee-maths-coaching | /jee-maths/strategy/jee-advanced-maths-problem-solving | /book-free-demo-class" }),
  row({ id: 29, segment: "Core Service", pageType: "Commercial Page", audience: "JEE Aspirants", cluster: "JEE", title: "JEE Main Maths Coaching", path: "/jee-main-maths-coaching", parent: "/jee-maths-coaching", keyword: "jee main maths coaching", links: "/jee-maths-coaching | /jee-maths/strategy/jee-main-maths-mock-tests | /book-free-demo-class" }),
  row({ id: 81, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Board Students", cluster: "CBSE", title: "CBSE Maths Tuition", path: "/cbse-maths-tuition", parent: "/cbse-maths-home-tutor", keyword: "cbse maths tuition", links: "/cbse-class-10-maths-tutor | /cbse-class-12-maths-tutor | /book-free-demo-class" }),
  row({ id: 82, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 6", title: "CBSE Class 6 Maths Tutor", path: "/cbse-class-6-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 6 maths tutor", links: "/cbse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 83, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 7", title: "CBSE Class 7 Maths Tutor", path: "/cbse-class-7-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 7 maths tutor", links: "/cbse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 84, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 8", title: "CBSE Class 8 Maths Tutor", path: "/cbse-class-8-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 8 maths tutor", links: "/cbse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 85, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 9", title: "CBSE Class 9 Maths Tutor", path: "/cbse-class-9-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 9 maths tutor", links: "/cbse-maths-tuition | /cbse-class-9-maths/number-systems | /book-free-demo-class" }),
  row({ id: 86, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 10", title: "CBSE Class 10 Maths Tutor", path: "/cbse-class-10-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 10 maths tutor", links: "/cbse-maths-tuition | /cbse-class-10-maths/quadratic-equations | /book-free-demo-class" }),
  row({ id: 87, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 11", title: "CBSE Class 11 Maths Tutor", path: "/cbse-class-11-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 11 maths tutor", links: "/cbse-maths-tuition | /cbse-class-11-maths/sets | /book-free-demo-class" }),
  row({ id: 88, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "CBSE Class 12", title: "CBSE Class 12 Maths Tutor", path: "/cbse-class-12-maths-tutor", parent: "/cbse-maths-tuition", keyword: "cbse class 12 maths tutor", links: "/cbse-maths-tuition | /cbse-class-12-maths/integrals | /book-free-demo-class" }),
  row({ id: 89, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Board Students", cluster: "ICSE", title: "ICSE Maths Tuition", path: "/icse-maths-tuition", parent: "/icse-maths-home-tutor", keyword: "icse maths tuition", links: "/icse-class-9-maths-tutor | /icse-class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 90, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ICSE Class 6", title: "ICSE Class 6 Maths Tutor", path: "/icse-class-6-maths-tutor", parent: "/icse-maths-tuition", keyword: "icse class 6 maths tutor", links: "/icse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 91, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ICSE Class 7", title: "ICSE Class 7 Maths Tutor", path: "/icse-class-7-maths-tutor", parent: "/icse-maths-tuition", keyword: "icse class 7 maths tutor", links: "/icse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 92, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ICSE Class 8", title: "ICSE Class 8 Maths Tutor", path: "/icse-class-8-maths-tutor", parent: "/icse-maths-tuition", keyword: "icse class 8 maths tutor", links: "/icse-maths-tuition | /school-maths-foundation-program | /book-free-demo-class" }),
  row({ id: 93, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ICSE Class 9", title: "ICSE Class 9 Maths Tutor", path: "/icse-class-9-maths-tutor", parent: "/icse-maths-tuition", keyword: "icse class 9 maths tutor", links: "/icse-maths-tuition | /icse-class-9-maths/rational-and-irrational-numbers | /book-free-demo-class" }),
  row({ id: 94, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ICSE Class 10", title: "ICSE Class 10 Maths Tutor", path: "/icse-class-10-maths-tutor", parent: "/icse-maths-tuition", keyword: "icse class 10 maths tutor", links: "/icse-maths-tuition | /icse-class-10-maths/quadratic-equations | /book-free-demo-class" }),
  row({ id: 95, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Board Students", cluster: "ISC", title: "ISC Maths Tuition", path: "/isc-maths-tuition", parent: "/isc-maths-home-tutor", keyword: "isc maths tuition", links: "/isc-class-11-maths-tutor | /isc-class-12-maths-tutor | /book-free-demo-class" }),
  row({ id: 96, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ISC Class 11", title: "ISC Class 11 Maths Tutor", path: "/isc-class-11-maths-tutor", parent: "/isc-maths-tuition", keyword: "isc class 11 maths tutor", links: "/isc-maths-tuition | /cbse-class-11-maths/sets | /book-free-demo-class" }),
  row({ id: 97, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "ISC Class 12", title: "ISC Class 12 Maths Tutor", path: "/isc-class-12-maths-tutor", parent: "/isc-maths-tuition", keyword: "isc class 12 maths tutor", links: "/isc-maths-tuition | /cbse-class-12-maths/integrals | /book-free-demo-class" }),
  row({ id: 98, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Premium School Students", cluster: "IGCSE", title: "IGCSE Maths Tuition", path: "/igcse-maths-tuition", parent: "/igcse-maths-home-tutor", keyword: "igcse maths tuition", links: "/igcse-grade-9-maths-tutor | /igcse-grade-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 99, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IGCSE Grade 9", title: "IGCSE Grade 9 Maths Tutor", path: "/igcse-grade-9-maths-tutor", parent: "/igcse-maths-tuition", keyword: "igcse grade 9 maths tutor", links: "/igcse-maths-tuition | /igcse-maths/algebra-and-graphs | /book-free-demo-class" }),
  row({ id: 100, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IGCSE Grade 10", title: "IGCSE Grade 10 Maths Tutor", path: "/igcse-grade-10-maths-tutor", parent: "/igcse-maths-tuition", keyword: "igcse grade 10 maths tutor", links: "/igcse-maths-tuition | /igcse-maths/probability-and-statistics | /book-free-demo-class" }),
  row({ id: 101, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Premium School Students", cluster: "IB", title: "IB Maths Tuition", path: "/ib-maths-tuition", parent: "/ib-maths-home-tutor", keyword: "ib maths tuition", links: "/ib-maths-aa-hl-tutor | /ib-maths-ai-hl-tutor | /book-free-demo-class" }),
  row({ id: 102, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB MYP 1", title: "IB MYP 1 Maths Tutor", path: "/ib-myp-1-maths-tutor", parent: "/ib-maths-tuition", keyword: "ib myp 1 maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 103, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB MYP 2", title: "IB MYP 2 Maths Tutor", path: "/ib-myp-2-maths-tutor", parent: "/ib-maths-tuition", keyword: "ib myp 2 maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 104, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB MYP 3", title: "IB MYP 3 Maths Tutor", path: "/ib-myp-3-maths-tutor", parent: "/ib-maths-tuition", keyword: "ib myp 3 maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 105, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB MYP 4", title: "IB MYP 4 Maths Tutor", path: "/ib-myp-4-maths-tutor", parent: "/ib-maths-tuition", keyword: "ib myp 4 maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 106, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB MYP 5", title: "IB MYP 5 Maths Tutor", path: "/ib-myp-5-maths-tutor", parent: "/ib-maths-tuition", keyword: "ib myp 5 maths tutor", links: "/ib-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 107, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB Diploma", title: "IB Maths AA SL Tutor", path: "/ib-maths-aa-sl-tutor", parent: "/ib-maths-tuition", keyword: "ib maths aa sl tutor", links: "/ib-maths-tuition | /ib-maths/calculus-aa | /book-free-demo-class" }),
  row({ id: 108, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB Diploma", title: "IB Maths AA HL Tutor", path: "/ib-maths-aa-hl-tutor", parent: "/ib-maths-tuition", keyword: "ib maths aa hl tutor", links: "/ib-maths-tuition | /ib-maths/calculus-aa | /book-free-demo-class" }),
  row({ id: 109, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB Diploma", title: "IB Maths AI SL Tutor", path: "/ib-maths-ai-sl-tutor", parent: "/ib-maths-tuition", keyword: "ib maths ai sl tutor", links: "/ib-maths-tuition | /ib-maths/applications-and-interpretation | /book-free-demo-class" }),
  row({ id: 110, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "IB Diploma", title: "IB Maths AI HL Tutor", path: "/ib-maths-ai-hl-tutor", parent: "/ib-maths-tuition", keyword: "ib maths ai hl tutor", links: "/ib-maths-tuition | /ib-maths/applications-and-interpretation | /book-free-demo-class" }),
  row({ id: 111, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Premium School Students", cluster: "Cambridge", title: "Cambridge Maths Tuition", path: "/cambridge-maths-tuition", parent: "/premium-school-maths-home-tutor", keyword: "cambridge maths tuition", links: "/cambridge-igcse-maths-tutor | /cambridge-a-level-maths-tutor | /book-free-demo-class" }),
  row({ id: 112, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "Cambridge Lower Secondary", title: "Cambridge Lower Secondary Maths Tutor", path: "/cambridge-lower-secondary-maths-tutor", parent: "/cambridge-maths-tuition", keyword: "cambridge lower secondary maths tutor", links: "/cambridge-maths-tuition | /premium-school-maths-program | /book-free-demo-class" }),
  row({ id: 113, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "Cambridge IGCSE", title: "Cambridge IGCSE Maths Tutor", path: "/cambridge-igcse-maths-tutor", parent: "/cambridge-maths-tuition", keyword: "cambridge igcse maths tutor", links: "/cambridge-maths-tuition | /igcse-maths-tuition | /book-free-demo-class" }),
  row({ id: 114, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "Cambridge AS Level", title: "Cambridge AS Level Maths Tutor", path: "/cambridge-as-level-maths-tutor", parent: "/cambridge-maths-tuition", keyword: "cambridge as level maths tutor", links: "/cambridge-maths-tuition | /book-free-demo-class | /premium-school-maths-program" }),
  row({ id: 115, segment: "Curriculum / Class", pageType: "Class Service", audience: "Premium School Students", cluster: "Cambridge A Level", title: "Cambridge A Level Maths Tutor", path: "/cambridge-a-level-maths-tutor", parent: "/cambridge-maths-tuition", keyword: "cambridge a level maths tutor", links: "/cambridge-maths-tuition | /book-free-demo-class | /premium-school-maths-program" }),
  row({ id: 116, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "Applied Maths", title: "Class 11 Applied Maths Tutor", path: "/class-11-applied-maths-tutor", parent: "/board-maths-syllabus-wise-tuition", keyword: "class 11 applied maths tutor", links: "/board-maths-syllabus-wise-tuition | /cuet-maths-coaching | /book-free-demo-class" }),
  row({ id: 117, segment: "Curriculum / Class", pageType: "Class Service", audience: "Board Students", cluster: "Applied Maths", title: "Class 12 Applied Maths Tutor", path: "/class-12-applied-maths-tutor", parent: "/board-maths-syllabus-wise-tuition", keyword: "class 12 applied maths tutor", links: "/board-maths-syllabus-wise-tuition | /cuet-maths-coaching | /book-free-demo-class" }),
  row({ id: 118, segment: "Curriculum / Class", pageType: "Program Page", audience: "Premium School Students", cluster: "Premium Schools", title: "Premium School Maths Program", path: "/premium-school-maths-program", parent: "/premium-school-maths-home-tutor", keyword: "premium school maths program", links: "/premium-school-maths-home-tutor | /ib-maths-tuition | /igcse-maths-tuition" }),
  row({ id: 119, segment: "Curriculum / Class", pageType: "Program Page", audience: "School Students", cluster: "Foundation", title: "School Maths Foundation Program", path: "/school-maths-foundation-program", parent: "/maths-foundation-program", keyword: "school maths foundation program", links: "/maths-foundation-program | /olympiad-maths-coaching | /book-free-demo-class" }),
  row({ id: 120, segment: "Curriculum / Class", pageType: "Curriculum Hub", audience: "Board Students", cluster: "Board", title: "Board Maths Syllabus Wise Tuition", path: "/board-maths-syllabus-wise-tuition", parent: "/", keyword: "board maths syllabus wise tuition", links: "/cbse-maths-tuition | /icse-maths-tuition | /book-free-demo-class" }),
];

const knownSupportingPages = [
  { path: "/city/gurugram", title: "Gurugram Maths Tutor Hub", segment: "Location", cluster: "Gurugram" },
  { path: "/subjects/maths", title: "Maths by Board", segment: "Board", cluster: "Boards" },
  { path: "/gurugram", title: "Gurugram Maths Home Tuition", segment: "Location", cluster: "Gurugram" },
  { path: "/class-10-maths-tutor", title: "Class 10 Maths Tutor", segment: "Class", cluster: "Class 10" },
  { path: "/class-12-maths-tutor", title: "Class 12 Maths Tutor", segment: "Class", cluster: "Class 12" },
];

const p1RowByPath = new Map(p1SeoUrlRows.map((item) => [item.path, item]));
const routeCatalog = new Map([
  ...p1SeoUrlRows.map((item) => [item.path, item]),
  ...knownSupportingPages.map((item) => [item.path, item]),
]);

export const p1SeoPagePaths = p1SeoUrlRows.map((item) => item.path);

function slugFromPath(path) {
  return path.replace(/^\//, "") || "home";
}

function normalizePath(path) {
  return String(path ?? "").trim();
}

function splitLinkPaths(value) {
  return String(value ?? "")
    .split("|")
    .map((item) => normalizePath(item))
    .filter(Boolean);
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function getPageLabel(path) {
  return routeCatalog.get(path)?.title ?? path;
}

function getPageDescription(path, currentRow) {
  const linked = routeCatalog.get(path);

  if (!linked) {
    return "Continue comparing the most relevant Maths Bodhi route before booking a demo.";
  }

  if (path === DEMO_PATH) {
    return "Share the student's class, board, target chapters, and preferred learning mode before the first conversation.";
  }

  if (path === "/") {
    return "Return to the main Maths Bodhi hub for board, class, and tutor discovery across Gurugram.";
  }

  if (path === "/city/gurugram") {
    return "Compare Gurugram sector context, tutor availability, and local home-tuition fit.";
  }

  if (linked.cluster === currentRow.cluster) {
    return `Stay within the ${linked.cluster} cluster and compare the next best-fit maths route.`;
  }

  return `Open this ${linked.segment.toLowerCase()} route to compare ${linked.keyword ?? linked.title} with the current page.`;
}

function routeCard(path, currentRow) {
  const linked = routeCatalog.get(path);
  return {
    eyebrow: path === DEMO_PATH ? "Demo CTA" : linked?.segment ?? "Related route",
    title: getPageLabel(path),
    description: getPageDescription(path, currentRow),
    tags: unique([linked?.cluster, linked?.pageType, path === currentRow.parent ? "Parent hub" : ""]).slice(0, 3),
    to: path,
  };
}

function getRelatedPaths(currentRow) {
  const suggestedPaths = splitLinkPaths(currentRow.links).filter((path) => routeCatalog.has(path));
  const sameClusterPaths = p1SeoUrlRows
    .filter((item) => item.path !== currentRow.path && item.cluster === currentRow.cluster)
    .map((item) => item.path);
  const sameSegmentPaths = p1SeoUrlRows
    .filter((item) => item.path !== currentRow.path && item.segment === currentRow.segment)
    .map((item) => item.path);

  return unique([
    currentRow.parent !== currentRow.path ? currentRow.parent : "",
    "/",
    "/city/gurugram",
    DEMO_PATH,
    ...suggestedPaths,
    ...sameClusterPaths,
    ...sameSegmentPaths,
  ])
    .filter((path) => path !== currentRow.path && routeCatalog.has(path))
    .slice(0, 8);
}

function readableAudience(rowData) {
  if (rowData.audience === "All") {
    return "Gurugram families";
  }

  return rowData.audience.toLowerCase();
}

function getHeroIntro(rowData) {
  const audience = readableAudience(rowData);
  const base = `${rowData.title} is a focused Maths Bodhi landing page for ${audience} comparing ${rowData.keyword} with clear next steps.`;

  if (rowData.cluster.includes("JEE")) {
    return `${base} It keeps the JEE maths conversation practical: target exam, weekly problem-solving rhythm, revision load, and when to book a demo.`;
  }

  if (rowData.cluster.includes("IB") || rowData.cluster.includes("IGCSE") || rowData.cluster.includes("Cambridge") || rowData.cluster.includes("Premium")) {
    return `${base} It is written for premium-school and international-curriculum families who need pathway-aware maths support without generic shortcuts.`;
  }

  if (rowData.pageType === "Class Service") {
    return `${base} It helps parents compare class level, board expectations, chapter pressure, and the right tutoring format before shortlisting.`;
  }

  return `${base} It links the parent hub, related maths routes, and the demo flow so families can move from browsing to a useful first conversation.`;
}

function buildSupportPoints(rowData) {
  return [
    {
      title: `Personalised maths support for ${readableAudience(rowData)}`,
      description: `This page narrows the search around ${rowData.keyword}, the student's current level, and the kind of weekly support that would actually help.`,
    },
    {
      title: `What this ${rowData.pageType.toLowerCase()} covers`,
      description: `Families can compare board fit, class expectations, practice needs, and whether the next step should be home tuition, online support, or a focused planning call.`,
    },
    {
      title: "How Maths Bodhi keeps the first shortlist practical",
      description: "The route points back to the correct hub, filters related pages, and uses the demo request to capture class, board, topic pressure, locality, and preferred mode.",
    },
  ];
}

function buildFaqs(rowData) {
  return [
    {
      question: `Who is ${rowData.title} for?`,
      answer: `It is for ${readableAudience(rowData)} who are comparing ${rowData.keyword} and want a clear next step before speaking with Maths Bodhi.`,
    },
    {
      question: "What should parents share before booking a demo?",
      answer: "Share the student's class, board, recent test pattern, chapters causing difficulty, locality or online preference, and the result expected from the first month of support.",
    },
    {
      question: "Does this page guarantee a specific tutor or result?",
      answer: "No. Maths Bodhi only shows or recommends available published tutor profiles and uses the demo conversation to check fit, schedule, and academic need.",
    },
  ];
}

function createWhatsAppHref(rowData) {
  const message = `Hello Maths Bodhi, I want help with ${rowData.title}. Please guide me on the right maths support and demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function buildBreadcrumbs(rowData) {
  const items = [{ label: "Home", to: "/" }];
  const parent = p1RowByPath.get(rowData.parent) ?? routeCatalog.get(rowData.parent);

  if (parent && rowData.parent !== "/" && rowData.parent !== rowData.path) {
    items.push({ label: parent.title, to: rowData.parent });
  }

  items.push({ label: rowData.title });
  return items;
}

function createSeoConfig(rowData) {
  const relatedPaths = getRelatedPaths(rowData);
  const relatedCards = relatedPaths.map((path) => routeCard(path, rowData));
  const tokens = unique([
    rowData.keyword,
    rowData.title,
    rowData.cluster,
    rowData.audience,
    "Gurugram",
  ]);

  return {
    id: `p1-${rowData.id}`,
    slug: slugFromPath(rowData.path),
    routePath: rowData.path,
    pageType: rowData.pageType,
    template: "GenericPageTemplate",
    title: rowData.title,
    h1: rowData.title,
    intro: getHeroIntro(rowData),
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "route-groups", template: "route-groups", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "faqs", template: "faqs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      cityLabel: "Gurugram",
      tokens,
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens,
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      tokens,
      limit: 3,
    },
    seoTitle: rowData.title.includes("Maths Bodhi") ? rowData.title : `${rowData.title} | Maths Bodhi`,
    seoDescription: `Explore ${rowData.keyword} with Maths Bodhi. Compare the right parent hub, related maths routes, tutor-fit checks, and book a free demo class.`,
    canonicalUrl: rowData.path,
    breadcrumbItems: buildBreadcrumbs(rowData),
    schemaType: rowData.pageType === "Curriculum Hub" ? "CollectionPage" : "Service",
    publishStatus: "published",
    entity: rowData,
    sections: {
      hero: {
        badge: `${rowData.segment} - ${rowData.pageType}`,
        chips: unique([rowData.cluster, rowData.audience, "P1", "Gurugram"]).slice(0, 5),
        stats: [
          { value: "P1", label: "Priority page" },
          { value: "3-8", label: "Contextual internal links" },
          { value: "Demo", label: "WhatsApp-led next step" },
        ],
        supportPanel: {
          title: `Start with ${rowData.keyword}, then choose the right next page`,
          text: `This page is connected to ${getPageLabel(rowData.parent)} and the core demo flow, so the journey stays clear instead of becoming another isolated SEO page.`,
          bullets: [
            `Parent hub: ${getPageLabel(rowData.parent)}`,
            `Audience: ${rowData.audience}`,
            `Cluster: ${rowData.cluster}`,
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${rowData.title} support from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Page Focus",
        title: `What families should know about ${rowData.title}`,
        subtitle: "These sections keep the page useful for parents and students while staying close to the P1 search intent from the SEO plan.",
        points: buildSupportPoints(rowData),
      },
      routeGroups: [
        {
          id: `p1-links-${rowData.id}`,
          badge: "Related Maths Bodhi Pages",
          title: "Continue through the most relevant internal links",
          subtitle: "These links include the parent hub, homepage, Gurugram context, demo flow, and related P1 SEO pages that already work in this phase.",
          cards: relatedCards,
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published tutor profiles for ${rowData.title}`,
        subtitle: "When matching published tutor profiles are available, they appear here without adding fake tutors, reviews, or results.",
        emptyState: {
          title: "No matching published tutor profile is shown on this page yet",
          description: "Maths Bodhi will use the demo conversation to check class, board, schedule, and tutor availability before recommending a fit.",
          primaryAction: {
            label: "Book a free maths demo class",
            to: DEMO_PATH,
          },
          secondaryAction: {
            label: "Browse Gurugram tutor context",
            to: "/city/gurugram",
          },
        },
      },
      faqs: buildFaqs(rowData),
      cta: {
        title: "Book a free maths demo class",
        description: `Share the student's class, board, current maths concern, and whether ${rowData.keyword} is the main priority. Maths Bodhi can guide the next step on WhatsApp.`,
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createWhatsAppHref(rowData),
          external: true,
        },
      },
    },
  };
}

export const p1SeoPageConfigs = p1SeoUrlRows
  .filter((item) => item.path !== "/" && item.path !== DEMO_PATH)
  .map((item) => createSeoConfig(item));

export function getP1SeoPageConfig(slug) {
  return p1SeoPageConfigs.find((item) => item.slug === slug) ?? null;
}
