# Money Transfer System – Frontend

React + Vite client for the Banking/Money Transfer platform. It provides dashboards to manage senders, receivers, transactions, and authentication while communicating with the backend over `/api`.

## Tech Stack

- React 19 + TypeScript
- Vite 5/7 tooling with SWC
- Tailwind CSS 4 + ShadCN/Radix UI components
- TanStack Query, Zustand, React Hook Form, Zod, Axios

## Prerequisites

1. Node.js v20+ and npm 10+
2. Backend API running locally at `http://localhost:5000` (or configure proxy accordingly)

## Installation

```bash
npm install
```

## Environment Variables

The frontend currently relies on Vite's dev proxy (`vite.config.ts`) to forward `/api` calls to `http://localhost:5000`, so no custom `.env` file is required. If you deploy to another origin, update `vite.config.ts` and/or set `VITE_API_BASE_URL` in code when introducing env-driven configs.

## Development

```bash
npm run dev
```

This serves the app at `http://localhost:5173` with hot module reloading. API calls are automatically proxied to the backend on port `5000`.

## Production Build

```bash
npm run build   # Generates static assets in dist/
npm run preview # Optional: preview production build locally
```

## Linting

```bash
npm run lint
```

## Project Structure

```
src/
 ├─ api/         # Axios wrappers for backend endpoints
 ├─ components/  # Shared UI components
 ├─ hooks/       # React hooks (auth, data fetching)
 ├─ lib/         # Axios instance, utilities, store helpers
 ├─ pages/       # Route-level components
 ├─ store/       # Zustand stores (auth, ui)
 └─ main.tsx     # App entry
```

## Connecting to the Backend

- Ensure the backend server is running (`npm run dev` in `/backend`).
- Frontend dev server (5173) forwards `/api` requests to `http://localhost:5000` via Vite proxy.
- For deployments, host both apps under the same domain or expose the backend URL via an env variable and configure Axios accordingly.

## Useful npm Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server              |
| `npm run build`   | Build production-ready assets      |
| `npm run lint`    | Run ESLint                         |
| `npm run preview` | Serve the production build locally |

## Troubleshooting

1. **API requests fail** → confirm backend is running and the proxy target in `vite.config.ts` matches its URL.
2. **Styles missing** → ensure Tailwind CSS PostCSS plugins are installed and `npm install` completed.
3. **Type errors** → run `npm run lint` or `tsc --noEmit` to inspect TypeScript diagnostics.
