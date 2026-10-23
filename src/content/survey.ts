/**
 * AI readiness check. Nothing in here is submitted or stored.
 *
 * Scoring is a lookup, not a model. Each area is 1, 2, or 3.
 * Strength areas use "Room to grow", "Getting there", and "Strong".
 * "Time to win back" is an opportunity: more hours and more tasks score
 * higher, and the words are "Some", "A good amount", and "A lot".
 *
 * Readiness leaves "Time to win back" out. A bigger pile of busywork is an
 * opportunity, not a sign the team is further along.
 *
 * Business sums Your tools + AI use today + Confidence with AI (3–9):
 *   3–4 Just getting started
 *   5–7 Ready for a first project
 *   8–9 Ready to move fast
 *
 * Teams sums Delivery speed + Flow + AI use today + Foundations (4–12):
 *   4–6 Just getting started
 *   7–9 Ready for a first project
 *   10–12 Ready to move fast
 *
 * Suggestions: up to three, from the areas that most need a next step.
 * Time to win back counts as needing a next step at "A good amount" or "A lot".
 * The other areas count at "Room to grow" or "Getting there".
 * When urgency is tied, the lower tieBreak wins a slot.
 */

export type SurveyPath = "business" | "teams";

export type AreaScore = 1 | 2 | 3;

/**
 * Question id → option id, list of option ids, free text, or a list of tool names.
 * A short note beside an Other choice is stored at `${questionId}_other`.
 * `tools` is the names they picked. Custom tools are stored as typed.
 */
export type SurveyAnswers = Record<string, string | string[]>;

export const OTHER_TEXT_MAX = 80;

/** Answer key for the optional text next to an Other choice. */
export function otherAnswerKey(questionId: string): string {
  return `${questionId}_other`;
}

export const TOOL_NAME_MAX = 80;

export type ToolCategory = "accounting" | "office" | "crm" | "industry" | "basic" | "common";

export type KnownTool = {
  name: string;
  category: ToolCategory;
};

/** Grouped so scoring can tell a named system from spreadsheets or paper. */
export const toolGroups: { category: ToolCategory; tools: readonly string[] }[] = [
  { category: "accounting", tools: ["QuickBooks", "Xero", "FreshBooks", "Wave"] },
  { category: "office", tools: ["Google Workspace", "Microsoft 365", "Excel or Google Sheets"] },
  { category: "crm", tools: ["Salesforce", "HubSpot", "Redtail", "Wealthbox", "Zoho CRM", "A CRM"] },
  {
    category: "industry",
    tools: ["eMoney", "Orion", "Envestnet", "MoneyGuidePro", "Jobber", "ServiceTitan", "Clio", "Shopify", "Square"],
  },
  { category: "basic", tools: ["Mostly spreadsheets", "Mostly paper"] },
  { category: "common", tools: ["Slack", "Zoom", "Calendly", "DocuSign", "Dropbox", "Mailchimp"] },
];

export const knownTools: KnownTool[] = toolGroups.flatMap((group) =>
  group.tools.map((name) => ({ name, category: group.category })),
);

/** Shown as tap targets so someone can answer without typing. */
export const popularTools = [
  "Google Workspace",
  "Microsoft 365",
  "QuickBooks",
  "Excel or Google Sheets",
  "A CRM",
  "Mostly paper",
] as const;

export type ToolChoice = {
  kind: "known" | "add";
  name: string;
};

export function findKnownTool(name: string): KnownTool | undefined {
  const key = name.trim().toLowerCase();
  if (!key) return undefined;
  return knownTools.find((tool) => tool.name.toLowerCase() === key);
}

/**
 * Known tools whose names contain the query, then "Add" when the text is not
 * already a known tool or a selected name. Matching is case-insensitive.
 */
export function toolChoices(query: string, selected: readonly string[]): ToolChoice[] {
  const q = query.trim().toLowerCase();
  const selectedKeys = new Set(selected.map((name) => name.trim().toLowerCase()));
  const matches: ToolChoice[] = knownTools
    .filter((tool) => !selectedKeys.has(tool.name.toLowerCase()))
    .filter((tool) => q.length === 0 || tool.name.toLowerCase().includes(q))
    .map((tool) => ({ kind: "known", name: tool.name }));
  if (q.length === 0) return matches;
  const exactKnown = knownTools.some((tool) => tool.name.toLowerCase() === q);
  if (!exactKnown && !selectedKeys.has(q)) {
    matches.push({ kind: "add", name: query.trim().slice(0, TOOL_NAME_MAX) });
  }
  return matches;
}

/** Canonical known name, or the custom text as typed. Null when blank or already selected. */
export function acceptToolName(typed: string, selected: readonly string[]): string | null {
  const trimmed = typed.trim().slice(0, TOOL_NAME_MAX);
  if (!trimmed) return null;
  const name = findKnownTool(trimmed)?.name ?? trimmed;
  if (selected.some((item) => item.trim().toLowerCase() === name.toLowerCase())) return null;
  return name;
}

