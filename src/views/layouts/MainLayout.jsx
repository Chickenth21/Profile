import { useState, useEffect, useRef } from "react";

const HOBBY_DROPDOWN = [
  { id: "music", label: "Âm nhạc", icon: "🎵", color: "#f472b6" },
  { id: "anime", label: "Anime",   icon: "🎌", color: "#fb923c" },
  { id: "game",  label: "Game",    icon: "🎮", color: "#34d399" },
];

const DROPDOWN_STYLE = `
  .hobby-dropdown-wrap { position: relative; }
  .hobby-dropdown-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 99px; font-size: 14px; font-weight: 500;
    border: none; cursor: pointer; transition: all 0.2s ease;
    background: transparent;
    font-family: 'Inter', sans-serif;
  }
  .hobby-dropdown-btn .dd-arrow {
    font-size: 9px; opacity: 0.5; transition: transform 0.25s ease;
  }
  .hobby-dropdown-btn.open .dd-arrow { transform: rotate(180deg); }
  .hobby-dropdown-menu {
    position: absolute; top: calc(100% + 10px); left: 50%;
    transform: translateX(-50%) translateY(-6px);
    min-width: 180px;
    border-radius: 16px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(15,15,25,0.92);
    backdrop-filter: blur(20px);
    padding: 6px;
    opacity: 0; pointer-events: none;
    transition: opacity 0.2s ease, transform 0.25s cubic-bezier(.22,.68,0,1.2);
    z-index: 100;
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  }
  .hobby-dropdown-menu.open {
    opacity: 1; pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }
  [data-theme="light"] .hobby-dropdown-menu {
    background: rgba(255,255,255,0.95);
    border-color: rgba(91,135,212,0.2);
    box-shadow: 0 16px 48px rgba(91,127,255,0.12);
  }
  .hobby-dd-item {
    display: flex; align-items: center; gap: 10px;
    width: 100%; padding: 9px 12px; border-radius: 10px;
    border: none; cursor: pointer; text-align: left; font-size: 13px; font-weight: 500;
    background: transparent; transition: background 0.18s ease;
    font-family: 'Inter', sans-serif; color: var(--text-muted);
  }
  .hobby-dd-item:hover { background: rgba(255,255,255,0.07); color: var(--text-heading); }
  [data-theme="light"] .hobby-dd-item:hover { background: rgba(91,127,255,0.07); }
  .hobby-dd-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  /* pointer caret */
  .hobby-dropdown-menu::before {
    content: '';
    position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
    width: 12px; height: 12px; border-radius: 2px;
    background: rgba(15,15,25,0.92);
    border-left: 1px solid rgba(255,255,255,0.1);
    border-top: 1px solid rgba(255,255,255,0.1);
    rotate: 45deg;
  }
  [data-theme="light"] .hobby-dropdown-menu::before {
    background: rgba(255,255,255,0.95);
    border-color: rgba(91,135,212,0.2);
  }
`;

function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  const toggleTheme = () => setIsDark((prev) => !prev);
  return { isDark, toggleTheme };
}

