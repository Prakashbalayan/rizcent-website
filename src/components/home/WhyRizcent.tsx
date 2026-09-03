import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const reasons = [
  {
    number: "01",
    title: "Security-first thinking",
    description:
      "Security is considered throughout development instead of being treated as an afterthought.",
    tag: "Secure by design",
  },
  {
    number: "02",
    title: "Modern engineering",
    description:
      "We use current technologies and engineering practices to create maintainable and scalable products.",
    tag: "Built to scale",
  },
  {
    number: "03",
    title: "Business-focused",
    description:
      "Technology should solve a business problem. We focus on measurable outcomes rather than unnecessary complexity.",
    tag: "Outcome driven",
  },
  {
    number: "04",
    title: "Transparent communication",
    description:
      "Clear scope, regular updates and straightforward communication keep projects predictable.",
    tag: "Clear collaboration",
  },
];

export default function WhyRizcent() {
  return (
    <section className="relative overflow-hidden bg-[#080c18] py-24 text-white sm:py-28 lg:py-36">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.18]
          [background-image:linear-gradient(rgba(148,163,184,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.11)_1px,transparent_1px)]
          [background-size:72px_72px]
          [mask-image:linear-gradient(to_bottom,black,transparent)]
        "
      />

      {/* Ambient glows */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-48
          top-20
          h-[520px]
          w-[520px]
          rounded-full
          bg-indigo-600/20
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-500/10
          blur-[150px]
        "
      />

      <Container>
        <div className="relative grid gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          {/* Left content */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/40" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300 sm:text-[11px]">
                Why Rizcent
              </span>

              <span className="h-px w-10 bg-gradient-to-r from-cyan-300 to-transparent" />
            </div>

            <h2 className="max-w-xl text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-5xl lg:text-[3.8rem]">
              A technology partner,
              <span className="block bg-gradient-to-r from-indigo-200 via-white to-cyan-200 bg-clip-text text-transparent">
                not just a vendor.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400 sm:text-lg">
              We combine product engineering and security expertise to help
              businesses build with confidence.
            </p>

            {/* Trust panel */}
            <div className="mt-10 max-w-md rounded-[26px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-xl text-cyan-200">
                  ✦
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Engineering with purpose
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Thoughtful technology. Reliable execution.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-300 to-transparent" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  RZ / 01
                </span>
              </div>
            </div>
          </div>

          {/* Right reasons */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[36px] bg-indigo-500/[0.03] blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl">
              {reasons.map((reason, index) => (
                <div
                  key={reason.number}
                  className={`
                    group
                    relative
                    grid
                    gap-5
                    px-6
                    py-7
                    transition
                    duration-500
                    hover:bg-white/[0.045]
                    sm:grid-cols-[76px_1fr]
                    sm:px-8
                    sm:py-8
                    ${
                      index !== reasons.length - 1
                        ? "border-b border-white/[0.08]"
                        : ""
                    }
                  `}
                >
                  {/* Number column */}
                  <div className="relative">
                    <span className="text-xs font-bold tracking-[0.2em] text-indigo-300/80">
                      {reason.number}
                    </span>

                    <span className="absolute left-0 top-7 h-px w-8 bg-gradient-to-r from-indigo-400 to-transparent opacity-60 transition duration-500 group-hover:w-14 group-hover:opacity-100" />
                  </div>

                  {/* Main content */}
                  <div>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <h3 className="text-xl font-semibold tracking-[-0.025em] text-white transition duration-300 group-hover:text-cyan-200 sm:text-2xl">
                        {reason.title}
                      </h3>

                      <span className="w-fit rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 transition duration-300 group-hover:border-cyan-300/20 group-hover:bg-cyan-300/10 group-hover:text-cyan-200">
                        {reason.tag}
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                      {reason.description}
                    </p>

                    {/* Progress accent */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="h-px w-8 bg-indigo-400/50 transition duration-500 group-hover:w-16 group-hover:bg-cyan-300" />

                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600 transition duration-300 group-hover:text-slate-400">
                        Rizcent Standard
                      </span>
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-0
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-300
                      to-transparent
                      opacity-0
                      transition-all
                      duration-700
                      group-hover:w-full
                      group-hover:opacity-100
                    "
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}   