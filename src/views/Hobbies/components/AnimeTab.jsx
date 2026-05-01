import { useState } from "react";

const ANIME_STYLES = `
  @keyframes anime-shimmer {
    0%   { background-position: -200% 0 }
    100% { background-position:  200% 0 }
  }
  @keyframes anime-float {
    0%,100% { transform: translateY(0px) }
    50%     { transform: translateY(-6px) }
  }
  @keyframes anime-slide-in {
    from { opacity: 0; transform: translateX(20px) }
    to   { opacity: 1; transform: translateX(0) }
  }
  @keyframes anime-scale-in {
    from { opacity: 0; transform: scale(0.92) }
    to   { opacity: 1; transform: scale(1) }
  }

  .anime-card-poster {
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
    position: relative;
  }
  .anime-card-poster:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 24px 48px rgba(0,0,0,0.5);
  }
  .anime-poster-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 55%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 14px 12px;
    transition: background 0.3s ease;
  }
  .anime-card-poster:hover .anime-poster-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.1) 100%);
  }
  .anime-featured {
    border-radius: 24px; overflow: hidden; position: relative;
    transition: box-shadow 0.3s ease;
  }
  .anime-featured:hover { box-shadow: 0 32px 64px rgba(0,0,0,0.5); }
  .anime-featured-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 45%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 32px;
  }
  .anime-star { color: #fbbf24; font-size: 14px; }
  .anime-star.empty { color: rgba(255,255,255,0.2); }
  .anime-tag-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;
    background: rgba(251,146,60,0.15); border: 1px solid rgba(251,146,60,0.35); color: #fb923c;
    transition: all 0.2s ease; cursor: default;
  }
  .anime-tag-chip:hover { background: rgba(251,146,60,0.28); transform: translateY(-1px); }
  .anime-scroll-row {
    display: flex; gap: 14px; overflow-x: auto; padding-bottom: 8px;
    scrollbar-width: none; -ms-overflow-style: none;
  }
  .anime-scroll-row::-webkit-scrollbar { display: none; }
  .anime-status-live {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 99px; font-size: 10px; font-weight: 700;
    background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.4); color: #ef4444;
    letter-spacing: 0.06em;
  }
  .anime-status-done {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 3px 10px; border-radius: 99px; font-size: 10px; font-weight: 700;
    background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3); color: #34d399;
    letter-spacing: 0.06em;
  }
`;

const ANIME_LIST = [
  {
    title: "Attack on Titan",
    genre: "Action / Drama",
    rating: 9.9,
    status: "Đã xem",
    ep: "87 ep",
    color: "#fb923c",
    bg: "linear-gradient(135deg,#1a0a00 0%,#3d1a00 40%,#7c3500 100%)",
    emoji: "⚔️",
    desc: "Nhân loại chiến đấu sống còn trước những người khổng lồ ăn thịt người.",
    featured: true,
  },
  {
    title: "Jujutsu Kaisen",
    genre: "Action / Shounen",
    rating: 9.5,
    status: "Đang xem",
    ep: "47 ep",
    color: "#f43f5e",
    bg: "linear-gradient(135deg,#1a0010 0%,#3d0025 40%,#7c0050 100%)",
    emoji: "💀",
    desc: "Yuji Itadori nuốt ngón tay nguyền rủa và bước vào thế giới phù thủy.",
  },
  {
    title: "Demon Slayer",
    genre: "Action / Fantasy",
    rating: 9.3,
    status: "Đã xem",
    ep: "55 ep",
    color: "#e879f9",
    bg: "linear-gradient(135deg,#1a0020 0%,#3d0050 40%,#7c00a0 100%)",
    emoji: "🗡️",
    desc: "Tanjiro Kamado chinh chiến diệt quỷ để cứu em gái.",
  },
  {
    title: "Steins;Gate",
    genre: "Sci-fi / Thriller",
    rating: 9.8,
    status: "Đã xem",
    ep: "24 ep",
    color: "#60a5fa",
    bg: "linear-gradient(135deg,#00101a 0%,#002840 40%,#004070 100%)",
    emoji: "⏰",
    desc: "Nhóm sinh viên vô tình phát minh ra cỗ máy thời gian.",
  },
  {
    title: "Vinland Saga",
    genre: "Historical / Drama",
    rating: 9.2,
    status: "Đã xem",
    ep: "48 ep",
    color: "#34d399",
    bg: "linear-gradient(135deg,#001a10 0%,#003d28 40%,#006b44 100%)",
    emoji: "🛡️",
    desc: "Hành trình báo thù của chiến binh Viking trẻ tuổi Thorfinn.",
  },
  {
    title: "One Piece",
    genre: "Adventure / Shounen",
    rating: 9.0,
    status: "Đang xem",
    ep: "1100+ ep",
    color: "#fbbf24",
    bg: "linear-gradient(135deg,#1a1000 0%,#3d2800 40%,#7c5000 100%)",
    emoji: "🏴‍☠️",
    desc: "Monkey D. Luffy và băng Mũ Rơm chinh phục đại dương.",
  },
];

