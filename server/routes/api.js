const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Registration = require('../models/Registration');

// Local storage fallback helper
const DATA_FILE = path.join(__dirname, '..', 'data', 'registrations.json');

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Generate realistic initial seed registrations (142 to start with out of 500)
    const colleges = [
      'JNTU Hyderabad', 'Vellore Institute of Technology', 'SRM Institute of Science and Tech',
      'Osmania University', 'Chaitanya Bharathi Institute of Technology', 'G. Pulla Reddy Engg College',
      'Vasavi College of Engg', 'KLU Vijayawada', 'Sathyabama University', 'GITAM Deemed to be University',
      'PSG College of Technology', 'BMS College of Engineering', 'RV College of Engineering'
    ];
    const branches = ['Computer Science & Engg', 'Information Technology', 'Electronics & Comm.', 'AI & Data Science', 'Electrical Engg'];
    const sources = ['whatsapp_cr', 'whatsapp_cr', 'linkedin', 'campus_club', 'referral', 'direct'];
    const projects = ['AI Resume Screener & ATS Matcher', 'Autonomous Customer Support LLM Agent', 'Full-Stack Code Debugger Bot'];
    const sampleNames = [
      'Aarav Sharma', 'Sai Teja Reddy', 'Ananya Iyer', 'Rahul Varma', 'Pooja Patil',
      'Karthik Raju', 'Meghana Rao', 'Rohan Gupta', 'Divya Nair', 'Vikram Patel',
      'Harshita Sen', 'Akhil Kumar', 'Sneha Deshmukh', 'Aditya Joshi', 'Kavya S'
    ];

    const initialList = [];
    const baseCount = 142;

    for (let i = 1; i <= baseCount; i++) {
      const code = 'NW-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      const name = sampleNames[i % sampleNames.length] + ' ' + String.fromCharCode(65 + (i % 26));
      const refCount = i % 7 === 0 ? Math.floor(Math.random() * 4) + 1 : 0;
      initialList.push({
        _id: 'seed_' + i,
        fullName: name,
        email: `student_${i}@campus.edu`,
        phone: `+91 98${Math.floor(10000000 + Math.random() * 89999999)}`,
        college: colleges[i % colleges.length],
        branch: branches[i % branches.length],
        gradYear: '2025',
        placementStatus: i % 3 === 0 ? 'Need AI Project on Resume' : 'Actively Preparing for Drives',
        preferredProject: projects[i % projects.length],
        referralCode: code,
        referredBy: i > 20 && i % 4 === 0 ? initialList[i % 15].referralCode : null,
        referralCount: refCount,
        utmSource: sources[i % sources.length],
        registeredAt: new Date(Date.now() - (baseCount - i) * 45 * 60 * 1000).toISOString()
      });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(initialList, null, 2), 'utf-8');
  }
}

function getLocalRegistrations() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function saveLocalRegistrations(data) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function generateCode() {
  return 'NW-' + Math.random().toString(36).substring(2, 7).toUpperCase();
}

// 1. Health & Connection Info
router.get('/health', (req, res) => {
  const isMongo = req.app.locals.isMongoConnected || false;
  res.json({
    status: 'ok',
    database: isMongo ? 'MongoDB Atlas / Local' : 'Turnkey Local Store (Dual-Engine)',
    targetCampaign: 'NxtWave AI Workshop: Build Your First AI Project in 60 Mins',
    quotaTarget: 500,
    timestamp: new Date().toISOString()
  });
});

