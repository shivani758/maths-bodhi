import { query } from "../db/postgres.js";

type CountRow = {
  count: string;
};

type RecentTutorRow = {
  id: string;
  name: string;
  updated_at: Date;
};

type RecentBlogRow = {
  id: string;
  title: string;
  updated_at: Date;
};

async function count(sql: string) {
  const result = await query<CountRow>(sql);
  return Number(result.rows[0]?.count ?? 0);
}

export async function getDashboardSnapshot() {
  const [
    totalTutors,
    featuredTutors,
    pendingReviews,
    publishedBlogs,
    draftBlogs,
    totalResults,
    recentTutors,
    recentBlogs,
  ] = await Promise.all([
    count("SELECT COUNT(*) FROM tutors"),
    count("SELECT COUNT(*) FROM tutors WHERE featured = TRUE"),
    count("SELECT COUNT(*) FROM reviews WHERE moderation_status = 'pending'"),
    count("SELECT COUNT(*) FROM blog_posts WHERE status = 'published'"),
    count("SELECT COUNT(*) FROM blog_posts WHERE status = 'draft'"),
    count("SELECT COUNT(*) FROM student_results"),
    query<RecentTutorRow>("SELECT id, name, updated_at FROM tutors ORDER BY updated_at DESC LIMIT 4"),
    query<RecentBlogRow>("SELECT id, title, updated_at FROM blog_posts ORDER BY updated_at DESC LIMIT 4"),
  ]);

  return {
    summaryCards: [
      { label: "Total Tutors", value: totalTutors, helper: "Profiles ready for matching" },
      { label: "Featured Tutors", value: featuredTutors, helper: "Visible in key discovery areas" },
      { label: "Pending Reviews", value: pendingReviews, helper: "Waiting for moderation" },
      { label: "Published Blogs", value: publishedBlogs, helper: "Live editorial content" },
      { label: "Draft Blogs", value: draftBlogs, helper: "Still being refined" },
      { label: "Student Results", value: totalResults, helper: "Proof stories available for pages" },
    ],
    quickActions: [
      { label: "Add Tutor", to: "/admin/tutors/new" },
      { label: "Write Blog", to: "/admin/blogs/new" },
      { label: "Moderate Reviews", to: "/admin/reviews" },
      { label: "Add Result", to: "/admin/results" },
    ],
    recentActivity: [
      ...recentTutors.rows.map((item) => ({
        id: `tutor-${item.id}`,
        module: "Tutors",
        action: "Updated tutor",
        entityLabel: item.name,
        actorName: "Maths Bodhi Admin",
        createdAt: item.updated_at,
      })),
      ...recentBlogs.rows.map((item) => ({
        id: `blog-${item.id}`,
        module: "Blogs",
        action: "Updated blog",
        entityLabel: item.title,
        actorName: "Maths Bodhi Admin",
        createdAt: item.updated_at,
      })),
    ]
      .sort((first, second) => String(second.createdAt).localeCompare(String(first.createdAt)))
      .slice(0, 8),
  };
}
