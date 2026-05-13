# CloudPanel Deployment: PostgreSQL Backend

This backend now uses PostgreSQL at runtime. Do not commit production credentials; add them in CloudPanel environment variables.

This guide assumes the repository is already on the staging branch and the PostgreSQL database/user have already been created on the team server.

## App Path

Use the backend directory as the Node app root:

```bash
/home/<cloudpanel-user>/htdocs/<site>/ib-igcse-tutors/backend
```

If your repository is deployed to a different release path, run all backend commands from that `backend` directory.

## Runtime

Use Node.js 20 LTS or newer on the CloudPanel Node app.

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
HOST=0.0.0.0
PORT=<cloudpanel-node-port>
DB_PROVIDER=postgres
DATABASE_URL=<postgres-connection-url>
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
SESSION_SECRET=<long-random-session-secret>
JWT_SECRET=<long-random-jwt-secret>
ADMIN_SEED_EMAIL=<admin-email>
ADMIN_SEED_PASSWORD=<admin-password>
ADMIN_SEED_NAME=<admin-display-name>
FRONTEND_ORIGIN=<https://your-frontend-domain>
SESSION_COOKIE_NAME=maths_bodhi_admin_sid
SESSION_COOKIE_SAME_SITE=none
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_DOMAIN=<optional-cookie-domain>
```

`DATABASE_URL` is preferred. If it is set, the backend ignores the split `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` values. Keep the split values available only as fallback.

`DB_HOST=127.0.0.1` works only when the backend process runs on the same server as PostgreSQL. From a laptop, `127.0.0.1` points to the laptop, not the CloudPanel server. Remote pgAdmin access needs the server IP/hostname and firewall access, or an SSH tunnel to the PostgreSQL server.

## PostgreSQL Setup

Create the database and user on the CloudPanel server. Example only:

```sql
CREATE DATABASE maths_bodhi;
CREATE USER maths_bodhi_user WITH PASSWORD '<strong-password>';
GRANT ALL PRIVILEGES ON DATABASE maths_bodhi TO maths_bodhi_user;
```

Then connect to the database and grant schema privileges if your PostgreSQL version requires it:

```sql
GRANT ALL ON SCHEMA public TO maths_bodhi_user;
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

The schema creates tables for users/admin auth, sessions, tutors, blogs, reviews, student results, pages, FAQs, cities, localities, media assets, and settings.

## Seed The Admin User

After schema setup and env variables are present:

```bash
npm run seed
```

The seed script uses `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, and `ADMIN_SEED_NAME`. It does not print the password.

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
7. Run `npm run seed` once after schema setup or when intentionally ensuring the admin user.
8. Start or reload the Node app.
9. Run the health check and admin login smoke test.

## Rollback Plan

1. Stop the CloudPanel Node app.
2. Restore the previous backend release or branch revision that used MongoDB.
3. Restore the previous MongoDB environment variables, including `MONGO_URI`, in CloudPanel.
4. Start the previous backend release.
5. Leave the PostgreSQL database in place until the rollback is verified and a data-retention decision is made.

This rollback does not require dropping PostgreSQL tables.
