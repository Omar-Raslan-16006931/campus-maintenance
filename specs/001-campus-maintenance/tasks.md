# Tasks: Campus Maintenance Request System

**Input**: Design documents from `/specs/001-campus-maintenance/`
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Scaffold `apps/api` (NestJS) and `apps/web` (Next.js)
- [x] T002 Shared layer: Prettier, Husky, lint-staged, CI, PR template, AGENTS.md
- [x] T003 Configure Mongoose, ValidationPipe, CORS, PORT, Swagger in `apps/api/src`

## Phase 2: Foundational (Blocking Prerequisites) — Student D

- [ ] T004 Category/status constants in `apps/api/src/requests/request.constants.ts`
- [ ] T005 MaintenanceRequest schema (timestamps, enums, default `open`) in `apps/api/src/requests/schemas/`
- [ ] T006 `RequestsModule` shell registering the model; import in `AppModule`
- [ ] T007 [P] Shared layout, header/nav and design tokens in `apps/web/app/layout.tsx` + `globals.css`
- [ ] T008 [P] Schema unit test

**Checkpoint**: Foundation ready — user stories can proceed in parallel.

## Phase 3: User Story 1 - Report a request (P1) 🎯 MVP — Student A

- [ ] T009 [US1] `CreateRequestDto` with class-validator + Swagger decorators (no `status`)
- [ ] T010 [US1] `RequestsService.create` + unit tests
- [ ] T011 [US1] `POST /requests` in controller + HTTP tests (400 on missing title / invalid category / status field)
- [ ] T012 [US1] Refresh `apps/web/lib/api-types.ts`
- [ ] T013 [US1] `/requests/new` form using `components/ui`, showing field + API errors

## Phase 4: User Story 2 - Browse and filter (P2) — Student B

- [ ] T014 [US2] `ListRequestsQueryDto` with optional validated `category`
- [ ] T015 [US2] `RequestsService.findAll(category?)` + unit tests
- [ ] T016 [US2] `GET /requests` + HTTP tests
- [ ] T017 [US2] `/requests` page: cards with title, location, category, status; category Select filter via `?category=`
- [ ] T018 [US2] Playwright check: list changes after filtering

## Phase 5: User Story 3 - Mark resolved (P3) — Student C

- [ ] T019 [US3] `RequestsService.resolve(id)` (404 when missing) + unit tests
- [ ] T020 [US3] `PATCH /requests/:id/resolve` with ObjectId validation + HTTP tests
- [ ] T021 [US3] "Mark resolved" button on open requests; UI updates after success; no active button when resolved

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T022 Update README with run instructions
- [ ] T023 Log AI usage in `docs/ai-log.md` for every PR

## Dependencies & Execution Order

- Phase 1 → Phase 2 (blocks everything) → Phases 3, 4, 5 in parallel → Polish.
- Within a story: DTO → service + tests → controller + tests → refresh types → UI.

### Parallel Opportunities

- T007 and T008 in parallel. US1, US2, US3 in parallel once Phase 2 is merged (different files except `requests.controller.ts`/`requests.service.ts`, merge carefully).
