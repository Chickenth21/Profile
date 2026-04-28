/**
 * VIEW LAYER — PlaceholderView (Tailwind v4)
 */
const TAB_CONTENT = {
  education: { icon: "🎓", title: "Học vấn & Chứng chỉ", desc: "Thông tin chi tiết về trường học, ngành học, GPA và các chứng chỉ đạt được sẽ được trình bày tại đây." },
  projects:  { icon: "💻", title: "Dự án của mình",        desc: "Tất cả các dự án cá nhân và nhóm sẽ được showcase với demo, source code và mô tả chi tiết." },
  hobbies:   { icon: "❤️", title: "Sở thích & Niềm đam mê", desc: "Những điều mình yêu thích ngoài code: gaming, gym, âm nhạc và nhiều hơn nữa." },
  contact:   { icon: "📬", title: "Liên hệ với mình",       desc: "Form liên hệ, email, mạng xã hội — hãy kết nối để cùng nhau tạo ra điều tuyệt vời!" },
};

export default function PlaceholderView({ tabId, onBack }) {
  const content = TAB_CONTENT[tabId] || { icon: "🔧", title: "Đang xây dựng...", desc: "Section này đang được phát triển." };

  return (
    <div className="relative z-[1] min-h-screen flex items-center justify-center px-6 py-20">
      <div className="animate-fade-up max-w-md w-full text-center p-12 rounded-3xl border backdrop-blur-xl"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <span className="text-6xl block mb-6" role="img" aria-hidden="true">{content.icon}</span>
        <h2 className="font-display font-extrabold text-2xl mb-4" style={{ color: "var(--text-heading)" }}>
          {content.title}
        </h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
          {content.desc}
        </p>
        <button
          id={`back-to-home-${tabId}`}
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold cursor-pointer border transition-all duration-200 hover:-translate-y-0.5"
          style={{ background: "var(--surface-hover)", borderColor: "var(--border)", color: "var(--text-heading)" }}
        >
          ← Quay về trang chủ
        </button>
      </div>
    </div>
  );
}
