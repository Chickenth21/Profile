import { useState, useRef, useEffect, useCallback } from "react";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "intro", label: "Giới thiệu" },
  { id: "explore", label: "Khám phá" },
  { id: "project", label: "Project" },
  { id: "cta", label: "Liên hệ" },
];

export default function HomePage({ controller }) {
  const { profile, handleTabChange, getHighlightCards } = controller;
  const highlights = getHighlightCards();

  // Scroll-snap: track active section
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = useCallback((idx) => {
    const el = containerRef.current?.children[idx];
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      const h = container.clientHeight;
      const idx = Math.round(container.scrollTop / h);
      setActiveSection(Math.max(0, Math.min(idx, SECTIONS.length - 1)));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* ── shared styles ── */
  const wrap = "max-w-[1100px] mx-auto px-4 md:px-8";
  const card =
    "rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20";

  return (
    <>
      {/* ── Font + keyframe injection ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

        @keyframes rise  { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes sslow { to{transform:rotate(360deg)} }
        @keyframes srev  { to{transform:rotate(-360deg)} }
        @keyframes bar   { from{width:0} }
        @keyframes pglow { 0%,100%{opacity:.12} 50%{opacity:.22} }

        .anim-rise { animation: rise .65s cubic-bezier(.22,.68,0,1.2) both }
        .d1{animation-delay:.05s} .d2{animation-delay:.15s} .d3{animation-delay:.25s}
        .d4{animation-delay:.35s} .d5{animation-delay:.45s} .d6{animation-delay:.55s}

        .drift { animation: drift 4s ease-in-out infinite }
        .sslow { animation: sslow 20s linear infinite }
        .srev  { animation: srev  14s linear infinite }
        .pglow { animation: pglow 6s ease-in-out infinite }
        .bar-fill { animation: bar 1.2s cubic-bezier(.4,0,.2,1) .5s both }

        .grad-text {
          background: linear-gradient(120deg,#6cbcff,#b388ff);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .sec-num {
          font-family:'Playfair Display',Georgia,serif;
          font-size:130px; font-weight:900; font-style:italic;
          position:absolute; right:0; top:-48px;
          color:rgba(255,255,255,0.025);
          pointer-events:none; user-select:none; line-height:1;
        }
        .skill-track { height:3px; border-radius:99px; background:rgba(255,255,255,0.06); overflow:hidden; }
        .font-display { font-family:'Playfair Display',Georgia,serif }
        .font-mono-dm { font-family:'DM Mono',monospace }
        .font-sans-dm { font-family:'DM Sans',sans-serif }
        .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }

        /* ── Responsive scroll-snap ── */
        /* Mobile: natural scroll, sections can grow */
        .snap-wrap {
          height: auto;
          overflow-y: auto;
          overflow-x: hidden;
          scroll-snap-type: none;
        }
        .snap-sec {
          min-height: 100svh;
          height: auto;
          scroll-snap-align: none;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        /* Desktop: full snap experience */
        @media (min-width: 768px) {
          .snap-wrap {
            height: calc(100vh - 88px);
            overflow-y: scroll;
            overflow-x: hidden;
            scroll-snap-type: y mandatory;
            scroll-behavior: smooth;
          }
          .snap-sec {
            min-height: unset;
            height: 100vh;
            scroll-snap-align: start;
          }
        }
      `}</style>

      {/* ── Dot navigator (desktop only) ── */}
      <nav
        aria-label="Section navigation"
        className="fixed right-5 top-1/2 z-50 hidden md:flex flex-col gap-3"
        style={{ transform: "translateY(-50%)" }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollToSection(i)}
            title={s.label}
            aria-label={`Đến phần ${s.label}`}
            style={{
              width: activeSection === i ? 10 : 6,
              height: activeSection === i ? 10 : 6,
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              background:
                activeSection === i
                  ? "linear-gradient(135deg,#6cbcff,#b388ff)"
                  : "rgba(255,255,255,0.25)",
              boxShadow:
                activeSection === i ? "0 0 8px rgba(108,188,255,0.6)" : "none",
              padding: 0,
            }}
          />
        ))}
      </nav>

      {/* ── Scroll container ── */}
      <div
        ref={containerRef}
        className="font-sans-dm text-white/80 hide-scrollbar snap-wrap"
      >
        {/* ════ 1. HERO ════ */}
        <section className="snap-sec">
          {/* bg blobs */}
          <div className="pglow pointer-events-none absolute -left-40 -top-24 h-[500px] w-[500px] rounded-full bg-cyan-400 blur-[100px] opacity-[0.06]" />
          <div
            className="pglow pointer-events-none absolute -right-24 top-48 h-[380px] w-[380px] rounded-full bg-violet-400 blur-[100px] opacity-[0.06]"
            style={{ animationDelay: "3s" }}
          />

          <div className={`${wrap} w-full`}>
            <div className="flex flex-col items-center gap-14 md:flex-row md:gap-16">
              {/* ── Text ── */}
              <div className="flex flex-1 flex-col gap-6">
                {/* name */}
                <h1 className="anim-rise d2 font-display text-[clamp(48px,7vw,80px)] font-black leading-[1.06] -tracking-[0.5px] text-white">
                  {profile.personal.name}
                </h1>

                {/* role */}
                <div className="anim-rise d3 flex items-center gap-3">
                  <span className="font-sans-dm text-[17px] font-medium text-cyan-400">
                    Fullstack Developer
                  </span>
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/30" />
                  <span className="font-sans-dm text-[15px] font-light text-white/40">
                    UI/UX Enthusiast
                  </span>
                </div>

                {/* bio */}
                <p className="anim-rise d3 max-w-[440px] text-[15px] leading-[1.8] text-white/50">
                  {profile.personal.bio}
                </p>

                {/* stats */}
                <div className="anim-rise d4 mt-1 flex items-center">
                  {[
                    { num: "3+", label: "Năm học" },
                    { num: "10+", label: "Dự án" },
                    { num: "3.6", label: "GPA" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center">
                      {i > 0 && (
                        <div className="mx-7 h-11 w-px bg-white/[0.08]" />
                      )}
                      <div>
                        <div className="font-display text-[28px] font-black text-white">
                          {s.num}
                        </div>
                        <div className="font-mono-dm mt-0.5 text-[11px] uppercase tracking-[0.12em] text-white/40">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* buttons */}
                <div className="anim-rise d5 mt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleTabChange("projects")}
                    className="font-sans-dm flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(108,188,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,188,255,0.4)]"
                  >
                    Xem dự án <span>→</span>
                  </button>
                  <button
                    onClick={() => handleTabChange("contact")}
                    className="font-sans-dm flex items-center gap-2 rounded-full border border-white/[0.1] bg-transparent px-7 py-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/[0.04]"
                  >
                    📬 Liên hệ
                  </button>
                </div>
              </div>

              {/* ── Avatar ── */}
              <div className="anim-rise d6 relative flex h-[340px] w-[300px] flex-shrink-0 items-center justify-center">
                {/* orbit rings */}
                <div className="sslow absolute h-[300px] w-[300px] rounded-full border border-cyan-400/[0.13]" />
                <div className="srev  absolute h-[220px] w-[220px] rounded-full border border-violet-400/[0.10]" />
                {/* center glow */}
                <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-cyan-400 blur-[60px] opacity-[0.10]" />

                {/* floating badges */}
                {[
                  {
                    text: "🎮 Gaming",
                    top: -20,
                    left: -40,
                    bottom: "auto",
                    right: "auto",
                    delay: "0s",
                  },
                  {
                    text: "🎵 Âm nhạc",
                    top: "auto",
                    left: -28,
                    bottom: -4,
                    right: "auto",
                    delay: "0.9s",
                  },
                  {
                    text: "🌸 Anime",
                    top: 40,
                    left: "auto",
                    bottom: "auto",
                    right: -52,
                    delay: "1.7s",
                  },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="drift absolute whitespace-nowrap rounded-full border border-cyan-400/20 bg-white/[0.06] px-3.5 py-1.5 font-sans-dm text-[12px] font-semibold text-white backdrop-blur-sm"
                    style={{
                      top: b.top,
                      left: b.left,
                      bottom: b.bottom,
                      right: b.right,
                      animationDelay: b.delay,
                    }}
                  >
                    {b.text}
                  </div>
                ))}

                {/* avatar */}
                <div className="relative h-[250px] w-[210px] overflow-hidden rounded-3xl border border-cyan-400/20 shadow-[0_0_48px_rgba(108,188,255,0.14)]">
                  <img
                    src={profile.personal.avatar}
                    alt={`Ảnh đại diện của ${profile.personal.name}`}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ 2. QUICK INTRO ════ */}
        <section className="snap-sec py-8 md:py-0">
          <div className={`${wrap} w-full relative`}>
            <span className="sec-num">02</span>

            <div className="mb-12">
              <h2 className="font-display text-[clamp(30px,4vw,44px)] font-bold leading-tight text-white">
                Giới thiệu <span className="grad-text">nhanh</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Bio card */}
              <div className={`anim-rise d1 ${card} p-8`}>
                <div className="mb-6 flex items-center gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] border border-cyan-400/20 bg-cyan-400/10 text-xl">
                    👋
                  </div>
                  <div>
                    <p className="font-sans-dm text-[15px] font-semibold text-white">
                      Về mình
                    </p>
                    <p className="font-mono-dm mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/35">
                      Introduction
                    </p>
                  </div>
                </div>
                <div className="mb-6 h-px w-full bg-white/[0.06]" />
                <p className="font-sans-dm text-[14px] leading-[1.85] text-white/50">
                  Mình là{" "}
                  <strong className="font-semibold text-white">
                    {profile.personal.name}
                  </strong>
                  , sinh viên năm{" "}
                  <strong className="font-semibold text-white">
                    3 ngành Công nghệ Thông tin
                  </strong>{" "}
                  tại{" "}
                  <strong className="font-semibold text-white">
                    {profile.education?.school}
                  </strong>
                  .
                  <br />
                  <br />
                  Mình theo hướng{" "}
                  <strong className="font-medium text-cyan-400">
                    Web Development
                  </strong>{" "}
                  với trọng tâm là Frontend và trải nghiệm người dùng.
                  <br />
                  <br />
                  Hiện tại mình đang học{" "}
                  <strong className="font-semibold text-white">
                    React, Node.js
                  </strong>{" "}
                  và xây dựng portfolio để chuẩn bị cho cơ hội thực tập.
                </p>
              </div>

              {/* Skills card */}
              <div className={`anim-rise d2 ${card} p-8`}>
                <div className="mb-6 flex items-center gap-3.5">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] border border-violet-400/20 bg-violet-400/10 text-xl">
                    ⚡
                  </div>
                  <div>
                    <p className="font-sans-dm text-[15px] font-semibold text-white">
                      Kỹ năng chính
                    </p>
                    <p className="font-mono-dm mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/35">
                      Core Skills
                    </p>
                  </div>
                </div>
                <div className="mb-6 h-px w-full bg-white/[0.06]" />
                <div className="flex flex-col gap-4">
                  {profile.skills?.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="font-sans-dm text-[13px] font-medium text-white/75">
                          {skill.name}
                        </span>
                        <span
                          className="font-mono-dm text-[11px]"
                          style={{ color: skill.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skill-track">
                        <div
                          className="bar-fill h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg,${skill.color}66,${skill.color})`,
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

        {/* ════ 3. HIGHLIGHT CARDS ════ */}
        <section className="snap-sec py-8 md:py-0">
          <div className={`${wrap} w-full relative`}>
            <span className="sec-num">03</span>

            <div className="mb-12">
              <h2 className="font-display text-[clamp(30px,4vw,44px)] font-bold leading-tight text-white">
                Thêm về <span className="grad-text">mình</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {highlights.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.tab)}
                  className={`anim-rise d${i + 1} ${card} relative overflow-hidden p-7 pb-14 text-left`}
                >
                  {/* color glow */}
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-[40px]"
                    style={{ background: item.color, opacity: 0.18 }}
                  />
                  {/* icon */}
                  <div
                    className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-[22px]"
                    style={{
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.icon}
                  </div>

                  <p className="font-mono-dm mb-1.5 text-[10px] uppercase tracking-[0.13em] text-white/40">
                    {item.title}
                  </p>
                  <p className="font-display mb-1 text-[26px] font-bold text-white">
                    {item.value}
                  </p>
                  <p className="font-sans-dm text-[13px] text-white/45">
                    {item.sub}
                  </p>

                  <div
                    className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: `${item.color}22`, color: item.color }}
                  >
                    →
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ════ 4. FEATURED PROJECT ════ */}
        <section className="snap-sec py-8 md:py-0">
          <div className={`${wrap} w-full relative`}>
            <span className="sec-num">04</span>

            <div className="mb-12">
              <h2 className="font-display text-[clamp(30px,4vw,44px)] font-bold leading-tight text-white">
                Project <span className="grad-text">tự hào nhất</span>
              </h2>
            </div>

            <div
              className={`anim-rise d1 ${card} relative overflow-hidden p-10 md:p-12`}
            >
              <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-400 blur-[100px] opacity-[0.05]" />

              <div className="flex flex-col gap-10 md:flex-row md:items-start">
                {/* Left */}
                <div className="flex flex-1 flex-col gap-5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono-dm rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-cyan-400">
                      ⭐ Featured
                    </span>
                    <span className="font-mono-dm text-[10px] uppercase tracking-[0.12em] text-white/35">
                      Project
                    </span>
                  </div>

                  <h3 className="font-display grad-text text-[clamp(20px,3vw,28px)] font-bold">
                    {profile.featuredProject?.name}
                  </h3>

                  <p className="font-sans-dm text-[14px] leading-[1.8] text-white/50">
                    {profile.featuredProject?.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {profile.featuredProject?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="font-sans-dm rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div>
                    <button
                      onClick={() => handleTabChange("projects")}
                      className="font-sans-dm flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(108,188,255,0.25)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Xem chi tiết <span>→</span>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-row gap-3 md:w-36 md:flex-col">
                  {[
                    {
                      num: `⭐ ${profile.featuredProject?.stars}`,
                      label: "GitHub Stars",
                    },
                    { num: "Fullstack", label: "Project Type" },
                    { num: "4 Tech", label: "Technologies" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center"
                    >
                      <div className="font-display text-[17px] font-bold text-white">
                        {s.num}
                      </div>
                      <div className="font-mono-dm mt-1 text-[10px] uppercase tracking-[0.1em] text-white/35">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════ 5. CTA ════ */}
        <section className="snap-sec py-8 md:py-0 justify-center">
          <div className={`${wrap} w-full`}>
            <div
              className={`anim-rise d1 ${card} relative overflow-hidden rounded-3xl px-8 py-20 text-center`}
            >
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/[0.05] to-violet-400/[0.05]" />
              <div className="absolute left-1/2 top-0 h-px w-28 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

              <div className="mb-5 text-5xl">🚀</div>

              <h2 className="font-display mb-4 text-[clamp(26px,4vw,40px)] font-bold text-white">
                Muốn biết thêm về <span className="grad-text">mình</span>?
              </h2>

              <p className="font-sans-dm mx-auto mb-9 max-w-[400px] text-[15px] leading-[1.8] text-white/45">
                Xem thêm về dự án, học vấn, sở thích — hoặc liên hệ trực tiếp để
                cùng tạo ra điều gì đó thú vị!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => handleTabChange("education")}
                  className="font-sans-dm flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_rgba(108,188,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(108,188,255,0.4)]"
                >
                  Xem thêm về mình <span>→</span>
                </button>
                <button
                  onClick={() => handleTabChange("contact")}
                  className="font-sans-dm flex items-center gap-2 rounded-full border border-white/[0.1] bg-transparent px-7 py-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-white/[0.04]"
                >
                  📬 Liên hệ với mình
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
