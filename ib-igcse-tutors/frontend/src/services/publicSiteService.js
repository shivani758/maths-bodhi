import { apiRequest } from "./apiClient";
import {
  MATHS_BODHI_ADDRESS,
  MATHS_BODHI_PHONE_DISPLAY,
  MATHS_BODHI_WHATSAPP_NUMBER,
} from "../constants/contact";

const EVENT_NAME = "maths-bodhi-public-site-change";

  const DEFAULT_SETTINGS = {
  siteName: "Maths Bodhi",
  supportEmail: "support@mathsbodhi.in",
  whatsappNumber: MATHS_BODHI_WHATSAPP_NUMBER,
  phoneDisplay: MATHS_BODHI_PHONE_DISPLAY,
  footerLinks: [],
  contact: {
    phoneDisplay: MATHS_BODHI_PHONE_DISPLAY,
    whatsappNumber: MATHS_BODHI_WHATSAPP_NUMBER,
    email: "support@mathsbodhi.in",
    supportHours: "Mon to Sat, 9 AM to 8 PM",
    address: MATHS_BODHI_ADDRESS,
    streetAddress: "1st Floor, 497 Housing Board Colony",
    city: "Gurgaon",
    state: "Haryana",
    country: "India",
  },
  socialLinks: {},
  analyticsIds: {},
  branding: {
    logoMark: "/assets/mathsbodhi-logo.png",
    defaultHeroImage: "/images/hero-maths-home.svg",
  },

  seo: {
    title: "Maths Bodhi | Verified Maths Home Tutors in Gurugram",
    description:
      "Maths Bodhi provides verified maths home tutors in Gurugram for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced and Maths Olympiad preparation with personalised learning support.",
    canonicalUrl: "",
    keywords: [
      "maths home tutor in Gurugram",
      "verified maths tutor Gurgaon",
      "CBSE maths tutor",
      "ICSE maths tutor",
      "ISC maths tutor",
      "IGCSE maths tutor",
      "IB maths tutor",
      "IB DP maths tutor",
      "IB MYP maths tutor",
      "JEE Main maths tutor",
      "JEE Advanced maths tutor",
      "Maths Olympiad tutor",
      "female maths tutor",
      "PhD maths tutor",
      "senior maths tutor",
      "home tuition for maths",
      "maths tuition Gurugram",
    ],
    ogImage: "/images/hero-maths-home.svg",
    indexable: true,
  },

  homepage: {
    eyebrow: "Verified Maths Home Tutors in Gurugram",

    heroTitle:
      "Find experienced maths home tutors for CBSE, ICSE, ISC, IGCSE, IB and JEE preparation",

    heroSubtitle:
      "Maths Bodhi helps families in Gurugram connect with verified, highly experienced maths tutors for school maths, competitive exams, concept building, marks improvement and personalised academic mentoring.",

    keywordChips: [
      "CBSE Maths Tutors",
      "ICSE Maths Tutors",
      "ISC Maths Tutors",
      "IGCSE Maths Tutors",
      "IB MYP Maths Tutors",
      "IB DP Maths Tutors",
      "JEE Main Maths",
      "JEE Advanced Maths",
      "Maths Olympiad",
      "Female Maths Tutors",
      "Senior Maths Tutors",
      "Crash Courses",
      "Special Child Support",
      "95%+ Score Planning",
    ],

    stats: [
      {
        value: "K-12",
        label: "School Maths Support",
        description:
          "Structured maths tutoring from foundational learning to senior secondary board preparation.",
      },
      {
        value: "95%+",
        label: "Marks Improvement",
        description:
          "Focused planning for students targeting higher confidence and better academic performance.",
      },
      {
        value: "1:1",
        label: "Personal Attention",
        description:
          "Personalised maths learning plans based on board, class, learning pace and exam goals.",
      },
      {
        value: "JEE, Ol",
        label: "Competitive Preparation",
        description:
          "Advanced maths support for JEE Main, JEE Advanced and Maths Olympiad preparation.",
      },
    ],

    serviceBullets: [
      "Verified maths home tutors in Gurugram with real teaching experience.",
      "Board-specific tutoring for CBSE, ICSE, ISC, IGCSE, IB MYP and IB DP students.",
      "Experienced maths faculty for JEE Main, JEE Advanced and Olympiad maths preparation.",
      "Female maths tutors available for students and families preferring female mentors.",
      "Senior and PhD-level maths tutors from reputed universities and academic backgrounds.",
      "Personalised learning support for marks improvement and confidence building.",
      "Special child maths tutoring with patient and structured teaching methods.",
      "Crash courses for school maths, board exams and competitive maths revision.",
    ],

    intentTitle:
      "Why families in Gurugram choose Maths Bodhi for maths home tuition",

    intentParagraphs: [
      "Maths Bodhi is focused on helping students learn mathematics with confidence, consistency and personal attention. Families searching for maths home tutors in Gurugram often want more than just chapter completion. They want a tutor who understands the board pattern, the student's weak areas, exam pressure and the need for structured guidance. Maths Bodhi connects students with verified maths tutors who specialise in school maths, advanced maths and competitive exam preparation.",

      "We support students across CBSE, ICSE, ISC, IGCSE, IB MYP and IB DP curriculum pathways. Different boards require different teaching styles. CBSE students often need speed, exam discipline and NCERT mastery. ICSE and ISC students need strong conceptual clarity and presentation. IGCSE students need analytical thinking and international curriculum alignment. IB students require inquiry-based understanding, application-focused reasoning and deeper mathematical interpretation. Our tutoring approach respects these differences.",

      "Maths Bodhi is also known for connecting families with experienced maths tutors including senior faculty, female maths tutors, PhD-level mentors and tutors from top academic institutions. Many parents specifically look for tutors who can teach patiently, communicate clearly and build confidence gradually. We focus on teaching quality, subject understanding and long-term academic growth instead of random tutor listings.",

      "For competitive exam preparation, students preparing for JEE Main, JEE Advanced and Maths Olympiad require deeper problem-solving practice, time management and advanced conceptual clarity. Maths Bodhi supports learners who want focused preparation plans, revision structure, mock test analysis and advanced maths guidance. Our platform is designed to support both school excellence and competitive ambition.",

      "A large number of students struggle with maths because of gaps in foundational understanding. Some students lose confidence after repeated mistakes, while others need more personal attention than a classroom can provide. Maths Bodhi supports concept rebuilding through structured tutoring, practice planning, revision strategy and regular doubt solving. The aim is not only marks improvement but also long-term confidence in mathematics.",

      "Parents also approach Maths Bodhi for students who require patient teaching methods, including special child maths learning support. Every learner processes mathematics differently. Some need visual explanation, repeated examples and slower pacing. Others need advanced challenge and faster progression. Our tutoring ecosystem supports both types of learners with personalised teaching alignment.",

      "Crash courses are another important area of support. Many students need short-term focused revision before school exams, board exams or competitive tests. Maths Bodhi helps students prepare through targeted topic revision, formula practice, mock testing and chapter prioritisation. These crash programs are especially useful for students preparing for CBSE board exams, JEE maths sections and final-term assessments.",

      "Our larger goal is to create a trusted maths learning ecosystem in Gurugram where students can improve performance, strengthen concepts and become more confident problem solvers. Whether the learner is targeting 95%+, preparing for IB mathematics, building foundational confidence or aiming for JEE Advanced, Maths Bodhi focuses on meaningful academic progress with personalised support.",
    ],

    goalTitle: "Learning goals supported by Maths Bodhi",

    goalParagraphs: [
      "Marks improvement remains one of the biggest goals for students and parents searching for maths home tutors. Maths Bodhi focuses on structured academic progress through personalised tutoring, concept rebuilding, worksheet practice and exam-oriented preparation. Students often improve when they receive focused attention and consistent revision planning.",

      "Students aiming for 95% and above require more than just textbook completion. High-performing learners need advanced practice, speed improvement, presentation discipline and error analysis. Maths Bodhi supports ambitious learners through advanced tutoring support, performance tracking and strategic revision routines.",

      "For JEE Main and JEE Advanced preparation, students need strong conceptual understanding in algebra, coordinate geometry, calculus, vectors, trigonometry and probability. Maths Bodhi supports students through advanced problem-solving guidance, test practice and performance-oriented mentoring designed for engineering entrance preparation.",

      "Maths Olympiad learners require curiosity-driven mathematical thinking and non-routine problem-solving exposure. Maths Bodhi helps students explore deeper mathematical concepts beyond regular classroom learning and encourages analytical reasoning through guided practice and mentor-driven exploration.",

      "Students preparing for IB MYP and IB DP mathematics often require conceptual depth, structured reasoning and application-based learning support. Maths Bodhi tutors help learners improve confidence in assignments, internal assessments and advanced mathematical understanding required in international curricula.",

      "Special child maths support is approached with patience, empathy and structured teaching techniques. Some students require slower pacing, repetition, visual explanation and confidence building. Maths Bodhi supports families looking for tutors who can provide calmer and more adaptive learning environments.",

      "Parents often request female maths tutors, senior mentors or PhD-level faculty because trust, communication and subject expertise matter deeply in mathematics learning. Maths Bodhi makes it easier to discover tutors aligned with both academic and family preferences while maintaining strong teaching quality standards.",

      "Maths Bodhi ultimately aims to support students across every stage of their maths journey. Some learners need foundational clarity, some need exam-focused revision, some want top scores and others want deeper academic growth. Our focus remains on personalised maths learning, meaningful improvement and long-term confidence.",
    ],
  },

  premiumSchools: [
  ],
};


