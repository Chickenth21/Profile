import { useState, useEffect } from "react";
import MusicTab from "./components/MusicTab";
import AnimeTab from "./components/AnimeTab";
import GameTab from "./components/GameTab";


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
`;

export default function HobbiesPage({ initialTab = "music" }) {
  const [active, setActive] = useState(initialTab);
  const GRAD_MAP = { music: "h-grad-music", anime: "h-grad-anime", game: "h-grad-game" };
  const COLOR_MAP = { music: "#f472b6", anime: "#fb923c", game: "#34d399" };
  const LABEL_MAP = { music: "Âm nhạc", anime: "Anime", game: "Game" };
  const currentColor = COLOR_MAP[active] ?? "#6cbcff";
  const currentGrad  = GRAD_MAP[active]  ?? "h-grad-music";

  // Sync khi dropdown header thay đổi (component đã mount)
  useEffect(() => {
    setActive(initialTab);
  }, [initialTab]);

  return (
    <>
      <style>{STYLES}</style>
      <div
        className="relative z-[1] min-h-screen py-16 px-4 md:px-8"
        style={{ fontFamily: "'DM Sans',sans-serif" }}
      >
        {/* bg blobs */}
        <div
          className="h-glow pointer-events-none fixed -left-48 top-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: currentColor, opacity: 0.07 }}
        />
        <div
          className="h-glow pointer-events-none fixed -right-32 bottom-1/4 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{
            background: currentColor,
            opacity: 0.05,
            animationDelay: "2s",
          }}
        />

        <div className="mx-auto max-w-[920px]">
          {/* Header nhỏ hiển thị tab đang chọn */}
          <div className="h-rise h-d1 mb-8">
            <p className="mb-1 text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)", fontFamily: "'DM Mono',monospace" }}>03 — Hobbies</p>
            <h1 className="text-[clamp(28px,4vw,44px)] font-black leading-tight" style={{ fontFamily: "'Playfair Display',serif", color: "var(--text-heading)" }}>
              <span className={currentGrad}>{LABEL_MAP[active]}</span>
            </h1>
          </div>

          {/* Content */}
          <div className="h-rise h-d2" key={active}>
            {active === "music" && <MusicTab />}
            {active === "anime" && <AnimeTab />}
            {active === "game"  && <GameTab />}
          </div>
        </div>
      </div>
    </>
  );
}
