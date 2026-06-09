import { statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mathsBoardConfig } from "../src/data/mathsBoardConfig.js";
import { p1SeoPageConfigs } from "../src/pageSystem/config/p1SeoPageConfigs.js";
import { ajayPageConfigs } from "../src/pageSystem/config/ajayPageConfigs.js";
import {
  futureClassPageConfigs,
  futureExamPageConfigs,
  gurugramHubPageConfig,
  gurugramPublicEntryConfigs,
} from "../src/pageSystem/config/staticPageConfigs.js";

const DEFAULT_SITE_URL = "https://www.mathsbodhi.in";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, "..");

const args = new Set(process.argv.slice(2));
const siteUrlArg = process.argv.find((arg) => arg.startsWith("--site-url="));
const outputArg = process.argv.find((arg) => arg.startsWith("--output="));
const shouldFetchLive =
  !args.has("--no-fetch") &&
  process.env.SITEMAP_FETCH_LIVE !== "0" &&
  process.env.SITEMAP_FETCH_LIVE !== "false";
const siteUrl = normalizeSiteUrl(siteUrlArg?.split("=").slice(1).join("=") || process.env.SITEMAP_SITE_URL || DEFAULT_SITE_URL);
const outputPath = path.resolve(
  FRONTEND_ROOT,
  outputArg?.split("=").slice(1).join("=") || "public/sitemap.xml",
);

const sourceFiles = {
  app: ["src/App.jsx"],
  board: ["src/data/mathsBoardConfig.js"],
  p1: ["src/pageSystem/config/p1SeoPageConfigs.js", "src/pageSystem/config/seoRecoveryCluster.js"],
  gurugram: ["src/pageSystem/config/staticPageConfigs.js", "src/pageSystem/config/seoRecoveryCluster.js"],
  ajay: ["src/pageSystem/config/ajayPageConfigs.js", "src/pageSystem/templates/AjayPageTemplate.jsx"],
};

const sourceLastmod = Object.fromEntries(
  Object.entries(sourceFiles).map(([key, files]) => [key, latestFileDate(files)]),
);
const generatedDate = toDateOnly(process.env.SITEMAP_LASTMOD || new Date());

const entries = new Map();
const duplicateAttempts = [];
const excluded = [];
const includedByCategory = new Map();
const liveSummary = {
  fetched: false,
  tutors: 0,
  blogs: 0,
  subjectPages: 0,
  cityPages: 0,
  localityPages: 0,
  errors: [],
};

