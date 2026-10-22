import { brand } from "@/config/site";
import { home } from "@/content/home";

export default function Footer() {
  const year = new Date().getFullYear();
  const email = brand.email.trim();
  const linkedin = brand.linkedin.trim();
  const showEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showLinkedin = /^https?:\/\//i.test(linkedin);

  return (
    <footer className="site-footer">
      <div className="shell footer-bar">
        <p>
          © {year} {brand.name}. {home.footer.rights}
        </p>
        <p>{brand.location}</p>
        <ul className="footer-links">
          {showEmail ? (
            <li>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          ) : null}
          {showLinkedin ? (
            <li>
              <a href={linkedin} rel="noopener noreferrer" target="_blank">
                {home.footer.linkedinLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </footer>
  );
}
