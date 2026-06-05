import {
  getMathsBoardBreadcrumbs,
  getMathsBoardPageContent,
  getMathsBoardPageContentBySegments,
} from "../services/mathsContentService";
import { getCityPage, getSectorPage } from "../services/siteLookup";
import { getP1SeoPageConfig } from "./config/p1SeoPageConfigs";
import {
  getAjayIntentPageConfig,
  getAjayMainPageConfig,
} from "./config/ajayPageConfigs";
import {
  futureClassPageConfigs,
  futureExamPageConfigs,
  gurugramPublicEntryConfigs,
  gurugramHubPageConfig,
} from "./config/staticPageConfigs";
import {
  SCHEMA_IDS,
  getArticleSchema,
  getBreadcrumbSchema,
  getCourseSchema,
  getFAQSchema,
  getServiceSchema,
  getWebPageSchema,
} from "../utils/schema";

function normalizeSlug(value) {
  return String(value ?? "").trim().toLowerCase();
}

function createPageConfig(config) {
  return {
    id: config.id,
    slug: config.slug,
    routePath: config.routePath,
    pageType: config.pageType,
    template: config.template,
    title: config.title,
    h1: config.h1,
    intro: config.intro,
    sectionDefinitions: config.sectionDefinitions ?? [],
    relatedTutorQuery: config.relatedTutorQuery ?? {},
    relatedReviewQuery: config.relatedReviewQuery ?? {},
    relatedBlogQuery: config.relatedBlogQuery ?? {},
    relatedResultQuery: config.relatedResultQuery ?? {},
    faqReferences: config.faqReferences ?? [],
    seoTitle: config.seoTitle,
    seoDescription: config.seoDescription,
    canonicalUrl: config.canonicalUrl,
    breadcrumbItems: config.breadcrumbItems ?? [],
    schemaType: config.schemaType ?? "CollectionPage",
    publishStatus: config.publishStatus ?? "draft",
    entity: config.entity ?? null,
    sections: config.sections ?? {},
  };
}

function buildFaqReferences(items = []) {
  return (items ?? []).map((item, index) => item.id || item.question || `faq-${index + 1}`);
}

function getVisibleFaqItems(config) {
  const faqSection = (config.sectionDefinitions ?? []).find((item) => item.id === "faqs");

  if (faqSection?.enabled === false) {
    return [];
  }

  return config.sections?.faqs ?? config.entity?.faqItems ?? [];
}

function isSectionEnabled(config, sectionId) {
  const section = (config.sectionDefinitions ?? []).find((item) => item.id === sectionId);
  return section ? section.enabled !== false : true;
}

const ACRONYM_LABELS = new Map([
  ["cbse", "CBSE"],
  ["icse", "ICSE"],
  ["isc", "ISC"],
  ["igcse", "IGCSE"],
  ["ib", "IB"],
  ["jee", "JEE"],
  ["dlf", "DLF"],
  ["dps", "DPS"],
  ["dav", "DAV"],
  ["gd", "GD"],
  ["kr", "KR"],
  ["m3m", "M3M"],
]);

const KNOWN_SCHOOL_NAME_PATTERN =
  /\b(?:dps|dav|pathways|heritage|shiv\s+nadar|lotus\s+valley|lancers|suncity|amity|goenka|xavier|shri\s+ram|scottish\s+high|manav\s+rachna|mangalam|delhi\s+public|public\s+school|international\s+school|world\s+school|high\s+school|learning\s+school)\b/i;
const KNOWN_SCHOOL_SLUG_PATTERN =
  /(?:^|-)(?:dps|dav|pathways|heritage|shiv-nadar|lotus-valley|lancers|suncity|amity|goenka|xavier|shri-ram|scottish-high|manav-rachna|k-r-mangalam|kr-mangalam|g-d-goenka|gd-goenka|delhi-public-school|public-school|international-school|world-school|high-school|learning-school)(?:-|$)/i;
const GENERIC_SCHOOL_CONTEXT_PATTERN =
  /\b(?:premium|after|advanced|senior|middle|primary|secondary)\s+school\b|\bschool\s+(?:maths|support|program|foundation|students?|tests?|readiness|context|tuition|home|board|specific|and)\b/i;

