import ServiceCTA from "./ServiceCTA";
import ServiceFeatures from "./ServiceFeatures";
import ServiceHero from "./ServiceHero";
import ServiceOverview from "./ServiceOverview";
import ServiceProcess from "./ServiceProcess";

interface ServiceFeature {
  number: string;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  eyebrow: string;
  title: string;
  description: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewPoints: string[];
  featuresTitle: string;
  featuresDescription?: string;
  features: ServiceFeature[];
  processTitle?: string;
  processDescription?: string;
  process: ProcessStep[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export default function ServicePage({
  eyebrow,
  title,
  description,
  overviewTitle,
  overviewDescription,
  overviewPoints,
  featuresTitle,
  featuresDescription,
  features,
  processTitle,
  processDescription,
  process,
  ctaTitle,
  ctaDescription,
}: ServicePageProps) {
  return (
    <main className="relative overflow-hidden bg-[#f8fafc] text-slate-950">
      {/* Global decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0 overflow-hidden"
      >
        <div className="absolute left-[-180px] top-[420px] h-[420px] w-[420px] rounded-full bg-blue-200/25 blur-[120px]" />

        <div className="absolute right-[-180px] top-[980px] h-[460px] w-[460px] rounded-full bg-cyan-200/20 blur-[140px]" />

        <div className="absolute left-[35%] top-[1750px] h-[360px] w-[360px] rounded-full bg-indigo-200/15 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* Hero */}
      <div className="relative z-10">
        <ServiceHero
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </div>

      {/* Premium section divider */}
      <div
        aria-hidden="true"
        className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-center px-6 sm:px-8 lg:px-12"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="absolute flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
        </div>
      </div>

      {/* Overview */}
      <section className="relative z-10">
        <ServiceOverview
          title={overviewTitle}
          description={overviewDescription}
          points={overviewPoints}
        />
      </section>

      {/* Features */}
      <section className="relative z-10">
        <ServiceFeatures
          title={featuresTitle}
          description={featuresDescription}
          features={features}
        />
      </section>

      {/* Process */}
      <section className="relative z-10">
        <ServiceProcess
          title={processTitle}
          description={processDescription}
          steps={process}
        />
      </section>

      {/* Final CTA */}
      <section className="relative z-10">
        <ServiceCTA
          title={ctaTitle}
          description={ctaDescription}
        />
      </section>
    </main>
  );
}