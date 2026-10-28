const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  college: {
    type: String,
    required: true,
    trim: true
  },
  branch: {
    type: String,
    required: true,
    trim: true
  },
  gradYear: {
    type: String,
    default: '2027'
  },
  placementStatus: {
    type: String,
    default: 'Preparing'
  },
  preferredProject: {
    type: String,
    default: 'AI Resume Screener'
  },
  referralCode: {
    type: String,
    unique: true,
    required: true
  },
  referredBy: {
    type: String,
    default: null
  },
  referralCount: {
    type: Number,
    default: 0
  },
  utmSource: {
    type: String,
    default: 'direct'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Registration', registrationSchema);
