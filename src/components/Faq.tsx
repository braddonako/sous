import { MinusIcon, PlusIcon } from "@/components/icons";

type FaqCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly { readonly q: string; readonly a: string }[];
};

export function Faq({ faq }: { faq: FaqCopy }) {
  return (
    <section id="faq" className="scroll-mt-6 py-16 desk:py-[104px]" aria-labelledby="faq-title">
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
            <details key={item.q} open className="faq-item border-t border-line last:border-b">
              <summary className="flex cursor-pointer items-start justify-between gap-5 py-6">
                <h3 className="text-[21px] leading-snug tracking-[-0.015em]">{item.q}</h3>
                <span className="faq-plus mt-0.5 text-muted" aria-hidden="true">
                  <PlusIcon size={22} />
                </span>
                <span className="faq-minus mt-0.5 text-muted" aria-hidden="true">
                  <MinusIcon size={22} />
                </span>
              </summary>
              <p className="-mt-3 max-w-[640px] pb-6 text-base text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
