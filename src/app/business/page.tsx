import type { Metadata } from "next";
import { BusinessHero } from "@/components/BusinessHero";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SmallBusiness } from "@/components/SmallBusiness";
import { Work } from "@/components/Work";
import { business } from "@/content/business";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = pageMeta(business.meta.title, business.meta.description, "/business/");

export default function BusinessPage() {
  return (
    <>
      <Navbar current="business" />
      <main id="main">
        <BusinessHero />
        <SmallBusiness />
        <Work audience="business" />
        <Faq faq={business.faq} />
        <FinalCta cta={business.cta} />
      </main>
      <Footer />
    </>
  );
}
