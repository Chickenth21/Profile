/**
 * VIEW LAYER — HomePage (Tailwind v4)
 * Mỗi section dùng pattern: section > div.container > content
 */
export default function HomePage({ controller }) {
  const { profile, handleTabChange, getHighlightCards } = controller;
  const highlights = getHighlightCards();

  const sectionClass = "relative z-[1] py-20 px-6";
  const containerClass = "max-w-6xl mx-auto";

  return (
    <div className="relative z-[1]">
      {/* ══ 1. HERO ══ */}
      <section
        className={`${sectionClass} min-h-screen flex items-center`}
        aria-labelledby="hero-name"
      >
        <div
          className={`${containerClass} w-full flex flex-col md:flex-row items-center gap-12 md:gap-20`}
        >
          {/* Text */}
          <div className="flex-1 flex flex-col gap-6">
            <h1
              id="hero-name"
              className="animate-fade-up delay-1 text-5xl md:text-6xl font-extrabold leading-tight"
              style={{
                color: "var(--text-heading)",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              {profile.personal.name}
            </h1>

            <p className="animate-fade-up delay-2 flex items-center gap-3 text-xl font-semibold">
              <span className="gradient-text">Developer</span>
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--color-accent)",
                  flexShrink: 0,
                }}
              />
              <span style={{ color: "var(--color-accent-light)" }}>
                Fullstack
              </span>
            </p>

            <p
              className="animate-fade-up delay-3 text-base leading-relaxed"
              style={{ color: "var(--text-muted)", maxWidth: 440 }}
            >
              {profile.personal.bio}
            </p>

            {/* Stats */}
            <div className="animate-fade-up delay-3 flex items-center gap-0 mt-2">
              {[
                { num: "3+", label: "Năm học" },
                { num: "10+", label: "Dự án" },
                { num: "3.6", label: "GPA" },
              ].map((s, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <div
                      style={{
                        width: 1,
                        height: 40,
                        background: "var(--border)",
                        margin: "0 24px",
                      }}
                    />
                  )}
                  <div className="flex flex-col">
                    <span
                      className="font-extrabold text-2xl"
                      style={{
                        color: "var(--text-heading)",
                        fontFamily: "'Outfit',sans-serif",
                      }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="animate-fade-up delay-4 flex items-center gap-4 flex-wrap mt-2">
              <button
                id="hero-view-projects"
                onClick={() => handleTabChange("projects")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary),var(--color-accent))",
                  boxShadow: "0 4px 20px rgba(91,127,255,0.35)",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Xem dự án <span>→</span>
              </button>
              <button
                id="hero-contact"
                onClick={() => handleTabChange("contact")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                style={{
                  color: "var(--text-heading)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                📬 Liên hệ với mình
              </button>
            </div>
          </div>

          {/* Avatar Visual */}
          <div
            className="animate-fade-right relative flex items-center justify-center flex-shrink-0"
            style={{ width: 280, height: 320 }}
          >
            {/* Rings */}
            <div
              className="absolute rounded-full border opacity-20 animate-[spin_12s_linear_infinite]"
              style={{
                width: 280,
                height: 280,
                borderColor: "var(--color-primary)",
              }}
            />
            <div
              className="absolute rounded-full border opacity-10 animate-[spin_8s_linear_infinite_reverse]"
              style={{
                width: 220,
                height: 220,
                borderColor: "var(--color-accent)",
              }}
            />
            {/* Glow */}
            <div
              className="absolute rounded-full blur-3xl opacity-20"
              style={{
                width: 200,
                height: 200,
                background: "var(--color-primary)",
              }}
            />

            {/* Floating badges */}
            {[
              { text: "⚛️ React Dev", top: -16, left: -48, delay: "0s" },
              { text: "🎨 UI Design", bottom: -8, left: -32, delay: "0.8s" },
              { text: "🔥 3.6 GPA", top: 32, right: -56, delay: "1.5s" },
            ].map((b, i) => (
              <div
                key={i}
                className="absolute px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border animate-[float_4s_ease-in-out_infinite]"
                style={{
                  top: b.top,
                  left: b.left,
                  bottom: b.bottom,
                  right: b.right,
                  animationDelay: b.delay,
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text-heading)",
                  whiteSpace: "nowrap",
                }}
              >
                {b.text}
              </div>
            ))}

            {/* Avatar */}
            <div
              className="relative rounded-3xl overflow-hidden border-2"
              style={{
                width: 200,
                height: 240,
                borderColor: "var(--border-glow)",
                boxShadow: "0 0 40px rgba(91,127,255,0.2)",
              }}
            >
              <img
                src={profile.personal.avatar}
                alt={`Ảnh đại diện của ${profile.personal.name}`}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. QUICK INTRO ══ */}
      <section className={sectionClass} aria-labelledby="quick-intro-title">
        <div className={containerClass}>
          <h2
            id="quick-intro-title"
            className="text-3xl font-extrabold mb-12"
            style={{
              color: "var(--text-heading)",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Giới thiệu <span className="gradient-text">nhanh</span>
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ alignItems: "stretch" }}
          >
            {/* Bio */}
            <div
              className="animate-fade-up p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(91,127,255,0.12)" }}
                >
                  👋
                </div>
                <p
                  className="font-semibold text-base"
                  style={{ color: "var(--text-heading)" }}
                >
                  Về mình
                </p>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Mình là{" "}
                <strong style={{ color: "var(--text-heading)" }}>
                  {profile.personal.name}
                </strong>
                , sinh viên năm{" "}
                <strong style={{ color: "var(--text-heading)" }}>
                  3 ngành Công nghệ Thông tin
                </strong>{" "}
                tại{" "}
                <strong style={{ color: "var(--text-heading)" }}>
                  {profile.education?.school}
                </strong>
                .
                <br />
                <br />
                Mình đang theo hướng{" "}
                <strong style={{ color: "var(--text-heading)" }}>
                  Web Development
                </strong>{" "}
                với trọng tâm là Frontend và trải nghiệm người dùng. Điều mình
                thích nhất là biến ý tưởng thành giao diện đẹp và có chiều sâu.
                <br />
                <br />
                Hiện tại mình đang học{" "}
                <strong style={{ color: "var(--text-heading)" }}>
                  React, Node.js
                </strong>{" "}
                và xây dựng portfolio để chuẩn bị cho cơ hội thực tập.
              </p>
            </div>
            {/* Skills */}
            <div
              className="animate-fade-up delay-2 p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.12)" }}
                >
                  ⚡
                </div>
                <p
                  className="font-semibold text-base"
                  style={{ color: "var(--text-heading)" }}
                >
                  Kỹ năng chính
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {profile.skills?.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5 text-sm">
                      <span style={{ color: "var(--text)" }}>{skill.name}</span>
                      <span style={{ color: skill.color }}>{skill.level}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--surface-hover)" }}
                    >
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg,${skill.color}99,${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. HIGHLIGHT CARDS ══ */}
      <section className={sectionClass} aria-labelledby="highlight-title">
        <div className={containerClass}>
          <h2
            id="highlight-title"
            className="text-3xl font-extrabold mb-12"
            style={{
              color: "var(--text-heading)",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Khám phá <span className="gradient-text">thêm về mình</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {highlights.map((card, i) => (
              <button
                key={card.id}
                id={`highlight-${card.id}`}
                onClick={() => handleTabChange(card.tab)}
                className={`animate-fade-up delay-${i + 1} relative text-left p-7 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: card.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 border flex-shrink-0"
                  style={{
                    background: `${card.color}1a`,
                    borderColor: `${card.color}33`,
                  }}
                >
                  {card.icon}
                </div>
                <p
                  className="text-xs font-bold uppercase mb-1"
                  style={{ color: "var(--text-muted)", letterSpacing: "0.1em" }}
                >
                  {card.title}
                </p>
                <p
                  className="font-extrabold text-2xl mb-1"
                  style={{
                    color: "var(--text-heading)",
                    fontFamily: "'Outfit',sans-serif",
                  }}
                >
                  {card.value}
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {card.sub}
                </p>
                <div
                  className="absolute bottom-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${card.color}22`, color: card.color }}
                >
                  →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. FEATURED PROJECT ══ */}
      <section className={sectionClass} aria-labelledby="featured-title">
        <div className={containerClass}>
          <h2
            id="featured-title"
            className="text-3xl font-extrabold mb-8"
            style={{
              color: "var(--text-heading)",
              fontFamily: "'Outfit',sans-serif",
            }}
          >
            Project <span className="gradient-text">tự hào nhất</span>
          </h2>
          <div
            className="animate-fade-up p-8 md:p-12 rounded-2xl border backdrop-blur-xl flex flex-col md:flex-row gap-10 items-start"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex-1 flex flex-col gap-5">
              <span
                className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: "rgba(91,127,255,0.1)",
                  borderColor: "var(--border-glow)",
                  color: "var(--color-primary-light)",
                }}
              >
                ⭐ Featured Project
              </span>
              <h3
                className="font-extrabold text-2xl gradient-text"
                style={{ fontFamily: "'Outfit',sans-serif" }}
              >
                {profile.featuredProject?.name}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {profile.featuredProject?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.featuredProject?.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      background: "var(--surface-hover)",
                      borderColor: "var(--border)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                id="featured-view-project"
                onClick={() => handleTabChange("projects")}
                className="flex items-center gap-2 w-fit px-5 py-2.5 rounded-full text-sm font-bold text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary),var(--color-accent))",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Xem chi tiết <span>→</span>
              </button>
            </div>
            <div className="flex flex-col gap-4" style={{ minWidth: 140 }}>
              {[
                {
                  num: `⭐${profile.featuredProject?.stars}`,
                  label: "GitHub Stars",
                },
                { num: "Full", label: "Stack Project" },
                { num: "4", label: "Technologies" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl border text-center"
                  style={{
                    background: "var(--surface-hover)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div
                    className="font-extrabold text-lg"
                    style={{
                      color: "var(--text-heading)",
                      fontFamily: "'Outfit',sans-serif",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. CTA ══ */}
      <section className={`${sectionClass} pb-24`} aria-labelledby="cta-title">
        <div className={containerClass}>
          <div
            className="animate-fade-up relative overflow-hidden p-12 rounded-3xl border text-center backdrop-blur-xl"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg,rgba(91,127,255,0.05),rgba(168,85,247,0.05))",
              }}
            />
            <span className="text-5xl block mb-6">🚀</span>
            <h2
              id="cta-title"
              className="font-extrabold text-3xl mb-4"
              style={{
                color: "var(--text-heading)",
                fontFamily: "'Outfit',sans-serif",
              }}
            >
              Muốn biết thêm về <span className="gradient-text">mình</span>?
            </h2>
            <p
              className="text-sm mb-8 mx-auto"
              style={{ color: "var(--text-muted)", maxWidth: 420 }}
            >
              Xem thêm về dự án, học vấn, sở thích — hoặc liên hệ trực tiếp để
              cùng tạo ra điều gì đó thú vị!
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                id="cta-about"
                onClick={() => handleTabChange("education")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white border-none cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary),var(--color-accent))",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                Xem thêm về mình <span>→</span>
              </button>
              <button
                id="cta-contact"
                onClick={() => handleTabChange("contact")}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border cursor-pointer transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                style={{
                  color: "var(--text-heading)",
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  fontFamily: "'Inter',sans-serif",
                }}
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
