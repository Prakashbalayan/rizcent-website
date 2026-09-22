import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import Cybersecurity from "@/components/home/Cybersecurity";
import WhyRizcent from "@/components/home/WhyRizcent";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Main services */}
      <WhatWeDo />

      {/* Cybersecurity */}
      <Cybersecurity />

      {/* Why us */}
      <WhyRizcent />

      {/* Process */}
      <Process />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}