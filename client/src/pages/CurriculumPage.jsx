import React from 'react';
import { Link } from 'react-router-dom';

export default function CurriculumPage() {
  return (
    <div className="container" style={{ paddingBottom: '70px' }}>
      <div className="page-header">
        <div className="page-badge">
          <span>⏱️ ZERO MATH • 100% CODE</span>
        </div>
        <h1 className="page-title">
          The 60-Minute <span className="gradient-text">Build Curriculum</span>
        </h1>
        <p className="page-subtitle">
          Designed specifically for final-year engineering students. No boring PowerPoint slides—we open the editor, build the AI engine, deploy to cloud, and write your resume bullet points.
        </p>
      </div>

      {/* Curriculum Timeline */}
      <div className="timeline-container">
        {/* Module 1 */}
        <div className="timeline-card">
          <div className="time-pill">MIN 00 – 15</div>
          <div className="timeline-content">
            <h3>Module 1: Applied LLM Foundations &amp; System Prompts</h3>
            <p>
              Cut through theoretical noise. Understand how tokens, temperature, context windows, and embeddings actually function in production. Master few-shot prompt chaining to force structured JSON outputs from LLMs.
            </p>
            <div className="timeline-tags">
              <span className="timeline-tag">⚡ Prompt Chaining</span>
              <span className="timeline-tag">⚡ Token Budgeting</span>
              <span className="timeline-tag">⚡ JSON Schema Enforcement</span>
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="timeline-card" style={{ borderLeft: '4px solid #6366f1' }}>
          <div className="time-pill">MIN 15 – 45</div>
          <div className="timeline-content">
            <h3>Module 2: Live Hands-on API Integration &amp; Logic</h3>
            <p>
              Write real code together. Connect to Gemini 1.5 Flash / OpenAI API, implement vector search or dynamic document parsing, and assemble the interactive frontend with zero lag.
            </p>
            <div className="timeline-tags">
              <span className="timeline-tag">🔥 Gemini 1.5 API</span>
              <span className="timeline-tag">🔥 Node.js / Python Runtime</span>
              <span className="timeline-tag">🔥 Vector Embeddings</span>
              <span className="timeline-tag">🔥 Streaming UI Responses</span>
            </div>
          </div>
        </div>

        {/* Module 3 */}
        <div className="timeline-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="time-pill">MIN 45 – 60</div>
          <div className="timeline-content">
            <h3>Module 3: Cloud Deployment &amp; Placement Resume Bullet Points</h3>
            <p>
              Deploy your working project to cloud infrastructure (Vercel / Render / Streamlit Cloud) to obtain a live publicly accessible URL. Then, formulate high-impact STAR-format resume bullet points engineered to pass company ATS scanners.
            </p>
            <div className="timeline-tags">
              <span className="timeline-tag">🚀 Vercel / Render Deploy</span>
              <span className="timeline-tag">🚀 ATS-Optimized STAR Bullets</span>
              <span className="timeline-tag">🚀 GitHub Portfolio Badge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mentor Profile & FAQ Callout */}
      <div className="glass-card" style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
          Conducted by Senior AI Engineers from NxtWave
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto 24px' }}>
          Our mentors have built large-scale AI applications and coached over 10,000 engineering students who are now working at Microsoft, Amazon, Infosys, and top AI startups.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/matcher" className="btn-secondary">
            🧠 Match Your Project First ➔
          </Link>
          <Link to="/register" className="btn-primary">
            Claim Your Free Seat (100% Free) ⚡
          </Link>
        </div>
      </div>
    </div>
  );
}