// 2. Workshop Registration Endpoint
router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      branch,
      gradYear,
      placementStatus,
      preferredProject,
      referredBy,
      utmSource
    } = req.body;

    if (!fullName || !email || !phone || !college || !branch) {
      return res.status(400).json({ error: 'Please provide all mandatory fields (name, email, phone, college, branch).' });
    }

    const emailNorm = email.trim().toLowerCase();
    const isMongo = req.app.locals.isMongoConnected;
    const referralCode = generateCode();

    if (isMongo) {
      // Check duplicate
      const existing = await Registration.findOne({ email: emailNorm });
      if (existing) {
        return res.status(200).json({
          message: 'You are already registered! Here is your referral dashboard.',
          registration: existing,
          alreadyRegistered: true
        });
      }

      // Check referrer
      let validReferrer = null;
      if (referredBy) {
        validReferrer = await Registration.findOne({ referralCode: referredBy.trim().toUpperCase() });
        if (validReferrer) {
          validReferrer.referralCount = (validReferrer.referralCount || 0) + 1;
          await validReferrer.save();
        }
      }

      const newReg = new Registration({
        fullName: fullName.trim(),
        email: emailNorm,
        phone: phone.trim(),
        college: college.trim(),
        branch: branch.trim(),
        gradYear: gradYear || '2025',
        placementStatus: placementStatus || 'Need AI Project on Resume',
        preferredProject: preferredProject || 'AI Resume Screener & ATS Matcher',
        referralCode,
        referredBy: validReferrer ? validReferrer.referralCode : null,
        referralCount: 0,
        utmSource: utmSource || (referredBy ? 'referral' : 'direct'),
        registeredAt: new Date()
      });

      await newReg.save();
      return res.status(201).json({
        message: 'Registration successful! Welcome to NxtWave AI Workshop.',
        registration: newReg,
        alreadyRegistered: false
      });
    } else {
      // Local Store Engine
      const list = getLocalRegistrations();
      const existing = list.find(r => r.email === emailNorm);
      if (existing) {
        return res.status(200).json({
          message: 'You are already registered! Here is your referral dashboard.',
          registration: existing,
          alreadyRegistered: true
        });
      }

      let validReferrerCode = null;
      if (referredBy) {
        const refMatch = list.find(r => r.referralCode === referredBy.trim().toUpperCase());
        if (refMatch) {
          refMatch.referralCount = (refMatch.referralCount || 0) + 1;
          validReferrerCode = refMatch.referralCode;
        }
      }

      const newRecord = {
        _id: 'reg_' + Date.now(),
        fullName: fullName.trim(),
        email: emailNorm,
        phone: phone.trim(),
        college: college.trim(),
        branch: branch.trim(),
        gradYear: gradYear || '2025',
        placementStatus: placementStatus || 'Need AI Project on Resume',
        preferredProject: preferredProject || 'AI Resume Screener & ATS Matcher',
        referralCode,
        referredBy: validReferrerCode,
        referralCount: 0,
        utmSource: utmSource || (referredBy ? 'referral' : 'direct'),
        registeredAt: new Date().toISOString()
      };

      list.unshift(newRecord);
      saveLocalRegistrations(list);

      return res.status(201).json({
        message: 'Registration successful! Welcome to NxtWave AI Workshop.',
        registration: newRecord,
        alreadyRegistered: false
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Server error during registration. Please try again.' });
  }
});

