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
      className={`max-w-3xl ${
        centered ? "mx-auto text-center" : ""
      }`}
    >
      {/* Eyebrow */}
      <div
        className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="relative flex h-2 w-2 items-center justify-center">
          <span className="absolute h-full w-full animate-ping rounded-full bg-indigo-400/40" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-600" />
        </span>

        <span>{eyebrow}</span>
      </div>

      {/* Title */}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8 ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}

      {/* Small accent */}
      <div
        className={`mt-7 flex items-center gap-2 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-indigo-500" />
        <span className="h-px w-2 bg-indigo-300" />
      </div>
    </div>
  );
}