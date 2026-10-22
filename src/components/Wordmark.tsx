import Link from "next/link";
import { site } from "@/config/site";
import { withBasePath } from "@/lib/base-path";

export function Wordmark({
  linked = true,
  tone,
  size = "header",
}: {
  linked?: boolean;
  /** "ink" sits on a dark bar and uses the light wordmark. */
  tone: "ink" | "light";
  size?: "header" | "footer";
}) {
  const src = tone === "ink" ? site.logo.lockupOnInk : site.logo.lockupOnLight;
  const className = size === "footer" ? "h-7 w-auto" : "h-7 w-auto desk:h-8";
  const image = (
    // The file is the approved lockup. Do not redraw or optimize it.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(src)}
      alt={linked ? "" : site.logo.wordmarkText}
      width={128}
      height={32}
      className={className}
    />
  );
  if (!linked) return image;
  return (
    <Link href="/" aria-label={site.logo.wordmarkText} className="inline-flex shrink-0 items-center">
      {image}
    </Link>
  );
}
