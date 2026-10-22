import { brand, theme, type ThemeName } from "@/config/site";

/**
 * All landing-page copy. Components render this file; they do not own the words.
 * The company name is interpolated from src/config/site.ts — do not paste it here.
 *
 * Prices stay commented out until the founders decide to show them.
 * To turn a price on, uncomment `price` on that step. The page will render it.
 *
 * Figures below are the Strategy doc's proposal. They are not validated.
 * The Company Overview still lists "pricing for each step" as an open question.
 *
 * Dev teams
 * - Readiness audit: "$3,500" — 2 weeks, credited toward setup within 30 days
 * - agents.md setup: "$12,000" — 4 weeks in the Strategy doc; 1–2 weeks in the Lead Gen Plan
 * - Workflow redesign: "$30,000–$45,000" — not sold before day 120; scoped after setup
 * - Retainer: "$4,000/mo" — 3-month minimum
 *
 * Small businesses
 * - Clarity session: "$1,500"
 *   The Lead Gen Plan instead offers a free 30–45 minute workflow walkthrough.
 * - Automation pilot: "$7,500"
 * - Custom software: "From $15,000" — only after a pilot
 * - Care plan: "$750/mo"
 *
 * Offer names are also unsettled ("AI readiness audit" vs "AI Delivery Audit",
 * "Agent setup" vs "Agent Workflow Setup"). Durations differ across the docs.
 * Nothing below states a duration or a dollar amount.
 */

export type OfferStep = {
  title: string;
  body: string;
  price?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
};

type ThemeLabels = {
  book: string;
  devKicker: string;
  howKicker: string;
  businessKicker: string;
  aboutKicker: string;
  kitchenTrail: string;
};

const labelsByTheme: Record<ThemeName, ThemeLabels> = {
  neutral: {
    book: "Book a call",
    devKicker: "For dev teams",
    howKicker: "How it works",
    businessKicker: "For small businesses",
    aboutKicker: "About",
    kitchenTrail: "Scoped on a call",
  },
  kitchen: {
    book: "Book a table",
    devKicker: "The menu",
    howKicker: "From the pass",
    businessKicker: "Off menu",
    aboutKicker: "Who's in the kitchen",
    kitchenTrail: "Scoped on a call",
  },
};

export const labels = labelsByTheme[theme];

