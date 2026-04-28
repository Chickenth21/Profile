import { useState, useEffect } from "react";
import "./Layout.css";

/** Quản lý theme sáng/tối với localStorage */
function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; // mặc định dark
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);
  return { isDark, toggleTheme };
}

/**
 * VIEW LAYER — MainLayout
 * Wrapper bố cục chính: Navbar + Children + Background effects
 */
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
    <div className="app-layout">
      {/* ── Animated Background ── */}
      <div className="animated-bg" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <Stars />

      {/* ── Navbar ── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <button
          className="navbar-logo"
          onClick={() => onTabChange("home")}
          aria-label="Về trang chủ"
        >
          <div className="navbar-logo-icon">
            <img src={profile.personal.avatar} alt="avatar" />
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="navbar-nav" role="menubar">
          {profile.tabs.map((tab) => (
            <li key={tab.id} className="nav-item" role="none">
              <button
                role="menuitem"
                id={`nav-${tab.id}`}
                className={activeTab === tab.id ? "active" : ""}
                onClick={() => onTabChange(tab.id)}
                aria-current={activeTab === tab.id ? "page" : undefined}
              >
                <span className="nav-icon">{tab.icon}</span>
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Theme slide toggle */}
          <button
            className={`theme-switch${isDark ? '' : ' theme-switch--light'}`}
            onClick={toggleTheme}
            aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
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
            className="btn-outline"
            onClick={() => onTabChange("contact")}
          >
            Liên hệ
          </button>
          <button
            className="btn-primary"
            onClick={() => onTabChange("projects")}
          >
            Xem CV
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger${isMenuOpen ? " open" : ""}`}
          onClick={onToggleMenu}
          aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${isMenuOpen ? " open" : ""}`}
        role="menu"
        aria-label="Mobile navigation"
      >
        {profile.tabs.map((tab) => (
          <div key={tab.id} className="mobile-nav-item" role="none">
            <button
              role="menuitem"
              className={activeTab === tab.id ? "active" : ""}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          </div>
        ))}
      </div>

      {/* Main content */}
      <main className="main-content" id="main-content">
        {children}
      </main>

      {/* Footer */}
      <Footer profile={profile} onTabChange={onTabChange} />
    </div>
  );
}

/** Footer component */
function Footer({ profile, onTabChange }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Left — brand */}
        <div className="footer-brand">
          <button className="footer-logo" onClick={() => onTabChange('home')}>
            <div className="footer-logo-icon">
              <img src={profile.personal.avatar} alt="avatar" />
            </div>
            <span>{profile.personal.name}</span>
          </button>
          <p className="footer-tagline">{profile.personal.tagline}</p>
          <p className="footer-location">📍 {profile.personal.location}</p>
        </div>

        {/* Center — nav links */}
        <div className="footer-nav">
          <p className="footer-nav-title">Điều hướng</p>
          <ul>
            {profile.tabs.map((tab) => (
              <li key={tab.id}>
                <button onClick={() => onTabChange(tab.id)}>
                  {tab.icon} {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — contact */}
        <div className="footer-contact">
          <p className="footer-nav-title">Liên hệ</p>
          <ul>
            <li>
              <a href={`mailto:${profile.personal.email}`} target="_blank" rel="noreferrer">
                ✉️ {profile.personal.email}
              </a>
            </li>
            <li>
              <a href={profile.personal.github} target="_blank" rel="noreferrer">
                🐙 GitHub
              </a>
            </li>
            {profile.personal.Facebook && (
              <li>
                <a href={profile.personal.Facebook} target="_blank" rel="noreferrer">
                  💙 Facebook
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} {profile.personal.name} — All rights reserved.</p>
      </div>
    </footer>
  );
}

/** Tạo 60 ngôi sao nhấp nháy ngẫu nhiên */
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
