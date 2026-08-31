import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand your goals, users, business requirements and technical challenges.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Define scope, architecture, technology, milestones and delivery strategy.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Create intuitive interfaces and experiences around your users and business.",
  },
  {
    number: "04",
    title: "Build",
    description:
      "Develop the product using clean, scalable and maintainable engineering practices.",
  },
  {
    number: "05",
    title: "Secure",
    description:
      "Test the application and infrastructure for vulnerabilities and security weaknesses.",
  },
  {
    number: "06",
    title: "Launch",
    description:
      "Deploy, monitor and support your product as it moves into production.",
  },
];

export default function Process() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="A clear path from idea to launch."
          description="Our process keeps projects organized, transparent and focused on delivering meaningful results."
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