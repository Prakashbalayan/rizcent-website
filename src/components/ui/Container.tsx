import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto w-full",
        "max-w-[1440px]",
        "px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16",
        "relative",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}