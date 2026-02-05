export default function Documentation() {
  return (
    <div className="container">
      <div className="glass-card">
        <h1 className="title">
          <span className="gradient-text">Documentation</span>
        </h1>

        <p className="subtitle">
          Learn how to use README Pro step by step.
        </p>

        <h3 style={{ marginTop: "24px" }}>How it works</h3>
        <ol style={{ lineHeight: "2" }}>
          <li>Choose Manual Input or GitHub URL</li>
          <li>Enter your project details</li>
          <li>Click Generate README</li>
          <li>Preview, copy, or download instantly</li>
        </ol>

        <h3 style={{ marginTop: "24px" }}>Supported Outputs</h3>
        <ul>
          <li>Markdown (.md)</li>
          <li>GitHub-ready formatting</li>
          <li>Badges & code blocks</li>
        </ul>
      </div>
    </div>
  );
}