const EMPTY_PUBLIC_STORE = {
  settings: DEFAULT_SETTINGS,
  tutors: [],
  tutorProfiles: [],
  reviews: [],
  results: [],
  blogs: [],
  pages: [],
  faqs: [],
  cities: [],
  localities: [],
};

let apiContentCache = cloneValue(EMPTY_PUBLIC_STORE);

function cloneValue(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

function hasBrowser() {
  return typeof window !== "undefined";
}

function emitSiteChange() {
  if (!hasBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(EVENT_NAME));
}

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function isApprovedReview(review) {
  return (review.status ?? review.moderationStatus) === "approved";
}

function isPublishedBlog(blog) {
  return blog.status === "published";
}

function getMergedStore() {
  const tutorProfiles = (apiContentCache.tutors ?? []).map((tutor) => {
    return {
      id: tutor.profile?.id ?? `profile-${tutor.id}`,
      tutorId: tutor.id,
      longFormProfile: tutor.fullBio ?? "",
      qualifications: tutor.qualifications ?? [],
      teachingStyle: tutor.teachingStyle ?? "",
      achievements: tutor.achievements ?? [],
      associatedBoards: tutor.boards ?? [],
      associatedTags: tutor.badges ?? [],
      profileMediaIds: tutor.profile?.profileMediaIds ?? [],
      linkedFaqIds: tutor.profile?.linkedFaqIds ?? [],
      linkedStudentResultIds: tutor.linkedResultIds ?? [],
    };
  });

  return {
    ...EMPTY_PUBLIC_STORE,
    ...apiContentCache,
    settings: DEFAULT_SETTINGS,
    tutorProfiles,
  };
}

function getFaqItemsForLinkedId(store, linkedId) {
  return store.faqs
    .filter((item) => item.linkedId === linkedId && item.status !== "archived")
    .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))
    .map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
    }));
}

