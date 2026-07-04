# FoundrAI

An AI Executive War Room where founders submit a startup idea and get analyzed by a panel of AI agents (market, competition, financial risk, growth, execution, etc.), producing a Proceed/Pivot/Reject verdict.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the Node/Express API server (port 5000)
- `python -m uvicorn main:app --host 0.0.0.0 --port 8082 --reload` (run from `artifacts/fastapi-server/`) — run the Python FastAPI analysis backend directly; normally started via its own workflow
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- FastAPI (Python 3.11) — secondary backend for AI analysis, served at `/fastapi`, registered as a second service under the `api-server` artifact
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite, Tailwind, Framer Motion, shadcn/ui, react-router-dom, lucide-react, recharts

## Where things live

- `artifacts/foundrai/` — React+Vite frontend (landing page, `/analyze` form, `/dashboard` results)
- `artifacts/api-server/` — Node/Express backend (shared)
- `artifacts/fastapi-server/` — Python FastAPI backend, Phase 1: mock `POST /fastapi/analyze` endpoint, modular `app/routes` `app/models` `app/services` structure; served on its own port/workflow but registered under `api-server`'s `artifact.toml`

## Architecture decisions

- No native Python/FastAPI artifact type exists in this monorepo's `createArtifact` tooling, so the FastAPI service was added as a second `[[services]]` entry inside the existing `api-server` artifact's `artifact.toml`, rather than as its own registered artifact.
- The shared reverse proxy does not rewrite paths, so the FastAPI app mounts all routes (including docs/openapi) under its own `/fastapi` prefix internally.
- FastAPI Phase 1 returns static mock scores/verdict from `app/services/analysis_service.py`; this is the seam where real AI-agent logic (e.g. CrewAI) will plug in later without changing the route layer.

## Product

- Landing page introducing FoundrAI and its AI agent panel
- `/analyze` — startup submission form with a simulated "AI Boardroom" loading state
- `/dashboard` — results view: score cards, AI agent insights, visual analysis bars, final CEO verdict
- FastAPI backend (`/fastapi/analyze`) — Phase 1 mock scoring endpoint (market/competition/financial/risk scores + verdict), CORS enabled

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Premium dark futuristic glassmorphism design (OpenAI/Stripe/Linear/Vercel vibe) is a strict, ongoing requirement for all frontend work.
- When editing a multi-service `artifact.toml`, a newly added `[[services]]` block appears as a `NOT_STARTED` workflow and needs an explicit `restart_workflow` call.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
