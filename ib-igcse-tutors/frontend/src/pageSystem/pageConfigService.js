import {
  getMathsBoardBreadcrumbs,
  getMathsBoardPageContent,
  getMathsBoardPageContentBySegments,
} from "../services/mathsContentService";
import { getCityPage, getSectorPage } from "../services/siteLookup";
import { getP1SeoPageConfig } from "./config/p1SeoPageConfigs";
import {
  futureClassPageConfigs,
  futureExamPageConfigs,
  gurugramPublicEntryConfigs,
  gurugramHubPageConfig,
} from "./config/staticPageConfigs";

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
  return config.sections?.faqs ?? config.entity?.faqItems ?? [];
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
    schemaType: "LocalBusiness",
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
    schemaType: "LocalBusiness",
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
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://www.mathsbodhi.in";
  const breadcrumbs = config.breadcrumbItems ?? [];
  const visibleFaqItems = getVisibleFaqItems(config);
  const schemaItems = [];

  if (breadcrumbs.length) {
    schemaItems.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: new URL(item.to ?? config.canonicalUrl, siteUrl).toString(),
      })),
    });
  }

  if (visibleFaqItems.length) {
    schemaItems.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: visibleFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  if (config.schemaType) {
    schemaItems.push({
      "@context": "https://schema.org",
      "@type": config.schemaType,
      name: config.h1,
      description: config.seoDescription,
      url: new URL(config.canonicalUrl, siteUrl).toString(),
    });
  }

  return schemaItems;
}
