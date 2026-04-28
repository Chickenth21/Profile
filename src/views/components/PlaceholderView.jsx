import './PlaceholderView.css';

/**
 * VIEW LAYER — PlaceholderView
 * Tab views chưa xây dựng chi tiết, hiển thị "coming soon" đẹp
 */
const TAB_CONTENT = {
  education: {
    icon: '🎓',
    title: 'Học vấn & Chứng chỉ',
    desc: 'Thông tin chi tiết về trường học, ngành học, GPA và các chứng chỉ đạt được sẽ được trình bày tại đây.',
  },
  projects: {
    icon: '💻',
    title: 'Dự án của mình',
    desc: 'Tất cả các dự án cá nhân và nhóm sẽ được showcase với demo, source code và mô tả chi tiết.',
  },
  hobbies: {
    icon: '❤️',
    title: 'Sở thích & Niềm đam mê',
    desc: 'Những điều mình yêu thích ngoài code: gaming, gym, âm nhạc và nhiều hơn nữa.',
  },
  contact: {
    icon: '📬',
    title: 'Liên hệ với mình',
    desc: 'Form liên hệ, email, mạng xã hội — hãy kết nối để cùng nhau tạo ra điều tuyệt vời!',
  },
};

export default function PlaceholderView({ tabId, onBack }) {
  const content = TAB_CONTENT[tabId] || {
    icon: '🔧',
    title: 'Đang xây dựng...',
    desc: 'Section này đang được phát triển.',
  };

  return (
    <div className="placeholder-page">
      <div className="placeholder-inner">
        <span className="placeholder-icon" role="img" aria-hidden="true">
          {content.icon}
        </span>
        <h2 className="placeholder-title">{content.title}</h2>
        <p className="placeholder-desc">{content.desc}</p>
        <button
          id={`back-to-home-${tabId}`}
          className="placeholder-back"
          onClick={onBack}
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
