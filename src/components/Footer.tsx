import Link from "next/link";
import { isHttpUrl, isRealEmail, site } from "@/config/site";
import { home } from "@/content/home";
import { fill } from "@/lib/fill";
import { ArrowUpRightIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const email = site.email.trim();
  const linkedin = site.linkedin.trim();
  const showEmail = isRealEmail(email);
  const showLinkedin = isHttpUrl(linkedin);

  return (
    <footer className="bg-footer py-[30px] text-sm text-muted-dark">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-4 px-5 desk:flex-row desk:items-center desk:px-10">
        <Wordmark tone="ink" size="footer" />
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/teams" className="underline underline-offset-[3px]">
            {home.footer.teams}
          </Link>
          <Link href="/business" className="underline underline-offset-[3px]">
            {home.footer.business}
          </Link>
        </nav>
        <p>{fill(home.footer.rights)}</p>
        {showEmail || showLinkedin ? (
          <p className="flex gap-4">
            {showEmail ? (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-1.5 underline underline-offset-[3px]">
                <MailIcon size={16} />
                {email}
              </a>
            ) : null}
            {showLinkedin ? (
              <a
                href={linkedin}
                className="inline-flex items-center gap-1.5 underline underline-offset-[3px]"
                rel="noopener noreferrer"
              >
                <LinkedinIcon size={16} />
                LinkedIn
                <ArrowUpRightIcon size={14} />
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
