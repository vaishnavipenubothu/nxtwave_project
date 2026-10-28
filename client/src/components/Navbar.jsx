import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="brand-link">
          <span>NxtWave</span>
          <span className="brand-badge">AI Workshop</span>
        </Link>

        <ul className="nav-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink to="/curriculum" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              Curriculum
            </NavLink>
          </li>
          <li>
            <NavLink to="/matcher" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              AI Matcher
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
              📊 Growth Analytics
            </NavLink>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            className="theme-toggle-btn"
            title={`Switch to ${isDark ? 'Light (White)' : 'Dark (Black)'} Theme`}
            id="theme-toggle-btn"
          >
            {isDark ? (
              <>
                <span>☀️</span>
                <span style={{ fontSize: '0.8rem' }}>Light</span>
              </>
            ) : (
              <>
                <span>🌙</span>
                <span style={{ fontSize: '0.8rem' }}>Dark</span>
              </>
            )}
          </button>

          {/* Universal CTA */}
          <Link to="/register" className="btn-primary" id="nav-cta-register">
            Claim Free Seat ⚡
          </Link>
        </div>
      </div>
    </nav>
  );
}
