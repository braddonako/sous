/**
 * Home-page and shared copy. Brand name, tagline, location, email, and the
 * booking URL live in src/config/site.ts. Tokens: {brand} {location}
 * {serviceArea} {year}.
 *
 * Prices are not rendered. The Strategy doc proposes them and the Company
 * Overview still lists pricing as an open question. The page does not price
 * anything on the call. After the call, the studio sends a plan and pricing.
 *
 * Dev teams (Strategy doc, not validated):
 *   Readiness audit — $3,500 (2 weeks, credited to setup within 30 days)
 *   agents.md setup — $12,000 (4 weeks)
 *   Workflow redesign — $30,000–$45,000 (not sold before day 120)
 *   Ongoing support — $4,000 per month (3-month minimum)
 *
 * Small businesses (Strategy doc):
 *   Clarity session — $1,500
 *   Automation pilot — $7,500
 *   Custom software — from $15,000
 *   Care plan — $750 per month
 *
 * The first step on the page is a free meeting. It is not a working session,
 * and it is not the $1,500 clarity session. Do not describe the meeting as
 * something the visitor leaves with a finished plan.
 */

export const home = {
  meta: {
    title: "{brand} | AI for dev teams and small businesses",
    description:
      "A {location} studio. We help dev teams ship features faster with AI agent workflows, and we help small businesses automate busywork and build custom tools.",
  },
  bookLabel: "Book a call",
  hero: {
    eyebrow: {
      neutral: "Software studio · {location}",
      kitchen: "Mise en place for small teams · {location}",
    },
    titleLead: "Practical AI,",
    titleRest: "for the team you already have.",
    lede: "Dev teams ship features faster, with the people who own the work still in charge. Small businesses get plain-English help and hours back from the busywork.",
    note: "Free meeting. 20 minutes. No pitch deck.",
  },
  paths: {
    dev: {
      href: "/teams",
      kicker: "For CTOs & eng leads",
      title: "I run a dev team",
      body: "Get more out of the team you have. Agents take tickets and designs to reviewed PRs, tuned to your codebase.",
      chips: ["Audit", "Infrastructure setup", "Workflow redesign", "Retainer"],
    },
    business: {
      href: "/business",
      kicker: "For owners & operators",
      title: "I run a business",
      body: "Get hours back from the busywork. We explain AI in plain English and build small tools that fit how you already work.",
      chips: ["Understand & use AI", "Automate busywork", "Custom software"],
    },
  },
  about: {
    eyebrow: "About",
    title: "Two founders, based in {location}.",
    lede: "We started {brand} because small teams deserve to ship as fast as the big ones, and small businesses deserve tools that fit how they actually work.",
    photoLabel: "Photo",
    bioBadge: "Bio line TBC",
    founders: [
      {
        id: "brad" as const,
        name: "Brad Donakowski",
        role: "Co-Founder & CEO",
        body: "Runs the business side and client relationships, and works directly with the teams and owners we help.",
      },
      {
        id: "mauricio" as const,
        name: "Mauricio Munoz",
        role: "Co-Founder & CTO",
        body: "Owns technical direction and delivery, makes the tech calls, and builds what we ship.",
      },
    ],
  },
  cta: {
    eyebrow: "Let's talk",
    title: "Slow delivery or busywork? Let's fix the part that matters.",
    body: "A free meeting. 20 minutes, no pitch deck. If there's nothing worth fixing, we'll tell you.",
    emailLead: "Or email",
    emailBadge: "email TBC",
  },
  footer: {
    rights: "© {year} {brand} · {location}",
    teams: "Teams",
    business: "Business",
  },
} as const;
