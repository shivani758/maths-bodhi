const DEFAULT_SITE_URL = "https://www.mathsbodhi.in";
const DEFAULT_BRAND_NAME = "Maths Bodhi";
const DEFAULT_LOGO_PATH = "/assets/mathsbodhi-logo.png";
const DEFAULT_IMAGE_PATH = "/images/hero-maths-home.svg";

export const MAIN_ENTITY_ID = `${DEFAULT_SITE_URL}/#localbusiness`;
export const WEBSITE_ID = `${DEFAULT_SITE_URL}/#website`;
export const HOMEPAGE_ID = `${DEFAULT_SITE_URL}/#webpage`;
export const LOGO_ID = `${DEFAULT_SITE_URL}/#logo`;
export const SITE_URL = DEFAULT_SITE_URL;
export const BRAND_NAME = DEFAULT_BRAND_NAME;
export const BUSINESS_ID = MAIN_ENTITY_ID;
export const MATHS_BODHI_SCHEMA_IDS = {
  localBusiness: MAIN_ENTITY_ID,
  website: WEBSITE_ID,
  homepage: HOMEPAGE_ID,
  logo: LOGO_ID,
};
export const SCHEMA_IDS = MATHS_BODHI_SCHEMA_IDS;

export const MATHS_BODHI_KNOWS_ABOUT = [
  "Mathematics",
  "Maths Home Tuition",
  "Maths Home Tutor",
  "Online Maths Tuition",
  "CBSE Mathematics",
  "ICSE Mathematics",
  "ISC Mathematics",
  "IGCSE Mathematics",
  "IB Mathematics",
  "Class 6 Maths",
  "Class 7 Maths",
  "Class 8 Maths",
  "Class 9 Maths",
  "Class 10 Maths",
  "Class 11 Maths",
  "Class 12 Maths",
  "JEE Foundation Mathematics",
  "JEE Main Mathematics",
  "JEE Advanced Mathematics",
  "Olympiad Mathematics",
];

function getConfiguredSiteUrl() {
  const configuredUrl = String(import.meta.env?.VITE_SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/$/, "");

  if (/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?$/i.test(configuredUrl)) {
    return DEFAULT_SITE_URL;
  }

  return configuredUrl || DEFAULT_SITE_URL;
}

export function toAbsoluteUrl(path = "/") {
  try {
    return new URL(String(path || "/"), `${getConfiguredSiteUrl()}/`).toString();
  } catch {
    return new URL("/", `${DEFAULT_SITE_URL}/`).toString();
  }
}

export function absoluteUrl(path = "/") {
  return toAbsoluteUrl(path);
}

export function getAbsoluteUrl(path = "/") {
  return toAbsoluteUrl(path);
}

function asArray(value) {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? value.flat() : [value];
}

function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

const UNSUPPORTED_SCHEMA_KEYS = new Set(["parent_node", "parentNode"]);

function isEmptySchemaValue(value) {
  if (value == null) {
    return true;
  }

  if (typeof value === "string") {
    return value.trim() === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}

export function cleanSchemaObject(value) {
  if (Array.isArray(value)) {
    const cleanedItems = value
      .map((item) => cleanSchemaObject(item))
      .filter((item) => !isEmptySchemaValue(item));

    return cleanedItems.length ? cleanedItems : undefined;
  }

  if (isPlainObject(value)) {
    const cleanedObject = Object.entries(value).reduce((result, [key, item]) => {
      if (UNSUPPORTED_SCHEMA_KEYS.has(key)) {
        return result;
      }

      const cleanedValue = cleanSchemaObject(item);

      if (!isEmptySchemaValue(cleanedValue)) {
        result[key] = cleanedValue;
      }

      return result;
    }, {});

    return Object.keys(cleanedObject).length ? cleanedObject : undefined;
  }

  if (typeof value === "string") {
    return value.trim() || undefined;
  }

  return value;
}

function idReference(value) {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return { "@id": value };
  }

  if (Array.isArray(value)) {
    return value.map(idReference).filter(Boolean);
  }

  return value;
}

