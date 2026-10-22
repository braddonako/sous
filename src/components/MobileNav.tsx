"use client";

import Link from "next/link";
import { navItems, type Audience } from "@/lib/nav";
import { CloseIcon, MenuIcon } from "@/components/icons";

export function MobileNav({ current }: { current: Audience }) {
  const items = navItems(current);
  return (
    <details className="nav-disclosure relative desk:hidden">
      <summary className="flex h-11 cursor-pointer items-center gap-1.5 rounded-full px-2 font-mono text-[11px] uppercase tracking-[0.08em] text-current">
        <MenuIcon size={20} className="nav-menu-icon" />
        <CloseIcon size={20} className="nav-close-icon" />
        <span className="nav-menu-label">Menu</span>
        <span className="nav-close-label">Close</span>
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
