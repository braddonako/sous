import { home } from "@/content/home";
import { BookCall } from "@/components/BookCall";
import { MobileNav } from "@/components/MobileNav";
import { Wordmark } from "@/components/Wordmark";

export function Navbar() {
  return (
    <header className="border-b border-[var(--nav-border)] bg-hero text-hero-fg">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-5 desk:h-[76px] desk:px-10">
        <Wordmark />
        <div className="flex items-center gap-3 desk:gap-[34px]">
          <nav aria-label="Primary" className="hidden items-center gap-[34px] text-[15px] desk:flex">
            {home.nav.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>
          <MobileNav />
          <BookCall size="nav" />
        </div>
      </div>
    </header>
  );
}
