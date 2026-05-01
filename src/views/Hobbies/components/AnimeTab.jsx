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

export default function AnimeTab() {
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
