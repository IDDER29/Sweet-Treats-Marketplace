import type { Locale } from "@/config";

// Lightweight message catalog. This is a scaffold: a representative set of
// common keys across en/fr/ar so the infrastructure (translation + RTL) is
// in place and strings can be migrated to `t("…")` incrementally. Full
// route-segment i18n (next-intl) is a documented follow-up.

export type MessageKey =
  | "nav.home"
  | "nav.products"
  | "nav.stores"
  | "nav.about"
  | "nav.contact"
  | "common.addToCart"
  | "common.checkout"
  | "common.search"
  | "common.loading"
  | "common.cart"
  | "common.signIn"
  | "common.signOut"
  | "common.viewDetails";

type Dictionary = Record<MessageKey, string>;

const en: Dictionary = {
  "nav.home": "Home",
  "nav.products": "Products",
  "nav.stores": "Stores",
  "nav.about": "About",
  "nav.contact": "Contact",
  "common.addToCart": "Add to cart",
  "common.checkout": "Checkout",
  "common.search": "Search",
  "common.loading": "Loading…",
  "common.cart": "Cart",
  "common.signIn": "Sign in",
  "common.signOut": "Sign out",
  "common.viewDetails": "View details",
};

const fr: Dictionary = {
  "nav.home": "Accueil",
  "nav.products": "Produits",
  "nav.stores": "Boutiques",
  "nav.about": "À propos",
  "nav.contact": "Contact",
  "common.addToCart": "Ajouter au panier",
  "common.checkout": "Commander",
  "common.search": "Rechercher",
  "common.loading": "Chargement…",
  "common.cart": "Panier",
  "common.signIn": "Se connecter",
  "common.signOut": "Se déconnecter",
  "common.viewDetails": "Voir les détails",
};

const ar: Dictionary = {
  "nav.home": "الرئيسية",
  "nav.products": "المنتجات",
  "nav.stores": "المتاجر",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  "common.addToCart": "أضف إلى السلة",
  "common.checkout": "إتمام الشراء",
  "common.search": "بحث",
  "common.loading": "جارٍ التحميل…",
  "common.cart": "السلة",
  "common.signIn": "تسجيل الدخول",
  "common.signOut": "تسجيل الخروج",
  "common.viewDetails": "عرض التفاصيل",
};

export const messages: Record<Locale, Dictionary> = { en, fr, ar };
