import { isHttpUrl, isRealEmail, site } from "@/config/site";
import { home } from "@/content/home";
import { fill } from "@/lib/fill";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  const email = site.email.trim();
  const linkedin = site.linkedin.trim();
  const showEmail = isRealEmail(email);
  const showLinkedin = isHttpUrl(linkedin);

  return (
    <footer className="bg-footer py-[30px] text-sm text-muted-dark">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-3 px-5 desk:flex-row desk:items-center desk:px-10">
        <span className="text-white">
          <Wordmark compact />
        </span>
        <p>{fill(home.footer.rights)}</p>
        {showEmail || showLinkedin ? (
          <p className="flex gap-4">
            {showEmail ? (
              <a href={`mailto:${email}`} className="underline underline-offset-[3px]">
                {email}
              </a>
            ) : null}
            {showLinkedin ? (
              <a href={linkedin} className="underline underline-offset-[3px]" rel="noopener noreferrer">
                LinkedIn
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
