import { fill } from "@/lib/fill";
import { work } from "@/content/work";

export function Work({ audience }: { audience: "teams" | "business" }) {
  const projects = work.projects.filter((project) => audience === "teams" || project.business);
  return (
    <section id="work" className="scroll-mt-6 bg-bone py-16 desk:py-[104px]" aria-labelledby="work-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <p className="eyebrow text-accent-action">{work.eyebrow}</p>
        <h2 id="work-title" className="mt-4 max-w-[14ch] text-[36px] desk:text-[52px]">
          {work.title}
        </h2>
        <p className="mt-4 max-w-[640px] text-[16.5px] text-muted">{fill(work.note)}</p>
        {audience === "business" ? (
          <p className="mt-3 max-w-[640px] text-[16.5px] text-ink">{work.businessLede}</p>
        ) : null}
        <ul className="mt-10 grid list-none gap-4 desk:grid-cols-2 min-[1100px]:grid-cols-3">
          {projects.map((project) => (
            <li key={project.title} className="flex h-full flex-col rounded-[18px] border border-line bg-white p-6 desk:p-7">
              <ul className="flex list-none flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-action"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <h3 className="mt-4 text-[22px] tracking-[-0.02em]">{project.title}</h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{project.description}</p>
              <p className="work-highlight mt-5 text-[15px] font-semibold">{project.highlight}</p>
            </li>
          ))}
        </ul>
        {audience === "teams" ? (
          <p className="mt-8 font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">{work.stack}</p>
        ) : null}
      </div>
    </section>
  );
}
