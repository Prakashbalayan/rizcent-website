import Container from "../ui/Container";

import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your business objectives, users, operational requirements and the technology challenges that need to be solved.",
  },
  {
    number: "02",
    title: "Strategize",
    description:
      "Translate requirements into a clear technical strategy covering architecture, technology choices, scope, priorities and delivery milestones.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Design intuitive digital experiences and system interfaces that align user needs with business goals and technical requirements.",
  },
  {
    number: "04",
    title: "Engineer",
    description:
      "Build reliable, scalable and maintainable solutions using modern engineering practices, with quality considered throughout development.",
  },
  {
    number: "05",
    title: "Secure",
    description:
      "Identify and address security risks across applications, APIs, infrastructure and workflows before solutions move into production.",
  },
  {
    number: "06",
    title: "Deploy & Evolve",
    description:
      "Launch with confidence, monitor real-world performance and continuously improve the solution as your business and technology needs evolve.",
  },
];

export default function Process() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="From strategy to production, with clarity at every stage."
          description="We combine structured discovery, thoughtful design, disciplined engineering and security-focused delivery to turn technology requirements into dependable digital solutions."
          centered
        />

        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-slate-200 lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const reverse = index % 2 !== 0;

              return (
                <div
                  key={step.number}
                  className={`relative grid gap-8 lg:grid-cols-2 ${
                    reverse ? "lg:text-right" : ""
                  }`}
                >
                  <div
                    className={`rounded-3xl border border-slate-200 bg-white p-7 shadow-sm ${
                      reverse ? "lg:col-start-2" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-4 ${
                        reverse ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white">
                        {step.number}
                      </span>

                      <h3 className="text-xl font-bold text-slate-950">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}