import { useState } from "react";
import { HOBBY_TABS } from "../../utils/constant";
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
`;



export default function HobbiesPage() {
  const [active, setActive] = useState("music");
  const current = HOBBY_TABS.find((t) => t.id === active);

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
              {HOBBY_TABS.map((t) => (
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
