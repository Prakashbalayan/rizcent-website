import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const reasons = [
  {
    number: "01",
    title: "Security-first thinking",
    description:
      "Security is considered throughout development instead of being treated as an afterthought.",
  },
  {
    number: "02",
    title: "Modern engineering",
    description:
      "We use current technologies and engineering practices to create maintainable and scalable products.",
  },
  {
    number: "03",
    title: "Business-focused",
    description:
      "Technology should solve a business problem. We focus on measurable outcomes rather than unnecessary complexity.",
  },
  {
    number: "04",
    title: "Transparent communication",
    description:
      "Clear scope, regular updates and straightforward communication keep projects predictable.",
  },
];

export default function WhyRizcent() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Why Rizcent"
            title="A technology partner, not just a vendor."
            description="We combine product engineering and security expertise to help businesses build with confidence."
          />

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {reasons.map((reason) => (
              <div
                key={reason.number}
                className="grid gap-5 py-8 sm:grid-cols-[80px_1fr]"
              >
                <div className="text-sm font-bold text-blue-600">
                  {reason.number}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    {reason.title}
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}