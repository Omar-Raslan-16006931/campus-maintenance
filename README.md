<div align="center">

<img src=".github/assets/banner.svg" width="100%" alt="Campus Maintenance"/>

<img src="https://img.shields.io/github/last-commit/Omar-Raslan-16006931/campus-maintenance?style=for-the-badge&color=6366f1" alt="Last commit"/>
<img src="https://img.shields.io/github/languages/top/Omar-Raslan-16006931/campus-maintenance?style=for-the-badge&color=0ea5e9" alt="Top language"/>

<br/><br/>

<img src="https://skillicons.dev/icons?i=nestjs,nextjs,ts,mongodb,tailwind,githubactions&theme=dark" alt="Tech stack"/>

</div>

---

Students and staff report maintenance problems around campus, browse and filter reported requests, and mark completed requests as resolved.

Stack: **NestJS + Mongoose** (`apps/api`, port 3001, Swagger at `/api`) · **Next.js App Router + shadcn/ui** (`apps/web`, port 3000) · **MongoDB Atlas**.

Specification: [`specs/campus-maintenance.md`](specs/campus-maintenance.md) · Agent rules: [`AGENTS.md`](AGENTS.md) · Spec Kit plan: [`specs/001-campus-maintenance/`](specs/001-campus-maintenance/)

## 🎯 MVP

| Feature            | API                                 | Page                            |
| ------------------ | ----------------------------------- | ------------------------------- |
| Report a request   | `POST /requests`                    | `/requests/new`                 |
| Browse requests    | `GET /requests`                     | `/requests`                     |
| Filter by category | `GET /requests?category=electrical` | `/requests?category=electrical` |
| Mark resolved      | `PATCH /requests/:id/resolve`       | "Mark resolved" button          |

## 🚀 Getting started

```bash
npm install                    # root: Prettier, Husky, lint-staged
cd apps/api && npm install && cd ../..
cd apps/web && npm install && cd ../..
```

Create `apps/api/.env` (never commit it — see `apps/api/.env.example`):

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/maintenance
PORT=3001
```

Run (two terminals):

```bash
cd apps/api && npm run start:dev   # http://localhost:3001/api (Swagger)
cd apps/web && npm run dev         # http://localhost:3000
```

Refresh shared types after any API change (backend must be running):

```bash
npx openapi-typescript http://localhost:3001/api-json -o apps/web/lib/api-types.ts
```

## ✅ Quality gates

- `cd apps/api && npm test && npm run lint`
- `cd apps/web && npm run lint && npm run build`
- Husky runs Prettier on staged files before every commit; CI runs the `api` and `web` jobs on every PR.

## 👥 Team slices

- Student D — MaintenanceRequest schema + module shell, layout, design tokens (goes first).
- Student A — `POST /requests` + `/requests/new`.
- Student B — `GET /requests?category=` + `/requests`.
- Student C — `PATCH /requests/:id/resolve` + resolve button.

Never commit `.env` or secrets.

---

<div align="center">

**Made with ❤️ by [Omar Raslan](https://github.com/Omar-Raslan-16006931)**

<img src=".github/assets/footer.svg" width="100%"/>

</div>
