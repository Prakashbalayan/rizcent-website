import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light" | "dark";
  className?: string;
  arrow?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
  arrow = true,
}: ButtonProps) {
  const variantClass = {
    primary: "rz-btn-primary",
    secondary: "rz-btn-secondary",
    light: "rz-btn-light",
    dark: "rz-btn-dark",
  }[variant];

  const classes = [
    "rz-btn",
    variantClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {/* Background shine */}
      <span
        aria-hidden="true"
        className="rz-btn-shine"
      />

      {/* ALWAYS VISIBLE CONTENT */}
      <span className="rz-btn-inner">
        <span className="rz-btn-label">
          {children}
        </span>

        {arrow && (
          <span
            aria-hidden="true"
            className="rz-btn-arrow"
          >
            →
          </span>
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
    >
      {content}
    </button>
  );
}