export type QuestionKind = "single" | "multi" | "text" | "tools";

export type SurveyOption = {
  id: string;
  label: string;
  /** Shown under this choice when it is selected. The note is optional. */
  detail?: {
    label: string;
    placeholder?: string;
  };
};

export type SurveyQuestion = {
  id: string;
  prompt: string;
  kind: QuestionKind;
  options?: SurveyOption[];
};

export type AreaKind = "strength" | "opportunity";

export type AreaDefinition = {
  id: string;
  label: string;
  kind: AreaKind;
  labels: Record<AreaScore, string>;
  tieBreak: number;
};

export type ScoredArea = AreaDefinition & {
  score: AreaScore;
  labelWord: string;
};

export type SuggestionDef = {
  id: string;
  areaId: string;
  text: string;
  questionId: string;
  optionIds: readonly string[];
  /** Used only when the scored areas don't already yield two suggestions. */
  filler?: boolean;
};

export type ChosenSuggestion = {
  id: string;
  areaId: string;
  areaLabel: string;
  text: string;
};

export type ReadinessLevel = {
  id: "start" | "first" | "fast";
  label: string;
  body: string;
};

export type SurveyEcho = {
  lead: string;
  text: string;
};

export type SurveyResult = {
  level: ReadinessLevel;
  areas: ScoredArea[];
  suggestions: ChosenSuggestion[];
  echo: SurveyEcho | null;
};

export const survey = {
  meta: {
    title: "{brand} | AI readiness check",
    description: "Eight short questions about how your team works today. Nothing is saved.",
  },
  intro: {
    kicker: "AI readiness check",
    title: "How ready is your team for AI?",
    sub: "8 quick questions, about 3 minutes. Nothing is saved.",
  },
  noscript: "This check runs in your browser and needs JavaScript turned on. Nothing is sent anywhere.",
  back: "Back",
  next: "Next",
  nextBlocked: "Choose an answer first.",
  resultKicker: "Your result",
  barsTitle: "Where you stand",
  barsNote: {
    business:
      "A fuller bar is the stronger spot. On Time to win back, a fuller bar means more of the week you could get back.",
    teams: "A fuller bar is the stronger spot.",
  },
  suggestionsTitle: "Where we'd start",
  bookLabel: "Book a free 20-minute call",
  startOver: "Start over",
  savedNote: "Nothing you entered was saved.",
  hints: {
    single: "Choose one.",
    multi: "Choose all that apply.",
    text: "Optional. You can leave this blank.",
    tools: "Search or tap every tool you use.",
  },
  toolPicker: {
    label: "Search tools",
    placeholder: "Search or type a tool, e.g. QuickBooks",
    popular: "Or tap a common one",
    already: "Already added",
    browseEmpty: "Type a name to add another tool.",
  },
} as const;

const levelCopy = {
  start: {
    label: "Just getting started",
    body: {
      business: "You're early, and that's a fine place to begin. One small try will teach the team more than a long plan.",
      teams: "The team is early on this. A short first try will show what to change before you go further.",
    },
  },
  first: {
    label: "Ready for a first project",
    body: {
      business: "You have enough in place to try one real project and see how it goes.",
      teams: "You have enough in place to try one real project and see how it goes.",
    },
  },
  fast: {
    label: "Ready to move fast",
    body: {
      business: "The basics are in place. The next win is aiming what you already have at the work that slows the week down.",
      teams: "The basics are in place. The next win is aiming the team at the wait that slows delivery.",
    },
  },
} as const;

const strengthLabels: Record<AreaScore, string> = {
  1: "Room to grow",
  2: "Getting there",
  3: "Strong",
};

const businessAreas: AreaDefinition[] = [
  {
    id: "time",
    label: "Time to win back",
    kind: "opportunity",
    labels: { 1: "Some", 2: "A good amount", 3: "A lot" },
    tieBreak: 0,
  },
  {
    id: "tools",
    label: "Your tools",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 2,
  },
  {
    id: "ai",
    label: "AI use today",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 3,
  },
  {
    id: "confidence",
    label: "Confidence with AI",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 1,
  },
];

const teamsAreas: AreaDefinition[] = [
  {
    id: "delivery",
    label: "Delivery speed",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 2,
  },
  {
    id: "flow",
    label: "Flow",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 0,
  },
  {
    id: "ai",
    label: "AI use today",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 3,
  },
  {
    id: "foundations",
    label: "Foundations",
    kind: "strength",
    labels: strengthLabels,
    tieBreak: 1,
  },
];

