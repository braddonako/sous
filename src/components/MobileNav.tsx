"use client";

import Link from "next/link";
import { navItems, type Audience } from "@/lib/nav";

export function MobileNav({ current }: { current: Audience }) {
  const items = navItems(current);
  return (
    <details className="relative desk:hidden">
      <summary className="flex h-11 cursor-pointer items-center rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-current">
        Menu
      </summary>
      <div className="mobile-panel absolute right-0 z-20 mt-2 flex w-56 flex-col rounded-2xl p-2 shadow-xl">
        {items.map((item) => {
          const active = item.id === current;
          const className = active
            ? "nav-link nav-link-active rounded-xl px-3 py-3 text-[15px]"
            : "nav-link rounded-xl px-3 py-3 text-[15px]";
          const close = (event: React.MouseEvent<HTMLAnchorElement>) => {
            const details = event.currentTarget.closest("details");
            if (details) details.open = false;
          };
          if (item.href.startsWith("#")) {
            return (
              <a
                key={item.id}
                href={item.href}
                className={className}
                aria-current={active ? "page" : undefined}
                onClick={close}
              >
                {item.label}
              </a>
            );
          }
          return (
            <Link
              key={item.id}
              href={item.href}
              className={className}
              aria-current={active ? "page" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
