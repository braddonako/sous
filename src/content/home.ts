/**
 * Page copy. Brand name, tagline, location, email, and the booking URL live in
 * src/config/site.ts. Tokens: {brand} {location} {serviceArea} {year}.
 *
 * Prices are not rendered. The Strategy doc proposes them and the Company
 * Overview still lists pricing as an open question, so the page says
 * "Scoped on a call".
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
 * The Lead Gen Plan instead offers a free 30–45 minute workflow walkthrough
 * as the small-business first step. That conflict is unresolved. The page
 * shows the walkthrough and marks it TBC via site.walkthroughOffer.
 */

export const home = {
  meta: {
    title: "{brand} | AI agent workflows for small dev teams",
    description:
      "We help small dev teams ship features faster by redesigning their workflow around AI agents, and build custom automation and software for small businesses. {location}.",
  },
  nav: [
    { label: "For dev teams", href: "#dev" },
    { label: "For businesses", href: "#smb" },
    { label: "How it works", href: "#how" },
    { label: "About", href: "#about" },
  ],
  bookLabel: "Book a call",
  hero: {
    eyebrow: {
      neutral: "AI agent workflows · Custom software · {location}",
      kitchen: "Mise en place for your dev team · {location}",
    },
    lede: "Your team already pays for AI tools. We redesign how you build around them, so ideas become tested features sooner, and ",
    ledeStrong:
      "your devs still own the architecture, the reviews and the sign-off.",
    note: "20 minutes. No pitch deck.",
    flow: {
      title: { neutral: "Ticket → PR", kitchen: "Order ticket" },
      example: "Example",
      id: "TKT-142",
      ticket: "Add CSV export to the reports page",
      caption: "Illustrative flow",
      status: { neutral: "Shipped", kitchen: "Order up" },
      steps: [
        { n: "1", text: "Reads ticket + Figma design", who: "Agent", human: false },
        { n: "2", text: "Plans from your agents.md", who: "Agent", human: false },
        { n: "3", text: "Builds; a 2nd agent reviews", who: "Agent", human: false },
        { n: "✓", text: "Reviews the PR and signs off", who: "Your dev", human: true },
      ],
    },
  },
  paths: {
    dev: {
      href: "#dev",
      kicker: "For CTOs & eng leads",
      title: "I run a dev team",
      body: "Get more out of the team you have. Agents take tickets and designs to reviewed PRs, tuned to your codebase.",
      chips: ["Audit", "agents.md setup", "Workflow redesign", "Retainer"],
    },
    business: {
      href: "#smb",
      kicker: "For owners & operators",
      title: "I run a business",
      body: "Get hours back from the busywork. We explain AI in plain English and build small tools that fit how you already work.",
      chips: ["Understand & use AI", "Automate busywork", "Custom software"],
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
    lede: "Each step is fixed in scope and built around your codebase. You'll know whether it works before you commit to the next one.",
    scope: "Scoped on a call",
    rungs: [
      {
        n: "01",
        title: "Readiness audit",
        body: "We review one repo, your conventions and how your team uses AI today. You get a gap report, a plan and a baseline metric we pick together.",
        aside: "Start here",
        core: false,
      },
      {
        n: "02",
        title: "agents.md setup",
        body: "agents.md files and connectors built around your architecture, tuned on real tickets, so agent code looks like your team wrote it.",
        aside: "Before / after",
        core: false,
      },
      {
        n: "03",
        title: "Workflow redesign",
        body: "Devs own features end to end with no handoffs. Agents work from tickets and designs, build from your UI component library, and your team gets trained.",
        aside: "After setup",
        core: true,
        badge: "Core",
      },
      {
        n: "04",
        title: "Ongoing support",
        body: "A retainer that keeps the setup tuned as your codebase changes, onboards new repos and gives your team someone to ask.",
        aside: "Monthly",
        core: false,
      },
    ],
    note: "Every setup is built around your own codebase. Agents work on code, never on production data.",
  },
  how: {
    eyebrow: "How it works",
    title: "What happens when an agent picks up a ticket",
    legend: [
      { label: "Agent", human: false },
      { label: "Your dev", human: true },
    ],
    steps: [
      {
        n: "01",
        k: "Input",
        title: "Ticket + design",
        body: "The Jira ticket and Figma design arrive through connectors.",
        tone: "input",
      },
      {
        n: "02",
        k: "Agent",
        title: "Plans",
        body: "Drafts a plan. A dev approves or edits it.",
        tone: "agent",
      },
      {
        n: "03",
        k: "Agent",
        title: "Builds",
        body: "Uses your component library and agents.md rules.",
        tone: "agent",
      },
      {
        n: "04",
        k: "Agent",
        title: "Reviews",
        body: "A second agent checks the work first.",
        tone: "agent",
      },
      {
        n: "05",
        k: "Output",
        title: "Opens a PR",
        body: "Traced back to the ticket, ready for review.",
        tone: "agent",
      },
      {
        n: "06",
        k: "Your dev",
        title: "Signs off",
        body: "Reviews, asks for changes and approves the merge.",
        tone: "human",
      },
    ],
    chargeTitle: "Devs stay in charge.",
    chargeBody:
      "Agents do the legwork. Your team owns the architecture, every review and the final sign-off.",
  },
  smb: {
    eyebrow: "For small businesses",
    titleLead: "Get hours back",
    titleRest: "from the work that eats your week.",
    lede: "You don't need to understand AI to benefit from it. Tell us what slows your team down, and we'll show you what's worth fixing, in plain English. If nothing is, we'll say so.",
    helps: [
      {
        icon: "?",
        title: "Make sense of AI",
        body: "What it's actually good at today, what it isn't, and where your business should start.",
        points: [
          "Plain-English guidance, no jargon",
          "What's safe for your team to use",
          "A simple one-page usage policy",
        ],
      },
      {
        icon: "⟳",
        title: "Automate the busywork",
        body: "Small tools that take repetitive steps off your plate, built on the software you already use.",
        points: [
          "Intake forms and follow-ups",
          "Moving info between systems",
          "Reports that build themselves",
        ],
      },
      {
        icon: "▢",
        title: "Build the tool you're missing",
        body: "When a spreadsheet isn't enough anymore, we build custom software around how your team really works.",
        points: [
          "A tool you own, not another subscription",
          "Fits your process and compliance rules",
          "Kept running after launch",
        ],
      },
    ],
    familiarTitle: "Sound familiar?",
    familiarSub: "These are the kinds of jobs worth handing to a tool.",
    familiar: [
      {
        quote: "The spreadsheet you update by hand every Friday.",
        detail: "It could fill itself in from the systems you already use.",
      },
      {
        quote: "Quotes that take an hour to write.",
        detail: "Draft them in minutes from a few answers.",
      },
      {
        quote: "Typing the same client info into three places.",
        detail: "Enter it once, and it shows up everywhere it's needed.",
      },
      {
        quote: "Chasing people for documents over email.",
        detail: "Automatic reminders and one place to upload.",
      },
      {
        quote: "Missed calls that never get called back.",
        detail: "Route them to the right person, every time.",
      },
      {
        quote: "Prepping for every client meeting from scratch.",
        detail: "Notes and follow-ups gathered for you.",
      },
    ],
    fine: "Examples of common problems, not past client results.",
    firstKicker: "Your first step",
    firstBadge: "Placeholder · offer TBC",
    firstTitle: "A free workflow walkthrough",
    firstBody:
      "30–45 minutes. Walk us through the task that eats the most time, and you'll leave with a clear view of what's worth automating and how you could use AI safely, whether or not you work with us.",
    firstMeta: ["30–45 min", "In person or video", "No prep needed"],
    workTitle: "How we work with you",
    work: [
      {
        title: "Show us how it works today",
        body: "We learn the steps, the tools and where the time goes. No tech knowledge needed.",
      },
      {
        title: "We fix one thing first",
        body: "A small, fixed-scope project on one workflow, built on your existing tools and process. Scoped on a call.",
      },
      {
        title: "Keep it running, then grow",
        body: "We look after what we built and take on the next workflow, or custom software, only if the first one paid off.",
      },
    ],
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
    measureBody:
      "We agree on a baseline with you before changing anything, then measure again.",
    measures: [
      { label: "Idea to tested feature", kind: "Time" },
      { label: "PR cycle time", kind: "Time" },
      { label: "Handoffs per feature", kind: "Count" },
      { label: "Features shipped per sprint", kind: "Count" },
      { label: "Bugs after release", kind: "Quality" },
    ],
    honest:
      "We're a new studio taking on our first clients. Case studies will go here once real clients approve them.",
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
        a: "Agents don't get the final say. Your devs own the architecture, review every PR and sign off. Clear agents.md rules keep agents inside the lines.",
      },
      {
        q: "I'm not technical. Can you still help my business?",
        a: "Yes. We talk in plain English, start from how your team works today, and only build something if it clearly saves time.",
      },
      {
        q: "What does it cost?",
        a: "Every engagement is fixed in scope and scoped on a call, so you know what you're getting before anything starts.",
      },
      {
        q: "You're two people. Is that a risk?",
        a: "That's why we keep the first step small: one repo or one workflow, a few weeks, measured. You'll know whether it works before you commit to more.",
      },
    ],
  },
  cta: {
    eyebrow: "Let's talk",
    title: "Slow delivery or busywork? Let's fix the part that matters.",
    body: "20 minutes, no pitch deck. If there's nothing worth fixing, we'll tell you.",
    emailLead: "Or email",
    emailBadge: "email TBC",
  },
  footer: {
    rights: "© {year} {brand} · {location}",
  },
} as const;
