/**
 * Founder projects from before the studio. No client names, no user counts,
 * no ratings. {brand} is filled from src/config/site.ts.
 */

export type WorkProject = {
  title: string;
  description: string;
  tags: readonly string[];
  highlight: string;
  /** The AI pipeline card stays off the business page. */
  business: boolean;
};

export const work = {
  eyebrow: "Selected work",
  title: "Work we've shipped",
  note: "Projects our founders built before {brand}, described without client names.",
  businessLede: "We know what it takes to make a tool your team actually uses.",
  stack: "Flutter · React · Angular · TypeScript · iOS & Android · AWS · Google Cloud",
  projects: [
    {
      title: "Energy Management Platform",
      description:
        "Consumer mobile app for monitoring home energy usage, managing EV charging sessions, and comparing utility plans with real-time savings calculators.",
      tags: ["Flutter", "IoT", "Energy"],
      highlight: "Consumer app at scale",
      business: true,
    },
    {
      title: "Construction Neobank",
      description:
        "Flutter-based payment platform for the construction industry with instant payment processing, digital lien waivers, and multi-state legal compliance.",
      tags: ["Flutter", "Fintech", "Angular"],
      highlight: "Banking API integration",
      business: true,
    },
    {
      title: "AI Development Pipeline",
      description:
        "Multi-agent AI workflow orchestrating requirements, architecture, code generation, and review, with specialized models scoped per phase and structured knowledge retrieval.",
      tags: ["AI", "Agents", "DevOps"],
      highlight: "4-phase autonomous pipeline",
      business: false,
    },
    {
      title: "Healthcare Platform",
      description:
        "Angular and Flutter applications for a healthcare company, rebuilt with domain-driven architecture, shared component libraries, and accessibility compliance.",
      tags: ["Healthcare", "Angular", "Flutter"],
      highlight: "Global distributed team",
      business: true,
    },
    {
      title: "Industrial Hardware Integration",
      description:
        "Belt frequency detection app with native Android audio processing, microphone hardware access, and full Chinese/English localization.",
      tags: ["Android", "IoT", "Hardware"],
      highlight: "Native hardware integration",
      business: true,
    },
    {
      title: "Offline Sales Catalog",
      description:
        "Enterprise Flutter app with SAP authentication, AWS backend, and multi-format export, built to work fully offline in the field.",
      tags: ["Flutter", "AWS", "Offline"],
      highlight: "Fully offline-capable",
      business: true,
    },
  ],
} as const;
