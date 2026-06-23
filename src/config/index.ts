// Centralized application configuration.
//
// Anything that was previously hardcoded across pages (currency, contact
// info, category/dietary option lists, nav links) lives here so it can be
// changed in one place and, for multi-region, driven by locale.

import type { CurrencyCode, UserRole } from "@/types";

export const APP_CONFIG = {
  name: "Sweet Treats Marketplace",
  description:
    "Discover and order cakes, pastries, and sweet treats from local bakeries near you.",
  supportEmail: "support@sweettreats.example",
  supportPhone: "+212 522-000000",
} as const;

/* ------------------------------------------------------------------ */
/* Locales & currency (multi-region)                                   */
/* ------------------------------------------------------------------ */

export type Locale = "en" | "fr" | "ar";

export const LOCALES: Locale[] = ["en", "fr", "ar"];
export const DEFAULT_LOCALE: Locale = "en";
export const RTL_LOCALES: Locale[] = ["ar"];

export const LOCALE_CONFIG: Record<
  Locale,
  { label: string; currency: CurrencyCode; dir: "ltr" | "rtl"; intlLocale: string }
> = {
  en: { label: "English", currency: "USD", dir: "ltr", intlLocale: "en-US" },
  fr: { label: "Français", currency: "EUR", dir: "ltr", intlLocale: "fr-FR" },
  ar: { label: "العربية", currency: "MAD", dir: "rtl", intlLocale: "ar-MA" },
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/* ------------------------------------------------------------------ */
/* Product option lists (previously hardcoded in add/edit forms)       */
/* ------------------------------------------------------------------ */

export const PRODUCT_CATEGORIES = [
  "Bread",
  "Pastry",
  "Cake",
  "Cookie",
  "Donut",
  "Other",
] as const;

export const DIETARY_LABELS = [
  "None",
  "Gluten-Free",
  "Vegan",
  "Sugar-Free",
  "Dairy-Free",
  "Nut-Free",
] as const;

export const AVAILABILITY_OPTIONS = [
  "In Stock",
  "Out of Stock",
  "Limited",
] as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Stores", href: "/stores" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Stores", href: "/stores" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/FAQ" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/** Where each role lands after authenticating. */
export const ROLE_HOME: Record<UserRole, string> = {
  customer: "/",
  business: "/business/dashboard",
  driver: "/delivery-provider/dashboard",
};