const businessQuestions: SurveyQuestion[] = [
  {
    id: "kind",
    prompt: "What kind of business is it?",
    kind: "single",
    options: [
      { id: "professional", label: "Professional services" },
      { id: "trades", label: "Trades & home services" },
      { id: "retail", label: "Retail" },
      { id: "healthcare", label: "Healthcare" },
      {
        id: "other",
        label: "Other",
        detail: { label: "What kind of business?", placeholder: "Financial advisory, insurance…" },
      },
    ],
  },
  {
    id: "size",
    prompt: "How many people work there?",
    kind: "single",
    options: [
      { id: "solo", label: "Just me" },
      { id: "small", label: "2–10" },
      { id: "mid", label: "11–50" },
      { id: "large", label: "50+" },
    ],
  },
  {
    id: "tasks",
    prompt: "Which tasks eat the most time each week?",
    kind: "multi",
    options: [
      { id: "quotes", label: "Quotes and invoices" },
      { id: "scheduling", label: "Scheduling" },
      { id: "retyping", label: "Typing the same info into several systems" },
      { id: "chasing", label: "Chasing people for documents or replies" },
      { id: "reports", label: "Building reports" },
      { id: "questions", label: "Answering the same questions over and over" },
      { id: "other", label: "Something else", detail: { label: "The other task" } },
    ],
  },
  {
    id: "hours",
    prompt: "Roughly how many hours a week go to those?",
    kind: "single",
    options: [
      { id: "under-5", label: "Under 5" },
      { id: "5-10", label: "5–10" },
      { id: "10-20", label: "10–20" },
      { id: "20-plus", label: "20+" },
    ],
  },
  {
    id: "tools",
    prompt: "What do you run the business on?",
    kind: "tools",
  },
  {
    id: "ai",
    prompt: "Does anyone on your team use AI tools today?",
    kind: "single",
    options: [
      { id: "not-yet", label: "Not yet" },
      { id: "a-few", label: "A few people on their own" },
      { id: "regularly", label: "We use it regularly" },
    ],
  },
  {
    id: "worries",
    prompt: "What worries you most about AI?",
    kind: "multi",
    options: [
      { id: "data", label: "Keeping data safe" },
      { id: "cost", label: "Cost" },
      { id: "wrong", label: "It getting things wrong" },
      { id: "start", label: "Not knowing where to start" },
    ],
  },
  {
    id: "plate",
    prompt: "If you could take one task off your plate tomorrow, what would it be?",
    kind: "text",
  },
];

const teamsQuestions: SurveyQuestion[] = [
  {
    id: "devs",
    prompt: "How many developers are on the team?",
    kind: "single",
    options: [
      { id: "1-5", label: "1–5" },
      { id: "6-15", label: "6–15" },
      { id: "16-50", label: "16–50" },
      { id: "50-plus", label: "50+" },
    ],
  },
  {
    id: "builds",
    prompt: "What do you mostly build?",
    kind: "multi",
    options: [
      { id: "web", label: "Web apps" },
      { id: "mobile", label: "Mobile apps" },
      { id: "backend", label: "Backend and APIs" },
      { id: "internal", label: "Internal tools" },
      { id: "other", label: "Something else", detail: { label: "What else you build" } },
    ],
  },
  {
    id: "cycle",
    prompt: "How long does a typical feature take, from ticket to production?",
    kind: "single",
    options: [
      { id: "days", label: "Days" },
      { id: "1-2-weeks", label: "1–2 weeks" },
      { id: "3-4-weeks", label: "3–4 weeks" },
      { id: "over-a-month", label: "Over a month" },
    ],
  },
  {
    id: "waits",
    prompt: "Where does work sit and wait?",
    kind: "multi",
    options: [
      { id: "review", label: "Code review" },
      { id: "qa", label: "QA and testing" },
      { id: "design", label: "Design handoff" },
      { id: "unclear", label: "Unclear tickets" },
      { id: "deploys", label: "Deploys" },
      { id: "other", label: "Somewhere else", detail: { label: "The other place work waits" } },
    ],
  },
  {
    id: "ai",
    prompt: "How does the team use AI today?",
    kind: "single",
    options: [
      { id: "not-at-all", label: "Not at all" },
      { id: "chat", label: "Chat tools on the side" },
      { id: "autocomplete", label: "Autocomplete in the editor" },
      { id: "writes-prs", label: "AI writes code and opens pull requests" },
    ],
  },
  {
    id: "docs",
    prompt: "How much of how you build is written down?",
    kind: "single",
    options: [
      { id: "none", label: "Almost nothing" },
      { id: "some", label: "Some docs" },
      { id: "clear", label: "Clear conventions and good tests" },
    ],
  },
  {
    id: "policy",
    prompt: "Is there a company policy on AI and code?",
    kind: "single",
    options: [
      { id: "no", label: "No" },
      { id: "in-progress", label: "In progress" },
      { id: "yes", label: "Yes" },
    ],
  },
  {
    id: "blocker",
    prompt: "What's the biggest thing slowing delivery right now?",
    kind: "text",
  },
];

