/**
 * Brand, contact, and theme. The only file under src/ that may spell the
 * brand name. `scripts/check-brand.mjs` fails the build otherwise.
 * A rename is an edit here: `brandName`, `brandGuard`, then `npm run check:brand`.
 */

export const brandName = "Sous";

/**
 * GitHub Pages path prefix. Empty BASE_PATH serves a custom domain from the root.
 * next.config.ts imports this. The literal stays in this file so the brand check
 * can keep the name out of the rest of src/.
 */
export const basePath = process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : "/sous";

/**
 * Literals that must not appear under src/ outside this file.
 * Keep retired names in this list until they are gone from the repo.
 */
export const brandGuard = ["Sous", "The Chefs", "Chefs"] as const;

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
  location: "Denver Metro",

  /** Where the free meeting can happen. */
  serviceArea: "Denver Metro, in person or remote",
  serviceAreaStatus: "confirmed" as PlaceholderStatus,

  /** Current GitHub Pages URL. Replace when a custom domain is chosen. */
  url: "https://braddonako.github.io/sous",

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
    wordmarkText: brandName,
    /** Ink wordmark for light backgrounds. */
    lockupOnLight: "/brand/lockup-light.svg",
    /** Paper wordmark for ink backgrounds. */
    lockupOnInk: "/brand/lockup-dark.svg",
  },

  assets: {
    favicon: "/brand/favicon.svg",
    favicon32: "/brand/favicon-32.png",
    favicon16: "/brand/favicon-16.png",
    appleTouch: "/brand/apple-touch-icon-180.png",
    /** Square avatar used for the default social image. */
    social: "/brand/avatar-light-400.png",
  },

  /**
   * "neutral" is the default (ink, paper, orange, Space Grotesk).
   * "kitchen" is the optional Fraunces / order-ticket treatment. Off unless
   * this is set to "kitchen".
   */
  theme: "neutral" as ThemeName,

  /**
   * The first step for both audiences is a free meeting, not a working
   * session and not the paid clarity session.
   */
  firstMeeting: "confirmed" as PlaceholderStatus,

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

  /**
   * Personal LinkedIn URLs on the founder cards. The company page stays in
   * `linkedin` above and stays hidden until that URL exists. Empty hides the link.
   */
  founderLinkedin: {
    brad: "https://www.linkedin.com/in/braddonakowski",
    mauricio: "",
  },
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
