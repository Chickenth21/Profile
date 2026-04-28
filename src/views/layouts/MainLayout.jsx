import { useState, useEffect } from "react";

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
        {/* inner wrapper: 3-column grid */}
        <div
          className="h-full px-12 grid items-center"
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
                <button
                  role="menuitem"
                  id={`nav-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all duration-200"
                  style={{
                    fontFamily: "'Inter',sans-serif",
                    background:
                      activeTab === tab.id
                        ? "rgba(91,127,255,0.12)"
                        : "transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--color-primary-light)"
                        : "var(--text-muted)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "var(--surface-hover)";
                      e.currentTarget.style.color = "var(--text-heading)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--text-muted)";
                    }
                  }}
                >
                  <span style={{ fontSize: "0.85rem" }}>{tab.icon}</span>
                  {tab.label}
                </button>
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
              className="w-full px-5 py-3.5 rounded-2xl text-base font-medium text-left cursor-pointer transition-all duration-200 border flex items-center gap-2.5"
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
