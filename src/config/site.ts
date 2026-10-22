/**
 * Brand, contact, and theme. The only file under src/ that may spell the
 * brand name. `scripts/check-brand.mjs` fails the build otherwise.
 * A rename is an edit here: `brandName`, `brandGuard`, then `npm run check:brand`.
 */

export const brandName = "The Chefs";

/**
 * Literals that must not appear under src/ outside this file.
 * Keep retired names in this list until they are gone from the repo.
 */
export const brandGuard = ["The Chefs", "Chefs"] as const;

export type ThemeName = "neutral" | "kitchen";
export type PlaceholderStatus = "TBC" | "confirmed";

export const site = {
  name: brandName,
  shortName: brandName,
  legalName: brandName,
  /**
   * Hero headline. `taglineEmphasis` is the phrase rendered in the accent color.
   * Keep the emphasis as an exact substring, including the non-breaking space.
   */
  tagline: "Ship features faster with AI\u00A0agent workflows.",
  taglineEmphasis: "AI\u00A0agent workflows.",
  location: "Parker, CO",

  /**
   * PLACEHOLDER — confirm with Brad.
   * Open decision: is "Denver metro, in person or remote" the right line?
   */
  serviceArea: "Denver metro, in person or remote",
  serviceAreaStatus: "TBC" as PlaceholderStatus,

  /** Current GitHub Pages URL. Replace when a custom domain is chosen. */
  url: "https://braddonako.github.io/the-chefs",

  /**
   * PLACEHOLDER — email TBC.
   * The address is not in the founders' docs. Leave this empty until Brad
   * confirms one, then set emailStatus to "confirmed".
   */
  email: "",
  emailStatus: "TBC" as PlaceholderStatus,

  /**
   * PLACEHOLDER — booking URL TBC.
   * Leave empty until a real https scheduling link exists.
   * Book-a-call buttons never use "#". See getBookCallHref().
   */
  bookingUrl: "",
  bookingStatus: "TBC" as PlaceholderStatus,

  /**
   * Last resort when bookingUrl and email are both empty.
   * `.invalid` is reserved by RFC 2606, so this cannot reach a real mailbox.
   */
  bookingFallback: "mailto:booking@placeholder.invalid",

  /** PLACEHOLDER — LinkedIn company page TBC. Hidden until this is an https URL. */
  linkedin: "",
  linkedinStatus: "TBC" as PlaceholderStatus,

  logo: {
    mark: "dot-grid" as const,
    wordmarkText: brandName,
  },

  /**
   * "neutral" is the default (ink, bone, paprika, Space Grotesk).
   * "kitchen" is the optional Fraunces / order-ticket treatment. Off unless
   * this is set to "kitchen".
   */
  theme: "neutral" as ThemeName,

  /**
   * PLACEHOLDER — small-business first step is not decided.
   * The page shows the free workflow walkthrough and labels it TBC.
   * The other option is the $1,500 clarity session noted in src/content/home.ts.
   */
  walkthroughOffer: "TBC" as PlaceholderStatus,

  /**
   * PLACEHOLDER — founder photos TBC.
   * Use a relative path such as "./founders/brad.jpg" (works with the Pages
   * base path). Empty keeps the striped placeholder.
   */
  photos: {
    brad: "",
    mauricio: "",
  },
  founderPhotos: "TBC" as PlaceholderStatus,

  /**
   * PLACEHOLDER — one personal line per founder TBC.
   * Empty keeps the "Bio line TBC" mark. Do not invent a personal line.
   */
  bioLines: {
    brad: "",
    mauricio: "",
  },
  founderBios: "TBC" as PlaceholderStatus,
};

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

export function isRealEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type BookCallKind = "booking" | "mailto" | "placeholder";

export function getBookCall(): { href: string; kind: BookCallKind } {
  const booking = site.bookingUrl.trim();
  if (booking && booking !== "#" && isHttpUrl(booking)) {
    return { href: booking, kind: "booking" };
  }
  const email = site.email.trim();
  if (email && email !== "#" && isRealEmail(email)) {
    return { href: `mailto:${email}`, kind: "mailto" };
  }
  return { href: site.bookingFallback, kind: "placeholder" };
}

export function pickTheme<T>(value: { neutral: T; kitchen: T }): T {
  return value[site.theme];
}
