import { useState, useEffect, useRef } from "react";

const BASE = import.meta.env.BASE_URL;

/* ─────────────────────────── DATA ─────────────────────────── */
const GAMES = [
  {
    id: "tft",
    name: "Đấu Trường Chân Lý",
    nameEn: "Teamfight Tactics",
    genre: "Auto-chess / Strategy",
    color: "#c89b3c",
    colorAlt: "#f0d078",
    bg: "linear-gradient(135deg,#0d0800 0%,#3d2200 55%,#7a4a00 100%)",
    banner: `${BASE}tft-banner.jpg`,
    emoji: "♟️",
    desc: "Game chiến thuật tự động với hệ thống tướng và tổ đội đa dạng. Mỗi ván đấu là một trải nghiệm khác nhau đòi hỏi tư duy linh hoạt và thích nghi nhanh.",
    playtime: "600+ giờ",
    platform: "PC / Mobile",
    achievements: [
      {
        icon: "🏆",
        label: "Bậc rank cao nhất",
        value: "Vàng I",
        color: "#fbbf24",
      },
      {
        icon: "⭐",
        label: "Danh hiệu",
        value: "Chiến Lược Gia",
        color: "#c89b3c",
      },
      {
        icon: "🎯",
        label: "Top synergy",
        value: "Mage · Sorcerer",
        color: "#a78bfa",
      },
      {
        icon: "🔥",
        label: "Win streak dài nhất",
        value: "7 trận",
        color: "#f97316",
      },
    ],
    screenshots: [
      {
        bg: "linear-gradient(135deg,#1a0e00,#5c3800)",
        label: "Dragon Synergy",
        emoji: "🐉",
      },
      {
        bg: "linear-gradient(135deg,#0a0020,#2d006e)",
        label: "Portal Stage",
        emoji: "🌀",
      },
      {
        bg: "linear-gradient(135deg,#001a0a,#006640)",
        label: "Final Circle",
        emoji: "⚔️",
      },
    ],
    tags: ["Auto-chess", "Strategy", "Teamfight", "Ranked"],
  },
  {
    id: "lq",
    name: "Liên Quân Mobile",
    nameEn: "Arena of Valor",
    genre: "MOBA / Action",
    color: "#34d399",
    colorAlt: "#6ee7b7",
    bg: "linear-gradient(135deg,#000d08 0%,#004d28 55%,#006b38 100%)",
    banner: `${BASE}lien-quan-banner.png`,
    emoji: "⚔️",
    desc: "MOBA di động hàng đầu Việt Nam với gameplay 5v5 hấp dẫn. Tôi chuyên chơi vị trí Thủ Thành (Support/Tank), bảo vệ đồng đội và kiểm soát team fight.",
    playtime: "1000+ giờ",
    platform: "Mobile",
    achievements: [
      {
        icon: "🏆",
        label: "Bậc rank cao nhất",
        value: "Tinh Anh IV",
        color: "#34d399",
      },
      {
        icon: "🛡️",
        label: "Vị trí chuyên",
        value: "Thủ Thành",
        color: "#60a5fa",
      },
      {
        icon: "👑",
        label: "Tướng yêu thích",
        value: "Thiane · Grakk",
        color: "#34d399",
      },
      { icon: "🎖️", label: "Tỉ lệ thắng", value: "~58%", color: "#fbbf24" },
    ],
    screenshots: [
      {
        bg: "linear-gradient(135deg,#001a08,#005c28)",
        label: "5v5 Ranked",
        emoji: "🗺️",
      },
      {
        bg: "linear-gradient(135deg,#00100a,#004030)",
        label: "Team Fight",
        emoji: "💥",
      },
      {
        bg: "linear-gradient(135deg,#0d1a00,#3a5c00)",
        label: "Late Game",
        emoji: "🏰",
      },
    ],
    tags: ["MOBA", "5v5", "Support", "Competitive"],
  },
  {
    id: "gi",
    name: "Genshin Impact",
    nameEn: "Genshin Impact",
    genre: "Open World / RPG",
    color: "#60a5fa",
    colorAlt: "#93c5fd",
    bg: "linear-gradient(135deg,#00050d 0%,#001540 55%,#002070 100%)",
    banner: `${BASE}genshin-banner.jpg`,
    emoji: "🌟",
    desc: "Thế giới mở Teyvat rộng lớn với hệ thống nguyên tố phong phú và cốt truyện hấp dẫn. Tôi thường chơi để khám phá, farm và hoàn thành Archon Quest.",
    playtime: "500+ giờ",
    platform: "PC / Mobile",
    achievements: [
      { icon: "🌟", label: "Adventure Rank", value: "AR 56", color: "#60a5fa" },
      { icon: "🗺️", label: "World explored", value: "~85%", color: "#34d399" },
      {
        icon: "👤",
        label: "Main team",
        value: "Hutao · Xingqiu",
        color: "#f97316",
      },
      {
        icon: "💎",
        label: "Abyss Floor",
        value: "12-3 (36★)",
        color: "#a78bfa",
      },
    ],
    screenshots: [
      {
        bg: "linear-gradient(135deg,#000a1a,#001a4d)",
        label: "Mondstadt",
        emoji: "🏔️",
      },
      {
        bg: "linear-gradient(135deg,#1a0500,#5a1800)",
        label: "Inazuma",
        emoji: "⚡",
      },
      {
        bg: "linear-gradient(135deg,#001a10,#005040)",
        label: "Sumeru",
        emoji: "🌿",
      },
    ],
    tags: ["Open World", "RPG", "Gacha", "Exploration"],
  },
];

