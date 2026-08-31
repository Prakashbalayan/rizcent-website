import Container from "../ui/Container";

const technologies = [
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Linux",
];

export default function TrustedStrip() {
  return (
    <section className="border-b border-slate-200/80 bg-white">
      <Container>
        <div className="py-10 sm:py-12">
          {/* Heading */}
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Our technology stack
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Modern tools for reliable digital products.
              </p>
            </div>

            <div className="hidden h-px flex-1 bg-slate-200 sm:mx-8 sm:block" />

            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Built for scale
            </div>
          </div>

          {/* Technology list */}
          <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 sm:grid-cols-4 lg:grid-cols-8">
            {technologies.map((technology, index) => (
              <div
                key={technology}
                className={`group relative flex h-16 items-center justify-center px-3 text-sm font-medium text-slate-500 transition-all duration-300 hover:bg-white hover:text-slate-950 ${
                  index !== technologies.length - 1
                    ? "border-b border-slate-200 sm:border-r lg:border-b-0"
                    : ""
                } ${
                  index % 2 === 0
                    ? "border-r border-slate-200 sm:border-r"
                    : ""
                }`}
              >
                {/* Hover accent */}
                <span className="absolute left-1/2 top-0 h-px w-0 -translate-x-1/2 bg-indigo-500 transition-all duration-300 group-hover:w-8" />

                <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                  {technology}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}