function normalizeSchemaText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleCasePhrase(value) {
  return String(value ?? "")
    .replace(/[-_]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => ACRONYM_LABELS.get(part.toLowerCase()) ?? part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getConfigPath(config) {
  return config.canonicalUrl || config.routePath || "/";
}

function getLastPathSegment(config) {
  return getConfigPath(config).split("/").filter(Boolean).at(-1) ?? "";
}

function isSpecificSchoolName(value) {
  const candidate = String(value ?? "").trim();

  if (!candidate) {
    return false;
  }

  if (KNOWN_SCHOOL_NAME_PATTERN.test(candidate)) {
    return true;
  }

  return /\bschool\b/i.test(candidate) && !GENERIC_SCHOOL_CONTEXT_PATTERN.test(candidate);
}

function getConfigText(config) {
  return [
    config.pageType,
    config.schemaType,
    config.title,
    config.h1,
    config.intro,
    config.seoDescription,
    config.canonicalUrl,
    config.routePath,
    config.entity?.primaryKeyword,
    config.entity?.keyword,
    config.entity?.intent,
    config.entity?.cluster,
    config.entity?.audience,
    config.entity?.schoolName,
    config.entity?.boardLabel,
    config.entity?.topicLabel,
    config.entity?.kind,
    ...(config.sections?.hero?.chips ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function extractClassLevel(config) {
  const text = getConfigText(config);
  const explicitClass = config.entity?.classLevel || config.entity?.educationalLevel;

  if (explicitClass) {
    return String(explicitClass).match(/^(class|grade|ib myp)/i)
      ? String(explicitClass)
      : `Class ${explicitClass}`;
  }

  const classMatch = text.match(/\bclass\s*(\d{1,2})\b/i);
  const gradeMatch = text.match(/\bgrade\s*(\d{1,2})\b/i);
  const mypMatch = text.match(/\bmyp\s*(\d)\b/i);

  if (classMatch) return `Class ${classMatch[1]}`;
  if (gradeMatch) return `Grade ${gradeMatch[1]}`;
  if (mypMatch) return `IB MYP ${mypMatch[1]}`;

  return "";
}

function extractBoardLabel(config) {
  const explicitBoard = config.entity?.boardLabel || config.entity?.board;

  if (explicitBoard) {
    return titleCasePhrase(explicitBoard);
  }

  const text = normalizeSchemaText(getConfigText(config));

  if (text.includes("cambridge")) return "Cambridge";
  if (text.includes("igcse")) return "IGCSE";
  if (text.includes("icse")) return "ICSE";
  if (text.includes(" isc ")) return "ISC";
  if (text.includes(" cbse ")) return "CBSE";
  if (text.includes(" ib ")) return "IB";
  if (text.includes("jee")) return "JEE";

  return "";
}

function extractExplicitBoardLabel(config) {
  const explicitBoard =
    config.entity?.boardLabel ||
    config.entity?.board ||
    config.entity?.boardSlug ||
    config.boardLabel ||
    config.board ||
    config.boardSlug;

  if (explicitBoard) {
    return titleCasePhrase(explicitBoard);
  }

  const boardMatch = getLastPathSegment(config).match(/(?:^|-)(cambridge|igcse|icse|isc|cbse|ib)(?:-|$)/i);

  return boardMatch ? titleCasePhrase(boardMatch[1]) : "";
}

function extractSchoolName(config) {
  if (config.entity?.schoolName) {
    return config.entity.schoolName;
  }

  const text = [config.h1, config.title].filter(Boolean).join(" ");
  const visibleMatch = text.match(/\b(?:for|near)\s+(.+?)(?:\s+students|\s+in\s+gurugram|\s+gurugram|$)/i);
  const visibleCandidate = visibleMatch?.[1]?.trim();

  if (visibleCandidate && isSpecificSchoolName(visibleCandidate)) {
    return visibleCandidate;
  }

  const slugCandidate = getLastPathSegment(config)
    .replace(/^(best|top)-maths-home-tutor-for-/, "")
    .replace(/-gurugram$/, "");

  if (KNOWN_SCHOOL_SLUG_PATTERN.test(slugCandidate)) {
    return titleCasePhrase(slugCandidate);
  }

  return "";
}

function getNormalizedPageType(config) {
  return normalizeSchemaText(config.pageType);
}

function getNormalizedEntityKind(config) {
  return normalizeSchemaText(config.entity?.kind);
}

function isArticleLikeConfig(config) {
  const entityKind = getNormalizedEntityKind(config);

  return (
    config.schemaType === "Article" ||
    entityKind === "resource support" ||
    entityKind === "exam guide"
  );
}

function isGurugramChildPath(path) {
  return /^\/(?:city\/)?gurugram\/[^/]+$/.test(path);
}

function isKnownGurugramLocalityPath(path) {
  return /^\/gurugram\/(?:dlf-phase-\d+|south-city-\d+|sushant-lok-\d+|sohna-road)$/.test(path);
}

function isGenericGurugramLocalitySlug(slug) {
  return (
    slug.length > 0 &&
    !/^(?:class-\d+|grade-\d+|online|cbse|icse|isc|igcse|ib|jee|olympiad|board)\b/.test(slug)
  );
}

function classifyConfigPage(config) {
  const path = getConfigPath(config);
  const text = normalizeSchemaText(getConfigText(config));
  const pageType = getNormalizedPageType(config);
  const slug = getLastPathSegment(config);
  const hasSocietySignal = Boolean(config.entity?.societyLabel || config.societySlug);
  const hasSectorSignal = Boolean(
    config.entity?.sectorLabel ||
      config.entity?.sectorSlug ||
      config.sectorSlug ||
      /^\/(?:city\/)?gurugram\/sector-\d+(?:$|-)/.test(path),
  );
  const hasLocalitySignal = Boolean(config.entity?.localityLabel || config.entity?.localitySlug);

  if (path === "/") return "homepage";
  if (path.includes("contact")) return "contact";
  if (text.includes("privacy") || text.includes("terms")) return "legal";
  if (isArticleLikeConfig(config)) return "article";
  if (extractSchoolName(config) || text.includes("school specific service")) return "school";
  if (pageType === "city" || path === "/gurugram" || path === "/city/gurugram") return "city";
  if (pageType === "society" || hasSocietySignal || path.includes("maths-home-tutor-near-")) {
    return "society";
  }
  if (pageType === "sector" || hasSectorSignal) return "sector";
  if (hasLocalitySignal || text.includes("location service") || isKnownGurugramLocalityPath(path)) {
    return "locality";
  }
  if (text.includes("online")) return "online";
  if (text.includes("class service") || extractClassLevel(config)) return "class";
  if (text.includes("jee") || text.includes("olympiad")) return "exam";
  if (text.includes("curriculum hub") || text.includes("board") || extractBoardLabel(config)) return "board";
  if (text.includes("exam")) return "exam";
  if (isGurugramChildPath(path) && isGenericGurugramLocalitySlug(slug)) return "locality";

  return "service";
}

function extractLocalAreaName(config) {
  if (config.entity?.sectorLabel) {
    return config.entity.cityLabel
      ? `${config.entity.sectorLabel}, ${config.entity.cityLabel}`
      : `${config.entity.sectorLabel}, Gurugram`;
  }

  if (config.entity?.localityLabel) {
    return `${config.entity.localityLabel}, Gurugram`;
  }

  if (config.entity?.societyLabel) {
    return `${config.entity.societyLabel}, ${config.entity.localityLabel || "Gurugram"}`;
  }

  const slug = getLastPathSegment(config)
    .replace(/-(cbse|icse|isc|igcse|ib)-maths-home-tutor$/, "")
    .replace(/-maths-home-tutor$/, "")
    .replace(/^maths-home-tutor-near-/, "");
  const label = titleCasePhrase(slug);

  if (!label) {
    return "Gurugram";
  }

  return /gurugram|gurgaon/i.test(label) ? label : `${label}, Gurugram`;
}

function getSchemaAreaServed(config, pageKind) {
  if (pageKind === "school") {
    return {
      "@type": "Place",
      name: `${extractSchoolName(config)} area, Gurugram`,
    };
  }

  if (["sector", "locality", "society"].includes(pageKind)) {
    return {
      "@type": "Place",
      name: extractLocalAreaName(config),
    };
  }

  if (pageKind === "online") {
    return [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: "Gurugram" },
    ];
  }

  return {
    "@type": "City",
    name: "Gurugram",
  };
}

function getSchemaAudience(config, pageKind) {
  const classLevel = extractClassLevel(config);

  if (pageKind === "school") {
    return {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "School students",
    };
  }

  if (classLevel) {
    return {
      "@type": "EducationalAudience",
      educationalRole: "student",
      educationalLevel: classLevel,
    };
  }

  if (pageKind === "exam") {
    return {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Exam aspirants",
    };
  }

  if (pageKind === "board") {
    return {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Board students",
    };
  }

  return {
    "@type": "EducationalAudience",
    educationalRole: "student",
  };
}

function getServiceType(config, pageKind) {
  const classLevel = extractClassLevel(config);
  const explicitBoard = extractExplicitBoardLabel(config);
  const board = explicitBoard || (pageKind === "board" ? extractBoardLabel(config) : "");
  const text = normalizeSchemaText(getConfigText(config));

  if (pageKind === "online") return "Online maths tuition";
  if (pageKind === "school") return "Maths tutoring for school students";
  if (pageKind === "city") return "Maths home tutoring";
  if (["sector", "locality", "society"].includes(pageKind) && !classLevel && !explicitBoard) {
    return "Maths home tutoring";
  }
  if (text.includes("jee advanced")) return "JEE Advanced maths tutoring";
  if (text.includes("jee main")) return "JEE Main maths tutoring";
  if (text.includes("jee")) return "JEE maths tutoring";
  if (text.includes("olympiad")) return "Maths Olympiad preparation";
  if (pageKind === "class" && classLevel) return `${classLevel} maths tuition`;
  if (pageKind === "board" && board) return `${board} maths tuition`;
  if (text.includes("revision") || text.includes("exam")) return "Board exam maths preparation";
  if (text.includes("doubt")) return "Maths doubt solving support";
  if (text.includes("worksheet")) return "Maths worksheet support";
  if (classLevel) return `${classLevel} maths tuition`;
  if (board) return `${board} maths tuition`;

  return ["sector", "locality", "society", "city"].includes(pageKind)
    ? "Maths home tutoring"
    : "Maths tutoring";
}

function getSchemaMentions(config, pageKind) {
  if (pageKind !== "school") {
    return undefined;
  }

  return {
    "@type": "School",
    name: extractSchoolName(config),
  };
}

function hasVisibleFaqs(config) {
  return isSectionEnabled(config, "faqs") && getVisibleFaqItems(config).length > 0;
}

function getWebPageType(pageKind) {
  if (pageKind === "contact") return "ContactPage";
  if (pageKind === "legal") return "WebPage";

  return "WebPage";
}

export function resolveBoardPageConfig(segments = []) {
  const [boardSlug, stageSlug, trackSlug] = segments;
  const page = getMathsBoardPageContentBySegments(boardSlug, stageSlug, trackSlug);

  if (!page) {
    return null;
  }

  return createPageConfig({
    id: page.id ?? `board-${page.key}`,
    slug: page.key,
    routePath: page.route,
    pageType: "board",
    template: "BoardPageTemplate",
    title: page.label,
    h1: page.title,
    intro: page.subtitle,
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "reviews", template: "reviews", enabled: true },
      { id: "student-results", template: "student-results", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "faqs", template: "faqs", enabled: Boolean(page.faqItems?.length) },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "board",
      pageKey: page.key,
      featuredTutorIds: page.featuredTutorIds ?? [],
      limit: page.key === "hub" ? 15 : 12,
    },
    relatedBlogQuery: {
      kind: "board",
      pageKey: page.key,
      limit: page.key === "hub" ? 4 : 3,
    },
    relatedResultQuery: {
      kind: "board",
      pageKey: page.key,
      limit: page.key === "hub" ? 6 : 4,
    },
    relatedReviewQuery: {
      kind: "board",
      pageKey: page.key,
      featuredReviewIds: page.featuredReviewIds ?? [],
      limit: page.key === "hub" ? 6 : 3,
    },
    faqReferences: buildFaqReferences(page.faqItems),
    seoTitle: page.metaTitle ?? page.title,
    seoDescription: page.metaDescription ?? page.subtitle,
    canonicalUrl: page.route,
    breadcrumbItems: getMathsBoardBreadcrumbs(page.key),
    schemaType: "CollectionPage",
    publishStatus: page.status ?? "published",
    entity: page,
    sections: {
      hero: {
        badge: page.badge,
        chips: page.chips ?? [],
        stats: page.stats ?? [],
        supportPanel: page.supportPanel,
        heroImage: page.heroImage ?? "/images/hero-maths-home.svg",
        heroImageAlt: page.heroImageAlt ?? `${page.label} maths home tutor support in Gurugram`,
      },
      supportPoints: {
        badge: "Verified Maths Tutors",
        title:
          page.key === "hub"
            ? "Verified maths tutors for every board and learning goal"
            : `Verified maths tutors for ${page.label}`,
        subtitle:
          page.key === "hub"
            ? "Compare board fit, class level, teaching experience, tutor background and learning goals before opening a full profile."
            : `These tutors align with ${page.label.toLowerCase()} expectations, class needs, personal attention and maths home tuition support in Gurugram.`,
        points: page.checklist ?? [],
      },
      faqs: page.faqItems ?? [],
      cta: {
        title: "Start the right maths learning conversation",
        description:
          page.cta?.description ??
          "Share the student's class, board, current maths concern and goal so Maths Bodhi can guide you toward verified maths tutor support.",
        primaryAction: {
          label: page.cta?.label ?? "Book a maths consultation",
          to: "/book-demo",
        },
      },
    },
  });
}

export function resolveCityPageConfig(siteData, citySlug) {
  const page = getCityPage(siteData, citySlug);

  if (!page) {
    return null;
  }

  return createPageConfig({
    id: page.id ?? `city-${page.slug}`,
    slug: page.slug,
    routePath: `/city/${page.slug}`,
    pageType: "city",
    template: "CityPageTemplate",
    title: page.label,
    h1: page.headline,
    intro: page.subtitle,
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "reviews", template: "reviews", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "city",
      citySlug: page.slug,
      cityLabel: page.label,
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "city",
      citySlug: page.slug,
      cityLabel: page.label,
      boardLabels: page.servedBoards ?? [],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "city",
      citySlug: page.slug,
      limit: 3,
    },
    relatedReviewQuery: {
      kind: "city",
      citySlug: page.slug,
      cityLabel: page.label,
      limit: 3,
    },
    faqReferences: [],
    seoTitle: `Maths Home Tutor in ${page.label} | Verified Maths Tutors | Maths Bodhi`,
    seoDescription:
      page.subtitle ||
      `Find verified maths home tutors in ${page.label} for CBSE, ICSE, ISC, IGCSE, IB MYP, IB DP, JEE Main, JEE Advanced and Maths Olympiad preparation.`,
    canonicalUrl: `/city/${page.slug}`,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: "Cities" },
      { label: page.label },
    ],
    schemaType: "Service",
    publishStatus: page.status ?? "published",
    entity: page,
    sections: {
      hero: {
        badge: `Verified maths tutors in ${page.label}`,
        chips: page.coverageAreas ?? [],
        supportPanel: {
          title: `Find personalised maths home tuition across ${page.label}`,
          text:
            page.subtitle ||
            `Maths Bodhi helps families in ${page.label} find verified, experienced and board-aware maths tutors for school maths, JEE maths, Olympiad preparation and personal attention.`,
          bullets: (page.proofPoints ?? []).map((item) => `${item.label}: ${item.value}`),
        },
      },
      supportPoints: {
        badge: "City Coverage",
        title: `How families compare maths tutors in ${page.label}`,
        subtitle:
          "Use this city-level page to compare board support, locality coverage, tutor experience and learning goals before choosing a maths home tutor.",
        points: [...(page.coverageAreas ?? []), ...(page.servedBoards ?? [])],
      },
      cta: {
        title: `Find the right maths tutor in ${page.label}`,
        description:
          page.cta?.description ??
          `Share the student's board, class, locality and maths goal so Maths Bodhi can help you choose verified home tuition support in ${page.label}.`,
        primaryAction: {
          label: page.cta?.label ?? "Book a demo",
          to: "/book-demo",
        },
        secondaryAction: page.topSectors?.[0]
          ? {
              label: "Explore top localities",
              to: `/city/${page.slug}/${page.topSectors[0].slug}`,
            }
          : null,
      },
      reviews: {
        badge: "Parent Reviews",
        title: `Parent feedback from ${page.label} families`,
        subtitle: "Approved public reviews appear here when they match this city route.",
      },
    },
  });
}

