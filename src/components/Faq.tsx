import { home } from "@/content/home";

export function Faq() {
  const { faq } = home;
  return (
    <section className="py-16 desk:py-[104px]" aria-labelledby="faq-title">
      <div className="mx-auto grid w-full max-w-[1200px] gap-7 px-5 desk:grid-cols-[0.8fr_1.2fr] desk:gap-16 desk:px-10">
        <div>
          <p className="eyebrow text-accent-action">{faq.eyebrow}</p>
          <h2 id="faq-title" className="mt-4 text-[36px] desk:text-[52px]">
            {faq.title}
          </h2>
          <p className="mt-[18px] text-muted">{faq.intro}</p>
        </div>
        <div>
          {faq.items.map((item) => (
            <article key={item.q} className="border-t border-line py-6 last:border-b">
              <h3 className="flex items-start justify-between gap-5 text-[21px] leading-snug tracking-[-0.015em]">
                {item.q}
                <span aria-hidden="true" className="font-sans font-normal text-muted">
                  +
                </span>
              </h3>
              <p className="mt-2.5 max-w-[640px] text-base text-muted">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
