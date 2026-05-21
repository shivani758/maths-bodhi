# Authentication And Route Security

This backend is PostgreSQL-only. Runtime sessions are stored in the `admin_sessions` table through `PgSessionStore`, and protected admin/portal middleware revalidates the session user against the `users` table before allowing access.

## Roles

| Role | Scope |
| --- | --- |
| `super_admin` | Full admin panel access, including destructive content deletes. |
| `admin` | Full admin panel access, including destructive content deletes. |
| `editor` | Admin panel content read/create/update access. Editors cannot delete content. |
| `student` | Portal account access for student profile actions. |
| `tutor` | Portal account access for tutor profile actions. |

## Security Controls

- Admin sessions use an HTTP-only cookie backed by PostgreSQL `admin_sessions`.
- `SESSION_COOKIE_SECURE` defaults to `true` in production and is required in production.
- `SESSION_COOKIE_SAME_SITE` defaults to `none` in production and `lax` outside production.
- `SESSION_COOKIE_SECURE=true` is required whenever `SESSION_COOKIE_SAME_SITE=none`.
- Production CORS requires `FRONTEND_ORIGIN`; allowed browser origins come from that env value.
- Admin and portal login endpoints use lightweight in-memory rate limiting.
- Portal signup and email verification are public by design, but also rate-limited.
- Request bodies are validated with existing Zod schemas before service writes.
- Unauthenticated protected requests return `401`.
- Authenticated users without the required role return `403`.
- Route responses do not return `password_hash`, session IDs, session tokens, or sensitive env values.

## Route Access Table

| Method | Path | Access | Reason |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Non-sensitive uptime check. |
| `POST` | `/api/auth/login` | Public, rate-limited | Admin users need this to establish a session. |
| `POST` | `/api/auth/logout` | Authenticated admin | Clears an existing admin session. |
| `GET` | `/api/auth/session` | Public | Allows the frontend to check whether an admin session exists; returns only sanitized user data or `null`. |
| `POST` | `/api/portal-auth/signup` | Public, rate-limited | Student/tutor self-service account creation. |
| `POST` | `/api/portal-auth/login` | Public, rate-limited | Portal users need this to establish a session. |
| `POST` | `/api/portal-auth/logout` | Authenticated portal user | Clears an existing portal session. |
| `GET` | `/api/portal-auth/session` | Public | Allows the frontend to check whether a portal session exists; returns only sanitized user/profile data or `null`. |
| `PUT` | `/api/portal-auth/profile` | Authenticated portal user | A student/tutor can update only their own profile, keyed by session user id and role. |
| `POST` | `/api/portal-auth/resend-verification` | Authenticated portal user | Sends verification only for the logged-in portal account. |
| `POST` | `/api/portal-auth/verify-email` | Public, rate-limited | Email verification requires a token before a verified session may exist. |
| `GET` | `/api/public/bootstrap` | Public | Public website bootstrap data: published pages/blogs, active tutors, approved reviews/results. |
| `GET` | `/api/tutors` | Public | Public website tutor listing; only active tutors are returned. |
| `GET` | `/api/blogs` | Public | Public website blog listing; only published blogs are returned. |
| `GET` | `/api/reviews` | Public | Public website review listing; only approved reviews are returned. |
| `GET` | `/api/admin/dashboard` | `super_admin`, `admin`, `editor` | Admin panel summary data after active PostgreSQL user/session validation. |
| `GET` | `/api/admin/tutors` | `super_admin`, `admin`, `editor` | Admin panel tutor management read access. |
| `GET` | `/api/admin/tutors/:id` | `super_admin`, `admin`, `editor` | Admin panel tutor management read access. |
| `POST` | `/api/admin/tutors` | `super_admin`, `admin`, `editor` | Admin panel tutor creation with Zod validation. |
| `PUT` | `/api/admin/tutors/:id` | `super_admin`, `admin`, `editor` | Admin panel tutor update with Zod validation. |
| `DELETE` | `/api/admin/tutors/:id` | `super_admin`, `admin` | Destructive content delete; editors are excluded. |
| `GET` | `/api/admin/blogs` | `super_admin`, `admin`, `editor` | Admin panel blog management read access. |
| `GET` | `/api/admin/blogs/:id` | `super_admin`, `admin`, `editor` | Admin panel blog management read access. |
| `POST` | `/api/admin/blogs` | `super_admin`, `admin`, `editor` | Admin panel blog creation with Zod validation. |
| `PUT` | `/api/admin/blogs/:id` | `super_admin`, `admin`, `editor` | Admin panel blog update with Zod validation. |
| `DELETE` | `/api/admin/blogs/:id` | `super_admin`, `admin` | Destructive content delete; editors are excluded. |
| `GET` | `/api/admin/pages` | `super_admin`, `admin`, `editor` | Admin panel page management read access. |
| `GET` | `/api/admin/pages/:id` | `super_admin`, `admin`, `editor` | Admin panel page management read access. |
| `POST` | `/api/admin/pages` | `super_admin`, `admin`, `editor` | Admin panel page creation with Zod validation. |
| `PUT` | `/api/admin/pages/:id` | `super_admin`, `admin`, `editor` | Admin panel page update with Zod validation. |
| `DELETE` | `/api/admin/pages/:id` | `super_admin`, `admin` | Destructive content delete; editors are excluded. |
| `GET` | `/api/admin/reviews` | `super_admin`, `admin`, `editor` | Admin panel review moderation read access. |
| `GET` | `/api/admin/reviews/:id` | `super_admin`, `admin`, `editor` | Admin panel review moderation read access. |
| `POST` | `/api/admin/reviews` | `super_admin`, `admin`, `editor` | Admin panel review creation with Zod validation. |
| `PUT` | `/api/admin/reviews/:id` | `super_admin`, `admin`, `editor` | Admin panel review update/moderation with Zod validation. |
| `DELETE` | `/api/admin/reviews/:id` | `super_admin`, `admin` | Destructive content delete; editors are excluded. |
| `GET` | `/api/admin/results` | `super_admin`, `admin`, `editor` | Admin panel student result management read access. |
| `GET` | `/api/admin/results/:id` | `super_admin`, `admin`, `editor` | Admin panel student result management read access. |
| `POST` | `/api/admin/results` | `super_admin`, `admin`, `editor` | Admin panel student result creation with Zod validation. |
| `PUT` | `/api/admin/results/:id` | `super_admin`, `admin`, `editor` | Admin panel student result update with Zod validation. |
| `DELETE` | `/api/admin/results/:id` | `super_admin`, `admin` | Destructive content delete; editors are excluded. |

## PostgreSQL Persistence

Active runtime persistence uses:

| Data | PostgreSQL table/path |
| --- | --- |
| Admin and portal users | `users`, via `repositories/postgres/userRepository.ts` |
| Sessions | `admin_sessions`, via `auth/pgSessionStore.ts` |
| Tutors | `tutors`, via `services/tutorService.ts` |
| Blogs | `blog_posts`, via `services/blogService.ts` |
| Reviews | `reviews`, via `services/reviewService.ts` |
| Student results | `student_results`, via `services/studentResultService.ts` |
| Pages | `pages`, via `services/pageService.ts` |
| Supporting admin tables | `faqs`, `cities`, `localities`, `media_assets`, `settings`, created by `src/db/schema.sql` |
