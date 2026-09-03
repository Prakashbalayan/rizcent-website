interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`relative max-w-4xl ${
        centered ? "mx-auto text-center" : ""
      }`}
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -top-16 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl ${
          centered ? "left-1/2 -translate-x-1/2" : "left-0"
        }`}
      />

      {/* Eyebrow */}
      <div
        className={`relative mb-6 flex items-center gap-3 ${
          centered ? "justify-center" : ""
        }`}
      >
        {/* Left decorative line */}
        {centered && (
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gradient-to-r from-transparent via-indigo-300 to-indigo-500 sm:block"
          />
        )}

        {/* Status indicator */}
        <div className="relative flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400/40" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.65)]" />
          </span>

          <span
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-indigo-600
              sm:text-[11px]
            "
          >
            {eyebrow}
          </span>
        </div>

        {/* Right decorative line */}
        {centered && (
          <span
            aria-hidden="true"
            className="hidden h-px w-10 bg-gradient-to-l from-transparent via-indigo-300 to-indigo-500 sm:block"
          />
        )}
      </div>

      {/* Title */}
      <h2
        className="
          relative
          max-w-4xl
          text-3xl
          font-semibold
          leading-[1.04]
          tracking-[-0.045em]
          text-slate-950
          sm:text-4xl
          md:text-[2.8rem]
          lg:text-5xl
          xl:text-[3.4rem]
        "
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`
            relative
            mt-6
            max-w-2xl
            text-[15px]
            leading-7
            text-slate-500
            sm:text-base
            sm:leading-8
            lg:text-lg
            ${
              centered
                ? "mx-auto"
                : ""
            }
          `}
        >
          {description}
        </p>
      )}

      {/* Premium bottom accent */}
      <div
        className={`
          relative
          mt-8
          flex
          items-center
          gap-2
          ${
            centered
              ? "justify-center"
              : ""
          }
        `}
      >
        {/* Main line */}
        <span
          aria-hidden="true"
          className="h-px w-12 bg-gradient-to-r from-indigo-600 to-indigo-300"
        />

        {/* Middle accent */}
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(79,70,229,0.45)]"
        />

        {/* Small line */}
        <span
          aria-hidden="true"
          className="h-px w-5 bg-indigo-200"
        />
      </div>

      {/* Tiny technical detail */}
      <div
        className={`
          mt-4
          flex
          items-center
          gap-2
          text-[9px]
          font-medium
          uppercase
          tracking-[0.22em]
          text-slate-400
          ${
            centered
              ? "justify-center"
              : ""
          }
        `}
      >
        <span className="h-1 w-1 rounded-full bg-slate-300" />
        <span>Rizcent Technologies</span>
        <span className="text-slate-300">/</span>
        <span>Innovation</span>
      </div>
    </div>
  );
}