## Goal

Convert the project from TanStack Start (SSR-capable React framework) to a plain client-side React + Vite SPA using React Router DOM. No SSR, no server functions, no file-based routing.

## What changes

### 1. Build config & dependencies
- Replace `@lovable.dev/vite-tanstack-config` with the standard Vite + React plugin setup.
- Remove TanStack Start packages (`@tanstack/react-start`, `@tanstack/react-router`, router devtools, router plugin).
- Add `react-router-dom` for client-side routing.
- Add `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths` (the equivalents the wrapper provided).
- New `vite.config.ts` with React + Tailwind v4 + path alias plugins, `@` alias, and React/TanStack Query dedupe.
- New `index.html` at project root (SPA entry).
- New `src/main.tsx` mounting `<App />` into `#root`.
- New `src/App.tsx` declaring routes with `<BrowserRouter>` + `<Routes>`.

### 2. Routes
Move every page from `src/routes/*.tsx` to `src/pages/*.tsx` and convert them:
- Drop `createFileRoute(...)` — export a default React component.
- Replace `Route.useParams()` with `useParams()` from `react-router-dom`.
- Replace TanStack `head()` metadata with `react-helmet-async` (added as dep) so each page can still set `<title>` / `<meta>`.
- Pages affected: `index`, `apartments.index`, `apartments.$id` → `apartments/:id`, `gallery`, `locations`, `contact`.

### 3. Layout & navigation
- `src/routes/__root.tsx` becomes `src/components/Layout.tsx` (header + `<Outlet />` from react-router-dom + footer). The `<html>/<head>/<body>` shell moves to `index.html`.
- Update `SiteHeader` (and any other component using `@tanstack/react-router`'s `Link`/`useLocation`/`useNavigate`) to import from `react-router-dom`. Convert `<Link to="/apartments/$id" params={{id}}>` → `<Link to={`/apartments/${id}`}>`.

### 4. Cleanup
- Delete `src/routes/`, `src/router.tsx`, `src/routeTree.gen.ts`, `wrangler.jsonc`, `.output`/`.vinxi` ignores no longer needed.
- Move global font/meta tags from `__root.tsx` `head()` into `index.html`.

### 5. Data
`src/data/apartments.ts` and all images stay untouched.

## Technical notes

- Tailwind v4 keeps working via `@tailwindcss/vite` + the existing `src/styles.css` (no changes to tokens).
- shadcn components are framework-agnostic — no edits needed.
- Hosting: Lovable hosting handles SPA fallback automatically; no `_redirects` file required.
- Trade-offs the user should know:
  - Loses SSR → worse SEO for crawlers that don't run JS, slower first paint.
  - Loses ability to write `createServerFn` server endpoints (none currently in use, so no functional loss today).
  - The `@lovable.dev/vite-tanstack-config` wrapper was doing a lot (sandbox host/port, error overlay, env injection); the new config will be a vanilla Vite setup.

## Steps

1. Update `package.json` deps (remove TanStack Start, add react-router-dom, helmet, vite plugins).
2. Write new `vite.config.ts`, root `index.html`, `src/main.tsx`, `src/App.tsx`, `src/components/Layout.tsx`.
3. Migrate each route file into `src/pages/` and rewrite imports.
4. Update `SiteHeader`, `SiteFooter`, `ApartmentCard`, `BookingBar`, and any other component using `@tanstack/react-router` to use `react-router-dom`.
5. Delete `src/routes/`, `src/router.tsx`, `src/routeTree.gen.ts`, `wrangler.jsonc`.
6. Verify build passes and the home + apartment detail pages render.

Confirm and I'll execute.