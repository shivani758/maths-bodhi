import {
  batchALocalityPages,
  batchARootSeoPages,
  batchBRootSeoPages,
  batchCRootSeoPages,
  batchDRootSeoPages,
  getRecoveryClassPaths,
  getRecoveryLocalityBoardPaths,
  getRecoveryTopicPaths,
  recoveryRouteCatalogRows,
  recoveryRootSeoPages,
} from "./seoRecoveryCluster";

const DEMO_PATH = "/book-free-demo-class";
const WHATSAPP_NUMBER = "918796499818";

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
  row({ id: 401, segment: "Curriculum / Class", pageType: "Class Service", audience: "School Students", cluster: "Class 6", title: "Class 6 Maths Tutor", path: "/class-6-maths-tutor", parent: "/maths-foundation-program", keyword: "class 6 maths tutor", links: "/maths-foundation-program | /school-maths-foundation-program | /cbse-class-6-maths-tutor | /book-free-demo-class" }),
  row({ id: 402, segment: "Curriculum / Class", pageType: "Class Service", audience: "School Students", cluster: "Class 7", title: "Class 7 Maths Tutor", path: "/class-7-maths-tutor", parent: "/maths-foundation-program", keyword: "class 7 maths tutor", links: "/maths-foundation-program | /school-maths-foundation-program | /cbse-class-7-maths-tutor | /book-free-demo-class" }),
  row({ id: 403, segment: "Curriculum / Class", pageType: "Class Service", audience: "School Students", cluster: "Class 8", title: "Class 8 Maths Tutor", path: "/class-8-maths-tutor", parent: "/maths-foundation-program", keyword: "class 8 maths tutor", links: "/maths-foundation-program | /school-maths-foundation-program | /cbse-class-8-maths-tutor | /book-free-demo-class" }),
  row({ id: 404, segment: "Curriculum / Class", pageType: "Class Service", audience: "School Students", cluster: "Class 9", title: "Class 9 Maths Tutor", path: "/class-9-maths-tutor", parent: "/cbse-maths-tuition", keyword: "class 9 maths tutor", links: "/cbse-maths-tuition | /icse-maths-tuition | /maths-foundation-program | /book-free-demo-class" }),
  row({ id: 405, segment: "Curriculum / Class", pageType: "Class Service", audience: "Senior School Students", cluster: "Class 11", title: "Class 11 Maths Tutor", path: "/class-11-maths-tutor", parent: "/board-maths-syllabus-wise-tuition", keyword: "class 11 maths tutor", links: "/board-maths-syllabus-wise-tuition | /cbse-class-11-maths-tutor | /isc-class-11-maths-tutor | /book-free-demo-class" }),
  row({ id: 406, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "After School Support", title: "After School Maths Support", path: "/after-school-maths-support", parent: "/maths-home-tutor", keyword: "after school maths support", links: "/maths-home-tutor | /maths-foundation-program | /class-8-maths-tutor | /book-free-demo-class" }),
  row({ id: 407, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Weekend Support", title: "Weekend Maths Home Tutoring", path: "/weekend-maths-home-tutoring", parent: "/maths-home-tutor", keyword: "weekend maths home tutoring", links: "/maths-home-tutor | /one-to-one-maths-tuition | /online-maths-home-tuition | /book-free-demo-class" }),
  row({ id: 408, segment: "Core Service", pageType: "Service Page", audience: "Board Students", cluster: "Board Revision", title: "Board Exam Revision Support", path: "/board-exam-revision-support", parent: "/maths-revision-program", keyword: "board exam revision support", links: "/maths-revision-program | /cbse-maths-tuition | /class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 409, segment: "Core Service", pageType: "Service Page", audience: "School Students", cluster: "Concept Strengthening", title: "Concept Strengthening Sessions", path: "/concept-strengthening-sessions", parent: "/maths-foundation-program", keyword: "concept strengthening maths sessions", links: "/maths-foundation-program | /school-maths-foundation-program | /algebra-tutor | /book-free-demo-class" }),
  row({ id: 410, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Doubt Solving", title: "Regular Doubt Solving Help", path: "/regular-doubt-solving-help", parent: "/maths-home-tutor", keyword: "regular maths doubt solving help", links: "/maths-home-tutor | /online-maths-home-tuition | /one-to-one-maths-tuition | /book-free-demo-class" }),
  row({ id: 411, segment: "Core Service", pageType: "Service Page", audience: "School Students", cluster: "Worksheet Support", title: "Maths Worksheet Guidance", path: "/maths-worksheet-guidance", parent: "/maths-home-tutor", keyword: "maths worksheet guidance", links: "/maths-home-tutor | /cbse-maths-tuition | /class-6-maths-tutor | /book-free-demo-class" }),
  row({ id: 412, segment: "Core Service", pageType: "Service Page", audience: "Board Students", cluster: "Exam Practice", title: "Exam Ready Practice Sessions", path: "/exam-ready-practice-sessions", parent: "/maths-revision-program", keyword: "exam ready maths practice sessions", links: "/maths-revision-program | /board-exam-revision-support | /class-12-maths-tutor | /book-free-demo-class" }),
  row({ id: 413, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Revision Planning", title: "Focused Revision Planning", path: "/focused-revision-planning", parent: "/maths-revision-program", keyword: "focused maths revision planning", links: "/maths-revision-program | /board-exam-revision-support | /jee-maths-coaching | /book-free-demo-class" }),
  row({ id: 414, segment: "Core Service", pageType: "Service Page", audience: "Parents + Students", cluster: "Flexible Support", title: "Flexible Home or Online Maths Support", path: "/flexible-home-online-maths-support", parent: "/maths-home-tutor", keyword: "flexible home or online maths support", links: "/maths-home-tutor | /online-maths-home-tuition | /one-to-one-maths-tuition | /book-free-demo-class" }),
  row({ id: 415, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Algebra", title: "Algebra Tutor", path: "/algebra-tutor", parent: "/maths-home-tutor", keyword: "algebra tutor", links: "/maths-home-tutor | /concept-strengthening-sessions | /quadratic-equations-tutor | /book-free-demo-class" }),
  row({ id: 416, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Geometry", title: "Geometry Tutor", path: "/geometry-tutor", parent: "/maths-home-tutor", keyword: "geometry tutor", links: "/maths-home-tutor | /mensuration-tutor | /coordinate-geometry-tutor | /book-free-demo-class" }),
  row({ id: 417, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Trigonometry", title: "Trigonometry Tutor", path: "/trigonometry-tutor", parent: "/maths-home-tutor", keyword: "trigonometry tutor", links: "/maths-home-tutor | /geometry-tutor | /class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 418, segment: "Topic Support", pageType: "Topic Page", audience: "Senior School Students", cluster: "Calculus", title: "Calculus Tutor", path: "/calculus-tutor", parent: "/maths-home-tutor", keyword: "calculus tutor", links: "/maths-home-tutor | /class-12-maths-tutor | /jee-maths-coaching | /book-free-demo-class" }),
  row({ id: 419, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Statistics", title: "Statistics Tutor", path: "/statistics-tutor", parent: "/maths-home-tutor", keyword: "statistics tutor", links: "/maths-home-tutor | /probability-tutor | /ib-maths-tuition | /book-free-demo-class" }),
  row({ id: 420, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Probability", title: "Probability Tutor", path: "/probability-tutor", parent: "/maths-home-tutor", keyword: "probability tutor", links: "/maths-home-tutor | /statistics-tutor | /igcse-maths-tuition | /book-free-demo-class" }),
  row({ id: 421, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Coordinate Geometry", title: "Coordinate Geometry Tutor", path: "/coordinate-geometry-tutor", parent: "/maths-home-tutor", keyword: "coordinate geometry tutor", links: "/maths-home-tutor | /geometry-tutor | /class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 422, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Quadratic Equations", title: "Quadratic Equations Tutor", path: "/quadratic-equations-tutor", parent: "/maths-home-tutor", keyword: "quadratic equations tutor", links: "/maths-home-tutor | /algebra-tutor | /class-10-maths-tutor | /book-free-demo-class" }),
  row({ id: 423, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Functions", title: "Functions Tutor", path: "/functions-tutor", parent: "/maths-home-tutor", keyword: "functions tutor", links: "/maths-home-tutor | /algebra-tutor | /class-11-maths-tutor | /book-free-demo-class" }),
  row({ id: 424, segment: "Topic Support", pageType: "Topic Page", audience: "Middle School Students", cluster: "Number Systems", title: "Number Systems Tutor", path: "/number-systems-tutor", parent: "/maths-foundation-program", keyword: "number systems tutor", links: "/maths-foundation-program | /class-9-maths-tutor | /algebra-tutor | /book-free-demo-class" }),
  row({ id: 425, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Mensuration", title: "Mensuration Tutor", path: "/mensuration-tutor", parent: "/maths-home-tutor", keyword: "mensuration tutor", links: "/maths-home-tutor | /geometry-tutor | /class-8-maths-tutor | /book-free-demo-class" }),
  row({ id: 426, segment: "Topic Support", pageType: "Topic Page", audience: "School Students", cluster: "Reasoning and Problem Solving", title: "Reasoning and Problem Solving Tutor", path: "/reasoning-problem-solving-tutor", parent: "/maths-home-tutor", keyword: "reasoning and problem solving maths tutor", links: "/maths-home-tutor | /jee-maths-coaching | /maths-foundation-program | /book-free-demo-class" }),
];

const knownSupportingPages = [
  { path: "/city/gurugram", title: "Gurugram Maths Tutor Hub", segment: "Location", cluster: "Gurugram" },
  { path: "/subjects/maths", title: "Maths by Board", segment: "Board", cluster: "Boards" },
  { path: "/gurugram", title: "Gurugram Maths Home Tuition", segment: "Location", cluster: "Gurugram" },
  { path: "/gurugram/cbse-maths-home-tutor", title: "CBSE Maths Home Tutor in Gurugram", segment: "Location", cluster: "CBSE" },
  { path: "/gurugram/icse-isc-maths-home-tutor", title: "ICSE and ISC Maths Home Tutor in Gurugram", segment: "Location", cluster: "ICSE ISC" },
  { path: "/gurugram/igcse-maths-home-tutor", title: "IGCSE Maths Home Tutor in Gurugram", segment: "Location", cluster: "IGCSE" },
  { path: "/gurugram/ib-maths-home-tutor", title: "IB Maths Home Tutor in Gurugram", segment: "Location", cluster: "IB" },
  { path: "/gurugram/jee-maths-home-tutor", title: "JEE Maths Home Tutor in Gurugram", segment: "Location", cluster: "JEE" },
  { path: "/class-10-maths-tutor", title: "Class 10 Maths Tutor", segment: "Class", cluster: "Class 10" },
  { path: "/class-12-maths-tutor", title: "Class 12 Maths Tutor", segment: "Class", cluster: "Class 12" },
];

const p1RowByPath = new Map(p1SeoUrlRows.map((item) => [item.path, item]));
const routeCatalog = new Map([
  ...p1SeoUrlRows.map((item) => [item.path, item]),
  ...knownSupportingPages.map((item) => [item.path, item]),
  ...recoveryRouteCatalogRows.map((item) => [item.path, item]),
]);

export const p1SeoPagePaths = [
  ...p1SeoUrlRows.map((item) => item.path),
  ...recoveryRootSeoPages.map((item) => item.path),
  ...batchARootSeoPages.map((item) => item.path),
  ...batchBRootSeoPages.map((item) => item.path),
  ...batchCRootSeoPages.map((item) => item.path),
  ...batchDRootSeoPages.map((item) => item.path),
];

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

function getRecoveryCurrentRow(page) {
  return {
    id: page.id,
    segment:
      page.group === "class-board"
        ? "Curriculum / Class"
        : page.group === "topic-board"
          ? "School Topic"
          : "Exam Support",
    pageType:
      page.group === "class-board"
        ? "Class Service"
        : page.group === "topic-board"
          ? "Topic Page"
          : "Service Page",
    audience: page.audience,
    cluster: page.cluster ?? page.boardLabel ?? page.title,
    title: page.title,
    path: page.path,
    parent: page.parentHubPath,
    keyword: page.primaryKeyword,
    links: "",
  };
}

function buildRecoveryCards(paths = [], currentRow) {
  return unique(paths)
    .filter((path) => path !== currentRow.path && routeCatalog.has(path))
    .slice(0, 6)
    .map((path) => routeCard(path, currentRow));
}

function getRecoveryLocalityPaths(page) {
  if (page.boardSlug) {
    return getRecoveryLocalityBoardPaths(page.boardSlug, 5);
  }

  return [
    "/gurugram/sector-56-cbse-maths-home-tutor",
    "/gurugram/sector-54-ib-maths-home-tutor",
    "/gurugram/golf-course-road-igcse-maths-home-tutor",
    "/gurugram/dlf-phase-4-cbse-maths-home-tutor",
  ];
}

function getRecoveryBoardPaths(page) {
  if (page.boardSlug) {
    return [page.gurugramBoardPath, page.boardHubPath, "/maths-home-tutor", "/city/gurugram"];
  }

  if (page.slug.includes("jee")) {
    return [page.parentHubPath, "/jee-main-maths-coaching", "/jee-advanced-maths-coaching", "/maths-home-tutor"];
  }

  return [
    page.parentHubPath,
    "/cbse-maths-tuition",
    "/ib-maths-tuition",
    "/igcse-maths-tuition",
    "/maths-home-tutor",
  ];
}

function getRecoveryClassRelatedPaths(page) {
  if (page.group === "class-board") {
    return [
      ...getRecoveryClassPaths(page.boardSlug),
      "/class-10-maths-tutor",
      "/class-12-maths-tutor",
    ];
  }

  if (page.boardSlug) {
    return [
      ...getRecoveryClassPaths(page.boardSlug),
      "/class-10-maths-tutor",
      "/class-12-maths-tutor",
    ];
  }

  return [
    "/class-10-cbse-maths-home-tutor",
    "/class-12-cbse-maths-home-tutor",
    "/class-12-ib-maths-home-tutor",
    "/class-10-igcse-maths-home-tutor",
  ];
}

function getRecoveryTopicRelatedPaths(page) {
  if (page.group === "topic-board") {
    return [
      ...getRecoveryTopicPaths(page.boardSlug),
      `/${page.boardSlug}-probability-tutor`,
      `/${page.boardSlug}-statistics-tutor`,
      `/${page.boardSlug}-geometry-tutor`,
      `/${page.boardSlug}-functions-tutor`,
      page.genericTopicPath,
      "/algebra-tutor",
      "/trigonometry-tutor",
      "/calculus-tutor",
    ];
  }

  if (page.boardSlug) {
    return [
      ...getRecoveryTopicPaths(page.boardSlug),
      `/${page.boardSlug}-probability-tutor`,
      `/${page.boardSlug}-statistics-tutor`,
      `/${page.boardSlug}-geometry-tutor`,
      `/${page.boardSlug}-functions-tutor`,
      "/algebra-tutor",
      "/trigonometry-tutor",
      "/calculus-tutor",
    ];
  }

  return [
    "/cbse-algebra-tutor",
    "/igcse-trigonometry-tutor",
    "/ib-calculus-tutor",
    "/algebra-tutor",
    "/trigonometry-tutor",
    "/calculus-tutor",
  ];
}

function buildRecoverySupportPoints(page) {
  if (page.group === "class-board") {
    return [
      {
        title: `${page.boardLabel} Class ${page.classLevel} support with a real weekly plan`,
        description: `This page is for families who want ${page.primaryKeyword} with home tuition structure, not a loose list of worksheets or generic practice.`,
      },
      {
        title: "Board, class, and chapter pressure stay connected",
        description: page.focus,
      },
      {
        title: "Tutor filtering stays grounded in published data",
        description:
          "Tutor cards appear only when real published profiles match the class, board, locality, or topic signals on the page.",
      },
    ];
  }

  if (page.group === "topic-board") {
    return [
      {
        title: `${page.topicLabel} taught through the ${page.boardLabel} lens`,
        description: page.focus,
      },
      {
        title: "Practice is tied to the student's class and paper style",
        description:
          "The route links back to board and class pages so topic support can stay practical for school tests, board exams, or international-curriculum papers.",
      },
      {
        title: "Home tuition can focus on the exact error pattern",
        description:
          "The first conversation should include recent mistakes, current chapter pressure, and whether the student needs concept repair or timed practice.",
      },
    ];
  }

  return [
    {
      title: "Revision support is scoped before the demo",
      description: page.focus,
    },
    {
      title: "Exam pages connect back to class, topic, and board routes",
      description:
        "The internal links help families move from urgency into a cleaner plan for chapters, paper practice, and tutor fit.",
    },
    {
      title: "No fake outcomes or guaranteed-result claims",
      description:
        "The page keeps the next step honest: share the current score, timeline, weak chapters, and preferred mode before Maths Bodhi checks tutor availability.",
    },
  ];
}

function buildRecoveryFaqs(page) {
  return [
    {
      question: `Who should use the ${page.title} page?`,
      answer: `It is for ${page.audience} who want ${page.primaryKeyword} with a clear route into board, class, topic, locality, and demo next steps.`,
    },
    {
      question: "Can this be handled through maths home tuition?",
      answer:
        "Yes, where tutor availability and schedule fit allow it. Families can also discuss online or hybrid support when that is more practical.",
    },
    {
      question: "What should parents share before booking?",
      answer:
        "Share the student's class, board, school area, weak chapters, recent test pattern, preferred locality, and whether home tuition or online support is preferred.",
    },
  ];
}

function createRecoveryWhatsAppHref(page, purpose = "maths home tuition") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getRecoveryIntro(page) {
  if (page.group === "class-board") {
    return `${page.title} is a focused home tuition page for families comparing ${page.boardLabel} Class ${page.classLevel} maths support, tutor fit, chapter clarity, and a practical demo next step.`;
  }

  if (page.group === "topic-board") {
    return `${page.title} helps families connect ${page.topicLabel.toLowerCase()} support with ${page.boardLabel} expectations, class pressure, and the right home tuition or online plan.`;
  }

  return `${page.title} is a high-intent exam support page for families who need maths revision, problem-solving structure, and a clear way to speak with Maths Bodhi before time is lost.`;
}

function createRecoveryRootSeoConfig(page) {
  const currentRow = getRecoveryCurrentRow(page);
  const tokens = unique([
    page.primaryKeyword,
    page.title,
    page.boardLabel,
    page.topicLabel,
    page.classLevel ? `Class ${page.classLevel}` : "",
    page.cluster,
    "Gurugram",
    "home tuition",
  ]);

  return {
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: currentRow.pageType,
    template: "GenericPageTemplate",
    title: page.title,
    h1: page.h1,
    intro: getRecoveryIntro(page),
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
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: `Explore ${page.primaryKeyword} with Maths Bodhi. Compare related locality, board, class, topic, WhatsApp, and free demo routes.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      ...(page.parentHubPath ? [{ label: getPageLabel(page.parentHubPath), to: page.parentHubPath }] : []),
      { label: page.title },
    ],
    schemaType: "Service",
    publishStatus: "published",
    entity: page,
    sections: {
      hero: {
        badge:
          page.group === "class-board"
            ? "Class and Board"
            : page.group === "topic-board"
              ? "Topic and Board"
              : "Exam Support",
        chips: unique([
          page.boardLabel,
          page.topicLabel,
          page.classLevel ? `Class ${page.classLevel}` : "",
          "Home tuition",
          "Gurugram",
        ]).slice(0, 5),
        stats: [
          { value: "1:1", label: "Tutor-fit route" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Next-step CTA" },
        ],
        supportPanel: {
          title: `Start with ${page.primaryKeyword}, then narrow the tutor conversation`,
          text:
            "This recovery cluster page connects the Excel hub logic with a cleaner commercial URL so families can move from search intent into a real enquiry.",
          bullets: [
            `Parent hub: ${getPageLabel(page.parentHubPath)}`,
            "Book demo, WhatsApp, and mentor CTAs are visible",
            "Tutor matches come only from published profile data",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} support from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Page Focus",
        title: `What families should know about ${page.title}`,
        subtitle:
          "The content stays specific to the route intent and then links outward to locality, board, class, and topic pages.",
        points: buildRecoverySupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Use these routes when home tuition feasibility, school corridor, or nearby sector fit matters before shortlisting.",
          cards: buildRecoveryCards(getRecoveryLocalityPaths(page), currentRow),
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board and hub pages",
          subtitle:
            "These pages keep the curriculum path clear before moving into a tutor enquiry.",
          cards: buildRecoveryCards(getRecoveryBoardPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use class pages when the student needs support around grade-level pressure, test style, or senior-school rhythm.",
          cards: buildRecoveryCards(getRecoveryClassRelatedPaths(page), currentRow),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic pages",
          subtitle:
            "These topic pages help families move from broad support into the chapters causing the most friction.",
          cards: buildRecoveryCards(getRecoveryTopicRelatedPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published tutor profiles related to ${page.title}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here. If no matching profile exists, the page sends families into a demo or WhatsApp check.",
        emptyState: {
          title: "No matching published tutor profile is shown for this exact page yet",
          description:
            "Maths Bodhi can still check current fit after the family shares class, board, locality, weak chapters, and preferred learning mode.",
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
      faqs: buildRecoveryFaqs(page),
      cta: {
        title: "Book a free maths demo class",
        description: `Share the student's class, board, locality, and current maths concern. Maths Bodhi can check whether ${page.primaryKeyword} is best handled through home tuition, online support, or a focused mentor call.`,
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createRecoveryWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createRecoveryWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  };
}

function getBatchACurrentRow(page) {
  return {
    id: page.id,
    segment: "Location",
    pageType: page.group === "batch-a-school" ? "School-Specific Service" : "Location Service",
    audience: page.audience,
    cluster: page.cluster ?? "Gurugram Local SEO",
    title: page.title,
    path: page.path,
    parent: page.parentHubPath,
    keyword: page.primaryKeyword,
    links: "",
  };
}

function createBatchAWhatsAppHref(page, purpose = "Gurugram maths home tuition") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getBatchALocalityPaths(page) {
  if (page.group === "batch-a-school" && page.localityPath) {
    return [
      page.localityPath,
      "/gurugram/golf-course-road-maths-home-tutor",
      "/gurugram/golf-course-extension-road-maths-home-tutor",
      "/gurugram/sohna-road-maths-home-tutor",
      "/gurugram/south-city-1-maths-home-tutor",
      "/gurugram/sushant-lok-1-maths-home-tutor",
    ];
  }

  return batchALocalityPages.slice(0, 8).map((item) => item.path);
}

function getBatchABoardPaths(page) {
  const signals = (page.curriculumSignals ?? []).join(" ").toLowerCase();
  const paths = [
    "/premium-school-maths-home-tutor",
    "/gurugram/cbse-maths-home-tutor",
    "/gurugram/igcse-maths-home-tutor",
    "/gurugram/ib-maths-home-tutor",
    "/maths-home-tutor",
  ];

  if (signals.includes("ib")) {
    paths.unshift("/ib-maths-tuition");
  }

  if (signals.includes("igcse") || signals.includes("international")) {
    paths.unshift("/igcse-maths-tuition");
  }

  if (signals.includes("cbse")) {
    paths.unshift("/cbse-maths-tuition");
  }

  return paths;
}

function getBatchAClassPaths(page) {
  if ((page.curriculumSignals ?? []).some((item) => item.includes("IB"))) {
    return [
      "/class-10-ib-maths-home-tutor",
      "/class-12-ib-maths-home-tutor",
      "/class-10-igcse-maths-home-tutor",
      "/class-12-cbse-maths-home-tutor",
    ];
  }

  if ((page.curriculumSignals ?? []).some((item) => item.includes("IGCSE"))) {
    return [
      "/class-9-igcse-maths-home-tutor",
      "/class-10-igcse-maths-home-tutor",
      "/class-10-cbse-maths-home-tutor",
      "/class-12-ib-maths-home-tutor",
    ];
  }

  return [
    "/class-10-cbse-maths-home-tutor",
    "/class-12-cbse-maths-home-tutor",
    "/class-10-igcse-maths-home-tutor",
    "/class-12-ib-maths-home-tutor",
  ];
}

function getBatchATopicPaths() {
  return [
    "/cbse-algebra-tutor",
    "/igcse-trigonometry-tutor",
    "/ib-calculus-tutor",
    "/board-exam-maths-revision",
    "/maths-last-minute-revision",
  ];
}

function buildBatchASupportPoints(page) {
  if (page.group === "batch-a-school") {
    return [
      {
        title: `${page.schoolName} searches need careful tutor-fit language`,
        description:
          "This page uses the school name as parent search context only. It does not claim official affiliation, ranking, guaranteed admission, or guaranteed results.",
      },
      {
        title: "The first shortlist should connect school, board, and class",
        description: `Families can discuss ${page.curriculumSignals.join(", ")} along with class level, recent test pattern, weak chapters, and whether home tuition or online continuity is practical.`,
      },
      {
        title: "The page links back into the local Gurugram cluster",
        description:
          "School-intent pages should never stand alone. They connect to the Gurgaon hub, nearby locality pages, board pages, class pages, topic pages, WhatsApp, and demo routes.",
      },
    ];
  }

  return [
    {
      title: "A city hub should guide families into the exact next route",
      description:
        "This page connects Gurugram searches to sectors, DLF phases, Golf Course Road, Sohna Road, South City, Sushant Lok, school-intent pages, boards, classes, topics, and demo flow.",
    },
    {
      title: "Locality pages should avoid generic city swapping",
      description:
        "The Gurugram locality pages use corridor context, school timing, board pressure, and class need to keep each route useful without fake tutor counts or unsupported claims.",
    },
    {
      title: "School-intent pages need affiliation-safe copy",
      description:
        "School names are used only for parent search context. Maths Bodhi should check tutor fit through class, board, weak chapters, schedule, and preferred learning mode.",
    },
  ];
}

function buildBatchAFaqs(page) {
  if (page.group === "batch-a-school") {
    return [
      {
        question: `Is this page officially affiliated with ${page.schoolName}?`,
        answer:
          "No. The school name is used only to describe parent search intent and local planning context. Maths Bodhi does not claim an official school partnership on this page.",
      },
      {
        question: `Who should use the ${page.schoolName} maths tutor page?`,
        answer: `It is for families comparing maths support for a ${page.schoolName} student and wanting a clearer way to discuss class, board, weak chapters, locality, schedule, and demo fit.`,
      },
      {
        question: "What should parents share before booking?",
        answer:
          "Share the student's class, board or curriculum, current chapters, recent test pattern, preferred mode, school area, and whether the family wants home tuition, online support, or both.",
      },
    ];
  }

  return [
    {
      question: "How should families use this Gurgaon maths tutor hub?",
      answer:
        "Use it to choose the right sector, corridor, school-intent, board, class, topic, or revision route before booking a demo or WhatsApp conversation.",
    },
    {
      question: "Does Maths Bodhi show fake tutor counts on these pages?",
      answer:
        "No. The pages only show real published tutor profiles when the available data matches the page signals. Empty states keep the enquiry route honest.",
    },
    {
      question: "What information helps the first mentor conversation?",
      answer:
        "Share class, board, school area, weak chapters, recent marks or test pattern, preferred locality, and whether home tuition or online support is preferred.",
    },
  ];
}

function createBatchARootSeoConfig(page) {
  const currentRow = getBatchACurrentRow(page);
  const isSchoolPage = page.group === "batch-a-school";
  const tokens = unique([
    page.primaryKeyword,
    page.title,
    page.schoolName,
    page.localityLabel,
    ...(page.curriculumSignals ?? []),
    "Gurugram",
    "Gurgaon",
    "home tuition",
  ]);

  return {
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: currentRow.pageType,
    template: "GenericPageTemplate",
    title: page.title,
    h1: page.h1,
    intro: isSchoolPage
      ? `${page.title} is a school-intent page for parents who want an affiliation-safe way to discuss maths home tuition, class pressure, curriculum fit, and demo next steps for a ${page.schoolName} student.`
      : "Use this Gurgaon maths home tutor hub to move from broad local search into the right sector, school corridor, board, class, topic, or demo route.",
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
      localityLabels: [page.localityLabel, page.localitySlug].filter(Boolean),
      tokens,
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "tokens",
      tokens: unique([page.schoolName, page.localityLabel, "home tuition", "school support", "revision"]),
      limit: 3,
    },
    relatedResultQuery: {
      kind: "tokens",
      citySlug: "gurugram",
      localityLabels: [page.localityLabel, page.localitySlug].filter(Boolean),
      tokens,
      limit: 3,
    },
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: isSchoolPage
      ? `Explore maths home tuition for ${page.schoolName} search intent with affiliation-safe copy, related locality, board, class, topic, WhatsApp, and demo links.`
      : "Explore Gurgaon maths home tutor routes by locality, school corridor, board, class, topic, WhatsApp, and free demo next steps.",
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      ...(page.parentHubPath && page.parentHubPath !== page.path
        ? [{ label: getPageLabel(page.parentHubPath), to: page.parentHubPath }]
        : []),
      { label: page.title },
    ],
    schemaType: "Service",
    publishStatus: "published",
    entity: page,
    sections: {
      hero: {
        badge: isSchoolPage ? "School Intent" : "Gurugram Local SEO",
        chips: unique([
          page.schoolName,
          page.localityLabel,
          ...(page.curriculumSignals ?? []),
          "Home tuition",
          "Gurugram",
        ]).slice(0, 5),
        stats: [
          { value: isSchoolPage ? "School" : "46", label: isSchoolPage ? "Intent route" : "Locality routes" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Next-step CTA" },
        ],
        supportPanel: {
          title: isSchoolPage
            ? `${page.schoolName} context should lead into a practical tutor-fit check`
            : "Start broad, then narrow to the exact Gurugram route",
          text: isSchoolPage
            ? "The page is written for parent search intent, not as an official school listing. The useful next step is to discuss class, board, chapters, schedule, and availability."
            : "The hub connects locality, school corridor, board, class, topic, and revision pages so families do not have to guess which route fits first.",
          bullets: isSchoolPage
            ? [
                `Nearby locality route: ${page.localityLabel}`,
                `Curriculum signals: ${(page.curriculumSignals ?? []).join(", ")}`,
                "No official affiliation, fake counts, or guaranteed-result claims",
              ]
            : [
                "Sectors, DLF phases, Golf Course Road, Sohna Road, South City, and Sushant Lok are connected",
                "School-intent pages link back to this hub and the demo route",
                "Tutor cards use real published data only",
              ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: isSchoolPage ? "School Search Fit" : "Local SEO Hub",
        title: isSchoolPage
          ? `How to use the ${page.schoolName} maths tutor route`
          : "How to choose the right Gurgaon maths tutor route",
        subtitle:
          "The content keeps local search connected to board, class, topic, and demo decisions so the page is useful rather than a thin doorway.",
        points: buildBatchASupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Use these routes when school corridor, travel fit, or nearby sector access changes the shortlist.",
          cards: buildRecoveryCards(getBatchALocalityPaths(page), currentRow),
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board and school-support pages",
          subtitle:
            "These pages keep curriculum fit visible before the family books a demo or WhatsApp conversation.",
          cards: buildRecoveryCards(getBatchABoardPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use class pages when grade-level pressure or exam calendar is the strongest signal.",
          cards: buildRecoveryCards(getBatchAClassPaths(page), currentRow),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic and revision pages",
          subtitle:
            "These topic pages help families move from local or school intent into the chapters causing the most friction.",
          cards: buildRecoveryCards(getBatchATopicPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: isSchoolPage
          ? `Published tutor profiles related to ${page.schoolName} search intent`
          : "Published tutor profiles related to Gurgaon maths home tuition",
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here. If no matching profile exists, the page keeps the enquiry route open without placeholder tutors.",
        emptyState: {
          title: "No exact published tutor profile is shown for this route yet",
          description:
            "Maths Bodhi can still check current fit after the family shares class, board, locality, weak chapters, school area, and preferred learning mode.",
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
      faqs: buildBatchAFaqs(page),
      cta: {
        title: "Book a free maths demo class",
        description: isSchoolPage
          ? `Share the student's class, board, school area, current chapters, and schedule. Maths Bodhi can check whether ${page.schoolName} search intent is best handled through home tuition, online support, or mentor guidance.`
          : "Share the student's class, board, locality, school corridor, and current maths concern. Maths Bodhi can guide the next step on WhatsApp.",
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchAWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchAWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  };
}

function getBatchBCurrentRow(page) {
  const isExamIntent =
    page.intent?.includes("exam") ||
    page.intent?.includes("revision") ||
    page.intent?.includes("doubt") ||
    page.intent?.includes("worksheet");

  return {
    id: page.id,
    segment: isExamIntent ? "Exam Support" : "Curriculum / Class",
    pageType: page.intent?.includes("online")
      ? "Online Tuition Page"
      : page.intent?.includes("doubt")
        ? "Doubt Solving Page"
        : page.intent?.includes("revision")
          ? "Revision Page"
          : page.intent?.includes("worksheet")
            ? "Worksheet Support Page"
            : "Exam Intent Page",
    audience: page.audience,
    cluster: page.cluster ?? page.boardLabel ?? "Board and Exam Support",
    title: page.title,
    path: page.path,
    parent: page.parentHubPath,
    keyword: page.primaryKeyword,
    links: "",
  };
}

function createBatchBWhatsAppHref(page, purpose = "board, class, and exam support") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getBatchBIntro(page) {
  if (page.intent?.includes("online")) {
    return `${page.title} helps families compare online maths support with the same class, board, chapter, and tutor-fit checks used for home tuition.`;
  }

  if (page.intent?.includes("doubt")) {
    return `${page.title} is for students who need regular maths doubt solving tied to their board, class level, weak chapters, and exam calendar.`;
  }

  if (page.intent?.includes("worksheet")) {
    return `${page.title} connects worksheet practice with guided correction, chapter clarity, and the next best board or class route.`;
  }

  if (page.intent?.includes("revision")) {
    return `${page.title} gives families a clean revision-intent page for planning paper practice, weak-topic repair, and the right demo conversation.`;
  }

  return `${page.title} is a board and exam intent page for families comparing maths preparation, home tuition fit, online continuity, and mentor guidance before booking a demo.`;
}

function getBatchBLocalityPaths(page) {
  const boardLocalityPaths = page.boardSlug ? getRecoveryLocalityBoardPaths(page.boardSlug, 3) : [];

  return unique([
    "/city/gurugram",
    "/maths-home-tutor-in-gurgaon",
    ...boardLocalityPaths,
    ...batchALocalityPages.slice(0, 6).map((item) => item.path),
  ]);
}

function getBatchBBoardPaths(page) {
  const boardHubs = {
    cbse: ["/cbse-maths-tuition", "/cbse-maths-home-tutor", "/gurugram/cbse-maths-home-tutor"],
    icse: ["/icse-maths-tuition", "/icse-maths-home-tutor", "/gurugram/icse-isc-maths-home-tutor"],
    isc: ["/isc-maths-tuition", "/isc-maths-home-tutor", "/gurugram/icse-isc-maths-home-tutor"],
    igcse: ["/igcse-maths-tuition", "/igcse-maths-home-tutor", "/gurugram/igcse-maths-home-tutor"],
    ib: ["/ib-maths-tuition", "/ib-maths-home-tutor", "/gurugram/ib-maths-home-tutor"],
    jee: ["/jee-maths-coaching", "/jee-main-maths-coaching", "/jee-advanced-maths-coaching"],
  };

  return unique([
    page.parentHubPath,
    ...(boardHubs[page.boardSlug] ?? []),
    "/board-maths-syllabus-wise-tuition",
    "/maths-home-tutor",
    "/online-maths-home-tuition",
    "/premium-school-maths-home-tutor",
  ]);
}

function getBatchBClassPaths(page) {
  const classLevel = page.classLevel ? String(page.classLevel) : "";
  const sameBoardPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryClassPaths(page.boardSlug) : [];
  const classIntentPaths = {
    "9": [
      "/class-9-cbse-maths-exam-preparation",
      "/class-9-icse-maths-exam-preparation",
      "/class-9-igcse-maths-exam-preparation",
      "/class-9-maths-tutor",
    ],
    "10": [
      "/class-10-cbse-maths-home-tutor",
      "/class-10-igcse-maths-home-tutor",
      "/class-10-cbse-board-maths-preparation",
      "/class-10-icse-board-maths-preparation",
      "/class-10-igcse-board-maths-preparation",
      "/class-10-maths-tutor",
    ],
    "11": [
      "/class-11-cbse-maths-exam-preparation",
      "/class-11-isc-maths-exam-preparation",
      "/class-11-ib-maths-exam-preparation",
      "/class-11-maths-tutor",
    ],
    "12": [
      "/class-12-cbse-maths-home-tutor",
      "/class-12-ib-maths-home-tutor",
      "/class-12-cbse-board-maths-preparation",
      "/class-12-isc-board-maths-preparation",
      "/class-12-ib-dp-maths-exam-preparation",
      "/class-12-maths-tutor",
    ],
  };

  return unique([
    ...(classIntentPaths[classLevel] ?? []),
    ...sameBoardPaths,
    "/maths-homework-help-for-class-10",
    "/maths-homework-help-for-class-12",
    "/board-maths-exam-preparation",
  ]);
}

function getBatchBTopicPaths(page) {
  const boardTopicPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryTopicPaths(page.boardSlug) : [];

  return unique([
    ...boardTopicPaths,
    "/cbse-algebra-tutor",
    "/igcse-trigonometry-tutor",
    "/ib-calculus-tutor",
    "/algebra-tutor",
    "/trigonometry-tutor",
    "/calculus-tutor",
    "/cbse-functions-tutor",
    "/igcse-probability-tutor",
    "/ib-statistics-tutor",
    "/jee-calculus-problem-solving",
    "/board-exam-maths-revision",
    "/maths-last-minute-revision",
    "/jee-maths-problem-solving",
  ]);
}

function buildBatchBSupportPoints(page) {
  if (page.intent?.includes("online")) {
    return [
      {
        title: "Online support still needs a board-wise plan",
        description:
          "The page connects online tuition with class level, board pattern, chapter pressure, and the same demo-fit questions used for home tuition.",
      },
      {
        title: "Students can move between online and home tuition context",
        description:
          "Internal links keep Gurugram locality pages, class pages, and board hubs close when the family wants a home-tuition shortlist instead.",
      },
      {
        title: "Tutor matches stay based on published data",
        description:
          "Profiles appear only when real tutor data matches the page signals. Empty states guide families to the demo route without fake counts.",
      },
    ];
  }

  if (page.intent?.includes("doubt")) {
    return [
      {
        title: "Doubt solving should be regular, not last-minute",
        description:
          "The page frames doubt solving around weekly correction, weak-topic tracking, board style, and the next demo conversation.",
      },
      {
        title: "The route links doubt solving to classes and topics",
        description:
          "Students can move from this intent page into class, topic, exam, and locality routes instead of staying on a generic doubt-help page.",
      },
      {
        title: "No unsupported tutor or result claims",
        description:
          "Maths Bodhi checks availability, fit, schedule, and academic need before recommending a tutor for recurring doubt support.",
      },
    ];
  }

  if (page.intent?.includes("worksheet")) {
    return [
      {
        title: "Worksheet practice needs guided correction",
        description:
          "The page connects worksheets with method review, error patterns, and whether the student needs home tuition, online support, or revision planning.",
      },
      {
        title: "Practice links back to board and class context",
        description:
          "Related routes help families choose the right class, board, and topic page when worksheet mistakes point to a deeper concept gap.",
      },
      {
        title: "Empty states stay honest",
        description:
          "If no exact published tutor profile matches this route, the page asks families to share class, board, chapters, and schedule first.",
      },
    ];
  }

  return [
    {
      title: "Exam preparation starts with the student's current gap",
      description: page.focus,
    },
    {
      title: "Revision, class, topic, and locality routes stay connected",
      description:
        "The page links families into relevant Gurugram localities, board hubs, class pages, topic pages, and exam-support routes.",
    },
    {
      title: "The next step is a fit check, not a guarantee",
      description:
        "Maths Bodhi uses the demo conversation to understand class, board, weak chapters, timeline, and tutor availability before suggesting support.",
    },
  ];
}

function buildBatchBFaqs(page) {
  return [
    {
      question: `Who should use the ${page.title} page?`,
      answer: `It is for ${page.audience} comparing ${page.primaryKeyword} and wanting a practical route into class, board, topic, locality, and demo next steps.`,
    },
    {
      question: "Can Maths Bodhi support this through home tuition or online tuition?",
      answer:
        "Families can discuss both options. The useful fit depends on class, board, locality, schedule, weak chapters, and current tutor availability.",
    },
    {
      question: "Does this page promise a specific tutor, result, or score?",
      answer:
        "No. It only uses published tutor data where available and routes families to a demo or WhatsApp check when fit needs to be confirmed.",
    },
  ];
}

function createBatchBRootSeoConfig(page) {
  const currentRow = getBatchBCurrentRow(page);
  const tokens = unique([
    page.primaryKeyword,
    page.title,
    page.boardLabel,
    page.classLevel ? `Class ${page.classLevel}` : "",
    page.intent,
    page.cluster,
    "Gurugram",
    "home tuition",
    "online maths tuition",
    "revision",
  ]);

  return {
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: currentRow.pageType,
    template: "GenericPageTemplate",
    title: page.title,
    h1: page.h1,
    intro: getBatchBIntro(page),
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
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: `Explore ${page.primaryKeyword} with Maths Bodhi. Compare board, class, topic, locality, home tuition, online support, WhatsApp, and free demo next steps.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      ...(page.parentHubPath && page.parentHubPath !== page.path
        ? [{ label: getPageLabel(page.parentHubPath), to: page.parentHubPath }]
        : []),
      { label: page.title },
    ],
    schemaType: "Service",
    publishStatus: "published",
    entity: page,
    sections: {
      hero: {
        badge: "Board + Exam Intent",
        chips: unique([
          page.boardLabel,
          page.classLevel ? `Class ${page.classLevel}` : "",
          page.intent,
          page.intent?.includes("online") ? "Online support" : "Home tuition",
          "Gurugram",
        ]).slice(0, 5),
        stats: [
          { value: "Batch B", label: "SEO intent cluster" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "WhatsApp-led next step" },
        ],
        supportPanel: {
          title: `${page.primaryKeyword} should lead into a clear tutor-fit check`,
          text:
            "This page keeps board, class, topic, locality, and exam planning connected so families can move from search intent to a useful first conversation.",
          bullets: [
            `Parent hub: ${getPageLabel(page.parentHubPath)}`,
            `Audience: ${page.audience}`,
            "No fake tutor counts, fake reviews, or guaranteed-result claims",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Page Focus",
        title: `What families should know about ${page.title}`,
        subtitle:
          "The page is built for commercial-intent searches while staying connected to useful board, class, topic, locality, and demo routes.",
        points: buildBatchBSupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Use locality routes when home tuition fit, school travel rhythm, or nearby sector access matters.",
          cards: buildRecoveryCards(getBatchBLocalityPaths(page), currentRow),
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board and service pages",
          subtitle:
            "These pages keep curriculum, home tuition, online tuition, and parent hub context visible.",
          cards: buildRecoveryCards(getBatchBBoardPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use these routes when the class level, board-exam calendar, or homework load is the strongest signal.",
          cards: buildRecoveryCards(getBatchBClassPaths(page), currentRow),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic and exam pages",
          subtitle:
            "These topic and revision routes help students move from broad exam intent into the chapters causing difficulty.",
          cards: buildRecoveryCards(getBatchBTopicPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published tutor profiles related to ${page.title}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here. If matching data is limited, the page keeps the enquiry route honest through demo and WhatsApp checks.",
        emptyState: {
          title: "No exact published tutor profile is shown for this route yet",
          description:
            "Maths Bodhi can still check current fit after the family shares class, board, locality or online preference, weak chapters, timeline, and schedule.",
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
      faqs: buildBatchBFaqs(page),
      cta: {
        title: "Book a free maths demo class",
        description: `Share the student's class, board, current chapters, target exam, and whether ${page.primaryKeyword} should be handled through home tuition, online support, or mentor guidance.`,
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchBWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchBWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  };
}

const batchCTopicHubPaths = {
  algebra: "/algebra-tutor",
  calculus: "/calculus-tutor",
  trigonometry: "/trigonometry-tutor",
  geometry: "/geometry-tutor",
  probability: "/probability-tutor",
  statistics: "/statistics-tutor",
  functions: "/functions-tutor",
  "coordinate-geometry": "/coordinate-geometry-tutor",
  "probability-statistics": "/probability-tutor",
};

function getBatchCCurrentRow(page) {
  return {
    id: page.id,
    segment: page.kind === "topic-mastery" ? "Topic Support" : "Exam Support",
    pageType:
      page.kind === "topic-mastery"
        ? "Topic Page"
        : page.kind === "doubt-support"
          ? "Doubt Solving Page"
          : page.kind === "homework-support"
            ? "Homework Help Page"
            : "Exam Support Page",
    audience: page.audience,
    cluster: page.cluster ?? page.topicLabel ?? "Topic Mastery",
    title: page.title,
    path: page.path,
    parent: page.parentHubPath,
    keyword: page.primaryKeyword,
    links: "",
  };
}

function createBatchCWhatsAppHref(page, purpose = "topic mastery and exam support") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getBatchCIntro(page) {
  if (page.kind === "topic-mastery") {
    return `${page.title} is a topic-mastery page for families who want ${page.topicLabel?.toLowerCase()} support connected to board expectations, class pressure, home tuition fit, and demo next steps.`;
  }

  if (page.kind === "doubt-support") {
    return `${page.title} helps students turn repeated topic doubts into a clearer correction routine before school tests, board practice, or JEE-style problem sets pile up.`;
  }

  if (page.kind === "homework-support") {
    return `${page.title} is for homework follow-through, worksheet correction, and method clarity without replacing the student's own problem-solving work.`;
  }

  return `${page.title} connects topic repair with exam preparation, timed practice, related board and class routes, and an honest tutor-fit check before support begins.`;
}

function getBatchCLocalityPaths(page) {
  const boardLocalityPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryLocalityBoardPaths(page.boardSlug, 3) : [];

  return unique([
    "/city/gurugram",
    "/maths-home-tutor-in-gurgaon",
    ...boardLocalityPaths,
    ...batchALocalityPages.slice(0, 6).map((item) => item.path),
  ]);
}

function getBatchCBoardPaths(page) {
  const boardHubs = {
    cbse: ["/cbse-maths-tuition", "/cbse-maths-home-tutor", "/cbse-board-maths-revision"],
    icse: ["/icse-maths-tuition", "/icse-maths-home-tutor", "/icse-board-maths-revision"],
    isc: ["/isc-maths-tuition", "/isc-maths-home-tutor", "/isc-board-maths-revision"],
    igcse: ["/igcse-maths-tuition", "/igcse-maths-home-tutor", "/igcse-exam-maths-support"],
    ib: ["/ib-maths-tuition", "/ib-maths-home-tutor", "/ib-exam-maths-support"],
    jee: ["/jee-maths-coaching", "/jee-maths-problem-solving", "/jee-maths-doubt-solving"],
  };

  return unique([
    page.parentHubPath,
    ...(boardHubs[page.boardSlug] ?? []),
    "/board-maths-exam-preparation",
    "/board-exam-maths-revision",
    "/maths-home-tutor",
    "/online-maths-home-tuition",
  ]);
}

function getBatchCClassPaths(page) {
  const sameBoardPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryClassPaths(page.boardSlug) : [];
  const classSpecificPaths = {
    "10": [
      "/class-10-cbse-maths-home-tutor",
      "/class-10-cbse-board-maths-preparation",
      "/class-10-maths-last-minute-revision",
      "/maths-homework-help-for-class-10",
    ],
    "12": [
      "/class-12-cbse-maths-home-tutor",
      "/class-12-cbse-board-maths-preparation",
      "/class-12-ib-maths-home-tutor",
      "/class-12-maths-last-minute-revision",
      "/maths-homework-help-for-class-12",
    ],
  };

  return unique([
    ...(classSpecificPaths[String(page.classLevel)] ?? []),
    ...sameBoardPaths,
    "/class-10-maths-tutor",
    "/class-12-maths-tutor",
    "/board-maths-exam-preparation",
    "/maths-exam-practice-sessions",
  ]);
}

function getBatchCTopicPaths(page) {
  const sameBoardTopics = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryTopicPaths(page.boardSlug) : [];
  const sameTopicPaths = batchCRootSeoPages
    .filter((item) => item.path !== page.path && item.topicSlug === page.topicSlug)
    .map((item) => item.path);

  return unique([
    batchCTopicHubPaths[page.topicSlug],
    ...sameTopicPaths,
    ...sameBoardTopics,
    "/cbse-algebra-tutor",
    "/igcse-trigonometry-tutor",
    "/ib-calculus-tutor",
    "/cbse-functions-tutor",
    "/igcse-probability-tutor",
    "/ib-statistics-tutor",
    "/jee-maths-problem-solving",
    "/maths-last-minute-revision",
  ]);
}

function buildBatchCSupportPoints(page) {
  if (page.kind === "topic-mastery") {
    return [
      {
        title: `${page.topicLabel} support should stay tied to the board`,
        description: page.focus,
      },
      {
        title: "Topic pages should not sit alone",
        description:
          "Each route links into locality, board, class, exam, and related topic pages so families can move from a chapter problem to the right tutoring plan.",
      },
      {
        title: "Tutor filtering uses only published profile data",
        description:
          "The page shows real matching profiles when available and otherwise keeps the enquiry route honest through the demo and WhatsApp flow.",
      },
    ];
  }

  if (page.kind === "doubt-support") {
    return [
      {
        title: "Doubt solving works best as a correction rhythm",
        description: page.focus,
      },
      {
        title: "Recurring doubts should lead back to chapters and exams",
        description:
          "The related links connect this topic intent to board pages, class pages, exam support, and Gurugram home tuition routes.",
      },
      {
        title: "No fake urgency or guaranteed outcomes",
        description:
          "Maths Bodhi checks class, board, current mistakes, schedule, and tutor availability before recommending any support path.",
      },
    ];
  }

  if (page.kind === "homework-support") {
    return [
      {
        title: "Homework help should build method, not shortcuts",
        description: page.focus,
      },
      {
        title: "Worksheets can reveal the real concept gap",
        description:
          "The page links into topic, class, board, and revision routes so families can move beyond one assignment when needed.",
      },
      {
        title: "Empty states stay transparent",
        description:
          "If no exact tutor profile matches, the page asks families to share class, board, chapters, and schedule before any shortlist is discussed.",
      },
    ];
  }

  return [
    {
      title: "Exam support should begin with the exact topic pressure",
      description: page.focus,
    },
    {
      title: "Topic repair connects to paper practice",
      description:
        "The page links into board, class, revision, doubt-solving, and topic mastery routes so preparation stays structured.",
    },
    {
      title: "The next step is a fit check, not a claim",
      description:
        "Maths Bodhi avoids fake tutors, fake reviews, and unsupported result promises while using the demo to check actual academic need.",
    },
  ];
}

function buildBatchCFaqs(page) {
  return [
    {
      question: `Who should use the ${page.title} page?`,
      answer: `It is for ${page.audience} who want ${page.primaryKeyword} connected to class, board, topic, locality, and exam-support next steps.`,
    },
    {
      question: "Can this be handled through home tuition or online support?",
      answer:
        "Yes, when tutor availability and schedule fit allow it. Families can compare home tuition, online support, or a hybrid plan during the demo conversation.",
    },
    {
      question: "Does this page guarantee a tutor or exam result?",
      answer:
        "No. It uses published tutor data where available and asks for a demo or WhatsApp check when fit, availability, and learning need must be confirmed.",
    },
  ];
}

function createBatchCRootSeoConfig(page) {
  const currentRow = getBatchCCurrentRow(page);
  const tokens = unique([
    page.primaryKeyword,
    page.title,
    page.boardLabel,
    page.topicLabel,
    page.classLevel ? `Class ${page.classLevel}` : "",
    page.intent,
    page.cluster,
    "Gurugram",
    "home tuition",
    "exam support",
  ]);

  return {
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: currentRow.pageType,
    template: "GenericPageTemplate",
    title: page.title,
    h1: page.h1,
    intro: getBatchCIntro(page),
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
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: `Explore ${page.primaryKeyword} with Maths Bodhi. Compare topic mastery, exam support, board routes, class routes, Gurugram home tuition, WhatsApp, and demo next steps.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      ...(page.parentHubPath && page.parentHubPath !== page.path
        ? [{ label: getPageLabel(page.parentHubPath), to: page.parentHubPath }]
        : []),
      { label: page.title },
    ],
    schemaType: "Service",
    publishStatus: "published",
    entity: page,
    sections: {
      hero: {
        badge: page.kind === "topic-mastery" ? "Topic Mastery" : "Exam Support",
        chips: unique([
          page.boardLabel,
          page.topicLabel,
          page.classLevel ? `Class ${page.classLevel}` : "",
          page.intent,
          "Home tuition",
          "Gurugram",
        ]).slice(0, 5),
        stats: [
          { value: "Batch C", label: "Topic + exam cluster" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Tutor-fit check" },
        ],
        supportPanel: {
          title: `${page.primaryKeyword} should connect topic clarity with the next practical route`,
          text:
            "This page keeps topic, class, board, exam, locality, and tutor-fit context together so it does not become a thin standalone SEO page.",
          bullets: [
            `Parent hub: ${getPageLabel(page.parentHubPath)}`,
            `Audience: ${page.audience}`,
            "No fake tutor counts, fake reviews, or guaranteed-result claims",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Page Focus",
        title: `What families should know about ${page.title}`,
        subtitle:
          "The page keeps topic intent connected to class, board, exam, locality, WhatsApp, and demo pathways.",
        points: buildBatchCSupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Use locality routes when home tuition fit, school travel rhythm, or nearby sector access changes the shortlist.",
          cards: buildRecoveryCards(getBatchCLocalityPaths(page), currentRow),
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board and exam pages",
          subtitle:
            "These pages keep curriculum, exam support, home tuition, and online support context visible.",
          cards: buildRecoveryCards(getBatchCBoardPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class pages",
          subtitle:
            "Use these routes when class level, board-exam pressure, homework load, or revision timing is the strongest signal.",
          cards: buildRecoveryCards(getBatchCClassPaths(page), currentRow),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic and revision pages",
          subtitle:
            "These links help families move from one topic problem into the connected chapters, exam routes, or doubt-solving support.",
          cards: buildRecoveryCards(getBatchCTopicPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published tutor profiles related to ${page.title}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here. When matching data is limited, the page sends families to a demo or WhatsApp fit check.",
        emptyState: {
          title: "No exact published tutor profile is shown for this route yet",
          description:
            "Maths Bodhi can still check current fit after the family shares class, board, locality or online preference, topic gaps, timeline, and schedule.",
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
      faqs: buildBatchCFaqs(page),
      cta: {
        title: "Book a free maths demo class",
        description: `Share the student's class, board, current topic gaps, exam timeline, and whether ${page.primaryKeyword} should be handled through home tuition, online support, or mentor guidance.`,
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchCWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchCWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  };
}

function getBatchDCurrentRow(page) {
  return {
    id: page.id,
    segment: page.kind?.includes("comparison")
      ? "Comparison"
      : page.kind === "resource-support"
        ? "Resource"
        : "Commercial Support",
    pageType: page.kind?.includes("comparison")
      ? "Comparison Page"
      : page.kind === "exam-guide"
        ? "Exam Guide Page"
        : page.kind === "study-support"
          ? "Study Support Page"
          : page.kind === "resource-support"
            ? "Resource Page"
            : "Commercial Support Page",
    audience: page.audience,
    cluster: page.cluster ?? "Comparison and Commercial Support",
    title: page.title,
    path: page.path,
    parent: page.parentHubPath,
    keyword: page.primaryKeyword,
    links: "",
  };
}

function createBatchDWhatsAppHref(page, purpose = "comparison and maths support") {
  const message = `Hello Maths Bodhi, I want help with ${page.title}. Please guide me on ${purpose}, tutor fit, and a demo class.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getBatchDIntro(page) {
  if (page.kind === "school-comparison") {
    return `${page.title} helps families compare maths support options for ${page.schoolName} search intent while staying clear that Maths Bodhi is not claiming official school affiliation.`;
  }

  if (page.kind === "comparison") {
    return `${page.title} compares support formats through schedule, attention, travel, practice follow-through, board fit, and the questions families should ask before booking a demo.`;
  }

  if (page.kind === "exam-guide") {
    return `${page.title} turns exam pressure into a clearer plan for revision, paper practice, weak-topic repair, doubt solving, and mentor guidance.`;
  }

  if (page.kind === "study-support") {
    return `${page.title} connects worksheets, homework, practice papers, and doubt logs with the right class, board, topic, locality, and demo route.`;
  }

  if (page.kind === "resource-support") {
    return `${page.title} gives families a practical decision route before they compare tutors, ask questions, and choose home tuition or online support.`;
  }

  return `${page.title} is a commercial-intent support page for families comparing one-to-one attention, weekend timing, board preparation, and tutor-fit next steps.`;
}

function getBatchDLocalityPaths(page) {
  const boardLocalityPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryLocalityBoardPaths(page.boardSlug, 3) : [];

  return unique([
    "/city/gurugram",
    "/maths-home-tutor-in-gurgaon",
    ...boardLocalityPaths,
    ...batchALocalityPages.slice(0, 7).map((item) => item.path),
  ]);
}

function getBatchDBoardPaths(page) {
  const boardHubs = {
    cbse: ["/cbse-maths-home-tutor", "/cbse-maths-tuition", "/cbse-maths-doubt-solving", "/cbse-board-maths-revision"],
    icse: ["/icse-maths-home-tutor", "/icse-maths-tuition", "/icse-maths-doubt-solving", "/icse-board-maths-revision"],
    igcse: ["/igcse-maths-home-tutor", "/igcse-maths-tuition", "/online-igcse-maths-tutor", "/igcse-exam-maths-support"],
    ib: ["/ib-maths-home-tutor", "/ib-maths-tuition", "/online-ib-maths-home-tuition", "/ib-exam-maths-support"],
    jee: ["/jee-maths-coaching", "/jee-maths-problem-solving", "/jee-maths-doubt-solving", "/online-jee-maths-tutor"],
  };

  return unique([
    page.parentHubPath,
    ...(boardHubs[page.boardSlug] ?? []),
    "/maths-home-tutor",
    "/online-maths-home-tuition",
    "/one-to-one-maths-tuition",
    "/board-maths-exam-preparation",
    "/maths-home-tuition-vs-coaching-centre",
  ]);
}

function getBatchDClassPaths(page) {
  const classSpecificPaths = {
    "10": [
      "/class-10-cbse-maths-home-tutor",
      "/class-10-cbse-board-maths-preparation",
      "/class-10-maths-last-minute-revision",
      "/class-10-maths-revision-plan",
      "/maths-homework-help-for-class-10",
    ],
    "12": [
      "/class-12-cbse-maths-home-tutor",
      "/class-12-cbse-board-maths-preparation",
      "/class-12-ib-maths-home-tutor",
      "/class-12-maths-last-minute-revision",
      "/class-12-maths-revision-plan",
      "/maths-homework-help-for-class-12",
    ],
  };
  const sameBoardPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryClassPaths(page.boardSlug) : [];

  return unique([
    ...(classSpecificPaths[String(page.classLevel)] ?? []),
    ...sameBoardPaths,
    "/class-10-maths-tutor",
    "/class-12-maths-tutor",
    "/board-exam-maths-preparation-guide",
    "/maths-study-plan-for-board-exams",
  ]);
}

function getBatchDTopicPaths(page) {
  const boardTopicPaths = page.boardSlug && page.boardSlug !== "jee" ? getRecoveryTopicPaths(page.boardSlug) : [];

  return unique([
    ...boardTopicPaths,
    "/cbse-algebra-tutor",
    "/igcse-trigonometry-tutor",
    "/ib-calculus-tutor",
    "/cbse-functions-tutor",
    "/igcse-probability-tutor",
    "/ib-statistics-tutor",
    "/algebra-doubt-solving",
    "/calculus-doubt-solving",
    "/jee-maths-problem-solving",
    "/maths-last-minute-revision",
  ]);
}

function buildBatchDSupportPoints(page) {
  if (page.kind === "school-comparison") {
    return [
      {
        title: `${page.schoolName} context should stay affiliation-safe`,
        description:
          "The school name is used only for parent search context. The page does not claim official partnership, preferred status, guaranteed results, or access to school records.",
      },
      {
        title: "Compare the real support format, not just the label",
        description: page.focus,
      },
      {
        title: "The next step is a fit check",
        description:
          "Families should share class, board, current chapters, school schedule, locality, and whether home tuition or online continuity is more practical.",
      },
    ];
  }

  if (page.kind === "comparison") {
    return [
      {
        title: "A comparison page should clarify tradeoffs",
        description: page.focus,
      },
      {
        title: "Mode choice should link back to board, class, and locality",
        description:
          "The related routes help families move from comparison into the exact board, class, topic, exam, or Gurugram locality page.",
      },
      {
        title: "No fake rankings or inflated claims",
        description:
          "Maths Bodhi keeps the decision grounded in tutor availability, schedule, learning need, and the demo conversation.",
      },
    ];
  }

  if (page.kind === "exam-guide") {
    return [
      {
        title: "Exam preparation needs a sequence, not panic",
        description: page.focus,
      },
      {
        title: "Guide pages should lead into action",
        description:
          "The page links to revision, doubt solving, worksheets, class pages, board pages, topic pages, and the demo route.",
      },
      {
        title: "Progress claims stay honest",
        description:
          "The page does not promise marks, ranks, or results. Tutor-fit is checked after the family shares current level, timeline, and weak chapters.",
      },
    ];
  }

  if (page.kind === "study-support") {
    return [
      {
        title: "Worksheets and practice papers need correction loops",
        description: page.focus,
      },
      {
        title: "Support should connect homework, topics, and exams",
        description:
          "Internal links move families into topic repair, board revision, class support, and locality-specific home tuition when needed.",
      },
      {
        title: "Empty states stay useful",
        description:
          "When no exact tutor profile matches the route, the page sends families into the demo and WhatsApp flow rather than inventing profiles.",
      },
    ];
  }

  return [
    {
      title: "Commercial-intent pages should help families decide",
      description: page.focus,
    },
    {
      title: "The route stays connected to the wider SEO cluster",
      description:
        "Related pages keep locality, board, class, topic, comparison, and exam support close to the decision point.",
    },
    {
      title: "Tutor recommendations stay grounded",
      description:
        "Only real published profiles are shown when they match. Otherwise, Maths Bodhi checks need and availability through demo or WhatsApp.",
    },
  ];
}

function buildBatchDFaqs(page) {
  return [
    {
      question: `Who should use the ${page.title} page?`,
      answer: `It is for ${page.audience} comparing ${page.primaryKeyword} and wanting a practical next step across locality, board, class, topic, and demo routes.`,
    },
    {
      question: "Can Maths Bodhi help choose between home tuition, online support, and coaching?",
      answer:
        "Families can compare those options in the demo conversation. The right fit depends on class, board, locality, schedule, weak chapters, and available tutor profiles.",
    },
    {
      question: "Does this page guarantee a tutor, review, score, or result?",
      answer:
        "No. The page avoids fake tutors, fake reviews, fake counts, and guaranteed-result claims. It uses published data where available and asks for a fit check when needed.",
    },
  ];
}

function createBatchDRootSeoConfig(page) {
  const currentRow = getBatchDCurrentRow(page);
  const tokens = unique([
    page.primaryKeyword,
    page.title,
    page.boardLabel,
    page.classLevel ? `Class ${page.classLevel}` : "",
    page.topicLabel,
    page.schoolName,
    page.intent,
    page.cluster,
    "Gurugram",
    "home tuition",
    "online maths tutor",
    "demo class",
  ]);

  return {
    id: page.id,
    slug: page.slug,
    routePath: page.path,
    pageType: currentRow.pageType,
    template: "GenericPageTemplate",
    title: page.title,
    h1: page.h1,
    intro: getBatchDIntro(page),
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
    seoTitle: `${page.title} | Maths Bodhi`,
    seoDescription: `Compare ${page.primaryKeyword} with Maths Bodhi. Review support format, board, class, topic, locality, WhatsApp, and free demo next steps without unsupported claims.`,
    canonicalUrl: page.path,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      ...(page.parentHubPath && page.parentHubPath !== page.path
        ? [{ label: getPageLabel(page.parentHubPath), to: page.parentHubPath }]
        : []),
      { label: page.title },
    ],
    schemaType: page.kind === "resource-support" || page.kind === "exam-guide" ? "Article" : "Service",
    publishStatus: "published",
    entity: page,
    sections: {
      hero: {
        badge: page.kind?.includes("comparison") ? "Comparison Intent" : "Commercial Support",
        chips: unique([
          page.boardLabel,
          page.classLevel ? `Class ${page.classLevel}` : "",
          page.schoolName,
          page.intent,
          "Home tuition",
          "Gurugram",
        ]).slice(0, 5),
        stats: [
          { value: "Batch D", label: "Comparison + support" },
          { value: "4", label: "Related link groups" },
          { value: "Demo", label: "Decision support" },
        ],
        supportPanel: {
          title: `${page.primaryKeyword} should lead into a practical decision, not a thin landing page`,
          text:
            "This page keeps comparison, class, board, topic, locality, and tutor-fit context together so families can choose the next route with less guesswork.",
          bullets: [
            `Parent hub: ${getPageLabel(page.parentHubPath)}`,
            `Audience: ${page.audience}`,
            "No fake tutors, fake reviews, fake counts, or guaranteed-result claims",
          ],
        },
        heroImage: "/images/hero-maths-home.svg",
        heroImageAlt: `${page.title} from Maths Bodhi`,
      },
      supportPoints: {
        badge: "Page Focus",
        title: `What families should know about ${page.title}`,
        subtitle:
          "The page is written for decision-stage searches and links back into useful locality, board, class, topic, and exam-support routes.",
        points: buildBatchDSupportPoints(page),
      },
      routeGroups: [
        {
          id: `${page.slug}-localities`,
          badge: "Related Localities",
          title: "Related Gurugram locality pages",
          subtitle:
            "Use locality routes when home tuition fit, travel rhythm, or nearby sector access affects the decision.",
          cards: buildRecoveryCards(getBatchDLocalityPaths(page), currentRow),
        },
        {
          id: `${page.slug}-boards`,
          badge: "Related Boards",
          title: "Related board, comparison, and support pages",
          subtitle:
            "These pages keep curriculum, mode choice, exam preparation, and demo context close to the current decision.",
          cards: buildRecoveryCards(getBatchDBoardPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
        {
          id: `${page.slug}-classes`,
          badge: "Related Classes",
          title: "Related class and revision pages",
          subtitle:
            "Use these routes when class level, board-exam pressure, homework load, or revision timing matters most.",
          cards: buildRecoveryCards(getBatchDClassPaths(page), currentRow),
        },
        {
          id: `${page.slug}-topics`,
          badge: "Related Topics",
          title: "Related topic and doubt-solving pages",
          subtitle:
            "These links move families from a commercial decision into the chapters, doubts, or exam practice that need attention.",
          cards: buildRecoveryCards(getBatchDTopicPaths(page), currentRow),
          backgroundClassName: "bg-slate-50",
        },
      ],
      featuredTutors: {
        badge: "Tutor Profiles",
        title: `Published tutor profiles related to ${page.title}`,
        subtitle:
          "Only real published Maths Bodhi tutor profiles are shown here. If matching data is limited, the page keeps the enquiry route honest through demo and WhatsApp checks.",
        emptyState: {
          title: "No exact published tutor profile is shown for this route yet",
          description:
            "Maths Bodhi can still check current fit after the family shares class, board, locality or online preference, weak chapters, comparison concern, and schedule.",
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
      faqs: buildBatchDFaqs(page),
      cta: {
        title: "Book a free maths demo class",
        description: `Share the student's class, board, current maths concern, and whether ${page.primaryKeyword} is the main decision. Maths Bodhi can guide home tuition, online support, or mentor next steps.`,
        primaryAction: {
          label: "Book a free maths demo class",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "WhatsApp Maths Bodhi",
          href: createBatchDWhatsAppHref(page),
          external: true,
        },
        tertiaryAction: {
          label: "Talk to a mentor",
          href: createBatchDWhatsAppHref(page, "mentor guidance"),
          external: true,
        },
      },
    },
  };
}

export const p1SeoPageConfigs = [
  ...p1SeoUrlRows
    .filter((item) => item.path !== "/" && item.path !== DEMO_PATH)
    .map((item) => createSeoConfig(item)),
  ...recoveryRootSeoPages.map((item) => createRecoveryRootSeoConfig(item)),
  ...batchARootSeoPages.map((item) => createBatchARootSeoConfig(item)),
  ...batchBRootSeoPages.map((item) => createBatchBRootSeoConfig(item)),
  ...batchCRootSeoPages.map((item) => createBatchCRootSeoConfig(item)),
  ...batchDRootSeoPages.map((item) => createBatchDRootSeoConfig(item)),
];

export function getP1SeoPageConfig(slug) {
  return p1SeoPageConfigs.find((item) => item.slug === slug) ?? null;
}
