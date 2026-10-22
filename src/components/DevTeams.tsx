import { teams } from "@/content/teams";
import { CheckIcon, TerminalIcon } from "@/components/icons";

export function DevTeams() {
  const { dev } = teams;
  return (
    <section id="offer" className="scroll-mt-6 py-16 desk:py-[104px]" aria-labelledby="dev-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <div className="mb-8 grid items-end gap-4 desk:mb-14 desk:grid-cols-2 desk:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <TerminalIcon size={28} className="shrink-0 text-ink" />
              <p className="eyebrow text-accent-action">{dev.eyebrow}</p>
            </div>
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
                  ? "relative flex h-full flex-col rounded-[14px] border border-ink bg-ink px-6 pt-[26px] pb-6 text-white"
                  : "relative flex h-full flex-col rounded-[14px] border border-line bg-white px-6 pt-[26px] pb-6"
              }
            >
              {rung.core && "badge" in rung ? (
                <span className="absolute top-[22px] right-[22px] rounded-md bg-orange px-[9px] py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-on-orange">
                  {rung.badge}
                </span>
              ) : null}
              <span className={rung.core ? "font-mono text-[13px] text-muted-dark" : "font-mono text-[13px] text-muted"}>
                {rung.n}
              </span>
              <h3 className="mt-[18px] mb-2 text-2xl tracking-[-0.02em] desk:mt-7 desk:mb-3">{rung.title}</h3>
              <p className={rung.core ? "text-[15px] leading-relaxed text-muted-dark" : "text-[15px] leading-relaxed text-muted"}>
                {rung.body}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[15.5px] leading-relaxed text-muted desk:mt-6">{dev.priceLine}</p>
        <aside className="mt-8 flex items-start gap-4 rounded-[14px] border border-line bg-white px-5 py-5 desk:mt-10 desk:px-7 desk:py-6">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-orange text-on-orange"
          >
            <CheckIcon size={18} mono />
          </span>
          <div>
            <h3 className="text-[22px] tracking-[-0.02em] desk:text-[26px]">{dev.chargeTitle}</h3>
            <p className="mt-2 max-w-[760px] text-[15.5px] leading-relaxed text-muted desk:text-base">{dev.chargeBody}</p>
          </div>
        </aside>
        <p className="mt-[22px] flex items-start gap-2.5 text-[15.5px] text-muted before:mt-2 before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-sage before:content-['']">
          {dev.note}
        </p>
      </div>
    </section>
  );
}
