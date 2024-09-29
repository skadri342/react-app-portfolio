import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import User from '../db/models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password, twoFactorToken } = req.body;

  try {
    // Step 1: Find user
    let user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Retrieved hashed password from DB:', user.password);
    console.log('Provided password:', password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for user:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Step 3: Verify 2FA token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFactorToken,
      window: 1 // Allow 1 step before and after current time
    });

    if (!verified) {
      console.log('Invalid 2FA token for user:', username);
      return res.status(400).json({ message: 'Invalid 2FA token' });
    }

    // Step 4: Generate JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('JWT Sign Error:', err);
          throw err;
        }
        console.log('Login successful for user:', username);
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Server error during login:', err);
    res.status(500).send('Server error');
  }
});

router.get('/verify', auth, (req, res) => {
  res.json({ message: 'Token is valid' });
});

export default router;