function getPostalAddress(contact = {}) {
  const streetAddress = contact.streetAddress || "";
  const addressLocality = contact.city || contact.addressLocality || "";
  const addressRegion = contact.state || contact.addressRegion || "";
  const addressCountry = contact.country || contact.addressCountry || "";

  if (![streetAddress, addressLocality, addressRegion, addressCountry].some(hasText)) {
    return undefined;
  }

  return {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality,
    addressRegion,
    addressCountry,
  };
}

function normalizePlace(value) {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return {
      "@type": "Place",
      name: value,
    };
  }

  return value;
}

function normalizeAreaServed(areaServed) {
  const places = asArray(areaServed).map(normalizePlace).filter(Boolean);

  if (!places.length) {
    return undefined;
  }

  return places.length === 1 ? places[0] : places;
}

function normalizeAudience(audience) {
  if (!audience) {
    return undefined;
  }

  if (typeof audience === "string") {
    return {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: audience,
    };
  }

  return {
    "@type": "EducationalAudience",
    educationalRole: "student",
    ...audience,
  };
}

export function getEducationalAudience(audience = {}) {
  return normalizeAudience(audience);
}

function normalizeMentions(mentions) {
  const mentionItems = asArray(mentions)
    .map((item) => {
      if (typeof item === "string") {
        return {
          "@type": "Thing",
          name: item,
        };
      }

      return item;
    })
    .filter(Boolean);

  if (!mentionItems.length) {
    return undefined;
  }

  return mentionItems.length === 1 ? mentionItems[0] : mentionItems;
}

function normalizeAuthor(author) {
  if (!author || /maths\s*bodhi/i.test(String(author))) {
    return { "@id": MAIN_ENTITY_ID };
  }

  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: author,
    };
  }

  return author;
}

function stripContext(item) {
  if (!isPlainObject(item)) {
    return item;
  }

  const { "@context": _context, ...rest } = item;
  return rest;
}

function normalizeGraphItems(graph) {
  return asArray(graph)
    .flatMap((item) => {
      if (!item || typeof item !== "object") {
        return [];
      }

      if (Array.isArray(item["@graph"])) {
        return item["@graph"];
      }

      return [item];
    })
    .map(stripContext);
}

function dedupeGraphItems(items) {
  const seenIds = new Set();

  return items.filter((item) => {
    const id = item?.["@id"];

    if (!id) {
      return true;
    }

    if (seenIds.has(id)) {
      return false;
    }

    seenIds.add(id);
    return true;
  });
}

export function getBaseBusinessSchema({
  name = DEFAULT_BRAND_NAME,
  description = "Maths Bodhi provides verified maths home tutoring and online maths tuition support for Gurugram students across CBSE, ICSE, ISC, IGCSE, IB, JEE, Olympiad, and school maths.",
  contact = {},
  telephone,
  email,
  address,
  image = DEFAULT_IMAGE_PATH,
  logo = DEFAULT_LOGO_PATH,
  areaServed = ["Gurugram", "Gurgaon"],
  knowsAbout = MATHS_BODHI_KNOWS_ABOUT,
} = {}) {
  const schemaContact = {
    ...contact,
    phoneDisplay: telephone ?? contact.phoneDisplay,
    email: email ?? contact.email,
    ...(address ?? {}),
  };

  return cleanSchemaObject({
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": MAIN_ENTITY_ID,
    name,
    alternateName: "Mathsbodhi",
    url: toAbsoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: toAbsoluteUrl(logo),
    },
    image: toAbsoluteUrl(image),
    description,
    telephone: schemaContact.phoneDisplay,
    email: schemaContact.email,
    address: getPostalAddress(schemaContact),
    areaServed: normalizeAreaServed(areaServed),
    knowsAbout,
  });
}

export function getWebsiteSchema({ name = DEFAULT_BRAND_NAME, url = "/" } = {}) {
  return cleanSchemaObject({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: toAbsoluteUrl(url),
    name,
    publisher: {
      "@id": MAIN_ENTITY_ID,
    },
  });
}

export function getHomepageSchema(options = {}) {
  const name = options.name ?? DEFAULT_BRAND_NAME;
  const description = options.description;

  return [
    getBaseBusinessSchema(options),
    getWebsiteSchema({ name, url: "/" }),
    getWebPageSchema({
      url: "/",
      name,
      description,
      aboutId: MAIN_ENTITY_ID,
      mainEntityId: MAIN_ENTITY_ID,
    }),
  ];
}

