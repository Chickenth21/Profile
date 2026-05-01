import { useState } from "react";
import { createPortal } from "react-dom";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap');

  @keyframes h-rise  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes h-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes h-glow  { 0%,100%{opacity:.07} 50%{opacity:.16} }
  @keyframes h-bar   { from{width:0} }
  @keyframes h-pulse { 0%,100%{box-shadow:0 0 0 0 currentColor} 50%{box-shadow:0 0 0 6px transparent} }

  .h-rise  { animation: h-rise  .55s cubic-bezier(.22,.68,0,1.2) both }
  .h-d1{animation-delay:.05s} .h-d2{animation-delay:.13s} .h-d3{animation-delay:.21s}
  .h-d4{animation-delay:.29s} .h-d5{animation-delay:.37s}
  .h-float { animation: h-float 4s ease-in-out infinite }
  .h-glow  { animation: h-glow  5s ease-in-out infinite }
  .h-bar   { animation: h-bar   1.2s cubic-bezier(.4,0,.2,1) .3s both }

  .h-grad-music { background:linear-gradient(120deg,#f472b6,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .h-grad-anime { background:linear-gradient(120deg,#fb923c,#f43f5e); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .h-grad-game  { background:linear-gradient(120deg,#34d399,#3b82f6); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }

  .h-card {
    border-radius:20px; border:1px solid rgba(255,255,255,0.07);
    background:rgba(255,255,255,0.03); backdrop-filter:blur(20px);
    transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease;
  }
  .h-card:hover { transform:translateY(-4px); border-color:rgba(108,188,255,0.2); box-shadow:0 16px 48px rgba(108,188,255,0.08); }

  .h-sub-btn {
    padding:10px 22px; border-radius:99px; font-size:14px; font-weight:600;
    border:1px solid transparent; cursor:pointer;
    transition:all .25s ease; white-space:nowrap;
  }
  .h-sub-btn.active-music { background:rgba(244,114,182,0.15); border-color:rgba(244,114,182,0.4); color:#f472b6; }
  .h-sub-btn.active-anime { background:rgba(251,146,60,0.15);  border-color:rgba(251,146,60,0.4);  color:#fb923c; }
  .h-sub-btn.active-game  { background:rgba(52,211,153,0.15);  border-color:rgba(52,211,153,0.4);  color:#34d399; }
  .h-sub-btn.inactive { background:rgba(255,255,255,0.03); border-color:rgba(255,255,255,0.08); color:var(--text-muted); }
  .h-sub-btn.inactive:hover { background:rgba(255,255,255,0.07); color:var(--text-heading); }

  .h-tag {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 14px; border-radius:99px; font-size:12px; font-weight:500;
  }
  .h-skill-track { height:4px; border-radius:99px; background:rgba(255,255,255,0.06); overflow:hidden; }

  [data-theme="light"] .h-card { background:rgba(255,255,255,0.62); border-color:rgba(91,135,212,0.18); }
  [data-theme="light"] .h-card:hover { border-color:rgba(91,135,212,0.4); box-shadow:0 16px 48px rgba(91,135,212,0.12); }
  [data-theme="light"] .h-skill-track { background:rgba(91,135,212,0.14); }
  [data-theme="light"] .h-sub-btn.inactive { background:rgba(255,255,255,0.5); border-color:rgba(91,135,212,0.2); }

  .h-lb {
    position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.93); backdrop-filter:blur(14px);
    display:flex; align-items:center; justify-content:center; padding:24px;
    animation:h-rise .2s ease both;
  }
  .h-lb img { max-width:88vw; max-height:82vh; border-radius:14px; object-fit:contain; box-shadow:0 24px 80px rgba(0,0,0,0.6); }
  .h-lb-close {
    position:absolute; top:18px; right:22px; background:rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.2); color:#fff; border-radius:50%;
    width:38px; height:38px; cursor:pointer; font-size:16px;
    display:flex; align-items:center; justify-content:center; transition:background .2s;
  }
  .h-lb-close:hover { background:rgba(255,255,255,0.22); }
  .h-lb-caption {
    position:absolute; bottom:20px; left:50%; transform:translateX(-50%);
    background:rgba(0,0,0,0.6); color:#fff; border-radius:99px;
    padding:5px 16px; font-size:13px; white-space:nowrap; border:1px solid rgba(255,255,255,0.1);
  }
`;

/* ── DATA ── */
const MUSIC_DATA = {
  desc: "Âm nhạc là người bạn đồng hành mỗi ngày — từ những buổi code đến lúc thư giãn. Tôi yêu thích nhiều thể loại nhưng đặc biệt mê nhạc Việt và chill beats.",
  genres: [
    { name: "V-Pop", pct: 70, color: "#f472b6", icon: "🇻🇳" },
    { name: "Lo-fi / Chill", pct: 80, color: "#a855f7", icon: "☕" },
    { name: "OST / Nhạc phim", pct: 60, color: "#e879f9", icon: "🎬" },
    { name: "Acoustic", pct: 55, color: "#c084fc", icon: "🎸" },
  ],
  favorites: [
    { title: "Chúng Ta Của Hiện Tại", artist: "Sơn Tùng M-TP", mood: "🌊 Sâu lắng" },
    { title: "Có Chắc Yêu Là Đây", artist: "Sơn Tùng M-TP", mood: "🔥 Sôi động" },
    { title: "Waiting for You", artist: "MONO", mood: "🌙 Tâm trạng" },
    { title: "Nàng Thơ", artist: "Hoàng Dũng", mood: "🌸 Nhẹ nhàng" },
    { title: "Em Của Ngày Hôm Qua", artist: "Sơn Tùng M-TP", mood: "💫 Hoài niệm" },
    { title: "Ở Đây Thôi", artist: "Vũ.", mood: "🎵 Acoustic" },
  ],
  moods: ["Code session 💻", "Lúc buồn 🌧️", "Trước khi ngủ 🌙", "Sáng sớm ☀️"],
};

const ANIME_DATA = {
  desc: "Anime không chỉ là hoạt hình — đó là nghệ thuật kể chuyện đỉnh cao. Mỗi series là một thế giới mới, mỗi nhân vật là một bài học về cuộc sống.",
  watching: [
    { title: "Jujutsu Kaisen", genre: "Action / Shounen", rating: 9.5, status: "Đang xem", color: "#f43f5e", ep: "47 ep" },
    { title: "Attack on Titan", genre: "Action / Drama", rating: 9.9, status: "Đã xem", color: "#fb923c", ep: "87 ep" },
    { title: "Demon Slayer", genre: "Action / Fantasy", rating: 9.3, status: "Đã xem", color: "#e879f9", ep: "55 ep" },
    { title: "Vinland Saga", genre: "Historical / Drama", rating: 9.2, status: "Đã xem", color: "#34d399", ep: "48 ep" },
    { title: "One Piece", genre: "Adventure / Shounen", rating: 9.0, status: "Đang xem", color: "#fbbf24", ep: "1100+ ep" },
    { title: "Steins;Gate", genre: "Sci-fi / Thriller", rating: 9.8, status: "Đã xem", color: "#60a5fa", ep: "24 ep" },
  ],
  tags: ["Action 🗡️", "Fantasy 🔮", "Drama 🎭", "Sci-fi 🚀", "Shounen 💪", "Thriller 😱"],
};

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

/* ── Sub-components ── */
function MusicTab() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[14px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
        {MUSIC_DATA.desc}
      </p>

      {/* Genre bars */}
      <div className="h-card p-6">
        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>
          Thể loại yêu thích
        </p>
        <div className="flex flex-col gap-4">
          {MUSIC_DATA.genres.map((g) => (
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

      {/* Favorites grid */}
      <div className="h-card p-6">
        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>
          Bài hát / Nghệ sĩ yêu thích
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {MUSIC_DATA.favorites.map((s) => (
            <div key={s.title} className="flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.15)" }}>
              <span className="text-2xl flex-shrink-0">🎵</span>
              <div className="min-w-0">
                <p className="text-[13px] font-semibold truncate" style={{ color: "var(--text-heading)" }}>{s.title}</p>
                <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>{s.artist}</p>
              </div>
              <span className="h-tag flex-shrink-0 text-[11px]" style={{ background: "rgba(244,114,182,0.1)", border: "1px solid rgba(244,114,182,0.2)", color: "#f472b6" }}>{s.mood}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Moods */}
      <div className="flex flex-wrap gap-2">
        {MUSIC_DATA.moods.map((m) => (
          <span key={m} className="h-tag" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: "#a855f7" }}>{m}</span>
        ))}
      </div>
    </div>
  );
}

function AnimeTab() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-[14px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
        {ANIME_DATA.desc}
      </p>

      {/* Anime list */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {ANIME_DATA.watching.map((a) => (
          <div key={a.title} className="h-card p-5 flex gap-4 items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${a.color}18`, border: `1px solid ${a.color}30` }}>
              🎌
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-[14px] font-bold truncate" style={{ color: "var(--text-heading)" }}>{a.title}</p>
                <span className="text-[12px] font-bold flex-shrink-0" style={{ color: a.color }}>⭐ {a.rating}</span>
              </div>
              <p className="text-[11px] mb-2" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>{a.genre} · {a.ep}</p>
              <span className="h-tag text-[11px]" style={{ background: `${a.color}18`, border: `1px solid ${a.color}30`, color: a.color }}>
                {a.status === "Đang xem" ? "📺 " : "✅ "}{a.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Genre tags */}
      <div className="h-card p-5">
        <p className="mb-3 text-[11px] uppercase tracking-[0.14em] font-semibold" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>
          Thể loại ưa thích
        </p>
        <div className="flex flex-wrap gap-2">
          {ANIME_DATA.tags.map((t) => (
            <span key={t} className="h-tag" style={{ background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.25)", color: "#fb923c" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameTab() {
  return (
    <div className="flex flex-col gap-6">
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

/* ── Main Page ── */
const TABS = [
  { id: "music", label: "Âm nhạc", icon: "🎵", grad: "h-grad-music", active: "active-music", color: "#f472b6" },
  { id: "anime", label: "Anime",   icon: "🎌", grad: "h-grad-anime", active: "active-anime", color: "#fb923c" },
  { id: "game",  label: "Game",    icon: "🎮", grad: "h-grad-game",  active: "active-game",  color: "#34d399" },
];

export default function HobbiesPage() {
  const [active, setActive] = useState("music");
  const current = TABS.find((t) => t.id === active);

  return (
    <>
      <style>{STYLES}</style>
      <div className="relative z-[1] min-h-screen py-16 px-4 md:px-8" style={{ fontFamily: "'DM Sans',sans-serif" }}>

        {/* bg blobs */}
        <div className="h-glow pointer-events-none fixed -left-48 top-1/4 h-[500px] w-[500px] rounded-full blur-[120px]" style={{ background: current.color, opacity: 0.07 }} />
        <div className="h-glow pointer-events-none fixed -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[120px]" style={{ background: current.color, opacity: 0.05, animationDelay: "2s" }} />

        <div className="mx-auto max-w-[920px]">

          {/* Header */}
          <div className="h-rise h-d1 mb-10 text-center">
            <p className="mb-3 text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>
              03 — Hobbies
            </p>
            <h1 className="mb-4 text-[clamp(34px,5vw,58px)] font-black leading-tight" style={{ fontFamily: "'Playfair Display',serif", color: "var(--text-heading)" }}>
              Sở thích &amp; <span className={current.grad}>Đam mê</span>
            </h1>
            <p className="mx-auto max-w-[440px] text-[15px] leading-[1.85]" style={{ color: "var(--text-muted)" }}>
              Ngoài code, đây là những thứ giúp tôi cân bằng cuộc sống và tìm thấy nguồn cảm hứng mỗi ngày.
            </p>
          </div>

          {/* Sub-tab bar */}
          <div className="h-rise h-d2 mb-8 flex justify-center">
            <div className="flex gap-2 rounded-2xl p-1.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`h-sub-btn ${active === t.id ? t.active : "inactive"}`}
                  onClick={() => setActive(t.id)}
                >
                  <span className="mr-1.5">{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="h-rise h-d3" key={active}>
            {active === "music" && <MusicTab />}
            {active === "anime" && <AnimeTab />}
            {active === "game"  && <GameTab />}
          </div>

        </div>
      </div>
    </>
  );
}
