BEGIN;

-- Maths Bodhi stores application tables in the public schema so they are visible in pgAdmin under:
-- Databases > mathsbodhi > Schemas > public > Tables.
-- This script is non-destructive for table data. It creates missing tables, columns, indexes,
-- constraints, and timestamp triggers needed by the raw pg backend.
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
  role TEXT NOT NULL DEFAULT 'admin' CONSTRAINT users_role_check
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

CREATE TABLE IF NOT EXISTS admin_sessions (
  sid TEXT PRIMARY KEY,
  sess JSONB NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CONSTRAINT tutors_status_check
    CHECK (status IN ('active', 'inactive')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  featured_in_home BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 99,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT blog_posts_status_check
    CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_at TIMESTAMPTZ,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  reviewer_name TEXT NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'pending' CONSTRAINT reviews_moderation_status_check
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

CREATE TABLE IF NOT EXISTS student_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  student_label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT student_results_status_check
    CHECK (status IN ('draft', 'approved')),
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  linked_tutor_id TEXT NOT NULL DEFAULT '',
  board TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT 'gurugram',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  page_type TEXT NOT NULL CONSTRAINT pages_page_type_check
    CHECK (page_type IN ('board', 'subject')),
  page_key TEXT NOT NULL,
  slug TEXT NOT NULL,
  route TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT pages_status_check
    CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  linked_type TEXT NOT NULL DEFAULT 'page',
  linked_id TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT faqs_status_check
    CHECK (status IN ('draft', 'published', 'archived')),
  order_index INTEGER NOT NULL DEFAULT 99,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  slug TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT cities_status_check
    CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS localities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id TEXT,
  city_slug TEXT NOT NULL DEFAULT 'gurugram',
  slug TEXT NOT NULL,
  sector_label TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft' CONSTRAINT localities_status_check
    CHECK (status IN ('draft', 'published', 'archived')),
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Compatibility columns for databases that may have been partially initialized before this schema.
ALTER TABLE users ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE users ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'admin';
ALTER TABLE users ADD COLUMN IF NOT EXISTS active BOOLEAN;
ALTER TABLE users ALTER COLUMN active SET DEFAULT TRUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_token_hash TEXT;
ALTER TABLE users ALTER COLUMN email_verification_token_hash SET DEFAULT '';
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verification_sent_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS portal_profile JSONB;
ALTER TABLE users ALTER COLUMN portal_profile SET DEFAULT '{}'::jsonb;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE users ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE users ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS sid TEXT;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS sess JSONB;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE admin_sessions ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE admin_sessions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE admin_sessions ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE tutors ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE tutors ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE tutors ALTER COLUMN status SET DEFAULT 'active';
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS featured BOOLEAN;
ALTER TABLE tutors ALTER COLUMN featured SET DEFAULT FALSE;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS featured_in_home BOOLEAN;
ALTER TABLE tutors ALTER COLUMN featured_in_home SET DEFAULT FALSE;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS display_order INTEGER;
ALTER TABLE tutors ALTER COLUMN display_order SET DEFAULT 99;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE tutors ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE tutors ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE tutors ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE blog_posts ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE blog_posts ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS publish_at TIMESTAMPTZ;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE blog_posts ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE blog_posts ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE blog_posts ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE reviews ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS reviewer_name TEXT;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS moderation_status TEXT;
ALTER TABLE reviews ALTER COLUMN moderation_status SET DEFAULT 'pending';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS featured BOOLEAN;
ALTER TABLE reviews ALTER COLUMN featured SET DEFAULT FALSE;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS order_index INTEGER;
ALTER TABLE reviews ALTER COLUMN order_index SET DEFAULT 99;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS linked_tutor_id TEXT;
ALTER TABLE reviews ALTER COLUMN linked_tutor_id SET DEFAULT '';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS linked_board TEXT;
ALTER TABLE reviews ALTER COLUMN linked_board SET DEFAULT '';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE reviews ALTER COLUMN city SET DEFAULT 'gurugram';
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE reviews ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE reviews ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE reviews ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE reviews ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE student_results ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE student_results ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS student_label TEXT;
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE student_results ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS featured BOOLEAN;
ALTER TABLE student_results ALTER COLUMN featured SET DEFAULT FALSE;
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS linked_tutor_id TEXT;
ALTER TABLE student_results ALTER COLUMN linked_tutor_id SET DEFAULT '';
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS board TEXT;
ALTER TABLE student_results ALTER COLUMN board SET DEFAULT '';
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE student_results ALTER COLUMN city SET DEFAULT 'gurugram';
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE student_results ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE student_results ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE student_results ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE student_results ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE pages ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE pages ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE pages ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS page_type TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS page_key TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS route TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE pages ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE pages ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE pages ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE pages ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE pages ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE pages ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE pages ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE faqs ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE faqs ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS linked_type TEXT;
ALTER TABLE faqs ALTER COLUMN linked_type SET DEFAULT 'page';
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS linked_id TEXT;
ALTER TABLE faqs ALTER COLUMN linked_id SET DEFAULT '';
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE faqs ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS order_index INTEGER;
ALTER TABLE faqs ALTER COLUMN order_index SET DEFAULT 99;
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE faqs ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE faqs ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE faqs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE faqs ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE cities ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE cities ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE cities ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE cities ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE cities ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE cities ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE cities ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE cities ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE cities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE cities ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE localities ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE localities ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE localities ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE localities ADD COLUMN IF NOT EXISTS city_slug TEXT;
ALTER TABLE localities ALTER COLUMN city_slug SET DEFAULT 'gurugram';
ALTER TABLE localities ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE localities ADD COLUMN IF NOT EXISTS sector_label TEXT;
ALTER TABLE localities ALTER COLUMN sector_label SET DEFAULT '';
ALTER TABLE localities ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE localities ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE localities ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE localities ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE localities ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE localities ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE localities ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE localities ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS id UUID;
ALTER TABLE media_assets ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS source_id TEXT;
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE media_assets ALTER COLUMN url SET DEFAULT '';
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS mime_type TEXT;
ALTER TABLE media_assets ALTER COLUMN mime_type SET DEFAULT '';
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS status TEXT;
ALTER TABLE media_assets ALTER COLUMN status SET DEFAULT 'ready';
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE media_assets ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE media_assets ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE media_assets ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE media_assets ALTER COLUMN updated_at SET DEFAULT NOW();

ALTER TABLE settings ADD COLUMN IF NOT EXISTS key TEXT;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS data JSONB;
ALTER TABLE settings ALTER COLUMN data SET DEFAULT '{}'::jsonb;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ;
ALTER TABLE settings ALTER COLUMN created_at SET DEFAULT NOW();
ALTER TABLE settings ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE settings ALTER COLUMN updated_at SET DEFAULT NOW();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_role_check') THEN
    ALTER TABLE users ADD CONSTRAINT users_role_check
      CHECK (role IN ('super_admin', 'admin', 'editor', 'student', 'tutor')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'tutors_status_check') THEN
    ALTER TABLE tutors ADD CONSTRAINT tutors_status_check
      CHECK (status IN ('active', 'inactive')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'blog_posts_status_check') THEN
    ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_status_check
      CHECK (status IN ('draft', 'published', 'scheduled')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'reviews_moderation_status_check') THEN
    ALTER TABLE reviews ADD CONSTRAINT reviews_moderation_status_check
      CHECK (moderation_status IN ('draft', 'pending', 'approved', 'archived')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'student_results_status_check') THEN
    ALTER TABLE student_results ADD CONSTRAINT student_results_status_check
      CHECK (status IN ('draft', 'approved')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_page_type_check') THEN
    ALTER TABLE pages ADD CONSTRAINT pages_page_type_check
      CHECK (page_type IN ('board', 'subject')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pages_status_check') THEN
    ALTER TABLE pages ADD CONSTRAINT pages_status_check
      CHECK (status IN ('draft', 'published', 'archived')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'faqs_status_check') THEN
    ALTER TABLE faqs ADD CONSTRAINT faqs_status_check
      CHECK (status IN ('draft', 'published', 'archived')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'cities_status_check') THEN
    ALTER TABLE cities ADD CONSTRAINT cities_status_check
      CHECK (status IN ('draft', 'published', 'archived')) NOT VALID;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'localities_status_check') THEN
    ALTER TABLE localities ADD CONSTRAINT localities_status_check
      CHECK (status IN ('draft', 'published', 'archived')) NOT VALID;
  END IF;
END;
$$;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx ON users (LOWER(email));
CREATE INDEX IF NOT EXISTS users_role_idx ON users (role);
CREATE INDEX IF NOT EXISTS users_active_idx ON users (active);
CREATE INDEX IF NOT EXISTS users_email_verification_token_idx
  ON users (email_verification_token_hash)
  WHERE email_verification_token_hash <> '';

CREATE INDEX IF NOT EXISTS admin_sessions_expires_at_idx ON admin_sessions (expires_at);

CREATE UNIQUE INDEX IF NOT EXISTS tutors_source_id_unique_idx
  ON tutors (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS tutors_slug_unique_idx ON tutors (LOWER(slug));
CREATE INDEX IF NOT EXISTS tutors_status_idx ON tutors (status);
CREATE INDEX IF NOT EXISTS tutors_featured_display_idx ON tutors (featured, display_order);
CREATE INDEX IF NOT EXISTS tutors_data_gin_idx ON tutors USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_source_id_unique_idx
  ON blog_posts (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique_idx ON blog_posts (LOWER(slug));
CREATE INDEX IF NOT EXISTS blog_posts_status_publish_idx ON blog_posts (status, publish_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_data_gin_idx ON blog_posts USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS reviews_source_id_unique_idx
  ON reviews (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS reviews_moderation_order_idx ON reviews (moderation_status, order_index);
CREATE INDEX IF NOT EXISTS reviews_featured_idx ON reviews (featured);
CREATE INDEX IF NOT EXISTS reviews_linked_tutor_idx ON reviews (linked_tutor_id);
CREATE INDEX IF NOT EXISTS reviews_linked_board_idx ON reviews (linked_board);
CREATE INDEX IF NOT EXISTS reviews_city_idx ON reviews (city);
CREATE INDEX IF NOT EXISTS reviews_data_gin_idx ON reviews USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS student_results_source_id_unique_idx
  ON student_results (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS student_results_status_featured_idx ON student_results (status, featured);
CREATE INDEX IF NOT EXISTS student_results_linked_tutor_idx ON student_results (linked_tutor_id);
CREATE INDEX IF NOT EXISTS student_results_board_idx ON student_results (board);
CREATE INDEX IF NOT EXISTS student_results_city_idx ON student_results (city);
CREATE INDEX IF NOT EXISTS student_results_data_gin_idx ON student_results USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS pages_source_id_unique_idx
  ON pages (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS pages_route_unique_idx ON pages (LOWER(route));
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages (LOWER(slug));
CREATE INDEX IF NOT EXISTS pages_type_status_updated_idx ON pages (page_type, status, updated_at DESC);
CREATE INDEX IF NOT EXISTS pages_page_key_type_idx ON pages (page_key, page_type);
CREATE INDEX IF NOT EXISTS pages_data_gin_idx ON pages USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS faqs_source_id_unique_idx
  ON faqs (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS faqs_linked_idx ON faqs (linked_type, linked_id);
CREATE INDEX IF NOT EXISTS faqs_status_order_idx ON faqs (status, order_index);
CREATE INDEX IF NOT EXISTS faqs_data_gin_idx ON faqs USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS cities_source_id_unique_idx
  ON cities (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS cities_slug_unique_idx ON cities (LOWER(slug));
CREATE INDEX IF NOT EXISTS cities_status_idx ON cities (status);
CREATE INDEX IF NOT EXISTS cities_data_gin_idx ON cities USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS localities_source_id_unique_idx
  ON localities (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE UNIQUE INDEX IF NOT EXISTS localities_city_slug_unique_idx ON localities (LOWER(city_slug), LOWER(slug));
CREATE INDEX IF NOT EXISTS localities_status_idx ON localities (status);
CREATE INDEX IF NOT EXISTS localities_data_gin_idx ON localities USING GIN (data);

CREATE UNIQUE INDEX IF NOT EXISTS media_assets_source_id_unique_idx
  ON media_assets (source_id)
  WHERE source_id IS NOT NULL AND source_id <> '';
CREATE INDEX IF NOT EXISTS media_assets_status_idx ON media_assets (status);
CREATE INDEX IF NOT EXISTS media_assets_data_gin_idx ON media_assets USING GIN (data);

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
