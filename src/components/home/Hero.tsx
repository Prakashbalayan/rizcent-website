import Link from "next/link";

export default function Hero() {
  return (
    <section className="rz-hero">
      {/* Background */}
      <div className="rz-hero-grid" />

      <div className="rz-hero-glow rz-hero-glow-1" />
      <div className="rz-hero-glow rz-hero-glow-2" />
      <div className="rz-hero-glow rz-hero-glow-3" />

      {/* Atmospheric light */}
      <div className="rz-hero-light rz-hero-light-1" />
      <div className="rz-hero-light rz-hero-light-2" />

      {/* Floating particles */}
      <div className="rz-particles" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="rz-hero-container">
        {/* =====================================================
            LEFT SIDE
        ===================================================== */}
        <div className="rz-hero-copy">
          <div className="rz-hero-badge">
            <span className="rz-badge-dot" />
            TECHNOLOGY & CYBERSECURITY
          </div>

          <h1 className="rz-hero-title">
            Building digital
            <br />
            products.
            <br />
            <span className="rz-gradient-title">
              Securing digital
              <br />
              businesses.
            </span>
          </h1>

          <p className="rz-hero-description">
            Rizcent Technologies builds modern digital products and helps
            businesses protect their technology with practical, security-first
            solutions.
          </p>

          <div className="rz-hero-actions">
            <Link
              href="/request-quote"
              className="rz-button rz-button-primary rz-hero-main-button"
            >
              <span className="rz-button-shine" />

              <span className="rz-button-content">
                <span className="rz-button-label">Get Started</span>

                <span className="rz-button-arrow">→</span>
              </span>
            </Link>

            <Link
              href="/services"
              className="rz-button rz-button-secondary rz-hero-secondary-button"
            >
              <span className="rz-button-content">
                <span className="rz-button-label">Explore Services</span>

                <span className="rz-button-arrow">↗</span>
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="rz-hero-trust">
            <div className="rz-trust-mini">
              <span className="rz-trust-mini-icon">✓</span>

              <div>
                <strong>Security First</strong>
                <span>Built into every solution</span>
              </div>
            </div>

            <div className="rz-trust-divider" />

            <div className="rz-trust-mini">
              <span className="rz-trust-mini-icon">⚡</span>

              <div>
                <strong>Production Ready</strong>
                <span>Designed to scale</span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT SIDE — TECHNOLOGY VISUAL
        ===================================================== */}
        <div className="rz-hero-visual">
          <div className="rz-visual-glow" />

          {/* Orbit system */}
          <div className="rz-orbit rz-orbit-1" />
          <div className="rz-orbit rz-orbit-2" />
          <div className="rz-orbit rz-orbit-3" />
          <div className="rz-orbit rz-orbit-4" />

          {/* Orbit points */}
          <div className="rz-orbit-dot rz-orbit-dot-1" />
          <div className="rz-orbit-dot rz-orbit-dot-2" />
          <div className="rz-orbit-dot rz-orbit-dot-3" />

          {/* =================================================
              MAIN RIZCENT CORE
          ================================================= */}
          <div className="rz-core">
            <div className="rz-core-back" />

            <div className="rz-core-depth rz-core-depth-1" />
            <div className="rz-core-depth rz-core-depth-2" />
            <div className="rz-core-depth rz-core-depth-3" />

            <div className="rz-core-face">
              <div className="rz-core-inner-glow" />

              <div className="rz-core-logo">
                <img
                  src="/rizcent-logo.png"
                  alt="Rizcent Technology & Solutions"
                />
              </div>

              <div className="rz-core-company">Rizcent</div>

              <div className="rz-core-subtitle">SECURE TECHNOLOGY</div>

              <div className="rz-core-status">
                <span />
                SYSTEMS PROTECTED
              </div>
            </div>
          </div>

          {/* =================================================
              SECURITY CARD
          ================================================= */}
          <div className="rz-floating-card rz-security-card">
            <div className="rz-card-heading">
              <span>SECURITY</span>
              <i className="rz-live-dot" />
            </div>

            <div className="rz-security-content">
              <div className="rz-security-icon">✓</div>

              <div>
                <strong>Protected</strong>
                <span>Security active</span>
              </div>
            </div>

            <div className="rz-risk-bar">
              <span />
            </div>

            <div className="rz-risk-footer">
              <span>Risk</span>
              <strong>Low</strong>
            </div>
          </div>

          {/* =================================================
              ENGINEERING CARD
          ================================================= */}
          <div className="rz-floating-card rz-engineering-card">
            <div className="rz-card-heading">
              <span>ENGINEERING</span>

              <span className="rz-card-live">LIVE</span>
            </div>

            <div className="rz-engineering-main">
              <div className="rz-engineering-icon">↗</div>

              <div>
                <strong>
                  Production
                  <br />
                  Ready
                </strong>

                <span>Built to scale</span>
              </div>
            </div>

            <div className="rz-mini-chart">
              <span style={{ height: "25%" }} />
              <span style={{ height: "40%" }} />
              <span style={{ height: "34%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "46%" }} />
              <span style={{ height: "69%" }} />
              <span style={{ height: "63%" }} />
              <span style={{ height: "82%" }} />
            </div>
          </div>

          {/* =================================================
              CLOUD CARD
          ================================================= */}
          <div className="rz-floating-card rz-cloud-card">
            <div className="rz-cloud-icon">☁</div>

            <div>
              <span>INFRASTRUCTURE</span>
              <strong>Cloud Online</strong>
            </div>

            <div className="rz-cloud-status">99.98%</div>
          </div>

          {/* =================================================
              CODE TERMINAL
          ================================================= */}
          <div className="rz-terminal">
            <div className="rz-terminal-top">
              <div className="rz-terminal-dots">
                <span />
                <span />
                <span />
              </div>

              <span>rizcent.system</span>
            </div>

            <div className="rz-terminal-body">
              <p>
                <em>01</em>{" "}
                <b>const</b>{" "}
                security ={" "}
                <strong>protected</strong>
              </p>

              <p>
                <em>02</em>{" "}
                <b>const</b>{" "}
                system ={" "}
                <strong>online</strong>
              </p>

              <p>
                <em>03</em>{" "}
                <b>deploy</b>
                <span className="rz-terminal-green">
                  {" "}
                  ✓ success
                </span>
              </p>
            </div>
          </div>

          {/* Energy points */}
          <div className="rz-energy-point" />
          <div className="rz-blue-point" />

          {/* Small interface markers */}
          <div className="rz-visual-marker rz-visual-marker-1">
            <span />
            CORE
          </div>

          <div className="rz-visual-marker rz-visual-marker-2">
            SYSTEM ONLINE
          </div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="rz-scroll-cue">
        <span className="rz-scroll-line" />
        SCROLL TO EXPLORE
      </div>
    </section>
  );
}