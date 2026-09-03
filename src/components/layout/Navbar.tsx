"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

interface CurrentUser {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  /* =========================================================
     CURRENT USER
     ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const data = await response.json();

        if (mounted && data.authenticated && data.user) {
          setUser(data.user);
        } else if (mounted) {
          setUser(null);
        }
      } catch {
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      mounted = false;
    };
  }, [pathname]);

  /* =========================================================
     SCROLL EFFECT
     ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU
     ========================================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================================================
     ACTIVE LINK
     ========================================================= */

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  /* =========================================================
     ACCOUNT
     ========================================================= */

  const accountLabel = user
    ? user.name.split(" ")[0] || "Account"
    : "Login";

  const accountHref = user
    ? "/account"
    : "/login";

  return (
    <header
      className={`
        sticky
        top-0
        z-50
        px-3
        pt-3
        transition-all
        duration-500
        sm:px-5
        lg:px-6
        ${
          scrolled
            ? "pt-2"
            : "pt-3"
        }
      `}
    >
      {/* =====================================================
          OUTER AMBIENT GLOW
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-30px]
          h-32
          w-[min(900px,95vw)]
          -translate-x-1/2
          rounded-full
          bg-indigo-500/[0.08]
          blur-3xl
        "
      />

      {/* Cyan glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[28%]
          top-0
          h-20
          w-40
          rounded-full
          bg-cyan-400/[0.035]
          blur-3xl
        "
      />

      {/* =====================================================
          MAIN NAVBAR
          ===================================================== */}

      <div
        className={`
          relative
          mx-auto
          w-full
          max-w-[1420px]
          overflow-hidden
          rounded-[24px]
          border
          border-white/70
          bg-white/[0.92]
          backdrop-blur-2xl
          transition-all
          duration-500
          ${
            scrolled
              ? "shadow-[0_16px_55px_rgba(15,23,42,0.13)]"
              : "shadow-[0_10px_40px_rgba(15,23,42,0.08)]"
          }
        `}
      >
        {/* ===================================================
            TOP LIGHT
            =================================================== */}

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
            via-indigo-500/60
            to-transparent
          "
        />

        {/* ===================================================
            ANIMATED LIGHT SWEEP
            =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-[-35%]
            z-0
            w-[20%]
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
            opacity-0
            transition-all
            duration-[1200ms]
            hover:left-[120%]
            hover:opacity-100
          "
        />

        {/* ===================================================
            NAVBAR MAIN ROW
            =================================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-[72px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-7
          "
        >
          {/* =================================================
              LOGO
              ================================================= */}

          <Link
            href="/"
            onClick={closeMenu}
            className="
              group
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            {/* Logo mark */}

            <div
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-[14px]
                border
                border-slate-200/60
                bg-black
                shadow-[0_8px_24px_rgba(15,23,42,0.20)]
                transition-all
                duration-500
                group-hover:-translate-y-0.5
                group-hover:scale-[1.03]
                group-hover:shadow-[0_14px_35px_rgba(79,70,229,0.28)]
              "
            >
              {/* Logo */}

              <img
                src="/rizcent-logo.png"
                alt="Rizcent"
                className="
                  relative
                  z-20
                  h-full
                  w-full
                  object-contain
                  p-1
                  transition-transform
                  duration-500
                  group-hover:scale-105
                "
              />

              {/* Purple glow */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-4
                  -top-4
                  h-12
                  w-12
                  rounded-full
                  bg-indigo-500/20
                  blur-xl
                  transition-all
                  duration-500
                  group-hover:bg-cyan-400/25
                "
              />

              {/* Bottom cyan edge */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-0
                  left-2
                  right-2
                  z-30
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/80
                  to-transparent
                  opacity-70
                "
              />
            </div>

            {/* Brand */}

            <div className="leading-none">
              <div
                className="
                  text-[18px]
                  font-black
                  tracking-[-0.045em]
                  text-slate-950
                  transition-colors
                  duration-300
                  group-hover:text-indigo-700
                "
              >
                Rizcent
              </div>

              <div
                className="
                  mt-1.5
                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[0.30em]
                  text-slate-400
                  transition-colors
                  duration-300
                  group-hover:text-indigo-400
                "
              >
                Technologies
              </div>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <nav className="hidden lg:flex">
            <div
              className="
                relative
                flex
                items-center
                gap-1
                rounded-full
                border
                border-slate-200/80
                bg-slate-100/70
                p-1
                shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]
              "
            >
              {navLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch
                    className={`
                      group
                      relative
                      rounded-full
                      px-4
                      py-2.5
                      text-[12px]
                      font-semibold
                      tracking-[-0.01em]
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-white text-slate-950 shadow-[0_4px_14px_rgba(15,23,42,0.09)]"
                          : "text-slate-500 hover:bg-white/90 hover:text-slate-950 hover:shadow-[0_4px_14px_rgba(15,23,42,0.05)]"
                      }
                    `}
                  >
                    {/* Hover glow */}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-500/[0.05]
                        to-cyan-400/[0.05]
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <span className="relative z-10">
                      {link.label}
                    </span>

                    {/* Active indicator */}

                    <span
                      aria-hidden="true"
                      className={`
                        absolute
                        bottom-[5px]
                        left-1/2
                        h-[2px]
                        -translate-x-1/2
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-500
                        to-cyan-400
                        transition-all
                        duration-300
                        ${
                          active
                            ? "w-5 opacity-100"
                            : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-100"
                        }
                      `}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* =================================================
              DESKTOP RIGHT ACTIONS
              ================================================= */}

          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Contact */}

            <Link
              href="/contact"
              prefetch
              className="
                group
                relative
                flex
                items-center
                gap-1.5
                rounded-full
                px-3
                py-2.5
                text-[12px]
                font-semibold
                text-slate-500
                transition-all
                duration-300
                hover:bg-slate-50
                hover:text-slate-950
              "
            >
              <span>Contact</span>

              <span
                className="
                  text-[10px]
                  text-slate-300
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:text-indigo-500
                "
              >
                →
              </span>
            </Link>

            {/* =================================================
                ACCOUNT
                ================================================= */}

            {!authLoading && (
              <Link
                href={accountHref}
                prefetch
                className="
                  group
                  relative
                  flex
                  h-10
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-4
                  text-[12px]
                  font-bold
                  !text-slate-800
                  shadow-[0_3px_12px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:!text-indigo-700
                  hover:shadow-[0_8px_22px_rgba(79,70,229,0.12)]
                "
              >
                {/* Account live dot */}

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                    shadow-[0_0_8px_rgba(16,185,129,0.65)]
                  "
                />

                <span className="relative z-10">
                  {accountLabel}
                </span>

                <span
                  className="
                    text-slate-300
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:text-indigo-500
                  "
                >
                  →
                </span>
              </Link>
            )}

            {/* =================================================
                GET A QUOTE
                ================================================= */}

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
                border-indigo-400/30
                bg-gradient-to-r
                from-indigo-600
                via-indigo-600
                to-violet-600
                px-6
                text-[12px]
                font-bold
                !text-white
                shadow-[0_8px_25px_rgba(79,70,229,0.28)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:from-indigo-500
                hover:via-violet-600
                hover:to-indigo-600
                hover:!text-white
                hover:shadow-[0_15px_35px_rgba(79,70,229,0.38)]
                focus:outline-none
                focus:ring-2
                focus:ring-indigo-500/30
                focus:ring-offset-2
              "
            >
              {/* Animated shine */}

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
                  via-white/35
                  to-transparent
                  transition-all
                  duration-700
                  ease-out
                  group-hover:left-[150%]
                "
              />

              {/* Glow */}

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  rounded-full
                  opacity-0
                  shadow-[inset_0_0_25px_rgba(255,255,255,0.12)]
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* Text */}

              <span className="relative z-10 whitespace-nowrap !text-white">
                Get a Quote
              </span>

              {/* Arrow */}

              <span
                className="
                  relative
                  z-10
                  !text-white
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </Link>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
              ================================================= */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="
              group
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              overflow-hidden
              rounded-[14px]
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-[0_4px_14px_rgba(15,23,42,0.07)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-indigo-200
              hover:bg-indigo-50
              hover:text-indigo-600
              lg:hidden
            "
          >
            <span className="sr-only">
              {menuOpen
                ? "Close menu"
                : "Open menu"}
            </span>

            {/* Button glow */}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-4
                -top-4
                h-10
                w-10
                rounded-full
                bg-indigo-500/10
                blur-xl
                transition-all
                duration-300
                group-hover:bg-cyan-400/20
              "
            />

            {/* Hamburger */}

            <span className="relative z-10 flex h-5 w-5 flex-col justify-between">
              {/* Top */}

              <span
                className={`
                  h-[2px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "translate-y-[9px] rotate-45"
                      : ""
                  }
                `}
              />

              {/* Middle */}

              <span
                className={`
                  h-[2px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-200
                  ${
                    menuOpen
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100"
                  }
                `}
              />

              {/* Bottom */}

              <span
                className={`
                  h-[2px]
                  w-full
                  rounded-full
                  bg-current
                  transition-all
                  duration-300
                  ${
                    menuOpen
                      ? "-translate-y-[9px] -rotate-45"
                      : ""
                  }
                `}
              />
            </span>
          </button>
        </div>

        {/* ===================================================
            MOBILE MENU
            =================================================== */}

        <div
          className={`
            relative
            z-10
            overflow-hidden
            border-t
            border-slate-200/70
            bg-white/[0.96]
            backdrop-blur-2xl
            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            lg:hidden
            ${
              menuOpen
                ? "max-h-[900px] opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <nav className="px-4 py-4 sm:px-6">
            {/* Mobile nav links */}

            <div className="space-y-1.5">
              {navLinks.map(
                (link, index) => {
                  const active =
                    isActive(link.href);

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
                        border
                        px-4
                        py-3.5
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          active
                            ? "border-indigo-100 bg-indigo-50 !text-indigo-700 shadow-[0_4px_16px_rgba(79,70,229,0.08)]"
                            : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-950"
                        }
                      `}
                      style={{
                        transitionDelay:
                          menuOpen
                            ? `${index * 35}ms`
                            : "0ms",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        {/* Number */}

                        <span
                          className={`
                            text-[9px]
                            font-black
                            tracking-[0.15em]
                            ${
                              active
                                ? "text-indigo-400"
                                : "text-slate-300"
                            }
                          `}
                        >
                          0
                          {index + 1}
                        </span>

                        <span>
                          {link.label}
                        </span>
                      </span>

                      <span
                        className={`
                          transition-all
                          duration-300
                          group-hover:translate-x-1
                          ${
                            active
                              ? "text-indigo-500"
                              : "text-slate-300 group-hover:text-indigo-500"
                          }
                        `}
                      >
                        →
                      </span>
                    </Link>
                  );
                },
              )}
            </div>

            {/* =================================================
                MOBILE ACTIONS
                ================================================= */}

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
                  font-semibold
                  text-slate-700
                  transition-all
                  duration-300
                  hover:bg-slate-50
                  hover:text-slate-950
                "
              >
                <span>
                  Contact
                </span>

                <span
                  className="
                    text-slate-300
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:text-indigo-500
                  "
                >
                  →
                </span>
              </Link>

              {/* Account */}

              {!authLoading && (
                <Link
                  href={accountHref}
                  prefetch
                  onClick={closeMenu}
                  className="
                    group
                    mt-2
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-3.5
                    text-sm
                    font-bold
                    !text-slate-800
                    shadow-sm
                    transition-all
                    duration-300
                    hover:border-indigo-200
                    hover:bg-indigo-50
                    hover:!text-indigo-700
                  "
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                        shadow-[0_0_8px_rgba(16,185,129,0.55)]
                      "
                    />

                    <span>
                      {user
                        ? `Account · ${accountLabel}`
                        : "Login"}
                    </span>
                  </span>

                  <span
                    className="
                      text-slate-300
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-indigo-500
                    "
                  >
                    →
                  </span>
                </Link>
              )}

              {/* Register */}

              {!authLoading && !user && (
                <Link
                  href="/register"
                  prefetch
                  onClick={closeMenu}
                  className="
                    group
                    mt-2
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    border
                    border-indigo-100
                    bg-indigo-50
                    px-4
                    py-3.5
                    text-sm
                    font-bold
                    !text-indigo-700
                    transition-all
                    duration-300
                    hover:border-indigo-200
                    hover:bg-indigo-100
                  "
                >
                  <span>
                    Create Account
                  </span>

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>
                </Link>
              )}

              {/* Quote */}

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
                  border-indigo-400/30
                  bg-gradient-to-r
                  from-indigo-600
                  to-violet-600
                  px-5
                  text-sm
                  font-bold
                  !text-white
                  shadow-[0_10px_28px_rgba(79,70,229,0.25)]
                  transition-all
                  duration-300
                  hover:from-indigo-500
                  hover:to-violet-500
                  hover:!text-white
                  hover:shadow-[0_15px_35px_rgba(79,70,229,0.32)]
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
                    via-white/35
                    to-transparent
                    transition-all
                    duration-700
                    group-hover:left-[150%]
                  "
                />

                <span className="relative z-10 !text-white">
                  Get a Quote
                </span>

                <span
                  className="
                    relative
                    z-10
                    !text-white
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </Link>

              {/* Mobile status */}

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-400
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-500
                    shadow-[0_0_8px_rgba(16,185,129,0.65)]
                  "
                />

                Systems Online
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}