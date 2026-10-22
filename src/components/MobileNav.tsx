"use client";

import { home } from "@/content/home";

export function MobileNav() {
  return (
    <details className="relative desk:hidden">
      <summary className="flex h-11 cursor-pointer items-center rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-current">
        Menu
      </summary>
      <div className="mobile-panel absolute right-0 z-20 mt-2 flex w-56 flex-col rounded-2xl p-2 shadow-xl">
        {home.nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link rounded-xl px-3 py-3 text-[15px]"
            onClick={(event) => {
              const details = event.currentTarget.closest("details");
              if (details) details.open = false;
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </details>
  );
}
