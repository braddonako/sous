/**
 * Icon set. 24px grid, 1.75 stroke, round caps and joins.
 * Strokes use currentColor. One optional accent (a fill or dot) uses
 * `--icon-accent`, which defaults to the orange token. Pass `mono` on orange
 * buttons so that accent becomes currentColor (ink).
 * Decorative by default (aria-hidden). Pass `title` to label a standalone icon.
 */
import type { ReactNode, SVGProps } from "react";

const ACCENT = "var(--icon-accent, var(--orange, #F26B1D))";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number; title?: string; mono?: boolean };

function Base({
  size = 24,
  title,
  mono,
  style,
  className,
  children,
  ...rest
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `icon ${className}` : "icon"}
      style={mono ? { ...style, ["--icon-accent" as string]: "currentColor" } : style}
      {...rest}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Book-a-call buttons, path cards, handoff strip (replaces the "→" text glyph) */
export const ArrowRightIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></Base>
);

/** External links: booking page and LinkedIn once those links are real */
export const ArrowUpRightIcon = (props: IconProps) => (
  <Base {...props}><path d="M7 17L17 7" /><path d="M8.5 7H17v8.5" /></Base>
);

/** Mobile "Menu" toggle */
export const MenuIcon = (props: IconProps) => (
  <Base {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h11" /><circle className="accent" cx="19.25" cy="17" r="1.75" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Close the mobile menu */
export const CloseIcon = (props: IconProps) => (
  <Base {...props}><path d="M6.5 6.5l11 11" /><path d="M17.5 6.5l-11 11" /></Base>
);

/** FAQ item closed (replaces the "+" text) */
export const PlusIcon = (props: IconProps) => (
  <Base {...props}><path d="M12 5v14" /><path d="M5 12h14" /></Base>
);

/** FAQ item open */
export const MinusIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 12h14" /></Base>
);

/** Bullet points, the "No prep needed" style meta and the "Devs stay in charge" line */
export const CheckIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 12.5l4.5 4.5L19 7.5" /></Base>
);

/** Final hero-flow step ("Reviews and signs off"), replacing the ✓ step marker */
export const SignOffIcon = (props: IconProps) => (
  <Base {...props}><circle cx="12" cy="12" r="9" /><path className="accent" d="M8 12.25l2.75 2.75 5.25-6" style={{ stroke: ACCENT }} /></Base>
);

