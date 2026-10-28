import React from 'react';

export default function Hero({ stats, onScrollToRegister }) {
  const total = stats?.totalRegistered || 142;
  const target = stats?.target || 500;
  const percentage = Math.min(100, ((total / target) * 100)).toFixed(1);
  const remaining = Math.max(0, target - total);

  return (
    <section className="hero-section container">
      <div className="badge-hero">
        <span className="pulse-dot"></span>
        <span>FINAL-YEAR ENGINEERING PLACEMENT SPECIAL</span>
      </div>

      <h1 className="hero-title">
        Build Your First AI Project <br />
        <span className="gradient-text">in 60 Minutes</span>
      </h1>

      <p className="hero-subtitle">
        Tired of recruiters ignoring basic web projects? Build and deploy a real-world LLM application, 
        earn a verified completion badge, and add a killer project bullet to your placement resume.
      </p>

      {/* Dynamic Quota & Urgency Tracker */}
      <div className="quota-box">
        <div className="quota-header">
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Live Registrations
            </div>
            <div className="quota-count">
              <span>{total}</span> / {target} Seats Claimed
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span className="pulse-badge">
              <span className="pulse-dot"></span>
              Only {remaining} Seats Left!
            </span>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>
              Batch closing soon
            </div>
          </div>
        </div>

        <div className="quota-progress-track">
          <div 
            className="quota-progress-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="quota-footer">
          <span>Campaign Day 3 of 7</span>
          <span>{percentage}% Booked</span>
        </div>
      </div>

      {/* Workshop Highlights */}
      <div className="highlights-grid" id="highlights">
        <div className="highlight-card">
          <div className="highlight-icon">⚡</div>
          <h3 className="highlight-title">Zero Math / Pure Code</h3>
          <p className="highlight-desc">
            No complex theoretical calculus. We build directly with modern LLM APIs, LangChain, and clean full-stack deployment.
          </p>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon">💼</div>
          <h3 className="highlight-title">Resume-Ready Artifact</h3>
          <p className="highlight-desc">
            Walk away with a live hosted project URL and ready-made STAR-format resume bullet points engineered to beat company ATS filters.
          </p>
        </div>

        <div className="highlight-card">
          <div className="highlight-icon">🎁</div>
          <h3 className="highlight-title">Instant AI Starter Kit</h3>
          <p className="highlight-desc">
            Unlock GitHub templates, API keys access pass, and Top 50 AI interview prompt cheat-sheets immediately upon registering.
          </p>
        </div>
      </div>
    </section>
  );
}
