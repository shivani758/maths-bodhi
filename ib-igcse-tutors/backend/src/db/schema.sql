BEGIN;

-- Maths Bodhi stores application tables in the public schema so they are visible in pgAdmin under:
-- Databases > mathsbodhi > Schemas > public > Tables.
-- This script is non-destructive for table data; it creates missing tables/indexes and refreshes triggers.
CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin'
    CHECK (role IN ('super_admin', 'admin', 'editor', 'student', 'tutor')),
  active BOOLEAN NOT NULL DEFAULT TRUE,
  email_verified_at TIMESTAMPTZ,
  email_verification_token_hash TEXT NOT NULL DEFAULT '',
  email_verification_expires_at TIMESTAMPTZ,
  email_verification_sent_at TIMESTAMPTZ,
  portal_profile JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS users_role_idx ON users (role);
CREATE INDEX IF NOT EXISTS users_active_idx ON users (active);
CREATE INDEX IF NOT EXISTS users_email_verification_token_idx
  ON users (email_verification_token_hash)
  WHERE email_verification_token_hash <> '';

CREATE TABLE IF NOT EXISTS admin_sessions (
  sid TEXT PRIMARY KEY,
  sess JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions (expires_at);

CREATE TABLE IF NOT EXISTS tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  featured_in_home BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 99,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS tutors_source_id_unique_idx
  ON tutors (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS tutors_slug_unique_idx ON tutors (LOWER(slug));
CREATE INDEX IF NOT EXISTS tutors_status_idx ON tutors (status);
CREATE INDEX IF NOT EXISTS tutors_featured_display_idx ON tutors (featured, display_order);
CREATE INDEX IF NOT EXISTS tutors_data_gin_idx ON tutors USING GIN (data);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_at TIMESTAMPTZ,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_source_id_unique_idx
  ON blog_posts (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique_idx ON blog_posts (LOWER(slug));
CREATE INDEX IF NOT EXISTS blog_posts_status_publish_idx ON blog_posts (status, publish_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_data_gin_idx ON blog_posts USING GIN (data);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  reviewer_name TEXT NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (moderation_status IN ('draft', 'pending', 'approved', 'archived')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  order_index INTEGER NOT NULL DEFAULT 99,
  linked_tutor_id TEXT NOT NULL DEFAULT '',
  linked_board TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'gurugram',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS reviews_source_id_unique_idx
  ON reviews (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS reviews_moderation_order_idx ON reviews (moderation_status, order_index);
CREATE INDEX IF NOT EXISTS reviews_featured_idx ON reviews (featured);
CREATE INDEX IF NOT EXISTS reviews_linked_tutor_idx ON reviews (linked_tutor_id);
CREATE INDEX IF NOT EXISTS reviews_linked_board_idx ON reviews (linked_board);
CREATE INDEX IF NOT EXISTS reviews_city_idx ON reviews (city);
CREATE INDEX IF NOT EXISTS reviews_data_gin_idx ON reviews USING GIN (data);

CREATE TABLE IF NOT EXISTS student_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  student_label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  linked_tutor_id TEXT NOT NULL DEFAULT '',
  board TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'gurugram',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS student_results_source_id_unique_idx
  ON student_results (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS student_results_status_featured_idx ON student_results (status, featured);
CREATE INDEX IF NOT EXISTS student_results_linked_tutor_idx ON student_results (linked_tutor_id);
CREATE INDEX IF NOT EXISTS student_results_board_idx ON student_results (board);
CREATE INDEX IF NOT EXISTS student_results_city_idx ON student_results (city);
CREATE INDEX IF NOT EXISTS student_results_data_gin_idx ON student_results USING GIN (data);

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  page_type TEXT NOT NULL CHECK (page_type IN ('board', 'subject')),
  page_key TEXT NOT NULL,
  slug TEXT NOT NULL,
  route TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS pages_source_id_unique_idx
  ON pages (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS pages_route_unique_idx ON pages (LOWER(route));
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages (LOWER(slug));
CREATE INDEX IF NOT EXISTS pages_type_status_updated_idx ON pages (page_type, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS pages_page_key_type_idx ON pages (page_key, page_type);
CREATE INDEX IF NOT EXISTS pages_data_gin_idx ON pages USING GIN (data);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  linked_type TEXT NOT NULL DEFAULT 'page',
  linked_id TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  order_index INTEGER NOT NULL DEFAULT 99,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS faqs_source_id_unique_idx
  ON faqs (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS faqs_linked_idx ON faqs (linked_type, linked_id);
CREATE INDEX IF NOT EXISTS faqs_status_order_idx ON faqs (status, order_index);
CREATE INDEX IF NOT EXISTS faqs_data_gin_idx ON faqs USING GIN (data);

CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS cities_source_id_unique_idx
  ON cities (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS cities_slug_unique_idx ON cities (LOWER(slug));
CREATE INDEX IF NOT EXISTS cities_status_idx ON cities (status);
CREATE INDEX IF NOT EXISTS cities_data_gin_idx ON cities USING GIN (data);

CREATE TABLE IF NOT EXISTS localities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  city_slug TEXT NOT NULL DEFAULT 'gurugram',
  slug TEXT NOT NULL,
  sector_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS localities_source_id_unique_idx
  ON localities (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS localities_city_slug_unique_idx ON localities (LOWER(city_slug), LOWER(slug));
CREATE INDEX IF NOT EXISTS localities_status_idx ON localities (status);
CREATE INDEX IF NOT EXISTS localities_data_gin_idx ON localities USING GIN (data);

CREATE TABLE IF NOT EXISTS media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  name TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  mime_type TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'ready',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS media_assets_source_id_unique_idx
  ON media_assets (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS media_assets_status_idx ON media_assets (status);
CREATE INDEX IF NOT EXISTS media_assets_data_gin_idx ON media_assets USING GIN (data);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS settings_data_gin_idx ON settings USING GIN (data);

DROP TRIGGER IF EXISTS users_set_updated_at ON users;
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS admin_sessions_set_updated_at ON admin_sessions;
CREATE TRIGGER admin_sessions_set_updated_at BEFORE UPDATE ON admin_sessions
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS tutors_set_updated_at ON tutors;
CREATE TRIGGER tutors_set_updated_at BEFORE UPDATE ON tutors
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS blog_posts_set_updated_at ON blog_posts;
CREATE TRIGGER blog_posts_set_updated_at BEFORE UPDATE ON blog_posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS reviews_set_updated_at ON reviews;
CREATE TRIGGER reviews_set_updated_at BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS student_results_set_updated_at ON student_results;
CREATE TRIGGER student_results_set_updated_at BEFORE UPDATE ON student_results
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS pages_set_updated_at ON pages;
CREATE TRIGGER pages_set_updated_at BEFORE UPDATE ON pages
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS faqs_set_updated_at ON faqs;
CREATE TRIGGER faqs_set_updated_at BEFORE UPDATE ON faqs
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS cities_set_updated_at ON cities;
CREATE TRIGGER cities_set_updated_at BEFORE UPDATE ON cities
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS localities_set_updated_at ON localities;
CREATE TRIGGER localities_set_updated_at BEFORE UPDATE ON localities
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS media_assets_set_updated_at ON media_assets;
CREATE TRIGGER media_assets_set_updated_at BEFORE UPDATE ON media_assets
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS settings_set_updated_at ON settings;
CREATE TRIGGER settings_set_updated_at BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

COMMIT;
