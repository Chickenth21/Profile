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

export default function MusicTab() {
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