function getActivePageEntries(store, pageType) {
  return store.pages.filter(
    (page) => page.pageType === pageType && page.status === "published",
  );
}

function toPublicTutor(tutor) {
  return {
    id: tutor.id,
    sourceId: tutor.sourceId ?? "",
    slug: tutor.slug,
    name: tutor.name,
    title: tutor.title,
    rating: String(tutor.rating),
    experience: tutor.experience ?? tutor.experienceLabel ?? "",
    board: tutor.boards?.[0] ?? "Maths",
    classLevel: tutor.classesSupported?.[0] ?? "Flexible support",
    location: tutor.location ?? "Gurugram",
    sectors: tutor.localities ?? [],
    topics: tutor.topics ?? [],
    price: tutor.startingFee,
    mode: tutor.serviceModes ?? [],
    studentsHelped: tutor.studentsHelped ?? 0,
    schoolFocus: tutor.schoolFocus ?? [],
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    shortBio: tutor.shortBio ?? tutor.summary,
    fullBio: tutor.fullBio ?? tutor.summary ?? "",
    summary: tutor.summary ?? tutor.shortBio,
    boards: cloneValue(tutor.boards ?? []),
    classesSupported: cloneValue(tutor.classesSupported ?? []),
    localities: cloneValue(tutor.localities ?? []),
    cities: cloneValue(tutor.cities ?? []),
    serviceModes: cloneValue(tutor.serviceModes ?? tutor.mode ?? []),
    startingFee: tutor.startingFee ?? tutor.price,
    qualifications: tutor.qualifications ?? [],
    availability: tutor.availability ?? "",
    achievements: tutor.achievements ?? [],
    badges: cloneValue(tutor.badges ?? []),
    linkedReviewIds: cloneValue(tutor.linkedReviewIds ?? []),
    linkedResultIds: cloneValue(tutor.linkedResultIds ?? []),
    seo: cloneValue(tutor.seo ?? null),
    featuredOn: cloneValue(tutor.featuredOn ?? []),
  };
}