function HobbyDropdown({ activeTab, onTabChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isActive = activeTab === "hobbies";

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (subId) => {
    setOpen(false);
    onTabChange("hobbies", subId);
  };

  return (
    <div className="hobby-dropdown-wrap" ref={ref}>
      <button
        className={`hobby-dropdown-btn${open ? " open" : ""}`}
        style={{
          background: isActive ? "rgba(91,127,255,0.12)" : "transparent",
          color: isActive ? "var(--color-primary-light)" : "var(--text-muted)",
        }}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--surface-hover)"; e.currentTarget.style.color = "var(--text-heading)"; } }}
        onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = open ? "rgba(91,127,255,0.12)" : "transparent"; e.currentTarget.style.color = open ? "var(--color-primary-light)" : "var(--text-muted)"; } }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span style={{ fontSize: "0.85rem" }}>❤️</span>
        Sở thích
        <span className="dd-arrow">▼</span>
      </button>

      <div className={`hobby-dropdown-menu${open ? " open" : ""}`} role="menu">
        {HOBBY_DROPDOWN.map((item) => (
          <button
            key={item.id}
            className="hobby-dd-item"
            role="menuitem"
            onClick={() => handleSelect(item.id)}
          >
            <span className="hobby-dd-dot" style={{ background: item.color }} />
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MainLayout({
  children,
  profile,
  activeTab,
  onTabChange,
  isMenuOpen,
  onToggleMenu,
}) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <style>{DROPDOWN_STYLE}</style>
      {/* Background */}
      <div className="animated-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <Stars />

      {/* ── Navbar ── */}
      <nav
        className="sticky top-0 z-50 h-16 border-b backdrop-blur-2xl animate-[slide-down_0.4s_ease]"
        style={{
          background: "var(--navbar-bg)",
          borderColor: "var(--border)",
          boxShadow: "var(--navbar-shadow)",
          transition: "background .35s ease, box-shadow .35s ease",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* inner wrapper: flex on mobile, 3-column grid on desktop */}
        <div
          className="h-full px-4 md:px-12 flex items-center justify-between md:grid"
          style={{ gridTemplateColumns: "1fr auto 1fr" }}
        >
          {/* LEFT — logo */}
          <div className="flex items-center">
            <button
              className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onTabChange("home")}
              aria-label="Về trang chủ"
            >
              <div
                className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 0 10px rgba(91,127,255,0.3)" }}
              >
                <img
                  src={profile.personal.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span
                className="hidden lg:block font-bold text-sm"
                style={{
                  color: "var(--text-heading)",
                  fontFamily: "'Outfit',sans-serif",
                }}
              >
                {profile.personal.name.split(" ").pop()}
              </span>
            </button>
          </div>

          {/* CENTER — nav tabs */}
          <ul
            className="hidden md:flex items-center gap-1 list-none m-0 p-0"
            role="menubar"
          >
            {profile.tabs.map((tab) => (
              <li key={tab.id} role="none">
                {tab.id === "hobbies" ? (
                  <HobbyDropdown activeTab={activeTab} onTabChange={onTabChange} />
                ) : (
                  <button
                    role="menuitem"
                    id={`nav-${tab.id}`}
                    onClick={() => onTabChange(tab.id)}
                    aria-current={activeTab === tab.id ? "page" : undefined}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all duration-200"
                    style={{
                      fontFamily: "'Inter',sans-serif",
                      background: activeTab === tab.id ? "rgba(91,127,255,0.12)" : "transparent",
                      color: activeTab === tab.id ? "var(--color-primary-light)" : "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.background = "var(--surface-hover)"; e.currentTarget.style.color = "var(--text-heading)"; } }}
                    onMouseLeave={(e) => { if (activeTab !== tab.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-muted)"; } }}
                  >
                    <span style={{ fontSize: "0.85rem" }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* RIGHT — actions */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              className={`theme-switch${isDark ? "" : " theme-switch--light"}`}
              onClick={toggleTheme}
              aria-label={
                isDark
                  ? "Chuyển sang giao diện sáng"
                  : "Chuyển sang giao diện tối"
              }
              role="switch"
              aria-checked={!isDark}
            >
              <span className="theme-switch-track">
                <span className="theme-switch-icon theme-switch-moon">🌙</span>
                <span className="theme-switch-icon theme-switch-sun">☀️</span>
                <span className="theme-switch-thumb" />
              </span>
            </button>
            <button
              className="hidden md:block px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-all duration-200 bg-transparent"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              onClick={() => onTabChange("contact")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-primary-light)";
                e.currentTarget.style.borderColor = "var(--color-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              Liên hệ
            </button>
            <button
              className="hidden md:block px-5 py-2 rounded-full text-sm font-semibold text-white border-none cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg,var(--color-primary),var(--color-accent))",
                boxShadow: "0 4px 15px rgba(91,127,255,0.3)",
              }}
              onClick={() => onTabChange("projects")}
            >
              Xem CV
            </button>
            {/* Hamburger */}
            <button
              className={`hamburger md:hidden${isMenuOpen ? " open" : ""}`}
              onClick={onToggleMenu}
              aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={isMenuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${isMenuOpen ? " open" : ""}`}
        role="menu"
        aria-label="Mobile navigation"
      >
        {profile.tabs.map((tab) => (
          <div key={tab.id} role="none">
            <button
              role="menuitem"
              onClick={() => onTabChange(tab.id)}
              className="px-5 py-3.5 rounded-2xl text-base font-medium text-left cursor-pointer transition-all duration-200 border flex items-center gap-2.5 min-w-[180px]"
              style={{
                fontFamily: "'Inter',sans-serif",
                background:
                  activeTab === tab.id
                    ? "rgba(91,127,255,0.1)"
                    : "var(--surface)",
                borderColor:
                  activeTab === tab.id ? "var(--border-glow)" : "var(--border)",
                color:
                  activeTab === tab.id
                    ? "var(--color-primary-light)"
                    : "var(--text)",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          </div>
        ))}
      </div>

      <main className="flex-1 relative z-[1]" id="main-content">
        {children}
      </main>
    </div>
  );
}



function Stars() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2 + Math.random() * 3}s`,
    size: `${1 + Math.random() * 2}px`,
  }));
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
            width: s.size,
            height: s.size,
          }}
        />
      ))}
    </div>
  );
}
