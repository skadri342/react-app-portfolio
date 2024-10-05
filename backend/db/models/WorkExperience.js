import mongoose from 'mongoose';

const workExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  duration: String,
  descriptionPoints: [String]
});

export default mongoose.model('WorkExperience', workExperienceSchema);