function normalizeSiteUrl(value) {
  try {
    const url = new URL(String(value || DEFAULT_SITE_URL));
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function latestFileDate(files) {
  const timestamps = files
    .map((file) => path.join(FRONTEND_ROOT, file))
    .map((file) => {
      try {
        return statSync(file).mtime;
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (!timestamps.length) {
    return generatedDate;
  }

  return toDateOnly(new Date(Math.max(...timestamps.map((date) => date.getTime()))));
}

function toDateOnly(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return generatedDate;
  }

  return date.toISOString().slice(0, 10);
}

function isSameSiteUrl(url) {
  return url.protocol === "https:" && url.hostname === new URL(siteUrl).hostname;
}

function normalizePath(value) {
  if (!value) {
    return "";
  }

  const rawValue = String(value).trim();

  try {
    if (/^https?:\/\//i.test(rawValue)) {
      const parsed = new URL(rawValue);

      if (!isSameSiteUrl(parsed)) {
        return "";
      }

      return normalizePath(`${parsed.pathname}${parsed.search}`);
    }
  } catch {
    return "";
  }

  const [withoutHash] = rawValue.split("#");
  const [withoutQuery] = withoutHash.split("?");
  const pathValue = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const normalized = pathValue.replace(/\/{2,}/g, "/").replace(/\/$/, "");

  return normalized || "/";
}

function getGurugramEntryAliasCanonicals() {
  return gurugramPublicEntryConfigs
    .map((config) => {
      const canonicalPath = normalizePath(config.canonicalUrl || config.routePath || `/gurugram/${config.slug}`);
      const cityAliasPath = normalizePath(config.slug ? `/city/gurugram/${config.slug}` : "");

      if (!canonicalPath || !cityAliasPath || !canonicalPath.startsWith("/gurugram/")) {
        return null;
      }

      return [cityAliasPath, canonicalPath];
    })
    .filter(Boolean);
}

const ALTERNATE_CANONICAL_PATHS = new Map([
  ["/city/gurugram", "/gurugram"],
  ["/book-free-demo-class", "/book-demo"],
  ["/class-10-maths-tutor", "/gurugram/class-10-maths-home-tutor"],
  ["/class-12-maths-tutor", "/gurugram/class-12-maths-home-tutor"],
  ...getGurugramEntryAliasCanonicals(),
]);

const NON_INDEXABLE_PUBLIC_PATHS = new Map([
  ["/tutors/ajay-vatsyayan", "homepage-only Person entity; no public tutor profile route"],
]);

function getAlternateCanonicalPath(pathValue) {
  return ALTERNATE_CANONICAL_PATHS.get(normalizePath(pathValue)) || "";
}

function toLoc(pathValue) {
  return new URL(pathValue, `${siteUrl}/`).toString();
}

function hasOnePathSegment(pathValue) {
  return normalizePath(pathValue).split("/").filter(Boolean).length === 1;
}

function isExcludedPublicPath(pathValue) {
  return (
    /^\/(?:admin|login|student(?:\/|-)login|tutor(?:\/|-)login|student\/dashboard|tutor\/dashboard)(?:\/|$)/.test(pathValue) ||
    /(?:preview|404|not-found)/i.test(pathValue) ||
    pathValue.includes(":")
  );
}

function isLocationPath(pathValue) {
  return /^\/(?:city|gurugram)(?:\/|$)/.test(pathValue);
}

function isP1AliasShadowedByExplicitRoute(pathValue) {
  return pathValue === "/" || ALTERNATE_CANONICAL_PATHS.has(normalizePath(pathValue));
}

function entryDefaults(category, pathValue) {
  if (pathValue === "/") {
    return { priority: "1.0", changefreq: "weekly" };
  }

  if (category === "city" || category === "locality" || category === "gurugram") {
    return { priority: "0.8", changefreq: "weekly" };
  }

  if (category === "tutor") {
    return { priority: "0.7", changefreq: "weekly" };
  }

  if (category === "blog") {
    return { priority: "0.6", changefreq: "monthly" };
  }

  if (category === "board" || category === "major" || category === "static") {
    return { priority: "0.9", changefreq: "weekly" };
  }

  return { priority: "0.7", changefreq: "monthly" };
}

function addEntry(pathValue, options = {}) {
  const normalizedPath = normalizePath(pathValue);
  const source = options.source || "unknown";
  const category = options.category || "other";

  if (!normalizedPath) {
    excluded.push({ path: String(pathValue || ""), source, reason: "off-site or invalid URL" });
    return;
  }

  if (isExcludedPublicPath(normalizedPath)) {
    excluded.push({ path: normalizedPath, source, reason: "non-indexable route pattern" });
    return;
  }

  const nonIndexableReason = NON_INDEXABLE_PUBLIC_PATHS.get(normalizedPath);

  if (nonIndexableReason) {
    excluded.push({ path: normalizedPath, source, reason: nonIndexableReason });
    return;
  }

  const alternateCanonicalPath = getAlternateCanonicalPath(normalizedPath);

  if (alternateCanonicalPath && alternateCanonicalPath !== normalizedPath) {
    excluded.push({
      path: normalizedPath,
      source,
      reason: `alternate canonical URL; canonical is ${alternateCanonicalPath}`,
    });
    return;
  }

  const loc = toLoc(normalizedPath);

  if (/localhost|127\.0\.0\.1|vercel\.app|preview|staging/i.test(loc)) {
    excluded.push({ path: normalizedPath, source, reason: "non-production URL" });
    return;
  }

  if (entries.has(loc)) {
    duplicateAttempts.push({
      loc,
      firstSource: entries.get(loc).source,
      duplicateSource: source,
    });
    return;
  }

  const defaults = entryDefaults(category, normalizedPath);
  const entry = {
    loc,
    path: normalizedPath,
    category,
    source,
    lastmod: toDateOnly(options.lastmod || generatedDate),
    changefreq: options.changefreq || defaults.changefreq,
    priority: options.priority || defaults.priority,
  };

  entries.set(loc, entry);
  includedByCategory.set(category, (includedByCategory.get(category) || 0) + 1);
}

function addHome() {
  addEntry("/", {
    category: "home",
    source: "frontend/src/App.jsx + frontend/src/pages/home.jsx",
    lastmod: sourceLastmod.app,
  });
}

function addStaticRoutes() {
  for (const route of ["/book-demo"]) {
    addEntry(route, {
      category: "static",
      source: "frontend/src/App.jsx",
      lastmod: sourceLastmod.app,
    });
  }
}

function addBoardRoutes() {
  for (const page of Object.values(mathsBoardConfig)) {
    if ((page.status || "published") !== "published") {
      excluded.push({ path: page.route || page.key, source: "mathsBoardConfig", reason: "not published" });
      continue;
    }

    addEntry(page.route, {
      category: "board",
      source: `frontend/src/data/mathsBoardConfig.js:${page.key}`,
      lastmod: sourceLastmod.board,
    });
  }
}

function addP1SeoRoutes() {
  for (const config of p1SeoPageConfigs) {
    const routePath = normalizePath(config.canonicalUrl || config.routePath);

    if (!routePath) {
      excluded.push({ path: config.slug || "", source: "p1SeoPageConfigs", reason: "missing canonical route" });
      continue;
    }

    if (config.publishStatus && config.publishStatus !== "published") {
      excluded.push({ path: routePath, source: "p1SeoPageConfigs", reason: "not published" });
      continue;
    }

    if (!hasOnePathSegment(routePath)) {
      excluded.push({
        path: routePath,
        source: "p1SeoPageConfigs",
        reason: "not served by the single-segment /:seoSlug route",
      });
      continue;
    }

    if (isP1AliasShadowedByExplicitRoute(routePath)) {
      excluded.push({
        path: routePath,
        source: "p1SeoPageConfigs",
        reason: "explicit route uses a different canonical page",
      });
      continue;
    }

    addEntry(routePath, {
      category: isLocationPath(routePath) ? "locality" : "major",
      source: `frontend/src/pageSystem/config/p1SeoPageConfigs.js:${config.slug}`,
      lastmod: sourceLastmod.p1,
    });
  }
}

function addGurugramRoutes() {
  addEntry(gurugramHubPageConfig.canonicalUrl || gurugramHubPageConfig.routePath || "/gurugram", {
    category: "city",
    source: "frontend/src/pageSystem/config/staticPageConfigs.js:gurugramHubPageConfig",
    lastmod: sourceLastmod.gurugram,
  });

  const firstConfigBySlug = new Map();

  for (const config of gurugramPublicEntryConfigs) {
    if (!config.slug) {
      continue;
    }

    if (!firstConfigBySlug.has(config.slug)) {
      firstConfigBySlug.set(config.slug, config);
      continue;
    }

    excluded.push({
      path: config.canonicalUrl || config.routePath || `/gurugram/${config.slug}`,
      source: `gurugramPublicEntryConfigs:${config.slug}`,
      reason: "duplicate slug shadowed by an earlier Gurugram entry route",
    });
  }

  for (const config of firstConfigBySlug.values()) {
    if (config.publishStatus && config.publishStatus !== "published") {
      excluded.push({
        path: config.canonicalUrl || config.routePath || config.slug,
        source: "gurugramPublicEntryConfigs",
        reason: "not published",
      });
      continue;
    }

    addEntry(config.canonicalUrl || config.routePath || `/gurugram/${config.slug}`, {
      category: isLocationPath(config.canonicalUrl || config.routePath) ? "locality" : "major",
      source: `frontend/src/pageSystem/config/staticPageConfigs.js:${config.slug}`,
      lastmod: sourceLastmod.gurugram,
    });
  }
}

function addFutureStaticRoutes() {
  for (const config of futureClassPageConfigs) {
    if ((config.publishStatus || "draft") !== "published") {
      excluded.push({ path: config.routePath || config.slug, source: "futureClassPageConfigs", reason: "not published" });
      continue;
    }

    addEntry(config.canonicalUrl || config.routePath || `/maths/class/${config.slug}`, {
      category: "major",
      source: `futureClassPageConfigs:${config.slug}`,
      lastmod: sourceLastmod.gurugram,
    });
  }

  for (const config of futureExamPageConfigs) {
    if ((config.publishStatus || "draft") !== "published") {
      excluded.push({ path: config.routePath || config.slug, source: "futureExamPageConfigs", reason: "not published" });
      continue;
    }

    addEntry(config.canonicalUrl || config.routePath || `/maths/exam/${config.slug}`, {
      category: "major",
      source: `futureExamPageConfigs:${config.slug}`,
      lastmod: sourceLastmod.gurugram,
    });
  }
}

function addAjayRoutes() {
  for (const config of ajayPageConfigs) {
    if (config.publishStatus !== "published") {
      excluded.push({ path: config.routePath || config.slug, source: "ajayPageConfigs", reason: "not published" });
      continue;
    }

    if (normalizePath(config.routePath) !== normalizePath(config.canonicalUrl)) {
      excluded.push({
        path: config.routePath,
        source: `frontend/src/pageSystem/config/ajayPageConfigs.js:${config.slug}`,
        reason: `non-self-canonical Ajay page; canonical is ${config.canonicalUrl}`,
      });
      continue;
    }

    addEntry(config.canonicalUrl, {
      category: "tutor",
      source: `frontend/src/pageSystem/config/ajayPageConfigs.js:${config.slug}`,
      lastmod: sourceLastmod.ajay,
      priority: config.routePath === "/ajay-vatsyayan" ? "0.8" : "0.7",
    });
  }
}

function unwrapApiData(payload) {
  if (!payload || typeof payload !== "object") {
    return payload;
  }

  return Object.prototype.hasOwnProperty.call(payload, "data") ? payload.data : payload;
}

async function fetchJson(endpoint) {
  const url = new URL(endpoint, `${siteUrl}/`).toString();
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return unwrapApiData(await response.json());
}

function indexableSeo(item = {}) {
  return item.seo?.indexable !== false && item.indexable !== false;
}

async function addLiveApiRoutes() {
  if (!shouldFetchLive) {
    return;
  }

  liveSummary.fetched = true;

  try {
    const tutors = await fetchJson("/api/tutors");
    const tutorItems = Array.isArray(tutors) ? tutors : [];
    liveSummary.tutors = tutorItems.length;

    for (const tutor of tutorItems) {
      if ((tutor.status && tutor.status !== "active") || !indexableSeo(tutor)) {
        excluded.push({ path: tutor.slug || tutor.id || "", source: "/api/tutors", reason: "not indexable or inactive" });
        continue;
      }

      const tutorPath = tutor.slug ? `/tutors/${tutor.slug}` : tutor.id ? `/tutor/${tutor.id}` : "";

      addEntry(tutorPath, {
        category: "tutor",
        source: `/api/tutors:${tutor.slug || tutor.id}`,
        lastmod: tutor.updatedAt || tutor.createdAt || generatedDate,
      });
    }
  } catch (error) {
    liveSummary.errors.push(`/api/tutors: ${error.message}`);
  }

  try {
    const blogs = await fetchJson("/api/blogs");
    const blogItems = Array.isArray(blogs) ? blogs : [];
    liveSummary.blogs = blogItems.length;

    for (const blog of blogItems) {
      if (blog.status !== "published" || !blog.slug || !indexableSeo(blog)) {
        excluded.push({ path: blog.slug || blog.id || "", source: "/api/blogs", reason: "not published or not indexable" });
        continue;
      }

      addEntry(`/blogs/${blog.slug}`, {
        category: "blog",
        source: `/api/blogs:${blog.slug}`,
        lastmod: blog.updatedAt || blog.publishDate || blog.publishAt || blog.createdAt || generatedDate,
      });
    }
  } catch (error) {
    liveSummary.errors.push(`/api/blogs: ${error.message}`);
  }

  try {
    const bootstrap = await fetchJson("/api/public/bootstrap");

    const pages = Array.isArray(bootstrap?.pages) ? bootstrap.pages : [];
    const cities = Array.isArray(bootstrap?.cities) ? bootstrap.cities : [];
    const localities = Array.isArray(bootstrap?.localities) ? bootstrap.localities : [];

    for (const page of pages) {
      if (page.status !== "published" || !indexableSeo(page)) {
        continue;
      }

      if (page.pageType === "subject" && page.slug) {
        liveSummary.subjectPages += 1;
        addEntry(`/subject/${page.slug}`, {
          category: "major",
          source: `/api/public/bootstrap:subject:${page.slug}`,
          lastmod: page.updatedAt || page.createdAt || generatedDate,
        });
      }
    }

    for (const city of cities) {
      if (city.status === "archived" || !city.slug || !indexableSeo(city)) {
        continue;
      }

      liveSummary.cityPages += 1;
      addEntry(city.slug === "gurugram" ? "/gurugram" : `/city/${city.slug}`, {
        category: "city",
        source: `/api/public/bootstrap:city:${city.slug}`,
        lastmod: city.updatedAt || city.createdAt || generatedDate,
      });
    }

    for (const locality of localities) {
      if (locality.status === "archived" || !locality.slug || !indexableSeo(locality)) {
        continue;
      }

      const citySlug = locality.citySlug || "gurugram";
      const localityPath = citySlug === "gurugram" ? `/gurugram/${locality.slug}` : `/city/${citySlug}/${locality.slug}`;

      liveSummary.localityPages += 1;
      addEntry(localityPath, {
        category: "locality",
        source: `/api/public/bootstrap:locality:${locality.slug}`,
        lastmod: locality.updatedAt || locality.createdAt || generatedDate,
      });
    }
  } catch (error) {
    liveSummary.errors.push(`/api/public/bootstrap: ${error.message}`);
  }
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderSitemap() {
  const xmlEntries = [...entries.values()].map((entry) => {
    return [
      "  <url>",
      `    <loc>${escapeXml(entry.loc)}</loc>`,
      `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
      `    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`,
      `    <priority>${escapeXml(entry.priority)}</priority>`,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...xmlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

function printSummary() {
  const categorySummary = [...includedByCategory.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, count]) => `${category}:${count}`)
    .join(", ");

  console.log(`Generated ${path.relative(FRONTEND_ROOT, outputPath)} with ${entries.size} URLs.`);
  console.log(`Included by category: ${categorySummary || "none"}.`);
  console.log(`Duplicate source attempts removed: ${duplicateAttempts.length}.`);
  console.log(`Excluded route candidates: ${excluded.length}.`);

  if (liveSummary.fetched) {
    console.log(
      `Live API sampled: tutors=${liveSummary.tutors}, blogs=${liveSummary.blogs}, subjects=${liveSummary.subjectPages}, cities=${liveSummary.cityPages}, localities=${liveSummary.localityPages}.`,
    );
  } else {
    console.log("Live API sampling skipped.");
  }

  if (liveSummary.errors.length) {
    console.log(`Live API warnings: ${liveSummary.errors.join(" | ")}`);
  }
}

addHome();
addStaticRoutes();
addBoardRoutes();
addP1SeoRoutes();
addGurugramRoutes();
addFutureStaticRoutes();
addAjayRoutes();
await addLiveApiRoutes();

writeFileSync(outputPath, renderSitemap(), "utf8");
printSummary();