export const home = {
  meta: {
    title: `${brand.name} | ${brand.tagline}`,
    description: `We help small dev teams ship features faster by redesigning their workflow around AI agents, and build custom automation and software for small businesses. ${brand.location}.`,
  },
  nav: [
    { href: "#dev-teams", label: "For dev teams" },
    { href: "#small-business", label: "For small businesses" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#about", label: "About" },
  ],
  hero: {
    eyebrow: [
      "AI agent workflows for small dev teams",
      "Custom tools for small businesses",
      brand.location,
    ],
    title: "Your team ships features end to end, faster, with AI agents.",
    lead: "AI tools aren't the bottleneck. The workflow is.",
    body: "Most teams already pay for AI tools, but their devs still use them like a chatbot. We redesign how your team builds software around AI agents, so the gap between an idea and a tested feature shrinks. Your devs keep the architecture, the reviews and the sign-off.",
    secondaryCta: "See how it works",
    sampleTicket: {
      caption: "Sample ticket, showing the flow we set up",
      idLabel: "Ticket",
      id: "418",
      title: "Add export filters",
      rows: [
        { stage: "Plan", state: "A dev approves" },
        { stage: "Build", state: "agents.md" },
        { stage: "Review", state: "A second agent" },
        { stage: "Pull request", state: "Opens" },
        { stage: "Sign-off", state: "A dev on the team" },
      ],
    },
  },
  paths: {
    title: "Where should we start?",
    items: [
      {
        href: "#dev-teams",
        title: "I run a dev team",
        body: "Ship features faster without adding headcount. Agents take tickets and designs to reviewed PRs, tuned to your codebase. Measured before and after.",
        cta: "How it works for dev teams",
      },
      {
        href: "#small-business",
        title: "I run a business",
        body: "Fix the one workflow that eats your week. A small tool you own, built around how you already work, plus plain-English help with AI.",
        cta: "What we build for small businesses",
      },
    ],
  },
  dev: {
    id: "dev-teams",
    kicker: labels.devKicker,
    title: "Start small. Measure it. Then go further.",
    intro:
      "Product writes it up. UX designs. Dev asks questions. UX revises. Dev builds. Product reviews. Then it happens again. Each handoff adds waiting, not work. Using an AI tool as a chatbot helps one dev write a function faster. It does not change how long an idea takes to become a tested feature.",
    kickerLine: "The tool is the easy part. The workflow is the real work.",
    footnote:
      "Fixed scope, one repo, a few weeks. You'll know if it works before committing to more. Every engagement is scoped on a call.",
    flowLink: "See the ticket flow",
    steps: [
      {
        title: "Readiness audit",
        body: "We review one repo, your conventions, and how your team uses AI today. You get a gap report, a plan, and a baseline metric we agree on together.",
        // price: "$3,500",
      },
      {
        title: "agents.md setup",
        body: "agents.md files and connectors, built around your architecture and tuned on real tickets. Delivered on real work, with a measured before and after.",
        // price: "$12,000",
      },
      {
        title: "Workflow redesign",
        body: "Devs own features end to end. Agents work from tickets and designs, with a component library they build from, review gates, and team training. This is the core of the work.",
        // price: "$30,000–$45,000",
      },
      {
        title: "Retainer",
        body: "We keep the agents tuned as your codebase changes, onboard new repos, hold office hours, or add capacity when you need it.",
        // price: "$4,000/mo",
      },
    ] satisfies OfferStep[],
  },
  how: {
    id: "how-it-works",
    kicker: labels.howKicker,
    title: "What it looks like when an agent picks up a ticket",
    steps: [
      {
        title: "Ticket",
        body: "The ticket and the Figma design come in through connectors.",
      },
      {
        title: "Plan",
        body: "The agent drafts a plan, and a dev approves or edits it.",
      },
      {
        title: "Build",
        body: "The agent builds with your component library and your agents.md rules.",
      },
      {
        title: "Review",
        body: "A second agent reviews the work.",
      },
      {
        title: "Pull request",
        body: "A PR opens.",
      },
      {
        title: "Sign-off",
        body: "A dev reviews, asks for changes, and signs off.",
      },
    ],
    calloutTitle: "Devs stay in charge.",
    calloutBody:
      "Agents do the legwork. Your team owns the architecture, every review, and the final sign-off.",
  },
  business: {
    id: "small-business",
    kicker: labels.businessKicker,
    title: "Start with the most boring task you do every week.",
    body: "Skip the big transformation plan. We find the repetitive work that eats your team's hours, fix one workflow with a small tool you own, and help you understand where AI helps and where it doesn't.",
    quote:
      "A small tool you own, built around how you already work, not another subscription.",
    chipsLabel: "Example workflows a pilot can cover",
    chips: [
      "Client intake",
      "Booking and missed-call routing to a person",
      "Collecting and handling documents",
      "Copying data between systems",
      "The same weekly report",
      "Meeting prep and follow-ups",
    ],
    prompt: "Where does your team re-type the same thing twice?",
    promptCta: "Let's talk",
    scoped: "Every engagement is scoped on a call.",
    steps: [
      {
        title: "Clarity session",
        body: "A shortlist of use cases and plain-English guidance on AI, including what is safe to use.",
        // price: "$1,500",
      },
      {
        title: "Automation pilot",
        body: "One workflow, fixed scope, built on the tools and compliance process you already have.",
        // price: "$7,500",
      },
      {
        title: "Custom software",
        body: "When a pilot proves the workflow is worth a product, we build the software.",
        // price: "From $15,000",
      },
      {
        title: "Care plan",
        body: "Hosting, monitoring, and small fixes after the tool is in use.",
        // price: "$750/mo",
      },
    ] satisfies OfferStep[],
  },
  founders: {
    id: "about",
    kicker: labels.aboutKicker,
    title: `Two founders, based in ${brand.location}`,
    started: `We started ${brand.name} for one reason: small dev teams deserve to ship as fast as the big ones.`,
    honest: "We're new and taking on our first clients.",
    people: [
      {
        name: "Brad Donakowski",
        role: "Co-Founder & CEO",
        bio: "Runs sales and client relationships, and works directly with the teams we help. Experience across mobile, fintech, healthcare, and IoT.",
        skills: ["Flutter", "React", "IoT", "Fintech"],
      },
      {
        name: "Mauricio Munoz",
        role: "Co-Founder & CTO",
        bio: "Owns technical direction and delivery, and makes the tech calls. Experience in system design, cloud, and mobile.",
        skills: ["Architecture", "Cloud", "Mobile"],
      },
    ] satisfies Founder[],
  },
  faq: {
    id: "faq",
    kicker: "Questions",
    title: "Questions CTOs ask",
    items: [
      {
        question: "We already have Copilot or Cursor.",
        answer:
          "Most teams do, and they use it as chat. The gap is agents that follow your conventions on every ticket and produce code that passes review. That's what agents.md and the setup fix.",
      },
      {
        question: "Will AI agents wreck our codebase?",
        answer:
          "Agents don't get the final say. Devs own the architecture, review every PR, and sign off. Agents reviewing each other catch the obvious stuff first, and clear agents.md rules keep them inside the lines.",
      },
      {
        question: "You're two people.",
        answer:
          "That's why the scope is fixed and small: one repo, a few weeks, measured.",
      },
    ] satisfies FaqItem[],
  },
  cta: {
    id: "book",
    title: "If slow delivery is the thing keeping you up, let's talk.",
    body: "A short call, no pitch deck. If there's nothing worth fixing, we'll say so.",
    pendingNote:
      "Scheduling page coming soon. This opens an email so we can find a time.",
    soonNote: "Scheduling is coming soon.",
  },
  footer: {
    rights: "All rights reserved.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
  },
} as const;
