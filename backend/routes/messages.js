import express from 'express';
import Message from '../db/models/Message.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Send a new message (public route)
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all messages (protected route)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update message read status
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Soft delete a message
router.patch('/:id/delete', auth, async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Restore a deleted message
router.patch('/:id/restore', auth, async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Permanently delete a message
router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;