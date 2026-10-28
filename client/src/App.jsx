import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CurriculumPage from './pages/CurriculumPage';
import MatcherPage from './pages/MatcherPage';
import RegisterPage from './pages/RegisterPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Liquid Glassmorphism Ambient Mesh Layer */}
          <div className="liquid-bg-wrapper" aria-hidden="true">
            <div className="liquid-blob liquid-blob-1"></div>
            <div className="liquid-blob liquid-blob-2"></div>
            <div className="liquid-blob liquid-blob-3"></div>
            <div className="liquid-blob liquid-blob-4"></div>
            <div className="liquid-blob liquid-blob-5"></div>
            <div className="liquid-caustic-layer"></div>
          </div>

          {/* Top Announcement Bar */}
          <div className="top-announcement">
            <span className="pulse-dot"></span>
            <span>
              🔥 <strong>Final-Year Challenge:</strong> NxtWave Free Workshop • Build Your First AI Project in 60 Mins
            </span>
            <Link 
              to="/register" 
              style={{ color: '#4f46e5', fontWeight: 800, textDecoration: 'underline', marginLeft: '6px' }}
            >
              Claim Free Seat ➔
            </Link>
          </div>

          {/* Navigation Bar */}
          <Navbar />

          {/* Main Page Routing */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/matcher" element={<MatcherPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
