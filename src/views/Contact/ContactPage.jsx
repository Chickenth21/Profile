import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes contact-rise { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes contact-glow { 0%,100%{opacity:.08} 50%{opacity:.18} }
  @keyframes contact-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

  .c-rise { animation: contact-rise .6s cubic-bezier(.22,.68,0,1.2) both }
  .c-d1{animation-delay:.05s} .c-d2{animation-delay:.15s} .c-d3{animation-delay:.25s}
  .c-d4{animation-delay:.35s} .c-d5{animation-delay:.45s} .c-d6{animation-delay:.55s}
  .c-glow { animation: contact-glow 5s ease-in-out infinite }
  .c-float { animation: contact-float 4s ease-in-out infinite }

  .c-grad {
    background: linear-gradient(120deg,#6cbcff,#b388ff);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .c-card {
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(20px);
    transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
  }
  .c-card:hover { transform: translateY(-4px); border-color: rgba(108,188,255,0.2); box-shadow: 0 16px 48px rgba(108,188,255,0.08); }

  .c-input {
    width: 100%;
    padding: 14px 18px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.85);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color .25s, background .25s, box-shadow .25s;
    resize: none;
  }
  .c-input::placeholder { color: rgba(255,255,255,0.25); }
  .c-input:focus {
    border-color: rgba(108,188,255,0.45);
    background: rgba(255,255,255,0.06);
    box-shadow: 0 0 0 3px rgba(108,188,255,0.1);
  }

  [data-theme="light"] .c-card {
    background: rgba(255,255,255,0.6);
    border-color: rgba(91,135,212,0.18);
  }
  [data-theme="light"] .c-card:hover { border-color: rgba(91,135,212,0.4); box-shadow: 0 16px 48px rgba(91,135,212,0.12); }
  [data-theme="light"] .c-grad {
    background: linear-gradient(120deg,#1a65a0,#6d28d9);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  [data-theme="light"] .c-input {
    border-color: rgba(91,135,212,0.25);
    background: rgba(255,255,255,0.7);
    color: #1e3a5c;
  }
  [data-theme="light"] .c-input::placeholder { color: rgba(30,58,92,0.35); }
  [data-theme="light"] .c-input:focus {
    border-color: rgba(91,135,212,0.55);
    background: rgba(255,255,255,0.85);
    box-shadow: 0 0 0 3px rgba(91,135,212,0.12);
  }
`;

const SOCIAL = [
  {
    label: "GitHub",
    handle: "@Chickenth21",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: "#6cbcff",
    bg: "rgba(108,188,255,0.1)",
    border: "rgba(108,188,255,0.2)",
  },
  {
    label: "Facebook",
    handle: "sang.nguyen.591683",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: "#b388ff",
    bg: "rgba(179,136,255,0.1)",
    border: "rgba(179,136,255,0.2)",
  },
  {
    label: "Email",
    handle: "sangnguyen2004th@gmail.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        width="22"
        height="22"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.2)",
  },
  {
    label: "Zalo",
    handle: "0353 484 470",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <text
          x="12" y="18"
          fontSize="18"
          fontWeight="900"
          fontFamily="'Arial Black', Arial, sans-serif"
          textAnchor="middle"
        >
          Z
        </text>
      </svg>
    ),
    color: "#0068ff",
    bg: "rgba(0,104,255,0.1)",
    border: "rgba(0,104,255,0.2)",
  },
];

export default function ContactPage({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    const mailto = `mailto:${profile.personal.email}?subject=Liên hệ từ ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nEmail phản hồi: " + form.email)}`;
    window.location.href = mailto;
    setTimeout(() => setStatus("sent"), 800);
  };

  const getLink = (s) => {
    if (s.label === "GitHub") return profile.personal.github;
    if (s.label === "Facebook") return profile.personal.Facebook;
    if (s.label === "Email") return `mailto:${profile.personal.email}`;
    if (s.label === "Zalo") return `https://zalo.me/${profile.personal.Zalo}`;
    return null;
  };

  return (
    <>
      <style>{STYLES}</style>

      <div
        className="relative z-[1] min-h-screen py-16 px-4 md:px-8"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* bg blobs */}
        <div className="c-glow pointer-events-none fixed -left-48 top-1/4 h-[500px] w-[500px] rounded-full bg-cyan-400 blur-[120px] opacity-[0.07]" />
        <div
          className="c-glow pointer-events-none fixed -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-400 blur-[120px] opacity-[0.07]"
          style={{ animationDelay: "2.5s" }}
        />

        <div className="mx-auto max-w-[1000px]">
          {/* ── Header ── */}
          <div className="c-rise c-d1 mb-12 text-center">
            <h1
              className="font-display mb-4 text-[clamp(36px,5vw,60px)] font-black leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--text-heading)",
              }}
            >
              Liên hệ với <span className="c-grad">mình</span>
            </h1>
            <p
              className="mx-auto max-w-[480px] text-[15px] leading-[1.85]"
              style={{ color: "var(--text-muted)" }}
            >
              Mình luôn sẵn sàng kết nối — dù là về cơ hội thực tập, hợp tác dự
              án, hay chỉ đơn giản là một cuộc trò chuyện thú vị! 🚀
            </p>
          </div>

          {/* ── Social cards ── */}
          <div className="c-rise c-d2 mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SOCIAL.map((s) => {
              const link = getLink(s);
              const Tag = link ? "a" : "div";
              const props = link
                ? { href: link, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Tag
                  key={s.label}
                  {...props}
                  className="c-card flex flex-col items-center gap-3 p-5 text-center no-underline"
                  style={{ cursor: link ? "pointer" : "default" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      color: s.color,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p
                      className="text-[13px] font-semibold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      {s.label}
                    </p>
                    <p
                      className="mt-0.5 text-[11px] leading-tight"
                      style={{
                        color: "var(--text-muted)",
                        wordBreak: "break-all",
                      }}
                    >
                      {s.handle}
                    </p>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* ── Main row: form + info ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Contact form (3/5) */}
            <div className="c-rise c-d3 c-card p-8 md:col-span-3">
              <div className="mb-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[14px] text-lg"
                  style={{
                    background: "rgba(108,188,255,0.1)",
                    border: "1px solid rgba(108,188,255,0.2)",
                  }}
                >
                  ✉️
                </div>
                <div>
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Gửi tin nhắn
                  </p>
                  <p
                    className="text-[11px] uppercase tracking-[0.1em]"
                    style={{
                      color: "var(--text-muted)",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Send a message
                  </p>
                </div>
              </div>

              <div
                className="mb-6 h-px"
                style={{ background: "var(--border)" }}
              />

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      className="mb-2 block text-[12px] font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Tên của bạn *
                    </label>
                    <input
                      className="c-input"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      className="mb-2 block text-[12px] font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Email *
                    </label>
                    <input
                      className="c-input"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-[12px] font-medium"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Lời nhắn *
                  </label>
                  <textarea
                    className="c-input"
                    rows={5}
                    placeholder="Xin chào! Mình muốn nói về..."
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background:
                      status === "sent"
                        ? "linear-gradient(135deg,#34d399,#059669)"
                        : "linear-gradient(135deg,#6cbcff,#b388ff)",
                    boxShadow:
                      status === "sent"
                        ? "0 4px 20px rgba(52,211,153,0.3)"
                        : "0 4px 20px rgba(108,188,255,0.3)",
                    cursor: status !== "idle" ? "not-allowed" : "pointer",
                    opacity: status === "sending" ? 0.75 : 1,
                  }}
                >
                  {status === "idle" && (
                    <>
                      <span>Gửi tin nhắn</span> <span>→</span>
                    </>
                  )}
                  {status === "sending" && <span>Đang xử lý…</span>}
                  {status === "sent" && (
                    <>
                      <span>✓</span> <span>Đã mở ứng dụng mail!</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Info panel (2/5) */}
            <div className="c-rise c-d4 flex flex-col gap-4 md:col-span-2">
              {/* Availability */}
              <div className="c-card p-6">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>
                  <span
                    className="text-[13px] font-semibold"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Sẵn sàng hợp tác
                  </span>
                </div>
                <p
                  className="text-[13px] leading-[1.75]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Mình hiện đang tìm kiếm cơ hội{" "}
                  <strong style={{ color: "var(--text-heading)" }}>
                    thực tập Fullstack
                  </strong>{" "}
                  hoặc{" "}
                  <strong style={{ color: "var(--text-heading)" }}>
                    dự án freelance
                  </strong>
                  . Thời gian phản hồi thường &lt; 24h.
                </p>
              </div>

              {/* Info list */}
              <div className="c-card p-6">
                <p
                  className="mb-4 text-[11px] uppercase tracking-[0.12em] font-medium"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Thông tin liên hệ
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: "📧",
                      label: "Email",
                      value: profile.personal.email,
                      href: `mailto:${profile.personal.email}`,
                    },
                    {
                      icon: "🐙",
                      label: "GitHub",
                      value: "Chickenth21",
                      href: profile.personal.github,
                    },
                    {
                      icon: "📍",
                      label: "Địa chỉ",
                      value: profile.personal.location,
                    },
                    {
                      icon: "🎓",
                      label: "Trường",
                      value: "FPT University Hà Nội",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <span className="text-base">{item.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p
                          className="text-[11px] uppercase tracking-[0.1em]"
                          style={{
                            color: "var(--text-muted)",
                            fontFamily: "'DM Mono', monospace",
                          }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-[13px] font-medium transition-colors hover:text-cyan-400"
                            style={{
                              color: "var(--text-heading)",
                              textDecoration: "none",
                            }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p
                            className="truncate text-[13px] font-medium"
                            style={{ color: "var(--text-heading)" }}
                          >
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div
                className="c-card c-float p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(108,188,255,0.06),rgba(179,136,255,0.06))",
                }}
              >
                <p className="text-2xl mb-2">💡</p>
                <p
                  className="text-[13px] italic leading-[1.7]"
                  style={{ color: "var(--text-muted)" }}
                >
                  "Code is like humor. When you have to explain it, it's bad."
                </p>
                <p
                  className="mt-2 text-[11px] font-medium"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  — Cory House
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
