import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const testimonials = [
  {
    quote:
      "Rizcent understood our technical requirements and translated them into a practical solution.",
    name: "Client Name",
    role: "Founder, Company",
  },
  {
    quote:
      "The team maintained clear communication throughout the project and delivered with a strong focus on quality.",
    name: "Client Name",
    role: "Director, Company",
  },
  {
    quote:
      "Their security-first approach gave us confidence while building and launching our product.",
    name: "Client Name",
    role: "CTO, Company",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Client feedback"
          title="Trusted through collaboration."
          description="We believe great products come from strong partnerships, clear communication and shared goals."
          centered
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name + testimonial.role}
              className="rounded-3xl border border-slate-200 bg-white p-7"
            >
              <div className="text-4xl leading-none text-blue-600">
                “
              </div>

              <p className="mt-4 text-base leading-7 text-slate-700">
                {testimonial.quote}
              </p>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <div className="font-semibold text-slate-950">
                  {testimonial.name}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}