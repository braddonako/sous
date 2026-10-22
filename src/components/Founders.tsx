import { site } from "@/config/site";
import { home } from "@/content/home";
import { fill } from "@/lib/fill";

export function Founders() {
  const { about } = home;
  return (
    <section id="about" className="scroll-mt-6 bg-bone py-16 desk:py-[104px]" aria-labelledby="about-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <div className="mb-8 grid items-end gap-4 desk:mb-14 desk:grid-cols-2 desk:gap-14">
          <div>
            <p className="eyebrow text-accent-action">{about.eyebrow}</p>
            <h2 id="about-title" className="mt-4 text-[36px] desk:text-[52px]">
              {fill(about.title)}
            </h2>
          </div>
          <p className="text-[16.5px] text-muted desk:text-lg">{fill(about.lede)}</p>
        </div>
        <ul className="grid list-none gap-5 desk:grid-cols-2">
          {about.founders.map((founder) => {
            const photo = site.photos[founder.id];
            const bio = site.bioLines[founder.id];
            return (
              <li
                key={founder.id}
                className="grid gap-[18px] rounded-[20px] border border-line bg-white p-6 desk:grid-cols-[180px_1fr] desk:gap-7"
              >
                {photo ? (
                  // Relative paths stay valid under the GitHub Pages base path.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt={founder.name} className="photo-ph object-cover" />
                ) : (
                  <div className="photo-ph" role="img" aria-label={`${founder.name}, photo to be added`}>
                    <span className="font-mono text-[12.5px] uppercase tracking-[0.08em]">{about.photoLabel}</span>
                  </div>
                )}
                <div>
                  <h3 className="mt-1.5 text-[28px]">{founder.name}</h3>
                  <p className="my-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-accent-action">
                    {founder.role}
                  </p>
                  <p className="text-[15.5px] text-muted">{founder.body}</p>
                  {bio ? (
                    <p className="mt-3.5 text-[15.5px] text-ink">{bio}</p>
                  ) : site.founderBios === "TBC" ? (
                    <span className="ph mt-3.5 text-muted">{about.bioBadge}</span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
