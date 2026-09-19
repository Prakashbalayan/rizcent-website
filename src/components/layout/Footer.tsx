import Link from "next/link";
import Container from "../ui/Container";

const companyLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const serviceLinks = [
  {
    label: "Software Development",
    href: "/services/software-development",
  },
  {
    label: "Web Development",
    href: "/services/web-development",
  },
  {
    label: "Cybersecurity",
    href: "/services/cybersecurity",
  },
  {
    label: "Penetration Testing",
    href: "/services/penetration-testing",
  },
  {
    label: "Cloud Security",
    href: "/services/cloud-security",
  },
];

const resourceLinks = [
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
  {
    label: "Request a Quote",
    href: "/request-quote",
  },
];

const socials = [
  {
    label: "LinkedIn",
    short: "in",
    href: "https://www.linkedin.com/company/rizcent-technologies/",
  },
  {
    label: "Instagram",
    short: "IG",
    href: "https://www.instagram.com/rizcenttechnologies/",
  },
  {
    label: "GitHub",
    short: "GH",
    href: "https://github.com/rizcent-technologies",
  },
];

const capabilities = [
  "Software Engineering",
  "Cybersecurity",
  "Cloud Solutions",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        rizcent-premium-footer
        relative
        overflow-hidden
        bg-[#02040a]
        text-white
      "
    >
      {/* =========================================================
          GLOBAL FOOTER ATMOSPHERE
          ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Main violet glow */}
        <div
          className="
            footer-orb
            footer-orb-one
            absolute
            -left-72
            -top-64
            h-[700px]
            w-[700px]
            rounded-full
            bg-indigo-600/[0.12]
            blur-[150px]
          "
        />

        {/* Cyan glow */}
        <div
          className="
            footer-orb
            footer-orb-two
            absolute
            -right-72
            top-[18%]
            h-[650px]
            w-[650px]
            rounded-full
            bg-cyan-400/[0.075]
            blur-[150px]
          "
        />

        {/* Bottom violet */}
        <div
          className="
            footer-orb
            footer-orb-three
            absolute
            bottom-[-420px]
            left-1/2
            h-[800px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-violet-600/[0.09]
            blur-[170px]
          "
        />

        {/* Animated grid */}
        <div className="footer-grid absolute inset-0" />

        {/* Vertical center light */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent
            via-cyan-400/[0.08]
            to-transparent
          "
        />

        {/* Horizontal light beam */}
        <div
          className="
            footer-light-beam
            absolute
            left-[-30%]
            top-[14%]
            h-px
            w-[35%]
            bg-gradient-to-r
            from-transparent
            via-cyan-300/50
            to-transparent
            blur-[1px]
          "
        />

        {/* Second light beam */}
        <div
          className="
            footer-light-beam
            footer-light-beam-two
            absolute
            left-[-25%]
            top-[58%]
            h-px
            w-[28%]
            bg-gradient-to-r
            from-transparent
            via-indigo-400/40
            to-transparent
            blur-[1px]
          "
        />

        {/* Particles */}
        <span className="footer-particle footer-particle-one" />
        <span className="footer-particle footer-particle-two" />
        <span className="footer-particle footer-particle-three" />
        <span className="footer-particle footer-particle-four" />
        <span className="footer-particle footer-particle-five" />
        <span className="footer-particle footer-particle-six" />

        {/* Noise */}
        <div className="footer-noise absolute inset-0" />
      </div>

      {/* =========================================================
          MAIN CONTENT
          ========================================================= */}

      <Container className="relative z-10">
        {/* =======================================================
            TOP CTA
            ======================================================= */}

        <section className="relative py-14 sm:py-20 lg:py-24">
          <div
            className="
              footer-cta-card
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-6
              py-10
              shadow-[0_40px_140px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              sm:px-10
              sm:py-14
              lg:px-14
              lg:py-16
            "
          >
            {/* CTA internal grid */}
            <div className="footer-cta-grid absolute inset-0" />

            {/* CTA glow */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-80
                w-80
                rounded-full
                bg-indigo-500/[0.14]
                blur-[100px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -bottom-32
                left-[30%]
                h-72
                w-72
                rounded-full
                bg-cyan-400/[0.07]
                blur-[100px]
              "
            />

            {/* Top edge */}
            <div
              aria-hidden="true"
              className="
                absolute
                left-[8%]
                right-[8%]
                top-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-cyan-300/40
                to-transparent
              "
            />

            {/* Corner decorations */}
            <span className="footer-corner footer-corner-tl" />
            <span className="footer-corner footer-corner-tr" />
            <span className="footer-corner footer-corner-bl" />
            <span className="footer-corner footer-corner-br" />

            <div
              className="
                relative
                z-10
                flex
                flex-col
                gap-10
                lg:flex-row
                lg:items-end
                lg:justify-between
              "
            >
              {/* CTA text */}
              <div className="max-w-3xl">
                {/* Status */}
                <div
                  className="
                    mb-6
                    inline-flex
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-emerald-400/15
                    bg-emerald-400/[0.05]
                    px-3.5
                    py-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-emerald-300
                    shadow-[0_0_30px_rgba(16,185,129,0.05)]
                  "
                >
                  <span
                    className="
                      footer-live-dot
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-emerald-400
                      shadow-[0_0_12px_rgba(52,211,153,0.9)]
                    "
                  />

                  Available for new projects
                </div>

                {/* Heading */}
                <h2
                  className="
                    max-w-3xl
                    text-3xl
                    font-black
                    leading-[0.98]
                    tracking-[-0.055em]
                    text-white
                    sm:text-5xl
                    lg:text-6xl
                  "
                >
                  Have an idea?

                  <span
                    className="
                      mt-2
                      block
                      bg-gradient-to-r
                      from-white
                      via-slate-300
                      to-slate-600
                      bg-clip-text
                      text-transparent
                    "
                  >
                    Let&apos;s build it.
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="
                    mt-6
                    max-w-2xl
                    text-sm
                    leading-7
                    text-slate-400
                    sm:text-base
                    sm:leading-8
                  "
                >
                  From high-performance software to advanced
                  cybersecurity solutions, Rizcent helps turn
                  ambitious ideas into secure and scalable
                  digital products.
                </p>

                {/* Capability pills */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {capabilities.map((item, index) => (
                    <span
                      key={item}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        px-3
                        py-2
                        text-[9px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-slate-500
                      "
                    >
                      <span
                        className={`
                          h-1
                          w-1
                          rounded-full
                          ${
                            index === 1
                              ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                              : "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                          }
                        `}
                      />

                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/request-quote"
                prefetch
                className="
                  footer-main-cta
                  group
                  relative
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-4
                  overflow-hidden
                  rounded-full
                  border
                  border-white/10
                  bg-white
                  px-7
                  py-4
                  text-sm
                  font-bold
                  !text-slate-950
                  shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-[0_25px_70px_rgba(79,70,229,0.30)]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-400/50
                  focus:ring-offset-2
                  focus:ring-offset-[#02040a]
                  sm:px-8
                "
              >
                {/* Shine */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    left-[-130%]
                    z-0
                    w-1/2
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-indigo-100
                    to-transparent
                    transition-all
                    duration-700
                    ease-out
                    group-hover:left-[150%]
                  "
                />

                <span
                  className="
                    relative
                    z-10
                    whitespace-nowrap
                    !text-slate-950
                    transition-colors
                    duration-300
                    group-hover:!text-indigo-700
                  "
                >
                  Start a Project
                </span>

                <span
                  className="
                    relative
                    z-10
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-950
                    !text-white
                    shadow-[0_5px_15px_rgba(15,23,42,0.25)]
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-indigo-600
                  "
                >
                  <span
                    className="
                      !text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  >
                    →
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* =======================================================
            BRAND + LINKS
            ======================================================= */}

        <section
          className="
            relative
            border-t
            border-white/[0.07]
            py-14
            sm:py-16
            lg:py-20
          "
        >
          <div
            className="
              grid
              gap-14
              lg:grid-cols-[1.65fr_0.8fr_1.35fr_0.85fr]
              lg:gap-12
            "
          >
            {/* ===================================================
                BRAND
                =================================================== */}

            <div className="relative">
              {/* Giant background word */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -left-4
                  -top-10
                  select-none
                  text-[90px]
                  font-black
                  uppercase
                  tracking-[-0.09em]
                  text-white/[0.018]
                  sm:text-[120px]
                "
              >
                RZ
              </div>

              {/* Logo */}
              <Link
                href="/"
                aria-label="Rizcent Technologies home"
                className="group relative inline-flex items-center"
              >
                <div
                  className="
                    footer-logo-box
                    relative
                    flex
                    h-[76px]
                    w-[220px]
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/[0.11]
                    bg-[#03050a]
                    px-4
                    shadow-[0_20px_55px_rgba(0,0,0,0.5)]
                    transition-all
                    duration-500
                    group-hover:-translate-y-1
                    group-hover:scale-[1.03]
                    group-hover:border-cyan-400/30
                  "
                >
                  <img
                    src="/rizcent-logonav2.png"
                    alt="Rizcent Technologies"
                    className="
                      relative
                      z-20
                      h-full
                      w-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Logo glow */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      -right-8
                      -top-8
                      h-24
                      w-24
                      rounded-full
                      bg-indigo-500/20
                      blur-3xl
                      transition-all
                      duration-500
                      group-hover:bg-cyan-400/25
                    "
                  />

                  {/* Bottom neon line */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-5
                      right-5
                      z-30
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-300
                      to-transparent
                      shadow-[0_0_10px_rgba(34,211,238,0.6)]
                    "
                  />
                </div>
              </Link>

              {/* Description */}
              <p
                className="
                  mt-7
                  max-w-sm
                  text-sm
                  leading-7
                  text-slate-500
                "
              >
                Building secure digital products, modern
                software systems and practical cybersecurity
                solutions for businesses ready to move forward.
              </p>

              {/* Live system card */}
              <div
                className="
                  mt-7
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-4
                  py-3
                  shadow-[0_10px_35px_rgba(0,0,0,0.18)]
                "
              >
                <span
                  className="
                    footer-live-dot
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_12px_rgba(52,211,153,0.8)]
                  "
                />

                <div>
                  <div
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-emerald-300
                    "
                  >
                    Systems Online
                  </div>

                  <div
                    className="
                      mt-1
                      text-[9px]
                      text-slate-600
                    "
                  >
                    Rizcent digital infrastructure
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="mt-7 flex items-center gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="
                      footer-social
                      group
                      relative
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      text-[10px]
                      font-bold
                      text-slate-500
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-cyan-400/25
                      hover:bg-cyan-400/[0.06]
                      hover:text-white
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-indigo-500/15
                        via-transparent
                        to-cyan-400/10
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                    />

                    <span className="relative z-10">
                      {social.short}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <FooterColumn
              title="Company"
              links={companyLinks}
            />

            {/* Services */}
            <FooterColumn
              title="Services"
              links={serviceLinks}
            />

            {/* Resources */}
            <FooterColumn
              title="Resources"
              links={resourceLinks}
            />
          </div>
        </section>

        {/* =======================================================
            FINAL BRAND STATEMENT
            ======================================================= */}

        <section
          className="
            relative
            border-t
            border-white/[0.07]
            py-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >
            {/* Statement */}
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-slate-600
                "
              >
                Rizcent Technologies
              </p>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-lg
                  font-semibold
                  tracking-[-0.02em]
                  text-slate-400
                  sm:text-xl
                "
              >
                Engineering the future.
                <span className="text-slate-700">
                  {" "}
                  Securing what matters.
                </span>
              </p>
            </div>

            {/* Mini metrics */}
            <div className="flex flex-wrap gap-3">
              <FooterMetric
                label="Engineering"
                value="01"
              />

              <FooterMetric
                label="Security"
                value="02"
              />

              <FooterMetric
                label="Innovation"
                value="03"
              />
            </div>
          </div>
        </section>

        {/* =======================================================
            BOTTOM BAR
            ======================================================= */}

        <section
          className="
            border-t
            border-white/[0.07]
            py-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              text-[11px]
              text-slate-600
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* Copyright */}
            <div>
              <p>
                © {year} Rizcent Technologies. All Rights
                Reserved.
              </p>

              <p className="mt-1.5 text-slate-700">
                Designed &amp; engineered by{" "}
                <span className="font-semibold text-slate-500">
                  Rizcent Technologies
                </span>
              </p>
            </div>

            {/* Legal */}
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-6
                gap-y-3
              "
            >
              <Link
                href="/privacy-policy"
                className="footer-legal-link"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="footer-legal-link"
              >
                Terms
              </Link>

              <Link
                href="/cookie-policy"
                className="footer-legal-link"
              >
                Cookies
              </Link>

              {/* FIX:
                  No onClick here.
                  Footer remains a Server Component.
              */}
              <a
                href="#top"
                className="
                  footer-back-top
                  inline-flex
                  items-center
                  gap-2
                  text-slate-500
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                Back to top
                <span>↑</span>
              </a>
            </div>
          </div>
        </section>
      </Container>

      {/* =========================================================
          GIANT BOTTOM WORDMARK
          ========================================================= */}

      <div
        aria-hidden="true"
        className="
          footer-giant-word
          pointer-events-none
          absolute
          bottom-[-45px]
          left-1/2
          -translate-x-1/2
          select-none
          whitespace-nowrap
          text-[22vw]
          font-black
          uppercase
          leading-none
          tracking-[-0.10em]
          text-white/[0.018]
        "
      >
        RIZCENT
      </div>

      {/* =========================================================
          FOOTER ANIMATIONS
          ========================================================= */}

      <style>{`
        .rizcent-premium-footer {
          isolation: isolate;
        }

        /* =========================================================
           GRID
           ========================================================= */

        .footer-grid {
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.025) 1px,
              transparent 1px
            );

          background-size: 72px 72px;

          opacity: 0.6;

          mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.8) 50%,
              transparent 90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0, 0, 0, 0.8) 50%,
              transparent 90%
            );

          animation:
            footerGridMove
            24s
            linear
            infinite;
        }

        @keyframes footerGridMove {
          from {
            background-position:
              0 0,
              0 0;
          }

          to {
            background-position:
              72px 72px,
              72px 72px;
          }
        }

        /* =========================================================
           ORBS
           ========================================================= */

        .footer-orb-one {
          animation:
            footerOrbOne
            13s
            ease-in-out
            infinite;
        }

        .footer-orb-two {
          animation:
            footerOrbTwo
            15s
            ease-in-out
            infinite;
        }

        .footer-orb-three {
          animation:
            footerOrbThree
            17s
            ease-in-out
            infinite;
        }

        @keyframes footerOrbOne {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(55px, 35px, 0)
              scale(1.08);
          }
        }

        @keyframes footerOrbTwo {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-45px, 30px, 0)
              scale(1.1);
          }
        }

        @keyframes footerOrbThree {
          0%,
          100% {
            transform:
              translate3d(-50%, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(-50%, -35px, 0)
              scale(1.08);
          }
        }

        /* =========================================================
           LIGHT BEAMS
           ========================================================= */

        .footer-light-beam {
          animation:
            footerBeam
            9s
            ease-in-out
            infinite;
        }

        .footer-light-beam-two {
          animation-delay: -4s;
        }

        @keyframes footerBeam {
          0% {
            transform:
              translateX(-20vw)
              scaleX(0.6);

            opacity: 0;
          }

          18% {
            opacity: 0.8;
          }

          50% {
            transform:
              translateX(125vw)
              scaleX(1.2);

            opacity: 0;
          }

          100% {
            transform:
              translateX(125vw)
              scaleX(1.2);

            opacity: 0;
          }
        }

        /* =========================================================
           PARTICLES
           ========================================================= */

        .footer-particle {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 9999px;

          background: rgba(56, 189, 248, 0.65);

          box-shadow:
            0 0 12px rgba(56, 189, 248, 0.75);

          animation:
            footerParticle
            7s
            ease-in-out
            infinite;
        }

        .footer-particle-one {
          left: 12%;
          top: 19%;
        }

        .footer-particle-two {
          left: 73%;
          top: 13%;

          animation-delay: -2s;
        }

        .footer-particle-three {
          left: 87%;
          top: 44%;

          width: 3px;
          height: 3px;

          animation-delay: -4s;
        }

        .footer-particle-four {
          left: 37%;
          top: 68%;

          width: 3px;
          height: 3px;

          animation-delay: -5s;
        }

        .footer-particle-five {
          left: 62%;
          top: 82%;

          width: 3px;
          height: 3px;

          background: rgba(129, 140, 248, 0.7);

          animation-delay: -1s;
        }

        .footer-particle-six {
          left: 22%;
          top: 76%;

          width: 2px;
          height: 2px;

          animation-delay: -3s;
        }

        @keyframes footerParticle {
          0%,
          100% {
            opacity: 0.15;

            transform:
              translate3d(0, 0, 0)
              scale(0.7);
          }

          50% {
            opacity: 1;

            transform:
              translate3d(0, -25px, 0)
              scale(1.2);
          }
        }

        /* =========================================================
           NOISE
           ========================================================= */

        .footer-noise {
          opacity: 0.018;

          background-image:
            repeating-radial-gradient(
              circle at 0 0,
              rgba(255,255,255,0.7) 0,
              rgba(255,255,255,0.7) 1px,
              transparent 1px,
              transparent 3px
            );

          background-size: 5px 5px;

          mix-blend-mode: overlay;
        }

        /* =========================================================
           CTA CARD
           ========================================================= */

        .footer-cta-card {
          transform: translateZ(0);

          transition:
            border-color 500ms ease,
            box-shadow 500ms ease,
            transform 500ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-cta-card:hover {
          border-color:
            rgba(56, 189, 248, 0.16);

          box-shadow:
            0 50px 150px
              rgba(0, 0, 0, 0.5),
            0 0 60px
              rgba(56, 189, 248, 0.035),
            inset 0 1px 0
              rgba(255, 255, 255, 0.07);
        }

        .footer-cta-grid {
          background-image:
            linear-gradient(
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.025) 1px,
              transparent 1px
            );

          background-size: 45px 45px;

          mask-image:
            radial-gradient(
              ellipse at 75% 50%,
              black,
              transparent 70%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at 75% 50%,
              black,
              transparent 70%
            );
        }

        /* =========================================================
           CORNERS
           ========================================================= */

        .footer-corner {
          position: absolute;

          width: 18px;
          height: 18px;

          pointer-events: none;
        }

        .footer-corner-tl {
          left: 18px;
          top: 18px;

          border-left:
            1px solid rgba(56,189,248,0.35);

          border-top:
            1px solid rgba(56,189,248,0.35);

          border-top-left-radius: 8px;
        }

        .footer-corner-tr {
          right: 18px;
          top: 18px;

          border-right:
            1px solid rgba(99,91,255,0.35);

          border-top:
            1px solid rgba(99,91,255,0.35);

          border-top-right-radius: 8px;
        }

        .footer-corner-bl {
          left: 18px;
          bottom: 18px;

          border-left:
            1px solid rgba(99,91,255,0.25);

          border-bottom:
            1px solid rgba(99,91,255,0.25);

          border-bottom-left-radius: 8px;
        }

        .footer-corner-br {
          right: 18px;
          bottom: 18px;

          border-right:
            1px solid rgba(34,211,238,0.25);

          border-bottom:
            1px solid rgba(34,211,238,0.25);

          border-bottom-right-radius: 8px;
        }

        /* =========================================================
           LIVE DOT
           ========================================================= */

        .footer-live-dot {
          animation:
            footerLivePulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes footerLivePulse {
          0%,
          100% {
            opacity: 0.45;

            transform: scale(0.8);
          }

          50% {
            opacity: 1;

            transform: scale(1.15);
          }
        }

        /* =========================================================
           LOGO
           ========================================================= */

        .footer-logo-box {
          transform: translateZ(0);
        }

        .footer-logo-box::before {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              135deg,
              rgba(56,189,248,0.08),
              transparent 45%,
              rgba(99,91,255,0.08)
            );

          pointer-events: none;
        }

        /* =========================================================
           SOCIAL
           ========================================================= */

        .footer-social::after {
          content: "";

          position: absolute;

          left: 15%;
          right: 15%;

          bottom: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(34,211,238,0.7),
              transparent
            );

          transform:
            scaleX(0);

          transition:
            transform 350ms
              cubic-bezier(0.22, 1, 0.36, 1);
        }

        .footer-social:hover::after {
          transform:
            scaleX(1);
        }

        /* =========================================================
           LEGAL LINKS
           ========================================================= */

        .footer-legal-link {
          position: relative;

          color: #475569;

          transition:
            color 250ms ease;
        }

        .footer-legal-link::after {
          content: "";

          position: absolute;

          left: 0;
          right: 0;

          bottom: -4px;

          height: 1px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              #6366f1,
              #22d3ee
            );

          transform:
            scaleX(0);

          transform-origin: left;

          transition:
            transform 300ms ease;
        }

        .footer-legal-link:hover {
          color: #ffffff;
        }

        .footer-legal-link:hover::after {
          transform:
            scaleX(1);
        }

        /* =========================================================
           METRICS
           ========================================================= */

        .footer-metric {
          transition:
            transform 300ms ease,
            border-color 300ms ease,
            background 300ms ease;
        }

        .footer-metric:hover {
          transform:
            translateY(-3px);

          border-color:
            rgba(56,189,248,0.18);

          background:
            rgba(56,189,248,0.035);
        }

        /* =========================================================
           GIANT WORDMARK
           ========================================================= */

        .footer-giant-word {
          z-index: 0;

          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 35%,
              transparent 100%
            );

          -webkit-mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 35%,
              transparent 100%
            );
        }

        /* =========================================================
           MOBILE
           ========================================================= */

        @media (max-width: 640px) {
          .footer-grid {
            background-size:
              48px 48px;
          }

          .footer-giant-word {
            bottom: -20px;

            font-size: 25vw;
          }

          .footer-particle {
            opacity: 0.5;
          }

          .footer-corner {
            width: 12px;
            height: 12px;
          }

          .footer-corner-tl {
            left: 12px;
            top: 12px;
          }

          .footer-corner-tr {
            right: 12px;
            top: 12px;
          }

          .footer-corner-bl {
            left: 12px;
            bottom: 12px;
          }

          .footer-corner-br {
            right: 12px;
            bottom: 12px;
          }
        }

        /* =========================================================
           REDUCED MOTION
           ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .footer-orb-one,
          .footer-orb-two,
          .footer-orb-three,
          .footer-light-beam,
          .footer-live-dot,
          .footer-particle,
          .footer-grid {
            animation: none !important;
          }

          .footer-cta-card,
          .footer-social,
          .footer-logo-box,
          .footer-metric {
            transition: none !important;
          }
        }
      `}</style>
    </footer>
  );
}

/* =============================================================
   FOOTER COLUMN
   ============================================================= */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      {/* Heading */}
      <div className="flex items-center gap-3">
        <span
          className="
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-400
            shadow-[0_0_10px_rgba(34,211,238,0.8)]
          "
        />

        <h3
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.22em]
            text-slate-400
          "
        >
          {title}
        </h3>
      </div>

      {/* Accent line */}
      <div
        className="
          mt-4
          h-px
          w-8
          bg-gradient-to-r
          from-cyan-400
          to-indigo-500
        "
      />

      {/* Links */}
      <ul className="mt-6 space-y-3.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              prefetch
              className="
                footer-column-link
                group
                inline-flex
                items-center
                text-sm
                font-medium
                text-slate-500
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-white
              "
            >
              {/* Indicator */}
              <span
                className="
                  mr-2.5
                  h-1
                  w-1
                  rounded-full
                  bg-cyan-400
                  opacity-0
                  shadow-[0_0_8px_rgba(34,211,238,0.8)]
                  transition-all
                  duration-300
                  group-hover:opacity-100
                "
              />

              {/* Label */}
              <span>{link.label}</span>

              {/* Arrow */}
              <span
                className="
                  ml-2
                  -translate-x-2
                  text-cyan-400
                  opacity-0
                  transition-all
                  duration-300
                  group-hover:translate-x-0
                  group-hover:opacity-100
                "
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =============================================================
   FOOTER METRIC
   ============================================================= */

function FooterMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        footer-metric
        flex
        min-w-[120px]
        items-center
        gap-3
        rounded-xl
        border
        border-white/[0.07]
        bg-white/[0.02]
        px-3.5
        py-3
      "
    >
      <span
        className="
          text-[10px]
          font-black
          tracking-[0.08em]
          text-cyan-400
        "
      >
        {value}
      </span>

      <span
        className="
          text-[9px]
          font-bold
          uppercase
          tracking-[0.12em]
          text-slate-500
        "
      >
        {label}
      </span>
    </div>
  );
}