import express from 'express';
import AboutMe from '../db/models/AboutMe.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get AboutMe data
router.get('/', async (req, res) => {
  try {
    const aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      return res.status(404).json({ message: 'AboutMe data not found' });
    }
    res.json(aboutMe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update AboutMe data (protected route)
router.put('/', auth, async (req, res) => {
  try {
    let aboutMe = await AboutMe.findOne();
    if (!aboutMe) {
      aboutMe = new AboutMe(req.body);
    } else {
      aboutMe.welcomeContent = req.body.welcomeContent;
      aboutMe.aboutContent = req.body.aboutContent;
    }
    const updatedAboutMe = await aboutMe.save();
    res.json(updatedAboutMe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;