import { Link } from "react-router-dom";

const SECTION_SHELL_CLASS = "px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14";
const SECTION_CONTAINER_CLASS = "mx-auto max-w-7xl";
const SECTION_LABEL_CLASS = "text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-700";
const SECTION_TITLE_CLASS = "mt-3 max-w-[760px] text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl";
const BODY_TEXT_CLASS = "text-base leading-7 text-slate-700";
const BODY_STACK_CLASS = `max-w-[740px] space-y-3 ${BODY_TEXT_CLASS}`;
const CARD_GRID_CLASS = "mt-7 grid gap-4 sm:gap-5";
const CARD_CLASS = "rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm";
const MUTED_CARD_CLASS = "rounded-[22px] border border-slate-200 bg-slate-50 p-5";

function asArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

function toParagraphs(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return [value.trim()].filter(Boolean);
  }

  return asArray(value.paragraphs ?? value.text ?? value.description)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function getSectionTitle(section, fallback) {
  return section?.title || section?.heading || fallback;
}

function getSectionEyebrow(section, fallback) {
  return section?.eyebrow || section?.badge || fallback;
}

function normalizeCards(value) {
  return asArray(value).map((item) => {
    if (typeof item === "string") {
      return { title: item };
    }

    return item;
  });
}

function normalizeSteps(value) {
  return asArray(value).map((item, index) => {
    if (typeof item === "string") {
      return {
        title: `Step ${index + 1}`,
        description: item,
      };
    }

    return item;
  });
}

function getResponsiveGridClass(itemCount) {
  if (itemCount === 2) {
    return "md:grid-cols-2";
  }

  return "md:grid-cols-2 lg:grid-cols-3";
}

function SeoSectionShell({ backgroundClassName = "bg-white", children, className = "" }) {
  return (
    <section className={`${backgroundClassName} ${SECTION_SHELL_CLASS}`}>
      <div className={`${SECTION_CONTAINER_CLASS} ${className}`}>{children}</div>
    </section>
  );
}

