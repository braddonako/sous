/**
 * Brand, contact, and theme. This is the only file that should contain the
 * company name. Page copy lives in src/content/home.ts.
 *
 * Rename: change `name`, `shortName`, `legalName`, and `logo.wordmarkText`
 * together (one edit in this object). scripts/check-brand-name.mjs fails if
 * those strings show up anywhere else under src/.
 *
 * PLACEHOLDERS — not confirmed in the business docs. Do not treat them as final.
 * - email: carried over from the previous site. Not in the docs. The domain
 *   will likely change with the rename.
 * - domain: unverified. the previous site's email domain did not answer HTTPS.
 * - bookingUrl: leave empty until a real https booking link exists.
 *   Do not set this to "#". An empty value makes "Book a call" open email,
 *   or show a coming-soon state when email is empty too.
 * - linkedin: leave empty until a company page exists. The footer hides it.
 * - url: current GitHub Pages address. Replace when a custom domain is chosen.
 */

export type ThemeName = "neutral" | "kitchen";

export type BrandLogo = {
  /** "dots" draws the small geometric mark. "none" is wordmark text only. */
  mark: "dots" | "none";
  /** Visible wordmark. Keep in sync with `name` unless the logo text differs. */
  wordmarkText: string;
};

export type Brand = {
  name: string;
  shortName: string;
  legalName: string;
  domain: string;
  url: string;
  /** PLACEHOLDER until the address is confirmed. */
  email: string;
  /** PLACEHOLDER. Empty until a booking tool and URL are chosen. */
  bookingUrl: string;
  location: string;
  /** PLACEHOLDER. Empty until a company LinkedIn page exists. */
  linkedin: string;
  tagline: string;
  logo: BrandLogo;
};

export const brand: Brand = {
  name: "The Chefs",
  shortName: "Chefs",
  legalName: "The Chefs",
  domain: "thechefs.dev",
  url: "https://braddonako.github.io/the-chefs",
  email: "hello@thechefs.dev",
  bookingUrl: "",
  location: "Parker, CO",
  linkedin: "",
  tagline: "AI agent workflows for small dev teams",
  logo: {
    mark: "dots",
    wordmarkText: "The Chefs",
  },
};

/**
 * "neutral" is the default and does not depend on the company name.
 * "kitchen" restores warmer accents, serif headings, dotted leaders, and a
 * few menu labels. It is off until a rename still suits that flavor.
 */
export const theme: ThemeName = "neutral";

export type ContactAction =
  | { kind: "url"; href: string }
  | { kind: "email"; href: string; email: string }
  | { kind: "soon" };

/** http(s) booking link, otherwise mailto, otherwise a non-link coming-soon state. */
export function getContactAction(subject: string): ContactAction {
  const bookingUrl = brand.bookingUrl.trim();
  if (/^https?:\/\//i.test(bookingUrl)) {
    return { kind: "url", href: bookingUrl };
  }

  const email = brand.email.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      kind: "email",
      email,
      href: `mailto:${email}?subject=${encodeURIComponent(subject)}`,
    };
  }

  return { kind: "soon" };
}