const businessSuggestions: SuggestionDef[] = [
  {
    id: "time-retyping",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["retyping"],
    text: "Connect the systems you already use so info is entered once.",
  },
  {
    id: "time-chasing",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["chasing"],
    text: "Send reminders and collect documents in one place, so you're not chasing people.",
  },
  {
    id: "time-quotes",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["quotes"],
    text: "Start quotes and invoices from details you already have, so you're not writing them from scratch.",
  },
  {
    id: "time-reports",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["reports"],
    text: "Have the regular reports pull from the numbers you already keep.",
  },
  {
    id: "time-scheduling",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["scheduling"],
    text: "Let a tool handle the scheduling back-and-forth, so you're not stuck in phone tag.",
  },
  {
    id: "time-questions",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["questions"],
    text: "Save the answers you repeat every week, so the team can use them without asking you.",
  },
  {
    id: "time-other",
    areaId: "time",
    questionId: "tasks",
    optionIds: ["other"],
    text: "Start with the task that didn't fit the list.",
  },
  {
    id: "time-under-5",
    areaId: "time",
    questionId: "hours",
    optionIds: ["under-5"],
    text: "These tasks aren't swallowing the week. Try the one that annoys you most before you change everything.",
  },
  {
    id: "time-5-10",
    areaId: "time",
    questionId: "hours",
    optionIds: ["5-10"],
    text: "There's enough time in these tasks to be worth a first try. Start with the one that annoys you most.",
  },
  {
    id: "time-10-20",
    areaId: "time",
    questionId: "hours",
    optionIds: ["10-20"],
    text: "A big part of the week is going to these tasks. Start with the one that annoys you most.",
  },
  {
    id: "time-20-plus",
    areaId: "time",
    questionId: "hours",
    optionIds: ["20-plus"],
    text: "These tasks are swallowing the week. Start with the one that annoys you most.",
  },
  {
    id: "tools-connect",
    areaId: "tools",
    questionId: "tools",
    optionIds: [],
    text: "Connect the tools you already use so info is entered once.",
  },
  {
    id: "ai-not-yet",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["not-yet"],
    text: "Try one small task with an AI tool this week, on work that isn't sensitive.",
  },
  {
    id: "ai-a-few",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["a-few"],
    text: "Pick one shared way the whole team can use AI, so it isn't only a few people experimenting.",
  },
  {
    id: "ai-regularly",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["regularly"],
    text: "Point the AI use you already have at the task that eats the most time.",
  },
  {
    id: "worry-data",
    areaId: "confidence",
    questionId: "worries",
    optionIds: ["data"],
    text: "Start with a simple policy on what's safe to share with AI tools.",
  },
  {
    id: "worry-wrong",
    areaId: "confidence",
    questionId: "worries",
    optionIds: ["wrong"],
    text: "Keep a person checking the result before a customer sees it.",
  },
  {
    id: "worry-start",
    areaId: "confidence",
    questionId: "worries",
    optionIds: ["start"],
    text: "Pick one task that repeats every week, and start there.",
  },
  {
    id: "worry-cost",
    areaId: "confidence",
    questionId: "worries",
    optionIds: ["cost"],
    text: "Try one small task first, so you can see if it helps before you commit to more.",
  },
  {
    id: "kind-professional",
    areaId: "time",
    questionId: "kind",
    optionIds: ["professional"],
    filler: true,
    text: "Start with the repeat writing you do for clients, such as notes or follow-ups.",
  },
  {
    id: "kind-trades",
    areaId: "time",
    questionId: "kind",
    optionIds: ["trades"],
    filler: true,
    text: "Start with quotes or scheduling, the work that piles up between jobs.",
  },
  {
    id: "kind-retail",
    areaId: "time",
    questionId: "kind",
    optionIds: ["retail"],
    filler: true,
    text: "Start with the questions customers ask over and over.",
  },
  {
    id: "kind-healthcare",
    areaId: "confidence",
    questionId: "kind",
    optionIds: ["healthcare"],
    filler: true,
    text: "Start with scheduling or paperwork, and keep private details out of AI tools until you have a rule for what's safe.",
  },
  {
    id: "kind-other",
    areaId: "time",
    questionId: "kind",
    optionIds: ["other"],
    filler: true,
    text: "Start with the task you do the same way every week.",
  },
  {
    id: "size-solo",
    areaId: "time",
    questionId: "size",
    optionIds: ["solo"],
    filler: true,
    text: "Pick one task you do yourself every week, so the change shows up in your own day.",
  },
  {
    id: "size-small",
    areaId: "time",
    questionId: "size",
    optionIds: ["small"],
    filler: true,
    text: "Pick a task the whole team touches, so everyone can tell if it helps.",
  },
  {
    id: "size-mid",
    areaId: "time",
    questionId: "size",
    optionIds: ["mid"],
    filler: true,
    text: "Try it with one team and one task first.",
  },
  {
    id: "size-large",
    areaId: "time",
    questionId: "size",
    optionIds: ["large"],
    filler: true,
    text: "Try it with one team and one task first.",
  },
];

