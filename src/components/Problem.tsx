import { teams } from "@/content/teams";

export function Problem() {
  const { problem } = teams;
  return (
    <section id="problem" className="scroll-mt-6 bg-bone py-[60px] desk:py-[88px]" aria-labelledby="problem-title">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 desk:grid-cols-[0.85fr_1.15fr] desk:gap-16 desk:px-10">
        <div>
          <p className="eyebrow text-accent-action">{problem.eyebrow}</p>
          <h2 id="problem-title" className="mt-3.5 text-[32px] desk:text-[44px]">
            {problem.title}
          </h2>
          <p className="mt-[18px] text-[17.5px] text-muted">{problem.body}</p>
          <p className="mt-[22px] font-display text-[21px] font-semibold tracking-[-0.025em] text-ink">
            {problem.kick}
          </p>
        </div>
        <div>
          <p className="mb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted">{problem.today}</p>
          <ol className="flex list-none flex-wrap items-center gap-1.5 desk:gap-2" aria-label={problem.today}>
            {problem.chain.map((step, index) => (
              <li key={`${step.label}-${index}`} className="flex items-center gap-1.5 desk:gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="font-normal text-[var(--arrow)]">
                    →
                  </span>
                ) : null}
                <span
                  className={
                    step.wait
                      ? "rounded-[10px] bg-accent-soft px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.05em] text-[var(--wait)]"
                      : "rounded-[10px] border border-line bg-white px-2.5 py-[7px] text-[13.5px] font-medium desk:px-[13px] desk:py-[9px] desk:text-[14.5px]"
                  }
                >
                  {step.label}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-[26px] flex flex-wrap items-center gap-1.5 border-t border-dashed border-[#cfc8bb] pt-[22px] desk:gap-2">
            <p className="mb-1 w-full font-mono text-[12.5px] uppercase tracking-[0.08em] text-sage-deep desk:mb-0 desk:mr-1.5 desk:w-auto">
              {problem.afterLabel}
            </p>
            {problem.after.map((step, index) => (
              <span key={step} className="flex items-center gap-1.5 desk:gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-[var(--arrow)]">
                    →
                  </span>
                ) : null}
                <span
                  className={
                    index === 1
                      ? "rounded-[10px] bg-orange px-2.5 py-[7px] text-[13.5px] font-medium text-on-orange desk:px-[13px] desk:py-[9px] desk:text-[15px]"
                      : "rounded-[10px] bg-ink px-2.5 py-[7px] text-[13.5px] font-medium text-white desk:px-[13px] desk:py-[9px] desk:text-[15px]"
                  }
                >
                  {step}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
