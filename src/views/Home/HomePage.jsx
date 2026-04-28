import "./Home.css";

/**
 * VIEW LAYER — HomePage
 * Hiển thị trang chủ profile với đầy đủ các section:
 * Hero → Quick Intro → Highlight Cards → Featured Project → CTA
 */
export default function HomePage({ controller }) {
  const {
    profile,
    handleTabChange,
    hoveredCard,
    handleCardHover,
    handleCardLeave,
    getHighlightCards,
  } = controller;

  const highlights = getHighlightCards();

  return (
    <div className="home-page">
      {/* ══════════════════════════════
          1. HERO SECTION
      ══════════════════════════════ */}
      <section className="hero-section" aria-labelledby="hero-name">
        <div className="hero-inner">
          {/* ── Text Left ── */}
          <div className="hero-text">
            <h1 className="hero-name animate-fade-up delay-1" id="hero-name">
              {profile.personal.name}
            </h1>

            <p className="hero-tagline animate-fade-up delay-2">
              <span className="gradient-text">Developer</span>
              <span className="tagline-separator" />
              <span style={{ color: "var(--accent-light)" }}>Fullstack</span>
            </p>

            <p className="hero-bio animate-fade-up delay-3">
              {profile.personal.bio}
            </p>

            {/* Stats row */}
            <div className="hero-stats animate-fade-up delay-3">
              <div className="hero-stat">
                <span className="hero-stat-num">3+</span>
                <span className="hero-stat-label">Năm học</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">10+</span>
                <span className="hero-stat-label">Dự án</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-num">3.6</span>
                <span className="hero-stat-label">GPA</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="hero-actions animate-fade-up delay-4">
              <button
                id="hero-view-projects"
                className="hero-btn-primary"
                onClick={() => handleTabChange("projects")}
              >
                Xem dự án
                <span className="arrow-icon">→</span>
              </button>
              <button
                id="hero-contact"
                className="hero-btn-secondary"
                onClick={() => handleTabChange("contact")}
              >
                📬 Liên hệ với mình
              </button>
            </div>
          </div>

          {/* ── Visual Right ── */}
          <div className="hero-visual animate-fade-right">
            <div className="hero-ring hero-ring-1" aria-hidden="true" />
            <div className="hero-ring hero-ring-2" aria-hidden="true" />
            <div className="hero-glow" aria-hidden="true" />

            {/* Floating skill badges */}
            <div
              className="hero-float-badge hero-float-badge-1"
              aria-hidden="true"
            >
              ⚛️ React Dev
            </div>
            <div
              className="hero-float-badge hero-float-badge-2"
              aria-hidden="true"
            >
              🎨 UI Design
            </div>
            <div
              className="hero-float-badge hero-float-badge-3"
              aria-hidden="true"
            >
              🔥 3.6 GPA
            </div>

            {/* Avatar card */}
            <div className="hero-avatar-card">
              <img
                src={profile.personal.avatar}
                alt={`Ảnh đại diện của ${profile.personal.name}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          2. QUICK INTRO
      ══════════════════════════════ */}
      <section
        className="section-container"
        aria-labelledby="quick-intro-title"
      >
        <h2 className="section-title" id="quick-intro-title">
          Giới thiệu <span className="gradient-text">nhanh</span>
        </h2>

        <div className="quick-intro-grid">
          {/* Bio card */}
          <div className="intro-card animate-fade-up">
            <div className="intro-card-header">
              <div
                className="intro-card-icon"
                style={{ background: "rgba(91,127,255,0.12)" }}
              >
                👋
              </div>
              <p className="intro-card-title">Về mình</p>
            </div>
            <p className="intro-main-text">
              Mình là <strong>{profile.personal.name}</strong>, sinh viên năm{" "}
              <strong>3 ngành Công nghệ Thông tin</strong> tại{" "}
              <strong>{profile.education.school}</strong>.
              <br />
              <br />
              Mình đang theo hướng <strong>Web Development</strong> với trọng
              tâm là Frontend và trải nghiệm người dùng. Điều mình thích nhất là
              biến ý tưởng thành giao diện đẹp và có chiều sâu.
              <br />
              <br />
              Hiện tại mình đang học <strong>React, Node.js</strong> và xây dựng
              portfolio để chuẩn bị cho cơ hội thực tập.
            </p>
          </div>

          {/* Skills card */}
          <div className="intro-card animate-fade-up delay-2">
            <div className="intro-card-header">
              <div
                className="intro-card-icon"
                style={{ background: "rgba(168,85,247,0.12)" }}
              >
                ⚡
              </div>
              <p className="intro-card-title">Kỹ năng chính</p>
            </div>
            <div className="skill-bars">
              {profile.skills.map((skill) => (
                <div key={skill.name} className="skill-bar-item">
                  <div className="skill-bar-header">
                    <span>{skill.name}</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skill.color}99, ${skill.color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          3. HIGHLIGHT CARDS
      ══════════════════════════════ */}
      <section className="highlight-section" aria-labelledby="highlight-title">
        <div className="highlight-inner">
          <h2 className="section-title" id="highlight-title">
            Khám phá <span className="gradient-text">thêm về mình</span>
          </h2>

          <div className="highlight-grid">
            {highlights.map((card, i) => (
              <button
                key={card.id}
                id={`highlight-${card.id}`}
                className={`highlight-card animate-fade-up delay-${i + 1}`}
                style={{ "--card-color": card.color }}
                onClick={() => handleTabChange(card.tab)}
                onMouseEnter={() => handleCardHover(card.id)}
                onMouseLeave={handleCardLeave}
                aria-label={`${card.title}: ${card.value}`}
              >
                {/* Glow blob */}
                <div
                  className="highlight-card-glow"
                  style={{ background: card.color }}
                />

                {/* Before gradient on hover */}
                <style>{`
                  #highlight-${card.id}::before {
                    background: linear-gradient(135deg, ${card.color}0d, transparent);
                  }
                `}</style>

                {/* Icon */}
                <div
                  className="highlight-card-icon"
                  style={{
                    background: `${card.color}1a`,
                    border: `1px solid ${card.color}33`,
                  }}
                >
                  {card.icon}
                </div>

                <p className="highlight-card-title">{card.title}</p>
                <p className="highlight-card-value">{card.value}</p>
                <p className="highlight-card-sub">{card.sub}</p>

                {/* Arrow */}
                <div
                  className="highlight-card-arrow"
                  style={{ background: `${card.color}22`, color: card.color }}
                >
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          4. FEATURED PROJECT
      ══════════════════════════════ */}
      <section className="featured-section" aria-labelledby="featured-title">
        <div className="featured-inner">
          <h2
            className="section-title"
            id="featured-title"
            style={{ marginBottom: "32px" }}
          >
            Project <span className="gradient-text">tự hào nhất</span>
          </h2>

          <div className="featured-card animate-fade-up">
            {/* Content */}
            <div className="featured-content">
              <div className="featured-badge">⭐ Featured Project</div>

              <h3 className="featured-title gradient-text">
                {profile.featuredProject.name}
              </h3>

              <p className="featured-desc">
                {profile.featuredProject.description}
              </p>

              <div className="featured-tags">
                {profile.featuredProject.tags.map((tag) => (
                  <span key={tag} className="featured-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                id="featured-view-project"
                className="featured-link"
                onClick={() => handleTabChange("projects")}
              >
                Xem chi tiết
                <span className="arrow-icon">→</span>
              </button>
            </div>

            {/* Stats visual */}
            <div className="featured-visual" aria-hidden="true">
              <div className="featured-stat-card">
                <span className="featured-stat-card-num">
                  ⭐{profile.featuredProject.stars}
                </span>
                <span className="featured-stat-card-label">GitHub Stars</span>
              </div>
              <div className="featured-stat-card">
                <span className="featured-stat-card-num">Full</span>
                <span className="featured-stat-card-label">Stack Project</span>
              </div>
              <div className="featured-stat-card">
                <span className="featured-stat-card-num">4</span>
                <span className="featured-stat-card-label">Technologies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          5. CALL TO ACTION
      ══════════════════════════════ */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="cta-inner">
          <div className="cta-card animate-fade-up">
            <span className="cta-emoji" role="img" aria-label="rocket">
              🚀
            </span>
            <h2 className="cta-title" id="cta-title">
              Muốn biết thêm về <span className="gradient-text">mình</span>?
            </h2>
            <p className="cta-desc">
              Xem thêm về dự án, học vấn, sở thích của mình — hoặc liên hệ trực
              tiếp để cùng nhau tạo ra điều gì đó thú vị!
            </p>
            <div className="cta-actions">
              <button
                id="cta-about"
                className="hero-btn-primary"
                onClick={() => handleTabChange("education")}
              >
                Xem thêm về mình
                <span className="arrow-icon">→</span>
              </button>
              <button
                id="cta-contact"
                className="hero-btn-secondary"
                onClick={() => handleTabChange("contact")}
              >
                📬 Liên hệ với mình
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