const teamsSuggestions: SuggestionDef[] = [
  {
    id: "cycle-month",
    areaId: "delivery",
    questionId: "cycle",
    optionIds: ["over-a-month"],
    text: "Pick one kind of ticket and shorten the path from start to shipped.",
  },
  {
    id: "cycle-3-4",
    areaId: "delivery",
    questionId: "cycle",
    optionIds: ["3-4-weeks"],
    text: "Cut one wait so a feature doesn't sit for weeks before it ships.",
  },
  {
    id: "cycle-1-2",
    areaId: "delivery",
    questionId: "cycle",
    optionIds: ["1-2-weeks"],
    text: "Look for the stretch where a feature sits still, and clear that wait first.",
  },
  {
    id: "cycle-days",
    areaId: "delivery",
    questionId: "cycle",
    optionIds: ["days"],
    text: "Keep the pace you have, and aim help at the step that still drags.",
  },
  {
    id: "flow-ship",
    areaId: "flow",
    questionId: "waits",
    optionIds: ["review", "qa"],
    text: "Shorten the wait between done and shipped.",
  },
  {
    id: "flow-unclear",
    areaId: "flow",
    questionId: "waits",
    optionIds: ["unclear"],
    text: "Write tickets so the next step is obvious before anyone starts.",
  },
  {
    id: "flow-design",
    areaId: "flow",
    questionId: "waits",
    optionIds: ["design"],
    text: "Put the design notes in the ticket so nobody is waiting on a separate design pass.",
  },
  {
    id: "flow-deploys",
    areaId: "flow",
    questionId: "waits",
    optionIds: ["deploys"],
    text: "Make shipping a small, regular step instead of a wait at the end.",
  },
  {
    id: "flow-other",
    areaId: "flow",
    questionId: "waits",
    optionIds: ["other"],
    text: "Clear the extra place work sits, the one that didn't fit the list.",
  },
  {
    id: "ai-none",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["not-at-all"],
    text: "Have the team try AI on one real ticket, with a developer reviewing the result.",
  },
  {
    id: "ai-chat",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["chat"],
    text: "Move AI from side chats into the ticket, so the help stays with the work.",
  },
  {
    id: "ai-autocomplete",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["autocomplete"],
    text: "Let AI carry a ticket past short suggestions in the editor, with a developer still reviewing.",
  },
  {
    id: "ai-prs",
    areaId: "ai",
    questionId: "ai",
    optionIds: ["writes-prs"],
    text: "Keep developers reviewing every change, and point AI at the tickets that wait the longest.",
  },
  {
    id: "docs-none",
    areaId: "foundations",
    questionId: "docs",
    optionIds: ["none"],
    text: "Write down how you build so AI follows your team's rules.",
  },
  {
    id: "docs-some",
    areaId: "foundations",
    questionId: "docs",
    optionIds: ["some"],
    text: "Write down the rules your team already knows by heart, so AI can follow them too.",
  },
  {
    id: "docs-clear",
    areaId: "foundations",
    questionId: "docs",
    optionIds: ["clear"],
    text: "Keep those written rules next to the work so they get followed on every ticket.",
  },
  {
    id: "policy-no",
    areaId: "foundations",
    questionId: "policy",
    optionIds: ["no"],
    text: "Agree on a short policy for how the team uses AI on code.",
  },
  {
    id: "policy-progress",
    areaId: "foundations",
    questionId: "policy",
    optionIds: ["in-progress"],
    text: "Finish the policy on AI and code so everyone knows what's okay.",
  },
  {
    id: "policy-yes",
    areaId: "foundations",
    questionId: "policy",
    optionIds: ["yes"],
    text: "Keep the policy next to the work so new tools stay inside it.",
  },
  {
    id: "devs-1-5",
    areaId: "delivery",
    questionId: "devs",
    optionIds: ["1-5"],
    filler: true,
    text: "Start with one part of the codebase and one kind of ticket.",
  },
  {
    id: "devs-6-15",
    areaId: "delivery",
    questionId: "devs",
    optionIds: ["6-15"],
    filler: true,
    text: "Start with one part of the codebase and one kind of ticket.",
  },
  {
    id: "devs-16-50",
    areaId: "delivery",
    questionId: "devs",
    optionIds: ["16-50"],
    filler: true,
    text: "Start with one group and one kind of ticket before you take it wider.",
  },
  {
    id: "devs-50",
    areaId: "delivery",
    questionId: "devs",
    optionIds: ["50-plus"],
    filler: true,
    text: "Start with one group and one kind of ticket before you take it wider.",
  },
  {
    id: "builds-web",
    areaId: "delivery",
    questionId: "builds",
    optionIds: ["web"],
    filler: true,
    text: "Try the first change on a web app the team already knows well.",
  },
  {
    id: "builds-mobile",
    areaId: "delivery",
    questionId: "builds",
    optionIds: ["mobile"],
    filler: true,
    text: "Try the first change on an app the team already ships.",
  },
  {
    id: "builds-backend",
    areaId: "delivery",
    questionId: "builds",
    optionIds: ["backend"],
    filler: true,
    text: "Try the first change on a backend the team already knows well.",
  },
  {
    id: "builds-internal",
    areaId: "delivery",
    questionId: "builds",
    optionIds: ["internal"],
    filler: true,
    text: "Try the first change on an internal tool, where a miss is easier to catch.",
  },
  {
    id: "builds-other",
    areaId: "delivery",
    questionId: "builds",
    optionIds: ["other"],
    filler: true,
    text: "Try the first change on the kind of work that didn't fit the list.",
  },
];

