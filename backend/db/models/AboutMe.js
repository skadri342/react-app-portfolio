import mongoose from 'mongoose';

const AboutMeSchema = new mongoose.Schema({
  welcomeContent: {
    greeting: { type: String, required: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  },
  aboutContent: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills: [{ type: String }],
    profileImageUrl: { type: String, required: true }
  }
});

export default mongoose.model('AboutMe', AboutMeSchema);