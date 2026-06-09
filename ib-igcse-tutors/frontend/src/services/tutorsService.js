import { apiRequest } from "./apiClient";
import { combineListValues, normalizeClassListValue } from "./clientDataUtils";
import { refreshPublicSiteData } from "./publicSiteService";

function uniqueValues(...values) {
  return combineListValues(...values);
}

function authoredListValues(value) {
  return Array.isArray(value) ? value.filter(Boolean) : value ? [value] : [];
}

function extractExperienceYears(value = "") {
  const match = String(value ?? "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function createProfileFromTutor(tutor) {
  return {
    id: tutor.profile?.id || `profile-${tutor.id || "new"}`,
    tutorId: tutor.id || "",
    longFormProfile: tutor.fullBio ?? "",
    qualifications: authoredListValues(tutor.qualifications),
    teachingStyle: tutor.teachingStyle ?? "",
    achievements: authoredListValues(tutor.achievements),
    associatedBoards: uniqueValues(tutor.boards, tutor.associatedBoards, tutor.boardTags),
    associatedTags: uniqueValues(tutor.badges, tutor.associatedTags),
    profileMediaIds: uniqueValues(tutor.profile?.profileMediaIds),
    linkedFaqIds: uniqueValues(tutor.profile?.linkedFaqIds),
    linkedStudentResultIds: uniqueValues(tutor.linkedResultIds),
  };
}

function toTutorBundle(entity) {
  const tutor = {
    ...entity,
    boards: uniqueValues(entity.boards, entity.associatedBoards, entity.boardTags),
    classesSupported: normalizeClassListValue(
      entity.classesSupported,
      entity.classes,
      entity.classLevels,
      entity.classFit,
      entity.classLevel,
      entity.examSupport,
      entity.exams,
    ),
    topics: uniqueValues(entity.topics, entity.topicTags),
    localities: uniqueValues(entity.localities, entity.sectors, entity.localityTags),
    serviceModes: uniqueValues(entity.serviceModes, entity.mode, entity.serviceModeTags),
    experienceYears: Number(entity.experienceYears ?? extractExperienceYears(entity.experience ?? entity.experienceLabel)),
    experienceLabel: entity.experienceLabel ?? entity.experience ?? "",
    experience: entity.experience ?? entity.experienceLabel ?? "",
    summary: entity.summary ?? entity.shortBio ?? "",
  };

  return {
    tutor,
    profile: createProfileFromTutor(entity),
  };
}

function toFlatTutor(entity) {
  const boards = uniqueValues(entity.boards, entity.associatedBoards, entity.boardTags);
  const classesSupported = normalizeClassListValue(
    entity.classesSupported,
    entity.classes,
    entity.classLevels,
    entity.classFit,
    entity.classLevel,
    entity.examSupport,
    entity.exams,
  );

  return {
    ...entity,
    boards,
    classesSupported,
    topics: uniqueValues(entity.topics, entity.topicTags),
    localities: uniqueValues(entity.localities, entity.sectors, entity.localityTags),
    serviceModes: uniqueValues(entity.serviceModes, entity.mode, entity.serviceModeTags),
    profile: createProfileFromTutor({ ...entity, boards, classesSupported }),
  };
}

function toTutorPayload(bundle) {
  const tutor = bundle.tutor;
  const profile = bundle.profile;
  const boards = uniqueValues(tutor.boards, tutor.associatedBoards, tutor.boardTags);
  const classesSupported = normalizeClassListValue(
    tutor.classesSupported,
    tutor.classes,
    tutor.classLevels,
    tutor.classFit,
    tutor.classLevel,
    tutor.examSupport,
    tutor.exams,
  );

  return {
    name: tutor.name,
    slug: tutor.slug,
    title: tutor.title,
    shortBio: tutor.shortBio,
    fullBio: profile.longFormProfile || tutor.fullBio,
    teachingStyle: profile.teachingStyle,
    boards,
    classesSupported,
    topics: uniqueValues(tutor.topics, tutor.topicTags),
    cities: uniqueValues(tutor.cities?.length ? tutor.cities : ["gurugram"]),
    localities: uniqueValues(tutor.localities, tutor.sectors, tutor.localityTags),
    serviceModes: uniqueValues(tutor.serviceModes, tutor.mode, tutor.serviceModeTags),
    experienceYears: Number(tutor.experienceYears ?? extractExperienceYears(tutor.experience ?? tutor.experienceLabel)),
    experienceLabel:
      tutor.experienceLabel?.trim() ||
      tutor.experience?.trim() ||
      (Number(tutor.experienceYears ?? 0) > 0 ? `${Number(tutor.experienceYears)} years` : ""),
    rating: tutor.rating === "" || tutor.rating == null ? undefined : Number(tutor.rating),
    startingFee: tutor.startingFee,
    featured: Boolean(tutor.featured),
    featuredInHome: Boolean(tutor.featuredInHome),
    status: tutor.status,
    image: tutor.image,
    imageAlt: tutor.imageAlt,
    seo: tutor.seo,
    qualifications: authoredListValues(profile.qualifications),
    achievements: authoredListValues(profile.achievements),
    badges: uniqueValues(tutor.badges),
    schoolFocus: uniqueValues(tutor.schoolFocus),
    availability: tutor.availability,
    availabilityStatus: tutor.availabilityStatus,
    displayOrder: Number(tutor.displayOrder ?? 99),
    linkedReviewIds: uniqueValues(tutor.linkedReviewIds),
    linkedResultIds: uniqueValues(tutor.linkedResultIds),
    featuredOn: uniqueValues(tutor.featuredOn),
  };
}

export async function listTutors() {
  try {
    const data = await apiRequest("/api/tutors");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn("Public tutors API fallback used:", error);
    return [];
  }
}

export async function getPublicTutorBySlugOrId(slugOrId) {
  if (!slugOrId) {
    throw new Error("Tutor slug or ID is required.");
  }

  return apiRequest(`/api/public/tutors/${encodeURIComponent(slugOrId)}`);
}

export async function listAdminTutors() {
  const data = await apiRequest("/api/admin/tutors");
  return (Array.isArray(data) ? data : []).map((item) => toFlatTutor(item));
}

export async function getTutorById(id) {
  if (!id) {
    throw new Error("Tutor ID is required.");
  }

  const item = await apiRequest(`/api/admin/tutors/${id}`);
  return toTutorBundle(item);
}

export function createEmptyTutor() {
  return {
    tutor: {
      id: "",
      name: "",
      slug: "",
      title: "",
      shortBio: "",
      fullBio: "",
      experienceYears: 3,
      experienceLabel: "3 years",
      experience: "3 years",
      rating: "",
      startingFee: "Rs 1,500 per class",
      boards: ["CBSE"],
      classesSupported: ["Class 9"],
      examSupport: [],
      topics: ["Algebra"],
      localities: [],
      cities: ["gurugram"],
      serviceModes: ["Home Tuition"],
      featured: false,
      featuredInHome: false,
      status: "active",
      displayOrder: 99,
      availabilityStatus: "available",
      badges: [],
      featuredOn: [],
      boardTags: [],
      topicTags: [],
      localityTags: [],
      serviceModeTags: [],
      schoolFitTags: [],
      schoolFocus: [],
      image: "/images/hero-maths-home.svg",
      imageAlt: "Maths tutor profile image",
      summary: "",
      studentsHelped: 0,
      availability: "",
      achievements: [],
      qualifications: [],
      location: "Gurugram",
      seo: {
        title: "",
        description: "",
        canonicalUrl: "",
        keywords: [],
        ogImage: "/images/hero-maths-home.svg",
        indexable: true,
      },
      linkedReviewIds: [],
      linkedResultIds: [],
    },
    profile: {
      id: "",
      tutorId: "",
      longFormProfile: "",
      qualifications: [],
      teachingStyle: "",
      achievements: [],
      associatedBoards: [],
      associatedTags: [],
      profileMediaIds: [],
      linkedFaqIds: [],
      linkedStudentResultIds: [],
    },
  };
}

export async function saveTutorBundle(bundle) {
  const payload = toTutorPayload(bundle);
  const saved = bundle.tutor.id
    ? await apiRequest(`/api/admin/tutors/${bundle.tutor.id}`, { method: "PUT", body: payload })
    : await apiRequest("/api/admin/tutors", { method: "POST", body: payload });

  await refreshPublicSiteData().catch(() => {});
  return toTutorBundle(saved);
}

export async function deleteTutor(id) {
  const deleted = await apiRequest(`/api/admin/tutors/${id}`, { method: "DELETE" });
  await refreshPublicSiteData().catch(() => {});
  return deleted;
}

export async function toggleTutorFeatured(id) {
  const current = await apiRequest(`/api/admin/tutors/${id}`);
  const updated = await apiRequest(`/api/admin/tutors/${id}`, {
    method: "PUT",
    body: { featured: !current.featured },
  });
  await refreshPublicSiteData().catch(() => {});
  return updated;
}

export async function toggleTutorStatus(id) {
  const current = await apiRequest(`/api/admin/tutors/${id}`);
  const updated = await apiRequest(`/api/admin/tutors/${id}`, {
    method: "PUT",
    body: { status: current.status === "active" ? "inactive" : "active" },
  });
  await refreshPublicSiteData().catch(() => {});
  return updated;
}

export async function reorderTutors(ids = []) {
  const items = await Promise.all(
    ids.map((id, index) =>
      apiRequest(`/api/admin/tutors/${id}`, {
        method: "PUT",
        body: { displayOrder: index + 1 },
      }),
    ),
  );

  await refreshPublicSiteData().catch(() => {});
  return items.map((item) => toFlatTutor(item));
}
