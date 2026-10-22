import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Founders } from "@/components/Founders";
import { HomeHero } from "@/components/HomeHero";
import { Navbar } from "@/components/Navbar";
import { home } from "@/content/home";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = pageMeta(home.meta.title, home.meta.description, "/");

export default function Home() {
  return (
    <>
      <Navbar current="home" />
      <main id="main">
        <HomeHero />
        <Founders />
        <FinalCta cta={home.cta} />
      </main>
      <Footer />
    </>
  );
}
