import Seo from "../../components/Seo";
import AjayMentorBlock from "../../components/AjayMentorBlock";
import MainLayout from "../../layouts/MainLayout";
import { getAjayRecommendationForPath } from "../config/ajayRecommendations";
import { buildConfigPageSchema } from "../pageConfigService";
import {
  PageCtaSection,
  PageFaqSection,
  PageFeaturedTutorsSection,
  PageHeroSection,
  PageRelatedBlogsSection,
  PageReviewsSection,
  PageResultsSection,
  PageRouteGroupsSection,
  PageSupportPointsSection,
} from "../sections/sharedSections";

function isSectionEnabled(config, sectionId) {
  const section = (config.sectionDefinitions ?? []).find((item) => item.id === sectionId);
  return section ? section.enabled !== false : true;
}

function GenericPageTemplate({ config, templateData = {}, heroActions = [] }) {
  const resolvedHeroActions =
    heroActions.length
      ? heroActions
      : [
          config.sections?.cta?.primaryAction,
          config.sections?.cta?.secondaryAction,
          config.sections?.cta?.tertiaryAction,
        ].filter(Boolean);
  const faqItems = config.sections?.faqs ?? config.entity?.faqItems ?? [];
  const routeGroups = config.sections?.routeGroups ?? [];
  const featuredTutorsSection = config.sections?.featuredTutors ?? {};
  const resultsSection = config.sections?.studentResults ?? {};
  const reviewsSection = config.sections?.reviews ?? {};
  const blogsSection = config.sections?.relatedBlogs ?? {};
  const faqSection = config.sections?.faqSection ?? {};
  const ajayRecommendation = getAjayRecommendationForPath(config.canonicalUrl);

  return (
    <MainLayout>
      <Seo
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalPath={config.canonicalUrl}
        schema={buildConfigPageSchema(config)}
      />

      <div className="bg-white">
        {isSectionEnabled(config, "hero") ? (
          <PageHeroSection
            breadcrumbs={config.breadcrumbItems}
            badge={config.sections?.hero?.badge}
            h1={config.h1}
            intro={config.intro}
            chips={config.sections?.hero?.chips}
            stats={config.sections?.hero?.stats}
            actions={resolvedHeroActions}
            supportPanel={config.sections?.hero?.supportPanel}
            heroImage={config.sections?.hero?.heroImage}
            heroImageAlt={config.sections?.hero?.heroImageAlt}
          />
        ) : null}

        {isSectionEnabled(config, "support-points") ? (
          <PageSupportPointsSection
            badge={config.sections?.supportPoints?.badge}
            title={config.sections?.supportPoints?.title}
            subtitle={config.sections?.supportPoints?.subtitle}
            points={config.sections?.supportPoints?.points}
          />
        ) : null}

        <AjayMentorBlock recommendation={ajayRecommendation} />

        {isSectionEnabled(config, "route-groups") ? (
          <PageRouteGroupsSection groups={routeGroups} />
        ) : null}

        {isSectionEnabled(config, "featured-tutors") ? (
          <PageFeaturedTutorsSection
            badge={featuredTutorsSection.badge ?? "Featured Tutors"}
            title={featuredTutorsSection.title ?? `Tutors related to ${config.title}`}
            subtitle={
              featuredTutorsSection.subtitle ??
              "These tutors are selected to stay close to the board, class, exam, or locality focus of this page."
            }
            tutors={templateData.relatedTutors ?? []}
            initialVisibleCount={featuredTutorsSection.initialVisibleCount ?? 6}
            loadStep={featuredTutorsSection.loadStep ?? 3}
            backgroundClassName={featuredTutorsSection.backgroundClassName ?? "bg-white"}
            emptyState={featuredTutorsSection.emptyState}
          />
        ) : null}

        {isSectionEnabled(config, "student-results") ? (
          <PageResultsSection
            badge={resultsSection.badge ?? "Student Results"}
            title={resultsSection.title ?? `Student results related to ${config.title}`}
            subtitle={
              resultsSection.subtitle ??
              "These outcomes highlight the kind of progress families usually want to see from structured maths support."
            }
            results={templateData.studentResults ?? []}
            backgroundClassName={resultsSection.backgroundClassName ?? "bg-white"}
          />
        ) : null}

        {isSectionEnabled(config, "reviews") ? (
          <PageReviewsSection
            badge={reviewsSection.badge ?? "Parent Reviews"}
            title={reviewsSection.title ?? `Parent feedback for ${config.title}`}
            subtitle={
              reviewsSection.subtitle ??
              "Approved parent reviews appear here only when they are available in the public content feed."
            }
            reviews={templateData.relatedReviews ?? []}
            backgroundClassName={reviewsSection.backgroundClassName ?? "bg-slate-50"}
          />
        ) : null}

        {isSectionEnabled(config, "related-blogs") ? (
          <PageRelatedBlogsSection
            badge={blogsSection.badge ?? "Related Blogs"}
            title={blogsSection.title ?? `Related guides for ${config.title}`}
            subtitle={
              blogsSection.subtitle ??
              "These guides help families continue exploring the questions that usually come up at this stage."
            }
            blogs={templateData.relatedBlogs ?? []}
            backgroundClassName={blogsSection.backgroundClassName ?? "bg-slate-50"}
          />
        ) : null}

        {isSectionEnabled(config, "faqs") ? (
          <PageFaqSection
            badge={faqSection.badge ?? "FAQ"}
            title={faqSection.title ?? `Common questions about ${config.title}`}
            subtitle={
              faqSection.subtitle ??
              "These are the questions families usually ask before moving ahead with the next step."
            }
            items={faqItems}
            backgroundClassName={faqSection.backgroundClassName ?? "bg-slate-50"}
          />
        ) : null}

        {isSectionEnabled(config, "cta") ? (
          <PageCtaSection
            title={config.sections?.cta?.title ?? `Take the next step for ${config.title}`}
            description={config.sections?.cta?.description}
            primaryAction={config.sections?.cta?.primaryAction}
            secondaryAction={config.sections?.cta?.secondaryAction}
            tertiaryAction={config.sections?.cta?.tertiaryAction}
          />
        ) : null}
      </div>
    </MainLayout>
  );
}

export default GenericPageTemplate;
