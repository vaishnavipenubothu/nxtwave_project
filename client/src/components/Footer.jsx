import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.15rem', fontFamily: 'var(--font-display)' }}>
              NxtWave Growth Intern Challenge
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Built with MERN Stack • React, Node.js, Express, MongoDB
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.88rem' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Overview</Link>
            <Link to="/curriculum" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Curriculum</Link>
            <Link to="/matcher" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>AI Matcher</Link>
            <Link to="/register" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Claim Free Seat</Link>
            <Link to="/analytics" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Growth Analytics</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
