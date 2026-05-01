// ============================================================
// MODEL LAYER — chứa toàn bộ dữ liệu tĩnh của profile
// ============================================================

export const profileData = {
  // --- Thông tin cá nhân ---
  personal: {
    name: "Nguyễn Văn Sáng",
    tagline: "Developer | Fullstack",
    avatar: `${import.meta.env.BASE_URL}avatar.jpg`,
    bio: "Sinh viên CNTT đam mê xây dựng giao diện đẹp và trải nghiệm người dùng tốt. Luôn tìm kiếm những thách thức mới để phát triển bản thân.",
    location: "Thái Thụy, Thái Bình, Việt Nam",
    email: "sangnguyen2004th@gmail.com",
    github: "https://github.com/Chickenth21",
    Facebook: "https://www.facebook.com/sang.nguyen.591683",
    Zalo: "0353484470",
  },

  // --- Học vấn ---
  education: {
    school: "Đại học FPT Hà Nội",
    major: "Công nghệ Thông tin",
    year: "2022 – 2026",
    gpa: "0 / 4.0",
    primaryAndSecondary: {
      school: "Trường TH&THCS Thái Hà",
      year: "2010 – 2019",
    },
    highSchool: {
      school: "Trường THPT Thái Phúc",
      year: "2019 – 2022",
      photos: [
        {
          src: `${import.meta.env.BASE_URL}thpt-cong.webp`,
          caption: "Cổng trường THPT Thái Phúc",
        },
        {
          src: `${import.meta.env.BASE_URL}thpt-ho.webp`,
          caption: "Hồ nước & hoa phượng đỏ",
        },
        {
          src: `${import.meta.env.BASE_URL}thpt-san.webp`,
          caption: "Sân trường & bóng rổ",
        },
      ],
    },
  },

  // --- Chuyên ngành & định hướng ---
  specialization: {
    field: "Web Development",
    focus: "Full-stack",
    technologies: ["React", "Node.js", "Java", "UI/UX Design"],
  },

  // --- Sở thích ---
  hobbies: [
    { icon: "💻", label: "Coding" },
    { icon: "🎮", label: "Gaming" },
    { icon: "🎵", label: "Âm nhạc" },
    { icon: "📚", label: "Đọc sách" },
  ],

  // --- Project nổi bật ---
  featuredProject: {
    name: "RealERP",
    description:
      "Hệ thống quản lý bất động sản full-stack với React, Node.js và MongoDB. Tích hợp dashboard, báo cáo tài chính và quản lý hợp đồng.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    link: "#projects",
    stars: 42,
  },

  // --- Skills nổi bật ---
  skills: [
    { name: "React", level: 85, color: "#61dafb" },
    { name: "JavaScript", level: 90, color: "#f7df1e" },
    { name: "Node.js", level: 75, color: "#68a063" },
    { name: "UI Design", level: 80, color: "#a855f7" },
    { name: "Java", level: 70, color: "#f89820" },
  ],

  // --- Navigation tabs ---
  tabs: [
    { id: "home", label: "Trang chủ", icon: "🏠" },
    { id: "education", label: "Học vấn", icon: "🎓" },
    { id: "projects", label: "Dự án", icon: "💻" },
    { id: "hobbies", label: "Sở thích", icon: "❤️" },
    { id: "contact", label: "Liên hệ", icon: "📬" },
  ],
};