/* ─────────────────────────── STYLES ─────────────────────────── */
const GAME_STYLES = `
  @keyframes g-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes g-slide-fade {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes g-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes g-pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(0.8); }
  }

  /* ── Tab selector ── */
  .g-tab-bar { display: flex; gap: 0; border-radius: 14px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); padding: 4px; overflow: hidden; }
  .g-tab-btn {
    flex: 1; padding: 9px 8px; border: none; border-radius: 11px; cursor: pointer;
    font-size: 12px; font-weight: 600; transition: all 0.3s cubic-bezier(.4,0,.2,1);
    background: transparent; color: var(--text-muted);
    font-family: 'Inter', sans-serif; white-space: nowrap;
  }
  .g-tab-btn.active { color: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.35); }

  /* ── Banner carousel ── */
  .g-banner {
    position: relative; border-radius: 22px; overflow: hidden;
    min-height: 450px; cursor: grab; user-select: none;
  }
  .g-banner:active { cursor: grabbing; }
  .g-banner-track { display: flex; height: 100%; transition: transform 0.55s cubic-bezier(0.4,0,0.2,1); }
  .g-banner-slide { min-width: 100%; position: relative; min-height: 450px; display: flex; flex-direction: column; justify-content: flex-end; }
  .g-banner-bg { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .g-banner-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 42%, transparent 100%);
  }
  .g-banner-content { position: relative; padding: 28px 28px 24px; animation: g-slide-fade 0.5s ease both; }
  .g-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
    color: #fff; font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s ease; z-index: 10; backdrop-filter: blur(8px);
  }
  .g-nav-btn:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.1); }
  .g-nav-prev { left: 12px; }
  .g-nav-next { right: 12px; }
  .g-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 10; }
  .g-dot { height: 5px; border-radius: 99px; background: rgba(255,255,255,0.3); transition: all 0.35s ease; width: 7px; cursor: pointer; border: none; padding: 0; }
  .g-dot.active { width: 22px; background: #fff; }

  /* ── Card ── */
  .g-card {
    border-radius: 18px; border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03); backdrop-filter: blur(20px);
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .g-card:hover { transform: translateY(-3px); }

  /* ── Screenshot grid ── */
  .g-shot {
    border-radius: 12px; overflow: hidden; position: relative;
    aspect-ratio: 16/9; cursor: pointer;
    transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease;
  }
  .g-shot:hover { transform: scale(1.04); box-shadow: 0 16px 40px rgba(0,0,0,0.45); }
  .g-shot-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 10px;
    opacity: 0; transition: opacity 0.3s ease;
  }
  .g-shot:hover .g-shot-overlay { opacity: 1; }

  /* ── Achievement badge ── */
  .g-ach {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 14px; border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.07);
    background: rgba(255,255,255,0.03);
    transition: all 0.25s ease;
  }
  .g-ach:hover { transform: translateX(4px); border-color: rgba(255,255,255,0.14); }

  /* ── Tag chip ── */
  .g-tag {
    display: inline-flex; align-items: center; padding: 4px 12px;
    border-radius: 99px; font-size: 11px; font-weight: 600;
    transition: transform 0.2s ease;
  }
  .g-tag:hover { transform: translateY(-1px); }

  /* ── Shimmer on rank badge ── */
  .g-rank-badge {
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%);
    background-size: 200% auto;
    animation: g-shimmer 2.5s linear infinite;
  }

  [data-theme="light"] .g-card { background: rgba(255,255,255,0.65); border-color: rgba(91,135,212,0.18); }
  [data-theme="light"] .g-card:hover { border-color: rgba(91,135,212,0.38); box-shadow: 0 12px 36px rgba(91,135,212,0.12); }
  [data-theme="light"] .g-ach { background: rgba(255,255,255,0.7); }
  [data-theme="light"] .g-tab-bar { background: rgba(0,0,0,0.05); border-color: rgba(0,0,0,0.08); }
`;

