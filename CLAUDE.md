# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (Next.js)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint (next lint)
```

No test framework is configured — there are no test files or test scripts in this project.

## Environment Variables

```
NEXT_PUBLIC_API_URL       # External backend REST API base URL
GOOGLE_CLIENT_ID          # Google OAuth client ID
GOOGLE_CLIENT_SECRET      # Google OAuth client secret
NEXTAUTH_SECRET           # NextAuth JWT encryption key
UPLOADTHING_TOKEN         # UploadThing file upload service token
```

## Architecture

This is a **Next.js 14 App Router** frontend that consumes an external backend REST API — there is no database ORM in this repo. All data access goes through axios calls to `NEXT_PUBLIC_API_URL`.

### Directory Structure

- `src/app/` — App Router pages and API routes
  - `api/auth/` — NextAuth route handler
  - `api/uploadthing/` — UploadThing webhook handler
  - `business/` — Seller/business dashboard (dashboard, profile, settings, store)
  - `auth/` — Login and registration pages
  - `cart/`, `product/`, `products/` — Customer-facing shopping flows
- `src/components/` — React components
  - `ui/` — Shadcn/ui primitives (generated; edit via `npx shadcn-ui add`)
  - `business/dashboard/` — Seller dashboard UI
  - `modals/` — Auth and product modals
  - `AuthSteps/` — Multi-step auth flow components
  - `reusable-component/` — Shared components (Navbar, Footer, CartSidePanel)
- `src/context/` — React Context: `CartContext` (cart state) and `GlobalStateContext` (global UI state)
- `src/utils/api.ts` — All API call functions (the single file for backend communication)
- `src/lib/` — Axios instance configuration and UploadThing helpers
- `src/auth.ts` — NextAuth v5 configuration (Credentials + Google providers, JWT strategy)

### Authentication

NextAuth v5 (beta) with two providers:
1. **Credentials** — calls backend `/business/email/{email}` then `/business/login`
2. **Google OAuth** — standard OAuth flow

Sessions are JWT-based. The session `user.id` is used as the Bearer token in authenticated API requests.

### API Layer

All backend calls are in `src/utils/api.ts`. The axios instance in `src/lib/` sets the base URL from `NEXT_PUBLIC_API_URL`. Authenticated requests use the session user ID as a Bearer token.

Key API groups:
- Business auth: `registerBusiness`, `businessesLogIn`, `getBusinessesByEmail`
- Product CRUD: `createNewProduct`, `getBusinessesProducts`, `deleteProductById`, `getProductById`, `updateProduct`, `getAllProducts`

### State Management

The project installs Redux Toolkit but primarily uses React Context in practice. Prefer the existing `CartContext` and `GlobalStateContext` patterns for new state rather than adding Redux slices unless there's a clear reason.

### UI

- **Shadcn/ui** + **Radix UI** for component primitives — config in `components.json`, alias `@/components/ui/`
- **Tailwind CSS** for styling — config in `tailwind.config.ts`
- **Lucide React** for icons
- **React-Toastify** for toast notifications
- **Recharts** for dashboard analytics charts
- **UploadThing** + **next-cloudinary** for image uploads and optimization

TypeScript path alias: `@/*` → `src/*`
