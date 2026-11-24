# My-Portfolio-Website

Personal portfolio of Pranav Dhage — React 19, TypeScript, Vite and GSAP.

## Develop

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build     # type-checks, then writes the static site to dist/
npm run preview   # serves dist/ locally to check the production build
```

## Deploy

The site is fully static, so any static host works. Use these settings:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 20.19+          |

- **Vercel / Netlify / Cloudflare Pages:** import the repo; the Vite preset fills in the values above.
- **GitHub Pages (project site at `/<repo>/`):** set `base: '/<repo>/'` in `vite.config.ts` before building.

## Content

- Profile, links and ticker text: `src/data/profile.ts`
- Projects, experience, stack and process: `src/data/*.ts`
- Portrait: `src/assets/photo.(jpg|jpeg|png|webp|avif)`
- Résumé served for download: `public/Pranav_Dhage_Resume.pdf`

## Deployed on vercel

- https://pranav-dhage-portfolio.vercel.app