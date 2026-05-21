import path from "node:path";
import { pathToFileURL } from "node:url";

type MathsBoardPage = Record<string, any> & {
  key: string;
  route: string;
  label: string;
};

type MathsTestimonial = {
  id: string;
  parent?: string;
  sector?: string;
  board?: string;
  rating?: string | number;
  quote?: string;
  featuredOn?: string[];
};

function frontendSourcePath(...segments: string[]) {
  const frontendRoot = process.env.FRONTEND_SOURCE_DIR
    ? path.resolve(process.env.FRONTEND_SOURCE_DIR)
    : path.resolve(process.cwd(), "../frontend/src");

  return pathToFileURL(path.join(frontendRoot, ...segments)).href;
}

function pageSourceId(key: string) {
  return `page-board-${key.replaceAll("/", "-")}`;
}

function toSeedPage(page: MathsBoardPage) {
  const key = page.key;

  return {
    id: pageSourceId(key),
    pageType: "board",
    pageKey: key,
    slug: key,
    route: page.route,
    label: page.label,
    title: page.title ?? page.label,
    navLabel: page.navLabel ?? page.label,
    h1: page.title ?? page.label,
    intro: page.subtitle ?? page.intro ?? "",
    status: "published",
    badge: page.badge ?? "",
    heroBadge: page.heroBadge ?? page.badge ?? "",
    parentKey: page.parentKey ?? "",
    breadcrumbLabel: page.breadcrumbLabel ?? page.label,
    chips: page.chips ?? [],
    stats: page.stats ?? [],
    supportPanel: page.supportPanel ?? { title: "", text: "", bullets: [] },
    overview: page.overview ?? { badge: "", title: "", subtitle: "", cards: [] },
    childSections: page.childSections ?? [],
    detailSections: page.detailSections ?? [],
    checklist: page.checklist ?? [],
    schoolHighlights: page.schoolHighlights ?? [],
    localZones: page.localZones ?? [],
    localDemandZones: page.localDemandZones ?? [],
    cta: page.cta ?? { label: "", description: "" },
    heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
    heroImageAlt: page.heroImageAlt ?? `${page.label} tutoring support`,
    featuredTutorIds: page.featuredTutorIds ?? [],
    featuredReviewIds: page.featuredReviewIds ?? [],
    faqItems: page.faqItems ?? [],
    relatedCities: page.relatedCities ?? ["gurugram"],
    boards: page.boards ?? [],
    topics: page.topics ?? [],
    outcomes: page.outcomes ?? [],
    learningApproach: page.learningApproach ?? [],
    classSegments: page.classSegments ?? [],
    boardSupportCards: page.boardSupportCards ?? [],
    searchIntentChips: page.searchIntentChips ?? [],
    heroStats: page.heroStats ?? [],
    heroSupportTitle: page.heroSupportTitle ?? "",
    heroSupportText: page.heroSupportText ?? "",
    seoSections: page.seoSections ?? [],
    parentChecklist: page.parentChecklist ?? [],
    seo: {
      title: page.metaTitle ?? page.title ?? page.label,
      description: page.metaDescription ?? page.subtitle ?? "",
      canonicalUrl: page.route,
      keywords: page.keywords ?? [],
      ogImage: page.heroImage ?? "/images/hero-maths-home.svg",
      indexable: true,
    },
  };
}

function toSeedReview(review: MathsTestimonial, index: number) {
  return {
    id: review.id,
    reviewerName: review.parent ?? "Maths Bodhi parent",
    parent: review.parent ?? "Maths Bodhi parent",
    roleType: "Parent",
    reviewText: review.quote ?? "",
    quote: review.quote ?? "",
    rating: Number(review.rating ?? 5),
    relatedBoard: review.board ?? "",
    board: review.board ?? "",
    city: "gurugram",
    locality: review.sector ?? "",
    sector: review.sector ?? "",
    school: "Maths Bodhi family",
    featured: Boolean(review.featuredOn?.includes("hub")),
    status: "approved",
    featuredOn: review.featuredOn ?? [],
    order: index + 1,
  };
}

export async function loadFrontendStaticSeedStore() {
  const [{ mathsBoardConfig }, { mathsTestimonials }] = await Promise.all([
    import(frontendSourcePath("data", "mathsBoardConfig.js")) as Promise<{
      mathsBoardConfig: Record<string, MathsBoardPage>;
    }>,
    import(frontendSourcePath("data", "mathsTestimonials.js")) as Promise<{
      mathsTestimonials: MathsTestimonial[];
    }>,
  ]);

  return {
    tutors: [],
    tutorProfiles: [],
    blogs: [],
    reviews: mathsTestimonials.map(toSeedReview),
    results: [],
    pages: Object.values(mathsBoardConfig).map(toSeedPage),
    faqs: [],
  };
}
