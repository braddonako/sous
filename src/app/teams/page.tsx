import type { Metadata } from "next";
import { DevTeams } from "@/components/DevTeams";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Problem } from "@/components/Problem";
import { Proof } from "@/components/Proof";
import { TeamsHero } from "@/components/TeamsHero";
import { Work } from "@/components/Work";
import { teams } from "@/content/teams";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = pageMeta(teams.meta.title, teams.meta.description, "/teams/");

export default function TeamsPage() {
  return (
    <>
      <Navbar current="teams" />
      <main id="main">
        <TeamsHero />
        <Problem />
        <DevTeams />
        <Work audience="teams" />
        <Proof />
        <Faq faq={teams.faq} />
        <FinalCta cta={teams.cta} />
      </main>
      <Footer />
    </>
  );
}
