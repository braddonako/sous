import DevTeams from "@/components/DevTeams";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Founders from "@/components/Founders";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Paths from "@/components/Paths";
import SmallBusiness from "@/components/SmallBusiness";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Paths />
        <DevTeams />
        <HowItWorks />
        <SmallBusiness />
        <Founders />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