/* ─────────────────────────── BANNER CAROUSEL ─────────────────────────── */
function GameBannerCarousel({ games }) {
  const [cur, setCur] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => setCur((idx + games.length) % games.length);

  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(cur + 1), 4500);
    return () => clearTimeout(timerRef.current);
  }, [cur]);

  const touchX = useRef(null);
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? cur + 1 : cur - 1);
    touchX.current = null;
  };

  const g = games[cur];
  return (
    <div
      className="g-banner"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="g-banner-track"
        style={{ transform: `translateX(-${cur * 100}%)` }}
      >
        {games.map((game, i) => (
          <div key={game.id} className="g-banner-slide">
            <div
              className="g-banner-bg"
              style={
                game.banner
                  ? {
                      backgroundImage: `url(${game.banner})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { background: game.bg }
              }
            >
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  background: game.color,
                  opacity: 0.1,
                  filter: "blur(70px)",
                }}
              />
              {!game.banner && (
                <div
                  style={{
                    position: "absolute",
                    right: 32,
                    bottom: 0,
                    fontSize: 140,
                    lineHeight: 1,
                    opacity: 0.15,
                    userSelect: "none",
                    filter: `drop-shadow(0 0 28px ${game.color})`,
                  }}
                >
                  {game.emoji}
                </div>
              )}
            </div>
            <div className="g-banner-overlay" />
            <div className="g-banner-content">
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: game.colorAlt,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                🎮 Game · {i + 1}/{games.length}
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(20px,4vw,32px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                {game.name}
              </h2>
              <p
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: 10,
                }}
              >
                {game.genre} · {game.platform}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.75,
                  maxWidth: 420,
                  marginBottom: 14,
                }}
              >
                {game.desc}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {game.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="g-tag"
                    style={{
                      background: `${game.color}1a`,
                      border: `1px solid ${game.color}40`,
                      color: game.colorAlt,
                    }}
                  >
                    {t}
                  </span>
                ))}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "4px 10px",
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "#fff",
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  🕐 {game.playtime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="g-nav-btn g-nav-prev"
        onClick={() => goTo(cur - 1)}
        aria-label="Prev"
      >
        ‹
      </button>
      <button
        className="g-nav-btn g-nav-next"
        onClick={() => goTo(cur + 1)}
        aria-label="Next"
      >
        ›
      </button>
      <div className="g-dots">
        {games.map((_, i) => (
          <button
            key={i}
            className={`g-dot${i === cur ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── GAME DETAIL CARD ─────────────────────────── */
function GameDetailCard({ game }) {
  return (
    <div key={game.id} style={{ animation: "g-fade-up 0.45s ease both" }}>
      {/* Header */}
      <div
        className="g-card p-5 mb-4"
        style={{
          borderColor: `${game.color}30`,
          background: `linear-gradient(135deg,${game.color}08,transparent)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              background: `${game.color}1a`,
              border: `1px solid ${game.color}35`,
              flexShrink: 0,
            }}
          >
            {game.emoji}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 17,
                fontWeight: 900,
                color: "var(--text-heading)",
                marginBottom: 2,
              }}
            >
              {game.name}
            </p>
            <p
              style={{
                fontFamily: "'DM Mono',monospace",
                fontSize: 10,
                color: "var(--text-muted)",
                letterSpacing: "0.12em",
              }}
            >
              {game.genre.toUpperCase()} · {game.platform}
            </p>
          </div>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 10,
              fontFamily: "'DM Mono',monospace",
              fontSize: 12,
              fontWeight: 800,
              background: `${game.color}20`,
              border: `1px solid ${game.color}40`,
              color: game.colorAlt,
            }}
          >
            🕐 {game.playtime}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Achievements */}
        <div className="g-card p-5">
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: game.color,
              marginBottom: 14,
            }}
          >
            🏆 Thành Tựu
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {game.achievements.map((ach) => (
              <div key={ach.label} className="g-ach">
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    background: `${ach.color}18`,
                    border: `1px solid ${ach.color}30`,
                    flexShrink: 0,
                  }}
                >
                  {ach.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: 11,
                      color: "var(--text-muted)",
                      marginBottom: 2,
                    }}
                  >
                    {ach.label}
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: ach.color,
                      fontFamily: "'DM Mono',monospace",
                    }}
                  >
                    {ach.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots */}
        <div className="g-card p-5">
          <p
            style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: game.color,
              marginBottom: 14,
            }}
          >
            📸 Khoảnh Khắc Game
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
            }}
          >
            {game.screenshots.map((shot, i) => (
              <div key={i} className="g-shot" style={{ background: shot.bg }}>
                {/* Grid texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.06,
                    backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 14px,rgba(255,255,255,1) 14px,rgba(255,255,255,1) 15px),
                                    repeating-linear-gradient(90deg,transparent,transparent 14px,rgba(255,255,255,1) 14px,rgba(255,255,255,1) 15px)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    opacity: 0.28,
                    filter: `drop-shadow(0 0 8px ${game.color})`,
                  }}
                >
                  {shot.emoji}
                </div>
                <div className="g-shot-overlay">
                  <p
                    style={{
                      fontFamily: "'DM Mono',monospace",
                      fontSize: 9,
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {shot.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Tags */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}
          >
            {game.tags.map((t) => (
              <span
                key={t}
                className="g-tag"
                style={{
                  background: `${game.color}14`,
                  border: `1px solid ${game.color}30`,
                  color: game.colorAlt,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── MAIN EXPORT ─────────────────────────── */
export default function GameTab() {
  const [activeGame, setActiveGame] = useState(0);

  return (
    <div className="flex flex-col gap-6">
      <style>{GAME_STYLES}</style>

      {/* Banner carousel — hiển thị cả 3 game */}
      <GameBannerCarousel games={GAMES} />

      {/* Game selector tabs */}
      <div className="g-tab-bar">
        {GAMES.map((g, i) => (
          <button
            key={g.id}
            className={`g-tab-btn${activeGame === i ? " active" : ""}`}
            style={
              activeGame === i
                ? {
                    background: `${g.color}22`,
                    color: g.colorAlt,
                    borderColor: `${g.color}40`,
                  }
                : {}
            }
            onClick={() => setActiveGame(i)}
          >
            {g.emoji} {g.name.split(" ").slice(-2).join(" ")}
          </button>
        ))}
      </div>

      {/* Detail card for selected game */}
      <GameDetailCard key={activeGame} game={GAMES[activeGame]} />

      {/* Overall playstyle tags */}
      <div className="g-card p-5">
        <p
          style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Phong cách chơi
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            "Teamwork 🤝",
            "Competitive 🏅",
            "Chiến lược ♟️",
            "Chill farm 🌾",
            "Story-driven 📖",
            "Support 🛡️",
            "Late game 🌙",
          ].map((p) => (
            <span
              key={p}
              className="g-tag"
              style={{
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.25)",
                color: "#34d399",
              }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
