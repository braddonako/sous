import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Survey } from "@/components/Survey";
import { survey } from "@/content/survey";
import { pageMeta } from "@/lib/page-meta";

export const metadata: Metadata = pageMeta(survey.meta.title, survey.meta.description, "/survey/");

export default function SurveyPage() {
  return (
    <>
      <Navbar current="survey" />
      <main id="main">
        <Suspense fallback={<SurveyFallback />}>
          <Survey />
        </Suspense>
        <noscript>
          <p className="mx-auto w-full max-w-[720px] px-5 pb-16 text-[17px] text-muted desk:px-10">{survey.noscript}</p>
        </noscript>
      </main>
      <Footer />
    </>
  );
}

function SurveyFallback() {
  return (
    <section className="mx-auto w-full max-w-[720px] px-5 py-12 desk:px-10 desk:py-16">
      <p className="eyebrow text-accent-action">{survey.intro.kicker}</p>
      <h1 className="mt-4 text-[40px] desk:text-[52px]">{survey.intro.title}</h1>
      <p className="mt-4 text-[17px] text-muted desk:text-[19px]">{survey.intro.sub}</p>
    </section>
  );
}
