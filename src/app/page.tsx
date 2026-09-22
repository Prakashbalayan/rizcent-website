import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import SoftwareDevelopment from "@/components/home/SoftwareDevelopment";
import Cybersecurity from "@/components/home/Cybersecurity";
import WhyRizcent from "@/components/home/WhyRizcent";
import Process from "@/components/home/Process";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Main services */}
      <WhatWeDo />

      {/* Software */}
      <SoftwareDevelopment />

      {/* Cybersecurity */}
      <Cybersecurity />

      {/* Why us */}
      <WhyRizcent />

      {/* Process */}
      <Process />

      {/* Projects */}
      <ProjectsPreview />

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <FinalCTA />
    </main>
  );
}