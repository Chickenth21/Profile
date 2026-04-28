import "./Layout.css";

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
    </div>
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
