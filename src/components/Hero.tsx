import { pickTheme, site } from "@/config/site";
import { home } from "@/content/home";
import { fill } from "@/lib/fill";
import { BookCall } from "@/components/BookCall";

export function Hero() {
  const { hero, paths } = home;
  const tagline = site.tagline;
  const emphasis = site.taglineEmphasis;
  const splitAt = tagline.indexOf(emphasis);
  const before = splitAt >= 0 ? tagline.slice(0, splitAt) : tagline;
  const accent = splitAt >= 0 ? emphasis : "";
  const after = splitAt >= 0 ? tagline.slice(splitAt + emphasis.length) : "";

  return (
    <header className="relative bg-hero text-hero-fg">
      <div className="hero-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-[1] mx-auto w-full max-w-[1200px] px-5 py-9 desk:px-10 desk:pt-10 desk:pb-12">
        <div className="grid items-center gap-8 desk:grid-cols-[1.22fr_0.78fr] desk:gap-12">
          <div>
            <p className="eyebrow hero-kicker">{fill(pickTheme(hero.eyebrow))}</p>
            <h1 className="hero-title mt-4 mb-[18px] text-[40px] desk:text-[58px]">
              {before}
              {accent ? <em className="hero-em">{accent}</em> : null}
              {after}
            </h1>
            <p className="hero-lede max-w-[560px] text-[17px] desk:text-[19px]">
              {hero.lede}
              <strong className="font-semibold text-white">{hero.ledeStrong}</strong>
            </p>
            <div className="mt-[26px] flex flex-col items-start gap-4 desk:flex-row desk:items-center desk:gap-[26px]">
              <BookCall />
              <p className="hero-note text-[15px]">{hero.note}</p>
            </div>
          </div>

          <figure className="flowcard" aria-label="Illustrative example, not a real client ticket">
            <div className="flow-kicker mb-4 flex items-center justify-between font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted-dark">
              <span>{pickTheme(hero.flow.title)}</span>
              <span>{hero.flow.example}</span>
            </div>
            <div className="flow-ticket mb-3.5 rounded-xl bg-ink-3 px-[18px] py-4">
              <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-accent">{hero.flow.id}</p>
              <p className="flow-ticket-title mt-1.5 font-display text-[17px] font-medium tracking-[-0.01em] text-white">
                {hero.flow.ticket}
              </p>
            </div>
            <ol className="flex flex-col gap-2">
              {hero.flow.steps.map((step) => (
                <li key={step.text} className={step.human ? "flow-step flow-step-human" : "flow-step"}>
                  <span className={step.human ? "flow-dot flow-dot-human" : "flow-dot"} aria-hidden="true">
                    {step.n}
                  </span>
                  <span>{step.text}</span>
                  <span
                    className={`flow-who ml-auto font-mono text-[11px] uppercase tracking-[0.06em] text-muted-dark ${step.human ? "flow-who-human" : ""}`}
                  >
                    {step.who}
                  </span>
                </li>
              ))}
            </ol>
            <figcaption className="flow-foot mt-3.5 flex justify-between font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted-dark">
              <span>{hero.flow.caption}</span>
              <span>{pickTheme(hero.flow.status)}</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-8 grid gap-3.5 desk:mt-10 desk:grid-cols-2 desk:gap-5">
          <PathCard path={paths.dev} />
          <PathCard path={paths.business} business />
        </div>
      </div>
    </header>
  );
}

function PathCard({
  path,
  business = false,
}: {
  path: (typeof home.paths)[keyof typeof home.paths];
  business?: boolean;
}) {
  const titleId = business ? "path-business-title" : "path-dev-title";
  const bodyId = business ? "path-business-body" : "path-dev-body";
  return (
    <a
      href={path.href}
      className={business ? "path-card path-card-biz" : "path-card"}
      aria-labelledby={titleId}
      aria-describedby={bodyId}
    >
      <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">{path.kicker}</p>
      <h2 id={titleId} className="mt-1.5 mb-2 flex items-center justify-between gap-4 text-[26px] desk:text-[30px]">
        {path.title}
        <span className={business ? "path-go path-go-biz" : "path-go"} aria-hidden="true">
          →
        </span>
      </h2>
      <p id={bodyId} className="max-w-[520px] text-base text-muted">
        {path.body}
      </p>
      <ul className="mt-3.5 flex list-none flex-wrap gap-2">
        {path.chips.map((chip) => (
          <li key={chip} className="path-chip">
            {chip}
          </li>
        ))}
      </ul>
    </a>
  );
}
