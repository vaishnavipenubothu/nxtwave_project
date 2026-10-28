import React from 'react';

export default function GrowthMetrics({ stats }) {
  if (!stats) return null;

  const total = stats.totalRegistered || 0;
  const target = stats.target || 500;
  const budgetSpent = stats.budgetSpent || 0;
  const totalBudget = stats.budget || 2000;
  const channels = stats.channelBreakdown || {};

  return (
    <div className="growth-analytics-card container" id="growth-analytics">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <div>
          <span className="pulse-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.4)' }}>
            📊 LIVE GROWTH METRICS &amp; UNIT ECONOMICS
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 800, marginTop: '8px' }}>
            NxtWave 7-Day Campaign Monitor
          </h2>
        </div>
        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
          Simulation Engine: <strong>Full MERN Stack (Active)</strong>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="analytics-grid">
        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#10b981' }}>{total} / {target}</div>
          <div className="metric-lbl">Total Registrations</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#60a5fa' }}>{stats.percentageFilled}%</div>
          <div className="metric-lbl">Campaign Quota Reached</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#f59e0b' }}>₹{budgetSpent} / ₹{totalBudget}</div>
          <div className="metric-lbl">Budget Utilized</div>
        </div>

        <div className="analytics-metric">
          <div className="metric-val" style={{ color: '#a78bfa' }}>{stats.costPerRegistration}</div>
          <div className="metric-lbl">Blended CAC (Cost / Reg)</div>
        </div>
      </div>

      {/* Channel Attribution & Leaderboard */}
      <div className="splits-grid" style={{ marginTop: '24px' }}>
        {/* Channel Breakdown */}
        <div style={{ background: 'rgba(15, 20, 36, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Multi-Channel Acquisition Split
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>WhatsApp Class Reps (CRs)</span>
                <strong>{channels.whatsapp_cr || 0} regs ({Math.round(((channels.whatsapp_cr || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                <div style={{ width: `${Math.min(100, ((channels.whatsapp_cr || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#25D366', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>LinkedIn &amp; Placement Clubs</span>
                <strong>{channels.linkedin || 0} regs ({Math.round(((channels.linkedin || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                <div style={{ width: `${Math.min(100, ((channels.linkedin || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#0077b5', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>Peer-to-Peer Viral Referrals</span>
                <strong>{channels.referral || 0} regs ({Math.round(((channels.referral || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                <div style={{ width: `${Math.min(100, ((channels.referral || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#8b5cf6', borderRadius: '4px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                <span>Student Coding Chapters (GDSC/CSI)</span>
                <strong>{channels.campus_club || 0} regs ({Math.round(((channels.campus_club || 0)/Math.max(1, total))*100)}%)</strong>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px' }}>
                <div style={{ width: `${Math.min(100, ((channels.campus_club || 0)/Math.max(1, total))*100)}%`, height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Student Advocates Leaderboard */}
        <div style={{ background: 'rgba(15, 20, 36, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px', color: '#fff' }}>
            Top Student Advocates (Viral Loop)
          </h4>
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
                    <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{ref.name}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{ref.college}</td>
                    <td><span className="pulse-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: 'transparent' }}>{ref.count}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: '#64748b' }}>No referrals yet. Be the first!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
