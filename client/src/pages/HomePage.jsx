import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const total = stats?.totalRegistered || 143;
  const target = stats?.target || 500;
  const percentage = Math.min(100, ((total / target) * 100)).toFixed(1);
  const remaining = Math.max(0, target - total);

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div className="page-header">
        <div className="page-badge">
          <span className="pulse-dot"></span>
          <span>Final-Year Engineering Placement Special</span>
        </div>

        <div className="hero-highlight-container">
          <h1 className="hero-highlight-title">
            Recruiters are filtering out candidates with generic <span className="highlight-pill-subtle">Todo &amp; Weather apps</span>.
          </h1>
          <p className="hero-highlight-sub">
            <span className="hero-highlight-accent">
              Step into placement interviews with a live deployed <strong className="gradient-text">Generative AI application</strong> and verified STAR resume bullet points.
            </span>
          </p>
        </div>
      </div>

      {/* Quota Progress Tracker */}
      <div className="quota-box">
        <div className="quota-header">
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Workshop Registrations
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
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Batch closing soon
            </div>
          </div>
        </div>

        <div className="quota-progress-track">
          <div className="quota-progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>

        <div className="quota-footer">
          <span>Campaign Day 3 of 7</span>
          <span>{percentage}% Booked</span>
        </div>
      </div>

      {/* Action Navigation Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        margin: '40px 0 60px'
      }}>
        {/* Card 1: Curriculum */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⏱️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
              60-Min Curriculum
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px' }}>
              Zero calculus, 100% practical. Go from LLM fundamentals to live API integration and cloud deployment in one focused hour.
            </p>
          </div>
          <Link to="/curriculum" className="btn-secondary" style={{ width: 'fit-content' }}>
            View Full Agenda ➔
          </Link>
        </div>

        {/* Card 2: AI Matcher */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #6366f1' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🧠</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
              Smart AI Project Matcher
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px' }}>
              Not sure which project fits your branch? Select CSE, ECE, or Core branch to discover your highest-impact resume project.
            </p>
          </div>
          <Link to="/matcher" className="btn-secondary" style={{ width: 'fit-content' }}>
            Find Your Match ➔
          </Link>
        </div>

        {/* Card 3: Free Seat */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #10b981' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🎟️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
              Claim Free Seat
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px' }}>
              100% free pass for final-year students. Unlocks GitHub starter code, API keys, and Top 50 AI interview prompt cheat-sheet.
            </p>
          </div>
          <Link to="/register" className="btn-primary" style={{ width: 'fit-content' }}>
            Register Now (Free) 🚀
          </Link>
        </div>

        {/* Card 4: Analytics */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📊</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
              Growth Analytics
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '18px' }}>
              Explore the real-time simulation metrics: ₹2,000 budget burn rate, channel attribution, and campus referrers leaderboard.
            </p>
          </div>
          <Link to="/analytics" className="btn-secondary" style={{ width: 'fit-content' }}>
            Inspect Analytics ➔
          </Link>
        </div>
      </div>
    </div>
  );
}
