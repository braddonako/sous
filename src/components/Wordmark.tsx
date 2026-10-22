import Link from "next/link";
import { site } from "@/config/site";

function Mark() {
  return (
    <span className="grid grid-cols-3 gap-[3px]" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => {
        const accent = index === 0 || index === 4 || index === 8;
        return (
          <span
            key={index}
            className={
              accent
                ? "h-1.5 w-1.5 rounded-[1.5px] bg-accent"
                : "mark-quiet h-1.5 w-1.5 rounded-[1.5px] bg-current opacity-35"
            }
          />
        );
      })}
    </span>
  );
}

export function Wordmark({
  linked = true,
  compact = false,
}: {
  linked?: boolean;
  compact?: boolean;
}) {
  const classNames = compact
    ? "inline-flex items-center gap-3 font-display text-[18px] font-bold tracking-[-0.03em] text-inherit no-underline"
    : "inline-flex items-center gap-3 font-display text-[19px] font-bold tracking-[-0.03em] text-inherit no-underline desk:text-[22px]";
  const inner = (
    <>
      <Mark />
      <span>{site.logo.wordmarkText}</span>
    </>
  );
  if (!linked) {
    return <span className={classNames}>{inner}</span>;
  }
  return (
    <Link href="/" className={classNames}>
      {inner}
    </Link>
  );
}
