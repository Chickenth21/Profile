// ============================================================
// MODEL LAYER — chứa toàn bộ dữ liệu tĩnh của profile
// ============================================================

export const profileData = {
  // --- Thông tin cá nhân ---
  personal: {
    name: 'Nguyễn Văn A',
    tagline: 'Frontend Developer | UI Lover',
    avatar: `${import.meta.env.BASE_URL}hero-avatar.png`,
    bio: 'Sinh viên CNTT đam mê xây dựng giao diện đẹp và trải nghiệm người dùng tốt. Luôn tìm kiếm những thách thức mới để phát triển bản thân.',
    location: 'Hà Nội, Việt Nam',
    email: 'nguyenvana@example.com',
    github: 'https://github.com/nguyenvana',
    linkedin: 'https://linkedin.com/in/nguyenvana',
  },

  // --- Học vấn ---
  education: {
    school: 'Đại học Bách Khoa Hà Nội',
    major: 'Công nghệ Thông tin',
    year: '2022 – 2026',
    gpa: '3.6 / 4.0',
  },

  // --- Chuyên ngành & định hướng ---
  specialization: {
    field: 'Web Development',
    focus: 'Frontend / Full-stack',
    technologies: ['React', 'Node.js', 'Java', 'UI/UX Design'],
  },

  // --- Sở thích ---
  hobbies: [
    { icon: '💻', label: 'Coding' },
    { icon: '🎮', label: 'Gaming' },
    { icon: '🏋️', label: 'Gym' },
    { icon: '🎵', label: 'Âm nhạc' },
    { icon: '📚', label: 'Đọc sách' },
  ],

  // --- Project nổi bật ---
  featuredProject: {
    name: 'RealERP System',
    description: 'Hệ thống quản lý bất động sản full-stack với React, Node.js và MongoDB. Tích hợp dashboard, báo cáo tài chính và quản lý hợp đồng.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    link: '#projects',
    stars: 42,
  },

  // --- Skills nổi bật ---
  skills: [
    { name: 'React', level: 85, color: '#61dafb' },
    { name: 'JavaScript', level: 90, color: '#f7df1e' },
    { name: 'Node.js', level: 75, color: '#68a063' },
    { name: 'UI Design', level: 80, color: '#a855f7' },
    { name: 'Java', level: 70, color: '#f89820' },
  ],

  // --- Navigation tabs ---
  tabs: [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'education', label: 'Học vấn', icon: '🎓' },
    { id: 'projects', label: 'Dự án', icon: '💻' },
    { id: 'hobbies', label: 'Sở thích', icon: '❤️' },
    { id: 'contact', label: 'Liên hệ', icon: '📬' },
  ],
};
