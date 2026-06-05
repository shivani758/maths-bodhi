import type { Request, Response } from "express";
import { getPublishedBlogs } from "../services/blogService.js";
import { getPublishedPages } from "../services/pageService.js";
import { getApprovedReviews } from "../services/reviewService.js";
import { getApprovedStudentResults } from "../services/studentResultService.js";
import { getPublicTutors } from "../services/tutorService.js";
import { ApiError } from "../utils/ApiError.js";
import { sendOk } from "../utils/response.js";

const PUBLIC_CONTENT_CACHE_CONTROL =
  "public, max-age=60, s-maxage=300, stale-while-revalidate=600";

type PublicTutor = Awaited<ReturnType<typeof getPublicTutors>>[number];

function setPublicContentCache(res: Response) {
  res.setHeader("Cache-Control", PUBLIC_CONTENT_CACHE_CONTROL);
}

function toPublicTutorSummary(tutor: PublicTutor) {
  return {
    id: tutor.id,
    sourceId: tutor.sourceId,
    slug: tutor.slug,
    name: tutor.name,
    title: tutor.title,
    status: tutor.status,
    featured: tutor.featured,
    featuredInHome: tutor.featuredInHome,
    displayOrder: tutor.displayOrder,
    rating: tutor.rating,
    experienceYears: tutor.experienceYears,
    experienceLabel: tutor.experienceLabel,
    experience: tutor.experience,
    boards: tutor.boards,
    classesSupported: tutor.classesSupported,
    topics: tutor.topics,
    cities: tutor.cities,
    localities: tutor.localities,
    serviceModes: tutor.serviceModes,
    startingFee: tutor.startingFee,
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    shortBio: tutor.shortBio,
    summary: tutor.summary,
    seo: tutor.seo,
    badges: tutor.badges,
    schoolFocus: tutor.schoolFocus,
    linkedReviewIds: tutor.linkedReviewIds,
    linkedResultIds: tutor.linkedResultIds,
    featuredOn: tutor.featuredOn,
  };
}

export async function getPublicBootstrapController(_req: Request, res: Response) {
  const [tutors, blogs, reviews, results, pages] = await Promise.all([
    getPublicTutors(),
    getPublishedBlogs(),
    getApprovedReviews(),
    getApprovedStudentResults(),
    getPublishedPages(),
  ]);

  setPublicContentCache(res);
  return sendOk(res, {
    tutors: tutors.map(toPublicTutorSummary),
    blogs,
    reviews,
    results,
    pages,
  });
}

export async function listPublicTutorSummariesController(_req: Request, res: Response) {
  setPublicContentCache(res);
  return sendOk(res, (await getPublicTutors()).map(toPublicTutorSummary));
}

export async function getPublicTutorController(req: Request, res: Response) {
  const lookupValue = String(req.params.slugOrId ?? "").trim().toLowerCase();
  const tutor = (await getPublicTutors()).find(
    (item) =>
      String(item.slug ?? "").toLowerCase() === lookupValue ||
      String(item.id ?? "").toLowerCase() === lookupValue,
  );

  if (!tutor) {
    throw new ApiError(404, "Tutor profile was not found.", { code: "PUBLIC_TUTOR_NOT_FOUND" });
  }

  setPublicContentCache(res);
  return sendOk(res, tutor);
}

export async function listPublicTutorsController(_req: Request, res: Response) {
  setPublicContentCache(res);
  return sendOk(res, await getPublicTutors());
}

export async function listPublicBlogsController(_req: Request, res: Response) {
  setPublicContentCache(res);
  return sendOk(res, await getPublishedBlogs());
}

export async function listPublicReviewsController(_req: Request, res: Response) {
  setPublicContentCache(res);
  return sendOk(res, await getApprovedReviews());
}
