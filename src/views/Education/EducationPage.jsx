import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes edu-rise  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes edu-glow  { 0%,100%{opacity:.07} 50%{opacity:.17} }
  @keyframes edu-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes edu-bar   { from{width:0} }
  @keyframes edu-count { from{opacity:0;transform:scale(0.6)} to{opacity:1;transform:scale(1)} }

  .e-rise  { animation: edu-rise  .65s cubic-bezier(.22,.68,0,1.2) both }
  .e-d1{animation-delay:.05s} .e-d2{animation-delay:.15s} .e-d3{animation-delay:.25s}
  .e-d4{animation-delay:.35s} .e-d5{animation-delay:.45s} .e-d6{animation-delay:.55s}
  .e-glow  { animation: edu-glow  5s ease-in-out infinite }
  .e-float { animation: edu-float 5s ease-in-out infinite }
  .e-bar   { animation: edu-bar   1.3s cubic-bezier(.4,0,.2,1) .4s both }

  .e-grad {
    background: linear-gradient(120deg,#6cbcff,#b388ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .e-card {
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }
  .e-card:hover {
    transform: translateY(-4px);
    border-color: rgba(108,188,255,0.2);
    box-shadow: 0 16px 48px rgba(108,188,255,0.08);
  }
  .e-skill-track {
    height: 4px; border-radius: 99px;
    background: rgba(255,255,255,0.06); overflow: hidden;
  }
  .e-timeline-dot {
    width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg,#6cbcff,#b388ff);
    box-shadow: 0 0 10px rgba(108,188,255,0.5);
    margin-top: 4px;
  }
  .e-timeline-line {
    width: 2px; flex-shrink: 0;
    background: linear-gradient(to bottom, rgba(108,188,255,0.4), rgba(179,136,255,0.1));
  }

  [data-theme="light"] .e-card {
    background: rgba(255,255,255,0.62);
    border-color: rgba(91,135,212,0.18);
  }
  [data-theme="light"] .e-card:hover {
    border-color: rgba(91,135,212,0.4);
    box-shadow: 0 16px 48px rgba(91,135,212,0.12);
  }
  [data-theme="light"] .e-grad {
    background: linear-gradient(120deg,#1a65a0,#6d28d9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  [data-theme="light"] .e-skill-track { background: rgba(91,135,212,0.14); }
  [data-theme="light"] .e-timeline-line { background: linear-gradient(to bottom,rgba(26,101,160,0.4),rgba(109,40,217,0.1)); }

  /* Gallery */
  .e-photo {
    border-radius: 16px; overflow: hidden; cursor: pointer;
    border: 1px solid rgba(255,255,255,0.07);
    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
    aspect-ratio: 4/3; position: relative;
  }
  .e-photo:hover { transform: scale(1.03); box-shadow: 0 12px 40px rgba(0,0,0,0.4); border-color: rgba(179,136,255,0.3); }
  .e-photo img { width:100%; height:100%; object-fit:cover; display:block; transition: transform .4s ease; }
  .e-photo:hover img { transform: scale(1.06); }
  .e-photo-overlay {
    position: absolute; inset:0; background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%);
    opacity: 0; transition: opacity .3s ease;
    display: flex; align-items: flex-end; padding: 12px;
  }
  .e-photo:hover .e-photo-overlay { opacity: 1; }

  /* Lightbox */
  .e-lightbox {
    position: fixed; inset: 0; z-index: 999;
    background: rgba(0,0,0,0.92); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; animation: edu-rise .25s ease both;
  }
  .e-lightbox img {
    max-width: 90vw; max-height: 85vh;
    border-radius: 16px; object-fit: contain;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
  }
  .e-lightbox-close {
    position: absolute; top: 20px; right: 24px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; border-radius: 50%; width: 40px; height: 40px;
    cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center;
    transition: background .2s ease;
  }
  .e-lightbox-close:hover { background: rgba(255,255,255,0.2); }
  .e-lightbox-caption {
    position: absolute; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: rgba(0,0,0,0.6); color: #fff; border-radius: 99px;
    padding: 6px 18px; font-size: 13px; white-space: nowrap;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .e-lightbox-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; border-radius: 50%; width: 44px; height: 44px;
    cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center;
    transition: background .2s ease;
  }
  .e-lightbox-nav:hover { background: rgba(255,255,255,0.22); }
  .e-lightbox-prev { left: 20px; }
  .e-lightbox-next { right: 20px; }
`;

const TECH_STACK = [
  { name: "React",       color: "#61dafb", icon: "⚛️" },
  { name: "JavaScript",  color: "#f7df1e", icon: "📜" },
  { name: "Node.js",     color: "#68a063", icon: "🟢" },
  { name: "Java",        color: "#f89820", icon: "☕" },
  { name: "UI/UX",       color: "#a855f7", icon: "🎨" },
  { name: "MongoDB",     color: "#4db33d", icon: "🍃" },
  { name: "Express.js",  color: "#888888", icon: "🚀" },
  { name: "Git",         color: "#f05032", icon: "🐙" },
];

const TIMELINE = [
  {
    year: "2010 – 2019",
    title: "Tiểu học & THCS",
    desc: "Học tập tại Trường TH&THCS Thái Hà. Xây dựng nền tảng kiến thức cơ bản và phát triển tư duy học tập.",
    color: "#6cbcff",
  },
  {
    year: "2019 – 2022",
    title: "Trung học Phổ thông",
    desc: "Tốt nghiệp Trường THPT Thái Phúc. Định hình đam mê với công nghệ và quyết định theo ngành CNTT.",
    color: "#b388ff",
  },
  {
    year: "2022",
    title: "Nhập học Đại học FPT",
    desc: "Nhập học Đại học FPT Hà Nội, ngành Công nghệ Thông tin. Làm quen với lập trình cơ bản và tư duy thuật toán.",
    color: "#34d399",
  },
  {
    year: "2023",
    title: "Khám phá Web Development",
    desc: "Học sâu về HTML, CSS, JavaScript và bắt đầu với React. Hoàn thành các dự án nhóm đầu tiên.",
    color: "#a78bfa",
  },
  {
    year: "2024",
    title: "Fullstack & Dự án thực tế",
    desc: "Phát triển RealERP — hệ thống quản lý bất động sản với React, Node.js, MongoDB. GPA đạt 3.6/4.0.",
    color: "#fb923c",
  },
  {
    year: "2025–2026",
    title: "Tìm kiếm cơ hội",
    desc: "Hoàn thiện portfolio, tìm kiếm vị trí thực tập Fullstack Developer và chuẩn bị tốt nghiệp.",
    color: "#f472b6",
    active: true,
  },
];

export default function EducationPage({ profile }) {
  const { education, skills, specialization } = profile;
  const [lightbox, setLightbox] = useState(null); // { photos, index }
  const photos = education.highSchool?.photos || [];

  const openLightbox = (index) => setLightbox({ photos, index });
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + lb.photos.length) % lb.photos.length }));
  const nextPhoto = () => setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.photos.length }));
  const stats = [
    { num: education.gpa, label: "GPA", sub: "/ 4.0 scale", color: "#6cbcff" },
    { num: "3+",          label: "Năm học", sub: "tại FPT HN", color: "#b388ff" },
    { num: "10+",         label: "Dự án", sub: "hoàn thành", color: "#34d399" },
    { num: "Top 15%",     label: "Xếp hạng", sub: "trong khóa", color: "#fb923c" },
  ];

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="relative z-[1] min-h-screen py-16 px-4 md:px-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* bg blobs */}
        <div className="e-glow pointer-events-none fixed -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400 blur-[120px] opacity-[0.07]" />
        <div className="e-glow pointer-events-none fixed -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-400 blur-[120px] opacity-[0.07]" style={{ animationDelay: "2.5s" }} />

        <div className="mx-auto max-w-[1000px]">

          {/* ── Header ── */}
          <div className="e-rise e-d1 mb-12 text-center">
            <p
              className="mb-3 text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
            >
              02 — Education
            </p>
            <h1
              className="mb-4 text-[clamp(36px,5vw,60px)] font-black leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-heading)" }}
            >
              Học vấn &amp; <span className="e-grad">Kỹ năng</span>
            </h1>
            <p
              className="mx-auto max-w-[460px] text-[15px] leading-[1.85]"
              style={{ color: "var(--text-muted)" }}
            >
              Hành trình học tập tại FPT University — nơi mình xây dựng nền tảng kỹ thuật vững chắc và đam mê với lập trình.
            </p>
          </div>

          {/* ── Stats row ── */}
          <div className="e-rise e-d2 mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="e-card p-5 text-center">
                <div
                  className="mb-1 text-[28px] font-black"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: s.color,
                    textShadow: `0 0 20px ${s.color}44`,
                  }}
                >
                  {s.num}
                </div>
                <div className="text-[13px] font-semibold" style={{ color: "var(--text-heading)" }}>
                  {s.label}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* ── Main: University card + Skills ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 mb-6">

            {/* University card (3/5) */}
            <div className="e-rise e-d3 e-card p-8 md:col-span-3">
              {/* header */}
              <div className="mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: "rgba(108,188,255,0.1)", border: "1px solid rgba(108,188,255,0.2)" }}
                >
                  🎓
                </div>
                <div>
                  <p className="text-[16px] font-bold" style={{ color: "var(--text-heading)" }}>
                    {education.school}
                  </p>
                  <p
                    className="text-[12px] uppercase tracking-[0.1em]"
                    style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                  >
                    {education.major}
                  </p>
                </div>
              </div>

              <div className="mb-6 h-px" style={{ background: "var(--border)" }} />

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Niên khóa", value: education.year, icon: "📅" },
                  { label: "GPA", value: education.gpa, icon: "⭐" },
                  { label: "Chuyên ngành", value: specialization.field, icon: "💡" },
                  { label: "Định hướng", value: specialization.focus, icon: "🎯" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p className="text-lg mb-1">{item.icon}</p>
                    <p
                      className="text-[11px] uppercase tracking-[0.1em] mb-1"
                      style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                    >
                      {item.label}
                    </p>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--text-heading)" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div>
                <p
                  className="mb-3 text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                >
                  Công nghệ đang học
                </p>
                <div className="flex flex-wrap gap-2">
                  {specialization.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-4 py-1.5 text-[12px] font-medium"
                      style={{
                        background: "rgba(108,188,255,0.08)",
                        border: "1px solid rgba(108,188,255,0.2)",
                        color: "#6cbcff",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 h-px" style={{ background: "var(--border)" }} />

              {/* School history */}
              <div className="mt-6">
                <p
                  className="mb-4 text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                >
                  Hệ thống trường đã học
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "🏫", level: "Tiểu học & THCS", school: education.primaryAndSecondary?.school, year: education.primaryAndSecondary?.year, color: "#6cbcff" },
                    { icon: "🏛️", level: "Trung học Phổ thông", school: education.highSchool?.school, year: education.highSchool?.year, color: "#b388ff" },
                    { icon: "🎓", level: "Đại học", school: education.school, year: education.year, color: "#34d399" },
                  ].map((s) => (
                    <div
                      key={s.level}
                      className="flex items-center gap-3 rounded-xl p-3"
                      style={{ background: `${s.color}0a`, border: `1px solid ${s.color}22` }}
                    >
                      <span className="text-xl flex-shrink-0">{s.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: s.color, fontFamily: "'DM Mono', monospace" }}>
                          {s.level}
                        </p>
                        <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-heading)" }}>
                          {s.school}
                        </p>
                      </div>
                      <span className="text-[11px] flex-shrink-0" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
                        {s.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills (2/5) */}
            <div className="e-rise e-d4 e-card p-8 md:col-span-2">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] text-lg"
                  style={{ background: "rgba(179,136,255,0.1)", border: "1px solid rgba(179,136,255,0.2)" }}
                >
                  ⚡
                </div>
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text-heading)" }}>
                    Kỹ năng chính
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em]"
                    style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                  >
                    Core Skills
                  </p>
                </div>
              </div>

              <div className="mb-6 h-px" style={{ background: "var(--border)" }} />

              <div className="flex flex-col gap-5">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-[13px] font-medium" style={{ color: "var(--text-heading)" }}>
                        {skill.name}
                      </span>
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: skill.color, fontFamily: "'DM Mono', monospace" }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="e-skill-track">
                      <div
                        className="e-bar h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg,${skill.color}55,${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Timeline ── */}
          <div className="e-rise e-d5 e-card p-8 mb-6">
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] text-lg"
                style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}
              >
                📅
              </div>
              <div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--text-heading)" }}>
                  Hành trình học tập
                </p>
                <p
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                >
                  Academic Timeline
                </p>
              </div>
            </div>

            <div className="mb-6 h-px" style={{ background: "var(--border)" }} />

            <div className="flex flex-col gap-0">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-4">
                  {/* Left: dot + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="e-timeline-dot"
                      style={{
                        background: `linear-gradient(135deg,${item.color},${item.color}99)`,
                        boxShadow: `0 0 10px ${item.color}55`,
                      }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div className="e-timeline-line my-1 flex-1" style={{ minHeight: 32 }} />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className="pb-6 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span
                        className="rounded-full px-3 py-0.5 text-[11px] font-bold"
                        style={{
                          background: `${item.color}18`,
                          border: `1px solid ${item.color}30`,
                          color: item.color,
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {item.year}
                      </span>
                      {item.active && (
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: "#34d399" }}>
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                          Hiện tại
                        </span>
                      )}
                    </div>
                    <p className="text-[14px] font-semibold mb-1" style={{ color: "var(--text-heading)" }}>
                      {item.title}
                    </p>
                    <p className="text-[13px] leading-[1.75]" style={{ color: "var(--text-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tech Stack grid ── */}
          <div className="e-rise e-d6 e-card p-8">
            <div className="mb-6 flex items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] text-lg"
                style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)" }}
              >
                🛠️
              </div>
              <div>
                <p className="text-[15px] font-semibold" style={{ color: "var(--text-heading)" }}>
                  Tech Stack
                </p>
                <p
                  className="text-[11px] uppercase tracking-[0.1em]"
                  style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                >
                  Technologies & Tools
                </p>
              </div>
            </div>

            <div className="mb-6 h-px" style={{ background: "var(--border)" }} />

            <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.name}
                  className="e-float flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition-all duration-300"
                  style={{
                    background: `${tech.color}0d`,
                    border: `1px solid ${tech.color}22`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = `0 8px 24px ${tech.color}22`;
                    e.currentTarget.style.borderColor = `${tech.color}44`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = `${tech.color}22`;
                  }}
                >
                  <span className="text-xl">{tech.icon}</span>
                  <span
                    className="text-[10px] font-semibold leading-tight"
                    style={{ color: tech.color, fontFamily: "'DM Mono', monospace" }}
                  >
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* ── Photo Gallery — THPT Thái Phúc ── */}
          {photos.length > 0 && (
            <div className="e-rise e-card p-8 mt-6">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[14px] text-lg"
                  style={{ background: "rgba(179,136,255,0.1)", border: "1px solid rgba(179,136,255,0.2)" }}
                >
                  📸
                </div>
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: "var(--text-heading)" }}>
                    Kỷ niệm trường THPT Thái Phúc
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em]"
                    style={{ color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}
                  >
                    2019 – 2022 · Thái Phúc, Thái Bình
                  </p>
                </div>
              </div>

              <div className="mb-6 h-px" style={{ background: "var(--border)" }} />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {photos.map((photo, idx) => (
                  <div
                    key={idx}
                    className="e-photo"
                    onClick={() => openLightbox(idx)}
                    role="button"
                    aria-label={`Xem ảnh: ${photo.caption}`}
                  >
                    <img src={photo.src} alt={photo.caption} loading="lazy" />
                    <div className="e-photo-overlay">
                      <span
                        className="text-[12px] font-medium text-white"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        🔍 {photo.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div className="e-lightbox" onClick={closeLightbox}>
          <button className="e-lightbox-close" onClick={closeLightbox} aria-label="Đóng">✕</button>

          {lightbox.photos.length > 1 && (
            <>
              <button
                className="e-lightbox-nav e-lightbox-prev"
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                aria-label="Ảnh trước"
              >‹</button>
              <button
                className="e-lightbox-nav e-lightbox-next"
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                aria-label="Ảnh tiếp"
              >›</button>
            </>
          )}

          <img
            src={lightbox.photos[lightbox.index].src}
            alt={lightbox.photos[lightbox.index].caption}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="e-lightbox-caption">
            {lightbox.photos[lightbox.index].caption}
            {lightbox.photos.length > 1 && (
              <span style={{ opacity: 0.6 }}> · {lightbox.index + 1}/{lightbox.photos.length}</span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
