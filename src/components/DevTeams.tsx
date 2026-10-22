import { home } from "@/content/home";
import StepList from "./StepList";

export default function DevTeams() {
  return (
    <section id={home.dev.id} className="band band-raised" aria-labelledby="dev-title">
      <div className="shell narrow">
        <p className="kicker">
          <span className="kitchen-only" aria-hidden="true">
            ✦
          </span>
          {home.dev.kicker}
        </p>
        <h2 id="dev-title">{home.dev.title}</h2>
        <p className="prose">{home.dev.intro}</p>
        <p className="lead">{home.dev.kickerLine}</p>
        <StepList steps={home.dev.steps} />
        <p className="footnote">{home.dev.footnote}</p>
        <a className="text-link" href="#how-it-works">
          {home.dev.flowLink}
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    </section>
  );
}
