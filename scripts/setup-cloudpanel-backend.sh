#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/mathsbodhi/htdocs/www.mathsbodhi.in"
REPO_URL="https://github.com/shivani758/maths-bodhi.git"
BRANCH="staging"
BACKEND_DIR="ib-igcse-tutors/backend"
PM2_PROCESS="maths-bodhi-backend"
HEALTH_URL="http://localhost:10000/api/health"

echo "Setting up Maths Bodhi backend in ${APP_DIR}"
cd "${APP_DIR}"

if [ ! -d ".git" ]; then
  echo "No git repository found. Cloning ${BRANCH} into ${APP_DIR}."
  git clone --branch "${BRANCH}" --single-branch "${REPO_URL}" .
else
  echo "Git repository found. Resetting to origin/${BRANCH}."
  git fetch origin
  git checkout "${BRANCH}"
  git reset --hard "origin/${BRANCH}"
fi

cd "${BACKEND_DIR}"

if [ ! -f ".env" ]; then
  cat > .env.example.production.todo <<'EOF'
# Create this file on the server as:
# /home/mathsbodhi/htdocs/www.mathsbodhi.in/ib-igcse-tutors/backend/.env
#
# Fill in real production values on the server only.
# Do not commit .env or paste secrets into GitHub Actions.

NODE_ENV=production
HOST=0.0.0.0
PORT=10000

# PostgreSQL. DATABASE_URL is preferred; split variables are the fallback.
DATABASE_URL=postgresql://<database-user>:<url-encoded-database-password>@<database-host>:5432/mathsbodhi
DB_HOST=<database-host>
DB_PORT=5432
DB_NAME=mathsbodhi
DB_USER=<database-user>
DB_PASSWORD=<database-password>

SESSION_SECRET=<long-random-session-secret>
JWT_SECRET=<long-random-jwt-secret>

SESSION_COOKIE_NAME=maths_bodhi_admin_sid
SESSION_COOKIE_SAME_SITE=lax
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_DOMAIN=
FRONTEND_ORIGIN=https://mathsbodhi.in,https://www.mathsbodhi.in

ADMIN_SEED_NAME=Maths Bodhi Super Admin
ADMIN_SEED_EMAIL=<admin-email>
ADMIN_SEED_PASSWORD=<admin-seed-password>
EOF

  echo
  echo "Missing backend .env."
  echo "A placeholder was created at:"
  echo "  ${APP_DIR}/${BACKEND_DIR}/.env.example.production.todo"
  echo
  echo "Create the real backend .env at:"
  echo "  ${APP_DIR}/${BACKEND_DIR}/.env"
  echo "Then rerun this script. No secrets were written by this setup."
  exit 1
fi

npm ci
npm run build
npm run db:check

if pm2 describe "${PM2_PROCESS}" >/dev/null 2>&1; then
  pm2 restart "${PM2_PROCESS}" --update-env
else
  pm2 start dist/server.js --name "${PM2_PROCESS}" --update-env
fi

pm2 save

curl -f "${HEALTH_URL}"
echo
echo "Maths Bodhi backend setup complete."
