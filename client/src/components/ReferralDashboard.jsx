import React, { useState, useEffect } from 'react';

export default function ReferralDashboard({ user, onNewRegistration }) {
  const [copied, setCopied] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReferralDetails = async () => {
    try {
      const res = await fetch(`/api/referral/${user.referralCode}`);
      if (res.ok) {
        const data = await res.json();
        setDetails(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.referralCode) {
      fetchReferralDetails();
    }
  }, [user]);

  const shareUrl = `${window.location.origin}?ref=${user.referralCode}`;
  const whatsappText = encodeURIComponent(
    `Hey batchmates! 🚀 Found this free 60-minute workshop by NxtWave: "Build Your First AI Project in 60 Minutes" to add a real AI project to our placement resumes. Limited to 500 final-year students. Register using my link to get the bonus AI Interview Kit: ${shareUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const count = details?.referralCount || user.referralCount || 0;

  return (
    <div className="referral-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <span className="pulse-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
            ✓ Seat Confirmed
          </span>
          <h2 className="referral-title" style={{ marginTop: '10px' }}>
            Welcome, {user.fullName.split(' ')[0]}! 🎉
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
            Your workshop seat for <strong>{user.preferredProject}</strong> is locked in.
          </p>
        </div>
        <button 
          onClick={onNewRegistration} 
          className="btn-secondary" 
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
        >
          + Register Another
        </button>
      </div>

      {/* Referral Share Engine */}
      <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.3)', padding: '18px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0' }}>
            Your Exclusive Referral Link:
          </span>
          <span style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: 700 }}>
            {count} Batchmates Referred
          </span>
        </div>

        <div className="ref-code-box">
          <span className="ref-code-text">{user.referralCode}</span>
          <button onClick={copyToClipboard} className="copy-btn">
            {copied ? '✓ Copied Link!' : '📋 Copy Link'}
          </button>
        </div>

        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="whatsapp-share-btn"
          id="btn-whatsapp-share"
        >
          <span>💬 Share on College WhatsApp Group (1-Click)</span>
        </a>

        {/* Gamified Referral Perks */}
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '16px 0 10px', color: '#fff' }}>
          Referral Milestones &amp; Unlocks:
        </h4>

        <div className="perk-list">
          <div className={`perk-item ${count >= 1 ? 'unlocked' : ''}`}>
            <span className={`perk-badge ${count >= 1 ? 'active' : 'locked'}`}>
              {count >= 1 ? '✓ Unlocked' : '1 Friend'}
            </span>
            <div>
              <div className="perk-title">Top 50 AI Interview Questions &amp; Prompt Engineering Cheatsheet</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Immediate PDF download containing real interview questions asked by top tech firms.</div>
            </div>
          </div>

          <div className={`perk-item ${count >= 3 ? 'unlocked' : ''}`}>
            <span className={`perk-badge ${count >= 3 ? 'active' : 'locked'}`}>
              {count >= 3 ? '✓ Unlocked' : '3 Friends'}
            </span>
            <div>
              <div className="perk-title">Priority 1-on-1 AI Resume Review &amp; GitHub Badge</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Our senior placement mentors will review your resume and add verified AI skill tags.</div>
            </div>
          </div>

          <div className={`perk-item ${count >= 5 ? 'unlocked' : ''}`}>
            <span className={`perk-badge ${count >= 5 ? 'active' : 'locked'}`}>
              {count >= 5 ? '✓ Unlocked' : '5 Friends'}
            </span>
            <div>
              <div className="perk-title">VIP Q&amp;A Access Pass + Certificate of Excellence</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Direct access to the speaker during workshop &amp; physical co-branded NxtWave certificate.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Project Starter Kit Download */}
      <div style={{
        marginTop: '20px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>📦 Pre-Workshop AI Starter Kit Ready</div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>GitHub starter boilerplate + API setup guide for {user.preferredProject}</div>
        </div>
        <button 
          onClick={() => alert(`Starter kit sent to ${user.email} and WhatsApp! You can also clone the starter repo from https://github.com/nxtwave/ai-workshop-starter`)}
          className="btn-primary" 
          style={{ fontSize: '0.85rem', padding: '8px 16px' }}
        >
          Download Kit 📥
        </button>
      </div>
    </div>
  );
}
