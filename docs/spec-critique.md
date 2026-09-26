# Phase 2 — Specification critique

Prompt used (Claude):

> I'm building this with NestJS (backend) and Next.js App Router (frontend). Don't write code. Review the spec and point out missing entities, edge cases, wrong module boundaries, and anything that breaks MVC. Ask me questions if unclear.

## AI suggestions and team decision

| #   | Suggestion                                                                                           | Decision               | Why                                                                                                                |
| --- | ---------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1   | Define what happens when `PATCH /requests/:id/resolve` gets an unknown or malformed id (404 vs 400). | **Accepted**           | Needed for tests and a predictable API. Malformed id → 400, unknown id → 404.                                      |
| 2   | Treat whitespace-only title/description/location as empty and add max lengths.                       | **Accepted**           | Cheap to validate in the DTO and prevents junk requests.                                                           |
| 3   | Resolving an already resolved request should be idempotent rather than an error.                     | **Accepted**           | Two people clicking at once should not see an error.                                                               |
| 4   | Add a `reporterName`/`reporterEmail` field so staff can follow up.                                   | **Rejected**           | User profiles and authentication are explicitly out of scope; it also adds personal data we would have to protect. |
| 5   | Add pagination to `GET /requests`.                                                                   | **Rejected** (for MVP) | One campus, small data set; not in the MVP. Can be added later.                                                    |
| 6   | Add a `priority` field.                                                                              | **Rejected**           | "Priority/escalation" is listed as out of scope.                                                                   |

## Data model

The Mermaid ER diagram was added to `specs/campus-maintenance.md` under "Data model diagram".
