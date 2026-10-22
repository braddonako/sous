"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCall from "./BookCall";
import Wordmark from "./Wordmark";
import { home } from "@/content/home";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-bar">
        <Link href="/" className="wordmark-link">
          <Wordmark />
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {home.nav.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
          <BookCall />
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={`nav-toggle-bars ${open ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav id="mobile-nav" className="nav-mobile" aria-label="Primary" hidden={!open}>
        {home.nav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <BookCall />
      </nav>
    </header>
  );
}