function toPublicReview(review) {
  return {
    id: review.id,
    sourceId: review.sourceId ?? "",
    parent: review.parent ?? review.reviewerName,
    sector: review.sector ?? review.locality,
    school: review.school ?? "Maths Bodhi family",
    board: review.board ?? review.relatedBoard,
    rating: String(review.rating),
    quote: review.quote ?? review.reviewText,
    relatedTutorId: review.relatedTutorId ?? review.linkedTutorId ?? null,
    relatedBoard: review.relatedBoard ?? review.board ?? "",
    locality: review.locality ?? review.sector ?? "",
    featuredOn: cloneValue(review.featuredOn ?? []),
    status: review.status ?? review.moderationStatus,
  };
}

function toPublicBlog(blog) {
  return {
    ...cloneValue(blog),
    sourceId: blog.sourceId ?? "",
    summary: blog.summary ?? blog.excerpt ?? blog.description ?? "",
    tags: cloneValue(blog.tags ?? []),
    relatedTutorIds: cloneValue(blog.relatedTutorIds ?? []),
    to: blog.slug ? `/blogs/${blog.slug}` : "",
  };
}

function toPublicSubjectPage(store, page) {
  return {
    ...page,
    label: page.label ?? page.title,
    faqItems: cloneValue(page.faqItems?.length ? page.faqItems : getFaqItemsForLinkedId(store, page.id)),
    heroBadge: page.heroBadge ?? page.badge,
    title: page.h1,
    subtitle: page.intro,
    seoTitle: page.seo?.title ?? page.h1,
    metaDescription: page.seo?.description ?? page.intro,
    keywords: page.seo?.keywords ?? [],
    heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
    heroImageAlt: page.heroImageAlt ?? `${page.label ?? page.title} tutoring support`,
  };
}

function toPublicBoardPage(store, page) {
  return {
    ...page,
    key: page.pageKey ?? page.key,
    label: page.label ?? page.title,
    title: page.h1,
    subtitle: page.intro,
    metaTitle: page.seo?.title ?? page.h1,
    metaDescription: page.seo?.description ?? page.intro,
    keywords: page.seo?.keywords ?? [],
    route: page.route,
    faqItems: cloneValue(page.faqItems?.length ? page.faqItems : getFaqItemsForLinkedId(store, page.id)),
  };
}

function toPublicCityPage(city) {
  return cloneValue(city);
}

function toPublicLocalityPage(locality) {
  return cloneValue(locality);
}

