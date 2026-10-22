import BookCall from "./BookCall";
import StepList from "./StepList";
import { home } from "@/content/home";

export default function SmallBusiness() {
  return (
    <section
      id={home.business.id}
      className="band band-raised"
      aria-labelledby="business-title"
    >
      <div className="shell narrow">
        <p className="kicker">
          <span className="kitchen-only" aria-hidden="true">
            ✦
          </span>
          {home.business.kicker}
        </p>
        <h2 id="business-title">{home.business.title}</h2>
        <p className="prose">{home.business.body}</p>
        <blockquote className="quote">{home.business.quote}</blockquote>
        <p className="chips-label" id="workflow-examples">
          {home.business.chipsLabel}
        </p>
        <ul className="chips" aria-labelledby="workflow-examples">
          {home.business.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
        <StepList steps={home.business.steps} />
        <p className="footnote">{home.business.scoped}</p>
        <div className="prompt">
          <p>{home.business.prompt}</p>
          <BookCall label={home.business.promptCta} variant="text" />
        </div>
      </div>
    </section>
  );
}
