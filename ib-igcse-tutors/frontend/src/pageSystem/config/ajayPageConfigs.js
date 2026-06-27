import { AJAY_MAIN_PATH } from "./ajayConstants.js";

const DEMO_PATH = "/book-demo";

function relatedLink(label, to, description) {
  return { label, to, description };
}

function contentSection(eyebrow, title, paragraphs, bullets = []) {
  return { eyebrow, title, paragraphs, bullets };
}

function faq(question, answer) {
  return { question, answer };
}

function createAjayPage(config) {
  const routePath = config.routePath ?? `/${config.slug}/ajay-vatsyayan`;

  return {
    id: config.id,
    slug: config.slug,
    routePath,
    canonicalUrl: routePath,
    pageType: config.pageType ?? "ajay-tutor",
    template: "AjayPageTemplate",
    publishStatus: "published",
    schemaType: "Person",
    title: config.title,
    h1: config.h1,
    intro: config.intro,
    seoTitle: config.seoTitle,
    seoDescription: config.seoDescription,
    breadcrumbItems:
      config.breadcrumbItems ??
      [
        { label: "Home", to: "/" },
        { label: "Ajay Vatsyayan", to: AJAY_MAIN_PATH },
        { label: config.breadcrumbLabel ?? config.title },
      ],
    entity: {
      name: "Ajay Vatsyayan",
      title: "Senior Maths Home Tutor in Gurugram",
      image: "/images/hero-maths-home.svg",
      imageAlt: "Ajay Vatsyayan senior maths tutor profile",
      knowsAbout: config.knowsAbout,
      focus: config.focus,
      audience: config.audience,
      serviceArea: config.serviceArea ?? "Gurugram and online support on enquiry",
    },
    sections: {
      hero: {
        badge: config.badge,
        chips: config.chips,
        stats: config.stats,
      },
      contentSections: config.contentSections,
      fitBullets: config.fitBullets,
      relatedLinks: config.relatedLinks,
      faqs: config.faqs,
      cta: {
        title: config.ctaTitle ?? "Check fit and availability with Maths Bodhi",
        description:
          config.ctaDescription ??
          "Share the student's class, board, school context, weak chapters, target score, location, and preferred timing. Maths Bodhi can then guide whether Ajay is the right senior option or whether another verified tutor is a better fit.",
        primaryAction: {
          label: "Book a free demo discussion",
          to: DEMO_PATH,
        },
        secondaryAction: {
          label: "View main Ajay page",
          to: AJAY_MAIN_PATH,
        },
      },
    },
  };
}

export const ajayMainPageConfig = createAjayPage({
  id: "ajay-vatsyayan-main",
  slug: "ajay-vatsyayan",
  routePath: AJAY_MAIN_PATH,
  pageType: "ajay-profile",
  title: "Ajay Vatsyayan",
  badge: "Senior maths tutor profile",
  breadcrumbItems: [
    { label: "Home", to: "/" },
    { label: "Ajay Vatsyayan" },
  ],
  seoTitle: "Ajay Vatsyayan | Senior Maths Home Tutor in Gurugram | Maths Bodhi",
  seoDescription:
    "Learn about Ajay Vatsyayan, a senior Maths Bodhi tutor option for IB, IGCSE, CBSE Class 12, JEE, BITSAT, and advanced maths home tuition in Gurugram.",
  h1: "Ajay Vatsyayan - senior maths home tutor option for advanced Gurugram students",
  intro:
    "Ajay Vatsyayan is presented by Maths Bodhi as a senior maths mentor option for families who need deeper subject handling, calmer exam planning, and a tutor conversation that respects board, school, and student fit before commitment.",
  focus: "Senior school, international curricula, and entrance-focused maths",
  audience:
    "IB MYP, IB DP, IGCSE, CBSE Class 12, JEE Main, JEE Advanced, BITSAT, and advanced school maths learners",
  chips: ["IB", "IGCSE", "CBSE Class 12", "JEE", "BITSAT", "Gurugram"],
  stats: [
    { value: "Senior", label: "Maths mentor positioning" },
    { value: "1:1", label: "Home or online fit check" },
    { value: "No ratings", label: "No fake rating markup" },
  ],
  knowsAbout: [
    "IB DP Mathematics",
    "IB MYP Mathematics",
    "IGCSE Mathematics",
    "CBSE Class 12 Mathematics",
    "JEE Main Mathematics",
    "JEE Advanced Mathematics",
    "BITSAT Mathematics",
    "Calculus",
    "Algebra",
    "Coordinate Geometry",
  ],
  fitBullets: [
    "Best considered when the student needs senior-level mathematical reasoning, not only routine homework supervision.",
    "Useful for families comparing premium-school expectations, board exams, and competitive-exam pressure in the same year.",
    "Availability, exact fee, schedule, and student fit are confirmed only through a Maths Bodhi enquiry conversation.",
  ],
  contentSections: [
    contentSection(
      "Profile Fit",
      "Who should consider Ajay Vatsyayan",
      [
        "Ajay is positioned for students whose maths need has moved beyond basic coverage. A family may be looking at him when the student has gaps in calculus, algebra, coordinate geometry, trigonometry, probability, or proof-style thinking, but the larger issue is usually planning. Senior students often know many formulas but do not know which method to choose, how much work to show, when to switch strategy, or how to turn practice into reliable exam performance.",
        "This page does not claim guaranteed outcomes, ranks, marks, or ratings. It is a profile-style guide that helps parents decide whether Ajay should be discussed during a Maths Bodhi fit call. The right match depends on the student's board, school calendar, current confidence, location, exam date, weekly availability, and whether the family needs home tuition in Gurugram, online support, or a mix of both.",
      ],
      ["Advanced school maths", "Senior-board planning", "Entrance maths discipline"],
    ),
    contentSection(
      "Boards And Exams",
      "Where Ajay fits inside the Maths Bodhi tutor ecosystem",
      [
        "Maths Bodhi already serves many kinds of maths search intent: board tuition, Gurugram locality pages, class-wise pages, online support, and exam routes. Ajay should not be treated as a universal answer for every student. His strongest positioning is for IB, IGCSE, CBSE Class 12, JEE, BITSAT, and high-pressure senior-school maths where conceptual clarity and decision-making matter as much as coverage.",
        "For IB DP students, the conversation is usually about AA versus AI, internal assessment pressure, calculator fluency, topic sequencing, and long-answer method. For IGCSE learners, it is often about Core versus Extended expectations, paper practice, graph interpretation, and written method. For CBSE Class 12 and entrance students, the discussion moves toward calculus, vectors, 3D geometry, probability, functions, speed, accuracy, and a weekly routine that can survive school tests and mock exams.",
      ],
      ["IB DP and MYP", "IGCSE Core and Extended", "CBSE Class 12", "JEE and BITSAT"],
    ),
    contentSection(
      "Teaching Positioning",
      "What the first conversation should clarify",
      [
        "A strong senior tutor match starts with diagnosis. Parents should be ready to share recent marks, school board, textbook or course sequence, exam timeline, pain points, and what has not worked so far. A student who only needs accountability may need a different tutor from a student who is struggling with fundamentals in functions or calculus. A student aiming for JEE Advanced style problems needs a different rhythm from an IB MYP student trying to rebuild confidence after weak assessments.",
        "Ajay-specific intent pages are therefore limited to a small number of genuinely different search contexts. The goal is not to produce hundreds of name-plus-keyword pages. The goal is to make the premium tutor option visible on pages where his experience and teaching positioning could realistically matter, while keeping each page useful, self-canonical, and linked to the wider Maths Bodhi route system.",
      ],
      ["Diagnosis before matching", "No hidden pages", "No fake testimonials"],
    ),
    contentSection(
      "Service Areas",
      "Gurugram and online availability",
      [
        "For home tuition, locality fit matters. Families around Golf Course Road, Golf Course Extension Road, DLF, South City, Sushant Lok, Sohna Road, and nearby premium-school corridors often need a tutor schedule that can work around school timing, travel distance, and exam urgency. Ajay may be discussed as a senior option where travel and timing are practical; otherwise Maths Bodhi can suggest another verified tutor who fits the route better.",
        "Online support can be considered when the student is mature enough for screen-based problem solving, shared writing, and independent practice between sessions. For senior students, online sessions can work well for doubt clearing, topic planning, and review of attempted problems, but they are not automatically better than home tuition. The right mode should be chosen after looking at the student's discipline, learning style, and family schedule.",
      ],
      ["Gurugram home tuition", "Online support on enquiry", "Mode chosen by fit"],
    ),
  ],
  relatedLinks: [
    relatedLink("IB DP with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "For IB Diploma students comparing AA, AI, calculus, statistics, IA pressure, and exam planning."),
    relatedLink("IGCSE with Ajay", "/igcse-maths-home-tutor/ajay-vatsyayan", "For Cambridge IGCSE learners who need Extended or Core method clarity and paper practice."),
    relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "For senior CBSE students working through calculus, vectors, 3D geometry, probability, and boards."),
    relatedLink("JEE Main with Ajay", "/jee-main-maths-home-tutor/ajay-vatsyayan", "For students who need stronger chapter selection, timed practice, and error review."),
    relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "For students balancing board revision, speed, accuracy, and BITSAT maths pressure."),
  ],
  faqs: [
    faq("Is Ajay Vatsyayan shown with ratings or reviews?", "No. This page intentionally avoids fake reviews, fake ratings, review structured data, and aggregate rating markup. Families should use the page as a fit guide and confirm details directly with Maths Bodhi."),
    faq("Does this page guarantee Ajay's availability?", "No. Availability depends on schedule, location, mode, class level, board, and student need. Maths Bodhi confirms availability only after an enquiry."),
    faq("Which students are the strongest fit for Ajay?", "The strongest fit is usually a senior or advanced learner in IB, IGCSE, CBSE Class 12, JEE, BITSAT, or similar maths contexts where concept depth and exam planning are important."),
    faq("Can Ajay teach both home and online?", "Home or online support can be discussed during the fit call. The final mode should depend on the student's discipline, location, time slot, and topic need."),
    faq("Why are there only a few Ajay-specific pages?", "The site keeps Ajay pages limited to high-intent cases with distinct content. This avoids thin duplicate pages and keeps the sitemap focused on useful, self-canonical URLs."),
  ],
});

