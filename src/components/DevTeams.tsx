import { home } from "@/content/home";

export function DevTeams() {
  const { dev, how } = home;
  return (
    <section id="dev" className="scroll-mt-6 py-16 desk:py-[104px]" aria-labelledby="dev-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <div className="mb-8 grid items-end gap-4 desk:mb-14 desk:grid-cols-2 desk:gap-14">
          <div>
            <p className="eyebrow text-accent-action">{dev.eyebrow}</p>
            <h2 id="dev-title" className="mt-4 text-[36px] desk:text-[52px]">
              {dev.title}
            </h2>
          </div>
          <p className="text-[16.5px] text-muted desk:text-lg">{dev.lede}</p>
        </div>

        <ol className="grid list-none gap-3 desk:grid-cols-4 desk:gap-4">
          {dev.rungs.map((rung) => (
            <li
              key={rung.n}
              className={
                rung.core
                  ? "relative flex flex-col rounded-[14px] border border-ink bg-ink px-6 pt-[26px] pb-6 text-white desk:min-h-[300px]"
                  : "relative flex flex-col rounded-[14px] border border-line bg-white px-6 pt-[26px] pb-6 desk:min-h-[300px]"
              }
            >
              {rung.core && "badge" in rung ? (
                <span className="absolute top-[22px] right-[22px] rounded-md bg-accent-action px-[9px] py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-white">
                  {rung.badge}
                </span>
              ) : null}
              <span className={rung.core ? "font-mono text-[13px] text-muted-dark" : "font-mono text-[13px] text-muted"}>
                {rung.n}
              </span>
              <h3 className="mt-[18px] mb-2 text-2xl tracking-[-0.02em] desk:mt-[30px] desk:mb-3">{rung.title}</h3>
              <p className={rung.core ? "flex-1 text-[15px] text-muted-dark" : "flex-1 text-[15px] text-muted"}>
                {rung.body}
              </p>
              <p
                className={
                  rung.core
                    ? "mt-5 flex justify-between border-t border-line-dark pt-4 text-[13px] text-muted-dark"
                    : "mt-5 flex justify-between border-t border-line pt-4 text-[13px] text-muted"
                }
              >
                <span>{dev.scope}</span>
                <span>{rung.aside}</span>
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-[22px] flex items-start gap-2.5 text-[15.5px] text-muted before:mt-2 before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-sage before:content-['']">
          {dev.note}
        </p>

        <div id="how" className="mt-14 scroll-mt-6 rounded-3xl bg-ink px-5 py-[30px] text-white desk:mt-24 desk:rounded-[24px] desk:px-[52px] desk:pt-[52px] desk:pb-11">
          <div className="mb-7 flex flex-col items-start gap-[18px] desk:mb-10 desk:flex-row desk:items-end desk:justify-between desk:gap-10">
            <div>
              <p className="eyebrow text-accent-on-dark">{how.eyebrow}</p>
              <h3 className="mt-3 max-w-[620px] text-[28px] desk:text-[38px]">{how.title}</h3>
            </div>
            <ul className="flex list-none gap-5 text-sm text-muted-dark">
              {how.legend.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={
                      item.human
                        ? "block h-3 w-3 rounded-[3px] bg-accent-action"
                        : "block h-3 w-3 rounded-[3px] border border-[#4a5566] bg-[#2c3440]"
                    }
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <ol className="grid list-none gap-4 desk:grid-cols-6 desk:gap-0">
            {how.steps.map((step) => (
              <li key={step.n} className="flow-node desk:px-2.5">
                <span className="absolute top-[-12px] left-[22px] hidden bg-ink px-1.5 font-mono text-[11px] text-muted-dark desk:inline">
                  {step.n}
                </span>
                <div
                  className={
                    step.tone === "human"
                      ? "h-full rounded-[14px] border border-[rgba(228,87,46,0.55)] bg-[rgba(228,87,46,0.1)] px-4 py-[18px]"
                      : "h-full rounded-[14px] border border-line-dark bg-ink-2 px-4 py-[18px] desk:min-h-[150px]"
                  }
                >
                  <p
                    className={
                      step.tone === "human"
                        ? "font-mono text-[11px] uppercase tracking-[0.06em] text-[#f4a68c]"
                        : step.tone === "input"
                          ? "font-mono text-[11px] uppercase tracking-[0.06em] text-signal"
                          : "font-mono text-[11px] uppercase tracking-[0.06em] text-[#9fb4d0]"
                    }
                  >
                    {step.k}
                  </p>
                  <h4 className="mt-2.5 mb-1.5 text-lg font-semibold tracking-[-0.01em]">{step.title}</h4>
                  <p className="text-[13.5px] leading-[1.45] text-muted-dark">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-[34px] flex flex-col items-start gap-2.5 rounded-[14px] border border-line-dark bg-ink-2 px-[22px] py-[18px] desk:flex-row desk:items-center desk:gap-4">
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-accent-action font-bold text-white"
            >
              ✓
            </span>
            <p className="font-display text-[19px] font-semibold">{how.chargeTitle}</p>
            <p className="text-[15.5px] text-muted-dark">{how.chargeBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
