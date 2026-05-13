import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import MathsGuideCard from "../components/maths/MathsGuideCard";
import Seo from "../components/Seo";
import { useSiteData } from "../contexts/SiteDataContext";
import MainLayout from "../layouts/MainLayout";
import {
  getPrimaryBoardLinkForBlog,
  getPublishedBlogBySlug,
  getRelatedBlogsForBlog,
  getRelatedTutorsForBlog,
} from "../services/mathsContentService";
import NotFound from "./NotFound";

function formatDate(value) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "";
  }
}

function normalizeLabel(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function splitParagraphs(text) {
  return String(text ?? "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getPublishDate(blog) {
  return blog?.publishDate ?? blog?.publishAt ?? "";
}

function getBlogImage(blog) {
  return blog?.coverImage || blog?.seo?.ogImage || "/images/hero-maths-home.svg";
}

function buildSectorLinks(tutors, sectorPages = []) {
  const sectorMap = new Map(
    sectorPages.map((sector) => [normalizeLabel(sector.sectorLabel), sector]),
  );
  const seen = new Set();

  return tutors
    .flatMap((tutor) => tutor.sectors ?? tutor.localityTags ?? [])
    .map((sectorLabel) => sectorMap.get(normalizeLabel(sectorLabel)))
    .filter(Boolean)
    .filter((sector) => {
      const key = `${sector.citySlug}/${sector.slug}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .slice(0, 4)
    .map((sector) => ({
      label: sector.sectorLabel,
      to: `/city/${sector.citySlug}/${sector.slug}`,
    }));
}

function BlogDetailPage() {
  const { slug } = useParams();
  const { siteData, isSiteDataLoading } = useSiteData();
  const blog = useMemo(() => getPublishedBlogBySlug(slug), [slug, siteData.blogs]);

  if (!blog && isSiteDataLoading) {
    return (
      <MainLayout>
        <div className="bg-white px-6 py-24">
          <div className="mx-auto max-w-4xl rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-slate-950">Loading maths guide</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Preparing the Maths Bodhi guide.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!blog) {
    return <NotFound />;
  }

  const publishDate = getPublishDate(blog);
  const formattedDate = formatDate(publishDate);
  const coverImage = getBlogImage(blog);
  const canonicalPath = `/blogs/${blog.slug}`;
  const paragraphs = splitParagraphs(blog.body || blog.content || blog.summary);
  const contentParagraphs = paragraphs.length
    ? paragraphs
    : [
        "Families can use the related board, tutor, and locality links on this page to continue their maths support search.",
      ];
  const primaryBoardLink = getPrimaryBoardLinkForBlog(blog);
  const relatedTutors = getRelatedTutorsForBlog(blog, { limit: 3 });
  const relatedGuides = getRelatedBlogsForBlog(blog, { limit: 3 });
  const sectorLinks = buildSectorLinks(relatedTutors, siteData.sectorPages);
  const hasSidebar = Boolean(primaryBoardLink || relatedTutors.length || sectorLinks.length);
  const keywords = blog.seo?.keywords?.length
    ? blog.seo.keywords
    : [...(blog.tags ?? []), ...(blog.relatedBoards ?? [])];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.seo?.description ?? blog.summary,
      image: coverImage,
      datePublished: publishDate,
      author: {
        "@type": "Organization",
        name: blog.author || "Maths Bodhi Team",
      },
      mainEntityOfPage: canonicalPath,
    },
  ];

  return (
    <MainLayout>
      <Seo
        title={blog.seo?.title ?? `${blog.title} | Maths Bodhi`}
        description={blog.seo?.description ?? blog.summary}
        keywords={keywords}
        canonicalPath={canonicalPath}
        imagePath={coverImage}
        schema={schema}
      />

      <div className="bg-white">
        <section className="relative overflow-hidden px-5 py-12 sm:px-6 sm:py-16 md:py-20">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-cyan-100 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                {blog.category ? (
                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                    {blog.category}
                  </span>
                ) : null}
                {formattedDate ? (
                  <span className="text-sm font-semibold text-slate-500">{formattedDate}</span>
                ) : null}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                {blog.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {blog.summary}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryBoardLink ? (
                  <Link
                    to={primaryBoardLink.to}
                    className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                  >
                    Explore {primaryBoardLink.label}
                  </Link>
                ) : null}
                <Link
                  to="/subjects/maths"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto"
                >
                  Browse maths tutors
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-sm sm:rounded-[36px] sm:p-5">
              <img
                src={coverImage}
                alt={blog.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[22px] border border-slate-200 bg-white object-cover sm:rounded-[28px]"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-12 sm:px-6 sm:py-16">
          <div
            className={`mx-auto grid max-w-7xl gap-8 ${
              hasSidebar ? "lg:grid-cols-[minmax(0,1fr)_360px]" : ""
            }`}
          >
            <article className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7 md:rounded-[32px] md:p-9">
              <div className="space-y-5">
                {contentParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                {blog.tags?.length ? (
                  blog.tags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <p className="text-sm leading-7 text-slate-600">
                    Topic tags will appear here as this guide is expanded.
                  </p>
                )}
              </div>
            </article>

            {hasSidebar ? (
              <aside className="space-y-5">
                {primaryBoardLink ? (
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      Board route
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-slate-950">
                      Continue with {primaryBoardLink.label}
                    </h2>
                    <Link
                      to={primaryBoardLink.to}
                      className="mt-5 inline-flex text-sm font-semibold text-blue-700 transition hover:text-blue-800"
                    >
                      Open board page
                    </Link>
                  </div>
                ) : null}

                {relatedTutors.length ? (
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      Related tutors
                    </p>
                    <div className="mt-4 space-y-3">
                      {relatedTutors.map((tutor) => (
                        <Link
                          key={tutor.id}
                          to={tutor.profileTo}
                          className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-blue-200 hover:bg-white"
                        >
                          <span className="block text-sm font-bold text-slate-950">
                            {tutor.name}
                          </span>
                          <span className="mt-1 block text-xs font-semibold text-slate-500">
                            {tutor.board} | {tutor.classLevel}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                {sectorLinks.length ? (
                  <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      Local availability
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sectorLinks.map((sector) => (
                        <Link
                          key={sector.to}
                          to={sector.to}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                        >
                          {sector.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>
        </section>

        <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                Related guides
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Keep exploring this maths topic
              </h2>
            </div>

            {relatedGuides.length ? (
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {relatedGuides.map((guide) => (
                  <MathsGuideCard key={guide.id} {...guide} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[24px] border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <h3 className="text-xl font-bold text-slate-950">More guides are on the way</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Related reading will appear here once matching public guides are available.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}

export default BlogDetailPage;