const fallbackSuggestions = {
  business: [
    {
      id: "fallback-task",
      areaId: "time",
      text: "Pick one task you repeat every week, and try a helper on that.",
    },
    {
      id: "fallback-safe",
      areaId: "confidence",
      text: "Start with work that isn't sensitive, and keep a person checking it.",
    },
  ],
  teams: [
    {
      id: "fallback-ticket",
      areaId: "flow",
      text: "Pick one kind of ticket and shorten the path from start to shipped.",
    },
    {
      id: "fallback-rules",
      areaId: "foundations",
      text: "Write down how you build so AI follows your team's rules.",
    },
  ],
} as const;

const echoCopy = {
  business: {
    questionId: "plate",
    lead: "You said you'd take this off your plate first:",
  },
  teams: {
    questionId: "blocker",
    lead: "You said this is slowing delivery the most:",
  },
} as const;

export function parseSurveyPath(value: string | null): SurveyPath | null {
  if (value === "business" || value === "teams") return value;
  return null;
}

export function questionsFor(path: SurveyPath): SurveyQuestion[] {
  return path === "business" ? businessQuestions : teamsQuestions;
}

export function resultFor(path: SurveyPath, answers: SurveyAnswers): SurveyResult {
  const areas = scoreAreas(path, answers);
  return {
    level: levelFor(path, areas),
    areas,
    suggestions: pickSuggestions(path, answers, areas),
    echo: echoFor(path, answers),
  };
}

/**
 * Checks that every path has 8 questions and every option has a suggestion.
 * Used by the local check script. Not called from the page.
 */
export function auditSurvey(): string[] {
  const problems: string[] = [];
  const paths: SurveyPath[] = ["business", "teams"];
  for (const path of paths) {
    const questions = questionsFor(path);
    if (questions.length !== 8) problems.push(`${path} has ${questions.length} questions`);
    const suggestions = suggestionsFor(path);
    const areaIds = new Set((path === "business" ? businessAreas : teamsAreas).map((area) => area.id));
    for (const suggestion of suggestions) {
      if (!areaIds.has(suggestion.areaId)) problems.push(`${suggestion.id} points at an unknown area`);
      const question = questions.find((item) => item.id === suggestion.questionId);
      if (!question) {
        problems.push(`${suggestion.id} points at an unknown question`);
        continue;
      }
      if (suggestion.optionIds.length === 0) {
        if (question.kind !== "tools") problems.push(`${suggestion.id} matches nothing`);
        continue;
      }
      if (!question.options) {
        problems.push(`${suggestion.id} points at a question without choices`);
        continue;
      }
      for (const optionId of suggestion.optionIds) {
        if (!question.options.some((option) => option.id === optionId)) {
          problems.push(`${suggestion.id} points at unknown option ${optionId}`);
        }
      }
    }
    for (const question of questions) {
      if (!question.options) continue;
      for (const option of question.options) {
        const covered = suggestions.some(
          (suggestion) => suggestion.questionId === question.id && suggestion.optionIds.includes(option.id),
        );
        if (!covered) problems.push(`${path} ${question.id} ${option.id} has no suggestion`);
      }
    }
  }
  const seen = new Set<string>();
  for (const tool of knownTools) {
    const key = tool.name.toLowerCase();
    if (seen.has(key)) problems.push(`duplicate tool ${tool.name}`);
    seen.add(key);
  }
  if (popularTools.length !== 6) problems.push(`expected 6 popular tools, found ${popularTools.length}`);
  for (const name of popularTools) {
    if (!knownTools.some((tool) => tool.name === name)) problems.push(`popular tool ${name} is not in the known list`);
  }
  const toolsQuestion = businessQuestions.find((question) => question.id === "tools");
  if (toolsQuestion?.kind !== "tools") problems.push("tools question should be the searchable picker");
  if (toolsQuestion?.options) problems.push("tools question should not use a checkbox list");
  return problems;
}

function suggestionsFor(path: SurveyPath): SuggestionDef[] {
  return path === "business" ? businessSuggestions : teamsSuggestions;
}

