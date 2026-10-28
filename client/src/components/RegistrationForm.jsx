import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function RegistrationForm({ onRegistered, initialRefCode, defaultProject }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    branch: 'Computer Science & Engineering',
    gradYear: '2027',
    placementStatus: 'Actively preparing for placements',
    preferredProject: defaultProject || 'AI Resume Screener & ATS Matcher',
    referredBy: initialRefCode || '',
    utmSource: 'direct'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Detect ref code and utm source from URL query params
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref') || initialRefCode;
    const utm = params.get('utm_source') || 'direct';
    if (ref) {
      setFormData(prev => ({ ...prev, referredBy: ref, utmSource: 'referral' }));
    } else if (utm) {
      setFormData(prev => ({ ...prev, utmSource: utm }));
    }
  }, [initialRefCode]);

  useEffect(() => {
    if (defaultProject) {
      setFormData(prev => ({ ...prev, preferredProject: defaultProject }));
    }
  }, [defaultProject]);

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

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      onRegistered(data.registration);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" id="registration-card">
      <h2 className="form-title">Claim Your Free Seat 🎟️</h2>
      <p className="form-subtitle">
        Limited to 500 final-year engineers. 100% Free workshop + AI Project Starter Kit.
      </p>

      {formData.referredBy && (
        <div style={{
          background: 'rgba(139, 92, 246, 0.15)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '0.85rem',
          color: '#c4b5fd',
          marginBottom: '18px'
        }}>
          🎁 You were referred by <strong>{formData.referredBy}</strong>! You both get instant access to the bonus AI interview prompt kit.
        </div>
      )}

      {error && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#fca5a5',
          padding: '10px 14px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '0.9rem'
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
              id="select-branch"
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
              id="select-gradyear"
              className="form-select"
              value={formData.gradYear}
              onChange={handleChange}
            >
              <option value="2027">2027 (Final Year - Immediate Drives)</option>
              <option value="2028">2028 (Pre-Final Year - Internship Prep)</option>
              <option value="2026">2026 / Passout</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Placement Readiness Status</label>
            <select
              name="placementStatus"
              className="form-select"
              value={formData.placementStatus}
              onChange={handleChange}
            >
              <option value="Need AI Project on Resume">Need an AI Project on my Resume</option>
              <option value="Actively preparing for drives">Actively preparing for upcoming drives</option>
              <option value="Want to switch to AI engineering">Looking to switch into AI roles</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Select Your AI Project Track</label>
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

        <button type="submit" className="btn-primary submit-btn" disabled={loading} id="btn-submit-register">
          {loading ? 'Securing Your Seat...' : 'Register Now (Free) & Get Starter Kit 🚀'}
        </button>

        <p style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', marginTop: '12px' }}>
          🔒 No spam. Instant WhatsApp workshop link and starter materials delivered right after registration.
        </p>
      </form>
    </div>
  );
}
