import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import OurStories from "@/components/OurStories";
import ImpactStats from "@/components/ImpactStats";
import HowToHelp from "@/components/HowToHelp";
import QuoteSection from "@/components/QuoteSection";
import ReportsDocs from "@/components/ReportsDocs";
import AboutPerson from "@/components/AboutPerson";
import GlobeSection from "@/components/GlobeSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <WhatWeDo />
      <OurStories />
      <ImpactStats />
      <HowToHelp />
      <QuoteSection />
      <ReportsDocs />
      <AboutPerson />
      <GlobeSection />
      <Footer />
    </main>
  );
}
