import express from 'express';
import WorkExperience from '../models/WorkExperience.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get all work experiences
router.get('/', async (req, res) => {
  try {
    const experiences = await WorkExperience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new work experience (protected route)
router.post('/', auth, async (req, res) => {
  const experience = new WorkExperience({
    title: req.body.title,
    company: req.body.company,
    duration: req.body.duration,
    description: req.body.description
  });

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a work experience (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    await WorkExperience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Work experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;