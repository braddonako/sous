export type Audience = "home" | "teams" | "business";

export type NavItem = {
  label: string;
  href: string;
  id: "teams" | "business" | "about";
};

/** Header links. About stays on this page at home, and points back home elsewhere. */
export function navItems(current: Audience): NavItem[] {
  return [
    { label: "Software teams", href: "/teams", id: "teams" },
    { label: "Automation", href: "/business", id: "business" },
    { label: "About", href: current === "home" ? "#about" : "/#about", id: "about" },
  ];
}
