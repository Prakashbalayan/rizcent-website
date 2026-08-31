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
    <main>
      <ServiceHero
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <ServiceOverview
        title={overviewTitle}
        description={overviewDescription}
        points={overviewPoints}
      />

      <ServiceFeatures
        title={featuresTitle}
        description={featuresDescription}
        features={features}
      />

      <ServiceProcess
        title={processTitle}
        description={processDescription}
        steps={process}
      />

      <ServiceCTA
        title={ctaTitle}
        description={ctaDescription}
      />
    </main>
  );
}