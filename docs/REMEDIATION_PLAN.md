# Sweet Treats Marketplace — Remediation & Build-Out Plan

> A phased plan to fix every issue found in the platform review **and** fill the
> missing gaps. Read the "Three Hard Truths" first — they reframe the whole
> project. The phases are ordered by dependency and business value, not by where
> the bugs happen to live.

---

## The Three Hard Truths (read this first)

Everything below depends on internalizing three things the page-by-page review
exposed but that are bigger than any single page:

### 1. This is a frontend with no backend behind most of it.
`src/utils/api.ts` only implements **business auth** and **product CRUD**. There
are *no* endpoints for orders, sales analytics, delivery, settings persistence,
reviews, or customers. So ~70% of the "hardcoded fake data" findings are **not
frontend bugs — they are missing backend.** You cannot "connect the dashboard to
real data" if there is no `/orders` or `/analytics` endpoint to connect to.

**Consequence:** Every phase below is split into what is *fixable in this repo
today* vs. what is *blocked on a backend contract*. The single highest-leverage
action in the entire plan is **inventorying the backend API** (Phase 1). Until we
know what endpoints exist, half this plan is guesswork.

### 2. It is a "marketplace" that can only log in one of its three user types.
The platform models **customers, sellers (business), and delivery drivers** — but
`src/auth.ts` only authenticates **businesses**. There is no customer login, no
driver login. A customer literally cannot have an account, which means cart,
orders, wishlist, and reviews have no one to belong to. This is not a bug, it's a
**missing foundation**, and it gates the entire customer and driver experience.

### 3. It is a single-store demo dressed as a marketplace.
Every storefront is hardcoded to "Sweet Delights Bakery." The core marketplace
concept — *many* sellers, each with a store, customers browsing and ordering
*across* them — does not exist in the data flow. The relationships
(store → products, customer → orders → store) are not modeled. We are not
"fixing" a marketplace; in places we are building one for the first time.

**These three truths mean the work is bigger than "fix the bugs." Plan
accordingly, and resolve the Open Decisions below before committing timelines.**

---

## Open Decisions (resolve before Phase 1)

These change the plan materially. My assumptions are noted — correct me where wrong.

