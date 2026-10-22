import Link from "next/link";
import { site } from "@/config/site";
import { navItems, type Audience } from "@/lib/nav";
import { BookCall } from "@/components/BookCall";
import { MobileNav } from "@/components/MobileNav";
import { Wordmark } from "@/components/Wordmark";

export function Navbar({ current }: { current: Audience }) {
  const items = navItems(current);
  return (
    <header className="border-b border-[var(--nav-border)] bg-hero text-hero-fg">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-5 desk:h-[76px] desk:px-10">
        <Wordmark tone={site.theme === "kitchen" ? "light" : "ink"} />
        <div className="flex items-center gap-3 desk:gap-[34px]">
          <nav aria-label="Primary" className="hidden items-center gap-[34px] text-[15px] desk:flex">
            {items.map((item) => {
              const active = item.id === current;
              const className = active ? "nav-link nav-link-active" : "nav-link";
              if (item.href.startsWith("#")) {
                return (
                  <a key={item.id} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </a>
                );
              }
              return (
                <Link key={item.id} href={item.href} className={className} aria-current={active ? "page" : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <MobileNav current={current} />
          <BookCall size="nav" />
        </div>
      </div>
    </header>
  );
}