export function SeoIntroSection({ content, title, eyebrow = "Guide", backgroundClassName = "bg-white" }) {
  const paragraphs = toParagraphs(content);

  if (!paragraphs.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
      <div className="max-w-[760px]">
        <p className={SECTION_LABEL_CLASS}>
          {getSectionEyebrow(content, eyebrow)}
        </p>
        <h2 className={SECTION_TITLE_CLASS}>
          {getSectionTitle(content, title)}
        </h2>
        <div className={`mt-4 ${BODY_STACK_CLASS}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </SeoSectionShell>
  );
}

export function SeoContentBlock({ content, title, eyebrow = "Helpful detail", backgroundClassName = "bg-white" }) {
  const paragraphs = toParagraphs(content);
  const bullets = normalizeCards(content?.bullets ?? content?.items);

  if (!paragraphs.length && !bullets.length) {
    return null;
  }

  return (
    <SeoSectionShell
      backgroundClassName={backgroundClassName}
      className="grid gap-7 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:gap-10"
    >
        <div className="max-w-[520px]">
          <p className={SECTION_LABEL_CLASS}>
            {getSectionEyebrow(content, eyebrow)}
          </p>
          <h2 className={SECTION_TITLE_CLASS}>
            {getSectionTitle(content, title)}
          </h2>
        </div>

        <div>
          {paragraphs.length ? (
            <div className={BODY_STACK_CLASS}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {bullets.length ? (
            <div className={`${paragraphs.length ? "mt-6" : ""} grid gap-4 sm:grid-cols-2 sm:gap-5`}>
              {bullets.map((item, index) => (
                <div key={`${item.title || item.label}-${index}`} className={CARD_CLASS}>
                  <h3 className="text-base font-bold text-slate-950">{item.title || item.label}</h3>
                  {item.description || item.text ? (
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description || item.text}</p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </div>
    </SeoSectionShell>
  );
}

export function SeoWhyChooseSection({ content, title = "Why this page matters", backgroundClassName = "bg-slate-50" }) {
  const items = normalizeCards(content?.items ?? content);

  if (!items.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
        <div className="max-w-[760px]">
          <p className={SECTION_LABEL_CLASS}>
            {getSectionEyebrow(content, "Decision support")}
          </p>
          <h2 className={SECTION_TITLE_CLASS}>
            {getSectionTitle(content, title)}
          </h2>
          {content?.intro || content?.description ? (
            <p className={`mt-4 max-w-[740px] ${BODY_TEXT_CLASS}`}>{content.intro || content.description}</p>
          ) : null}
        </div>

        <div className={`${CARD_GRID_CLASS} ${getResponsiveGridClass(items.length)}`}>
          {items.map((item, index) => (
            <article key={`${item.title || item.label}-${index}`} className={CARD_CLASS}>
              <h3 className="text-lg font-bold text-slate-950">{item.title || item.label}</h3>
              {item.description || item.text ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description || item.text}</p>
              ) : null}
            </article>
          ))}
        </div>
    </SeoSectionShell>
  );
}

export function SeoHowItWorksSection({ content, title = "How Maths Bodhi helps", backgroundClassName = "bg-white" }) {
  const steps = normalizeSteps(content?.steps ?? content?.items ?? content);

  if (!steps.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
        <div className="max-w-[760px]">
          <p className={SECTION_LABEL_CLASS}>
            {getSectionEyebrow(content, "Process")}
          </p>
          <h2 className={SECTION_TITLE_CLASS}>
            {getSectionTitle(content, title)}
          </h2>
        </div>

        <div className={`${CARD_GRID_CLASS} ${getResponsiveGridClass(steps.length)}`}>
          {steps.map((step, index) => (
            <article key={`${step.title}-${index}`} className={MUTED_CARD_CLASS}>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">{step.title}</h3>
              {step.description || step.text ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description || step.text}</p>
              ) : null}
            </article>
          ))}
        </div>
    </SeoSectionShell>
  );
}

export function SeoFaqSection({ items = [], title = "Common questions", backgroundClassName = "bg-slate-50" }) {
  const faqs = asArray(items).filter((item) => hasText(item.question) && hasText(item.answer));

  if (!faqs.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
        <p className={SECTION_LABEL_CLASS}>
          FAQ
        </p>
        <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
        <div className="mt-7 divide-y divide-slate-200 rounded-[24px] border border-slate-200 bg-white">
          {faqs.map((item) => (
            <article key={item.question} className="p-5 sm:p-6">
              <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
              <p className="mt-3 max-w-[740px] text-sm leading-6 text-slate-700">{item.answer}</p>
            </article>
          ))}
        </div>
    </SeoSectionShell>
  );
}

export function RelatedPagesSection({ links = [], title = "Related pages", backgroundClassName = "bg-white" }) {
  const items = asArray(links).filter((item) => hasText(item.to) && hasText(item.label || item.title));

  if (!items.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
        <div className="max-w-[760px]">
          <p className={SECTION_LABEL_CLASS}>
            Internal links
          </p>
          <h2 className={SECTION_TITLE_CLASS}>{title}</h2>
        </div>
        <div className={`${CARD_GRID_CLASS} ${getResponsiveGridClass(items.length)}`}>
          {items.map((item) => (
            <Link key={`${item.to}-${item.label || item.title}`} to={item.to} className={`${MUTED_CARD_CLASS} transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg`}>
              <h3 className="text-lg font-bold text-slate-950">{item.label || item.title}</h3>
              {item.description ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              ) : null}
            </Link>
          ))}
        </div>
    </SeoSectionShell>
  );
}

function getActionTarget(action) {
  return action?.to || action?.href || action?.url;
}

function isExternalAction(action) {
  const target = getActionTarget(action);
  return action?.external || /^https?:\/\//i.test(target);
}

function CtaAction({ action, variant = "primary" }) {
  const target = getActionTarget(action);

  if (!hasText(target) || !hasText(action?.label)) {
    return null;
  }

  const className =
    variant === "primary"
      ? "inline-flex w-full items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      : "inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:border-blue-200 hover:text-blue-700 sm:w-auto";

  if (isExternalAction(action)) {
    return (
      <a href={target} target="_blank" rel="noreferrer" className={className}>
        {action.label}
      </a>
    );
  }

  return (
    <Link to={target} className={className}>
      {action.label}
    </Link>
  );
}

export function SeoCtaSection({ content, title = "Talk to Maths Bodhi", backgroundClassName = "bg-white" }) {
  if (!content) {
    return null;
  }

  const ctaTitle = typeof content === "string" ? title : content.title || content.heading || title;
  const description = typeof content === "string" ? content : content.description || content.text;
  const actions = [
    ...(Array.isArray(content?.actions) ? content.actions : []),
    content?.primaryAction,
    content?.secondaryAction,
    content?.tertiaryAction,
  ].filter(Boolean);

  if (!hasText(ctaTitle) && !hasText(description) && !actions.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
      <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-200/70 sm:p-8 lg:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
          Next step
        </p>
        <h2 className="mt-3 max-w-[760px] text-2xl font-bold tracking-tight sm:text-3xl">
          {ctaTitle}
        </h2>
        {description ? (
          <p className="mt-4 max-w-[740px] text-base leading-7 text-slate-200">{description}</p>
        ) : null}
        {actions.length ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {actions.map((action, index) => (
              <CtaAction
                key={`${getActionTarget(action)}-${action.label}`}
                action={action}
                variant={index === 0 ? "primary" : "secondary"}
              />
            ))}
          </div>
        ) : null}
      </div>
    </SeoSectionShell>
  );
}

export function LocalTrustSection({ content, title = "Local trust context", backgroundClassName = "bg-white" }) {
  const paragraphs = toParagraphs(content);
  const items = normalizeCards(content?.items ?? content?.cards);

  if (!paragraphs.length && !items.length) {
    return null;
  }

  return (
    <SeoSectionShell backgroundClassName={backgroundClassName}>
        <div className="max-w-[760px]">
          <p className={SECTION_LABEL_CLASS}>
            {getSectionEyebrow(content, "Local context")}
          </p>
          <h2 className={SECTION_TITLE_CLASS}>
            {getSectionTitle(content, title)}
          </h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={`mt-4 max-w-[740px] ${BODY_TEXT_CLASS}`}>
              {paragraph}
            </p>
          ))}
        </div>
        {items.length ? (
          <div className={`${CARD_GRID_CLASS} ${getResponsiveGridClass(items.length)}`}>
            {items.map((item, index) => (
              <article key={`${item.title || item.label}-${index}`} className={MUTED_CARD_CLASS}>
                <h3 className="text-lg font-bold text-slate-950">{item.title || item.label}</h3>
                {item.description || item.text ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description || item.text}</p>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
    </SeoSectionShell>
  );
}

export function SeoContentSections({ content, fallback, title = "Maths Bodhi guide", relatedLinks = [] }) {
  const resolved = {
    ...fallback,
    ...content,
    relatedLinks: content?.relatedLinks ?? fallback?.relatedLinks ?? relatedLinks,
  };

  const intro = resolved.intro;
  const whyChoose = resolved.whyChoose;
  const whoItHelps = resolved.whoItHelps;
  const howItWorks = resolved.howItWorks;
  const localContext = resolved.localContext;
  const faq = resolved.faq;
  const links = resolved.relatedLinks;
  const cta = resolved.cta;

  if (!intro && !whyChoose && !whoItHelps && !howItWorks && !localContext && !faq?.length && !links?.length && !cta) {
    return null;
  }

  return (
    <>
      <SeoIntroSection content={intro} title={title} backgroundClassName="bg-white" />
      <SeoWhyChooseSection content={whyChoose} backgroundClassName="bg-slate-50" />
      <SeoContentBlock content={whoItHelps} title="Who this page is for" eyebrow="Student fit" backgroundClassName="bg-white" />
      <SeoHowItWorksSection content={howItWorks} backgroundClassName="bg-white" />
      <LocalTrustSection content={localContext} backgroundClassName="bg-slate-50" />
      <SeoFaqSection items={faq} title={`Questions about ${title}`} backgroundClassName="bg-white" />
      <RelatedPagesSection links={links} title="Related Maths Bodhi pages" backgroundClassName="bg-slate-50" />
      <SeoCtaSection content={cta} title={`Talk to Maths Bodhi about ${title}`} backgroundClassName="bg-white" />
    </>
  );
}
