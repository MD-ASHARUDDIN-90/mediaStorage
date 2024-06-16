// backend/server.ts

import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './model/user';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import File from './model/file';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || '';
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Multer configuration for images and videos only
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`,
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (
    file.mimetype.startsWith('image/') ||
    file.mimetype.startsWith('video/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images and videos are allowed'));
  }
};

const upload = multer({storage, fileFilter});
// MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  console.log(req.body, 'req.body');
  const {fullName, email, password} = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword, 'hashedPassword');

  try {
    const userExists = await User.findOne({email});
    if (userExists) {
      return res.status(400).json({message: 'User already exists'});
    }

    const newUser = new User({fullName, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign(
      {userId: user._id},
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: '3h',
      },
    );
    res.json({token});
  } catch (error) {
    res.status(500).json({message: 'Server error'});
  }
});

// Upload endpoint restricted to images and videos
app.post(
  '/api/upload',
  upload.single('file'),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    try {
      // Save file details to MongoDB
      const newFile = new File({
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype,
        size: req.file.size,
        fileType: req.file.mimetype.startsWith('image/') ? 'image' : 'video',
      });
      await newFile.save();

      res.json({
        message: 'File uploaded successfully',
        file: newFile,
      });
    } catch (error) {
      res.status(500).json({message: 'Failed to upload file', error});
    }
  },
);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
