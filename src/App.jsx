import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Copy, Download, Github, Zap, FileText, Moon, Sun, Menu, X, Sparkles, Code2, Loader2 } from "lucide-react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Features from "./pages/Features";
import Documentation from "./pages/Documentation";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import License from "./pages/License";



function App() {
  const [mode, setMode] = useState("manual");
  const [githubUrl, setGithubUrl] = useState("");
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    techStack: "",
    features: "",
    customNotes: "",
  });
  const [readme, setReadme] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute("data-theme", !isDark ? "dark" : "light");
  };

  // Extract GitHub repository info
  const extractGithubInfo = async (url) => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);

      const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/?$/);
      if (!match) {
        throw new Error("Invalid GitHub URL. Use: https://github.com/username/repo");
      }

      const [, owner, repo] = match;

      const repoResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      const repoData = repoResponse.data;

      setProjectData({
  name: repoData.name || "",
  description:
    repoData.description ||
    `Auto-generated README for ${repoData.name}`,
  techStack: repoData.language || "Unknown",
  features: "",
  customNotes: `Repository URL: ${repoData.html_url}
Stars: ${repoData.stargazers_count}
Forks: ${repoData.forks_count}`,
});


      setSuccess("Repository loaded successfully!");
      setMode("manual");
    } catch (err) {
      setError(
        err.response?.status === 404
          ? "Repository not found"
          : err.message || "Failed to fetch repository data"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateReadme = async () => {
    if (!projectData.name.trim() || !projectData.description.trim()) {
      setError("Project name and description are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const prompt = `Generate a professional, well-structured GitHub README.md file with the following information:

Project Name: ${projectData.name}
Description: ${projectData.description}
${projectData.techStack ? `Tech Stack/Language: ${projectData.techStack}` : ""}
${projectData.features ? `Features:\n${projectData.features}` : ""}
${projectData.customNotes ? `Additional Notes:\n${projectData.customNotes}` : ""}

Please create a comprehensive README that includes:
1. Project title with appropriate emoji
2. Clear project description
3. Table of contents (if sections are multiple)
4. Installation instructions (make reasonable assumptions)
5. Usage section with code examples
6. Features list (use provided or create reasonable ones)
7. Contributing guidelines
8. License section
9. Author/Contact section

Make it professional, well-formatted with proper Markdown syntax, and production-ready. Include badges for language/framework if applicable.`;

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content:
                "You are an expert open-source developer and technical writer. Generate comprehensive, professional GitHub README files in Markdown format that follow best practices and are immediately usable.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      setReadme(response.data.choices[0].message.content);
      setSuccess("README generated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error?.message ||
          "Failed to generate README. Check your API key."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(readme);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReadme = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(readme)
    );
    element.setAttribute("download", "README.md");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      {/* Animated Background */}
      <div className="background-blur blur-1"></div>
      <div className="background-blur blur-2"></div>
      <div className="background-blur blur-3"></div>

      {/* Navigation Bar */}
      <nav className="">
        <div className="navbar-container">
          <div className="navbar-logo">
  <img src="/logo.png" alt="A App Logo " className="logo-icon" height={70} width={70} />
  <span className="logo-text">
    
  </span>
</div>


          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`navbar-items ${mobileMenuOpen ? "active" : ""}`}>
  <Link to="/features" className="nav-link">Features</Link>
  <Link to="/docs" className="nav-link">Documentation</Link>
  <Link to="/contact" className="nav-link">Contact</Link>
</div>


          <button 
            className="theme-toggle" 
            onClick={toggleTheme} 
            title="Toggle dark/light mode"
            aria-label="Theme toggle"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="container">
       
        <Routes>
  <Route
    path="/"
    element={
      <>
        {/* Animated Background */}
        <div className="background-blur blur-1"></div>
        <div className="background-blur blur-2"></div>
        <div className="background-blur blur-3"></div>

        <div className="container">
          {/* ⬇️ KEEP YOUR FULL HOME UI HERE ⬇️ */}
          {/* Premium Header */}
          {/* Mode Switcher */}
          {/* Input Section */}
          {/* Preview Section */}
          <section className="seo-content">
  <h1>AI README Generator for GitHub</h1>
  <h2>Create Professional README.md Files Instantly</h2>

          <p>
            README Pro is an AI-powered README generator designed for developers
            who want to create professional GitHub README.md files quickly.
            Paste your GitHub repository or enter project details to generate
            clean, production-ready documentation.
          </p>

          <h3>Why use README Pro?</h3>
          <ul>
            <li>Generate README.md instantly using AI</li>
            <li>Supports GitHub repositories</li>
            <li>Markdown preview with copy & download</li>
            <li>Perfect for open-source and private projects</li>
          </ul>
        </section>
        </div>
      </>
    }
  />

  <Route path="/features" element={<Features />} />
  <Route path="/docs" element={<Documentation />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/privacy" element={<Privacy />} />
  <Route path="/terms" element={<Terms />} />
  <Route path="/license" element={<License />} />
</Routes>


        {/* iOS-Style Mode Switcher */}
        <div className="mode-switcher-container">
          <div className="mode-switcher">
            <div className={`slider-track ${mode === "github" ? "right" : "left"}`}></div>
            <button
              className={`mode-btn ${mode === "manual" ? "active" : ""}`}
              onClick={() => setMode("manual")}
            >
              <FileText size={18} />
              <span>Manual Input</span>
            </button>
            <button
              className={`mode-btn ${mode === "github" ? "active" : ""}`}
              onClick={() => setMode("github")}
            >
              <Github size={18} />
              <span>GitHub URL</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Input Section */}
          <div className="input-section">
            <div className="glass-card input-card">
              <div className="card-header">
                <div className="header-icon">
                  {mode === "github" ? <Github size={24} /> : <FileText size={24} />}
                </div>
                <div>
                  <h2>{mode === "github" ? "Import Repository" : "Project Details"}</h2>
                  <p className="card-subtitle">
                    {mode === "github" 
                      ? "Connect your GitHub repository" 
                      : "Enter your project information"}
                  </p>
                </div>
              </div>

              {mode === "github" ? (
                <div className="form-content">
                  <div className="form-group">
                    <label>GitHub Repository URL</label>
                    <div className="input-wrapper">
                      <Github size={18} className="input-icon" />
                      <input
                        type="url"
                        placeholder="https://github.com/username/repository"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        disabled={loading}
                        className="premium-input"
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => extractGithubInfo(githubUrl)}
                    disabled={!githubUrl || loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="spinner" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Code2 size={20} />
                        <span>Analyze Repository</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="form-content">
                  <div className="form-group">
                    <label>Project Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your project name"
                      value={projectData.name}
                      onChange={(e) =>
                        setProjectData({ ...projectData, name: e.target.value })
                      }
                      className="premium-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Description *</label>
                    <textarea
                      placeholder="Describe what your project does..."
                      value={projectData.description}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="premium-textarea"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tech Stack</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, PostgreSQL..."
                      value={projectData.techStack}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          techStack: e.target.value,
                        })
                      }
                      className="premium-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Key Features</label>
                    <textarea
                      placeholder="List your project's main features"
                      value={projectData.features}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          features: e.target.value,
                        })
                      }
                      rows={3}
                      className="premium-textarea"
                    />
                  </div>

                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea
                      placeholder="Installation, deployment info, or any other notes..."
                      value={projectData.customNotes}
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          customNotes: e.target.value,
                        })
                      }
                      rows={3}
                      className="premium-textarea"
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    onClick={generateReadme}
                    disabled={loading || !projectData.name || !projectData.description}
                  >
                    {loading ? (
                      <>
                        <Loader2 size={20} className="spinner" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Zap size={20} />
                        <span>Generate README</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {error && (
                <div className="message-box error-message">
                  <span className="message-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="message-box success-message">
                  <span className="message-icon">✅</span>
                  <span>{success}</span>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="preview-section">
            <div className="glass-card preview-card">
              <div className="card-header">
                <div className="header-icon">📄</div>
                <div>
                  <h2>Live Preview</h2>
                  <p className="card-subtitle">Your README will appear here</p>
                </div>
              </div>

             <div className={`preview-content ${readme || loading ? "show" : ""}`}>

  {!readme ? (
    <div className="empty-state">
      <div className="empty-icon">📝</div>
      <p>Your README will appear here</p>
      <span className="empty-subtext">Fill in project details to get started</span>
    </div>
  ) : (
    <>
      <div className="preview-actions">
        <button
          className={`action-btn ${copied ? "copied" : ""}`}
          onClick={copyToClipboard}
        >
          <Copy size={18} />
          <span>{copied ? "Copied!" : "Copy"}</span>
        </button>
        <button className="action-btn" onClick={downloadReadme}>
          <Download size={18} />
          <span>Download</span>
        </button>
      </div>

      <div className="markdown-preview">
        <ReactMarkdown>{readme}</ReactMarkdown>
      </div>
    </>
  )}
</div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>README Pro</h3>
            <p>Generate professional GitHub documentation with AI</p>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy</Link></li>
<li><Link to="/terms">Terms</Link></li>
<li><Link to="/license">License</Link></li>

            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 README Pro. Made with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;