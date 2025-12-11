# IllusioDesign

Marketing/portfolio platform with a Next.js 14 frontend and an Express/Sequelize backend.

> Built for speed, animations, and CMS-driven content; deployable via simple FTP scripts.

---

## Contents
- [Stack](#stack)
- [Features](#features)
- [Setup](#setup)
- [Environment](#environment)
- [Run](#run)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Structure](#structure)
- [Quality](#quality)
- [Troubleshooting](#troubleshooting)
- [Notes](#notes)

## Stack
- **Frontend:** Next.js (Pages router), React 18, Framer Motion, Tiptap, DOMPurify, React Toastify
- **Backend:** Node.js/Express, Sequelize (MySQL), Multer/Sharp, Nodemailer
- **Deploy:** FTP scripts for frontend (`scripts/deployFTP.js`) and backend (`Backend/deploy.js`)

## Features
- Animated marketing site with scroll reveals and split-text effects
- Blog and case study detail pages with sanitized rich text
- Theming (light/dark) and SEO helpers
- Admin/Dashboard routes backed by Sequelize models
- Image handling via backend uploads and CDN-style absolute URLs

## Setup
1) Prerequisites: Node 18+ and npm; MySQL
2) Install deps:
```bash
cd frontend && npm install
cd ../Backend && npm install
```

## Environment
- Frontend `.env` (or `.env.local`):
  - `NEXT_PUBLIC_API_URL=` (e.g. `https://api.illusiodesigns.agency/api`)
  - `NEXT_PUBLIC_IMAGE_URL=` (e.g. `https://api.illusiodesigns.agency`)
- Backend `Backend/.env`:
  - `DB_HOST=...`, `DB_USER=...`, `DB_PASSWORD=...`, `DB_NAME=...`
  - `JWT_SECRET=...`
  - `EMAIL_HOST=...`, `EMAIL_PORT=...`, `EMAIL_USER=...`, `EMAIL_PASS=...`

## Run
```bash
# backend
cd Backend
npm run dev

# frontend (new shell)
cd frontend
npm run dev
```
Frontend: http://localhost:3000  
Backend: http://localhost:5000

## Scripts
**Frontend**
- `npm run dev` / `build` / `start`
- `npm run lint`
- `npm run deploy` (FTP deploy via `scripts/deployFTP.js`)

**Backend**
- `npm run dev` / `start:prod`
- `node deploy.js` (FTP deploy)

## Deployment
- Frontend builds to `.next` then uploads via `scripts/deployFTP.js`.
- Backend uploads source via `Backend/deploy.js`; entrypoint `src/server.js`.
- Static uploads served from `/uploads` with relaxed CORS for images.
- Production source maps enabled (`productionBrowserSourceMaps: true` in `next.config.js`).

## Structure
- `frontend/src/app` — root, layout, globals
- `frontend/src/pages` — Pages router views
- `frontend/src/components` — Shared UI/components
- `frontend/src/styles` — CSS per page/component
- `Backend/src` — Express server, routes, controllers, models, middleware

## Quality
- ESLint: `next/core-web-vitals` (with `@next/next/no-img-element` disabled)
- Prefer `next/image` for LCP-critical media when feasible

## Troubleshooting
- Build error `_document` missing: add `frontend/src/pages/_document.jsx`.
- ESM warning on deploy script: `"type": "module"` set in `frontend/package.json`.
- Cookie warnings on images: static files served without credentials (already configured).

## Notes
- Do not commit secrets or `.env` files.
- Keep FTP credentials out of git; provide via environment or secrets store.

