# AGENTS.md — Campus Maintenance

## Project

- Backend: NestJS + Mongoose in `apps/api`
- Frontend: Next.js App Router in `apps/web`
- Database: MongoDB Atlas
- API docs: Swagger
- Generated types: `apps/web/lib/api-types.ts`
- Specification: `specs/campus-maintenance.md`

## Architecture

1. Preserve MVC/separation of concerns.
2. Controllers handle HTTP concerns; services handle business/database logic.
3. Schemas define persistence; DTOs validate API input.
4. Frontend must use the API, not MongoDB directly.
5. Do not add out-of-scope features without approval.

## Contract

Create fields: title, description, location, category.
Categories: equipment, electrical, plumbing, facility, other.
Statuses: open, resolved.
Client must not set status on create.

Routes:

- POST /requests
- GET /requests
- GET /requests?category=<category>
- PATCH /requests/:id/resolve

## Quality and security

- No `any` unless unavoidable and justified.
- Validate external input.
- Add/update meaningful tests.
- Do not add unnecessary packages.
- Reuse `components/ui`.
- Never expose or edit `.env`, credentials, tokens, API keys, or connection strings.

## Commands

Backend:

```bash
cd apps/api
npm run start:dev
npm test
npm run lint
```

Frontend:

```bash
cd apps/web
npm run dev
npm run lint
```

Refresh API types:

```bash
npx openapi-typescript http://localhost:3001/api-json -o apps/web/lib/api-types.ts
```

## Workflow

Plan → implement small steps → verify → read diff → log AI usage → PR → review → CI → merge.

## Notes from `/init` (reviewed and kept)

- Backend is NestJS 11 (Jest for tests, ESLint + Prettier for lint). Unit tests live next to the code as `*.spec.ts`.
- Frontend is Next.js 16 App Router with Tailwind CSS v4; read `apps/web/AGENTS.md` before using Next APIs (breaking changes vs older versions).
- shadcn/ui components live in `apps/web/components/ui`; design tokens live in `apps/web/app/globals.css`.
- Frontend reads the API base URL from `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`).
- Spec Kit files live in `.specify/`; Spec Kit skills are under `.claude/skills/speckit-*`.
- Line endings are normalised to LF via `.gitattributes`.
