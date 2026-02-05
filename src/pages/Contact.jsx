export default function Contact() {
  return (
    <div className="container">
      <div className="glass-card">
        <h1 className="title">
          <span className="gradient-text">Contact Us</span>
        </h1>

        <p className="subtitle">
          Have feedback, questions, or feature requests?
        </p>

        <div style={{ marginTop: "24px", lineHeight: "2" }}>
          <p>📧 Email: aniketjamunde4@gmail.com</p>
          <p>🐙 GitHub: github.com/Aniketjamunde9146</p>
          <p>💬 Instagram: Instagram.com/aniket_jamunde_002</p>
        </div>

        <p style={{ marginTop: "16px", color: "var(--text-muted)" }}>
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
}