export function resolveSectorPageConfig(siteData, citySlug, sectorSlug) {
  const page = getSectorPage(siteData, citySlug, sectorSlug);

  if (!page) {
    return null;
  }

  return createPageConfig({
    id: page.id ?? `sector-${page.citySlug}-${page.slug}`,
    slug: page.slug,
    routePath: `/city/${page.citySlug}/${page.slug}`,
    pageType: "sector",
    template: "SectorPageTemplate",
    title: page.sectorLabel,
    h1: page.headline,
    intro: page.subtitle,
    sectionDefinitions: [
      { id: "hero", template: "hero", enabled: true },
      { id: "support-points", template: "support-points", enabled: true },
      { id: "featured-tutors", template: "featured-tutors", enabled: true },
      { id: "reviews", template: "reviews", enabled: true },
      { id: "related-blogs", template: "related-blogs", enabled: true },
      { id: "cta", template: "cta", enabled: true },
    ],
    relatedTutorQuery: {
      kind: "sector",
      citySlug: page.citySlug,
      sectorSlug: page.slug,
      sectorLabel: page.sectorLabel,
      limit: 6,
    },
    relatedBlogQuery: {
      kind: "sector",
      citySlug: page.citySlug,
      sectorSlug: page.slug,
      sectorLabel: page.sectorLabel,
      boardLabels: page.serviceModes ?? [],
      limit: 3,
    },
    relatedResultQuery: {
      kind: "sector",
      citySlug: page.citySlug,
      sectorSlug: page.slug,
      sectorLabel: page.sectorLabel,
      limit: 3,
    },
    relatedReviewQuery: {
      kind: "sector",
      citySlug: page.citySlug,
      sectorSlug: page.slug,
      sectorLabel: page.sectorLabel,
      limit: 3,
    },
    faqReferences: [],
    seoTitle: `Maths Home Tutor in ${page.sectorLabel}, ${page.cityLabel} | Maths Bodhi`,
    seoDescription:
      page.subtitle ||
      `Find verified maths home tutors in ${page.sectorLabel}, ${page.cityLabel} for CBSE, ICSE, ISC, IGCSE, IB, JEE and Maths Olympiad preparation.`,
    canonicalUrl: `/city/${page.citySlug}/${page.slug}`,
    breadcrumbItems: [
      { label: "Home", to: "/" },
      { label: page.cityLabel, to: `/city/${page.citySlug}` },
      { label: page.sectorLabel },
    ],
    schemaType: "Service",
    publishStatus: page.status ?? "published",
    entity: page,
    sections: {
      hero: {
        badge: `Maths home tuition in ${page.sectorLabel}`,
        chips: page.landmarks ?? [],
        supportPanel: {
          title: `Verified maths tutor support around ${page.sectorLabel}`,
          text:
            page.subtitle ||
            `Maths Bodhi helps families near ${page.sectorLabel} find experienced maths tutors for board preparation, JEE maths, Olympiad practice, marks improvement and personal attention.`,
          bullets: (page.proofPoints ?? []).map((item) => item.title),
        },
      },
      supportPoints: {
        badge: "Local Maths Support",
        title: `What families in ${page.sectorLabel} usually compare`,
        subtitle:
          "Families usually compare tutor experience, board expertise, class fit, travel convenience, timing, personal attention and the student's target outcome before booking maths support.",
        points: [...(page.nearbySchools ?? []), ...(page.serviceModes ?? [])],
      },
      cta: {
        title: `Plan maths support in ${page.sectorLabel}`,
        description:
          page.cta?.description ??
          `Share the student's class, board and maths goal so Maths Bodhi can guide you toward verified tutor support near ${page.sectorLabel}.`,
        primaryAction: {
          label: page.cta?.label ?? "Book a demo",
          to: "/book-demo",
        },
        secondaryAction: {
          label: `Back to ${page.cityLabel}`,
          to: `/city/${page.citySlug}`,
        },
      },
      reviews: {
        badge: "Local Reviews",
        title: `Parent feedback near ${page.sectorLabel}`,
        subtitle:
          "Approved public reviews appear here when families have shared relevant locality feedback.",
      },
    },
  });
}

