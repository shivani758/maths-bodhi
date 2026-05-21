import { upsertBlogBySourceId } from "../services/blogService.js";
import { upsertPageBySourceId } from "../services/pageService.js";
import { upsertReviewBySourceId } from "../services/reviewService.js";
import { upsertStudentResultBySourceId } from "../services/studentResultService.js";
import { upsertTutorBySourceId } from "../services/tutorService.js";
function parseExperienceYears(value) {
    const text = String(value ?? "");
    const match = text.match(/\d+/);
    return match ? Number(match[0]) : 0;
}
function splitClassBoard(value) {
    const [board = "", classLevel = ""] = String(value ?? "")
        .split("|")
        .map((item) => item.trim());
    return { board, classLevel };
}
function deriveRelatedBoards(value) {
    if (!value) {
        return [];
    }
    const boardKey = String(value).replace(/^page-board-/, "");
    const [rootBoard] = boardKey.split("-");
    return rootBoard ? [rootBoard] : [];
}
export async function importFrontendSeeds(store) {
    const tutorProfilesByTutorId = new Map((store.tutorProfiles ?? []).map((profile) => [profile.tutorId, profile]));
    const faqById = new Map((store.faqs ?? []).map((faq) => [faq.id, faq]));
    const summary = {
        tutors: 0,
        blogs: 0,
        reviews: 0,
        results: 0,
        pages: 0,
    };
    const persistedTutorMap = new Map();
    const persistedReviewMap = new Map();
    for (const tutor of store.tutors ?? []) {
        const profile = tutorProfilesByTutorId.get(tutor.id);
        const persistedTutor = await upsertTutorBySourceId({
            sourceId: tutor.id,
            name: tutor.name,
            slug: tutor.slug,
            title: tutor.title,
            shortBio: tutor.shortBio ?? tutor.summary ?? "",
            fullBio: profile?.longFormProfile ?? tutor.fullBio ?? tutor.summary ?? "",
            teachingStyle: profile?.teachingStyle ?? tutor.teachingStyle ?? "",
            boards: tutor.boards ?? [],
            classesSupported: tutor.classesSupported ?? [],
            topics: tutor.topics ?? [],
            cities: tutor.cities ?? ["gurugram"],
            localities: tutor.localities ?? [],
            serviceModes: tutor.serviceModes ?? [],
            experienceYears: parseExperienceYears(tutor.experience ?? tutor.experienceYears),
            experienceLabel: tutor.experience ?? tutor.experienceLabel ?? "",
            rating: tutor.rating ?? 4.8,
            startingFee: tutor.startingFee ?? "",
            featured: Boolean(tutor.featured),
            featuredInHome: Boolean(tutor.featuredInHome),
            status: tutor.status ?? "active",
            image: tutor.image ?? "",
            imageAlt: tutor.imageAlt ?? "",
            seo: tutor.seo ?? {},
            qualifications: profile?.qualifications ?? tutor.qualifications ?? [],
            achievements: profile?.achievements ?? tutor.achievements ?? [],
            badges: tutor.badges ?? [],
            schoolFocus: tutor.schoolFocus ?? [],
            availability: tutor.availability ?? "",
            availabilityStatus: tutor.availabilityStatus ?? "available",
            displayOrder: tutor.displayOrder ?? 99,
            linkedReviewIds: tutor.linkedReviewIds ?? [],
            linkedResultIds: tutor.linkedResultIds ?? [],
            featuredOn: tutor.featuredOn ?? [],
        });
        persistedTutorMap.set(tutor.id, persistedTutor.id);
        summary.tutors += 1;
    }
    for (const blog of store.blogs ?? []) {
        await upsertBlogBySourceId({
            sourceId: blog.id,
            title: blog.title,
            slug: blog.slug,
            summary: blog.summary ?? "",
            body: blog.body ?? "",
            category: blog.category ?? "",
            tags: blog.tags ?? [],
            relatedBoards: blog.relatedBoards?.length ? blog.relatedBoards : deriveRelatedBoards(blog.relatedPageId),
            relatedPageId: blog.relatedPageId ?? "",
            relatedTutorIds: (blog.relatedTutorIds ?? []).map((id) => persistedTutorMap.get(id) ?? id),
            status: blog.status ?? "draft",
            publishAt: blog.publishDate ? new Date(blog.publishDate) : null,
            author: blog.author ?? "Maths Bodhi Team",
            coverImage: blog.coverImage ?? "",
            faqItems: blog.faqItems ?? [],
            seo: blog.seo ?? {},
        });
        summary.blogs += 1;
    }
    for (const review of store.reviews ?? []) {
        const persistedReview = await upsertReviewBySourceId({
            sourceId: review.id,
            reviewerName: review.reviewerName ?? review.parent ?? "",
            reviewerType: review.roleType ?? "Parent",
            text: review.reviewText ?? review.quote ?? "",
            rating: review.rating ?? 4.8,
            linkedTutorId: review.relatedTutorId ? persistedTutorMap.get(review.relatedTutorId) ?? "" : "",
            linkedBoard: review.relatedBoard ?? review.board ?? "",
            linkedPage: review.relatedPageId ?? "",
            city: review.city ?? "gurugram",
            locality: review.locality ?? review.sector ?? "",
            school: review.school ?? "",
            featured: Boolean(review.featured),
            moderationStatus: review.status ?? "pending",
            anonymized: Boolean(review.anonymized),
            featuredOn: review.featuredOn ?? [],
            order: review.order ?? 99,
        });
        persistedReviewMap.set(review.id, persistedReview.id);
        summary.reviews += 1;
    }
    for (const result of store.results ?? []) {
        const { board, classLevel } = splitClassBoard(result.classBoard ?? "");
        await upsertStudentResultBySourceId({
            sourceId: result.id,
            studentLabel: result.studentLabel ?? "",
            board,
            classLevel,
            resultSummary: result.resultSummary ?? [result.beforeResult, result.afterResult].filter(Boolean).join(" to "),
            story: result.story ?? "",
            linkedTutorId: result.linkedTutorId ? persistedTutorMap.get(result.linkedTutorId) ?? "" : "",
            linkedPage: result.linkedPageId ?? "",
            city: result.linkedCitySlug ?? "gurugram",
            locality: result.linkedLocalitySlug ?? "",
            featured: Boolean(result.featured),
            status: result.status ?? "draft",
            beforeResult: result.beforeResult ?? "",
            afterResult: result.afterResult ?? "",
        });
        summary.results += 1;
    }
    for (const page of store.pages ?? []) {
        const directFaqItems = Array.isArray(page.faqItems)
            ? page.faqItems.map((faq, index) => ({
                id: faq.id || `faq-${index + 1}`,
                question: faq.question ?? "",
                answer: faq.answer ?? "",
            }))
            : [];
        const linkedFaqItems = (page.faqIds ?? [])
            .map((faqId) => faqById.get(faqId))
            .filter(Boolean)
            .map((faq, index) => ({
            id: faq.id || `faq-${index + 1}`,
            question: faq.question ?? "",
            answer: faq.answer ?? "",
        }));
        const faqItems = directFaqItems.length ? directFaqItems : linkedFaqItems;
        await upsertPageBySourceId({
            sourceId: page.id,
            pageType: page.pageType ?? "board",
            pageKey: page.pageKey ?? page.slug ?? "",
            slug: page.slug ?? page.pageKey ?? "",
            route: page.route ?? "",
            label: page.label ?? page.title ?? page.h1 ?? "",
            title: page.title ?? page.label ?? page.h1 ?? "",
            navLabel: page.navLabel ?? page.label ?? page.title ?? page.h1 ?? "",
            h1: page.h1 ?? page.title ?? page.label ?? "",
            intro: page.intro ?? "",
            status: page.status ?? "draft",
            badge: page.badge ?? "",
            heroBadge: page.heroBadge ?? "",
            parentKey: page.parentKey ?? "",
            breadcrumbLabel: page.breadcrumbLabel ?? "",
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
            heroImage: page.heroImage ?? "",
            heroImageAlt: page.heroImageAlt ?? "",
            featuredTutorIds: (page.featuredTutorIds ?? []).map((id) => persistedTutorMap.get(id) ?? id),
            featuredReviewIds: (page.featuredReviewIds ?? []).map((id) => persistedReviewMap.get(id) ?? id),
            faqItems,
            relatedCities: page.relatedCities ?? [],
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
            seo: page.seo ?? {},
        });
        summary.pages += 1;
    }
    return summary;
}
//# sourceMappingURL=importFrontendSeeds.js.map