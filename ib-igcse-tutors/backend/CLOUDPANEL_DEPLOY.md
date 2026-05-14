# CloudPanel Deployment: PostgreSQL Backend

This backend uses PostgreSQL at runtime. Do not commit production credentials; add real values only in CloudPanel environment variables or the server-side `.env` file.

Run all commands below from the backend directory:

```bash
/home/<cloudpanel-user>/htdocs/<site>/ib-igcse-tutors/backend
```

Use Node.js 20 LTS or newer.

## Install And Build

```bash
npm ci
npm run build
```

CloudPanel start command:

```bash
npm start
```

The start script runs:

```bash
node dist/server.js
```

Recommended PM2 command if CloudPanel is configured to use PM2 directly:

```bash
pm2 start dist/server.js --name maths-bodhi-backend --update-env
pm2 save
```

## Required Environment Variables

Set these in CloudPanel, not in committed files:

```bash
NODE_ENV=production
PORT=<cloudpanel-node-port>
DB_PROVIDER=postgres
DATABASE_URL=postgresql://<database-user>:<url-encoded-database-password>@<database-host>:5432/mathsbodhi
DB_HOST=<database-host>
DB_PORT=5432
DB_NAME=mathsbodhi
DB_USER=<database-user>
DB_PASSWORD=<database-password>
SESSION_SECRET=<long-random-session-secret>
JWT_SECRET=<long-random-jwt-secret>
ADMIN_SEED_NAME=<admin-display-name>
ADMIN_SEED_EMAIL=<admin-email>
ADMIN_SEED_PASSWORD=<admin-password>
```

`DATABASE_URL` is preferred and is loaded first. If it is set, the backend uses it for the PostgreSQL pool. The split `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` values are the fallback.

Keep `DATABASE_URL` and `DB_PASSWORD` consistent: the password encoded in `DATABASE_URL` must be the same password as `DB_PASSWORD`.

`DB_PASSWORD` and `SESSION_SECRET` must be separate values. Do not reuse the database password as the session secret.

Passwords with special characters must be URL encoded in `DATABASE_URL`. For example, `@` becomes `%40`, `#` becomes `%23`, and `%` becomes `%25`.

`127.0.0.1` works only when the backend process and PostgreSQL run on the same machine/server. From a laptop, `127.0.0.1` points to the laptop, not the CloudPanel server.

## Optional Backend Environment Variables

These are supported backend variables, but have defaults:

```bash
HOST=0.0.0.0
FRONTEND_ORIGIN=https://your-frontend-domain.example
SESSION_COOKIE_NAME=maths_bodhi_admin_sid
SESSION_COOKIE_SAME_SITE=none
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_DOMAIN=<optional-cookie-domain>
```

`NEXT_PUBLIC_API_URL` is a frontend variable and is not required by this backend. `MONGO_URI` is not used by the current PostgreSQL backend.

## PostgreSQL Setup

Create the database and user on the PostgreSQL server. Example only:

```sql
CREATE DATABASE mathsbodhi;
CREATE USER mathsbodhi_user WITH PASSWORD '<strong-password>';
GRANT ALL PRIVILEGES ON DATABASE mathsbodhi TO mathsbodhi_user;
```

Then connect to the database and grant schema privileges if your PostgreSQL version requires it:

```sql
GRANT ALL ON SCHEMA public TO mathsbodhi_user;
```

## Run The Schema

From the backend directory:

```bash
psql "$DATABASE_URL" -f src/db/schema.sql
```

Or with split variables:

```bash
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f src/db/schema.sql
```

The schema sets `search_path` to `public`, creates the `pgcrypto` extension in `public`, and creates the required tables in the `public` schema. It uses `CREATE TABLE IF NOT EXISTS` and does not drop table data. It does refresh update triggers with `DROP TRIGGER IF EXISTS` followed by `CREATE TRIGGER`.

Required public tables:

```text
users
admin_sessions
tutors
blog_posts
reviews
student_results
pages
faqs
cities
localities
media_assets
settings
```

## Verify In pgAdmin

1. Connect to the PostgreSQL server in pgAdmin.
2. Expand `Databases`.
3. Expand `mathsbodhi`.
4. Expand `Schemas`.
5. Expand `public`.
6. Expand `Tables`.
7. Confirm the required tables listed above are visible.

If tables are missing, run the schema command again against the `mathsbodhi` database and refresh pgAdmin.

## Read-Only Database Check

After the schema has been applied and env variables are present:

```bash
npm run db:check
```

This command connects to PostgreSQL, runs `SELECT current_database()`, verifies the required `public` tables exist, and does not mutate data or print secrets.

## Seed The Admin User

After schema setup and env variables are present:

```bash
npm run seed
```

The seed script uses `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, and `ADMIN_SEED_NAME`. It inserts the admin user when missing and updates the matching admin user's name, role, active status, and password hash when the user already exists. It does not print the password.

## Health Check

After the app starts:

```bash
curl "http://127.0.0.1:$PORT/api/health"
```

Expected response:

```json
{"success":true,"message":"API is working"}
```

## Test Admin Login

Use the admin seed credentials through the deployed frontend, or test the API directly:

```bash
curl -i -c cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"identifier":"<admin-email>","password":"<admin-password>"}' \
  "http://127.0.0.1:$PORT/api/auth/login"
```

Then verify the session:

```bash
curl -b cookies.txt "http://127.0.0.1:$PORT/api/auth/session"
```

Expected session data includes `authenticated: true` and an admin `user` object.

## Smoke Test APIs

With the admin cookie:

```bash
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/tutors"
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/blogs"
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/reviews"
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/results"
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/pages"
curl -b cookies.txt "http://127.0.0.1:$PORT/api/admin/dashboard"
```

Public checks:

```bash
curl "http://127.0.0.1:$PORT/api/health"
curl "http://127.0.0.1:$PORT/api/public/bootstrap"
curl "http://127.0.0.1:$PORT/api/tutors"
curl "http://127.0.0.1:$PORT/api/blogs"
curl "http://127.0.0.1:$PORT/api/reviews"
```

## GitHub To CloudPanel Deployment Steps

1. Push the reviewed staging commit to GitHub.
2. In CloudPanel, pull the staging branch into the site/release path.
3. Confirm the app root is `ib-igcse-tutors/backend`.
4. Run `npm ci`.
5. Run `npm run build`.
6. Apply the PostgreSQL schema with `psql "$DATABASE_URL" -f src/db/schema.sql`.
7. Run `npm run db:check`.
8. Run `npm run seed` once after schema setup or when intentionally ensuring the admin user.
9. Start or reload the Node app.
10. Run the health check and admin login smoke test.

## Rollback Plan

1. Stop the CloudPanel Node app.
2. Restore the previous backend release or branch revision.
3. Restore the previous environment variables for that release.
4. Start the previous backend release.
5. Leave the PostgreSQL database in place until rollback is verified and a data-retention decision is made.

This rollback does not require dropping PostgreSQL tables.