function StarRating({ rating }) {
  const full  = Math.floor(rating / 2);
  const empty = 5 - full;
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: full  }).map((_, i) => <span key={`f${i}`} className="anime-star">★</span>)}
      {Array.from({ length: empty }).map((_, i) => <span key={`e${i}`} className="anime-star empty">★</span>)}
    </span>
  );
}

export default function AnimeTab() {
  const [featured, setFeatured] = useState(ANIME_LIST[0]);

  return (
    <div className="flex flex-col gap-6">
      <style>{ANIME_STYLES}</style>

      {/* ── FEATURED HERO CARD ── */}
      <div
        className="anime-featured"
        style={{
          background: featured.bg,
          border: `1px solid ${featured.color}30`,
          minHeight: 280,
        }}
      >
        {/* Manga-panel texture overlay */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px),
                            repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(255,255,255,1) 28px,rgba(255,255,255,1) 29px)`,
        }} />

        {/* Glow blob */}
        <div style={{
          position: "absolute", right: -40, top: -40,
          width: 300, height: 300, borderRadius: "50%",
          background: featured.color, opacity: 0.12, filter: "blur(80px)",
        }} />

        {/* Big emoji "character" */}
        <div style={{
          position: "absolute", right: 24, bottom: 0,
          fontSize: 120, lineHeight: 1, opacity: 0.22,
          userSelect: "none", pointerEvents: "none",
          filter: "drop-shadow(0 0 24px " + featured.color + ")",
        }}>
          {featured.emoji}
        </div>

        <div className="anime-featured-overlay">
          {/* Label */}
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: featured.color, marginBottom: 8, textTransform: "uppercase" }}>
            🎌 Now Featured
          </p>

          {/* Title */}
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(24px,4vw,38px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 10 }}>
            {featured.title}
          </h2>

          {/* Stars + rating */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <StarRating rating={featured.rating} />
            <span style={{
              fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 14,
              background: featured.color, color: "#000", borderRadius: 8,
              padding: "2px 8px", letterSpacing: "0.04em",
            }}>
              {featured.rating}
            </span>
          </div>

          {/* Meta */}
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 10 }}>
            {featured.genre} &nbsp;·&nbsp; {featured.ep}
          </p>

          {/* Desc */}
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 380, marginBottom: 14 }}>
            {featured.desc}
          </p>

          {/* Status */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {featured.status === "Đang xem"
              ? <span className="anime-status-live"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />ĐANG XEM</span>
              : <span className="anime-status-done">✓ ĐÃ XEM XONG</span>
            }
          </div>
        </div>
      </div>

      {/* ── MOST POPULAR ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#fb923c", textTransform: "uppercase", marginBottom: 2 }}>Most Popular</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, color: "var(--text-heading)" }}>Danh sách yêu thích</p>
          </div>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "var(--text-muted)" }}>{ANIME_LIST.length} series</span>
        </div>

        <div className="anime-scroll-row">
          {ANIME_LIST.map((a) => (
            <div
              key={a.title}
              className="anime-card-poster"
              onClick={() => setFeatured(a)}
              style={{
                minWidth: 140, height: 200,
                background: a.bg,
                border: `2px solid ${featured.title === a.title ? a.color : "transparent"}`,
                boxShadow: featured.title === a.title ? `0 0 0 1px ${a.color}40, 0 8px 24px ${a.color}30` : "none",
                flexShrink: 0,
              }}
            >
              {/* Grid texture */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.05,
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,1) 18px,rgba(255,255,255,1) 19px),
                                  repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(255,255,255,1) 18px,rgba(255,255,255,1) 19px)`,
              }} />

              {/* Emoji art */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -60%)",
                fontSize: 52, opacity: 0.4, userSelect: "none",
                filter: `drop-shadow(0 0 12px ${a.color})`,
              }}>
                {a.emoji}
              </div>

              {/* Rating badge */}
              <div style={{
                position: "absolute", top: 10, right: 10,
                background: a.color, color: "#000", borderRadius: 8,
                fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 800,
                padding: "3px 7px", letterSpacing: "0.04em",
              }}>
                {a.rating}
              </div>

              <div className="anime-poster-overlay">
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 4 }}>
                  {a.title}
                </p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                  {a.ep}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GENRE TAGS ── */}
      <div className="h-card p-5">
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
          Thể loại ưa thích
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["Action 🗡️", "Fantasy 🔮", "Drama 🎭", "Sci-fi 🚀", "Shounen 💪", "Thriller 😱", "Historical 🏛️", "Adventure ⛵"].map((t) => (
            <span key={t} className="anime-tag-chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
