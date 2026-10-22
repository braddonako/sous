import { home } from "@/content/home";

export default function Paths() {
  return (
    <section className="band" aria-labelledby="paths-title">
      <div className="shell">
        <h2 id="paths-title">{home.paths.title}</h2>
        <div className="path-grid">
          {home.paths.items.map((item) => (
            <article key={item.href} className="path-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <a className="text-link" href={item.href}>
                {item.cta}
                <span aria-hidden="true"> →</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
