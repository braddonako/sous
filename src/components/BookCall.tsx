import { getBookCall } from "@/config/site";
import { home } from "@/content/home";
import { ArrowRightIcon, ArrowUpRightIcon, CalendarIcon } from "@/components/icons";

export function BookCall({ size = "default" }: { size?: "default" | "nav" }) {
  const { href, kind } = getBookCall();
  const external = kind === "booking";
  const iconSize = size === "nav" ? 16 : 18;
  const Trailing = external ? ArrowUpRightIcon : ArrowRightIcon;

  return (
    <a
      href={href}
      className={`btn-primary ${size === "nav" ? "btn-nav" : "btn-lg"}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {size === "default" ? <CalendarIcon size={iconSize} mono /> : null}
      {home.bookLabel}
      <Trailing size={iconSize} mono />
      {kind === "placeholder" ? (
        <span className="sr-only">Booking link is not set yet. This opens a placeholder email.</span>
      ) : null}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
