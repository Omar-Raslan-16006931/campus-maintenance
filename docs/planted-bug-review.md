# Phase 7.6 — Confident-intern exercise (`demo/planted-bug.controller.ts`)

Prompt: _Review @demo/planted-bug.controller.ts against @AGENTS.md and the spec. List every problem. Be critical._

| #   | Finding                                                                                                            | In answer key?   |
| --- | ------------------------------------------------------------------------------------------------------------------ | ---------------- |
| 1   | Controller injects the Mongoose model and queries the DB directly — breaks MVC; must go through a service.         | ✅ 1             |
| 2   | `@Body() body: any` — no `CreateRequestDto`, violates "no `any`".                                                  | ✅ 2             |
| 3   | `...body` spreads arbitrary client properties into the document (mass assignment).                                 | ✅ 3             |
| 4   | `status: body.status \|\| 'open'` lets the client choose the status; spec says backend controls it.                | ✅ 4             |
| 5   | `category` on create is never validated against the 5 allowed values.                                              | ✅ 5             |
| 6   | No required-field validation for title/description/location/category.                                              | ✅ 6             |
| 7   | `GET ?category=` accepts any string (should be validated, 400 on unsupported).                                     | ✅ 7             |
| 8   | No Swagger decorators (`@ApiTags`, `@ApiCreatedResponse`, `@ApiQuery`…), so the contract/types can't be generated. | ✅ 8             |
| 9   | Imports the schema via a relative path outside `apps/api` — would not compile inside the app.                      | ✅ 9             |
| 10  | No `PATCH /requests/:id/resolve` route, and no error handling (e.g. 404).                                          | ➕ extra         |
| 11  | No sort order on the list; results come back in insertion order.                                                   | ➕ extra (minor) |
| 12  | No tests for any of the behaviour.                                                                                 | ➕ extra         |

Result: every answer-key item was found; three extra observations were added. None of the agent's findings were false positives, but #11 is a style preference rather than a bug.

The real implementation lives in `apps/api/src/requests/` and fixes all of the above.
