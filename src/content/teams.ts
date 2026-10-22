/**
 * Dev-team page copy. The hero headline is site.tagline in src/config/site.ts.
 * Tokens: {brand} {location} {serviceArea} {year}.
 */

export const teams = {
  meta: {
    title: "{brand} | AI agent workflows for dev teams",
    description:
      "We help CTOs and eng leads ship features faster with AI agent workflows. Devs still own the architecture, the reviews, and the sign-off. {location}.",
  },
  hero: {
    eyebrow: {
      neutral: "AI agent workflows · {location}",
      kitchen: "Mise en place for your dev team · {location}",
    },
    lede: "Your team already pays for AI tools. We redesign how you build around them, so ideas become tested features sooner, and ",
    ledeStrong: "your devs still own the architecture, the reviews and the sign-off.",
    note: "Free meeting. 20 minutes. No pitch deck.",
    flow: {
      title: { neutral: "Ticket → PR", kitchen: "Order ticket" },
      example: "Example",
      id: "TKT-142",
      ticket: "Add CSV export to the reports page",
      caption: "Illustrative flow",
      status: { neutral: "Shipped", kitchen: "Order up" },
      steps: [
        { n: "1", text: "Plans from the ticket and design", who: "Agent + your dev", human: true },
        { n: "2", text: "Does the build", who: "Agent", human: false },
        { n: "3", text: "Opens a pull request", who: "Agent", human: false },
        { n: "✓", text: "Reviews and signs off", who: "Your dev", human: true },
      ],
    },
  },
  problem: {
    eyebrow: "The real bottleneck",
    title: "Count the handoffs on your last feature.",
    body: "Using AI as a chatbot helps one dev write a function faster. It doesn't change how long an idea takes to become a tested feature. That time goes to handoffs, review queues and re-explaining context.",
    kick: "AI tools aren't the bottleneck. The workflow is.",
    today: "Typical today",
    chain: [
      { label: "Product", wait: false },
      { label: "UX", wait: false },
      { label: "Dev", wait: false },
      { label: "waiting", wait: true },
      { label: "UX", wait: false },
      { label: "Dev", wait: false },
      { label: "Product", wait: false },
      { label: "repeat", wait: true },
    ],
    afterLabel: "With agents",
    after: ["Idea", "One dev + agents", "Tested feature"],
  },
  dev: {
    eyebrow: "For dev teams",
    title: "Start small. Measure it. Then go further.",
    lede: "It starts with a free meeting. Each step after that is fixed in scope and built around your codebase. You'll know whether it works before you commit to the next one.",
    priceLine:
      "After the call, we'll send you a plan and pricing built around your team and codebase.",
    rungs: [
      {
        n: "01",
        title: "Readiness audit",
        body: "We review one repo, your conventions and how your team uses AI today. You get a gap report, a plan and a baseline metric we pick together.",
        core: false,
      },
      {
        n: "02",
        title: "Infrastructure setup",
        body: "A setup built around your architecture and tuned on real tickets, so the code reads like your team wrote it.",
        core: false,
      },
      {
        n: "03",
        title: "Workflow redesign",
        body: "Devs own features end to end. Agents take tickets and designs through to review, and your team gets trained.",
        core: true,
        badge: "Core",
      },
      {
        n: "04",
        title: "Ongoing support",
        body: "A retainer that keeps the setup tuned as your codebase changes, onboards new repos and gives your team someone to ask.",
        core: false,
      },
    ],
    chargeTitle: "Devs stay in charge.",
    chargeBody:
      "Your devs can steer at every step, from the plan to the merge. They own the architecture, every review and the final sign-off. We'll show you how it works on the call.",
    note: "Every setup is built around your own codebase. Agents work on code, never on production data.",
  },
  proof: {
    eyebrow: "How fast we move",
    title: "See it before you sign anything.",
    lede: "We mock up what your product or process could look like, often in an afternoon with AI agents. Every concept uses example data and is clearly labeled.",
    before: "Before",
    concept: "Concept",
    caption: "Concept board · example data",
    captionAside: "Real boards added once approved",
    measureKicker: "What we measure",
    measureTitle: "Proof you can check",
    measureBody: "We agree on a baseline with you before changing anything, then measure again.",
    measures: [
      { label: "Idea to tested feature", kind: "Time" },
      { label: "PR cycle time", kind: "Time" },
      { label: "Handoffs per feature", kind: "Count" },
      { label: "Features shipped per sprint", kind: "Count" },
      { label: "Bugs after release", kind: "Quality" },
    ],
    honest: "We're a new studio taking on our first clients. Case studies will go here once real clients approve them.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Good questions.",
    intro: "Still wondering about something? Ask us on a call.",
    items: [
      {
        q: "We already have Copilot or Cursor. Why do we need you?",
        a: "Most teams do, and most use them like a chatbot. The gap is agents that follow your conventions on every ticket and produce code that passes review. That's what the setup fixes.",
      },
      {
        q: "Will AI agents wreck our codebase?",
        a: "Agents don't get the final say. Your devs own the architecture, review every PR and sign off. Clear rules keep the work inside the lines.",
      },
      {
        q: "What happens on the call?",
        a: "20 minutes. We look at how your team ships and whether an agent workflow would help. After the call, we'll send you a plan and pricing built around your team and codebase. It isn't a working session.",
      },
      {
        q: "What does it cost?",
        a: "Every engagement is fixed in scope. After the call, we'll send a plan and pricing, so you know what you're getting before anything starts.",
      },
    ],
  },
  cta: {
    eyebrow: "Let's talk",
    title: "Want the next feature to ship faster?",
    body: "A free meeting. 20 minutes, no pitch deck. We'll look at how your team ships. If there's nothing worth changing, we'll tell you.",
    emailLead: "Or email",
    emailBadge: "email TBC",
  },
} as const;
