import React, { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);

    const interval = setInterval(() => {
      fetch('/api/stats')
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(console.error);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>Loading live campaign metrics...</h2>
      </div>
    );
  }

  const total = stats.totalRegistered || 0;
  const target = stats.target || 500;
  const budgetSpent = stats.budgetSpent || 0;
  const totalBudget = stats.budget || 2000;
  const channels = stats.channelBreakdown || {};

  return (
    <div className="container" style={{ paddingBottom: '70px' }}>
      <div className="page-header">
        <div className="page-badge">
          <span>📊 REAL-TIME SIMULATION DASHBOARD</span>
        </div>
        <h1 className="page-title">
          Growth Analytics &amp; <span className="gradient-text">Unit Economics</span>
        </h1>
        <p className="page-subtitle">
          Live audit dashboard tracking registration velocity towards our 500 final-year student target, budget utilization against ₹2,000, and channel acquisition efficiency.
        </p>
      </div>

      {/* KPI Metrics */}
      <div className="analytics-grid">
        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#10b981' }}>{total} / {target}</div>
          <div className="metric-lbl">Total Registrations</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#4f46e5' }}>{stats.percentageFilled}%</div>
          <div className="metric-lbl">Campaign Quota Achieved</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#f59e0b' }}>₹{budgetSpent} / ₹{totalBudget}</div>
          <div className="metric-lbl">Budget Burn Rate</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#06b6d4' }}>{stats.costPerRegistration}</div>
          <div className="metric-lbl">Blended CAC (Cost / Reg)</div>
        </div>
      </div>

      {/* Splits Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '28px',
        margin: '36px 0'
      }}>
        {/* Channel Breakdown */}
        <div className="glass-card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
            Channel Acquisition Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px', fontWeight: 600 }}>
                <span>WhatsApp Class Reps (CRs)</span>
                <strong>{channels.whatsapp_cr || 0} regs ({Math.round(((channels.whatsapp_cr || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--pill-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, ((channels.whatsapp_cr || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#25D366' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px', fontWeight: 600 }}>
                <span>LinkedIn &amp; Placement Clubs</span>
                <strong>{channels.linkedin || 0} regs ({Math.round(((channels.linkedin || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--pill-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, ((channels.linkedin || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#0077b5' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px', fontWeight: 600 }}>
                <span>Peer-to-Peer Viral Referrals</span>
                <strong>{channels.referral || 0} regs ({Math.round(((channels.referral || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--pill-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, ((channels.referral || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#7c3aed' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '6px', fontWeight: 600 }}>
                <span>Student Coding Chapters (GDSC/CSI)</span>
                <strong>{channels.campus_club || 0} regs ({Math.round(((channels.campus_club || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--pill-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, ((channels.campus_club || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#f59e0b' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Referrers Leaderboard */}
        <div className="glass-card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
            Top Campus Advocates (Viral Loop)
          </h3>

          <table className="table-mini">
            <thead>
              <tr>
                <th>Student</th>
                <th>College</th>
                <th>Invites</th>
              </tr>
            </thead>
            <tbody>
              {stats.topReferrers && stats.topReferrers.length > 0 ? (
                stats.topReferrers.map((ref, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{ref.name}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{ref.college}</td>
                    <td>
                      <span className="pulse-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', borderColor: 'transparent' }}>
                        {ref.count}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>
                    No referrals recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
