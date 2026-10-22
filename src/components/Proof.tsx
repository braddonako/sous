import { teams } from "@/content/teams";

export function Proof() {
  const { proof } = teams;
  return (
    <section className="py-16 desk:py-[104px]" aria-labelledby="proof-title">
      <div className="mx-auto w-full max-w-[1200px] px-5 desk:px-10">
        <div className="mb-8 grid items-end gap-4 desk:mb-14 desk:grid-cols-2 desk:gap-14">
          <div>
            <p className="eyebrow text-accent-action">{proof.eyebrow}</p>
            <h2 id="proof-title" className="mt-4 text-[36px] desk:text-[52px]">
              {proof.title}
            </h2>
          </div>
          <p className="text-[16.5px] text-muted desk:text-lg">{proof.lede}</p>
        </div>

        <div className="grid gap-5 desk:grid-cols-[1.25fr_0.75fr]">
          <figure className="relative grid grid-cols-2 gap-2.5 rounded-[20px] border border-line bg-bone p-4 desk:gap-4 desk:p-[26px]">
            <span className="absolute top-7 left-7 z-[2] rounded-md bg-ink px-[9px] py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-white desk:top-11 desk:left-11">
              {proof.before}
            </span>
            <span className="absolute top-7 left-[calc(50%+14px)] z-[2] rounded-md bg-orange px-[9px] py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-on-orange desk:top-11 desk:left-[calc(50%+22px)]">
              {proof.concept}
            </span>
            <div className="concept-screen" aria-hidden="true">
              <div className="concept-bar ml-20 w-[calc(55%-80px)]" />
              <div className="concept-block" />
              <div className="concept-bar" />
              <div className="concept-bar w-[55%]" />
            </div>
            <div className="concept-screen concept-after" aria-hidden="true">
              <div className="concept-bar ml-20 w-[calc(55%-80px)]" />
              <div className="concept-block" />
              <div className="concept-bar" />
              <div className="concept-bar w-[55%]" />
            </div>
            <figcaption className="col-span-2 flex flex-col gap-1 font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted desk:flex-row desk:justify-between">
              <span>{proof.caption}</span>
              <span>{proof.captionAside}</span>
            </figcaption>
          </figure>

          <div className="rounded-[20px] bg-ink px-[30px] py-[30px] text-white">
            <p className="font-mono text-[12.5px] uppercase tracking-[0.08em] text-muted-dark">{proof.measureKicker}</p>
            <h3 className="mt-3 mb-2 text-[26px]">{proof.measureTitle}</h3>
            <p className="text-[15px] text-muted-dark">{proof.measureBody}</p>
            <ul className="mt-[18px] list-none">
              {proof.measures.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-3 border-t border-line-dark py-[11px] text-[15px]"
                >
                  {item.label}
                  <span className="font-mono text-[11px] tracking-[0.05em] whitespace-nowrap text-muted-dark uppercase">
                    {item.kind}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-[15.5px] text-muted">{proof.honest}</p>
      </div>
    </section>
  );
}
