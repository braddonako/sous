import BookCall from "./BookCall";
import RichText from "./RichText";
import { home } from "@/content/home";

export default function Hero() {
  const ticket = home.hero.sampleTicket;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div>
          <ul className="eyebrow">
            {home.hero.eyebrow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h1 id="hero-title">{home.hero.title}</h1>
          <p className="lead">{home.hero.lead}</p>
          <p className="prose">{home.hero.body}</p>
          <div className="hero-actions">
            <BookCall />
            <a className="text-link" href="#how-it-works">
              {home.hero.secondaryCta}
            </a>
          </div>
        </div>

        <figure className="ticket">
          <figcaption>{ticket.caption}</figcaption>
          <div className="ticket-id">
            <span>{ticket.idLabel}</span>
            <span>{ticket.id}</span>
          </div>
          <p className="ticket-title">{ticket.title}</p>
          <ol className="ticket-rows">
            {ticket.rows.map((row) => (
              <li key={row.stage}>
                <span>{row.stage}</span>
                <span>
                  <RichText text={row.state} />
                </span>
              </li>
            ))}
          </ol>
        </figure>
      </div>
    </section>
  );
}
