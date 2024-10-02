import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', MessageSchema);