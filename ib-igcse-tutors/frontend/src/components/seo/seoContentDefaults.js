function asArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

export function buildDefaultSeoContent({
  title = "Maths Bodhi",
  intro,
  primaryKeyword,
  area = "Gurugram",
  boards = [],
  classes = [],
  relatedLinks = [],
  cta,
} = {}) {
  const pageTopic = primaryKeyword || title;
  const boardText = asArray(boards).slice(0, 4).join(", ") || "CBSE, IB, IGCSE, ICSE, ISC, and JEE";
  const classText = asArray(classes).slice(0, 4).join(", ") || "middle-school, senior-school, and entrance preparation";

  return {
    intro: {
      eyebrow: "Parent guide",
      title: `How to use this ${title} page`,
      paragraphs: [
        intro ||
          `This page helps families understand whether ${pageTopic} is the right route before asking for tutor matching.`,
        `Use it to compare board fit, class level, learning mode, locality, weak chapters, and the kind of maths support a student needs before booking a demo.`,
      ],
    },
    whyChoose: {
      title: "Why this page matters",
      items: [
        {
          title: "Clearer tutor matching",
          description:
            "A useful enquiry starts with the student's board, class, current confidence, weak topics, and weekly schedule.",
        },
        {
          title: "Board and class fit",
          description: `Parents can compare ${boardText} support for ${classText} without turning the page into a generic list.`,
        },
        {
          title: "Local planning",
          description: `${area} home tuition works best when timing, travel, school area, and online backup options are checked early.`,
        },
      ],
    },
    whoItHelps: {
      title: "Who this page is for",
      items: [
        {
          title: "Parents comparing options",
          description:
            "Useful when the family is deciding between home tuition, online maths support, revision help, or a more senior mentor.",
        },
        {
          title: "Students with specific gaps",
          description:
            "Helpful when the student can name the chapter, test pattern, paper style, or confidence issue that needs attention.",
        },
      ],
    },
    howItWorks: {
      title: "How Maths Bodhi helps",
      steps: [
        {
          title: "Share the learning need",
          description:
            "Tell Maths Bodhi the class, board, locality, weak chapters, school schedule, target score, and preferred mode.",
        },
        {
          title: "Check tutor fit",
          description:
            "The shortlist should account for subject depth, teaching style, availability, travel fit, and the student's confidence.",
        },
        {
          title: "Start with a focused next step",
          description:
            "Families can use a demo conversation to decide whether the plan should be regular tuition, revision, doubt clearing, or exam preparation.",
        },
      ],
    },
    localContext: {
      title: `${area} context`,
      paragraphs: [
        `${area} families often need maths support that fits school timing, commute practicality, board expectations, and the student's current routine.`,
      ],
    },
    relatedLinks,
    cta,
  };
}
