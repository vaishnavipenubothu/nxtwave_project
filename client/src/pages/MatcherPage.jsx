import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MatcherPage() {
  const navigate = useNavigate();
  const [branch, setBranch] = useState('CSE / IT');
  const [goal, setGoal] = useState('product');
  const [techInterest, setTechInterest] = useState('fullstack');
  const [result, setResult] = useState({
    title: 'AI Resume Screener & ATS Matcher',
    duration: '60 Minutes',
    techStack: 'Python / Gemini API / LangChain / Streamlit',
    whyCare: 'Directly solves the exact problem hiring recruiters face! Putting ATS optimization on your resume proves you understand real-world engineering.',
    bulletPoint: 'Engineered an end-to-end AI ATS resume analyzer utilizing Gemini 1.5 Flash and embeddings, scoring candidate match accuracy and identifying missing technical keywords within 2.4s.'
  });

  const branches = ['CSE / IT', 'ECE / EEE', 'Mechanical / Civil', 'AI / Data Science'];
  const goals = [
    { id: 'product', label: 'Tier-1 Product Companies (Microsoft, Google, Amazon)' },
    { id: 'saas', label: 'Fast-Growing SaaS / AI Startups' },
    { id: 'service', label: 'Top IT Services / Tech Consulting (TCS, Infosys, Cognizant)' }
  ];
  const techTracks = [
    { id: 'fullstack', label: 'Full-Stack Web & LLM Integration' },
    { id: 'nlp', label: 'Prompt Engineering & Document Processing' },
    { id: 'devtools', label: 'Developer Tools & Automated Debugging' }
  ];

  const handleCalculate = async (newBranch, newGoal, newTech) => {
    try {
      const res = await fetch('/api/match-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branch: newBranch || branch,
          goal: newGoal || goal,
          techInterest: newTech || techInterest
        })
      });
      if (res.ok) {
        const data = await res.json();
        setResult(data.recommendation);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProceed = () => {
    navigate(`/register?track=${encodeURIComponent(result.title)}`);
  };

  return (
    <div className="container" style={{ paddingBottom: '70px' }}>
      <div className="page-header">
        <div className="page-badge">
          <span>🧠 SMART PLACEMENT ENGINE</span>
        </div>
        <h1 className="page-title">
          Which AI Project <span className="gradient-text">Will Get You Hired?</span>
        </h1>
        <p className="page-subtitle">
          Recruiters look for projects directly relevant to your domain and ambition. Answer 3 quick questions to discover your optimal 60-minute build.
        </p>
      </div>

      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {/* Step 1: Branch */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px' }}>
            1. What is your Engineering Branch?
          </div>
          <div className="matcher-pills">
            {branches.map(b => (
              <button
                key={b}
                className={`matcher-pill ${branch === b ? 'selected' : ''}`}
                onClick={() => {
                  setBranch(b);
                  handleCalculate(b, goal, techInterest);
                }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Goal */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px' }}>
            2. Your Primary Placement Goal:
          </div>
          <div className="matcher-pills">
            {goals.map(g => (
              <button
                key={g.id}
                className={`matcher-pill ${goal === g.id ? 'selected' : ''}`}
                onClick={() => {
                  setGoal(g.id);
                  handleCalculate(branch, g.id, techInterest);
                }}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Tech Interest */}
        <div style={{ marginBottom: '36px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '10px' }}>
            3. What tech excites you most?
          </div>
          <div className="matcher-pills">
            {techTracks.map(t => (
              <button
                key={t.id}
                className={`matcher-pill ${techInterest === t.id ? 'selected' : ''}`}
                onClick={() => {
                  setTechInterest(t.id);
                  handleCalculate(branch, goal, t.id);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matched Result Card */}
        {result && (
          <div className="glass-card" style={{ borderTop: '4px solid #4f46e5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span className="pulse-badge" style={{ background: 'rgba(79, 70, 229, 0.15)', color: '#4f46e5', borderColor: 'rgba(79, 70, 229, 0.3)' }}>
                🎯 RECOMMENDED WORKSHOP TRACK
              </span>
              <span style={{ fontSize: '0.88rem', color: 'var(--accent-emerald)', fontWeight: 800 }}>
                Build Time: ~{result.duration}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, margin: '14px 0 8px', color: 'var(--text-main)' }}>
              {result.title}
            </h2>

            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              <strong>Tech Stack:</strong> <span style={{ color: '#6366f1', fontWeight: 600 }}>{result.techStack}</span>
            </div>

            <p style={{ fontSize: '0.96rem', color: 'var(--text-main)', marginBottom: '20px', lineHeight: 1.6 }}>
              💡 <strong>Why Recruiters Care:</strong> {result.whyCare}
            </p>

            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📄 Verified STAR Resume Bullet Point You Will Unlock:
              </div>
              <div className="resume-bullet-box">
                "{result.bulletPoint}"
              </div>
            </div>

            <div style={{ marginTop: '28px', textAlign: 'right' }}>
              <button
                onClick={handleProceed}
                className="btn-primary"
                id="btn-select-matcher-track"
              >
                Select This Track &amp; Claim Seat ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
