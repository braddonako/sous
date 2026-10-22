import { home } from "@/content/home";
import RichText from "./RichText";

export default function Faq() {
  return (
    <section id={home.faq.id} className="band band-raised" aria-labelledby="faq-title">
      <div className="shell narrow">
        <p className="kicker">{home.faq.kicker}</p>
        <h2 id="faq-title">{home.faq.title}</h2>
        <div className="faq">
          {home.faq.items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden="true" />
              </summary>
              <p>
                <RichText text={item.answer} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
