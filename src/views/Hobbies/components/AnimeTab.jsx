import { useState, useEffect, useRef } from "react";

const ANIME_STYLES = `
  @keyframes anime-float {
    0%,100% { transform: translateY(0px) }
    50%     { transform: translateY(-6px) }
  }
  @keyframes anime-slide-fade {
    from { opacity: 0; transform: translateX(40px) }
    to   { opacity: 1; transform: translateX(0) }
  }
  @keyframes anime-dot-grow {
    from { width: 8px }
    to   { width: 28px }
  }

  /* ── Carousel ── */
  .anime-carousel {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    min-height: 300px;
    cursor: grab;
    user-select: none;
  }
  .anime-carousel:active { cursor: grabbing; }

  .anime-slides-track {
    display: flex;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
  }
  .anime-slide {
    min-width: 100%;
    position: relative;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .anime-slide-bg {
    position: absolute; inset: 0;
    transition: transform 0.6s ease;
  }
  .anime-carousel:hover .anime-slide-bg { transform: scale(1.04); }

  .anime-slide-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, transparent 100%);
  }
  .anime-slide-content {
    position: relative;
    padding: 32px 32px 28px;
    animation: anime-slide-fade 0.5s ease both;
  }

  /* Nav arrows */
  .anime-nav-btn {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 40px; height: 40px; border-radius: 50%;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    color: #fff; font-size: 16px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s ease, transform 0.2s ease;
    z-index: 10;
    backdrop-filter: blur(8px);
  }
  .anime-nav-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-50%) scale(1.1); }
  .anime-nav-prev { left: 14px; }
  .anime-nav-next { right: 14px; }

  /* Dots */
  .anime-dots {
    position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
    display: flex; align-items: center; gap: 6px; z-index: 10;
  }
  .anime-dot {
    height: 6px; border-radius: 99px;
    background: rgba(255,255,255,0.35);
    transition: width 0.35s ease, background 0.35s ease;
    width: 8px; cursor: pointer; border: none; padding: 0;
  }
  .anime-dot.active {
    width: 28px;
    background: #fff;
  }

  /* Progress bar */
  /* removed */

  /* Poster cards */
  .anime-card-poster {
    border-radius: 16px; overflow: hidden; cursor: pointer; position: relative;
    transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease;
    flex-shrink: 0;
  }
  .anime-card-poster:hover { transform: translateY(-8px) scale(1.04); box-shadow: 0 24px 48px rgba(0,0,0,0.5); }
  .anime-poster-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 12px;
  }
  .anime-scroll-row {
    display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px;
    scrollbar-width: none; -ms-overflow-style: none;
  }
  .anime-scroll-row::-webkit-scrollbar { display: none; }
  .anime-tag-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 4px 12px; border-radius: 99px; font-size: 11px; font-weight: 600;
    background: rgba(251,146,60,0.15); border: 1px solid rgba(251,146,60,0.35); color: #fb923c;
    transition: all 0.2s ease;
  }
  .anime-tag-chip:hover { background: rgba(251,146,60,0.28); transform: translateY(-1px); }
  .anime-status-live {
    display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
    border-radius: 99px; font-size: 10px; font-weight: 700;
    background: rgba(239,68,68,0.2); border: 1px solid rgba(239,68,68,0.4); color: #ef4444;
  }
  .anime-status-done {
    display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px;
    border-radius: 99px; font-size: 10px; font-weight: 700;
    background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3); color: #34d399;
  }
`;

