import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import auth from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'resume' + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Upload resume (protected route)
router.post('/upload', auth, upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully');
});

// Get resume URL
router.get('/url', (req, res) => {
  const filePath = path.join(process.cwd(), 'uploads', 'resume.pdf');
  if (fs.existsSync(filePath)) {
    res.json({ url: '/api/resume/download' });
  } else {
    res.status(404).send('Resume not found');
  }
});

// Download resume
router.get('/download', (req, res) => {
  const filePath = path.join(process.cwd(), 'uploads', 'resume.pdf');
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).send('Resume not found');
  }
});

export default router;