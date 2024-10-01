import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  image: { type: String },
  github: { type: String },
  external: { type: String },
  isFeatured: { type: Boolean, default: false }
});

export default mongoose.model('Project', ProjectSchema);