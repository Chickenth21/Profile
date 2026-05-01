const GAME_DATA = {
  desc: "Gaming là cách tôi giải tỏa stress và rèn luyện tư duy chiến thuật. Từ những trận đấu căng thẳng đến khám phá thế giới mở rộng lớn.",
  genres: [
    { name: "MOBA", pct: 85, color: "#34d399", icon: "🏆" },
    { name: "FPS / TPS", pct: 65, color: "#3b82f6", icon: "🎯" },
    { name: "Open World / RPG", pct: 75, color: "#a855f7", icon: "🗺️" },
    { name: "Strategy", pct: 55, color: "#fbbf24", icon: "♟️" },
  ],
  favorites: [
    { name: "Liên Quân Mobile", role: "Main Hero: Thủ Thành", hrs: "1000+ giờ", color: "#34d399", icon: "⚔️" },
    { name: "Genshin Impact", role: "Khám phá & Lore", hrs: "500+ giờ", color: "#60a5fa", icon: "🌍" },
    { name: "Valorant", role: "Duelist / Controller", hrs: "300+ giờ", color: "#f43f5e", icon: "🔫" },
    { name: "Minecraft", role: "Creative & Survival", hrs: "800+ giờ", color: "#78c850", icon: "⛏️" },
  ],
  playstyle: ["Teamwork 🤝", "Competitive 🏅", "Story-driven 📖", "Chill farm 🌾"],
};

const GAME_STYLES = `
  .h-card {
    border-radius:20px; border:1px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.03); backdrop-filter:blur(20px);
    transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
  }
  .h-card:hover { transform:translateY(-4px); border-color:rgba(108,188,255,0.2); box-shadow:0 16px 48px rgba(108,188,255,0.08); }
  .h-bar { animation: h-bar 1.2s cubic-bezier(.4,0,.2,1) .3s both }
  @keyframes h-bar { from{width:0} }
  .h-tag {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 14px; border-radius:99px; font-size:12px; font-weight:500;
  }
  .h-skill-track { height:4px; border-radius:99px; background:rgba(255,255,255,0.06); overflow:hidden; }
  [data-theme="light"] .h-card { background:rgba(255,255,255,0.62); border-color:rgba(91,135,212,0.18); }
  [data-theme="light"] .h-card:hover { border-color:rgba(91,135,212,0.4); box-shadow:0 16px 48px rgba(91,135,212,0.12); }
  [data-theme="light"] .h-skill-track { background:rgba(91,135,212,0.14); }
`;

export default function GameTab() {
  return (
    <div className="flex flex-col gap-6">
      <style>{GAME_STYLES}</style>
      <p className="text-[14px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
        {GAME_DATA.desc}
      </p>

      {/* Genre bars */}
      <div className="h-card p-6">
        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>
          Thể loại game
        </p>
        <div className="flex flex-col gap-4">
          {GAME_DATA.genres.map((g) => (
            <div key={g.name}>
              <div className="flex justify-between mb-1.5 items-center">
                <span className="text-[13px] font-medium flex items-center gap-2" style={{ color: "var(--text-heading)" }}>
                  <span>{g.icon}</span>{g.name}
                </span>
                <span className="text-[11px] font-bold" style={{ color: g.color, fontFamily: "'DM Mono',monospace" }}>{g.pct}%</span>
              </div>
              <div className="h-skill-track">
                <div className="h-bar h-full rounded-full" style={{ width: `${g.pct}%`, background: `linear-gradient(90deg,${g.color}55,${g.color})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorite games */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {GAME_DATA.favorites.map((g) => (
          <div key={g.name} className="h-card p-5 flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${g.color}18`, border: `1px solid ${g.color}30` }}>
              {g.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-bold" style={{ color: "var(--text-heading)" }}>{g.name}</p>
              <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>{g.role}</p>
              <span className="h-tag mt-2 text-[11px]" style={{ background: `${g.color}18`, border: `1px solid ${g.color}30`, color: g.color }}>
                🕐 {g.hrs}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Playstyle */}
      <div className="flex flex-wrap gap-2">
        {GAME_DATA.playstyle.map((p) => (
          <span key={p} className="h-tag" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.25)", color: "#34d399" }}>{p}</span>
        ))}
      </div>
    </div>
  );
}