const FEATURED = [
  {
    title: "Attack on Titan",
    genre: "Action / Dark Fantasy",
    rating: 9.9,
    status: "Đã xem",
    ep: "87 tập",
    color: "#fb923c",
    bg: "linear-gradient(135deg,#0d0500 0%,#3d1500 50%,#7c3500 100%)",
    emoji: "⚔️",
    desc: "Nhân loại chiến đấu sống còn trước những gã khổng lồ ăn thịt người — câu chuyện về tự do và hy sinh.",
  },
  {
    title: "Steins;Gate",
    genre: "Sci-fi / Thriller",
    rating: 9.8,
    status: "Đã xem",
    ep: "24 tập",
    color: "#60a5fa",
    bg: "linear-gradient(135deg,#00090d 0%,#002240 50%,#003d6e 100%)",
    emoji: "⏰",
    desc: "Rintaro Okabe vô tình phát minh ra máy gửi tin nhắn về quá khứ — mỗi thay đổi mang đến thảm họa mới.",
  },
  {
    title: "Jujutsu Kaisen",
    genre: "Action / Supernatural",
    rating: 9.5,
    status: "Đang xem",
    ep: "47 tập",
    color: "#f43f5e",
    bg: "linear-gradient(135deg,#0d0008 0%,#3d0020 50%,#7c0042 100%)",
    emoji: "💀",
    desc: "Yuji Itadori nuốt ngón tay nguyền rủa của vương giả và trở thành chiến binh chú thuật.",
  },
  {
    title: "Vinland Saga",
    genre: "Historical / Drama",
    rating: 9.2,
    status: "Đã xem",
    ep: "48 tập",
    color: "#34d399",
    bg: "linear-gradient(135deg,#000d07 0%,#002d18 50%,#004d28 100%)",
    emoji: "🛡️",
    desc: "Hành trình báo thù của chiến binh Viking Thorfinn dẫn đến những bài học về ý nghĩa thật sự của sức mạnh.",
  },
  {
    title: "Demon Slayer",
    genre: "Action / Fantasy",
    rating: 9.3,
    status: "Đã xem",
    ep: "55 tập",
    color: "#e879f9",
    bg: "linear-gradient(135deg,#0a0010 0%,#2d0040 50%,#5a0080 100%)",
    emoji: "🗡️",
    desc: "Tanjiro Kamado luyện tập không ngừng để trở thành thợ săn quỷ và giải cứu em gái.",
  },
];

const ALL_ANIME = [
  { title: "Attack on Titan", genre: "Action", rating: 9.9, status: "Đã xem", ep: "87 ep", color: "#fb923c", bg: "linear-gradient(135deg,#1a0a00,#7c3500)", emoji: "⚔️" },
  { title: "Steins;Gate",      genre: "Sci-fi",  rating: 9.8, status: "Đã xem", ep: "24 ep", color: "#60a5fa", bg: "linear-gradient(135deg,#00090d,#003d6e)", emoji: "⏰" },
  { title: "Jujutsu Kaisen",   genre: "Action",  rating: 9.5, status: "Đang xem", ep: "47 ep", color: "#f43f5e", bg: "linear-gradient(135deg,#0d0008,#7c0042)", emoji: "💀" },
  { title: "Vinland Saga",     genre: "Drama",   rating: 9.2, status: "Đã xem", ep: "48 ep", color: "#34d399", bg: "linear-gradient(135deg,#000d07,#004d28)", emoji: "🛡️" },
  { title: "Demon Slayer",     genre: "Fantasy", rating: 9.3, status: "Đã xem", ep: "55 ep", color: "#e879f9", bg: "linear-gradient(135deg,#0a0010,#5a0080)", emoji: "🗡️" },
  { title: "One Piece",        genre: "Adventure", rating: 9.0, status: "Đang xem", ep: "1100+ ep", color: "#fbbf24", bg: "linear-gradient(135deg,#0d0a00,#6b4400)", emoji: "🏴‍☠️" },
];

function StarRating({ rating, color }) {
  const full = Math.floor(rating / 2);
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < full ? "#fbbf24" : "rgba(255,255,255,0.2)", fontSize: 13 }}>★</span>
      ))}
    </span>
  );
}

function AnimeCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const INTERVAL = 4000;

  const goTo = (idx) => {
    const next = (idx + FEATURED.length) % FEATURED.length;
    setCurrent(next);
  };

  // Auto-slide
  useEffect(() => {
    timerRef.current = setTimeout(() => goTo(current + 1), INTERVAL);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  // Swipe support
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  const slide = FEATURED[current];

  return (
    <div
      className="anime-carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides track */}
      <div
        className="anime-slides-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {FEATURED.map((s, i) => (
          <div key={i} className="anime-slide">
            {/* Background */}
            <div
              className="anime-slide-bg"
              style={{ background: s.bg }}
            >
              {/* Manga grid texture */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.04,
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 26px,rgba(255,255,255,1) 26px,rgba(255,255,255,1) 27px),
                                  repeating-linear-gradient(90deg,transparent,transparent 26px,rgba(255,255,255,1) 26px,rgba(255,255,255,1) 27px)`,
              }} />
              {/* Glow blob */}
              <div style={{
                position: "absolute", right: -60, top: -60,
                width: 360, height: 360, borderRadius: "50%",
                background: s.color, opacity: 0.12, filter: "blur(90px)",
              }} />
              {/* Character emoji art */}
              <div style={{
                position: "absolute", right: 28, bottom: 0,
                fontSize: 160, lineHeight: 1, opacity: 0.18,
                userSelect: "none", pointerEvents: "none",
                filter: `drop-shadow(0 0 32px ${s.color})`,
              }}>
                {s.emoji}
              </div>
            </div>

            <div className="anime-slide-overlay" />

            {/* Content */}
            <div className="anime-slide-content">
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.2em", color: s.color, textTransform: "uppercase", marginBottom: 8 }}>
                🎌 Featured Anime · {i + 1}/{FEATURED.length}
              </p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 8 }}>
                {s.title}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <StarRating rating={s.rating} />
                <span style={{
                  fontFamily: "'DM Mono',monospace", fontWeight: 700, fontSize: 13,
                  background: s.color, color: "#000", borderRadius: 6, padding: "2px 8px",
                }}>
                  {s.rating}
                </span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                  {s.genre} · {s.ep}
                </span>
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 400, marginBottom: 14 }}>
                {s.desc}
              </p>
              {s.status === "Đang xem"
                ? <span className="anime-status-live"><span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />ĐANG XEM</span>
                : <span className="anime-status-done">✓ ĐÃ XEM XONG</span>
              }
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="anime-nav-btn anime-nav-prev" onClick={() => goTo(current - 1)} aria-label="Previous">‹</button>
      <button className="anime-nav-btn anime-nav-next" onClick={() => goTo(current + 1)} aria-label="Next">›</button>

      {/* Dots */}
      <div className="anime-dots">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            className={`anime-dot${i === current ? " active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AnimeTab() {
  return (
    <div className="flex flex-col gap-6">
      <style>{ANIME_STYLES}</style>

      {/* ── CAROUSEL BANNER ── */}
      <AnimeCarousel />

      {/* ── ALL ANIME SCROLL ROW ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "#fb923c", textTransform: "uppercase", marginBottom: 2 }}>Most Popular</p>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 800, color: "var(--text-heading)" }}>Danh sách yêu thích</p>
          </div>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "var(--text-muted)" }}>{ALL_ANIME.length} series</span>
        </div>

        <div className="anime-scroll-row">
          {ALL_ANIME.map((a) => (
            <div
              key={a.title}
              className="anime-card-poster"
              style={{ minWidth: 130, height: 186, background: a.bg }}
            >
              {/* Grid texture */}
              <div style={{
                position: "absolute", inset: 0, opacity: 0.05,
                backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(255,255,255,1) 16px,rgba(255,255,255,1) 17px),
                                  repeating-linear-gradient(90deg,transparent,transparent 16px,rgba(255,255,255,1) 16px,rgba(255,255,255,1) 17px)`,
              }} />
              {/* Emoji art */}
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -58%)",
                fontSize: 48, opacity: 0.35, userSelect: "none",
                filter: `drop-shadow(0 0 10px ${a.color})`,
              }}>{a.emoji}</div>
              {/* Rating */}
              <div style={{
                position: "absolute", top: 8, right: 8,
                background: a.color, color: "#000", borderRadius: 6,
                fontFamily: "'DM Mono',monospace", fontSize: 10, fontWeight: 800,
                padding: "2px 6px",
              }}>{a.rating}</div>
              <div className="anime-poster-overlay">
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 2 }}>{a.title}</p>
                <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(255,255,255,0.45)" }}>{a.ep}</p>
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
