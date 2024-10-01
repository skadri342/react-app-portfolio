import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/config/connection.js';
import authRoutes from './routes/auth.js';
import workExperienceRoutes from './routes/workExperience.js';
import projectRoutes from './routes/projects.js';
import aboutMeRoutes from './routes/aboutMe.js';

dotenv.config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workExperience', workExperienceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/aboutMe', aboutMeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));