import mongoose from 'mongoose';

const WorkExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model('WorkExperience', WorkExperienceSchema);