export function resolveSectorAliasConfig(siteData, sectorSlug) {
  return resolveSectorPageConfig(siteData, "gurugram", sectorSlug);
}

function buildBatchConfig(config, entity = null) {
  return createPageConfig({
    ...config,
    publishStatus: config.publishStatus ?? "published",
    entity,
  });
}

export function resolveGurugramHubConfig(siteData) {
  const cityPage = getCityPage(siteData, "gurugram");

  return buildBatchConfig(gurugramHubPageConfig, cityPage);
}

export function resolveGurugramEntryConfig(siteData, entrySlug) {
  const matchedConfig = gurugramPublicEntryConfigs.find(
    (config) => normalizeSlug(config.slug) === normalizeSlug(entrySlug),
  );

  if (!matchedConfig) {
    return null;
  }

  if (matchedConfig.pageType === "sector" && matchedConfig.sectorSlug) {
    const sectorPage = getSectorPage(siteData, "gurugram", matchedConfig.sectorSlug);
    return buildBatchConfig(matchedConfig, sectorPage);
  }

  if (matchedConfig.boardKey) {
    const boardPage = getMathsBoardPageContent(matchedConfig.boardKey);
    return buildBatchConfig(matchedConfig, boardPage);
  }

  return buildBatchConfig(matchedConfig, null);
}

