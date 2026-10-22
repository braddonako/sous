import { home } from "@/content/home";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

export default function Founders() {
  return (
    <section id={home.founders.id} className="band" aria-labelledby="about-title">
      <div className="shell">
        <p className="kicker">
          <span className="kitchen-only" aria-hidden="true">
            ✦
          </span>
          {home.founders.kicker}
        </p>
        <h2 id="about-title">{home.founders.title}</h2>
        <div className="founder-grid">
          {home.founders.people.map((person) => (
            <article key={person.name} className="founder">
              <div className="avatar" aria-hidden="true">
                {initials(person.name)}
              </div>
              <h3>{person.name}</h3>
              <p className="role">{person.role}</p>
              <p>{person.bio}</p>
              <ul className="chips" aria-label={`${person.name} skills`}>
                {person.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="founder-notes">
          <p>{home.founders.started}</p>
          <p>{home.founders.honest}</p>
        </div>
      </div>
    </section>
  );
}
