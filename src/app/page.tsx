import { DevTeams } from "@/components/DevTeams";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Founders } from "@/components/Founders";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Problem } from "@/components/Problem";
import { Proof } from "@/components/Proof";
import { SmallBusiness } from "@/components/SmallBusiness";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <DevTeams />
        <SmallBusiness />
        <Proof />
        <Founders />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
