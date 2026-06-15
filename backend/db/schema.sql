-- Esquema principal de Suculentapp (PostgreSQL via Supabase)
-- Fuente: página de Notion "Arquitectura técnica"

CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  name        TEXT,
  plan        TEXT DEFAULT 'free',  -- 'free' | 'premium'
  reputation  NUMERIC DEFAULT 0,
  location    TEXT,
  ai_scans_used INT DEFAULT 0,      -- para limitar el 1 scan gratuito
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  species     TEXT,
  common_name TEXT,
  substrate   TEXT,
  pot_size    TEXT,
  sun_exposure TEXT,
  parent_id   UUID REFERENCES plants(id),  -- árbol genealógico
  status      TEXT DEFAULT 'active',  -- 'active' | 'propagating' | 'sold' | 'gifted'
  is_public   BOOLEAN DEFAULT false,
  acquired_at DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE alerts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id    UUID REFERENCES plants(id),
  type        TEXT,  -- 'watering' | 'fertilizing' | 'repotting' | 'treatment'
  frequency_days INT,
  next_due    TIMESTAMPTZ,
  last_done_at TIMESTAMPTZ,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id   UUID REFERENCES users(id),
  buyer_id    UUID REFERENCES users(id),
  plant_id    UUID REFERENCES plants(id),
  type        TEXT,  -- 'sale' | 'trade' | 'gift'
  amount      NUMERIC,  -- null si es trueque o regalo
  status      TEXT DEFAULT 'pending',  -- 'pending' | 'completed' | 'cancelled'
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  plant_id    UUID REFERENCES plants(id),  -- opcional
  content     TEXT,
  images      TEXT[],  -- array de URLs de Supabase Storage
  likes_count INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Función usada por el BFF tras un scan exitoso del reconocedor
CREATE OR REPLACE FUNCTION increment_ai_scans(p_user_id UUID)
RETURNS void AS $$
  UPDATE users SET ai_scans_used = ai_scans_used + 1 WHERE id = p_user_id;
$$ LANGUAGE sql;

-- Índices útiles
CREATE INDEX idx_plants_user ON plants(user_id);
CREATE INDEX idx_alerts_due ON alerts(next_due) WHERE is_active;
CREATE INDEX idx_posts_created ON posts(created_at DESC);

-- Jobs / alertas: pg_cron corre dentro de Supabase.
-- Cada hora detecta plantas que necesitan riego y encola notificaciones:
--   SELECT cron.schedule('check-watering', '0 * * * *', $$ ... $$);