function scoreAreas(path: SurveyPath, answers: SurveyAnswers): ScoredArea[] {
  const areas = path === "business" ? businessAreas : teamsAreas;
  return areas.map((area) => {
    const score = path === "business" ? businessAreaScore(area.id, answers) : teamsAreaScore(area.id, answers);
    return { ...area, score, labelWord: area.labels[score] };
  });
}

/**
 * Time to win back. More hours and more tasks mean a bigger opportunity.
 * A missing answer stays at Some, so a blank doesn't inflate the bar.
 * "Something else" counts as one task.
 *
 * | Hours   | 1 task        | 2–3 tasks     | 4+ tasks      |
 * | Under 5 | Some          | Some          | A good amount |
 * | 5–10    | A good amount | A good amount | A lot         |
 * | 10–20   | A good amount | A lot         | A lot         |
 * | 20+     | A lot         | A lot         | A lot         |
 */
function timeScore(hours: string | null, taskCount: number): AreaScore {
  const many = taskCount >= 4;
  const several = taskCount >= 2;
  if (hours === "20-plus") return 3;
  if (hours === "10-20") return several ? 3 : 2;
  if (hours === "5-10") return many ? 3 : 2;
  if (hours === "under-5") return many ? 2 : 1;
  return 1;
}

/**
 * Mostly spreadsheets and Mostly paper are the loose spot. Anything else,
 * including a custom tool, is a named system. Loose tools alone are Room to
 * grow. A mix is Getting there. Named systems alone are Strong.
 */
function toolsScore(selected: string[]): AreaScore {
  if (selected.length === 0) return 1;
  const hasLoose = selected.some((name) => findKnownTool(name)?.category === "basic");
  const hasNamed = selected.some((name) => findKnownTool(name)?.category !== "basic");
  if (hasNamed && !hasLoose) return 3;
  if (hasNamed && hasLoose) return 2;
  return 1;
}

/** Custom names first, then industry tools, then other named systems, then paper or spreadsheets. */
function namesForToolsSuggestion(selected: string[]): string[] {
  return selected
    .map((name, index) => ({ name, index, rank: toolSuggestionRank(name) }))
    .sort((a, b) => a.rank - b.rank || a.index - b.index)
    .slice(0, 2)
    .map((item) => item.name);
}

function toolSuggestionRank(name: string): number {
  const category = findKnownTool(name)?.category;
  if (!category) return 0;
  if (category === "industry") return 1;
  if (category === "basic") return 3;
  return 2;
}

/** 1 worry → Strong, 2 → Getting there, 3 or more → Room to grow. */
function confidenceScore(count: number): AreaScore {
  if (count <= 0) return 1;
  if (count === 1) return 3;
  if (count === 2) return 2;
  return 1;
}

function businessAreaScore(id: string, answers: SurveyAnswers): AreaScore {
  if (id === "time") return timeScore(selectedSingle(answers, "hours"), selectedMulti(answers, "tasks").length);
  if (id === "tools") return toolsScore(selectedMulti(answers, "tools"));
  if (id === "ai") {
    return mapScore(selectedSingle(answers, "ai"), { "not-yet": 1, "a-few": 2, regularly: 3 });
  }
  if (id === "confidence") return confidenceScore(selectedMulti(answers, "worries").length);
  return 1;
}

/**
 * Delivery: Days → Strong, 1–2 weeks and 3–4 weeks → Getting there,
 * Over a month → Room to grow.
 *
 * Flow: 1 place → Strong, 2–3 → Getting there, 4 or more → Room to grow.
 * "Somewhere else" counts as one place.
 *
 * AI: Not at all → Room to grow, chat or autocomplete → Getting there,
 * AI writes code and opens pull requests → Strong.
 *
 * Foundations adds two scores. Docs: Almost nothing 0, Some docs 1,
 * Clear conventions and good tests 2. Policy: No 0, In progress 1, Yes 2.
 * Sum 0–1 → Room to grow, 2 → Getting there, 3–4 → Strong.
 */
function teamsAreaScore(id: string, answers: SurveyAnswers): AreaScore {
  if (id === "delivery") {
    return mapScore(selectedSingle(answers, "cycle"), {
      days: 3,
      "1-2-weeks": 2,
      "3-4-weeks": 2,
      "over-a-month": 1,
    });
  }
  if (id === "flow") return flowScore(selectedMulti(answers, "waits").length);
  if (id === "ai") {
    return mapScore(selectedSingle(answers, "ai"), {
      "not-at-all": 1,
      chat: 2,
      autocomplete: 2,
      "writes-prs": 3,
    });
  }
  if (id === "foundations") return foundationsScore(selectedSingle(answers, "docs"), selectedSingle(answers, "policy"));
  return 1;
}

