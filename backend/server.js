// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- In-memory “DB” for demo only ---
const users = {};                // { [email]: { otp, verified } }
const takenSubdomains = ['acme', 'rx-samples'];

// Helper to log incoming requests
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Body:', req.body);
  console.log('Query:', req.query);
  next();
});

// 1) Send OTP to email
app.post('/auth/signup/email', (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  const otp = '1234';            // fixed OTP for all tests
  users[email] = { otp, verified: false };
  console.log(`→ Generated OTP for ${email}: ${otp}`);

  res.json({ success: true, message: 'OTP sent (mock)' });
});

// 2) Verify OTP
app.post('/auth/signup/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const record = users[email];

  if (!record) {
    return res.status(404).json({ success: false, message: 'Email not found. Send OTP first.' });
  }
  if (record.otp !== otp) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  record.verified = true;
  console.log(`→ ${email} verified`);
  res.json({ success: true, token: 'mock-verification-token' });
});

// 3) Check subdomain availability
app.get('/auth/subdomain/check', (req, res) => {
  const name = String(req.query.name || '').trim().toLowerCase();
  if (!name) {
    return res.status(400).json({ success: false, message: 'Missing subdomain name' });
  }

  const available = !takenSubdomains.includes(name);
  console.log(`→ Subdomain "${name}" available?`, available);
  res.json({ success: true, available });
});

// 4) Create site
app.post('/auth/signup/create-site', (req, res) => {
  const { orgName, token } = req.body;
  if (!orgName || orgName.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Invalid organization name' });
  }
  if (token !== 'mock-verification-token') {
    return res.status(401).json({ success: false, message: 'Invalid or missing token' });
  }

  const sub = orgName.trim().toLowerCase().replace(/\s+/g, '-');
  takenSubdomains.push(sub);
  console.log(`→ Created site: ${sub}.rxware.rigelx.io`);

  res.json({ success: true, message: 'Site created (mock)' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n🔌  Testing server running at http://localhost:${PORT}`);
});
