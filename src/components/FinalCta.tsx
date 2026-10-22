import BookCall from "./BookCall";
import { home } from "@/content/home";

export default function FinalCta() {
  return (
    <section id={home.cta.id} className="band band-ink" aria-labelledby="cta-title">
      <div className="shell narrow">
        <h2 id="cta-title">{home.cta.title}</h2>
        <p className="prose">{home.cta.body}</p>
        <BookCall variant="inverse" showNote />
      </div>
    </section>
  );
}