function flowScore(count: number): AreaScore {
  if (count <= 0) return 1;
  if (count === 1) return 3;
  if (count <= 3) return 2;
  return 1;
}

function foundationsScore(docs: string | null, policy: string | null): AreaScore {
  const docsPoints = docs === "clear" ? 2 : docs === "some" ? 1 : 0;
  const policyPoints = policy === "yes" ? 2 : policy === "in-progress" ? 1 : 0;
  const sum = docsPoints + policyPoints;
  if (sum >= 3) return 3;
  if (sum === 2) return 2;
  return 1;
}

function mapScore(value: string | null, table: Record<string, AreaScore>): AreaScore {
  if (!value) return 1;
  return table[value] ?? 1;
}

function levelFor(path: SurveyPath, areas: ScoredArea[]): ReadinessLevel {
  const counted = path === "business" ? areas.filter((area) => area.id !== "time") : areas;
  const sum = counted.reduce((total, area) => total + area.score, 0);
  const id =
    path === "business"
      ? sum <= 4
        ? "start"
        : sum <= 7
          ? "first"
          : "fast"
      : sum <= 6
        ? "start"
        : sum <= 9
          ? "first"
          : "fast";
  const level = levelCopy[id];
  return { id, label: level.label, body: level.body[path] };
}

function urgency(area: ScoredArea): number {
  return area.kind === "opportunity" ? area.score : 4 - area.score;
}

function needsANextStep(area: ScoredArea): boolean {
  return area.kind === "opportunity" ? area.score >= 2 : area.score <= 2;
}

function suggestionText(item: SuggestionDef, answers: SurveyAnswers): string {
  if (item.id !== "tools-connect") return item.text;
  const names = namesForToolsSuggestion(selectedMulti(answers, "tools"));
  if (names.length >= 2) return `Connect ${names[0]} and ${names[1]} so info is entered once.`;
  if (names.length === 1) return `Connect ${names[0]} so info is entered once.`;
  return item.text;
}

function pickSuggestions(path: SurveyPath, answers: SurveyAnswers, areas: ScoredArea[]): ChosenSuggestion[] {
  const catalog = suggestionsFor(path);
  const primary = catalog.filter((item) => !item.filler);
  const fillers = catalog.filter((item) => item.filler);
  const chosen: ChosenSuggestion[] = [];
  const used = new Set<string>();

  const take = (areaList: ScoredArea[], source: SuggestionDef[], perArea: number) => {
    for (const area of areaList) {
      let count = 0;
      for (const item of source) {
        if (item.areaId !== area.id || used.has(item.id)) continue;
        const matched =
          item.id === "tools-connect"
            ? selectedMulti(answers, "tools").length > 0
            : answerMatches(answers, item.questionId, item.optionIds);
        if (!matched) continue;
        chosen.push({ id: item.id, areaId: area.id, areaLabel: area.label, text: suggestionText(item, answers) });
        used.add(item.id);
        count += 1;
        if (count >= perArea || chosen.length >= 3) break;
      }
      if (chosen.length >= 3) return;
    }
  };

  const byUrgency = [...areas].sort((a, b) => urgency(b) - urgency(a) || a.tieBreak - b.tieBreak);
  const actionable = byUrgency.filter(needsANextStep);

  take(actionable, primary, 1);
  if (chosen.length < 2) take(actionable, primary, 1);
  if (chosen.length < 2) take(byUrgency, primary, 1);
  if (chosen.length < 2) take(byUrgency, fillers, 1);
  if (chosen.length < 2) {
    for (const item of fallbackSuggestions[path]) {
      if (chosen.length >= 2) break;
      if (used.has(item.id)) continue;
      const area = areas.find((candidate) => candidate.id === item.areaId) ?? areas[0];
      if (!area) continue;
      chosen.push({ id: item.id, areaId: area.id, areaLabel: area.label, text: item.text });
      used.add(item.id);
    }
  }

  const order = new Map(areas.map((area, index) => [area.id, index]));
  chosen.sort((a, b) => (order.get(a.areaId) ?? 0) - (order.get(b.areaId) ?? 0));
  return chosen;
}

function echoFor(path: SurveyPath, answers: SurveyAnswers): SurveyEcho | null {
  const spec = echoCopy[path];
  const value = answers[spec.questionId];
  if (typeof value !== "string") return null;
  const text = value.trim();
  if (!text) return null;
  return { lead: spec.lead, text };
}

function answerMatches(answers: SurveyAnswers, questionId: string, optionIds: readonly string[]): boolean {
  const value = answers[questionId];
  if (typeof value === "string") return optionIds.includes(value);
  if (Array.isArray(value)) return optionIds.some((id) => value.includes(id));
  return false;
}

function selectedSingle(answers: SurveyAnswers, questionId: string): string | null {
  const value = answers[questionId];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function selectedMulti(answers: SurveyAnswers, questionId: string): string[] {
  const value = answers[questionId];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.length > 0);
}
