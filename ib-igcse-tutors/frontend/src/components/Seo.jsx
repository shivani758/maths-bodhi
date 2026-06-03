import { useEffect } from "react";
import { renderJsonLd } from "../utils/schema";

const DEFAULT_TITLE = "Maths Bodhi | Verified Maths Home Tutors in Gurugram";
const DEFAULT_DESCRIPTION =
  "Find verified maths home tutors in Gurugram for CBSE, ICSE, ISC, IGCSE, IB, JEE Main, JEE Advanced, and Maths Olympiad preparation.";
const DEFAULT_KEYWORDS = [
  "maths home tutor Gurugram",
  "CBSE maths tutor",
  "ICSE maths tutor",
  "IGCSE maths tutor",
  "IB maths tutor",
  "JEE maths tutor",
];
const SITE_NAME = "Maths Bodhi";
const PRODUCTION_SITE_URL = "https://www.mathsbodhi.in";
const DEFAULT_IMAGE_PATH = "/images/hero-maths-home.svg";
const DEFAULT_ROBOTS = "index, follow";
const LOCAL_HOST_PATTERN = /^(localhost|127\.0\.0\.1|\[::1\])$/i;
const VERCEL_HOST_PATTERN = /(^|\.)vercel\.app$/i;

function getHeadTags(selector) {
  return Array.from(document.head.querySelectorAll(selector));
}

function ensureMeta(name, content, attribute = "name") {
  const [existingTag, ...duplicates] = getHeadTags(`meta[${attribute}="${name}"]`);
  let tag = existingTag;

  duplicates.forEach((duplicate) => duplicate.remove());

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", String(content ?? ""));
}

function removeMeta(name, attribute = "name") {
  getHeadTags(`meta[${attribute}="${name}"]`).forEach((tag) => tag.remove());
}

function ensureLink(rel, href) {
  const [existingTag, ...duplicates] = getHeadTags(`link[rel="${rel}"]`);
  let tag = existingTag;

  duplicates.forEach((duplicate) => duplicate.remove());

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", String(href ?? ""));
}

function getTextValue(value, fallback) {
  return String(value ?? "").trim() || fallback;
}

function getKeywordList(keywords) {
  const values = Array.isArray(keywords) ? keywords : String(keywords ?? "").split(",");
  const cleaned = values.map((keyword) => String(keyword).trim()).filter(Boolean);

  return cleaned.length ? cleaned : DEFAULT_KEYWORDS;
}

function getConfiguredSiteOrigin() {
  const rawValue = String(import.meta.env?.VITE_SITE_URL ?? "").trim();

  if (!rawValue) {
    return "";
  }

  try {
    const normalizedValue = /^https?:\/\//i.test(rawValue) ? rawValue : `https://${rawValue}`;

    return new URL(normalizedValue).origin.replace(/\/$/, "");
  } catch {
    return "";
  }
}

function isLocalOrigin(origin) {
  try {
    const { hostname } = new URL(origin);

    return LOCAL_HOST_PATTERN.test(hostname);
  } catch {
    return false;
  }
}

function isUnsafePublicOrigin(origin) {
  try {
    const { hostname } = new URL(origin);

    return LOCAL_HOST_PATTERN.test(hostname) || VERCEL_HOST_PATTERN.test(hostname);
  } catch {
    return true;
  }
}

function getSeoSiteOrigin() {
  const configuredOrigin = getConfiguredSiteOrigin();

  if (import.meta.env?.DEV && configuredOrigin && isLocalOrigin(configuredOrigin)) {
    return configuredOrigin;
  }

  return PRODUCTION_SITE_URL;
}

function toSeoAbsoluteUrl(value = "/", { allowExternal = false } = {}) {
  const baseOrigin = getSeoSiteOrigin();

  try {
    const url = new URL(String(value || "/"), `${baseOrigin}/`);

    if (allowExternal && url.origin !== baseOrigin && !isUnsafePublicOrigin(url.origin)) {
      return url.toString();
    }

    return new URL(`${url.pathname}${url.search}`, `${baseOrigin}/`).toString();
  } catch {
    return new URL("/", `${baseOrigin}/`).toString();
  }
}

function getSchemaDocument(schema) {
  if (schema == null) {
    return null;
  }

  try {
    if (typeof schema === "string") {
      const trimmedSchema = schema.trim();

      if (!trimmedSchema) {
        return null;
      }

      return renderJsonLd(JSON.parse(trimmedSchema));
    }

    return renderJsonLd(schema);
  } catch {
    return null;
  }
}

export default function Seo({
  title,
  description,
  keywords = [],
  canonicalPath = "/",
  imagePath = DEFAULT_IMAGE_PATH,
  schema = [],
  robots = DEFAULT_ROBOTS,
}) {
  useEffect(() => {
    const safeTitle = getTextValue(title, DEFAULT_TITLE);
    const safeDescription = getTextValue(description, DEFAULT_DESCRIPTION);
    const safeKeywords = getKeywordList(keywords);
    const safeRobots = getTextValue(robots, DEFAULT_ROBOTS);
    const canonicalUrl = toSeoAbsoluteUrl(canonicalPath);
    const imageUrl = toSeoAbsoluteUrl(imagePath, { allowExternal: true });
    const schemaDocument = getSchemaDocument(schema);
    const twitterSite = String(import.meta.env.VITE_TWITTER_SITE ?? "").trim();

    document.title = safeTitle;

    ensureMeta("description", safeDescription);
    ensureMeta("keywords", safeKeywords.join(", "));
    ensureMeta("robots", safeRobots);
    ensureMeta("author", SITE_NAME);
    ensureMeta("application-name", SITE_NAME);
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:title", safeTitle, "property");
    ensureMeta("og:description", safeDescription, "property");
    ensureMeta("og:url", canonicalUrl, "property");
    ensureMeta("og:image", imageUrl, "property");
    ensureMeta("og:site_name", SITE_NAME, "property");
    ensureMeta("og:locale", "en_IN", "property");
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", safeTitle);
    ensureMeta("twitter:description", safeDescription);
    ensureMeta("twitter:image", imageUrl);
    if (twitterSite.startsWith("@")) {
      ensureMeta("twitter:site", twitterSite);
    } else {
      removeMeta("twitter:site");
    }
    ensureLink("canonical", canonicalUrl);

    const schemaId = "seo-structured-data";
    let schemaScript = document.getElementById(schemaId);

    if (!schemaDocument) {
      schemaScript?.remove();
      return;
    }

    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = schemaId;
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = schemaDocument;
  }, [canonicalPath, description, imagePath, keywords, robots, schema, title]);

  return null;
}

