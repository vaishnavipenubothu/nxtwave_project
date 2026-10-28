import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const trackParam = searchParams.get('track');
  const refParam = searchParams.get('ref');

  const [stats, setStats] = useState(null);
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: 'Computer Science & Engineering',
    gradYear: '2027',
    placementStatus: 'Need AI Project on Resume',
    preferredProject: trackParam || 'AI Resume Screener & ATS Matcher',
    referredBy: refParam || '',
    utmSource: refParam ? 'referral' : 'direct'
  });

  const fetchStats = () => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (trackParam) {
      setFormData(prev => ({ ...prev, preferredProject: trackParam }));
    }
    if (refParam) {
      setFormData(prev => ({ ...prev, referredBy: refParam, utmSource: 'referral' }));
    }
  }, [trackParam, refParam]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register. Please try again.');
      }

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      setUser(data.registration);
      fetchStats();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const total = stats?.totalRegistered || 143;
  const target = stats?.target || 500;
  const percentage = Math.min(100, ((total / target) * 100)).toFixed(1);
  const remaining = Math.max(0, target - total);

  const shareUrl = user ? `${window.location.origin}/register?ref=${user.referralCode}` : '';
  const whatsappText = encodeURIComponent(
    `Hey batchmates! 🚀 Found this free 60-min workshop by NxtWave: "Build Your First AI Project in 60 Minutes" to add a real AI project to our placement resumes. Limited to 500 final-year students. Register using my link to get the bonus AI Interview Kit: ${shareUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="container" style={{ paddingBottom: '70px' }}>
      <div className="page-header">
        <div className="page-badge">
          <span>🎟️ 100% FREE ADMISSION</span>
        </div>
        <h1 className="page-title">
          Claim Your <span className="gradient-text">Free Workshop Seat</span>
        </h1>
        <p className="page-subtitle">
          Limited to 500 final-year engineering students. Every registrant unlocks instant access to the GitHub boilerplate code, API keys pass, and Top 50 AI interview prompt cheat-sheets.
        </p>
      </div>

      {/* Quota Progress Tracker */}
      <div className="quota-box">
        <div className="quota-header">
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
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

      <div style={{ maxWidth: '780px', margin: '0 auto' }}>
        {user ? (
          /* Referral Dashboard after Registration */
          <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span className="pulse-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  ✓ Seat Confirmed
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.9rem', fontWeight: 800, marginTop: '10px', color: 'var(--text-main)' }}>
                  Welcome, {user.fullName}! 🎉
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem' }}>
                  Your workshop seat for <strong>{user.preferredProject}</strong> is secured.
                </p>
              </div>
              <button 
                onClick={() => setUser(null)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '6px 14px' }}
              >
                + Register Another
              </button>
            </div>

            <div style={{ marginTop: '24px', background: 'var(--bg-surface)', padding: '24px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  Your Personal Referral Link:
                </span>
                <span style={{ fontSize: '0.85rem', color: '#6366f1', fontWeight: 800 }}>
                  {user.referralCount || 0} Batchmates Referred
                </span>
              </div>

              <div className="ref-code-box">
                <span className="ref-code-text">{user.referralCode}</span>
                <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                  {copied ? '✓ Copied Link!' : '📋 Copy Link'}
                </button>
              </div>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-share-btn"
                id="btn-whatsapp-share-page"
              >
                <span>💬 Share on College WhatsApp Group (1-Click)</span>
              </a>

              <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '20px 0 12px', color: 'var(--text-main)' }}>
                Milestone Rewards Unlocked by Referring:
              </h4>

              <div className="perk-list">
                <div className={`perk-item ${(user.referralCount || 0) >= 1 ? 'unlocked' : ''}`}>
                  <span className={`perk-badge ${(user.referralCount || 0) >= 1 ? 'active' : 'locked'}`}>
                    {(user.referralCount || 0) >= 1 ? '✓ Unlocked' : '1 Friend'}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      Top 50 AI Interview Questions &amp; Prompt Engineering PDF
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Immediate PDF download containing verified technical interview prompts.
                    </div>
                  </div>
                </div>

                <div className={`perk-item ${(user.referralCount || 0) >= 3 ? 'unlocked' : ''}`}>
                  <span className={`perk-badge ${(user.referralCount || 0) >= 3 ? 'active' : 'locked'}`}>
                    {(user.referralCount || 0) >= 3 ? '✓ Unlocked' : '3 Friends'}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      Priority 1-on-1 AI Resume Review &amp; GitHub Badge
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Our senior placement coaches evaluate your resume and certify your skills.
                    </div>
                  </div>
                </div>

                <div className={`perk-item ${(user.referralCount || 0) >= 5 ? 'unlocked' : ''}`}>
                  <span className={`perk-badge ${(user.referralCount || 0) >= 5 ? 'active' : 'locked'}`}>
                    {(user.referralCount || 0) >= 5 ? '✓ Unlocked' : '5 Friends'}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      VIP Q&amp;A Access Pass + Certificate of Excellence
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Direct live interaction with speaker + co-branded physical certificate.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button 
                onClick={() => alert(`Starter kit sent to ${user.email}! Repo: https://github.com/nxtwave/ai-workshop-starter`)}
                className="btn-primary"
              >
                Download Starter Code Boilerplate 📥
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div className="glass-card">
            {formData.referredBy && (
              <div style={{
                background: 'rgba(79, 70, 229, 0.12)',
                border: '1px solid rgba(79, 70, 229, 0.3)',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '0.9rem',
                color: '#4f46e5',
                fontWeight: 600,
                marginBottom: '20px'
              }}>
                🎁 You were referred with code <strong>{formData.referredBy}</strong>! You both qualify for the bonus AI Interview kit.
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '0.9rem',
                marginBottom: '20px',
                fontWeight: 600
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  id="input-name"
                  placeholder="e.g. Vaishnavi Penubothu"
                  required
                  className="form-input"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">College Email ID *</label>
                  <input
                    type="email"
                    name="email"
                    id="input-email"
                    placeholder="name@college.edu"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    id="input-phone"
                    placeholder="+91 98765 43210"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">College / University Name *</label>
                  <input
                    type="text"
                    name="college"
                    id="input-college"
                    placeholder="e.g. JNTU / SRM / VIT / CBIT"
                    required
                    className="form-input"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Engineering Branch *</label>
                  <select
                    name="branch"
                    className="form-select"
                    value={formData.branch}
                    onChange={handleChange}
                  >
                    <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                    <option value="Information Technology">Information Technology (IT)</option>
                    <option value="AI & Data Science">AI & Data Science (AI/DS)</option>
                    <option value="Electronics & Communication">Electronics & Comm. (ECE)</option>
                    <option value="Electrical Engineering">Electrical & Electronics (EEE)</option>
                    <option value="Mechanical / Civil">Mechanical / Civil / Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Year of Graduation *</label>
                  <select
                    name="gradYear"
                    className="form-select"
                    value={formData.gradYear}
                    onChange={handleChange}
                  >
                    <option value="2027">2027 (Final Year - Immediate Placement)</option>
                    <option value="2028">2028 (Pre-Final Year - Internship Focus)</option>
                    <option value="2026">2026 / Passout</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Placement Readiness</label>
                  <select
                    name="placementStatus"
                    className="form-select"
                    value={formData.placementStatus}
                    onChange={handleChange}
                  >
                    <option value="Need AI Project on Resume">Need an AI Project on my Resume</option>
                    <option value="Actively preparing for drives">Actively preparing for campus drives</option>
                    <option value="Want to switch to AI engineering">Looking to switch into AI roles</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Selected AI Project Track</label>
                <select
                  name="preferredProject"
                  className="form-select"
                  value={formData.preferredProject}
                  onChange={handleChange}
                >
                  <option value="AI Resume Screener & ATS Matcher">Track 1: AI Resume Screener & ATS Matcher (Python + Gemini)</option>
                  <option value="Autonomous Customer Support LLM Agent">Track 2: Autonomous Customer Support Agent (MERN + LLM)</option>
                  <option value="Full-Stack Code Debugger Bot">Track 3: Real-Time AI Code Debugger Bot (FastAPI + React)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1.05rem', marginTop: '10px' }}
                disabled={loading}
                id="btn-submit-register"
              >
                {loading ? 'Confirming Your Free Seat...' : 'Claim Free Seat & Unlock Starter Kit 🚀'}
              </button>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '14px' }}>
                🔒 100% Free workshop. Instant WhatsApp confirmation link and starter repo access delivered immediately.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
