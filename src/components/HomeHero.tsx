import Link from "next/link";
import { pickTheme } from "@/config/site";
import { home } from "@/content/home";
import { fill } from "@/lib/fill";
import { BookCall } from "@/components/BookCall";
import { ArrowRightIcon, StorefrontIcon, TerminalIcon } from "@/components/icons";

export function HomeHero() {
  const { hero, paths } = home;
  return (
    <header className="relative bg-hero text-hero-fg">
      <div className="hero-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-5 py-12 desk:px-10 desk:pt-16 desk:pb-14">
        <p className="eyebrow hero-kicker">{fill(pickTheme(hero.eyebrow))}</p>
        <h1 className="hero-title mt-4 mb-[18px] max-w-[16ch] text-[40px] desk:text-[58px]">
          <em className="hero-em">{hero.titleLead}</em> {hero.titleRest}
        </h1>
        <p className="hero-lede max-w-[640px] text-[17px] desk:text-[19px]">{hero.lede}</p>
        <div className="mt-[26px] flex flex-col items-start gap-4 desk:flex-row desk:items-center desk:gap-[26px]">
          <BookCall />
          <p className="hero-note text-[15px]">{hero.note}</p>
        </div>

        <div className="mt-10 desk:mt-12">
          <p className="eyebrow hero-kicker">{paths.prompt}</p>
          <div className="mt-3.5 grid gap-3.5 desk:mt-4 desk:grid-cols-2 desk:gap-5">
            <PathCard path={paths.business} business />
            <PathCard path={paths.dev} />
          </div>
        </div>
      </div>
    </header>
  );
}

type HomePath = (typeof home.paths)["business"] | (typeof home.paths)["dev"];

function PathCard({
  path,
  business = false,
}: {
  path: HomePath;
  business?: boolean;
}) {
  const titleId = business ? "path-business-title" : "path-dev-title";
  const bodyId = business ? "path-business-body" : "path-dev-body";
  return (
    <Link
      href={path.href}
      className={business ? "path-card path-card-biz" : "path-card"}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
    >
      <p className="flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">
        {business ? (
          <StorefrontIcon size={26} className="text-sage-deep" />
        ) : (
          <TerminalIcon size={26} className="text-ink" />
        )}
        {path.kicker}
      </p>
      <h2 id={titleId} className="mt-1.5 mb-2 flex items-center justify-between gap-4 text-[26px] desk:text-[30px]">
        {path.title}
        <span className={business ? "path-go path-go-biz" : "path-go"} aria-hidden="true">
          <ArrowRightIcon size={20} />
        </span>
      </h2>
      <p id={bodyId} className="max-w-[520px] text-base text-muted">
        {path.body}
      </p>
    </Link>
  );
}
