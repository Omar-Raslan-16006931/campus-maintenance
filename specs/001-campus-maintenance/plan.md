# Implementation Plan: Campus Maintenance Request System

**Branch**: `001-campus-maintenance` | **Date**: 2026-09-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-campus-maintenance/spec.md`

## Summary

A NestJS + Mongoose REST API (port 3001, Swagger contract) and a Next.js App Router + shadcn/ui frontend (port 3000) backed by MongoDB Atlas. One `requests` module with controller / service / schema / DTOs; the frontend consumes generated OpenAPI types.

## Technical Context

**Language/Version**: TypeScript 5, Node.js 22 LTS
**Primary Dependencies**: NestJS 11, @nestjs/mongoose, @nestjs/config, @nestjs/swagger, class-validator; Next.js 16, React 19, Tailwind CSS 4, shadcn/ui
**Storage**: MongoDB Atlas (collection `maintenancerequests`)
**Testing**: Jest + @nestjs/testing + supertest (API); ESLint + `next build` (web); Playwright MCP for UI checks
**Target Platform**: Local dev on Windows/macOS; CI on ubuntu-latest
**Project Type**: Web application (frontend + backend)
**Performance Goals**: Interactive (<500 ms per request on Atlas free tier)
**Constraints**: No new packages without approval; no `any`; `.env` never committed
**Scale/Scope**: One campus, 4 endpoints, 2 pages

## Constitution Check

| Principle                   | Status                                                          |
| --------------------------- | --------------------------------------------------------------- |
| I. Code Quality             | ✅ strict TS, ESLint, Prettier, Husky                           |
| II. Tests for Every Service | ✅ service unit tests + HTTP tests per endpoint                 |
| III. MVC Separation         | ✅ controller / service / schema / DTO; web uses API only       |
| IV. No Secrets in Code      | ✅ `.env` ignored + hook-protected, `.env.example` placeholders |
| V. Spec-Bounded Scope       | ✅ only the 4 MVP features                                      |

## Project Structure

### Documentation (this feature)

```text
specs/001-campus-maintenance/
├── spec.md
├── plan.md
├── tasks.md
└── checklists/requirements.md
```

### Source Code (repository root)

```text
apps/api/src/
├── main.ts                     # bootstrap + Swagger
├── setup-app.ts                # ValidationPipe + CORS (shared with tests)
├── app.module.ts               # Config + Mongoose + RequestsModule
└── requests/
    ├── requests.module.ts
    ├── requests.controller.ts
    ├── requests.service.ts
    ├── request.constants.ts    # categories + statuses
    ├── schemas/maintenance-request.schema.ts
    └── dto/
        ├── create-request.dto.ts
        ├── list-requests-query.dto.ts
        └── maintenance-request-response.dto.ts

apps/web/
├── app/layout.tsx, app/globals.css      # shared layout + design tokens
├── app/requests/page.tsx                # list + filter + resolve
├── app/requests/new/page.tsx            # report form
├── components/ui/                       # shadcn/ui
├── components/                          # feature components
└── lib/api.ts, lib/api-types.ts         # API client + generated types
```

**Structure Decision**: Option 2 (web application) with `apps/api` and `apps/web`.

## Complexity Tracking

No constitution violations.
