/**
 * Small-business page copy. No jargon: no dev-team jargon in the hero,
 * the offer, the FAQ, or the close. Project cards reuse the shared work copy.
 * Tokens: {brand} {location} {serviceArea} {year}.
 */

export const business = {
  meta: {
    title: "{brand} | Practical AI for small businesses",
    description:
      "Hands-on AI help for owners and operators in {location}. Make sense of AI, automate busywork, and build the tools your business is missing.",
  },
  hero: {
    eyebrow: {
      neutral: "For owners and operators · {location}",
      kitchen: "Hands-on AI help · {location}",
    },
    titleLead: "Get hours back",
    titleRest: "from the work that eats your week.",
    lede: "You don't need to understand AI to benefit from it. Tell us what slows your team down. We'll tell you honestly if it's worth fixing, and if it isn't, we'll say so.",
    note: "Free meeting. 20 minutes. No pitch deck.",
  },
  offer: {
    title: "What we can take on",
    helps: [
      {
        icon: "?",
        title: "Make sense of AI",
        body: "What it's actually good at today, what it isn't, and where your business should start.",
        points: [
          "Straight answers, no jargon",
          "What's safe for your team to use",
          "A simple one-page usage policy",
        ],
      },
      {
        icon: "⟳",
        title: "Automate the busywork",
        body: "Small tools that take repetitive steps off your plate, built on the software you already use.",
        points: ["Intake forms and follow-ups", "Moving info between systems", "Reports that build themselves"],
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
    firstTitle: "A free meeting",
    firstBody:
      "20 minutes. Tell us what eats the time. We'll say whether it's worth fixing. It isn't a working session, and you don't owe us anything after.",
    firstMeta: ["20 min", "In person or video", "No prep needed"],
    workTitle: "How we work with you",
    work: [
      {
        title: "Show us how it works today",
        body: "We learn the steps, the tools and where the time goes. No tech knowledge needed.",
      },
      {
        title: "We fix one thing first",
        body: "A small, fixed-scope project on one workflow, built on your existing tools and process. After the call, we'll send a plan and pricing.",
      },
      {
        title: "Keep it running, then grow",
        body: "We look after what we built and take on the next workflow, or custom software, only if the first one paid off.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Good questions.",
    intro: "Still wondering about something? Ask us on a call.",
    items: [
      {
        q: "I'm not technical. Can you still help my business?",
        a: "Yes. We skip the jargon, start from how your team works today, and only build something if it clearly saves time.",
      },
      {
        q: "What happens on the call?",
        a: "20 minutes. Tell us what eats the time. We'll say whether it's worth fixing. It isn't a working session, and you don't owe us anything after.",
      },
      {
        q: "What does it cost?",
        a: "Every project is fixed in scope. After the call, we'll send a plan and pricing, so you know what you're getting before anything starts.",
      },
      {
        q: "What if it isn't worth doing?",
        a: "We'll say so. The meeting is free, and we only suggest a project when it clearly saves time.",
      },
    ],
  },
  cta: {
    eyebrow: "Let's talk",
    title: "Tell us what eats the time.",
    body: "A free meeting. 20 minutes, no pitch deck. If there's nothing worth fixing, we'll tell you.",
    emailLead: "Or email",
    emailBadge: "email TBC",
  },
} as const;
