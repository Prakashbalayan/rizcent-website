import Link from "next/link";

interface ServiceCTAProps {
  title?: string;
  description?: string;
}

export default function ServiceCTA({
  title = "Ready to build something better?",
  description = "Tell us what you're building, what you're trying to solve, or where you need help.",
}: ServiceCTAProps) {
  return (
    <section className="bg-white pb-24 sm:pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] bg-blue-600 px-7 py-16 text-center text-white sm:px-12 lg:px-20">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />

          <div className="relative">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
              Let's work together
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              {description}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/request-quote"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition hover:bg-slate-100"
              >
                Request a Quote
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}