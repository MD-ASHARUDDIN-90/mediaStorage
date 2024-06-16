// backend/model/file.ts

import mongoose from 'mongoose';

export interface FileDocument extends mongoose.Document {
  filename: string;
  path: string;
  contentType: string;
  size: number;
  fileType: string; // Add fileType field
}

const FileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  contentType: String,
  size: Number,
  fileType: String, // Add fileType field
});

const File = mongoose.model<FileDocument>('File', FileSchema);

export default File;
