import { useEffect } from "react";
import { renderJsonLd, toAbsoluteUrl } from "../utils/schema";

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

function ensureMeta(name, content, attribute = "name") {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function ensureLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
}

function getTextValue(value, fallback) {
  return String(value ?? "").trim() || fallback;
}

function getKeywordList(keywords) {
  const values = Array.isArray(keywords) ? keywords : String(keywords ?? "").split(",");
  const cleaned = values.map((keyword) => String(keyword).trim()).filter(Boolean);

  return cleaned.length ? cleaned : DEFAULT_KEYWORDS;
}

export default function Seo({
  title,
  description,
  keywords = [],
  canonicalPath = "/",
  imagePath = "/images/hero-maths-home.svg",
  schema = [],
  robots = "index, follow",
}) {
  useEffect(() => {
    const safeTitle = getTextValue(title, DEFAULT_TITLE);
    const safeDescription = getTextValue(description, DEFAULT_DESCRIPTION);
    const safeKeywords = getKeywordList(keywords);
    const canonicalUrl = toAbsoluteUrl(canonicalPath);
    const imageUrl = toAbsoluteUrl(imagePath);
    const schemaDocument = renderJsonLd(schema);
    const twitterSite = String(import.meta.env.VITE_TWITTER_SITE ?? "").trim();

    document.title = safeTitle;

    ensureMeta("description", safeDescription);
    ensureMeta("keywords", safeKeywords.join(", "));
    ensureMeta("robots", robots);
    ensureMeta("og:type", "website", "property");
    ensureMeta("og:title", safeTitle, "property");
    ensureMeta("og:description", safeDescription, "property");
    ensureMeta("og:url", canonicalUrl, "property");
    ensureMeta("og:image", imageUrl, "property");
    ensureMeta("og:site_name", SITE_NAME, "property");
    ensureMeta("twitter:card", "summary_large_image");
    ensureMeta("twitter:title", safeTitle);
    ensureMeta("twitter:description", safeDescription);
    ensureMeta("twitter:image", imageUrl);
    if (twitterSite.startsWith("@")) {
      ensureMeta("twitter:site", twitterSite);
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