export function getWebPageSchema({
  url,
  name,
  description,
  mainEntityId,
  aboutId,
  pageId,
  pageType,
  type = "WebPage",
} = {}) {
  const canonicalUrl = toAbsoluteUrl(url);

  return cleanSchemaObject({
    "@type": pageType || type,
    "@id": pageId || (canonicalUrl === toAbsoluteUrl("/") ? HOMEPAGE_ID : `${canonicalUrl}#webpage`),
    url: canonicalUrl,
    name,
    description,
    isPartOf: {
      "@id": WEBSITE_ID,
    },
    about: idReference(aboutId),
    mainEntity: idReference(mainEntityId),
  });
}

export function getServiceSchema({
  url,
  name,
  description,
  serviceType,
  areaServed,
  audience,
  mentions,
  serviceOutput,
} = {}) {
  const canonicalUrl = toAbsoluteUrl(url);

  return cleanSchemaObject({
    "@type": "Service",
    "@id": `${canonicalUrl}#service`,
    url: canonicalUrl,
    name,
    serviceType,
    description,
    provider: {
      "@id": MAIN_ENTITY_ID,
    },
    areaServed: normalizeAreaServed(areaServed),
    audience: normalizeAudience(audience),
    mentions: normalizeMentions(mentions),
    serviceOutput,
  });
}

export function getCourseSchema({
  url,
  name,
  description,
  educationalLevel,
  audience,
} = {}) {
  const canonicalUrl = toAbsoluteUrl(url);

  return cleanSchemaObject({
    "@type": "Course",
    "@id": `${canonicalUrl}#course`,
    url: canonicalUrl,
    name,
    description,
    provider: {
      "@id": MAIN_ENTITY_ID,
    },
    educationalLevel,
    audience: normalizeAudience(audience),
  });
}

export function getArticleSchema({
  url,
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  type = "Article",
} = {}) {
  const canonicalUrl = toAbsoluteUrl(url);

  return cleanSchemaObject({
    "@type": type,
    "@id": `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline,
    description,
    image: image ? toAbsoluteUrl(image) : undefined,
    datePublished,
    dateModified,
    author: normalizeAuthor(author),
    publisher: {
      "@id": MAIN_ENTITY_ID,
    },
    mainEntityOfPage: {
      "@id": `${canonicalUrl}#webpage`,
    },
  });
}

export function getPersonSchema({
  url,
  name,
  jobTitle,
  knowsAbout,
  image,
  description,
} = {}) {
  const canonicalUrl = toAbsoluteUrl(url);

  return cleanSchemaObject({
    "@type": "Person",
    "@id": `${canonicalUrl}#person`,
    url: canonicalUrl,
    name,
    jobTitle,
    description,
    image: image ? toAbsoluteUrl(image) : undefined,
    worksFor: {
      "@id": MAIN_ENTITY_ID,
    },
    knowsAbout,
  });
}

export function getBreadcrumbSchema({ url, items = [] } = {}) {
  const canonicalUrl = toAbsoluteUrl(url);
  const itemListElement = items
    .map((item, index) => {
      const itemUrl = item.to ?? item.url ?? (index === items.length - 1 ? canonicalUrl : undefined);

      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.label ?? item.name,
        item: itemUrl ? toAbsoluteUrl(itemUrl) : undefined,
      };
    })
    .filter((item) => hasText(item.name));

  return cleanSchemaObject({
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement,
  });
}

export function getFAQSchema({ url, faqs = [] } = {}) {
  const canonicalUrl = toAbsoluteUrl(url);
  const mainEntity = faqs
    .map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    }))
    .filter((item) => hasText(item.name) && hasText(item.acceptedAnswer?.text));

  return cleanSchemaObject({
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity,
  });
}

export function renderJsonLd(graph) {
  if (typeof graph === "string") {
    return graph.trim();
  }

  const cleanedGraph = dedupeGraphItems(
    normalizeGraphItems(graph)
      .map((item) => cleanSchemaObject(item))
      .filter((item) => !isEmptySchemaValue(item)),
  );

  if (!cleanedGraph.length) {
    return null;
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": cleanedGraph,
  });
}
