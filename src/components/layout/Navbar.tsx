"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Resources",
    href: "/blog",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 lg:px-6">
      {/* ================================================================ */}
      {/* Ambient navbar glow                                              */}
      {/* ================================================================ */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-24
          w-[min(900px,90vw)]
          -translate-x-1/2
          rounded-full
          bg-indigo-500/[0.05]
          blur-3xl
        "
      />

      {/* ================================================================ */}
      {/* Navbar                                                           */}
      {/* ================================================================ */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1380px]
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200/80
          bg-white/[0.94]
          shadow-[0_10px_40px_rgba(15,23,42,0.07)]
          backdrop-blur-2xl
        "
      >
        {/* Very subtle top highlight */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-8
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-400/40
            to-transparent
          "
        />

        {/* ============================================================ */}
        {/* Main navigation                                               */}
        {/* ============================================================ */}

        <div className="flex h-[72px] items-center justify-between px-4 sm:px-6 lg:px-7">

          {/* ======================================================== */}
          {/* Logo                                                       */}
          {/* ======================================================== */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
          >
            {/* Mark */}
            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                overflow-hidden
                rounded-[13px]
                bg-[#090d1a]
                text-sm
                font-bold
                text-white
                shadow-[0_8px_24px_rgba(15,23,42,0.15)]
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:shadow-[0_12px_30px_rgba(79,70,229,0.25)]
              "
            >
              {/* Logo letter */}
              <span className="relative z-20 text-white">
                R
              </span>

              {/* Indigo glow */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-3
                  -top-3
                  h-10
                  w-10
                  rounded-full
                  bg-indigo-500/40
                  blur-xl
                  transition-all
                  duration-500
                  group-hover:bg-cyan-400/50
                "
              />

              {/* Cyan edge */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-2
                  right-2
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/80
                  to-transparent
                  opacity-70
                "
              />
            </div>

            {/* Wordmark */}
            <div className="leading-none">
              <div
                className="
                  text-[18px]
                  font-bold
                  tracking-[-0.045em]
                  text-slate-950
                "
              >
                Rizcent
              </div>

              <div
                className="
                  mt-1.5
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-slate-400
                "
              >
                Technologies
              </div>
            </div>
          </Link>

          {/* ======================================================== */}
          {/* Desktop navigation                                         */}
          {/* ======================================================== */}

          <nav className="hidden lg:flex">
            <div
              className="
                flex
                items-center
                gap-0.5
                rounded-full
                border
                border-slate-200/80
                bg-slate-50/80
                p-1
              "
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      group
                      relative
                      rounded-full
                      px-4
                      py-2.5
                      text-[13px]
                      font-medium
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-white text-slate-950 shadow-[0_3px_12px_rgba(15,23,42,0.07)]"
                          : "text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-[0_3px_12px_rgba(15,23,42,0.05)]"
                      }
                    `}
                  >
                    <span className="relative z-10">
                      {link.label}
                    </span>

                    {/* Active / hover indicator */}
                    <span
                      aria-hidden="true"
                      className={`
                        absolute
                        bottom-1
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-indigo-500
                        transition-all
                        duration-300
                        ${
                          active
                            ? "w-4 opacity-100"
                            : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ======================================================== */}
          {/* Desktop actions                                             */}
          {/* ======================================================== */}

          <div className="hidden items-center gap-4 lg:flex">

            {/* Contact */}
            <Link
              href="/contact"
              className="
                relative
                px-2
                py-2
                text-[13px]
                font-medium
                text-slate-500
                transition-colors
                duration-200
                hover:text-slate-950
              "
            >
              Contact
            </Link>

            {/* ==================================================== */}
            {/* Get a Quote                                            */}
            {/* ==================================================== */}

            <Link
              href="/request-quote"
              prefetch
              className="
                group
                relative
                inline-flex
                h-11
                items-center
                justify-center
                gap-2
                overflow-hidden
                rounded-full
                border
                border-indigo-500/20
                bg-indigo-600
                px-6
                text-[13px]
                font-semibold
                text-white
                shadow-[0_8px_24px_rgba(79,70,229,0.22)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-indigo-700
                hover:text-white
                hover:shadow-[0_14px_32px_rgba(79,70,229,0.30)]
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
                focus:ring-offset-2
              "
            >
              {/* Shine animation */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  left-[-120%]
                  z-0
                  w-1/2
                  -skew-x-12
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  transition-all
                  duration-700
                  ease-out
                  group-hover:left-[150%]
                "
              />

              {/* Inner border */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-full
                  ring-1
                  ring-inset
                  ring-white/10
                "
              />

              {/* Text */}
              <span className="relative z-10 whitespace-nowrap text-white">
                Get a Quote
              </span>

              {/* Arrow */}
              <span
                className="
                  relative
                  z-10
                  text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>

          {/* ======================================================== */}
          {/* Mobile menu button                                          */}
          {/* ======================================================== */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              lg:hidden
            "
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>

            <span className="relative flex h-4 w-5 flex-col justify-between">

              {/* Top */}
              <span
                className={`
                  h-[1.5px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "translate-y-[7px] rotate-45"
                      : ""
                  }
                `}
              />

              {/* Middle */}
              <span
                className={`
                  h-[1.5px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-200
                  ${
                    menuOpen
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />

              {/* Bottom */}
              <span
                className={`
                  h-[1.5px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : ""
                  }
                `}
              />

            </span>
          </button>
        </div>

        {/* ============================================================ */}
        {/* Mobile menu                                                   */}
        {/* ============================================================ */}

        <div
          className={`
            overflow-hidden
            border-t
            border-slate-200/70
            bg-white/95
            backdrop-blur-2xl
            transition-all
            duration-300
            ease-out
            lg:hidden
            ${
              menuOpen
                ? "max-h-[720px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <nav className="px-4 py-4 sm:px-6">

            {/* Mobile navigation */}
            <div className="space-y-1">

              {navLinks.map((link, index) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch
                    onClick={closeMenu}
                    className={`
                      group
                      flex
                      items-center
                      justify-between
                      rounded-2xl
                      px-4
                      py-3.5
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                      }
                    `}
                    style={{
                      transitionDelay: menuOpen
                        ? `${index * 25}ms`
                        : "0ms",
                    }}
                  >
                    <span>
                      {link.label}
                    </span>

                    <span
                      className={`
                        transition-all
                        duration-200
                        group-hover:translate-x-1
                        ${
                          active
                            ? "text-indigo-500"
                            : "text-slate-400 group-hover:text-indigo-500"
                        }
                      `}
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* ====================================================== */}
            {/* Mobile actions                                           */}
            {/* ====================================================== */}

            <div className="mt-4 border-t border-slate-200 pt-4">

              {/* Contact */}
              <Link
                href="/contact"
                prefetch
                onClick={closeMenu}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-sm
                  font-medium
                  text-slate-700
                  transition-all
                  duration-200
                  hover:bg-slate-50
                  hover:text-slate-950
                "
              >
                <span>
                  Contact
                </span>

                <span
                  className="
                    text-slate-400
                    transition-all
                    duration-200
                    group-hover:translate-x-1
                    group-hover:text-indigo-500
                  "
                >
                  →
                </span>
              </Link>

              {/* ================================================== */}
              {/* Mobile quote CTA                                     */}
              {/* ================================================== */}

              <Link
                href="/request-quote"
                prefetch
                onClick={closeMenu}
                className="
                  group
                  relative
                  mt-2
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  overflow-hidden
                  rounded-2xl
                  border
                  border-indigo-500/20
                  bg-indigo-600
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_10px_25px_rgba(79,70,229,0.22)]
                  transition-all
                  duration-300
                  hover:bg-indigo-700
                  hover:text-white
                "
              >
                {/* Shine */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-[-120%]
                    z-0
                    w-1/2
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:left-[150%]
                  "
                />

                <span className="relative z-10 text-white">
                  Get a Quote
                </span>

                <span
                  className="
                    relative
                    z-10
                    text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}