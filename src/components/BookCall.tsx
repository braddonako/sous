import { getContactAction } from "@/config/site";
import { home, labels } from "@/content/home";

type BookCallProps = {
  label?: string;
  variant?: "primary" | "inverse" | "text";
  showNote?: boolean;
};

export default function BookCall({
  label = labels.book,
  variant = "primary",
  showNote = false,
}: BookCallProps) {
  const action = getContactAction(label);
  const className =
    variant === "inverse"
      ? "btn btn-inverse"
      : variant === "text"
        ? "btn btn-text"
        : "btn";

  if (action.kind === "soon") {
    return (
      <div className="cta-block">
        <button type="button" className={className} disabled>
          {label}
        </button>
        {showNote ? (
          <p className="cta-note">{home.cta.soonNote}</p>
        ) : (
          <span className="sr-only">{home.cta.soonNote}</span>
        )}
      </div>
    );
  }

  const opensTab = action.kind === "url";

  return (
    <div className="cta-block">
      <a
        className={className}
        href={action.href}
        {...(opensTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : undefined)}
      >
        {label}
        <span className="sr-only">
          {opensTab ? " (opens in a new tab)" : " (opens email)"}
        </span>
      </a>
      {showNote && action.kind === "email" ? (
        <p className="cta-note">{home.cta.pendingNote}</p>
      ) : null}
    </div>
  );
}