export const ajayIntentPageConfigs = [
  createAjayPage({
    id: "ajay-ib-dp",
    slug: "ib-dp-maths-home-tutor",
    title: "IB DP maths home tutor with Ajay Vatsyayan",
    badge: "IB DP senior mentor option",
    breadcrumbLabel: "IB DP Maths",
    seoTitle: "IB DP Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Explore Ajay Vatsyayan as a senior IB DP maths home tutor option for AA, AI, IA planning, calculus, statistics, and exam preparation in Gurugram.",
    h1: "Ajay Vatsyayan for IB DP maths home tuition in Gurugram",
    intro:
      "This page is for IB Diploma families comparing whether Ajay Vatsyayan is the right senior maths mentor for AA or AI pathway pressure, internal assessment planning, and disciplined exam preparation.",
    focus: "IB DP Mathematics AA and AI support",
    audience: "IB Diploma students in Grades 11 and 12",
    chips: ["IB DP", "AA and AI", "IA planning", "Calculus", "Statistics"],
    stats: [
      { value: "DP", label: "Diploma maths focus" },
      { value: "AA/AI", label: "Pathway-aware support" },
      { value: "IA", label: "Planning discussion" },
    ],
    knowsAbout: ["IB DP Mathematics", "IB Maths AA", "IB Maths AI", "Calculus", "Statistics", "Mathematical modelling"],
    fitBullets: [
      "Best for DP students who need senior guidance across topic depth, written method, and exam strategy.",
      "Useful when AA or AI pathway choices, IA workload, and school assessment timelines are overlapping.",
      "Not a shortcut page for marks; it is a route to discuss fit, schedule, and learning plan with Maths Bodhi.",
    ],
    contentSections: [
      contentSection("IB Diploma Context", "Why IB DP maths needs a careful tutor match", [
        "IB DP maths is not just another senior-school syllabus. A student may be in Analysis and Approaches or Applications and Interpretation, at HL or SL, with a school calendar that includes topic tests, exploration planning, mocks, predicted grades, and final papers. A tutor who helps in this context must understand how concept clarity, method writing, calculator use, modelling, and cumulative revision connect across the two-year Diploma rhythm.",
        "Ajay is positioned as a senior option when the student needs more than chapter coverage. Families often ask for help after the learner has started losing marks in multi-step questions, has weak confidence in functions or calculus, or is unsure how to prepare for mixed papers. The first conversation should separate topic gaps from planning gaps, because the solution may be a topic repair plan, a paper-practice rhythm, or a clearer weekly IA and revision structure.",
      ]),
      contentSection("AA And AI Fit", "How the Ajay discussion changes by pathway", [
        "For AA students, the fit discussion should look closely at algebraic fluency, calculus, proof-style reasoning, functions, trigonometry, and the ability to show method under time pressure. For AI students, the conversation often includes statistics, probability, modelling, technology, interpretation, and the student's comfort with explaining real-world mathematics in a structured way. Both routes require clarity, but the style of support is not identical.",
        "A useful senior tutor plan should not treat every IB question as a generic worksheet. The student needs to know why a method works, where a calculator or graphing approach is appropriate, how to review errors, and how to turn school feedback into the next practice block. Ajay's page is therefore self-canonical because the IB DP search intent is distinct from MYP, IGCSE, CBSE, JEE, and Gurgaon home-tutor pages.",
      ]),
      contentSection("IA And Exam Planning", "What families should prepare before enquiring", [
        "Before asking for Ajay's availability, parents should gather the current DP course level, recent test marks, school topic sequence, IA stage, calculator model, target grade, and the student's honest view of weak chapters. If the IA is still at topic-selection stage, the support needed is different from a student whose IA draft is complete but mathematically thin. If final exams are close, the plan may need to prioritise paper practice and error review instead of broad exploration.",
        "The best fit call will also clarify mode. Some IB DP learners can work very well online because they are mature, organised, and comfortable sharing written work. Others benefit from home tuition because they need accountability, live correction, and a calmer routine. Maths Bodhi should decide this from the student's behaviour and family schedule, not from a generic claim that one mode is always superior.",
      ]),
      contentSection("Related Routes", "Where to compare before deciding", [
        "Families still exploring the wider route can compare the main IB Maths Home Tutor page, the IB Maths Tuition page, and the Gurugram IB route before opening a specific tutor conversation. Those pages help parents understand the full Maths Bodhi ecosystem, while this Ajay page narrows the decision to one senior mentor option.",
        "If the student is younger than DP, the MYP Ajay page is a better next step. If the learner is preparing for JEE or BITSAT alongside school maths, the entrance-specific Ajay pages explain how the planning changes. Keeping those pages separate helps avoid duplicate content and gives each search intent a useful purpose.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read the broader profile before choosing a specific Ajay intent route."),
      relatedLink("IB MYP with Ajay", "/ib-myp-maths-home-tutor/ajay-vatsyayan", "For younger IB students who need MYP concept structure and assessment confidence."),
      relatedLink("IB Maths Home Tutor", "/ib-maths-home-tutor", "Compare the main Maths Bodhi IB service page."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share course level, school context, IA stage, and exam timeline."),
    ],
    faqs: [
      faq("Is this page for both IB Maths AA and AI?", "Yes. It is written for families comparing Ajay for IB DP AA or AI, but the fit call should clarify HL or SL level, topic gaps, calculator use, IA stage, and exam timeline."),
      faq("Can Ajay help with the IB Maths IA?", "The page supports an IA planning conversation, but it does not promise ghostwriting or artificial work. Families should discuss topic clarity, mathematical depth, structure, and feedback needs ethically."),
      faq("Should every IB DP student choose a senior tutor?", "No. Some students need routine support rather than a senior mentor. Ajay is best discussed when the student needs deeper reasoning, planning, or high-pressure exam support."),
      faq("Is this page self-canonical?", "Yes. The IB DP content is distinct from the MYP, IGCSE, CBSE, JEE, BITSAT, and Gurgaon Ajay pages, so it uses its own canonical URL."),
      faq("Does this page use review or rating schema?", "No. The schema is limited to Person, WebPage, BreadcrumbList, and FAQPage where the visible FAQ content exists."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-aa-hl",
    slug: "ib-maths-aa-hl-home-tutor",
    title: "IB Maths AA HL home tutor with Ajay Vatsyayan",
    badge: "IB AA HL specialist mentor",
    breadcrumbLabel: "IB Maths AA HL",
    seoTitle: "IB Maths AA HL Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB Mathematics Analysis and Approaches Higher Level, the most demanding IB maths course, with proof, deep calculus, and IA support in Gurugram.",
    h1: "Ajay Vatsyayan for IB Maths Analysis and Approaches HL",
    intro:
      "This page helps families in IB Maths AA HL decide whether Ajay should be discussed for the most demanding IB maths course, where proof and deep calculus carry the load.",
    focus: "IB DP Mathematics: Analysis and Approaches, Higher Level",
    audience: "IB DP students taking the most maths-intensive course",
    chips: ["AA HL", "Proof", "Deep calculus", "Maths-heavy degrees"],
    stats: [
      { value: "AA HL", label: "Most demanding IB maths" },
      { value: "Proof", label: "Abstract reasoning" },
      { value: "240h", label: "Higher Level depth" },
    ],
    knowsAbout: ["IB Mathematics Analysis and Approaches", "Proof", "Calculus", "Complex numbers", "Vectors", "Differential equations", "Internal Assessment"],
    fitBullets: [
      "Best for AA HL students aiming at maths-heavy degrees who need genuine depth, not just exam tricks.",
      "Useful when proof, the HL-only topics, and the harder Paper 3 are the real pressure points.",
      "Fit should be checked against current grade, target university requirements, and practice discipline.",
    ],
    contentSections: [
      contentSection("Why AA HL Is Hardest", "What makes this course demanding", [
        "Analysis and Approaches Higher Level is the most demanding maths course in the IB. It leans on algebraic rigour and proof, and goes deep into calculus, including differential equations and series, alongside complex numbers and vectors. The HL-only material and the problem-solving Paper 3 reward students who can reason abstractly rather than memorise procedures, which is why even strong students can find it steep.",
        "Ajay is positioned for families who want a senior mentor for this specific course. This is not a claim that every AA HL student needs him; some manage with school support and practice. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Proof And Depth", "Where AA HL students usually need help", [
        "The fit call should identify whether the difficulty is in proof technique, calculus depth, algebraic fluency, or exam temperament under HL time pressure. Each needs a different response, and confusing a conceptual gap with a speed problem wastes scarce time.",
        "The Internal Assessment (the exploration) also matters: AA HL explorations tend to reward genuine mathematical reasoning. A good plan helps the student pick a workable topic and develop it with honest rigour rather than padding.",
      ]),
      contentSection("University Fit", "Matching AA HL to university plans", [
        "AA HL is often the course expected for maths, engineering, physics, and quantitative economics or computer science at selective universities. Because the workload is heavy, the plan should be honest about whether the student can sustain it, or whether a different level or course better protects the overall diploma score.",
        "Ajay's role in a fit discussion is to give a realistic read, not to push a student to stay in the hardest course at the cost of their other subjects.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This AA HL page is self-canonical because its intent is specific: the hardest IB maths course. The general IB DP page introduces the AA-or-AI and HL-or-SL choice; the AA SL, AI HL, and AI SL pages cover genuinely different courses and levels. This page is for students already committed to AA HL.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Start here if the AA-or-AI choice is not settled."),
      relatedLink("IB Maths AA SL with Ajay", "/ib-maths-aa-sl-home-tutor/ajay-vatsyayan", "The Standard Level version of this course."),
      relatedLink("IB Maths AI HL with Ajay", "/ib-maths-ai-hl-home-tutor/ajay-vatsyayan", "The applied Higher Level alternative."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share grade, target universities, and weak topics."),
    ],
    faqs: [
      faq("Is AA HL really the hardest IB maths course?", "Yes. It combines Higher Level depth with the proof-and-analysis focus of AA, so it is the most demanding of the four IB maths options."),
      faq("Who should take AA HL?", "Usually students aiming at maths, engineering, physics, or quantitative degrees that expect it. The fit call should check this honestly."),
      faq("How is this different from AA SL?", "AA SL covers the analytical core without the HL-only depth, extra topics, or Paper 3. This page is specifically the Higher Level course."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-aa-sl",
    slug: "ib-maths-aa-sl-home-tutor",
    title: "IB Maths AA SL home tutor with Ajay Vatsyayan",
    badge: "IB AA SL mentor",
    breadcrumbLabel: "IB Maths AA SL",
    seoTitle: "IB Maths AA SL Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB Mathematics Analysis and Approaches Standard Level, with a solid analytical and calculus foundation and IA support in Gurugram.",
    h1: "Ajay Vatsyayan for IB Maths Analysis and Approaches SL",
    intro:
      "This page helps families in IB Maths AA SL decide whether Ajay should be discussed for a steady analytical course that keeps maths solid without the HL workload.",
    focus: "IB DP Mathematics: Analysis and Approaches, Standard Level",
    audience: "IB DP students taking the analytical course at Standard Level",
    chips: ["AA SL", "Analytical core", "Calculus basics", "Balanced load"],
    stats: [
      { value: "AA SL", label: "Analytical Standard Level" },
      { value: "Core", label: "Algebra and calculus base" },
      { value: "150h", label: "Standard Level scope" },
    ],
    knowsAbout: ["IB Mathematics Analysis and Approaches", "Algebra", "Functions", "Calculus", "Trigonometry", "Statistics", "Internal Assessment"],
    fitBullets: [
      "Best for AA SL students who want a secure analytical base without the HL workload.",
      "Useful when functions, calculus basics, or exam method are the sticking points.",
      "Fit should be checked against current grade, target courses, and practice discipline.",
    ],
    contentSections: [
      contentSection("AA SL Character", "What this course is, and is not", [
        "Analysis and Approaches Standard Level keeps the analytical, algebraic spirit of AA but at Standard Level depth. It builds functions, trigonometry, the basics of calculus, and statistics, without the HL-only topics or the extra Paper 3. It suits students who want maths to stay solid and respected on their diploma without taking on the heaviest load.",
        "Ajay is positioned for families who want senior support on this course. This is not a claim that every AA SL student needs him; many do well with school and practice. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Steady Foundations", "Where AA SL students usually need help", [
        "The fit call should check whether the student struggles with functions and graphs, the introduction to calculus, algebraic fluency, or simply exam technique. AA SL rewards clean method and consistent practice more than raw speed, so a calm weekly routine usually helps most.",
        "The Internal Assessment still counts, and a good plan helps the student choose a realistic exploration topic and write it clearly rather than over-reaching.",
      ]),
      contentSection("Keeping Options Open", "How AA SL fits university plans", [
        "AA SL is a respected choice for many degrees that need solid but not specialist maths. The plan should be honest about whether the student's target courses are happy with SL, or whether they need HL maths, so the family chooses with evidence rather than worry.",
        "Ajay's role in a fit discussion is to give a realistic read on whether AA SL supports the student's goals comfortably.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This AA SL page is self-canonical because Standard Level analytical intent is distinct from the HL course and from the applied AI courses. The AA HL page is far more demanding; the AI HL and AI SL pages are a different, applied subject. This page is specifically AA at Standard Level.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Start here if the AA-or-AI choice is not settled."),
      relatedLink("IB Maths AA HL with Ajay", "/ib-maths-aa-hl-home-tutor/ajay-vatsyayan", "The Higher Level version of this course."),
      relatedLink("IB Maths AI SL with Ajay", "/ib-maths-ai-sl-home-tutor/ajay-vatsyayan", "The applied Standard Level alternative."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share grade, target courses, and weak topics."),
    ],
    faqs: [
      faq("How is AA SL different from AA HL?", "AA SL covers the analytical core at Standard Level, without the HL-only topics, the extra depth, or Paper 3. It is a lighter load than AA HL."),
      faq("Is AA SL respected by universities?", "Yes, for many courses. Some maths-heavy degrees prefer HL, so the fit call should check target-course requirements."),
      faq("How is AA SL different from AI SL?", "AA SL is analytical and algebraic; AI SL is applied, with more statistics and technology. They are different subjects at the same level."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-ai-hl",
    slug: "ib-maths-ai-hl-home-tutor",
    title: "IB Maths AI HL home tutor with Ajay Vatsyayan",
    badge: "IB AI HL applied mentor",
    breadcrumbLabel: "IB Maths AI HL",
    seoTitle: "IB Maths AI HL Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB Mathematics Applications and Interpretation Higher Level, with modelling, advanced statistics, technology, and IA support in Gurugram.",
    h1: "Ajay Vatsyayan for IB Maths Applications and Interpretation HL",
    intro:
      "This page helps families in IB Maths AI HL decide whether Ajay should be discussed for a demanding applied course built on modelling, statistics, and technology.",
    focus: "IB DP Mathematics: Applications and Interpretation, Higher Level",
    audience: "IB DP students taking the applied maths course at Higher Level",
    chips: ["AI HL", "Modelling", "Advanced statistics", "Technology"],
    stats: [
      { value: "AI HL", label: "Applied Higher Level" },
      { value: "Stats", label: "Heavy statistics" },
      { value: "GDC", label: "Technology-driven" },
    ],
    knowsAbout: ["IB Mathematics Applications and Interpretation", "Mathematical modelling", "Statistics", "Calculus", "Matrices", "Graph theory", "Internal Assessment"],
    fitBullets: [
      "Best for AI HL students who need genuine depth in modelling and statistics, not just calculator skills.",
      "Useful when advanced statistics, the technology-heavy papers, and a data-driven IA are the pressure points.",
      "Fit should be checked against current grade, target university requirements, and practice discipline.",
    ],
    contentSections: [
      contentSection("AI HL Character", "What this course actually demands", [
        "Applications and Interpretation Higher Level is often misread as the easy option. It is not. AI HL goes deep into statistics and modelling, and adds topics such as matrices, graph theory, and applied calculus, with assessment that leans heavily on the graphic display calculator and on interpreting real contexts. Students who are weak at sustained data work or careful interpretation can struggle.",
        "Ajay is positioned for families who want a senior mentor for this specific course. This is not a claim that every AI HL student needs him; some manage with school support. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Modelling And Stats", "Where AI HL students usually need help", [
        "The fit call should check whether the student struggles with statistical reasoning, modelling set-ups, the technology-driven papers, or interpretation of results. These are different skills from the algebraic proof focus of AA, so the support has to match the AI style.",
        "The Internal Assessment in AI tends to reward genuine, well-handled data and modelling. A good plan helps the student find a real context, gather or use suitable data, and analyse it honestly rather than superficially.",
      ]),
      contentSection("University Fit", "Matching AI HL to university plans", [
        "AI HL suits many data-driven, social-science, business, design, and some science routes, and is increasingly accepted where strong applied maths matters. Where a target course specifically expects AA, the plan should surface that early so the family is not caught out.",
        "Ajay's role in a fit discussion is to give a realistic read on whether AI HL supports the student's goals and is a sustainable load.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This AI HL page is self-canonical because applied Higher Level intent is distinct. The AA HL and AA SL pages are the analytical subject; the AI SL page is the lighter applied level. This page is specifically AI at Higher Level.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Start here if the AA-or-AI choice is not settled."),
      relatedLink("IB Maths AI SL with Ajay", "/ib-maths-ai-sl-home-tutor/ajay-vatsyayan", "The Standard Level version of this course."),
      relatedLink("IB Maths AA HL with Ajay", "/ib-maths-aa-hl-home-tutor/ajay-vatsyayan", "The analytical Higher Level alternative."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share grade, target universities, and weak topics."),
    ],
    faqs: [
      faq("Is AI HL the easy IB maths course?", "No. AI HL is demanding in its own way, with heavy statistics, modelling, and technology-based assessment. It is not a soft option."),
      faq("Who should take AI HL?", "Usually students heading into data-driven, social-science, business, or applied routes who still need substantial maths. The fit call should confirm target-course requirements."),
      faq("How is AI HL different from AA HL?", "AA HL is analytical and proof-heavy; AI HL is applied, with more statistics, modelling, and technology. They are different subjects."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-ai-sl",
    slug: "ib-maths-ai-sl-home-tutor",
    title: "IB Maths AI SL home tutor with Ajay Vatsyayan",
    badge: "IB AI SL applied mentor",
    breadcrumbLabel: "IB Maths AI SL",
    seoTitle: "IB Maths AI SL Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB Mathematics Applications and Interpretation Standard Level, with practical modelling, statistics, and IA support in Gurugram.",
    h1: "Ajay Vatsyayan for IB Maths Applications and Interpretation SL",
    intro:
      "This page helps families in IB Maths AI SL decide whether Ajay should be discussed for a practical applied course focused on modelling, statistics, and clear interpretation.",
    focus: "IB DP Mathematics: Applications and Interpretation, Standard Level",
    audience: "IB DP students taking the applied maths course at Standard Level",
    chips: ["AI SL", "Applied basics", "Statistics", "Real contexts"],
    stats: [
      { value: "AI SL", label: "Applied Standard Level" },
      { value: "Stats", label: "Practical statistics" },
      { value: "150h", label: "Standard Level scope" },
    ],
    knowsAbout: ["IB Mathematics Applications and Interpretation", "Mathematical modelling", "Statistics", "Functions", "Financial maths", "Geometry", "Internal Assessment"],
    fitBullets: [
      "Best for AI SL students who want maths to stay manageable while still scoring well.",
      "Useful when statistics, modelling set-ups, or calculator-based exam technique are the sticking points.",
      "Fit should be checked against current grade, target courses, and practice discipline.",
    ],
    contentSections: [
      contentSection("AI SL Character", "What this course is, and is not", [
        "Applications and Interpretation Standard Level is the most practical of the four IB maths options. It focuses on statistics, modelling, functions, and applied geometry, with strong use of the graphic display calculator, and it is designed for students who need confident, usable maths rather than abstract theory. It is approachable, but careless interpretation and weak data handling still cost marks.",
        "Ajay is positioned for families who want senior support on this course. This is not a claim that every AI SL student needs him; many do well with school and practice. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Practical Confidence", "Where AI SL students usually need help", [
        "The fit call should check whether the student struggles with statistics, setting up models, using the calculator well, or interpreting answers in context. AI SL rewards tidy, sensible work and clear explanation, so steady practice usually matters more than speed.",
        "The Internal Assessment still counts, and a good plan helps the student pick a manageable real-world topic and analyse it honestly and clearly.",
      ]),
      contentSection("Keeping Options Open", "How AI SL fits university plans", [
        "AI SL works for many degrees that need everyday, applied maths rather than specialist theory. The plan should be honest about whether the student's target courses accept SL or AI, so there are no surprises at application time.",
        "Ajay's role in a fit discussion is to give a realistic read on whether AI SL comfortably supports the student's goals.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This AI SL page is self-canonical because applied Standard Level intent is distinct from the analytical AA courses and from the heavier AI HL. The AA SL page is analytical at the same level; the AI HL page is the demanding applied version. This page is specifically AI at Standard Level.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Start here if the AA-or-AI choice is not settled."),
      relatedLink("IB Maths AI HL with Ajay", "/ib-maths-ai-hl-home-tutor/ajay-vatsyayan", "The Higher Level version of this course."),
      relatedLink("IB Maths AA SL with Ajay", "/ib-maths-aa-sl-home-tutor/ajay-vatsyayan", "The analytical Standard Level alternative."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share grade, target courses, and weak topics."),
    ],
    faqs: [
      faq("Is AI SL the easiest IB maths course?", "It is the most approachable of the four, but it still needs solid statistics, modelling, and interpretation. Marks are lost to careless work."),
      faq("Who should take AI SL?", "Students who need confident applied maths for degrees that do not require specialist theory. The fit call should confirm target-course requirements."),
      faq("How is AI SL different from AA SL?", "AI SL is applied, with more statistics and technology; AA SL is analytical and algebraic. They are different subjects at the same level."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-myp",
    slug: "ib-myp-maths-home-tutor",
    title: "IB MYP maths home tutor with Ajay Vatsyayan",
    badge: "IB MYP concept mentor",
    breadcrumbLabel: "IB MYP Maths",
    seoTitle: "IB MYP Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB MYP maths support when a student needs stronger concepts, assessment confidence, and premium-school rhythm in Gurugram.",
    h1: "Ajay Vatsyayan for IB MYP maths support in Gurugram",
    intro:
      "This page helps IB MYP families decide whether Ajay should be discussed as a senior mentor option for concept rebuilding, criterion-aware work, and a steadier maths routine.",
    focus: "IB MYP mathematics foundations and assessment readiness",
    audience: "IB MYP students who need concept clarity before DP pressure",
    chips: ["IB MYP", "Concept repair", "Criterion awareness", "Premium schools"],
    stats: [
      { value: "MYP", label: "Middle years focus" },
      { value: "Concepts", label: "Foundation depth" },
      { value: "Routine", label: "Weekly planning" },
    ],
    knowsAbout: ["IB MYP Mathematics", "Algebra", "Functions", "Geometry", "Statistics", "Problem solving"],
    fitBullets: [
      "Best for MYP learners whose gaps may become serious before IB DP or senior-school maths.",
      "Useful when the student needs clearer thinking habits, not only answer checking.",
      "Home or online mode should be chosen after reviewing maturity, location, and study discipline.",
    ],
    contentSections: [
      contentSection("MYP Need", "Why MYP support is different from DP support", [
        "IB MYP maths often looks less intense than DP from the outside, but weak habits formed here can become expensive later. Students may survive by memorising procedures without understanding variables, functions, proportional reasoning, geometry, or data handling. When school assessments become more open-ended, those students can lose marks because they cannot explain reasoning, choose a method, or connect a problem to earlier ideas.",
        "Ajay is not presented here as a generic middle-school tutor for every homework need. This page is for families who want a senior mentor conversation because the student has recurring conceptual gaps, inconsistent assessment performance, or anxiety around maths. The fit call should decide whether Ajay's level is appropriate or whether another Maths Bodhi tutor would provide a better age-stage match.",
      ]),
      contentSection("Assessment Style", "How criterion-aware work changes the plan", [
        "MYP students need to become comfortable with reasoning, communication, investigation, and application. That does not mean every lesson should be abstract. It means the tutor should help the student show method clearly, explain why a step is valid, notice patterns, and avoid treating every question as a one-line answer. These habits are especially important for premium-school learners who may later move into IB DP AA, AI, IGCSE Additional Maths, or competitive exam foundations.",
        "A senior tutor discussion should identify whether the student's main issue is arithmetic fluency, algebraic manipulation, word-problem interpretation, geometry visualisation, or lack of practice discipline. If the diagnosis is unclear, the first few sessions should be used to map errors and build a routine rather than rushing into scattered worksheets.",
      ]),
      contentSection("Family Planning", "What parents should share in the enquiry", [
        "Parents should share MYP year, school, recent assessment feedback, topics that trigger stress, and whether the student avoids maths practice. For some MYP learners, the problem is not intelligence; it is low confidence after repeated small failures. A good plan should include achievable practice blocks, correction of written method, and regular review so the student feels progress without being overwhelmed.",
        "The mode decision is also important. Younger MYP students may need home tuition if they struggle to stay engaged online. Others can work online if they already have a stable study habit and simply need expert correction. Maths Bodhi should decide the mode after listening to the family, not by forcing every student into the same format.",
      ]),
      contentSection("Route Boundaries", "Why this page is separate from IB DP", [
        "This MYP page is self-canonical because the search intent is genuinely different from IB DP. DP pages talk about AA, AI, IA planning, calculators, and final exam papers. MYP pages are more about foundation repair, communication, confidence, and readiness for later senior maths. Merging the two would create a less useful page for both families.",
        "Families who already have a DP student should use the IB DP Ajay page. Families comparing broader IB support can also open the main IB Maths Home Tutor page or the Maths Bodhi premium-school pages before deciding whether to ask for Ajay specifically.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Understand Ajay's wider senior maths positioning."),
      relatedLink("IB DP with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Move here if the student is already in Diploma maths."),
      relatedLink("IB Maths Home Tutor", "/ib-maths-home-tutor", "Compare the broader IB service page."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share MYP year, school feedback, and weak topics."),
    ],
    faqs: [
      faq("Is Ajay always the right tutor for MYP students?", "No. Some MYP students need a younger-stage tutor for routine practice. Ajay should be discussed when the need is deeper concept repair, senior mentoring, or preparation for a harder maths pathway."),
      faq("Can this help a student before IB DP?", "Yes, if the student has gaps in algebra, functions, geometry, data handling, or maths confidence that could become harder in DP."),
      faq("Is the content different from the IB DP Ajay page?", "Yes. This page focuses on MYP foundation, criterion-aware work, confidence, and study rhythm rather than IA planning and DP final papers."),
      faq("Does the page include hidden testimonials?", "No. It does not include fake testimonials, review structured data, or rating markup."),
      faq("Should parents choose home or online?", "That depends on maturity, attention span, location, and family timing. Maths Bodhi can discuss both options during enquiry."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-myp-4",
    slug: "ib-myp-4-maths-home-tutor",
    title: "IB MYP Year 4 maths home tutor with Ajay Vatsyayan",
    badge: "IB MYP 4 foundation mentor",
    breadcrumbLabel: "IB MYP 4 Maths",
    seoTitle: "IB MYP 4 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB MYP Year 4 maths when a student is starting the senior MYP cycle and needs a strong base before MYP 5 and eAssessment in Gurugram.",
    h1: "Ajay Vatsyayan for IB MYP Year 4 maths support in Gurugram",
    intro:
      "This page helps families in IB MYP Year 4 decide whether Ajay should be discussed for the start of the senior MYP cycle and the base it sets for the final MYP year.",
    focus: "IB MYP Year 4 mathematics and the start of the senior MYP cycle",
    audience: "IB MYP Year 4 students beginning the two-year senior MYP run",
    chips: ["IB MYP 4", "Senior MYP start", "Extended pathway", "Before MYP 5"],
    stats: [
      { value: "MYP 4", label: "Penultimate MYP year" },
      { value: "Base", label: "Sets up MYP 5" },
      { value: "Criteria", label: "A to D habits" },
    ],
    knowsAbout: ["IB MYP Mathematics", "Extended mathematics", "Algebra", "Geometry", "Functions", "Statistics and probability", "MYP assessment criteria"],
    fitBullets: [
      "Best for MYP Year 4 students whose base needs to be solid before the demands of MYP 5.",
      "Useful when the extended-maths pathway and criterion-based assessment are starting to bite.",
      "Home or online mode should be chosen after reviewing maturity, location, and study discipline.",
    ],
    contentSections: [
      contentSection("Senior MYP Starts", "Why Year 4 is where it gets serious", [
        "MYP Year 4 begins the senior two-year MYP cycle that runs into Year 5. The content steps up, the gap between standard and extended maths starts to matter, and the criterion-based tasks (investigating patterns, applying maths in real contexts, communicating clearly) demand more than quick answers. Students who coast here often feel it in MYP 5.",
        "Ajay is positioned for families who want a senior mentor to set the base early. This is not a claim that every MYP 4 student needs him; some need only routine practice. The fit call should decide whether Ajay suits the student now, or whether a different Maths Bodhi tutor is a better stage match.",
      ]),
      contentSection("Build For MYP 5", "What a good Year 4 plan does", [
        "The most useful Year 4 work firms up algebra, functions, geometry, and data handling, and builds the habit of showing reasoning, so the final MYP year and its assessments are not a scramble. For students on the extended pathway, cleaner written method matters even more.",
        "The fit call should map where marks are actually lost and turn that into a steady weekly routine rather than scattered worksheets, using the time before MYP 5 well.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, recent feedback, whether the student is on standard or extended maths, weak topics, and whether independent practice gets done. Year 4 support works best when it is steady and forward-looking.",
        "Home tuition helps because written correction and accountability matter; online can work for focused students. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This MYP Year 4 page is self-canonical because its intent is the start of the senior MYP cycle, which is distinct from the general MYP page and from the MYP 5 page about the bridge into DP. Younger MYP students should use the broader IB MYP page.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB MYP with Ajay", "/ib-myp-maths-home-tutor/ajay-vatsyayan", "General MYP foundation support."),
      relatedLink("IB MYP 5 with Ajay", "/ib-myp-5-maths-home-tutor/ajay-vatsyayan", "The final MYP year this leads into."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share MYP year, pathway, and weak topics."),
    ],
    faqs: [
      faq("How is MYP 4 different from MYP 5?", "MYP 4 starts the senior cycle and builds the base; MYP 5 is the final year and the bridge into the Diploma. They are deliberately separate pages."),
      faq("Does the extended pathway matter in Year 4?", "Yes. The split between standard and extended maths starts to matter here, and the support should match the student's pathway."),
      faq("Is Ajay always needed in MYP 4?", "No. Some students only need routine practice. Ajay suits deeper base-building or senior mentoring before MYP 5."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on maturity, locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-myp-5",
    slug: "ib-myp-5-maths-home-tutor",
    title: "IB MYP Year 5 maths home tutor with Ajay Vatsyayan",
    badge: "IB MYP 5 to DP bridge mentor",
    breadcrumbLabel: "IB MYP 5 Maths",
    seoTitle: "IB MYP 5 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for IB MYP Year 5 maths when a student needs to consolidate before IB DP, steady on-screen assessment work, and a clearer AA-or-AI direction in Gurugram.",
    h1: "Ajay Vatsyayan for IB MYP Year 5 maths support in Gurugram",
    intro:
      "This page helps families in the final MYP year decide whether Ajay should be discussed as a senior mentor for consolidating maths before the IB Diploma, steadying assessment performance, and preparing for the AA-or-AI decision ahead.",
    focus: "IB MYP Year 5 consolidation and readiness for IB DP mathematics",
    audience: "IB MYP Year 5 students moving towards the Diploma Programme",
    chips: ["IB MYP 5", "DP readiness", "AA vs AI", "Premium schools"],
    stats: [
      { value: "MYP 5", label: "Final middle-years year" },
      { value: "Bridge", label: "MYP to DP transition" },
      { value: "Direction", label: "AA or AI clarity" },
    ],
    knowsAbout: ["IB MYP Mathematics", "Extended mathematics", "Algebra", "Functions", "Trigonometry", "Statistics and probability", "DP readiness"],
    fitBullets: [
      "Best for MYP Year 5 learners whose gaps could become costly once IB DP maths begins.",
      "Useful when the student needs to consolidate and choose an AA or AI direction with more confidence, not just finish homework.",
      "Home or online mode should be chosen after reviewing maturity, location, and study discipline.",
    ],
    contentSections: [
      contentSection("Why Year 5", "Why the final MYP year is its own conversation", [
        "IB MYP Year 5 is the last year of the Middle Years Programme and the direct run-up to the IB Diploma. Even students who have coped with maths so far can struggle here, because the gap between MYP expectations and DP expectations is wider than it looks from the outside. Procedural answers that used to be enough start to lose marks, and weak algebra, functions, or trigonometry quietly become a problem that often surfaces only once DP begins.",
        "This page is for families who want a senior mentor conversation specifically about that transition year. It is not presented as a generic middle-school tutor for every homework task. The fit call should decide whether Ajay's level suits the student now, or whether a different Maths Bodhi tutor is a better age-stage match for the remainder of MYP.",
      ]),
      contentSection("Consolidation", "What consolidation before DP actually means", [
        "A useful MYP 5 plan is less about racing ahead and more about closing the specific gaps that make the Diploma harder than it needs to be. That usually means firming up algebraic manipulation, functions and graphs, trigonometry, and data handling, and making sure the student can explain a method rather than only reach an answer. Students in extended or higher-tier MYP maths especially benefit from cleaner written reasoning before the DP workload arrives.",
        "The first sessions should map where marks are actually lost — arithmetic fluency, algebra, interpretation of word problems, geometry visualisation, or simply inconsistent practice — and turn that into a steady weekly routine. Rushing into scattered worksheets without that diagnosis tends to waste the limited time left before DP.",
      ]),
      contentSection("AA or AI", "Helping the AA-versus-AI decision come into focus", [
        "Towards the end of MYP, families begin asking whether the student should take DP Mathematics: Analysis and Approaches (AA) or Applications and Interpretation (AI), and at higher or standard level. A good MYP 5 mentor does not push a fixed answer; instead the work itself reveals whether the student copes with and enjoys abstract algebraic reasoning, which leans towards AA, or prefers modelling and applied, technology-supported maths, which leans towards AI.",
        "Ajay's role in a fit discussion is to give an honest read on which DP path looks realistic for the student's strengths and target subjects, so the family can choose with evidence rather than guesswork. Where the level looks borderline, the plan can focus on the skills that keep the harder option open for longer.",
      ]),
      contentSection("Assessment", "On-screen assessment and exam habits", [
        "Many MYP students sit on-screen (eAssessment) maths components, and all of them face more open, criterion-style questions than in younger years. The habits that matter are showing method clearly, justifying steps, investigating patterns, and applying maths to unfamiliar contexts. These are also exactly the habits the Diploma rewards, so building them in MYP 5 pays off twice.",
        "A senior tutor should help the student practise under realistic conditions, tidy written communication, and reduce avoidable mistakes, while keeping anxiety down. The aim is calmer, more reliable performance rather than last-minute cramming.",
      ]),
      contentSection("Route Boundaries", "Why this page is separate from general MYP and from IB DP", [
        "This MYP Year 5 page is self-canonical because its search intent is genuinely different. The general IB MYP page covers foundation repair and confidence across the whole programme, while the IB DP pages talk about AA, AI, IA planning, calculators, and final papers. This page sits deliberately between them: it is about the final MYP year and the bridge into DP.",
        "Families with a younger MYP student should use the broader IB MYP Ajay page, and families whose student is already in the Diploma should use the IB DP Ajay page. Anyone comparing the wider service can open the main IB Maths Home Tutor page before deciding whether to ask for Ajay specifically.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Understand Ajay's wider senior maths positioning."),
      relatedLink("IB MYP with Ajay", "/ib-myp-maths-home-tutor/ajay-vatsyayan", "Use this for general MYP foundation support across the programme."),
      relatedLink("IB DP with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Move here once the student is in Diploma maths."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share MYP year, school feedback, weak topics, and likely DP direction."),
    ],
    faqs: [
      faq("Is Ajay always the right tutor for an MYP Year 5 student?", "No. Some students need a younger-stage tutor for routine practice. Ajay should be discussed when the need is deeper consolidation, senior mentoring, or preparation for the DP maths jump."),
      faq("How is this different from the general IB MYP page?", "This page focuses only on the final MYP year and the move into IB DP — consolidation, the AA-or-AI decision, and assessment habits — rather than general MYP foundation support across all years."),
      faq("Can Ajay help my child choose between AA and AI?", "He can give an honest read during the fit discussion based on how the student handles abstract versus applied maths, but the final choice stays with the family and school."),
      faq("Does the page include hidden testimonials?", "No. It does not include fake testimonials, review structured data, or rating markup."),
      faq("Should parents choose home or online?", "That depends on maturity, attention span, location, and family timing. Maths Bodhi can discuss both options during enquiry."),
    ],
  }),
  createAjayPage({
    id: "ajay-igcse",
    slug: "igcse-maths-home-tutor",
    title: "IGCSE maths home tutor with Ajay Vatsyayan",
    badge: "IGCSE senior tutor option",
    breadcrumbLabel: "IGCSE Maths",
    seoTitle: "IGCSE Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Explore Ajay Vatsyayan as an IGCSE maths home tutor option for Core, Extended, paper practice, graph work, and senior support in Gurugram.",
    h1: "Ajay Vatsyayan for IGCSE maths home tuition in Gurugram",
    intro:
      "This page is for Cambridge IGCSE families deciding whether Ajay is the right senior tutor option for Extended or Core maths, exam-paper discipline, and method clarity.",
    focus: "Cambridge IGCSE Mathematics support",
    audience: "IGCSE Core and Extended students",
    chips: ["IGCSE", "Core", "Extended", "Past papers", "Graphs"],
    stats: [
      { value: "Core/Ext", label: "Syllabus fit" },
      { value: "Papers", label: "Practice rhythm" },
      { value: "Method", label: "Written clarity" },
    ],
    knowsAbout: ["IGCSE Mathematics", "IGCSE Extended Mathematics", "Algebra", "Graphs", "Geometry", "Probability"],
    fitBullets: [
      "Best for IGCSE students who need stronger written method and paper confidence.",
      "Useful when Core versus Extended expectations, school pace, and exam timing need a clearer plan.",
      "Ajay is one senior option; Maths Bodhi should confirm whether he is the best match after enquiry.",
    ],
    contentSections: [
      contentSection("IGCSE Context", "Why IGCSE maths needs paper-aware support", [
        "IGCSE maths students often need help translating understanding into marks. They may know a method in class but lose accuracy on mixed papers, graph questions, transformations, mensuration, probability, or algebraic manipulation. Extended learners face an additional challenge: questions can combine several ideas and punish weak written method even when the final answer is close.",
        "Ajay is positioned for families who want senior handling of these patterns. This does not mean every IGCSE student should use a senior tutor. If the student needs basic homework supervision, another verified Maths Bodhi tutor may be better. Ajay becomes relevant when the family wants a deeper diagnosis of paper performance, repeated errors, exam planning, and conceptual confidence.",
      ]),
      contentSection("Core And Extended", "How the plan changes by tier", [
        "A Core student may need confidence, coverage, and secure method before moving through the syllabus. An Extended student may need stronger algebra, functions, trigonometry, graph interpretation, proof-like reasoning, and careful practice across higher-demand questions. The enquiry should clarify tier, school board, exam series, target grade, and whether the student has already attempted past papers.",
        "The tutor plan should include more than assigning papers. A useful IGCSE routine reviews mistakes by type: concept gap, calculation slip, wording issue, graph-reading mistake, weak formula recall, or time pressure. Once the pattern is visible, each week can combine topic repair with short mixed practice so the student stops repeating the same avoidable errors.",
      ]),
      contentSection("Gurugram Families", "Home tuition and premium-school rhythm", [
        "Many IGCSE families in Gurugram are balancing school work, co-curricular commitments, and frequent assessments. Home tuition can help when travel time, attention, and written correction matter. Online support can work when the student is disciplined and can share attempted work clearly. Neither mode should be chosen only because it sounds convenient; the student's behaviour should drive the decision.",
        "Parents should share school, grade, tier, current marks, exam month, textbook or syllabus code if available, and weak chapters. If the student is unsure whether Extended is realistic, that should be discussed honestly. Ajay may be considered when the family wants a senior view on what is possible within the remaining time.",
      ]),
      contentSection("Page Quality", "Why this page is not merged with IB or CBSE", [
        "This page is self-canonical because IGCSE has its own paper style, tier structure, terminology, and parent questions. A page about CBSE Class 12 calculus or IB DP IA planning would not answer the same search intent. Keeping the IGCSE page separate helps families get relevant information without creating hundreds of keyword-swapped copies.",
        "Families still comparing the broader service can open the IGCSE Maths Home Tutor page or the Gurugram IGCSE route. This Ajay page should be used only when the family wants to discuss one senior tutor option inside that wider Maths Bodhi ecosystem.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "See Ajay's broader senior maths positioning."),
      relatedLink("IGCSE Maths Home Tutor", "/igcse-maths-home-tutor", "Compare the main IGCSE service page."),
      relatedLink("Gurugram IGCSE route", "/gurugram/igcse-maths-home-tutor", "Review locality-specific IGCSE support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share tier, exam month, weak chapters, and school context."),
    ],
    faqs: [
      faq("Is this page for IGCSE Core or Extended?", "It can support either enquiry, but the fit call should clarify tier, current marks, exam month, and whether the student needs confidence building or higher-demand paper practice."),
      faq("Can Ajay help with past-paper practice?", "Past-paper practice can be part of the plan, but the useful work is error analysis, topic repair, and method correction rather than simply assigning more papers."),
      faq("Why not create separate Core and Extended Ajay pages now?", "The site is intentionally starting with one strong IGCSE Ajay page to avoid thin duplicate pages. A separate Extended page can be added later only if the content becomes genuinely distinct."),
      faq("Does the page use fake ratings?", "No. It does not use fake ratings, aggregate rating markup, or review structured data."),
      faq("Is home tuition always better for IGCSE?", "No. Home tuition helps some students, while online can work for disciplined learners. The mode should be chosen after the fit discussion."),
    ],
  }),
  createAjayPage({
    id: "ajay-cbse-maths",
    slug: "cbse-maths-home-tutor",
    title: "CBSE maths home tutor with Ajay Vatsyayan",
    badge: "CBSE senior maths mentor",
    breadcrumbLabel: "CBSE Maths",
    seoTitle: "CBSE Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for CBSE maths home tuition across Classes 9 to 12 in Gurugram, with senior support, concept repair, and board planning.",
    h1: "Ajay Vatsyayan for CBSE maths home tuition in Gurugram",
    intro:
      "This page helps CBSE families decide whether Ajay should be discussed as a senior maths mentor across the school years, and points each class to its own more specific page.",
    focus: "CBSE Mathematics across Classes 9 to 12",
    audience: "CBSE students from the foundation years through the board years",
    chips: ["CBSE 9-12", "Concept repair", "Boards", "Senior mentor"],
    stats: [
      { value: "9-12", label: "Full CBSE journey" },
      { value: "Base", label: "Foundation to boards" },
      { value: "Fit", label: "Right class, right plan" },
    ],
    knowsAbout: ["CBSE Mathematics", "Algebra", "Trigonometry", "Coordinate geometry", "Calculus", "Board exam preparation"],
    fitBullets: [
      "Best when a CBSE student needs senior maths mentoring rather than only routine homework help.",
      "Useful when weak foundations from earlier classes are now affecting current performance.",
      "The right class-specific plan and mode (home or online) should be set during the fit call.",
    ],
    contentSections: [
      contentSection("Across The Classes", "How CBSE maths builds from Class 9 to Class 12", [
        "CBSE maths is cumulative. The algebra and geometry of Class 9 feed the board year in Class 10, and the abstraction of Class 11 (sets, functions, and the first calculus) decides how smoothly Class 12 and entrance preparation go. A weak link in an earlier class often shows up as a sudden drop two years later, which is why a senior mentor looks at the whole chain rather than only the current chapter.",
        "This page is the general CBSE entry point for Ajay. It is not a claim that every CBSE student needs him; many do well with regular practice supervision. It helps parents decide whether a senior maths conversation is worth having, and then sends them to the page for their child's exact class.",
      ]),
      contentSection("Where Gaps Start", "Finding the real weak point", [
        "The fit call should locate where the trouble actually began. A Class 11 student struggling with limits may really be weak in Class 9 algebra; a Class 10 board slump may come from shaky fundamentals rather than board pressure itself. Treating the symptom without finding the root tends to waste the limited time families have.",
        "A good plan separates conceptual gaps from speed and carelessness, fixes the foundation in the right order, and builds a steady weekly practice rhythm. Senior mentoring helps most when the student also does the work between sessions.",
      ]),
      contentSection("Right Level", "Choosing levels and streams along the way", [
        "CBSE has decision points that matter. In Class 10, students choose between Standard and Basic mathematics, which affects whether they can continue maths in Class 11. In Class 11, the move into senior-secondary maths and the question of entrance exams (JEE, BITSAT, CUET) shape how the subject should be taught. Getting these calls right early prevents painful corrections later.",
        "Ajay's role in a fit discussion is to give an honest read on level and direction based on the student's strengths, not to push a fixed answer. The family and school keep the final decision.",
      ]),
      contentSection("Route Boundaries", "Why this hub is separate from the class pages", [
        "This page is self-canonical because it serves the general CBSE intent. The specific Class 9, 10, 11, and 12 pages go deeper into each year's syllabus and pressures, while the broader CBSE Maths Tuition route helps families compare the wider service. This hub simply helps parents decide whether to discuss Ajay, then routes them to the right class.",
        "The page avoids guaranteed-marks claims, fake reviews, and rating markup. It is a decision guide, not a sales promise.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("CBSE Class 9 with Ajay", "/cbse-class-9-maths-home-tutor/ajay-vatsyayan", "Foundation-year support."),
      relatedLink("CBSE Class 10 with Ajay", "/cbse-class-10-maths-home-tutor/ajay-vatsyayan", "First board-year support."),
      relatedLink("CBSE Class 11 with Ajay", "/cbse-class-11-maths-home-tutor/ajay-vatsyayan", "Senior-secondary jump support."),
      relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "Board-year and calculus support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share class, recent marks, and weak chapters."),
    ],
    faqs: [
      faq("Which CBSE classes does this cover?", "This is the general CBSE entry page. For detailed help, use the specific Class 9, 10, 11, or 12 page linked above."),
      faq("Is Ajay needed for every CBSE student?", "No. Many students do well with routine practice supervision. Ajay suits deeper concept repair, senior mentoring, or board and entrance balancing."),
      faq("Can earlier-class gaps really affect later marks?", "Yes. CBSE maths is cumulative, so a weak Class 9 or 10 base often surfaces as a Class 11 or 12 struggle."),
      faq("Does this page guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "That depends on locality, timing, and the student's study discipline, and is decided during the enquiry."),
    ],
  }),
  createAjayPage({
    id: "ajay-cbse-class-9",
    slug: "cbse-class-9-maths-home-tutor",
    title: "CBSE Class 9 maths home tutor with Ajay Vatsyayan",
    badge: "CBSE Class 9 foundation support",
    breadcrumbLabel: "CBSE Class 9 Maths",
    seoTitle: "CBSE Class 9 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for CBSE Class 9 maths home tuition in Gurugram, building strong foundations in algebra, geometry, and method before the board years.",
    h1: "Ajay Vatsyayan for CBSE Class 9 maths home tuition",
    intro:
      "This page helps CBSE Class 9 families decide whether Ajay should be discussed for building a strong maths foundation before the Class 10 board year.",
    focus: "CBSE Class 9 Mathematics",
    audience: "Class 9 students laying the groundwork for the board years",
    chips: ["CBSE Class 9", "Foundations", "Algebra", "Geometry proofs"],
    stats: [
      { value: "Class 9", label: "Foundation year" },
      { value: "Base", label: "Before the boards" },
      { value: "Method", label: "Proof and reasoning" },
    ],
    knowsAbout: ["CBSE Class 9 Mathematics", "Number systems", "Polynomials", "Coordinate geometry", "Linear equations in two variables", "Geometry and mensuration"],
    fitBullets: [
      "Best when a Class 9 student has wobbly fundamentals that could become costly in the Class 10 board year.",
      "Useful for building algebraic fluency and proper geometry reasoning rather than only finishing homework.",
      "Fit should be checked against current understanding, study habits, and how much support the student actually needs.",
    ],
    contentSections: [
      contentSection("Foundation Year", "Why Class 9 quietly matters", [
        "Class 9 is not a board year, so the pressure feels low, but it is exactly where the base for Class 10 is built. Number systems, polynomials, linear equations in two variables, coordinate geometry, and the first formal geometry proofs all become assumed knowledge in Class 10. Students who only memorise answers here often hit a wall once the board year demands real understanding.",
        "Ajay is positioned for families who want a senior mentor to set strong habits early. This is not a claim that every Class 9 student needs that. Some need only regular practice; others benefit from someone fixing reasoning and method before bad habits harden. The page helps parents decide whether to discuss Ajay during the enquiry.",
      ]),
      contentSection("Method Over Memory", "Building reasoning, not rote", [
        "The biggest Class 9 risk is treating maths as patterns to copy. Geometry proofs, algebraic identities, and word problems reward students who can explain why a step works. A good plan builds that habit now, so the student writes clean, logical steps instead of guessing in the board year.",
        "The fit call should check whether the student is weak in arithmetic fluency, algebra, geometry visualisation, or simply consistency, and turn that into a calm weekly routine rather than last-minute cramming before school tests.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share the school, locality, recent test performance, comfort with NCERT, and whether the student completes practice independently. Foundation-year tutoring works best when it is steady and unhurried, not crisis-driven.",
        "Home tuition can help because written correction and accountability matter at this age. Online can work for focused students. Maths Bodhi should decide the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This Class 9 page is self-canonical because foundation-year intent is genuinely different from board-year intent. The Class 10, 11, and 12 pages deal with board pressure and senior topics; this one is about building the base. The general CBSE Maths page helps families compare the wider service.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("CBSE maths hub with Ajay", "/cbse-maths-home-tutor/ajay-vatsyayan", "See the full CBSE overview."),
      relatedLink("CBSE Class 10 with Ajay", "/cbse-class-10-maths-home-tutor/ajay-vatsyayan", "The board year this foundation leads into."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share recent marks, weak topics, and study habits."),
    ],
    faqs: [
      faq("Is Class 9 too early for a senior tutor?", "Not necessarily. Some students only need routine practice, but others benefit from fixing reasoning and method early, before the board year."),
      faq("What does Class 9 support focus on?", "Building algebraic fluency, geometry reasoning, and clean method, so the Class 10 board year starts from a strong base."),
      faq("How is this different from the Class 10 page?", "Class 9 is about foundations without board pressure; Class 10 is the first board year with exam strategy. They are deliberately separate."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and the student's study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-cbse-class-10",
    slug: "cbse-class-10-maths-home-tutor",
    title: "CBSE Class 10 maths home tutor with Ajay Vatsyayan",
    badge: "CBSE Class 10 board support",
    breadcrumbLabel: "CBSE Class 10 Maths",
    seoTitle: "CBSE Class 10 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for CBSE Class 10 maths home tuition in Gurugram, with board strategy, the Standard-versus-Basic choice, and senior exam support.",
    h1: "Ajay Vatsyayan for CBSE Class 10 maths home tuition",
    intro:
      "This page helps CBSE Class 10 families decide whether Ajay should be discussed for first-board-year maths, exam technique, and the Standard-versus-Basic decision.",
    focus: "CBSE Class 10 Mathematics",
    audience: "Class 10 students facing their first CBSE board exam",
    chips: ["CBSE Class 10", "First boards", "Standard vs Basic", "Exam technique"],
    stats: [
      { value: "Class 10", label: "First board year" },
      { value: "Std/Basic", label: "Level decision" },
      { value: "Boards", label: "Exam strategy" },
    ],
    knowsAbout: ["CBSE Class 10 Mathematics", "Real numbers", "Quadratic equations", "Arithmetic progressions", "Trigonometry", "Coordinate geometry", "Board exam preparation"],
    fitBullets: [
      "Best when a Class 10 student needs board-exam strategy and clean method, not only chapter practice.",
      "Useful when the Standard-versus-Basic choice and the question of continuing maths in Class 11 are on the table.",
      "Fit should be checked against current marks, target score, and weekly practice discipline.",
    ],
    contentSections: [
      contentSection("First Boards", "Why the first board year needs a plan", [
        "Class 10 is most students' first CBSE board exam, and the jump is as much about exam temperament as about content. Quadratic equations, arithmetic progressions, trigonometry, coordinate geometry, and applied geometry all reward students who show clean steps and manage time under pressure. Pre-boards often expose gaps quickly when the student has not built a correction routine.",
        "Ajay is positioned for families who want senior support during this first board year. This is not a claim that every Class 10 student needs him; some need only practice supervision. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Standard Or Basic", "Getting the level decision right", [
        "CBSE Class 10 offers Standard and Basic mathematics, and the choice matters: Standard keeps the door open to taking maths in Class 11, while Basic generally does not. The right call depends on the student's strength, interest, and likely stream. Choosing under panic, or choosing Basic and later wanting maths, creates avoidable problems.",
        "Ajay's role in a fit discussion is to give an honest read on which level is realistic, so the family and school decide with evidence. Where the call is borderline, the plan can focus on the skills that keep Standard within reach.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, locality, recent marks, pre-board schedule, target score, NCERT comfort, and whether the student completes assigned work. Board-year tutoring depends on the weekly rhythm as much as the live session.",
        "Home tuition helps because written correction and accountability matter under board pressure. Online can still work for disciplined students. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This Class 10 page is self-canonical because first-board-year intent is distinct. The Class 9 page is about foundations; the Class 11 and 12 pages deal with senior topics and the second board year. This page is about the first boards and the Standard-or-Basic decision. The general CBSE Maths page compares the wider service.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("CBSE maths hub with Ajay", "/cbse-maths-home-tutor/ajay-vatsyayan", "See the full CBSE overview."),
      relatedLink("CBSE Class 9 with Ajay", "/cbse-class-9-maths-home-tutor/ajay-vatsyayan", "The foundation year before this."),
      relatedLink("CBSE Class 11 with Ajay", "/cbse-class-11-maths-home-tutor/ajay-vatsyayan", "Where Standard maths leads next."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share marks, target score, and the level decision."),
    ],
    faqs: [
      faq("Can Ajay help with the Standard-versus-Basic choice?", "He can give an honest read during the fit discussion based on the student's strength and likely stream, but the final choice stays with the family and school."),
      faq("Does choosing Basic affect Class 11?", "Generally yes. Standard maths keeps the option to continue maths in Class 11 open, while Basic usually does not."),
      faq("What does Class 10 support focus on?", "Board exam strategy, clean method, time management, and closing the specific gaps that lose marks under pressure."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-cbse-class-11",
    slug: "cbse-class-11-maths-home-tutor",
    title: "CBSE Class 11 maths home tutor with Ajay Vatsyayan",
    badge: "CBSE Class 11 senior jump support",
    breadcrumbLabel: "CBSE Class 11 Maths",
    seoTitle: "CBSE Class 11 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for CBSE Class 11 maths home tuition in Gurugram, handling the senior-secondary jump, sets, functions, and the first calculus.",
    h1: "Ajay Vatsyayan for CBSE Class 11 maths home tuition",
    intro:
      "This page helps CBSE Class 11 families decide whether Ajay should be discussed for the hardest transition in school maths and the base it sets for Class 12 and entrance exams.",
    focus: "CBSE Class 11 Mathematics",
    audience: "Class 11 students moving into senior-secondary maths",
    chips: ["CBSE Class 11", "Sets and functions", "First calculus", "JEE base"],
    stats: [
      { value: "Class 11", label: "Senior-secondary jump" },
      { value: "Calculus", label: "Limits and derivatives" },
      { value: "Base", label: "For Class 12 and JEE" },
    ],
    knowsAbout: ["CBSE Class 11 Mathematics", "Sets relations and functions", "Trigonometric functions", "Complex numbers", "Sequences and series", "Conic sections", "Limits and derivatives"],
    fitBullets: [
      "Best when a student who did well in Class 10 suddenly finds Class 11 abstraction hard.",
      "Useful when the Class 11 base also needs to support Class 12 and entrance preparation (JEE, BITSAT, CUET).",
      "Fit should be checked against current understanding, target stream, and weekly practice discipline.",
    ],
    contentSections: [
      contentSection("The Big Jump", "Why Class 11 trips up strong students", [
        "Class 11 is the steepest jump in CBSE maths. Sets, relations and functions, trigonometric functions, complex numbers, sequences and series, conic sections, and the first limits and derivatives demand abstract reasoning that Class 10 never asked for. It is common for students who scored well in the boards to suddenly struggle here, because memorising answers no longer works.",
        "Ajay is positioned for families who want a senior mentor through this transition. This is not a claim that every Class 11 student needs him; some adapt with practice alone. The page helps parents decide whether to discuss Ajay when the jump feels overwhelming.",
      ]),
      contentSection("Building The Base", "Why this year decides Class 12 and entrance", [
        "Class 11 is not a board year, which tempts students to relax, but its topics are the foundation for Class 12 calculus and for JEE, BITSAT, and CUET maths. Weak functions, trigonometry, or limits here become a heavy burden in Class 12. A good plan treats Class 11 as the year to build genuine understanding, not just pass school tests.",
        "The fit call should separate conceptual gaps from speed and carelessness, and decide how much entrance-style thinking to introduce without overloading school maths. Board-style clarity and entrance-style selection are different skills, and the balance should suit the student.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, locality, recent marks, target stream and exams, NCERT and reference-book use, and whether the student completes independent practice. Senior tutoring at this stage depends heavily on the student doing the work between sessions.",
        "Home tuition helps because abstraction needs careful written correction and accountability. Online can work for disciplined students who submit work and ask focused questions. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This Class 11 page is self-canonical because the senior-secondary jump is distinct intent. The Class 9 and 10 pages are about foundations and the first boards; the Class 12 page is about the second board year and deeper calculus. This page is about the transition year and the base it builds. The general CBSE Maths page compares the wider service.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("CBSE maths hub with Ajay", "/cbse-maths-home-tutor/ajay-vatsyayan", "See the full CBSE overview."),
      relatedLink("CBSE Class 10 with Ajay", "/cbse-class-10-maths-home-tutor/ajay-vatsyayan", "The board year before this."),
      relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "Where this base leads next."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share marks, target stream, and weak topics."),
    ],
    faqs: [
      faq("Why do strong Class 10 students struggle in Class 11?", "Class 11 demands abstract reasoning (sets, functions, calculus) that memorisation cannot handle, so the approach has to change, not just the effort."),
      faq("Is Class 11 important even though it is not a board year?", "Yes. It is the foundation for Class 12 calculus and for JEE, BITSAT, and CUET maths, so gaps here are costly later."),
      faq("Can Ajay prepare a student for entrance exams too?", "That can be discussed and balanced carefully so entrance-style work does not overload school maths."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-cbse-class-12",
    slug: "cbse-class-12-maths-home-tutor",
    title: "CBSE Class 12 maths home tutor with Ajay Vatsyayan",
    badge: "CBSE Class 12 senior support",
    breadcrumbLabel: "CBSE Class 12 Maths",
    seoTitle: "CBSE Class 12 Maths Home Tutor Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for CBSE Class 12 maths home tuition, calculus, vectors, 3D geometry, probability, board planning, and senior support in Gurugram.",
    h1: "Ajay Vatsyayan for CBSE Class 12 maths home tuition",
    intro:
      "This page helps CBSE Class 12 families decide whether Ajay should be discussed for board-year maths support, calculus depth, exam structure, and disciplined revision.",
    focus: "CBSE Class 12 Mathematics",
    audience: "Class 12 students preparing for boards and senior-school maths exams",
    chips: ["CBSE Class 12", "Calculus", "Vectors", "3D Geometry", "Boards"],
    stats: [
      { value: "Class 12", label: "Senior board focus" },
      { value: "Calc", label: "Calculus depth" },
      { value: "Boards", label: "Revision planning" },
    ],
    knowsAbout: ["CBSE Class 12 Mathematics", "Calculus", "Vectors", "Three dimensional geometry", "Probability", "Board exam preparation"],
    fitBullets: [
      "Best for students who need senior support across calculus, vectors, 3D geometry, probability, and board-style writing.",
      "Useful when school tests, pre-boards, entrance preparation, and revision pressure are overlapping.",
      "Fit should be checked against current marks, timeline, target score, and weekly practice discipline.",
    ],
    contentSections: [
      contentSection("Board-Year Pressure", "Why Class 12 needs a structured plan", [
        "CBSE Class 12 maths can become heavy because chapters are cumulative and marks depend on method, accuracy, and practice rhythm. A student may understand differentiation in isolation but struggle when application of derivatives, integrals, differential equations, vectors, and 3D geometry compete for revision time. Pre-boards can expose these gaps quickly, especially when the student has not built a repeatable correction routine.",
        "Ajay is positioned for families who want senior support during this pressure. This is not a claim that every Class 12 student needs him. Some students need regular practice supervision, while others need deeper conceptual repair and exam planning. The purpose of this page is to help parents decide whether Ajay should be discussed during the Maths Bodhi enquiry.",
      ]),
      contentSection("Topic Priorities", "How the support should be diagnosed", [
        "The fit call should identify whether the student is weak in calculus concepts, algebraic manipulation, vector geometry, probability logic, or presentation. Each weakness needs a different response. A student making sign errors in integration needs different correction from a student who cannot interpret a 3D geometry question. A good plan should separate conceptual errors from speed errors and careless mistakes.",
        "If the student is also preparing for JEE Main, CUET, BITSAT, or school entrance tests, the plan must prevent overload. Board maths requires clean steps and predictable marks; entrance maths rewards speed, selection, and pattern recognition. Ajay may be relevant when the student needs a senior mentor to balance both styles without losing board performance.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, locality, recent marks, pre-board schedule, target score, NCERT comfort, reference book use, and weak chapters. They should also say whether the student completes assigned work between classes. Senior tutoring cannot help fully if the student does not attempt practice; the weekly rhythm matters as much as the live session.",
        "Home tuition can be valuable for Class 12 because written correction and accountability matter. Online support can still work for disciplined students who submit work and ask focused questions. Maths Bodhi should decide the best mode after checking location, timing, and the student's study behaviour.",
      ]),
      contentSection("Canonical Purpose", "Why this page is different from generic Class 12 routes", [
        "This Ajay page is self-canonical because it is about one senior tutor option within CBSE Class 12 intent. It does not replace the broader CBSE Maths Tuition page or the Gurugram Class 12 route. Those pages help families compare the service; this page helps them decide whether Ajay should be part of the conversation.",
        "The page avoids fake success claims and does not include review or rating schema. Families should use it as a decision guide, then discuss actual availability, mode, fee, and fit with Maths Bodhi.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("Gurugram Class 12 route", "/gurugram/class-12-maths-home-tutor", "Compare local Class 12 tutor support."),
      relatedLink("CBSE Maths Tuition", "/cbse-maths-tuition", "Review the broader CBSE route."),
      relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "Use this if speed-based entrance preparation is also important."),
    ],
    faqs: [
      faq("Is this page only for CBSE students?", "Yes, this page is written for CBSE Class 12 maths intent. Students from other boards should use the relevant IB, IGCSE, or exam-specific Ajay page."),
      faq("Can Ajay help with both boards and entrance maths?", "That can be discussed. The plan should separate board-style writing from entrance speed and avoid overloading the student."),
      faq("What should parents share before the fit call?", "Share recent marks, weak chapters, school, locality, pre-board dates, target score, and whether the student completes independent practice."),
      faq("Does the page claim guaranteed marks?", "No. It avoids guaranteed marks, fake outcomes, fake reviews, and rating markup."),
      faq("Is this page self-canonical?", "Yes. It has distinct CBSE Class 12 content and appears in the sitemap as its own approved URL."),
    ],
  }),
  createAjayPage({
    id: "ajay-icse",
    slug: "icse-maths-home-tutor",
    title: "ICSE maths home tutor with Ajay Vatsyayan",
    badge: "ICSE board maths support",
    breadcrumbLabel: "ICSE Maths",
    seoTitle: "ICSE Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for ICSE Class 10 maths home tuition in Gurugram, covering the thorough CISCE syllabus, commercial maths, and board exam method.",
    h1: "Ajay Vatsyayan for ICSE maths home tuition in Gurugram",
    intro:
      "This page helps ICSE families decide whether Ajay should be discussed for the detailed CISCE Class 10 maths syllabus, commercial maths, and board exam writing.",
    focus: "ICSE Class 10 Mathematics (CISCE)",
    audience: "ICSE students preparing for the CISCE board maths exam",
    chips: ["ICSE", "CISCE board", "Commercial maths", "Board method"],
    stats: [
      { value: "ICSE", label: "CISCE Class 10" },
      { value: "Wide", label: "Thorough syllabus" },
      { value: "Method", label: "Step-marked answers" },
    ],
    knowsAbout: ["ICSE Mathematics", "Commercial mathematics", "Geometry", "Trigonometry", "Mensuration", "Statistics and probability", "Board exam preparation"],
    fitBullets: [
      "Best when an ICSE student needs senior support across a wide, application-heavy syllabus, not only homework help.",
      "Useful for commercial maths (GST, banking, shares and dividends) and step-marked geometry and trigonometry.",
      "Fit should be checked against current marks, target score, and weekly practice discipline.",
    ],
    contentSections: [
      contentSection("ICSE Character", "What makes ICSE maths its own challenge", [
        "ICSE maths, set by CISCE, is known for being broad and application-heavy. Alongside algebra, geometry, trigonometry, mensuration, and statistics, it carries commercial maths such as GST, banking, and shares and dividends that other boards do not emphasise. The paper rewards thorough, well-presented working, so students who skip steps tend to lose marks even when the final answer is right.",
        "Ajay is positioned for families who want senior support across this wide syllabus. This is not a claim that every ICSE student needs him; some need only practice supervision. The page helps parents decide whether a senior maths conversation is worth having for the board year.",
      ]),
      contentSection("Method And Marks", "Why presentation matters in ICSE", [
        "ICSE marking is method-sensitive: clear, sequenced steps earn marks that a rushed answer loses. The fit call should check whether the student is weak in commercial-maths setups, geometry reasoning, trigonometric identities, or simply presentation and time management, because each needs a different fix.",
        "A good plan turns that diagnosis into a steady routine of practised, well-written solutions rather than scattered last-minute revision before school tests and pre-boards.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, locality, recent marks, target score, comfort with the prescribed textbook, and whether the student completes assigned work. ICSE's wide syllabus rewards a consistent weekly rhythm.",
        "Home tuition helps because written correction and accountability matter for a method-marked paper. Online can work for disciplined students. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This ICSE page is self-canonical because ICSE Class 10 intent is distinct from CBSE and from the senior ISC years. The ISC page covers Class 11 and 12 CISCE maths; the CBSE pages cover a different board entirely. This page is specifically about ICSE board maths.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("ISC with Ajay", "/isc-maths-home-tutor/ajay-vatsyayan", "For CISCE Class 11 and 12 maths."),
      relatedLink("CBSE maths hub with Ajay", "/cbse-maths-home-tutor/ajay-vatsyayan", "Compare the CBSE board route."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share marks, target score, and weak topics."),
    ],
    faqs: [
      faq("How is ICSE maths different from CBSE?", "ICSE is broader and more application-heavy, including commercial maths like GST, banking, and shares and dividends, and it rewards thorough step-by-step presentation."),
      faq("What does ICSE support focus on?", "Covering the wide syllabus, mastering commercial maths, and writing step-marked solutions that hold up under board marking."),
      faq("Is this page for Class 11 and 12 too?", "No. ICSE is the Class 10 exam. For CISCE Class 11 and 12, use the ISC page."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-isc",
    slug: "isc-maths-home-tutor",
    title: "ISC maths home tutor with Ajay Vatsyayan",
    badge: "ISC senior maths support",
    breadcrumbLabel: "ISC Maths",
    seoTitle: "ISC Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for ISC Class 11 and 12 maths home tuition in Gurugram, with calculus depth, the sectioned paper, and senior board support.",
    h1: "Ajay Vatsyayan for ISC maths home tuition in Gurugram",
    intro:
      "This page helps ISC families decide whether Ajay should be discussed for the rigorous CISCE Class 11 and 12 maths course, calculus depth, and board planning.",
    focus: "ISC Class 11 and 12 Mathematics (CISCE)",
    audience: "ISC students in the senior CISCE years",
    chips: ["ISC", "CISCE senior", "Calculus", "Sectioned paper"],
    stats: [
      { value: "ISC", label: "CISCE Class 11-12" },
      { value: "Calc", label: "Calculus depth" },
      { value: "Boards", label: "Exam planning" },
    ],
    knowsAbout: ["ISC Mathematics", "Calculus", "Probability", "Vectors", "Three dimensional geometry", "Linear programming", "Board exam preparation"],
    fitBullets: [
      "Best when an ISC student needs senior support across calculus, probability, vectors, and the sectioned paper.",
      "Useful when board maths overlaps with entrance or college preparation and needs balancing.",
      "Fit should be checked against current marks, target score, and weekly practice discipline.",
    ],
    contentSections: [
      contentSection("ISC Rigour", "Why ISC maths is demanding", [
        "ISC maths, the CISCE senior course, is rigorous and wide. It carries heavy calculus (differentiation, integration, and differential equations), probability, vectors, three dimensional geometry, and linear programming, and the paper is split into a compulsory section and choice-based sections. Depth and accuracy both matter, so cumulative gaps surface quickly under pre-board pressure.",
        "Ajay is positioned for families who want senior support through these years. This is not a claim that every ISC student needs him; some need only practice supervision. The page helps parents decide whether a senior maths conversation is worth having.",
      ]),
      contentSection("Section Strategy", "Handling calculus and the sectioned paper", [
        "The fit call should identify whether the student is weak in calculus concepts, algebraic manipulation, probability logic, vector and 3D geometry, or presentation, because each needs a different response. The sectioned paper also rewards smart choice of optional questions, which is a skill in itself.",
        "A good plan separates conceptual errors from speed and careless mistakes, and builds a steady routine of full, well-written solutions rather than last-minute cramming.",
      ]),
      contentSection("Gurugram Home Tuition", "What parents should clarify", [
        "Parents should share school, locality, recent marks, pre-board schedule, target score, textbook and reference use, and whether the student completes independent practice. Senior tutoring depends on the weekly rhythm as much as the live session.",
        "Home tuition helps because written correction and accountability matter for a depth-heavy paper. Online can work for disciplined students who submit work. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This ISC page is self-canonical because senior CISCE intent is distinct from ICSE Class 10 and from CBSE. The ICSE page covers the Class 10 board; the CBSE pages cover a different board. This page is specifically about ISC Class 11 and 12 maths.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("ICSE with Ajay", "/icse-maths-home-tutor/ajay-vatsyayan", "For the CISCE Class 10 board."),
      relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "Compare senior CBSE maths support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share marks, target score, and weak topics."),
    ],
    faqs: [
      faq("How is ISC different from ICSE?", "ICSE is the CISCE Class 10 exam; ISC is the senior Class 11 and 12 course, which is far more rigorous and calculus-heavy."),
      faq("What does ISC support focus on?", "Calculus depth, probability and vectors, smart handling of the sectioned paper, and clean, full solutions for senior board marking."),
      faq("Can Ajay help balance boards and entrance?", "That can be discussed and planned so entrance-style work does not undermine board performance."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-maths",
    slug: "jee-maths-home-tutor",
    title: "JEE maths home tutor with Ajay Vatsyayan",
    badge: "JEE maths senior mentor",
    breadcrumbLabel: "JEE Maths",
    seoTitle: "JEE Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for JEE maths home tuition in Gurugram, covering both JEE Main and Advanced, with speed, selection, and concept depth.",
    h1: "Ajay Vatsyayan for JEE maths home tuition in Gurugram",
    intro:
      "This page is the general JEE maths entry point for Ajay, helping families decide on senior support across JEE Main and Advanced, and pointing each to its own page.",
    focus: "JEE Mathematics across Main and Advanced",
    audience: "Students preparing for JEE Main and JEE Advanced maths",
    chips: ["JEE Main", "JEE Advanced", "Speed and selection", "Concept depth"],
    stats: [
      { value: "JEE", label: "Main and Advanced" },
      { value: "Speed", label: "Timed selection" },
      { value: "Depth", label: "Advanced problem solving" },
    ],
    knowsAbout: ["JEE Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Trigonometry", "Vectors and 3D", "Problem solving"],
    fitBullets: [
      "Best when a student needs senior maths mentoring across JEE Main and Advanced, not only formula drilling.",
      "Useful when board maths and JEE-style speed and selection have to be balanced.",
      "Fit should be checked against current level, target exam, timeline, and practice discipline.",
    ],
    contentSections: [
      contentSection("What JEE Maths Demands", "Why JEE maths is its own skill", [
        "JEE maths is different from board maths. It rewards speed, accurate selection of the right method, and the nerve to skip and return, on top of genuine concept depth. JEE Main tests broad, fast accuracy; JEE Advanced adds multi-step, unfamiliar problems that punish shallow preparation. A student strong in boards can still find JEE hard if they have never trained for timed selection.",
        "This page is the general JEE entry point for Ajay. It is not a claim that every JEE aspirant needs him; many use coaching plus self-practice. It helps parents decide whether senior mentoring is worth discussing, then routes them to the Main or Advanced page.",
      ]),
      contentSection("Main Or Advanced", "Matching the plan to the target", [
        "The fit call should be clear about whether the immediate target is JEE Main, JEE Advanced, or both, because the training differs. Main rewards consistent speed and accuracy across a wide syllabus; Advanced rewards deeper problem solving and resilience on hard, unfamiliar questions. Mixing the two without a plan tends to leave a student mediocre at both.",
        "Ajay's role in a fit discussion is to give an honest read on the realistic target and the gap to close, so the family plans with evidence rather than pressure.",
      ]),
      contentSection("Balancing Boards", "Protecting school performance", [
        "Most JEE aspirants also have board exams. Board maths needs clean, full steps and predictable marks; JEE needs speed and selection. A good plan keeps both alive instead of sacrificing boards for JEE or vice versa, and sets a weekly rhythm the student can actually sustain.",
        "Home tuition can help with accountability and correction; online can work for disciplined students. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this hub is separate from the exam pages", [
        "This page is self-canonical because it serves general JEE maths intent. The JEE Main and JEE Advanced pages go deeper into each exam, and several similar URLs (such as IIT-JEE phrasings) point here. This hub helps families decide whether to discuss Ajay, then sends them to the right exam page.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE Main with Ajay", "/jee-main-maths-home-tutor/ajay-vatsyayan", "For JEE Main-focused preparation."),
      relatedLink("JEE Advanced with Ajay", "/jee-advanced-maths-home-tutor/ajay-vatsyayan", "For JEE Advanced-focused preparation."),
      relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "If BITSAT is also a target."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share target exam, current level, and timeline."),
    ],
    faqs: [
      faq("Does this page cover both JEE Main and Advanced?", "Yes, as an overview. For focused help, use the JEE Main or JEE Advanced page linked above."),
      faq("How is JEE maths different from board maths?", "JEE rewards speed, method selection, and depth under time pressure; boards reward clean, complete steps. They are different skills that need different training."),
      faq("Can Ajay help balance boards and JEE?", "That can be discussed and planned so neither boards nor JEE preparation is sacrificed for the other."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-main",
    slug: "jee-main-maths-home-tutor",
    title: "JEE Main maths home tutor with Ajay Vatsyayan",
    badge: "JEE Main senior mentor option",
    breadcrumbLabel: "JEE Main Maths",
    seoTitle: "JEE Main Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Explore Ajay Vatsyayan for JEE Main maths support, chapter selection, timed practice, error review, and senior home tuition planning in Gurugram.",
    h1: "Ajay Vatsyayan for JEE Main maths home tuition",
    intro:
      "This page is for JEE Main aspirants and parents deciding whether Ajay is the right senior maths mentor for speed, accuracy, chapter strategy, and disciplined mock review.",
    focus: "JEE Main Mathematics preparation",
    audience: "JEE Main aspirants balancing school and entrance maths",
    chips: ["JEE Main", "Timed practice", "Mock review", "Algebra", "Calculus"],
    stats: [
      { value: "Main", label: "Exam focus" },
      { value: "Speed", label: "Timed practice" },
      { value: "Errors", label: "Review discipline" },
    ],
    knowsAbout: ["JEE Main Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Trigonometry", "Mock test analysis"],
    fitBullets: [
      "Best for aspirants who need a senior review of chapter priorities, accuracy, and repeated mistakes.",
      "Useful when school board preparation and JEE Main practice are competing for the same week.",
      "The first enquiry should clarify target attempt, current percentile range if known, and weak chapters.",
    ],
    contentSections: [
      contentSection("JEE Main Intent", "Why JEE Main support is not the same as board tuition", [
        "JEE Main maths rewards speed, selection, accuracy, and comfort with mixed concepts. A student can be good in school maths but still lose time in JEE because they choose long methods, miss shortcuts, or repeat the same algebraic mistakes under pressure. The tutor conversation should therefore focus on how the student attempts questions, not only which chapters have been covered.",
        "Ajay is positioned for families who want senior guidance on this exam rhythm. This page does not promise percentile gains or rank outcomes. It explains when Ajay should be discussed as a mentor option and what information the family should bring to the Maths Bodhi fit call.",
      ]),
      contentSection("Chapter Strategy", "What the plan should prioritise", [
        "JEE Main preparation often improves when chapter work is organised by scoring potential, current weakness, and time left. Calculus, coordinate geometry, algebra, trigonometry, vectors, 3D geometry, probability, and sequences all demand different kinds of practice. A senior tutor should help the student decide where to repair fundamentals, where to practise speed, and where to stop wasting time on low-return work.",
        "Mock analysis is just as important. After a test, the student should know whether mistakes came from concept gaps, calculation slips, misreading, time pressure, poor question selection, or panic. Without that classification, the next week becomes random practice. Ajay may be useful when the family wants this kind of structured review.",
      ]),
      contentSection("Home Tuition Fit", "How Gurugram families should plan sessions", [
        "For Gurugram students, home tuition can help when the learner needs accountability after school or coaching. However, the tutor should not simply duplicate coaching material. The value lies in targeted correction, personalised review, and helping the student make better decisions between sessions. Online support may also work if the student is disciplined and can share attempted work clearly.",
        "Parents should share current class, school board, coaching status, target attempt, mock scores if available, chapter confidence, and weekly time. A student in Class 12 with boards nearby needs a different balance from a dropper or Class 11 student building foundations.",
      ]),
      contentSection("Page Boundaries", "Why JEE Main and JEE Advanced are separate", [
        "This page is self-canonical because JEE Main intent is not identical to JEE Advanced intent. Main preparation places heavy emphasis on speed, breadth, and accuracy under objective-question pressure. Advanced preparation adds deeper multi-step reasoning and problem selection. Keeping the pages separate helps families choose the right conversation without reading a generic JEE page.",
        "Families can still compare the wider JEE Maths Coaching page or the JEE Advanced Ajay page before enquiring. This limited cluster keeps the site useful without producing dozens of near-duplicate exam pages.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "See Ajay's broader senior maths positioning."),
      relatedLink("JEE Advanced with Ajay", "/jee-advanced-maths-home-tutor/ajay-vatsyayan", "Use this if deeper Advanced-style problem solving is the main need."),
      relatedLink("JEE Maths Coaching", "/jee-maths-coaching", "Compare the broader JEE Maths Bodhi route."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share target attempt, mock pattern, and weak chapters."),
    ],
    faqs: [
      faq("Is this page for JEE Main only?", "Yes. It focuses on JEE Main speed, accuracy, chapter planning, and mock review. JEE Advanced has a separate Ajay page."),
      faq("Can Ajay replace coaching?", "This page does not position Ajay as a replacement for every coaching setup. He may be discussed for personalised correction, planning, and senior mentoring."),
      faq("What should students bring to the first discussion?", "Recent mock scores, attempted papers, weak chapters, coaching status, target attempt, and board-exam pressure are useful for diagnosis."),
      faq("Does this page promise percentile improvement?", "No. It avoids guaranteed results, fake ratings, and review markup."),
      faq("Is the URL in the sitemap?", "Yes, it is intended as a self-canonical Ajay intent page with distinct JEE Main content."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-advanced",
    slug: "jee-advanced-maths-home-tutor",
    title: "JEE Advanced maths home tutor with Ajay Vatsyayan",
    badge: "JEE Advanced senior mentor option",
    breadcrumbLabel: "JEE Advanced Maths",
    seoTitle: "JEE Advanced Maths Home Tutor Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for JEE Advanced maths mentoring, deeper problem solving, proof-style reasoning, error review, and Gurugram home tuition planning.",
    h1: "Ajay Vatsyayan for JEE Advanced maths mentoring",
    intro:
      "This page helps serious JEE Advanced aspirants decide whether Ajay should be discussed for deeper problem solving, multi-concept practice, and senior-level review.",
    focus: "JEE Advanced Mathematics preparation",
    audience: "Aspirants who need deeper problem-solving support beyond routine JEE Main practice",
    chips: ["JEE Advanced", "Problem solving", "Multi-concept", "Proof-style thinking"],
    stats: [
      { value: "Advanced", label: "Exam depth" },
      { value: "Multi-step", label: "Problem style" },
      { value: "Review", label: "Error analysis" },
    ],
    knowsAbout: ["JEE Advanced Mathematics", "Advanced calculus", "Algebra", "Coordinate geometry", "Combinatorics", "Problem solving"],
    fitBullets: [
      "Best for students who already practise seriously and need deeper correction, not basic motivation alone.",
      "Useful when the learner struggles with multi-concept questions, time allocation, and method selection.",
      "The family should share attempted Advanced-level work before expecting a useful fit recommendation.",
    ],
    contentSections: [
      contentSection("Advanced Demand", "Why JEE Advanced needs a different conversation", [
        "JEE Advanced maths is less forgiving than routine objective practice. Questions often combine concepts, require interpretation, and punish superficial pattern matching. A student may know formulas but fail to see the structure of a problem, choose a path that becomes too long, or abandon a question before recognising a solvable transformation.",
        "Ajay is positioned for families who need a senior mentor conversation around this deeper layer. The first question should not be whether the student wants a famous tutor. It should be whether the student is ready to attempt serious problems, review mistakes honestly, and follow a disciplined correction plan between sessions.",
      ]),
      contentSection("Problem Review", "What a useful Advanced plan should include", [
        "A strong JEE Advanced plan should classify errors by concept gap, method choice, algebraic execution, diagram interpretation, time allocation, and emotional decision-making. If every wrong question is simply marked as a mistake, the student learns very little. The review should identify why the chosen method failed and what signal could have led to a better approach.",
        "Topics such as coordinate geometry, calculus, algebra, vectors, probability, and combinatorics need different training styles. Some require visualisation; others require symbolic control or case analysis. Ajay may be relevant where the family wants a tutor who can slow down the student's thinking and rebuild problem selection, not simply push more questions.",
      ]),
      contentSection("Fit And Readiness", "Who should not rush into this page", [
        "Not every JEE aspirant needs an Advanced-specific mentor immediately. If the student is weak in basics or has not built JEE Main accuracy, the first step may be foundation repair. A premature Advanced plan can create frustration. Maths Bodhi should use the enquiry to judge readiness from attempted work, mock scores, and the student's ability to explain their own mistakes.",
        "For Gurugram families, home tuition may help when the student needs live correction and accountability. Online mentoring may work when the student is already disciplined and can send attempted solutions. The mode is secondary to the quality of the problem review and the student's willingness to practise.",
      ]),
      contentSection("Cluster Control", "Why this is one of only a few Ajay exam pages", [
        "This page is self-canonical because the JEE Advanced intent is distinct from JEE Main and BITSAT. It is not a keyword-swapped copy of those pages. Advanced preparation asks for deeper reasoning, better abandonment decisions, and stronger solution analysis.",
        "The site intentionally limits Ajay exam pages to high-intent cases. If future data shows another exam has genuinely distinct parent questions and enough useful content, it can be added later. Until then, avoiding thin pages is better for users and for search quality.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's overall senior tutor profile."),
      relatedLink("JEE Main with Ajay", "/jee-main-maths-home-tutor/ajay-vatsyayan", "Use this if speed and objective accuracy are the main issue."),
      relatedLink("JEE Advanced Maths Coaching", "/jee-advanced-maths-coaching", "Compare the broader Maths Bodhi Advanced route."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share attempted Advanced questions and mock patterns."),
    ],
    faqs: [
      faq("Is this page for beginners?", "Usually no. Students with major basics gaps may need foundation repair before Advanced-specific mentoring."),
      faq("What makes Advanced support different?", "The focus is deeper problem analysis, method selection, multi-concept thinking, and disciplined review rather than only speed practice."),
      faq("Can this be online?", "Possibly, if the student is disciplined and can share attempted solutions clearly. Home tuition can help when accountability and live correction matter more."),
      faq("Does this page include rank claims?", "No. It avoids rank promises, guaranteed outcomes, ratings, and review structured data."),
      faq("Why is this separate from JEE Main?", "JEE Advanced has different problem depth and preparation style, so the content and canonical URL are intentionally separate."),
    ],
  }),
  createAjayPage({
    id: "ajay-bitsat",
    slug: "bitsat-maths-home-tutor",
    title: "BITSAT maths home tutor with Ajay Vatsyayan",
    badge: "BITSAT speed and accuracy option",
    breadcrumbLabel: "BITSAT Maths",
    seoTitle: "BITSAT Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Explore Ajay Vatsyayan for BITSAT maths support, speed, accuracy, board overlap, timed practice, and senior home tuition planning in Gurugram.",
    h1: "Ajay Vatsyayan for BITSAT maths home tuition planning",
    intro:
      "This page is for families considering Ajay for BITSAT maths, especially when the student must balance board revision, JEE work, speed practice, and accuracy under time pressure.",
    focus: "BITSAT Mathematics preparation",
    audience: "BITSAT aspirants balancing board exams, JEE preparation, and speed-based maths practice",
    chips: ["BITSAT", "Speed", "Accuracy", "Board overlap", "Timed practice"],
    stats: [
      { value: "BITSAT", label: "Exam route" },
      { value: "Speed", label: "Fast attempts" },
      { value: "Balance", label: "Boards plus entrance" },
    ],
    knowsAbout: ["BITSAT Mathematics", "Algebra", "Calculus", "Coordinate geometry", "Speed practice", "Exam strategy"],
    fitBullets: [
      "Best for students who need a faster, cleaner practice rhythm after board or JEE preparation.",
      "Useful when accuracy drops because the student rushes or chooses inefficient methods.",
      "The plan should be based on mock behaviour, not generic BITSAT advice.",
    ],
    contentSections: [
      contentSection("BITSAT Intent", "Why BITSAT deserves a separate Ajay page", [
        "BITSAT maths has a different feel from board exams and even from JEE Advanced preparation. The student needs speed, breadth, and low-error execution across familiar topics. Many aspirants have studied the content already but are not efficient enough under time pressure. They lose marks through slow algebra, poor question selection, panic guessing, or weak revision of chapters they assumed were easy.",
        "Ajay is positioned here as a senior option when the family wants a focused BITSAT discussion. This page is not a claim that BITSAT support is always separate from JEE support. It is separate because the parent question is different: how can the student convert existing preparation into faster, cleaner attempts while still protecting board and JEE work?",
      ]),
      contentSection("Practice Strategy", "What a BITSAT plan should check", [
        "A useful plan should identify whether the student's problem is concept coverage, speed, accuracy, or endurance. If concepts are weak, speed practice will only hide the issue. If concepts are mostly ready, the student may need timed sets, formula recall, mental calculation habits, and sharper decisions about when to move on. The review should be based on actual attempted mocks or chapter tests.",
        "Topics like calculus, algebra, coordinate geometry, probability, and trigonometry should be revised with exam behaviour in mind. The student needs to recognise standard forms quickly, avoid unnecessary long methods, and keep accuracy high. Ajay may be relevant if the learner needs senior correction rather than another pile of unsorted questions.",
      ]),
      contentSection("Boards And JEE Overlap", "How to avoid overload", [
        "BITSAT often sits near board exams and JEE attempts, so planning matters. A student who is exhausted from multiple tracks may practise randomly and feel busy without improving. The tutor conversation should decide which chapters overlap, which errors are urgent, and how many timed sets are realistic in a week.",
        "Parents should share board status, JEE preparation status, target BITSAT attempt, recent mock scores, and the student's strongest and weakest maths areas. This gives Maths Bodhi enough context to decide whether Ajay is appropriate or whether another tutor or route would be more practical.",
      ]),
      contentSection("Sitemap Discipline", "Why this is included despite no broad BITSAT cluster", [
        "The current site may not have a large BITSAT page cluster, but this Ajay page is still useful because the business goal specifically includes BITSAT and the content is distinct from JEE Main and JEE Advanced. It is not a hidden doorway page; it is visible, linked, self-canonical, and connected back to the main Ajay profile and demo route.",
        "If a broader BITSAT Maths Bodhi route is added later, this page can link to it naturally. Until then, it should remain limited to Ajay-specific senior mentoring context and should not be multiplied into thin variants.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read the broader Ajay profile before enquiring."),
      relatedLink("JEE Main with Ajay", "/jee-main-maths-home-tutor/ajay-vatsyayan", "Compare if JEE Main is still the primary exam."),
      relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "Use this if board-year planning is the bigger issue."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share mock scores, target attempt, and board/JEE overlap."),
    ],
    faqs: [
      faq("Why create a BITSAT Ajay page if there is no broad BITSAT cluster yet?", "The business goal includes BITSAT and the content is distinct: speed, accuracy, board overlap, and timed practice. The page is limited and self-canonical."),
      faq("Is BITSAT support the same as JEE support?", "Not exactly. There is overlap in topics, but BITSAT usually demands faster execution and a different practice rhythm."),
      faq("What should a student share before enquiry?", "Mock scores, target attempt, board status, JEE status, weak topics, and examples of repeated mistakes are helpful."),
      faq("Does this page make score guarantees?", "No. It makes no score guarantees and includes no fake review or rating markup."),
      faq("Can Ajay help only with maths, not the full BITSAT paper?", "This page is specifically about maths support. Families needing full-test planning should explain that during the enquiry."),
    ],
  }),
  createAjayPage({
    id: "ajay-engineering-entrance",
    slug: "engineering-entrance-maths-tutor",
    title: "Engineering entrance maths tutor with Ajay Vatsyayan",
    badge: "Engineering entrance maths mentor",
    breadcrumbLabel: "Engineering Entrance Maths",
    seoTitle: "Engineering Entrance Maths Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for engineering entrance maths in Gurugram, across JEE, BITSAT, and state and private CETs, with speed, selection, and concept depth.",
    h1: "Ajay Vatsyayan for engineering entrance maths in Gurugram",
    intro:
      "This page is the broad engineering-entrance entry point for Ajay, for students targeting several exams, and it points each specific exam to its own page.",
    focus: "Mathematics for engineering entrance exams (JEE, BITSAT, and CETs)",
    audience: "Students preparing for one or more engineering entrance exams",
    chips: ["JEE", "BITSAT", "State CETs", "Multiple targets"],
    stats: [
      { value: "Many", label: "JEE, BITSAT, CETs" },
      { value: "Speed", label: "Timed accuracy" },
      { value: "Plan", label: "Multi-exam strategy" },
    ],
    knowsAbout: ["Engineering entrance mathematics", "JEE Mathematics", "BITSAT Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Problem solving"],
    fitBullets: [
      "Best when a student is aiming at several engineering exams and needs one coherent maths plan, not scattered prep.",
      "Useful when JEE, BITSAT, and state or private CETs all sit on the table with different patterns.",
      "Fit should be checked against target exams, current level, timeline, and practice discipline.",
    ],
    contentSections: [
      contentSection("The Wider Landscape", "Why engineering entrance is more than JEE", [
        "Many students aim beyond JEE alone. BITSAT, and state and private CETs such as MHT-CET, WBJEE, COMEDK, VITEEE, and SRMJEEE, each have their own pattern, pace, and emphasis. The maths overlaps a lot, but the exam behaviour differs, and a student preparing only for one pattern can be caught out by another. This page exists for families weighing several targets at once.",
        "Ajay is positioned as a senior mentor who can help build one coherent maths plan across these exams. This is not a claim that every aspirant needs him; many use coaching plus practice. The page helps parents decide whether senior mentoring is worth discussing, then routes them to the specific exam page.",
      ]),
      contentSection("One Plan, Many Exams", "Avoiding scattered preparation", [
        "The fit call should clarify which exams genuinely matter and in what order, because preparing for everything equally usually means doing none of them well. The shared core (calculus, algebra, coordinate geometry, trigonometry) can be built once, then tuned for each exam's speed and question style.",
        "A good plan sets a sustainable weekly rhythm and protects board performance, rather than chasing every exam at the cost of all of them.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share target exams, current level, timeline, school board, and whether the student completes independent practice. The more focused the target list, the sharper the plan can be.",
        "Home tuition helps with accountability and correction; online can work for disciplined students. Maths Bodhi should set the mode after checking location, timing, and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this hub is separate", [
        "This page is self-canonical because it serves the broad engineering-entrance intent. The specific JEE Main, JEE Advanced, and BITSAT pages go deeper into each exam; this hub is for students juggling several. It does not replace those pages, it routes to them.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE maths with Ajay", "/jee-maths-home-tutor/ajay-vatsyayan", "The JEE overview page."),
      relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "For BITSAT-focused preparation."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share target exams, level, and timeline."),
    ],
    faqs: [
      faq("How is this different from the JEE page?", "This page is for students targeting several engineering exams (JEE, BITSAT, CETs). For one exam, use its specific page."),
      faq("Which exams does it cover?", "JEE Main and Advanced, BITSAT, and state or private CETs such as MHT-CET, WBJEE, COMEDK, VITEEE, and SRMJEEE."),
      faq("Can one plan really cover several exams?", "The shared maths core can be built once, then tuned per exam. The fit call should prioritise which exams matter most."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-advanced-maths",
    slug: "advanced-maths-home-tutor",
    title: "Advanced maths home tutor with Ajay Vatsyayan",
    badge: "Advanced maths enrichment mentor",
    breadcrumbLabel: "Advanced Maths",
    seoTitle: "Advanced Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for advanced maths home tuition in Gurugram, for students who want genuine depth and enrichment beyond their regular syllabus.",
    h1: "Ajay Vatsyayan for advanced maths home tuition in Gurugram",
    intro:
      "This page helps families decide whether Ajay should be discussed for students who want advanced maths beyond their syllabus, for depth, enrichment, or early college-level foundations.",
    focus: "Advanced and enrichment mathematics beyond the standard syllabus",
    audience: "Students who are ahead and want genuine mathematical depth",
    chips: ["Enrichment", "Beyond syllabus", "Depth", "College-level base"],
    stats: [
      { value: "Depth", label: "Beyond the syllabus" },
      { value: "Ahead", label: "For advanced students" },
      { value: "Base", label: "Early college foundations" },
    ],
    knowsAbout: ["Advanced mathematics", "Calculus", "Algebra", "Proof", "Problem solving", "Enrichment mathematics"],
    fitBullets: [
      "Best for students who have outgrown standard syllabus help and want genuine mathematical depth.",
      "Useful for enrichment, early college-level foundations, or strengthening reasoning beyond exam needs.",
      "Fit should be checked against current level, goals, and how much challenge the student actually wants.",
    ],
    contentSections: [
      contentSection("Beyond The Syllabus", "Who this page is for", [
        "Some students are simply ahead. They finish the school syllabus comfortably and want to go further, into deeper calculus, genuine proof, harder problem solving, or early college-level foundations. Standard homework help bores them, and exam drilling does not stretch them. This page is for families who want a senior mentor to feed that appetite properly.",
        "Ajay is positioned for this kind of depth-seeking student. This is not a claim that every strong student needs extra maths; many are well served by their school. The page helps parents decide whether a senior enrichment conversation is worth having.",
      ]),
      contentSection("Real Challenge", "What advanced support looks like", [
        "Advanced work is not just harder worksheets. It means building real understanding, the habit of proof and justification, and the confidence to tackle unfamiliar problems without a template. The fit call should check what the student actually wants: competition-style problem solving, deeper theory, or a head start on college maths, since each points to a different plan.",
        "A good plan stretches the student without overwhelming their regular schoolwork, and keeps the challenge genuine rather than performative.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the student's current level, what is no longer challenging them, their goals, and how much extra time they have. Enrichment works best when it is driven by genuine interest rather than pressure.",
        "Home tuition suits deep, discussion-heavy work; online can work for self-driven students. Maths Bodhi should set the mode after checking location, timing, and the student's appetite.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because its intent is depth and enrichment beyond the syllabus, which is distinct from exam pages (JEE, BITSAT), board pages (CBSE, IB, IGCSE), and the olympiad page. Students chasing a specific exam or board should use those pages instead.",
        "It avoids guaranteed outcomes, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("Olympiad maths with Ajay", "/olympiad-maths-home-tutor/ajay-vatsyayan", "If competition maths is the real goal."),
      relatedLink("JEE maths with Ajay", "/jee-maths-home-tutor/ajay-vatsyayan", "If an engineering exam is the goal."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share current level, goals, and interests."),
    ],
    faqs: [
      faq("Who is advanced maths for?", "Students who are ahead of their syllabus and want genuine depth, enrichment, or early college-level foundations, rather than routine help."),
      faq("Is this the same as olympiad coaching?", "Not exactly. Olympiad coaching targets competitions specifically; this page is broader enrichment and depth. Use the olympiad page if competitions are the goal."),
      faq("Will it overload my child's schoolwork?", "A good plan stretches the student without crowding out regular school maths, and is driven by interest rather than pressure."),
      faq("Does it guarantee outcomes?", "No. It avoids guaranteed outcomes, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and the student's appetite."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-main-crash",
    slug: "jee-main-maths-crash-course",
    title: "JEE Main maths crash course with Ajay Vatsyayan",
    badge: "JEE Main maths crash mentor",
    breadcrumbLabel: "JEE Main Maths Crash",
    seoTitle: "JEE Main Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for a JEE Main maths crash course in Gurugram, a short intensive focus on high-yield topics, speed, and accuracy before the exam.",
    h1: "Ajay Vatsyayan for a JEE Main maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive JEE Main maths push that consolidates high-yield topics before the exam.",
    focus: "Short intensive JEE Main mathematics revision",
    audience: "JEE Main aspirants in the final stretch before the exam",
    chips: ["JEE Main", "Crash course", "High-yield topics", "Speed"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Yield", label: "High-return topics" },
      { value: "Speed", label: "Timed accuracy" },
    ],
    knowsAbout: ["JEE Main Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Trigonometry", "Timed problem solving"],
    fitBullets: [
      "Best for students who already have a base and need a focused JEE Main consolidation, not a first teaching of the syllabus.",
      "Useful when time is short and the priority is high-yield topics, speed, and accuracy.",
      "Fit should be checked against current level, time left, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "A JEE Main maths crash course is a short, intensive consolidation in the final stretch. It is most effective for students who have studied the syllabus and need to sharpen, prioritise, and stabilise, not for students starting maths from scratch with little time left. Being honest about that up front prevents disappointment.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every aspirant needs a crash course; some are better served by steady long-term preparation. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("High-Yield Focus", "Where the limited time should go", [
        "With little time, the plan must target the topics that return the most marks in JEE Main and the student's specific weak areas. The fit call should identify whether the gap is conceptual, speed-based, or careless error, because cramming everything equally wastes the short window.",
        "A good crash plan mixes rapid concept revision with timed practice, so the student converts knowledge into marks under exam pressure.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the exam date, current mock scores, weak chapters, and whether the student can sustain intensive daily practice. A crash course only works if the student does the work between sessions.",
        "Home tuition helps with accountability; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because crash-course intent is distinct from regular JEE Main tuition. The JEE Main page covers full preparation; this one is the short, intensive final push. Related crash phrasings point here.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE Main with Ajay", "/jee-main-maths-home-tutor/ajay-vatsyayan", "Full JEE Main preparation."),
      relatedLink("JEE Advanced crash with Ajay", "/jee-advanced-maths-crash-course/ajay-vatsyayan", "If Advanced is also a target."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share exam date, mock scores, and weak topics."),
    ],
    faqs: [
      faq("Who is a crash course for?", "Students who already have a base and need a short, focused consolidation before JEE Main, not those starting the syllabus from scratch with little time."),
      faq("How is this different from full JEE Main tuition?", "Full tuition builds the syllabus over time; a crash course is a short, intensive push on high-yield topics and exam technique."),
      faq("Can a crash course alone get a good score?", "It can sharpen an existing base, but it cannot replace months of preparation. Expectations should be honest."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-advanced-crash",
    slug: "jee-advanced-maths-crash-course",
    title: "JEE Advanced maths crash course with Ajay Vatsyayan",
    badge: "JEE Advanced maths crash mentor",
    breadcrumbLabel: "JEE Advanced Maths Crash",
    seoTitle: "JEE Advanced Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for a JEE Advanced maths crash course in Gurugram, a short intensive on hard, multi-step problems and exam temperament before the exam.",
    h1: "Ajay Vatsyayan for a JEE Advanced maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive JEE Advanced maths push focused on hard problems and exam temperament.",
    focus: "Short intensive JEE Advanced mathematics problem-solving",
    audience: "JEE Advanced aspirants polishing in the final stretch",
    chips: ["JEE Advanced", "Crash course", "Hard problems", "Depth"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Hard", label: "Multi-step problems" },
      { value: "Nerve", label: "Exam temperament" },
    ],
    knowsAbout: ["JEE Advanced Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Vectors and 3D", "Advanced problem solving"],
    fitBullets: [
      "Best for students with a solid base who need polish on hard, unfamiliar JEE Advanced problems.",
      "Useful when the gap is depth and resilience rather than coverage of the syllabus.",
      "Fit should be checked against current level, time left, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "A JEE Advanced maths crash course is a short, intensive polish for students who already have a genuine base. Advanced rewards depth and the ability to handle unfamiliar, multi-step problems, so a crash course here is about sharpening problem-solving and nerve, not teaching the syllabus from zero. It will not rescue a student who has not built the foundation.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every aspirant needs a crash course; some need longer, steadier preparation. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("Hard Problems", "Where the limited time should go", [
        "Advanced is won on hard questions, so the plan should drill multi-step problems, smart selection, and the discipline to stay calm on unfamiliar setups. The fit call should check whether the student freezes on hard problems, makes avoidable errors, or simply needs more exposure, because each needs a different response.",
        "A good crash plan uses timed, Advanced-level practice and honest review of mistakes, so the student improves under realistic pressure.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the exam date, current standing, weak areas, and whether the student can sustain intensive problem practice. A crash course only works if the student engages fully between sessions.",
        "Home tuition helps with focused correction; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because Advanced crash intent is distinct from full Advanced tuition and from the Main crash course. The JEE Advanced page covers full preparation; this is the short, intensive polish on hard problems.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE Advanced with Ajay", "/jee-advanced-maths-home-tutor/ajay-vatsyayan", "Full JEE Advanced preparation."),
      relatedLink("JEE Main crash with Ajay", "/jee-main-maths-crash-course/ajay-vatsyayan", "The Main-focused crash course."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share exam date, standing, and weak areas."),
    ],
    faqs: [
      faq("How is this different from the Main crash course?", "Main crash work focuses on speed and high-yield coverage; Advanced crash work focuses on hard, multi-step problem solving and temperament."),
      faq("Who should take an Advanced crash course?", "Students with a solid base who need polish on difficult problems, not students still missing the foundation."),
      faq("Can it fix a weak foundation in time?", "No. It sharpens an existing base. A weak foundation needs longer preparation, and the fit call should say so honestly."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-bitsat-crash",
    slug: "bitsat-maths-crash-course",
    title: "BITSAT maths crash course with Ajay Vatsyayan",
    badge: "BITSAT maths crash mentor",
    breadcrumbLabel: "BITSAT Maths Crash",
    seoTitle: "BITSAT Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for a BITSAT maths crash course in Gurugram, a short intensive on speed and accuracy for the fast, time-pressured BITSAT pattern.",
    h1: "Ajay Vatsyayan for a BITSAT maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive BITSAT maths push built around the exam's speed and time pressure.",
    focus: "Short intensive BITSAT mathematics speed practice",
    audience: "BITSAT aspirants in the final stretch before the exam",
    chips: ["BITSAT", "Crash course", "Speed", "Time pressure"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Fast", label: "High-speed pattern" },
      { value: "Accuracy", label: "Under pressure" },
    ],
    knowsAbout: ["BITSAT Mathematics", "Algebra", "Calculus", "Coordinate geometry", "Trigonometry", "Timed problem solving"],
    fitBullets: [
      "Best for students with a base who need to adapt to the fast, time-pressured BITSAT pattern.",
      "Useful when accuracy holds but speed and exam temperament are the problem.",
      "Fit should be checked against current level, time left, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "A BITSAT maths crash course is a short, intensive push focused on the exam's defining feature: speed. BITSAT gives very little time per question, so the crash work is about converting an existing base into fast, accurate answers, not teaching the syllabus from scratch. Students without the foundation will not be rescued by a few intensive weeks.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every aspirant needs a crash course; some need steadier preparation. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("Speed Pattern", "Where the limited time should go", [
        "BITSAT rewards quick recognition and accurate execution under pressure. The plan should drill timed sets, smart question order, and clean mental method, so the student stops losing marks to the clock. The fit call should check whether the issue is speed, accuracy, or nerves.",
        "A good crash plan rehearses the BITSAT rhythm specifically, rather than treating it like a slower board paper.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the exam date, current mock performance, weak areas, and whether the student can sustain intensive timed practice. The BITSAT pattern needs deliberate rehearsal.",
        "Home tuition helps with accountability; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because BITSAT crash intent is distinct from full BITSAT tuition and from JEE crash courses. The BITSAT page covers full preparation; this is the short, speed-focused push for the BITSAT pattern.",
        "It avoids guaranteed scores, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "Full BITSAT preparation."),
      relatedLink("JEE Main crash with Ajay", "/jee-main-maths-crash-course/ajay-vatsyayan", "If JEE Main is also a target."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share exam date, mock scores, and weak areas."),
    ],
    faqs: [
      faq("What makes a BITSAT crash course different?", "BITSAT is unusually time-pressured, so the crash work centres on speed and accuracy under the clock, more than on new content."),
      faq("Who should take it?", "Students with a base who need to adapt to the fast BITSAT pattern, not students still missing the foundation."),
      faq("Can it replace full preparation?", "No. It converts an existing base into faster, more accurate answers. The fit call should keep expectations honest."),
      faq("Does it guarantee a score?", "No. It avoids guaranteed scores, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-board-exam-crash",
    slug: "board-exam-maths-crash-course",
    title: "Board exam maths crash course with Ajay Vatsyayan",
    badge: "Board exam maths crash mentor",
    breadcrumbLabel: "Board Exam Maths Crash",
    seoTitle: "Board Exam Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for a board exam maths crash course in Gurugram, a short intensive on revision, sample papers, and step-marked presentation before boards.",
    h1: "Ajay Vatsyayan for a board exam maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive board maths push focused on revision, sample papers, and scoring presentation.",
    focus: "Short intensive board exam mathematics revision",
    audience: "Class 10 and 12 students in the final stretch before board exams",
    chips: ["Board exam", "Crash course", "Sample papers", "Presentation"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Papers", label: "Sample-paper drilling" },
      { value: "Marks", label: "Step-marked method" },
    ],
    knowsAbout: ["Board exam mathematics", "Revision strategy", "Sample papers", "Exam presentation", "Time management"],
    fitBullets: [
      "Best for students who know the syllabus but need to convert it into board marks in limited time.",
      "Useful for sample-paper practice, step-marked presentation, and time management.",
      "Fit should be checked against current marks, target score, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "A board exam maths crash course is a short, intensive revision push in the final stretch before Class 10 or 12 boards. It works best for students who have covered the syllabus and need to convert that into marks through revision, sample papers, and clean presentation, rather than learning whole chapters for the first time.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every student needs a crash course; many do well with steady school revision. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("Marks In The Method", "Where the limited time should go", [
        "Board marks reward clean, sequenced steps and predictable method. The plan should drill sample and previous-year papers, fix presentation, and manage time, while targeting the chapters where the student loses the most marks. The fit call should separate conceptual gaps from careless errors and slow writing.",
        "A good crash plan rehearses full papers under timed conditions, so the student walks in with a tested routine rather than nerves.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the board (CBSE, ICSE, or other), class, exam dates, recent marks, target score, and whether the student completes practice papers. Board crash work depends on consistent paper practice.",
        "Home tuition helps with written correction; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because board crash intent is distinct from regular board tuition and from entrance crash courses. The class-specific CBSE pages cover full preparation; this is the short, intensive revision push before boards, and related board-revision phrasings point here.",
        "It avoids guaranteed marks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("CBSE Class 12 with Ajay", "/cbse-class-12-maths-home-tutor/ajay-vatsyayan", "Full Class 12 board preparation."),
      relatedLink("CBSE Class 10 with Ajay", "/cbse-class-10-maths-home-tutor/ajay-vatsyayan", "Full Class 10 board preparation."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share board, class, exam dates, and target score."),
    ],
    faqs: [
      faq("Which boards does this cover?", "It is a general board crash course for Class 10 and 12 maths (such as CBSE and ICSE). For full preparation, use the class-specific pages."),
      faq("What does the crash work focus on?", "Revision, sample and previous-year papers, step-marked presentation, and time management to convert knowledge into marks."),
      faq("Can it cover chapters never studied?", "Not realistically in limited time. It works best as revision of a syllabus already covered."),
      faq("Does it guarantee marks?", "No. It avoids guaranteed marks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-igcse-crash",
    slug: "igcse-maths-crash-course",
    title: "IGCSE maths crash course with Ajay Vatsyayan",
    badge: "IGCSE maths crash mentor",
    breadcrumbLabel: "IGCSE Maths Crash",
    seoTitle: "IGCSE Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for an IGCSE maths crash course in Gurugram, a short intensive on past papers, Extended topics, and exam technique before the exam.",
    h1: "Ajay Vatsyayan for an IGCSE maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive IGCSE maths push focused on past papers and exam technique.",
    focus: "Short intensive IGCSE mathematics revision",
    audience: "IGCSE students in the final stretch before the exam",
    chips: ["IGCSE", "Crash course", "Past papers", "Exam technique"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Papers", label: "Past-paper drilling" },
      { value: "Technique", label: "Marks and method" },
    ],
    knowsAbout: ["IGCSE Mathematics", "Extended mathematics", "Algebra", "Trigonometry", "Past papers", "Exam technique"],
    fitBullets: [
      "Best for IGCSE students who know the content but need past-paper practice and exam technique in limited time.",
      "Useful for tightening Extended-tier topics and presentation before the exam.",
      "Fit should be checked against current grade, target grade, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "An IGCSE maths crash course is a short, intensive push before the Cambridge or Edexcel exam. It is most effective for students who have covered the syllabus and need past-paper practice, exam technique, and confidence on the harder Extended topics, rather than first-time teaching of whole units.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every IGCSE student needs a crash course; many do well with steady revision. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("Past Papers", "Where the limited time should go", [
        "IGCSE rewards familiarity with the paper style and clean method. The plan should drill past papers, target the Extended-tier topics that lose marks, and tighten presentation and timing. The fit call should identify whether the gap is specific topics, technique, or exam nerves.",
        "A good crash plan rehearses full papers under timed conditions, so the student knows the format cold.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the exam board, tier (Core or Extended), exam dates, recent grades, target grade, and whether the student completes past papers. IGCSE crash work depends on real paper practice.",
        "Home tuition helps with written correction; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because IGCSE crash intent is distinct from regular IGCSE tuition and from board crash courses. The IGCSE page covers full preparation; this is the short, intensive past-paper push.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IGCSE with Ajay", "/igcse-maths-home-tutor/ajay-vatsyayan", "Full IGCSE preparation."),
      relatedLink("IB DP crash with Ajay", "/ib-dp-maths-crash-course/ajay-vatsyayan", "If the student is heading into IB DP."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share board, tier, exam dates, and target grade."),
    ],
    faqs: [
      faq("Who is an IGCSE crash course for?", "Students who have covered the syllabus and need past-paper practice and exam technique, not those learning whole units for the first time."),
      faq("Does it cover Extended topics?", "Yes, it can target the Extended-tier topics that commonly lose marks, depending on the student's tier and needs."),
      faq("Can it replace a full course?", "No. It is revision and exam polish for content already studied. The fit call keeps expectations honest."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed grades, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-dp-crash",
    slug: "ib-dp-maths-crash-course",
    title: "IB DP maths crash course with Ajay Vatsyayan",
    badge: "IB DP maths crash mentor",
    breadcrumbLabel: "IB DP Maths Crash",
    seoTitle: "IB DP Maths Crash Course Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for an IB DP maths crash course in Gurugram, a short intensive on paper technique and revision across AA and AI before the exams.",
    h1: "Ajay Vatsyayan for an IB DP maths crash course",
    intro:
      "This page helps families decide whether Ajay should be discussed for a short, intensive IB DP maths push focused on paper technique and revision before the exams.",
    focus: "Short intensive IB DP mathematics revision (AA and AI)",
    audience: "IB DP students revising maths in the final stretch",
    chips: ["IB DP", "Crash course", "Paper technique", "AA and AI"],
    stats: [
      { value: "Short", label: "Time-bound push" },
      { value: "Papers", label: "Exam technique" },
      { value: "AA/AI", label: "Either course" },
    ],
    knowsAbout: ["IB DP Mathematics", "Analysis and Approaches", "Applications and Interpretation", "Calculus", "Statistics", "Exam technique"],
    fitBullets: [
      "Best for IB DP students who have studied the course and need focused revision and paper technique before exams.",
      "Useful across both AA and AI, tuned to the student's course and level.",
      "Fit should be checked against current grade, target grade, and practice discipline.",
    ],
    contentSections: [
      contentSection("What A Crash Course Is", "Honest expectations", [
        "An IB DP maths crash course is a short, intensive revision push before the final exams. The IB course runs two years, so a crash course cannot teach it from scratch; it works best for students who have covered the material and need to consolidate, fix weak topics, and sharpen paper technique across Papers 1, 2, and (for HL) 3.",
        "Ajay is positioned as a senior mentor for this focused push. This is not a claim that every DP student needs a crash course; many do well with steady revision. The page helps parents decide whether a short intensive plan makes sense.",
      ]),
      contentSection("Paper Technique", "Where the limited time should go", [
        "The plan should target the student's course (AA or AI) and level (HL or SL), drill past papers, and tighten calculator use, method, and time management. The fit call should identify whether the gap is specific topics, exam technique, or nerves, since each needs a different response.",
        "A good crash plan rehearses full papers under timed conditions, so the student is ready for the format and pacing of their exact course.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the course (AA or AI), level (HL or SL), exam dates, recent grades, target grade, and whether the student completes past papers. The crash work must match the exact course.",
        "Home tuition helps with focused correction; online can work for disciplined students. Maths Bodhi should set the mode after checking timing and study behaviour.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because IB DP crash intent is distinct from full DP tuition and from the course-specific AA and AI pages. Those pages cover full preparation; this is the short, intensive revision and paper-technique push before exams.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Full IB DP preparation."),
      relatedLink("IB Maths AA HL with Ajay", "/ib-maths-aa-hl-home-tutor/ajay-vatsyayan", "Course-specific AA HL support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share course, level, exam dates, and target grade."),
    ],
    faqs: [
      faq("Does this cover both AA and AI?", "Yes, tuned to the student's course and level. For full preparation, use the course-specific AA or AI pages."),
      faq("Can a crash course teach two years of IB maths?", "No. It is revision and paper technique for material already studied, not first-time teaching of the whole course."),
      faq("What does the crash work focus on?", "Past papers, weak-topic repair, calculator and method technique, and timing for the student's exact papers."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed grades, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on timing and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-olympiad",
    slug: "olympiad-maths-home-tutor",
    title: "Olympiad maths home tutor with Ajay Vatsyayan",
    badge: "Maths olympiad mentor",
    breadcrumbLabel: "Olympiad Maths",
    seoTitle: "Olympiad Maths Home Tutor Ajay Vatsyayan | Maths Bodhi Gurugram",
    seoDescription:
      "Consider Ajay Vatsyayan for olympiad maths in Gurugram, covering the IOQM, RMO, and INMO pathway with number theory, combinatorics, geometry, and proof.",
    h1: "Ajay Vatsyayan for olympiad maths support in Gurugram",
    intro:
      "This page helps families decide whether Ajay should be discussed for olympiad maths, the creative, proof-based problem solving behind the IOQM, RMO, and INMO pathway.",
    focus: "Mathematical olympiad problem solving and proof",
    audience: "Students with genuine aptitude and interest in olympiad maths",
    chips: ["Olympiad", "Proof", "Problem solving", "IOQM to INMO"],
    stats: [
      { value: "Olympiad", label: "Beyond the syllabus" },
      { value: "Proof", label: "Creative reasoning" },
      { value: "Pathway", label: "IOQM, RMO, INMO" },
    ],
    knowsAbout: ["Mathematical olympiad", "Number theory", "Combinatorics", "Geometry", "Algebra and inequalities", "Proof", "Problem solving"],
    fitBullets: [
      "Best for students with genuine aptitude and interest, who enjoy hard problems rather than routine exam work.",
      "Useful for building number theory, combinatorics, geometry, and inequality technique with real proof.",
      "Fit should be checked against the student's interest, current problem-solving level, and stage on the pathway.",
    ],
    contentSections: [
      contentSection("What Olympiad Maths Is", "Why it is its own world", [
        "Olympiad maths is unlike school or entrance maths. It is built on creative problem solving and rigorous proof across number theory, combinatorics, geometry, and algebra and inequalities, much of which sits outside the regular syllabus. Speed and formula recall matter far less than insight, persistence, and the ability to construct an argument. Many strong school students find it humbling at first, and that is normal.",
        "Ajay is positioned as a senior mentor for students who genuinely take to this. This is not a claim that every able student should chase olympiads; it suits those with real interest and aptitude. The page helps parents decide whether an olympiad conversation is worth having.",
      ]),
      contentSection("The Pathway", "How the olympiad route is structured", [
        "In India the route runs through the IOQM (the qualifier that replaced the earlier PRMO), then the RMO (Regional Mathematical Olympiad), then the INMO (Indian National Mathematical Olympiad), with further national camps beyond that. Each stage demands deeper proof and harder problems. A sensible plan meets the student at their current stage rather than rushing ahead.",
        "The fit call should establish where the student actually is, which of the four areas are strong or weak, and how much time the student can give to genuine problem practice.",
      ]),
      contentSection("Gurugram Support", "What parents should clarify", [
        "Parents should share the student's interest level, any olympiad results so far, the areas they enjoy or struggle with, and how much time they want to commit. Olympiad work rewards curiosity and persistence, so it should be driven by the student, not imposed.",
        "Home tuition suits deep, discussion-heavy problem work; online can work for self-driven students. Maths Bodhi should set the mode after checking location, timing, and the student's appetite.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because olympiad intent is distinct. It is not the JEE or BITSAT route (those reward speed and applied school maths), not the board pages, and broader than the general advanced-maths page. Phrasings such as INMO, RMO, and PRMO point here.",
        "It avoids guaranteed selections, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("Advanced maths with Ajay", "/advanced-maths-home-tutor/ajay-vatsyayan", "Broader enrichment beyond the syllabus."),
      relatedLink("JEE maths with Ajay", "/jee-maths-home-tutor/ajay-vatsyayan", "If an engineering exam is the real goal."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share interest level, results, and strong or weak areas."),
    ],
    faqs: [
      faq("Is olympiad maths for every strong student?", "No. It suits students with genuine interest and aptitude who enjoy hard problems and proof, rather than every high scorer."),
      faq("Which stages does this cover?", "The Indian pathway of IOQM (formerly PRMO), RMO, and INMO, and the proof-based problem solving behind them."),
      faq("How is olympiad maths different from JEE?", "JEE rewards speed and applied school maths; olympiad maths rewards creative problem solving and rigorous proof, much of it outside the syllabus."),
      faq("Does it guarantee selection?", "No. It avoids guaranteed selections, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and the student's appetite."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-gurgaon",
    slug: "jee-maths-home-tutor-gurgaon",
    title: "JEE maths home tutor in Gurgaon with Ajay Vatsyayan",
    badge: "JEE maths in Gurugram",
    breadcrumbLabel: "JEE Maths Gurgaon",
    seoTitle: "JEE Maths Home Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for JEE maths home tuition in Gurugram, combining serious JEE preparation with the convenience of local, at-home sessions.",
    h1: "Ajay Vatsyayan for JEE maths home tuition in Gurugram",
    intro:
      "This page helps Gurugram families decide whether Ajay should be discussed for JEE maths at home, combining exam preparation with local convenience.",
    focus: "JEE mathematics with home tuition in Gurugram",
    audience: "Gurugram-based students preparing for JEE maths",
    chips: ["JEE", "Gurugram", "Home tuition", "Local convenience"],
    stats: [
      { value: "JEE", label: "Main and Advanced" },
      { value: "Local", label: "Gurugram at home" },
      { value: "Time", label: "Less commuting" },
    ],
    knowsAbout: ["JEE Mathematics", "Calculus", "Algebra", "Coordinate geometry", "Problem solving", "Home tuition in Gurugram"],
    fitBullets: [
      "Best for Gurugram students who want serious JEE maths support without losing hours to commuting.",
      "Useful when home sessions suit the family's schedule better than a distant coaching centre.",
      "Fit should be checked against target exam, current level, locality, and practice discipline.",
    ],
    contentSections: [
      contentSection("JEE In Gurugram", "Why local home tuition can help", [
        "Gurugram has a dense JEE preparation scene, but travel across the city's sectors and traffic can eat into the very study time aspirants cannot spare. Home tuition keeps strong JEE maths support close to home, so the hours saved on commuting go back into practice. For families balancing school, coaching, and rest, that convenience matters.",
        "Ajay is positioned as a senior maths mentor for Gurugram families who prefer at-home support. This is not a claim that every aspirant needs him; many use large coaching setups. The page helps parents decide whether local senior mentoring is worth discussing.",
      ]),
      contentSection("Same Standard, Less Travel", "What local does not change", [
        "Choosing home tuition should not lower the standard of JEE preparation. The maths still demands speed, accurate method selection, and depth for Advanced. The fit call should set the same serious plan as any JEE student would need, simply delivered locally and at a time that suits the household.",
        "Where the student also has board exams, the plan should balance both rather than letting JEE crowd out school performance.",
      ]),
      contentSection("Gurugram Specifics", "What parents should clarify", [
        "Parents should share their sector or locality, target exam, current level, school board, and preferred timings. Knowing the area helps decide whether in-person home sessions or online better fit the commute and schedule.",
        "Home tuition suits accountability and correction; online can work for disciplined students or tighter schedules. Maths Bodhi should set the mode after checking location and timing.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because it serves JEE-plus-Gurugram intent specifically. The general JEE pages cover preparation without the local angle, and the general Gurugram tutor pages are not JEE-specific. This page sits at the intersection.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE maths with Ajay", "/jee-maths-home-tutor/ajay-vatsyayan", "The JEE overview without the local angle."),
      relatedLink("Maths home tutor in Gurugram", "/maths-home-tutor-gurgaon/ajay-vatsyayan", "General local maths support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share sector, target exam, and timings."),
    ],
    faqs: [
      faq("Does home tuition mean weaker JEE preparation?", "No. The plan stays as serious as any JEE preparation; only the delivery is local and at home to save commuting time."),
      faq("Does this cover Main and Advanced?", "Yes, as needed. For exam-specific depth, the JEE Main, Advanced, and crash pages go further."),
      faq("Which areas of Gurugram?", "Share your sector or locality during enquiry, and Maths Bodhi will advise on home versus online based on commute and timing."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-jee-advanced-gurgaon",
    slug: "jee-advanced-maths-tutor-gurgaon",
    title: "JEE Advanced maths tutor in Gurgaon with Ajay Vatsyayan",
    badge: "JEE Advanced maths in Gurugram",
    breadcrumbLabel: "JEE Advanced Maths Gurgaon",
    seoTitle: "JEE Advanced Maths Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for JEE Advanced maths tuition in Gurugram, combining hard problem-solving preparation with convenient local, at-home sessions.",
    h1: "Ajay Vatsyayan for JEE Advanced maths tuition in Gurugram",
    intro:
      "This page helps Gurugram families decide whether Ajay should be discussed for JEE Advanced maths at home, where hard problem solving meets local convenience.",
    focus: "JEE Advanced mathematics with home tuition in Gurugram",
    audience: "Gurugram students aiming specifically at JEE Advanced",
    chips: ["JEE Advanced", "Gurugram", "Hard problems", "Home tuition"],
    stats: [
      { value: "Advanced", label: "Hard problem solving" },
      { value: "Local", label: "Gurugram at home" },
      { value: "Depth", label: "Beyond Main" },
    ],
    knowsAbout: ["JEE Advanced Mathematics", "Calculus", "Algebra", "Vectors and 3D", "Advanced problem solving", "Home tuition in Gurugram"],
    fitBullets: [
      "Best for Gurugram students past the Main stage who need depth on hard Advanced problems, locally.",
      "Useful when at-home focus suits intensive problem practice better than travelling.",
      "Fit should be checked against current standing, locality, and practice discipline.",
    ],
    contentSections: [
      contentSection("Advanced In Gurugram", "Why local home support fits this stage", [
        "JEE Advanced demands deep, unhurried problem solving, and that kind of focus is hard to protect when commuting across Gurugram eats into the day. Home tuition keeps serious Advanced-level mentoring close, so the student spends energy on hard problems rather than on travel. For aspirants in the final climb, that focus is valuable.",
        "Ajay is positioned as a senior mentor for Gurugram families wanting at-home Advanced support. This is not a claim that every aspirant needs him; many use coaching. The page helps parents decide whether local senior mentoring is worth discussing.",
      ]),
      contentSection("Depth Over Distance", "Keeping the standard high", [
        "Advanced is won on hard, multi-step problems and resilience, not on coverage alone. Delivering this locally should not soften the plan: the fit call should set genuine Advanced-level practice and honest review, simply at home and at a workable time.",
        "Where boards overlap, the plan should protect school performance rather than sacrificing it to Advanced preparation.",
      ]),
      contentSection("Gurugram Specifics", "What parents should clarify", [
        "Parents should share their sector or locality, current Advanced standing, weak areas, and preferred timings. The area helps decide whether in-person home sessions or online suit the commute and schedule.",
        "Home tuition suits focused correction; online can work for disciplined students. Maths Bodhi should set the mode after checking location and timing.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because it serves JEE-Advanced-plus-Gurugram intent. The general JEE Advanced page omits the local angle, the general JEE Gurgaon page is not Advanced-specific, and the general Gurugram pages are not exam-specific. This page is the intersection.",
        "It avoids guaranteed ranks, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("JEE Advanced with Ajay", "/jee-advanced-maths-home-tutor/ajay-vatsyayan", "Advanced preparation without the local angle."),
      relatedLink("JEE maths in Gurgaon", "/jee-maths-home-tutor-gurgaon/ajay-vatsyayan", "The broader local JEE page."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share sector, standing, and timings."),
    ],
    faqs: [
      faq("How is this different from the JEE Gurgaon page?", "This page is specific to JEE Advanced and its hard problem solving; the broader JEE Gurgaon page covers Main and Advanced together."),
      faq("Does local delivery lower the standard?", "No. The Advanced plan stays demanding; only the delivery is local and at home to protect focus and time."),
      faq("Which areas of Gurugram?", "Share your sector during enquiry, and Maths Bodhi will advise on home versus online."),
      faq("Does it guarantee a rank?", "No. It avoids guaranteed ranks, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-bitsat-gurgaon",
    slug: "bitsat-maths-tutor-gurgaon",
    title: "BITSAT maths tutor in Gurgaon with Ajay Vatsyayan",
    badge: "BITSAT maths in Gurugram",
    breadcrumbLabel: "BITSAT Maths Gurgaon",
    seoTitle: "BITSAT Maths Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for BITSAT maths tuition in Gurugram, combining speed-focused exam preparation with convenient local, at-home sessions.",
    h1: "Ajay Vatsyayan for BITSAT maths tuition in Gurugram",
    intro:
      "This page helps Gurugram families decide whether Ajay should be discussed for BITSAT maths at home, where speed-focused preparation meets local convenience.",
    focus: "BITSAT mathematics with home tuition in Gurugram",
    audience: "Gurugram students preparing for BITSAT maths",
    chips: ["BITSAT", "Gurugram", "Speed", "Home tuition"],
    stats: [
      { value: "BITSAT", label: "Speed-based exam" },
      { value: "Local", label: "Gurugram at home" },
      { value: "Time", label: "Less commuting" },
    ],
    knowsAbout: ["BITSAT Mathematics", "Algebra", "Calculus", "Coordinate geometry", "Timed problem solving", "Home tuition in Gurugram"],
    fitBullets: [
      "Best for Gurugram students who need BITSAT speed practice without losing time to travel.",
      "Useful when home sessions fit the schedule better than a distant centre.",
      "Fit should be checked against current level, locality, and practice discipline.",
    ],
    contentSections: [
      contentSection("BITSAT In Gurugram", "Why local home support helps", [
        "BITSAT is one of the most time-pressured entrance exams, and the speed habit it needs is built through consistent timed practice. When commuting across Gurugram swallows study hours, that consistency suffers. Home tuition keeps BITSAT-focused mentoring close, so the student drills speed and accuracy without the travel overhead.",
        "Ajay is positioned as a senior mentor for Gurugram families wanting at-home BITSAT support. This is not a claim that every aspirant needs him; many use coaching. The page helps parents decide whether local senior mentoring is worth discussing.",
      ]),
      contentSection("Speed, Delivered Locally", "Keeping the plan sharp", [
        "Local delivery should not soften BITSAT preparation. The defining work, timed sets, quick recognition, and accuracy under pressure, stays the same; it is simply done at home at a workable time. The fit call should set that rehearsal plan clearly.",
        "Where boards overlap, the plan should keep school performance intact alongside BITSAT speed work.",
      ]),
      contentSection("Gurugram Specifics", "What parents should clarify", [
        "Parents should share sector or locality, current mock standing, weak areas, and preferred timings. The area helps decide whether in-person home sessions or online suit the commute and schedule.",
        "Home tuition suits accountability; online can work for disciplined students. Maths Bodhi should set the mode after checking location and timing.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because it serves BITSAT-plus-Gurugram intent. The general BITSAT page omits the local angle, and the general Gurugram pages are not BITSAT-specific. This page is the intersection.",
        "It avoids guaranteed scores, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("BITSAT with Ajay", "/bitsat-maths-home-tutor/ajay-vatsyayan", "BITSAT preparation without the local angle."),
      relatedLink("Maths home tutor in Gurugram", "/maths-home-tutor-gurgaon/ajay-vatsyayan", "General local maths support."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share sector, mock standing, and timings."),
    ],
    faqs: [
      faq("Why home tuition for BITSAT?", "BITSAT speed work needs consistent timed practice, and home sessions protect that time from being lost to commuting across Gurugram."),
      faq("Does local delivery lower the standard?", "No. The speed-focused plan stays the same; only the delivery is local and at home."),
      faq("Which areas of Gurugram?", "Share your sector during enquiry, and Maths Bodhi will advise on home versus online."),
      faq("Does it guarantee a score?", "No. It avoids guaranteed scores, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-ib-gurgaon",
    slug: "ib-maths-home-tutor-gurgaon",
    title: "IB maths home tutor in Gurgaon with Ajay Vatsyayan",
    badge: "IB maths in Gurugram",
    breadcrumbLabel: "IB Maths Gurgaon",
    seoTitle: "IB Maths Home Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for IB maths home tuition in Gurugram, supporting MYP and DP students from the city's many international schools, at home.",
    h1: "Ajay Vatsyayan for IB maths home tuition in Gurugram",
    intro:
      "This page helps Gurugram families decide whether Ajay should be discussed for IB maths at home, supporting MYP and DP students from the city's international schools.",
    focus: "IB mathematics (MYP and DP) with home tuition in Gurugram",
    audience: "Gurugram IB students across MYP and DP",
    chips: ["IB", "Gurugram", "MYP and DP", "International schools"],
    stats: [
      { value: "IB", label: "MYP and DP" },
      { value: "Local", label: "Gurugram at home" },
      { value: "Schools", label: "International curricula" },
    ],
    knowsAbout: ["IB Mathematics", "MYP Mathematics", "Analysis and Approaches", "Applications and Interpretation", "Internal Assessment", "Home tuition in Gurugram"],
    fitBullets: [
      "Best for Gurugram IB families who want senior maths support matched to MYP or DP, at home.",
      "Useful given the city's cluster of international schools and the commute home tuition can save.",
      "Fit should be checked against programme, course, level, locality, and study discipline.",
    ],
    contentSections: [
      contentSection("IB In Gurugram", "Why local IB support fits", [
        "Gurugram has one of the country's larger clusters of international schools offering the IB, and IB maths, whether MYP or DP, has its own demands around criteria, the IA, and the AA-or-AI choice. Home tuition keeps senior IB maths support close, which suits families who would rather not add long commutes to an already heavy programme.",
        "Ajay is positioned as a senior mentor for Gurugram IB families. This is not a claim that every IB student needs him; many manage with school support. The page helps parents decide whether local senior mentoring is worth discussing.",
      ]),
      contentSection("MYP And DP", "Matching support to the stage", [
        "The right plan depends on where the student is: MYP foundations and assessment habits, or DP with its AA or AI course, levels, IA, and final papers. The fit call should pin down the exact programme, course, and level, then set support accordingly, rather than treating all IB maths the same.",
        "For DP students, the plan can also weigh how the maths choice fits university plans, without pushing the hardest option for its own sake.",
      ]),
      contentSection("Gurugram Specifics", "What parents should clarify", [
        "Parents should share the school, programme (MYP or DP), course and level if DP, weak topics, and preferred timings. The locality helps decide whether in-person home sessions or online suit the schedule.",
        "Home tuition suits written correction and accountability; online can work for disciplined students. Maths Bodhi should set the mode after checking location and timing.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because it serves IB-plus-Gurugram intent. The IB DP, MYP, and course-specific pages omit the local angle, and the general Gurugram pages are not IB-specific. This page is the intersection, and routes to the right IB page for detail.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IB DP overview with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "DP preparation without the local angle."),
      relatedLink("IB MYP with Ajay", "/ib-myp-maths-home-tutor/ajay-vatsyayan", "MYP support without the local angle."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share school, programme, course, and timings."),
    ],
    faqs: [
      faq("Does this cover both MYP and DP?", "Yes. The plan is matched to the student's programme, and for DP, to the AA or AI course and level. The detailed IB pages go further."),
      faq("Why home tuition for IB in Gurugram?", "It keeps senior IB maths support local, saving commute time for families already managing a demanding programme."),
      faq("Which areas of Gurugram?", "Share your school and locality during enquiry, and Maths Bodhi will advise on home versus online."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed grades, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-igcse-gurgaon",
    slug: "igcse-maths-home-tutor-gurgaon",
    title: "IGCSE maths home tutor in Gurgaon with Ajay Vatsyayan",
    badge: "IGCSE maths in Gurugram",
    breadcrumbLabel: "IGCSE Maths Gurgaon",
    seoTitle: "IGCSE Maths Home Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan for IGCSE maths home tuition in Gurugram, supporting students from the city's Cambridge and international schools, at home.",
    h1: "Ajay Vatsyayan for IGCSE maths home tuition in Gurugram",
    intro:
      "This page helps Gurugram families decide whether Ajay should be discussed for IGCSE maths at home, supporting students from the city's Cambridge and international schools.",
    focus: "IGCSE mathematics with home tuition in Gurugram",
    audience: "Gurugram IGCSE students across Core and Extended",
    chips: ["IGCSE", "Gurugram", "Cambridge schools", "Home tuition"],
    stats: [
      { value: "IGCSE", label: "Core and Extended" },
      { value: "Local", label: "Gurugram at home" },
      { value: "Schools", label: "Cambridge curricula" },
    ],
    knowsAbout: ["IGCSE Mathematics", "Extended mathematics", "Algebra", "Trigonometry", "Exam technique", "Home tuition in Gurugram"],
    fitBullets: [
      "Best for Gurugram IGCSE families who want senior maths support at home, matched to Core or Extended.",
      "Useful given the city's international-school cluster and the commute home tuition can save.",
      "Fit should be checked against tier, target grade, locality, and study discipline.",
    ],
    contentSections: [
      contentSection("IGCSE In Gurugram", "Why local IGCSE support fits", [
        "Gurugram has many Cambridge and international schools offering IGCSE, and IGCSE maths has its own character: a wide syllabus, the Core or Extended tier choice, and a specific exam style. Home tuition keeps senior IGCSE maths support close, which suits families who would rather not add long commutes to the school week.",
        "Ajay is positioned as a senior mentor for Gurugram IGCSE families. This is not a claim that every IGCSE student needs him; many manage with school support. The page helps parents decide whether local senior mentoring is worth discussing.",
      ]),
      contentSection("Core Or Extended", "Matching support to the tier", [
        "The plan should match the student's tier. Extended carries the harder topics and is usually expected by students heading into demanding A Levels or IB DP, while Core suits a different path. The fit call should clarify the tier, target grade, and weak topics before setting the plan.",
        "Exam technique and past-paper familiarity matter in IGCSE, so the plan should build those alongside the content.",
      ]),
      contentSection("Gurugram Specifics", "What parents should clarify", [
        "Parents should share the school, exam board, tier (Core or Extended), target grade, and preferred timings. The locality helps decide whether in-person home sessions or online suit the schedule.",
        "Home tuition suits written correction; online can work for disciplined students. Maths Bodhi should set the mode after checking location and timing.",
      ]),
      contentSection("Route Boundaries", "Why this page is its own", [
        "This page is self-canonical because it serves IGCSE-plus-Gurugram intent. The general IGCSE page omits the local angle, and the general Gurugram pages are not IGCSE-specific. This page is the intersection.",
        "It avoids guaranteed grades, fake reviews, and rating markup. It is a decision guide.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths profile."),
      relatedLink("IGCSE with Ajay", "/igcse-maths-home-tutor/ajay-vatsyayan", "IGCSE preparation without the local angle."),
      relatedLink("IB maths in Gurgaon", "/ib-maths-home-tutor-gurgaon/ajay-vatsyayan", "If the student moves into IB next."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share school, tier, target grade, and timings."),
    ],
    faqs: [
      faq("Does this cover Core and Extended?", "Yes, matched to the student's tier. The general IGCSE page covers preparation in more detail."),
      faq("Why home tuition for IGCSE in Gurugram?", "It keeps senior IGCSE maths support local, saving commute time within a busy school week."),
      faq("Which areas of Gurugram?", "Share your school and locality during enquiry, and Maths Bodhi will advise on home versus online."),
      faq("Does it guarantee grades?", "No. It avoids guaranteed grades, fake reviews, and rating markup."),
      faq("Home or online?", "Decided during enquiry based on locality, timing, and study discipline."),
    ],
  }),
  createAjayPage({
    id: "ajay-gurgaon-home-tutor",
    slug: "maths-home-tutor-gurgaon",
    title: "Maths home tutor in Gurgaon with Ajay Vatsyayan",
    badge: "Gurgaon senior home tutor option",
    breadcrumbLabel: "Gurgaon Maths Home Tutor",
    seoTitle: "Maths Home Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Consider Ajay Vatsyayan as a senior maths home tutor option in Gurgaon for IB, IGCSE, CBSE Class 12, JEE, BITSAT, and advanced maths support.",
    h1: "Ajay Vatsyayan as a senior maths home tutor option in Gurgaon",
    intro:
      "This Gurgaon-focused page helps families decide whether Ajay should be discussed for premium maths home tuition when board, exam, school, and locality fit all matter.",
    focus: "Senior maths home tuition in Gurgaon",
    audience: "Gurgaon families comparing premium maths home tutor options",
    serviceArea: "Gurgaon and Gurugram localities where home-tuition scheduling is practical",
    chips: ["Gurgaon", "Home tuition", "Premium schools", "Senior maths"],
    stats: [
      { value: "Gurgaon", label: "Local intent" },
      { value: "Senior", label: "Tutor positioning" },
      { value: "Fit", label: "Availability check" },
    ],
    knowsAbout: ["Maths home tuition", "Gurgaon maths tutoring", "IB Mathematics", "IGCSE Mathematics", "CBSE Class 12 Mathematics", "JEE Mathematics"],
    fitBullets: [
      "Best for Gurgaon families who want a senior tutor discussion rather than a generic list of profiles.",
      "Useful when locality, school timing, board level, and exam goals must all be checked together.",
      "The page uses Gurgaon wording for search intent while the service context remains Gurugram/Gurgaon.",
    ],
    contentSections: [
      contentSection("Local Intent", "Why this page uses Gurgaon", [
        "Many families still search for maths home tutor in Gurgaon even though the official city name is Gurugram. This page uses Gurgaon because it matches real parent search language, but it does not create a duplicate city doorway. The content is specifically about Ajay as a senior tutor option and links back to the main Gurugram route system.",
        "Ajay may be discussed when a family needs advanced maths support for IB, IGCSE, CBSE Class 12, JEE, BITSAT, or similar senior goals. The enquiry should confirm whether the student's locality, time slot, and learning need make home tuition practical. If not, Maths Bodhi can suggest online support or another verified tutor.",
      ]),
      contentSection("Home Tuition Fit", "What makes Gurgaon scheduling important", [
        "Home tuition works best when travel time, school schedule, session length, and student energy are realistic. A premium tutor option is not useful if the commute makes consistency impossible. Families near Golf Course Road, Golf Course Extension Road, DLF, South City, Sushant Lok, Sohna Road, and nearby sectors should share exact locality and preferred timing during the enquiry.",
        "The student's board and class matter as much as the address. A Class 12 calculus plan, an IGCSE Extended paper plan, an IB DP IA plan, and a JEE Main mock-review plan require different teaching rhythms. Ajay's fit should be judged against that full context rather than the broad phrase maths home tutor Gurgaon.",
      ]),
      contentSection("Premium Positioning", "How this page avoids doorway behaviour", [
        "This is not one of hundreds of locality-name pages. It is one of a small set of Ajay pages because Gurgaon is a major business search intent for Maths Bodhi. The page contains its own local explanation, route boundaries, and fit guidance, so it can be self-canonical without copying the Gurugram hub.",
        "Families who want the wider city comparison should still use the Gurugram page. Families who want to evaluate Ajay as a named senior tutor option can use this page, then move to the board or exam-specific Ajay page if their need is more precise.",
      ]),
      contentSection("Before Enquiry", "What to share with Maths Bodhi", [
        "Parents should share the student's class, board, school, current marks, weak chapters, location, preferred days, and whether the goal is school improvement, board marks, JEE, BITSAT, IB, or IGCSE. This allows Maths Bodhi to decide whether Ajay is relevant or whether a different verified tutor would be a better fit.",
        "The page does not show hidden reviews, fake ratings, or guaranteed outcomes. It gives families enough information to start a responsible enquiry and keeps the sitemap limited to useful self-canonical URLs.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read Ajay's broader senior maths positioning."),
      relatedLink("Best maths tutor Gurgaon", "/best-maths-home-tutor-gurgaon/ajay-vatsyayan", "Compare the more selective premium-search intent."),
      relatedLink("Gurugram Maths Tutor Hub", "/gurugram", "Use the broader city route for locality and board comparison."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share locality, board, and timing for a fit check."),
    ],
    faqs: [
      faq("Is Gurgaon the same service area as Gurugram here?", "Yes. Gurgaon is used because many parents search with that wording. The practical service area is Gurugram/Gurgaon, subject to schedule and locality fit."),
      faq("Does this page replace the Gurugram hub?", "No. The Gurugram hub remains the broad city page. This page is only for Ajay-specific senior tutor intent."),
      faq("Can Ajay travel anywhere in Gurgaon?", "Availability and travel are not guaranteed. Maths Bodhi must check exact locality, time slot, and current schedule."),
      faq("Is this a doorway page?", "No. It is visible, linked, self-canonical, and limited to a real business search intent with unique content."),
      faq("Does it include ratings?", "No. It includes no rating fields, fake reviews, or aggregate rating markup."),
    ],
  }),
  createAjayPage({
    id: "ajay-best-gurgaon",
    slug: "best-maths-home-tutor-gurgaon",
    title: "Best maths home tutor in Gurgaon query with Ajay Vatsyayan",
    badge: "Premium mentor option",
    breadcrumbLabel: "Best Maths Tutor Gurgaon",
    seoTitle: "Best Maths Home Tutor Gurgaon Ajay Vatsyayan | Maths Bodhi",
    seoDescription:
      "Use this page to evaluate Ajay Vatsyayan responsibly for best maths home tutor Gurgaon intent without fake rankings, ratings, or review structured data.",
    h1: "Ajay Vatsyayan for families searching best maths home tutor in Gurgaon",
    intro:
      "This page handles the best maths tutor search intent carefully: Ajay is presented as a premium senior option to evaluate, not as a fake ranked winner or guaranteed outcome.",
    focus: "Premium senior maths tutor evaluation in Gurgaon",
    audience: "Families comparing high-trust senior maths tutor options",
    serviceArea: "Gurgaon and Gurugram localities subject to fit and availability",
    chips: ["Best tutor intent", "No fake ranking", "Premium option", "Fit first"],
    stats: [
      { value: "No #1", label: "No fake ranking claim" },
      { value: "Senior", label: "Evaluation focus" },
      { value: "Fit", label: "Student-first choice" },
    ],
    knowsAbout: ["Senior maths tutoring", "Gurgaon maths home tuition", "IB Mathematics", "IGCSE Mathematics", "CBSE Class 12 Mathematics", "JEE Mathematics"],
    fitBullets: [
      "Best used as an evaluation page, not as a claim that one tutor is universally best for every student.",
      "Useful for parents who want criteria for choosing a senior maths tutor responsibly.",
      "The content avoids fake rankings, fake reviews, ratings, and unsupported superlatives.",
    ],
    contentSections: [
      contentSection("Search Intent", "How to treat best tutor searches honestly", [
        "Parents often search for the best maths home tutor in Gurgaon when they are anxious about quality, trust, and outcomes. That search intent is understandable, but it can easily lead to low-quality pages that claim number-one status without evidence. This page avoids that pattern. Ajay is presented as a premium senior option to evaluate, not as a universal best tutor for every student.",
        "The right tutor depends on class level, board, current marks, school pressure, exam goals, locality, timing, and the student's personality. A brilliant senior tutor may be wrong for a younger student who needs patient basics. A routine tutor may be wrong for a Class 12 or JEE student who needs advanced planning. The best choice is therefore contextual.",
      ]),
      contentSection("Evaluation Criteria", "What families should compare before choosing Ajay", [
        "Families should look at whether the tutor can diagnose errors, explain concepts clearly, set a realistic routine, review attempted work, and adapt to the student's board. For Ajay, the strongest discussion areas are senior school, IB, IGCSE, CBSE Class 12, JEE, BITSAT, and advanced maths. If the need is outside that range, Maths Bodhi should be willing to suggest another tutor.",
        "Parents should also compare practical details: travel feasibility, lesson mode, communication style, homework expectations, student comfort, and the weekly calendar. A tutor who looks ideal on paper may not be ideal if the time slot causes fatigue or if the student's learning style requires a different approach.",
      ]),
      contentSection("No Fake Signals", "Why this page avoids rankings and ratings", [
        "This page does not use star ratings, review counts, aggregate rating markup, or fake testimonials. Those signals would create risk for search quality and trust. Instead, the page uses visible criteria, clear limitations, and links to specific Ajay intent pages where the board or exam context is genuinely different.",
        "If a family needs proof, they should ask Maths Bodhi for a transparent conversation about fit, process, availability, and next steps. The site should not invent hidden social proof. A trustworthy premium page can still rank by being useful, specific, and honest.",
      ]),
      contentSection("Next Best Page", "When to use a more specific Ajay route", [
        "If the student is in IB DP, use the IB DP Ajay page. If the student is in IGCSE, use the IGCSE Ajay page. If the student is in CBSE Class 12, use the CBSE page. If the pressure is JEE or BITSAT, use the relevant exam page. Those pages give a more precise explanation than a broad best tutor page can.",
        "This page remains self-canonical because it answers a distinct evaluation intent: how to think about a premium named tutor without fake best-claims. It is included in the sitemap as one limited, useful page rather than becoming a template for many unsupported superlative pages.",
      ]),
    ],
    relatedLinks: [
      relatedLink("Main Ajay profile", AJAY_MAIN_PATH, "Read the broader senior tutor profile."),
      relatedLink("Maths tutor Gurgaon with Ajay", "/maths-home-tutor-gurgaon/ajay-vatsyayan", "Use this for the broader local home-tutor intent."),
      relatedLink("IB DP with Ajay", "/ib-dp-maths-home-tutor/ajay-vatsyayan", "Choose this if the student is in IB Diploma."),
      relatedLink("Book demo discussion", DEMO_PATH, "Share student need and evaluate fit responsibly."),
    ],
    faqs: [
      faq("Does this page claim Ajay is the number one tutor?", "No. It avoids fake rankings and presents Ajay as a premium senior option to evaluate."),
      faq("Why include a best tutor page at all?", "Because parents search that way. The page answers the intent responsibly with criteria, limitations, and no fake ratings."),
      faq("Should every family choose Ajay?", "No. The best tutor depends on board, class, goal, locality, mode, and student personality."),
      faq("Does this page use review structured data?", "No. It uses only safe Person, WebPage, BreadcrumbList, and FAQPage schema where valid."),
      faq("When should I use a more specific page?", "Use the IB, IGCSE, CBSE Class 12, JEE, or BITSAT Ajay page when the student's need is clearly tied to that route."),
    ],
  }),
];

export const ajayPageConfigs = [ajayMainPageConfig, ...ajayIntentPageConfigs];

export const skippedAjayPagePaths = [
  {
    path: "/igcse-extended-maths-home-tutor/ajay-vatsyayan",
    reason: "Skipped for launch because the approved IGCSE Ajay page already covers Core and Extended; a separate Extended page can be added later if needed.",
  },
];

const ajayIntentConfigBySlug = new Map(ajayIntentPageConfigs.map((config) => [config.slug, config]));
const ajayConfigByPath = new Map(ajayPageConfigs.map((config) => [config.routePath, config]));

function normalizePath(value) {
  const [withoutHash] = String(value ?? "").split("#");
  const [withoutQuery] = withoutHash.split("?");
  const path = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  return path.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
}

export function getAjayMainPageConfig() {
  return ajayMainPageConfig;
}

export function getAjayIntentPageConfig(slug) {
  return ajayIntentConfigBySlug.get(String(slug ?? "").trim().toLowerCase()) ?? null;
}

export function getAjayPageConfigByPath(path) {
  return ajayConfigByPath.get(normalizePath(path)) ?? null;
}
