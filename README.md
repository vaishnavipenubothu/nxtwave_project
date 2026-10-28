# NxtWave Growth Intern Challenge – Round 1 Solution
**Campaign Mission:** Get 500 final-year engineering students to register for *"Build Your First AI Project in 60 Minutes"*.  
**Constraints:** ₹2,000 Budget | 7-Day Window | MERN Stack Working Asset | Max 5 Slides Growth Plan.

---

## 📁 Repository Structure
```
NxtWave/
├── growth_plan/
│   ├── NxtWave_Growth_Plan_5_Slides.pdf  <-- 🎯 Pixel-Perfect 5-Slide Submission PDF
│   ├── slides_template.html              <-- High-Impact 16:9 Presentation Deck Source
│   ├── generate_pdf.js                   <-- Puppeteer Automated PDF Render Script
│   └── slide_1.png ... slide_5.png       <-- Slide Previews
├── client/                               <-- ⚛️ React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx                  <-- Urgency Quota & Dynamic Registration Counter
│   │   │   ├── RegistrationForm.jsx      <-- Validated Onboarding + Confetti Celebration
│   │   │   ├── ReferralDashboard.jsx     <-- 1-Click WhatsApp Share & Milestone Unlocks
│   │   │   ├── AIProjectMatcher.jsx      <-- Branch & Placement Goal Project Recommender
│   │   │   └── GrowthMetrics.jsx         <-- Real-time Unit Economics & CAC Monitor
│   │   ├── App.jsx
│   │   └── index.css                     <-- Dark Mode Glassmorphism Design System
│   └── vite.config.js                    <-- Dev Server Proxy to Backend
├── server/                               <-- 🚀 Node.js + Express + MongoDB Backend
│   ├── models/
│   │   └── Registration.js               <-- Mongoose Schema
│   ├── routes/
│   │   └── api.js                        <-- REST API (/register, /stats, /referral, /match)
│   ├── data/
│   │   └── registrations.json            <-- Turnkey Persistent Storage Fallback Engine
│   └── server.js                         <-- Express Server (Port 5000)
└── README.md
```

---

## 🚀 How to Run the Working MERN Application

### 1. Start the Backend Server (Port 5000)
```bash
cd server
npm install
node server.js
```
*Note: The server auto-detects local MongoDB (or Atlas). If MongoDB is not present, it seamlessly falls back to a high-speed persistent JSON engine with zero configuration needed.*

### 2. Start the Frontend Client (Port 3000)
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser.

---

## 🎯 Key Innovation Highlights
1. **Interactive AI Project Matcher:** Solves the dropoff of non-CS branches by matching projects based on engineering branch and target placement tier, complete with an ATS-proof STAR resume bullet preview.
2. **Viral Referral Command Center:** Every student immediately receives a unique referral code and 1-click WhatsApp class group share copy. Unlocks tiered rewards (1 invite = Top 50 AI Interview Questions PDF; 3 invites = Resume Review; 5 invites = VIP Mentor Pass).
3. **Live Growth Unit Economics Monitor:** Integrated admin dashboard tracking target progress (142/500), ₹2,000 budget burn rate, and blended CAC (₹4.00 per registrant).