/** Book a call, the free 20-minute meeting */
export const CalendarIcon = (props: IconProps) => (
  <Base {...props}><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M3.5 10h17" /><path d="M8 3v4" /><path d="M16 3v4" /><circle className="accent" cx="15.5" cy="15.25" r="2" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** "Or email" link in the final call to action and footer */
export const MailIcon = (props: IconProps) => (
  <Base {...props}><rect x="3" y="5.5" width="18" height="13" rx="3" /><path d="M4 8l8 5.5 8-5.5" /></Base>
);

/** Founders and footer, once the LinkedIn URLs exist (hidden until then) */
export const LinkedinIcon = (props: IconProps) => (
  <Base {...props}><rect x="3.5" y="3.5" width="17" height="17" rx="4" /><path d="M8 11v5.5" /><circle className="accent" cx="8" cy="7.75" r="1.25" style={{ fill: ACCENT }} stroke="none" /><path d="M12 16.5V11" /><path d="M12 13.5c0-1.5 1.1-2.6 2.5-2.6s2.5 1.1 2.5 2.6v3" /></Base>
);

/** "In person or video" meeting meta */
export const VideoIcon = (props: IconProps) => (
  <Base {...props}><rect x="3" y="6.5" width="12.5" height="11" rx="2.75" /><path d="M15.5 10.25L21 7.5v9l-5.5-2.75" /></Base>
);

/** "Denver Metro, in person or remote" */
export const MapPinIcon = (props: IconProps) => (
  <Base {...props}><path d="M12 21s-6.5-5.4-6.5-10.75a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21z" /><circle className="accent" cx="12" cy="10.25" r="2.25" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** "20 min" meta and the "Time" measures */
export const ClockIcon = (props: IconProps) => (
  <Base {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.25 2" /><circle className="accent" cx="12" cy="12" r="1.35" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Hero flow "Agent" marker: a node in motion, doing the legwork; deliberately no accent */
export const AgentIcon = (props: IconProps) => (
  <Base {...props}><circle cx="14.5" cy="12" r="5.5" /><circle cx="14.5" cy="12" r="1.6" fill="currentColor" stroke="none" /><path d="M3 9h3.5" /><path d="M2.5 12h2.5" /><path d="M3 15h3.5" /></Base>
);

/** Hero flow "Your dev" marker; the human carries the orange dot, same as the logo */
export const DevIcon = (props: IconProps) => (
  <Base {...props}><circle className="accent" cx="12" cy="8" r="3.5" style={{ fill: ACCENT }} stroke="none" /><path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" /></Base>
);

/** Hero flow "Agent + your dev" step */
export const PairIcon = (props: IconProps) => (
  <Base {...props}><circle cx="8" cy="12" r="4" /><circle cx="8" cy="12" r="1.3" fill="currentColor" stroke="none" /><circle className="accent" cx="16.75" cy="8.25" r="2.75" style={{ fill: ACCENT }} stroke="none" /><path d="M11.75 19.5c0-2.9 2.1-5.25 4.75-5.25s4.75 2.35 4.75 5.25" /></Base>
);

/** Hero flow ticket header ("Ticket → PR", TKT-142) */
export const TicketIcon = (props: IconProps) => (
  <Base {...props}><path d="M4 6.5h16V10a2 2 0 0 0 0 4v3.5H4V14a2 2 0 0 0 0-4z" /><path d="M8.5 10.5h7" /><path d="M8.5 13.5h4" /><circle className="accent" cx="15.5" cy="13.5" r="1.5" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** "Opens a pull request" step, and dev-team engagement chips */
export const PullRequestIcon = (props: IconProps) => (
  <Base {...props}><circle cx="6" cy="6" r="2.25" /><circle cx="6" cy="18" r="2.25" /><path d="M6 8.25v7.5" /><path d="M18 15.75V10a3 3 0 0 0-3-3h-4.5" /><path d="M12.75 4.75L10.5 7l2.25 2.25" /><circle className="accent" cx="18" cy="18" r="2.4" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Path card "Ship software faster", For dev teams section */
export const TerminalIcon = (props: IconProps) => (
  <Base {...props}><rect x="3" y="4.5" width="18" height="15" rx="3" /><path d="M7.5 9.75l2.75 2.5-2.75 2.5" /><path className="accent" d="M12.75 14.75h4" style={{ stroke: ACCENT }} /></Base>
);

/** Path card "Take busywork off my plate", For small businesses section */
export const StorefrontIcon = (props: IconProps) => (
  <Base {...props}><path d="M4 9.5L5.5 4.5h13L20 9.5" /><path d="M4 9.5a2.67 2.67 0 0 0 5.33 0a2.67 2.67 0 0 0 5.34 0a2.67 2.67 0 0 0 5.33 0" /><path d="M5.5 12.5v7.5h13v-7.5" /><circle className="accent" cx="12" cy="16.25" r="1.75" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Helps card "Make sense of AI" (replaces "?") */
export const ClarifyIcon = (props: IconProps) => (
  <Base {...props}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.25 15.25L20 20" /><circle className="accent" cx="10.5" cy="10.5" r="2.25" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Helps card "Automate the busywork" (replaces "⟳") */
export const AutomateIcon = (props: IconProps) => (
  <Base {...props}><path d="M5 12a7 7 0 0 1 12.1-4.8" /><path d="M17.5 3.75v3.75h-3.75" /><path d="M19 12a7 7 0 0 1-12.1 4.8" /><path d="M6.5 20.25V16.5h3.75" /><circle className="accent" cx="12" cy="12" r="2" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** Helps card "Build the tool you're missing" (replaces "▢"): the missing piece, set in place */
export const CustomToolIcon = (props: IconProps) => (
  <Base {...props}><rect x="4" y="4" width="6.75" height="6.75" rx="1.75" /><rect x="13.25" y="4" width="6.75" height="6.75" rx="1.75" /><rect x="4" y="13.25" width="6.75" height="6.75" rx="1.75" /><circle className="accent" cx="16.625" cy="16.625" r="3.1" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** "Count" measures (handoffs, features shipped) */
export const TallyIcon = (props: IconProps) => (
  <Base {...props}><path d="M7 6v12" /><path d="M12 6v12" /><path d="M17 6v12" /><path className="accent" d="M4.5 15.5l15-7" style={{ stroke: ACCENT }} /></Base>
);

/** "Quality" measure (bugs after release) */
export const GaugeIcon = (props: IconProps) => (
  <Base {...props}><path d="M4 16.5a8 8 0 0 1 16 0" /><path d="M12 16.5l3.75-4.25" /><path d="M4 19.5h16" /><circle className="accent" cx="12" cy="16.5" r="1.85" style={{ fill: ACCENT }} stroke="none" /></Base>
);

/** "waiting" step in the handoff strip (the bottleneck section) */
export const WaitingIcon = (props: IconProps) => (
  <Base {...props}><path d="M7 3.75h10" /><path d="M7 20.25h10" /><path d="M8.25 3.75v2.5c0 2.25 3.75 3.5 3.75 5.75S8.25 15.5 8.25 17.75v2.5" /><path d="M15.75 3.75v2.5c0 2.25-3.75 3.5-3.75 5.75s3.75 3.5 3.75 5.75v2.5" /><circle className="accent" cx="12" cy="17.6" r="1.5" style={{ fill: ACCENT }} stroke="none" /></Base>
);

export const icons = {
  "arrow-right": ArrowRightIcon,
  "arrow-up-right": ArrowUpRightIcon,
  "menu": MenuIcon,
  "close": CloseIcon,
  "plus": PlusIcon,
  "minus": MinusIcon,
  "check": CheckIcon,
  "sign-off": SignOffIcon,
  "calendar": CalendarIcon,
  "mail": MailIcon,
  "linkedin": LinkedinIcon,
  "video": VideoIcon,
  "map-pin": MapPinIcon,
  "clock": ClockIcon,
  "agent": AgentIcon,
  "dev": DevIcon,
  "pair": PairIcon,
  "ticket": TicketIcon,
  "pull-request": PullRequestIcon,
  "terminal": TerminalIcon,
  "storefront": StorefrontIcon,
  "clarify": ClarifyIcon,
  "automate": AutomateIcon,
  "custom-tool": CustomToolIcon,
  "tally": TallyIcon,
  "gauge": GaugeIcon,
  "waiting": WaitingIcon,
} as const;

export type IconName = keyof typeof icons;
