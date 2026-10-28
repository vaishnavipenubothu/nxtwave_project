import React, { useState } from 'react';

export default function AIProjectMatcher({ onSelectTrack }) {
  const [branch, setBranch] = useState('CSE');
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

  return (
    <div className="matcher-container container" id="matcher">
      <div className="matcher-header">
        <span className="badge-hero" style={{ marginBottom: '8px' }}>
          🧠 SMART AI PROJECT MATCHER
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', fontWeight: 800 }}>
          Which AI Project Will Get You Hired?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '6px' }}>
          Recruiters look for projects relevant to your domain. Select your profile to discover the highest-impact 60-minute build.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Step 1: Branch */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, marginBottom: '10px' }}>
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

        {/* Step 2: Career Goal */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, marginBottom: '10px' }}>
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

        {/* Step 3: Tech Preference */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, marginBottom: '10px' }}>
            3. What excites you most?
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

        {/* Dynamic Matched Result Card */}
        {result && (
          <div className="recommendation-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <span className="pulse-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderColor: 'rgba(59, 130, 246, 0.4)' }}>
                🎯 RECOMMENDED WORKSHOP PROJECT
              </span>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700 }}>
                Build Time: ~{result.duration}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, margin: '12px 0 6px', color: '#fff' }}>
              {result.title}
            </h3>

            <div style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '12px' }}>
              <strong>Tech Stack:</strong> <span style={{ color: '#c4b5fd' }}>{result.techStack}</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#e2e8f0', marginBottom: '16px' }}>
              💡 <strong>Why Recruiters Care:</strong> {result.whyCare}
            </p>

            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
                📄 Verified STAR Resume Bullet Point You Will Unlock:
              </div>
              <div className="resume-bullet">
                "{result.bulletPoint}"
              </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <button
                onClick={() => onSelectTrack(result.title)}
                className="btn-primary"
                style={{ fontSize: '0.9rem', padding: '10px 20px' }}
              >
                Select This Track &amp; Register ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
