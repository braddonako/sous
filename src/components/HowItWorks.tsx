import { home } from "@/content/home";
import RichText from "./RichText";

export default function HowItWorks() {
  return (
    <section id={home.how.id} className="band" aria-labelledby="how-title">
      <div className="shell">
        <p className="kicker">
          <span className="kitchen-only" aria-hidden="true">
            ✦
          </span>
          {home.how.kicker}
        </p>
        <h2 id="how-title">{home.how.title}</h2>
        <div className="flow-wrap">
          <ol className="flow">
            {home.how.steps.map((step, index) => (
              <li key={step.title}>
                <span className="pip" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>
                    <RichText text={step.body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <span className="flow-dot" aria-hidden="true" />
        </div>
        <aside className="callout">
          <p className="callout-title">{home.how.calloutTitle}</p>
          <p>{home.how.calloutBody}</p>
        </aside>
      </div>
    </section>
  );
}
