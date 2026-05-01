/* ── Hobbies Page ── */
export const HOBBY_TABS = [
  { id: "music", label: "Âm nhạc", icon: "🎵", grad: "h-grad-music", active: "active-music", color: "#f472b6" },
  { id: "anime", label: "Anime",   icon: "🎌", grad: "h-grad-anime", active: "active-anime", color: "#fb923c" },
  { id: "game",  label: "Game",    icon: "🎮", grad: "h-grad-game",  active: "active-game",  color: "#34d399" },
];

/* ── Home Page ── */
export const HOME_SECTIONS = [
  { id: "hero",    label: "Hero" },
  { id: "intro",   label: "Giới thiệu" },
  { id: "explore", label: "Khám phá" },
  { id: "project", label: "Project" },
  { id: "cta",     label: "Liên hệ" },
];

export const HERO_STATS = [
  { num: "3+",  label: "Năm học" },
  { num: "10+", label: "Dự án" },
  { num: "0",   label: "GPA" },
];

export const HERO_BADGES = [
  { text: "🎮 Gaming",  top: -20,    left: -40,    bottom: "auto", right: "auto", delay: "0s" },
  { text: "🎵 Âm nhạc", top: "auto", left: -28,    bottom: -4,    right: "auto", delay: "0.9s" },
  { text: "🌸 Anime",   top: 40,     left: "auto", bottom: "auto", right: -52,   delay: "1.7s" },
];

export const PROJECT_STATS = [
  { num: null,        label: "GitHub Stars" }, // num được tính từ profile.featuredProject.stars
  { num: "Fullstack", label: "Project Type" },
  { num: "4 Tech",    label: "Technologies" },
];

/* ── Education Page ── */
export const FPT_PHOTOS = [
  { src: `${import.meta.env.BASE_URL}san-fpt.jpg`,       caption: "Sân trường – xe điện & cây vàng rực" },
  { src: `${import.meta.env.BASE_URL}the-thao-fpt.jpg`,  caption: "Khu thể thao – sân bóng rổ ngoài trời" },
  { src: `${import.meta.env.BASE_URL}thu-vien-fpt.jpeg`, caption: "Thư viện FPT – không gian học tập hiện đại" },
  { src: `${import.meta.env.BASE_URL}tuong-fpt.jpg`,     caption: "Tượng Self-Made Man – biểu tượng nghị lực" },
];

export const FPT_HIGHLIGHTS = [
  { icon: "🏙️", title: "Campus Hà Nội",       desc: "Toà nhà xanh hiện đại, thiết kế thoáng mát tại Khu CNC Hòa Lạc",             color: "#6cbcff" },
  { icon: "📚", title: "Thư viện đa tầng",    desc: "Kho tài nguyên phong phú, phòng đọc yên tĩnh & không gian nhóm",             color: "#b388ff" },
  { icon: "⚽", title: "Khu thể thao",        desc: "Sân bóng rổ, sân cầu lông, phòng gym đầy đủ tiện ích",                      color: "#34d399" },
  { icon: "🚌", title: "Xe điện nội khu",     desc: "Di chuyển thuận tiện giữa các toà nhà bằng xe bus điện miễn phí",           color: "#fb923c" },
  { icon: "💼", title: "OJT – Thực tập thực tế", desc: "Chương trình On-the-Job-Training bắt buộc 6 tháng tại doanh nghiệp",    color: "#f472b6" },
  { icon: "🌐", title: "Môi trường quốc tế",  desc: "Giảng dạy song ngữ, hợp tác với hàng trăm doanh nghiệp công nghệ",        color: "#fbbf24" },
];

export const TECH_STACK = [
  { name: "React",      color: "#61dafb", icon: "⚛️" },
  { name: "JavaScript", color: "#f7df1e", icon: "📜" },
  { name: "Node.js",    color: "#68a063", icon: "🟢" },
  { name: "Java",       color: "#f89820", icon: "☕" },
  { name: "UI/UX",      color: "#a855f7", icon: "🎨" },
  { name: "MongoDB",    color: "#4db33d", icon: "🍃" },
  { name: "Express.js", color: "#888888", icon: "🚀" },
  { name: "Git",        color: "#f05032", icon: "🐙" },
];

export const EDU_TIMELINE = [
  { year: "2010 – 2019", title: "Tiểu học & THCS",          color: "#6cbcff", desc: "Học tập tại Trường TH&THCS Thái Hà. Xây dựng nền tảng kiến thức cơ bản và phát triển tư duy học tập." },
  { year: "2019 – 2022", title: "Trung học Phổ thông",       color: "#b388ff", desc: "Tốt nghiệp Trường THPT Thái Phúc. Định hình đam mê với công nghệ và quyết định theo ngành CNTT." },
  { year: "2022",        title: "Nhập học Đại học FPT",      color: "#34d399", desc: "Nhập học Đại học FPT Hà Nội, ngành Công nghệ Thông tin. Làm quen với lập trình cơ bản và tư duy thuật toán." },
  { year: "2023",        title: "Khám phá Web Development",  color: "#a78bfa", desc: "Học sâu về HTML, CSS, JavaScript và bắt đầu với React. Hoàn thành các dự án nhóm đầu tiên." },
  { year: "2024",        title: "Fullstack & Dự án thực tế", color: "#fb923c", desc: "Phát triển RealERP — hệ thống quản lý bất động sản với React, Node.js, MongoDB. GPA đạt 0/4.0." },
  { year: "2025–2026",   title: "Tìm kiếm cơ hội",          color: "#f472b6", desc: "Hoàn thiện portfolio, tìm kiếm vị trí thực tập Fullstack Developer và chuẩn bị tốt nghiệp.", active: true },
];

/* ── Contact Page ── */
// SOCIAL_LINKS chứa JSX nên được tách sang utils/socialLinks.jsx
// import { SOCIAL_LINKS } from "../utils/socialLinks";
