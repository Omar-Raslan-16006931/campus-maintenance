# Feature Specification: Campus Maintenance Request System

**Feature Branch**: `001-campus-maintenance`
**Created**: 2026-09-26
**Status**: Draft
**Input**: User description: "Problem, Users, MVP features and Out of scope from specs/campus-maintenance.md"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Report a maintenance request (Priority: P1)

A student or staff member notices a problem (e.g. a broken projector) and reports it with a title, description, location and category.

**Why this priority**: Without reported requests nothing else in the system has data to show.

**Independent Test**: Submit the form at `/requests/new`; a request is stored with status `open`.

**Acceptance Scenarios**:

1. **Given** a valid title, description, location and category, **When** the reporter submits, **Then** the request is created with status `open` and timestamps.
2. **Given** a missing title, **When** the reporter submits, **Then** the API returns 400 and the form shows an error.
3. **Given** an unsupported category, **When** the request is posted, **Then** the API returns 400.
4. **Given** a body containing `status: "resolved"`, **When** it is posted, **Then** the API rejects it (400).

---

### User Story 2 - Browse and filter requests (Priority: P2)

A campus community member views all reported requests (title, location, category, status) and narrows them by category.

**Why this priority**: Lets the community see what is already reported and its state.

**Independent Test**: Open `/requests`, choose "electrical" — only electrical requests remain visible.

**Acceptance Scenarios**:

1. **Given** existing requests, **When** `GET /requests` is called, **Then** all requests are returned, newest first.
2. **Given** `?category=electrical`, **When** called, **Then** only electrical requests are returned.
3. **Given** `?category=spaceship`, **When** called, **Then** the API returns 400.

---

### User Story 3 - Mark a request resolved (Priority: P3)

Someone confirms a problem has been fixed and marks the request resolved.

**Why this priority**: Closes the loop so the list reflects reality.

**Independent Test**: Click "Mark resolved" on an open request; its badge changes to "resolved" and the button disappears.

**Acceptance Scenarios**:

1. **Given** an open request, **When** `PATCH /requests/:id/resolve` is called, **Then** status becomes `resolved`.
2. **Given** an unknown id, **When** called, **Then** the API returns 404.
3. **Given** a malformed id, **When** called, **Then** the API returns 400.
4. **Given** an already resolved request, **When** viewed in the UI, **Then** no active resolve button is shown.

### Edge Cases

- Whitespace-only title/description/location is treated as missing.
- Unknown extra properties in the create body are rejected (400).
- Resolving an already resolved request is idempotent (stays `resolved`).
- API unreachable → the UI shows a readable error instead of crashing.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST let users create a request with required non-empty `title`, `description`, `location`, and `category`.
- **FR-002**: `category` MUST be one of `equipment`, `electrical`, `plumbing`, `facility`, `other`.
- **FR-003**: System MUST set `status` to `open` on creation; clients MUST NOT set status.
- **FR-004**: System MUST list requests showing title, location, category and status.
- **FR-005**: System MUST filter the list by an optional, validated `category` query parameter.
- **FR-006**: System MUST change a request's status from `open` to `resolved` via `PATCH /requests/:id/resolve`.
- **FR-007**: System MUST reject unknown input properties.
- **FR-008**: System MUST record `createdAt` and `updatedAt` timestamps.

### Key Entities _(include if feature involves data)_

- **MaintenanceRequest**: title, description, location, category (enum), status (`open` | `resolved`, default `open`), createdAt, updatedAt.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: A reporter can submit a valid request in under 1 minute.
- **SC-002**: 100% of invalid create payloads defined above receive a 400 with a readable message.
- **SC-003**: Filtering by category shows only matching requests every time.
- **SC-004**: A resolved request is visibly marked resolved immediately after the action succeeds.

## Assumptions

- No authentication or roles (explicitly out of scope).
- Requests are never deleted or edited after creation (out of scope).
- Data volume is small (a single campus), so no pagination in the MVP.
