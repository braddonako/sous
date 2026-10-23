import Link from "next/link";
import { pickTheme } from "@/config/site";
import { business } from "@/content/business";
import { fill } from "@/lib/fill";
import { BookCall } from "@/components/BookCall";

export function BusinessHero() {
  const { hero } = business;
  return (
    <header className="bg-sage-deep text-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-14 desk:px-10 desk:py-20">
        <p className="eyebrow text-[#b7cdbb]">{fill(pickTheme(hero.eyebrow))}</p>
        <h1 className="mt-4 mb-[18px] max-w-[14ch] text-[40px] desk:text-[58px]">
          <span className="text-orange">{hero.titleLead}</span>
          <br />
          {hero.titleRest}
        </h1>
        <p className="max-w-[640px] text-[17px] text-[#d3e0d5] desk:text-[19px]">{hero.lede}</p>
        <div className="mt-[26px] flex flex-col items-start gap-4 desk:flex-row desk:items-center desk:gap-[26px]">
          <BookCall />
          <p className="text-[15px] text-[#d3e0d5]">{hero.note}</p>
        </div>
        <p className="mt-4 max-w-[640px] text-[15px]">
          <Link href={hero.readinessHref} className="text-white underline underline-offset-[3px]">
            {hero.readinessLink}
          </Link>
        </p>
      </div>
    </header>
  );
}