export async function refreshPublicSiteData() {
  const bootstrapResult = await fetchPublicPayload("/api/public/bootstrap");
  const bootstrap = bootstrapResult.ok ? bootstrapResult.data : {};

  apiContentCache = {
    ...EMPTY_PUBLIC_STORE,
    tutors: toArray(bootstrap.tutors),
    blogs: toArray(bootstrap.blogs),
    reviews: toArray(bootstrap.reviews),
    results: toArray(bootstrap.results),
    pages: toArray(bootstrap.pages),
    faqs: toArray(bootstrap.faqs),
    cities: toArray(bootstrap.cities),
    localities: toArray(bootstrap.localities),
  };
  emitSiteChange();
  return cloneValue(apiContentCache);
}

export function getSiteDataSnapshot() {
  const store = getMergedStore();
  const settings = store.settings;
  const homeTutors = store.tutors
    .filter((tutor) => !tutor.status || tutor.status === "active")
    .sort((first, second) => {
      const firstFeatured = Number(Boolean(first.featuredInHome || first.featured));
      const secondFeatured = Number(Boolean(second.featuredInHome || second.featured));

      if (firstFeatured !== secondFeatured) {
        return secondFeatured - firstFeatured;
      }

      return (first.displayOrder ?? 999) - (second.displayOrder ?? 999);
    })
    .map(toPublicTutor);
  const homeReviews = store.reviews
    .filter(isApprovedReview)
    .sort((first, second) => (first.order ?? 0) - (second.order ?? 0))
    .map(toPublicReview);
  const publishedBlogs = store.blogs
    .filter(isPublishedBlog)
    .sort(
      (first, second) =>
        new Date(second.publishDate ?? second.updatedAt ?? 0).getTime() -
        new Date(first.publishDate ?? first.updatedAt ?? 0).getTime(),
    )
    .map(toPublicBlog);

  return {
    brandName: settings.siteName,
    contact: cloneValue(settings.contact),
    seo: {
      title: settings.seo.title,
      description: settings.seo.description,
      keywords: cloneValue(settings.seo.keywords ?? []),
    },
    home: cloneValue(settings.homepage),
    premiumSchools: cloneValue(settings.premiumSchools ?? []),
    tutors: homeTutors,
    reviews: homeReviews,
    blogs: publishedBlogs,
    subjectPages: getActivePageEntries(store, "subject").map((page) => toPublicSubjectPage(store, page)),
    cityPages: store.cities.filter((city) => city.status !== "archived").map(toPublicCityPage),
    sectorPages: store.localities
      .filter((locality) => locality.status !== "archived")
      .map(toPublicLocalityPage),
  };
}

export function subscribeSiteData(listener) {
  if (!hasBrowser()) {
    return () => {};
  }

  const handleEvent = () => listener(getSiteDataSnapshot());
  window.addEventListener(EVENT_NAME, handleEvent);

  return () => {
    window.removeEventListener(EVENT_NAME, handleEvent);
  };
}

export function listBoardPagesSnapshot() {
  const store = getMergedStore();
  return getActivePageEntries(store, "board").map((page) => toPublicBoardPage(store, page));
}

export function listSubjectPagesSnapshot() {
  const store = getMergedStore();
  return getActivePageEntries(store, "subject").map((page) => toPublicSubjectPage(store, page));
}

export function listCanonicalTutorsSnapshot() {
  return cloneValue(getMergedStore().tutors);
}

export function listCanonicalReviewsSnapshot() {
  return cloneValue(getMergedStore().reviews.filter(isApprovedReview));
}

export function listTutorProfilesSnapshot() {
  return cloneValue(getMergedStore().tutorProfiles);
}

export function listResultsSnapshot() {
  return cloneValue(getMergedStore().results);
}

export function listPublishedBlogsSnapshot() {
  return getMergedStore().blogs
    .filter(isPublishedBlog)
    .map((blog) => toPublicBlog(blog));
}

export function listFaqsSnapshot() {
  return cloneValue(getMergedStore().faqs);
}

async function fetchPublicPayload(path) {
  try {
    const data = await apiRequest(path);
    return {
      ok: true,
      data: data && typeof data === "object" ? data : {},
    };
  } catch (error) {
    console.warn(`${path} API fallback used:`, error);
    return { ok: false, data: {} };
  }
}
