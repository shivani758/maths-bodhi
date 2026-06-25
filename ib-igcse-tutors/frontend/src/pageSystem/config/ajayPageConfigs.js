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
    path: "/ib-maths-aa-hl-home-tutor/ajay-vatsyayan",
    reason: "Skipped for launch to avoid splitting IB DP content before there is enough AA HL-specific copy and internal demand.",
  },
  {
    path: "/ib-maths-ai-hl-home-tutor/ajay-vatsyayan",
    reason: "Skipped for launch to avoid a thin near-duplicate of the IB DP Ajay page until AI HL content is genuinely distinct.",
  },
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
