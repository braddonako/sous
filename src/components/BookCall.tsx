import { getBookCall } from "@/config/site";
import { home } from "@/content/home";

export function BookCall({ size = "default" }: { size?: "default" | "nav" }) {
  const { href, kind } = getBookCall();
  const external = kind === "booking";

  return (
    <a
      href={href}
      className={`btn-primary ${size === "nav" ? "btn-nav" : "btn-lg"}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {home.bookLabel}
      <span aria-hidden="true">→</span>
      {kind === "placeholder" ? (
        <span className="sr-only">Booking link is not set yet. This opens a placeholder email.</span>
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