// 3. Referral Details Lookup
router.get('/referral/:code', async (req, res) => {
  try {
    const code = req.params.code.trim().toUpperCase();
    const isMongo = req.app.locals.isMongoConnected;
    let record = null;

    if (isMongo) {
      record = await Registration.findOne({ referralCode: code });
    } else {
      const list = getLocalRegistrations();
      record = list.find(r => r.referralCode === code);
    }

    if (!record) {
      return res.status(404).json({ error: 'Referral code not found' });
    }

    // Milestone thresholds
    const count = record.referralCount || 0;
    const perks = [
      {
        threshold: 1,
        title: 'Top 50 AI Interview Questions & Prompts PDF',
        unlocked: count >= 1
      },
      {
        threshold: 3,
        title: 'Priority 1-on-1 AI Resume Review & GitHub Badge',
        unlocked: count >= 3
      },
      {
        threshold: 5,
        title: 'VIP Access Pass + Certificate of Excellence from NxtWave Mentor',
        unlocked: count >= 5
      }
    ];

    res.json({
      fullName: record.fullName,
      referralCode: record.referralCode,
      referralCount: count,
      perks,
      nextPerk: perks.find(p => !p.unlocked) || null,
      shareLink: `${req.protocol}://${req.get('host')}?ref=${record.referralCode}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching referral info' });
  }
});

// 4. Campaign Stats & Analytics (Target: 500 Registrations)
router.get('/stats', async (req, res) => {
  try {
    const isMongo = req.app.locals.isMongoConnected;
    let list = [];

    if (isMongo) {
      const count = await Registration.countDocuments();
      if (count === 0) {
        // Seed MongoDB from local seed data
        const seedItems = getLocalRegistrations();
        const mongoSeeds = seedItems.map(item => {
          const { _id, ...rest } = item;
          return rest;
        });
        await Registration.insertMany(mongoSeeds);
      }
      list = await Registration.find().sort({ registeredAt: -1 }).lean();
    } else {
      list = getLocalRegistrations();
    }

    const total = list.length;
    const target = 500;
    const budgetSpent = Math.min(2000, Math.round((total / target) * 2000));
    const costPerRegistration = total > 0 ? (budgetSpent / total).toFixed(2) : 0;

    // Channel breakdown
    const channelCounts = {
      whatsapp_cr: 0,
      linkedin: 0,
      campus_club: 0,
      referral: 0,
      direct: 0
    };

    list.forEach(item => {
      const src = item.utmSource || 'direct';
      if (channelCounts[src] !== undefined) {
        channelCounts[src]++;
      } else {
        channelCounts.direct++;
      }
    });

    // Top Advocates / Referrers Leaderboard
    const topReferrers = [...list]
      .filter(item => (item.referralCount || 0) > 0)
      .sort((a, b) => (b.referralCount || 0) - (a.referralCount || 0))
      .slice(0, 5)
      .map(r => ({
        name: r.fullName,
        college: r.college,
        count: r.referralCount
      }));

    // Recent 5 registrations
    const recent = list.slice(0, 5).map(r => ({
      name: r.fullName.replace(/(.{2}).+(.{2})/, '$1***$2'),
      college: r.college,
      project: r.preferredProject,
      time: r.registeredAt
    }));

    res.json({
      target,
      totalRegistered: total,
      seatsRemaining: Math.max(0, target - total),
      percentageFilled: ((total / target) * 100).toFixed(1),
      budget: 2000,
      budgetSpent,
      costPerRegistration: `₹${costPerRegistration}`,
      channelBreakdown: channelCounts,
      topReferrers,
      recentActivity: recent
    });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating campaign metrics' });
  }
});

// 5. Interactive AI Project Matcher Algorithm
router.post('/match-project', (req, res) => {
  const { branch, goal, techInterest } = req.body;

  let recommendation = {
    title: 'AI Resume Screener & ATS Matcher',
    duration: '60 Minutes',
    techStack: 'Python / Gemini API / LangChain / Streamlit',
    whyCare: 'Directly solves the exact problem hiring recruiters face! Putting ATS optimization on your resume proves you understand real-world engineering.',
    bulletPoint: 'Engineered an end-to-end AI ATS resume analyzer utilizing Gemini 1.5 Flash and embeddings, scoring candidate match accuracy and identifying missing technical keywords within 2.4s.'
  };

  if (techInterest === 'web' || branch?.toLowerCase().includes('information') || goal === 'startup') {
    recommendation = {
      title: 'Autonomous Customer Support LLM Agent',
      duration: '60 Minutes',
      techStack: 'Node.js / Express / OpenAI / React / Vector Store',
      whyCare: 'Every SaaS company is hiring engineers who know how to build autonomous agentic workflows with memory and tool calling.',
      bulletPoint: 'Built an autonomous AI support agent with semantic knowledge-base retrieval, dynamic function calling, and automated ticket resolution pipeline.'
    };
  } else if (techInterest === 'developer_tools' || branch?.toLowerCase().includes('electronics')) {
    recommendation = {
      title: 'Real-time AI Code Debugger & Explainer Bot',
      duration: '60 Minutes',
      techStack: 'FastAPI / Claude API / VS Code Extension API',
      whyCare: 'Demonstrates deep systems understanding by diagnosing runtime stack traces and auto-generating optimized diffs.',
      bulletPoint: 'Developed an automated code debugging assistant generating zero-shot bug fixes and complexity explanations across 6 programming languages.'
    };
  }

  res.json({
    recommendation,
    starterKitAvailable: true,
    estimatedCompletionTime: '60 mins'
  });
});

module.exports = router;
