# 🌵 Suculentapp

Aplicación multiplataforma (mobile y web) para fanáticos de las suculentas y plantas crasas.
Integra registro de colección, herramientas de cuidado diario, reconocimiento de plantas por IA,
y una comunidad con marketplace para compra, venta e intercambio.

Construida según los documentos del workspace de Notion del proyecto
(visión general, arquitectura técnica, lineamientos del monorepo frontend, BFF y reconocedor IA).

## Estructura del repositorio

```
suculentapp-v2/
├── frontend/      ← monorepo Turborepo + pnpm workspaces
│   ├── apps/
│   │   ├── mobile/          → Expo ~55 (iOS + Android)
│   │   └── web/             → Next.js 16 + Tailwind CSS 4 (App Router)
│   └── packages/
│       ├── core/            → @suculentapp/core (tipos, hooks, services, store Zustand)
│       ├── tsconfig/        → @suculentapp/tsconfig (base / react-native / nextjs)
│       └── config-eslint/   → @suculentapp/config-eslint (rules / react / react-native)
└── backend/       ← BFF (Backend For Frontend) — Node.js + Express
    ├── src/                 → auth (Supabase JWT), X-Client, plants, alerts, identify, feed
    └── db/schema.sql        → esquema PostgreSQL (Supabase): users, plants, alerts, transactions, posts
```

## Stack

| Capa | Tecnología |
|---|---|
| Mobile | React Native / Expo |
| Web | React (Next.js) |
| Core compartido | TypeScript + Zustand |
| API | Node.js + Express (BFF) |
| Auth | Supabase Auth (JWT) |
| Base de datos | PostgreSQL (Supabase) |
| Storage | Supabase Storage |
| IA reconocedor | API de Claude con visión |
| Jobs / Cron | pg_cron (Supabase) |
| Email | Resend |

## Cómo correr

### Frontend (requiere pnpm)

```bash
cd frontend
pnpm install
pnpm dev                 # mobile + web en paralelo (turbo)
pnpm --filter web dev    # solo Next.js → http://localhost:3000
pnpm --filter mobile dev # solo Expo
pnpm type-check          # TS en todos los workspaces
pnpm lint                # ESLint en todos los workspaces
```

### Backend (BFF)

```bash
cd backend
npm install      # o pnpm install
cp .env.example .env   # completar credenciales (opcional)
npm run dev      # http://localhost:4000
```

Sin credenciales configuradas, el BFF y los frontends corren en **modo demo**:
usuario fijo, datos de ejemplo y resultado simulado del reconocedor. Con
`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` y `ANTHROPIC_API_KEY` en `.env`
se activan la DB real y Claude Vision.

Para crear el esquema en Supabase: ejecutar `backend/db/schema.sql` en el SQL editor.

## Decisiones clave (de los docs de Notion)

- **Monorepo**: el 80–90 % del código se comparte entre mobile y web vía `@suculentapp/core`.
- **BFF**: los frontends nunca hablan con Supabase directamente; el BFF valida JWT,
  limita scans del reconocedor y adapta respuestas según `X-Client: mobile | web`.
- **PostgreSQL relacional**: el modelo (plantas → usuario, hoja → planta madre,
  transacción entre dos usuarios) es inherentemente relacional.
- **`parent_id` en plants**: relación recursiva para el árbol genealógico.
- **`ai_scans_used` en users**: límite simple de 1 scan gratuito (premium = ilimitado).

## Roadmap

1. **Fase 1 — MVP**: colección básica, reconocedor IA, alertas de riego ✅ (este scaffold)
2. **Fase 2 — Comunidad**: catálogos públicos, contacto entre criadores, feed
3. **Fase 3 — Marketplace**: transacciones, reputación, insignias y gamificación