| # | Decision | My assumption | If different… |
|---|----------|---------------|---------------|
| D1 | Does a backend exist for orders/sales/settings/reviews? | Partially — only auth + products exist | If none: add a backend track or use Next.js Route Handlers as the API |
| D2 | Payment provider | **Stripe** (Checkout) | PayPal/local gateway changes Phase 2 integration |
| D3 | Target market & currency | **Morocco / MAD** (the French + MAD content suggests this) | If USD/global, the i18n + currency work shifts |
| D4 | Languages | Single language for v1 | If multi-lingual (AR/FR/EN), i18n must be Phase 1, and Arabic needs RTL |
| D5 | Auth for customers/drivers | Needed — build in Phase 1 | If sellers-only for v1, defer customer flows (but then it's not a marketplace) |
| D6 | Who owns the backend | Separate team/repo | If we own it, scope doubles and a backend plan is needed |

---

## Cross-Cutting Tracks (run in parallel with every phase)

Two concerns don't belong to one phase — they run continuously:

### Security Track (start NOW, do not defer)
- **🔴 96 dependency vulnerabilities (3 critical, 39 high)** flagged by GitHub on
  push. Run `npm audit`, triage, and patch criticals immediately.
- **🔴 Session `user.id` is used as the Bearer token.** IDs are not secrets — they
  are guessable, non-expiring, and enumerable. This is a real auth vulnerability.
  Move to proper access tokens (JWT with expiry) issued by the backend.
- **🔴 Hand-rolled credit-card fields** on `/cart/checkout` are a PCI-DSS liability.
  Raw card numbers must never touch our server. Use Stripe Checkout/Elements so
  the PAN goes directly to the provider. (Belongs to Phase 2 but is logged here
  because it is a security issue, not a feature.)
- Add runtime env-var validation (zod) so missing secrets fail loudly at boot.

### Quality Track (build the habit from Phase 0)
- **Testing:** there is zero. For a platform that handles money this is a risk.
  Add Playwright for the critical purchase flow and Vitest for utils. Test the
  vertical slice as it's built, not at the end.
- **Type safety:** kill the `any` types. Define a shared `types/` module (ideally
  generated from the backend's OpenAPI spec if one exists).
- **Component consolidation:** `ProductDetailsPage3`, `ProductListingsPage2`, the
  dual cart designs, `/profile` vs `/business/profile` vs `/business/dashboard` —
  these are abandoned-refactor scar tissue. Pick one canonical version, delete
  the rest. Do this as you touch each area; don't leave duplicates behind.

---

## Phase 0 — Triage: Stop the Bleeding  ·  ~1–2 days  ·  Pure frontend, zero backend dependency

**Goal:** Remove everything embarrassing, broken, or dead that a visitor or
investor would see in the first five minutes. All low-risk, high-visibility, ships
same-day. Nothing here depends on anything else.

| Fix | File(s) | Why |
|-----|---------|-----|
| Replace "Create Next App" metadata | `src/app/layout.tsx` | Every browser tab currently says "Create Next App" |
| Delete dev test pages | `/app/modals`, `/app/products-carts` | Publicly reachable developer scratch pages |
| Delete duplicate products page | `/app/business/dashboard/productsO` | Dead code causing routing inconsistency |
| Fix homepage duplication | `src/app/page.tsx` | Entire page renders twice + double header/footer |
| Remove `"sadfsfd"` demo review + `console.log`s | `ProductDetailsPage3`, listing | Dev test string visible to real users |
| Fix `OverviewCard.tsx` runtime crash | `components/business/dashboard/OverviewCard.tsx` | Calls a non-setter during render — throws |
| Fix `NutellaCrepeModal` opening on render | `components/modals/NutellaCrepeModal.tsx` | `isOpen` defaults to `true`, breaks layout |
| Standardize currency (one helper, one currency) | new `lib/currency.ts` | MAD vs USD mixed across pages |
| Resolve dashboard/profile duplication | `/business/profile` vs `/business/dashboard` | Two near-identical seller landing pages |
| Fix FAQ quote-escaping bug | `src/app/FAQ/page.tsx` | Stray quotes render in answer text |

**Definition of done:** No fake test strings, no duplicate content, no dead pages,
correct tab titles, one currency, no crashing components.

---

## Phase 1 — Foundations: Contracts, Data Layer, Auth, Config  ·  ~1–2 weeks  ·  THE pivotal phase

**Goal:** Build the shared infrastructure every later phase depends on. Skipping
this means fixing the same loading/error/auth/type problems 20 times instead of
once. **Do not start Phase 2+ until this is done.**

**1.1 API contract inventory (do this first — it unblocks the whole plan)**
- Document every endpoint the backend actually exposes vs. what the UI needs.
- Produce a gap list: "Orders API — MISSING", "Settings PATCH — MISSING", etc.
- This directly answers Open Decision D1 and sizes the rest of the project.

**1.2 Typed domain models**
- `types/` module: `Product`, `Order`, `OrderItem`, `Store`, `Business`,
  `Customer`, `Review`, `Delivery`. Generate from OpenAPI if available.
- Eliminate `any` from `api.ts` and component props.

**1.3 Server-state data layer**
- Adopt **TanStack Query (React Query)**. This is the systemic fix for "no loading
  states" and "no error states" — they become free, per-query, everywhere, instead
  of hand-written page by page. (Redux Toolkit is installed but unused; React
  Query is the right tool for *server* state — keep Context for UI state.)

**1.4 Shared UX primitives**
- Reusable `<LoadingSkeleton>`, `<ErrorState>`, `<EmptyState>` components.
- One toast/error convention. Replace every `alert()` and `confirm()` with proper
  dialogs/toasts.

**1.5 Authentication for all three roles** *(addresses Hard Truth #2)*
- Add **customer** and **driver** auth alongside business auth.
- Role-based route protection via Next.js middleware (`/business/*` → seller,
  `/delivery-provider/*` → driver, `/customer/*` → customer).
- Replace `user.id`-as-token with real access tokens (Security Track).

**1.6 Centralized config**
- One `config/` source for currency, contact info, business constants,
  category/dietary/availability option lists (currently hardcoded in 5+ places).
- Runtime env validation.

**Definition of done:** A new page can be built with typed data, automatic
loading/error/empty states, and correct role protection — without reinventing any
of it.

---

## Phase 2 — The Commerce Core: Customer Purchase Journey  ·  ~2 weeks  ·  Highest business value

**Goal:** Make it possible to actually buy something. This is literally how the
platform makes money and it is currently broken end-to-end. Build it as **one
complete vertical slice** (a "walking skeleton") before adding breadth.

- **Wire `/cart` to `CartContext`** — remove the 3 hardcoded fake items; make
  quantity +/- and delete actually work. *(This is the single most broken page.)*
- **Connect every "Add to Cart" button** — product listing, product detail, home,
  storefront. They all currently do nothing.
- **Fix product routing** → migrate `/product?id=` to dynamic `/product/[id]`.
- **Real checkout** — order summary reads from the live cart; compute fees/tax
  from real data, not constants.
- **Payment via Stripe** *(Security Track)* — Stripe Checkout/Elements; delete the
  hand-rolled card fields. Never handle raw PANs.
- **Order creation** — POST the order to the backend (or build the endpoint per D1).
- **Real order confirmation** — driven by the created order, not `#ORD-12345`.
- **Build `/order-tracking`** — the confirmation page links to it and it 404s today.

**Definition of done:** A logged-in customer adds a real product, checks out, pays
in test mode, gets a real order confirmation, and can track that order. One slice,
fully working, tested with Playwright.

---

## Phase 3 — Seller Operations: The Business Dashboard  ·  ~2 weeks  ·  Depends on D1 (backend)

**Goal:** Make the seller side real instead of a wall of fabricated numbers.
*Heavily gated by backend availability — where endpoints don't exist, build honest
empty/"coming soon" states rather than fake data.*

- **Dashboard metrics** — connect to real revenue/orders/products, or render
  graceful empty states until the analytics endpoint exists. Remove `$45,231.89`.
- **Stop showing other people's data** — kill hardcoded "Sweet Delights Bakery";
  show the actual logged-in seller's store.
- **Products management** — add empty + error states; replace `confirm()` delete
  with a proper dialog; make the header search work; harden image rendering.
- **Complete Edit Product** — restore the missing "Availability Status" field;
  move to `/edit/[id]` dynamic routing.
- **Build `/business/dashboard/orders`** — "View All Orders" links nowhere today.
- **Make Settings save** — all four tabs (General/Notifications/Security/Billing)
  currently have dead Save buttons; wire to a settings PATCH endpoint (per D1).
- **Sales & Delivery** — real data, or honest empty states; make filters/search work.
- **Real storefront** (`/business/store`) — tie to actual seller data; complete the
  category tabs (the code literally has a "add other categories here" TODO).

**Definition of done:** A seller sees only their own real data, can edit it, and
every button either works or honestly says the feature is pending.

---

## Phase 4 — Customer Accounts & Engagement  ·  ~1.5 weeks  ·  Depends on Phase 1 auth + backend

**Goal:** Give customers a reason to return. Build the missing customer surface.

- **Build `/customer/profile`** — real account management (currently mock).
- **Build `/customer/orders`** — order history (referenced, never built).
- **Build `/customer/wishlist`** — wishlist (referenced in UI, no page).
- **Real reviews** — fetch + submit on product pages; remove the always-"no reviews"
  placeholder; wire `/review-and-feedback` to actual purchase history.

**Definition of done:** A customer can manage their account, see real orders, save
favorites, and leave reviews that persist and display.

---

## Phase 5 — Auth Completeness & Legal  ·  ~1 week  ·  Required before any public launch

**Goal:** Close the auth gaps and the legal exposure. Non-negotiable for launch.

- **Forgot-password / reset flow** — `/auth/login` links to `#` today.
- **Build `/terms-of-service` and `/privacy-policy`** — referenced at registration;
  legally required for collecting user data.
- **Fix register consent** — "Agree to Terms" defaults to **checked**; flip it, and
  link to the real ToS page.
- **Input hardening** — phone-format validation, password-strength indicator,
  optional email verification.
- **Loading states on auth forms** — no feedback during submit today.

**Definition of done:** Users can recover accounts, consent is opt-in and links to
real policies, and auth inputs are validated.

---

## Phase 6 — Polish, Performance, Trust & Marketplace Breadth  ·  ~1.5 weeks

**Goal:** The difference between "works" and "feels professional." Also where the
true *marketplace* breadth lands (Hard Truth #3).

- **Build `/stores`** — a real directory of *all* seller stores (multi-tenant
  browsing — the actual marketplace concept).
- **Make search real** — the search bars across home, listings, dashboards are
  decorative today.
- **SEO** — per-page metadata, OpenGraph, sitemap, robots.txt.
- **Next.js `<Image>`** — replace deprecated `layout="fill"`/`objectFit` usage.
- **Accessibility** — keyboard nav, focus states, alt text, contrast audit.
- **Footer & newsletter** — footer links go to `#`; newsletter form is inert.
- **Error monitoring** — Sentry (or similar) so the purchase funnel is observable.
- **Mobile/responsive QA** pass.
- **i18n** *(if D4 = multi-lingual)* — ideally seeded in Phase 1; RTL for Arabic.

**Definition of done:** Real cross-store browsing, working search, observable in
production, accessible, and polished on mobile.

---

## Sequencing & Dependency Logic

```
Security Track ───────────────────────────────────────────────►  (continuous)
Quality Track  ───────────────────────────────────────────────►  (continuous)

Phase 0 (Triage) ──► Phase 1 (Foundations) ──┬──► Phase 2 (Commerce core)
                                             ├──► Phase 3 (Seller ops)
                                             └──► Phase 4 (Customer accounts)
                                                        │
                          Phase 5 (Auth/Legal) ◄────────┘
                                   │
                                   ▼
                          Phase 6 (Polish + Marketplace breadth)
```

**Why this order:**
- **Phase 0 has zero dependencies** → ship it immediately for instant credibility.
- **Phase 1 is the fork** → everything downstream needs its types, data layer, auth,
  and config. It's the highest-leverage phase; rushing it taxes every later phase.
- **Phase 2 before 3/4** → the purchase flow is the revenue path and the best single
  vertical slice to prove the foundation end-to-end.
- **3 and 4 can parallelize** once Phase 1 lands (different teams/areas).
- **Phase 5 before launch** → legal/auth gaps are launch-blockers, not polish.
- **Phase 6 last** → polish and marketplace breadth assume the core works.

## What I'd cut if forced to ship an MVP in 3 weeks
Phase 0 + Phase 1 (auth + data layer) + Phase 2 (one seller, one buyer, real
checkout) + the legal pages from Phase 5. Defer seller analytics, customer
accounts beyond orders, and marketplace breadth. That yields a *real* (if narrow)
transaction, which beats a broad demo where nothing works.
