// Locale-aware currency formatting.
//
// Single source of truth for rendering money. Replaces the ad-hoc "$" and
// "MAD" string concatenation that was scattered across pages, and lets the
// displayed currency follow the active locale (multi-region).

import {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  LOCALE_CONFIG,
  type Locale,
} from "@/config";
import type { CurrencyCode } from "@/types";

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = DEFAULT_CURRENCY,
  locale: Locale = DEFAULT_LOCALE
): string {
  const intlLocale = LOCALE_CONFIG[locale]?.intlLocale ?? "en-US";
  try {
    return new Intl.NumberFormat(intlLocale, {
      style: "currency",
      currency,
    }).format(amount);
  } catch {
    // Fallback if the runtime can't format the given currency/locale pair.
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/** Convenience: format using the currency configured for a locale. */
export function formatPrice(amount: number, locale: Locale = DEFAULT_LOCALE): string {
  const currency = LOCALE_CONFIG[locale]?.currency ?? DEFAULT_CURRENCY;
  return formatCurrency(amount, currency, locale);
}
