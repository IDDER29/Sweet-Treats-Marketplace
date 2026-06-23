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
  - `api/auth/` — NextAuth route handler; `api/uploadthing/` — upload handler
  - `business/` — Seller dashboard (dashboard, products, orders, sales, delivery, settings, store, stores)
  - `customer/` — Customer account (profile, orders, wishlist) — gated by middleware
  - `delivery-provider/` — Driver dashboard
  - `auth/` — Login, register, forgot-password
  - `cart/`, `product/[id]`, `products/`, `stores/`, `order-tracking/` — customer shopping flows
  - `terms/`, `privacy/` — legal pages
- `src/types/` — Domain models (Product, Order, Store, Customer, Review, …) + `next-auth.d.ts` augmentation. Import from `@/types`.
- `src/config/` — App config: name, multi-region locales/currencies, product option lists, nav links, per-role home routes. Import from `@/config`.
- `src/services/` — Typed `"use server"` data functions by domain (orders, reviews, customers, wishlist, stores, settings, analytics). New backend calls go here, not in `utils/api.ts`.
- `src/lib/` — `api-client.ts` (clean axios + auth), `currency.ts`, `auth-helpers.ts` (requireRole), `order-status.ts`, `settings.ts`, `utils.ts` (cn).
- `src/providers/QueryProvider.tsx` — React Query provider (mounted in root layout).
- `src/components/feedback/` — `LoadingState`, `ErrorState`, `EmptyState`.
- `src/components/ui/` — Shadcn/ui primitives (generated; edit via `npx shadcn-ui add`).
- `src/context/CartContext.tsx` — cart state (localStorage-backed: addToCart, updateQuantity, removeFromCart, clearCart, toggleCart).
- `src/i18n/` — `LocaleProvider` (locale + RTL + `t()`), `messages.ts` (en/fr/ar).
- `src/auth.ts` — NextAuth v5 (Credentials + Google, JWT, role on session); `src/middleware.ts` — edge auth gate.
- `src/utils/api.ts` — legacy business-auth + product CRUD (still used). Prefer `src/services/*` for new work.

### Authentication & Roles

NextAuth v5 (beta), JWT sessions. Providers: **Credentials** (business login via `/business/email/{email}` + `/business/login`) and **Google OAuth** (mapped to the `customer` role).

The session carries a `role` (`customer | business | driver`, see `next-auth.d.ts`). Route protection is two-layered:
- `src/middleware.ts` — edge-safe cookie gate redirecting anonymous users away from `/business/*`, `/customer/*`, `/delivery-provider/*`.
- `requireRole(role)` in `src/lib/auth-helpers.ts` — fine-grained role checks inside Server Components.

NOTE: API requests currently send the session `user.id` as the Bearer token (`api-client.ts`). This is a known stopgap — IDs are not secrets; replace with a backend-issued access token when available.

### Data Layer & Conventions

Server state is fetched with **React Query** (`@tanstack/react-query`) calling `"use server"` functions in `src/services/*`. Standard pattern: `useQuery`/`useMutation` + render `<LoadingState/>`, `<ErrorState onRetry={refetch}/>`, `<EmptyState/>` from `@/components/feedback`. Do not hand-roll loading/error/empty UI.

- Backend calls: add typed functions to `src/services/*` using `getServerApi()` / `publicApi` from `@/lib/api-client`. A `"use server"` file may only export async functions — put shared constants/types in a plain `src/lib/*` module.
- Money: always render via `formatCurrency` from `@/lib/currency` (never string-concatenate `$`).
- Option lists (categories, dietary, availability): import from `@/config`, do not hardcode.
- Product/store images use plain `<img>` (with an eslint-disable) on purpose — seller image URLs come from arbitrary hosts, so `next/image` would require whitelisting every domain. Keep this unless `next.config` image domains are generalized.

Client state uses **React Context** (`CartContext`). Redux Toolkit is installed but unused — prefer Context; do not add Redux without a clear reason.

### Payments

Checkout creates a real order via `services/orders#createOrder`. Cash on Delivery works today; online card payment is intentionally a placeholder integration point — use a PCI-compliant provider (e.g. Stripe hosted checkout) and never collect raw card numbers in the app.

### UI

- **Shadcn/ui** + **Radix UI** for component primitives — config in `components.json`, alias `@/components/ui/`
- **Tailwind CSS** for styling — config in `tailwind.config.ts`
- **Lucide React** for icons
- **React-Toastify** for toast notifications
- **Recharts** for dashboard analytics charts
- **UploadThing** + **next-cloudinary** for image uploads and optimization

TypeScript path alias: `@/*` → `src/*`
