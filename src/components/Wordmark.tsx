import { brand } from "@/config/site";

export default function Wordmark() {
  const text = brand.logo.wordmarkText || brand.name;
  return (
    <span className="wordmark">
      {brand.logo.mark === "dots" ? (
        <svg className="wordmark-mark" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="4" cy="4" r="1.35" />
          <circle cx="12" cy="4" r="1.35" />
          <circle cx="4" cy="12" r="1.35" />
          <circle cx="12" cy="12" r="1.35" />
        </svg>
      ) : null}
      <span>{text}</span>
    </span>
  );
}