export function resolveP1SeoPageConfig(slug) {
  const matchedConfig = getP1SeoPageConfig(normalizeSlug(slug));

  if (!matchedConfig) {
    return null;
  }

  return createPageConfig(matchedConfig);
}

export function resolveAjayMainPageConfig() {
  return createPageConfig(getAjayMainPageConfig());
}

export function resolveAjayIntentPageConfig(slug) {
  const matchedConfig = getAjayIntentPageConfig(normalizeSlug(slug));

  if (!matchedConfig) {
    return null;
  }

  return createPageConfig(matchedConfig);
}

function resolveStaticConfig(configs = [], slug, pageType) {
  const matched = configs.find((item) => normalizeSlug(item.slug) === normalizeSlug(slug));

  if (!matched) {
    return null;
  }

  return createPageConfig({
    ...matched,
    pageType,
    template: pageType === "class" ? "ClassPageTemplate" : "ExamPageTemplate",
    publishStatus: matched.publishStatus ?? "draft",
  });
}

export function resolveClassPageConfig(classSlug) {
  return resolveStaticConfig(futureClassPageConfigs, classSlug, "class");
}

export function resolveExamPageConfig(examSlug) {
  return resolveStaticConfig(futureExamPageConfigs, examSlug, "exam");
}

export function buildConfigPageSchema(config) {
  const pageKind = classifyConfigPage(config);
  const canonicalUrl = getConfigPath(config);
  const name = config.h1 || config.title;
  const description = config.seoDescription || config.intro;
  const graph = [];

  if (pageKind === "contact" || pageKind === "legal") {
    graph.push(
      getWebPageSchema({
        url: canonicalUrl,
        name,
        description,
        type: getWebPageType(pageKind),
        aboutId: SCHEMA_IDS.localBusiness,
      }),
    );
  } else if (pageKind === "article") {
    const article = getArticleSchema({
      url: canonicalUrl,
      headline: name,
      description,
      image: config.sections?.hero?.heroImage,
      author: config.entity?.author,
    });

    graph.push(
      getWebPageSchema({
        url: canonicalUrl,
        name,
        description,
        mainEntityId: article?.["@id"],
        aboutId: article?.["@id"],
      }),
      article,
    );
  } else if (config.schemaType === "Course") {
    const course = getCourseSchema({
      url: canonicalUrl,
      name,
      description,
      educationalLevel: extractClassLevel(config) || extractBoardLabel(config),
      audience: getSchemaAudience(config, pageKind),
    });

    graph.push(
      getWebPageSchema({
        url: canonicalUrl,
        name,
        description,
        mainEntityId: course?.["@id"],
        aboutId: course?.["@id"],
      }),
      course,
    );
  } else {
    const combinedText = normalizeSchemaText(getConfigText(config));
    const service = getServiceSchema({
      url: canonicalUrl,
      name,
      description,
      serviceType: getServiceType(config, pageKind),
      areaServed: getSchemaAreaServed(config, pageKind),
      audience: getSchemaAudience(config, pageKind),
      mentions: getSchemaMentions(config, pageKind),
      serviceOutput: combinedText.includes("personal") ? "Personalized maths tutoring support" : undefined,
    });

    graph.push(
      getWebPageSchema({
        url: canonicalUrl,
        name,
        description,
        mainEntityId: service?.["@id"],
        aboutId: service?.["@id"],
      }),
      service,
    );
  }

  graph.push(getBreadcrumbSchema({ url: canonicalUrl, items: config.breadcrumbItems ?? [] }));

  if (hasVisibleFaqs(config)) {
    graph.push(getFAQSchema({ url: canonicalUrl, faqs: getVisibleFaqItems(config) }));
  }

  return graph.filter(Boolean);
}
